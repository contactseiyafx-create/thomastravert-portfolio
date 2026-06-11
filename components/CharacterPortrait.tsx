"use client";

import Image from "next/image";
import { useState } from "react";

type Props = {
  src: string;
  alt: string;
  /** Set to true once you've dropped an image at `src`. */
  enabled?: boolean;
};

/**
 * CharacterPortrait
 * ────────────────────────────────────────────────
 * Reserves the exact visual space for Thomas' character.
 * If `enabled` is false (or the image fails to load),
 * we render a cinematic editorial placeholder — never a fake
 * face, never AI-generated artwork.
 *
 * Usage:
 *   <CharacterPortrait src="/about-character.png" alt="..." enabled />
 */
export function CharacterPortrait({ src, alt, enabled = false }: Props) {
  const [errored, setErrored] = useState(false);
  const showImage = enabled && src && !errored;

  return (
    <div className="relative w-full h-full overflow-hidden bg-ink-800">
      {showImage ? (
        <Image
          src={src}
          alt={alt}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 40vw"
          className="object-cover object-top"
          onError={() => setErrored(true)}
        />
      ) : (
        <CharacterPlaceholder />
      )}

      {/* Bottom-to-top fade so overlays at the bottom remain legible */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-1/3 pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, rgba(5,5,5,0.95) 0%, rgba(5,5,5,0) 100%)",
        }}
      />
      {/* Top fade so eyebrow + logo overlays stay legible */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-32 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(5,5,5,0.8) 0%, rgba(5,5,5,0) 100%)",
        }}
      />
    </div>
  );
}

/* ───────────────────────────────────────────── */

function CharacterPlaceholder() {
  return (
    <div className="absolute inset-0">
      {/* Cinematic field — pink ambient + faint blue accent */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 55% 70% at 50% 95%, rgba(255,46,136,0.22), transparent 60%), radial-gradient(ellipse 70% 80% at 50% 25%, rgba(46,90,255,0.07), transparent 70%), #080808",
        }}
      />
      {/* Faint grid */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.045]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(ellipse at center, black 25%, transparent 75%)",
        }}
      />

      {/* Vertical neon kanji strips — pure CSS, no art */}
      <div
        aria-hidden
        className="absolute top-0 bottom-0 left-[12%] w-px bg-signal/30"
        style={{ boxShadow: "0 0 10px rgba(255,46,136,0.4)" }}
      />
      <div
        aria-hidden
        className="absolute top-0 bottom-0 right-[18%] w-px bg-signal/20"
        style={{ boxShadow: "0 0 8px rgba(255,46,136,0.3)" }}
      />

      {/* Centred placeholder frame */}
      <div className="absolute inset-0 flex items-center justify-center p-10">
        <div className="border border-bone-line/50 aspect-[3/4] w-full max-w-[280px] flex flex-col items-center justify-center gap-5 px-6 backdrop-blur-[1px]">
          {/* Silhouette glyph */}
          <svg
            width="56"
            height="56"
            viewBox="0 0 56 56"
            fill="none"
            className="text-bone-dim"
          >
            <circle cx="28" cy="20" r="8" stroke="currentColor" strokeWidth="1.2" />
            <path
              d="M10 48c2-9 9-14 18-14s16 5 18 14"
              stroke="currentColor"
              strokeWidth="1.2"
            />
          </svg>
          <span className="block w-8 h-px bg-signal" />
          <div className="text-center space-y-1.5">
            <p className="font-mono text-[10px] tracking-[0.28em] text-bone-dim">
              CHARACTER · SLOT
            </p>
            <p className="font-mono text-[9px] tracking-[0.2em] text-bone-muted leading-relaxed">
              DROP YOUR IMAGE AT
            </p>
            <p className="font-mono text-[9px] tracking-[0.12em] text-signal">
              /public/about-character.png
            </p>
            <p className="font-mono text-[8px] tracking-[0.2em] text-bone-muted pt-2">
              THEN <span className="text-bone-dim">about.sidebar.character.enabled = true</span>
            </p>
          </div>
        </div>
      </div>

      {/* Center vignette */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 100% at 50% 50%, transparent 30%, rgba(0,0,0,0.55) 100%)",
        }}
      />
    </div>
  );
}
