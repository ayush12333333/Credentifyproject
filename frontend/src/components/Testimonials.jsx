import React from "react";
import avatar from "../assets/avatar.jpg";

const testimonials = [
  {
    name: "John Doe",
    feedback:
      "Credentify is a game-changer! It's easy to use and keeps my data secure.",
    image: `${avatar}`,
  },
  {
    name: "Jane Smith",
    feedback:
      "I love how I can control who accesses my information. Total peace of mind!",
    image: `${avatar}`,
  },
];

const Testimonials = () => {
  return (
    <div className="py-16 bg-black">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-white text-center mb-8">What Users Say</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-gray-400 p-6 rounded-lg shadow-md flex items-center"
            >
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-16 h-16 rounded-full mr-4"
              />
              <div>
                <p className="text-white mb-2">{testimonial.feedback}</p>
                <h4 className="font-semibold">{testimonial.name}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
