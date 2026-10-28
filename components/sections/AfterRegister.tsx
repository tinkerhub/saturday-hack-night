"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "@/lib/motion";
import { Mail, MessageSquare, BookOpen, Lightbulb, Github, Moon, Trophy } from "lucide-react";

const steps = [
  {
    stepNum: "01",
    time: "Immediately",
    title: "Confirmation email",
    description:
      "You'll get a confirmation from hub.tinkerhub.org. Check spam if not seen within 5 minutes.",
    icon: Mail,
    color: "#f5d6ed",
    cardBg: "bg-[#fae4f2]",
  },
  {
    stepNum: "02",
    time: "Day before",
    title: "Discord invite + theme preview",
    description:
      "Join the SHN Discord. The Saturday theme is announced 24 hours in advance.",
    icon: MessageSquare,
    color: "#AEEAF5",
    cardBg: "bg-[#e0f4fb]",
  },
  {
    stepNum: "03",
    time: "Friday 8:30 – 9:30 PM IST",
    title: "Let's Explore",
    description:
      "A study jam on the week's stack, the night before hack night. Meet the mentors, ask questions and dig deeper into the topic.",
    icon: BookOpen,
    color: "#d4f5e0",
    cardBg: "bg-[#e6f7e2]",
  },
  {
    stepNum: "04",
    time: "Saturday 6:00 PM IST",
    title: "Theme drops. Hacking starts.",
    description:
      "Full challenge brief goes live. Mentors come online. Build — no check-ins, no progress reports.",
    icon: Lightbulb,
    color: "#FFD34E",
    cardBg: "bg-[#fff6bf]",
  },
  {
    stepNum: "05",
    time: "Saturday by midnight",
    title: "Push and submit",
    description:
      "Push to a public GitHub repo and submit via hub.app. A working prototype is enough.",
    icon: Github,
    color: "#f5d6ed",
    cardBg: "bg-[#fae4f2]",
  },
  {
    stepNum: "06",
    time: "Sunday",
    title: "Projects reviewed",
    description:
      "The TinkerHub team reviews all submissions. Standout projects featured in Discord and the archive.",
    icon: Moon,
    color: "#AEEAF5",
    cardBg: "bg-[#e0f4fb]",
  },
  {
    stepNum: "07",
    time: "After all 5 nights",
    title: "Finale invitations sent",
    description:
      "Top teams receive direct invitations to the 24-hour offline hackathon at TinkerSpace Kochi.",
    icon: Trophy,
    color: "#d4f5e0",
    cardBg: "bg-[#e6f7e2]",
  },
];

const LAST = steps.length - 1;

