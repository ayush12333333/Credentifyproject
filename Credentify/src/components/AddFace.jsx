import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom"; // Import for navigation
import { Upload, ImageIcon } from "lucide-react";
import image from "../assets/face.jpg.jpg";
import toast from 'react-hot-toast';

const AddFace = () => {
  const [faceImage, setFaceImage] = useState(null);
  const fileInputRef = useRef(null);
  const navigate = useNavigate(); // For navigation

  const handleFaceChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setFaceImage(file);
      console.log("Face image uploaded:", file.name);
    } else {
      console.error("Invalid file type. Please upload an image.");
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const file = event.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      setFaceImage(file);
    } else {
      console.error("Invalid file type. Please upload an image.");
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const handleSave = () => {
    // Show toaster notification and navigate
    toast.success("Image saved successfully");
    navigate("/home");
  };

  return (
    <div
      className="relative w-full h-screen bg-cover bg-center flex items-center justify-end"
      style={{
        backgroundImage: `url(${image})`, // Corrected syntax
      }}
    >
      <div className="w-1/3 h-full bg-black/80 backdrop-blur-sm p-4 flex flex-col justify-center items-center">
        <div
          className="w-full max-w-md p-8 bg-white/10 rounded-xl border border-white/20 shadow-2xl text-center"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <ImageIcon className="mx-auto mb-4 w-16 h-16 text-blue-400" />
          <h2 className="text-3xl font-bold mb-4 text-white">Add Your Face</h2>

          <input
            type="file"
            accept="image/*"
            onChange={handleFaceChange}
            ref={fileInputRef}
            className="hidden"
          />

          <div
            onClick={triggerFileInput}
            className="cursor-pointer border-2 border-dashed border-white/30 hover:border-blue-400 transition-all duration-300 p-6 rounded-lg"
          >
            {faceImage ? (
              <div className="flex flex-col items-center">
                <p className="text-green-400 font-medium mb-2">
                  {faceImage.name}
                </p>
                <img
                  src={URL.createObjectURL(faceImage)}
                  alt="Uploaded"
                  className="max-w-full max-h-48 rounded-md mt-2"
                />
              </div>
            ) : (
              <div className="flex flex-col items-center text-white/70">
                <Upload className="w-10 h-10 mb-2" />
                <p>Drag and drop or click to upload</p>
                <p className="text-sm mt-1">Supported formats: PNG, JPG, JPEG</p>
              </div>
            )}
          </div>

          {faceImage && (
            <>
              <button
                onClick={() => setFaceImage(null)}
                className="mt-4 w-full py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
              >
                Remove Image
              </button>

              <button
                onClick={handleSave}
                className="mt-4 w-full py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
              >
                Save
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddFace;
