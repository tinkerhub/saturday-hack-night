"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "@/lib/motion";
import type { LucideIcon } from "lucide-react";

export interface Step {
  icon?: LucideIcon;
  step: string;
  title: string;
  description: string;
  bg?: string;
  rotation?: string;
}

interface ProcessCardsProps {
  steps: Step[];
  badge?: string;
  heading?: React.ReactNode;
  subtext?: React.ReactNode;
}

const defaultPalettes = [
  { cardBg: "bg-[#fae4f2]", accent: "bg-[#f5d6ed]" },
  { cardBg: "bg-[#e0f4fb]", accent: "bg-[#aeeaf5]" },
  { cardBg: "bg-[#e6f7e2]", accent: "bg-[#d4f5e0]" },
  { cardBg: "bg-[#fff6bf]", accent: "bg-[#ffd34e]" },
];

const TOTAL_STEPS = 4;
const SCROLL_PER_STEP = 300;
// Extra final step of scroll so card 04 stays pinned and readable before the section unpins
const TOTAL_SCROLL = SCROLL_PER_STEP * TOTAL_STEPS; // 1200 px

export default function ProcessCards({ steps, badge, heading, subtext }: ProcessCardsProps) {
  const [revealedCount, setRevealedCount] = useState<number>(1);
  const [isReducedMotion, setIsReducedMotion] = useState<boolean>(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setIsReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const onScroll = () => {
      const containerTop = el.getBoundingClientRect().top + window.scrollY;
      const scrolled = window.scrollY - containerTop;
      if (scrolled < 0) { setRevealedCount(1); return; }
      const step = Math.min(TOTAL_STEPS, Math.floor(scrolled / SCROLL_PER_STEP) + 1);
      setRevealedCount(step);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      ref={scrollContainerRef}
      style={{ height: `calc(100vh + ${TOTAL_SCROLL}px)` }}
      className="relative w-full"
    >
      {/* Sticky frame */}
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

            {/* LEFT: section heading */}
            <div className="flex flex-col gap-5">
              {badge && (
                <p className="font-mono text-xs font-bold text-black uppercase tracking-wider bg-[#f5d6ed] inline-block self-start px-3 py-1 border border-black rounded shadow-sm">
                  {badge}
                </p>
              )}
              {heading && (
                <h2 className="font-display font-bold uppercase tracking-tight text-3xl sm:text-5xl lg:text-6xl text-black leading-[1.05]">
                  {heading}
                </h2>
              )}
              {subtext && (
                <div className="text-black/75 font-normal text-base sm:text-lg leading-relaxed max-w-md">
                  {subtext}
                </div>
              )}
            </div>

            {/* RIGHT: compact column of cards, revealed one by one on scroll */}
            <div className="flex flex-col gap-3 w-full">
              {steps.map((step, i) => {
                const isRevealed = revealedCount >= i + 1;
                const Icon = step.icon;
                const palette = defaultPalettes[i % defaultPalettes.length];

                return (
                  <motion.div
                    key={step.step}
                    initial={false}
                    animate={
                      isRevealed
                        ? { y: 0, opacity: 1 }
                        : { y: -24, opacity: 0 }
                    }
                    transition={
                      isReducedMotion
                        ? { duration: 0 }
                        : { duration: 0.35, ease: [0.22, 1, 0.36, 1] }
                    }
                    style={{ pointerEvents: isRevealed ? "auto" : "none" }}
                    className={`relative rounded-xl border-2 border-black ${palette.cardBg} text-black px-4 py-3 sm:px-5 sm:py-4 flex items-center gap-4 shadow-md cursor-pointer select-none hover:shadow-lg transition-shadow overflow-hidden`}
                    onClick={() => setRevealedCount((prev) => (prev < 4 ? prev + 1 : 1))}
                    title="Click or scroll to proceed"
                  >
                    <div className={`absolute top-0 inset-x-0 h-1 ${palette.accent}`} />

                    <span className="font-mono text-3xl sm:text-4xl font-bold text-black/30 leading-none shrink-0">
                      {step.step}
                    </span>

                    <div className="flex-1 min-w-0">
                      <h3 className="font-display text-base sm:text-xl font-bold text-black leading-snug">
                        {step.title}
                      </h3>
                      <p className="text-black/75 font-normal text-xs sm:text-sm leading-snug mt-0.5">
                        {step.description}
                      </p>
                    </div>

                    {Icon && (
                      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-black text-white flex items-center justify-center border border-black shadow-sm shrink-0">
                        <Icon size={18} strokeWidth={2} />
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}




