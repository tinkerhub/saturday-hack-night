"use client";

import { motion } from "@/lib/motion";
import { ArrowRight, Star, Users, FolderGit2, ArrowLeft } from "lucide-react";
import { pastHackNights } from "@/lib/data";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import GridBackdrop from "@/components/ui/GridBackdrop";
import SectionHeading from "@/components/ui/SectionHeading";

const archiveCardPalettes = [
  { cardBg: "bg-[#fae4f2]", tagBg: "bg-[#f5d6ed]" },
  { cardBg: "bg-[#e6f7e2]", tagBg: "bg-[#d4f5e0]" },
  { cardBg: "bg-[#e0f4fb]", tagBg: "bg-[#aeeaf5]" },
  { cardBg: "bg-[#fff6bf]", tagBg: "bg-[#ffd34e]" },
];

export default function ArchivePage() {
  const totalParticipants = pastHackNights.reduce(
    (sum, n) => sum + n.participants,
    0
  );
  const totalProjects = pastHackNights.reduce(
    (sum, n) => sum + n.submittedCount,
    0
  );

  return (
    <main className="min-h-screen bg-[#F5F4EE] text-[#111111] relative selection:bg-[#f5d6ed] selection:text-black">
      <GridBackdrop />
      <Navbar />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 pt-28 sm:pt-36 pb-20">
        {/* Breadcrumb link */}
        <div className="mb-8">
          <a
            href="/"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider font-semibold text-[#111111]/70 hover:text-black hover:underline transition-colors"
          >
            <ArrowLeft size={14} strokeWidth={2} />
            Back to Saturday Hack Night
          </a>
        </div>

        {/* Page header */}
        <motion.div
          className="mb-14"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="font-mono text-xs font-bold uppercase tracking-wider mb-3 bg-[#f5d6ed] text-black inline-block px-3 py-1 border border-black rounded shadow-sm">
            Every Night. Every Project.
          </p>
          <SectionHeading accent="pink" as="h1" className="mb-4">
            Past Hack Nights
          </SectionHeading>
          <p className="text-black/75 font-normal text-lg max-w-xl">
            A record of every Saturday, every theme, and every project shipped
            by the SHN community.
          </p>

          {/* Aggregate stats in Lite Tones */}
          <div className="flex flex-wrap gap-4 sm:gap-6 mt-8">
            {[
              {
                value: pastHackNights.length,
                label: "Hack Nights",
                cardBg: "bg-[#fae4f2]",
                tagBg: "bg-[#f5d6ed]",
              },
              {
                value: totalParticipants + "+",
                label: "Builders",
                cardBg: "bg-[#e6f7e2]",
                tagBg: "bg-[#d4f5e0]",
              },
              {
                value: totalProjects + "+",
                label: "Projects Shipped",
                cardBg: "bg-[#e0f4fb]",
                tagBg: "bg-[#aeeaf5]",
              },
            ].map((stat) => (
              <div
                key={stat.label}
                className={`${stat.cardBg} text-black border-2 border-black rounded-xl p-4 sm:p-5 min-w-[150px] shadow-sm relative overflow-hidden`}
              >
                <div className="font-mono text-3xl sm:text-4xl font-bold">
                  {stat.value}
                </div>
                <div className="font-mono text-xs font-bold text-black/70 uppercase tracking-wider mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Hack night cards */}
        <div className="space-y-6">
          {pastHackNights.map((night, i) => {
            const palette = archiveCardPalettes[i % archiveCardPalettes.length];
            return (
              <motion.a
                key={night.slug}
                href={`/archive/${night.slug}/`}
                className={`rounded-xl border-2 border-black ${palette.cardBg} text-black p-6 sm:p-7 flex flex-col sm:flex-row gap-6 group shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 block`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
              >
                {/* Left: Number */}
                <div className="shrink-0">
                  <div className="font-mono text-3xl sm:text-4xl font-bold text-black/40 leading-none w-16">
                    #{String(night.id).padStart(3, "0")}
                  </div>
                </div>

                {/* Center: Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <h2 className="font-display text-xl sm:text-2xl font-bold text-black group-hover:text-black/80">
                      {night.theme}
                    </h2>
                    <span className={`font-mono text-xs px-2.5 py-0.5 rounded font-semibold uppercase tracking-wider ${palette.tagBg} text-black border border-black/40`}>
                      {night.difficulty}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2.5 mb-4 font-mono text-xs font-medium text-black/70">
                    <span className="bg-[#fff6bf] px-2 py-0.5 rounded border border-black/20">
                      {night.date}
                    </span>
                    <span className="bg-[#fff6bf] px-2 py-0.5 rounded border border-black/20">
                      {night.stack}
                    </span>
                  </div>

                  {/* Best project preview */}
                  <div className="flex items-start gap-2.5 p-3 rounded-lg border border-black/20 bg-[#fff6bf] mb-4 max-w-lg">
                    <Star
                      size={14}
                      className="text-black/70 mt-0.5 shrink-0 stroke-[2]"
                    />
                    <div className="min-w-0">
                      <p className="font-mono text-[10px] font-bold text-black/60 mb-0.5 uppercase tracking-wider">
                        Best Project
                      </p>
                      <p className="font-semibold text-black text-sm truncate">
                        {night.bestProject.name}
                      </p>
                      <p className="font-mono text-xs text-black/70 font-normal">
                        {night.bestProject.description}
                      </p>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex flex-wrap items-center gap-3">
                    <div className="flex items-center gap-1.5 bg-[#fff6bf] border border-black/20 px-2.5 py-1 rounded text-black font-mono text-xs font-medium">
                      <Users size={13} strokeWidth={2} />
                      <span>{night.participants} builders</span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-[#fff6bf] border border-black/20 px-2.5 py-1 rounded text-black font-mono text-xs font-medium">
                      <FolderGit2 size={13} strokeWidth={2} />
                      <span>{night.submittedCount} projects submitted</span>
                    </div>
                  </div>
                </div>

                {/* Right: CTA */}
                <div className="shrink-0 flex items-center">
                  <div className="flex items-center gap-2 font-mono text-xs font-bold bg-black text-white px-4 py-2 rounded-lg border border-black shadow-sm group-hover:bg-neutral-800 transition-colors">
                    <span>View projects</span>
                    <ArrowRight size={13} strokeWidth={2} />
                  </div>
                </div>
              </motion.a>
            );
          })}
        </div>
      </div>

      <Footer />
    </main>
  );
}




