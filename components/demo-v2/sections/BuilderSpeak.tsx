import { demoColors } from "../tokens";
import Scribble from "../Scribble";

const lines = [
  "$ shipped != perfect",
  "$ ask the person next to you",
  "$ commit early, commit often",
];

export default function BuilderSpeakContent() {
  return (
    <div className="flex flex-col items-center">
      <div
        className="w-full max-w-lg rounded-lg p-6 text-left font-mono text-sm"
        style={{
          border: `1px solid ${demoColors.pinkSoft}`,
          backgroundColor: "rgba(255,62,200,0.04)",
          boxShadow: `0 0 30px ${demoColors.pinkSoft}`,
        }}
      >
        <div className="flex gap-1.5 mb-4" aria-hidden>
          <span
            className="w-2.5 h-2.5 rounded-full"
            style={{ backgroundColor: demoColors.pink }}
          />
          <span
            className="w-2.5 h-2.5 rounded-full"
            style={{ backgroundColor: demoColors.green }}
          />
          <span
            className="w-2.5 h-2.5 rounded-full border"
            style={{ borderColor: demoColors.muted }}
          />
        </div>
        {lines.map((l) => (
          <p key={l} style={{ color: demoColors.green }} className="mb-2">
            {l}
          </p>
        ))}
        <p style={{ color: demoColors.pink }}>
          _<span className="animate-pulse">|</span>
        </p>
      </div>
      <Scribble text="still cooking, obviously" rotate={4} className="mt-6" color="green" />
    </div>
  );
}


