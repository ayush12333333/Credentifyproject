import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
import backgroundImage from "../assets/homepage.jpeg"; 


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
  });

  const navigate = useNavigate(); // Hook for navigation

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Logging the form data to verify submission
    console.log("Form Data Submitted:", formData);

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
    });

    // Redirect to Homepage
    toast.success("Details added successfully");
    navigate("/home");
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
    <div className="min-h-screen bg-gray-200 flex items-center justify-center p-6"
     style={{
      maxWidth: "600px", // Set a max-width to control the form size
      width: "100%", // Ensure it takes full width up to the max-width
    }}>
      <div className="bg-richblack-800 shadow-lg rounded-lg p-8 w-full max-w-2xl">
        <h2 className="text-3xl font-bold text-richblack-5 text-center mb-6">Add Details</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-y-4">
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

          <label className="w-full">
            <p className="text-[0.875rem] text-richblack-5 mb-1">Date of Birth<sup className='text-pink-600'>*</sup></p>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              className="bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]"
              required
            />
          </label>

          <label className="w-full">
            <p className="text-[0.875rem] text-richblack-5 mb-1">Father's Name<sup className='text-pink-600'>*</sup></p>
            <input
              type="text"
              name="fathersName"
              placeholder="Enter Father's Name"
              value={formData.fathersName}
              onChange={handleChange}
              className="bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]"
              required
            />
          </label>

          <label className="w-full">
            <p className="text-[0.875rem] text-richblack-5 mb-1">Mother's Name<sup className='text-pink-600'>*</sup></p>
            <input
              type="text"
              name="mothersName"
              placeholder="Enter Mother's Name"
              value={formData.mothersName}
              onChange={handleChange}
              className="bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]"
              required
            />
          </label>

          <label className="w-full">
            <p className="text-[0.875rem] text-richblack-5 mb-1">Phone Number<sup className='text-pink-600'>*</sup></p>
            <input
              type="text"
              name="contactNo"
              placeholder="Enter Phone Number"
              value={formData.contactNo}
              onChange={handleChange}
              className="bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]"
              required
            />
          </label>

          <label className="w-full">
            <p className="text-[0.875rem] text-richblack-5 mb-1">Address<sup className='text-pink-600'>*</sup></p>
            <input
              type="text"
              name="address"
              placeholder="Enter Address"
              value={formData.address}
              onChange={handleChange}
              className="bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]"
              required
            />
          </label>

          <label className="w-full">
            <p className="text-[0.875rem] text-richblack-5 mb-1">Country<sup className='text-pink-600'>*</sup></p>
            <input
              type="text"
              name="country"
              placeholder="Enter Country"
              value={formData.country}
              onChange={handleChange}
              className="bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]"
              required
            />
          </label>

          <label className="w-full">
            <p className="text-[0.875rem] text-richblack-5 mb-1">Religion<sup className='text-pink-600'>*</sup></p>
            <input
              type="text"
              name="religion"
              placeholder="Enter Religion"
              value={formData.religion}
              onChange={handleChange}
              className="bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]"
              required
            />
          </label>

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
