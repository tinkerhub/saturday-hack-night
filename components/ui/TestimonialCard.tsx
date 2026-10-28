"use client";

import { motion } from "@/lib/motion";
import type { Testimonial } from "@/lib/data";
import { cn } from "@/lib/utils";

interface TestimonialCardProps {
  testimonial: Testimonial;
  index: number;
  className?: string;
}

const litePalettes = [
  { cardBg: "bg-[#fae4f2]", quoteColor: "text-[#d63384]" },
  { cardBg: "bg-[#e6f7e2]", quoteColor: "text-[#198754]" },
  { cardBg: "bg-[#e0f4fb]", quoteColor: "text-[#0284c7]" },
  { cardBg: "bg-[#fff6bf]", quoteColor: "text-[#b45309]" },
];

export default function TestimonialCard({
  testimonial,
  index,
  className,
}: TestimonialCardProps) {
  const palette = litePalettes[index % litePalettes.length];

  return (
    <motion.div
      className={cn(
        `rounded-xl border-2 border-black ${palette.cardBg} text-black p-6 sm:p-7 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 break-inside-avoid`,
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      viewport={{ once: true }}
    >
      <span className={cn("font-serif text-5xl leading-none block mb-1 font-bold", palette.quoteColor)}>
        &ldquo;
      </span>
      <p className="font-sans text-base sm:text-lg font-medium text-black/90 leading-relaxed mb-6">
        {testimonial.quote}
      </p>
      <div className="pt-3 border-t border-black/15 flex items-center justify-between">
        <span className="font-mono text-xs font-bold text-black/75">
          — {testimonial.name}
        </span>
        <span className="w-2 h-2 rounded-full bg-black/30" />
      </div>
    </motion.div>
  );
}



