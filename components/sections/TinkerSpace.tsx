"use client";

import { motion } from "@/lib/motion";
import { MapPin, Navigation, Clock } from "lucide-react";
import { TINKERSPACE_MAPS_URL } from "@/lib/data";

export default function TinkerSpace() {
  return (
    <section id="tinkerspace" className="py-24 sm:py-32 px-4 sm:px-8 relative overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto">
        
        {/* Editorial Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-12 text-center sm:text-left"
        >
          <p className="font-mono text-xs font-bold text-black uppercase tracking-wider mb-3 bg-[#ffd34e] inline-block px-3 py-1 border border-black rounded shadow-sm">
            The Offline Finale Venue
          </p>

          <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-bold text-black tracking-tight leading-tight mb-4">
            TinkerSpace:{" "}
            <span className="inline-block bg-[#f5d6ed] text-black px-3 py-0.5 border border-black rounded-lg mt-1 sm:mt-0">
              The Final 24-Hour Build
            </span>
          </h2>

          <p className="text-black/75 font-medium text-base sm:text-lg max-w-2xl leading-relaxed mt-2">
            TinkerHub Foundation&apos;s physical maker lab. Where hardware meets software. Where ideas become prototypes overnight.
          </p>
        </motion.div>

        {/* Editorial Layout: Hero Image + Info Blocks */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left / Top: Major Visual Hero Image Block */}
          <motion.div
            initial={{ opacity: 0, scale: 0.99 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="lg:col-span-7 relative group"
          >
            {/* Venue Tag Badge */}
            <div className="absolute -top-3 left-4 sm:left-6 z-20">
              <div className="flex items-center gap-2 bg-[#d4f5e0] text-black font-mono text-xs font-bold px-3 py-1.5 border border-black rounded-md shadow-sm">
                <MapPin size={14} strokeWidth={2} className="text-black shrink-0" />
                <span>FINALE LOCATION: KOCHI, KERALA</span>
              </div>
            </div>

            {/* Frame Container */}
            <div className="relative w-full border-2 border-black bg-[#fff6bf] rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 p-2 sm:p-3">
              <div className="rounded-lg overflow-hidden aspect-[16/10] bg-[#f5f4ee]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/tinkerspace/tinkerspace-kochi.webp"
                  alt="TinkerSpace Kochi — venue for the SHN offline finale"
                  loading="lazy"
                  className="w-full h-full object-cover block"
                />
              </div>

              <div className="p-3 sm:p-4 flex flex-wrap items-center justify-between gap-2 border-t border-black/15 mt-2">
                <span className="font-mono text-xs font-bold text-black uppercase tracking-wider">
                  TinkerSpace • Maker Lab &amp; Finale Venue
                </span>
                <span className="font-mono text-xs font-semibold bg-[#aeeaf5] text-black px-2.5 py-0.5 border border-black/40 rounded">
                  24 Hours In Person
                </span>
              </div>
            </div>
          </motion.div>

          {/* Right / Side: Info Blocks */}
          <div className="lg:col-span-5 flex flex-col gap-6 justify-between">
            
            {/* Card 1: Experience (Lite Pink) */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-[#fae4f2] text-black border-2 border-black rounded-xl p-6 sm:p-7 shadow-sm hover:shadow-md transition-all flex-1 flex flex-col justify-between"
            >
              <div>
                <span className="font-mono text-xs font-bold uppercase tracking-wider bg-[#f5d6ed] text-black px-2.5 py-1 rounded border border-black inline-block mb-3">
                  The Finale Experience
                </span>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-black mb-2 leading-snug">
                  Overnight Sprint in Kochi
                </h3>
                <p className="text-black/80 font-normal text-sm sm:text-base leading-relaxed">
                  The SHN finale is a 24-hour hackathon held at TinkerSpace — selected teams arrive in the evening, hack through the night, and present in the morning.
                </p>
              </div>

              <div className="mt-6 pt-3 border-t border-black/15 flex items-center gap-2 font-mono text-xs font-semibold text-black/70">
                <Clock size={15} strokeWidth={2} />
                <span>24-Hour Non-Stop Build</span>
              </div>
            </motion.div>

            {/* Card 2: Location (Lite Blue) */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-[#e0f4fb] text-black border-2 border-black rounded-xl p-6 sm:p-7 shadow-sm hover:shadow-md transition-all flex-1 flex flex-col justify-between"
            >
              <div>
                <span className="font-mono text-xs font-bold uppercase tracking-wider bg-[#aeeaf5] text-black px-2.5 py-1 rounded border border-black inline-block mb-3">
                  Venue Location
                </span>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-black mb-2 leading-snug">
                  TinkerSpace, Kochi
                </h3>
                <p className="text-black/80 font-normal text-sm sm:text-base leading-relaxed">
                  TinkerSpace, Kochi, Kerala, India — ~30 min from Kochi Central Railway Station.
                </p>
              </div>

              <div className="mt-6 pt-3 border-t border-black/15 flex items-center justify-between gap-2">
                <span className="font-mono text-xs font-medium text-black/60">
                  Kochi, Kerala
                </span>
                <a
                  href={TINKERSPACE_MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 bg-black text-white font-mono text-xs font-bold px-3 py-1.5 rounded-lg hover:bg-neutral-800 transition-colors shadow-sm"
                >
                  <Navigation size={13} strokeWidth={2} />
                  <span>Open Maps</span>
                </a>
              </div>
            </motion.div>

          </div>

        </div>

      </div>
    </section>
  );
}




