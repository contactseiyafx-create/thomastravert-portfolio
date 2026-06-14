"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import type { Project } from "@/data/projects";
import { useLanguage } from "@/components/LanguageProvider";
import { useProjectCopy } from "./projectCopy";
import { motionDurations, premiumEase } from "@/components/motionConfig";

/* ─────────────────────────────────────────────
   PROJECT ROW
   Used on the Work page in list view.
   Editorial layout: index + meta on the left, big visual on the right.
   ───────────────────────────────────────────── */

type RowProps = {
  project: Project;
  /** 0-based index for stagger reveal */
  i?: number;
};

export function ProjectRow({ project, i = 0 }: RowProps) {
  const { t } = useLanguage();
  const copy = useProjectCopy(project);
  const hasExtras =
    !!project.thumbnailExtras && project.thumbnailExtras.length > 0;

  return (
    <motion.article
      initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{
        duration: motionDurations.reveal,
        delay: 0.1 + i * 0.08,
        ease: premiumEase,
      }}
      className="project-row"
    >
      <Link
        href={`/work/${project.slug}`}
        className="grid grid-cols-12 gap-6 py-10 md:py-14 relative group"
        aria-label={`View project: ${project.title}`}
      >
        {/* LEFT — meta */}
        <div className="col-span-12 lg:col-span-4 flex flex-col justify-between">
          <div>
            <p className="font-mono text-[12px] text-bone-dim tracking-[0.2em]">
              {project.index}
            </p>
            <p className="mt-3 h-eyebrow">{copy.category}</p>
            <h3 className="mt-3 h-display text-[clamp(2.2rem,4.5vw,4rem)]">
              {copy.title}
            </h3>
            <p className="mt-3 font-mono text-[11px] tracking-[0.2em] text-bone-dim uppercase whitespace-pre-line max-w-xs">
              {copy.shortDescription}
            </p>
          </div>

          <div className="mt-8 flex items-center gap-6">
            <span className="link-arrow">
              <span>{t("project.viewProjectShort")}</span>
              <ArrowUpRight />
            </span>
            <span className="font-mono text-[10px] tracking-[0.22em] text-bone-muted">
              {project.year}
            </span>
          </div>
        </div>

        {/* RIGHT — thumbnail(s) */}
        <div className="col-span-12 lg:col-span-8 relative h-[260px] md:h-[340px] lg:h-[380px] overflow-hidden">
          {hasExtras ? (
            <div className="absolute inset-0 grid grid-cols-3 gap-2 lg:gap-3">
              <RowImage img={project.thumbnail} />
              {project.thumbnailExtras!.map((img, idx) => (
                <RowImage key={idx} img={img} />
              ))}
            </div>
          ) : (
            <div className="absolute inset-0">
              <RowImage img={project.thumbnail} cover />
            </div>
          )}

          {/* Plus button */}
          <span aria-hidden className="plus-btn absolute right-4 bottom-4 z-10">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path
                d="M6 1V11M1 6H11"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="square"
              />
            </svg>
          </span>
        </div>
      </Link>
    </motion.article>
  );
}

/* ─────────────────────────────────────────────
   GRID CARD
   Used on the Work page in grid view + featured strip on home.
   Tall editorial tile, subtle image scale, title slides up on hover.
   ───────────────────────────────────────────── */

type GridProps = {
  project: Project;
  /** Optional aspect override — defaults to 4/5 (portrait editorial) */
  aspect?: string;
  /** Disable framer entry (used inside already-animated lists) */
  noAnimate?: boolean;
  i?: number;
};

export function ProjectGridCard({
  project,
  aspect = "4/5",
  noAnimate,
  i = 0,
}: GridProps) {
  const { t } = useLanguage();
  const copy = useProjectCopy(project);

  const card = (
    <Link
      href={`/work/${project.slug}`}
      className="group block relative overflow-hidden border border-bone-line bg-ink-700"
      style={{ aspectRatio: aspect }}
    >
      <Image
        src={project.thumbnail.src}
        alt={project.thumbnail.alt}
        fill
        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        className="object-cover transition-transform duration-[350ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.035]"
      />
      {/* Bottom gradient — keeps the meta legible regardless of thumbnail */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, rgba(5,5,5,0.85) 0%, rgba(5,5,5,0.25) 35%, rgba(5,5,5,0) 60%)",
        }}
      />

      {/* Top-right index */}
      <span className="absolute top-4 right-4 font-mono text-[10px] tracking-[0.24em] text-bone-dim/80">
        {project.index}
      </span>

      {/* Bottom meta — slides up subtly on hover */}
      <div className="absolute left-4 right-4 bottom-4">
        <p className="h-eyebrow-dim text-[10px]">{copy.category}</p>
        <div className="overflow-hidden mt-1.5">
          <h3
            className="
              h-display text-[clamp(1.4rem,2.2vw,2rem)] leading-[0.95]
              transition-transform duration-[350ms] ease-[cubic-bezier(0.16,1,0.3,1)]
              group-hover:-translate-y-1
            "
          >
            {copy.title}
          </h3>
        </div>
        <div className="mt-3 flex items-center justify-between">
          <span className="font-mono text-[10px] tracking-[0.24em] text-bone-muted">
            {project.year}
          </span>
          <span
            className="
              inline-flex items-center gap-1.5 font-mono text-[10px] tracking-[0.2em]
              text-bone-dim group-hover:text-signal transition-colors duration-[300ms]
            "
          >
            {t("project.view")}
            <ArrowUpRight />
          </span>
        </div>
      </div>
    </Link>
  );

  if (noAnimate) return card;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{
        duration: motionDurations.reveal,
        delay: i * 0.07,
        ease: premiumEase,
      }}
    >
      {card}
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   HOME — small featured card (used in the bottom strip).
   Wider 16/10 ratio for a horizontal flow on the home page.
   ───────────────────────────────────────────── */

export function ProjectFeatureCard({ project }: { project: Project }) {
  return (
    <ProjectGridCard project={project} aspect="16/10" noAnimate />
  );
}

/* ─────────────────────────────────────────────
   Bits
   ───────────────────────────────────────────── */

function RowImage({
  img,
  cover = false,
}: {
  img: { src: string; alt: string };
  cover?: boolean;
}) {
  return (
    <div className="relative w-full h-full overflow-hidden bg-ink-700">
      <Image
        src={img.src}
        alt={img.alt}
        fill
        sizes={
          cover
            ? "(min-width: 1024px) 60vw, 100vw"
            : "(min-width: 1024px) 20vw, 33vw"
        }
        className="row-image object-cover"
      />
    </div>
  );
}

function ArrowUpRight() {
  return (
    <svg
      className="arrow"
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M2 8L8 2M8 2H3M8 2V7"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="square"
      />
    </svg>
  );
}
