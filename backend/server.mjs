import express from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import bodyParser from 'body-parser';
import cors from 'cors';
import { generateRegistrationOptions, verifyRegistrationResponse } from '@simplewebauthn/server';
import { generateAuthenticationOptions, verifyAuthenticationResponse } from '@simplewebauthn/server';

// Initialize the app
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose
  .connect('mongodb://localhost:27017/myapp', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.error('MongoDB connection error:', err));

// User Schema and Model
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  dob: String,
  phone: String,
  address: String,
  authenticator: Object, // Store biometric credential information
});

const User = mongoose.model('User', userSchema);

// Details Schema and Model
const detailsSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true },
  dob: String,
  phone: String,
  address: String,
});

const Details = mongoose.model('Details', detailsSchema);

// Middleware to handle errors
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal server error', error: err.message });
});

// Routes
app.post('/signup', async (req, res) => {
  try {
    const { name, email, password, dob, phone, address } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email, and password are required' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      dob,
      phone,
      address,
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

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ userId: user._id }, 'secretKey', { expiresIn: '1h' });
    res.status(200).json({ message: 'Login successful', token });
  } catch (err) {
    res.status(500).json({ message: 'Error logging in', error: err.message });
  }
});

app.get('/user/:email', async (req, res) => {
  try {
    const { email } = req.params;

    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      name: user.name,
      email: user.email,
      dob: user.dob || '',
      phone: user.phone || '',
      address: user.address || '',
    });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching user data', error: err.message });
  }
});

app.post('/add-details', async (req, res) => {
  try {
    const { email, dob, phone, address } = req.body;

    if (!email || !dob || !phone || !address) {
      return res.status(400).json({ message: 'Email, DOB, phone, and address are required' });
    }

    // Save the details to MongoDB
    const existingDetails = await Details.findOne({ email });
    if (existingDetails) {
      return res.status(400).json({ message: 'Details already added for this user' });
    }

    const newDetails = new Details({
      email,
      dob,
      phone,
      address,
    });

    await newDetails.save();
    res.status(201).json({ message: 'Details added successfully', data: newDetails });
  } catch (err) {
    res.status(500).json({ message: 'Error adding details', error: err.message });
  }
});

app.get('/get-user-details/:email', async (req, res) => {
  try {
    const { email } = req.params;
    const userDetails = await Details.findOne({ email });

    if (!userDetails) {
      return res.status(404).json({ message: 'No details found for this user' });
    }

    res.status(200).json({ message: 'User details fetched successfully', data: userDetails });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching details', error: err.message });
  }
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});