"use client";

import { useEffect, useState } from "react";
import { motion } from 'framer-motion';

const Timer = () => {
  const targetDate = new Date("2025-07-03");
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const diff = targetDate - now;

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        clearInterval(interval);
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div 
      className="bg-[#0A0A0F]/30 backdrop-blur-2xl rounded-2xl p-3  sm:p-6 border border-[#0A0A0F]/10 shadow-lg shadow-[#0A0A0F]/20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="text-[#FFFFE3]">
        <div className="text-xs font-clash font-medium mb-1 sm:mb-2">Next Offline HackNight</div>
        <div className="flex justify-center gap-2 sm:gap-4">
          <div className="flex flex-col items-center">
            <div className="text-lg sm:text-3xl font-clash font-bold">{timeLeft.days}</div>
            <div className="text-xs font-clash font-medium">Days</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-lg sm:text-3xl font-clash font-bold">{timeLeft.hours}</div>
            <div className="text-xs font-clash font-medium">Hours</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-lg sm:text-3xl font-clash font-bold">{timeLeft.minutes}</div>
            <div className="text-xs font-clash font-medium">Minutes</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-lg sm:text-3xl font-clash font-bold">{timeLeft.seconds}</div>
            <div className="text-xs font-clash font-medium">Seconds</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Timer;
