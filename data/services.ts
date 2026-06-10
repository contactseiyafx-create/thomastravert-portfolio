/**
 * SERVICES
 * ─────────────────────────────────────────────
 * Editable source for the /services page.
 * Everything visible on the page is here — no hardcoded copy in components.
 */

export type ServiceCardData = {
  /** Display index — e.g. "01" */
  index: string;
  /** Display title */
  title: string;
  /** Japanese micro-label top-right of the card */
  jpLabel: string;
  /** Short tagline body */
  description: string;
  /** Bullet list */
  includes: string[];
  /** Pricing line — appears next to "STARTING AT:" */
  price: string;
  /** Optional override of the price label (defaults to "STARTING AT:") */
  priceLabel?: string;
  /**
   * CTA — the card's arrow now opens this URL in a new tab.
   * Each service points to its own pre-contextualized Google Form.
   */
  cta?: {
    /** Button label, e.g. "START REQUEST" or "BOOK SESSION" */
    label: string;
    /** External URL — currently placeholder forms.gle links until the real Google Forms are created */
    href: string;
  };
};

export type CompactCardData = {
  /** Optional small index */
  index?: string;
  /** Optional small uppercase eyebrow (e.g. "OPTIONAL") */
  eyebrow?: string;
  title: string;
  jpLabel?: string;
  description: string;
  includes: string[];
  /** Bottom label (e.g. "MONTHLY RETAINER") */
  priceLabel: string;
  /** Bottom main value (e.g. "CUSTOM QUOTE" or "¥8,000 – ¥20,000 / HOUR") */
  price: string;
  /** CTA — see ServiceCardData.cta */
  cta?: {
    label: string;
    href: string;
  };
};

export type ProcessStep = {
  index: string;
  title: string;
  body: string;
};

