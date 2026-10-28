"use client";

import { useState } from "react";
import { motion } from "@/lib/motion";
import {
  ArrowLeft,
  Twitter,
  Instagram,
  Linkedin,
  BookOpen,
  CheckCircle2,
  ExternalLink,
  Send,
} from "lucide-react";
import { socialShares, DISCORD_URL } from "@/lib/data";
import type { SocialShare } from "@/lib/data";
import SectionHeading from "@/components/ui/SectionHeading";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import GridBackdrop from "@/components/ui/GridBackdrop";

const platformConfig = {
  twitter: { label: "Twitter / X", icon: Twitter, color: "#1d9bf0" },
  instagram: { label: "Instagram", icon: Instagram, color: "#e1306c" },
  linkedin: { label: "LinkedIn", icon: Linkedin, color: "#0a66c2" },
  blog: { label: "Blog / Article", icon: BookOpen, color: "#000000" },
};

const liteSharePalettes = [
  "bg-[#fae4f2]",
  "bg-[#e0f4fb]",
  "bg-[#e6f7e2]",
  "bg-[#fff6bf]",
];

function StickerSVG({ index }: { index: number }) {
  const designs = [
    // SHN logo sticker
    <svg key="logo" viewBox="0 0 120 120" className="w-full h-full">
      <circle cx="60" cy="60" r="56" fill="#f5f4ee" stroke="#000000" strokeWidth="2.5" />
      <text x="60" y="52" textAnchor="middle" fill="#000000" fontSize="24" fontFamily="monospace" fontWeight="bold">SHN</text>
      <text x="60" y="70" textAnchor="middle" fill="#000000" fontSize="8" fontFamily="monospace" fontWeight="medium">Saturday Hack Night</text>
      <text x="60" y="82" textAnchor="middle" fill="#f5d6ed" fontSize="8" fontFamily="monospace" fontWeight="bold">by TinkerHub</text>
    </svg>,
    // "I Shipped" sticker
    <svg key="shipped" viewBox="0 0 120 120" className="w-full h-full">
      <rect x="4" y="4" width="112" height="112" rx="16" fill="#d4f5e0" stroke="#000000" strokeWidth="2.5" />
      <text x="60" y="44" textAnchor="middle" fill="#000000" fontSize="28" fontFamily="monospace">🚀</text>
      <text x="60" y="70" textAnchor="middle" fill="#000000" fontSize="16" fontFamily="monospace" fontWeight="bold">I SHIPPED</text>
      <text x="60" y="86" textAnchor="middle" fill="#000000" fontSize="8" fontFamily="monospace" fontWeight="medium">Saturday Hack Night</text>
    </svg>,
    // Neon "Builder" sticker
    <svg key="builder" viewBox="0 0 120 120" className="w-full h-full">
      <circle cx="60" cy="60" r="56" fill="#f5d6ed" stroke="#000000" strokeWidth="2.5" />
      <text x="60" y="55" textAnchor="middle" fill="#ffffff" fontSize="14" fontFamily="monospace" fontWeight="bold">MAKER</text>
      <text x="60" y="72" textAnchor="middle" fill="#000000" fontSize="12" fontFamily="monospace" fontWeight="bold">BUILDER</text>
      <text x="60" y="89" textAnchor="middle" fill="#000000" fontSize="7" fontFamily="monospace" fontWeight="medium">TINKERHUB SHN</text>
    </svg>,
    // Hexagon "6HRS" sticker
    <svg key="6hrs" viewBox="0 0 120 120" className="w-full h-full">
      <polygon points="60,8 106,34 106,86 60,112 14,86 14,34" fill="#ffd34e" stroke="#000000" strokeWidth="2.5" />
      <text x="60" y="52" textAnchor="middle" fill="#000000" fontSize="20" fontFamily="monospace" fontWeight="bold">6 HRS</text>
      <text x="60" y="68" textAnchor="middle" fill="#000000" fontSize="9" fontFamily="monospace" fontWeight="medium">TO BUILD IT</text>
      <text x="60" y="84" textAnchor="middle" fill="#000000" fontSize="7" fontFamily="monospace" fontWeight="bold">SHN SEASON 02</text>
    </svg>,
  ];
  return designs[index % designs.length];
}

function PlatformIcon({ platform }: { platform: SocialShare["platform"] }) {
  const config = platformConfig[platform];
  const Icon = config.icon;
  return (
    <span
      className="inline-flex items-center gap-1 font-mono text-xs font-semibold px-2.5 py-0.5 rounded border border-black/20 bg-[#fff6bf]"
      style={{ color: config.color }}
    >
      <Icon size={11} strokeWidth={2} />
      {config.label}
    </span>
  );
}

