"use client";

import { motion } from "@/lib/motion";
import TestimonialCard from "@/components/ui/TestimonialCard";
import { testimonials } from "@/lib/data";
import SectionHeading from "@/components/ui/SectionHeading";

const stats = [
  { value: "5", label: "Online Sprints", cardBg: "bg-[#e6f7e2]", tagBg: "bg-[#d4f5e0]" },
  { value: "24h", label: "Grand Finale", cardBg: "bg-[#fae4f2]", tagBg: "bg-[#f5d6ed]" },
  { value: "∞", label: "Things to Build", cardBg: "bg-[#e0f4fb]", tagBg: "bg-[#aeeaf5]" },
  { value: "0", label: "Prior XP Needed", cardBg: "bg-[#fff6bf]", tagBg: "bg-[#ffd34e]" },
];

export default function Experience() {
  return (
    <section id="experience" className="py-24 sm:py-32 px-4 sm:px-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* By The Numbers */}
        <motion.div
          className="mb-24"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <p className="font-mono text-xs font-bold text-black uppercase tracking-wider mb-4 bg-[#ffd34e] inline-block px-3 py-1 border border-black rounded shadow-sm">
            By The Numbers
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                className={`rounded-xl border-2 border-black ${stat.cardBg} text-black p-6 sm:p-7 flex flex-col justify-between shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 overflow-hidden relative`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                viewport={{ once: true }}
              >
                <div className="font-mono text-5xl sm:text-6xl font-bold text-black mb-3 leading-none tracking-tight">
                  {stat.value}
                </div>
                <div className="pt-3 border-t border-black/15">
                  <span className={`font-mono text-xs font-semibold text-black uppercase tracking-wider px-2 py-0.5 rounded border border-black/30 ${stat.tagBg}`}>
                    {stat.label}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Builders Speak / Testimonials */}
        <div>
          <div className="mb-10 text-center sm:text-left">
            <p className="font-mono text-xs font-bold text-black uppercase tracking-wider mb-3 bg-[#f5d6ed] inline-block px-3 py-1 border border-black rounded shadow-sm">
              Builders Speak
            </p>
            <SectionHeading accent="violet" className="mb-2">The Vibe</SectionHeading>
            <p className="text-black/75 font-normal text-base sm:text-lg max-w-xl">
              Quotes and feedback from makers who shipped at Saturday Hack Night.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
            {testimonials.map((t, i) => (
              <TestimonialCard key={t.name} testimonial={t} index={i} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}




