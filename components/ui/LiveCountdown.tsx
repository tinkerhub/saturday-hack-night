"use client";

import { useEffect, useState } from "react";
import { getNextNight, getNightEnd } from "@/lib/data";

interface TimeLeft { days: number; hours: number; minutes: number; seconds: number; }

type Phase = "upcoming" | "live" | "ended";

const ZERO: TimeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

// Works out, from the real clock, whether the night hasn't started, is live, or is over
function getState(): { phase: Phase; timeLeft: TimeLeft } {
  const now = Date.now();
  const night = getNextNight();
  const start = new Date(night.isoDate).getTime();
  const end = getNightEnd(night).getTime();
  if (now < start) return { phase: "upcoming", timeLeft: getTimeLeft(start - now) };
  if (now < end) return { phase: "live", timeLeft: getTimeLeft(end - now) };
  return { phase: "ended", timeLeft: ZERO };
}

function getTimeLeft(ms: number): TimeLeft {
  const diff = Math.max(0, ms);
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function pad(n: number) { return String(n).padStart(2, "0"); }

function DigitBlock({ value, label, bgColor }: { value: number; label: string; bgColor: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className={`${bgColor} text-black border-[3px] sm:border-[4px] border-black rounded-xl sm:rounded-2xl w-16 h-20 sm:w-24 sm:h-28 md:w-28 md:h-32 flex items-center justify-center shadow-[3px_3px_0px_0px_#000] sm:shadow-[4px_4px_0px_0px_#000]`}>
        <span className="font-mono text-3xl sm:text-5xl md:text-6xl font-black tracking-tight tabular-nums text-black">
          {pad(value)}
        </span>
      </div>
      <span className="font-mono text-[10px] sm:text-xs md:text-sm font-bold text-black uppercase tracking-widest mt-2.5 px-2 py-0.5 border border-black bg-[#fff6bf] rounded">
        {label}
      </span>
    </div>
  );
}

const PHASE_LABEL: Record<Phase, string> = {
  upcoming: "Starts in",
  live: "Live now · ends in",
  ended: "This hack night has ended",
};

export default function LiveCountdown() {
  // Start at zero on server + first render (avoids hydration mismatch), then tick off the real clock
  const [state, setState] = useState<{ phase: Phase; timeLeft: TimeLeft }>({ phase: "upcoming", timeLeft: ZERO });
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const tick = () => setState(getState());
    tick();
    setReady(true);
    const interval = setInterval(tick, 1000);
    document.addEventListener("visibilitychange", tick);
    return () => {
      clearInterval(interval);
      document.removeEventListener("visibilitychange", tick);
    };
  }, []);

  const { phase, timeLeft } = state;

  return (
    <div className="flex flex-col items-center gap-5">
      {ready && (
        <span className="inline-flex items-center gap-2 font-mono text-xs sm:text-sm font-bold uppercase tracking-widest text-black bg-[#f5d6ed] border border-black rounded px-3 py-1 shadow-sm">
          {phase === "live" && <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" aria-hidden="true" />}
          {PHASE_LABEL[phase]}
        </span>
      )}
      <div
        className="flex items-center justify-center gap-3 sm:gap-6 md:gap-8"
        aria-live="off"
        role="timer"
        aria-label={`${timeLeft.days} days ${timeLeft.hours} hours ${timeLeft.minutes} minutes ${timeLeft.seconds} seconds`}
      >
        <DigitBlock value={timeLeft.days} label="DAYS" bgColor="bg-[#d0ecf8]" />
        <DigitBlock value={timeLeft.hours} label="HOURS" bgColor="bg-[#d4f5e0]" />
        <DigitBlock value={timeLeft.minutes} label="MINUTES" bgColor="bg-[#f5d6ed]" />
        <DigitBlock value={timeLeft.seconds} label="SECONDS" bgColor="bg-[#fde4cf]" />
      </div>
    </div>
  );
}
