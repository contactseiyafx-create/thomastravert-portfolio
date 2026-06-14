"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { services } from "@/data/services";
import { HoverReveal } from "@/components/HoverReveal";
import { useServiceText } from "./serviceText";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * SERVICES CTA — large editorial ending.
 * Massive title left, contact button right.
 */
export function CTASection() {
  const c = services.cta;
  const text = useServiceText();

  return (
    <section className="pt-24 pb-12 border-t border-bone-line">
      <HoverReveal y={10}>
        <p className="flex items-center gap-3 font-mono text-[11px] tracking-[0.24em] text-bone-dim uppercase">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-signal" />
          {text(c.eyebrow)}
        </p>
      </HoverReveal>

      <div className="mt-8 grid grid-cols-12 gap-6 items-end">
        <div className="col-span-12 lg:col-span-9 overflow-hidden">
          <motion.h2
            initial={{ y: 60, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 1.1, ease: EASE }}
            className="h-display tracking-[-0.02em] leading-[0.92] text-bone whitespace-pre-line"
            style={{ fontSize: "clamp(2.6rem, 8vw, 6.5rem)" }}
          >
            {text(c.title)}
          </motion.h2>
        </div>

        <div className="col-span-12 lg:col-span-3 lg:justify-self-end">
          <HoverReveal y={14} delay={0.2}>
            <Link
              href={c.button.href}
              className="
                group inline-flex items-center justify-between gap-8
                border border-bone-line hover:border-signal
                px-7 py-5 min-w-[260px]
                transition-colors duration-500
              "
            >
              <span className="font-mono text-[12px] tracking-[0.22em] uppercase text-bone">
                {text(c.button.label)}
              </span>
              <span
                className="
                  grid place-items-center w-9 h-9 rounded-full
                  border border-bone-line
                  group-hover:border-signal group-hover:bg-signal group-hover:text-ink
                  transition-all duration-300
                "
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 14 14"
                  fill="none"
                  className="transition-transform duration-300 group-hover:translate-x-0.5"
                >
                  <path
                    d="M3 11L11 3M11 3H4M11 3V10"
                    stroke="currentColor"
                    strokeWidth="1.6"
                  />
                </svg>
              </span>
            </Link>
          </HoverReveal>
        </div>
      </div>
    </section>
  );
}
