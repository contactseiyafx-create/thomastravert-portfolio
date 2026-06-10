"use client";

import { motion } from "framer-motion";
import type { ServiceCardData, CompactCardData } from "@/data/services";

/* ─────────────────────────────────────────────
   STANDARD SERVICE CARD
   Used for cards 01–03.
   ───────────────────────────────────────────── */
export function ServiceCard({
  card,
  i = 0,
}: {
  card: ServiceCardData;
  i?: number;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{
        duration: 0.85,
        delay: 0.1 + i * 0.07,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="
        group relative h-full p-7 md:p-8
        border border-bone-line
        bg-ink/40
        hover:border-signal/60 hover:bg-ink-700/60
        transition-colors duration-500
        flex flex-col
      "
    >
      {/* Invisible link overlay — covers the whole card without altering visuals. */}
      {card.cta?.href && (
        <a
          href={card.cta.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${card.cta.label} — ${card.title}`}
          className="absolute inset-0 z-10 focus:outline-none focus-visible:ring-1 focus-visible:ring-signal"
        />
      )}
      {/* Top row — index + jp label */}
      <div className="flex items-start justify-between gap-4">
        <span
          className="
            h-display font-display leading-none tracking-tight
            text-bone
          "
          style={{ fontSize: "clamp(2.5rem, 4vw, 3.5rem)" }}
        >
          {card.index}
        </span>
        <span className="font-jp text-[11px] tracking-[0.14em] text-bone-dim mt-2 text-right">
          {card.jpLabel}
        </span>
      </div>

      {/* Title */}
      <h3
        className="mt-3 h-display tracking-tight text-bone"
        style={{ fontSize: "clamp(1.35rem, 1.8vw, 1.65rem)" }}
      >
        {card.title}
      </h3>

      {/* Description */}
      <p className="mt-3 text-[13.5px] leading-relaxed text-bone-dim">
        {card.description}
      </p>

      {/* Includes */}
      <p className="mt-6 font-mono text-[10px] tracking-[0.24em] text-bone-muted">
        INCLUDES:
      </p>
      <ul className="mt-2.5 space-y-1.5">
        {card.includes.map((item) => (
          <li
            key={item}
            className="flex items-start gap-2.5 text-[13px] text-bone"
          >
            <span className="block w-1 h-1 rounded-full bg-signal mt-2 shrink-0" />
            <span>{item}</span>
          </li>
        ))}
      </ul>

      {/* Spacer pushes price to bottom */}
      <div className="flex-1" />

      {/* Price + arrow */}
      <div className="mt-8 pt-5 border-t border-bone-line">
        <p className="font-mono text-[10px] tracking-[0.24em] text-bone-muted">
          {card.priceLabel ?? "STARTING AT:"}
        </p>
        <div className="mt-2 flex items-end justify-between gap-3">
          <p
            className="h-display tracking-tight text-signal"
            style={{ fontSize: "clamp(1.6rem, 2.4vw, 2rem)" }}
          >
            {card.price}
          </p>
          <ArrowUpRight />
        </div>
      </div>
    </motion.article>
  );
}

/* ─────────────────────────────────────────────
   COMPACT CARD
   Used for "05 — CREATIVE PARTNERSHIP" and "OPTIONAL — CONSULTING".
   Same DNA as ServiceCard, slimmer body.
   ───────────────────────────────────────────── */
export function CompactCard({
  card,
  i = 0,
}: {
  card: CompactCardData;
  i?: number;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{
        duration: 0.85,
        delay: 0.1 + i * 0.07,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="
        group relative h-full p-7 md:p-8
        border border-bone-line bg-ink/40
        hover:border-signal/60 hover:bg-ink-700/60
        transition-colors duration-500
        flex flex-col
      "
    >
      {/* Invisible link overlay — covers the whole card without altering visuals. */}
      {card.cta?.href && (
        <a
          href={card.cta.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${card.cta.label} — ${card.title}`}
          className="absolute inset-0 z-10 focus:outline-none focus-visible:ring-1 focus-visible:ring-signal"
        />
      )}
      {/* Top row */}
      <div className="flex items-start justify-between gap-4">
        {card.index ? (
          <span
            className="h-display font-display leading-none tracking-tight text-bone"
            style={{ fontSize: "clamp(2.5rem, 4vw, 3.5rem)" }}
          >
            {card.index}
          </span>
        ) : (
          <span className="font-mono text-[10px] tracking-[0.24em] text-bone-muted uppercase">
            {card.eyebrow}
          </span>
        )}
        {card.jpLabel && (
          <span className="font-jp text-[11px] tracking-[0.14em] text-bone-dim mt-2 text-right">
            {card.jpLabel}
          </span>
        )}
      </div>

      <h3
        className="mt-3 h-display tracking-tight text-bone"
        style={{ fontSize: "clamp(1.35rem, 1.8vw, 1.65rem)" }}
      >
        {card.title}
      </h3>

      <p className="mt-3 text-[13.5px] leading-relaxed text-bone-dim">
        {card.description}
      </p>

      <p className="mt-6 font-mono text-[10px] tracking-[0.24em] text-bone-muted">
        INCLUDES:
      </p>
      <ul className="mt-2.5 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5">
        {card.includes.map((item) => (
          <li
            key={item}
            className="flex items-start gap-2.5 text-[13px] text-bone"
          >
            <span className="block w-1 h-1 rounded-full bg-signal mt-2 shrink-0" />
            <span>{item}</span>
          </li>
        ))}
      </ul>

      <div className="flex-1" />

      <div className="mt-8 pt-5 border-t border-bone-line">
        {card.priceLabel && (
          <p className="font-mono text-[10px] tracking-[0.24em] text-bone-muted">
            {card.priceLabel}
          </p>
        )}
        <div className="mt-2 flex items-end justify-between gap-3">
          <p
            className="h-display tracking-tight text-signal"
            style={{ fontSize: "clamp(1.4rem, 2vw, 1.85rem)" }}
          >
            {card.price}
          </p>
          <ArrowUpRight />
        </div>
      </div>
    </motion.article>
  );
}

/* ─────────────────────────────────────────────
   shared bit
   ───────────────────────────────────────────── */
function ArrowUpRight() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden
      className="text-bone-dim group-hover:text-signal transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
    >
      <path
        d="M3 11L11 3M11 3H4M11 3V10"
        stroke="currentColor"
        strokeWidth="1.4"
      />
    </svg>
  );
}
