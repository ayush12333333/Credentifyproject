import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import image from "../assets/login.jpg";

const LoginSignup = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const toggleForm = () => setIsLogin(!isLogin);

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/home");
  };

  return (
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
          <p className="text-center text-sm text-white mt-4">
            {isLogin ? (
              <>
                Don't have an account? {" "}
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
                Already have an account? {" "}
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
  );
};

export default LoginSignup;
