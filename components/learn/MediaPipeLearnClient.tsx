"use client";

import { useState } from "react";
import { motion } from "@/lib/motion";
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  BookOpen,
  Code2,
  Cpu,
  Layers,
  Sparkles,
  Zap,
  Eye,
  CheckCircle2,
  FolderGit2,
  Users,
  Compass,
  Laptop,
  Play,
  Github,
  MessageSquare,
  MapPin,
  ChevronRight,
  Flame,
  Activity,
  Lightbulb,
  Radio,
  FileCode2,
  Share2,
  Phone,
  UploadCloud,
  Video,
  Film,
  Check,
  GitFork,
  HelpCircle,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import GridBackdrop from "@/components/ui/GridBackdrop";
import CodeBlock from "./CodeBlock";
import TableOfContents from "./TableOfContents";
import {
  mediapipeQuickstartCode,
  distanceCalculationCode,
  colabSnippet,
  realWorldApps,
  mediapipeCapabilities,
  documentationResources,
  tutorialsList,
  projectIdeas,
  mentorInfo,
  coordinatorsList,
  MEDIAPIPE_STARTER_REPO,
  MEDIAPIPE_FORK_URL,
  starterTemplateGitCommands,
  MEDIAPIPE_STARTER_REPO_URL,
  MEDIAPIPE_STARTER_FORK_URL,
  MEDIAPIPE_STARTER_GIT_CLONE_URL,
} from "@/lib/mediapipeData";
import { REGISTER_URL, DISCORD_URL, TINKERSPACE_MAPS_URL } from "@/lib/data";

const difficultyBadgeColors: Record<string, string> = {
  Beginner: "bg-[#d4f5e0] text-black border-black",
  Intermediate: "bg-[#f5d6ed] text-black border-black",
  Advanced: "bg-[#ffd34e] text-black border-black",
};

