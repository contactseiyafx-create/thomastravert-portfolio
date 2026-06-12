"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { abelian, ABELIAN_BLUE, type AbelianAsset } from "@/data/abelian";
import { getNextProject } from "@/data/projects";
import { HoverReveal, LineReveal } from "@/components/HoverReveal";
import { NextProject } from "@/components/projects/NextProject";

const EASE = [0.16, 1, 0.3, 1] as const;

/* ════════════════════════════════════════════════════════════
   ABELIAN — bespoke editorial case study.
   Portfolio chrome stays pink (structure/nav). Abelian's own
   electric-blue is used as the *client* accent inside content.
   ════════════════════════════════════════════════════════════ */
export default function AbelianCaseStudy() {
  const next = getNextProject("abelian");

  return (
    <article className="abelian-scope">
      {/* brand-accent custom property, scoped to this page only */}
      <style>{`.abelian-scope{--brand:${ABELIAN_BLUE};}`}</style>

      <HeroPlaceholder />
      <Overview />
      <SectionBrand />
      <SectionEducation />
      <SectionHako />
      <SectionEvents />
      <Closing />
      <NextProject next={next} />
    </article>
  );
}

/* ────────────────────────────────────────────────
   HERO — placeholder slot (visual supplied later)
   ──────────────────────────────────────────────── */
function HeroPlaceholder() {
  const m = abelian.meta;
  return (
    <header className="pt-[var(--nav-h)]">
      {/* back row */}
      <div className="page-x flex items-center justify-between pt-10 pb-6">
        <Link
          href="/work"
          className="group inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.22em] text-bone-dim hover:text-signal transition-colors"
        >
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="transition-transform group-hover:-translate-x-0.5">
            <path d="M8 2L2 8M2 8H7M2 8V3" stroke="currentColor" strokeWidth="1.4" />
          </svg>
          BACK TO WORK
        </Link>
        <span className="font-mono text-[11px] tracking-[0.22em] text-bone-muted">
          {m.positionLabel}
        </span>
      </div>

      {/* HERO — real visual when supplied, dashed placeholder otherwise */}
      <div className="page-x">
        {m.hero.enabled ? (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.95, ease: EASE }}
            className="relative w-full overflow-hidden bg-ink-700"
            style={{ aspectRatio: m.hero.ratio ?? "16/9" }}
          >
            <Image
              src={m.hero.src}
              alt={m.hero.alt}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </motion.div>
        ) : (
          <div
            className="relative w-full overflow-hidden border border-dashed border-bone-line grid place-items-center"
            style={{
              aspectRatio: "21/9",
              background:
                "radial-gradient(ellipse 70% 80% at 50% 40%, rgba(61,75,245,0.10), transparent 70%), #08080d",
            }}
          >
            {/* faint grid */}
            <div
              aria-hidden
              className="absolute inset-0 opacity-[0.06]"
              style={{
                backgroundImage:
                  "linear-gradient(to right,#fff 1px,transparent 1px),linear-gradient(to bottom,#fff 1px,transparent 1px)",
                backgroundSize: "64px 64px",
                maskImage:
                  "radial-gradient(ellipse at center, black 30%, transparent 75%)",
              }}
            />
            <div className="relative text-center px-6">
              <span
                className="inline-block w-2 h-2 rounded-full mb-5"
                style={{ background: "var(--brand)" }}
              />
              <p className="font-mono text-[12px] md:text-[13px] tracking-[0.3em] text-bone uppercase">
                [ ABELIAN HERO TO BE ADDED LATER ]
              </p>
              <p className="mt-3 font-mono text-[10px] tracking-[0.24em] text-bone-muted uppercase">
                hero visual slot · supplied by Thomas
              </p>
            </div>
          </div>
        )}
      </div>

      {/* TITLE BLOCK — sits under the hero slot */}
      <div className="page-x pt-12 md:pt-16 grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-8">
          <HoverReveal y={14}>
            <p className="flex items-center gap-3 h-eyebrow">
              <span className="inline-block w-1.5 h-1.5 rounded-full" style={{ background: "var(--brand)" }} />
              {m.category}
            </p>
          </HoverReveal>
          <div className="overflow-hidden mt-4">
            <HoverReveal y={70} delay={0.1}>
              <h1 className="h-display text-[clamp(3.5rem,12vw,11rem)] leading-[0.88] tracking-[-0.03em]">
                {m.title}
              </h1>
            </HoverReveal>
          </div>
          <HoverReveal y={12} delay={0.2}>
            <p className="mt-3 font-mono text-[12px] tracking-[0.2em] text-bone-dim uppercase">
              {m.subtitle}
            </p>
          </HoverReveal>
        </div>

        {/* meta sidebar */}
        <aside className="col-span-12 lg:col-span-4 lg:pl-6 self-end">
          <dl className="grid grid-cols-2 gap-y-6 gap-x-4 border-t border-bone-line pt-6">
            <Meta label="Client" value={m.client} />
            <Meta label="Years" value={m.years} />
            <Meta label="Engagement" value={m.location} />
            <Meta label="Index" value={m.index} />
            <Meta label="Role" value={m.role.join(" · ")} spanFull />
          </dl>
        </aside>
      </div>
    </header>
  );
}

