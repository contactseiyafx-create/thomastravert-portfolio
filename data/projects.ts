/**
 * PROJECTS
 * ─────────────────────────────────────────────
 * Centralized editable source for every project on the site.
 * Add a new project = duplicate one of these objects.
 * Drop images into /public/projects/<slug>/ and reference them here.
 *
 * Image paths follow the brief exactly:
 *   /public/projects/nexbank/        6_fullwitdh.png, 1.png … 4.png
 *   /public/projects/alpine/         AlpineThumb.jpg, 1.png … 6.png
 *   /public/projects/luxurygarden/   lg1.png … lg6.png
 */

export type ProjectCategory =
  | "ART DIRECTION"
  | "ART DIRECTION / UI DESIGN"
  | "3D ART DIRECTION"
  | "MOTION DESIGN"
  | "CGI"
  | "ILLUSTRATION"
  | "BRANDING"
  | "BRANDING / MERCH";

export type ProjectImage = {
  src: string;
  alt: string;
  /** Aspect ratio hint for layouts that respect it, e.g. "16/9", "21/9", "1/1" */
  ratio?: string;
  /** Optional caption for the gallery */
  caption?: string;
};

export type Highlight = {
  title: string;
  body: string;
};

export type Project = {
  /** URL slug — also the folder name in /public/projects/ */
  slug: string;
  /** Index displayed in the work-list e.g. "01" */
  index: string;
  /** Title shown big and condensed */
  title: string;
  /** Optional small "AKA" line under the title */
  subtitle?: string;
  /** One-line category label */
  category: ProjectCategory;
  /** Short list-page description (2 lines max recommended) */
  shortDescription: string;
  /** Long detail-page description (paragraph) */
  longDescription: string;
  /** Year of completion */
  year: string;
  /** Client / brand */
  client: string;
  /** Role(s) you took */
  role: string[];
  /** Deliverables shipped */
  deliverables?: string[];
  /** Hero thumbnail (used in work grid + featured strip) */
  thumbnail: ProjectImage;
  /** Optional secondary thumbnails — Alpine card can show extras side-by-side */
  thumbnailExtras?: ProjectImage[];
  /** Hero visual on the detail page */
  hero: ProjectImage;
  /** Editorial gallery on the detail page */
  gallery: ProjectImage[];
  /** Optional bullet-highlights block */
  highlights?: Highlight[];
  /** Optional motion / video block — hides cleanly if undefined */
  motion?: {
    src: string;
    poster?: string;
    caption?: string;
  };
  /** Optional external link (live URL, video, etc.) */
  externalUrl?: string;
  /** Tags shown in detail header */
  tags?: string[];
  /** Featured on home? */
  featured?: boolean;
};

/* ───────────────────────── Projects ───────────────────────── */