function ShareCard({ share, index }: { share: SocialShare; index: number }) {
  const cardBg = liteSharePalettes[index % liteSharePalettes.length];

  return (
    <motion.div
      className={`rounded-xl border-2 border-black ${cardBg} p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all`}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.05 }}
      viewport={{ once: true }}
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div>
          <div className="font-display font-bold text-black text-base leading-snug">{share.name}</div>
          <div className="font-mono text-xs text-black/60">{share.handle}</div>
        </div>
        <PlatformIcon platform={share.platform} />
      </div>
      <p className="text-sm font-normal text-black/80 leading-relaxed mb-4">
        &ldquo;{share.content}&rdquo;
      </p>
      <div className="flex items-center justify-between pt-3 border-t border-black/10">
        <span className="font-mono text-xs font-semibold text-black/60 uppercase">{share.night}</span>
        <a
          href={share.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 font-mono text-xs font-semibold text-black hover:underline"
        >
          <ExternalLink size={12} strokeWidth={2} />
          View post
        </a>
      </div>
    </motion.div>
  );
}

function ClaimForm() {
  const [url, setUrl] = useState("");
  const [platform, setPlatform] = useState<SocialShare["platform"]>("twitter");
  const [name, setName] = useState("");
  const [night, setNight] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url || !name) return;
    const msg = encodeURIComponent(
      `Hi! I want to claim my SHN sticker pack.\nName: ${name}\nNight: ${night}\nPlatform: ${platform}\nLink: ${url}`
    );
    window.open(`${DISCORD_URL}`, "_blank");
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <motion.div
        className="text-center py-8"
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <CheckCircle2 size={44} className="text-[#d4f5e0] stroke-[2] mx-auto mb-3" />
        <h3 className="font-display font-bold text-xl text-black mb-1.5">You&apos;re on the list!</h3>
        <p className="text-black/75 font-normal text-sm max-w-sm mx-auto">
          Join our Discord and drop your submission link in the{" "}
          <span className="text-black font-mono font-semibold bg-[#d4f5e0]/30 px-1 border border-black/30 rounded">#shn-stickers</span>{" "}
          channel. We&apos;ll verify and send your sticker pack within 48 hours.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="claim-name"
          className="block font-mono text-xs font-semibold uppercase text-black/80 mb-1.5"
        >
          Your name
        </label>
        <input
          id="claim-name"
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Abhijith P"
          className="w-full bg-[#fff6bf] border border-black/40 rounded-lg px-4 py-2.5 text-sm text-black placeholder-black/40 font-normal focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
        />
      </div>
      <div>
        <label
          htmlFor="claim-url"
          className="block font-mono text-xs font-semibold uppercase text-black/80 mb-1.5"
        >
          Link to your post / blog / reel
        </label>
        <input
          id="claim-url"
          type="url"
          required
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://twitter.com/you/status/..."
          className="w-full bg-[#fff6bf] border border-black/40 rounded-lg px-4 py-2.5 text-sm text-black placeholder-black/40 font-normal focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="claim-platform"
            className="block font-mono text-xs font-semibold uppercase text-black/80 mb-1.5"
          >
            Platform
          </label>
          <select
            id="claim-platform"
            value={platform}
            onChange={(e) =>
              setPlatform(e.target.value as SocialShare["platform"])
            }
            className="w-full bg-[#fff6bf] border border-black/40 rounded-lg px-4 py-2.5 text-sm text-black font-normal focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
          >
            <option value="twitter">Twitter / X</option>
            <option value="instagram">Instagram</option>
            <option value="linkedin">LinkedIn</option>
            <option value="blog">Blog</option>
          </select>
        </div>
        <div>
          <label
            htmlFor="claim-night"
            className="block font-mono text-xs font-semibold uppercase text-black/80 mb-1.5"
          >
            Which hack night?
          </label>
          <input
            id="claim-night"
            type="text"
            value={night}
            onChange={(e) => setNight(e.target.value)}
            placeholder="SHN #01"
            className="w-full bg-[#fff6bf] border border-black/40 rounded-lg px-4 py-2.5 text-sm text-black placeholder-black/40 font-normal focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
          />
        </div>
      </div>
      <button
        type="submit"
        className="w-full flex items-center justify-center gap-2 bg-[#ffd34e] text-black font-bold text-base py-3.5 rounded-lg border-2 border-black shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-150"
      >
        <Send size={16} strokeWidth={2} />
        Submit &amp; Claim My Sticker Pack
      </button>
      <p className="text-center font-mono text-xs font-normal text-black/60">
        We manually verify each submission. Sticker packs shipped within 5–7 days.
      </p>
    </form>
  );
}

