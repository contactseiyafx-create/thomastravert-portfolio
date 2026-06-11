"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { Project, ProjectImage } from "@/data/projects";
import { HoverReveal } from "@/components/HoverReveal";

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
  if (!project.gallery || project.gallery.length === 0) return null;

  return (
    <section className="pt-24 pb-16">
      <div className="page-x">
        <HoverReveal y={8}>
          <p className="h-eyebrow-dim">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-signal align-middle mr-2" />
            VISUAL GALLERY
          </p>
        </HoverReveal>
      </div>

      <div className="mt-10 space-y-12 md:space-y-16">
        {project.gallery.map((img, i) => {
          const mode = i % 4;
          if (mode === 0 || mode === 3) {
            return <FullWidthFrame key={i} img={img} i={i} />;
          }
          const reverse = mode === 2;
          return (
            <SplitFrame
              key={i}
              img={img}
              i={i}
              reverse={reverse}
              total={project.gallery.length}
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

function FullWidthFrame({ img, i }: { img: ProjectImage; i: number }) {
  return (
    <motion.figure
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
      className="page-x"
    >
      <div
        className="relative w-full overflow-hidden bg-ink-700"
        style={{ aspectRatio: img.ratio ?? "16/9" }}
      >
        <MediaFrame img={img} sizes="100vw" />
      </div>
      {img.caption && (
        <figcaption className="mt-4 flex items-center gap-4">
          <span className="font-mono text-[10px] tracking-[0.22em] text-signal">
            {String(i + 1).padStart(2, "0")}
          </span>
          <span className="font-mono text-[11px] tracking-[0.18em] text-bone-dim uppercase">
            {img.caption}
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
}: {
  img: ProjectImage;
  i: number;
  reverse: boolean;
  total: number;
}) {
  return (
    <figure className="page-x">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-end">
        {/* Image */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
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
              {img.caption ?? img.alt}
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
  if (!project.motion?.src) return null;
  const { src, poster, caption } = project.motion;

  return (
    <section className="page-x pt-24 pb-16">
      <HoverReveal y={8}>
        <p className="h-eyebrow-dim">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-signal align-middle mr-2" />
          MOTION
        </p>
      </HoverReveal>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
        className="relative mt-8 w-full overflow-hidden bg-ink-700 aspect-video"
      >
        <video
          src={src}
          poster={poster}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />
      </motion.div>
      {caption && (
        <p className="mt-4 font-mono text-[11px] tracking-[0.18em] text-bone-dim uppercase">
          {caption}
        </p>
      )}
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
