/**
 * THE LAB — DATA
 * ─────────────────────────────────────────────
 * A hidden creative archive inside the portfolio.
 * The LAB is folder-based: visitors browse folders like a designer's
 * hard drive, then open each archive surface from there.
 */

export type LabFolderId =
  | "apps"
  | "graphic-design"
  | "motion-design"
  | "carousels";

export type LabFolder = {
  id: LabFolderId;
  label: string;
  sub: string;
  count: string;
  desc: string;
};

export type LabAppStatus = "Live" | "Beta" | "In development" | "Concept";

export type LabApp = {
  id: string;
  name: string;
  blurb: string;
  status: LabAppStatus;
  href: string;
  glyph: string;
  tint?: string;
};

export type LabArtwork = {
  id: string;
  title: string;
  year?: string;
  src: string;
  thumbnail: string;
  ratio: string;
};

export type LabDeck = {
  id: string;
  title: string;
  year?: string;
  description: string;
  thumbnail: string;
  slides: string[];
};

export const lab = {
  intro: {
    eyebrow: "ACCESS GRANTED · PRIVATE ARCHIVE",
    titleLines: ["THE", "LAB"],
    lead:
      "You found the room behind the portfolio. This is the R&D department — where ideas are prototyped, tools are built, and experiments live before they're ever finished.",
    note: "Four folders. Open one and browse the archive.",
  },

  folders: [
    {
      id: "apps",
      label: "APPS",
      sub: "CODED EXPERIENCES",
      count: "02",
      desc: "Interactive tools and experiments built inside the LAB.",
    },
    {
      id: "graphic-design",
      label: "GRAPHIC DESIGN",
      sub: "POSTERS · KEY VISUALS",
      count: "14",
      desc: "Poster work, campaign visuals, sports graphics and music artwork.",
    },
    {
      id: "motion-design",
      label: "MOTION DESIGN",
      sub: "MOVING IMAGE",
      count: "00",
      desc: "Motion tests, title treatments, broadcast fragments and animated studies.",
    },
    {
      id: "carousels",
      label: "CAROUSELS",
      sub: "IMAGE DECKS",
      count: "03",
      desc: "Converted presentation decks, browsed as image-only visual stories.",
    },
  ] satisfies LabFolder[],

  apps: [
    {
      id: "glyph-engine",
      name: "Glyph Engine",
      blurb: "A generative type toy — bend, scatter and warp letterforms in real time.",
      status: "Live",
      href: "glyph-engine",
      glyph: "G",
    },
    {
      id: "shinshoku-interview-rpg",
      name: "SHINSHOKU Interview RPG",
      blurb: "A Japanese job-interview trainer for creative roles, with XP, levels, and recruiter feedback.",
      status: "Beta",
      href: "shinshoku-interview-rpg",
      glyph: "就",
      tint: "#00E5FF",
    },
  ] satisfies LabApp[],

  graphicDesign: [
    {
      id: "portugal",
      title: "Portugal",
      year: "2026",
      src: "/lab/graphic-design/portugal.webp",
      thumbnail: "/lab/graphic-design/portugal-thumb.webp",
      ratio: "1280/1550",
    },
    {
      id: "real-madrid",
      title: "Real Madrid",
      year: "2026",
      src: "/lab/graphic-design/real-madrid.webp",
      thumbnail: "/lab/graphic-design/real-madrid-thumb.webp",
      ratio: "1107/1341",
    },
    {
      id: "al-nassr",
      title: "Al Nassr",
      year: "2026",
      src: "/lab/graphic-design/al-nassr.webp",
      thumbnail: "/lab/graphic-design/al-nassr-thumb.webp",
      ratio: "1200/1453",
    },
    {
      id: "nadeshiko",
      title: "Nadeshiko",
      year: "2026",
      src: "/lab/graphic-design/nadeshiko.webp",
      thumbnail: "/lab/graphic-design/nadeshiko-thumb.webp",
      ratio: "1200/1453",
    },
    {
      id: "mbappe",
      title: "Mbappe",
      year: "2026",
      src: "/lab/graphic-design/mbappe.webp",
      thumbnail: "/lab/graphic-design/mbappe-thumb.webp",
      ratio: "1200/1453",
    },
    {
      id: "cr7",
      title: "CR7",
      year: "2026",
      src: "/lab/graphic-design/cr7.webp",
      thumbnail: "/lab/graphic-design/cr7-thumb.webp",
      ratio: "1200/1453",
    },
    {
      id: "umut",
      title: "Umut",
      year: "2026",
      src: "/lab/graphic-design/umut.webp",
      thumbnail: "/lab/graphic-design/umut-thumb.webp",
      ratio: "1200/1453",
    },
    {
      id: "haaland",
      title: "Haaland",
      year: "2026",
      src: "/lab/graphic-design/haaland.webp",
      thumbnail: "/lab/graphic-design/haaland-thumb.webp",
      ratio: "1200/1453",
    },
    {
      id: "eligue-big-match",
      title: "E-Ligue Big Match",
      year: "2026",
      src: "/lab/graphic-design/eligue-big-match.webp",
      thumbnail: "/lab/graphic-design/eligue-big-match-thumb.webp",
      ratio: "896/1152",
    },
    {
      id: "eligue-macdo",
      title: "E-Ligue McDo",
      year: "2026",
      src: "/lab/graphic-design/eligue-macdo.webp",
      thumbnail: "/lab/graphic-design/eligue-macdo-thumb.webp",
      ratio: "1500/1927",
    },
    {
      id: "aespa",
      title: "aespa",
      year: "2026",
      src: "/lab/graphic-design/aespa.webp",
      thumbnail: "/lab/graphic-design/aespa-thumb.webp",
      ratio: "1920/690",
    },
    {
      id: "atarashii-gakko",
      title: "ATARASHII GAKKO",
      year: "2026",
      src: "/lab/graphic-design/atarashii-gakko.webp",
      thumbnail: "/lab/graphic-design/atarashii-gakko-thumb.webp",
      ratio: "1920/690",
    },
    {
      id: "somni",
      title: "Somni",
      year: "2026",
      src: "/lab/graphic-design/somni.webp",
      thumbnail: "/lab/graphic-design/somni-thumb.webp",
      ratio: "1920/690",
    },
    {
      id: "wednesday-campanella",
      title: "Wednesday Campanella",
      year: "2026",
      src: "/lab/graphic-design/wednesday-campanella.webp",
      thumbnail: "/lab/graphic-design/wednesday-campanella-thumb.webp",
      ratio: "1920/690",
    },
  ] satisfies LabArtwork[],

  motionDesign: [] satisfies LabArtwork[],

  carousels: [
    {
      id: "storypoke",
      title: "Storypoke",
      year: "2026",
      description: "A visual storytelling deck for a Pokemon-inspired collectible content concept.",
      thumbnail: "/lab/carousels/storypoke/thumb.webp",
      slides: [
        "/lab/carousels/storypoke/page-01.webp",
        "/lab/carousels/storypoke/page-02.webp",
        "/lab/carousels/storypoke/page-03.webp",
        "/lab/carousels/storypoke/page-04.webp",
        "/lab/carousels/storypoke/page-05.webp",
        "/lab/carousels/storypoke/page-06.webp",
        "/lab/carousels/storypoke/page-07.webp",
        "/lab/carousels/storypoke/page-08.webp",
        "/lab/carousels/storypoke/page-09.webp",
        "/lab/carousels/storypoke/page-10.webp",
        "/lab/carousels/storypoke/page-11.webp",
      ],
    },
    {
      id: "pokeitem",
      title: "PokeItem",
      year: "2026",
      description: "A collectible-card market concept shaped as a sharp visual pitch deck.",
      thumbnail: "/lab/carousels/pokeitem/thumb.webp",
      slides: [
        "/lab/carousels/pokeitem/page-1.webp",
        "/lab/carousels/pokeitem/page-2.webp",
        "/lab/carousels/pokeitem/page-3.webp",
        "/lab/carousels/pokeitem/page-4.webp",
      ],
    },
    {
      id: "apple",
      title: "Apple Creator Studio",
      year: "2026",
      description: "Japanese editorial concept exploring creator-tool positioning through Apple-inspired storytelling.",
      thumbnail: "/lab/carousels/apple/thumb.webp",
      slides: [
        "/lab/carousels/apple/page-1.webp",
        "/lab/carousels/apple/page-2.webp",
        "/lab/carousels/apple/page-3.webp",
        "/lab/carousels/apple/page-4.webp",
      ],
    },
  ] satisfies LabDeck[],
} as const;

export type LabData = typeof lab;
