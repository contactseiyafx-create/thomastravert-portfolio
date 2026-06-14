"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import type { MotionVideo, Project, ProjectImage } from "@/data/projects";
import { HoverReveal } from "@/components/HoverReveal";
import { useLanguage } from "@/components/LanguageProvider";
import { motionDurations, premiumEase } from "@/components/motionConfig";
import { useProjectCopy } from "./projectCopy";

/**
 * Detail-page gallery.
 *
 * Rhythm:
 *   index 0  — full-width image
 *   index 1  — 2-col split  (image left, caption right)
 *   index 2  — 2-col split  (caption left, image right)
 *   index 3  — full-width image
 *   …repeats.
 *
 * Captions use ProjectImage.caption (optional). If missing,
 * the side column shows the alt text in micro-typography.
 */
export function ProjectGallery({ project }: { project: Project }) {
  const { t } = useLanguage();
  const copy = useProjectCopy(project);

  if (!project.gallery || project.gallery.length === 0) return null;

  return (
    <section className="pt-24 pb-16">
      <div className="page-x">
        <HoverReveal y={8}>
          <p className="h-eyebrow-dim">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-signal align-middle mr-2" />
            {t("project.visualGallery")}
          </p>
        </HoverReveal>
      </div>

      <div className="mt-10 space-y-12 md:space-y-16">
        {project.gallery.map((img, i) => {
          const mode = i % 4;
          const caption = copy.galleryCaption(img, i);
          const alt = copy.galleryAlt(img, i);
          if (mode === 0 || mode === 3) {
            return (
              <FullWidthFrame
                key={i}
                img={img}
                i={i}
                caption={caption}
              />
            );
          }
          const reverse = mode === 2;
          return (
            <SplitFrame
              key={i}
              img={img}
              i={i}
              reverse={reverse}
              total={project.gallery.length}
              caption={caption}
              alt={alt}
            />
          );
        })}
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────
   FULL-WIDTH FRAME
   ──────────────────────────────────────────────── */

function FullWidthFrame({
  img,
  i,
  caption,
}: {
  img: ProjectImage;
  i: number;
  caption?: string;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.figure
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24, filter: "blur(6px)" }}
      whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: reduce ? 0.18 : motionDurations.media, ease: premiumEase }}
      className="page-x"
    >
      <div
        className="relative w-full overflow-hidden bg-ink-700"
        style={{ aspectRatio: img.ratio ?? "16/9" }}
      >
        <MediaFrame img={img} sizes="100vw" />
      </div>
      {caption && (
        <figcaption className="mt-4 flex items-center gap-4">
          <span className="font-mono text-[10px] tracking-[0.22em] text-signal">
            {String(i + 1).padStart(2, "0")}
          </span>
          <span className="font-mono text-[11px] tracking-[0.18em] text-bone-dim uppercase">
            {caption}
          </span>
        </figcaption>
      )}
    </motion.figure>
  );
}

/* ────────────────────────────────────────────────
   SPLIT FRAME (image + caption column)
   ──────────────────────────────────────────────── */

function SplitFrame({
  img,
  i,
  reverse,
  total,
  caption,
  alt,
}: {
  img: ProjectImage;
  i: number;
  reverse: boolean;
  total: number;
  caption?: string;
  alt: string;
}) {
  const reduce = useReducedMotion();

  return (
    <figure className="page-x">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-end">
        {/* Image */}
        <motion.div
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24, filter: "blur(6px)" }}
          whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: reduce ? 0.18 : motionDurations.media, ease: premiumEase }}
          className={[
            "lg:col-span-8 relative overflow-hidden bg-ink-700",
            reverse ? "lg:order-2" : "lg:order-1",
          ].join(" ")}
          style={{ aspectRatio: img.ratio ?? "4/3" }}
        >
          <MediaFrame
            img={img}
            sizes="(min-width: 1024px) 66vw, 100vw"
          />
        </motion.div>

        {/* Caption column */}
        <div
          className={[
            "lg:col-span-3 flex flex-col justify-end gap-4",
            reverse ? "lg:order-1" : "lg:order-2",
          ].join(" ")}
        >
          <HoverReveal y={10}>
            <span className="font-mono text-[10px] tracking-[0.22em] text-signal">
              {String(i + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </span>
          </HoverReveal>
          <HoverReveal y={14} delay={0.08}>
            <p className="font-mono text-[12px] tracking-[0.16em] text-bone uppercase leading-[1.6]">
              {caption ?? alt}
            </p>
          </HoverReveal>
          <HoverReveal y={6} delay={0.16}>
            <span className="block w-10 h-px bg-signal" />
          </HoverReveal>
        </div>
      </div>
    </figure>
  );
}

/* ────────────────────────────────────────────────
   MOTION SECTION — optional, hides cleanly if missing
   ──────────────────────────────────────────────── */

