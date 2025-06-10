"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqItems = [
    {
      question: "What is Saturday HackNight?",
      answer: (
        <>
          Saturday HackNight is a biweekly community-driven hackathon (held every other Saturday from 6–11 PM IST), where developers, designers, and tech enthusiasts collaborate to build projects around a new API, tool, or framework each edition.
        </>
      )
    },
    {
      question: "Who can participate?",
      answer: (
        <>
          Saturday HackNight is specifically designed for beginners who want to explore new technologies. We believe in learning by building, so you'll get hands-on experience while discovering what excites you most in the tech world.
          No prior experience required – just bring your curiosity and enthusiasm to learn!
        </>
      )
    },
    {
      question: "Is Saturday HackNight conducted online or offline?",
      answer: (
        <>
          Saturday HackNight follows a cycle of 5 online hackathons, followed by an invite-only offline hackathon held at TinkerSpace Kochi. After the offline event, the cycle repeats with another set of 5 online hackathons. This pattern continues to balance both virtual and in-person collaboration opportunities.
        </>
      )
    },
    {
      question: "How can I get an invite to the offline edition of Saturday HackNight?",
      answer: (
        <>
         To receive an invite to the offline hackathon, you must complete and submit a project in at least one of the five online HackNight events in a given cycle. Successful participation in an online edition makes you eligible for the subsequent invite-only offline hackathon held at TinkerSpace Kochi.
        </>
      )
    },
    {
      question: "How do I register?",
      answer: (
        <>
          Registration for Saturday HackNight is quick and easy!
          <div className='block mt-4'>Method 1: Through the Hub App</div>
          <ol className='mt-4 list-decimal list-inside'>
            <li>Open the Hub app and navigate to the landing page</li>
            <li>Look for 'Study Jams' in the top right corner and click on it</li>
            <li>You'll see Saturday HackNight listed as an Active event</li>
            <li>Select 'Saturday HackNight' from the list</li>
            <li>Click the 'Join Now' button</li>
          </ol>
          <div className='mt-4'>That's it! You're now registered for Saturday HackNight</div>
          <div className='block mt-4'>Method 2: Direct Registration</div>
          <ol className='mt-4 list-decimal list-inside'>
            <li>Simply click the 'Register Now' button on our website</li>
            <li>You'll be automatically redirected to the Hub app's Saturday HackNight page</li>
            <li>Complete your registration there</li>
          </ol>
          <div className='mt-4'>Both methods will get you registered and ready to join our exciting Saturday HackNight sessions. Welcome to the community!</div>
        </>
      )
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
