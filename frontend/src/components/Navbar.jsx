import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Navbar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    console.log("User logged out");
    toast.success("Logout Successfully");
    navigate("/"); // Redirect to the homepage or login route
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <nav className="bg-indigo-600 text-white py-4 px-6 flex justify-between items-center shadow-lg">
      {/* Logo */}
      <h1 className="text-2xl font-bold">Digital Passport</h1>

      {/* Hamburger Icon for Small Screens */}
      <button
        className="text-3xl lg:hidden"
        onClick={toggleMenu}
        aria-label="Toggle Menu"
      >
        ☰
      </button>

      {/* Navigation Links */}
      <ul
        className={`lg:flex lg:items-center lg:space-x-6 absolute lg:static top-16 left-0 w-full lg:w-auto bg-indigo-600 lg:bg-transparent transition-transform duration-300 ${
          isMenuOpen ? "flex flex-col items-center" : "hidden"
        }`}
      >
        <li className="py-2 lg:py-0">
          <Link to="/AddDetails" className="hover:underline">
            Add Details
          </Link>
        </li>
        <li className="py-2 lg:py-0">
          <Link to="/get-digital-passport" className="hover:underline">
            Generate Digital Passport
          </Link>
        </li>
        <li className="py-2 lg:py-0">
          <Link to="/update-details" className="hover:underline">
            Update Details
          </Link>
        </li>
        <li className="py-2 lg:py-0">
          <Link to="/add-documents" className="hover:underline">
            Add Documents
          </Link>
        </li>
        <li className="py-2 lg:py-0">
          <Link to="/biometric-details" className="hover:underline">
            Biometric Details
          </Link>
        </li>
        <li className="py-2 lg:py-0">
          <Link to="/add-face" className="hover:underline">
            Add Face
          </Link>
        </li>
        <li className="py-2 lg:py-0">
          <button onClick={handleLogout} className="hover:underline">
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
