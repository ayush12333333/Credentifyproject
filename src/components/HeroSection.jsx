import React from "react";
import { Link } from "react-router-dom";
import Dashboard from "./Dashboard";
import logo from "../assets/A.jpg"; // Your logo
import Globe from "react-globe.gl"; // Import the Globe component from the library
import Footer from "../components/Footer";

const HeroSection = () => {
  const data = [
    {
      lat: 37.7749,
      lng: -122.4194,
      size: 10,
      color: "#ff0000",
    },
    {
      lat: 34.0522,
      lng: -118.2437,
      size: 10,
      color: "#00ff00",
    },
  ];

  const globeConfig = {
    globeColor: "#1d072e",
    showAtmosphere: true,
    atmosphereColor: "#ffffff",
    atmosphereAltitude: 0.1,
    polygonColor: "rgba(255,255,255,0.7)",
    autoRotate: true,
    autoRotateSpeed: 1,
  };

  return (
    <div className="bg-black text-white py-20 relative">
      <img
        src={logo}
        alt="Logo"
        className="absolute top-0 left-0 p-4 w-40 h-auto z-10"
      />
      <div className="container mx-auto flex flex-col md:flex-row items-center relative z-10">
        <div className="w-full md:w-1/2 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Secure Your Digital Identity with Credentify
          </h1>
          <p className="text-lg mb-6">
            Verify your identity easily and securely across various sectors like
            travel, healthcare, and finance.
          </p>
          <div>
            <Link
              to="/auth"
              className="bg-white text-blue-500 font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-gray-100 transition"
            >
              Get Started
            </Link>
            <Link
              to="/"
              className="ml-4 bg-transparent border border-white text-white font-semibold px-6 py-3 rounded-lg hover:bg-white hover:text-blue-500 transition"
            >
              Learn More
            </Link>
          </div>
        </div>
        {/* Globe Section */}
        <div className="w-full md:w-1/2 mt-10 mx-auto md:mt-0 relative">
          <div
            className="globe-container w-full h-[250px] md:h-[400px] mx-auto"
            style={{
              maxWidth: "400px",
              margin: "auto",
              overflow: "hidden", // Prevents white screen issue
            }}
          >
            <Globe
              globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
              arcsData={data}
              arcColor={(d) => d.color}
              arcAltitude={0.1}
              arcWidth={0.5}
              autoRotate={globeConfig.autoRotate}
              autoRotateSpeed={globeConfig.autoRotateSpeed}
              globeColor={globeConfig.globeColor}
              width={400} // Ensures the globe scales within the container
              height={400} // Maintains height
            />
            <Footer/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