export default function MediaPipeLearnClient() {
  const [activeTutorialTab, setActiveTutorialTab] = useState<string>("All");
  const [activeProjectTab, setActiveProjectTab] = useState<string>("All");
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);

  const filteredTutorials =
    activeTutorialTab === "All"
      ? tutorialsList
      : tutorialsList.filter((t) => t.level === activeTutorialTab);

  const filteredProjects =
    activeProjectTab === "All"
      ? projectIdeas
      : projectIdeas.filter((p) => p.difficulty === activeProjectTab);

  return (
    <main className="min-h-screen bg-[#F5F4EE] text-[#111111] relative selection:bg-[#f28ad8] selection:text-black">
      {/* Editorial paper grid backdrop */}
      <GridBackdrop />

      {/* Main Global Navigation */}
      <Navbar />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-32 pb-24">
        {/* Breadcrumb Navigation */}
        <div className="flex flex-wrap items-center gap-2 mb-8 font-mono text-xs uppercase tracking-wider text-black/70">
          <a
            href="/"
            className="hover:text-black font-semibold hover:underline flex items-center gap-1.5"
          >
            <ArrowLeft size={13} strokeWidth={2.5} />
            Home
          </a>
          <span>/</span>
          <a
            href="/events/shn-s2-001-beyond-gesture/"
            className="hover:text-black font-semibold hover:underline"
          >
            Sprint 01: Beyond Gesture
          </a>
          <span>/</span>
          <span className="text-black font-bold bg-[#ffd34e] px-2 py-0.5 border border-black rounded shadow-xs">
            MediaPipe Learning Hub
          </span>
        </div>

        {/* Hero Banner */}
        <motion.header
          className="mb-12 border-2 border-black rounded-2xl bg-white p-6 sm:p-10 lg:p-12 shadow-hard relative overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Decorative Corner Accents */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#aeeaf5] -mr-16 -mt-16 rounded-full border-2 border-black opacity-60 pointer-events-none" />
          <div className="absolute bottom-0 right-12 w-16 h-16 bg-[#f28ad8] -mb-8 rounded-full border-2 border-black opacity-40 pointer-events-none" />

          <div className="relative z-10 max-w-3xl">
            {/* Pill Badges */}
            <div className="flex flex-wrap items-center gap-2.5 mb-5">
              <span className="font-mono text-xs font-bold uppercase tracking-wider bg-[#f28ad8] text-black px-3 py-1 rounded-md border border-black shadow-xs flex items-center gap-1.5">
                <Sparkles size={13} />
                Saturday Hack Night Guide
              </span>
              <span className="font-mono text-xs font-bold uppercase tracking-wider bg-[#91e47a] text-black px-3 py-1 rounded-md border border-black shadow-xs">
                🌾 Season 02: Agriculture & Food
              </span>
              <span className="font-mono text-xs font-semibold bg-[#ffd34e] text-black px-3 py-1 rounded-md border border-black shadow-xs">
                Sprint #01 Stack
              </span>
            </div>

            {/* Title */}
            <h1 className="font-display font-bold text-4xl sm:text-6xl lg:text-7xl text-black tracking-tight leading-[0.95] mb-6">
              MediaPipe <br />
              <span className="text-black/60">Learning Hub</span>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-xl text-black/80 font-normal leading-relaxed mb-6 max-w-2xl">
              Turn your webcam into an intelligent gesture controller. MediaPipe runs
              state-of-the-art computer vision models—tracking hands, face meshes, and full-body
              skeletons—directly on your device at 30+ FPS without needing external cloud servers.
            </p>

            {/* Season 02 Theme Vector Callout */}
            <div className="mb-4 p-4 rounded-xl border-2 border-black bg-[#fff6bf] shadow-xs flex items-start gap-3">
              <span className="text-xl shrink-0">🌾</span>
              <div>
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-black block mb-0.5">
                  Season 02 Focus: Agriculture & Food
                </span>
                <p className="text-xs sm:text-sm text-black/85 font-medium leading-relaxed">
                  Build anything that solves a problem in this vector using MediaPipe! From touchless crop inspection and produce quality grading to hands-free farm machinery controls and kitchen hygiene solutions.
                </p>
              </div>
            </div>

            {/* Official Starter Template Fork Banner */}
            <div className="mb-6 p-5 sm:p-6 rounded-2xl border-2 border-black bg-[#d4f5e0] shadow-hard-sm">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-xs font-bold uppercase tracking-wider bg-black text-white px-2.5 py-0.5 rounded flex items-center gap-1.5">
                    <FolderGit2 size={13} />
                    Official Starter Template
                  </span>
                  <span className="font-mono text-xs font-bold uppercase tracking-wider bg-[#ffd34e] text-black px-2 py-0.5 rounded border border-black shadow-xs">
                    ⚠️ Fork Required
                  </span>
                </div>
                <span className="font-mono text-xs font-bold text-black/75">
                  TINKERHUB-SATURDAY-HACKNIGHT / SHN-MEDIAPIPE
                </span>
              </div>

              <h2 className="font-display font-bold text-xl sm:text-2xl text-black mb-2">
                Fork the Starter Template Before You Start Building!
              </h2>

              <p className="text-xs sm:text-sm text-black/85 font-medium leading-relaxed mb-4">
                We have provided an official starter template repo with ready-to-run MediaPipe boilerplate and webcam streaming helpers.
                <strong> Don&apos;t forget: You must fork this repository to your own GitHub account before you start building.</strong>
              </p>

              {/* Step Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mb-5 font-mono text-xs">
                <div className="bg-white p-3 rounded-lg border-2 border-black shadow-xs">
                  <div className="font-bold text-black flex items-center gap-1.5 mb-1 text-[11px] uppercase">
                    <GitFork size={13} className="text-[#f28ad8]" />
                    1. Fork Before Building
                  </div>
                  <p className="text-black/75 text-[11px] font-sans leading-tight">
                    Hit the Fork button to create your own copy on GitHub before writing any code.
                  </p>
                </div>
                <div className="bg-white p-3 rounded-lg border-2 border-black shadow-xs">
                  <div className="font-bold text-black flex items-center gap-1.5 mb-1 text-[11px] uppercase">
                    <Laptop size={13} className="text-[#0088cc]" />
                    2. Clone &amp; Commit Often
                  </div>
                  <p className="text-black/75 text-[11px] font-sans leading-tight">
                    Clone your fork locally. Commit every change continuously before moving to the next!
                  </p>
                </div>
                <div className="bg-white p-3 rounded-lg border-2 border-black shadow-xs">
                  <div className="font-bold text-black flex items-center gap-1.5 mb-1 text-[11px] uppercase">
                    <HelpCircle size={13} className="text-[#e29600]" />
                    3. Ask Doubts Before
                  </div>
                  <p className="text-black/75 text-[11px] font-sans leading-tight">
                    Stuck or have doubts? Ask mentors on Discord before starting your build!
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
                <a
                  href={MEDIAPIPE_FORK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-black text-white hover:bg-black/85 font-mono font-bold text-xs sm:text-sm px-4 sm:px-5 py-2.5 rounded-lg border-2 border-black shadow-hard-sm hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
                >
                  <GitFork size={15} />
                  Fork Repository on GitHub
                  <ExternalLink size={13} />
                </a>
                <a
                  href={MEDIAPIPE_STARTER_REPO}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white text-black hover:bg-[#fff6bf] font-mono font-bold text-xs sm:text-sm px-3.5 sm:px-4 py-2.5 rounded-lg border-2 border-black shadow-hard-sm hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
                >
                  <Github size={15} />
                  View Template Repo
                </a>
                <a
                  href={DISCORD_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#f5d6ed] text-black hover:bg-[#f28ad8] font-mono font-bold text-xs sm:text-sm px-3.5 sm:px-4 py-2.5 rounded-lg border-2 border-black shadow-hard-sm hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
                >
                  <MessageSquare size={14} />
                  Ask Doubts on Discord
                </a>
              </div>
            </div>

            {/* Official Starter Template Fork Callout */}
            <div className="mb-4 p-4 sm:p-5 rounded-xl border-2 border-black bg-[#91e47a] shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-black text-[#91e47a] flex items-center justify-center shrink-0 border border-black shadow-xs">
                  <Github size={20} />
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="font-mono text-[11px] font-bold uppercase tracking-wider bg-black text-white px-2 py-0.5 rounded">
                      Official Starter Template
                    </span>
                    <span className="font-mono text-[11px] font-bold text-black uppercase">
                      ⚠️ Fork Before Starting
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-black font-bold leading-snug">
                    Don&apos;t forget to fork the template repository before you start building!
                  </p>
                  <p className="text-xs text-black/80 font-medium mt-0.5">
                    Fork <span className="font-mono font-bold">SHN-MEDIAPIPE</span> to your account, clone locally, and build on it.
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto shrink-0">
                <a
                  href={MEDIAPIPE_STARTER_FORK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-black text-white font-mono font-bold text-xs px-4 py-2.5 rounded-lg border-2 border-black shadow-hard-sm hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all w-full sm:w-auto"
                >
                  <FolderGit2 size={14} />
                  Fork Template
                  <ExternalLink size={12} />
                </a>
                <a
                  href={MEDIAPIPE_STARTER_REPO_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 bg-white text-black font-mono font-bold text-xs px-3.5 py-2.5 rounded-lg border-2 border-black shadow-hard-sm hover:bg-[#fff6bf] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all w-full sm:w-auto"
                >
                  <Github size={14} />
                  View Repo
                </a>
              </div>
            </div>

            {/* Commit History Requirement Alert */}
            <div className="mb-8 p-3.5 rounded-xl border-2 border-black bg-[#ffd34e] shadow-xs flex items-center gap-3">
              <span className="text-lg shrink-0">⚠️</span>
              <div>
                <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-black block">
                  Mandatory Submission Rule
                </span>
                <p className="text-xs text-black font-semibold leading-snug">
                  Don&apos;t forget to commit every change before making another move — commit history will be verified during project evaluation!
                </p>
              </div>
            </div>

            {/* Quick Metadata Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t-2 border-black/10 font-mono text-xs">
              <div className="bg-[#f5f4ee] p-3 rounded-lg border border-black/20">
                <span className="text-black/50 block text-[10px] uppercase font-bold">Domain</span>
                <span className="font-bold text-black text-sm">Computer Vision</span>
              </div>
              <div className="bg-[#f5f4ee] p-3 rounded-lg border border-black/20">
                <span className="text-black/50 block text-[10px] uppercase font-bold">Languages</span>
                <span className="font-bold text-black text-sm">Python / JavaScript</span>
              </div>
              <div className="bg-[#f5f4ee] p-3 rounded-lg border border-black/20">
                <span className="text-black/50 block text-[10px] uppercase font-bold">Difficulty</span>
                <span className="font-bold text-black text-sm">Beginner Friendly</span>
              </div>
              <div className="bg-[#f5f4ee] p-3 rounded-lg border border-black/20">
                <span className="text-black/50 block text-[10px] uppercase font-bold">Hack Goal</span>
                <span className="font-bold text-black text-sm">6-Hour Prototype</span>
              </div>
            </div>

            {/* Quick CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 mt-8">
              <a
                href={MEDIAPIPE_FORK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-black text-white font-bold text-sm px-5 py-3 rounded-lg border-2 border-black shadow-hard-sm hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
              >
                <GitFork size={15} />
                Fork Starter Template
              </a>
              <a
                href="#starter-template"
                className="inline-flex items-center gap-2 bg-[#91e47a] text-black font-bold text-sm px-6 py-3 rounded-lg border-2 border-black shadow-hard-sm hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
              >
                <FolderGit2 size={15} />
                Fork Starter Template
              </a>
              <a
                href="#what-is-mediapipe"
                className="inline-flex items-center gap-2 bg-[#ffd34e] text-black font-bold text-sm px-5 py-3 rounded-lg border-2 border-black shadow-hard-sm hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
              >
                Start Learning
                <ArrowRight size={15} />
              </a>
              <a
                href="#project-ideas"
                className="inline-flex items-center gap-2 bg-white text-black font-bold text-sm px-5 py-3 rounded-lg border-2 border-black shadow-hard-sm hover:bg-[#aeeaf5] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
              >
                Browse Project Ideas
                <Lightbulb size={15} />
              </a>
            </div>
          </div>
        </motion.header>

        {/* Content Layout with Responsive Sticky Table of Contents */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Content Area */}
          <div className="lg:col-span-8 space-y-8">
            {/* ──────────────────────────────────────────────────────────── */}
            {/* 1. What is MediaPipe? */}
            {/* ──────────────────────────────────────────────────────────── */}
            <section id="what-is-mediapipe" className="scroll-mt-24">
              <div className="border-2 border-black rounded-2xl bg-white p-5 sm:p-7 shadow-hard-sm space-y-6">
                {/* Section Header */}
                <div className="flex items-center gap-3 pb-3 border-b-2 border-black">
                  <span className="font-mono font-bold text-sm bg-black text-white px-2.5 py-0.5 rounded">
                    01
                  </span>
                  <h2 className="font-display font-bold text-xl sm:text-2xl text-black">
                    What is MediaPipe?
                  </h2>
                </div>

                {/* Introduction & Architecture Core Pillars */}
                <div>
                  <p className="text-black/80 text-xs sm:text-sm leading-relaxed mb-4">
                    <strong>MediaPipe</strong> is Google’s open-source framework for deploying multimodal machine learning pipelines directly onto edge devices (laptops, phones, browsers) at 30+ FPS without cloud GPUs.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
                    <div className="bg-[#f5f4ee] p-3 rounded-lg border-2 border-black shadow-xs">
                      <span className="font-bold text-black block mb-1 text-[11px] uppercase">⚡ On-Device Edge ML</span>
                      <p className="text-black/75 text-[11px] leading-tight font-sans">
                        Zero cloud latency. Executes directly on local CPU/GPU for instant reaction speeds.
                      </p>
                    </div>
                    <div className="bg-[#f5f4ee] p-3 rounded-lg border-2 border-black shadow-xs">
                      <span className="font-bold text-black block mb-1 text-[11px] uppercase">🎯 2-Stage Tracking</span>
                      <p className="text-black/75 text-[11px] leading-tight font-sans">
                        Detects bounding ROI once, then tracks 3D keypoints across subsequent video frames.
                      </p>
                    </div>
                    <div className="bg-[#f5f4ee] p-3 rounded-lg border-2 border-black shadow-xs">
                      <span className="font-bold text-black block mb-1 text-[11px] uppercase">🛠 Tasks API</span>
                      <p className="text-black/75 text-[11px] leading-tight font-sans">
                        Simple high-level Python &amp; JS classes for hands, faces, gestures, and poses.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Understanding Computer Vision Strip */}
                <div className="p-3.5 rounded-xl border-2 border-black bg-[#aeeaf5]">
                  <div className="flex items-center gap-2 mb-1.5">
                    <Eye size={16} className="text-black stroke-[2.5]" />
                    <h3 className="font-display font-bold text-sm text-black">
                      How Computer Vision Works in MediaPipe
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 font-mono text-[11px]">
                    <div className="bg-white px-2.5 py-1.5 rounded border border-black">
                      <strong>1. Pixels:</strong> Matrix of RGB color frames
                    </div>
                    <div className="bg-white px-2.5 py-1.5 rounded border border-black">
                      <strong>2. Landmarks:</strong> Normalized (x, y, z) coordinates
                    </div>
                    <div className="bg-white px-2.5 py-1.5 rounded border border-black">
                      <strong>3. Actions:</strong> Angle, pinch, or gesture triggers
                    </div>
                  </div>
                </div>

                {/* Real-World Applications */}
                <div>
                  <h3 className="font-display font-bold text-sm sm:text-base text-black mb-2 flex items-center gap-2">
                    <Activity size={16} className="text-[#ffd34e] stroke-[2.5]" />
                    Real-World Applications
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {realWorldApps.map((app) => (
                      <div
                        key={app.title}
                        className={`p-3 rounded-lg border-2 border-black ${app.color} shadow-xs flex flex-col justify-between`}
                      >
                        <div>
                          <span className="font-mono text-[9px] uppercase font-bold text-black/70 block mb-0.5">
                            {app.tag}
                          </span>
                          <h4 className="font-display font-bold text-xs text-black mb-1">
                            {app.title}
                          </h4>
                          <p className="text-[11px] text-black/75 leading-tight">{app.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* MediaPipe Tasks and Capabilities Grid (Compact) */}
                <div>
                  <h3 className="font-display font-bold text-sm sm:text-base text-black mb-2 flex items-center gap-2">
                    <Cpu size={16} className="text-black stroke-[2.5]" />
                    MediaPipe Tasks &amp; Capabilities
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-mono text-xs">
                    {mediapipeCapabilities.map((cap) => (
                      <div
                        key={cap.name}
                        className="p-2.5 rounded-lg border border-black bg-[#f5f4ee] flex items-center justify-between gap-2"
                      >
                        <div className="min-w-0">
                          <span className="font-bold text-black block truncate text-[11px]">
                            {cap.name}
                          </span>
                          <span className="text-[10px] text-black/60 truncate block font-sans">
                            {cap.sampleUse}
                          </span>
                        </div>
                        <span className="shrink-0 text-[10px] bg-black text-white px-2 py-0.5 rounded font-mono font-bold">
                          {cap.keyMetric}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* ──────────────────────────────────────────────────────────── */}
            {/* 2. Starter Template (Fork Required) */}
            {/* ──────────────────────────────────────────────────────────── */}
            <section id="starter-template" className="scroll-mt-24">
              <div className="border-2 border-black rounded-2xl bg-white p-5 sm:p-7 shadow-hard-sm space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b-2 border-black">
                  <div className="flex items-center gap-3">
                    <span className="font-mono font-bold text-sm bg-black text-white px-2.5 py-0.5 rounded">
                      02
                    </span>
                    <h2 className="font-display font-bold text-xl sm:text-2xl text-black">
                      Starter Template (Fork Required)
                    </h2>
                  </div>
                  <span className="font-mono text-xs font-bold bg-[#ffd34e] text-black px-2.5 py-0.5 rounded border border-black shadow-xs">
                    ⚠️ Mandatory Step
                  </span>
                </div>

                <div className="p-4 sm:p-5 rounded-xl border-2 border-black bg-[#d4f5e0]">
                  <h3 className="font-display font-bold text-base sm:text-lg text-black mb-2 flex items-center gap-2">
                    <GitFork size={18} className="text-black" />
                    Don&apos;t Forget: Fork the Repo Before You Start Building!
                  </h3>
                  <p className="text-black/85 text-xs sm:text-sm leading-relaxed mb-4">
                    To make starting easy, TinkerHub provides an official starter repository containing webcam boilerplate, dependencies, and sample MediaPipe scripts.
                    <strong> You must fork this repository to your own GitHub account</strong> before writing any code!
                  </p>

                  <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
                    <a
                      href={MEDIAPIPE_FORK_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-black text-white hover:bg-black/85 font-mono font-bold text-xs sm:text-sm px-4 py-2.5 rounded-lg border-2 border-black shadow-hard-sm hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
                    >
                      <GitFork size={14} />
                      Fork Repository on GitHub
                      <ExternalLink size={12} />
                    </a>
                    <a
                      href={MEDIAPIPE_STARTER_REPO}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-white text-black hover:bg-[#fff6bf] font-mono font-bold text-xs sm:text-sm px-4 py-2.5 rounded-lg border-2 border-black shadow-hard-sm hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
                    >
                      <Github size={14} />
                      View on GitHub
                    </a>
                    <a
                      href={DISCORD_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-[#f5d6ed] text-black hover:bg-[#f28ad8] font-mono font-bold text-xs sm:text-sm px-4 py-2.5 rounded-lg border-2 border-black shadow-hard-sm hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
                    >
                      <MessageSquare size={14} />
                      Ask Doubts on Discord
                    </a>
                  </div>
                </div>

                {/* Git Clone & Setup Commands */}
                <div className="space-y-3">
                  <h3 className="font-display font-bold text-xs sm:text-sm text-black flex items-center gap-1.5">
                    <Laptop size={15} />
                    Setup Commands: Fork, Clone &amp; Install
                  </h3>
                  <CodeBlock
                    language="bash"
                    filename="setup_from_fork.sh"
                    code={starterTemplateGitCommands}
                  />
                </div>

                {/* Important Rules Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div className="p-3.5 rounded-xl border-2 border-black bg-[#fff6bf] flex items-start gap-2.5">
                    <span className="text-base shrink-0">❓</span>
                    <div>
                      <h4 className="font-display font-bold text-xs text-black uppercase mb-0.5">
                        Ask Doubts Before You Start
                      </h4>
                      <p className="text-xs text-black/80 leading-snug">
                        If you have questions about OpenCV camera setup, virtual environments, or project scope, ask in the Discord channel or reach out to mentors before building!
                      </p>
                    </div>
                  </div>
                  <div className="p-3.5 rounded-xl border-2 border-black bg-[#ffd34e] flex items-start gap-2.5">
                    <span className="text-base shrink-0">⚠️</span>
                    <div>
                      <h4 className="font-display font-bold text-xs text-black uppercase mb-0.5">
                        Commit History Requirement
                      </h4>
                      <p className="text-xs text-black/80 leading-snug">
                        Commit every logical step of your work as you build. Commits will be verified during judging to reward active iteration and honest effort.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* ──────────────────────────────────────────────────────────── */}
            {/* 3. Prerequisites */}
            {/* ──────────────────────────────────────────────────────────── */}
            <section id="starter-template" className="scroll-mt-24">
              <div className="border-2 border-black rounded-2xl bg-white p-5 sm:p-7 shadow-hard-sm space-y-6">
                {/* Section Header */}
                <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b-2 border-black">
                  <div className="flex items-center gap-3">
                    <span className="font-mono font-bold text-sm bg-black text-white px-2.5 py-0.5 rounded">
                      02
                    </span>
                    <h2 className="font-display font-bold text-xl sm:text-2xl text-black">
                      Starter Template &amp; Forking Guide
                    </h2>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <a
                      href={MEDIAPIPE_STARTER_FORK_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 bg-[#91e47a] text-black font-mono font-bold text-xs px-3.5 py-1.5 rounded-lg border-2 border-black shadow-xs hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
                    >
                      <FolderGit2 size={13} />
                      Fork on GitHub
                      <ExternalLink size={11} />
                    </a>
                    <a
                      href={DISCORD_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 bg-[#fae4f2] text-black font-mono font-bold text-xs px-3 py-1.5 rounded-lg border-2 border-black shadow-xs hover:bg-[#f28ad8] transition-all"
                    >
                      <MessageSquare size={13} />
                      Ask Doubts
                    </a>
                  </div>
                </div>

                {/* Important Notice Banner */}
                <div className="p-4 rounded-xl border-2 border-black bg-[#ffd34e] shadow-xs flex items-start gap-3">
                  <span className="text-2xl shrink-0">🚨</span>
                  <div>
                    <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-black mb-1">
                      Crucial Rule: Fork This Repo Before You Start Building!
                    </h3>
                    <p className="text-xs sm:text-sm text-black font-medium leading-relaxed">
                      Do not start from a blank folder. You <strong>must fork</strong> the official Saturday Hack Night MediaPipe repository before coding. If you have any doubts before or during setup, ask the mentors in Discord right away!
                    </p>
                  </div>
                </div>

                {/* 4 Step Process Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div className="p-4 rounded-xl border-2 border-black bg-[#fae4f2] flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-mono text-xs font-bold bg-black text-white px-2 py-0.5 rounded">
                          Step 01
                        </span>
                        <FolderGit2 size={16} className="text-black" />
                      </div>
                      <h4 className="font-display font-bold text-sm text-black mb-1">
                        1. Fork the Repository
                      </h4>
                      <p className="text-xs text-black/80 font-medium leading-relaxed">
                        Navigate to the official repo and click the <strong>&ldquo;Fork&rdquo;</strong> button to generate your personal copy under your GitHub account.
                      </p>
                    </div>
                    <a
                      href={MEDIAPIPE_STARTER_FORK_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-flex items-center gap-1.5 font-mono text-xs font-bold text-black hover:underline"
                    >
                      Open Fork Page &rarr;
                    </a>
                  </div>

                  <div className="p-4 rounded-xl border-2 border-black bg-[#e0f4fb] flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-mono text-xs font-bold bg-black text-white px-2 py-0.5 rounded">
                          Step 02
                        </span>
                        <Laptop size={16} className="text-black" />
                      </div>
                      <h4 className="font-display font-bold text-sm text-black mb-1">
                        2. Clone Your Personal Fork
                      </h4>
                      <p className="text-xs text-black/80 font-medium leading-relaxed">
                        Clone <em>your fork</em> (not the upstream repo) to your machine so you have full push access throughout the night.
                      </p>
                    </div>
                    <span className="mt-3 font-mono text-[11px] text-black/70 truncate block">
                      git clone https://github.com/&lt;your-handle&gt;/SHN-MEDIAPIPE.git
                    </span>
                  </div>

                  <div className="p-4 rounded-xl border-2 border-black bg-[#e6f7e2] flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-mono text-xs font-bold bg-black text-white px-2 py-0.5 rounded">
                          Step 03
                        </span>
                        <Code2 size={16} className="text-black" />
                      </div>
                      <h4 className="font-display font-bold text-sm text-black mb-1">
                        3. Set Up &amp; Start Building
                      </h4>
                      <p className="text-xs text-black/80 font-medium leading-relaxed">
                        Create a Python virtual environment, install the template packages, test your webcam feed, and start hacking your solution.
                      </p>
                    </div>
                    <span className="mt-3 font-mono text-[11px] text-black/70">
                      python -m venv venv &amp;&amp; pip install -r requirements.txt
                    </span>
                  </div>

                  <div className="p-4 rounded-xl border-2 border-black bg-[#fff6bf] flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-mono text-xs font-bold bg-black text-white px-2 py-0.5 rounded">
                          Step 04
                        </span>
                        <CheckCircle2 size={16} className="text-black" />
                      </div>
                      <h4 className="font-display font-bold text-sm text-black mb-1">
                        4. Commit Often &amp; Submit
                      </h4>
                      <p className="text-xs text-black/80 font-medium leading-relaxed">
                        Commit every change before making another move! Push commits to your fork and submit your repo link before midnight on hub.app.
                      </p>
                    </div>
                    <span className="mt-3 font-mono text-[11px] font-bold text-black">
                      ⚠️ Commit history will be verified!
                    </span>
                  </div>
                </div>

                {/* Step-by-Step Terminal Snippet */}
                <div>
                  <h3 className="font-display font-bold text-xs sm:text-sm text-black mb-1 flex items-center gap-1.5">
                    <Laptop size={15} />
                    Terminal Commands: Fork, Clone &amp; Run
                  </h3>
                  <CodeBlock
                    language="bash"
                    filename="terminal-quickstart.sh"
                    code={`# 1. Clone your personal fork (replace <YOUR_USERNAME> with your GitHub username)
git clone https://github.com/<YOUR_USERNAME>/SHN-MEDIAPIPE.git
cd SHN-MEDIAPIPE

# 2. Create and activate a Python virtual environment
python -m venv venv

# Activate venv:
# Windows (PowerShell): .\\venv\\Scripts\\Activate.ps1
# Windows (CMD): .\\venv\\Scripts\\activate.bat
# macOS / Linux: source venv/bin/activate

# 3. Install dependencies from the starter repo
pip install -r requirements.txt

# 4. Run the starter code & test your webcam
python main.py

# 5. Commit frequently before moving to the next feature!
git add .
git commit -m "feat: setup hands tracking controller"
git push origin main`}
                  />
                </div>
              </div>
            </section>

            {/* ──────────────────────────────────────────────────────────── */}
            {/* 3. Prerequisites */}
            {/* ──────────────────────────────────────────────────────────── */}
            <section id="prerequisites" className="scroll-mt-24">
              <div className="border-2 border-black rounded-2xl bg-white p-5 sm:p-7 shadow-hard-sm space-y-5">
                <div className="flex items-center gap-3 pb-3 border-b-2 border-black">
                  <span className="font-mono font-bold text-sm bg-black text-white px-2.5 py-0.5 rounded">
                    03
                  </span>
                  <h2 className="font-display font-bold text-xl sm:text-2xl text-black">
                    Prerequisites
                  </h2>
                </div>

                {/* Compact 2x2 Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div className="p-3 rounded-lg border-2 border-black bg-[#fae4f2]">
                    <span className="font-mono text-[10px] font-bold uppercase block text-black/70 mb-0.5">Python Basics</span>
                    <p className="text-xs text-black/80 font-medium">Python 3.9–3.12, functions, while loops, and virtual environments.</p>
                  </div>
                  <div className="p-3 rounded-lg border-2 border-black bg-[#e0f4fb]">
                    <span className="font-mono text-[10px] font-bold uppercase block text-black/70 mb-0.5">Computer Vision</span>
                    <p className="text-xs text-black/80 font-medium">Normalized coordinates `(0.0 - 1.0)` and OpenCV BGR color format.</p>
                  </div>
                  <div className="p-3 rounded-lg border-2 border-black bg-[#e6f7e2]">
                    <span className="font-mono text-[10px] font-bold uppercase block text-black/70 mb-0.5">Clean Setup</span>
                    <p className="text-xs text-black/80 font-medium">Isolate packages using `python -m venv venv` to avoid library conflicts.</p>
                  </div>
                  <div className="p-3 rounded-lg border-2 border-black bg-[#fff6bf]">
                    <span className="font-mono text-[10px] font-bold uppercase block text-black/70 mb-0.5">Google Colab Option</span>
                    <p className="text-xs text-black/80 font-medium">Zero-install cloud Jupyter notebook option with webcam streaming.</p>
                  </div>
                </div>

                {/* Starter Template Fork & Clone Instructions */}
                <div className="p-4 rounded-xl border-2 border-black bg-[#d4f5e0] shadow-xs">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <h3 className="font-display font-bold text-sm text-black flex items-center gap-1.5">
                      <GitFork size={15} className="text-black" />
                      Step 0: Fork &amp; Clone Official Starter Template
                    </h3>
                    <a
                      href={MEDIAPIPE_FORK_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-xs font-bold text-black underline flex items-center gap-1 hover:text-black/70"
                    >
                      <ExternalLink size={12} />
                      Fork on GitHub
                    </a>
                  </div>
                  <p className="text-xs text-black/85 mb-3 leading-relaxed">
                    <strong>Don&apos;t forget:</strong> You must fork the repository to your own GitHub account before you start building. If you have any doubts before you start, reach out to mentors in Discord!
                  </p>
                  <CodeBlock
                    language="bash"
                    filename="fork_and_clone.sh"
                    code={starterTemplateGitCommands}
                  />
                </div>

                {/* Terminal Setup Snippet */}
                <div>
                  <h3 className="font-display font-bold text-xs sm:text-sm text-black mb-1 flex items-center gap-1.5">
                    <Laptop size={15} />
                    Terminal Setup: Pip Install
                  </h3>
                  <CodeBlock
                    language="bash"
                    filename="setup.sh"
                    code={`python -m venv venv
# Windows: .\\venv\\Scripts\\Activate.ps1 | Mac/Linux: source venv/bin/activate
pip install mediapipe opencv-python numpy`}
                  />
                </div>

                {/* Distance Math Snippet */}
                <div>
                  <h3 className="font-display font-bold text-xs sm:text-sm text-black mb-1 flex items-center gap-1.5">
                    <Code2 size={15} className="text-[#f28ad8]" />
                    Euclidean Distance Trigger Math (NumPy)
                  </h3>
                  <CodeBlock
                    language="python"
                    filename="distance_trigger.py"
                    code={distanceCalculationCode}
                  />
                </div>
              </div>
            </section>

            {/* ──────────────────────────────────────────────────────────── */}
            {/* 4. Documentation */}
            {/* ──────────────────────────────────────────────────────────── */}
            <section id="documentation" className="scroll-mt-24">
              <div className="border-2 border-black rounded-2xl bg-white p-6 sm:p-8 shadow-hard-sm">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-black">
                  <span className="font-mono font-bold text-sm bg-black text-white px-3 py-1 rounded">
                    04
                  </span>
                  <h2 className="font-display font-bold text-2xl sm:text-3xl text-black">
                    Documentation
                  </h2>
                </div>

                <p className="text-black/80 text-sm sm:text-base leading-relaxed mb-6">
                  Official documentation, interactive web playgrounds, and source repositories to
                  bookmark during your build:
                </p>

                {/* Resource Links Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                  {documentationResources.map((doc) => (
                    <a
                      key={doc.title}
                      href={doc.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group p-4 rounded-xl border-2 border-black bg-[#f5f4ee] hover:bg-[#fff6bf] transition-all duration-150 shadow-xs hover:shadow-hard-sm hover:-translate-y-0.5 flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <span className="font-mono text-[10px] font-bold uppercase tracking-wider bg-black text-white px-2 py-0.5 rounded">
                            {doc.badge}
                          </span>
                          <ExternalLink
                            size={14}
                            className="text-black/40 group-hover:text-black transition-colors"
                          />
                        </div>
                        <h4 className="font-display font-bold text-sm sm:text-base text-black mb-1 group-hover:underline">
                          {doc.title}
                        </h4>
                        <p className="text-xs text-black/70 leading-relaxed mb-3">
                          {doc.description}
                        </p>
                      </div>
                      <span className="font-mono text-[11px] font-semibold text-black/60 group-hover:text-black flex items-center gap-1">
                        Open resource →
                      </span>
                    </a>
                  ))}
                </div>

                {/* MediaPipe Quickstart Boilerplate */}
                <div className="mt-8 pt-6 border-t-2 border-black">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-display font-bold text-lg sm:text-xl text-black flex items-center gap-2">
                      <Flame size={18} className="text-[#ffd34e]" />
                      Official 20-Line Hand Tracker Boilerplate
                    </h3>
                    <span className="font-mono text-xs font-bold text-black bg-[#91e47a] px-2.5 py-0.5 border border-black rounded shadow-xs">
                      Ready to Run
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-black/75 mb-3 leading-relaxed">
                    Copy and run this minimal script in your terminal to verify your camera and
                    render real-time hand skeletons immediately:
                  </p>
                  <CodeBlock
                    language="python"
                    filename="mediapipe_quickstart.py"
                    code={mediapipeQuickstartCode}
                  />
                </div>
              </div>
            </section>

            {/* ──────────────────────────────────────────────────────────── */}
            {/* 5. Tutorials */}
            {/* ──────────────────────────────────────────────────────────── */}
            <section id="tutorials" className="scroll-mt-24">
              <div className="border-2 border-black rounded-2xl bg-white p-6 sm:p-8 shadow-hard-sm">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-black">
                  <span className="font-mono font-bold text-sm bg-black text-white px-3 py-1 rounded">
                    05
                  </span>
                  <h2 className="font-display font-bold text-2xl sm:text-3xl text-black">
                    Tutorials
                  </h2>
                </div>

                <p className="text-black/80 text-sm sm:text-base leading-relaxed mb-6">
                  Step-by-step guides organized progressively from beginner fundamentals to
                  multi-modal spatial tracking:
                </p>

                {/* Level Tabs Filter */}
                <div className="flex flex-wrap items-center gap-2 mb-6">
                  {["All", "Beginner", "Intermediate", "Advanced"].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTutorialTab(tab)}
                      className={`px-3.5 py-1.5 rounded-lg font-mono text-xs font-bold transition-all border-2 border-black cursor-pointer ${
                        activeTutorialTab === tab
                          ? "bg-black text-white shadow-hard-sm"
                          : "bg-white text-black hover:bg-[#fff6bf]"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                  <span className="font-mono text-xs text-black/50 ml-auto hidden sm:block">
                    Showing {filteredTutorials.length} guides
                  </span>
                </div>

                {/* Tutorials Grid — Clean & Minimal, No Code Needed */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {filteredTutorials.map((tut) => {
                    const diffClass =
                      difficultyBadgeColors[tut.level] || difficultyBadgeColors.Beginner;
                    return (
                      <div
                        key={tut.id}
                        className="p-5 rounded-xl border-2 border-black bg-[#f5f4ee] hover:bg-white transition-all shadow-xs hover:shadow-hard-sm flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                            <span
                              className={`font-mono text-[10px] uppercase font-bold px-2.5 py-0.5 rounded border ${diffClass}`}
                            >
                              {tut.level}
                            </span>
                            <span className="font-mono text-xs text-black/60 bg-white px-2 py-0.5 rounded border border-black/20">
                              ⏱ {tut.duration}
                            </span>
                          </div>

                          <h3 className="font-display font-bold text-base sm:text-lg text-black mb-2 leading-snug">
                            {tut.title}
                          </h3>

                          <p className="text-xs sm:text-sm text-black/75 leading-relaxed mb-4">
                            {tut.summary}
                          </p>
                        </div>

                        <div>
                          {/* Key Concepts Tags */}
                          <div className="flex flex-wrap gap-1.5 mb-3">
                            {tut.keyConcepts.map((concept) => (
                              <span
                                key={concept}
                                className="font-mono text-[10px] font-semibold bg-white px-2 py-0.5 rounded border border-black/30 text-black/80"
                              >
                                #{concept}
                              </span>
                            ))}
                          </div>

                          {tut.linkUrl && (
                            <div className="pt-3 border-t border-black/10 flex items-center justify-between">
                              <a
                                href={tut.linkUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-mono text-xs font-bold text-black/70 hover:text-black hover:underline inline-flex items-center gap-1.5 group"
                              >
                                <span>{tut.linkText || "View Guide"}</span>
                                <ExternalLink size={12} className="group-hover:translate-x-0.5 transition-transform" />
                              </a>
                              <span className="font-mono text-[10px] text-black/50">
                                Docs →
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* ──────────────────────────────────────────────────────────── */}
            {/* 6. Project Ideas */}
            {/* ──────────────────────────────────────────────────────────── */}
            <section id="project-ideas" className="scroll-mt-24">
              <div className="border-2 border-black rounded-2xl bg-white p-6 sm:p-8 shadow-hard-sm">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-black">
                  <span className="font-mono font-bold text-sm bg-black text-white px-3 py-1 rounded">
                    06
                  </span>
                  <h2 className="font-display font-bold text-2xl sm:text-3xl text-black">
                    Project Ideas
                  </h2>
                </div>

                <p className="text-black/80 text-sm sm:text-base leading-relaxed mb-6">
                  Looking for inspiration for Saturday Hack Night? Pick one of these beginner or
                  intermediate concepts and ship a working prototype before midnight:
                </p>

                {/* Filter Tabs */}
                <div className="flex flex-wrap items-center gap-2 mb-6">
                  {["All", "Beginner", "Intermediate"].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveProjectTab(tab)}
                      className={`px-3.5 py-1.5 rounded-lg font-mono text-xs font-bold transition-all border-2 border-black cursor-pointer ${
                        activeProjectTab === tab
                          ? "bg-[#91e47a] text-black shadow-hard-sm"
                          : "bg-white text-black hover:bg-[#fff6bf]"
                      }`}
                    >
                      {tab} Projects
                    </button>
                  ))}
                  <span className="font-mono text-xs text-black/50 ml-auto hidden sm:block">
                    {filteredProjects.length} Hackathon Projects
                  </span>
                </div>

                {/* Project Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {filteredProjects.map((idea) => {
                    const diffBadge =
                      difficultyBadgeColors[idea.difficulty] || difficultyBadgeColors.Beginner;
                    return (
                      <div
                        key={idea.id}
                        className="p-5 rounded-xl border-2 border-black bg-[#f5f4ee] flex flex-col justify-between shadow-xs hover:shadow-hard-sm hover:-translate-y-0.5 transition-all"
                      >
                        <div>
                          <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
                            <span
                              className={`font-mono text-[10px] uppercase font-bold px-2 py-0.5 rounded border ${diffBadge}`}
                            >
                              {idea.difficulty}
                            </span>
                            <span className="font-mono text-[10px] text-black/70 bg-[#aeeaf5] px-2 py-0.5 rounded border border-black/30 font-semibold">
                              {idea.category}
                            </span>
                          </div>

                          <h3 className="font-display font-bold text-base sm:text-lg text-black mb-2 leading-snug">
                            {idea.title}
                          </h3>

                          <p className="text-xs sm:text-sm text-black/75 leading-relaxed mb-4">
                            {idea.description}
                          </p>

                          <div className="space-y-2 mb-4 font-mono text-xs">
                            <div className="bg-white p-2.5 rounded border border-black/20">
                              <span className="text-black/50 block text-[10px] font-bold uppercase">
                                Key Inputs / Landmarks:
                              </span>
                              <span className="font-semibold text-black text-[11px]">
                                {idea.inputs.join(" · ")}
                              </span>
                            </div>
                            <div className="bg-white p-2.5 rounded border border-black/20">
                              <span className="text-black/50 block text-[10px] font-bold uppercase">
                                Action Trigger:
                              </span>
                              <span className="font-semibold text-black text-[11px]">
                                {idea.expectedOutput}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Hack Night Tip */}
                        <div className="mt-2 p-3 bg-[#fff6bf] border border-black rounded-lg">
                          <span className="font-mono text-[10px] font-bold uppercase tracking-wider block text-black/70 mb-0.5">
                            💡 Saturday Hack Tip:
                          </span>
                          <p className="text-[11px] text-black/85 leading-snug">
                            {idea.hackNightTip}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* ──────────────────────────────────────────────────────────── */}
            {/* 7. LetXplore */}
            {/* ──────────────────────────────────────────────────────────── */}
            <section id="letxplore" className="scroll-mt-24">
              <div className="border-2 border-black rounded-2xl bg-white p-6 sm:p-8 shadow-hard-sm">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-black">
                  <span className="font-mono font-bold text-sm bg-black text-white px-3 py-1 rounded">
                    07
                  </span>
                  <h2 className="font-display font-bold text-2xl sm:text-3xl text-black">
                    LetXplore
                  </h2>
                </div>

                {/* Session Recording Upload Box */}
                <div className="border-2 border-dashed border-black/40 rounded-xl p-8 sm:p-12 bg-[#f5f4ee] text-center flex flex-col items-center justify-center">
                  <div className="w-16 h-16 rounded-2xl bg-[#ffd34e] border-2 border-black flex items-center justify-center mb-4 shadow-hard-sm">
                    <Video size={28} className="text-black stroke-[2.2]" />
                  </div>
                  <h3 className="font-display font-bold text-xl sm:text-2xl text-black mb-2">
                    Session Recording
                  </h3>
                  <p className="text-black/70 text-xs sm:text-sm max-w-md mb-6 leading-relaxed">
                    Upload and access the recorded MediaPipe live learning and walkthrough session.
                  </p>

                  {uploadedFileName && (
                    <div className="p-3 bg-[#d4f5e0] border-2 border-black rounded-lg flex items-center gap-2 font-mono text-xs text-black font-bold mb-4">
                      <Check size={16} className="text-black stroke-[3]" />
                      <span>Recording: {uploadedFileName}</span>
                    </div>
                  )}

                  <label className="cursor-pointer inline-flex items-center gap-2 bg-[#91e47a] text-black font-mono font-bold text-xs px-5 py-3 rounded-lg border-2 border-black shadow-hard-sm hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all">
                    <UploadCloud size={16} />
                    <span>Upload Recording Session</span>
                    <input
                      type="file"
                      accept="video/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) setUploadedFileName(file.name);
                      }}
                    />
                  </label>
                </div>
              </div>
            </section>

            {/* ──────────────────────────────────────────────────────────── */}
            {/* 8. Mentors */}
            {/* ──────────────────────────────────────────────────────────── */}
            <section id="mentors" className="scroll-mt-24">
              <div className="border-2 border-black rounded-2xl bg-white p-6 sm:p-8 shadow-hard-sm space-y-6">
                <div className="flex items-center gap-3 pb-4 border-b-2 border-black">
                  <span className="font-mono font-bold text-sm bg-black text-white px-3 py-1 rounded">
                    08
                  </span>
                  <h2 className="font-display font-bold text-2xl sm:text-3xl text-black">
                    Mentors
                  </h2>
                </div>

                {/* Mentor — Just Name & Phone Number */}
                <div>
                  <div className="p-5 rounded-xl border-2 border-black bg-[#fae4f2] shadow-hard-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3.5">
                      <div className="w-12 h-12 rounded-full bg-[#f28ad8] border-2 border-black flex items-center justify-center font-mono font-bold text-black text-lg shrink-0">
                        {mentorInfo.name[0]}
                      </div>
                      <div>
                        <span className="font-mono text-[10px] uppercase font-bold text-black/60 block">
                          Mentor
                        </span>
                        <h3 className="font-display font-bold text-xl text-black">
                          {mentorInfo.name}
                        </h3>
                      </div>
                    </div>

                    <a
                      href={`tel:${mentorInfo.phone}`}
                      className="inline-flex items-center gap-2 bg-white text-black font-mono font-bold text-sm px-4 py-2.5 rounded-lg border-2 border-black shadow-hard-sm hover:bg-[#91e47a] transition-all"
                    >
                      <Phone size={15} className="text-black stroke-[2.5]" />
                      <span>{mentorInfo.phone}</span>
                    </a>
                  </div>
                </div>

                {/* Coordinators Row */}
                <div className="pt-4 border-t-2 border-black/10">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="w-2.5 h-2.5 bg-[#aeeaf5] border border-black rounded-xs" />
                    <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-black">
                      Coordinators
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {coordinatorsList.map((coord) => (
                      <div
                        key={coord.name}
                        className="p-5 rounded-xl border-2 border-black bg-[#e0f4fb] shadow-hard-sm flex flex-col justify-between gap-4"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-[#aeeaf5] border-2 border-black flex items-center justify-center font-mono font-bold text-black text-sm shrink-0">
                            {coord.name[0]}
                          </div>
                          <div>
                            <span className="font-mono text-[10px] uppercase font-bold text-black/60 block">
                              Coordinator
                            </span>
                            <h4 className="font-display font-bold text-base text-black">
                              {coord.name}
                            </h4>
                          </div>
                        </div>

                        <a
                          href={`tel:${coord.phone}`}
                          className="inline-flex items-center justify-center gap-2 bg-white text-black font-mono font-bold text-xs sm:text-sm px-3.5 py-2.5 rounded-lg border-2 border-black shadow-xs hover:bg-[#ffd34e] transition-all"
                        >
                          <Phone size={14} className="stroke-[2.5]" />
                          <span>{coord.phone}</span>
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* ──────────────────────────────────────────────────────────── */}
            {/* 9. Contact Us */}
            {/* ──────────────────────────────────────────────────────────── */}
            <section id="contact-us" className="scroll-mt-24">
              <div className="border-2 border-black rounded-2xl bg-white p-6 sm:p-8 shadow-hard-sm">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-black">
                  <span className="font-mono font-bold text-sm bg-black text-white px-3 py-1 rounded">
                    09
                  </span>
                  <h2 className="font-display font-bold text-2xl sm:text-3xl text-black">
                    Contact Us & Community
                  </h2>
                </div>

                <p className="text-black/80 text-sm sm:text-base leading-relaxed mb-6">
                  Have questions about Saturday Hack Night, the MediaPipe challenge, or hosting an
                  offline satellite edition on your college campus? Connect with the TinkerHub team:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Discord */}
                  <a
                    href={DISCORD_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group p-5 rounded-xl border-2 border-black bg-[#fae4f2] hover:bg-[#f28ad8] transition-all shadow-xs hover:shadow-hard-sm"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="w-9 h-9 rounded-lg bg-black text-white flex items-center justify-center">
                        <MessageSquare size={16} />
                      </div>
                      <ExternalLink size={14} className="text-black/60 group-hover:text-black" />
                    </div>
                    <h3 className="font-display font-bold text-base text-black mb-1">
                      TinkerHub Discord Community
                    </h3>
                    <p className="text-xs text-black/75 leading-relaxed">
                      Join 10,000+ developers, ask questions in `#saturday-hack-night`, and get live
                      mentor debugging.
                    </p>
                  </a>

                  {/* Saturday Hack Night Registration */}
                  <a
                    href={REGISTER_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group p-5 rounded-xl border-2 border-black bg-[#ffd34e] hover:bg-[#ffbe1a] transition-all shadow-xs hover:shadow-hard-sm"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="w-9 h-9 rounded-lg bg-black text-white flex items-center justify-center">
                        <Flame size={16} />
                      </div>
                      <ExternalLink size={14} className="text-black/60 group-hover:text-black" />
                    </div>
                    <h3 className="font-display font-bold text-base text-black mb-1">
                      Register on hub.app
                    </h3>
                    <p className="text-xs text-black/75 leading-relaxed">
                      Sign up for the upcoming Saturday Hack Night. Free, open to all, solo or team
                      of 2.
                    </p>
                  </a>

                  {/* Physical TinkerSpace Kochi */}
                  <a
                    href={TINKERSPACE_MAPS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group p-5 rounded-xl border-2 border-black bg-[#e0f4fb] hover:bg-[#aeeaf5] transition-all shadow-xs hover:shadow-hard-sm"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="w-9 h-9 rounded-lg bg-black text-white flex items-center justify-center">
                        <MapPin size={16} />
                      </div>
                      <ExternalLink size={14} className="text-black/60 group-hover:text-black" />
                    </div>
                    <h3 className="font-display font-bold text-base text-black mb-1">
                      TinkerSpace Kochi
                    </h3>
                    <p className="text-xs text-black/75 leading-relaxed">
                      Visit TinkerHub&apos;s flagship maker space in Kalamassery, Kochi. Venue for the
                      end-of-season offline grand finale!
                    </p>
                  </a>

                  {/* Campus Edition */}
                  <a
                    href="/campus/"
                    className="group p-5 rounded-xl border-2 border-black bg-[#e6f7e2] hover:bg-[#91e47a] transition-all shadow-xs hover:shadow-hard-sm"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="w-9 h-9 rounded-lg bg-black text-white flex items-center justify-center">
                        <Users size={16} />
                      </div>
                      <ArrowRight size={14} className="text-black/60 group-hover:text-black" />
                    </div>
                    <h3 className="font-display font-bold text-base text-black mb-1">
                      Host at Your Campus
                    </h3>
                    <p className="text-xs text-black/75 leading-relaxed">
                      Learn how college leads run offline satellite watch parties and hack sessions
                      in their campus computer labs.
                    </p>
                  </a>
                </div>

                {/* Email Direct */}
                <div className="mt-8 pt-6 border-t-2 border-black flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs">
                  <span className="text-black/70">
                    Prefer direct email? Reach out at{" "}
                    <a
                      href="mailto:hello@tinkerhub.org"
                      className="text-black font-bold underline hover:text-[#f28ad8]"
                    >
                      hello@tinkerhub.org
                    </a>
                  </span>
                  <span className="bg-[#fff6bf] px-3 py-1 rounded border border-black font-bold">
                    TinkerHub Foundation © 2026
                  </span>
                </div>
              </div>
            </section>
          </div>

          {/* Desktop Sticky Table of Contents Sidebar */}
          <div className="lg:col-span-4 sticky top-24">
            <TableOfContents />
          </div>
        </div>
      </div>

      {/* Global Footer */}
      <Footer />
    </main>
  );
}
