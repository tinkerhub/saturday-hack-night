import { demoColors } from "../tokens";

const steps = [
  { title: "Show up", desc: "Walk in Saturday 6 PM. No paperwork, no pitch required." },
  { title: "Pick a build", desc: "Solo or with a team. Bring an idea or grab one from the board." },
  { title: "Ship something", desc: "By the end of the night, something works. Demo it or don't." },
];

export default function HowItWorksContent() {
  return (
    <>
      <p className="font-mono text-sm mb-10" style={{ color: demoColors.muted }}>
        three steps, zero red tape.
      </p>
      <div className="grid gap-6 md:grid-cols-3 text-left">
        {steps.map((s, i) => (
          <div
            key={s.title}
            className="relative p-6 rounded-lg"
            style={{ border: `1px solid ${demoColors.border}` }}
          >
            <CornerMarks color={demoColors.green} />
            <span className="font-mono text-xs" style={{ color: demoColors.green }}>
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-3 mb-2 font-sans font-bold text-xl text-white">
              {s.title}
            </h3>
            <p className="text-sm" style={{ color: demoColors.muted }}>
              {s.desc}
            </p>
          </div>
        ))}
      </div>
    </>
  );
}

function CornerMarks({ color }: { color: string }) {
  const base = "absolute w-3 h-3";
  return (
    <span aria-hidden style={{ color }}>
      <span className={`${base} top-0 left-0 border-t-2 border-l-2 border-current`} />
      <span className={`${base} top-0 right-0 border-t-2 border-r-2 border-current`} />
      <span className={`${base} bottom-0 left-0 border-b-2 border-l-2 border-current`} />
      <span className={`${base} bottom-0 right-0 border-b-2 border-r-2 border-current`} />
    </span>
  );
}


