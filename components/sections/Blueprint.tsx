"use client";

import { motion } from "@/lib/motion";
import { ArrowRight } from "lucide-react";
import { REGISTER_URL } from "@/lib/data";
import SectionHeading from "@/components/ui/SectionHeading";

export default function Blueprint() {
  return (
    <section id="blueprint" className="py-32 px-5 sm:px-8 dark-grid-bg relative overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <p className="font-mono text-xs text-[#d4f5e0] uppercase tracking-widest mb-4">The Process</p>
          <SectionHeading accent="pink">Build. Ship. Get Invited.</SectionHeading>
        </motion.div>

        {/* Bottom note + CTA */}
        <motion.div
          className="mt-16 flex flex-col sm:flex-row items-center justify-between gap-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <p className="font-mono text-sm text-white/25">
            5 online sprints · 1 grand finale · 0 gatekeeping
          </p>
          <a
            href={REGISTER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#d4f5e0] text-black font-bold px-6 py-3 rounded-xl hover:bg-[#22d16f] transition-colors text-sm"
          >
            Register for the Next Night
            <ArrowRight size={15} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}



