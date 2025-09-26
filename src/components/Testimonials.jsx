"use client";
import React from "react";
import { motion } from "framer-motion";
import TestimonialsColumn from "./TestimonialsColumn";

const testimonials = [
  {
    text: "Clap Candle is a virtual candle that lights up with a clap and goes out when you blow.",
    name: "Clap Candle ",
    role: "",
  },
  {
    text: "Emoji Mood Mirror will detect your face and show an emoji matching your mood.",
    name: "Emoji Mood Mirror",
    role: "",
  },
  {
    text: "Hacky Pong is Pong game where the paddle moves when you tilt your head.",
    name: "Hacky Pong ",
    role: "",
  },
  {
    text: "Memeify will help  Generate random memes from Malayalam movie dialogues.",
    name: "Memeify",
    role: "",
  },
  {
    text: "Smart Alarm is an Alarm that only stops when you solve a math problem.",
    name: "Smart Alarm",
    role: "",
  },
  {
    text: "Screen Time Roast Bot roasts you every time you unlock your phone.",
    name: "Screen Time Roast Bot",
    role: "",
  },
  {
    text: "Voice Lamp is a Lamp that changes color based on your voice pitch.",
    name: "Voice Lamp ",
    role: "",
  },
  {
    text: "Code Karma Meter shows your “karma score” based on GitHub commits.",
    name: "Code Karma Meter",
    role: "",
  },
  {
    text: "Plant Whisperer is a system that reminds you to water plants when they look sad.",
    image: "",
    name: "Plant Whisperer",
    role: "",
  },
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

const Testimonials = () => {
  return (
    <section className="my-10 sm:my-16 md:my-20 relative">
      <div className="container z-10 mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center mx-auto"
        >
         
          <h2 className="text-3xl text-center sm:text-3xl md:text-4xl lg:text-5xl font-clash font-medium tracking-tighter mt-3 sm:mt-5">
          Don't take our word for it — take theirs
          </h2>
        </motion.div>
        <div className="flex justify-center gap-3 sm:gap-4 md:gap-6 mt-6 sm:mt-8 md:mt-10 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[400px] sm:max-h-[500px] md:max-h-[600px] lg:max-h-[740px] overflow-hidden">
          <TestimonialsColumn testimonials={firstColumn} duration={15} />
          <TestimonialsColumn testimonials={secondColumn} className="hidden sm:block" duration={19} />
          <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={17} />
        </div>
      </div>
    </section>
  );
};

export default Testimonials;