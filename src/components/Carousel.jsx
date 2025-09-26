import React, { useState, useRef, useId, useEffect } from 'react';
import { IconArrowNarrowRight } from "@tabler/icons-react";
import img1 from '../assets/images/carousal/IMG_5519.JPG'
import img2 from '../assets/images/carousal/IMG_5699.JPG'
import img3 from '../assets/images/carousal/IMG_5821.JPG'
import img4 from '../assets/images/carousal/IMG_5850.JPG'
import img5 from '../assets/images/carousal/IMG_5921.JPG'
import TypewriterText from './TypewriterText';

// Sample slides data
const defaultSlides = [
  {
    title: "",
    button: "Register Now",
    src: img4,
    text: "How can I learn current trending tech stacks?"
  },
  {
    title: "",
    button: "Register Now",
    src: img3,
    text: "How can I connect with Tech leaders and mentors?"
  },
  {
    title: "",
    button: "Register Now",
    src: img1,
    text: "Is there any beginner friendly hackathons?"
  },
  {
    title: "",
    button: "Register Now",
    src: img2,
    text: "How can I find cool people in tech?"
  },
  {
    title: "",
    button: "Register Now",
    src: img5,
    text: "How to start building projects as a noob?"
  }
];

const Slide = ({ slide, index, current, handleSlideClick }) => {
  const slideRef = useRef(null);
  const xRef = useRef(0);
  const yRef = useRef(0);
  const frameRef = useRef();

  useEffect(() => {
    const animate = () => {
      if (!slideRef.current) return;

      const x = xRef.current;
      const y = yRef.current;

      slideRef.current.style.setProperty("--x", `${x}px`);
      slideRef.current.style.setProperty("--y", `${y}px`);

      frameRef.current = requestAnimationFrame(animate);
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  const handleMouseMove = (event) => {
    const el = slideRef.current;
    if (!el) return;

    const r = el.getBoundingClientRect();
    xRef.current = event.clientX - (r.left + Math.floor(r.width / 2));
    yRef.current = event.clientY - (r.top + Math.floor(r.height / 2));
  };

  const handleMouseLeave = () => {
    xRef.current = 0;
    yRef.current = 0;
  };

  const imageLoaded = (event) => {
    event.currentTarget.style.opacity = "1";
  };

  const { src, title, text } = slide;

  return (
    <div className="[perspective:1200px] [transform-style:preserve-3d]">
      <li
        ref={slideRef}
        className="flex flex-1 flex-col items-center justify-center relative text-center text-[#FFFFE3] opacity-100 transition-all duration-300 ease-in-out w-[80vmin] h-[80vmin] sm:w-[70vmin] sm:h-[70vmin] mx-[2vmin] sm:mx-[4vmin] z-10"
        onClick={() => handleSlideClick(index)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform:
            current !== index
              ? "scale(0.98) rotateX(8deg)"
              : "scale(1) rotateX(0deg)",
          transition: "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
          transformOrigin: "bottom",
        }}
      >
        <div
          className="absolute top-0 left-0 w-full h-full bg-[#1D1F2F] rounded-[1%] overflow-hidden transition-all duration-150 ease-out"
          style={{
            transform:
              current === index
                ? "translate3d(calc(var(--x) / 30), calc(var(--y) / 30), 0)"
                : "none",
          }}
        >
          <img
            className="absolute inset-0 w-[100%] h-[100%] object-cover opacity-100 transition-opacity duration-600 ease-in-out"
            style={{
              opacity: current === index ? 1 : 0.5,
            }}
            alt={title}
            src={src}
            onLoad={imageLoaded}
            loading={current === index ? "eager" : "lazy"}
          />
          {current === index && (
            <div className="absolute inset-0 bg-black/30 transition-all duration-1000" />
          )}
        </div>

        <article
          className={`relative p-[3vmin] sm:p-[4vmin] transition-opacity duration-1000 ease-in-out ${
            current === index ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        >
          <h2 className="text-base sm:text-lg md:text-2xl lg:text-4xl font-clash font-medium relative">
            {title}
          </h2>
          {current === index && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2  translate-y-48 md:translate-y-32 bg-white/70 backdrop-blur-sm p-4 sm:p-6 rounded-3xl text-black w-[300px] md:w-[600px] md:h-[100px]  h-[100px] flex flex-col items-start justify-between">
              <TypewriterText text={text} speed={50} />
              <button className="bg-blue-500 hover:bg-blue-700  text-white font-bold md:py-4 py-2 -translate-y-5 md:-translate-y-11 px-4 rounded-3xl self-end">
                Ask
              </button>
            </div>
          )}
        </article>
      </li>
    </div>
  );
};

const Carousel = ({ slides = defaultSlides }) => {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Autoplay functionality
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [isPaused, slides.length]);

  const handleSlideClick = (index) => {
    if (current !== index) {
      setCurrent(index);
    }
  };

  const id = useId();

  return (
    <div
      className="relative w-[80vmin] h-[80vmin] sm:w-[70vmin] sm:h-[70vmin] mx-auto"
      aria-labelledby={`carousel-heading-${id}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <ul
        className="absolute flex mx-[-2vmin] sm:mx-[-4vmin] transition-transform duration-1000 ease-in-out"
        style={{
          transform: `translateX(-${current * (100 / slides.length)}%)`,
        }}
      >
        {slides.map((slide, index) => (
          <Slide
            key={index}
            slide={slide}
            index={index}
            current={current}
            handleSlideClick={handleSlideClick}
          />
        ))}
      </ul>
    </div>
  );
};

export default Carousel;
