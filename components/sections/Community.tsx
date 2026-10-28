"use client";

import { motion } from "@/lib/motion";
import { ArrowRight, Package, MessageSquare } from "lucide-react";
import { DISCORD_URL, STICKERS_URL } from "@/lib/data";
import SectionHeading from "@/components/ui/SectionHeading";

export default function Community() {
  return (
    <section id="community" className="py-24 sm:py-32 px-5 sm:px-8 relative">
      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          className="bg-[#fff6bf] rounded-xl border-2 border-black p-8 sm:p-12 text-center shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <p className="font-mono text-xs font-bold text-black uppercase tracking-wider mb-4 bg-[#ffd34e] inline-block px-3 py-1 border border-black rounded shadow-sm">
            Join the Network
          </p>

          <SectionHeading accent="green" className="mb-3">
            2,400+ Builders
          </SectionHeading>

          <p className="text-black font-bold text-2xl sm:text-3xl mb-3 tracking-tight">
            Zero gatekeeping. Pure building.
          </p>

          <p className="text-black/75 font-normal text-base sm:text-lg leading-relaxed max-w-xl mx-auto mb-9">
            Real-time help, build logs, and event announcements. Jump in, ask questions, find a teammate, and show off your work.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href={DISCORD_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#5865f2] text-white font-bold text-base px-7 py-3.5 rounded-lg border-2 border-black shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-150"
            >
              <MessageSquare size={17} strokeWidth={2} />
              Join Our Discord
              <ArrowRight size={17} strokeWidth={2} />
            </a>

            <a
              href={STICKERS_URL}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#fff6bf] text-black font-bold text-base px-7 py-3.5 rounded-lg border-2 border-black shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-150"
            >
              <Package size={17} strokeWidth={2} />
              Claim Sticker Pack
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}



