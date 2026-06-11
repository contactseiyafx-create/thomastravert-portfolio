# Thomas Travert — Portfolio

A premium, Tokyo-flavoured creative portfolio built on **Next.js App Router**, **TailwindCSS**, **Framer Motion**, and **Lenis** smooth-scroll.

---

## Quick start

```bash
npm install        # or pnpm install / yarn
npm run dev        # local at http://localhost:3000
npm run build      # production build
npm start          # serve production build
npm run typecheck  # tsc --noEmit
```

Deploy on **Netlify** or **Vercel** — both work out of the box. No environment variables are required.

---

## The editable data system

Every piece of copy and every project lives in `/data/`. **Components only render data; no copy is hardcoded.**

```
/data
├── site.ts        ← site identity, hero, footer, quote, CTAs
├── navigation.ts  ← main menu + footer links
├── socials.ts     ← social links + contact channels
├── projects.ts    ← every project (add new ones here)
└── pages.ts       ← per-page copy (about, motion, contact, 2070)
```

### Changing the hero

Open `data/site.ts`:

```ts
hero: {
  eyebrow: "TOKYO BASED",
  titleLine1: "THOMAS",
  titleLine2: "TRAVERT",
  intro: [
    "I craft visuals that move people.",
    "From concept to final pixel,",
    "I build stories that leave a mark.",
  ],
  primaryCta: { label: "VIEW MY WORK", href: "/work" },
  // ...
}
```

### Replacing the hero background with your After Effects composition

The hero is built as a **background slot**. To drop in your animation:

```ts
// data/site.ts
hero: {
  // ...
  background: {
    kind: "video",           // ← change from "empty" to "video"
    src: "/hero/bg.mp4",     // ← place your file in /public/hero/
    poster: "/hero/poster.jpg",
    ambient: true,
  },
}
```

Supported `kind` values: `"empty" | "image" | "video" | "lottie"`.

### Adding a new project

1. Drop images into `/public/projects/<slug>/`.
2. Duplicate a project object in `data/projects.ts`:

```ts
{
  slug: "my-new-project",
  index: "04",
  title: "MY NEW PROJECT",
  category: "ART DIRECTION",
  shortDescription: "ONE LINE\nAND ANOTHER",
  longDescription: "Long-form description used on the detail page...",
  year: "2025",
  client: "Client name",
  role: ["Art Direction", "Motion"],
  thumbnail: { src: "/projects/my-new-project/thumb.jpg", alt: "...", ratio: "21/9" },
  hero:      { src: "/projects/my-new-project/hero.jpg",  alt: "..."  },
  gallery: [
    { src: "/projects/my-new-project/01.jpg", alt: "...", caption: "Optional caption" },
    { src: "/projects/my-new-project/02.jpg", alt: "..." },
  ],
  featured: true,             // ← shows on the home strip
}
```

The new project automatically:

- Appears on the **work page** with the correct filter.
- Has its own page at `/work/my-new-project` (statically generated at build time).
- Shows up in the home **Featured Projects** strip if `featured: true` and its slug is listed in `site.ts → featuredProjects`.

### Changing navigation

Edit `data/navigation.ts`. Order matters; `accent: true` paints a link pink.

```ts
{ label: "2070 PROJECTS", href: "/2070", accent: true }
```

### Editing the about / contact / motion / 2070 pages

`data/pages.ts` — every page has its own block.

### Social links

`data/socials.ts`. Add a new social by extending the `icon` union and adding an `<SocialIcon name="…" />` case in `components/SocialIcon.tsx`.

---

## File architecture

```
/app
  ├── layout.tsx               ← root layout, fonts, navbar, sidebar, footer
  ├── page.tsx                 ← home
  ├── work/
  │   ├── page.tsx             ← work index
  │   └── [slug]/page.tsx      ← project detail
  ├── about/page.tsx
  ├── motion/page.tsx
  ├── contact/page.tsx
  ├── 2070/page.tsx
  ├── not-found.tsx
  └── globals.css

/components
  ├── Navbar.tsx               ← scroll-aware top nav
  ├── SideRail.tsx             ← fixed left rail (rotated labels + socials)
  ├── Logo.tsx
  ├── Hero.tsx                 ← background-slot architecture
  ├── CharacterPortrait.tsx    ← /about character slot + elegant placeholder
  ├── Footer.tsx
  ├── ComingSoon2070.tsx
  ├── CTAButton.tsx            ← magnetic + fill hover
  ├── Burger.tsx               ← morphing burger icon
  ├── MobileMenu.tsx           ← full-screen drawer
  ├── PageTransition.tsx       ← per-route fade
  ├── HoverReveal.tsx          ← LineReveal + HoverReveal utilities
  ├── SmoothScroll.tsx         ← Lenis wrapper
  ├── SocialIcon.tsx           ← inline SVG icon set
  └── projects/                ← project system (Part 2)
       ├── ProjectCard.tsx     ← ProjectRow + ProjectGridCard + ProjectFeatureCard
       ├── ProjectGrid.tsx     ← work-page filter + list/grid view toggle
       ├── ProjectHero.tsx     ← detail-page hero (title, meta, parallax image)
       ├── ProjectOverview.tsx ← deliverables + highlights cards
       ├── ProjectGallery.tsx  ← alternating gallery + MotionSection
       └── NextProject.tsx     ← bottom-of-page next-project banner

/data                          ← edit everything here
/public/projects               ← project images (nexbank, alpine, luxurygarden)
/public/logos                  ← trusted-client logo slots
/tailwind.config.ts            ← color, font and spacing tokens
```

---

## Design system

| Token        | Hex       | Use                                       |
| ------------ | --------- | ----------------------------------------- |
| `ink`        | `#050505` | Primary background                        |
| `ink-700`    | `#111111` | Cards, secondary surfaces                 |
| `ink-600`    | `#151515` | Hover lifts                               |
| `bone`       | `#FFFFFF` | Primary text                              |
| `bone-dim`   | `#BEBEBE` | Body copy                                 |
| `bone-line`  | `#222222` | Dividers, borders                         |
| `signal`     | `#FF2E88` | Electric pink — the single accent colour  |

### Fonts (loaded via `next/font`, no external requests at runtime)

| Family            | Variable          | Use                                |
| ----------------- | ----------------- | ---------------------------------- |
| **Anton**         | `--font-display`  | Massive condensed titles           |
| **DM Sans**       | `--font-sans`     | Body / UI                          |
| **JetBrains Mono**| `--font-mono`     | Eyebrows, micro labels, technical  |
| **Noto Sans JP**  | `--font-jp`       | Japanese characters                |

Swap families in `app/layout.tsx`. Tailwind reads the CSS variables.

---

## Animation principles

- **One easing curve does most of the work**: `cubic-bezier(0.16, 1, 0.3, 1)` — calm, expensive feel.
- **Lenis smooth scroll** is mounted once at the root and skipped for `prefers-reduced-motion`.
- **Hover** uses fill-up, magnetic motion, and underline expansion — never bounce.
- **Reveals** are mask-based: text rises behind `overflow-hidden` parents.

---

## Notes

- The `2070` route is intentionally a coming-soon placeholder — per spec, that universe is not being built yet.
- Project images use Next/Image; missing files fall back to a polished `+ image` placeholder so the layout never breaks while you sequence the asset pipeline.
- The hero is **not** an illustration — it's a slot you fill with your AE composition. Don't try to recreate the character from `ref.png` here; that's yours to drop in.
