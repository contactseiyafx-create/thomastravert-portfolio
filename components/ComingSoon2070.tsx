"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { pages } from "@/data/pages";
import { useLanguage } from "@/components/LanguageProvider";

/* Locked palette per the brief — also exposed for any consumer that wants them. */
const BG = "#002048";
const ACCENT = "#D996C5";

/* Shared easing — premium, no glitch */
const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * 2070 — COMING SOON
 * ────────────────────────────────────────────────
 * Fullscreen, minimal, premium editorial.
 * Solid #002048 background, #D996C5 accent typography & UI.
 * No image, no character, no gradient, no particles.
 *
 * Editable in /data/pages.ts → twentySeventy.
 */
export function ComingSoon2070() {
  const p = pages.twentySeventy;
  const { t } = useLanguage();

  return (
    <section
      aria-label="2070 — coming soon"
      className="relative w-full min-h-screen flex flex-col"
      style={{ backgroundColor: BG, color: ACCENT }}
    >
      {/* ─── thin top + bottom frame lines ─── */}
      <motion.span
        aria-hidden
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.4, delay: 0.1, ease: EASE }}
        className="absolute top-0 left-0 right-0 h-px origin-left"
        style={{ backgroundColor: ACCENT, opacity: 0.4 }}
      />
      <motion.span
        aria-hidden
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.4, delay: 0.15, ease: EASE }}
        className="absolute bottom-0 left-0 right-0 h-px origin-right"
        style={{ backgroundColor: ACCENT, opacity: 0.4 }}
      />

      {/* ─── corner marks ─── */}
      <CornerMark className="top-6 left-6" position="tl" />
      <CornerMark className="top-6 right-6" position="tr" />
      <CornerMark className="bottom-6 left-6" position="bl" />
      <CornerMark className="bottom-6 right-6" position="br" />

      {/* ─── top labels ─── */}
      <header className="relative pt-[calc(var(--nav-h)+24px)] px-8 md:px-14 flex items-start justify-between">
        <MicroLabel delay={0.35}>{t("twenty.archive")}</MicroLabel>
        <MicroLabel delay={0.45} align="right">
          {t("twenty.section")}
        </MicroLabel>
      </header>

      {/* ─── centre block ─── */}
      <div className="flex-1 flex items-center justify-center px-6 md:px-10 py-12">
        <div className="text-center max-w-3xl">
          {/* Massive 2070 — staggered letters */}
          <div className="overflow-hidden">
            <h1
              className="
                h-display font-display
                text-[clamp(7rem,22vw,18rem)]
                leading-[0.85] tracking-[-0.04em]
              "
              style={{ color: ACCENT }}
              aria-label={p.title}
            >
              <LetterStagger text={p.title} delay={0.45} />
            </h1>
          </div>

          {/* COMING SOON — micro tracked */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.95, ease: EASE }}
            className="
              mt-6 md:mt-8
              font-mono text-[12px] md:text-[13px]
              tracking-[0.55em] uppercase
            "
            style={{ color: ACCENT }}
          >
            {t("twenty.subtitle")}
          </motion.p>

          {/* Japanese line */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.1, ease: EASE }}
            className="font-jp text-lg md:text-2xl tracking-[0.4em] mt-5"
            style={{ color: ACCENT, opacity: 0.85 }}
          >
            {t("twenty.titleJp")}
          </motion.p>

          {/* Separator dot row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.25, ease: EASE }}
            className="flex items-center justify-center gap-2.5 mt-8"
          >
            {Array.from({ length: 5 }).map((_, i) => (
              <span
                key={i}
                className="block w-1 h-1 rounded-full"
                style={{
                  backgroundColor: ACCENT,
                  opacity: i === 2 ? 1 : 0.35,
                }}
              />
            ))}
          </motion.div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.35, ease: EASE }}
            className="
              mt-8 font-mono text-[11px] md:text-[12px]
              tracking-[0.32em] uppercase
            "
            style={{ color: ACCENT, opacity: 0.7 }}
          >
            {t("twenty.tagline")}
          </motion.p>

          {/* Return button */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.55, ease: EASE }}
            className="mt-12 md:mt-14 flex justify-center"
          >
            <ReturnButton href={p.cta.href} label={t("twenty.cta")} />
          </motion.div>
        </div>
      </div>

      {/* ─── bottom labels ─── */}
      <footer className="relative pb-7 px-8 md:px-14 flex items-end justify-between gap-6">
        <MicroLabel delay={1.7}>
          <span
            className="inline-block w-1.5 h-1.5 rounded-full mr-2.5 align-middle"
            style={{
              backgroundColor: ACCENT,
              animation: "shimmer 2.4s ease-in-out infinite",
            }}
          />
          {t("twenty.status")}
        </MicroLabel>
        <MicroLabel delay={1.8} align="right">
          {t("twenty.location")}
        </MicroLabel>
      </footer>
    </section>
  );
}

