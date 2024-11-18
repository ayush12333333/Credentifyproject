import React, { useState } from "react";
import Navbar from "./Navbar";
import DigitalPassportQR from "./DigitalPassportQR";
import ChatbotComponent from "./Chatbot";
import image from "../assets/homepage.jpeg";

const HomePage = () => {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false); // State to toggle chatbot visibility
  const qrValue = "https://your-digital-passport-link.com";

  const toggleChatbot = () => {
    setIsChatbotOpen((prevState) => !prevState);
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url(${image})`, // Set your hero image as background
      }}
    >
      {/* Fixed Navbar */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <Navbar />
      </div>

      {/* Main Content */}
      <div className="pt-20 p-6 space-y-6 max-w-7xl mx-auto">
        {/* Hero Section */}
        <section className="bg-black bg-opacity-60 text-white p-6 rounded-lg shadow-lg">
          <h1 className="text-4xl font-bold">Welcome to Your Dashboard!</h1>
          <p className="mt-2 text-lg">
            Manage your digital identity effortlessly with our secure and user-friendly platform.
          </p>
        </section>

        {/* Digital Passport QR Code Section */}
        <section className="flex justify-center">
          <DigitalPassportQR value={qrValue} />
        </section>

        {/* "May I Help You" Button */}
        <div className="fixed bottom-6 right-6 z-50">
          <button
            className="bg-indigo-600 text-white rounded-full p-4 shadow-lg hover:bg-indigo-700 focus:outline-none transition-transform transform hover:scale-105"
            onClick={toggleChatbot} // Toggle chatbot visibility
          >
            May I help you
          </button>
        </div>

        {/* Chatbot Section */}
        {isChatbotOpen && (
          <section className="fixed bottom-20 right-6 bg-white rounded-lg shadow-lg p-4 w-80 z-50">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-bold">How can I assist you?</h2>
              <button
                className="text-red-600 font-bold cursor-pointer"
                onClick={toggleChatbot} // Close chatbot
              >
                ✕
              </button>
            </div>
            <ChatbotComponent />
          </section>
        )}
      </div>
    </div>
  );
};

export default HomePage;
