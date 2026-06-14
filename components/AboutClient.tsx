"use client";

import { Fragment } from "react";

/**
 * AboutClient
 * ────────────────────────────────────────────────
 * Client component for /about.  Marked `"use client"` because the page
 * uses Framer Motion (whileInView / viewport) via HoverReveal and inline
 * <motion.*> elements — all of which rely on refs under the hood and
 * therefore cannot live in a Server Component.
 *
 * The Next route file (app/about/page.tsx) stays a Server Component so
 * `export const metadata` keeps working — it just renders this.
 */

import Link from "next/link";
import Image from "next/image";
import { about } from "@/data/about";
import { socials } from "@/data/socials";
import { HoverReveal } from "@/components/HoverReveal";
import { CharacterPortrait } from "@/components/CharacterPortrait";
import { SocialIcon } from "@/components/SocialIcon";
import { useLanguage } from "@/components/LanguageProvider";

const aboutJa: Record<string, string> = {
  "ABOUT ME": "プロフィール",
  "TOKYO BASED": "東京拠点",
  "Travert Thomas — character portrait": "トラバート・トーマスのポートレート",
  "ALL RIGHTS RESERVED": "無断転載を禁じます",
  "ART DIRECTOR": "アートディレクター",
  "& SENIOR MULTIMEDIA DESIGNER": "& シニアマルチメディアデザイナー",
  "I create visual experiences through art direction, motion design, branding and illustration, adapting each project to the unique needs of its industry, audience and goals.":
    "アートディレクション、モーションデザイン、ブランディング、イラストレーションを通じて、業界、ターゲット、目的に合わせたビジュアル体験を制作しています。",
  "AWARDS": "受賞歴",
  "ADOBE × SONY ANIMATIONS": "ADOBE × SONY アニメーション",
  "Spider-Verse Contest Winner": "Spider-Verse コンテスト受賞",
  "TOP 25 WORLDWIDE": "世界トップ25",
  "Adobe × Marshmello Content Campaign": "Adobe × Marshmello コンテンツキャンペーン",
  "XP PEN FRANCE": "XP-PEN フランス",
  "Ambassador": "アンバサダー",
  "REFERENCES": "掲載・紹介",
  "THEY TRUSTED MY VISION": "ビジョンを託してくれたブランド",
  "MY CREATIVE PHILOSOPHY": "制作哲学",
  "BEAUTY LIVES": "美は",
  "IN DETAILS.": "細部に宿る。",
  "Every frame, every movement, every light has a purpose. I believe in crafting visuals that not only look stunning, but that tell a story, evoke emotions and leave a lasting impact.":
    "すべてのフレーム、すべての動き、すべての光には目的があります。美しいだけではなく、物語を伝え、感情を動かし、記憶に残るビジュアルを大切にしています。",
  "LET'S CREATE": "一緒につくる",
  "THE FUTURE.": "未来を。",
  "CONTACT ME": "お問い合わせ",
};

function useAboutText() {
  const { language } = useLanguage();
  return (value: string) => (language === "ja" ? aboutJa[value] ?? value : value);
}

/**
 * ABOUT PAGE
 * ────────────────────────────────────────────────
 * Layout mirror of /imageaboutme reference:
 *   ┌──────────┬───────────────────────────────┐
 *   │ Cinema   │ Hero (massive title + bio)    │
 *   │ sidebar  │ Awards (3-col cards)          │
 *   │ — fixed  │ References (2-col)            │
 *   │ on lg    │ Trusted logos row             │
 *   │          │ Manifesto (dark backdrop)     │
 *   │          │ CTA                           │
 *   └──────────┴───────────────────────────────┘
 *
 * All copy & assets editable in /data/about.ts.
 */
