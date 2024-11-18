import React, { useState } from "react";

const AddFace = () => {
  const [faceImage, setFaceImage] = useState(null);

  const handleFaceChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFaceImage(file);
      console.log("Face image uploaded:", file.name);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg max-w-md mx-auto mt-6">
      <h2 className="text-2xl font-bold mb-4">Add Your Face</h2>
      <input
        type="file"
        accept="image/*"
        onChange={handleFaceChange}
        className="mb-4 block w-full text-sm text-gray-600"
      />
      {faceImage && (
        <div className="mt-2">
          <p className="text-green-600 font-medium">File Uploaded: {faceImage.name}</p>
        </div>
      )}
    </div>
  );
};

export default AddFace;
