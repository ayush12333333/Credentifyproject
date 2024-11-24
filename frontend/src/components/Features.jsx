import React from "react";
import { motion } from "framer-motion"; // Import Framer Motion

const features = [
  {
    title: "Biometric Verification",
    description:
      "Authenticate using face, fingerprint, or iris scanning for unparalleled security.",
    icon: "👤",
  },
  {
    title: "Global Interoperability",
    description:
      "Use your digital passport seamlessly across industries worldwide.",
    icon: "🌍",
  },
  {
    title: "Privacy Control",
    description:
      "Decide who can access your data and ensure privacy with zero-knowledge proofs.",
    icon: "🔒",
  },
];

const Features = () => {
  return (
    <div className="py-16 bg-black">
      <div className="container mx-auto">
        <motion.h2
          className="text-3xl font-bold text-center mb-8 text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          Features
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md text-center"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: index * 0.3, // Add a delay for a staggered effect
                type: "spring",
                stiffness: 200,
              }}
              whileHover={{ scale: 1.05 }} // Scale up on hover
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <motion.h3
                className="text-xl font-semibold mb-2"
                whileHover={{ color: "#4c6ef5" }} // Change color on hover
                transition={{ duration: 0.3 }}
              >
                {feature.title}
              </motion.h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
