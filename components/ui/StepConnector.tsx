"use client";

import { motion } from "@/lib/motion";

export default function StepConnector() {
  return (
    <div className="hidden md:flex items-center justify-center w-full">
      <svg
        width="100%"
        height="2"
        viewBox="0 0 100 2"
        preserveAspectRatio="none"
        className="overflow-visible"
      >
        <motion.line
          x1="0"
          y1="1"
          x2="100"
          y2="1"
          stroke="#d4f5e0"
          strokeWidth="1"
          strokeDasharray="4 4"
          strokeOpacity="0.4"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          viewport={{ once: true }}
        />
      </svg>
      <div className="absolute w-2 h-2 rounded-full bg-[#d4f5e0] opacity-60" />
    </div>
  );
}