export const services = {
  /* ─────────────── HERO ─────────────── */
  hero: {
    title: "SERVICES",
    /** Pink accent subtitle (uppercase block) */
    eyebrow: "CREATIVE DIRECTION, MOTION DESIGN\nAND VISUAL SYSTEMS",
    /** Smaller secondary subtitle */
    intro: "FOR BRANDS THAT WANT TO\nMOVE DIFFERENTLY.",
    /** Japanese tagline — "Building visuals that make a difference, together" */
    jpTagline: "違いを生むビジュアルを、共に作る。",
    /** Right-column metadata block */
    meta: [
      { label: "BASED IN TOKYO", value: "WORKING WORLDWIDE", jp: "東京拠点・世界へ" },
      { label: "THOMAS TRAVERT", value: "CREATIVE DIRECTOR" },
    ],
  },

  /* ─────────────── MAIN GRID — three primary cards ─────────────── */
  grid: [
    {
      index: "01",
      title: "GRAPHIC DESIGN",
      jpLabel: "グラフィックデザイン",
      description:
        "Premium visual systems for brands, campaigns and digital experiences.",
      includes: [
        "Key Visual Design",
        "Campaign Assets",
        "Editorial Layouts",
        "Social Visual Systems",
        "Brand Visual Support",
        "Presentation Design",
      ],
      price: "¥60,000+",
      // TODO: replace with the real GRAPHIC DESIGN Google Form URL.
      // Pre-fill the form header with the service title, description, includes
      // list and price so the client opens it already in context.
      cta: {
        label: "START REQUEST",
        href: "https://forms.gle/graphic-design",
      },
    },
    {
      index: "02",
      title: "MOTION DESIGN",
      jpLabel: "モーションデザイン",
      description:
        "Motion-driven storytelling and premium animated visual content.",
      includes: [
        "Motion Graphics",
        "Typography Animation",
        "Brand Motion Systems",
        "Product / Launch Visuals",
        "Short-Form Motion Content",
        "Cinematic Motion Direction",
      ],
      price: "¥120,000+",
      // TODO: replace with the real MOTION DESIGN Google Form URL.
      cta: {
        label: "START REQUEST",
        href: "https://forms.gle/motion-design",
      },
    },
    {
      index: "03",
      title: "ART DIRECTION / CGI",
      jpLabel: "アートディレクション / CGI",
      description: "Creative direction for ambitious visual projects.",
      includes: [
        "Creative Direction",
        "Visual Systems",
        "CGI Concepts",
        "Campaign Visual Development",
        "Premium Key Visuals",
        "Motion / Visual Direction",
      ],
      price: "¥250,000+",
      // TODO: replace with the real ART DIRECTION / CGI Google Form URL.
      cta: {
        label: "START REQUEST",
        href: "https://forms.gle/art-direction",
      },
    },
  ] satisfies ServiceCardData[],

  /* ─────────────── 2070 — signature flagship card ─────────────── */
  signature: {
    /** Top archive marker shown in the cyber UI frame */
    archiveLabel: "2070 ARCHIVE",
    /** Big index */
    index: "04",
    title: "2070 VISUALS",
    /** Pill under the title */
    pill: "SIGNATURE PACKAGE",
    /** Japanese label under the pill */
    pillJp: "シグネチャー・パッケージ",
    /** Top-right info block */
    cornerBlock: {
      heading: "EXCLUSIVE\nVISUAL SYSTEM",
      headingJp: "独占的なビジュアル・システム",
      secondary: "LIMITED COMMISSION",
      secondaryJp: "限定制作",
    },
    /** Right-edge column markers */
    sideMarkers: ["FUTURE", "WORLD", "BUILDING"],
    /** Tall vertical Japanese strip down the right side (top-to-bottom) */
    verticalJp: ["未来の記録", "ビジュアルアーカイブ", "記録", "2070"],
    /** Opening paragraph */
    lead: "My exclusive visual universe.",
    /** Body lines (one per line) */
    body: [
      "Futuristic editorial aesthetics.",
      "Tokyo cyber atmospheres.",
      "Experimental worldbuilding.",
      "Character concepts.",
      "Future archive visuals.",
      "Premium cinematic compositions.",
    ],
    /** Two-column bullet list */
    includes: [
      "Signature 2070 Artwork",
      "Futuristic Visual Systems",
      "Character Design / Concepts",
      "Editorial Worldbuilding",
      "Cyber Visual Narratives",
      "Premium Art Direction",
    ],
    price: "¥350,000+",
    priceLabel: "STARTING AT:",
    /** Bottom-right archive footer label */
    footerLabel: "2070 ARCHIVE",
    footerSubLabel: "FUTURE VISUAL SYSTEMS",
    // TODO: replace with the real 2070 VISUALS Google Form URL.
    // This form is the signature commission — it should feel premium and
    // exclusive, pre-loaded with the SIGNATURE PACKAGE context.
    cta: {
      label: "START REQUEST",
      href: "https://forms.gle/2070-visuals",
    },
  },

  /* ─────────────── PARTNERSHIP & CONSULTING (bottom-left, 2 cards) ─────────────── */
  partnership: {
    index: "05",
    title: "CREATIVE PARTNERSHIP",
    jpLabel: "クリエイティブ・パートナーシップ",
    description:
      "Long-term creative collaboration. A flexible partnership for studios, brands and ongoing projects.",
    includes: [
      "Graphic Design",
      "Motion Design",
      "Creative Direction",
      "Visual Consulting",
      "Ongoing Creative Support",
    ],
    priceLabel: "MONTHLY RETAINER",
    price: "CUSTOM QUOTE",
    // TODO: replace with the real CREATIVE PARTNERSHIP Google Form URL.
    cta: {
      label: "START REQUEST",
      href: "https://forms.gle/creative-partnership",
    },
  } satisfies CompactCardData,

  consulting: {
    eyebrow: "OPTIONAL",
    title: "CONSULTING",
    description: "Creative feedback and strategic visual direction.",
    includes: [
      "Portfolio Reviews",
      "Creative Direction Consulting",
      "Design Feedback",
      "Motion Workflow Advice",
      "Visual Strategy",
    ],
    priceLabel: "",
    price: "¥8,000 — ¥20,000 / HOUR",
    // TODO: replace with the real CONSULTING Google Form URL.
    cta: {
      label: "BOOK SESSION",
      href: "https://forms.gle/consulting",
    },
  } satisfies CompactCardData,

  /* ─────────────── PROCESS ─────────────── */
  process: {
    eyebrow: "PROCESS",
    title: "HOW I WORK",
    steps: [
      {
        index: "01",
        title: "Direction",
        body: "Visual strategy, references, positioning, creative alignment.",
      },
      {
        index: "02",
        title: "Design",
        body: "Visual systems, layouts, key visuals, structure.",
      },
      {
        index: "03",
        title: "Motion",
        body: "Animation, rhythm, cinematic storytelling.",
      },
      {
        index: "04",
        title: "Delivery",
        body: "Optimized final assets for campaigns, web, social or launch.",
      },
    ] satisfies ProcessStep[],
  },

  /* ─────────────── CTA ─────────────── */
  cta: {
    eyebrow: "LET'S TALK",
    title: "LET'S CREATE\nSOMETHING THAT MOVES.",
    button: { label: "CONTACT ME", href: "/contact" },
  },
} as const;

export type ServicesData = typeof services;
