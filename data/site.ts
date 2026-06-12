/**
 * SITE-WIDE CONFIGURATION
 * ─────────────────────────────────────────────
 * Edit anything here. Components only render data.
 * No copy is hardcoded inside components.
 */

export const site = {
  /* SEO + identity */
  name: "Travert Thomas",
  shortName: "TVT",
  domain: "thomastravert.com",
  url: "https://thomastravert.com",
  description:
    "Tokyo-based art director & multimedia designer. Crafting visuals that move people — from concept to final pixel.",
  ogImage: "/images/og.jpg",
  locale: "en_US",

  /* Brand */
  brand: {
    wordmark: "2070",
    logoSvg: "/logotvtthomas.svg",
    role: "Creative Director",
    city: "Tokyo",
    cityJp: "東京",
    handle: "@thomastravert",
  },

  /* Hero */
  hero: {
    eyebrow: "TOKYO BASED",
    titleLine1: "TRAVERT",
    titleLine2: "THOMAS",
    nameJp: "トラバト・トーマス",
    role: "ART DIRECTOR",
    roleLine2: "& MULTIMEDIA DESIGNER",
    intro: [
      "I craft visuals that move people.",
      "From concept to final pixel,",
      "I build stories that leave a mark.",
    ],
    primaryCta: { label: "VIEW MY WORK", href: "/work" },
    secondaryCta: { label: "PLAY REEL", href: "/motion" },

    /**
     * BACKGROUND SLOT
     * ───────────────────────────────────────────
     * This is intentionally empty so you can drop in
     * your After Effects composition later.
     *
     *  - kind: "empty"   → renders nothing (default)
     *  - kind: "image"   → fills with src
     *  - kind: "video"   → autoplays muted loop from src
     *  - kind: "lottie"  → reserved for future Lottie/JSON
     */
    background: {
      kind: "video" as "empty" | "image" | "video" | "lottie",
      src: "/videos/showreel-hero-bg.mp4",
      poster: "/videos/showreel-hero-poster.jpg",
      // Show subtle ambient grain + vignette so the slot has atmosphere
      // even before you populate it.
      ambient: true,
    },
  },

  /* Footer */
  footer: {
    copyright: "© 2070 TRAVERT THOMAS",
    availability: "AVAILABLE FOR NEW PROJECTS",
    rightsLine: "ALL RIGHTS RESERVED",
  },

  /* Side rail */
  sideRail: {
    labels: ["TOKYO BASED", "CREATIVE DIRECTOR", "TRAVERT"],
  },

  /* CTAs in navbar */
  cta: {
    primary: { label: "LET'S CREATE", href: "/contact" },
  },

  /* Quote card (home, right column) */
  quote: {
    jp: "美は細部に宿る",
    en: "BEAUTY LIVES IN DETAILS.",
    attribution: "— TRAVERT THOMAS",
  },

  /* Featured-projects strip (home) — IDs map to projects.ts */
  featuredProjects: ["nexbank", "luxury-garden", "alpine-rhinoshield"],
} as const;

export type SiteConfig = typeof site;
