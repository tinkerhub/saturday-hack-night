"use client";

import { motion } from "@/lib/motion";
import { ExternalLink, User } from "lucide-react";
import type { Project } from "@/lib/data";

interface ProjectBentoGridProps {
  projects: Project[];
}

interface ProjectCardProps {
  project: Project;
  featured?: boolean;
  index: number;
}

function ProjectCard({ project, featured, index }: ProjectCardProps) {
  return (
    <motion.div
      className={`glass-card rounded-xl p-6 relative overflow-hidden group cursor-pointer ${
        featured ? "md:col-span-2" : ""
      }`}
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      viewport={{ once: true }}
    >
      {/* Hover overlay */}
      <div className="absolute inset-0 bg-[#d4f5e0]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />

      {/* Content */}
      <div className="relative z-10">
        <h3
          className={`font-bold text-white mb-1 ${featured ? "text-2xl" : "text-lg"}`}
        >
          {project.name}
        </h3>

        <div className="flex items-center gap-1.5 text-[#9a90b8] mb-4">
          <User size={12} />
          <span className="font-mono text-xs">by {project.creator}</span>
        </div>

        {/* Tags — visible always */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="font-mono text-xs bg-[#fff6bf] border border-white/8 rounded px-2 py-0.5 text-[#f5d6ed]"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* GitHub link — revealed on hover */}
        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-mono text-sm text-[#d4f5e0] hover:underline"
            onClick={(e) => e.stopPropagation()}
          >
            <ExternalLink size={14} />
            View on GitHub
          </a>
        </div>
      </div>

      {/* Decorative corner accent */}
      <div
        className="absolute top-0 right-0 w-20 h-20 opacity-0 group-hover:opacity-10 transition-opacity duration-500"
        style={{
          background:
            "radial-gradient(circle at top right, #d4f5e0, transparent)",
        }}
      />
    </motion.div>
  );
}

export default function ProjectBentoGrid({ projects }: ProjectBentoGridProps) {
  return (
    <>
      {/* Mobile: horizontal scroll */}
      <div className="md:hidden flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide -mx-5 px-5">
        {projects.map((project, i) => (
          <div key={project.name} className="min-w-[80vw] snap-start shrink-0">
            <ProjectCard project={project} featured={false} index={i} />
          </div>
        ))}
      </div>
      {/* Desktop: grid */}
      <div className="hidden md:grid md:grid-cols-2 gap-4">
        {projects.map((project, i) => (
          <ProjectCard
            key={project.name}
            project={project}
            featured={i === 0}
            index={i}
          />
        ))}
      </div>
    </>
  );
}




