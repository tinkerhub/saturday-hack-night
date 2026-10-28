"use client";

import { useEffect, useState } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import { REGISTER_URL } from "@/lib/data";

const navLinks = [
  { label: "How It Works", href: "/#get-selected" },
  { label: "Timeline", href: "/#timeline" },
  { label: "Past Nights", href: "/archive/" },
  { label: "Campus", href: "/campus/" },
  { label: "Community", href: "/#community" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const h = (e: KeyboardEvent) => { if (e.key === "Escape") setMobileOpen(false); };
    document.addEventListener("keydown", h);
    return () => document.removeEventListener("keydown", h);
  }, [mobileOpen]);

  return (
    <>
      {/* Top accent — solid four-color stripe instead of a glow line */}
      <div className="fixed top-0 inset-x-0 h-[3px] z-50 flex">
        <span className="flex-1 bg-pink" />
        <span className="flex-1 bg-blue" />
        <span className="flex-1 bg-green-flat" />
        <span className="flex-1 bg-yellow" />
      </div>

      <nav
        aria-label="Main navigation"
        className={`fixed top-[3px] inset-x-0 z-40 transition-colors duration-300 ${
          scrolled
            ? "bg-[#f5f4ee] border-b-2 border-[var(--ink)]"
            : "bg-[#f5f4ee]/0 border-b-2 border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 h-[68px] flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2.5 group">
            <span className="w-3 h-3 bg-pink border-2 border-[var(--ink)] shrink-0" />
            <span className="font-display text-sm sm:text-lg font-bold text-[var(--ink)] tracking-tight whitespace-nowrap">
              SATURDAY HACK NIGHT
            </span>
            <span className="hidden lg:block text-[11px] font-mono text-[var(--muted)] uppercase tracking-[0.2em] border-l-2 border-[var(--ink)]/20 pl-3">
              by TinkerHub
            </span>
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-sm font-semibold text-[var(--ink)]/60 hover:text-[var(--ink)] transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA + Mobile toggle */}
          <div className="flex items-center gap-3">
            <a
              href={REGISTER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center gap-2 bg-[var(--yellow)] text-[var(--ink)] border-2 border-[var(--ink)] font-bold text-sm px-5 py-2.5 rounded-[var(--radius-button)] shadow-hard-sm hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all duration-150"
            >
              Register Now
              <ArrowRight size={14} />
            </a>
            <button
              className="md:hidden w-10 h-10 flex items-center justify-center rounded-[var(--radius-button)] border-2 border-[var(--ink)] text-[var(--ink)] hover:bg-[var(--yellow)] transition-all"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
          className="fixed inset-0 z-30 bg-[#f5f4ee] md:hidden pt-[68px]"
        >
          <div className="flex flex-col p-6 gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="px-4 py-4 text-xl font-bold text-[var(--ink)]/80 hover:text-[var(--ink)] hover:bg-[var(--ink)]/[0.04] rounded-[var(--radius-button)] transition-all duration-200"
              >
                {link.label}
              </a>
            ))}
            <a
              href={REGISTER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 bg-[var(--yellow)] text-[var(--ink)] border-2 border-[var(--ink)] font-bold text-lg px-6 py-4 rounded-[var(--radius-button)] text-center shadow-hard"
            >
              Register Now →
            </a>
          </div>
        </div>
      )}
    </>
  );
}


