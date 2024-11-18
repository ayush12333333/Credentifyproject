import React from "react";
import { Link, useNavigate } from "react-router-dom";
import toast  from 'react-hot-toast';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log("User logged out");
    toast.success("Logout Successfully");
    navigate("/"); // Redirect to the homepage or login route
  };

  return (
    <nav className="bg-indigo-600 text-white py-4 px-6 flex justify-between items-center shadow-lg">
      <h1 className="text-2xl font-bold">Digital Passport</h1>
      <ul className="flex space-x-6">
        <li>
          <Link to="/AddDetails" className="hover:underline">
            Add Details
          </Link>
        </li>
        <li>
          <Link to="/get-digital-passport" className="hover:underline">
            Generate Digital Passport
          </Link>
        </li>
        <li>
          <Link to="/update-details" className="hover:underline">
            Update Details
          </Link>
        </li>
        <li>
          <Link to="/add-documents" className="hover:underline">
            Add Documents
          </Link>
        </li>
        <li>
          <Link to="/biometric-details" className="hover:underline">
            Biometric Details
          </Link>
        </li>
        <li>
          <Link to="/add-face" className="hover:underline">
            Add Face
          </Link>
        </li>
        <li>
          <button onClick={handleLogout} className="hover:underline">
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
