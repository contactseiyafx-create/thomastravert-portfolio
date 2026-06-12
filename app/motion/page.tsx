import type { Metadata } from "next";
import { pages } from "@/data/pages";
import { HoverReveal } from "@/components/HoverReveal";
import { YouTubePlaylist } from "@/components/motion/YouTubePlaylist";

export const metadata: Metadata = { title: "Motion" };

export default function MotionPage() {
  const p = pages.motion;
  const fr = p.featuredReel;
  const pl = p.playlist;

  return (
    <div className="pt-[var(--nav-h)] pb-32">
      <section className="page-x pt-12 pb-10">
        <HoverReveal y={16}>
          <p className="font-jp text-signal text-sm tracking-[0.22em]">
            {p.eyebrowJp}
          </p>
        </HoverReveal>
        <div className="overflow-hidden mt-4">
          <HoverReveal y={80} delay={0.1}>
            <h1 className="h-display text-[clamp(2.75rem,9vw,8.5rem)] leading-[0.95] tracking-[-0.02em] whitespace-pre-line">
              {p.title}
            </h1>
          </HoverReveal>
        </div>
        <HoverReveal y={20} delay={0.3} className="mt-6 max-w-md body-lead">
          {p.intro}
        </HoverReveal>
      </section>

      {/* ─── Featured reel — Sorare Motion Reel ─── */}
      <section className="page-x pt-16">
        {/* Section header — mirrors playlist section's rhythm */}
        <HoverReveal y={16}>
          <p className="font-jp text-signal text-sm tracking-[0.22em]">
            {fr.eyebrowJp}
          </p>
        </HoverReveal>

        <div className="mt-4 grid grid-cols-12 gap-6 items-end">
          <div className="col-span-12 lg:col-span-7 overflow-hidden">
            <HoverReveal y={60} delay={0.08}>
              <h2 className="h-display text-[clamp(2.4rem,7vw,6rem)] whitespace-pre-line leading-[0.95]">
                {fr.title}
              </h2>
            </HoverReveal>
          </div>

          <div className="col-span-12 lg:col-span-5">
            <HoverReveal y={14} delay={0.2}>
              <p className="flex items-center gap-3 h-eyebrow-dim">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-signal" />
                {fr.sectionLabel}
                <span className="text-bone-muted ml-2">· {fr.countLabel}</span>
              </p>
            </HoverReveal>
            <HoverReveal y={14} delay={0.3}>
              <p className="mt-4 body-sm max-w-md">{fr.intro}</p>
            </HoverReveal>
          </div>
        </div>

        {/* Native HTML5 video player — 16:9 frame matches the playlist embed */}
        <HoverReveal y={28} delay={0.4} className="mt-10">
          <div className="relative w-full aspect-video overflow-hidden border border-bone-line bg-ink-700">
            <video
              src={fr.src}
              poster={fr.poster}
              controls
              playsInline
              preload="metadata"
              aria-label={`${fr.title.replace(/\n/g, " ")} — ${fr.author}`}
              className="absolute inset-0 w-full h-full object-cover"
            >
              <source src={fr.src} type={fr.type} />
            </video>
          </div>
        </HoverReveal>

        {/* Meta strip under the player — matches playlist section's strip */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <p className="font-mono text-[11px] tracking-[0.22em] uppercase text-bone-dim">
            {fr.client} · {fr.category} · {fr.author} · {fr.duration}
          </p>
          <a
            href={fr.src}
            download
            className="
              group inline-flex items-center gap-2.5
              font-mono text-[11px] tracking-[0.22em] uppercase
              text-bone-dim hover:text-signal transition-colors
            "
          >
            DOWNLOAD REEL (.MP4)
            <svg
              width="10"
              height="10"
              viewBox="0 0 10 10"
              fill="none"
              aria-hidden
              className="transition-transform duration-300 group-hover:translate-y-0.5"
            >
              <path
                d="M5 1V8M5 8L2 5M5 8L8 5"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="square"
              />
            </svg>
          </a>
        </div>
      </section>

      {/* ─── YouTube playlist — Selected motion work ─── */}
      <section className="page-x pt-16">
        {/* Section header — same rhythm as the page hero */}
        <HoverReveal y={16}>
          <p className="font-jp text-signal text-sm tracking-[0.22em]">
            {pl.eyebrowJp}
          </p>
        </HoverReveal>

        <div className="mt-4 grid grid-cols-12 gap-6 items-end">
          <div className="col-span-12 lg:col-span-7 overflow-hidden">
            <HoverReveal y={60} delay={0.08}>
              <h2 className="h-display text-[clamp(2.4rem,7vw,6rem)] whitespace-pre-line leading-[0.95]">
                {pl.title}
              </h2>
            </HoverReveal>
          </div>

          <div className="col-span-12 lg:col-span-5">
            <HoverReveal y={14} delay={0.2}>
              <p className="flex items-center gap-3 h-eyebrow-dim">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-signal" />
                {pl.sectionLabel}
                <span className="text-bone-muted ml-2">· {pl.countLabel}</span>
              </p>
            </HoverReveal>
            <HoverReveal y={14} delay={0.3}>
              <p className="mt-4 body-sm max-w-md">{pl.intro}</p>
            </HoverReveal>
          </div>
        </div>

        {/* Embedded player */}
        <HoverReveal y={28} delay={0.4} className="mt-10">
          <YouTubePlaylist
            playlistId={pl.playlistId}
            startVideoId={pl.startVideoId}
            title={pl.sectionLabel}
          />
        </HoverReveal>

        {/* Meta strip under the embed */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <p className="font-mono text-[11px] tracking-[0.22em] uppercase text-bone-dim">
            Playlist · {pl.countLabel} · Hosted on YouTube
          </p>
          <a
            href={pl.externalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="
              group inline-flex items-center gap-2.5
              font-mono text-[11px] tracking-[0.22em] uppercase
              text-bone-dim hover:text-signal transition-colors
            "
          >
            OPEN ON YOUTUBE
            <svg
              width="10"
              height="10"
              viewBox="0 0 10 10"
              fill="none"
              aria-hidden
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            >
              <path
                d="M2 8L8 2M8 2H3M8 2V7"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="square"
              />
            </svg>
          </a>
        </div>
      </section>
    </div>
  );
}
