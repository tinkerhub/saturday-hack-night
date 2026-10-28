"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "@/lib/motion";
import { demoColors } from "./tokens";

interface ScrollSectionProps {
  id: string;
  /** The section heading, shown inside the falling bordered box */
  heading: string;
  accent?: "green" | "pink";
  children: React.ReactNode;
}

/**
 * ScrollSection
 *
 * Renders a section heading as a small bordered box with white text.
 * The box starts well above its resting spot and, as the section scrolls
 * into view, visibly falls straight down (with a slight rotation) and
 * settles into place above the section content.
 *
 * The fall is driven directly by scroll progress (useScroll + useTransform),
 * so it's a continuous function of scroll position — not a one-shot
 * whileInView trigger and not a fade. Scrolling back up reverses it.
 */
export default function ScrollSection({
  id,
  heading,
  accent = "green",
  children,
}: ScrollSectionProps) {
  const ref = useRef<HTMLDivElement>(null);

  // Progress 0 -> 1 as the section's top travels from the bottom of the
  // viewport up to roughly 40% of the way down it — gives the box room
  // to visibly travel before it lands.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 100%", "start 40%"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-260px", "0px"]);
  const rotate = useTransform(
    scrollYProgress,
    [0, 1],
    [accent === "green" ? -12 : 12, 0]
  );

  const accentColor = accent === "green" ? demoColors.green : demoColors.pink;

  return (
    <section
      id={id}
      ref={ref}
      className="relative py-28 md:py-40 px-6 overflow-hidden"
    >
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Bordered box — falls straight down into place as you scroll */}
        <motion.div
          className="inline-block mb-8 px-6 py-3 rounded-md"
          style={{
            y,
            rotate,
            border: `2px solid ${accentColor}`,
            boxShadow: `0 0 24px ${
              accent === "green" ? demoColors.greenSoft : demoColors.pinkSoft
            }`,
            backgroundColor: demoColors.bgSoft,
          }}
        >
          <h2 className="font-mono font-extrabold uppercase tracking-tight text-2xl md:text-4xl text-white">
            {heading}
          </h2>
        </motion.div>

        {children}
      </div>
    </section>
  );
}


