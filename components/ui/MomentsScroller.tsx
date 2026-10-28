"use client";

import { motion } from "@/lib/motion";
import { Camera } from "lucide-react";

interface MomentsScrollerProps {
  photos: string[];
  slotCount?: number;
  vhPerSlot?: number;
  className?: string;
}

const collageItems = [
  {
    tag: "MOMENT #01",
    tagBg: "bg-[#f5d6ed]",
    cardBg: "bg-[#fae4f2]",
    colSpan: "lg:col-span-8",
    aspect: "aspect-[16/10]",
  },
  {
    tag: "MOMENT #02",
    tagBg: "bg-[#aeeaf5]",
    cardBg: "bg-[#e0f4fb]",
    colSpan: "lg:col-span-4",
    aspect: "aspect-[4/5]",
  },
  {
    tag: "MOMENT #03",
    tagBg: "bg-[#d4f5e0]",
    cardBg: "bg-[#e6f7e2]",
    colSpan: "lg:col-span-5",
    aspect: "aspect-[4/3]",
  },
  {
    tag: "MOMENT #04",
    tagBg: "bg-[#ffd34e]",
    cardBg: "bg-[#fff6bf]",
    colSpan: "lg:col-span-7",
    aspect: "aspect-[16/9]",
  },
];

export default function MomentsScroller({
  photos,
  className = "",
}: MomentsScrollerProps) {
  return (
    <div className={`w-full max-w-7xl mx-auto px-4 sm:px-8 ${className}`}>
      {/* Clean Grid Wall */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {collageItems.map((item, i) => {
          const photo = photos[i % photos.length];
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              viewport={{ once: true }}
              className={`relative ${item.colSpan} group`}
            >
              {/* Overlapping Badge */}
              <div className="absolute -top-3.5 left-4 z-20">
                <span className={`font-mono text-xs font-bold text-black uppercase tracking-wider px-3 py-1 border border-black shadow-sm rounded-md inline-block ${item.tagBg}`}>
                  {item.tag}
                </span>
              </div>

              {/* Photo Card Container with Lite Tone Background */}
              <div className={`relative ${item.aspect} w-full border-2 border-black ${item.cardBg} rounded-xl overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 p-2 sm:p-2.5`}>
                {photo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={photo}
                    alt={item.tag}
                    loading="lazy"
                    className="w-full h-full object-cover block rounded-lg"
                  />
                ) : (
                  <div className="w-full h-full bg-[#fff6bf] flex flex-col items-center justify-center p-6 text-center border border-dashed border-black/20 rounded-lg">
                    <Camera size={32} className="text-black/40 mb-2 stroke-[1.75]" />
                    <span className="font-mono text-xs font-semibold text-black/50 uppercase tracking-wider">
                      {item.tag}
                    </span>
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}




