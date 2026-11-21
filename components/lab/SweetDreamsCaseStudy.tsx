"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { premiumEase, smoothEase } from "@/components/motionConfig";
import {
  ButtonShowcase,
  DemoLabel,
  FrameLoop,
  InteractionShowcase,
  MiniDreamCard,
  ProgressShowcase,
  type Frame,
} from "./SweetDreamsDemos";

/**
 * SWEET DREAMS — CASE STUDY
 * Expandable case study shown inside The Lab, under the Sweet Dreams campaign entry.
 * Every visual comes from the real project: screenshots captured from the playable H5,
 * card art rendered by the game's export code, and the Figma frames.
 * No campaign performance data is claimed.
 */

const J = "/lab/campaigns/sweet-dreams/journey";

const PALETTE = [
  { name: "Midnight", hex: "#0F1442" },
  { name: "Indigo", hex: "#2E3485" },
  { name: "Periwinkle", hex: "#6466C6" },
  { name: "Lavender", hex: "#A796FF" },
  { name: "Haze", hex: "#CDB6EE" },
  { name: "Blush", hex: "#F8D3E6" },
  { name: "Moonlight", hex: "#FFF1B8" },
];

const JOURNEY: {
  step: string;
  name: string;
  time: string;
  desc: string;
  highlights: string[];
  frames: Frame[];
}[] = [
  {
    step: "01",
    name: "Welcome",
    time: "~3 s",
    desc: "Moonlit hill, Nubi breathing and blinking. One CTA: Let’s Begin.",
    highlights: ["Animated character", "Moonlit scene", "Floating clouds", "Primary CTA"],
    frames: [{ src: `${J}/01-welcome.jpg`, caption: "Welcome screen" }],
  },
  {
    step: "02",
    name: "Interactive Night",
    time: "~20 s",
    desc: "Tap 5 over-bright stars to calm them, drag the moon into its ring. The sky darkens, Nubi gets drowsy.",
    highlights: ["Tap stars", "Drag the moon", "Progress bar & ring", "Visual feedback"],
    frames: [
      { src: `${J}/02-night-start.jpg`, caption: "0 / 5 stars" },
      { src: `${J}/02-night-star1.jpg`, caption: "Star tapped" },
      { src: `${J}/02-night-star2.jpg`, caption: "2 / 5 stars" },
      { src: `${J}/02-night-star3.jpg`, caption: "3 / 5 stars" },
      { src: `${J}/02-night-moon-drag.jpg`, caption: "Moon dragged" },
      { src: `${J}/02-night-moon-placed.jpg`, caption: "Moon placed" },
    ],
  },
  {
    step: "03",
    name: "Sweet Dreams",
    time: "~6 s",
    desc: "Nubi falls asleep, Pip the dream companion flies in.",
    highlights: ["Eyes close", "Blanket & sleep", "Pip appears", "Night complete"],
    frames: [
      { src: `${J}/03-dreams-eyes-closing.jpg`, caption: "Eyes closing" },
      { src: `${J}/03-dreams-falling-asleep.jpg`, caption: "Asleep" },
      { src: `${J}/03-dreams-pip.jpg`, caption: "Pip arrives" },
    ],
  },
  {
    step: "04",
    name: "Dream Card",
    time: "tap",
    desc: "Stars gather into a mystery card. Tap to reveal: 3D flip, holographic foil, tilt to play with the light.",
    highlights: ["Card back", "Tap to reveal", "3D flip", "Foil & tilt"],
    frames: [
      { src: `${J}/04-card-back.jpg`, caption: "Mystery card" },
      { src: `${J}/04-card-flip.jpg`, caption: "3D flip" },
      { src: `${J}/04-card-tilt.jpg`, caption: "Foil tilt" },
    ],
  },
  {
    step: "05",
    name: "Conversion",
    time: "choice",
    desc: "Primary product CTA, then save the card, share it, export a 1080×1920 story or play again.",
    highlights: ["Product CTA", "Save card", "Share", "Replay"],
    frames: [{ src: `${J}/05-conversion.jpg`, caption: "Conversion panel" }],
  },
];

