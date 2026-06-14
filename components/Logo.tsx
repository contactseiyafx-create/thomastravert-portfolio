"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { site } from "@/data/site";
import { motionDurations, premiumEase } from "./motionConfig";

/**
 * Top-left identity block.
 * Logo mark only — the wordmark beside it has been retired.
 */
export function Logo() {
  const reduce = useReducedMotion();

  return (
    <Link
      href="/"
      aria-label={`${site.name} — home`}
      className="flex items-center gap-3 group"
    >
      <motion.span
        className="relative block w-10 h-10 shrink-0 overflow-hidden transition-opacity duration-[250ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:opacity-75"
        initial={reduce ? { opacity: 0 } : { opacity: 0, y: 8, filter: "blur(4px)", clipPath: "inset(0 0 100% 0)" }}
        animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0, filter: "blur(0px)", clipPath: "inset(0 0 0% 0)" }}
        transition={{
          duration: reduce ? 0.18 : motionDurations.hero,
          ease: premiumEase,
        }}
      >
        <Image
          src={site.brand.logoSvg}
          alt={`${site.name} logo`}
          fill
          priority
          sizes="40px"
          className="object-contain"
        />
      </motion.span>
    </Link>
  );
}
