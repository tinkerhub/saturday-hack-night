import { Github, ArrowUpRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative mt-0 bg-[#f5f4ee] border-t-2 border-black">
      {/* Top accent — solid four-color stripe matching navbar */}
      <div className="h-[3px] w-full flex">
        <span className="flex-1 bg-pink" />
        <span className="flex-1 bg-blue" />
        <span className="flex-1 bg-green-flat" />
        <span className="flex-1 bg-yellow" />
      </div>

      <div className="px-5 sm:px-8 py-16 relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-16">

            {/* Brand */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-2.5 mb-4">
                <span className="w-3 h-3 bg-pink border border-black shrink-0" />
                <span className="font-display text-xl sm:text-2xl font-bold text-black tracking-tight">
                  SATURDAY HACK NIGHT
                </span>
              </div>
              <p className="text-black/75 text-sm sm:text-base font-normal leading-relaxed max-w-sm mb-4">
                A weekly hackathon initiative by TinkerHub to help you build cool stuff, experience new technologies, and compete with an amazing community of developers.
              </p>
              <a
                href="https://tinkerhub.org"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-mono text-xs font-bold uppercase tracking-wider bg-[#d4f5e0] text-black px-3 py-1.5 border border-black rounded shadow-sm hover:opacity-90 transition-opacity"
              >
                TinkerHub Foundation
                <ArrowUpRight size={13} strokeWidth={2} />
              </a>
            </div>

            {/* Navigate links */}
            <div>
              <p className="font-mono text-xs font-bold text-black uppercase tracking-wider mb-4 inline-block bg-[#fff6bf] px-2 py-0.5 border border-black rounded shadow-sm">
                Navigate
              </p>
              <div className="flex flex-col gap-2.5">
                {[
                  { label: "How It Works", href: "/#get-selected" },
                  { label: "Upcoming Nights", href: "/#timeline" },
                  { label: "Past Nights", href: "/archive/" },
                  { label: "Moments", href: "/moments/" },
                  { label: "Campus Program", href: "/campus/" },
                  { label: "Sticker Pack", href: "/stickers/" },
                ].map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="text-sm font-medium text-black/70 hover:text-black hover:translate-x-1 transition-all duration-150 inline-block"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Community links */}
            <div>
              <p className="font-mono text-xs font-bold text-black uppercase tracking-wider mb-4 inline-block bg-[#d0ecf8] px-2 py-0.5 border border-black rounded shadow-sm">
                Community
              </p>
              <div className="flex flex-col gap-2.5">
                {[
                  { label: "Discord Community", href: "https://discord.gg/tinkerhub" },
                  { label: "TinkerSpace Kochi", href: "/#tinkerspace" },
                  { label: "Campus Host Guide", href: "/campus/" },
                  { label: "GitHub Repository", href: "https://github.com/appukurian/saturday-hack-night" },
                ].map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="text-sm font-medium text-black/70 hover:text-black hover:translate-x-1 transition-all duration-150 flex items-center gap-1.5"
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  >
                    {link.label}
                    {link.href.startsWith("http") && (
                      <ArrowUpRight size={13} className="text-black/50 stroke-[2]" />
                    )}
                  </a>
                ))}
              </div>
            </div>

          </div>

          {/* Bottom bar */}
          <div className="border-t border-black/15 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="font-mono text-xs font-medium text-black/60">
              © 2026 TinkerHub Foundation. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://github.com/appukurian/saturday-hack-night"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 font-mono text-xs font-bold text-black bg-[#fff6bf] px-2.5 py-1 border border-black/30 rounded shadow-sm hover:border-black transition-colors"
              >
                <Github size={13} />
                Open Source
              </a>
              <span className="font-mono text-xs font-medium text-black/60">
                Built with Next.js + ♥
              </span>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}




