"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { site } from "@/data/site";
import { socials } from "@/data/socials";
import { SocialIcon } from "./SocialIcon";

/**
 * Fixed left rail.
 *  ─ rotated labels ("TOKYO BASED — CREATIVE DIRECTOR — TRAVERT")
 *  ─ social icons stack
 *  ─ thin animated divider lines
 */
export function SideRail() {
  const pathname = usePathname();
  // /about owns the entire left column with its own cinematic sidebar,
  // and /2070 is a fullscreen archive plate — both pages hide the global rail.
  if (pathname?.startsWith("/about")) return null;
  if (pathname?.startsWith("/2070")) return null;
  if (pathname?.startsWith("/lab")) return null;

  return (
    <aside
      aria-label="Side identity rail"
      className="fixed top-[var(--nav-h)] bottom-0 left-0 w-[var(--rail-w)] z-40 hidden md:flex flex-col items-center justify-between py-6 pointer-events-none"
    >
      {/* Top labels — rotated -90° so they read upward */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col items-center gap-6"
      >
        {/* Top divider line */}
        <span className="block w-px h-10 bg-bone-line" />

        <div className="flex flex-col items-center gap-7">
          {site.sideRail.labels.map((label, i) => (
            <span key={label} className="flex flex-col items-center gap-7">
              <span
                className="font-mono text-[10px] tracking-[0.32em] uppercase text-bone-dim whitespace-nowrap"
                style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
              >
                {label}
              </span>
              {i < site.sideRail.labels.length - 1 && (
                <span className="block w-px h-6 bg-bone-line" />
              )}
            </span>
          ))}
        </div>
      </motion.div>

      {/* Bottom: socials stack */}
      <motion.div
        initial={{ opacity: 0, y: -24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col items-center gap-5 pointer-events-auto"
      >
        {socials.map((s) => (
          <a
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={s.label}
            className="text-bone-dim hover:text-signal transition-colors duration-300"
          >
            <SocialIcon name={s.icon} className="w-4 h-4" />
          </a>
        ))}
        <span className="block w-px h-10 bg-bone-line" />
      </motion.div>
    </aside>
  );
}
