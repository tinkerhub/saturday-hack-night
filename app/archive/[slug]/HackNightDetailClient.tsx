"use client";

import { motion } from "@/lib/motion";
import {
  ArrowLeft,
  Star,
  Github,
  Users,
  ExternalLink,
  Code2,
  CalendarDays,
  FolderGit2,
  BookOpen,
  FileText,
  Video,
  Link as LinkIcon,
  Twitter,
} from "lucide-react";
import type { PastHackNight, Project, Resource } from "@/lib/data";
import SectionHeading from "@/components/ui/SectionHeading";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import GridBackdrop from "@/components/ui/GridBackdrop";

const resourceIcons = {
  docs: BookOpen,
  article: FileText,
  video: Video,
  repo: Github,
};

const difficultyColors = {
  Beginner: { bg: "bg-[#d4f5e0]", text: "text-black" },
  Intermediate: { bg: "bg-[#f5d6ed]", text: "text-black" },
  Advanced: { bg: "bg-[#ffd34e]", text: "text-black" },
};

const projectCardPalettes = [
  "bg-[#fae4f2]",
  "bg-[#e0f4fb]",
  "bg-[#e6f7e2]",
  "bg-[#fff6bf]",
];

function ProjectCard({
  project,
  index,
  isBest = false,
}: {
  project: Project;
  index: number;
  isBest?: boolean;
}) {
  const cardBg = isBest ? "bg-[#fff6bf]" : projectCardPalettes[index % projectCardPalettes.length];

  return (
    <motion.div
      className={`rounded-xl border-2 border-black p-6 group relative overflow-hidden transition-all duration-200 ${cardBg} ${
        isBest
          ? "shadow-md border-2 border-black"
          : "shadow-sm hover:shadow-md hover:-translate-y-0.5"
      }`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      viewport={{ once: true }}
    >
      {isBest && (
        <div className="inline-flex items-center gap-1.5 mb-4 px-3 py-1 bg-[#ffd34e] text-black font-mono text-xs font-bold uppercase tracking-wider border border-black rounded shadow-sm">
          <Star size={13} className="text-black stroke-[2]" />
          Best Project of the Night
        </div>
      )}

      <h3 className="font-display font-bold text-black text-xl mb-1.5 leading-snug">
        {project.name}
      </h3>

      {/* Creator / team */}
      <div className="flex items-center gap-1.5 text-black/60 mb-3">
        <Users size={13} className="stroke-[2]" />
        <span className="font-mono text-xs font-medium">
          {project.team && project.team.length > 1
            ? project.team.join(", ")
            : `by ${project.creator}`}
        </span>
      </div>

      {/* Description */}
      {project.description && (
        <p className="text-sm font-normal text-black/75 leading-relaxed mb-4">
          {project.description}
        </p>
      )}

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mb-5">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="font-mono text-xs font-semibold bg-[#fff6bf] border border-black/20 rounded px-2 py-0.5 text-black"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Links */}
      <div className="flex items-center gap-3 pt-3 border-t border-black/15">
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 font-mono text-xs font-bold bg-black text-white px-3 py-1.5 rounded-lg border border-black shadow-sm hover:bg-neutral-800 transition-colors"
          onClick={(e) => e.stopPropagation()}
        >
          <Github size={13} />
          GitHub
        </a>
        {project.liveUrl && project.liveUrl !== "#" && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-mono text-xs font-bold bg-[#fff6bf] text-black px-3 py-1.5 rounded-lg border border-black shadow-sm hover:bg-neutral-50 transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            <ExternalLink size={13} strokeWidth={2} />
            Live Demo
          </a>
        )}
      </div>
    </motion.div>
  );
}

export default function HackNightDetailClient({
  night,
}: {
  night: PastHackNight;
}) {
  const diff = difficultyColors[night.difficulty] || difficultyColors.Beginner;
  const otherProjects = night.allProjects.filter(
    (p) => p.name !== night.bestProject?.name
  );

  return (
    <main className="min-h-screen bg-[#F5F4EE] text-[#111111] relative selection:bg-[#f5d6ed] selection:text-black">
      <GridBackdrop />
      <Navbar />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 pt-28 sm:pt-36 pb-20">
        {/* Back Link */}
        <div className="mb-8">
          <a
            href="/archive/"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider font-semibold text-[#111111]/70 hover:text-black hover:underline transition-colors"
          >
            <ArrowLeft size={14} strokeWidth={2} />
            Back to All Hack Nights
          </a>
        </div>

        {/* Hero header */}
        <motion.div
          className="mb-14"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="font-mono text-xs font-bold uppercase tracking-wider bg-black text-white px-3 py-1 rounded border border-black shadow-sm">
              SHN #{String(night.id).padStart(3, "0")}
            </span>
            <span
              className={`font-mono text-xs px-3 py-1 rounded font-bold uppercase tracking-wider border border-black shadow-sm ${diff.bg} ${diff.text}`}
            >
              {night.difficulty}
            </span>
          </div>

          <SectionHeading accent="green" as="h1" className="mb-6">
            {night.theme}
          </SectionHeading>

          <div className="flex flex-wrap gap-3 sm:gap-4 text-black font-mono font-medium text-xs sm:text-sm">
            <div className="flex items-center gap-2 bg-[#fff6bf] px-3 py-1.5 rounded-lg border border-black shadow-sm">
              <CalendarDays size={14} className="stroke-[2]" />
              <span>{night.date}</span>
            </div>
            <div className="flex items-center gap-2 bg-[#e0f4fb] px-3 py-1.5 rounded-lg border border-black shadow-sm">
              <Code2 size={14} className="stroke-[2]" />
              <span>{night.stack}</span>
            </div>
            <div className="flex items-center gap-2 bg-[#e6f7e2] px-3 py-1.5 rounded-lg border border-black shadow-sm">
              <Users size={14} strokeWidth={2} />
              <span>{night.participants} builders</span>
            </div>
            <div className="flex items-center gap-2 bg-[#fae4f2] px-3 py-1.5 rounded-lg border border-black shadow-sm">
              <FolderGit2 size={14} strokeWidth={2} />
              <span>{night.submittedCount} projects submitted</span>
            </div>
          </div>
        </motion.div>

        {/* Best project highlight */}
        {night.bestProject && (
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <div className="mb-3">
              <span className="font-mono text-xs font-bold uppercase tracking-wider bg-[#ffd34e] text-black px-2.5 py-1 border border-black rounded shadow-sm">
                Highlighted Showcase
              </span>
            </div>
            <ProjectCard project={night.bestProject} index={0} isBest />
          </motion.div>
        )}

        {/* About the theme */}
        {night.about && (
          <motion.div
            className="mb-14 p-6 sm:p-7 bg-[#fae4f2] rounded-xl border-2 border-black shadow-sm"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display font-bold text-xl sm:text-2xl text-black mb-2">
              About This Theme
            </h2>
            <p className="text-black/80 font-normal leading-relaxed text-base sm:text-lg max-w-4xl">
              {night.about}
            </p>
          </motion.div>
        )}

        {/* Mentors */}
        {night.mentors.length > 0 && (
          <motion.div
            className="mb-14"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display font-bold text-xl sm:text-2xl text-black mb-5">
              Mentors
            </h2>
            <div className="flex flex-wrap gap-4">
              {night.mentors.map((mentor) => (
                <div
                  key={mentor.name}
                  className="bg-[#e0f4fb] rounded-xl border-2 border-black p-4 flex items-center gap-4 min-w-[220px] shadow-sm hover:shadow-md transition-all"
                >
                  <div className="w-11 h-11 rounded-full bg-[#f5d6ed] border border-black flex items-center justify-center font-mono font-bold text-black text-base shadow-sm">
                    {mentor.name[0]}
                  </div>
                  <div>
                    <div className="font-display font-bold text-black text-base">
                      {mentor.name}
                    </div>
                    <div className="font-mono text-xs text-black/60 font-medium">
                      {mentor.role}
                    </div>
                    <div className="flex items-center gap-3 mt-1.5">
                      {mentor.github && (
                        <a
                          href={`https://github.com/${mentor.github}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-black/60 hover:text-black transition-colors"
                        >
                          <Github size={13} />
                        </a>
                      )}
                      {mentor.twitter && (
                        <a
                          href={`https://twitter.com/${mentor.twitter}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-black/60 hover:text-[#f5d6ed] transition-colors"
                        >
                          <Twitter size={13} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Resources */}
        {night.resources.length > 0 && (
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display font-bold text-xl sm:text-2xl text-black mb-5">
              Resources &amp; Starter Kits
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {night.resources.map((resource: Resource) => {
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

        {/* All other submitted projects */}
        <div>
          <motion.div
            className="mb-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display font-bold text-xl sm:text-2xl text-black">
              All Submitted Projects ({night.allProjects.length})
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {otherProjects.map((project, i) => (
              <ProjectCard key={project.name} project={project} index={i} />
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}



