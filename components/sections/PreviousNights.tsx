"use client";

import { motion } from "@/lib/motion";
import { ArrowRight, Star, Users, FolderGit2, ExternalLink } from "lucide-react";
import { pastHackNights } from "@/lib/data";
import SectionHeading from "@/components/ui/SectionHeading";

const posterConfigs = [
  {
    colSpan: "lg:col-span-7",
    cardBg: "bg-[#fae4f2]",
    tagBg: "bg-[#f5d6ed]",
  },
  {
    colSpan: "lg:col-span-5",
    cardBg: "bg-[#e0f4fb]",
    tagBg: "bg-[#aeeaf5]",
  },
  {
    colSpan: "lg:col-span-12",
    cardBg: "bg-[#e6f7e2]",
    tagBg: "bg-[#d4f5e0]",
  },
];

export default function PreviousNights() {
  const recent = pastHackNights.slice(0, 3);

  return (
    <section id="past-nights" className="py-24 sm:py-32 px-4 sm:px-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div>
            <p className="font-mono text-xs text-black font-bold uppercase tracking-wider mb-3 bg-[#f5d6ed] inline-block px-3 py-1 border border-black rounded shadow-sm">
              Season 01 · 2025
            </p>
            <SectionHeading accent="green" className="mb-2">What Was Built</SectionHeading>
            <p className="text-black/75 font-normal text-lg max-w-xl">
              Physical event archive of past build sprints and community prototypes.
            </p>
          </div>
          <a
            href="/archive/"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider font-bold text-black bg-[#fff6bf] border-2 border-black px-5 py-3 rounded-lg shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all shrink-0"
          >
            View all archives
            <ArrowRight size={14} strokeWidth={2} />
          </a>
        </motion.div>

        {/* Clean Grid Wall */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          {recent.map((night, i) => {
            const config = posterConfigs[i % posterConfigs.length];
            return (
              <motion.a
                key={night.slug}
                href={`/archive/${night.slug}/`}
                className={`group ${config.colSpan} block rounded-xl border-2 border-black ${config.cardBg} text-black p-6 sm:p-7 flex flex-col justify-between shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 relative overflow-hidden`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                viewport={{ once: true }}
              >
                <div>
                  {/* Top Header */}
                  <div className="flex items-start justify-between border-b border-black/15 pb-4 mb-5">
                    <div>
                      <span className={`font-mono text-[11px] font-bold uppercase tracking-wider ${config.tagBg} text-black px-2.5 py-1 rounded border border-black/40 inline-block mb-1.5`}>
                        PAST NIGHT
                      </span>
                      <div className="font-mono text-xs font-medium text-black/60">{night.date}</div>
                    </div>
                    <div className="font-mono text-3xl sm:text-4xl font-bold text-black/40 leading-none">
                      #{String(night.id).padStart(2, "0")}
                    </div>
                  </div>

                  {/* Main Event Title */}
                  <h3 className="font-display text-2xl sm:text-3xl font-bold text-black leading-snug mb-3">
                    {night.theme}
                  </h3>

                  <p className="font-mono text-xs font-semibold text-black/80 bg-[#fff6bf] px-2.5 py-1 border border-black/20 rounded inline-block mb-5">
                    STACK: {night.stack}
                  </p>

                  {/* Best Project Card */}
                  <div className="bg-[#fff6bf] border border-black/20 rounded-lg p-3.5 mb-6">
                    <div className="flex items-center gap-1.5 font-mono text-[10px] font-bold text-black/70 uppercase tracking-wider mb-1">
                      <Star size={13} className="text-black/70 stroke-[2]" />
                      <span>BEST PROJECT</span>
                    </div>
                    <p className="text-base font-bold text-black">{night.bestProject.name}</p>
                    <p className="font-mono text-xs font-normal text-black/60">built by {night.bestProject.creator}</p>
                  </div>
                </div>

                {/* Bottom Footer Stats & Action */}
                <div className="pt-4 border-t border-black/15 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap gap-2">
                    <div className="flex items-center gap-1.5 bg-[#fff6bf] border border-black/20 px-2.5 py-1 rounded text-black font-mono text-xs font-medium">
                      <Users size={12} strokeWidth={2} />
                      <span>{night.participants} builders</span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-[#fff6bf] border border-black/20 px-2.5 py-1 rounded text-black font-mono text-xs font-medium">
                      <FolderGit2 size={12} strokeWidth={2} />
                      <span>{night.submittedCount} projects</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 bg-black text-white font-mono text-xs font-bold px-3.5 py-2 rounded-lg border border-black shadow-sm group-hover:bg-neutral-800 transition-colors">
                    <span>Explore Event</span>
                    <ExternalLink size={12} strokeWidth={2} />
                  </div>
                </div>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}




