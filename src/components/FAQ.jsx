"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqItems = [
    {
      question: "What is Saturday HackNight?",
      answer: "Saturday HackNight is a community-driven event where developers, designers, and tech enthusiasts come together to learn, build, and network. It's a perfect opportunity to work on exciting projects and collaborate with like-minded individuals."
    },
    {
      question: "Who can participate?",
      answer: "Anyone with an interest in technology can participate! Whether you're a student, professional, or hobbyist, all levels of experience are welcome."
    },
    {
      question: "What should I bring?",
      answer: "Bring your laptop, charger, and any other tools you might need for your project. We'll provide snacks, drinks, and a great atmosphere for learning and collaborating."
    },
    {
      question: "How do I register?",
      answer: "You can register by clicking the 'Register Now' button on our website. Fill out the registration form and follow the instructions to complete your registration."
    },
    {
      question: "Is there a registration fee?",
      answer: "No, Saturday HackNight is completely free to attend! We believe in making technology accessible to everyone."
    }
  ];

  return (
    <div className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-clash font-medium text-white mb-12">Frequently Asked Questions</h2>
        
        <div className="space-y-4">
          {faqItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-[#0A0A0F]/30 backdrop-blur-xl rounded-xl border border-[#0A0A0F]/20 overflow-hidden"
            >
              <button
                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                className="w-full flex items-center font-clash font-medium justify-between p-6 text-white hover:bg-[#0A0A0F]/40 transition-colors"
              >
                <span className="text-xl font-medium">{item.question}</span>
                <svg
                  className={`w-6 h-6 transform transition-transform duration-300 ${
                    activeIndex === index ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {activeIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="p-6 text-white/90"
                >
                  <p className="text-lg font-clash font-normal leading-relaxed">{item.answer}</p>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
