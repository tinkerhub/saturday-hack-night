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
            <div className="mb-8 p-4 rounded-xl border-2 border-black bg-[#fff6bf] shadow-xs flex items-start gap-3">
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
                href="#what-is-mediapipe"
                className="inline-flex items-center gap-2 bg-[#ffd34e] text-black font-bold text-sm px-6 py-3 rounded-lg border-2 border-black shadow-hard-sm hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
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
          <div className="lg:col-span-8 space-y-16">
            {/* ──────────────────────────────────────────────────────────── */}
            {/* 1. What is MediaPipe? */}
            {/* ──────────────────────────────────────────────────────────── */}
            <section id="what-is-mediapipe" className="scroll-mt-24">
              <div className="border-2 border-black rounded-2xl bg-white p-6 sm:p-8 shadow-hard-sm">
                {/* Section Header */}
                <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-black">
                  <span className="font-mono font-bold text-sm bg-black text-white px-3 py-1 rounded">
                    01
                  </span>
                  <h2 className="font-display font-bold text-2xl sm:text-3xl text-black">
                    What is MediaPipe?
                  </h2>
                </div>

                {/* Subsections */}
                <div className="space-y-8">
                  {/* Introduction */}
                  <div>
                    <h3 className="font-display font-bold text-lg sm:text-xl text-black mb-2 flex items-center gap-2">
                      <Zap size={18} className="text-[#f28ad8] stroke-[2.5]" />
                      Introduction to MediaPipe
                    </h3>
                    <p className="text-black/80 text-sm sm:text-base leading-relaxed mb-4">
                      <strong>MediaPipe</strong> is Google’s open-source, cross-platform framework
                      for deploying multimodal machine learning pipelines. Designed specifically for
                      edge devices, it empowers builders to run real-time perceptual computing
                      models—including hand gesture tracking, 468-point face meshes, and full-body
                      motion estimation—directly inside consumer laptops, smartphones, and web
                      browsers.
                    </p>
                    <p className="text-black/80 text-sm sm:text-base leading-relaxed">
                      Unlike cloud-based AI APIs that require sending high-bandwidth video streams
                      over the internet, MediaPipe executes inferences locally on CPU or GPU with
                      microsecond latency and 100% data privacy.
                    </p>
                  </div>

                  {/* Understanding Computer Vision */}
                  <div className="p-5 rounded-xl border-2 border-black bg-[#aeeaf5]">
                    <h3 className="font-display font-bold text-lg sm:text-xl text-black mb-2 flex items-center gap-2">
                      <Eye size={18} className="text-black stroke-[2.5]" />
                      Understanding Computer Vision
                    </h3>
                    <p className="text-black/85 text-sm sm:text-base leading-relaxed mb-3">
                      Computer vision is the branch of computer science focused on enabling
                      software to gain high-level semantic understanding from digital images or
                      video frames. To a computer, a video is simply a continuous stream of numerical
                      matrices containing red, green, and blue (RGB) pixel values.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs pt-2">
                      <div className="bg-white p-3 rounded-lg border border-black shadow-xs">
                        <span className="font-bold text-black block mb-1">1. Pixels to Features</span>
                        <span className="text-black/70">
                          Raw sensor frames are analyzed for contrast edges, color gradients, and
                          spatial textures.
                        </span>
                      </div>
                      <div className="bg-white p-3 rounded-lg border border-black shadow-xs">
                        <span className="font-bold text-black block mb-1">2. Keypoint Regression</span>
                        <span className="text-black/70">
                          Neural networks predict normalized 2D/3D coordinate vectors `(x, y, z)` for
                          joints and landmarks.
                        </span>
                      </div>
                      <div className="bg-white p-3 rounded-lg border border-black shadow-xs">
                        <span className="font-bold text-black block mb-1">3. Semantic Actions</span>
                        <span className="text-black/70">
                          Your code maps geometrical relationships (e.g., finger pinch, open palm) to
                          real-world triggers.
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* How MediaPipe Works */}
                  <div>
                    <h3 className="font-display font-bold text-lg sm:text-xl text-black mb-2 flex items-center gap-2">
                      <Layers size={18} className="text-[#91e47a] stroke-[2.5]" />
                      How MediaPipe Works
                    </h3>
                    <p className="text-black/80 text-sm sm:text-base leading-relaxed mb-4">
                      Under the hood, MediaPipe is structured as a <strong>graph-based dataflow
                      pipeline</strong>. Time-series perception data flows through the system as
                      timestamped <strong>Packets</strong> over connected <strong>Streams</strong>:
                    </p>
                    <div className="bg-[#f5f4ee] border-2 border-black rounded-xl p-5 space-y-3 font-sans">
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded bg-black text-white font-mono text-xs flex items-center justify-center shrink-0 mt-0.5 font-bold">
                          A
                        </div>
                        <div>
                          <strong className="text-black font-semibold text-sm">
                            Calculators (Modular Nodes):
                          </strong>{" "}
                          <span className="text-black/75 text-sm">
                            Each step in the pipeline—such as video capture, image cropping, neural
                            inference, and coordinate normalization—is an isolated, highly optimized C++
                            calculator node.
                          </span>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded bg-black text-white font-mono text-xs flex items-center justify-center shrink-0 mt-0.5 font-bold">
                          B
                        </div>
                        <div>
                          <strong className="text-black font-semibold text-sm">
                            Two-Stage Detection & Tracking:
                          </strong>{" "}
                          <span className="text-black/75 text-sm">
                            Instead of running heavy full-frame neural detection every frame,
                            MediaPipe detects the hand or face once, calculates a tight region of
                            interest (ROI), and simply tracks landmarks across subsequent frames. If
                            tracking is lost, it re-invokes the detector automatically.
                          </span>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded bg-black text-white font-mono text-xs flex items-center justify-center shrink-0 mt-0.5 font-bold">
                          C
                        </div>
                        <div>
                          <strong className="text-black font-semibold text-sm">
                            Modern MediaPipe Tasks API:
                          </strong>{" "}
                          <span className="text-black/75 text-sm">
                            The newest generation abstracts the complex graph setup into simple,
                            idiomatic Python and JavaScript classes like `HandLandmarker` and
                            `GestureRecognizer`, letting you build prototypes in under an hour.
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Real-World Applications */}
                  <div>
                    <h3 className="font-display font-bold text-lg sm:text-xl text-black mb-3 flex items-center gap-2">
                      <Activity size={18} className="text-[#ffd34e] stroke-[2.5]" />
                      Real-World Applications
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {realWorldApps.map((app) => (
                        <div
                          key={app.title}
                          className={`p-4 rounded-xl border-2 border-black ${app.color} shadow-xs`}
                        >
                          <span className="font-mono text-[10px] uppercase font-bold text-black/70 block mb-1">
                            {app.tag}
                          </span>
                          <h4 className="font-display font-bold text-base text-black mb-1">
                            {app.title}
                          </h4>
                          <p className="text-xs text-black/75 leading-relaxed">{app.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* MediaPipe Tasks and Capabilities Table */}
                  <div>
                    <h3 className="font-display font-bold text-lg sm:text-xl text-black mb-3 flex items-center gap-2">
                      <Cpu size={18} className="text-black stroke-[2.5]" />
                      MediaPipe Tasks and Its Capabilities
                    </h3>
                    <p className="text-black/80 text-sm leading-relaxed mb-4">
                      The MediaPipe suite includes specialized task modules categorized across
                      vision, audio, and text domains:
                    </p>
                    <div className="overflow-x-auto border-2 border-black rounded-xl bg-white shadow-xs">
                      <table className="w-full text-left border-collapse text-xs">
                        <thead>
                          <tr className="bg-[#f5f4ee] border-b-2 border-black font-mono uppercase text-black font-bold">
                            <th className="py-3 px-4">Task Name</th>
                            <th className="py-3 px-4">Domain</th>
                            <th className="py-3 px-4">Key Specification</th>
                            <th className="py-3 px-4">Common Use Cases</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-black/10 font-sans">
                          {mediapipeCapabilities.map((cap) => (
                            <tr key={cap.name} className="hover:bg-[#fff6bf]/40 transition-colors">
                              <td className="py-3 px-4 font-bold text-black font-mono">
                                {cap.name}
                              </td>
                              <td className="py-3 px-4">
                                <span
                                  className={`px-2 py-0.5 rounded font-mono text-[10px] font-bold border border-black ${
                                    cap.domain === "Vision"
                                      ? "bg-[#aeeaf5]"
                                      : cap.domain === "Audio"
                                      ? "bg-[#ffd34e]"
                                      : "bg-[#f28ad8]"
                                  }`}
                                >
                                  {cap.domain}
                                </span>
                              </td>
                              <td className="py-3 px-4 font-mono text-[11px] text-black/80">
                                {cap.keyMetric}
                              </td>
                              <td className="py-3 px-4 text-black/75">{cap.sampleUse}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* ──────────────────────────────────────────────────────────── */}
            {/* 2. Prerequisites */}
            {/* ──────────────────────────────────────────────────────────── */}
            <section id="prerequisites" className="scroll-mt-24">
              <div className="border-2 border-black rounded-2xl bg-white p-6 sm:p-8 shadow-hard-sm">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-black">
                  <span className="font-mono font-bold text-sm bg-black text-white px-3 py-1 rounded">
                    02
                  </span>
                  <h2 className="font-display font-bold text-2xl sm:text-3xl text-black">
                    Prerequisites
                  </h2>
                </div>

                <div className="space-y-6">
                  <p className="text-black/80 text-sm sm:text-base leading-relaxed">
                    You don't need a PhD in Machine Learning to build a winning Saturday Hack Night
                    prototype! Here is what you need before writing your first script:
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Basic Python Knowledge */}
                    <div className="p-4 rounded-xl border-2 border-black bg-[#fae4f2]">
                      <div className="flex items-center gap-2 mb-2 font-display font-bold text-base text-black">
                        <CheckCircle2 size={16} className="text-black stroke-[2.5]" />
                        Basic Python Knowledge
                      </div>
                      <p className="text-xs text-black/80 leading-relaxed">
                        Familiarity with Python 3.9 through 3.12, defining functions, working with
                        loops (`while cap.isOpened()`), list indexing, and object-oriented methods.
                      </p>
                    </div>

                    {/* Understanding Computer Vision */}
                    <div className="p-4 rounded-xl border-2 border-black bg-[#e0f4fb]">
                      <div className="flex items-center gap-2 mb-2 font-display font-bold text-base text-black">
                        <CheckCircle2 size={16} className="text-black stroke-[2.5]" />
                        Computer Vision Basics
                      </div>
                      <p className="text-xs text-black/80 leading-relaxed">
                        Understanding normalized coordinates: MediaPipe outputs `x` and `y` between
                        `0.0` and `1.0`. To obtain pixel positions, multiply: `px = int(landmark.x *
                        frame_width)`. Remember OpenCV reads in BGR format!
                      </p>
                    </div>

                    {/* Python Installation */}
                    <div className="p-4 rounded-xl border-2 border-black bg-[#e6f7e2]">
                      <div className="flex items-center gap-2 mb-2 font-display font-bold text-base text-black">
                        <CheckCircle2 size={16} className="text-black stroke-[2.5]" />
                        Clean Virtual Environment
                      </div>
                      <p className="text-xs text-black/80 leading-relaxed">
                        Always isolate your dependencies using `python -m venv venv`. Avoid version
                        conflicts between OpenCV and MediaPipe.
                      </p>
                    </div>

                    {/* Google Colab */}
                    <div className="p-4 rounded-xl border-2 border-black bg-[#fff6bf]">
                      <div className="flex items-center gap-2 mb-2 font-display font-bold text-base text-black">
                        <CheckCircle2 size={16} className="text-black stroke-[2.5]" />
                        Google Colab Option
                      </div>
                      <p className="text-xs text-black/80 leading-relaxed">
                        Zero local setup needed! You can test MediaPipe on video clips or live
                        JavaScript WebRTC streams directly in free cloud Jupyter notebooks.
                      </p>
                    </div>
                  </div>

                  {/* Environment Setup Code Snippet */}
                  <div className="mt-6">
                    <h3 className="font-display font-bold text-base sm:text-lg text-black mb-2 flex items-center gap-2">
                      <Laptop size={17} />
                      Terminal Setup: Virtual Environment & Pip Install
                    </h3>
                    <CodeBlock
                      language="bash"
                      filename="terminal_setup.sh"
                      code={`# Create a clean Python environment
python -m venv venv

# Activate the virtual environment
# On macOS / Linux:
source venv/bin/activate
# On Windows PowerShell:
.\\venv\\Scripts\\Activate.ps1

# Install MediaPipe, OpenCV, and NumPy
pip install --upgrade pip
pip install mediapipe opencv-python numpy`}
                    />
                  </div>

                  {/* NumPy Fundamentals */}
                  <div className="mt-6">
                    <h3 className="font-display font-bold text-base sm:text-lg text-black mb-2 flex items-center gap-2">
                      <Code2 size={17} className="text-[#f28ad8]" />
                      NumPy Fundamentals for Gesture Triggers
                    </h3>
                    <p className="text-black/80 text-xs sm:text-sm leading-relaxed mb-3">
                      In gesture recognition, you frequently measure the distance between two
                      fingertips (like index and thumb for a pinch trigger). Use NumPy's vector
                      norm:
                    </p>
                    <CodeBlock
                      language="python"
                      filename="euclidean_distance.py"
                      code={distanceCalculationCode}
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* ──────────────────────────────────────────────────────────── */}
            {/* 3. Documentation */}
            {/* ──────────────────────────────────────────────────────────── */}
            <section id="documentation" className="scroll-mt-24">
              <div className="border-2 border-black rounded-2xl bg-white p-6 sm:p-8 shadow-hard-sm">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-black">
                  <span className="font-mono font-bold text-sm bg-black text-white px-3 py-1 rounded">
                    03
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
            {/* 4. Tutorials */}
            {/* ──────────────────────────────────────────────────────────── */}
            <section id="tutorials" className="scroll-mt-24">
              <div className="border-2 border-black rounded-2xl bg-white p-6 sm:p-8 shadow-hard-sm">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-black">
                  <span className="font-mono font-bold text-sm bg-black text-white px-3 py-1 rounded">
                    04
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
            {/* 5. Project Ideas */}
            {/* ──────────────────────────────────────────────────────────── */}
            <section id="project-ideas" className="scroll-mt-24">
              <div className="border-2 border-black rounded-2xl bg-white p-6 sm:p-8 shadow-hard-sm">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-black">
                  <span className="font-mono font-bold text-sm bg-black text-white px-3 py-1 rounded">
                    05
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
            {/* 8. LetXplore */}
            {/* ──────────────────────────────────────────────────────────── */}
            <section id="letxplore" className="scroll-mt-24">
              <div className="border-2 border-black rounded-2xl bg-white p-6 sm:p-8 shadow-hard-sm">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-black">
                  <span className="font-mono font-bold text-sm bg-black text-white px-3 py-1 rounded">
                    08
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
            {/* 9. Mentors */}
            {/* ──────────────────────────────────────────────────────────── */}
            <section id="mentors" className="scroll-mt-24">
              <div className="border-2 border-black rounded-2xl bg-white p-6 sm:p-8 shadow-hard-sm space-y-6">
                <div className="flex items-center gap-3 pb-4 border-b-2 border-black">
                  <span className="font-mono font-bold text-sm bg-black text-white px-3 py-1 rounded">
                    09
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
            {/* 10. Contact Us */}
            {/* ──────────────────────────────────────────────────────────── */}
            <section id="contact-us" className="scroll-mt-24">
              <div className="border-2 border-black rounded-2xl bg-white p-6 sm:p-8 shadow-hard-sm">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-black">
                  <span className="font-mono font-bold text-sm bg-black text-white px-3 py-1 rounded">
                    10
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
                      Visit TinkerHub's flagship maker space in Kalamassery, Kochi. Venue for the
                      end-of-season 24-hour grand finale!
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
