import React, { useState } from "react";
import Navbar from "./Navbar";
import DigitalPassportQR from "./DigitalPassportQR";
import ChatbotComponent from "./Chatbot";
import image from "../assets/homepage.jpeg";

const HomePage = () => {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false); // State to toggle chatbot visibility
  const qrValue = "https://your-digital-passport-link.com";

  // Sample user data
  const user = {
    name: "John Doe",
    phone: "+9198526341xx",
    dob: "01/01/1990",
    address: "123 Main St, Anytown, USA",
    image: "https://randomuser.me/api/portraits/men/1.jpg", // Example profile image URL
  };

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

        {/* User Details and QR Code Section */}
        <section className="flex flex-col md:flex-row justify-between items-center p-6 gap-8">
  {/* User Details with Blurred Background */}
  <div className="relative flex items-center justify-center md:w-1/2 h-80 bg-white bg-opacity-10 backdrop-blur-md rounded-lg p-6 shadow-lg">
    <div className="text-center space-y-4">
      <img
        src={user.image}
        alt="User"
        className="w-32 h-32 rounded-full mx-auto"
      />
      <h2 className="text-2xl font-bold text-white">{user.name}</h2>
      <p className="text-lg text-white">Phone: {user.phone}</p>
      <p className="text-lg text-white">DOB: {user.dob}</p>
      <p className="text-lg text-white">Address: {user.address}</p>
    </div>
  </div>

  {/* QR Code with Blurred Background */}
  <div className="relative flex items-center justify-center md:w-1/2 h-80 bg-white bg-opacity-10 backdrop-blur-md rounded-lg p-6 shadow-lg">
    <DigitalPassportQR value={qrValue} />
  </div>
</section>




        {/* "May I Help You" Button */}
        <div className="fixed bottom-6 right-6 z-50">
          <button
            className="bg-indigo-600 text-white rounded-full p-4 shadow-lg hover:bg-indigo-700 focus:outline-none transition-transform transform hover:scale-105"
            onClick={toggleChatbot} // Toggle chatbot visibility
          >
            May I help you?
          </button>
        </div>

        {/* Chatbot Section */}
        {isChatbotOpen && (
          <section className="fixed bottom-20 right-6 bg-white rounded-lg shadow-lg p-4 w-80 z-50">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-bold">How can I assist you?</h2>
              <button
                className="text-red-600 font-bold cursor-pointer z-10"
                onClick={toggleChatbot} // Close chatbot
              >
                x
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
