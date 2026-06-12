/**
 * ABELIAN — CASE STUDY DATA
 * ─────────────────────────────────────────────
 * Bespoke editorial case study. Single source of truth.
 * The page component in app/work/abelian/page.tsx renders this —
 * no copy is hardcoded in the component.
 *
 * Hero is intentionally LEFT EMPTY — Thomas supplies the hero visual
 * later. The page renders a clearly-marked placeholder until then.
 *
 *   Brand accent (Abelian electric blue) is used ONLY inside this
 *   case study, to signal the client's own identity. The portfolio's
 *   pink signal still owns all navigation + structural chrome.
 */

export const ABELIAN_BLUE = "#3D4BF5";

export type AbelianAsset = {
  src: string;
  alt: string;
  /** Aspect-ratio hint, e.g. "16/9", "1/1", "9/16" */
  ratio?: string;
  /** Short caption shown in micro-typography under / beside the frame */
  caption?: string;
  /** Optional kicker shown above the caption (e.g. campaign name) */
  kicker?: string;
};

export const abelian = {
  /* ───────── meta / header ───────── */
  meta: {
    index: "07",
    slug: "abelian",
    title: "ABELIAN",
    subtitle: "POST-QUANTUM BLOCKCHAIN · MULTI-YEAR BRAND PARTNERSHIP",
    category: "BRAND SYSTEM / MOTION / ILLUSTRATION",
    client: "Abelian",
    clientJp: "アベリアン",
    years: "2023 — 2026",
    location: "Remote · Global",
    /**
     * HERO VISUAL — now supplied. Set `enabled: false` to fall back to
     * the dashed placeholder slot.
     */
    hero: {
      enabled: true,
      src: "/projects/abelian/hero.jpg",
      alt: "Abelian — brand key visual: wallet app, megaphone and shield",
      ratio: "16/9",
    },
    role: [
      "Brand Marketing",
      "Art Direction",
      "Motion Design",
      "Illustration",
      "Character Design",
      "Event Design",
    ],
    /** Running-order labels for the next-project footer */
    positionLabel: "07 / 08",
  },

  /* ───────── overview ───────── */
  overview: {
    eyebrow: "THE BRIEF",
    lead:
      "Make quantum-safe cryptography feel inevitable — not intimidating.",
    body: [
      "Abelian is a post-quantum blockchain building privacy-first, future-proof infrastructure for a world where today's encryption breaks. The ecosystem spans protocol development, education, community growth, hardware innovation and consumer-facing products such as Hako Metal Genesis, a quantum-resistant home mining device designed for everyday users.",
      "Across multiple years, working closely with Allison Hung and the Abelian team, I developed and evolved a unified visual language that translated complex post-quantum concepts into experiences people could understand, trust and engage with. The system extended across brand marketing, motion, educational content, social campaigns, live events, product storytelling, hardware launches and the creation of Abelian's official mascot, Hako.",
    ],
    /** Disciplines — encodes the real scope of the engagement */
    disciplines: [
      "Brand Marketing",
      "Motion Design",
      "Educational Content",
      "Social Media",
      "Character Design",
      "Product Marketing",
      "Hardware Launches",
      "Event Design",
    ],
    /** Stat-line — a quiet metrics row, not a loud number wall */
    facts: [
      { value: "3+ yrs", label: "Engagement" },
      { value: "7", label: "Disciplines" },
      { value: "100s", label: "Assets shipped" },
      { value: "Global", label: "Community reach" },
    ],
  },

  /* ───────── SECTION 01 — Brand Marketing & Campaigns ───────── */
  section01: {
    index: "01",
    eyebrow: "BRAND MARKETING & CAMPAIGNS",
    title: "ONE SYSTEM,\nEVERY SURFACE.",
    intro:
      "Campaigns built to carry ecosystem growth, product awareness, user acquisition and community engagement — from app launches and exchange listings to onsite activations. A consistent indigo-and-glass language holds it all together so every touchpoint reads unmistakably Abelian.",
    /** Hero campaign frame (full-width opener for the section) */
    feature: {
      src: "/projects/abelian/01-balanced-privacy.jpg",
      alt: "Abelian — Balanced Privacy product campaign with wallet UI",
      ratio: "16/9",
      kicker: "PRODUCT CAMPAIGN",
      caption: "Balanced Privacy — wallet launch key visual.",
    },
    gallery: [
      {
        src: "/projects/abelian/02-secure-gateway.jpg",
        alt: "Abelian — One Secure Gateway app campaign",
        ratio: "16/9",
        kicker: "APP ACQUISITION",
        caption: "One Secure Gateway — app store campaign.",
      },
      {
        src: "/projects/abelian/03-one-click.jpg",
        alt: "Abelian — One Click Into the Post-Quantum Future",
        ratio: "1/1",
        kicker: "PRODUCT MOMENT",
        caption: "One-click security upgrade — social key visual.",
      },
      {
        src: "/projects/abelian/04-blockchain-privacy.jpg",
        alt: "Abelian — Blockchain privacy editorial visual",
        ratio: "1/1",
        kicker: "BRAND VOICE",
        caption: "Privacy is more than hiding transactions.",
      },
      {
        src: "/projects/abelian/05-leads-the-way.jpg",
        alt: "Abelian — Abelian leads the way motion poster",
        ratio: "1/1",
        kicker: "BRAND CAMPAIGN",
        caption: "Abelian leads the way — motion-blur series.",
      },
      {
        src: "/projects/abelian/06-mining.jpg",
        alt: "Abelian — Mining just got more interesting",
        ratio: "1/1",
        kicker: "MINING",
        caption: "Mining just got more interesting.",
      },
      {
        src: "/projects/abelian/07-creator-challenge.jpg",
        alt: "Abelian — Post-Quantum Creator Challenge campaign",
        ratio: "16/9",
        kicker: "COMMUNITY CAMPAIGN",
        caption: "Post-Quantum Creator Challenge — community contest.",
      },
      {
        src: "/projects/abelian/08-app-other-assets.jpg",
        alt: "Abelian — Pro app multi-asset dashboard visual",
        ratio: "1/1",
        kicker: "PRODUCT",
        caption: "Abelian Pro — multi-asset wallet visuals.",
      },
      {
        src: "/projects/abelian/extra-superex.jpg",
        alt: "Abelian × SuperEx exchange listing campaign",
        ratio: "16/9",
        kicker: "EXCHANGE LISTING",
        caption: "$ABEL × SuperEx — Digital Gold 2.0 listing.",
      },
      {
        src: "/projects/abelian/extra-top7.jpg",
        alt: "Abelian ranks among top 7 quantum-resistant coins",
        ratio: "16/9",
        kicker: "EARNED MEDIA",
        caption: "Top 7 quantum-resistant coins, April 2026.",
      },
    ] satisfies AbelianAsset[],
    /** Motion block — file to be supplied; placeholder shown until then */
    motion: {
      label: "MOTION · MULTILANGUAGE WEBSITE",
      src: "/projects/abelian/website-multilanguage.mp4",
      poster: "/projects/abelian/website-multilanguage-poster.jpg",
      caption:
        "Abelian website — multilanguage motion sequence (loop).",
      filename: "Abelian_Website_Multilanguage.mp4",
    },
  },

  /* ───────── SECTION 02 — Educational & Blog Visuals ───────── */
  section02: {
    index: "02",
    eyebrow: "EDUCATIONAL & BLOG VISUALS",
    title: "MAKING THE\nINVISIBLE LEGIBLE.",
    intro:
      "A recurring editorial system — Tech Tuesday, Quantum Watch, Abelian 101 — that turns post-quantum security, privacy and blockchain theory into visuals people actually read and share. Each format is templated for speed but never generic: a fixed grid, a living headline, and a colour temperature that signals the topic.",
    gallery: [
      {
        src: "/projects/abelian/s2-01-infrastructure.jpg",
        alt: "Abelian — Privacy in the quantum era explainer",
        ratio: "16/9",
        kicker: "ABELIAN 101",
        caption: "Privacy in the quantum era — explainer key visual.",
      },
      {
        src: "/projects/abelian/s2-02-google-quantum.jpg",
        alt: "Abelian — Google quantum paper editorial visual",
        ratio: "16/9",
        kicker: "INDUSTRY ANALYSIS",
        caption:
          "Google's quantum paper — the case for resistant networks.",
      },
      {
        src: "/projects/abelian/s2-03-cardano-tech-tuesday.jpg",
        alt: "Abelian — Tech Tuesday Cardano quantum threat",
        ratio: "16/9",
        kicker: "TECH TUESDAY",
        caption: "Cardano founder on the 2033 quantum threat.",
      },
      {
        src: "/projects/abelian/s2-04-cardano-quantum-watch.jpg",
        alt: "Abelian — Quantum Watch Cardano series variant",
        ratio: "16/9",
        kicker: "QUANTUM WATCH",
        caption: "Same story, second format — series flexibility.",
      },
      {
        src: "/projects/abelian/s2-05-ambassador.jpg",
        alt: "Abelian — Ambassador Program community visual",
        ratio: "16/9",
        kicker: "COMMUNITY PROGRAM",
        caption: "Ambassador Program — global community recruitment.",
      },
    ] satisfies AbelianAsset[],
  },

  /* ───────── SECTION 03 — Hako, the mascot ───────── */
  section03: {
    index: "03",
    eyebrow: "HAKO · OFFICIAL MASCOT",
    title: "MEET HAKO,\nTHE QUANTUM CAT.",
    role: "POST-QUANTUM SECURITY GUARDIAN",
    intro:
      "Hako is Abelian's official mascot — a post-quantum security guardian built to make intimidating cryptography approachable, memorable and community-owned. A complete character system, designed to hold its own across education, social, events and merch.",

    /** Lead — the turnaround sheet acts as the introduction */
    lead: {
      src: "/projects/abelian/hako-turnaround.jpg",
      alt: "Hako — official character turnaround sheet for Abelian",
      ratio: "16/9",
      kicker: "CHARACTER DESIGN SHEET",
      caption:
        "Hako — full turnaround, 0°–360°, with palette, costume and feature breakdowns.",
    } satisfies AbelianAsset,

    /* ── subsection: character design ── */
    character: {
      label: "CHARACTER DESIGN",
      body: [
        "Hako was created as Abelian's official mascot to make complex post-quantum concepts approachable, memorable and community-friendly.",
        "The character system was designed to work across educational content, social media campaigns, events and community initiatives — while holding strong visual consistency from a single source of truth: a 78cm 3D-chibi guardian in a hooded coat, defined down to paws, tail, ears and whiskers.",
      ],
      /** Trait chips pulled from the turnaround sheet */
      traits: [
        { label: "ROLE", value: "Security Ambassador & Community Builder" },
        { label: "THEME", value: "Post-Quantum · Blockchain · Web3 · AI" },
        { label: "PERSONALITY", value: "Curious · Friendly · Brave · Helpful" },
        { label: "SKILLS", value: "Encryption · Education · Protection" },
      ],
    },

    /* ── subsection: social media campaigns ── */
    social: {
      label: "SOCIAL MEDIA CAMPAIGNS",
      body:
        "Hako became an important part of Abelian's communication strategy, helping introduce technical concepts through a more accessible and engaging visual language.",
      gallery: [
        {
          src: "/projects/abelian/hako-meet.jpg",
          alt: "Meet Hako, the Quantum Cat — social campaign key visual",
          ratio: "4/5",
          kicker: "CAMPAIGN · ILLUSTRATED",
          caption: "Meet Hako, the Quantum Cat — reveal key visual.",
        },
        {
          src: "/projects/abelian/hako-meet-2.jpg",
          alt: "Meet Hako — second social campaign variant",
          ratio: "4/5",
          kicker: "CAMPAIGN · VARIANT",
          caption: "Meet Hako — series variant, same world.",
        },
      ] satisfies AbelianAsset[],
    },

    /* ── subsection: AI-assisted content production ── */
    ai: {
      label: "AI-ASSISTED CONTENT PRODUCTION",
      body: [
        "Many Hako illustrations were produced using AI-assisted workflows, then refined, composited and art-directed in Adobe Creative Suite to ensure brand consistency and production quality.",
        "The goal was never automation — it was creative acceleration, with a strong artistic direction held throughout.",
      ],
      feature: {
        src: "/projects/abelian/hako-social.jpg",
        alt: "Ask Hako — AI-assisted 3D social key visual",
        ratio: "40/21",
        kicker: "AI-ASSISTED · ART-DIRECTED",
        caption: "Ask Hako — 3D social key visual, AI-assisted and composited.",
      } satisfies AbelianAsset,
    },

    /* ── subsection: motion & content platform ── */
    motion: {
      label: "MOTION & CONTENT",
      title: "FROM CHARACTER\nTO CONTENT PLATFORM.",
      body: [
        "As the mascot evolved, Hako expanded beyond static illustrations into motion-driven content and community storytelling.",
        "The character became a flexible communication tool — capable of carrying educational content, social engagement, product communication and long-form media formats, all in one consistent voice.",
      ],
      video: {
        src: "/projects/abelian/hako-podcast.mp4",
        poster: "/projects/abelian/hako-podcast-poster.jpg",
        kicker: "FEATURED · LONG-FORM MEDIA",
        caption:
          "Ask Hako — AMA podcast format, the mascot as on-screen host.",
      },
    },

    /* ── community CTA ── */
    community: {
      eyebrow: "COMMUNITY PRESENCE",
      title: "Explore Hako on X",
      body:
        "Hako lives with the community — follow along for drops, explainers and post-quantum field notes.",
      button: { label: "@PQHako", href: "https://x.com/PQHako" },
    },
  },

  /* ───────── EVENTS — onsite activation (bonus, real client work) ───────── */
  events: {
    index: "04",
    eyebrow: "EVENT & ONSITE DESIGN",
    title: "BRINGING THE\nBRAND ONSITE.",
    intro:
      "Booth systems, gacha activations and onsite collateral that turned a protocol into a tangible, photographable experience — pull-up banners, capsule machines, flyers and QR funnels designed to convert foot traffic into wallets and community members.",
    gallery: [
      {
        src: "/projects/abelian/event-01-booth.jpg",
        alt: "Abelian — event booth pull-up and gacha activation",
        ratio: "9/16",
        kicker: "BOOTH SYSTEM",
        caption: "Booth — community funnel from banner to wallet.",
      },
      {
        src: "/projects/abelian/event-02-gacha.jpg",
        alt: "Abelian — Pay-as-you-go gacha capsule machine",
        ratio: "9/16",
        kicker: "ONSITE ACTIVATION",
        caption: "Pizza-ABEL gacha — limited onsite collectible.",
      },
    ] satisfies AbelianAsset[],
    /** Event recap film — PQBD 2025 (Post-Quantum Blockchain Day) */
    motion: {
      label: "EVENT FILM · PQBD 2025",
      src: "/projects/abelian/pqbd-2025.mp4",
      poster: "/projects/abelian/pqbd-2025-poster.jpg",
      caption:
        "Post-Quantum Blockchain Day 2025 — event recap, including the Hako 'Q-Day Express' tuktuk installation.",
    },
  },

  /* ───────── SECTION 05 — Hako Metal Genesis (product marketing) ───────── */
  hakoMetal: {
    index: "05",
    eyebrow: "PRODUCT MARKETING · HARDWARE LAUNCH",
    title: "THE FIRST QUANTUM-RESISTANT\nHOME MINER.",
    intro: [
      "Hako Metal Genesis is Abelian's consumer-focused mining device, designed to bring post-quantum blockchain infrastructure into homes, studios and personal workspaces.",
      "Unlike traditional mining hardware, the goal was to position the product as a premium consumer technology device — compact, approachable and visually desirable.",
      "Working closely with Allison Hung and the Abelian team, I helped create the marketing system surrounding Hako Metal Genesis, spanning launch campaigns, product storytelling, referral programs, community growth initiatives and advertising assets.",
    ],
    /** full-width cinematic hero */
    hero: {
      src: "/projects/abelian/hm-hero.jpg",
      alt: "Hako Metal Genesis — cinematic product hero",
      ratio: "40/11",
    } satisfies AbelianAsset,

    /* ── subsection: product launch campaign ── */
    launch: {
      label: "PRODUCT LAUNCH CAMPAIGN",
      title: "DESIGNED TO\nLIVE ON YOUR DESK.",
      body: [
        "Hako Metal Genesis was developed to challenge the perception of what mining hardware could be.",
        "Rather than leaning into traditional industrial aesthetics, the product was presented through premium product photography, cinematic lighting and consumer-friendly messaging that emphasised accessibility, efficiency and everyday usability.",
        "The visual language focused on making advanced post-quantum technology feel approachable without sacrificing technical credibility.",
      ],
      gallery: [
        {
          src: "/projects/abelian/hm-launch-1.jpg",
          alt: "Hako Metal Genesis — ultra-efficient launch key visual",
          ratio: "1/1",
          kicker: "LAUNCH · KEY VISUAL",
          caption: "Ultra-efficient — mine ABEL on the power of a light bulb.",
        },
        {
          src: "/projects/abelian/hm-launch-2.jpg",
          alt: "Hako Metal Genesis — built for the quantum era launch visual",
          ratio: "1/1",
          kicker: "LAUNCH · KEY VISUAL",
          caption: "Built for the quantum era — hero product still.",
        },
      ] satisfies AbelianAsset[],
    },

    /* ── subsection: product marketing system (referral) ── */
    system: {
      label: "PRODUCT MARKETING SYSTEM",
      title: "SHARE. REFER. EARN.",
      body: [
        "Beyond launch marketing, Hako Metal Genesis required a complete acquisition and community-growth system.",
        "Referral campaigns, social assets and promotional mechanics were designed to encourage adoption while maintaining a consistent premium visual identity across every touchpoint.",
        "The result was a scalable marketing framework connecting product awareness, community participation and user acquisition.",
      ],
      feature: {
        src: "/projects/abelian/hm-referral.jpg",
        alt: "Hako Metal Genesis — Share. Refer. Earn. referral campaign",
        ratio: "16/9",
        kicker: "REFERRAL · ACQUISITION",
        caption: "Share. Refer. Earn. — 5% referral rewards campaign.",
      } satisfies AbelianAsset,
    },

    /* ── subsection: product detail storytelling ── */
    detail: {
      label: "PRODUCT DETAIL STORYTELLING",
      title: "BUILT FOR THE\nQUANTUM ERA.",
      body: [
        "Product storytelling extended beyond specifications.",
        "Through detailed close-up photography, cinematic compositions and hardware-focused visual narratives, Hako Metal Genesis was positioned as both a functional mining device and a design-led technology product.",
        "The objective was to elevate perception and create a stronger emotional connection between users and the hardware.",
      ],
      feature: {
        src: "/projects/abelian/hm-detail.jpg",
        alt: "Hako Metal Genesis — hardware detail and close-up storytelling",
        ratio: "1/1",
        kicker: "HARDWARE · DETAIL",
        caption: "Close-up storytelling — hardware as a design object.",
      } satisfies AbelianAsset,
    },

    /* ── capabilities, numbered (real scope of the chapter) ── */
    capabilities: [
      "Product Marketing",
      "Art Direction",
      "Campaign Design",
      "Hardware Visualization",
      "Social Campaigns",
      "Community Growth",
    ],
  },

  /* ───────── closing ───────── */
  closing: {
    eyebrow: "OUTCOME",
    quote:
      "A technical brand made human — one consistent visual world across product, education, community and the streets.",
    attribution: "— TRAVERT THOMAS",
  },
} as const;

export type AbelianData = typeof abelian;
