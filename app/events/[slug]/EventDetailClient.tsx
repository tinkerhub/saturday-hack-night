"use client";

import { motion } from "@/lib/motion";
import {
  ArrowLeft,
  CalendarDays,
  Code2,
  Users,
  Github,
  Twitter,
  BookOpen,
  FileText,
  Video,
  Link as LinkIcon,
  ArrowRight,
  Target,
  Sparkles,
} from "lucide-react";
import type { HackNight, Resource } from "@/lib/data";
import { REGISTER_URL } from "@/lib/data";
import SectionHeading from "@/components/ui/SectionHeading";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import GridBackdrop from "@/components/ui/GridBackdrop";
import ProjectBentoGrid from "@/components/ui/ProjectBentoGrid";

const difficultyConfig = {
  Beginner: { bg: "bg-[#d4f5e0]", text: "text-black" },
  Intermediate: { bg: "bg-[#f5d6ed]", text: "text-black" },
  Advanced: { bg: "bg-[#ffd34e]", text: "text-black" },
};

const resourceIcons = {
  docs: BookOpen,
  article: FileText,
  video: Video,
  repo: Github,
};

export default function EventDetailClient({ night }: { night: HackNight }) {
  const diff = difficultyConfig[night.difficulty] || difficultyConfig.Beginner;

  return (
    <main className="min-h-screen bg-[#F5F4EE] text-[#111111] relative selection:bg-[#f5d6ed] selection:text-black">
      <GridBackdrop />
      <Navbar />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 pt-28 sm:pt-36 pb-20">
        {/* Back Link */}
        <div className="mb-8">
          <a
            href="/#timeline"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider font-semibold text-[#111111]/70 hover:text-black hover:underline transition-colors"
          >
            <ArrowLeft size={14} strokeWidth={2} />
            Back to Timeline
          </a>
        </div>

        {/* Hero */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-wrap items-center gap-2.5 mb-4">
            <span className="font-mono text-xs font-bold uppercase tracking-wider bg-black text-white px-3 py-1 rounded border border-black shadow-sm">
              SHN #{String(night.id).padStart(2, "0")}
            </span>
            <span
              className={`font-mono text-xs px-3 py-1 rounded font-bold uppercase tracking-wider border border-black shadow-sm ${diff.bg} ${diff.text}`}
            >
              {night.difficulty}
            </span>
            {night.ended && (
              <span className="font-mono text-xs font-bold bg-neutral-900 text-white px-3 py-1 rounded border border-black shadow-sm uppercase tracking-wider">
                Ended · Submissions Evaluated
              </span>
            )}
          </div>

          <SectionHeading accent="pink" as="h1" className="mb-5">
            {night.theme}
          </SectionHeading>

          <div className="flex flex-wrap gap-3 text-black font-mono font-medium text-xs sm:text-sm mb-6">
            <div className="flex items-center gap-2 bg-[#fff6bf] px-3 py-1.5 rounded-lg border border-black shadow-sm">
              <CalendarDays size={14} className="stroke-[2]" />
              <span>{night.date} · 6:00 PM IST</span>
            </div>
            <div className="flex items-center gap-2 bg-[#e0f4fb] px-3 py-1.5 rounded-lg border border-black shadow-sm">
              <Code2 size={14} className="stroke-[2]" />
              <span>{night.stack}</span>
            </div>
            <div className="flex items-center gap-2 bg-[#e6f7e2] px-3 py-1.5 rounded-lg border border-black shadow-sm">
              <Users size={14} strokeWidth={2} />
              <span>Solo or team of 2</span>
            </div>
          </div>
        </motion.div>

        {/* Concise About & Challenge grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-14">
          {/* About */}
          <motion.div
            className="p-6 bg-[#fae4f2] rounded-xl border-2 border-black shadow-sm flex flex-col justify-between"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div>
              <h2 className="font-display font-bold text-lg sm:text-xl text-black mb-2">
                About The Theme
              </h2>
              <p className="text-black/80 font-normal leading-relaxed text-sm sm:text-base">
                {night.about}
              </p>
            </div>
          </motion.div>

          {/* The Challenge */}
          <motion.div
            className="p-6 bg-[#fff6bf] rounded-xl border-2 border-black shadow-sm flex flex-col justify-between border-l-4 border-l-[#ffd34e]"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Target size={15} className="text-black stroke-[2.5]" />
                <h2 className="font-bold text-black text-xs uppercase tracking-wider font-mono">
                  The Challenge
                </h2>
              </div>
              <p className="text-black font-semibold text-sm sm:text-base leading-relaxed mb-4">
                {night.challenge}
              </p>
            </div>
            <div className="font-mono text-[11px] font-semibold text-black/80 bg-white/80 p-2.5 border border-black/20 rounded">
              Push working prototype to public GitHub · Solo or team of 2
            </div>
          </motion.div>
        </div>

        {/* ─── LIVE FEATURED PROJECTS FROM GOOGLE SHEETS ─── */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <h2 className="font-display font-bold text-2xl sm:text-3xl text-black">
                Featured Projects
              </h2>
              <p className="text-black/75 text-sm sm:text-base mt-1 font-normal max-w-xl">
                Standout community submissions from Night 01.
              </p>
            </div>
          </div>

          {/* Live Bento Grid from Google Sheets API */}
          <ProjectBentoGrid />
        </motion.div>

        {/* Mentors */}
        {night.mentors.length > 0 && (
          <motion.div
            className="mb-14"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display font-bold text-xl sm:text-2xl text-black mb-4">
              Mentors for this Night
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {night.mentors.map((mentor) => (
                <div
                  key={mentor.name}
                  className="bg-[#e0f4fb] rounded-xl border-2 border-black p-4 flex items-center gap-4 shadow-sm"
                >
                  <div className="w-11 h-11 rounded-full bg-[#f5d6ed] border border-black flex items-center justify-center font-mono font-bold text-black text-base shadow-sm shrink-0">
                    {mentor.name[0]}
                  </div>
                  <div className="min-w-0">
                    <div className="font-display font-bold text-black text-base">
                      {mentor.name}
                    </div>
                    <div className="text-xs font-mono font-medium text-black/60">
                      {mentor.role}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Starter Resources & Learning Hub Link */}
        {night.starterResources.length > 0 && (
          <motion.div
            className="mb-14"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display font-bold text-xl sm:text-2xl text-black mb-1">
              Resources & Starter Guides
            </h2>
            <p className="text-black/70 font-normal text-sm mb-4">
              Templates and starter resources curated for this sprint.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {night.starterResources.map((resource: Resource) => {
                const Icon = resourceIcons[resource.type];
                return (
                  <a
                    key={resource.title}
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#e6f7e2] rounded-xl border-2 border-black p-4 flex items-center gap-3 group shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"
                  >
                    <div className="w-9 h-9 rounded-lg bg-[#fff6bf] border border-black flex items-center justify-center shrink-0">
                      <Icon size={15} className="text-black stroke-[2]" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-semibold text-black truncate group-hover:underline">
                        {resource.title}
                      </div>
                      <div className="font-mono text-xs font-medium text-black/60 capitalize">
                        {resource.type}
                      </div>
                    </div>
                    <LinkIcon
                      size={13}
                      className="text-black/40 group-hover:text-black shrink-0 transition-colors"
                    />
                  </a>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* Bottom Hub link */}
        <motion.div
          className="rounded-xl border-2 border-black bg-[#fae4f2] text-black p-7 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div>
            <h3 className="font-display font-bold text-xl sm:text-2xl mb-1">
              Looking for Full MediaPipe Tutorials?
            </h3>
            <p className="text-black/75 font-normal text-sm max-w-lg">
              Check out the step-by-step OpenCV code walkthroughs, landmark guides, and comprehensive documentation in our dedicated learning hub.
            </p>
          </div>
          <a
            href="/learn/mediapipe/"
            className="inline-flex items-center gap-2 bg-[#ffd34e] text-black font-bold text-sm px-6 py-3 rounded-lg border-2 border-black shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all shrink-0"
          >
            Open MediaPipe Hub
            <ArrowRight size={15} strokeWidth={2} />
          </a>
        </motion.div>
      </div>

      <Footer />
    </main>
  );
}
