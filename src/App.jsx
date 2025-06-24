import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginSignup from "./components/LoginSignup";
import Dashboard from "./components/Dashboard";
import Footer from "./components/Footer";
import HomePage from "./components/Homepage";
import AddDocuments from "./components/AddDocuments";
import AddDetails from "./components/Adddetails";
import { Toaster } from "react-hot-toast";
import BiometricDetails from "./components/BiometricDetails";
import AddFace from "./components/AddFace";


function App() {
  return (
    <>
      <Toaster />
      <Router>
        <Routes>
          {/* Home Page */}
          <Route path="/" element={<Dashboard />} />
          <Route path="/auth" element={<LoginSignup />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/add-documents" element={<AddDocuments />} />
          <Route path="/AddDetails" element={<AddDetails />} />
          <Route path="/biometric-details" element={<BiometricDetails />} />
          <Route path="/add-face" element={<AddFace />} />
        </Routes>
      </Router>
      
    </>
  );
}

export default App;