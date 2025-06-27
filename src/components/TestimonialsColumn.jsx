"use client";

import React from "react";
import { motion } from "framer-motion";

export default function TestimonialsColumn({ className = '', testimonials, duration = 10 }) {
  return (
    <div className={className}>
      <motion.div
        animate={{
          translateY: "-50%",
        }}
        transition={{
          duration,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-3 sm:gap-4 md:gap-6 pb-3 sm:pb-4 md:pb-6"
      >
        {[...new Array(2).fill(0)].map((_, index) => (
          <React.Fragment key={index}>
            {testimonials.map(({ text, image, name, role }, i) => (
              <div
                key={i}
                className="p-4 sm:p-6 md:p-8 lg:p-10 rounded-2xl sm:rounded-3xl border shadow-lg shadow-primary/10 max-w-[280px] sm:max-w-xs w-full"
              >
                <div className="font-clash font-medium text-sm sm:text-base">{text}</div>
                <div className="flex items-center gap-2 mt-3 sm:mt-4 md:mt-5">
                  <img
                    width={32}
                    height={32}
                    src={image}
                    alt={name}
                    className="h-8 w-8 sm:h-10 sm:w-10 rounded-full"
                  />
                  <div className="flex flex-col">
                    <div className="font-medium font-clash tracking-tight leading-4 sm:leading-5 text-sm sm:text-base">{name}</div>
                    <div className="leading-4 sm:leading-5 font-clash opacity-60 tracking-tight text-xs sm:text-sm">{role}</div>
                  </div>
                </div>
              </div>
            ))}
          </React.Fragment>
        ))}
      </motion.div>
    </div>
  );
}
