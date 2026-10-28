"use client";

import { motion } from "@/lib/motion";

export default function Philosophy() {
  return (
    <section id="philosophy" className="py-32 px-5 sm:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <p className="font-mono text-xs font-bold text-black uppercase tracking-wider bg-[#f5d6ed] inline-block px-3 py-1 mb-4 border border-black rounded shadow-sm">Our Philosophy</p>
          <h2 className="font-display font-black uppercase tracking-tight text-4xl sm:text-6xl lg:text-7xl text-black leading-[0.95]">
            Learn by <span className="text-black">Doing</span>
          </h2>
        </motion.div>

        {/* Manifesto */}
        <motion.div
          className="mt-20 max-w-3xl"
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <p className="text-3xl sm:text-4xl font-bold text-black leading-tight">
            &ldquo;The project you shipped at SHN will teach you more than the course you almost finished.&rdquo;
          </p>
          <p className="font-mono text-sm text-black/60 font-bold mt-5">— TinkerHub Foundation</p>
        </motion.div>
      </div>
    </section>
  );
}