export default function AboutClient() {
  const a = about;
  const text = useAboutText();

  return (
    <div className="relative bg-ink text-bone">
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(280px,38%)_1fr]">
        {/* ═══════════ LEFT — CINEMATIC SIDEBAR ═══════════ */}
        <AboutSidebar />

        {/* ═══════════ RIGHT — EDITORIAL CONTENT ═══════════ */}
        <main className="relative lg:border-l lg:border-bone-line min-w-0">
          {/* Top eyebrow row (under global navbar) */}
          <div className="flex items-center gap-6 px-6 md:px-10 lg:px-14 pt-[calc(var(--nav-h)+22px)] pb-6">
            <HoverReveal y={8}>
              <span className="font-mono text-[11px] tracking-[0.24em] text-signal">
                {a.meta.indexLabel}
              </span>
            </HoverReveal>
            <HoverReveal y={8} delay={0.05}>
              <span className="font-mono text-[11px] tracking-[0.24em] text-bone-dim">
                {text(a.meta.sectionLabel)}
              </span>
            </HoverReveal>
          </div>

          <HeroSection />
          <AwardsSection />
          <ReferencesSection />
          <TrustedLogosSection />
          <ManifestoSection />
          <CtaSection />
        </main>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════
   SIDEBAR
   ════════════════════════════════════════════════ */
function AboutSidebar() {
  const s = about.sidebar;
  const text = useAboutText();

  return (
    <aside className="relative bg-ink-800">
      {/*
        On lg+ the sidebar is sticky and fills the viewport (minus the global
        navbar), so the character stays alive as the right column scrolls.
        On mobile it collapses to a normal, full-width block at the top.
      */}
      <div
        className="
          relative lg:sticky lg:top-0
          lg:h-screen
          flex flex-col
          min-h-[640px] lg:min-h-0
        "
      >
        {/* CHARACTER — fills the flex zone */}
        <div className="relative flex-1 min-h-0 pt-[var(--nav-h)]">
          <div
            className="absolute inset-0 top-[var(--nav-h)]"
            style={{ transform: "translateY(70px)" }}
          >
            <CharacterPortrait
              src={s.character.src}
              alt={text(s.character.alt)}
              enabled={s.character.enabled}
            />
          </div>

          {/* Mid-left: vertical "TOKYO BASED" + year mark */}
          <div className="absolute top-1/2 left-3 -translate-y-1/2 z-20 hidden md:flex flex-col items-center gap-5">
            <span className="block w-px h-24 bg-bone-line" />
            <span
              className="font-mono text-[10px] tracking-[0.32em] text-bone-dim uppercase whitespace-nowrap"
              style={{
                writingMode: "vertical-rl",
                transform: "rotate(180deg)",
              }}
            >
              {text(s.verticalLabel)}
            </span>
            <span className="block w-px h-32 bg-bone-line" />
            <span className="font-mono text-[10px] tracking-[0.2em] text-signal mt-1">
              {s.yearMark}
            </span>
          </div>

          {/* Bottom-left: socials stack */}
          <div className="absolute bottom-5 left-5 z-20 flex flex-col gap-4">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="text-signal hover:text-bone transition-colors duration-300"
              >
                <SocialIcon name={social.icon} className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Email + copyright band */}
        <div className="relative z-10 px-6 py-5 border-t border-bone-line bg-ink">
          <a
            href={`mailto:${s.email}`}
            className="font-mono text-[12px] text-bone-dim hover:text-signal transition-colors break-all"
          >
            {s.email}
          </a>
          <div className="mt-3 font-mono text-[9.5px] tracking-[0.22em] text-bone-muted leading-relaxed uppercase">
            <p>{s.copyright}</p>
            <p>{text(s.rightsLine)}</p>
          </div>
        </div>
      </div>
    </aside>
  );
}

/* ════════════════════════════════════════════════
   HERO
   ════════════════════════════════════════════════ */