const VERIFIED_STACK = [
  "React 18",
  "GSAP 3",
  "Tailwind CSS",
  "CSS 3D transforms",
  "Canvas PNG export",
  "Web Share API",
  "Event tracking adapter",
];

const PREPARED = [
  { name: "Blender 3D Integration", note: "Prepared / Future Enhancement: a Three.js / R3F slot lazy-loads a GLB when one is configured. No Blender model is integrated yet; the 2D Nubi is live." },
  { name: "GA4 connection", note: "Prepared: the adapter sends events to gtag when a measurement ID is set. No GA4 property is connected in this build." },
];

const EVENTS = [
  "campaign_view",
  "game_start",
  "challenge_complete",
  "card_reveal_start",
  "card_flip_complete",
  "card_interaction",
  "reward_download",
  "share_click",
  "share_success",
  "cta_click",
  "replay_click",
];

const TRACKING_LAYERS = [
  { layer: "Console logging", status: "Active", note: "Every event is logged while no GA4 ID is configured (QA)." },
  { layer: "dataLayer events", status: "Active", note: "Pushed to window.dataLayer, ready for Google Tag Manager." },
  { layer: "GA4 integration", status: "Ready, not connected", note: "gtag.js loads only when a measurement ID is configured." },
  { layer: "Verified GA4 collection", status: "Not verified", note: "No live property, so no collection has been verified." },
];

const FUNNEL = [
  { step: "Campaign view", events: "campaign_view" },
  { step: "Game start", events: "game_start" },
  { step: "Challenge complete", events: "challenge_complete" },
  { step: "Card reveal", events: "card_reveal_start → card_flip_complete" },
  { step: "Card save / share", events: "reward_download · share_click → share_success" },
  { step: "CTA click", events: "cta_click" },
];

const KPIS = [
  { kpi: "Game completion rate", formula: "Completed game plays ÷ started game plays × 100", unit: "plays" },
  { kpi: "Card reveal rate", formula: "Completed card reveals ÷ completed game plays × 100", unit: "plays" },
  { kpi: "Reward download rate", formula: "Plays with a successful reward download ÷ plays with a revealed card × 100", unit: "plays" },
  { kpi: "Share rate (attempts)", formula: "Plays with a share action (share_click) ÷ plays with a revealed card × 100", unit: "plays" },
  { kpi: "Share success rate", formula: "Plays with share_success ÷ plays with a share action × 100", unit: "plays" },
  { kpi: "Post-reveal CTA conversion", formula: "Plays with a CTA click ÷ plays with a revealed card × 100", unit: "plays" },
  { kpi: "Overall campaign CTA click-through", formula: "Campaign sessions with a CTA click ÷ campaign sessions × 100", unit: "sessions" },
];

const HYPOTHESES = [
  { signal: "Low game start rate", test: "Test a clearer CTA hierarchy on the Welcome screen." },
  { signal: "Low challenge completion", test: "Simplify the gesture instructions and hint timing." },
  { signal: "Low card reveal rate", test: "Build more anticipation for the reward before the reveal." },
  { signal: "Low CTA conversion", test: "Refine the final CTA placement and message." },
];

const TOKEN_EXCERPT = `/* public/lab/sweet-dreams/styles/tokens.css */
--c-midnight: #0f1442;
--c-lavender: #a796ff;
--c-moon: #fff1b8;
--font-display: 'Fredoka', 'Zen Maru Gothic', system-ui, sans-serif;
--g-cta-moon: linear-gradient(100deg, #fff0b8 0%, #f8d3e6 52%, #c8b8ff 100%);
--g-progress: linear-gradient(90deg, #ffe7a0, #f8c9e2);
--r-pill: 999px;
--r-card: 24px;
--h-cta: 60px;
--w-cta: 326px;
--ease-pop: cubic-bezier(0.3, 1.6, 0.5, 1);

/* components.css — one token, many components */
.cta-moon { background: var(--g-cta-moon); color: var(--c-ink); box-shadow: var(--sh-cta-moon); }`;