export default function StickersPage() {
  const previewPalettes = ["bg-[#fae4f2]", "bg-[#e6f7e2]", "bg-[#e0f4fb]", "bg-[#fff6bf]"];

  return (
    <main className="min-h-screen bg-[#F5F4EE] text-[#111111] relative selection:bg-[#f5d6ed] selection:text-black">
      <GridBackdrop />
      <Navbar />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 pt-28 sm:pt-36 pb-20">
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

        {/* Hero */}
        <motion.div
          className="max-w-3xl mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="font-mono text-xs font-bold uppercase tracking-wider mb-3 bg-[#d4f5e0] text-black inline-block px-3 py-1 border border-black rounded shadow-sm">
            Share · Claim · Ship
          </p>
          <SectionHeading accent="green" as="h1" className="mb-4">
            Claim Your Sticker Pack
          </SectionHeading>
          <p className="text-black/75 font-normal text-lg leading-relaxed">
            Did you build something at Saturday Hack Night? Tell the world about
            it — write a blog post, share a reel, post a thread. Then submit
            your link here and we&apos;ll mail you an exclusive SHN sticker pack.
          </p>
        </motion.div>

        {/* How it works — 3 steps */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {[
            {
              step: "01",
              title: "Build & Share",
              desc: "Participate in any SHN. Then share your experience — a tweet, a reel, a blog post, a LinkedIn article. Tell people what you built and what you learned.",
              cardBg: "bg-[#fae4f2]",
              badgeBg: "bg-[#f5d6ed]",
            },
            {
              step: "02",
              title: "Submit Your Link",
              desc: "Fill in the form below with your content link. We verify that it's about your SHN experience and that you actually participated.",
              cardBg: "bg-[#e6f7e2]",
              badgeBg: "bg-[#d4f5e0]",
            },
            {
              step: "03",
              title: "Get Your Stickers",
              desc: "Once verified, we ship your exclusive SHN sticker pack to your doorstep. Free. Because builders who share deserve something tangible.",
              cardBg: "bg-[#fff6bf]",
              badgeBg: "bg-[#ffd34e]",
            },
          ].map((s, i) => (
            <motion.div
              key={s.step}
              className={`rounded-xl border-2 border-black ${s.cardBg} p-6 shadow-sm hover:shadow-md transition-all relative overflow-hidden`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 + i * 0.08 }}
            >
              <span className={`font-mono text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded border border-black/30 inline-block mb-3 ${s.badgeBg} text-black`}>
                Step {s.step}
              </span>
              <h3 className="font-display font-bold text-xl text-black mb-2">{s.title}</h3>
              <p className="text-sm font-normal text-black/75 leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Sticker preview */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <p className="font-mono text-xs font-bold uppercase tracking-wider text-[#f5d6ed] mb-1">
                The Goods
              </p>
              <SectionHeading accent="pink">Your Sticker Pack</SectionHeading>
            </div>
            <p className="font-mono text-xs font-semibold uppercase bg-[#fff6bf] border border-black/30 px-3 py-1 rounded shadow-sm text-black/70">
              Pack of 4 · High-Quality Vinyl
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {[0, 1, 2, 3].map((i) => (
              <motion.div
                key={i}
                className={`rounded-xl border-2 border-black ${previewPalettes[i]} p-6 aspect-square flex items-center justify-center shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all`}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.35, delay: i * 0.06 }}
                viewport={{ once: true }}
              >
                <div className="w-full h-full">
                  <StickerSVG index={i} />
                </div>
              </motion.div>
            ))}
          </div>

          <p className="font-mono text-xs font-normal text-black/50 text-center mt-5">
            Designs may vary · Physical stickers · High-quality vinyl
          </p>
        </motion.div>

        {/* Claim form */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-20 items-start"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div>
            <p className="font-mono text-xs font-bold uppercase tracking-wider text-[#d4f5e0] mb-1">
              Claim Yours
            </p>
            <SectionHeading accent="yellow" className="mb-4">
              Submit Your Content
            </SectionHeading>
            <p className="text-black/75 font-normal text-base leading-relaxed mb-6">
              Shared your hack night story anywhere online? Drop the link below.
              We&apos;ll review it and ship your sticker pack within 5–7 days.
            </p>
            <div className="space-y-3">
              {[
                "A tweet / X thread about what you built",
                "An Instagram post or reel of your hack night",
                "A LinkedIn post about what you learned",
                "A blog post or dev.to article",
                "A YouTube short or reel of your project",
              ].map((item) => (
                <div key={item} className="flex items-start gap-2.5">
                  <CheckCircle2
                    size={15}
                    className="text-[#d4f5e0] shrink-0 mt-0.5 stroke-[2.5]"
                  />
                  <span className="text-sm font-medium text-black/80">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#fff6bf] rounded-xl border-2 border-black p-6 sm:p-7 shadow-sm">
            <ClaimForm />
          </div>
        </motion.div>

        {/* Social wall */}
        <div>
          <motion.div
            className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div>
              <p className="font-mono text-xs font-bold uppercase tracking-wider text-[#d4f5e0] mb-1">
                From the Community
              </p>
              <SectionHeading accent="green">Builders Who Shared</SectionHeading>
            </div>
            <p className="font-mono text-xs font-bold uppercase bg-[#d4f5e0] text-black border border-black px-3 py-1 rounded shadow-sm">
              Sticker pack claimed ✓
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {socialShares.map((share, i) => (
              <ShareCard key={`${share.name}-${i}`} share={share} index={i} />
            ))}
          </div>

          <motion.p
            className="text-center font-mono text-sm font-medium text-black/60 mt-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Your post could be here.{" "}
            <a
              href="#claim-name"
              className="text-black font-semibold underline underline-offset-4 hover:text-[#f5d6ed]"
            >
              Submit yours above →
            </a>
          </motion.p>
        </div>
      </div>

      <Footer />
    </main>
  );
}