export const projects: Project[] = [
  {
    slug: "nexbank",
    index: "01",
    title: "NEXBANK",
    category: "ART DIRECTION / UI DESIGN",
    shortDescription:
      "FUTURISTIC DIGITAL BANKING\nEXPERIENCE & BRAND SYSTEM",
    longDescription:
      "Nexbank is a near-future banking proposition built around a single object: a black metal card that thinks. The visual system rejects the friendly-pastel fintech trope and pushes towards quiet technology — embossed metal, micro-typography, and motion that behaves more like a luxury timepiece than a payment app.",
    year: "2026",
    client: "Nexbank (concept)",
    role: ["Art Direction", "UI Design", "CGI"],
    deliverables: [
      "Brand identity",
      "Card design & CGI",
      "Product UI",
      "Marketing site",
    ],
    thumbnail: {
      src: "/projects/nexbank/6_fullwitdh.png",
      alt: "Nexbank — embossed black card",
      ratio: "16/9",
    },
    hero: {
      src: "/projects/nexbank/6_fullwitdh.png",
      alt: "Nexbank — embossed black card hero",
      ratio: "16/9",
    },
    gallery: [
      {
        src: "/projects/nexbank/1.png",
        alt: "Nexbank — card collection picker",
        ratio: "3/2",
        caption: "Card picker — sequel to the Apple Card moment.",
      },
      {
        src: "/projects/nexbank/2.png",
        alt: "Nexbank — pricing plans on macOS",
        ratio: "3/2",
        caption: "Pricing — Standard, Premium, Business tiers.",
      },
      {
        src: "/projects/nexbank/3.png",
        alt: "Nexbank — bespoke platform features",
        ratio: "3/2",
        caption: "Bespoke platform — four iridescent feature glyphs.",
      },
      {
        src: "/projects/nexbank/4.png",
        alt: "Nexbank — money for here, there & everywhere stats",
        ratio: "16/9",
        caption: "Global stats — 20+ currencies · $5MM daily · 160+ countries.",
      },
    ],
    highlights: [
      {
        title: "QUIET TECHNOLOGY",
        body: "No emoji, no gradients-on-gradients. The card does the talking; the UI just frames it.",
      },
      {
        title: "ONE WARM ACCENT",
        body: "A single orange signal across every surface — typography, CTAs, glyphs — to keep the system focused.",
      },
      {
        title: "EDITORIAL UI",
        body: "Marketing surfaces read like a magazine spread before they read like an app.",
      },
    ],
    tags: ["Fintech", "Identity", "CGI"],
    featured: true,
  },
  {
    slug: "luxury-garden",
    index: "02",
    title: "LUXURY GARDEN",
    category: "3D ART DIRECTION",
    shortDescription:
      "SURREAL LUXURY EXHIBITION\nFOR HIGH-END FASHION HOUSES",
    longDescription:
      "A speculative exhibition series imagining how Maisons would advertise inside concrete arenas, brutalist galleries, and lit underground walkways. Every billboard composition was sculpted as a standalone editorial still — a study of how luxury icons survive when stripped of the boutique.",
    year: "2025",
    client: "Personal project · concept",
    role: ["3D Art Direction", "Set Design", "Compositing"],
    deliverables: [
      "Concrete arena renders",
      "Underground gallery series",
      "Brand integrations · LV, Chanel, Dior",
    ],
    thumbnail: {
      src: "/projects/luxurygarden/lg1.png",
      alt: "Luxury Garden — underground gallery row of pink LV billboards",
      ratio: "21/9",
    },
    hero: {
      src: "/projects/luxurygarden/lg1.png",
      alt: "Luxury Garden — underground gallery hero",
      ratio: "21/9",
    },
    gallery: [
      {
        src: "/projects/luxurygarden/lg6.png",
        alt: "Luxury Garden — LV billboard inside concrete arena",
        ratio: "16/9",
        caption: "LV in concrete — a single billboard in raw architecture.",
      },
      {
        src: "/projects/luxurygarden/lg2.png",
        alt: "Luxury Garden — Chanel No.5 floral billboard",
        ratio: "3/2",
        caption: "Chanel No.5 — roses, sunburst, glass.",
      },
      {
        src: "/projects/luxurygarden/lg3.png",
        alt: "Luxury Garden — Dior storefront billboard",
        ratio: "3/2",
        caption: "Dior storefront — terracotta and brass.",
      },
      {
        src: "/projects/luxurygarden/lg4.png",
        alt: "Luxury Garden — montage of the series",
        ratio: "16/9",
        caption: "Series montage — Chanel, LV, Dior.",
      },
    ],
    highlights: [
      {
        title: "ONE ARTWORK, MANY ARENAS",
        body: "Each Maison gets a single hero piece, placed into wildly different architectures.",
      },
      {
        title: "BRUTALIST CONTRAST",
        body: "Concrete and grit hold up against the pastels and gilt — the tension does the work.",
      },
    ],
    tags: ["Luxury", "3D", "Editorial"],
    featured: true,
  },
  {
    slug: "alpine-rhinoshield",
    index: "03",
    title: "ALPINE × RHINOSHIELD",
    category: "BRANDING / MERCH",
    shortDescription:
      "OFFICIAL F1 MERCHANDISE CAPSULE\nART DIRECTION & ILLUSTRATION",
    longDescription:
      "A merchandise capsule and launch campaign for the Alpine F1 × Rhinoshield collaboration. The system leans into BWT pink, motion-blur lighting, and hand-drawn speed lines — built to live on phones, at the track, and on a tee.",
    year: "2024",
    client: "Alpine F1 Team × Rhinoshield",
    role: ["Art Direction", "Illustration", "Campaign"],
    deliverables: [
      "Case artwork series",
      "Launch campaign visuals",
      "Driver portrait series",
    ],
    thumbnail: {
      src: "/projects/alpine/AlpineThumb.jpg",
      alt: "Alpine × Rhinoshield — official product thumbnail",
      ratio: "4/3",
    },
    hero: {
      src: "/projects/alpine/1.png",
      alt: "Alpine × Rhinoshield — official product hero",
      ratio: "4/3",
    },
    gallery: [
      {
        src: "/projects/alpine/5.png",
        alt: "Alpine illustrations — three race-car artworks",
        ratio: "2/1",
        caption: "Illustration series — F1, Endurance, top-down.",
      },
      {
        src: "/projects/alpine/4.png",
        alt: "Alpine driver portraits — Esteban, Pierre, duo",
        ratio: "2/1",
        caption: "Driver series — Esteban, Pierre, and the duo.",
      },
      {
        src: "/projects/alpine/3.png",
        alt: "Alpine car series — close-up case artwork",
        ratio: "2/1",
        caption: "Car series — case-by-case artwork.",
      },
      {
        src: "/projects/alpine/2.png",
        alt: "Alpine F1 Drivers product line-up",
        ratio: "2/1",
        caption: "F1 Drivers line-up — pink, blue, neon.",
      },
      {
        src: "/projects/alpine/6.png",
        alt: "Alpine × Rhinoshield campaign grid",
        ratio: "3/2",
        caption: "Campaign grid — eight visuals, one capsule.",
      },
    ],
    highlights: [
      {
        title: "SPEED-LINE LANGUAGE",
        body: "Manga-style brush lines fight for attention with photographic race cars — every case is a poster.",
      },
      {
        title: "BWT PINK SYSTEM",
        body: "Pink and royal blue carry across illustrations, portraits and campaign — one capsule, one signal.",
      },
      {
        title: "MULTI-PLATFORM",
        body: "Artwork adapted for iPhone, Android, Pixel and Galaxy — without losing the editorial intent.",
      },
    ],
    tags: ["F1", "Merch", "Illustration"],
    featured: true,
  },
];

/* ───────────────────────── Taxonomy + helpers ───────────────────────── */

/** Filter taxonomy for the work page — shown left-to-right exactly. */
export const projectFilters: Array<"ALL" | ProjectCategory> = [
  "ALL",
  "ART DIRECTION",
  "ART DIRECTION / UI DESIGN",
  "3D ART DIRECTION",
  "MOTION DESIGN",
  "CGI",
  "ILLUSTRATION",
  "BRANDING / MERCH",
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getFeatured(): Project[] {
  return projects.filter((p) => p.featured);
}

/**
 * Returns the next project in the running order — used by NextProject.
 * Loops back to the first after the last project.
 */
export function getNextProject(slug: string): Project {
  const idx = projects.findIndex((p) => p.slug === slug);
  return projects[(idx + 1) % projects.length];
}