const CODE_EXCERPT = `// public/lab/sweet-dreams/src/screens/Night.js (excerpt)
const tapStar = (i) => {
  (loops.current[i] || []).forEach((tw) => tw.kill());
  gsap.to(el.querySelector('.halo-bright'), { opacity: 0, scale: 0.4, duration: 0.6 * d });
  gsap.fromTo(el.querySelector('.halo-calm'), { opacity: 0, scale: 0.3 },
    { opacity: 1, scale: 1, duration: 0.9 * d, ease: 'back.out(1.6)' });
  gsap.to(el.querySelector('.sp'), { attr: { fill: '#FFF1B8' }, duration: 0.5 * d });
  burst(fxRef.current, x, y);
  calmRef.current = [...calmRef.current, i];
  charRef.current && charRef.current.happy();
  track(EVENTS.STAR_TAP, { star_index: i + 1, stars_calmed: n });
  setCalmCount(n);
};`;

const AI_EVIDENCE = [
  "Lab: add Playable Campaigns folder with Sweet Dreams H5",
  "Lab: add expandable case study to Sweet Dreams entry",
  "Lab: remove duplicate Sweet Dreams copies, move design sources",
];

// ---------------------------------------------------------------------------
// Small building blocks
// ---------------------------------------------------------------------------
function Label({ children }: { children: ReactNode }) {
  return <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-bone-muted">{children}</p>;
}

function SubHead({ index, children }: { index: string; children: ReactNode }) {
  return (
    <div className="flex items-baseline gap-3 border-t border-bone-line pt-6">
      <span className="font-mono text-[10px] tracking-[0.2em] text-signal">{index}</span>
      <h4 className="font-sans text-[16px] md:text-[18px] font-medium text-bone">{children}</h4>
    </div>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-t border-bone-line pt-3">
      <Label>{label}</Label>
      <p className="mt-2 body-sm text-bone leading-[1.55]">{value}</p>
    </div>
  );
}

function Chip({ children, accent = false }: { children: ReactNode; accent?: boolean }) {
  return (
    <span
      className={`rounded-full border px-3 py-1 font-mono text-[9px] tracking-[0.18em] uppercase ${
        accent ? "border-signal/50 text-signal" : "border-bone-line text-bone-dim"
      }`}
    >
      {children}
    </span>
  );
}

function Reveal({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ duration: reduce ? 0.2 : 0.7, delay, ease: premiumEase }}
    >
      {children}
    </motion.div>
  );
}

function CodeBlock({ code, label }: { code: string; label: string }) {
  return (
    <figure className="overflow-hidden rounded-xl border border-bone-line bg-ink">
      <figcaption className="flex items-center gap-2 border-b border-bone-line px-4 py-2.5">
        <span className="inline-block h-1.5 w-1.5 rounded-full bg-signal" />
        <span className="font-mono text-[9px] tracking-[0.18em] uppercase text-bone-muted">{label}</span>
      </figcaption>
      <pre className="max-w-full overflow-x-auto px-4 py-4 font-mono text-[10.5px] leading-[1.65] text-bone-dim" tabIndex={0}>
        <code>{code}</code>
      </pre>
    </figure>
  );
}

