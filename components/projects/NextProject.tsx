"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Project } from "@/data/projects";
import { HoverReveal } from "@/components/HoverReveal";
import { useLanguage } from "@/components/LanguageProvider";
import { useProjectCopy } from "./projectCopy";

/**
 * NEXT PROJECT navigation.
 *
 * Style:
 *   - full-width banner, dark by default
 *   - on hover: thumbnail fades in behind the title, title nudges up
 *   - tap target = the whole banner
 */
export function NextProject({ next }: { next: Project }) {
  const { t } = useLanguage();
  const copy = useProjectCopy(next);

  return (
    <section className="relative border-t border-bone-line">
      <Link
        href={`/work/${next.slug}`}
        className="group relative block overflow-hidden"
      >
        {/* Background image — appears on hover */}
        <div className="absolute inset-0">
          <Image
            src={next.thumbnail.src}
            alt=""
            fill
            sizes="100vw"
            className="
              object-cover
              opacity-0 group-hover:opacity-40
              scale-105 group-hover:scale-100
              transition-[opacity,transform] duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)]
            "
            aria-hidden
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-ink/60 group-hover:bg-ink/40 transition-colors duration-700"
          />
        </div>

        {/* Content */}
        <div className="relative page-x py-28 md:py-36 lg:py-44">
          <div className="flex items-center justify-between mb-8">
            <HoverReveal y={10}>
              <p className="font-mono text-[11px] tracking-[0.24em] text-bone-dim flex items-center gap-3">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-signal" />
                {t("project.nextProject")}
              </p>
            </HoverReveal>
            <HoverReveal y={10} delay={0.05}>
              <p className="font-mono text-[11px] tracking-[0.24em] text-bone-muted">
                {next.index}
              </p>
            </HoverReveal>
          </div>

          <div className="overflow-hidden">
            <motion.h2
              className="h-display text-[clamp(2.5rem,8.5vw,8rem)] leading-[0.95] tracking-[-0.02em] leading-[0.9]"
              initial={{ y: 0 }}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              {copy.title}
            </motion.h2>
          </div>

          <div className="mt-6 flex items-center justify-between gap-6 flex-wrap">
            <HoverReveal y={10} delay={0.1}>
              <p className="h-eyebrow-dim">{copy.category}</p>
            </HoverReveal>
            <HoverReveal y={10} delay={0.16}>
              <span
                className="
                  inline-flex items-center gap-3 font-mono text-[11px] tracking-[0.22em] uppercase
                  text-bone-dim group-hover:text-signal transition-colors duration-300
                "
              >
                {t("project.enter")}
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  className="transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-0.5"
                >
                  <path
                    d="M3 11L11 3M11 3H4M11 3V10"
                    stroke="currentColor"
                    strokeWidth="1.4"
                  />
                </svg>
              </span>
            </HoverReveal>
          </div>
        </div>
      </Link>
    </section>
  );
}
