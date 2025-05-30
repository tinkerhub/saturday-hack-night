import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import letxploreImg from '../assets/images/letxplore.jpg';
import shnImg from '../assets/images/SHN.jpg';

const Register = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  const steps = [
    {
      step: "1",
      title: "Join LetXplore",
      content: "Start your journey by joining our LetXplore community. Learn, build, and grow with fellow developers.",
      image: letxploreImg
    },
    {
      step: "2",
      title: "Build Projects",
      content: "Participate in hands-on sessions and build real-world projects that showcase your skills.",
      image: shnImg
    },
    {
      step: "3",
      title: "Get Invited",
      content: "Show your dedication and skills to receive an exclusive invite to Saturday HackNight.",
      image: letxploreImg
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      if (progress < 100) {
        setProgress((prev) => prev + 100 / (3000 / 100));
      } else {
        setCurrentStep((prev) => (prev + 1) % steps.length);
        setProgress(0);
      }
    }, 100);

    return () => clearInterval(timer);
  }, [progress]);

  return (
    <div className="w-full py-20 bg-[#0A0A0F]">
      <div className="max-w-7xl mx-auto w-full px-4">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-clash font-bold mb-10 text-center text-[#FFFFE3]">
          How to Get Started
        </h2>

        <div className="flex flex-col md:grid md:grid-cols-2 gap-6 md:gap-10">
          <div className="order-2 md:order-1 space-y-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                className="flex items-center gap-6 md:gap-8"
                initial={{ opacity: 0.3 }}
                animate={{ opacity: index === currentStep ? 1 : 0.3 }}
                transition={{ duration: 0.5 }}
              >
                <motion.div
                  className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center border-2 ${
                    index === currentStep
                      ? "bg-blue-500 border-blue-500 text-white scale-110"
                      : "bg-gray-800 border-gray-600"
                  }`}
                >
                  {index <= currentStep ? (
                    <span className="text-lg font-bold">✓</span>
                  ) : (
                    <span className="text-lg font-semibold">{index + 1}</span>
                  )}
                </motion.div>

                <div className="flex-1">
                  <h3 className="text-xl md:text-2xl font-clash font-semibold text-[#FFFFE3]">
                    {step.title}
                  </h3>
                  <p className="text-sm md:text-lg text-[#FFFFE3]/60">
                    {step.content}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="order-1 md:order-2 relative h-[300px] md:h-[400px] overflow-hidden rounded-lg">
            <AnimatePresence mode="wait">
              {steps.map(
                (step, index) =>
                  index === currentStep && (
                    <motion.div
                      key={index}
                      className="absolute inset-0 rounded-lg overflow-hidden"
                      initial={{ y: 100, opacity: 0, rotateX: -20 }}
                      animate={{ y: 0, opacity: 1, rotateX: 0 }}
                      exit={{ y: -100, opacity: 0, rotateX: 20 }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                    >
                      <img
                        src={step.image}
                        alt={step.title}
                        className="w-full h-full object-cover transition-transform transform"
                      />
                      <div className="absolute bottom-0 left-0 right-0 h-2/3 bg-gradient-to-t from-[#0A0A0F] via-[#0A0A0F]/50 to-transparent" />
                    </motion.div>
                  )
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register; 