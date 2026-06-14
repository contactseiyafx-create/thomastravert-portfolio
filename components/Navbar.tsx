"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { navigation } from "@/data/navigation";
import { site } from "@/data/site";
import { Logo } from "./Logo";
import { CTAButton } from "./CTAButton";
import { Burger } from "./Burger";
import { MobileMenu } from "./MobileMenu";
import { LanguageToggle } from "./LanguageToggle";
import { navTranslationKey, useLanguage } from "./LanguageProvider";

/**
 * Top navbar.
 * - Hides on scroll-down, returns on scroll-up.
 * - Backdrop blurs as you leave the hero.
 */
export function Navbar() {
  const pathname = usePathname();
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);

  /* Scroll-aware behavior */
  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      // Hide after scrolling down past 240px, show on any scroll-up
      if (y > 240 && y > lastY) setHidden(true);
      else setHidden(false);
      lastY = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={false}
        animate={{ y: hidden ? -90 : 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 inset-x-0 z-50 ${
          scrolled
            ? "bg-ink/70 backdrop-blur-md border-b border-bone-line"
            : "bg-transparent"
        } transition-[background-color,backdrop-filter,border-color] duration-500`}
      >
        <nav
          className="page-x flex items-center h-[var(--nav-h)]"
          aria-label="Primary"
        >
          {/* LEFT: logo */}
          <div className="flex items-center gap-8">
            <Logo />
          </div>

          {/* CENTER: nav links (desktop) */}
          <ul className="hidden md:flex items-center gap-8 mx-auto">
            {navigation.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href !== "/" && pathname?.startsWith(item.href));
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    data-active={isActive ? "true" : "false"}
                    className={`nav-underline font-mono text-[11px] tracking-[0.22em] uppercase transition-colors duration-300 ${
                      isActive
                        ? "text-signal"
                        : item.accent
                        ? "text-signal/90 hover:text-signal"
                        : "text-bone hover:text-bone"
                    }`}
                  >
                    {t(navTranslationKey(item.href))}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* RIGHT: CTA + burger */}
          <div className="ml-auto md:ml-0 flex items-center gap-3">
            <div className="hidden sm:block">
              <CTAButton
                label={t("cta.create")}
                href={site.cta.primary.href}
              />
            </div>
            <div className="hidden md:block">
              <LanguageToggle compact />
            </div>
            <Burger open={open} onClick={() => setOpen((v) => !v)} />
          </div>
        </nav>
      </motion.header>

      {/* Mobile / off-canvas menu */}
      <AnimatePresence>
        {open && <MobileMenu onClose={() => setOpen(false)} />}
      </AnimatePresence>
    </>
  );
}
