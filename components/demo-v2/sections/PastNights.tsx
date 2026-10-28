const nights = [
  { title: "Edition #41", stat: "62 builders", bg: "bg-[#f5d6ed]", rotation: "transform -rotate-1" },
  { title: "Edition #40", stat: "48 builders", bg: "bg-[#d4f5e0]", rotation: "transform rotate-1" },
  { title: "Edition #39", stat: "71 builders", bg: "bg-[#d0ecf8]", rotation: "transform -rotate-0.5" },
];

export default function PastNightsContent() {
  return (
    <div className="grid gap-6 sm:grid-cols-3">
      {nights.map((n) => (
        <div
          key={n.title}
          className={`group aspect-[4/5] rounded-xl p-6 flex flex-col justify-end relative border-[3px] border-black ${n.bg} text-black shadow-[4px_4px_0px_0px_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_0px_#000] transition-all ${n.rotation}`}
        >
          <h3 className="font-display font-black text-black text-2xl sm:text-3xl leading-tight">
            {n.title}
          </h3>
          <p className="font-mono text-xs font-black text-black bg-[#fff6bf] inline-block px-2 py-1 border border-black rounded mt-2 self-start">
            {n.stat}
          </p>
        </div>
      ))}
    </div>
  );
}




