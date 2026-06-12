/**
 * PER-PAGE COPY
 * Every page's text content lives here.
 */

export const pages = {
  /* ─────────────── WORK ─────────────── */
  work: {
    eyebrowJp: "作品",
    eyebrow: "WORK",
    title: "WORK",
    intro:
      "Selected projects across art direction, motion, 3D and identity. A snapshot of the last twelve months.",
  },

  /* ─────────────── ABOUT ─────────────── */
  about: {
    eyebrowJp: "について",
    eyebrow: "ABOUT",
    title: "DESIGN\nIS A FORM\nOF MOTION.",
    bio: [
      "Travert Thomas is a graphic & motion designer based in Tokyo. He works at the intersection of identity, animation, and post-production — building visual systems for brands that want to move differently.",
      "His practice is rooted in editorial restraint and Japanese craft culture: every frame, every kerning pair, every easing curve is treated as a deliberate choice.",
      "Currently working across art direction, brand systems, CGI, and motion design — both on client work and his ongoing 2070 universe.",
    ],
    capabilities: [
      { label: "Art Direction", line: "01" },
      { label: "Motion Design", line: "02" },
      { label: "Identity Systems", line: "03" },
      { label: "CGI / 3D", line: "04" },
      { label: "Illustration", line: "05" },
      { label: "Editorial Layout", line: "06" },
    ],
    clients: [
      "ALPINE F1",
      "RHINOSHIELD",
      "NEXBANK",
      "MAISON NO.5",
      "SONY",
      "KENZO",
      "MUJI",
      "SHISEIDO",
    ],
    timeline: [
      { year: "2025", note: "Independent — Tokyo" },
      { year: "2024", note: "Senior Designer · Studio (Paris)" },
      { year: "2022", note: "Motion Designer · Agency" },
      { year: "2020", note: "BA Visual Communication" },
    ],
  },

  /* ─────────────── MOTION ─────────────── */
  motion: {
    eyebrowJp: "動き",
    eyebrow: "MOTION",
    title: "MOTION\nREEL",
    intro:
      "A rolling cut of recent motion work — title sequences, brand films, product motion, and original experiments.",
    reel: {
      // Drop your video here. Leave src empty to show a placeholder.
      src: "",
      poster: "/images/reel-poster.jpg",
      duration: "01:24",
      year: "2025",
    },
    /**
     * Featured reel — single editorial video player sitting between the
     * page hero and the YouTube archive. Mirrors the playlist section's
     * rhythm (eyebrow JP → display title → meta column → 16:9 framed
     * player → meta strip) so the two sections read as siblings.
     *
     * Currently wired to the Sorare Motion Reel (2023).
     */
    featuredReel: {
      eyebrowJp: "リール",
      sectionLabel: "FEATURED REEL · CLIENT WORK",
      countLabel: "MOTION 001",
      title: "SORARE\nMOTION REEL",
      author: "Travert Thomas — 2023",
      client: "Sorare",
      category: "MOTION DESIGN / REEL",
      intro:
        "Motion direction and editing for Sorare — a 2023 reel cut across product launches, on-card moments and brand films.",
      src: "/motion/sorare-motion-reel-2023.mp4",
      poster: "/motion/sorare-motion-reel-2023-poster.jpg",
      type: "video/mp4",
      duration: "00:37",
    },
    /**
     * Embedded YouTube playlist shown below the reel.
     * Source: https://www.youtube.com/watch?v=WeA7yYSCiRE&list=PLebI-4WHDYtPRza1qxkr6G-FWKxcfMVST
     */
    playlist: {
      eyebrowJp: "選集",
      sectionLabel: "SELECTED MOTION WORK",
      title: "MOTION\nARCHIVE",
      intro:
        "An evolving archive of motion experiments, title sequences and brand films — sequenced by the artist on YouTube.",
      /** YouTube playlist ID (PLxxxxxxxx…) */
      playlistId: "PLebI-4WHDYtPRza1qxkr6G-FWKxcfMVST",
      /** Optional video to open with — falls back to the first item of the playlist. */
      startVideoId: "WeA7yYSCiRE",
      /** Total count shown in the section eyebrow (cosmetic only) */
      countLabel: "ARCHIVE 001",
      /** External "open on YouTube" link */
      externalUrl:
        "https://www.youtube.com/playlist?list=PLebI-4WHDYtPRza1qxkr6G-FWKxcfMVST",
    },
  },

  /* ─────────────── CONTACT ─────────────── */
  contact: {
    eyebrowJp: "連絡",
    eyebrow: "CONTACT",
    title: "LET'S\nCREATE.",
    intro:
      "Available worldwide for creative collaborations. Art Direction, Motion Design, Branding, Illustration and Digital Experiences.",
    inquiryTypes: ["Brand identity", "Motion / Reel", "Art Direction", "CGI", "Other"],
    response: "Replies inside one working day · JST",
  },

  /* ─────────────── 2070 (coming soon) ─────────────── */
  twentySeventy: {
    /** Tiny top label, top-left */
    archiveLabel: "FUTURE ARCHIVE 001",
    /** Tiny top label, top-right */
    sectionLabel: "2070 PROJECTS",
    /** Big centred mark */
    title: "2070",
    /** Centre subtitle */
    subtitle: "COMING SOON",
    /** Japanese line under subtitle — "Future under construction" */
    titleJp: "未来構築中",
    /** Long-form sentence, smaller */
    tagline: "MY WORLD IS UNDER CONSTRUCTION",
    /** Status pill (bottom-left) */
    status: "ARCHIVE STATUS INITIALIZING...",
    /** Footer location (bottom-right) */
    location: "TOKYO, JAPAN",
    /** Return button */
    cta: { label: "RETURN TO PORTFOLIO", href: "/" },
  },
} as const;
