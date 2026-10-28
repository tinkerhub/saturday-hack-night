import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Philosophy from "@/components/sections/Philosophy";
import HeroPhilosophyCollage from "@/components/ui/HeroPhilosophyCollage";
import GetSelected from "@/components/sections/GetSelected";
import Timeline from "@/components/sections/Timeline";
import AfterRegister from "@/components/sections/AfterRegister";
import TinkerSpace from "@/components/sections/TinkerSpace";
import Experience from "@/components/sections/Experience";
import Community from "@/components/sections/Community";
import FAQ from "@/components/sections/FAQ";
import Moments from "@/components/sections/Moments";

export default function Home() {
  return (
    <main id="main-content" className="min-h-screen" style={{ backgroundColor: "#f5f4ee" }}>
      <Navbar />

      {/* Background image collage spanning continuously from Hero through Philosophy */}
      <div className="relative overflow-hidden">
        <HeroPhilosophyCollage />
        <div className="relative z-10">
          <Hero />
          <Philosophy />
        </div>
      </div>

      <GetSelected />
      <AfterRegister />
      <Timeline />
      <TinkerSpace />
      <Experience />
      <Community />
      <FAQ />
      <Moments />
      <Footer />
    </main>
  );
}


