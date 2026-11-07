"use client";

import { useEffect, useState } from "react";
import { ListFilter, ChevronDown, ChevronRight, Hash, Compass } from "lucide-react";

export interface NavItem {
  id: string;
  number: string;
  label: string;
}

export const navSections: NavItem[] = [
  { id: "what-is-mediapipe", number: "01", label: "What is MediaPipe?" },
  { id: "prerequisites", number: "02", label: "Prerequisites" },
  { id: "documentation", number: "03", label: "Documentation" },
  { id: "tutorials", number: "04", label: "Tutorials" },
  { id: "project-ideas", number: "05", label: "Project Ideas" },
  { id: "letxplore", number: "08", label: "LetXplore" },
  { id: "mentors", number: "09", label: "Mentors" },
  { id: "contact-us", number: "10", label: "Contact Us" },
];

export default function TableOfContents() {
  const [activeSection, setActiveSection] = useState<string>("what-is-mediapipe");
  const [mobileExpanded, setMobileExpanded] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      for (let i = navSections.length - 1; i >= 0; i--) {
        const section = document.getElementById(navSections[i].id);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navSections[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileExpanded(false);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -90; // offset for fixed navbar
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Mobile Collapsible Header Bar */}
      <div className="lg:hidden mb-8 sticky top-[71px] z-30">
        <div className="bg-[#f5f4ee] border-2 border-black rounded-lg shadow-hard-sm overflow-hidden">
          <button
            onClick={() => setMobileExpanded(!mobileExpanded)}
            className="w-full px-4 py-3 flex items-center justify-between text-left font-mono font-bold text-xs uppercase tracking-wider text-black bg-[#fff6bf]"
            aria-expanded={mobileExpanded}
            aria-label="Toggle Table of Contents"
          >
            <div className="flex items-center gap-2">
              <Compass size={15} className="stroke-[2.5]" />
              <span>Table of Contents</span>
              <span className="bg-black text-white text-[10px] px-1.5 py-0.5 rounded ml-1 font-mono">
                {navSections.find((n) => n.id === activeSection)?.number || "01"}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-[11px] font-normal normal-case text-black/70">
                {navSections.find((n) => n.id === activeSection)?.label}
              </span>
              <ChevronDown
                size={16}
                className={`transition-transform duration-200 ${
                  mobileExpanded ? "rotate-180" : ""
                }`}
              />
            </div>
          </button>

          {mobileExpanded && (
            <div className="p-3 bg-white border-t-2 border-black space-y-1">
              {navSections.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => scrollTo(item.id)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded text-left font-mono text-xs transition-colors ${
                      isActive
                        ? "bg-[#91e47a] text-black font-bold border border-black shadow-sm"
                        : "text-black/75 hover:bg-black/5"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span className="opacity-60">{item.number}.</span>
                      <span>{item.label}</span>
                    </span>
                    {isActive && <span className="w-2 h-2 rounded-full bg-black" />}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Desktop Sticky Sidebar */}
      <aside className="hidden lg:block">
        <div className="sticky top-28 bg-white border-2 border-black rounded-xl p-5 shadow-hard-sm">
          {/* Header */}
          <div className="flex items-center gap-2 pb-3 mb-4 border-b-2 border-black">
            <div className="w-6 h-6 rounded bg-[#f28ad8] border border-black flex items-center justify-center">
              <ListFilter size={13} className="text-black stroke-[2.5]" />
            </div>
            <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-black">
              Navigation Index
            </h3>
          </div>

          <p className="text-xs text-black/60 font-sans mb-4 leading-relaxed">
            Jump to any section in this MediaPipe guide:
          </p>

          {/* Links list */}
          <nav className="space-y-1" aria-label="MediaPipe Page Sections">
            {navSections.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={`w-full group flex items-center justify-between px-3 py-2 rounded-lg text-left transition-all duration-150 cursor-pointer ${
                    isActive
                      ? "bg-[#91e47a] text-black font-bold border-2 border-black shadow-sm translate-x-1"
                      : "text-black/75 hover:text-black hover:bg-[#f5f4ee] border border-transparent font-medium"
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span
                      className={`font-mono text-[11px] px-1.5 py-0.5 rounded ${
                        isActive
                          ? "bg-black text-white font-bold"
                          : "bg-black/5 text-black/60 group-hover:bg-black/10"
                      }`}
                    >
                      {item.number}
                    </span>
                    <span className="text-xs truncate font-display tracking-tight">
                      {item.label}
                    </span>
                  </div>
                  {isActive ? (
                    <ChevronRight size={14} className="stroke-[2.5] shrink-0" />
                  ) : (
                    <span className="opacity-0 group-hover:opacity-100 text-black/40 text-[10px]">
                      #
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      </aside>
    </>
  );
}
