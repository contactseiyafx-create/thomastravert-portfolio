"use client";

import { services } from "@/data/services";
import { ServicesHero } from "./ServicesHero";
import { ServiceCard, CompactCard } from "./ServiceCard";
import { Signature2070Card } from "./Signature2070Card";
import { ProcessSection } from "./ProcessSection";
import { CTASection } from "./CTASection";

/**
 * SERVICES PAGE — composition
 * ────────────────────────────────────────────────
 * Layout follows Service.png exactly:
 *
 *  lg+ split:
 *   ┌────────────────────────────────┬─────────────────┐
 *   │ Hero (3 metadata cols)         │                 │
 *   │ ──────────────────────────────  │  Signature      │
 *   │ Grid 01 · 02 · 03 (3 cards)    │  2070 Visuals   │
 *   │ ──────────────────────────────  │  (full height,  │
 *   │ Partnership · Consulting       │   cyber UI)     │
 *   └────────────────────────────────┴─────────────────┘
 *
 *   below (full-width):
 *   • PROCESS — HOW I WORK (4 steps)
 *   • CTA — LET'S CREATE SOMETHING THAT MOVES.
 *
 *  Mobile / tablet:
 *   Everything stacks in document order; the signature card sits between
 *   the main grid and the partnership row so it stays prominent.
 */
export default function ServicesClient() {
  return (
    <div className="pt-[var(--nav-h)] pb-32">
      <div className="page-x pt-12 md:pt-16">
        {/* ════════ TOP SPLIT — left stack + right signature card ════════ */}
        <div className="grid grid-cols-12 gap-4 md:gap-6">
          {/* LEFT COLUMN ─────────────────────────────── */}
          <div className="col-span-12 lg:col-span-7 flex flex-col gap-4 md:gap-6">
            {/* Hero */}
            <ServicesHero />

            {/* 3-card primary grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 mt-2">
              {services.grid.map((card, i) => (
                <ServiceCard key={card.index} card={card} i={i} />
              ))}
            </div>

            {/* Partnership + Consulting row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
              <CompactCard card={services.partnership} i={0} />
              <CompactCard card={services.consulting} i={1} />
            </div>
          </div>

          {/* RIGHT COLUMN — Signature 2070 ─────────────── */}
          <div className="col-span-12 lg:col-span-5">
            {/*
              On lg+, sticky-ish: keep the signature card visible alongside
              the entire left stack. Its inner content is tall enough to
              span the whole stack naturally.
            */}
            <div className="h-full min-h-[860px] lg:min-h-[1180px]">
              <Signature2070Card />
            </div>
          </div>
        </div>

        {/* ════════ PROCESS ════════ */}
        <div className="mt-24 md:mt-32">
          <ProcessSection />
        </div>

        {/* ════════ CTA ════════ */}
        <CTASection />
      </div>
    </div>
  );
}
