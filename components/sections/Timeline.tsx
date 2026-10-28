"use client";

import { motion } from "@/lib/motion";
import HackNightCard from "@/components/ui/HackNightCard";
import { upcomingNights } from "@/lib/data";
import SectionHeading from "@/components/ui/SectionHeading";

export default function Timeline() {
  return (
    <section id="timeline" className="py-24 sm:py-32 px-4 sm:px-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div>
            <p className="font-mono text-xs font-bold text-black uppercase tracking-wider mb-3 bg-[#fff6bf] inline-block px-3 py-1 border border-black rounded shadow-sm">
              Season 02 · 2026
            </p>
            <SectionHeading accent="green">Upcoming Hack Nights</SectionHeading>
          </div>
          <div className="flex flex-col gap-2 text-right">
            <div className="flex flex-wrap gap-2 justify-start sm:justify-end">
              {["Free", "Solo or 2", "Any stack", "Push by midnight"].map((t) => (
                <span
                  key={t}
                  className="font-mono text-xs font-medium border border-black/20 text-black/70 bg-[#fff6bf] px-2.5 py-1 rounded"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Cards — mobile: vertical stack, md+: grid */}
        <div className="flex flex-col gap-5 md:hidden">
          {upcomingNights.map((event, i) => (
            <HackNightCard key={event.id} event={event} index={i} />
          ))}
        </div>
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {upcomingNights.map((event, i) => (
            <HackNightCard key={event.id} event={event} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}




