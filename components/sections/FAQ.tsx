"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "@/lib/motion";
import { Plus, Minus } from "lucide-react";
import { faq } from "@/lib/data";

const litePalettes = [
  "bg-[#fae4f2]",
  "bg-[#e0f4fb]",
  "bg-[#e6f7e2]",
  "bg-[#fff6bf]",
];

function FAQCard({
  item,
  index,
}: {
  item: { question: string; answer: string };
  index: number;
}) {
  const [open, setOpen] = useState(false);
  const cardBg = litePalettes[index % litePalettes.length];
  const panelId = `faq-panel-${index}`;
  const buttonId = `faq-btn-${index}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.04 }}
      viewport={{ once: true }}
      className={`rounded-lg border-2 border-black ${cardBg} text-black px-4 py-3 sm:px-5 sm:py-3.5 transition-all duration-200`}
    >
      <button
        id={buttonId}
        aria-expanded={open}
        aria-controls={panelId}
        className="w-full flex items-center justify-between gap-4 text-left group"
        onClick={() => setOpen(!open)}
      >
        <span className="font-display font-bold text-sm sm:text-base text-black leading-snug">
          {item.question}
        </span>
        <span
          className="shrink-0 w-6 h-6 rounded-md border border-black/40 bg-[#fff6bf] flex items-center justify-center text-black group-hover:border-black transition-colors"
          aria-hidden="true"
        >
          {open ? (
            <Minus size={14} strokeWidth={2.5} />
          ) : (
            <Plus size={14} strokeWidth={2.5} />
          )}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            role="region"
            aria-labelledby={buttonId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="border-t border-black/15 mt-2.5 pt-2.5">
              <p className="text-black/85 font-normal text-xs sm:text-sm leading-relaxed">
                {item.answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  return (
    <section id="faq" className="py-14 sm:py-20 px-4 sm:px-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <motion.div
          className="mb-8 text-center sm:text-left"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <p className="font-mono text-xs font-bold text-black uppercase tracking-wider mb-3 bg-[#ffd34e] inline-block px-3 py-1 border border-black rounded shadow-sm">
            Common Questions
          </p>
          <h2 className="font-display font-bold uppercase tracking-tight text-2xl sm:text-4xl lg:text-5xl text-black leading-[1.05]">
            Everything You Need to Know
          </h2>
        </motion.div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 items-start">
          {faq.map((item, i) => (
            <FAQCard key={item.question} item={item} index={i} />
          ))}
        </div>

        {/* Support CTA */}
        <motion.div
          className="mt-8 flex items-center justify-center text-center"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-3 sm:gap-4 px-4 py-3 bg-[#e0f4fb] border-2 border-black rounded-lg">
            <span className="text-black font-semibold text-sm sm:text-base">
              Still have questions?
            </span>
            <a
              href="https://discord.gg/tinkerhub"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#f5d6ed] text-black font-mono font-bold text-xs uppercase tracking-wider border border-black rounded-lg shadow-sm hover:opacity-90 transition-opacity"
            >
              Ask in Discord
            </a>
            <span className="text-black/70 text-xs sm:text-sm font-medium">
              — mentors answer quickly.
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}