function HeroSection() {
  const h = about.hero;
  const text = useAboutText();
  return (
    <section className="px-6 md:px-10 lg:px-14 pt-2 pb-14">
      {/* Massive title */}
      <div className="relative">
        <div className="overflow-hidden">
          <HoverReveal y={60}>
            <h1 className="h-display text-[clamp(3.25rem,9vw,8rem)] leading-[0.9]">
              {text(h.title)}
            </h1>
          </HoverReveal>
        </div>
      </div>

      {/* Roles + bio */}
      <div className="mt-8 max-w-xl">
        <HoverReveal y={12} delay={0.15}>
          <p className="font-mono text-signal text-[12px] tracking-[0.24em] uppercase">
            {text(h.eyebrow)}
          </p>
        </HoverReveal>
        <div className="mt-3 space-y-1.5">
          {h.roles.map((role, i) => (
            <HoverReveal key={role} y={12} delay={0.22 + i * 0.05}>
              <p className="font-sans font-medium text-bone text-lg md:text-xl tracking-tight uppercase">
                {text(role)}
              </p>
            </HoverReveal>
          ))}
        </div>
        <HoverReveal y={12} delay={0.4}>
          <p className="mt-7 body-lead text-bone-dim leading-[1.65] max-w-md">
            {text(h.bio)}
          </p>
        </HoverReveal>
        <HoverReveal y={6} delay={0.5}>
          <span className="block w-20 h-px bg-signal mt-8" />
        </HoverReveal>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════
   AWARDS — 3 dark editorial cards
   ════════════════════════════════════════════════ */
function AwardsSection() {
  const w = about.awards;
  const text = useAboutText();
  return (
    <section className="px-6 md:px-10 lg:px-14 py-12">
      <SectionEyebrow label={text(w.eyebrow)} />
      <div className="mt-7 grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
        {w.items.map((award, i) => (
          <HoverReveal key={award.title} y={22} delay={i * 0.08}>
            <article
              className="
                group relative h-full
                rounded-lg overflow-hidden
                border border-bone-line
                bg-gradient-to-b from-ink-700 to-ink-800
                hover:border-signal/60 transition-colors
                p-6
              "
            >
              {/* Mark / brand zone */}
              <div className="aspect-[5/2] grid place-items-center mb-5">
                <AwardMark award={award} />
              </div>
              <h3 className="font-display text-base md:text-lg leading-tight text-bone uppercase tracking-tight">
                {text(award.title)}
              </h3>
              <p className="mt-3 text-[13px] text-bone-dim leading-relaxed">
                {text(award.subtitle)}
              </p>
              <p className="mt-6 font-mono text-[10.5px] tracking-[0.22em] text-bone-muted">
                {award.year}
              </p>

              {/* Hover glow accent */}
              <span
                aria-hidden
                className="
                  absolute inset-x-0 top-0 h-px
                  bg-gradient-to-r from-transparent via-signal to-transparent
                  opacity-0 group-hover:opacity-100 transition-opacity
                "
              />
            </article>
          </HoverReveal>
        ))}
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════
   REFERENCES — 2-col editorial list with arrows.
   Each row is a clickable external link when `url` is present.
   ════════════════════════════════════════════════ */
function ReferencesSection() {
  const r = about.references;
  const text = useAboutText();
  // Defensive: drop undefined/null entries and anything missing the
  // two required text fields.  Keeps the row render bulletproof even
  // if /data/about.ts is mid-edit.
  const items = (r.items ?? [])
    .filter(Boolean)
    .filter((it) => it && it.brand && it.project);

  return (
    <section className="px-6 md:px-10 lg:px-14 py-12">
      <SectionEyebrow label={text(r.eyebrow)} />
      <ul className="mt-7 grid grid-cols-1 md:grid-cols-2 md:gap-x-10">
        {items.map((item, i) => (
          <HoverReveal
            key={`${item.brand}-${item.project}-${i}`}
            y={12}
            delay={(i % 4) * 0.05}
          >
            <li className="border-b border-bone-line hover:border-signal/70 transition-colors group">
              <ReferenceRow item={item} />
            </li>
          </HoverReveal>
        ))}
      </ul>
    </section>
  );
}

function ReferenceRow({
  item,
}: {
  item: { brand: string; project: string; url?: string };
}) {
  // `ref` is a React-reserved prop — renaming to `item` is the actual fix
  // for the "undefined is not an object (evaluating 'ref.brand')" runtime.
  const inner = (
    <>
      <span className="text-[15px] leading-snug">
        <strong className="font-semibold text-bone">{item?.brand}</strong>
        <span className="text-bone-dim"> / {item?.project}</span>
      </span>
      <svg
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
        aria-hidden
        className="text-signal shrink-0 mt-1 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5"
      >
        <path
          d="M3 11L11 3M11 3H4M11 3V10"
          stroke="currentColor"
          strokeWidth="1.4"
        />
      </svg>
    </>
  );

  const shared = "flex items-start justify-between gap-4 py-4";

  if (item?.url) {
    return (
      <a
        href={item.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${item.brand} — ${item.project} (opens in new tab)`}
        className={shared}
      >
        {inner}
      </a>
    );
  }
  return <div className={shared}>{inner}</div>;
}

/* ════════════════════════════════════════════════
   TRUSTED LOGOS
   ────────────────────────────────────────────────
   Responsive premium wall:
     • Desktop  (lg/xl/2xl) — 5 / 6 / 7 cols
     • Tablet   (sm/md)     — 3 / 4 cols
     • Mobile   (base)      — 2 cols
   Logos sit in dark editorial tiles, `object-contain`,
   never stretched. Hover lifts opacity + border.
   ════════════════════════════════════════════════ */
function TrustedLogosSection() {
  const t = about.trustedLogos;
  const text = useAboutText();
  return (
    <section className="px-6 md:px-10 lg:px-14 py-12">
      <div className="flex items-baseline gap-4">
        <SectionEyebrow label={text(t.eyebrow)} />
        <span className="font-mono text-[10px] tracking-[0.24em] text-bone-muted">
          {String(t.items.length).padStart(2, "0")}
        </span>
      </div>

      <div
        className="
          mt-7 grid
          grid-cols-2 sm:grid-cols-3 md:grid-cols-4
          lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7
          gap-2 md:gap-3
        "
      >
        {t.items.map((logo, i) => (
          <HoverReveal
            key={logo.name}
            y={10}
            /* Cap delay so the last row doesn't drag too long */
            delay={Math.min(i, 14) * 0.025}
          >
            <LogoTile name={logo.name} src={logo.src} />
          </HoverReveal>
        ))}
      </div>
    </section>
  );
}

function LogoTile({ name, src }: { name: string; src: string }) {
  const wrap =
    "relative aspect-[5/3] border border-bone-line bg-ink-700/60 grid place-items-center p-4 md:p-5 hover:border-signal/50 hover:bg-ink-700 transition-colors duration-500 group overflow-hidden";

  if (src) {
    return (
      <div className={wrap} title={name}>
        <Image
          src={src}
          alt={name}
          /* Generous intrinsic — actual size is constrained by max-h + w-auto */
          width={240}
          height={120}
          /* Above the tile fold so the page never waits on these */
          loading="lazy"
          sizes="(min-width: 1536px) 14vw, (min-width: 1280px) 16vw, (min-width: 1024px) 20vw, (min-width: 768px) 25vw, (min-width: 640px) 33vw, 50vw"
          className="
            max-h-9 md:max-h-10 lg:max-h-11
            w-auto h-auto object-contain
            opacity-60 group-hover:opacity-100
            transition-opacity duration-500
            pointer-events-none select-none
          "
        />
      </div>
    );
  }
  return (
    <div className={wrap} aria-label={`${name} — placeholder`}>
      <span className="font-mono text-[10px] tracking-[0.18em] text-bone-dim text-center leading-tight uppercase">
        {name}
      </span>
      <span className="absolute bottom-1.5 left-0 right-0 font-mono text-[8px] tracking-[0.18em] text-signal/70 text-center uppercase">
        /public/logos
      </span>
    </div>
  );
}

/* ════════════════════════════════════════════════
   MANIFESTO — full-width dark backdrop
   ════════════════════════════════════════════════ */
function ManifestoSection() {
  const m = about.manifesto;
  const text = useAboutText();
  return (
    <section className="relative mt-10 overflow-hidden">
      {/* Dark atmospheric backdrop */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 50% 70% at 75% 50%, rgba(140,20,55,0.40), transparent 60%), radial-gradient(ellipse 40% 60% at 25% 80%, rgba(255,46,136,0.10), transparent 70%), #0a0708",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 grain pointer-events-none opacity-50"
      />

      <div className="relative z-10 px-6 md:px-10 lg:px-14 py-20 lg:py-24">
        <SectionEyebrow label={text(m.eyebrow)} />
        <div className="mt-10 grid grid-cols-12 gap-8">
          <div className="col-span-12 lg:col-span-8">
            <HoverReveal y={10}>
              <span className="block font-display text-signal text-6xl leading-none mb-2">
                “
              </span>
            </HoverReveal>
            <div className="overflow-hidden">
              <HoverReveal y={48} delay={0.08}>
                <h2
                  className="
                    h-display italic
                    text-[clamp(2.75rem,8vw,6.5rem)]
                    leading-[0.95]
                  "
                >
                  <span className="block text-bone">{text(m.quoteLine1)}</span>
                  <span className="block text-signal">{text(m.quoteLine2)}</span>
                </h2>
              </HoverReveal>
            </div>
          </div>
          <div className="col-span-12 lg:col-span-4 flex flex-col justify-end">
            <HoverReveal y={14} delay={0.25}>
              <p className="body-sm text-bone-dim leading-[1.7]">{text(m.body)}</p>
            </HoverReveal>
            <HoverReveal y={12} delay={0.4}>
              <p
                className="font-script text-signal text-3xl mt-5"
                style={{ transform: "rotate(-2deg)" }}
              >
                {m.signature}
              </p>
            </HoverReveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════
   CTA
   ════════════════════════════════════════════════ */
function CtaSection() {
  const c = about.cta;
  const text = useAboutText();
  const words = text(c.title).split(" ");
  const head = words.slice(0, c.highlightFrom).join(" ");
  const tail = words.slice(c.highlightFrom).join(" ");

  return (
    <section className="px-6 md:px-10 lg:px-14 py-20 lg:py-24 border-t border-bone-line">
      <SectionEyebrow label={text(c.eyebrow)} />

      <div className="mt-6 flex flex-col lg:flex-row lg:items-end justify-between gap-10 lg:gap-16">
        <div className="overflow-hidden">
          <HoverReveal y={50}>
            <h2 className="h-display text-[clamp(3rem,10vw,8.5rem)] leading-[0.92]">
              {head && <span className="text-bone">{head} </span>}
              <span className="text-signal">{tail}</span>
            </h2>
          </HoverReveal>
        </div>

        <HoverReveal y={14} delay={0.2}>
          <Link
            href={c.button.href}
            className="
              group inline-flex items-center justify-between gap-10
              border border-bone-line hover:border-signal
              rounded-md px-7 py-5 min-w-[280px]
              transition-colors
            "
          >
            <span className="font-mono text-[12px] tracking-[0.22em] uppercase text-bone">
              {text(c.button.label)}
            </span>
            <span
              className="
                grid place-items-center w-9 h-9 rounded-full
                border border-bone-line
                group-hover:border-signal group-hover:bg-signal group-hover:text-ink
                transition-all duration-300
              "
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 14 14"
                fill="none"
                className="transition-transform duration-300 group-hover:translate-x-0.5"
              >
                <path
                  d="M3 11L11 3M11 3H4M11 3V10"
                  stroke="currentColor"
                  strokeWidth="1.6"
                />
              </svg>
            </span>
          </Link>
        </HoverReveal>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════
   Reusable mini bits
   ════════════════════════════════════════════════ */
function SectionEyebrow({ label }: { label: string }) {
  return (
    <HoverReveal y={8}>
      <p className="flex items-center gap-3 font-mono text-[11px] tracking-[0.24em] uppercase text-bone-dim">
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-signal" />
        {label}
      </p>
    </HoverReveal>
  );
}

/* ════════════════════════════════════════════════
   AWARD MARK
   ────────────────────────────────────────────────
   Renders the brand mark on each award card.
   When `markLogos` is provided, lays out the glyphs side-by-side with a
   × separator — each glyph is either a logo image (`src`) or a
   typographic mark (`text`) rendered in the display font.
   Falls back to the plain text `mark` field for legacy entries.
   ════════════════════════════════════════════════ */
function AwardMark({
  award,
}: {
  award: {
    mark: string;
    markLogos?: Array<{ src?: string; text?: string; alt: string }>;
  };
}) {
  if (award.markLogos && award.markLogos.length > 0) {
    return (
      <div className="flex items-center justify-center gap-4 md:gap-5 w-full px-2">
        {award.markLogos.map((logo, i) => (
          <Fragment key={i}>
            {i > 0 && (
              <span
                aria-hidden
                className="font-display text-signal/70 text-2xl md:text-[28px] leading-none"
              >
                ×
              </span>
            )}
            {logo.src ? (
              <Image
                src={logo.src}
                alt={logo.alt}
                width={160}
                height={64}
                loading="lazy"
                sizes="(min-width: 1024px) 12vw, 28vw"
                className="
                  max-h-9 md:max-h-11
                  w-auto h-auto object-contain
                  opacity-95 select-none pointer-events-none
                "
              />
            ) : (
              <span
                aria-label={logo.alt}
                className="
                  font-display text-signal
                  text-2xl md:text-[28px]
                  tracking-tight leading-none
                "
              >
                {logo.text}
              </span>
            )}
          </Fragment>
        ))}
      </div>
    );
  }
  // Legacy text-only fallback
  return (
    <span className="font-display text-2xl md:text-[28px] tracking-tight text-signal">
      {award.mark}
    </span>
  );
}
