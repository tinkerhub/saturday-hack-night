'use client';
import React, { useState, useEffect, Children } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LoopText = ({ children, className = '', interval = 2, onIndexChange }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const items = Children.toArray(children);

  useEffect(() => {
    if (isHovered) return; // Pause animation on hover

    const intervalMs = interval * 1000;
    const timer = setInterval(() => {
      setCurrentIndex((current) => {
        const next = (current + 1) % items.length;
        if (onIndexChange) onIndexChange(next);
        return next;
      });
    }, intervalMs);
    
    return () => clearInterval(timer);
  }, [items.length, interval, onIndexChange, isHovered]);

  const textVariants = {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
    exit: { y: -20, opacity: 0, transition: { duration: 0.3, ease: "easeIn" } }
  };

  return (
    <motion.div 
      className={`relative inline-block ${className}`}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={currentIndex}
            variants={textVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="text-center block"
          >
            {items[currentIndex]}
          </motion.span>
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default LoopText;
