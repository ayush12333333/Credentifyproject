import React, { useState, useEffect, useRef } from 'react';
import toast from 'react-hot-toast';
import { Fingerprint, CheckCircle2, Loader2 } from 'lucide-react';
import image from '../assets/finger.jpg';

const BiometricDetails = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isScanned, setIsScanned] = useState(false);

  const intervalRef = useRef(null);

  const handleThumbScan = () => {
    if (isScanning || isScanned) return;

    setIsScanning(true);
    setProgress(0);

    intervalRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(intervalRef.current);
          setIsScanning(false);
          setIsScanned(true);
          toast.success('Thumbprint scanned successfully!');
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  const resetScan = () => {
    setIsScanned(false);
    setIsScanning(false);
    setProgress(0);
    toast("Ready to scan a new thumbprint!", {
      icon: "🖐️",
    });
  };

  useEffect(() => {
    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <div
      className="relative min-h-screen w-full bg-cover bg-center flex items-center justify-end"
      style={{
        backgroundImage: `url(${image})`, // Replace with your actual background image
      }}
    >
      <div className="w-full md:w-1/2 lg:w-1/3 h-full bg-black/80 backdrop-blur-sm p-6 md:p-8 flex items-center justify-center">
        <div className="w-full max-w-md bg-white/10 rounded-xl border border-white/20 shadow-2xl p-6 md:p-8 text-center">
          <div className="mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
              Biometric Verification
            </h1>
            <p className="text-white/70 text-sm md:text-base">
              Scan your thumbprint for authentication
            </p>
          </div>

          {!isScanned ? (
            <div className="space-y-6">
              <div
                className={`mx-auto w-48 h-48 md:w-56 md:h-56 rounded-full border-4 border-dashed flex items-center justify-center relative 
                ${isScanning 
                  ? "border-blue-500 animate-pulse" 
                  : "border-white/30 hover:border-blue-500 transition-all"}`}
              >
                {isScanning ? (
                  <div className="flex flex-col items-center">
                    <Loader2 className="w-16 h-16 text-blue-500 animate-spin" />
                    <p className="text-blue-500 font-bold mt-4">Scanning...</p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <Fingerprint className="w-16 h-16 text-white/70" />
                    <p className="text-white/70 mt-4">Place Thumb</p>
                  </div>
                )}

                {isScanning && (
                  <div
                    className="absolute inset-0 rounded-full border-4 border-blue-500 opacity-50 animate-ping"
                  ></div>
                )}
              </div>

              <div className="space-y-4">
                {isScanning && (
                  <div className="w-full bg-white/20 h-3 rounded-full overflow-hidden">
                    <div
                      className="bg-blue-500 h-full transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                )}

                <button
                  onClick={handleThumbScan}
                  className={`w-full py-3 rounded-lg text-white font-bold transition-all duration-300 
                  ${isScanning 
                    ? "bg-gray-500 cursor-not-allowed" 
                    : "bg-blue-600 hover:bg-blue-700 active:scale-95"}`}
                  disabled={isScanning}
                >
                  {isScanning ? "Scanning..." : "Scan Thumbprint"}
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-6 text-center">
              <div className="flex justify-center mb-4">
                <CheckCircle2 className="w-24 h-24 text-green-500" />
              </div>
              <h2 className="text-2xl font-bold text-green-500 mb-2">
                Thumbprint Verified
              </h2>
              <p className="text-white/70 mb-6">
                Your biometric data has been successfully captured.
              </p>
              <button
                onClick={resetScan}
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all active:scale-95"
              >
                Scan Another Thumbprint
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BiometricDetails;