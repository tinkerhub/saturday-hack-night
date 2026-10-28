# Saturday Hack Night (SHN) — Living Project Reference

> **Read this before touching anything. Update this whenever the project changes.**
> Last updated: 2026-03-09

---

## Identity

| | |
|---|---|
| Initiative | Saturday Hack Night by TinkerHub Foundation |
| GitHub repo | appukurian/saturday-hack-night |
| Live URL | https://appukurian.github.io/saturday-hack-night |
| Local path | /Users/kurian/Documents/TinkerHub/projects/saturday-hack-night |
| Deploy | Push to `main` → GitHub Actions → GitHub Pages (~40s) |
| PAT token | Stored in Claude memory (`~/.claude/projects/.../memory/MEMORY.md`) |

---

## Program Rules — Never Contradict These in Any Copy

- **Free.** No registration fee ever. Open to everyone.
- **No experience needed.** Beginners are the primary audience.
- **Team:** Solo OR exactly 2 people. Max 2. Both members get the finale invite if selected.
- **Stack:** Each night suggests a stack — always a suggestion, never a rule. Any language, framework, hardware, or API is valid. SHN is for tech makers across hardware and software.
- **Explore depth:** Each night goes deep on one domain, not broad across many.
- **Submission:** Push a working prototype to a public GitHub repo before midnight on hack night Saturday. Submit the link via hub.app.
- **Submission bar:** Doesn't need to be polished. Meaningful code + README is enough. Effort counts.
- **Attendance:** Join any single night — no need to attend all 5. Each event is self-contained.
- **Selection:** TinkerHub team reviews all submissions after each night. Top teams from any night get invited to the offline finale.
- **Finale:** 24-hour in-person hackathon at TinkerSpace Kochi. Travel stipend and accommodation for outstation participants shared with selected teams individually.
- **Philosophy:** Learn by doing. Explore depth, not breadth. Build something real every time.

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16 (App Router, `output: 'export'`) |
| Styling | Tailwind CSS 4.x — all tokens in `app/globals.css @theme` — NO `tailwind.config.js` |
| Animation | Framer Motion 12.x |
| Icons | Lucide React |
| Font UI | Inter → `--font-inter` CSS variable |
| Font code/data | JetBrains Mono → `--font-jetbrains` CSS variable |
| Utilities | clsx + tailwind-merge → `lib/utils.ts cn()` |
| Build output | `./out/` (static HTML — deployed to GitHub Pages) |

### Critical Config

```
next.config.ts     → output:'export', basePath:'/saturday-hack-night', images.unoptimized:true, trailingSlash:true
postcss.config.mjs → @tailwindcss/postcss plugin (NOT tailwindcss directly)
```

### `"use client"` Required On
All section and UI components that use hooks, state, or Framer Motion animations.

---

## Design System

| Token | Value | Usage |
|---|---|---|
| Background | `#090909` | Page background |
| Surface | `#111111` / `#0d0d0d` | Alternating sections |
| Neon green | `#00ff87` | Primary accent, CTA, highlights |
| Cyan | `#00d4ff` | Secondary accent, links |
| Amber | `#ffb800` | Finale / advanced difficulty |
| Muted text | `#666666` | Secondary text |
| Glassmorphism | `.glass-card` utility | `bg-white/3 backdrop-blur-12 border border-white/8` |

**Difficulty colors:**
- Beginner → `#00ff87`
- Intermediate → `#00d4ff`
- Advanced → `#ffb800`

---

## Site Pages

| Route | File | Description |
|---|---|---|
| `/` | `app/page.tsx` | Homepage — all sections in order |
| `/archive` | `app/archive/page.tsx` | All past hack nights listing |
| `/archive/[slug]` | `app/archive/[slug]/page.tsx` + `HackNightDetailClient.tsx` | Past night detail — best project, all projects, mentors, resources |
| `/events/[slug]` | `app/events/[slug]/page.tsx` + `EventDetailClient.tsx` | Upcoming event detail — theme, challenge, mentors, starter resources |
| `/campus` | `app/campus/page.tsx` | How to host SHN at your campus |
| `/stickers` | `app/stickers/page.tsx` | Share your SHN experience → claim exclusive sticker pack; social wall |

> All dynamic routes use `generateStaticParams` from `lib/data.ts`. Add new slugs there.

---

## Homepage Section Order

