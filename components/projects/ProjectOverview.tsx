"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { Project } from "@/data/projects";
import { HoverReveal } from "@/components/HoverReveal";
import { useLanguage } from "@/components/LanguageProvider";
import { motionDurations, premiumEase } from "@/components/motionConfig";
import { useProjectCopy } from "./projectCopy";

/**
 * Detail-page overview block.
 *   ┌─ THE APPROACH ─────────────────┬─ DELIVERABLES ───┐
 *   │ Editorial paragraph(s)         │ Bullet list      │
 *   └────────────────────────────────┴──────────────────┘
 *   [optional 3-up highlights cards]
 */
export function ProjectOverview({ project }: { project: Project }) {
  const { t } = useLanguage();
  const copy = useProjectCopy(project);
  const reduce = useReducedMotion();
  const hasHighlights = !!copy.highlights && copy.highlights.length > 0;

  return (
    <section className="page-x pt-24 pb-16 border-t border-bone-line mt-20">
      <div className="grid grid-cols-12 gap-8">
        {/* LEFT — narrative */}
        <div className="col-span-12 lg:col-span-7">
          <HoverReveal y={8}>
            <p className="h-eyebrow-dim">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-signal align-middle mr-2" />
              {t("project.approach")}
            </p>
          </HoverReveal>
          <HoverReveal y={20} delay={0.1}>
            <h2 className="mt-6 h-display text-[clamp(2rem,4vw,3.25rem)] leading-[0.95]">
              {t("project.approachTitle")}
            </h2>
          </HoverReveal>
          <HoverReveal y={14} delay={0.22}>
            <p className="mt-7 body-lead leading-[1.7] max-w-xl">
              {copy.longDescription}
            </p>
          </HoverReveal>
          {copy.disclaimer && (
            <HoverReveal y={10} delay={0.32}>
              <p className="mt-6 flex items-start gap-3 max-w-xl font-mono text-[11px] tracking-[0.14em] uppercase text-bone-muted leading-relaxed">
                <span
                  aria-hidden
                  className="block w-1.5 h-1.5 rounded-full bg-signal mt-1.5 shrink-0"
                />
                <span>{copy.disclaimer}</span>
              </p>
            </HoverReveal>
          )}
        </div>

        {/* RIGHT — deliverables */}
        {copy.deliverables && copy.deliverables.length > 0 && (
          <div className="col-span-12 lg:col-span-4 lg:col-start-9">
            <HoverReveal y={8}>
              <p className="h-eyebrow-dim">{t("project.deliverables")}</p>
            </HoverReveal>
            <ul className="mt-6 divide-y divide-bone-line border-t border-b border-bone-line">
              {copy.deliverables.map((d, i) => (
                <HoverReveal key={d} y={10} delay={0.1 + i * 0.04}>
                  <li className="flex items-center justify-between py-3.5">
                    <span className="font-mono text-[12px] tracking-[0.16em] text-bone uppercase">
                      {d}
                    </span>
                    <span className="font-mono text-[10px] tracking-[0.22em] text-bone-muted">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </li>
                </HoverReveal>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* HIGHLIGHTS — 3-up cards */}
      {hasHighlights && (
        <div className="mt-20">
          <HoverReveal y={8}>
            <p className="h-eyebrow-dim">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-signal align-middle mr-2" />
              {t("project.highlights")}
            </p>
          </HoverReveal>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
            {copy.highlights!.map((h, i) => (
              <motion.article
                key={h.title}
                initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24, filter: "blur(6px)" }}
                whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{
                  duration: reduce ? 0.18 : motionDurations.reveal,
                  delay: reduce ? 0 : 0.1 + i * 0.08,
                  ease: premiumEase,
                }}
                className="
                  group relative p-6 md:p-7
                  border border-bone-line bg-gradient-to-b from-ink-700 to-ink-800
                  hover:border-signal/60 transition-colors duration-[350ms]
                "
              >
                <span className="font-mono text-[10px] tracking-[0.22em] text-signal">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 h-display text-[clamp(1.05rem,1.6vw,1.4rem)] leading-[1.05]">
                  {h.title}
                </h3>
                <p className="mt-3 body-sm leading-relaxed">{h.body}</p>
                <span
                  aria-hidden
                  className="
                    absolute inset-x-0 top-0 h-px
                    bg-gradient-to-r from-transparent via-signal to-transparent
                    opacity-0 group-hover:opacity-100 transition-opacity duration-500
                  "
                />
              </motion.article>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
