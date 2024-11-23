import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import image from "../assets/login.jpg";
import toast  from 'react-hot-toast';
import axios from 'axios';


const LoginSignup = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const toggleForm = () => setIsLogin(!isLogin);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const email = e.target[0].value;
    const password = e.target[1].value;
  
    if (!email || !password) {
      toast.error("Email and password are required");
      return;
    }
  
    try {
      if (isLogin) {
        // Login Request
        const response = await axios.post('http://localhost:5000/login', { email, password });
        toast.success("Logged in successfully!");
        
        // Save the JWT token if needed
        localStorage.setItem("token", response.data.token);
        navigate("/home");
      } else {
        // Signup Request
        const name = e.target[0].value; // For sign-up, first input will be name
        const response = await axios.post('http://localhost:5000/signup', {
          name,
          email: e.target[1].value,
          password: e.target[2].value,
        });
        toast.success("Signed up successfully!");
        setIsLogin(true); // Switch back to login form after successful signup
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
      console.error(error);
    }
  };

  const handleGoogleSuccess = (response) => {
    console.log("Google Login Success:", response);
    navigate("/home");
  };

  const handleGoogleFailure = (error) => {
    console.error("Google Login Failed:", error);
  };

  const handleBiometricAuth = async () => {
    try {
      // Step 1: Get WebAuthn options from the server
      const email = prompt("Enter your email to proceed with biometric login:");
      const authOptionsResponse = await fetch('http://localhost:5000/webauthn/generate-auth-options', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
  
      const authOptions = await authOptionsResponse.json();
  
      // Step 2: Request biometric authentication via WebAuthn
      const publicKeyCredential = await navigator.credentials.get({
        publicKey: {
          challenge: Uint8Array.from(authOptions.challenge, (c) => c.charCodeAt(0)),
          allowCredentials: authOptions.allowCredentials.map((cred) => ({
            id: Uint8Array.from(atob(cred.id), (c) => c.charCodeAt(0)),
            type: cred.type,
          })),
          userVerification: authOptions.userVerification,
        },
      });
  
      // Step 3: Convert the result to a format suitable for the backend
      const credentialResponse = {
        id: publicKeyCredential.id,
        rawId: btoa(String.fromCharCode(...new Uint8Array(publicKeyCredential.rawId))),
        type: publicKeyCredential.type,
        response: {
          authenticatorData: btoa(
            String.fromCharCode(...new Uint8Array(publicKeyCredential.response.authenticatorData))
          ),
          clientDataJSON: btoa(
            String.fromCharCode(...new Uint8Array(publicKeyCredential.response.clientDataJSON))
          ),
          signature: btoa(
            String.fromCharCode(...new Uint8Array(publicKeyCredential.response.signature))
          ),
          userHandle: publicKeyCredential.response.userHandle
            ? btoa(String.fromCharCode(...new Uint8Array(publicKeyCredential.response.userHandle)))
            : null,
        },
      };
  
      // Step 4: Verify the response with the backend
      const verifyResponse = await fetch('http://localhost:5000/webauthn/verify-auth-response', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, response: credentialResponse }),
      });
  
      const verifyResult = await verifyResponse.json();
  
      if (verifyResponse.ok) {
        toast.success(verifyResult.message);
        navigate("/home");
      } else {
        toast.error(verifyResult.message);
      }
    } catch (error) {
      console.error("Biometric authentication failed:", error);
      toast.error("Biometric authentication failed");
    }
  };
  
  

  return (
    <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
      <div
        className="min-h-screen flex items-center justify-center text-white bg-cover bg-center"
        style={{
          backgroundImage: `url(${image})`,
        }}
      >
        <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg text-gray-900 bg-opacity-20">
          <h2 className="text-2xl font-bold mb-6 text-center text-white">
            {isLogin ? "Welcome Back!" : "Join Us!"}
          </h2>
          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-white mb-2">Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter your name"
                />
              </div>
            )}
            <div className="mb-4">
              <label className="block text-sm font-medium text-white mb-2">Email</label>
              <input
                type="email"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter your email"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-white mb-2">Password</label>
              <input
                type="password"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter your password"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white font-semibold py-2 rounded-lg hover:bg-indigo-700 transition"
            >
              {isLogin ? "Login" : "Sign Up"}
            </button>
            {isLogin && (
              <div className="flex justify-between items-center mt-4">
                <button
                  type="button"
                  onClick={handleBiometricAuth}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                >
                  Use Biometric Login
                </button>
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={handleGoogleFailure}
                />
              </div>
            )}
            <p className="text-center text-sm text-white mt-4">
              {isLogin ? (
                <>
                  Don't have an account?{" "}
                  <button
                    type="button"
                    onClick={toggleForm}
                    className="text-blue-500 font-semibold hover:underline"
                  >
                    Sign up
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={toggleForm}
                    className="text-blue-500 font-semibold hover:underline"
                  >
                    Login
                  </button>
                </>
              )}
            </p>
          </form>
        </div>
      </div>
    </GoogleOAuthProvider>
   
  );
 
};

export default LoginSignup;