```
Navbar
Hero              → real countdown to next SHN isoDate · "Free · Open to all · No experience needed"
Philosophy        → Learn by doing. Explore depth.
Blueprint         → 3-step: Register → Build → Win
GetSelected       → solo or team of 2 · any stack · how invitation works
Timeline          → 5 upcoming nights · "join any single night"
AfterRegister     → step-by-step what happens after you register
TinkerSpace       → venue info, finale format, what's covered for selected teams
PreviousNights    → preview of last 3 past hack nights
HallOfFame        → notable past projects bento grid
Experience        → testimonials + stats
Community         → Discord terminal box
FAQ               → 10-question accordion
Footer
```

---

## Navbar Links

`SHN by TinkerHub | How It Works | Timeline | Past Nights | Campus | Community | [Register Now →]`

---

## Data Architecture — `lib/data.ts`

**All content lives here. Never hardcode content in components.**

### Interfaces

```ts
HackNight {
  id, slug, theme, date, isoDate,   // isoDate is UTC string for countdown
  stack, difficulty,
  about,                             // paragraph about the theme
  challenge,                         // what attendees actually build
  mentors: Mentor[],
  starterResources: Resource[]
}

PastHackNight {
  id, slug, theme, date, stack, difficulty,
  participants, submittedCount,
  about,
  mentors: Mentor[],
  resources: Resource[],
  bestProject: Project,
  allProjects: Project[]
}

Mentor     { name, role, github?, twitter? }
Resource   { title, url, type: "docs"|"video"|"repo"|"article" }
Project    { name, creator, team?, tags[], github, description?, liveUrl? }
Testimonial { name, quote }
FaqItem    { question, answer }
```

### Key Functions & Constants

```ts
getNextNight()        → first HackNight with isoDate > now  (used by countdown + hero)
getNextNightDate()    → Date object for LiveCountdown timer
REGISTER_URL          → "https://hub.tinkerhub.org"  ← replace per event with actual hub.app link
DISCORD_URL           → "https://discord.gg/tinkerhub"  ← replace with real invite
TINKERSPACE_MAPS_URL  → Google Maps URL for TinkerSpace Kochi
STICKERS_URL          → "/saturday-hack-night/stickers/"
socialShares[]        → SocialShare[] — community posts for the stickers page social wall
```

---

## Performance & Accessibility

- **LazyMotion**: `lib/motion.ts` re-exports `m as motion` (keeps same API). `MotionProvider.tsx` wraps app with `<LazyMotion features={domAnimation}>` — ~75% smaller Framer bundle on mobile.
- **`prefers-reduced-motion`**: CSS block disables all animations. Framer respects `useReducedMotion` hook.
- **Accessibility**: skip-to-main `#main-content`, ARIA nav/hamburger/FAQ, focus-visible rings, `aria-live` on countdown, `.touch-target` 44px minimum.
- **Mobile GPU**: backdrop-filter, box-shadows (glow), spotlight radial backgrounds — all disabled on mobile via `@media (min-width: 768px)` guards in globals.css.
- **All imports**: use `from "@/lib/motion"` (NOT from "framer-motion") across all components.

## Component Map

```
components/
  MotionProvider.tsx       → LazyMotion + domAnimation wrapper (in app/layout.tsx)
  layout/
    Navbar.tsx           → sticky, scroll-aware blur, mobile hamburger, Escape key closes, ARIA compliant
    Footer.tsx           → attribution, nav links, GitHub link

  sections/             (homepage sections, in order)
    Hero.tsx             → headline, countdown, CTAs, "Free · Open to all"
    Philosophy.tsx       → 4 principles, manifesto quote
    Blueprint.tsx        → 3-step flow with SVG connectors
    GetSelected.tsx      → 3-step path to finale, highlight box
    Timeline.tsx         → upcoming nights grid, join-any-night messaging
    AfterRegister.tsx    → 6-step post-registration timeline
    TinkerSpace.tsx      → venue details, finale format, what's covered
    PreviousNights.tsx   → last 3 past nights preview cards
    HallOfFame.tsx       → bento grid of notable projects
    Experience.tsx       → masonry testimonials + stats
    Community.tsx        → Discord terminal box + CTA + "Claim Sticker Pack" secondary CTA
    FAQ.tsx              → animated accordion, 10 questions, full ARIA (aria-expanded, aria-controls, role=region)

  ui/                   (reusable atoms)
    GlowButton.tsx       → green/cyan/outline variants
    LiveCountdown.tsx    → "use client", targets getNextNightDate(), shows event name, aria-live for screen readers
    HackNightCard.tsx    → glassmorphism card, links to /events/[slug]
    ProjectBentoGrid.tsx → hover-reveal grid
    StepConnector.tsx    → SVG animated line between Blueprint steps
    TerminalBox.tsx      → typewriter animation, success state
    TestimonialCard.tsx  → masonry-safe card
```

