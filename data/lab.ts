/**
 * THE LAB — DATA
 * ─────────────────────────────────────────────
 * A hidden creative archive inside the portfolio. Two folders ARE
 * the navigation: APPS (real coded experiences) and DESIGN
 * EXPLORATION (an evolving visual vault).
 *
 * Single source of truth — no copy is hardcoded in components.
 * Design-exploration imagery is intentionally empty until Thomas
 * drops real assets into /public/lab/exploration; the grid renders
 * graceful labelled placeholders rather than inventing artwork.
 */

export type LabAppStatus = "Live" | "Beta" | "In development" | "Concept";

export type LabApp = {
  id: string;
  name: string;
  /** one-line description, end-user voice */
  blurb: string;
  status: LabAppStatus;
  /** internal route or experience id; "" if not launchable yet */
  href: string;
  /** monogram drawn in the icon when no art is supplied */
  glyph: string;
  /** optional accent override for the icon glow (defaults to signal) */
  tint?: string;
};

export type LabExploration = {
  id: string;
  /** image path under /lab/exploration — empty string = placeholder slot */
  src: string;
  alt: string;
  /** masonry sizing hint */
  ratio: string;
  /** quiet caption shown in the lightbox only */
  caption?: string;
};

export const lab = {
  /* ─── opening / discovery ─── */
  intro: {
    eyebrow: "ACCESS GRANTED · PRIVATE ARCHIVE",
    titleLines: ["THE", "LAB"],
    /** the hidden-room framing */
    lead:
      "You found the room behind the portfolio. This is the R&D department — where ideas are prototyped, tools are built, and experiments live before they're ever finished.",
    note: "Two folders. One is code. One is craft. Open either.",
  },

  /* ─── the two folders (the navigation) ─── */
  folders: [
    {
      id: "apps",
      label: "APPS",
      sub: "CODED EXPERIENCES",
      count: "02",
      desc: "Real, interactive applications — built, not mocked up.",
    },
    {
      id: "design",
      label: "DESIGN EXPLORATION",
      sub: "VISUAL VAULT",
      count: "∞",
      desc: "An evolving collection of experiments, concepts and research.",
    },
  ],

  /* ─── APPS ─── */
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

  /* ─── DESIGN EXPLORATION (vault) ─── */
  /**
   * Drop files into /public/lab/exploration and add entries here.
   * Until then, the grid shows labelled empty slots in the LAB's
   * own language — never invented placeholder art.
   */
  exploration: [] satisfies LabExploration[],

  /** how many placeholder slots to show while the vault is empty */
  explorationPlaceholderCount: 9,
} as const;

export type LabData = typeof lab;