export function MotionSection({ project }: { project: Project }) {
  const { t } = useLanguage();
  const copy = useProjectCopy(project);
  const legacyVideo = project.motion?.src
    ? [
        {
          kind: "video",
          src: project.motion.src,
          poster: project.motion.poster,
          title: copy.motionTitle ?? t("project.motion"),
          caption: copy.motionCaption,
          type: "video/mp4",
          featured: true,
        } satisfies MotionVideo,
      ]
    : [];
  const videos = project.motion?.videos ?? legacyVideo;

  if (!project.motion || videos.length === 0) return null;

  return (
    <section className="page-x pt-24 pb-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
        <div className="lg:col-span-5">
          <HoverReveal y={8}>
            <p className="h-eyebrow-dim">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-signal align-middle mr-2" />
              {copy.motionTitle ?? t("project.motion")}
            </p>
          </HoverReveal>
          {copy.motionDescription && (
            <HoverReveal y={18} delay={0.1}>
              <p className="mt-6 body-lead leading-[1.7]">
                {copy.motionDescription}
              </p>
            </HoverReveal>
          )}
        </div>
      </div>

      <div className="mt-10 space-y-6 lg:space-y-8">
        {videos.map((video, index) => (
          <MotionVideoFrame
            key={`${video.kind}-${index}`}
            video={video}
            title={copy.motionVideoTitle(video, index)}
            caption={copy.motionVideoCaption(video, index)}
            featured={index === 0 || video.featured}
          />
        ))}
      </div>
    </section>
  );
}

function MotionVideoFrame({
  video,
  title,
  caption,
  featured,
}: {
  video: MotionVideo;
  title: string;
  caption?: string;
  featured?: boolean;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.figure
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24, filter: "blur(6px)" }}
      whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: reduce ? 0.18 : motionDurations.media, ease: premiumEase }}
      className={featured ? "w-full" : "w-full lg:w-[72%]"}
    >
      <div className="relative aspect-video w-full overflow-hidden rounded-[18px] bg-ink-700 shadow-[0_30px_90px_rgba(0,0,0,0.32)]">
        {video.kind === "youtube" ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}`}
            title={title}
            loading="lazy"
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
          />
        ) : (
          <video
            src={video.src}
            poster={video.poster}
            controls
            preload="metadata"
            playsInline
            className="absolute inset-0 h-full w-full object-cover"
          >
            {video.type && <source src={video.src} type={video.type} />}
          </video>
        )}
      </div>
      <figcaption className="mt-4 flex flex-col gap-1 md:flex-row md:items-baseline md:gap-4">
        <span className="font-mono text-[10px] tracking-[0.22em] text-signal uppercase">
          {title}
        </span>
        {caption && (
          <span className="font-mono text-[11px] tracking-[0.16em] text-bone-dim uppercase">
            {caption}
          </span>
        )}
      </figcaption>
    </motion.figure>
  );
}

/* ────────────────────────────────────────────────
   EXTERNAL LINK — optional "View Full Project" CTA
   Hides cleanly when project.externalUrl is undefined.
   ──────────────────────────────────────────────── */

export function ExternalLinkSection({ project }: { project: Project }) {
  const { t } = useLanguage();
  const reduce = useReducedMotion();
  if (!project.externalUrl) return null;
  const isBehance = /behance\.net/i.test(project.externalUrl);
  const label = isBehance
    ? t("project.viewBehance")
    : t("project.viewProject");

  return (
    <section className="page-x pt-16 pb-8">
      <motion.a
        href={project.externalUrl}
        target="_blank"
        rel="noopener noreferrer"
        initial={reduce ? { opacity: 0 } : { opacity: 0, y: 20, filter: "blur(4px)" }}
        whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: reduce ? 0.18 : motionDurations.reveal, ease: premiumEase }}
        className="group relative flex items-center justify-between gap-6 border-t border-b border-bone-line py-8 hover:border-signal/60 transition-colors duration-[350ms]"
      >
        <span className="flex flex-col gap-2">
          <span className="h-eyebrow-dim">{t("project.external")}</span>
          <span className="h-display text-[clamp(1.4rem,3vw,2.4rem)] leading-[1] group-hover:text-signal transition-colors duration-500">
            {label}
          </span>
        </span>
        <span className="shrink-0 grid place-items-center w-12 h-12 md:w-14 md:h-14 rounded-full border border-bone-line text-bone group-hover:border-signal group-hover:text-signal transition-colors duration-500">
          <svg
            width="16"
            height="16"
            viewBox="0 0 12 12"
            fill="none"
            className="transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          >
            <path
              d="M2 10L10 2M10 2H4M10 2V8"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="square"
            />
          </svg>
        </span>
      </motion.a>
    </section>
  );
}

/* ────────────────────────────────────────────────
   MEDIA FRAME — image OR video
   Same dimensions, same object-cover.  Only the inner element swaps.
   Videos autoplay, loop, are muted (required for autoplay on iOS), and
   use `playsInline` so they don't fullscreen on mobile.  The still
   `img.src` doubles as the poster frame so the gallery looks identical
   before the video is decoded.
   ──────────────────────────────────────────────── */

function MediaFrame({
  img,
  sizes,
}: {
  img: ProjectImage;
  sizes: string;
}) {
  if (img.video) {
    return (
      <video
        src={img.video.src}
        poster={img.src}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        aria-label={img.alt}
        className="absolute inset-0 w-full h-full object-cover"
      />
    );
  }
  return (
    <Image
      src={img.src}
      alt={img.alt}
      fill
      sizes={sizes}
      className="object-cover"
    />
  );
}
