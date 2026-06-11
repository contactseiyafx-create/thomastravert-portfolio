"use client";

import { motion } from "framer-motion";
import { services } from "@/data/services";

/* Dedicated palette for this card only — locked per brief */
const BG = "#002048";
const ACCENT = "#D996C5";
const WHITE = "#ffffff";

/**
 * SIGNATURE 2070 CARD
 * ────────────────────────────────────────────────
 * Flagship offering. Visually distinct from the standard service cards.
 * Cyber-UI editorial framing: corner brackets, vertical Japanese, barcode
 * strips, target reticles, archive markers — all built from typography
 * and CSS shapes, no imagery.
 */
export function Signature2070Card() {
  const s = services.signature;

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full h-full overflow-hidden"
      style={{ backgroundColor: BG, color: ACCENT }}
      aria-labelledby="signature-2070-title"
    >
      {/* Invisible link overlay — entire signature card becomes the CTA.
          Sits above background decorations but below the vertical Japanese
          strip / corner markers, which use higher z-index when needed. */}
      {s.cta?.href && (
        <a
          href={s.cta.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${s.cta.label} — ${s.title} (Signature Package)`}
          className="absolute inset-0 z-20 focus:outline-none focus-visible:ring-1"
          style={{ outlineColor: ACCENT }}
        />
      )}
      {/* ─── CORNER BRACKETS ─── */}
      <CornerBrackets />

      {/* ─── TOP-LEFT TRIANGLE MARK ─── */}
      <span
        aria-hidden
        className="absolute top-3 left-3"
        style={{
          width: 0,
          height: 0,
          borderLeft: `8px solid ${ACCENT}`,
          borderTop: `8px solid ${ACCENT}`,
          borderRight: "8px solid transparent",
          borderBottom: "8px solid transparent",
          opacity: 0.9,
        }}
      />

      {/* ─── TOP RIGHT — globe reticle ─── */}
      <CircleReticle className="absolute top-6 right-7" />

      {/* ─── BOTTOM RIGHT — same reticle, mirrored ─── */}
      <CircleReticle className="absolute bottom-6 right-7" />

      {/* ─── BOTTOM RIGHT — plus crosshair ─── */}
      <PlusMark className="absolute bottom-1/3 right-12" />

      {/* ─── VERTICAL BARCODE STRIPS — top right ─── */}
      <Barcode className="absolute top-32 right-14" />

      {/* ─── VERTICAL BARCODE STRIPS — middle right ─── */}
      <Barcode className="absolute top-1/2 right-14" tall />

      {/* ─── HALF-CIRCLE FRAME LINES — top right ─── */}
      <FrameLinesTopRight />

      {/* ─── HALF-CIRCLE FRAME LINES — bottom right ─── */}
      <FrameLinesBottomRight />

      {/* ─── ARCHIVE LABEL TOP ─── */}
      <p
        className="absolute top-8 left-1/4 font-mono text-[10px] tracking-[0.32em] uppercase whitespace-nowrap"
        style={{ color: ACCENT }}
      >
        {s.archiveLabel}
      </p>

      {/* ─── CONTENT GRID ─── */}
      <div className="relative h-full grid grid-cols-12 gap-4 md:gap-6 px-8 md:px-10 lg:px-12 py-10 md:py-12">
        {/* LEFT BLOCK — index + title + body */}
        <div className="col-span-12 lg:col-span-8 relative flex flex-col">
          {/* Big "04" */}
          <p
            className="font-display leading-[0.85] tracking-[-0.04em]"
            style={{
              fontSize: "clamp(5rem, 11vw, 9rem)",
              color: ACCENT,
            }}
          >
            {s.index}
            <span className="inline-block ml-3 align-middle" aria-hidden>
              <span
                className="inline-block h-[0.08em] align-middle"
                style={{ width: "0.7em", backgroundColor: ACCENT }}
              />
            </span>
          </p>

          {/* 2070 VISUALS */}
          <h2
            id="signature-2070-title"
            className="font-display leading-[0.9] tracking-[-0.02em] mt-2"
            style={{
              fontSize: "clamp(3rem, 7vw, 5.5rem)",
              color: ACCENT,
            }}
          >
            {s.title}
          </h2>

          {/* Signature pill */}
          <div className="mt-7 inline-flex flex-col gap-2">
            <span
              className="inline-flex self-start px-5 py-3 border font-display"
              style={{
                borderColor: ACCENT,
                color: ACCENT,
                fontSize: "clamp(1.1rem, 1.5vw, 1.4rem)",
                letterSpacing: "0.04em",
              }}
            >
              {s.pill}
            </span>
            <span
              className="font-jp text-sm tracking-[0.18em]"
              style={{ color: ACCENT, opacity: 0.9 }}
            >
              {s.pillJp}
            </span>
          </div>

          {/* Lead + body lines */}
          <p
            className="mt-8 text-[15px] md:text-base"
            style={{ color: WHITE, opacity: 0.95 }}
          >
            {s.lead}
          </p>
          <div className="mt-4 space-y-1.5">
            {s.body.map((line) => (
              <p
                key={line}
                className="text-[14.5px] md:text-[15px] leading-relaxed"
                style={{ color: WHITE, opacity: 0.85 }}
              >
                {line}
              </p>
            ))}
          </div>

          {/* INCLUDES — two-col bullet list */}
          <div className="mt-9">
            <p
              className="font-mono text-[11px] tracking-[0.24em] mb-4"
              style={{ color: ACCENT }}
            >
              INCLUDES:
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2.5">
              {s.includes.map((it) => (
                <li
                  key={it}
                  className="flex items-start gap-3 text-[13.5px]"
                  style={{ color: WHITE }}
                >
                  <span
                    className="block w-1 h-1 rounded-full mt-2 shrink-0"
                    style={{ backgroundColor: ACCENT }}
                  />
                  <span>{it}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* PRICE — bottom-left */}
          <div className="mt-auto pt-12">
            <p
              className="font-mono text-[11px] tracking-[0.24em]"
              style={{ color: ACCENT }}
            >
              {s.priceLabel}
            </p>
            <p
              className="font-display leading-none mt-2"
              style={{
                fontSize: "clamp(2.5rem, 5vw, 4rem)",
                color: ACCENT,
              }}
            >
              {s.price}
            </p>
            {s.priceSecondary && (
              <p
                className="mt-2 font-mono text-[11px] tracking-[0.16em]"
                style={{ color: ACCENT, opacity: 0.7 }}
              >
                {s.priceSecondary}
              </p>
            )}
          </div>
        </div>

        {/* RIGHT BLOCK — cyber UI info panels */}
        <div className="col-span-12 lg:col-span-4 relative flex flex-col">
          {/* Exclusive system block */}
          <div
            className="pl-5 pr-2 py-3 border-l"
            style={{ borderColor: ACCENT, marginTop: "10px" }}
          >
            <p
              className="font-mono text-[11px] tracking-[0.22em] uppercase leading-snug whitespace-pre-line"
              style={{ color: ACCENT }}
            >
              {s.cornerBlock.heading}
            </p>
            <p
              className="font-jp text-[11px] tracking-[0.14em] mt-1"
              style={{ color: ACCENT, opacity: 0.85 }}
            >
              {s.cornerBlock.headingJp}
            </p>
          </div>

          <div
            className="pl-5 pr-2 py-3 border-l mt-3"
            style={{ borderColor: ACCENT }}
          >
            <p
              className="font-mono text-[11px] tracking-[0.22em] uppercase"
              style={{ color: ACCENT }}
            >
              {s.cornerBlock.secondary}
            </p>
            <p
              className="font-jp text-[11px] tracking-[0.14em] mt-1"
              style={{ color: ACCENT, opacity: 0.85 }}
            >
              {s.cornerBlock.secondaryJp}
            </p>
          </div>

          {/* Side markers — vertical stack of words */}
          <div className="mt-12 ml-5 space-y-1">
            {s.sideMarkers.map((m) => (
              <p
                key={m}
                className="font-mono text-[11px] tracking-[0.24em]"
                style={{ color: ACCENT }}
              >
                {m}
              </p>
            ))}
          </div>

          {/* Bottom archive label */}
          <div className="mt-auto pt-12">
            <p
              className="font-mono text-[10px] tracking-[0.28em] uppercase"
              style={{ color: ACCENT }}
            >
              {s.footerLabel}
            </p>
            <p
              className="font-mono text-[10px] tracking-[0.24em] uppercase mt-1"
              style={{ color: ACCENT, opacity: 0.7 }}
            >
              {s.footerSubLabel}
            </p>
            {/* hatched bar — pure CSS */}
            <span
              aria-hidden
              className="block mt-2 h-3 w-32"
              style={{
                backgroundImage: `repeating-linear-gradient(135deg, ${ACCENT} 0 2px, transparent 2px 6px)`,
                opacity: 0.7,
              }}
            />
          </div>
        </div>

        {/* ─── Vertical Japanese strip — far right ─── */}
        <div
          aria-hidden
          className="hidden md:flex flex-col items-center gap-6 absolute top-1/2 right-4 -translate-y-1/2 pointer-events-none"
        >
          {s.verticalJp.map((char, i) => (
            <span
              key={i}
              className="font-jp text-[12px] tracking-[0.18em]"
              style={{
                writingMode: "vertical-rl",
                color: ACCENT,
                opacity: i === s.verticalJp.length - 1 ? 1 : 0.85,
                fontWeight: i === s.verticalJp.length - 1 ? 700 : 400,
              }}
            >
              {char}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}

/* ─────────────────────────────────────────────
   CYBER UI BITS
   ───────────────────────────────────────────── */

function CornerBrackets() {
  // L-shape brackets at each corner, drawn as two perpendicular lines.
  const corners: Array<["t" | "b", "l" | "r"]> = [
    ["t", "l"],
    ["t", "r"],
    ["b", "l"],
    ["b", "r"],
  ];
  return (
    <>
      {corners.map(([v, h]) => {
        const pos = `${v === "t" ? "top-0" : "bottom-0"} ${
          h === "l" ? "left-0" : "right-0"
        }`;
        const vBar = `${v === "t" ? "top-0" : "bottom-0"} ${
          h === "l" ? "left-0" : "right-0"
        }`;
        const hBar = `${v === "t" ? "top-0" : "bottom-0"} ${
          h === "l" ? "left-0" : "right-0"
        }`;
        return (
          <span
            key={`${v}-${h}`}
            aria-hidden
            className={`absolute w-10 h-10 ${pos}`}
          >
            <span
              className={`absolute w-px h-6 ${vBar}`}
              style={{ backgroundColor: ACCENT, opacity: 0.85 }}
            />
            <span
              className={`absolute h-px w-6 ${hBar}`}
              style={{ backgroundColor: ACCENT, opacity: 0.85 }}
            />
          </span>
        );
      })}
    </>
  );
}

function CircleReticle({ className = "" }: { className?: string }) {
  return (
    <span aria-hidden className={`block w-6 h-6 ${className}`}>
      <svg viewBox="0 0 24 24" className="w-full h-full">
        <circle cx="12" cy="12" r="9" fill="none" stroke={ACCENT} strokeWidth="0.7" />
        <circle cx="12" cy="12" r="3" fill="none" stroke={ACCENT} strokeWidth="0.7" />
        <line x1="2" y1="12" x2="22" y2="12" stroke={ACCENT} strokeWidth="0.5" opacity="0.6" />
        <line x1="12" y1="2" x2="12" y2="22" stroke={ACCENT} strokeWidth="0.5" opacity="0.6" />
      </svg>
    </span>
  );
}

function PlusMark({ className = "" }: { className?: string }) {
  return (
    <span aria-hidden className={`block w-3 h-3 ${className}`}>
      <svg viewBox="0 0 12 12" className="w-full h-full">
        <line x1="6" y1="0" x2="6" y2="12" stroke={ACCENT} strokeWidth="0.8" />
        <line x1="0" y1="6" x2="12" y2="6" stroke={ACCENT} strokeWidth="0.8" />
      </svg>
    </span>
  );
}

function Barcode({
  className = "",
  tall = false,
}: {
  className?: string;
  tall?: boolean;
}) {
  // Pseudo-random but stable stripe pattern
  const widths = tall
    ? [1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1]
    : [1, 2, 1, 1, 2, 1, 1, 1, 2, 1, 1, 2, 1];
  const height = tall ? 56 : 38;
  return (
    <span
      aria-hidden
      className={`flex items-end gap-[2px] ${className}`}
      style={{ height: `${height}px` }}
    >
      {widths.map((w, i) => (
        <span
          key={i}
          className="block"
          style={{
            width: `${w}px`,
            height: `${height - (i % 3) * 3}px`,
            backgroundColor: ACCENT,
            opacity: 0.85,
          }}
        />
      ))}
    </span>
  );
}

function FrameLinesTopRight() {
  // Decorative L-shaped bracket with a small notch — top-right corner.
  return (
    <svg
      aria-hidden
      className="absolute top-12 right-3 pointer-events-none"
      width="180"
      height="120"
      viewBox="0 0 180 120"
      fill="none"
    >
      <path
        d="M0 12 L120 12 L130 22 L178 22"
        stroke={ACCENT}
        strokeWidth="0.7"
        opacity="0.7"
      />
      <path
        d="M178 22 L178 110"
        stroke={ACCENT}
        strokeWidth="0.7"
        opacity="0.7"
      />
    </svg>
  );
}

function FrameLinesBottomRight() {
  return (
    <svg
      aria-hidden
      className="absolute bottom-10 right-3 pointer-events-none"
      width="200"
      height="160"
      viewBox="0 0 200 160"
      fill="none"
    >
      <path
        d="M198 0 L198 130 L188 140 L0 140"
        stroke={ACCENT}
        strokeWidth="0.7"
        opacity="0.6"
      />
      {/* Dotted segment */}
      <path
        d="M0 140 L-10 140"
        stroke={ACCENT}
        strokeWidth="0.7"
        strokeDasharray="2 3"
        opacity="0.5"
      />
    </svg>
  );
}