---

## Current Season Data

**Season 02 — 2026**

| # | Theme | Date | Stack | Difficulty |
|---|---|---|---|---|
| 01 | The Agentic Web | March 14, 2026 | LangChain, Next.js | Intermediate |
| 02 | Creative Coding | March 28, 2026 | Canvas, Three.js, p5.js | Beginner |
| 03 | Hardware Sync | April 11, 2026 | MQTT, ESP32, Arduino | Advanced |
| 04 | AI at the Edge | April 25, 2026 | TensorFlow Lite, ONNX, Raspberry Pi | Advanced |
| 05 | The Open Source Sprint | May 9, 2026 | Any | Beginner |

**Archive (Season 01 — 2025)**

| # | Theme | Date | Participants | Submissions |
|---|---|---|---|---|
| 01 | Local-First Apps | Feb 1, 2025 | 42 | 18 |
| 02 | Build Your CLI | Feb 15, 2025 | 56 | 24 |
| 03 | Browser Extensions | Mar 1, 2025 | 61 | 27 |

---

## Real Content TODOs

Replace all dummy data with real content as it becomes available.

| Item | Location | Status |
|---|---|---|
| Per-event hub.app registration links | `lib/data.ts` → `REGISTER_URL` (ideally per `HackNight`) | ⏳ global placeholder |
| Real Discord invite link | `lib/data.ts` → `DISCORD_URL` | ⏳ placeholder |
| Actual mentor names, bios, handles | `lib/data.ts` each `HackNight.mentors[]` | ⏳ dummy names |
| TinkerSpace Google Maps URL | `lib/data.ts` → `TINKERSPACE_MAPS_URL` | ⏳ placeholder |
| Real participant testimonials | `lib/data.ts` → `testimonials[]` | ⏳ 3 dummy |
| Community / TinkerSpace photos | `components/sections/Experience.tsx` | ⏳ placeholder slots |
| TinkerHub logo + favicon | `public/` + `app/layout.tsx` | ⏳ text logo "SHN" |
| Actual past project submissions | `lib/data.ts` → `pastHackNights[].allProjects` | ⏳ dummy |
| Real travel / accommodation policy | `components/sections/TinkerSpace.tsx` | ⏳ generic copy |
| Season 01 archive slugs/data | `lib/data.ts` → `pastHackNights` | ⏳ 3 dummy nights |

---

## Development Workflow

```bash
cd /Users/kurian/Documents/TinkerHub/projects/saturday-hack-night

npm run dev        # dev server → http://localhost:3000/saturday-hack-night
npm run build      # static export → ./out/ (always run before pushing)
git add -A && git commit -m "..." && git push   # triggers auto-deploy (~40s)
```

**Check deploy status:**
```bash
gh run list --repo appukurian/saturday-hack-night --limit 1
```

---

## Common Pitfalls

1. **Tailwind 4** — no `tailwind.config.js`. All tokens in `app/globals.css @theme {}`.
2. **`"use client"`** — required on every component using hooks, state, or Framer Motion.
3. **Internal `<a>` links** need full path: `/saturday-hack-night/archive/`. `<Link>` auto-prepends basePath.
4. **New dynamic pages** need `generateStaticParams` — static export won't generate them otherwise.
5. **All content** in `lib/data.ts`. Never hardcode strings in components.
6. **Countdown** targets `getNextNight().isoDate` — update `upcomingNights` isoDate values if dates change.
7. **Framer imports** — always `from "@/lib/motion"`, never `from "framer-motion"` directly. LazyMotion requires `m.*` components.
7. **New sections** must be added to `app/page.tsx` in the correct order.

---

## How to Update This File

Update this file whenever:
- A new page or section is added
- A program rule changes (team size, submission rules, stack policy, etc.)
- New real content replaces dummy content
- A new season's events are added
- Any URL, slug, or routing changes
- New TODO items are resolved

---
