"use client";

import { motion } from "framer-motion";
import { services } from "@/data/services";
import { HoverReveal } from "@/components/HoverReveal";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * SERVICES HERO
 * ────────────────────────────────────────────────
 * Three-column editorial header on desktop:
 *   ┌──────────────────────┬─────────────────────┬───────────────────┐
 *   │ MASSIVE "SERVICES"   │ Pink accent eyebrow │ Right meta block  │
 *   │ (col 1, dominant)    │ + JP tagline (col 2)│ + reticle (col 3) │
 *   └──────────────────────┴─────────────────────┴───────────────────┘
 * Wraps on tablet/mobile.
 */
export function ServicesHero() {
  const h = services.hero;

  return (
    <header className="relative">
      <div className="grid grid-cols-12 gap-6 lg:gap-10 items-start">
        {/* COL 1 — massive title */}
        <div className="col-span-12 lg:col-span-6 overflow-hidden">
          <motion.h1
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.1, ease: EASE }}
            className="h-display leading-[0.85] tracking-[-0.04em] text-bone"
            style={{ fontSize: "clamp(4rem, 12vw, 11rem)" }}
          >
            {h.title}
          </motion.h1>
        </div>

        {/* COL 2 — pink eyebrow + intro + jp tagline */}
        <div className="col-span-12 md:col-span-6 lg:col-span-4 pt-3 lg:pt-6">
          <HoverReveal y={10} delay={0.2}>
            <p
              className="font-mono text-[11px] md:text-[12px] tracking-[0.22em] text-signal uppercase leading-[1.7] whitespace-pre-line"
            >
              {h.eyebrow}
            </p>
          </HoverReveal>
          <HoverReveal y={10} delay={0.3}>
            <p className="mt-5 font-mono text-[11px] md:text-[12px] tracking-[0.22em] text-bone uppercase leading-[1.7] whitespace-pre-line">
              {h.intro}
            </p>
          </HoverReveal>
          <HoverReveal y={10} delay={0.42}>
            <p className="mt-5 font-jp text-[13px] tracking-[0.14em] text-bone-dim">
              {h.jpTagline}
            </p>
          </HoverReveal>
        </div>

        {/* COL 3 — metadata + reticle */}
        <div className="col-span-12 md:col-span-6 lg:col-span-2 pt-3 lg:pt-6 relative">
          {/* Tiny reticle (top-right of the hero) */}
          <span
            aria-hidden
            className="hidden lg:block absolute -top-2 right-0"
          >
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <circle cx="11" cy="11" r="3" stroke="currentColor" strokeWidth="0.7" className="text-bone-dim" />
              <line x1="0" y1="11" x2="22" y2="11" stroke="currentColor" strokeWidth="0.5" className="text-bone-muted" />
              <line x1="11" y1="0" x2="11" y2="22" stroke="currentColor" strokeWidth="0.5" className="text-bone-muted" />
            </svg>
          </span>

          <div className="space-y-5">
            {h.meta.map((m, i) => (
              <HoverReveal key={i} y={8} delay={0.34 + i * 0.06}>
                <div>
                  <p className="font-mono text-[10px] tracking-[0.22em] text-bone-muted uppercase">
                    {m.label}
                  </p>
                  <p className="mt-1 font-mono text-[11px] tracking-[0.18em] text-bone uppercase">
                    {m.value}
                  </p>
                  {m.jp && (
                    <p className="mt-1 font-jp text-[11px] tracking-[0.14em] text-bone-dim">
                      {m.jp}
                    </p>
                  )}
                </div>
              </HoverReveal>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
