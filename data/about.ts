/**
 * ABOUT PAGE
 * ─────────────────────────────────────────────
 * Everything on /about is driven from here. Edit text,
 * swap images, reorder lists — no component changes needed.
 *
 *   character image →  /public/about-character.png
 *                      then flip sidebar.character.enabled to `true`.
 *   logos          →  /public/logos/<name>.svg
 *                      then set `src` on each trustedLogos.items entry.
 */

export type AwardItem = {
  /** Short brand or trophy mark — shown big on the card */
  mark: string;
  /** Card title (uppercased automatically) */
  title: string;
  /** One-line subtitle */
  subtitle: string;
  /** Year */
  year: string;
};

export type ReferenceItem = {
  brand: string;
  project: string;
  /** External URL. If present, the row becomes a clickable link (opens in new tab). */
  url?: string;
};

export type LogoItem = {
  name: string;
  /** Path under /public, e.g. "/logos/adobe.svg". Leave "" for placeholder block. */
  src: string;
};

export const about = {
  /* ───────── eyebrow + meta ───────── */
  meta: {
    indexLabel: "01",
    sectionLabel: "ABOUT ME",
  },

  /* ───────── left cinematic sidebar ───────── */
  sidebar: {
    verticalLabel: "TOKYO BASED",
    yearMark: "2026",
    /**
     * CHARACTER PORTRAIT SLOT
     * Drop your image at /public/about-character.png and
     * flip `enabled` to true. Until then, an elegant
     * placeholder block renders in its place.
     */
    character: {
      src: "/about-character.png",
      alt: "Thomas Travert — character portrait",
      enabled: true,
    },
    email: "thomastravertpro@gmail.com",
    copyright: "© 2026 THOMAS TRAVERT",
    rightsLine: "ALL RIGHTS RESERVED",
  },

  /* ───────── hero ───────── */
  hero: {
    title: "THOMAS TRAVERT",
    /** Handwritten script overlay under the title */
    signature: "Thomas Travert",
    eyebrow: "TOKYO BASED",
    roles: ["GRAPHIC / MOTION DESIGNER", "CGI ART DIRECTOR"],
    bio: "I craft cinematic visual experiences blending CGI, motion design and futuristic storytelling inspired by Tokyo nightlife, technology and digital culture.",
  },

  /* ───────── awards (3-col cards) ───────── */
  awards: {
    eyebrow: "AWARDS",
    items: [
      {
        mark: "A×S",
        title: "ADOBE × SONY ANIMATIONS",
        subtitle: "Spider-Verse Contest Winner",
        year: "2023",
      },
      {
        mark: "TOP 25",
        title: "TOP 25 WORLDWIDE",
        subtitle: "Adobe × Marshmello Content Campaign",
        year: "2022",
      },
      {
        mark: "XP PEN",
        title: "XP PEN FRANCE",
        subtitle: "Ambassador",
        year: "2024",
      },
    ] satisfies AwardItem[],
  },

  /* ───────── references (2-col editorial list) ───────── */
  references: {
    eyebrow: "REFERENCES",
    items: [
      {
        brand: "Adobe Design",
        project: "Daft Punk 2070 Remastered",
        url: "https://x.com/AdobeDesign/status/1398140736919453696",
      },
      {
        brand: "Adobe France",
        project: "Daft Punk 2070",
        url: "https://x.com/AdobeFrance/status/1131273828003401729",
      },
      {
        brand: "Wacom",
        project: "Artwork of #Clintiq22HD",
        url: "https://x.com/wacom/status/953318939660029952",
      },
      {
        brand: "XP Pen France",
        project: "Ambassador France",
        url: "https://x.com/SeiyaFX/status/1635982930248974339",
      },
      {
        brand: "Adobe Creative Cloud Live Conference 99",
        project: "Portfolio Review",
        url: "https://www.youtube.com/watch?v=xixEel-itVA",
      },
      {
        brand: "Adobe Design & Layout",
        project: "DaftPunk 2070",
        url: "https://x.com/AdobeDesign/status/884623299652669441",
      },
      {
        brand: "Adobe Illustration with Dave Arcade",
        project: "Portfolio Review",
        url: "https://www.youtube.com/watch?v=g2lz_oVpgK8&t=3654s",
      },
      {
        brand: "Adobe France",
        project: "Coca Cola #CokexAdobexYou",
        url: "https://x.com/AdobeFrance/status/1131273828003401729",
      },
      {
        brand: "Adobe France",
        project: "Black and White Illustrations",
        url: "https://x.com/AdobeFrance/status/1092798796084494336",
      },
    ] satisfies ReferenceItem[],
  },

  /* ───────── trusted logos ───────── */
  trustedLogos: {
    eyebrow: "THEY TRUSTED MY VISION",
    /**
     * Drop a logo file into /public/logos/<file>.png|svg and reference it
     * with `src`. Leave `src: ""` to fall back to an elegant text-tile
     * placeholder. Add or reorder entries freely — the wall is
     * fully responsive (5–7 logos per row on desktop, 3–5 on tablet,
     * 2–3 on mobile) and adapts automatically.
     */
    items: [
      { name: "Adobe",           src: "/logos/adobe.png" },
      { name: "Alpine F1",       src: "/logos/alpine.png" },
      { name: "Anime LTD",       src: "/logos/animeltd.png" },
      { name: "AS Monaco",       src: "/logos/asm.png" },
      { name: "L'Atelier BNP",   src: "/logos/atelierbnp.png" },
      { name: "Cartoon Network", src: "/logos/cartoon-network.png" },
      { name: "Cloud9",          src: "/logos/cloud9.png" },
      { name: "Crunchyroll",     src: "/logos/crunchyroll.png" },
      { name: "Disney",          src: "/logos/disney.png" },
      { name: "Disneyland Paris", src: "/logos/disney-paris.png" },
      { name: "FFF France",      src: "/logos/fff-france.png" },
      { name: "Funimation",      src: "/logos/funimation.png" },
      { name: "G2 Esports",      src: "/logos/g2-esports.png" },
      { name: "HBO",             src: "/logos/hbo.png" },
      { name: "Ledger",          src: "/logos/ledger.png" },
      { name: "Lucasfilm",       src: "/logos/lucasfilm.png" },
      { name: "Marvel",          src: "/logos/marvel.png" },
      { name: "PSG",             src: "/logos/psg.png" },
      { name: "Rhinoshield",     src: "/logos/rhinoshield.png" },
      { name: "Schalke 04",      src: "/logos/schalke.png" },
      { name: "Sorare",          src: "/logos/sorare.png" },
      { name: "Toei Animation",  src: "/logos/toeianimation.png" },
      { name: "UFC",             src: "/logos/ufc.png" },
      { name: "Warner Bros.",    src: "/logos/warner-bros.png" },
      { name: "Xbox",            src: "/logos/xbox.png" },
      { name: "XP Pen",          src: "/logos/xppen.png" },
    ] satisfies LogoItem[],
  },

  /* ───────── manifesto ───────── */
  manifesto: {
    eyebrow: "MY CREATIVE PHILOSOPHY",
    /** Two-line quote — second line is the highlighted half */
    quoteLine1: "BEAUTY LIVES",
    quoteLine2: "IN DETAILS.",
    body: "Every frame, every movement, every light has a purpose. I believe in crafting visuals that not only look stunning, but that tell a story, evoke emotions and leave a lasting impact.",
    signature: "T. Travert",
  },

  /* ───────── final CTA ───────── */
  cta: {
    eyebrow: "LET'S CREATE",
    title: "THE FUTURE.",
    /** Highlight the second word in pink */
    highlightFrom: 1,
    button: { label: "CONTACT ME", href: "/contact" },
  },
} as const;

export type AboutData = typeof about;
