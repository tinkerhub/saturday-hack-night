"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "@/lib/motion";

interface CollagePhoto {
  src: string;
  alt: string;
  className: string;
  style: {
    top: string;
    left?: string;
    right?: string;
  };
  opacityClass: string;
}

/**
 * Dense editorial background photo collage spanning continuously from HERO through
 * the exact end of OUR PHILOSOPHY.
 *
 * Exclusively uses real Saturday HackNight photographs and footage frames
 * from the user's Google Drive folder.
 */
const collagePhotos: CollagePhoto[] = [
  // ─── HERO SECTION (0% – 48%) ───────────────────────────────────────────────
  // 1. Hero Upper-Left: Coding session and laptop screen
  // ─── HERO UPPER SECTION (0% – 20%) ─────────────────────────────────────────
  // 1. Far Left Top Edge: Builder coding at terminal
  {
    src: "/collage/shn-footage-10.jpg",
    alt: "Saturday HackNight builder terminal code",
    className: "w-44 h-32 sm:w-56 sm:h-40 md:w-68 md:h-46 rotate-[-2deg] rounded-[2px]",
    style: { top: "1%", left: "-1.5%" },
    opacityClass: "opacity-[0.14] sm:opacity-[0.18]",
  },
  // 2. Hero Upper-Right: Authentic builder portrait from footage
  // 2. Mid-Left Top: Builder portrait in focus
  {
    src: "/collage/shn-footage-2.jpg",
    alt: "Saturday HackNight attendee",
    className: "w-36 h-48 sm:w-44 sm:h-58 md:w-52 md:h-68 rotate-[1deg] rounded-[2px] hidden sm:block",
    style: { top: "6%", left: "17%" },
    opacityClass: "opacity-[0.12] sm:opacity-[0.15]",
  },
  // 3. Center-Top (High above headline, subtle background tone)
  {
    src: "/collage/shn-footage-21.jpg",
    alt: "Saturday HackNight build room",
    className: "w-48 h-32 sm:w-60 sm:h-38 md:w-72 md:h-44 rotate-[0.5deg] rounded-[2px] hidden lg:block",
    style: { top: "1%", left: "40%" },
    opacityClass: "opacity-[0.11] lg:opacity-[0.13]",
  },
  // 4. Mid-Right Top: Hackathon workshop table
  {
    src: "/collage/shn-footage-15.jpg",
    alt: "Saturday HackNight workshop",
    className: "w-40 h-28 sm:w-48 sm:h-34 md:w-56 md:h-38 rotate-[-1.5deg] rounded-[2px] hidden md:block",
    style: { top: "5%", right: "17%" },
    opacityClass: "opacity-[0.12] md:opacity-[0.15]",
  },
  // 5. Far Right Top Edge: Vertical portrait of builder
  {
    src: "/collage/shn-footage-3.jpg",
    alt: "Saturday HackNight maker building",
    className: "w-36 h-48 sm:w-48 sm:h-64 md:w-56 md:h-76 rotate-[2deg] rounded-[2px]",
    style: { top: "2%", right: "-1%" },
    opacityClass: "opacity-[0.14] sm:opacity-[0.18]",
  },
  // 3. Hero Mid-Left: Late night sprint atmosphere

  // ─── HERO MID SECTION (20% – 38%) ──────────────────────────────────────────
  // 6. Left Edge: Late night workspace
  {
    src: "/collage/shn-footage-1.jpg",
    alt: "Saturday HackNight sprint environment",
    className: "w-40 h-52 sm:w-50 sm:h-64 md:w-58 md:h-74 rotate-[1.5deg] rounded-[2px]",
    style: { top: "18%", left: "-1%" },
    opacityClass: "opacity-[0.13] sm:opacity-[0.17]",
  },
  // 4. Hero Mid-Right: Builders collaborating over laptop
  // 7. Left Inner Corridor: Builders collaborating
  {
    src: "/collage/shn-footage-17.jpg",
    alt: "Saturday HackNight team discussions",
    className: "w-40 h-28 sm:w-48 sm:h-34 md:w-56 md:h-38 rotate-[-1deg] rounded-[2px] hidden sm:block",
    style: { top: "24%", left: "13%" },
    opacityClass: "opacity-[0.12] sm:opacity-[0.15]",
  },
  // 8. Right Inner Corridor: Builder testing hardware
  {
    src: "/collage/shn-footage-14.jpg",
    alt: "Saturday HackNight hardware experiment",
    className: "w-36 h-48 sm:w-44 sm:h-58 md:w-52 md:h-66 rotate-[1deg] rounded-[2px] hidden md:block",
    style: { top: "23%", right: "15%" },
    opacityClass: "opacity-[0.12] md:opacity-[0.15]",
  },
  // 9. Far Right Edge: Collaborative group sprint
  {
    src: "/collage/shn-footage-4.jpg",
    alt: "Saturday HackNight paired developers",
    className: "w-44 h-32 sm:w-56 sm:h-40 md:w-68 md:h-48 rotate-[-2deg] rounded-[2px]",
    style: { top: "20%", right: "-1.5%" },
    opacityClass: "opacity-[0.14] sm:opacity-[0.18]",
  },

  // ─── HERO → PHILOSOPHY TRANSITION (48% – 58%) ──────────────────────────────
  // 5. Transition Right: Saturday HackNight Group Photo 2 (Crowd celebration)
  // ─── HERO LOWER & TRANSITION (38% – 54%) ───────────────────────────────────
  // 10. Left Lower Edge: Hackathon table in action
  {
    src: "/collage/shn-footage-6.jpg",
    alt: "Saturday HackNight table activity",
    className: "w-44 h-30 sm:w-54 sm:h-38 md:w-64 md:h-44 rotate-[-1.5deg] rounded-[2px]",
    style: { top: "37%", left: "0%" },
    opacityClass: "opacity-[0.13] sm:opacity-[0.17]",
  },
  // 11. Left Transition Inner: Hackathon floor
  {
    src: "/collage/shn-footage-16.jpg",
    alt: "Saturday HackNight build sprint",
    className: "w-36 h-48 sm:w-46 sm:h-60 md:w-54 md:h-68 rotate-[2deg] rounded-[2px] hidden sm:block",
    style: { top: "43%", left: "14%" },
    opacityClass: "opacity-[0.12] sm:opacity-[0.15]",
  },
  // 12. Center Transition (Subtle between Hero cards & Philosophy):
  {
    src: "/collage/shn-footage-18.jpg",
    alt: "Saturday HackNight builders collaborating",
    className: "w-48 h-32 sm:w-56 sm:h-38 md:w-64 md:h-42 rotate-[-0.5deg] rounded-[2px] hidden lg:block",
    style: { top: "46%", left: "37%" },
    opacityClass: "opacity-[0.11] lg:opacity-[0.14]",
  },
  // 13. Right Transition Inner: Problem solving
  {
    src: "/collage/shn-footage-9.jpg",
    alt: "Saturday HackNight maker problem solving",
    className: "w-36 h-48 sm:w-44 sm:h-56 md:w-50 md:h-64 rotate-[-1deg] rounded-[2px] hidden md:block",
    style: { top: "40%", right: "16%" },
    opacityClass: "opacity-[0.12] md:opacity-[0.15]",
  },
  // 14. Right Transition Edge: Big Saturday HackNight Group Celebration 2
  {
    src: "/collage/shn-group-2.jpg",
    alt: "Saturday HackNight community group celebration",
    className: "w-52 h-36 sm:w-68 sm:h-48 md:w-84 md:h-58 rotate-[1.5deg] rounded-[2px]",
    style: { top: "36%", right: "-2%" },
    opacityClass: "opacity-[0.15] sm:opacity-[0.20]",
  },

  // ─── PHILOSOPHY UPPER REGION (54% – 72%) ───────────────────────────────────
  // 15. Left Edge Transition into Philosophy
  {
    src: "/collage/shn-footage-20.jpg",
    alt: "Saturday HackNight developer build space",
    className: "w-44 h-32 sm:w-56 sm:h-40 md:w-66 md:h-46 rotate-[-2deg] rounded-[2px]",
    style: { top: "53%", left: "-1%" },
    opacityClass: "opacity-[0.13] sm:opacity-[0.17]",
  },
  // 16. Philosophy Left Margin: Intense focus
  {
    src: "/collage/shn-footage-5.jpg",
    alt: "Saturday HackNight builder shipping prototype",
    className: "w-38 h-50 sm:w-48 sm:h-62 md:w-56 md:h-72 rotate-[1deg] rounded-[2px] hidden sm:block",
    style: { top: "60%", left: "9%" },
    opacityClass: "opacity-[0.12] sm:opacity-[0.16]",
  },
  // 6. Transition Left: Physical maker lab — TinkerSpace Kochi
  // 17. Center-Right Transition: Late evening sprint
  {
    src: "/collage/shn-footage-22.jpg",
    alt: "Saturday HackNight evening builders",
    className: "w-44 h-30 sm:w-54 sm:h-36 md:w-62 md:h-40 rotate-[1.5deg] rounded-[2px] hidden lg:block",
    style: { top: "57%", left: "34%" },
    opacityClass: "opacity-[0.11] lg:opacity-[0.14]",
  },

  // ─── PHILOSOPHY SECTION (58% – 95%) [MORE IMAGES ON PHILOSOPHY SIDE] ───────
  // 7. Philosophy Top-Right: Authentic SHN Community Group Photo 1
  // 18. Philosophy Top-Right (Opposite "Learn by Doing"): Full SHN Community Group Photo 1
  {
    src: "/collage/shn-group-1.jpg",
    alt: "Saturday HackNight community builders group photo",
    className: "w-56 h-38 sm:w-76 sm:h-52 md:w-96 md:h-64 rotate-[2deg] rounded-[2px]",
    style: { top: "54%", right: "-1.5%" },
    opacityClass: "opacity-[0.16] sm:opacity-[0.22]",
  },
  // 8. Philosophy Upper-Left Outer Margin: Builders deep in the sprint
  // 19. Philosophy Mid-Right: Active hackathon table floor
  {
    src: "/collage/shn-footage-5.jpg",
    alt: "Saturday HackNight builders shipping prototypes",
    className: "w-40 h-28 sm:w-52 sm:h-36 md:w-60 md:h-42 rotate-[-2deg] rounded-[2px] hidden md:block",
    style: { top: "64%", left: "2%" },
    opacityClass: "opacity-[0.10] md:opacity-[0.13]",
  },
  // 9. Philosophy Mid-Right (Opposite Manifesto Quote): Live table sprint footage
  {
    src: "/collage/shn-footage-8.jpg",
    alt: "Saturday HackNight active build floor",
    className: "w-46 h-32 sm:w-60 sm:h-42 md:w-74 md:h-50 rotate-[-1.5deg] rounded-[2px] hidden sm:block",
    style: { top: "65%", right: "10%" },
    opacityClass: "opacity-[0.13] sm:opacity-[0.18]",
  },
  // 10. Philosophy Mid-Left Margin: Vertical portrait of builder problem-solving

  // ─── PHILOSOPHY LOWER & MANIFESTO REGION (72% – 95%) ───────────────────────
  // 20. Philosophy Left Margin (Beside manifesto quote): Builder experimenting
  {
    src: "/collage/shn-footage-7.jpg",
    alt: "Saturday HackNight prototype development",
    className: "w-36 h-48 sm:w-46 sm:h-60 md:w-54 md:h-70 rotate-[1.5deg] rounded-[2px] hidden md:block",
    style: { top: "73%", left: "-1%" },
    opacityClass: "opacity-[0.12] md:opacity-[0.16]",
  },
  // 11. Philosophy Lower-Right: Workshop build sprint moment
  // 21. Philosophy Mid-Right (Opposite quote): Late night sprint push
  {
    src: "/collage/shn-footage-11.jpg",
    alt: "Saturday HackNight late night push",
    className: "w-48 h-34 sm:w-62 sm:h-44 md:w-76 md:h-52 rotate-[2deg] rounded-[2px]",
    style: { top: "74%", right: "1%" },
    opacityClass: "opacity-[0.14] sm:opacity-[0.19]",
  },
  // 12. Philosophy Lower-Left (Near bottom fade-out): Final demo & project presentation
  // 22. Philosophy Lower-Right Margin: Hard working team
  {
    src: "/collage/shn-footage-23.jpg",
    alt: "Saturday HackNight sprint group",
    className: "w-38 h-50 sm:w-48 sm:h-62 md:w-56 md:h-72 rotate-[-1.5deg] rounded-[2px] hidden sm:block",
    style: { top: "82%", right: "12%" },
    opacityClass: "opacity-[0.13] sm:opacity-[0.17]",
  },
  // 23. Philosophy Lower-Center / Right: Sprint progress
  {
    src: "/collage/shn-footage-24.jpg",
    alt: "Saturday HackNight builders coding",
    className: "w-44 h-30 sm:w-54 sm:h-38 md:w-64 md:h-44 rotate-[1deg] rounded-[2px] hidden md:block",
    style: { top: "85%", left: "30%" },
    opacityClass: "opacity-[0.12] md:opacity-[0.15]",
  },
  // 24. Philosophy Lower-Left (Near bottom fade-out): Final demo & project presentation
  {
    src: "/collage/shn-footage-12.jpg",
    alt: "Saturday HackNight demo presentation",
    className: "w-44 h-30 sm:w-54 sm:h-38 md:w-64 md:h-44 rotate-[-1deg] rounded-[2px] hidden sm:block",
    style: { top: "86%", left: "6%" },
    opacityClass: "opacity-[0.12] sm:opacity-[0.15]",
  },
  // 25. Philosophy Bottom-Left (Fading into bottom mask): Celebration
  {
    src: "/collage/shn-footage-19.jpg",
    alt: "Saturday HackNight final project moment",
    className: "w-42 h-30 sm:w-52 sm:h-36 md:w-62 md:h-42 rotate-[-2deg] rounded-[2px]",
    style: { top: "91%", left: "-1%" },
    opacityClass: "opacity-[0.12] sm:opacity-[0.15]",
  },
  // 26. Philosophy Bottom-Right (Fading into bottom mask): Final touches
  {
    src: "/collage/shn-footage-25.jpg",
    alt: "Saturday HackNight final build sprint",
    className: "w-46 h-32 sm:w-58 sm:h-40 md:w-70 md:h-48 rotate-[1deg] rounded-[2px]",
    style: { top: "90%", right: "-1%" },
    opacityClass: "opacity-[0.13] sm:opacity-[0.16]",
  },
];

