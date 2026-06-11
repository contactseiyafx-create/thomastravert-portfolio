"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

/**
 * YOUTUBE PLAYLIST EMBED
 * ────────────────────────────────────────────────
 * - Privacy-friendly host: youtube-nocookie.com
 * - Native YouTube controls preserved.
 * - 16/9 responsive frame, dark editorial border to match the site.
 * - Deferred load: shows the playlist's first-video thumbnail until the user
 *   taps Play, then mounts the iframe — keeps the Motion page fast.
 *
 * Pass either:
 *   - playlistId  (required)  — e.g. "PLebI-4WHDYtPRza1qxkr6G-FWKxcfMVST"
 *   - startVideoId (optional) — video to open with; falls back to the playlist's first.
 */
type Props = {
  playlistId: string;
  startVideoId?: string;
  /** Optional accessible title */
  title?: string;
};

export function YouTubePlaylist({
  playlistId,
  startVideoId,
  title = "YouTube playlist",
}: Props) {
  const [active, setActive] = useState(false);

  // youtube-nocookie params:
  //   list      → playlist id
  //   rel=0     → no unrelated recommendations after end
  //   modestbranding=1 → minimal YT chrome (still has logo on hover)
  //   playsinline=1    → iOS inline playback
  //   autoplay  → only when user opted in (clicked our overlay)
  const params = new URLSearchParams({
    list: playlistId,
    rel: "0",
    modestbranding: "1",
    playsinline: "1",
    autoplay: active ? "1" : "0",
  });

  // If startVideoId provided, use /embed/{id}?list=...; else /embed/videoseries?list=...
  const embedSrc = startVideoId
    ? `https://www.youtube-nocookie.com/embed/${startVideoId}?${params.toString()}`
    : `https://www.youtube-nocookie.com/embed/videoseries?${params.toString()}`;

  // Use the start video's thumbnail as the lazy-load poster.
  // YouTube's maxresdefault sometimes 404s — hqdefault is the universal fallback.
  const posterId = startVideoId ?? "";
  const posterSrc = posterId
    ? `https://i.ytimg.com/vi/${posterId}/hqdefault.jpg`
    : "";

  return (
    <div
      className="
        relative w-full overflow-hidden
        border border-bone-line bg-ink-700
        aspect-video
      "
    >
      {active ? (
        <iframe
          src={embedSrc}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
          className="absolute inset-0 w-full h-full"
          loading="lazy"
        />
      ) : (
        <PlaylistPoster
          posterSrc={posterSrc}
          onPlay={() => setActive(true)}
          title={title}
        />
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────
   POSTER — pre-iframe state
   ───────────────────────────────────────────── */

function PlaylistPoster({
  posterSrc,
  onPlay,
  title,
}: {
  posterSrc: string;
  onPlay: () => void;
  title: string;
}) {
  return (
    <button
      type="button"
      onClick={onPlay}
      aria-label={`Play playlist — ${title}`}
      className="absolute inset-0 w-full h-full group focus:outline-none focus-visible:ring-1 focus-visible:ring-signal"
    >
      {posterSrc && (
        <Image
          src={posterSrc}
          alt=""
          aria-hidden
          fill
          sizes="100vw"
          /* `unoptimized` because YT serves these directly; avoids Next's domain config */
          unoptimized
          className="
            object-cover
            transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)]
            group-hover:scale-[1.03]
          "
        />
      )}

      {/* Cinematic vignette + bottom gradient — keeps overlays legible on any thumbnail */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 90% 80% at 50% 50%, rgba(5,5,5,0.15) 0%, rgba(5,5,5,0.65) 100%), linear-gradient(to top, rgba(5,5,5,0.65), rgba(5,5,5,0) 45%)",
        }}
      />

      {/* Top-left badge */}
      <span
        aria-hidden
        className="absolute top-4 left-4 inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.22em] text-bone uppercase"
      >
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-signal" />
        PLAYLIST
      </span>

      {/* Top-right YT mark — never the platform's logo, just a text indicator */}
      <span
        aria-hidden
        className="absolute top-4 right-4 font-mono text-[10px] tracking-[0.22em] text-bone-dim uppercase"
      >
        YOUTUBE
      </span>

      {/* Play button — centred */}
      <motion.span
        aria-hidden
        initial={{ scale: 0.95, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="
          absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
          grid place-items-center
          w-20 h-20 md:w-24 md:h-24
          rounded-full border border-signal
          text-signal
          bg-ink/40 backdrop-blur-[2px]
          transition-colors duration-500
          group-hover:bg-signal group-hover:text-ink
        "
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 22 22"
          fill="none"
          className="translate-x-[1px]"
        >
          <path d="M6 4L18 11L6 18V4Z" fill="currentColor" />
        </svg>
      </motion.span>

      {/* Bottom label */}
      <span
        aria-hidden
        className="
          absolute left-4 right-4 bottom-4
          flex items-center justify-between
          font-mono text-[10px] tracking-[0.22em] text-bone-dim uppercase
        "
      >
        <span>PRESS PLAY · OPENS IN PLACE</span>
        <span className="hidden sm:inline">PRIVACY-ENHANCED</span>
      </span>
    </button>
  );
}
