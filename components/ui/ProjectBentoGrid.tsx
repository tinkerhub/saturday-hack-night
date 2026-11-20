"use client";

import { useEffect, useState, useCallback } from "react";
import { motion } from "@/lib/motion";
import { ExternalLink, User, Star, AlertCircle, RefreshCw, Sparkles } from "lucide-react";
import type { Project } from "@/lib/data";

interface ProjectBentoGridProps {
  projects?: Project[];
}

interface ProjectCardProps {
  project: Project;
  featured?: boolean;
  index: number;
}

const cardColors = [
  { bg: "bg-[#fff6bf]", tagBg: "bg-[#ffd34e]" }, // Yellow spotlight
  { bg: "bg-[#e0f4fb]", tagBg: "bg-[#aeeaf5]" }, // Soft Cyan
  { bg: "bg-[#e6f7e2]", tagBg: "bg-[#d4f5e0]" }, // Mint Green
];

function ProjectCard({ project, featured, index }: ProjectCardProps) {
  const colorScheme = cardColors[index % cardColors.length];

  return (
    <motion.div
      className={`rounded-xl border-2 border-black p-6 sm:p-7 relative overflow-hidden flex flex-col justify-between transition-all duration-200 ${
        colorScheme.bg
      } text-black shadow-sm hover:shadow-md hover:-translate-y-0.5 ${
        featured ? "md:col-span-2" : "md:col-span-1"
      }`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      viewport={{ once: true }}
    >
      <div>
        {/* Header row: Badge & Number */}
        <div className="flex items-start justify-between border-b border-black/15 pb-3 mb-4">
          <div className="flex items-center gap-2">
            {featured ? (
              <span className="inline-flex items-center gap-1.5 font-mono text-[11px] font-bold uppercase tracking-wider bg-[#ffd34e] text-black px-2.5 py-1 rounded border border-black shadow-xs">
                <Star size={13} className="text-black stroke-[2.5]" />
                Top Featured
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 font-mono text-[11px] font-bold uppercase tracking-wider bg-white/90 text-black px-2.5 py-1 rounded border border-black/30">
                <Sparkles size={12} className="text-black stroke-[2]" />
                Featured Pick
              </span>
            )}
          </div>
          <span className="font-mono text-2xl font-bold text-black/30 leading-none">
            #{String(index + 1).padStart(2, "0")}
          </span>
        </div>

        {/* Project Title */}
        <h3
          className={`font-display font-bold text-black mb-2 leading-snug ${
            featured ? "text-2xl sm:text-3xl" : "text-xl sm:text-2xl"
          }`}
        >
          {project.name}
        </h3>

        {/* Creator / Team */}
        <div className="flex items-center gap-1.5 text-black/70 mb-3.5">
          <User size={14} className="stroke-[2]" />
          <span className="font-mono text-xs font-semibold">
            {project.creator ? `by ${project.creator}` : "by Community Builder"}
          </span>
        </div>

        {/* Description */}
        {project.description && (
          <p
            className={`text-black/80 font-normal leading-relaxed mb-5 ${
              featured ? "text-sm sm:text-base line-clamp-3" : "text-sm line-clamp-2"
            }`}
          >
            {project.description}
          </p>
        )}

        {/* Tags */}
        {project.tags && project.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-6">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="font-mono text-xs bg-white/90 border border-black/30 rounded px-2.5 py-0.5 text-black font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Action Links */}
      <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-black/10 mt-auto">
        {project.github && project.github !== "#" && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-mono text-xs font-bold text-black bg-white border border-black px-3 py-1.5 rounded hover:bg-black hover:text-white transition-colors shadow-xs"
          >
            <ExternalLink size={13} className="stroke-[2]" />
            Source Code
          </a>
        )}

        {project.liveUrl && project.liveUrl !== "#" && project.liveUrl !== project.github && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-mono text-xs font-bold text-black bg-[#ffd34e] border border-black px-3 py-1.5 rounded hover:bg-black hover:text-white transition-colors shadow-xs"
          >
            <ExternalLink size={13} className="stroke-[2]" />
            Live Demo
          </a>
        )}
      </div>
    </motion.div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch animate-pulse">
      {/* 1 large skeleton card */}
      <div className="md:col-span-2 rounded-xl border-2 border-black/30 bg-[#fff6bf]/60 p-6 sm:p-7 min-h-[260px] flex flex-col justify-between">
        <div>
          <div className="h-6 w-32 bg-black/15 rounded mb-4" />
          <div className="h-8 w-2/3 bg-black/15 rounded mb-3" />
          <div className="h-4 w-1/4 bg-black/10 rounded mb-4" />
          <div className="h-4 w-full bg-black/10 rounded mb-2" />
          <div className="h-4 w-4/5 bg-black/10 rounded mb-6" />
        </div>
        <div className="flex gap-2">
          <div className="h-8 w-28 bg-black/15 rounded" />
          <div className="h-8 w-24 bg-black/15 rounded" />
        </div>
      </div>

      {/* 2 smaller skeleton cards */}
      {[1, 2].map((i) => (
        <div
          key={i}
          className="md:col-span-1 rounded-xl border-2 border-black/30 bg-[#e0f4fb]/60 p-6 min-h-[220px] flex flex-col justify-between"
        >
          <div>
            <div className="h-5 w-24 bg-black/15 rounded mb-4" />
            <div className="h-7 w-3/4 bg-black/15 rounded mb-3" />
            <div className="h-4 w-1/3 bg-black/10 rounded mb-4" />
            <div className="h-4 w-full bg-black/10 rounded mb-4" />
          </div>
          <div className="h-8 w-28 bg-black/15 rounded" />
        </div>
      ))}
    </div>
  );
}

