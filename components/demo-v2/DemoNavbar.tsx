import { demoColors } from "./tokens";

const links = [
  { href: "#how-it-works", label: "How it works" },
  { href: "#timeline", label: "Timeline" },
  { href: "#past-nights", label: "Past nights" },
  { href: "#builder-speak", label: "Builder speak" },
];

export default function DemoNavbar() {
  return (
    <header
      className="sticky top-0 z-50 backdrop-blur-md"
      style={{
        borderBottom: `1px solid ${demoColors.border}`,
        backgroundColor: "rgba(10,7,20,0.7)",
      }}
    >
      <nav className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        <span className="font-mono font-bold text-sm tracking-tight">
          <span style={{ color: demoColors.green }}>SHN</span>
          <span style={{ color: demoColors.pink }}>//</span>
          <span style={{ color: demoColors.green }}>DEMO</span>
        </span>

        <ul
          className="hidden md:flex items-center gap-8 font-mono text-xs"
          style={{ color: demoColors.muted }}
        >
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="hover:text-white transition-colors">
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#how-it-works"
          className="rounded-full px-4 py-2 text-xs font-mono font-semibold border transition-shadow"
          style={{
            color: demoColors.green,
            borderColor: demoColors.green,
            boxShadow: `0 0 16px ${demoColors.greenSoft}`,
          }}
        >
          Enter demo
        </a>
      </nav>
    </header>
  );
}


