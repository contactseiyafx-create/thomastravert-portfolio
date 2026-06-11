"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { navigation } from "@/data/navigation";
import { socials, contact } from "@/data/socials";
import { site } from "@/data/site";
import { SocialIcon } from "./SocialIcon";

type Props = { onClose: () => void };

const linkVariants = {
  hidden: { y: "110%", opacity: 0 },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: { delay: 0.18 + i * 0.06, duration: 0.65, ease: [0.16, 1, 0.3, 1] },
  }),
};

/**
 * Full-screen drawer/menu.
 * Lives over everything when open.
 */
export function MobileMenu({ onClose }: Props) {
  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="fixed inset-0 z-40 bg-ink"
    >
      {/* Background panel reveal */}
      <motion.div
        initial={{ y: "-100%" }}
        animate={{ y: 0 }}
        exit={{ y: "-100%" }}
        transition={{ duration: 0.8, ease: [0.65, 0, 0.35, 1] }}
        className="absolute inset-0 bg-ink-700"
      />

      <div className="relative h-full page-x pt-[var(--nav-h)] pb-12 flex flex-col">
        {/* Big nav links */}
        <ul className="flex-1 flex flex-col justify-center gap-2 md:gap-3">
          {navigation.map((item, i) => (
            <li key={item.href} className="overflow-hidden">
              <motion.span
                custom={i}
                initial="hidden"
                animate="visible"
                variants={linkVariants}
                className="block"
              >
                <Link
                  onClick={onClose}
                  href={item.href}
                  className={`h-display block text-[clamp(3.5rem,11vw,9rem)] leading-[0.86] tracking-tight hover:text-signal transition-colors duration-500 ${
                    item.accent ? "text-signal" : ""
                  }`}
                >
                  {item.label}
                </Link>
              </motion.span>
            </li>
          ))}
        </ul>

        {/* Footer block */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="border-t border-bone-line pt-6 flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div className="space-y-2">
            <p className="h-eyebrow-dim">CONTACT</p>
            <a
              href={`mailto:${contact.email}`}
              className="font-display text-2xl tracking-tight hover:text-signal transition-colors"
            >
              {contact.emailLabel}
            </a>
            <p className="body-sm">{contact.location} · {contact.timezone}</p>
          </div>

          <div className="flex items-center gap-4">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="text-bone-dim hover:text-signal transition-colors duration-300"
              >
                <SocialIcon name={s.icon} className="w-5 h-5" />
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
