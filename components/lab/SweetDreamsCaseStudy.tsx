"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { premiumEase, smoothEase } from "@/components/motionConfig";

/**
 * SWEET DREAMS — CASE STUDY
 * Expandable case study shown inside The Lab, under the Sweet Dreams campaign entry.
 * Content is factual about the concept build: no campaign performance data is claimed.
 */

const PALETTE = [
  { name: "Midnight", hex: "#0F1442" },
  { name: "Indigo", hex: "#2E3485" },
  { name: "Periwinkle", hex: "#6466C6" },
  { name: "Lavender", hex: "#A796FF" },
  { name: "Haze", hex: "#CDB6EE" },
  { name: "Blush", hex: "#F8D3E6" },
  { name: "Moonlight", hex: "#FFF1B8" },
];

const JOURNEY = [
  { step: "01", name: "Welcome", time: "~3 s", desc: "Moonlit hill, Nubi breathing and blinking. One CTA: Let’s Begin." },
  { step: "02", name: "Interactive Night", time: "~20 s", desc: "Tap 5 over-bright stars to calm them, drag the moon into its ring. The sky darkens, Nubi gets drowsy." },
  { step: "03", name: "Sweet Dreams", time: "~6 s", desc: "Nubi falls asleep, Pip the dream companion flies in." },
  { step: "04", name: "Dream Card", time: "tap", desc: "Stars gather into a mystery card. Tap to reveal: 3D flip, holographic foil, tilt to play with the light." },
  { step: "05", name: "Conversion", time: "choice", desc: "Primary product CTA, then save the card, share it, export a 1080×1920 story or play again." },
];

