"use client";

import { motion } from "framer-motion";
import { services } from "@/data/services";
import { HoverReveal } from "@/components/HoverReveal";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * PROCESS — HOW I WORK
 * 4 editorial step cards in a single row on desktop, stacking on mobile.
 */
export function ProcessSection() {
  const p = services.process;

  return (
    <section className="pt-24 pb-16 border-t border-bone-line">
      <div className="grid grid-cols-12 gap-6 mb-12 items-end">
        <div className="col-span-12 lg:col-span-7 overflow-hidden">
          <HoverReveal y={10}>
            <p className="flex items-center gap-3 font-mono text-[11px] tracking-[0.24em] text-bone-dim uppercase">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-signal" />
              {p.eyebrow}
            </p>
          </HoverReveal>
          <HoverReveal y={60} delay={0.1}>
            <h2
              className="mt-4 h-display tracking-[-0.02em] leading-[0.95] text-bone"
              style={{ fontSize: "clamp(2.5rem, 7vw, 5.5rem)" }}
            >
              {p.title}
            </h2>
          </HoverReveal>
        </div>
      </div>

      <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        {p.steps.map((step, i) => (
          <motion.li
            key={step.index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.85, delay: 0.1 + i * 0.08, ease: EASE }}
            className="
              group relative p-7 md:p-8 h-full
              border border-bone-line bg-ink/40
              hover:border-signal/60 hover:bg-ink-700/60
              transition-colors duration-500
            "
          >
            <span className="font-mono text-[10px] tracking-[0.24em] text-signal">
              {step.index}
            </span>
            <h3
              className="mt-5 h-display tracking-tight text-bone leading-none"
              style={{ fontSize: "clamp(1.5rem, 2.2vw, 2rem)" }}
            >
              {step.title}
            </h3>
            <p className="mt-4 text-[13.5px] leading-relaxed text-bone-dim">
              {step.body}
            </p>

            {/* Top accent line on hover */}
            <span
              aria-hidden
              className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-signal to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            />
          </motion.li>
        ))}
      </ol>
    </section>
  );
}
