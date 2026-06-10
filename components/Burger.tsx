"use client";

import { motion } from "framer-motion";

type Props = {
  open: boolean;
  onClick: () => void;
};

/**
 * Circle-bordered burger.  Two lines that morph to an X.
 * Matches the reference (round outline, thin lines).
 */
export function Burger({ open, onClick }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={open ? "Close menu" : "Open menu"}
      aria-expanded={open}
      className="relative w-11 h-11 rounded-full border border-bone-line text-bone grid place-items-center transition-colors duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-signal hover:text-signal group"
    >
      <span className="relative block w-[14px] h-[10px]">
        <motion.span
          className="absolute left-0 right-0 h-[1.2px] bg-current origin-center"
          animate={
            open
              ? { top: "50%", y: "-50%", rotate: 45 }
              : { top: "2px", y: 0, rotate: 0 }
          }
          transition={{ duration: 0.45, ease: [0.65, 0, 0.35, 1] }}
        />
        <motion.span
          className="absolute left-0 right-0 h-[1.2px] bg-current origin-center"
          animate={
            open
              ? { top: "50%", y: "-50%", rotate: -45 }
              : { top: "auto", bottom: "2px", rotate: 0 }
          }
          transition={{ duration: 0.45, ease: [0.65, 0, 0.35, 1] }}
        />
      </span>
    </button>
  );
}
