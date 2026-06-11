"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import type { Project } from "@/data/projects";
import { HoverReveal } from "@/components/HoverReveal";

/**
 * Detail-page hero.
 *
 *   ┌─────────────────────────────────────────────────┐
 *   │ ← BACK              [Category]   [01 / 03]      │
 *   │                                                 │
 *   │ MASSIVE TITLE                                   │
 *   │                                                 │
 *   │ Long description           ┌── meta sidebar ──┐ │
 *   │                            │ Client / Year /   │ │
 *   │                            │ Role / Index      │ │
 *   │                            └───────────────────┘ │
 *   ├─────────────────────────────────────────────────┤
 *   │ CINEMATIC HERO IMAGE (subtle parallax)          │
 *   └─────────────────────────────────────────────────┘
 */
export function ProjectHero({
  project,
  position,
  total,
}: {
  project: Project;
  /** 1-based position of the project in the running order */
  position: number;
  total: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  // Gentle 6% parallax — the brief allows subtle parallax only.
  const heroY = useTransform(scrollYProgress, [0, 1], ["-3%", "3%"]);

  const posLabel = `${String(position).padStart(2, "0")} / ${String(total).padStart(2, "0")}`;

  return (
    <header className="pt-[var(--nav-h)]">
      {/* Top eyebrow row */}
      <div className="page-x flex items-center justify-between pt-10 pb-4">
        <Link
          href="/work"
          className="group inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.22em] text-bone-dim hover:text-signal transition-colors"
        >
          <svg
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
            className="transition-transform group-hover:-translate-x-0.5"
          >
            <path
              d="M8 2L2 8M2 8H7M2 8V3"
              stroke="currentColor"
              strokeWidth="1.4"
            />
          </svg>
          BACK TO WORK
        </Link>
        <span className="font-mono text-[11px] tracking-[0.22em] text-bone-muted">
          {posLabel}
        </span>
      </div>

      {/* Title block */}
      <div className="page-x pt-10 pb-12 grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-8">
          <HoverReveal y={16}>
            <p className="flex items-center gap-3 h-eyebrow">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-signal" />
              {project.category}
            </p>
          </HoverReveal>
          <div className="overflow-hidden mt-4">
            <HoverReveal y={60} delay={0.1}>
              <h1 className="h-display text-[clamp(3rem,10vw,9rem)]">
                {project.title}
              </h1>
            </HoverReveal>
          </div>
          {project.subtitle && (
            <HoverReveal y={12} delay={0.18}>
              <p className="mt-2 font-mono text-[12px] tracking-[0.22em] text-bone-dim uppercase">
                {project.subtitle}
              </p>
            </HoverReveal>
          )}
          <HoverReveal y={16} delay={0.28}>
            <p className="mt-7 body-lead max-w-xl">{project.longDescription}</p>
          </HoverReveal>
        </div>

        {/* Meta sidebar */}
        <aside className="col-span-12 lg:col-span-4 lg:pl-6 self-end">
          <dl className="grid grid-cols-2 gap-y-6 gap-x-4 border-t border-bone-line pt-6">
            <Meta label="Client" value={project.client} />
            <Meta label="Year" value={project.year} />
            <Meta label="Role" value={project.role.join(" · ")} />
            <Meta label="Index" value={project.index} />
            {project.tags && (
              <Meta
                label="Tags"
                value={project.tags.join(" · ")}
                spanFull
              />
            )}
          </dl>
        </aside>
      </div>

      {/* HERO IMAGE */}
      <div ref={ref} className="page-x">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full overflow-hidden bg-ink-700"
          style={{ aspectRatio: project.hero.ratio ?? "16/9" }}
        >
          <motion.div className="absolute inset-[-3%]" style={{ y: heroY }}>
            <Image
              src={project.hero.src}
              alt={project.hero.alt}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </motion.div>
        </motion.div>
      </div>
    </header>
  );
}

function Meta({
  label,
  value,
  spanFull = false,
}: {
  label: string;
  value: string;
  spanFull?: boolean;
}) {
  return (
    <div className={spanFull ? "col-span-2" : ""}>
      <dt className="font-mono text-[10px] tracking-[0.22em] text-bone-muted uppercase">
        {label}
      </dt>
      <dd className="mt-2 font-sans text-[13.5px] text-bone leading-snug">
        {value}
      </dd>
    </div>
  );
}
