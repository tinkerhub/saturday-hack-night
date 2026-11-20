"use client";

import { motion } from "@/lib/motion";
import { ArrowRight, Sparkles } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import ProjectBentoGrid from "@/components/ui/ProjectBentoGrid";

export default function FeaturedProjects() {
  return (
    <section id="featured-projects" className="py-24 sm:py-32 px-4 sm:px-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12 sm:mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="font-mono text-xs text-black font-bold uppercase tracking-wider bg-[#d4f5e0] inline-flex items-center gap-1.5 px-3 py-1 border border-black rounded shadow-xs">
                <Sparkles size={12} className="stroke-[2.5]" />
                Live Showcase
              </span>
            </div>
            <SectionHeading accent="green" className="mb-2">
              Featured Projects
            </SectionHeading>
            <p className="text-black/75 font-normal text-base sm:text-lg max-w-xl">
              Selected standout projects built by the community at Saturday Hack Night.
            </p>
          </div>

          <a
            href="/archive/"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider font-bold text-black bg-[#fff6bf] border-2 border-black px-5 py-3 rounded-lg shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all shrink-0"
          >
            Explore all archives
            <ArrowRight size={14} strokeWidth={2} />
          </a>
        </motion.div>

        {/* Live Bento Grid from Google Sheets API */}
        <ProjectBentoGrid />
      </div>
    </section>
  );
}
