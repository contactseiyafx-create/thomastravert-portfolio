"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { site } from "@/data/site";
import { HoverReveal, LineReveal } from "./HoverReveal";
import { CTAButton } from "./CTAButton";

/**
 * HERO
 * ────────────────────────────────────────────────
 * Layered architecture, ordered back → front:
 *   1.  background slot  (data-driven; user replaces with AE comp)
 *   2.  ambient layer    (grain + vignette to make the empty slot feel intentional)
 *   3.  overlay layer    (gradient mask to anchor text on the left)
 *   4.  content layer    (titles, role, intro, CTAs, JP name)
 *   5.  UI layer         (quote card, scroll hint)
 */
export function Hero() {
  const bg = site.hero.background;

  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      {/* ════════════════════════════════════════════════
          LAYER 1 — BACKGROUND  (data-driven)
          For video: 25% opacity + 3px blur per brief, atmospheric only.
          Mobile renders the poster JPG instead of autoplaying the video.
          ════════════════════════════════════════════════ */}
      <div className="absolute inset-0 z-0">
        {bg.kind === "image" && bg.src && (
          <Image src={bg.src} alt="" fill priority className="object-cover" />
        )}
        {bg.kind === "video" && bg.src && (
          <>
            {/* Desktop / tablet — autoplay muted loop */}
            <video
              src={bg.src}
              poster={bg.poster}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              aria-hidden
              className="
                hidden md:block
                absolute inset-0 w-full h-full object-cover scale-105
              "
              style={{
                opacity: 0.75,
filter: "blur(0px)",
              }}
            />
            {/* Mobile — static poster only, no video decode */}
            {bg.poster && (
              <img
                src={bg.poster}
                alt=""
                aria-hidden
                className="
                  md:hidden
                  absolute inset-0 w-full h-full object-cover scale-105
                "
                style={{
                  opacity: 0.25,
                  filter: "blur(3px)",
                }}
              />
            )}
          </>
        )}
        {bg.kind === "empty" && (
          // Subtle ambient field — a slot you can replace later.
          // No fake artwork, no characters. Just atmosphere.
          <AmbientField />
        )}
      </div>

      {/* ════════════════════════════════════════════════
          LAYER 2 — DARK OVERLAY  rgba(0, 0, 0, 0.44)
          Anchors text legibility on top of the video.
          ════════════════════════════════════════════════ */}
      {bg.kind === "video" && (
        <div
          aria-hidden
          className="absolute inset-0 z-[1] pointer-events-none"
          style={{ background: "rgba(0,0,0,0.25)" }}
        />
      )}

      {/* atmosphere: vignette + grain (kept — part of existing DA) */}
      {bg.ambient && (
        <>
          <div className="absolute inset-0 z-[2] vignette pointer-events-none" />
          <div className="absolute inset-0 z-[3] grain pointer-events-none" />
        </>
      )}

      {/* ════════════════════════════════════════════════
          LAYER 3 — GRID OVERLAY  (preserved from existing DA)
          Faint white wireframe — was inside AmbientField when slot empty,
          extracted here so it remains visible above the video.
          ════════════════════════════════════════════════ */}
      <HeroGrid />

      {/* overlay to anchor left text (kept) */}
      <div
        aria-hidden
        className="absolute inset-0 z-[5] pointer-events-none"
        style={{
          background:
            "linear-gradient(to right, rgba(5,5,5,0.95) 0%, rgba(5,5,5,0.7) 28%, rgba(5,5,5,0.0) 55%)",
        }}
      />

      {/* ════════════════════════════════════════════════
          LAYER 4 — CONTENT
          ════════════════════════════════════════════════ */}
      <div className="relative z-10 page-x pt-[calc(var(--nav-h)+44px)] pb-24">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-7 xl:col-span-6">
            {/* Eyebrow */}
            <HoverReveal y={16} delay={0.15}>
              <p className="h-eyebrow">{site.hero.eyebrow}</p>
            </HoverReveal>

            {/* Massive condensed title */}
            <div className="mt-5 md:mt-7">
              <div className="overflow-hidden">
                <HoverReveal y={70} delay={0.25}>
                  <h1 className="h-display text-[clamp(4.5rem,12vw,11rem)]">
                    {site.hero.titleLine1}
                  </h1>
                </HoverReveal>
              </div>
              <div className="overflow-hidden">
                <HoverReveal y={70} delay={0.38}>
                  <h1 className="h-display text-[clamp(4.5rem,12vw,11rem)]">
                    {site.hero.titleLine2}
                  </h1>
                </HoverReveal>
              </div>
            </div>

            {/* JP name */}
            <HoverReveal y={20} delay={0.55}>
              <p className="font-jp text-signal mt-5 text-sm md:text-base tracking-[0.18em]">
                {site.hero.nameJp}
              </p>
            </HoverReveal>

            {/* Role */}
            <div className="mt-6 max-w-md">
              <span className="block w-10 h-px bg-signal mb-4" />
              <HoverReveal y={14} delay={0.65}>
                <p className="font-mono text-[12px] tracking-[0.18em] text-bone uppercase">
                  {site.hero.role}
                </p>
                <p className="font-mono text-[12px] tracking-[0.18em] text-bone uppercase">
                  {site.hero.roleLine2}
                </p>
              </HoverReveal>
            </div>

            {/* Intro */}
            <LineReveal
              lines={[...site.hero.intro]}
              baseDelay={0.75}
              stagger={0.06}
              className="mt-6 body-lead max-w-md"
            />

            {/* CTAs */}
            <HoverReveal y={20} delay={0.95}>
              <div className="mt-9 flex items-center gap-6 flex-wrap">
                <CTAButton
                  label={site.hero.primaryCta.label}
                  href={site.hero.primaryCta.href}
                />
                <Link
                  href={site.hero.secondaryCta.href}
                  className="group flex items-center gap-3 font-mono text-[11px] tracking-[0.22em] uppercase text-bone hover:text-signal transition-colors"
                >
                  <span>{site.hero.secondaryCta.label}</span>
                  <span className="grid place-items-center w-9 h-9 rounded-full border border-bone-line group-hover:border-signal transition-colors">
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path d="M2 1.5L8 5L2 8.5V1.5Z" fill="currentColor" />
                    </svg>
                  </span>
                </Link>
              </div>
            </HoverReveal>
          </div>

          {/* Right column — empty by design (the BG slot lives here) */}
          <div className="hidden lg:block lg:col-span-5 xl:col-span-6" />
        </div>
      </div>

      {/* 5 — UI layer: Quote card (bottom right) */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1, duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="absolute right-[var(--gutter)] bottom-32 z-20 max-w-[300px] border border-bone-line bg-ink-700/60 backdrop-blur p-5 hidden md:block"
      >
        <span className="text-signal font-display text-3xl leading-none">”</span>
        <p className="font-jp text-bone mt-2 text-base">{site.quote.jp}</p>
        <p className="font-mono text-[11px] tracking-[0.22em] mt-3 text-bone">
          {site.quote.en}
        </p>
        <p className="font-mono text-[10px] tracking-[0.22em] mt-4 text-signal">
          {site.quote.attribution}
        </p>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 hidden md:flex flex-col items-center gap-2 text-bone-dim"
      >
        <span className="font-mono text-[10px] tracking-[0.4em] uppercase">scroll</span>
        <span className="block w-px h-8 bg-gradient-to-b from-bone-dim to-transparent animate-shimmer" />
      </motion.div>
    </section>
  );
}