/* ────────────────────────────────────────────────
   OVERVIEW — the thesis
   ──────────────────────────────────────────────── */
function Overview() {
  const o = abelian.overview;
  return (
    <section className="page-x pt-24 md:pt-28 pb-16 mt-16 border-t border-bone-line">
      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-12 lg:col-span-7">
          <HoverReveal y={8}>
            <p className="h-eyebrow-dim">
              <span className="inline-block w-1.5 h-1.5 rounded-full align-middle mr-2" style={{ background: "var(--brand)" }} />
              {o.eyebrow}
            </p>
          </HoverReveal>
          <div className="overflow-hidden mt-6">
            <HoverReveal y={40} delay={0.08}>
              <h2 className="h-display text-[clamp(1.9rem,4.4vw,3.4rem)] leading-[1.02] normal-case lowercase first-letter:uppercase">
                {o.lead}
              </h2>
            </HoverReveal>
          </div>
          <div className="mt-8 space-y-5 max-w-xl">
            {o.body.map((p, i) => (
              <HoverReveal key={i} y={12} delay={0.16 + i * 0.06}>
                <p className="body-lead leading-[1.7]">{p}</p>
              </HoverReveal>
            ))}
          </div>
        </div>

        {/* disciplines list */}
        <div className="col-span-12 lg:col-span-4 lg:col-start-9">
          <HoverReveal y={8}>
            <p className="h-eyebrow-dim">DISCIPLINES</p>
          </HoverReveal>
          <ul className="mt-6 border-t border-bone-line">
            {o.disciplines.map((d, i) => (
              <HoverReveal key={d} y={10} delay={0.08 + i * 0.04}>
                <li className="flex items-center justify-between py-3 border-b border-bone-line">
                  <span className="font-mono text-[12px] tracking-[0.14em] text-bone uppercase">
                    {d}
                  </span>
                  <span className="font-mono text-[10px] tracking-[0.22em] text-bone-muted">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </li>
              </HoverReveal>
            ))}
          </ul>
        </div>
      </div>

      {/* quiet facts row */}
      <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-px bg-bone-line border border-bone-line">
        {o.facts.map((f, i) => (
          <motion.div
            key={f.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.7, delay: i * 0.07, ease: EASE }}
            className="bg-ink p-6 md:p-7"
          >
            <p className="h-display text-[clamp(1.6rem,3vw,2.4rem)] leading-none" style={{ color: "var(--brand)" }}>
              {f.value}
            </p>
            <p className="mt-2 font-mono text-[10px] tracking-[0.2em] text-bone-muted uppercase">
              {f.label}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────
   SECTION 01 — Brand Marketing & Campaigns
   Rhythm: feature opener → masonry-ish mixed grid → motion slot
   ──────────────────────────────────────────────── */
function SectionBrand() {
  const s = abelian.section01;
  return (
    <section className="pt-24 md:pt-28">
      <SectionHead index={s.index} eyebrow={s.eyebrow} title={s.title} intro={s.intro} />

      {/* feature opener — full width */}
      <div className="page-x mt-12">
        <Frame asset={s.feature} priority />
      </div>

      {/* mixed grid: 16:9 cards span 2 cols, square cards 1 col */}
      <div className="page-x mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {s.gallery.map((a, i) => {
          const wide = a.ratio === "16/9" || a.ratio === "21/9";
          return (
            <div key={i} className={wide ? "md:col-span-2" : ""}>
              <Frame asset={a} delay={(i % 2) * 0.08} />
            </div>
          );
        })}
      </div>

      {/* MOTION slot */}
      <div className="page-x mt-10">
        <HoverReveal y={8}>
          <p className="h-eyebrow-dim">
            <span className="inline-block w-1.5 h-1.5 rounded-full align-middle mr-2" style={{ background: "var(--brand)" }} />
            {s.motion.label}
          </p>
        </HoverReveal>
        {s.motion.src ? (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.95, ease: EASE }}
            className="relative mt-6 w-full overflow-hidden bg-ink-700 aspect-video"
          >
            <video
              src={s.motion.src}
              poster={s.motion.poster}
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            />
          </motion.div>
        ) : (
          <div
            className="relative mt-6 w-full overflow-hidden border border-dashed border-bone-line grid place-items-center aspect-video"
            style={{
              background:
                "radial-gradient(ellipse 60% 70% at 50% 50%, rgba(61,75,245,0.10), transparent 70%), #08080d",
            }}
          >
            <div className="text-center px-6">
              <svg width="34" height="34" viewBox="0 0 24 24" fill="none" className="mx-auto mb-4">
                <circle cx="12" cy="12" r="11" stroke="var(--brand)" strokeWidth="1.2" />
                <path d="M10 8.5L16 12L10 15.5V8.5Z" fill="var(--brand)" />
              </svg>
              <p className="font-mono text-[11px] tracking-[0.26em] text-bone uppercase">
                MOTION · TO BE ADDED
              </p>
              <p className="mt-2 font-mono text-[10px] tracking-[0.2em] text-bone-muted">
                {s.motion.filename}
              </p>
            </div>
          </div>
        )}
        <p className="mt-4 font-mono text-[11px] tracking-[0.18em] text-bone-dim uppercase">
          {s.motion.caption}
        </p>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────
   SECTION 02 — Educational & Blog Visuals
   Rhythm: editorial vertical stack, alternating caption sides
   ──────────────────────────────────────────────── */
function SectionEducation() {
  const s = abelian.section02;
  return (
    <section className="pt-24 md:pt-28">
      <SectionHead index={s.index} eyebrow={s.eyebrow} title={s.title} intro={s.intro} />
      <div className="mt-12 space-y-12 md:space-y-16">
        {s.gallery.map((a, i) => (
          <SplitFrame key={i} asset={a} index={i + 1} total={s.gallery.length} reverse={i % 2 === 1} />
        ))}
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────
   SECTION 03 — Hako mascot
   Rhythm: intro + process note + external link → 2x2 grid (placeholders)
   ──────────────────────────────────────────────── */
function SectionHako() {
  const s = abelian.section03;
  return (
    <section className="pt-24 md:pt-28">
      {/* ── section head ── */}
      <div className="page-x">
        <HoverReveal y={8}>
          <p className="flex items-baseline gap-4 h-eyebrow-dim">
            <span className="h-display text-[clamp(2rem,4vw,3rem)] leading-none" style={{ color: "var(--brand)" }}>
              {s.index}
            </span>
            <span>{s.eyebrow}</span>
          </p>
        </HoverReveal>

        <div className="grid grid-cols-12 gap-8 mt-8">
          <div className="col-span-12 lg:col-span-7">
            <div className="overflow-hidden">
              <HoverReveal y={60} delay={0.06}>
                <h2 className="h-display text-[clamp(2.4rem,6.5vw,5.6rem)] leading-[0.9] whitespace-pre-line">
                  {s.title}
                </h2>
              </HoverReveal>
            </div>
            <HoverReveal y={10} delay={0.16}>
              <p className="mt-4 font-mono text-[12px] tracking-[0.24em] uppercase" style={{ color: "var(--brand)" }}>
                {s.role}
              </p>
            </HoverReveal>
          </div>
          <div className="col-span-12 lg:col-span-5 self-end">
            <HoverReveal y={14} delay={0.14}>
              <p className="body-lead leading-[1.7] max-w-md">{s.intro}</p>
            </HoverReveal>
          </div>
        </div>
      </div>

      {/* ── LEAD — turnaround sheet (the introduction) ── */}
      <div className="page-x mt-12">
        <Frame asset={s.lead} priority />
      </div>

      {/* ── SUBSECTION: CHARACTER DESIGN ── */}
      <div className="page-x mt-20 grid grid-cols-12 gap-8">
        <div className="col-span-12 lg:col-span-7">
          <HoverReveal y={8}>
            <p className="h-eyebrow-dim">
              <span className="inline-block w-1.5 h-1.5 rounded-full align-middle mr-2" style={{ background: "var(--brand)" }} />
              {s.character.label}
            </p>
          </HoverReveal>
          <div className="mt-6 space-y-5 max-w-xl">
            {s.character.body.map((p, i) => (
              <HoverReveal key={i} y={12} delay={0.1 + i * 0.06}>
                <p className="body-lead leading-[1.7]">{p}</p>
              </HoverReveal>
            ))}
          </div>
        </div>
        {/* trait chips — the character bible, encoded */}
        <div className="col-span-12 lg:col-span-4 lg:col-start-9">
          <ul className="border-t border-bone-line">
            {s.character.traits.map((t, i) => (
              <HoverReveal key={t.label} y={10} delay={0.1 + i * 0.05}>
                <li className="py-4 border-b border-bone-line">
                  <span className="font-mono text-[10px] tracking-[0.22em] uppercase" style={{ color: "var(--brand)" }}>
                    {t.label}
                  </span>
                  <span className="mt-1.5 block font-mono text-[12px] tracking-[0.1em] text-bone uppercase leading-[1.5]">
                    {t.value}
                  </span>
                </li>
              </HoverReveal>
            ))}
          </ul>
        </div>
      </div>

      {/* ── SUBSECTION: SOCIAL MEDIA CAMPAIGNS ── */}
      <div className="page-x mt-20">
        <HoverReveal y={8}>
          <p className="h-eyebrow-dim">
            <span className="inline-block w-1.5 h-1.5 rounded-full align-middle mr-2" style={{ background: "var(--brand)" }} />
            {s.social.label}
          </p>
        </HoverReveal>
        <HoverReveal y={12} delay={0.1}>
          <p className="mt-5 body-lead leading-[1.7] max-w-2xl">{s.social.body}</p>
        </HoverReveal>
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl">
          {s.social.gallery.map((a, i) => (
            <Frame key={i} asset={a} delay={i * 0.1} />
          ))}
        </div>
      </div>

      {/* ── SUBSECTION: AI-ASSISTED CONTENT PRODUCTION ── */}
      <div className="pt-20">
        <div className="page-x">
          <HoverReveal y={8}>
            <p className="h-eyebrow-dim">
              <span className="inline-block w-1.5 h-1.5 rounded-full align-middle mr-2" style={{ background: "var(--brand)" }} />
              {s.ai.label}
            </p>
          </HoverReveal>
          <div className="mt-5 grid grid-cols-12 gap-8">
            <div className="col-span-12 lg:col-span-8 space-y-5 max-w-2xl">
              {s.ai.body.map((p, i) => (
                <HoverReveal key={i} y={12} delay={0.1 + i * 0.06}>
                  <p className="body-lead leading-[1.7]">{p}</p>
                </HoverReveal>
              ))}
            </div>
          </div>
        </div>
        <div className="page-x mt-10">
          <Frame asset={s.ai.feature} />
        </div>
      </div>

      {/* ── SUBSECTION: MOTION & CONTENT — Hako as a content platform ── */}
      <div className="pt-24">
        <div className="page-x">
          <HoverReveal y={8}>
            <p className="h-eyebrow-dim">
              <span className="inline-block w-1.5 h-1.5 rounded-full align-middle mr-2" style={{ background: "var(--brand)" }} />
              {s.motion.label}
            </p>
          </HoverReveal>
          <div className="grid grid-cols-12 gap-8 mt-7">
            <div className="col-span-12 lg:col-span-7">
              <div className="overflow-hidden">
                <HoverReveal y={50} delay={0.06}>
                  <h3 className="h-display text-[clamp(2.1rem,5vw,4rem)] leading-[0.92] whitespace-pre-line">
                    {s.motion.title}
                  </h3>
                </HoverReveal>
              </div>
            </div>
            <div className="col-span-12 lg:col-span-5 self-end space-y-4">
              {s.motion.body.map((p, i) => (
                <HoverReveal key={i} y={12} delay={0.12 + i * 0.06}>
                  <p className="body-lead leading-[1.7] max-w-md">{p}</p>
                </HoverReveal>
              ))}
            </div>
          </div>
        </div>

        {/* immersive featured video — full bleed within the gutter */}
        <div className="page-x mt-12">
          <motion.figure
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 1, ease: EASE }}
            className="m-0"
          >
            <div className="relative w-full overflow-hidden bg-ink-700 aspect-video">
              <video
                src={s.motion.video.src}
                poster={s.motion.video.poster}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                aria-label={s.motion.video.caption}
                className="absolute inset-0 w-full h-full object-cover"
              />
              {/* subtle inner edge to seat the bright video in the dark page */}
              <span
                aria-hidden
                className="absolute inset-0 pointer-events-none"
                style={{ boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.06)" }}
              />
            </div>
            <figcaption className="mt-4 flex items-start gap-3">
              <span className="block w-6 h-px mt-2 shrink-0" style={{ background: "var(--brand)" }} />
              <span>
                <span className="block font-mono text-[10px] tracking-[0.24em] uppercase" style={{ color: "var(--brand)" }}>
                  {s.motion.video.kicker}
                </span>
                <span className="block mt-1 font-mono text-[11px] tracking-[0.14em] text-bone-dim uppercase leading-[1.5]">
                  {s.motion.video.caption}
                </span>
              </span>
            </figcaption>
          </motion.figure>
        </div>
      </div>

      {/* ── COMMUNITY CTA ── */}
      <div className="page-x mt-24">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.9, ease: EASE }}
          className="relative overflow-hidden border border-bone-line"
          style={{
            background:
              "radial-gradient(ellipse 60% 120% at 85% 50%, rgba(61,75,245,0.16), transparent 60%), #0a0a12",
          }}
        >
          <div className="relative grid grid-cols-12 gap-6 items-center p-8 md:p-12">
            <div className="col-span-12 md:col-span-8">
              <p className="h-eyebrow-dim">
                <span className="inline-block w-1.5 h-1.5 rounded-full align-middle mr-2" style={{ background: "var(--brand)" }} />
                {s.community.eyebrow}
              </p>
              <h3 className="mt-5 h-display text-[clamp(2rem,4.5vw,3.4rem)] leading-[0.95] normal-case">
                {s.community.title}
              </h3>
              <p className="mt-4 body-lead max-w-md">{s.community.body}</p>
            </div>
            <div className="col-span-12 md:col-span-4 md:flex md:justify-end">
              <a
                href={s.community.button.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 px-6 py-4 transition-colors"
                style={{ background: "var(--brand)" }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="#fff">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                <span className="font-mono text-[12px] tracking-[0.2em] uppercase text-white">
                  {s.community.button.label}
                </span>
                <svg width="11" height="11" viewBox="0 0 10 10" fill="none" className="text-white/80 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  <path d="M2 8L8 2M8 2H3M8 2V7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="square" />
                </svg>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────
   EVENTS — onsite (two vertical 9:16 frames side by side)
   ──────────────────────────────────────────────── */
function SectionEvents() {
  const s = abelian.events;
  return (
    <section className="pt-24 md:pt-28">
      <SectionHead index={s.index} eyebrow={s.eyebrow} title={s.title} intro={s.intro} />
      <div className="page-x mt-12 grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl">
        {s.gallery.map((a, i) => (
          <Frame key={i} asset={a} delay={i * 0.1} />
        ))}
      </div>

      {/* event film — PQBD 2025 recap */}
      {s.motion?.src && (
        <div className="page-x mt-12">
          <HoverReveal y={8}>
            <p className="h-eyebrow-dim">
              <span className="inline-block w-1.5 h-1.5 rounded-full align-middle mr-2" style={{ background: "var(--brand)" }} />
              {s.motion.label}
            </p>
          </HoverReveal>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.95, ease: EASE }}
            className="relative mt-6 w-full overflow-hidden bg-ink-700 aspect-video"
          >
            <video
              src={s.motion.src}
              poster={s.motion.poster}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </motion.div>
          <p className="mt-4 font-mono text-[11px] tracking-[0.18em] text-bone-dim uppercase">
            {s.motion.caption}
          </p>
        </div>
      )}
    </section>
  );
}

/* ────────────────────────────────────────────────
   CLOSING — outcome quote
   ──────────────────────────────────────────────── */
function Closing() {
  const c = abelian.closing;
  return (
    <section className="page-x pt-28 pb-28">
      <div className="border-t border-bone-line pt-16 max-w-4xl">
        <HoverReveal y={8}>
          <p className="h-eyebrow-dim">
            <span className="inline-block w-1.5 h-1.5 rounded-full align-middle mr-2" style={{ background: "var(--brand)" }} />
            {c.eyebrow}
          </p>
        </HoverReveal>
        <div className="overflow-hidden mt-6">
          <HoverReveal y={40} delay={0.08}>
            <p className="h-display text-[clamp(1.7rem,3.6vw,2.9rem)] leading-[1.08] normal-case">
              {c.quote}
            </p>
          </HoverReveal>
        </div>
        <HoverReveal y={12} delay={0.2}>
          <p className="mt-6 font-mono text-[11px] tracking-[0.24em] uppercase" style={{ color: "var(--brand)" }}>
            {c.attribution}
          </p>
        </HoverReveal>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════
   SHARED PIECES
   ════════════════════════════════════════════════ */

function SectionHead({
  index,
  eyebrow,
  title,
  intro,
}: {
  index: string;
  eyebrow: string;
  title: string;
  intro: string;
}) {
  return (
    <div className="page-x">
      <HoverReveal y={8}>
        <p className="flex items-baseline gap-4 h-eyebrow-dim">
          <span className="h-display text-[clamp(2rem,4vw,3rem)] leading-none" style={{ color: "var(--brand)" }}>
            {index}
          </span>
          <span>{eyebrow}</span>
        </p>
      </HoverReveal>
      <div className="grid grid-cols-12 gap-8 mt-8">
        <div className="col-span-12 lg:col-span-7">
          <div className="overflow-hidden">
            <HoverReveal y={60} delay={0.06}>
              <h2 className="h-display text-[clamp(2.6rem,7vw,6rem)] leading-[0.9] whitespace-pre-line">
                {title}
              </h2>
            </HoverReveal>
          </div>
        </div>
        <div className="col-span-12 lg:col-span-5 self-end">
          <HoverReveal y={14} delay={0.14}>
            <p className="body-lead leading-[1.7] max-w-md">{intro}</p>
          </HoverReveal>
        </div>
      </div>
    </div>
  );
}

/* A single image frame with kicker + caption; falls back to an
   on-brand placeholder if the asset file is missing. */
function Frame({
  asset,
  priority = false,
  delay = 0,
  fallbackLabel = "ASSET · TO BE ADDED",
}: {
  asset: AbelianAsset;
  priority?: boolean;
  delay?: number;
  fallbackLabel?: string;
}) {
  return (
    <motion.figure
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8%" }}
      transition={{ duration: 0.9, delay, ease: EASE }}
    >
      <div
        className="relative w-full overflow-hidden bg-ink-700 group"
        style={{ aspectRatio: asset.ratio ?? "16/9" }}
      >
        <Image
          src={asset.src}
          alt={asset.alt}
          fill
          priority={priority}
          sizes="(min-width:1024px) 50vw, 100vw"
          className="object-cover transition-transform duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
        />
      </div>
      {(asset.kicker || asset.caption) && (
        <figcaption className="mt-3 flex items-start gap-3">
          <span className="block w-6 h-px mt-2 shrink-0" style={{ background: "var(--brand)" }} />
          <span>
            {asset.kicker && (
              <span className="block font-mono text-[10px] tracking-[0.24em] uppercase" style={{ color: "var(--brand)" }}>
                {asset.kicker}
              </span>
            )}
            {asset.caption && (
              <span className="block mt-1 font-mono text-[11px] tracking-[0.14em] text-bone-dim uppercase leading-[1.5]">
                {asset.caption}
              </span>
            )}
          </span>
        </figcaption>
      )}
    </motion.figure>
  );
}

/* Editorial split: large image + caption column, alternating side. */
function SplitFrame({
  asset,
  index,
  total,
  reverse,
}: {
  asset: AbelianAsset;
  index: number;
  total: number;
  reverse: boolean;
}) {
  return (
    <figure className="page-x">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-end">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.9, ease: EASE }}
          className={[
            "lg:col-span-8 relative overflow-hidden bg-ink-700 group",
            reverse ? "lg:order-2" : "lg:order-1",
          ].join(" ")}
          style={{ aspectRatio: asset.ratio ?? "16/9" }}
        >
          <Image
            src={asset.src}
            alt={asset.alt}
            fill
            sizes="(min-width:1024px) 66vw, 100vw"
            className="object-cover transition-transform duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
          />
        </motion.div>

        <div
          className={[
            "lg:col-span-3 flex flex-col justify-end gap-4",
            reverse ? "lg:order-1" : "lg:order-2",
          ].join(" ")}
        >
          <HoverReveal y={10}>
            <span className="font-mono text-[10px] tracking-[0.22em]" style={{ color: "var(--brand)" }}>
              {String(index).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </span>
          </HoverReveal>
          {asset.kicker && (
            <HoverReveal y={12} delay={0.06}>
              <span className="font-mono text-[10px] tracking-[0.24em] text-bone-muted uppercase">
                {asset.kicker}
              </span>
            </HoverReveal>
          )}
          <HoverReveal y={14} delay={0.1}>
            <p className="font-mono text-[12px] tracking-[0.14em] text-bone uppercase leading-[1.6]">
              {asset.caption ?? asset.alt}
            </p>
          </HoverReveal>
          <HoverReveal y={6} delay={0.16}>
            <span className="block w-10 h-px" style={{ background: "var(--brand)" }} />
          </HoverReveal>
        </div>
      </div>
    </figure>
  );
}

function Meta({
  label,
  value,
  spanFull = false,
}: {
  label: string;
  value: string;
  spanFull?: boolean;
}) {
  return (
    <div className={spanFull ? "col-span-2" : ""}>
      <dt className="font-mono text-[10px] tracking-[0.22em] text-bone-muted uppercase">{label}</dt>
      <dd className="mt-2 font-sans text-[13.5px] text-bone leading-snug">{value}</dd>
    </div>
  );
}