export default function HeroPhilosophyCollage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Subtle anchored parallax: slow movement of ~60px across the entire 1800px+ vertical region
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const translateY = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? [0, 0] : [0, -60]
  );

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0"
      aria-hidden="true"
    >
      {/* Dense Scattered Photographs Layer with subtle anchor parallax */}
      <motion.div
        style={{ y: translateY }}
        className="absolute inset-0 w-full h-full"
      >
        {collagePhotos.map((photo, idx) => (
          <div
            key={idx}
            className={`absolute pointer-events-none transition-opacity duration-300 ${photo.opacityClass}`}
            style={{
              top: photo.style.top,
              left: photo.style.left,
              right: photo.style.right,
            }}
          >
            {/* Real SHN Drive photos with subtle desaturation & contrast */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={photo.src}
              alt={photo.alt}
              loading={idx < 4 ? "eager" : "lazy"}
              decoding="async"
              className={`${photo.className} object-cover grayscale-[30%] contrast-[95%] mix-blend-multiply`}
            />
          </div>
        ))}
      </motion.div>

      {/* Grid Texture Layer directly on top of the images */}
      <div
        className="absolute inset-0 pointer-events-none z-[1]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(17,17,17,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(17,17,17,0.06) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Philosophy End Smooth Fade-out Mask: Transitions smoothly to plain #f5f4ee */}
      <div className="absolute bottom-0 left-0 right-0 h-48 sm:h-64 bg-gradient-to-b from-transparent via-[#f5f4ee]/85 to-[#f5f4ee] pointer-events-none z-[2]" />
    </div>
  );
}


