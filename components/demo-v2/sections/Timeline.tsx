import { demoColors } from "../tokens";

const events = [
  { time: "6:00 PM", label: "Doors open, pick your table" },
  { time: "6:30 PM", label: "Lightning ideas — pitch in 60 seconds" },
  { time: "7:00 PM", label: "Build. Mentors circulate." },
  { time: "9:30 PM", label: "Demo whatever you've got" },
];

export default function TimelineContent() {
  return (
    <div className="relative max-w-xl mx-auto text-left">
      <div
        className="absolute left-[7px] top-2 bottom-2 w-px"
        style={{ backgroundColor: demoColors.border }}
        aria-hidden
      />
      <ul className="space-y-8">
        {events.map((e) => (
          <li key={e.time} className="relative pl-8">
            <span
              className="absolute left-0 top-1.5 w-3.5 h-3.5 rounded-full"
              style={{
                backgroundColor: demoColors.bg,
                border: `2px solid ${demoColors.pink}`,
                boxShadow: `0 0 10px ${demoColors.pinkSoft}`,
              }}
              aria-hidden
            />
            <span className="font-mono text-xs" style={{ color: demoColors.pink }}>
              {e.time}
            </span>
            <p className="text-white mt-1">{e.label}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}


