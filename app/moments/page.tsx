"use client";

import { ArrowLeft } from "lucide-react";
import { moments, MOMENTS_PLACEHOLDER_COUNT } from "@/lib/data";
import MomentsScroller from "@/components/ui/MomentsScroller";
import SectionHeading from "@/components/ui/SectionHeading";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import GridBackdrop from "@/components/ui/GridBackdrop";

export default function MomentsPage() {
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
        <div className="mb-14">
          <p className="font-mono text-xs font-bold uppercase tracking-wider mb-3 bg-[#d0ecf8] text-black inline-block px-3 py-1 border border-black rounded shadow-sm">
            The Builder Journey
          </p>
          <SectionHeading accent="green" as="h1" className="mb-4">
            Moments
          </SectionHeading>
          <p className="text-black/75 font-normal text-lg max-w-2xl">
            A visual chronicle of the energy, the late-night prototypes, the breakthroughs, and the community at Saturday Hack Night.
          </p>
        </div>

        <MomentsScroller
          photos={moments}
          slotCount={MOMENTS_PLACEHOLDER_COUNT}
          vhPerSlot={70}
        />
      </div>

      <Footer />
    </main>
  );
}



