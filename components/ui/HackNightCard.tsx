"use client";

import { motion } from "@/lib/motion";
import { CalendarDays, Code2, ArrowRight, Lock } from "lucide-react";
import type { HackNight } from "@/lib/data";
import { REGISTER_URL } from "@/lib/data";

interface HackNightCardProps { event: HackNight; index: number; }

const liteTonePalettes = [
  { cardBg: "bg-[#fae4f2]", badgeBg: "bg-[#f5d6ed]", badgeText: "text-black" },
  { cardBg: "bg-[#e6f7e2]", badgeBg: "bg-[#d4f5e0]", badgeText: "text-black" },
  { cardBg: "bg-[#e0f4fb]", badgeBg: "bg-[#aeeaf5]", badgeText: "text-black" },
  { cardBg: "bg-[#fff6bf]", badgeBg: "bg-[#ffd34e]", badgeText: "text-black" },
];

export default function HackNightCard({ event, index }: HackNightCardProps) {
  const palette = liteTonePalettes[index % liteTonePalettes.length];
  const stacks = event.stack.split(", ");
  const nightNum = String(event.id).padStart(2, "0");

  if (event.locked) {
    // The blurred content is placeholder text, so the real theme can't be read from the page source
    return (
      <motion.div
        className={`relative rounded-xl border-2 border-black ${palette.cardBg} text-black overflow-hidden shadow-sm cursor-not-allowed select-none`}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: index * 0.06 }}
        viewport={{ once: true }}
        aria-disabled="true"
        aria-label={`Night ${nightNum} is locked`}
      >
        {/* Blurred card body */}
        <div className="p-6 flex flex-col gap-4 blur-[7px] pointer-events-none" aria-hidden="true">
          <div className="flex items-center justify-between border-b border-black/15 pb-3">
            <span className={`font-mono text-xs px-2.5 py-1 rounded font-bold uppercase tracking-wider border border-black ${palette.badgeBg}`}>
              Beginner
            </span>
            <span className="font-mono text-xs font-bold text-black/60 uppercase">Night {nightNum}</span>
          </div>
          <div>
            <h3 className="font-display text-xl sm:text-2xl font-bold text-black leading-snug mb-2">
              Secret Theme Name
            </h3>
            <p className="text-black/75 text-sm font-normal leading-relaxed line-clamp-2">
              The theme and challenge for this hack night will be revealed soon. Stay tuned for the big reveal.
            </p>
          </div>
          <div className="flex items-center gap-2 text-black/80 font-mono font-medium text-xs">
            <CalendarDays size={14} className="stroke-[2]" />
            <span>Date to be announced · 6:00 PM IST</span>
          </div>
          <div className="flex flex-wrap gap-1.5 items-center">
            <Code2 size={14} className="stroke-[2] text-black/70 shrink-0" />
            <span className="font-mono text-xs bg-[#fff6bf] border border-black/30 rounded px-2 py-0.5">Stack</span>
            <span className="font-mono text-xs bg-[#fff6bf] border border-black/30 rounded px-2 py-0.5">Tools</span>
          </div>
          <p className="font-mono text-xs font-medium text-black/60">Mentors: To be announced</p>
          <div className="mt-auto pt-4 border-t border-black/15">
            <div className="text-center font-bold text-sm py-2.5 rounded-lg border-2 border-black bg-black text-white">
              Register
            </div>
          </div>
        </div>

        {/* Lock overlay (not blurred) */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-white/25 text-center">
          <div className="w-12 h-12 rounded-xl bg-black text-white flex items-center justify-center border-2 border-black shadow-sm">
            <Lock size={22} strokeWidth={2} />
          </div>
          <p className="font-display text-xl font-bold text-black">Night {nightNum} · Locked</p>
          <p className="font-mono text-xs font-bold uppercase tracking-wider text-black/70">Cooking</p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className={`relative rounded-xl border-2 border-black ${palette.cardBg} text-black flex flex-col overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      viewport={{ once: true }}
    >
      <div className="p-6 flex flex-col gap-4 flex-1">
        {/* Top row */}
        <div className="flex items-center justify-between border-b border-black/15 pb-3">
          <span className={`font-mono text-xs px-2.5 py-1 rounded font-bold uppercase tracking-wider border border-black ${palette.badgeBg} ${palette.badgeText}`}>
            {event.difficulty}
          </span>
          <span className="font-mono text-xs font-bold text-black/60 uppercase">Night {nightNum}{event.mode ? ` · ${event.mode}` : ""}</span>
        </div>

        {/* Theme */}
        <div>
          <h3 className="font-display text-xl sm:text-2xl font-bold text-black leading-snug mb-2">
            {event.theme}
          </h3>
          <p className="text-black/75 text-sm font-normal leading-relaxed line-clamp-2">{event.about}</p>
        </div>

        {/* Date */}
        <div className="flex items-center gap-2 text-black/80 font-mono font-medium text-xs">
          <CalendarDays size={14} className="stroke-[2]" />
          <span>{event.date} · 6:00 – 11:00 PM IST</span>
        </div>

        {/* Stack */}
        <div className="flex flex-wrap gap-1.5 items-center">
          <Code2 size={14} className="stroke-[2] text-black/70 shrink-0" />
          {stacks.map((s) => (
            <span key={s} className="font-mono text-xs bg-[#fff6bf] text-black font-semibold border border-black/30 rounded px-2 py-0.5">
              {s.trim()}
            </span>
          ))}
        </div>

        {/* Mentors */}
        {event.mentors.length > 0 && (
          <p className="font-mono text-xs font-medium text-black/60 line-clamp-1">
            Mentors: {event.mentors.map((m) => m.name).join(", ")}
          </p>
        )}

        {/* CTAs */}
        <div className="mt-auto pt-4 flex items-center gap-3 border-t border-black/15">
          <a
            href={REGISTER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 text-center font-bold text-sm py-2.5 rounded-lg border-2 border-black bg-black text-white hover:bg-neutral-800 transition-all duration-150 shadow-sm"
          >
            Register
          </a>
          <a
            href={`/events/${event.slug}/`}
            className="flex items-center gap-1 font-mono text-xs font-bold text-black hover:text-[#f5d6ed] transition-colors"
          >
            Details
            <ArrowRight size={13} strokeWidth={2} />
          </a>
        </div>
      </div>
    </motion.div>
  );
}




