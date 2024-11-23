import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
import backgroundImage from "../assets/homepage.jpeg"; 
import axios from 'axios';

const AddDetails = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    fathersName: "",
    mothersName: "",
    contactNo: "",
    address: "",
    country: "",
    religion: "",
    email: "", // Add email for registration
    password: "", // Add password for registration
  });

  const navigate = useNavigate(); // Hook for navigation

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Sending form data to the backend for user registration
      const response = await axios.post('http://localhost:5000/signup', {
        name: formData.firstName + ' ' + formData.lastName,
        email: formData.email,
        password: formData.password,
      });

      console.log("Signup Response:", response.data);
      toast.success("User signed up successfully");

      // Clear form data
      setFormData({
        firstName: "",
        lastName: "",
        dob: "",
        fathersName: "",
        mothersName: "",
        contactNo: "",
        address: "",
        country: "",
        religion: "",
        email: "",
        password: "",
      });

      // Redirect to Homepage
      navigate("/home");

    } catch (err) {
      console.error("Error during sign up:", err.response?.data || err);
      toast.error(err.response?.data?.message || "Error signing up");
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        minHeight: "100vh",
      }}
      className="flex justify-center items-center p-6"
    >
      <div
        className="min-h-screen bg-gray-200 flex items-center justify-center p-6"
        style={{
          maxWidth: "600px",
          width: "100%",
        }}
      >
        <div className="bg-richblack-800 shadow-lg rounded-lg p-8 w-full max-w-2xl">
          <h2 className="text-3xl font-bold text-richblack-5 text-center mb-6">Add Details</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-y-4">
            {/* First Name, Last Name */}
            <label className="w-full">
              <p className="text-[0.875rem] text-richblack-5 mb-1">First Name<sup className='text-red-600'>*</sup></p>
              <input
                type="text"
                name="firstName"
                placeholder="Enter First Name"
                value={formData.firstName}
                onChange={handleChange}
                className="bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]"
                required
              />
            </label>

            <label className="w-full">
              <p className="text-[0.875rem] text-richblack-5 mb-1">Last Name<sup className='text-red-600'>*</sup></p>
              <input
                type="text"
                name="lastName"
                placeholder="Enter Last Name"
                value={formData.lastName}
                onChange={handleChange}
                className="bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]"
                required
              />
            </label>

            {/* Email and Password */}
            <label className="w-full">
              <p className="text-[0.875rem] text-richblack-5 mb-1">Email<sup className='text-red-600'>*</sup></p>
              <input
                type="email"
                name="email"
                placeholder="Enter Email"
                value={formData.email}
                onChange={handleChange}
                className="bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]"
                required
              />
            </label>

            <label className="w-full">
              <p className="text-[0.875rem] text-richblack-5 mb-1">Password<sup className='text-red-600'>*</sup></p>
              <input
                type="password"
                name="password"
                placeholder="Enter Password"
                value={formData.password}
                onChange={handleChange}
                className="bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]"
                required
              />
            </label>

            {/* Other fields */}
            <label className="w-full">
              <p className="text-[0.875rem] text-richblack-5 mb-1">Date of Birth</p>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                className="bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]"
              />
            </label>

            {/* Submit Button */}
            <button className="bg-yellow-200 rounded-[8px] font-medium text-richblack-900 px-[12px] py-[8px] mt-4">
              Save Details
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddDetails;