// ---------------------------------------------------------------------------
// 01 — Campaign Strategy
// ---------------------------------------------------------------------------
function Strategy() {
  return (
    <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr]">
      <div>
        <p className="body-lead text-bone leading-[1.6]">
          Sweet Dreams transforms a brief moment before bedtime into a playful 30-second core interaction. Users
          calm the night, help Nubi fall asleep, and unlock a collectible Dream Card designed to encourage sharing
          and discovery.
        </p>
        <p className="mt-5 body-sm leading-[1.6]">
          The mechanic follows a simple loop built for short-form social traffic: <span className="text-bone">calm → reward → share → convert</span>.
          Every step is a single, thumb-friendly gesture, and every step is measured.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Fact label="Format" value="Mobile-first H5 campaign, 390 × 844 reference" />
        <Fact label="Duration" value="A 30-second core interactive journey, followed by an optional collectible reward experience" />
        <Fact label="Audience" value="Social-first mobile users arriving from short-form video" />
        <Fact label="Objective" value="Engagement that ends in a shareable reward and a product click" />
        <Fact label="My role" value="Art direction, UX/UI, motion design, front-end (AI-assisted)" />
        <div className="border-t border-bone-line pt-3">
          <Label>Status</Label>
          <p className="mt-2 body-sm leading-[1.55]">
            Unofficial, fan-made portfolio concept. Not affiliated with or endorsed by the product owner.
          </p>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// 02 — User Journey
// ---------------------------------------------------------------------------
function Journey() {
  return (
    <div>
      <ol className="grid gap-6 lg:grid-cols-5 lg:gap-4">
        {JOURNEY.map((j, i) => (
          <li key={j.step}>
            <Reveal delay={i * 0.06}>
              <div className="flex gap-4 lg:flex-col lg:gap-4">
                <div className="w-[120px] flex-none sm:w-[150px] lg:w-full">
                  <FrameLoop frames={j.frames} alt={`Sweet Dreams — ${j.name}`} />
                </div>
                <div className="min-w-0">
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="font-mono text-[11px] tracking-[0.2em] text-signal">{j.step}</span>
                    <span className="font-mono text-[9px] tracking-[0.18em] uppercase text-bone-muted">{j.time}</span>
                  </div>
                  <p className="mt-2 font-sans text-[15px] font-medium leading-snug text-bone">{j.name}</p>
                  <p className="mt-2 body-sm leading-[1.5]">{j.desc}</p>
                  <ul className="mt-3 flex flex-wrap gap-1.5">
                    {j.highlights.map((h) => (
                      <li key={h} className="rounded-full border border-bone-line px-2.5 py-1 font-mono text-[8.5px] tracking-[0.14em] uppercase text-bone-dim">
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          </li>
        ))}
      </ol>

      <Reveal>
        <div className="mt-10 grid items-center gap-8 rounded-2xl border border-bone-line bg-ink/40 p-6 md:grid-cols-[auto_1fr] md:p-8">
          <MiniDreamCard />
          <div>
            <Label>Interactive demo · step 04</Label>
            <h4 className="mt-3 font-sans text-[20px] md:text-[24px] font-medium leading-tight text-bone">
              Tap the card. Then tilt it.
            </h4>
            <p className="mt-3 body-sm leading-[1.6] max-w-xl">
              A miniature of the real Dream Card, using the artwork exported by the game itself: card back, tap to
              reveal, 3D flip and a holographic foil that follows your pointer. It runs locally in this page, so it
              never affects gameplay or analytics.
            </p>
          </div>
        </div>
      </Reveal>

      <p className="mt-6 body-sm leading-[1.6] max-w-3xl">
        The game only advances when the interactions are actually completed. Feedback is immediate on every tap:
        particles, sound (opt-in), a progress bar and ring, and the character reacting. All screens above are real
        captures of the playable H5.
      </p>
    </div>
  );
}

// ---------------------------------------------------------------------------
// 03 — Visual Design System
// ---------------------------------------------------------------------------
function DesignSystem() {
  return (
    <div className="space-y-10">
      <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
        <div className="space-y-6">
          <div>
            <Label>Palette</Label>
            <div className="mt-3 grid grid-cols-4 sm:grid-cols-7 gap-2">
              {PALETTE.map((c) => (
                <div key={c.hex}>
                  <div className="aspect-square rounded-lg border border-bone-line" style={{ background: c.hex }} />
                  <p className="mt-1.5 font-mono text-[8.5px] tracking-[0.12em] uppercase text-bone-dim">{c.name}</p>
                  <p className="font-mono text-[8.5px] tracking-[0.08em] text-bone-muted">{c.hex}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Fact label="Typography" value="Fredoka (display) · Nunito (interface) · Zen Maru Gothic (Japanese)" />
            <Fact label="Components" value="Pill gradient CTAs 326 × 60 · glass cards · progress bar & ring · chips · holographic card" />
            <Fact label="Characters" value="Nubi, a sleepy plush creature with a moon sprout, and Pip, a star-moth companion. Both original." />
            <Fact label="Tokens" value="Colours, gradients, radii, shadows and motion extracted from Figma into reusable CSS tokens" />
          </div>
        </div>
        <figure className="overflow-hidden rounded-xl border border-bone-line bg-ink">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/lab/campaigns/sweet-dreams/thumb.jpg"
            alt="Sweet Dreams — the three mobile screens and design system"
            loading="lazy"
            className="w-full h-auto"
          />
          <figcaption className="px-4 py-3 font-mono text-[9px] tracking-[0.18em] uppercase text-bone-muted">
            Figma reference · 3 screens · consistent design system
          </figcaption>
        </figure>
      </div>

      <div className="space-y-5">
        <SubHead index="A">Button system</SubHead>
        <ButtonShowcase />
      </div>

      <div className="space-y-5">
        <SubHead index="B">Progress system</SubHead>
        <ProgressShowcase />
      </div>

      <div className="space-y-5">
        <SubHead index="C">Interaction components</SubHead>
        <InteractionShowcase />
      </div>

      <div className="space-y-5">
        <SubHead index="D">Design tokens</SubHead>
        <div className="grid gap-6 lg:grid-cols-[1.15fr_1fr]">
          <CodeBlock code={TOKEN_EXCERPT} label="Real tokens from the project" />
          <ul className="space-y-3 body-sm leading-[1.55]">
            {[
              ["Colour", "--c-* tokens paint skies, text and accents; --c-moon marks every positive action."],
              ["Typography", "--font-display for headlines and buttons, --font-body for interface text; Zen Maru Gothic takes over in Japanese."],
              ["Gradients", "--g-cta-moon, --g-progress and --g-badge share the same moonlight hues, so rewards read consistently."],
              ["Spacing & size", "Layouts sit on the 390 px artboard; components keep fixed sizes such as --w-cta and --h-cta."],
              ["Radii", "--r-pill for actions, --r-card for cards, --r-panel for panels, --r-frame for the device frame."],
              ["Effects", "--sh-* shadows and glows plus --ease-soft / --ease-pop for motion."],
            ].map(([title, text]) => (
              <li key={title} className="flex gap-3 border-t border-bone-line pt-3">
                <span className="mt-[7px] inline-block h-1.5 w-1.5 flex-none rounded-full bg-signal" />
                <span>
                  <span className="text-bone">{title}. </span>
                  {text}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="space-y-5">
        <SubHead index="E">Design principles</SubHead>
        <div className="grid gap-4 md:grid-cols-3">
          {[
            ["Consistency", "Reusable components maintain a coherent experience across screens."],
            ["Clarity", "Clear hierarchy and visual feedback make interactions understandable."],
            ["Scalability", "Design tokens and reusable components support future campaign variations."],
          ].map(([title, text], i) => (
            <div key={title} className="rounded-xl border border-bone-line p-5">
              <span className="font-mono text-[10px] tracking-[0.2em] text-signal">0{i + 1}</span>
              <p className="mt-3 font-sans text-[18px] font-medium text-bone">{title}</p>
              <p className="mt-2 body-sm leading-[1.55]">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// 04 — Creative Development
// ---------------------------------------------------------------------------
function WorkflowStep({ index, title, children }: { index: string; title: string; children: ReactNode }) {
  return (
    <li className="relative flex flex-col gap-4 lg:pr-2">
      <div className="flex items-center gap-3">
        <span className="grid h-8 w-8 flex-none place-items-center rounded-full border border-signal font-mono text-[10px] text-signal">
          {index}
        </span>
        <span className="h-px flex-1 bg-gradient-to-r from-signal/60 to-transparent" aria-hidden="true" />
      </div>
      <p className="font-mono text-[11px] tracking-[0.22em] uppercase text-bone">{title}</p>
      {children}
    </li>
  );
}

function Development({ onPlay }: { onPlay?: () => void }) {
  return (
    <div className="space-y-10">
      <ol className="grid gap-10 md:grid-cols-2 xl:grid-cols-4 xl:gap-6">
        <WorkflowStep index="01" title="Figma">
          <figure className="overflow-hidden rounded-xl border border-bone-line bg-ink">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/lab/campaigns/sweet-dreams/figma-frames.jpg"
              alt="Sweet Dreams Figma frames: Welcome and Interactive Night"
              loading="lazy"
              className="w-full h-auto"
            />
          </figure>
          <p className="body-sm leading-[1.55]">
            Art direction, screen layouts and hierarchy, colour and type system, and component planning, defined in
            Figma before any code.
          </p>
        </WorkflowStep>

        <WorkflowStep index="02" title="AI-assisted development">
          <div className="rounded-xl border border-bone-line bg-ink p-4">
            <DemoLabel>Real project history</DemoLabel>
            <ul className="mt-3 space-y-2">
              {AI_EVIDENCE.map((c) => (
                <li key={c} className="font-mono text-[10px] leading-[1.5] text-bone-dim">
                  <span className="text-signal">●</span> {c}
                </li>
              ))}
            </ul>
            <p className="mt-3 font-mono text-[9px] leading-[1.5] tracking-[0.06em] text-bone-muted">
              Commits co-authored with Claude (Anthropic), from my own briefs.
            </p>
          </div>
          <p className="body-sm leading-[1.55]">
            AI-assisted development helped translate my visual concepts into functional React components, accelerate
            prototyping, and refine interactions while maintaining control over the creative direction.
          </p>
        </WorkflowStep>

        <WorkflowStep index="03" title="React / GSAP">
          <CodeBlock code={CODE_EXCERPT} label="Star tap · real code" />
          <p className="body-sm leading-[1.55]">
            React components and state, pointer-based touch interactions, GSAP timelines for every reaction, a
            night-veil scene transition, and a 390 px stage that adapts to any phone height.
          </p>
        </WorkflowStep>

        <WorkflowStep index="04" title="Playable H5">
          <div className="w-full max-w-[200px]">
            <FrameLoop frames={[{ src: `${J}/02-night-complete.jpg`, caption: "Night complete · 100%" }]} alt="Sweet Dreams playable result" />
          </div>
          <p className="body-sm leading-[1.55]">
            Star tapping, moon dragging, Nubi falling asleep, and the holographic Dream Card with reveal and tilt, all
            live in the browser.
          </p>
          {onPlay && (
            <button
              type="button"
              onClick={onPlay}
              className="inline-flex min-h-[44px] items-center justify-center gap-2 self-start rounded-lg border border-signal bg-signal px-5 font-mono text-[10px] tracking-[0.22em] uppercase text-ink transition-colors hover:bg-transparent hover:text-signal focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-signal focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
            >
              <svg width="9" height="10" viewBox="0 0 9 10" fill="currentColor" aria-hidden="true">
                <path d="M0 0L9 5L0 10Z" />
              </svg>
              Play the experience
            </button>
          )}
        </WorkflowStep>
      </ol>

      <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
        <div>
          <Label>Verified in the build</Label>
          <div className="mt-3 flex flex-wrap gap-2">
            {VERIFIED_STACK.map((s) => (
              <Chip key={s}>{s}</Chip>
            ))}
          </div>
          <div className="mt-6">
            <Label>Prepared · not yet live</Label>
            <ul className="mt-3 space-y-3">
              {PREPARED.map((p) => (
                <li key={p.name} className="rounded-xl border border-dashed border-bone-line p-4">
                  <p className="font-sans text-[14px] text-bone">{p.name}</p>
                  <p className="mt-1 body-sm leading-[1.5]">{p.note}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <ul className="space-y-3 body-sm leading-[1.55]">
          {[
            ["Holographic card", "CSS 3D flip and pointer-driven foil (iridescence, grain, specular light, parallax). No 3D library, tuned for mobile GPUs."],
            ["Rewards", "High-res card PNG and a 1080 × 1920 story, rendered on canvas without any website UI."],
            ["Sharing", "Native Web Share with the image, falling back to download + copy link."],
            ["Quality", "EN / JA, reduced-motion support, keyboard alternatives, sound off by default, static deploy with no build step."],
          ].map(([title, text]) => (
            <li key={title} className="flex gap-3 border-t border-bone-line pt-3">
              <span className="mt-[7px] inline-block w-1.5 h-1.5 flex-none rounded-full bg-signal" />
              <span>
                <span className="text-bone">{title}. </span>
                {text}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// 05 — Campaign Analytics
// ---------------------------------------------------------------------------
function Analytics() {
  return (
    <div className="space-y-10">
      <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
        <div>
          <Label>GA4-Ready Event Tracking</Label>
          <div className="mt-3 flex flex-wrap gap-2">
            {EVENTS.map((e, i) => (
              <Chip key={e} accent={i === 1 || i === 4 || i === 9}>
                {e}
              </Chip>
            ))}
          </div>
          <p className="mt-5 body-sm leading-[1.6]">
            All eleven events are emitted by the game code (checked in the source and in a full test play). Each one
            carries a session id and a play id, so rates can be counted per play-through or per session.
          </p>
        </div>
        <div className="overflow-hidden rounded-xl border border-bone-line">
          {TRACKING_LAYERS.map((t, i) => (
            <div key={t.layer} className={`grid gap-1 px-4 py-3 sm:grid-cols-[1fr_auto] sm:items-center ${i > 0 ? "border-t border-bone-line" : ""}`}>
              <div>
                <p className="font-sans text-[14px] text-bone">{t.layer}</p>
                <p className="body-sm leading-[1.45]">{t.note}</p>
              </div>
              <span
                className={`font-mono text-[9px] tracking-[0.18em] uppercase ${
                  t.status === "Active" ? "text-signal" : "text-bone-muted"
                }`}
              >
                {t.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <Label>Campaign funnel</Label>
          <ol className="relative mt-4">
            {FUNNEL.map((f, i) => (
              <li key={f.step} className="relative flex gap-4 pb-5 last:pb-0">
                {i < FUNNEL.length - 1 && (
                  <span className="absolute left-[7px] top-4 bottom-0 w-px bg-gradient-to-b from-signal/70 to-signal/20" aria-hidden="true" />
                )}
                <span className="relative mt-1 h-[15px] w-[15px] flex-none rounded-full border border-signal bg-ink" aria-hidden="true">
                  <span className="absolute inset-[4px] rounded-full bg-signal" />
                </span>
                <div className="min-w-0">
                  <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-bone">{f.step}</p>
                  <p className="mt-1 font-mono text-[9.5px] tracking-[0.04em] text-bone-muted break-words">{f.events}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <div>
          <Label>Campaign KPIs</Label>
          <div className="mt-3 overflow-hidden rounded-xl border border-bone-line">
            {KPIS.map((k, i) => (
              <div key={k.kpi} className={`px-4 py-3 ${i > 0 ? "border-t border-bone-line" : ""}`}>
                <div className="flex items-baseline justify-between gap-3">
                  <span className="font-sans text-[14px] text-bone">{k.kpi}</span>
                  <span className="font-mono text-[8.5px] tracking-[0.18em] uppercase text-bone-muted">per {k.unit.replace(/s$/, "")}</span>
                </div>
                <p className="mt-1 font-mono text-[10px] leading-[1.5] text-signal">{k.formula}</p>
              </div>
            ))}
          </div>
          <p className="mt-3 body-sm leading-[1.55]">
            Share attempts (share_click) and successful shares (share_success) are counted separately. Post-reveal
            CTA conversion counts plays; the overall click-through counts every campaign session.
          </p>
        </div>
      </div>

      <div>
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <Label>How data could improve the experience</Label>
          <span className="font-mono text-[9px] tracking-[0.18em] uppercase text-signal">Optimization hypotheses · not results</span>
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {HYPOTHESES.map((h, i) => (
            <div key={h.signal} className="rounded-xl border border-bone-line p-4">
              <span className="font-mono text-[10px] tracking-[0.2em] text-signal">0{i + 1}</span>
              <p className="mt-2 font-sans text-[14px] text-bone">{h.signal}</p>
              <p className="mt-1 body-sm leading-[1.5]">→ {h.test}</p>
            </div>
          ))}
        </div>
      </div>

      <p className="rounded-xl border border-signal/40 px-4 py-3 body-sm leading-[1.55] text-bone">
        This is a self-initiated campaign concept. Analytics events and KPI definitions demonstrate the measurement
        framework. No commercial performance results are claimed.
      </p>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Accordion
// ---------------------------------------------------------------------------
export function SweetDreamsCaseStudy({ label, onPlay }: { label: string; onPlay?: () => void }) {
  const sections: { id: string; title: string; render: () => ReactNode }[] = [
    { id: "strategy", title: "Campaign Strategy", render: () => <Strategy /> },
    { id: "journey", title: "User Journey", render: () => <Journey /> },
    { id: "design", title: "Visual Design System", render: () => <DesignSystem /> },
    { id: "development", title: "Creative Development", render: () => <Development onPlay={onPlay} /> },
    { id: "analytics", title: "Campaign Analytics", render: () => <Analytics /> },
  ];
  const [openId, setOpenId] = useState<string | null>(sections[0].id);
  const reduce = useReducedMotion();

  return (
    <div className="rounded-2xl border border-bone-line bg-ink-700/45 backdrop-blur-md">
      <div className="flex items-center justify-between gap-4 px-5 md:px-7 pt-6">
        <p className="h-eyebrow flex items-center gap-2">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-signal" />
          {label} · Sweet Dreams
        </p>
        <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-bone-muted">05</span>
      </div>

      <div className="mt-4">
        {sections.map((s, index) => {
          const open = openId === s.id;
          return (
            <section key={s.id} className="border-t border-bone-line first:border-t-0">
              <button
                type="button"
                onClick={() => setOpenId(open ? null : s.id)}
                aria-expanded={open}
                aria-controls={`sd-cs-${s.id}`}
                className="group flex w-full items-center justify-between gap-4 px-5 md:px-7 py-5 text-left focus-visible:outline-none focus-visible:bg-ink-600/60"
              >
                <span className="flex items-baseline gap-4">
                  <span className={`font-mono text-[11px] tracking-[0.2em] ${open ? "text-signal" : "text-bone-muted"}`}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={`font-sans text-[18px] md:text-[22px] font-medium leading-tight transition-colors duration-300 ${
                      open ? "text-bone" : "text-bone-dim group-hover:text-bone"
                    }`}
                  >
                    {s.title}
                  </span>
                </span>
                <motion.span
                  animate={{ rotate: open ? 45 : 0 }}
                  transition={{ duration: 0.3, ease: premiumEase }}
                  className={`grid place-items-center w-8 h-8 flex-none rounded-full border transition-colors ${
                    open ? "border-signal text-signal" : "border-bone-line text-bone-dim group-hover:border-signal/60"
                  }`}
                  aria-hidden="true"
                >
                  <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                    <path d="M5.5 1V10M1 5.5H10" stroke="currentColor" strokeWidth="1.4" />
                  </svg>
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {open && (
                  <motion.div
                    id={`sd-cs-${s.id}`}
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: reduce ? 0.15 : 0.55, ease: smoothEase }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 md:px-7 pb-8 pt-1">{s.render()}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </section>
          );
        })}
      </div>
    </div>
  );
}