const STACK = [
  "React 18",
  "GSAP 3",
  "Tailwind CSS",
  "CSS 3D transforms",
  "Canvas PNG export",
  "Web Share API",
  "Three.js / R3F (Blender slot)",
  "GA4 adapter",
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

const KPIS = [
  { kpi: "Game completion rate", formula: "challenge_complete ÷ game_start" },
  { kpi: "Card reveal rate", formula: "card_flip_complete ÷ challenge_complete" },
  { kpi: "Reward download rate", formula: "reward_download ÷ card_flip_complete" },
  { kpi: "Share rate", formula: "share_click ÷ card_flip_complete" },
  { kpi: "Final CTA click-through", formula: "cta_click ÷ card_flip_complete" },
];

function Label({ children }: { children: ReactNode }) {
  return (
    <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-bone-muted">{children}</p>
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

function Strategy() {
  return (
    <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr]">
      <div>
        <p className="body-lead text-bone leading-[1.6]">
          Bedtime is the one moment people want to put their phone down. Sweet Dreams turns that moment into a
          30-second ritual: calm the night, watch a character fall asleep, and leave with a collectible reward
          worth sharing, then a clear path to the product.
        </p>
        <p className="mt-5 body-sm leading-[1.6]">
          The mechanic follows a simple loop built for short-form social traffic: <span className="text-bone">calm → reward → share → convert</span>.
          Every step is a single, thumb-friendly gesture, and every step is measured.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Fact label="Format" value="Mobile-first H5 campaign, 390 × 844 reference" />
        <Fact label="Audience" value="Social-first mobile users arriving from short-form video" />
        <Fact label="Objective" value="Engagement that ends in a shareable reward and a product click" />
        <Fact label="My role" value="Art direction, UX/UI, motion design, front-end (AI-assisted)" />
        <div className="sm:col-span-2 border-t border-bone-line pt-3">
          <Label>Status</Label>
          <p className="mt-2 body-sm leading-[1.55]">
            Unofficial, fan-made portfolio concept. Not affiliated with or endorsed by the product owner.
          </p>
        </div>
      </div>
    </div>
  );
}

function Journey() {
  return (
    <div>
      <ol className="grid gap-3 md:grid-cols-5">
        {JOURNEY.map((j) => (
          <li key={j.step} className="relative rounded-xl border border-bone-line bg-ink-700/50 p-4">
            <div className="flex items-baseline justify-between">
              <span className="font-mono text-[11px] tracking-[0.2em] text-signal">{j.step}</span>
              <span className="font-mono text-[9px] tracking-[0.18em] uppercase text-bone-muted">{j.time}</span>
            </div>
            <p className="mt-3 font-sans text-[15px] font-medium text-bone leading-snug">{j.name}</p>
            <p className="mt-2 body-sm leading-[1.5]">{j.desc}</p>
          </li>
        ))}
      </ol>
      <p className="mt-5 body-sm leading-[1.6] max-w-3xl">
        The game only advances when the interactions are actually completed. Feedback is immediate on every tap:
        particles, sound (opt-in), a progress bar and ring, and the character reacting.
      </p>
    </div>
  );
}

function DesignSystem() {
  return (
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
  );
}

function Development() {
  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
      <div>
        <p className="body-lead text-bone leading-[1.6]">
          Built by vibe coding with an AI pair: from the Figma frames to a working H5, the visuals are generated
          from the same design tokens so the live build stays faithful to the art direction.
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          {STACK.map((s) => (
            <Chip key={s}>{s}</Chip>
          ))}
        </div>
      </div>
      <ul className="space-y-3 body-sm leading-[1.55]">
        {[
          ["Holographic card", "CSS 3D flip and pointer-driven foil (iridescence, grain, specular light, parallax). No 3D library, tuned for mobile GPUs."],
          ["Rewards", "High-res card PNG and a 1080 × 1920 story, rendered on canvas without any website UI."],
          ["Sharing", "Native Web Share with the image, falling back to download + copy link."],
          ["Blender-ready", "A character slot lazy-loads a GLB with idle, blink and fall-asleep clips; the 2D Nubi stays as placeholder."],
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
  );
}

function Analytics() {
  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
      <div>
        <Label>Tracked events · GA4-ready adapter</Label>
        <div className="mt-3 flex flex-wrap gap-2">
          {EVENTS.map((e, i) => (
            <Chip key={e} accent={i === 1 || i === 4 || i === 9}>
              {e}
            </Chip>
          ))}
        </div>
        <p className="mt-5 body-sm leading-[1.6]">
          Each event carries a session and play id so funnels can be read per play-through. Without a GA4 ID the
          adapter logs to the console and the dataLayer for QA.
        </p>
      </div>
      <div>
        <Label>Campaign KPIs</Label>
        <div className="mt-3 overflow-hidden rounded-xl border border-bone-line">
          {KPIS.map((k, i) => (
            <div
              key={k.kpi}
              className={`flex flex-col gap-1 px-4 py-3 sm:flex-row sm:items-center sm:justify-between ${
                i > 0 ? "border-t border-bone-line" : ""
              }`}
            >
              <span className="font-sans text-[14px] text-bone">{k.kpi}</span>
              <span className="font-mono text-[10px] tracking-[0.06em] text-signal">{k.formula}</span>
            </div>
          ))}
        </div>
        <p className="mt-4 font-mono text-[9px] tracking-[0.18em] uppercase text-bone-muted">
          Concept build: metrics are instrumented, not reported. No performance data is shown or invented.
        </p>
      </div>
    </div>
  );
}

const SECTIONS: { id: string; title: string; render: () => ReactNode }[] = [
  { id: "strategy", title: "Campaign Strategy", render: () => <Strategy /> },
  { id: "journey", title: "User Journey", render: () => <Journey /> },
  { id: "design", title: "Visual Design System", render: () => <DesignSystem /> },
  { id: "development", title: "Creative Development", render: () => <Development /> },
  { id: "analytics", title: "Campaign Analytics", render: () => <Analytics /> },
];

export function SweetDreamsCaseStudy({ label }: { label: string }) {
  const [openId, setOpenId] = useState<string | null>(SECTIONS[0].id);
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
        {SECTIONS.map((s, index) => {
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
