import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import DigitalPassportQR from './DigitalPassportQR';
import ChatbotComponent from './Chatbot';
import image from '../assets/homepage.jpeg';
import axios from 'axios';

const HomePage = () => {
  const [user, setUser] = useState({
    name: '',
    phone: '',
    dob: '',
    address: '',
    image: 'https://randomuser.me/api/portraits/men/1.jpg', // Default profile image
  });
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const qrValue = 'https://your-digital-passport-link.com';

  const toggleChatbot = () => {
    setIsChatbotOpen((prevState) => !prevState);
  };

  // Fetch user data from the backend
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const email = localStorage.getItem('userEmail'); // Assuming email is stored in localStorage during signup
        const response = await axios.get(`http://localhost:5000/user/${email}`);
        setUser(response.data);
      } catch (err) {
        console.error('Error fetching user data:', err);
      }
    };

    fetchUserData();
  }, []);

  const addDetails = async (details) => {
    try {
      await axios.post('http://localhost:5000/add-details', details);
      fetchUserDetails(); // Re-fetch user data after updating
    } catch (error) {
      console.error('Error adding details:', error);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url(${image})`,
      }}
    >
      <div className="fixed top-0 left-0 right-0 z-50">
        <Navbar />
      </div>

      <div className="pt-20 p-6 space-y-6 max-w-7xl mx-auto">
        <section className="bg-black bg-opacity-60 text-white p-6 rounded-lg shadow-lg">
          <h1 className="text-4xl font-bold">Welcome to Your Dashboard, {user.name}!</h1>
          <p className="mt-2 text-lg">
            Manage your digital identity effortlessly with our secure and user-friendly platform.
          </p>
        </section>

        <section className="flex flex-col md:flex-row justify-between items-center p-6 gap-8">
          <div className="relative flex items-center justify-center md:w-1/2 h-80 bg-white bg-opacity-10 backdrop-blur-md rounded-lg p-6 shadow-lg">
            <div className="text-center space-y-4">
              <img src={user.image} alt="User" className="w-32 h-32 rounded-full mx-auto" />
              <h2 className="text-2xl font-bold text-white">{user.name}</h2>
              <p className="text-lg text-white">Phone: 9519545737</p>
              <p className="text-lg text-white">DOB: 12/02/2004</p>
              <p className="text-lg text-white">Address: Greater Noida</p>
            </div>
          </div>

          <div className="relative flex items-center justify-center md:w-1/2 h-80 bg-white bg-opacity-10 backdrop-blur-md rounded-lg p-6 shadow-lg">
            <DigitalPassportQR value={qrValue} />
          </div>
        </section>

        <div className="fixed bottom-6 right-6 z-50">
          <button
            className="bg-indigo-600 text-white rounded-full p-4 shadow-lg hover:bg-indigo-700 focus:outline-none transition-transform transform hover:scale-105"
            onClick={toggleChatbot}
          >
            May I help you?
          </button>
        </div>

        {isChatbotOpen && (
          <section className="fixed bottom-20 right-6 bg-white rounded-lg shadow-lg p-4 w-80 z-50">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-bold">How can I assist you?</h2>
              <button
                className="text-red-600 font-bold cursor-pointer z-10"
                onClick={toggleChatbot}
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
