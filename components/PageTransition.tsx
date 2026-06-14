"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import { motionDurations, premiumEase } from "./motionConfig";

/**
 * Per-route fade + tiny slide.  Subtle by design.
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const reduce = useReducedMotion();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={reduce ? { opacity: 0 } : { opacity: 0, y: 18, filter: "blur(8px)" }}
        animate={{
          ...(reduce ? { opacity: 1 } : { opacity: 1, y: 0, filter: "blur(0px)" }),
          transition: {
            duration: reduce ? 0.18 : motionDurations.pageEnter,
            ease: premiumEase,
          },
        }}
        exit={{
          ...(reduce ? { opacity: 0 } : { opacity: 0, y: -12, filter: "blur(6px)" }),
          transition: {
            duration: reduce ? 0.18 : motionDurations.pageExit,
            ease: premiumEase,
          },
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
