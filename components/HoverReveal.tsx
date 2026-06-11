"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

type Props = {
  children: React.ReactNode;
  delay?: number;
  /** trigger on scroll into view (default true) */
  scroll?: boolean;
  className?: string;
  /** Pixels of initial y-offset (default 24) */
  y?: number;
};

/**
 * Single-line reveal.  Wrap a span/headline element to get a clean "rise" entrance.
 * Use overflow-hidden on the *parent* if you want a mask effect.
 */
export function HoverReveal({
  children,
  delay = 0,
  scroll = true,
  className,
  y = 24,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={scroll && !inView ? { opacity: 0, y } : { opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * Multi-line reveal that staggers each child line.
 * Pass strings as children; each renders inside its own mask.
 */
export function LineReveal({
  lines,
  baseDelay = 0,
  stagger = 0.07,
  className,
}: {
  lines: string[];
  baseDelay?: number;
  stagger?: number;
  className?: string;
}) {
  return (
    <div className={className}>
      {lines.map((line, i) => (
        <div key={i} className="overflow-hidden">
          <HoverReveal delay={baseDelay + i * stagger} y={28}>
            <span className="block">{line}</span>
          </HoverReveal>
        </div>
      ))}
    </div>
  );
}
