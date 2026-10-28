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
} from "lucide-react";
import type { HackNight, Resource } from "@/lib/data";
import { REGISTER_URL } from "@/lib/data";
import SectionHeading from "@/components/ui/SectionHeading";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import GridBackdrop from "@/components/ui/GridBackdrop";

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

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 pt-28 sm:pt-36 pb-20">
        {/* Back Link */}
        <div className="mb-8">
          <a
            href="/#timeline"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider font-semibold text-[#111111]/70 hover:text-black hover:underline transition-colors"
          >
            <ArrowLeft size={14} strokeWidth={2} />
            Back to All Upcoming Nights
          </a>
        </div>

        {/* Hero */}
        <motion.div
          className="mb-14"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="font-mono text-xs font-bold uppercase tracking-wider bg-black text-white px-3 py-1 rounded border border-black shadow-sm">
              SHN #{String(night.id).padStart(2, "0")}
            </span>
            <span
              className={`font-mono text-xs px-3 py-1 rounded font-bold uppercase tracking-wider border border-black shadow-sm ${diff.bg} ${diff.text}`}
            >
              {night.difficulty}
            </span>
            <span className="font-mono text-xs font-semibold bg-[#e0f4fb] text-black px-3 py-1 rounded border border-black/40">
              Free · Solo or team of 2
            </span>
          </div>

          <SectionHeading accent="pink" as="h1" className="mb-6">
            {night.theme}
          </SectionHeading>

          <div className="flex flex-wrap gap-3 sm:gap-4 text-black font-mono font-medium text-xs sm:text-sm mb-8">
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

          {/* Register CTA */}
          <a
            href={REGISTER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#ffd34e] text-black font-bold text-base px-8 py-3.5 rounded-lg border-2 border-black shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-150"
          >
            Register for this night
            <ArrowRight size={17} strokeWidth={2} />
          </a>
        </motion.div>

        {/* About */}
        <motion.div
          className="mb-12 p-6 sm:p-7 bg-[#fae4f2] rounded-xl border-2 border-black shadow-sm"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-display font-bold text-xl sm:text-2xl text-black mb-2">
            About This Theme
          </h2>
          <p className="text-black/80 font-normal leading-relaxed text-base sm:text-lg">
            {night.about}
          </p>
        </motion.div>

        {/* The Challenge */}
        <motion.div
          className="mb-14 rounded-xl border-2 border-black bg-[#fff6bf] p-6 sm:p-7 shadow-sm border-l-4 border-l-[#ffd34e]"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-2 mb-3">
            <Target size={16} className="text-black stroke-[2.5]" />
            <h2 className="font-bold text-black text-xs uppercase tracking-wider font-mono">
              The Challenge
            </h2>
          </div>
          <p className="text-black font-semibold text-lg sm:text-xl leading-relaxed mb-4">
            {night.challenge}
          </p>
          <div className="font-mono text-xs font-semibold text-black/80 bg-[#fff6bf] inline-block px-3 py-1 border border-black/20 rounded">
            Push to public GitHub · Submit before midnight · Solo or team of 2
          </div>
        </motion.div>

        {/* Mentors */}
        {night.mentors.length > 0 && (
          <motion.div
            className="mb-14"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display font-bold text-xl sm:text-2xl text-black mb-5">
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
                    <div className="text-xs font-mono font-medium text-black/60 mb-2">
                      {mentor.role}
                    </div>
                    <div className="flex items-center gap-3">
                      {mentor.github && (
                        <a
                          href={`https://github.com/${mentor.github}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-black/60 hover:text-black transition-colors"
                        >
                          <Github size={12} />
                          {mentor.github}
                        </a>
                      )}
                      {mentor.twitter && (
                        <a
                          href={`https://twitter.com/${mentor.twitter}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-black/60 hover:text-[#f5d6ed] transition-colors"
                        >
                          <Twitter size={12} />@{mentor.twitter}
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <p className="font-mono text-xs font-medium text-black/60 mt-3">
              Mentors are active in the SHN Discord throughout the night to help unblock you.
            </p>
          </motion.div>
        )}

        {/* Starter Resources */}
        {night.starterResources.length > 0 && (
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display font-bold text-xl sm:text-2xl text-black mb-1">
              Start Here
            </h2>
            <p className="text-black/70 font-normal text-sm mb-5">
              Not familiar with the stack? These resources will get you up to speed before Saturday.
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

        {/* Bottom CTA */}
        <motion.div
          className="rounded-xl border-2 border-black bg-[#fae4f2] text-black p-8 sm:p-10 text-center shadow-sm"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="font-display font-bold text-2xl sm:text-3xl mb-2">
            Ready to build?
          </h3>
          <p className="text-black/75 font-normal text-base mb-6 max-w-lg mx-auto">
            Free to join. No prior experience needed. Build with friends and push to GitHub by midnight.
          </p>
          <a
            href={REGISTER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#d4f5e0] text-black font-bold text-base px-8 py-3.5 rounded-lg border-2 border-black shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-150"
          >
            Register Now — It&apos;s Free
            <ArrowRight size={17} strokeWidth={2} />
          </a>
        </motion.div>
      </div>

      <Footer />
    </main>
  );
}



