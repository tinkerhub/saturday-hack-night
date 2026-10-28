import { demoColors } from "./tokens";
import Scribble from "./Scribble";

export default function DemoHero() {
  return (
    <section className="relative px-6 pt-20 pb-32 md:pt-32 md:pb-48 text-center overflow-hidden">
      <p
        className="font-mono text-xs mb-6"
        style={{ color: demoColors.pink }}
      >
        visual direction prototype — not final
      </p>

      <h1 className="font-sans font-extrabold leading-[0.95] tracking-tight text-5xl sm:text-6xl md:text-8xl">
        <span style={{ color: demoColors.green }}>BUILD. LEARN.</span>
        <br />
        <span className="text-white">SHIP.</span>
        <br />
        <span style={{ color: demoColors.pink }}>TOGETHER.</span>
      </h1>

      <div className="relative mt-10 flex justify-center">
        <Scribble text="scroll to see it fall in ↓" rotate={-5} />
      </div>

      {/* wireframe floor plane — nods to the reference image without copying it */}
      <div
        aria-hidden
        className="absolute bottom-0 left-0 right-0 h-40 md:h-56"
        style={{
          backgroundImage: `linear-gradient(${demoColors.border} 1px, transparent 1px)`,
          backgroundSize: "100% 14px",
          maskImage: "linear-gradient(to top, black, transparent)",
          WebkitMaskImage: "linear-gradient(to top, black, transparent)",
          opacity: 0.7,
        }}
      />
    </section>
  );
}


