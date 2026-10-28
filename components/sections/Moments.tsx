"use client";

import { motion } from "@/lib/motion";
import { ArrowRight } from "lucide-react";
import { moments } from "@/lib/data";
import MomentsScroller from "@/components/ui/MomentsScroller";
import SectionHeading from "@/components/ui/SectionHeading";

export default function Moments() {
  return (
    <section id="moments" className="py-24 sm:py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10 mb-14">
        <motion.div
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div>
            <p className="font-mono text-xs text-black font-bold uppercase tracking-wider mb-3 bg-[#d4f5e0] inline-block px-3 py-1 border border-black rounded shadow-sm">
              Event Archive
            </p>
            <SectionHeading accent="violet" className="mb-2">Moments</SectionHeading>
            <p className="text-black/75 font-normal text-lg max-w-xl">
              Photographic memory of Saturday nights, build sprints, and TinkerSpace Kochi.
            </p>
          </div>
          <a
            href="/moments/"
            className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-black bg-[#fff6bf] border-2 border-black px-5 py-3 rounded-lg shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all shrink-0"
          >
            View all moments
            <ArrowRight size={14} strokeWidth={2} />
          </a>
        </motion.div>
      </div>

      <MomentsScroller photos={moments} />
    </section>
  );
}




