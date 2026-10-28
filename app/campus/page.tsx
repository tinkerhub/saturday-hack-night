"use client";

import { motion } from "@/lib/motion";
import {
  ArrowLeft,
  ArrowRight,
  MessageSquare,
  Mail,
  MapPin,
  Wifi,
  Monitor,
  Coffee,
  Users,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import GridBackdrop from "@/components/ui/GridBackdrop";
import { pastHackNights, DISCORD_URL } from "@/lib/data";

const requirements = [
  {
    icon: MapPin,
    title: "A Space",
    description:
      "A room, lab, or open area where builders can sit and hack for 6+ hours. College labs work great.",
  },
  {
    icon: Wifi,
    title: "Internet",
    description:
      "Stable Wi-Fi for everyone. GitHub pushes must go through by midnight.",
  },
  {
    icon: Monitor,
    title: "Projector / Screen",
    description:
      "To share the theme, stream the online session, and show off projects at the end.",
  },
  {
    icon: Coffee,
    title: "Energy & Snacks",
    description:
      "Optional but strongly recommended. Builders who are fed, build better.",
  },
  {
    icon: Users,
    title: "A Campus Lead",
    description:
      "One person to coordinate registration, manage the space, and report project submissions.",
  },
];

const steps = [
  {
    step: "01",
    title: "Apply to Host",
    description:
      "Fill out the campus host form. We'll get back within 48 hours with confirmation and the theme kit for the upcoming hack night.",
  },
  {
    step: "02",
    title: "Register Your Builders",
    description:
      "Share the hub.app registration link with your campus community. Each participant registers individually.",
  },
  {
    step: "03",
    title: "Run the Hack Night",
    description:
      "On Saturday at 6 PM, open the theme, start hacking. The online SHN runs simultaneously — your campus group joins the same event.",
  },
  {
    step: "04",
    title: "Submit by Midnight",
    description:
      "Each team pushes their project to GitHub and submits the link before midnight. Campus lead collects and verifies.",
  },
  {
    step: "05",
    title: "Celebrate & Report",
    description:
      "Showcase projects at the end. Share a photo or video to the SHN Discord. The best campus project gets featured in the archive.",
  },
];

const previousThemes = pastHackNights.map((n) => ({
  theme: n.theme,
  stack: n.stack,
  difficulty: n.difficulty,
  slug: n.slug,
}));

export default function CampusPage() {
  return (
    <main className="min-h-screen bg-[#F5F4EE] text-[#111111] relative selection:bg-[#f5d6ed] selection:text-black">
      {/* Subtle paper grid backdrop */}
      <GridBackdrop />

      {/* Main Website Navbar */}
      <Navbar />

      <div className="relative z-10 max-w-4xl mx-auto px-5 sm:px-8 pt-28 sm:pt-36 pb-20">
        {/* Breadcrumb back link */}
        <div className="mb-10">
          <a
            href="/"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider font-bold text-[#111111]/70 hover:text-black hover:underline transition-colors"
          >
            <ArrowLeft size={14} strokeWidth={2.5} />
            Back to Saturday Hack Night
          </a>
        </div>

        {/* Hero Section */}
        <header className="mb-14">
          <p className="font-mono font-bold text-xs uppercase tracking-widest text-[#f5d6ed] mb-4">
            Campus Edition
          </p>
          <h1 className="font-display font-bold text-4xl sm:text-6xl lg:text-7xl text-[#111111] tracking-[-0.03em] leading-[0.95] mb-8">
            Saturday Hack Night <br />
            <span className="text-[#111111]/60">at your campus</span>
          </h1>
          <div className="space-y-4 max-w-3xl">
            <p className="font-sans font-medium text-lg sm:text-xl text-[#111111]/90 leading-relaxed">
              SHN is designed to run anywhere — a college lab, a maker space, a
              classroom. If you have 5 builders and a Wi-Fi connection, you can
              host a campus hack night that runs in sync with the main online
              event.
            </p>
            <p className="font-sans font-medium text-base sm:text-lg text-[#111111]/80 leading-relaxed">
              Your campus builders compete in the same event, build on the same
              theme, and submit to the same pool. Top teams — from anywhere —
              get invited to TinkerSpace Kochi for the 24-hour finale.
            </p>
          </div>
        </header>

        {/* Prominent Editorial Numbers — Pure Typography (NO Card Boxes) */}
        <div className="py-10 border-y-2 border-black grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          <div>
            <div className="font-display font-bold text-5xl sm:text-6xl text-[#111111] leading-none mb-2">
              120<span className="text-[#f5d6ed]">+</span>
            </div>
            <div className="font-mono text-xs uppercase tracking-widest text-[#111111]/70 font-bold">
              Students
            </div>
          </div>
          <div>
            <div className="font-display font-bold text-5xl sm:text-6xl text-[#111111] leading-none mb-2">
              5
            </div>
            <div className="font-mono text-xs uppercase tracking-widest text-[#111111]/70 font-bold">
              Online Nights
            </div>
          </div>
          <div>
            <div className="font-display font-bold text-5xl sm:text-6xl text-[#111111] leading-none mb-2">
              24<span className="text-[#d4f5e0]">H</span>
            </div>
            <div className="font-mono text-xs uppercase tracking-widest text-[#111111]/70 font-bold">
              Final Hackathon
            </div>
          </div>
          <div>
            <div className="font-display font-bold text-5xl sm:text-6xl text-[#111111] leading-none mb-2">
              0<span className="text-[#AEEAF5]">₹</span>
            </div>
            <div className="font-mono text-xs uppercase tracking-widest text-[#111111]/70 font-bold">
              100% Free
            </div>
          </div>
        </div>

        {/* Section: WHAT IS SHN AT CAMPUS? */}
        <section className="mb-16">
          <p className="font-mono font-bold text-xs uppercase tracking-widest text-[#f5d6ed] mb-2">
            01 / Overview
          </p>
          <h2 className="font-display font-bold text-2xl sm:text-4xl text-[#111111] tracking-[-0.02em] leading-tight uppercase mb-6">
            What is SHN at Campus?
          </h2>
          <div className="space-y-4 text-base sm:text-lg font-sans font-medium text-[#111111]/85 leading-relaxed max-w-3xl">
            <p>
              Saturday Hack Night Campus Edition is a decentralized physical meetup
              where student communities assemble in real life to participate in the
              live bi-weekly Saturday Hack Night sprint.
            </p>
            <p>
              Instead of hacking alone from home, your campus opens up a lab or room
              where creators, coders, and makers sit side-by-side, brainstorm, share
              pizza or chai, and push code before the midnight deadline.
            </p>
          </div>
        </section>

        <hr className="border-t-2 border-black/20 my-16" />

        {/* Section: WHO CAN PARTICIPATE? */}
        <section className="mb-16">
          <p className="font-mono font-bold text-xs uppercase tracking-widest text-[#f5d6ed] mb-2">
            02 / Eligibility
          </p>
          <h2 className="font-display font-bold text-2xl sm:text-4xl text-[#111111] tracking-[-0.02em] leading-tight uppercase mb-6">
            Who Can Participate?
          </h2>
          <div className="space-y-4 text-base sm:text-lg font-sans font-medium text-[#111111]/85 leading-relaxed max-w-3xl mb-8">
            <p>
              Any student from your institution can join — whether they are in their
              first semester or final year, and regardless of their branch or technical
              background.
            </p>
          </div>

          {/* Minimal editorial list for team formats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-4">
            <div className="border-l-2 border-black pl-5">
              <div className="font-display font-bold text-xl text-[#111111] mb-1">
                Solo Builder
              </div>
              <p className="text-sm sm:text-base font-medium text-[#111111]/75 leading-relaxed">
                Build alone. Your project, your vision, your pace. Perfect for testing
                an ambitious concept solo.
              </p>
            </div>
            <div className="border-l-2 border-[#f5d6ed] pl-5">
              <div className="font-display font-bold text-xl text-[#111111] mb-1">
                Team of Two
              </div>
              <p className="text-sm sm:text-base font-medium text-[#111111]/75 leading-relaxed">
                Pair up with a friend. One to architect and build, one to design and
                debug. Maximum 2 builders per team. Both members receive offline finale
                invitations if selected.
              </p>
            </div>
          </div>
        </section>

        <hr className="border-t-2 border-black/20 my-16" />

        {/* Section: HOW IT WORKS */}
        <section className="mb-16">
          <p className="font-mono font-bold text-xs uppercase tracking-widest text-[#f5d6ed] mb-2">
            03 / Process
          </p>
          <h2 className="font-display font-bold text-2xl sm:text-4xl text-[#111111] tracking-[-0.02em] leading-tight uppercase mb-8">
            How It Works
          </h2>
          <div className="space-y-8">
            {steps.map((step) => (
              <div
                key={step.step}
                className="grid grid-cols-1 sm:grid-cols-[70px_1fr] gap-3 sm:gap-6 pb-8 border-b border-black/15 last:border-0"
              >
                <div className="font-mono font-black text-3xl sm:text-4xl text-[#111111]">
                  {step.step}
                </div>
                <div>
                  <h3 className="font-display font-bold text-xl sm:text-2xl text-[#111111] mb-2">
                    {step.title}
                  </h3>
                  <p className="text-base sm:text-lg font-sans font-medium text-[#111111]/80 leading-relaxed max-w-2xl">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-t-2 border-black/20 my-16" />

        {/* Section: WHAT YOU NEED TO HOST */}
        <section className="mb-16">
          <p className="font-mono font-bold text-xs uppercase tracking-widest text-[#f5d6ed] mb-2">
            04 / Requirements
          </p>
          <h2 className="font-display font-bold text-2xl sm:text-4xl text-[#111111] tracking-[-0.02em] leading-tight uppercase mb-8">
            What You Need to Host
          </h2>
          <div className="space-y-6">
            {requirements.map((req) => {
              const Icon = req.icon;
              return (
                <div
                  key={req.title}
                  className="flex items-start gap-4 pb-6 border-b border-black/15 last:border-0"
                >
                  <div className="w-8 h-8 rounded-lg bg-black text-white flex items-center justify-center shrink-0 mt-1 border border-black shadow-[2px_2px_0px_0px_#000]">
                    <Icon size={16} strokeWidth={2.5} />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-lg sm:text-xl text-[#111111] mb-1">
                      {req.title}
                    </h3>
                    <p className="text-base font-sans font-medium text-[#111111]/80 leading-relaxed max-w-2xl">
                      {req.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <hr className="border-t-2 border-black/20 my-16" />

        {/* Section: WHAT HAPPENS AT THE CAMPUS? */}
        <section className="mb-16">
          <p className="font-mono font-bold text-xs uppercase tracking-widest text-[#f5d6ed] mb-2">
            05 / The Flow
          </p>
          <h2 className="font-display font-bold text-2xl sm:text-4xl text-[#111111] tracking-[-0.02em] leading-tight uppercase mb-6">
            What Happens at the Campus?
          </h2>
          <div className="space-y-5 text-base sm:text-lg font-sans font-medium text-[#111111]/85 leading-relaxed max-w-3xl">
            <div className="flex gap-4 items-baseline">
              <span className="font-mono text-sm font-black text-black bg-[#d4f5e0] px-2 py-0.5 rounded border border-black shrink-0">
                6:00 PM IST
              </span>
              <p>
                The challenge brief drops on the statewide Discord and website.
                Mentors come online. Everyone at your campus starts building.
              </p>
            </div>
            <div className="flex gap-4 items-baseline">
              <span className="font-mono text-sm font-black text-black bg-[#AEEAF5] px-2 py-0.5 rounded border border-black shrink-0">
                6:00 – 11:30 PM
              </span>
              <p>
                Builders code, tinker with hardware, pair-program, test endpoints,
                and debug. Mentors are available in Discord channels for quick
                blockers.
              </p>
            </div>
            <div className="flex gap-4 items-baseline">
              <span className="font-mono text-sm font-black text-black bg-[#FFD34E] px-2 py-0.5 rounded border border-black shrink-0">
                11:59 PM IST
              </span>
              <p>
                Hard deadline. Each team pushes their commits to a public GitHub repo
                and submits their prototype link.
              </p>
            </div>
            <div className="flex gap-4 items-baseline">
              <span className="font-mono text-sm font-black text-black bg-[#f5d6ed] px-2 py-0.5 rounded border border-black shrink-0">
                MIDNIGHT
              </span>
              <p>
                Showcase on screen! Gather in the campus room to see what peers
                created. Take photos, post to Discord, and celebrate.
              </p>
            </div>
          </div>
        </section>

        <hr className="border-t-2 border-black/20 my-16" />

        {/* Section: PREVIOUS THEMES */}
        <section className="mb-16">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
            <div>
              <p className="font-mono font-bold text-xs uppercase tracking-widest text-[#f5d6ed] mb-2">
                06 / Archive
              </p>
              <h2 className="font-display font-bold text-2xl sm:text-4xl text-[#111111] tracking-[-0.02em] leading-tight uppercase">
                Previously Run Topics
              </h2>
            </div>
            <a
              href="/archive/"
              className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider font-bold text-[#111111] hover:text-[#f5d6ed] transition-colors"
            >
              All hack nights <ArrowRight size={13} strokeWidth={2.5} />
            </a>
          </div>

          <div className="divide-y-2 border-y-2 border-black">
            {previousThemes.map((t) => (
              <a
                key={t.slug}
                href={`/archive/${t.slug}/`}
                className="py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 group hover:bg-black/[0.03] transition-colors px-2 -mx-2"
              >
                <div>
                  <div className="font-display font-bold text-xl text-[#111111] group-hover:text-[#f5d6ed] transition-colors">
                    {t.theme}
                  </div>
                  <div className="font-mono text-xs text-[#111111]/70 font-semibold mt-0.5">
                    {t.stack}
                  </div>
                </div>
                <div className="flex items-center gap-4 shrink-0">
                  <span className="font-mono text-xs uppercase tracking-wider font-black px-2.5 py-0.5 rounded bg-black text-white border border-black">
                    {t.difficulty}
                  </span>
                  <span className="font-mono text-xs font-bold text-black group-hover:translate-x-1 transition-transform flex items-center gap-1">
                    Projects <ArrowRight size={12} strokeWidth={2.5} />
                  </span>
                </div>
              </a>
            ))}
          </div>
        </section>

        <hr className="border-t-2 border-black/20 my-16" />

        {/* Section: CAMPUS COMMUNITY & TINKERHUB CHAPTER */}
        <section className="mb-16">
          <p className="font-mono font-bold text-xs uppercase tracking-widest text-[#f5d6ed] mb-2">
            07 / Community
          </p>
          <h2 className="font-display font-bold text-2xl sm:text-4xl text-[#111111] tracking-[-0.02em] leading-tight uppercase mb-6">
            Campus Community & TinkerHub Chapters
          </h2>
          <div className="space-y-4 text-base sm:text-lg font-sans font-medium text-[#111111]/85 leading-relaxed max-w-3xl">
            <p>
              Saturday Hack Night is powered by TinkerHub Foundation, connecting over
              50,000 makers, student developers, and technologists across Kerala and
              beyond.
            </p>
            <p>
              If your campus already hosts a TinkerHub Learning Station or Campus
              Chapter, Saturday Hack Night is the ultimate recurring bi-weekly
              sprint to put learned skills into production code. If you don&apos;t have
              a chapter yet, hosting an SHN is the fastest way to start one.
            </p>
          </div>
        </section>

        <hr className="border-t-2 border-black/20 my-16" />

        {/* Section: READY? CTA */}
        <section className="pt-4 pb-12">
          <p className="font-mono font-bold text-xs uppercase tracking-widest text-[#f5d6ed] mb-3">
            08 / Host With Us
          </p>
          <h2 className="font-display font-bold text-3xl sm:text-5xl lg:text-6xl text-[#111111] tracking-[-0.02em] leading-tight uppercase mb-6">
            Bring Saturday Hack Night <br />
            to Your Campus
          </h2>
          <p className="text-[#111111]/80 font-sans font-medium text-lg sm:text-xl leading-relaxed max-w-2xl mb-8">
            Reach out on Discord or email us. We&apos;ll send you the theme kit,
            posters, and everything you need to run a smooth hack night.
          </p>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <a
              href={DISCORD_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 bg-[#f5d6ed] text-black font-mono font-black text-sm uppercase tracking-wider px-6 py-3.5 rounded-lg border-2 border-black shadow-[3px_3px_0px_0px_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_0px_#000] transition-all"
            >
              <MessageSquare size={16} strokeWidth={2.5} />
              Reach out on Discord
            </a>
            <a
              href="mailto:hello@tinkerhub.org"
              className="inline-flex items-center gap-2.5 bg-[#fff6bf] text-black font-mono font-bold text-sm uppercase tracking-wider px-6 py-3.5 rounded-lg border-2 border-black shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"
            >
              <Mail size={16} strokeWidth={2} />
              Email Us
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}




