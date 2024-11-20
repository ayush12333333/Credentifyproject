// Import required modules
import express from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import bodyParser from 'body-parser';
import cors from 'cors';
import { generateAuthenticationOptions, verifyAuthenticationResponse } from '@simplewebauthn/server';
import { generateRegistrationOptions, verifyRegistrationResponse } from '@simplewebauthn/server';

// Initialize the app
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose
  .connect('mongodb://localhost:27017', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.error('MongoDB connection error:', err));

// User Schema and Model
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  authenticator: Object,  // Store biometric credential information
});

const User = mongoose.model('User', userSchema);

// Routes
app.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: 'User signed up successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error signing up', error: err.message });
  }
});

app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Generate JWT
    const token = jwt.sign({ userId: user._id }, 'secretKey', { expiresIn: '1h' });
    res.status(200).json({ message: 'Login successful', token });
  } catch (err) {
    res.status(500).json({ message: 'Error logging in', error: err.message });
  }
});

// User Database (temporary in-memory store for simplicity)
const userDatabase = {}; // Example: { email: { id, credentials } };

// Generate WebAuthn registration options
app.post('/webauthn/generate-registration-options', (req, res) => {
  const { email } = req.body;

  // Check if the user already exists in the userDatabase
  if (userDatabase[email]) {
    return res.status(400).json({ message: 'User already registered' });
  }

  // Generate WebAuthn registration options
  const options = generateRegistrationOptions({
    rpName: 'My App', // Replace with your app's name
    rpID: 'localhost', // Replace with your domain during production
    userID: email,
    userName: email,
    attestationType: 'direct',
    authenticatorSelection: {
      authenticatorAttachment: 'platform', // 'platform' for built-in (e.g., laptop fingerprint reader)
      userVerification: 'preferred',
    },
  });

  // Store the challenge for later verification
  userDatabase[email] = { challenge: options.challenge };

  res.json(options);
});

// Verify WebAuthn registration response
app.post('/webauthn/verify-registration-response', async (req, res) => {
  const { email, response } = req.body;
  const user = userDatabase[email];

  if (!user) {
    return res.status(400).json({ message: 'User not found' });
  }

  try {
    const verification = await verifyRegistrationResponse({
      credential: response,
      expectedChallenge: user.challenge,
      expectedOrigin: 'http://localhost:3000', // Your app's URL
      expectedRPID: 'localhost', // Replace with your domain during production
    });

    if (verification.verified) {
      // Save the authenticator details for login verification
      user.authenticator = verification.authenticatorInfo;
      delete user.challenge; // Clear challenge
      res.json({ message: 'Registration successful' });
    } else {
      res.status(400).json({ message: 'Registration failed' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error verifying registration' });
  }
});

// Generate WebAuthn options for biometric login
app.post('/webauthn/generate-auth-options', (req, res) => {
  const { email } = req.body;
  const user = userDatabase[email];

  if (!user || !user.authenticator) {
    return res.status(400).json({ message: 'User not found or biometric credentials not registered' });
  }

  const options = generateAuthenticationOptions({
    allowCredentials: user.authenticator.map((cred) => ({
      id: cred.credentialID,
      type: 'public-key',
    })),
    userVerification: 'preferred',
  });

  res.json(options);
});

// Verify WebAuthn login response
app.post('/webauthn/verify-auth-response', async (req, res) => {
  const { email, response } = req.body;
  const user = userDatabase[email];

  if (!user) {
    return res.status(400).json({ message: 'User not found' });
  }

  try {
    const verification = await verifyAuthenticationResponse({
      credential: response,
      expectedChallenge: user.challenge,
      expectedRPID: 'localhost',
      expectedOrigin: 'http://localhost:3000',
      authenticator: user.authenticator,
    });

    if (verification.verified) {
      return res.json({ message: 'Biometric login successful' });
    } else {
      return res.status(400).json({ message: 'Biometric login failed' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error verifying biometric login' });
  }
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