function StepCard({
  step,
  isActive,
}: {
  step: (typeof steps)[0];
  isActive: boolean;
}) {
  const Icon = step.icon;
  return (
    <div
      className={`w-full p-5 sm:p-6 rounded-xl border-2 border-black ${step.cardBg} text-black transition-all duration-200 relative overflow-hidden ${
        isActive
          ? "shadow-md -translate-y-0.5"
          : "shadow-sm hover:shadow-md hover:-translate-y-0.5"
      }`}
    >
      <div className="flex items-center justify-between gap-3 border-b border-black/15 pb-3 mb-3">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs font-bold px-2 py-0.5 bg-[#fff6bf] text-black rounded border border-black/30 uppercase tracking-wider">
            {step.stepNum}
          </span>
          <span className="font-mono text-xs font-semibold uppercase tracking-wider text-black/70">
            {step.time}
          </span>
        </div>
        <div className="w-7 h-7 rounded-lg bg-black text-white flex items-center justify-center border border-black shrink-0">
          <Icon size={13} strokeWidth={2} />
        </div>
      </div>
      <h3 className="font-display font-bold text-lg sm:text-xl text-black leading-snug mb-1.5">
        {step.title}
      </h3>
      <p className="text-black/80 font-normal text-xs sm:text-sm leading-relaxed">
        {step.description}
      </p>
    </div>
  );
}

export default function AfterRegister() {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [ballY, setBallY] = useState<number>(0);
  const [showBall, setShowBall] = useState<boolean>(true);
  const [lineTop, setLineTop] = useState<number>(24);
  const [lineHeight, setLineHeight] = useState<number>(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const dotRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      setShowBall(false);
      return;
    }

    const getDotPositions = () => {
      if (!containerRef.current) return [];
      const containerRect = containerRef.current.getBoundingClientRect();
      return dotRefs.current.map((dot) => {
        if (!dot) return 0;
        const dotRect = dot.getBoundingClientRect();
        return dotRect.top - containerRect.top + dotRect.height / 2;
      });
    };

    let animationFrameId: number;
    let lastTimestamp: number | null = null;
    let state: "PAUSED" | "MOVING" = "PAUSED";
    let stateTime = 0;
    let currentStep = 0;

    const SPEED = 200;
    const PAUSE_DURATION = 500;
    const FINAL_PAUSE_DURATION = 900;

    const tick = (timestamp: number) => {
      if (!lastTimestamp) lastTimestamp = timestamp;
      const delta = timestamp - lastTimestamp;
      lastTimestamp = timestamp;

      const positions = getDotPositions();
      if (positions.length >= steps.length && positions[0] > 0) {
        setLineTop(positions[0]);
        setLineHeight(positions[LAST] - positions[0]);

        if (state === "PAUSED") {
          stateTime += delta;
          setBallY(positions[currentStep]);
          setActiveStep(currentStep);

          const limit = currentStep === LAST ? FINAL_PAUSE_DURATION : PAUSE_DURATION;
          if (stateTime >= limit) {
            if (currentStep < LAST) {
              state = "MOVING";
              stateTime = 0;
            } else {
              currentStep = 0;
              state = "PAUSED";
              stateTime = 0;
            }
          }
        } else if (state === "MOVING") {
          const nextStep = currentStep + 1;
          const startY = positions[currentStep];
          const endY = positions[nextStep];
          const dist = endY - startY;
          const duration = (dist / SPEED) * 1000;

          stateTime += delta;
          const progress = Math.min(stateTime / duration, 1);
          setBallY(startY + progress * (endY - startY));

          if (progress >= 1) {
            currentStep = nextStep;
            state = "PAUSED";
            stateTime = 0;
            setActiveStep(currentStep);
          }
        }
      }

      animationFrameId = requestAnimationFrame(tick);
    };

    animationFrameId = requestAnimationFrame(tick);

    const handleResize = () => {
      const pos = getDotPositions();
      if (pos.length >= steps.length && pos[0] > 0) {
        setLineTop(pos[0]);
        setLineHeight(pos[LAST] - pos[0]);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section id="after-register" className="py-24 sm:py-32 px-4 sm:px-8 relative overflow-hidden">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="mb-16 text-center sm:text-left"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <p className="font-mono text-xs font-black text-black uppercase tracking-widest mb-3 bg-[#d4f5e0] inline-block px-3 py-1 border-2 border-black rounded shadow-[2px_2px_0px_0px_#000]">
            What Happens Next
          </p>
          <h2 className="font-display font-black uppercase tracking-tight text-4xl sm:text-6xl lg:text-7xl text-black leading-[0.95]">
            After You <span className="text-black">Register</span>
          </h2>
        </motion.div>

        {/* ─── TIMELINE ─── */}
        <div ref={containerRef} className="relative">

          {/* ── Vertical line ──
              Mobile:  left-5  (20px from left edge, the dot column)
              Desktop: left-1/2 (centered between the two card columns) */}
          <div
            className="absolute left-5 md:left-1/2 w-[3px] bg-black z-0 -translate-x-1/2"
            style={{
              top: `${lineTop}px`,
              height: lineHeight > 0 ? `${lineHeight}px` : "100%",
            }}
          />

          {/* ── Animated ball ── */}
          {showBall && (
            <div
              className="absolute left-5 md:left-1/2 z-20 w-5 h-5 rounded-full bg-[#f5d6ed] border-[2.5px] border-black shadow-[1.5px_1.5px_0px_0px_#000] pointer-events-none"
              style={{ top: `${ballY}px`, transform: "translate(-50%, -50%)" }}
              aria-hidden="true"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-[#fff6bf] mx-auto mt-0.5" />
            </div>
          )}

          {/* ── Step rows ── */}
          <div className="space-y-10 md:space-y-14 relative z-10">
            {steps.map((step, i) => {
              const isLeft = i % 2 === 0;   // desktop: card goes LEFT  (01,03,05)
              const isCurrent = activeStep === i;

              return (
                <motion.div
                  key={step.stepNum}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.07 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  {/* Single invisible anchor for ball animation — always in DOM */}
                  <div
                    ref={(el) => { dotRefs.current[i] = el; }}
                    className="absolute left-5 md:left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-0 h-0 pointer-events-none"
                    aria-hidden="true"
                  />

                  {/* ──────────────────────────────────────────
                      MOBILE layout  (< md)
                      Line at left-5. Dot centred on line.
                      Card stretches to the right.
                  ────────────────────────────────────────── */}
                  <div className="flex items-center gap-0 md:hidden">

                    {/* Dot — sits on the line (left-5 = 20px, dot is 16px wide → centered) */}
                    <div
                      className={`shrink-0 w-4 h-4 rounded-full border-2 border-black z-10 flex items-center justify-center transition-all duration-200 ${
                        isCurrent ? "bg-black scale-125" : "bg-[#fff6bf]"
                      }`}
                      style={{ marginLeft: "12px" /* centers the 16px dot on the 3px line at left-5(20px) */ }}
                    >
                      {!isCurrent && <div className="w-1.5 h-1.5 rounded-full bg-black" />}
                    </div>

                    {/* Short horizontal connector */}
                    <div className="w-4 h-[2.5px] bg-black shrink-0" />

                    {/* Card */}
                    <div className="flex-1 min-w-0">
                      <StepCard step={step} isActive={isCurrent} />
                    </div>
                  </div>

                  {/* ──────────────────────────────────────────
                      DESKTOP layout  (≥ md)
                      Centred line. Even steps → card LEFT.
                      Odd steps → card RIGHT.
                  ────────────────────────────────────────── */}
                  <div className="hidden md:flex items-center">

                    {/* LEFT half */}
                    <div className="flex-1 flex justify-end items-center">
                      {isLeft ? (
                        <>
                          <StepCard step={step} isActive={isCurrent} />
                          {/* connector: card → line */}
                          <div className="w-10 lg:w-14 h-[2.5px] bg-black shrink-0" />
                        </>
                      ) : (
                        /* empty right-hand steps in left column */
                        <div className="w-10 lg:w-14 h-[2.5px] bg-black/20 shrink-0" />
                      )}
                    </div>

                    {/* Centre dot — sits exactly on the centre line */}
                    <div
                      className={`shrink-0 w-4 h-4 rounded-full border-2 border-black z-10 flex items-center justify-center transition-all duration-200 ${
                        isCurrent ? "bg-black scale-125" : "bg-[#fff6bf]"
                      }`}
                    >
                      {!isCurrent && <div className="w-1.5 h-1.5 rounded-full bg-black" />}
                    </div>

                    {/* RIGHT half */}
                    <div className="flex-1 flex justify-start items-center">
                      {!isLeft ? (
                        <>
                          {/* connector: line → card */}
                          <div className="w-10 lg:w-14 h-[2.5px] bg-black shrink-0" />
                          <StepCard step={step} isActive={isCurrent} />
                        </>
                      ) : (
                        <div className="w-10 lg:w-14 h-[2.5px] bg-black/20 shrink-0" />
                      )}
                    </div>

                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}




