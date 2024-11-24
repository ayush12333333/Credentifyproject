import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const AddDetails = () => {
  const [formData, setFormData] = useState({
    dob: '',
    phone: '',
    address: '',
  });

  const navigate = useNavigate();

  // Get user email from localStorage (ensure this is set correctly after login)
  const userEmail = localStorage.getItem('userEmail');
  const token = localStorage.getItem('authToken');

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if the email is set correctly in localStorage
    if (!userEmail) {
      toast.error('User email is missing!');
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:5000/add-details',
        {
          email: userEmail,  // Send email from localStorage
          ...formData,       // Include dob, phone, and address from form
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(response.data.message);
      navigate('/dashboard');  // Redirect to the dashboard after successful addition
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error adding details');
    }
  };

  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6">Add Details</h2>
        <form onSubmit={handleSubmit}>
          <label className="block mb-4">
            <span className="block text-sm">Date of Birth</span>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              required
              className="w-full p-2 rounded-lg border"
            />
          </label>
          <label className="block mb-4">
            <span className="block text-sm">Phone</span>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full p-2 rounded-lg border"
            />
          </label>
          <label className="block mb-4">
            <span className="block text-sm">Address</span>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              className="w-full p-2 rounded-lg border"
            ></textarea>
          </label>
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg">
            Save Details
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddDetails;
