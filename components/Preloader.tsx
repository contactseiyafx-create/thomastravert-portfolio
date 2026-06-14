"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { motionDurations, premiumEase } from "./motionConfig";

/**
 * PRELOADER
 * ────────────────────────────────────────────────
 * Fullscreen black intro card — fades in the name + subtitle, runs a
 * subtle blinking INITIALIZING…, then fades the whole layer out into
 * the homepage. Total runtime ≈ 2s.
 *
 * Plays once per browser session via sessionStorage so it doesn't
 * re-fire on every route change. Cleared when the user closes the tab.
 */

const STORAGE_KEY = "tt.preloader.seen";
const EASE = premiumEase;

export function Preloader() {
  // `null` = SSR / not-yet-decided, prevents server/client mismatch flash.
  // `true` = show, `false` = skip (already seen this session).
  const [show, setShow] = useState<boolean | null>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    // Client-only sessionStorage check.
    let seen = false;
    try {
      seen = sessionStorage.getItem(STORAGE_KEY) === "1";
    } catch {
      // sessionStorage can throw in private mode / sandbox — just play once.
    }
    if (seen) {
      setShow(false);
      return;
    }
    setShow(true);
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* ignore */
    }
    // Auto-dismiss after 2000ms total
    const t = setTimeout(() => setShow(false), 2000);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduce ? 0.18 : motionDurations.modalOpen, ease: EASE }}
          // Sit above absolutely everything — Navbar, SideRail, Footer, etc.
          className="fixed inset-0 z-[100] bg-ink grid place-items-center pointer-events-none"
          aria-hidden
        >
          <div className="text-center px-6 max-w-[92vw]">
            {/* TRAVERT THOMAS */}
            <motion.h1
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 12, filter: "blur(4px)" }}
              animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: reduce ? 0.18 : 0.95, ease: EASE, delay: reduce ? 0 : 0.1 }}
              className="h-display tracking-[-0.02em] text-bone leading-[0.95]"
              style={{ fontSize: "clamp(2.5rem, 7vw, 5.5rem)" }}
            >
              TRAVERT THOMAS
            </motion.h1>

            {/* ART DIRECTOR / & SENIOR MULTIMEDIA DESIGNER — stacked */}
            <motion.p
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 8, filter: "blur(4px)" }}
              animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: reduce ? 0.18 : 0.85, ease: EASE, delay: reduce ? 0 : 0.55 }}
              className="
                mt-5 font-mono text-[10px] sm:text-[11px]
                tracking-[0.28em] uppercase text-bone-dim
                leading-[1.7]
              "
            >
              ART DIRECTOR
              <br />
              &amp; SENIOR MULTIMEDIA DESIGNER
            </motion.p>

            {/* INITIALIZING… — blinking signal pink */}
            <motion.p
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 6, filter: "blur(3px)" }}
              animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: reduce ? 0.18 : 0.75, ease: EASE, delay: reduce ? 0 : 0.95 }}
              className="
                mt-9 inline-flex items-center gap-2.5
                font-mono text-[10px] tracking-[0.32em] uppercase
              "
              style={{ color: "#FF2E88" }}
            >
              <span
                className="inline-block w-1.5 h-1.5 rounded-full"
                style={{ background: "#FF2E88" }}
              />
              INITIALIZING…
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
