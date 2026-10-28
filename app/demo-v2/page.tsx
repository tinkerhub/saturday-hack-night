import DemoNavbar from "@/components/demo-v2/DemoNavbar";
import DemoHero from "@/components/demo-v2/DemoHero";
import GridBackdrop from "@/components/demo-v2/GridBackdrop";
import ScrollSection from "@/components/demo-v2/ScrollSection";
import HowItWorksContent from "@/components/demo-v2/sections/HowItWorks";
import TimelineContent from "@/components/demo-v2/sections/Timeline";
import PastNightsContent from "@/components/demo-v2/sections/PastNights";
import BuilderSpeakContent from "@/components/demo-v2/sections/BuilderSpeak";

export default function DemoV2Page() {
  return (
    <main className="relative">
      <GridBackdrop />
      <div className="relative z-10">
        <DemoNavbar />
        <DemoHero />

        <ScrollSection id="how-it-works" heading="How it works" accent="green">
          <HowItWorksContent />
        </ScrollSection>

        <ScrollSection id="timeline" heading="Timeline" accent="pink">
          <TimelineContent />
        </ScrollSection>

        <ScrollSection id="past-nights" heading="Past nights" accent="green">
          <PastNightsContent />
        </ScrollSection>

        <ScrollSection id="builder-speak" heading="Builder speak" accent="pink">
          <BuilderSpeakContent />
        </ScrollSection>

        <footer className="py-16 text-center font-mono text-xs" style={{ color: "#8f8aa8" }}>
          demo route — /demo-v2 — not linked from the live site
        </footer>
      </div>
    </main>
  );
}


