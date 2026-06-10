"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { site } from "@/data/site";
import { footerLinks, navigation } from "@/data/navigation";
import { socials, contact } from "@/data/socials";
import { SocialIcon } from "./SocialIcon";
import { HoverReveal } from "./HoverReveal";

export function Footer() {
  const pathname = usePathname();
  // /2070 is a fullscreen archive plate — it owns the bottom of the viewport too.
  if (pathname?.startsWith("/2070")) return null;

  return (
    <footer className="relative bg-ink-700 border-t border-bone-line mt-32">
      <div className="page-x py-16">
        {/* Top row — "LET'S CREATE" big invitation */}
        <div className="grid grid-cols-12 gap-6 items-end">
          <div className="col-span-12 lg:col-span-8">
            <HoverReveal y={16}>
              <p className="h-eyebrow">LET'S CREATE</p>
            </HoverReveal>
            <div className="overflow-hidden mt-4">
              <HoverReveal y={60} delay={0.1}>
                <Link
                  href={`mailto:${contact.email}`}
                  className="h-display text-[clamp(2.6rem,7vw,6rem)] hover:text-signal transition-colors duration-500 break-words"
                >
                  {contact.emailLabel}
                </Link>
              </HoverReveal>
            </div>
          </div>
          <div className="col-span-12 lg:col-span-4 lg:text-right">
            <p className="h-eyebrow-dim">LOCATION</p>
            <p className="mt-2 font-mono text-[12px] tracking-[0.18em] text-bone uppercase">
              {contact.location} · {contact.timezone}
            </p>
          </div>
        </div>

        {/* Middle row — link columns */}
        <div className="mt-20 grid grid-cols-12 gap-6 pt-12 border-t border-bone-line">
          <div className="col-span-6 md:col-span-3">
            <p className="h-eyebrow-dim">SITEMAP</p>
            <ul className="mt-4 space-y-2">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="font-mono text-[12px] tracking-[0.16em] uppercase text-bone-dim hover:text-bone transition-colors duration-300"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-6 md:col-span-3">
            <p className="h-eyebrow-dim">SOCIAL</p>
            <ul className="mt-4 space-y-2">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 font-mono text-[12px] tracking-[0.16em] uppercase text-bone-dim hover:text-bone transition-colors duration-300"
                  >
                    <SocialIcon name={s.icon} className="w-3.5 h-3.5" />
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-12 md:col-span-6 md:text-right">
            <p className="h-eyebrow-dim">SAY HELLO</p>
            <Link
              href={`mailto:${contact.email}`}
              className="mt-3 inline-block font-display text-2xl md:text-3xl tracking-tight hover:text-signal transition-colors"
            >
              {contact.emailLabel}
            </Link>
            <p className="mt-2 body-sm">{contact.scheduling}</p>
          </div>
        </div>

        {/* HUGE name watermark */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          className="mt-20 -mb-6 overflow-hidden"
        >
          <h2
            aria-hidden
            className="h-display text-[clamp(4rem,18vw,18rem)] text-bone whitespace-nowrap select-none leading-none"
            style={{
              WebkitTextStroke: "1px rgba(255,255,255,0.15)",
              color: "transparent",
              letterSpacing: "-0.035em",
            }}
          >
            THOMAS · TRAVERT · 2070
          </h2>
        </motion.div>

        {/* Bottom row — copyright / availability */}
        <div className="mt-10 pt-6 border-t border-bone-line grid grid-cols-12 gap-3">
          <p className="col-span-12 md:col-span-4 font-mono text-[10px] tracking-[0.22em] text-bone-dim uppercase">
            {site.footer.copyright}
          </p>
          <p className="col-span-12 md:col-span-4 md:text-center font-mono text-[10px] tracking-[0.22em] text-bone-dim uppercase">
            {site.footer.rightsLine}
          </p>
          <p className="col-span-12 md:col-span-4 md:text-right font-mono text-[10px] tracking-[0.22em] text-signal uppercase flex md:justify-end items-center gap-2">
            <span className="block w-1.5 h-1.5 rounded-full bg-signal animate-shimmer" />
            {site.footer.availability}
          </p>
        </div>
      </div>
    </footer>
  );
}
