"use client";

import { pages } from "@/data/pages";
import { HoverReveal } from "@/components/HoverReveal";
import { useLanguage } from "@/components/LanguageProvider";
import { YouTubePlaylist } from "@/components/motion/YouTubePlaylist";

export function MotionClient() {
  const { t } = useLanguage();
  const p = pages.motion;
  const fr = p.featuredReel;
  const pl = p.playlist;

  return (
    <div className="pt-[var(--nav-h)] pb-32">
      <section className="page-x pt-12 pb-10">
        <HoverReveal y={16}>
          <p className="font-jp text-signal text-sm tracking-[0.22em]">
            {t("motion.eyebrowJp")}
          </p>
        </HoverReveal>
        <div className="overflow-hidden mt-4">
          <HoverReveal y={80} delay={0.1}>
            <h1 className="h-display text-[clamp(2.75rem,9vw,8.5rem)] leading-[0.95] whitespace-pre-line">
              {t("motion.title")}
            </h1>
          </HoverReveal>
        </div>
        <HoverReveal y={20} delay={0.3} className="mt-6 max-w-md body-lead">
          {t("motion.intro")}
        </HoverReveal>
      </section>

      <section className="page-x pt-16">
        <HoverReveal y={16}>
          <p className="font-jp text-signal text-sm tracking-[0.22em]">
            {t("motion.featured.eyebrowJp")}
          </p>
        </HoverReveal>

        <div className="mt-4 grid grid-cols-12 gap-6 items-end">
          <div className="col-span-12 lg:col-span-7 overflow-hidden">
            <HoverReveal y={60} delay={0.08}>
              <h2 className="h-display text-[clamp(2.4rem,7vw,6rem)] whitespace-pre-line leading-[0.95]">
                {t("motion.featured.title")}
              </h2>
            </HoverReveal>
          </div>

          <div className="col-span-12 lg:col-span-5">
            <HoverReveal y={14} delay={0.2}>
              <p className="flex items-center gap-3 h-eyebrow-dim">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-signal" />
                {t("motion.featured.sectionLabel")}
                <span className="text-bone-muted ml-2">
                  · {t("motion.featured.countLabel")}
                </span>
              </p>
            </HoverReveal>
            <HoverReveal y={14} delay={0.3}>
              <p className="mt-4 body-sm max-w-md">
                {t("motion.featured.intro")}
              </p>
            </HoverReveal>
          </div>
        </div>

        <HoverReveal y={28} delay={0.4} className="mt-10">
          <div className="relative w-full aspect-video overflow-hidden border border-bone-line bg-ink-700">
            <video
              src={fr.src}
              poster={fr.poster}
              controls
              playsInline
              preload="metadata"
              aria-label={`${t("motion.featured.title").replace(/\n/g, " ")} — ${fr.author}`}
              className="absolute inset-0 w-full h-full object-cover"
            >
              <source src={fr.src} type={fr.type} />
            </video>
          </div>
        </HoverReveal>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <p className="font-mono text-[11px] tracking-[0.22em] uppercase text-bone-dim">
            {t("motion.featured.client")} · {t("motion.featured.category")} ·{" "}
            {fr.author} · {fr.duration}
          </p>
          <a
            href={fr.src}
            download
            className="group inline-flex items-center gap-2.5 font-mono text-[11px] tracking-[0.22em] uppercase text-bone-dim hover:text-signal transition-colors"
          >
            {t("motion.downloadReel")}
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

      <section className="page-x pt-16">
        <HoverReveal y={16}>
          <p className="font-jp text-signal text-sm tracking-[0.22em]">
            {t("motion.playlist.eyebrowJp")}
          </p>
        </HoverReveal>

        <div className="mt-4 grid grid-cols-12 gap-6 items-end">
          <div className="col-span-12 lg:col-span-7 overflow-hidden">
            <HoverReveal y={60} delay={0.08}>
              <h2 className="h-display text-[clamp(2.4rem,7vw,6rem)] whitespace-pre-line leading-[0.95]">
                {t("motion.playlist.title")}
              </h2>
            </HoverReveal>
          </div>

          <div className="col-span-12 lg:col-span-5">
            <HoverReveal y={14} delay={0.2}>
              <p className="flex items-center gap-3 h-eyebrow-dim">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-signal" />
                {t("motion.playlist.sectionLabel")}
                <span className="text-bone-muted ml-2">
                  · {t("motion.playlist.countLabel")}
                </span>
              </p>
            </HoverReveal>
            <HoverReveal y={14} delay={0.3}>
              <p className="mt-4 body-sm max-w-md">
                {t("motion.playlist.intro")}
              </p>
            </HoverReveal>
          </div>
        </div>

        <HoverReveal y={28} delay={0.4} className="mt-10">
          <YouTubePlaylist
            playlistId={pl.playlistId}
            startVideoId={pl.startVideoId}
            title={t("motion.playlist.sectionLabel")}
          />
        </HoverReveal>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <p className="font-mono text-[11px] tracking-[0.22em] uppercase text-bone-dim">
            {t("motion.playlist.meta")}
          </p>
          <a
            href={pl.externalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2.5 font-mono text-[11px] tracking-[0.22em] uppercase text-bone-dim hover:text-signal transition-colors"
          >
            {t("motion.openYoutube")}
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