/**
 * Subtle ambient backdrop for an empty hero slot.
 * Pure CSS: animated radial pinks + faint grid.
 * Replace with your AE composition by setting hero.background.kind="video".
 */
function AmbientField() {
  return (
    <div className="absolute inset-0">
      {/* Deep gradient base */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 60% at 78% 50%, rgba(255,46,136,0.16), transparent 60%), radial-gradient(ellipse 40% 50% at 60% 80%, rgba(255,46,136,0.08), transparent 60%), #050505",
        }}
      />
      {/* Faint grid */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          maskImage:
            "radial-gradient(ellipse at center, black 30%, transparent 70%)",
        }}
      />
      {/* Pink diagonal flare */}
      <div
        className="absolute -right-1/4 top-1/3 w-[60vw] h-[60vw] rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(255,46,136,0.18), transparent 60%)" }}
      />
    </div>
  );
}

/**
 * Persistent grid overlay — always rendered, sits above any background
 * (video, image or empty). Preserves the wireframe + faint pink flare
 * that were previously only visible when the slot was empty.
 */
function HeroGrid() {
  return (
    <div className="absolute inset-0 z-[4] pointer-events-none">
      {/* Faint grid */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          maskImage:
            "radial-gradient(ellipse at center, black 30%, transparent 70%)",
        }}
      />
      {/* Pink diagonal flare */}
      <div
        className="absolute -right-1/4 top-1/3 w-[60vw] h-[60vw] rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(255,46,136,0.18), transparent 60%)",
        }}
      />
    </div>
  );
}
