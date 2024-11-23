import React from "react";
import { QRCodeCanvas } from "qrcode.react"; // Correct named export

const DigitalPassportQR = ({ value }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg text-center">
      <h2 className="text-xl font-bold mb-4">Your Digital Passport QR Code</h2>
      <QRCodeCanvas value={value} size={150} className="mx-auto" />
      <p className="mt-2 text-gray-600">Scan this QR code for your digital passport.</p>
    </div>
  );
};

export default DigitalPassportQR;
