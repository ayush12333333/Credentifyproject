import React from "react";
import { motion } from "framer-motion";  // Import Framer Motion

const DigitalIdentityInfo = () => {
  const features = [
    "Biometric Authentication (Face, Fingerprint, or Iris Recognition)",
    "Encrypted Data Storage",
    "Zero-Knowledge Proofs for Privacy",
    "Global Interoperability",
    "Document Verification (Passports, IDs, etc.)",
    "User-Controlled Data Access",
  ];

  const benefits = [
    "Improved security by eliminating the need for physical documents.",
    "Faster verification processes for travel, healthcare, and finance.",
    "Greater privacy control with user-driven permissions.",
    "Reduced identity theft and fraud risks.",
    "Convenience of accessing verified credentials anywhere in the world.",
    "Support for remote and digital-first interactions.",
  ];

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <motion.div
        className="container mx-auto max-w-4xl  text-white rounded-lg shadow-lg p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.h1
          className="text-3xl font-bold text-center mb-6 text-indigo-600"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          Understanding Digital Identity
        </motion.h1>

        <motion.p
          className="text-lg mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
        >
          A <strong>Digital Identity</strong> is a virtual representation of an
          individual or organization. It allows secure verification of identity
          using advanced technologies like biometrics, encryption, and
          blockchain. Digital identity systems are transforming how we interact
          with the world, making processes faster, safer, and more convenient.
        </motion.p>

        <motion.h2
          className="text-2xl font-semibold mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4 }}
        >
          Features of Digital Identity
        </motion.h2>
        <motion.ul
          className="list-disc list-inside mb-6 space-y-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.6 }}
        >
          {features.map((feature, index) => (
            <motion.li
              key={index}
              className="text-white"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {feature}
            </motion.li>
          ))}
        </motion.ul>

        <motion.h2
          className="text-2xl font-semibold mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.8 }}
        >
          Benefits of Digital Identity
        </motion.h2>
        <motion.ul
          className="list-disc list-inside space-y-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
        >
          {benefits.map((benefit, index) => (
            <motion.li
              key={index}
              className="text-white"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {benefit}
            </motion.li>
          ))}
        </motion.ul>

        <motion.div
          className="mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2.2 }}
        >
          <h3 className="text-xl font-semibold mb-2 text-indigo-600">
            Why It Matters?
          </h3>
          <p className="text-white">
            Digital identities play a critical role in enhancing security and
            efficiency. They enable individuals and organizations to verify
            themselves remotely, simplifying interactions while maintaining high
            standards of privacy and security.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default DigitalIdentityInfo;