export default function ProjectBentoGrid({
  projects: initialProjects,
}: ProjectBentoGridProps) {
  const [projects, setProjects] = useState<Project[]>(initialProjects || []);
  const [loading, setLoading] = useState<boolean>(!initialProjects);
  const [error, setError] = useState<string | null>(null);

  const fetchProjects = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch("/api/projects/", {
        headers: { "Cache-Control": "no-cache" },
      });
      if (!res.ok) {
        throw new Error(`Failed to load projects (Status ${res.status})`);
      }
      const data = await res.json();
      if (data.success && Array.isArray(data.projects)) {
        setProjects(data.projects);
      } else {
        throw new Error(data.error || "Invalid response from projects API");
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Error fetching projects";
      setError(msg);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!initialProjects) {
      fetchProjects();
    }
  }, [initialProjects, fetchProjects]);

  // Loading state
  if (loading) {
    return <LoadingSkeleton />;
  }

  // Error state
  if (error) {
    return (
      <div className="rounded-xl border-2 border-black bg-[#fae4f2] text-black p-6 sm:p-8 text-center shadow-sm">
        <div className="inline-flex p-3 rounded-full bg-white border border-black mb-3">
          <AlertCircle className="w-6 h-6 text-black" />
        </div>
        <h4 className="font-display font-bold text-lg mb-1">
          Unable to Load Featured Projects
        </h4>
        <p className="text-black/70 text-sm max-w-md mx-auto mb-4 font-normal">
          {error}
        </p>
        <button
          onClick={() => fetchProjects()}
          className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider font-bold text-black bg-[#fff6bf] border-2 border-black px-4 py-2 rounded shadow-xs hover:bg-[#ffd34e] transition-colors cursor-pointer"
        >
          <RefreshCw size={13} className="stroke-[2]" />
          Retry Connection
        </button>
      </div>
    );
  }

  // Empty state
  if (!projects || projects.length === 0) {
    return (
      <div className="rounded-xl border-2 border-black bg-[#fff6bf]/80 text-black p-8 text-center shadow-sm">
        <p className="font-mono text-xs uppercase tracking-wider font-bold text-black/70 mb-2">
          Spreadsheet Sync Active
        </p>
        <h4 className="font-display font-bold text-xl mb-2">
          No Featured Projects Selected Yet
        </h4>
        <p className="text-black/70 text-sm max-w-lg mx-auto font-normal">
          Mark projects as <span className="font-mono font-bold bg-white px-1.5 py-0.5 border border-black/30 rounded">YES</span> under the <span className="font-mono font-bold">Featured</span> column in the Google Spreadsheet to feature up to 3 projects here.
        </p>
      </div>
    );
  }

  // Display projects in Bento Grid
  return (
    <>
      {/* Mobile: horizontal snap-scroll or stack */}
      <div className="md:hidden flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide -mx-4 px-4">
        {projects.map((project, i) => (
          <div key={project.name + i} className="min-w-[85vw] snap-start shrink-0">
            <ProjectCard project={project} featured={i === 0} index={i} />
          </div>
        ))}
      </div>

      {/* Desktop: Bento Grid (First project 2 cols, subsequent 1 col each) */}
      <div className="hidden md:grid md:grid-cols-2 gap-6 items-stretch">
        {projects.map((project, i) => (
          <ProjectCard
            key={project.name + i}
            project={project}
            featured={i === 0}
            index={i}
          />
        ))}
      </div>
    </>
  );
}