/* ─────────────────────────────────────────────
   BITS
   ───────────────────────────────────────────── */

function MicroLabel({
  children,
  align = "left",
  delay = 0,
}: {
  children: React.ReactNode;
  align?: "left" | "right";
  delay?: number;
}) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay, ease: EASE }}
      className={[
        "font-mono text-[10px] md:text-[11px] tracking-[0.32em] uppercase whitespace-nowrap",
        align === "right" ? "text-right" : "text-left",
      ].join(" ")}
      style={{ color: ACCENT, opacity: 0.85 }}
    >
      {children}
    </motion.span>
  );
}

function LetterStagger({ text, delay = 0 }: { text: string; delay?: number }) {
  // Letter-by-letter reveal — subtle, no bounce.
  return (
    <span aria-hidden className="inline-block">
      {text.split("").map((ch, i) => (
        <motion.span
          key={`${ch}-${i}`}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            duration: 0.95,
            delay: delay + i * 0.08,
            ease: EASE,
          }}
          className="inline-block"
          style={{ willChange: "transform, opacity" }}
        >
          {ch}
        </motion.span>
      ))}
    </span>
  );
}

function ReturnButton({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="
        group relative inline-flex items-center gap-5
        px-7 py-4 border overflow-hidden
        transition-colors duration-500
      "
      style={{
        borderColor: ACCENT,
        color: ACCENT,
      }}
    >
      <span
        className="font-mono text-[11px] tracking-[0.32em] uppercase relative z-10"
        style={{ color: ACCENT }}
      >
        {label}
      </span>
      <svg
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
        aria-hidden
        className="relative z-10 transition-transform duration-500 group-hover:-translate-x-1"
      >
        <path
          d="M11 7H3M3 7L6 4M3 7L6 10"
          stroke={ACCENT}
          strokeWidth="1.4"
          strokeLinecap="square"
        />
      </svg>
      {/* Subtle hover fill — soft, no flash */}
      <span
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-10 transition-opacity duration-500"
        style={{ backgroundColor: ACCENT }}
      />
    </Link>
  );
}

function CornerMark({
  className = "",
  position,
}: {
  className?: string;
  position: "tl" | "tr" | "bl" | "br";
}) {
  // Two perpendicular short lines making an L at each corner — pure CSS, no gradients.
  const v: Record<typeof position, string> = {
    tl: "top-0 left-0",
    tr: "top-0 right-0",
    bl: "bottom-0 left-0",
    br: "bottom-0 right-0",
  };
  const h: Record<typeof position, string> = {
    tl: "top-0 left-0",
    tr: "top-0 right-0",
    bl: "bottom-0 left-0",
    br: "bottom-0 right-0",
  };
  return (
    <motion.span
      aria-hidden
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 0.25, ease: EASE }}
      className={`absolute w-8 h-8 ${className}`}
    >
      <span
        className={`absolute w-px h-5 ${v[position]}`}
        style={{ backgroundColor: ACCENT, opacity: 0.6 }}
      />
      <span
        className={`absolute h-px w-5 ${h[position]}`}
        style={{ backgroundColor: ACCENT, opacity: 0.6 }}
      />
    </motion.span>
  );
}
