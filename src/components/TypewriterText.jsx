import React, { useState, useEffect } from 'react';

const TypewriterText = ({ text, speed = 100, delay = 0 }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setDisplayText('');
    setCurrentIndex(0);
    
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => {
          if (prevIndex < text.length) {
            setDisplayText(text.slice(0, prevIndex + 1));
            return prevIndex + 1;
          } else {
            clearInterval(interval);
            return prevIndex;
          }
        });
      }, speed);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timeout);
  }, [text, speed, delay]);

  return (
    <p className="font-medium text-sm sm:text-base md:text-lg lg:text-xl mt-3 min-h-[1.5em]">
      {displayText}
      <span className="animate-pulse">|</span>
    </p>
  );
};

export default TypewriterText;