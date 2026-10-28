export interface Mentor {
  name: string;
  role: string;
  github?: string;
  twitter?: string;
}

export interface Resource {
  title: string;
  url: string;
  type: "docs" | "video" | "repo" | "article";
}

export interface Project {
  name: string;
  creator: string;
  team?: string[];
  tags: string[];
  github: string;
  description?: string;
  liveUrl?: string;
}

export interface HackNight {
  id: number;
  slug: string;
  theme: string;
  date: string;
  isoDate: string; // start time, for countdown targeting
  endIsoDate?: string; // end time; defaults to start + 5 hours
  mode?: string; // e.g. "Online"
  locked?: boolean; // locked nights are shown but cannot be opened
  stack: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  about: string;
  challenge: string; // what attendees actually build
  mentors: Mentor[];
  starterResources: Resource[];
}

export interface PastHackNight {
  id: number;
  slug: string;
  theme: string;
  date: string;
  stack: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  participants: number;
  submittedCount: number;
  about: string;
  mentors: Mentor[];
  resources: Resource[];
  bestProject: Project;
  allProjects: Project[];
}

export interface Testimonial {
  name: string;
  quote: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

// ─── Upcoming Hack Nights ───────────────────────────────────────────────────

export const upcomingNights: HackNight[] = [
  {
    id: 1,
    slug: "shn-s2-001-beyond-gesture",
    theme: "Beyond Gesture",
    date: "October 31, 2026",
    isoDate: "2026-10-31T12:30:00Z", // 6:00 PM IST = 12:30 UTC
    endIsoDate: "2026-10-31T17:30:00Z", // 11:00 PM IST = 17:30 UTC
    mode: "Online",
    stack: "MediaPipe",
    difficulty: "Beginner",
    about:
      "Your hands are the interface. MediaPipe tracks hands, faces and body pose straight from a webcam, with no model training needed. This hack night is about going beyond the mouse and keyboard and building something you control with gestures.",
    challenge:
      "Build a working gesture-controlled project with MediaPipe, such as a touchless game, a hand-controlled slideshow or a gesture-driven drawing app. Push to GitHub by midnight.",
    mentors: [
      {
        name: "Joseph Shibu",
        role: "Mentor",
      },
    ],
    starterResources: [],
  },
  {
    id: 2,
    slug: "shn-s2-002-creative-coding",
    locked: true,
    theme: "Creative Coding",
    date: "March 28, 2026",
    isoDate: "2026-03-28T12:30:00Z",
    stack: "Canvas, Three.js, p5.js",
    difficulty: "Beginner",
    about:
      "Code as a medium for art. Creative coding is about making things that are beautiful, strange, or surprising — generative patterns, interactive visuals, data art, audio visualizers. No design experience needed. Just curiosity.",
    challenge:
      "Build something visual and interactive using canvas, WebGL, or any creative coding library. It should respond to user input or generate something new each time it runs.",
    mentors: [
      {
        name: "Amal Krishnan",
        role: "Creative coder, generative artist",
        github: "amalk",
        twitter: "amalk",
      },
    ],
    starterResources: [
      {
        title: "p5.js — Creative coding for beginners",
        url: "https://p5js.org/get-started/",
        type: "docs",
      },
      {
        title: "Three.js Journey — Free intro",
        url: "https://threejs-journey.com",
        type: "video",
      },
      {
        title: "The Coding Train — Creative Coding YouTube",
        url: "https://www.youtube.com/@TheCodingTrain",
        type: "video",
      },
      {
        title: "Canvas API — MDN",
        url: "https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API",
        type: "docs",
      },
    ],
  },
  {
    id: 3,
    slug: "shn-s2-003-hardware-sync",
    locked: true,
    theme: "Hardware Sync",
    date: "April 11, 2026",
    isoDate: "2026-04-11T12:30:00Z",
    stack: "MQTT, ESP32, Arduino",
    difficulty: "Advanced",
    about:
      "Make the physical world talk to the digital one. This hack night is about building hardware-software systems — sensors that post data to the web, apps that control physical devices, or IoT dashboards that visualize real-world readings.",
    challenge:
      "Build a system where a physical device (ESP32, Arduino, Raspberry Pi) communicates with a web interface. Something in the real world should change something on screen, or vice versa.",
    mentors: [
      {
        name: "Bibin Wilson",
        role: "Embedded systems engineer",
        github: "bibinwilson",
        twitter: "bibinwilson",
      },
      {
        name: "Asha Mol",
        role: "IoT developer, hardware hacker",
        github: "ashamol",
      },
    ],
    starterResources: [
      {
        title: "ESP32 Getting Started — Random Nerd Tutorials",
        url: "https://randomnerdtutorials.com/getting-started-with-esp32/",
        type: "article",
      },
      {
        title: "MQTT Essentials",
        url: "https://www.hivemq.com/mqtt-essentials/",
        type: "article",
      },
      {
        title: "PlatformIO — IDE for embedded development",
        url: "https://platformio.org",
        type: "docs",
      },
      {
        title: "Node-RED — Low-code IoT wiring",
        url: "https://nodered.org",
        type: "docs",
      },
    ],
  },
  {
    id: 4,
    slug: "shn-s2-004-ai-at-the-edge",
    locked: true,
    theme: "AI at the Edge",
    date: "April 25, 2026",
    isoDate: "2026-04-25T12:30:00Z",
    stack: "TensorFlow Lite, ONNX, Raspberry Pi",
    difficulty: "Advanced",
    about:
      "Run ML models directly on devices — no cloud, no latency, no privacy concerns. Edge AI is exploding: face detection on a Pi, wake word detection on a microcontroller, image classification on a phone. This hack night explores that frontier.",
    challenge:
      "Deploy a machine learning model on an edge device (Raspberry Pi, phone, or browser via WebAssembly) that runs inference locally without calling an external API.",
    mentors: [
      {
        name: "Jithin George",
        role: "ML engineer, edge inference",
        github: "jithingeorge",
      },
    ],
    starterResources: [
      {
        title: "TensorFlow Lite for Microcontrollers",
        url: "https://www.tensorflow.org/lite/microcontrollers",
        type: "docs",
      },
      {
        title: "ONNX Runtime — Run models anywhere",
        url: "https://onnxruntime.ai",
        type: "docs",
      },
      {
        title: "MediaPipe — On-device ML by Google",
        url: "https://developers.google.com/mediapipe",
        type: "docs",
      },
      {
        title: "Transformers.js — Run HuggingFace in browser",
        url: "https://huggingface.co/docs/transformers.js",
        type: "docs",
      },
    ],
  },
  {
    id: 5,
    slug: "shn-s2-005-open-source-sprint",
    locked: true,
    theme: "The Open Source Sprint",
    date: "May 9, 2026",
    isoDate: "2026-05-09T12:30:00Z",
    stack: "Any",
    difficulty: "Beginner",
    about:
      "Open source is how most of the internet runs. This hack night is about giving back — find a project you use, find an issue, and fix it. Or start something new and make it open from day one. Stack is completely open.",
    challenge:
      "Merge a pull request into an existing open source project OR publish a new open source project with a proper README, license, and working code. Beginner-friendly issues count.",
    mentors: [
      {
        name: "Kailash Nadh",
        role: "CTO at Zerodha, open source advocate",
        github: "knadh",
        twitter: "kailashnadh",
      },
      {
        name: "Rijul Singh",
        role: "Open source contributor",
        github: "rijulsingh",
      },
    ],
    starterResources: [
      {
        title: "First Contributions — Step by step guide",
        url: "https://firstcontributions.github.io",
        type: "article",
      },
      {
        title: "Good First Issues — GitHub",
        url: "https://goodfirstissue.dev",
        type: "docs",
      },
      {
        title: "How to write a good README",
        url: "https://www.makeareadme.com",
        type: "article",
      },
      {
        title: "Choose an Open Source License",
        url: "https://choosealicense.com",
        type: "article",
      },
    ],
  },
];

export function getNightEnd(n: HackNight): Date {
  return n.endIsoDate
    ? new Date(n.endIsoDate)
    : new Date(new Date(n.isoDate).getTime() + 5 * 60 * 60 * 1000);
}

// The current or next night (stays the same while the night is live, until it ends)
export function getNextNight(): HackNight {
  const now = Date.now();
  const open = upcomingNights.filter((n) => !n.locked);
  const next = open.find((n) => getNightEnd(n).getTime() > now);
  return next ?? open[open.length - 1];
}

export function getNextNightDate(): Date {
  return new Date(getNextNight().isoDate);
}

// ─── Past Hack Nights ───────────────────────────────────────────────────────

export const pastHackNights: PastHackNight[] = [
  {
    id: 1,
    slug: "shn-001-local-first-apps",
    theme: "Local-First Apps",
    date: "February 1, 2025",
    stack: "CRDTs, SQLite, PGlite",
    difficulty: "Advanced",
    participants: 42,
    submittedCount: 18,
    about:
      "Local-first software works offline, syncs when connected, and keeps your data on your device. This hack night explored CRDTs, embedded databases like PGlite and SQLite-Wasm, and patterns for building apps that don't depend on a server to function.",
    mentors: [
      {
        name: "Aravind Balla",
        role: "Full-stack dev, local-first advocate",
        github: "aravindballa",
        twitter: "aravindballa",
      },
      {
        name: "Sathya Gunasekaran",
        role: "Engineer, distributed systems",
        github: "gsathya",
      },
    ],
    resources: [
      {
        title: "Local-First Software — Ink & Switch",
        url: "https://www.inkandswitch.com/local-first/",
        type: "article",
      },
      {
        title: "PGlite — Postgres in WebAssembly",
        url: "https://pglite.dev",
        type: "docs",
      },
      {
        title: "Yjs — CRDT Framework",
        url: "https://docs.yjs.dev",
        type: "docs",
      },
      {
        title: "SQLite WASM Official Docs",
        url: "https://sqlite.org/wasm/doc/trunk/index.md",
        type: "docs",
      },
    ],
    bestProject: {
      name: "OfflineNotes",
      creator: "Akhil R",
      team: ["Akhil R", "Meera K"],
      tags: ["PGlite", "React", "CRDTs"],
      github: "https://github.com/akhilr/offlinenotes",
      description:
        "A fully offline-first notes app with real-time sync when connectivity is restored. Uses CRDTs for conflict-free merging.",
      liveUrl: "#",
    },
    allProjects: [
      {
        name: "OfflineNotes",
        creator: "Akhil R",
        team: ["Akhil R", "Meera K"],
        tags: ["PGlite", "React", "CRDTs"],
        github: "https://github.com/akhilr/offlinenotes",
        description: "Offline-first notes app with CRDT-based sync.",
      },
      {
        name: "LocalCart",
        creator: "Divya S",
        tags: ["SQLite", "Vue.js", "PWA"],
        github: "https://github.com/divyas/localcart",
        description:
          "Shopping cart that works without internet, syncs when online.",
      },
      {
        name: "PeerDocs",
        creator: "Rohan M",
        team: ["Rohan M", "Arjun T"],
        tags: ["Y.js", "Next.js", "WebRTC"],
        github: "https://github.com/rohanm/peerdocs",
        description:
          "Peer-to-peer collaborative document editor, no server needed.",
      },
      {
        name: "OfflineBoard",
        creator: "Priya V",
        tags: ["IndexedDB", "Canvas", "TypeScript"],
        github: "https://github.com/priyav/offlineboard",
        description:
          "Kanban board that persists locally and syncs across tabs.",
      },
      {
        name: "SyncWeather",
        creator: "Arun J",
        tags: ["Service Worker", "Cache API", "React"],
        github: "https://github.com/arunj/syncweather",
        description: "Weather app that caches forecasts for offline access.",
      },
      {
        name: "LocalLedger",
        creator: "Fatima N",
        team: ["Fatima N", "Sanjay P"],
        tags: ["SQLite", "Electron", "Chart.js"],
        github: "https://github.com/fatiman/localledger",
        description: "Personal finance tracker built entirely local-first.",
      },
    ],
  },
  {
    id: 2,
    slug: "shn-002-build-your-cli",
    theme: "Build Your CLI",
    date: "February 15, 2025",
    stack: "Node.js, Python, Go",
    difficulty: "Beginner",
    participants: 56,
    submittedCount: 24,
    about:
      "Command-line tools are the backbone of every developer's workflow. This hack night challenged builders to create a CLI tool that solves a real problem — anything from productivity apps to dev tools to fun utilities. Stack was completely open: Node.js, Python, Go, Rust — your call.",
    mentors: [
      {
        name: "Kailash Nadh",
        role: "CTO at Zerodha, open source builder",
        github: "knadh",
        twitter: "kailashnadh",
      },
      {
        name: "Ananya Krishnan",
        role: "DevTools engineer",
        github: "ananyak",
      },
    ],
    resources: [
      {
        title: "Building CLI tools with Node.js — Commander.js",
        url: "https://github.com/tj/commander.js",
        type: "repo",
      },
      {
        title: "Python Click — CLI creation kit",
        url: "https://click.palletsprojects.com",
        type: "docs",
      },
      {
        title: "Build a CLI with Go — Cobra",
        url: "https://cobra.dev",
        type: "docs",
      },
      {
        title: "12 Factor CLI Apps",
        url: "https://medium.com/@jdxcode/12-factor-cli-apps-dd3c227a0e46",
        type: "article",
      },
    ],
    bestProject: {
      name: "gitmind",
      creator: "Sara T",
      team: ["Sara T"],
      tags: ["Go", "Git", "CLI"],
      github: "https://github.com/sarat/gitmind",
      description:
        "A CLI tool that reads your git history and generates a visual summary of what you've been building — weekly digests, streak tracking, and contribution heatmaps in the terminal.",
      liveUrl: "#",
    },
    allProjects: [
      {
        name: "gitmind",
        creator: "Sara T",
        tags: ["Go", "Git", "CLI"],
        github: "https://github.com/sarat/gitmind",
        description: "Git history visualizer and weekly digest generator.",
      },
      {
        name: "quicknote",
        creator: "Abhijith P",
        tags: ["Node.js", "Markdown", "CLI"],
        github: "https://github.com/abhijithp/quicknote",
        description: "Zero-friction markdown notes from the terminal.",
      },
      {
        name: "envguard",
        creator: "Nadia K",
        team: ["Nadia K", "Vikram S"],
        tags: ["Python", "Security", "CLI"],
        github: "https://github.com/nadiak/envguard",
        description:
          "Scans .env files for secrets accidentally committed to git.",
      },
      {
        name: "taskr",
        creator: "Kiran B",
        tags: ["Rust", "CLI", "Productivity"],
        github: "https://github.com/kiranb/taskr",
        description: "Minimal task manager that lives in your terminal.",
      },
      {
        name: "logwatch",
        creator: "Anjali R",
        tags: ["Python", "Log Parsing", "CLI"],
        github: "https://github.com/anjali/logwatch",
        description:
          "Real-time log parser with color-coded error highlighting.",
      },
      {
        name: "portman",
        creator: "Dev C",
        tags: ["Node.js", "Networking", "CLI"],
        github: "https://github.com/devc/portman",
        description:
          "CLI port manager — find, kill, and monitor running processes.",
      },
      {
        name: "dotfiles-sync",
        creator: "Aryan G",
        team: ["Aryan G", "Preethi L"],
        tags: ["Bash", "Git", "CLI"],
        github: "https://github.com/aryag/dotfiles-sync",
        description:
          "One-command dotfiles backup and restore across machines.",
      },
    ],
  },
  {
    id: 3,
    slug: "shn-003-browser-extensions",
    theme: "Browser Extensions",
    date: "March 1, 2025",
    stack: "Web Extensions API, JavaScript",
    difficulty: "Beginner",
    participants: 61,
    submittedCount: 27,
    about:
      "Browser extensions let you modify and enhance the web for yourself. This hack night was about building real browser extensions using the Web Extensions API — tools that solve your own problems, run in Chrome or Firefox, and can be shipped to others in hours.",
    mentors: [
      {
        name: "Jithin Zach",
        role: "Frontend engineer, extension developer",
        github: "jithinjithu",
        twitter: "jithinjithu",
      },
      {
        name: "Meera Pillai",
        role: "Web platform developer",
        github: "meerap",
      },
    ],
    resources: [
      {
        title: "MDN Web Extensions Documentation",
        url: "https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions",
        type: "docs",
      },
      {
        title: "Chrome Extension Developer Guide",
        url: "https://developer.chrome.com/docs/extensions/",
        type: "docs",
      },
      {
        title: "Plasmo — Browser extension framework",
        url: "https://www.plasmo.com",
        type: "docs",
      },
      {
        title: "How I built my first Chrome Extension in an afternoon",
        url: "https://dev.to",
        type: "article",
      },
    ],
    bestProject: {
      name: "FocusLens",
      creator: "Manu S",
      team: ["Manu S", "Lekha R"],
      tags: ["Chrome Extension", "JavaScript", "AI"],
      github: "https://github.com/manus/focuslens",
      description:
        "A browser extension that blurs distracting content on social media feeds and replaces it with your own goals. Uses local AI to detect distraction patterns.",
      liveUrl: "#",
    },
    allProjects: [
      {
        name: "FocusLens",
        creator: "Manu S",
        team: ["Manu S", "Lekha R"],
        tags: ["Chrome Extension", "JavaScript", "AI"],
        github: "https://github.com/manus/focuslens",
        description:
          "Blocks distracting content using local AI pattern detection.",
      },
      {
        name: "TabMapper",
        creator: "Rohit V",
        tags: ["Firefox Extension", "D3.js", "JavaScript"],
        github: "https://github.com/rohitv/tabmapper",
        description: "Visualizes your open tabs as a mind map.",
      },
      {
        name: "PageSumm",
        creator: "Keerthi J",
        tags: ["Chrome Extension", "LLM", "JavaScript"],
        github: "https://github.com/keerthij/pagesumm",
        description: "One-click page summarizer powered by a local LLM.",
      },
      {
        name: "PriceAlert",
        creator: "Sruthi M",
        team: ["Sruthi M", "Aditya K"],
        tags: ["Chrome Extension", "Scraping", "Notifications"],
        github: "https://github.com/sruthim/pricealert",
        description: "Tracks Amazon prices and alerts you when they drop.",
      },
      {
        name: "ReadingMode+",
        creator: "Ashwin T",
        tags: ["Browser Extension", "CSS", "Typography"],
        github: "https://github.com/ashwint/readingmode",
        description:
          "Enhanced reader mode with font, spacing, and color controls.",
      },
    ],
  },
];

// ─── Other content ───────────────────────────────────────────────────────────

export const testimonials = [
  {
    name: "Abhijith",
    quote:
      "I built my first deployed app in 6 hours. The vibe is unmatched.",
  },
  {
    name: "Sara",
    quote: "TinkerSpace Kochi felt like a second home during the finale.",
  },
  {
    name: "Rohan",
    quote: "SHN pushed me to stop procrastinating and actually ship.",
  },
];

export const projects = [
  {
    name: "LED-Synced Rubik's Cube",
    creator: "Akhil",
    tags: ["Arduino", "WebSockets", "Hardware"],
    github: "#",
  },
  {
    name: "AI Sentiment Bot",
    creator: "Meera",
    tags: ["Python", "LLM", "FastAPI"],
    github: "#",
  },
  {
    name: "Smart Water Monitor",
    creator: "Rajan",
    tags: ["ESP32", "MQTT", "React"],
    github: "#",
  },
  {
    name: "Campus Lost & Found",
    creator: "Divya",
    tags: ["Next.js", "Supabase", "AI"],
    github: "#",
  },
];

export const faq: FaqItem[] = [
  {
    question: "Is it free?",
    answer:
      "Yes, completely. There is no registration fee, no subscription, no catch. Saturday Hack Night is a TinkerHub Foundation initiative — free and open to everyone.",
  },
  {
    question: "Do I need prior experience?",
    answer:
      "No. Each hack night has a difficulty rating — Beginner nights are genuinely beginner-friendly. If you can write a for-loop, you can ship something. The point is to learn by doing, not to show off what you already know.",
  },
  {
    question: "Can I join if I missed the first few nights?",
    answer:
      "Yes — drop in to any single hack night. You don't need to attend all 5. Each event is self-contained with its own theme and challenge. Attending even one puts you in the pool for the offline finale.",
  },
  {
    question: "What counts as a valid submission?",
    answer:
      "A working prototype pushed to a public GitHub repo before midnight. It doesn't need to be polished, production-ready, or even feature-complete. A README that clearly explains what you built and a commit showing meaningful work is enough. Effort counts.",
  },
  {
    question: "Can I use any language, framework, or hardware?",
    answer:
      "Absolutely. SHN is for tech makers — hardware and software, everything is in scope. Each hack night suggests a stack to help you get started, but it's never a rule. Build with Arduino, ESP32, a Raspberry Pi, a browser, a server, a CLI — whatever fits your idea. We explore depth across all of tech, not just web frameworks.",
  },
  {
    question: "How are projects selected for the finale?",
    answer:
      "The TinkerHub team reviews all submissions after each hack night. We look for creativity, effort, and completeness — not polish. Projects that attempt something ambitious and ship something real are the ones that get noticed. Top teams from the 5 online nights get invitations to the offline finale.",
  },
  {
    question: "My whole team gets invited to the offline finale?",
    answer:
      "Yes. If your project is selected, every member of your team (up to 2 people) receives the invitation. Travel and accommodation details are shared with selected teams individually.",
  },
  {
    question: "What if I don't finish by midnight?",
    answer:
      "Midnight is a hard cut-off for submissions — we can't make exceptions or the leaderboard would be meaningless. But even an incomplete project is worth pushing. A half-built thing that shows direction and effort is better than nothing.",
  },
  {
    question: "Where do I get help during the hack night?",
    answer:
      "The SHN Discord is live during every hack night with mentors and other builders. If you're stuck, ask — someone will help. The community is genuinely collaborative, not competitive.",
  },
  {
    question: "What is TinkerSpace Kochi?",
    answer:
      "TinkerSpace is TinkerHub's physical maker space in Kochi, Kerala — a lab, community hub, and hackathon venue. The SHN finale is a 24-hour in-person hackathon held there. Selected teams get full access to the space, tools, and mentors for the day.",
  },
];

export interface SocialShare {
  name: string;
  handle: string;
  platform: "twitter" | "instagram" | "linkedin" | "blog";
  content: string;
  url: string;
  night: string; // e.g. "SHN #02 — Build Your CLI"
}

export const socialShares: SocialShare[] = [
  {
    name: "Sara T",
    handle: "@sarat_builds",
    platform: "twitter",
    content:
      "Just shipped gitmind at @TinkerHubOrg's Saturday Hack Night — a CLI that reads your git log and generates a visual weekly digest. Built in 5 hrs. Still can't believe it works. #SaturdayHackNight",
    url: "https://twitter.com",
    night: "SHN #02 — Build Your CLI",
  },
  {
    name: "Manu S",
    handle: "@manu.builds",
    platform: "instagram",
    content:
      "6 hours. One idea. A browser extension that actually works 🎉 FocusLens — built at #SaturdayHackNight. Swipe to see the build process from zero to shipped.",
    url: "https://instagram.com",
    night: "SHN #03 — Browser Extensions",
  },
  {
    name: "Abhijith P",
    handle: "Abhijith P",
    platform: "linkedin",
    content:
      "I've been 'planning to build something' for 2 years. Then I joined TinkerHub's Saturday Hack Night on a whim — and shipped my first real project in the same evening. The constraint of 6 hours removes every excuse. Highly recommend.",
    url: "https://linkedin.com",
    night: "SHN #02 — Build Your CLI",
  },
  {
    name: "Meera K",
    handle: "meera.dev",
    platform: "blog",
    content:
      "What I learned building an offline-first notes app in 6 hours — a write-up on local-first architecture, CRDTs, and why constraints make you ship faster.",
    url: "https://dev.to",
    night: "SHN #01 — Local-First Apps",
  },
  {
    name: "Rohan M",
    handle: "@rohan_tinkers",
    platform: "twitter",
    content:
      "PeerDocs is live — peer-to-peer collaborative doc editor with zero server. Built solo at SHN #01. Took the last 2 hours just to make CRDTs not break. Worth it. #SaturdayHackNight @TinkerHubOrg",
    url: "https://twitter.com",
    night: "SHN #01 — Local-First Apps",
  },
  {
    name: "Nadia K",
    handle: "@nadiakodes",
    platform: "instagram",
    content:
      "envguard — a CLI that scans your .env files for secrets accidentally in git history. Built at @TinkerHubOrg Saturday Hack Night with my partner Vikram. Proud of this one 🔐 #BuildInPublic",
    url: "https://instagram.com",
    night: "SHN #02 — Build Your CLI",
  },
];

// ─── Moments (photo placeholders) ───────────────────────────────────────────
//
// Minimal, flat data for the "Moments" photo feature. No titles, dates, or
// descriptions — just a list of photo paths. Used by both the homepage
// Moments section and the /moments page.
//
// To add real photos later:
//   1. Drop image files into `public/moments/`.
//   2. Add their paths to the `moments` array below.
// No component code needs to change — MomentsScroller renders whatever is here
// and fills any remaining slots (up to MOMENTS_PLACEHOLDER_COUNT) with empty
// placeholders.

export const MOMENTS_PLACEHOLDER_COUNT = 5;
export const MOMENTS_HOME_PLACEHOLDER_COUNT = 3;

export const moments: string[] = [
  "/tinkerspace/tinkerspace-kochi.webp",
];

export const REGISTER_URL = "https://hub.tinkerhub.org";
export const DISCORD_URL = "https://discord.gg/tinkerhub";
export const TINKERSPACE_MAPS_URL =
  "https://maps.google.com/?q=TinkerSpace+Kochi";
export const STICKERS_URL = "/stickers/";
