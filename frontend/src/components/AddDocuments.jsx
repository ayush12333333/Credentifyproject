import React, { useState } from "react";

const AddDocuments = () => {
  const [files, setFiles] = useState([]);

  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFiles = Array.from(event.dataTransfer.files);
    const acceptedFiles = droppedFiles.filter((file) => isValidFileType(file));
    setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.effectAllowed = "copy";
  };

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    const acceptedFiles = selectedFiles.filter((file) => isValidFileType(file));
    setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
  };

  const isValidFileType = (file) => {
    const allowedTypes = ["application/pdf", "image/jpeg", "image/png"];
    return allowedTypes.includes(file.type);
  };

  const handleRemoveFile = (fileToRemove) => {
    const updatedFiles = files.filter((file) => file !== fileToRemove);
    setFiles(updatedFiles);
  };

  const displayUploadedFiles = (
    <div className="mt-4 space-y-2">
      {files.length === 0 ? (
        <p className="text-gray-500 italic">No files uploaded yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {files.map((file, index) => (
            <div key={index} className="flex items-center justify-between bg-white p-3 shadow rounded">
              <div className="truncate">{file.name}</div>
              <button
                className="text-red-500 hover:text-red-700 focus:outline-none"
                onClick={() => handleRemoveFile(file)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="p-8 bg-white shadow-lg rounded-lg max-w-3xl mx-auto">
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className="border-dashed border-4 border-blue-400 bg-blue-50 p-8 text-center rounded-md hover:bg-blue-100 transition duration-300"
        style={{ cursor: "pointer" }}
      >
        <p className="text-gray-600 mb-2">
          Drag & Drop files here or <span className="font-semibold">click to upload</span> supported documents (PDF, JPG, PNG)
        </p>
        <input
          type="file"
          multiple
          onChange={handleFileChange}
          className="hidden"
          id="fileUpload"
        />
        <label
          htmlFor="fileUpload"
          className="inline-block mt-2 text-blue-500 font-semibold cursor-pointer hover:underline"
        >
          Browse files
        </label>
      </div>
      {displayUploadedFiles}
    </div>
    
  );
};

export default AddDocuments;
