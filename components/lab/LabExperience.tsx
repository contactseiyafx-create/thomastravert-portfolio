"use client";

import { useCallback, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  lab,
  type LabApp,
  type LabArtwork,
  type LabDeck,
  type LabFolder,
  type LabFolderId,
} from "@/data/lab";
import { useLanguage, type TranslationKey } from "@/components/LanguageProvider";
import { GlyphEngine } from "./GlyphEngine";
import { ShinshokuInterviewRPG } from "./ShinshokuInterviewRPG";

const EASE = [0.16, 1, 0.3, 1] as const;
const CINEMA = [0.65, 0, 0.35, 1] as const;

type OpenFolder = LabFolderId | null;

const folderCopyKeys: Record<
  LabFolderId,
  { label: TranslationKey; sub: TranslationKey; desc: TranslationKey }
> = {
  apps: {
    label: "lab.folder.apps.label",
    sub: "lab.folder.apps.sub",
    desc: "lab.folder.apps.desc",
  },
  "graphic-design": {
    label: "lab.folder.graphic-design.label",
    sub: "lab.folder.graphic-design.sub",
    desc: "lab.folder.graphic-design.desc",
  },
  "motion-design": {
    label: "lab.folder.motion-design.label",
    sub: "lab.folder.motion-design.sub",
    desc: "lab.folder.motion-design.desc",
  },
  carousels: {
    label: "lab.folder.carousels.label",
    sub: "lab.folder.carousels.sub",
    desc: "lab.folder.carousels.desc",
  },
};

const statusKeys: Record<LabApp["status"], TranslationKey> = {
  Live: "status.live",
  Beta: "status.beta",
  "In development": "status.in-development",
  Concept: "status.concept",
};

export default function LabExperience() {
  const [open, setOpen] = useState<OpenFolder>(null);
  const [launched, setLaunched] = useState<LabApp | null>(null);
  const [artworkIndex, setArtworkIndex] = useState<number | null>(null);
  const [activeDeck, setActiveDeck] = useState<LabDeck | null>(null);
  const reduce = useReducedMotion();

  return (
    <div className="relative min-h-screen pt-[var(--nav-h)] overflow-hidden">
      <Atmosphere reduce={!!reduce} active={open} />

      <div className="relative z-10 page-x pt-10 md:pt-16 pb-32">
        <Intro />

        <div className="mt-16 md:mt-24">
          <FolderRow open={open} setOpen={setOpen} />
        </div>

        <AnimatePresence mode="wait">
          {open && (
            <FolderArchive
              key={open}
              folder={open}
              onLaunchApp={setLaunched}
              onOpenArtwork={setArtworkIndex}
              onOpenDeck={setActiveDeck}
            />
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {launched && (
          <AppStage app={launched} onClose={() => setLaunched(null)} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {artworkIndex !== null && (
          <ArtworkLightbox
            index={artworkIndex}
            onClose={() => setArtworkIndex(null)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {activeDeck && (
          <DeckViewer deck={activeDeck} onClose={() => setActiveDeck(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}

function Atmosphere({ reduce, active }: { reduce: boolean; active: OpenFolder }) {
  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
        animate={reduce ? {} : { opacity: active ? 0.5 : [0.32, 0.5, 0.32] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        style={{
          background:
            "radial-gradient(60% 50% at 50% 30%, rgba(255,46,136,0.08), transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(to right,#fff 1px,transparent 1px),linear-gradient(to bottom,#fff 1px,transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage:
            "radial-gradient(ellipse 70% 60% at 50% 35%, black 20%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 60% at 50% 35%, black 20%, transparent 75%)",
        }}
      />
    </>
  );
}

function Intro() {
  const i = lab.intro;
  const { t } = useLanguage();
  return (
    <header className="max-w-3xl">
      <motion.p
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: EASE }}
        className="flex items-center gap-3 font-mono text-[11px] tracking-[0.28em] uppercase text-bone-dim"
      >
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-signal animate-pulse" />
        {t("lab.intro.eyebrow")}
      </motion.p>

      <h1 className="mt-6 leading-[0.86]">
        {i.titleLines.map((line, idx) => (
          <span key={line} className="block overflow-hidden">
            <motion.span
              initial={{ y: "110%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 1, delay: 0.1 + idx * 0.08, ease: EASE }}
              className="block h-display text-[clamp(4.5rem,17vw,15rem)] tracking-[-0.04em]"
            >
              {line}
            </motion.span>
          </span>
        ))}
      </h1>

      <motion.p
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.4, ease: EASE }}
        className="mt-8 body-lead leading-[1.7] max-w-xl"
      >
        {t("lab.intro.lead")}
      </motion.p>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.55, ease: EASE }}
        className="mt-4 font-mono text-[11px] tracking-[0.2em] uppercase text-bone-muted"
      >
        {t("lab.intro.note")}
      </motion.p>
    </header>
  );
}

function FolderRow({
  open,
  setOpen,
}: {
  open: OpenFolder;
  setOpen: (f: OpenFolder) => void;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 max-w-7xl">
      {lab.folders.map((f, idx) => (
        <Folder
          key={f.id}
          data={f}
          index={idx}
          active={open === f.id}
          dimmed={open !== null && open !== f.id}
          onClick={() => setOpen(open === f.id ? null : f.id)}
        />
      ))}
    </div>
  );
}

function Folder({
  data,
  index,
  active,
  dimmed,
  onClick,
}: {
  data: LabFolder;
  index: number;
  active: boolean;
  dimmed: boolean;
  onClick: () => void;
}) {
  const { t } = useLanguage();
  const copy = folderCopyKeys[data.id];

  return (
    <motion.button
      type="button"
      onClick={onClick}
      aria-expanded={active}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: dimmed ? 0.42 : 1, y: 0 }}
      transition={{ duration: 0.9, delay: 0.5 + index * 0.1, ease: EASE }}
      whileHover={{ y: -8 }}
      className="group relative text-left focus-visible:outline-none"
    >
      <div className="relative">
        <div
          className="relative ml-5 h-9 w-40 rounded-t-lg border border-b-0 border-bone-line bg-ink-700/60 backdrop-blur-sm transition-colors duration-500 group-hover:border-signal/50"
          style={{ clipPath: "polygon(0 0, 82% 0, 100% 100%, 0 100%)" }}
        />
        <div className="relative -mt-px aspect-[16/10] w-full rounded-lg rounded-tl-none border border-bone-line bg-ink-700/40 backdrop-blur-md overflow-hidden transition-all duration-500 group-hover:border-signal/50">
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
            style={{
              background:
                "radial-gradient(80% 80% at 30% 0%, rgba(255,46,136,0.10), transparent 70%)",
            }}
          />
          <div
            className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none"
            style={{
              background:
                "linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.05) 50%, transparent 65%)",
            }}
          />

          <div className="relative h-full p-6 flex flex-col justify-between">
            <div className="flex items-start justify-between">
              <span className="font-mono text-[10px] tracking-[0.24em] uppercase text-bone-muted">
                {t(copy.sub)}
              </span>
              <span className="font-mono text-[11px] tracking-[0.2em] text-bone-dim">
                {data.count}
              </span>
            </div>

            <div>
              <span className="block h-display text-[clamp(1.45rem,2.5vw,2.25rem)] leading-[0.95]">
                {t(copy.label)}
              </span>
              <span className="mt-2 block body-sm max-w-[28ch]">
                {t(copy.desc)}
              </span>
            </div>

            <span className="flex items-center gap-2 font-mono text-[10px] tracking-[0.24em] uppercase text-signal">
              {active ? t("lab.closeFolder") : t("lab.openFolder")}
              <motion.svg
                width="11"
                height="11"
                viewBox="0 0 11 11"
                fill="none"
                animate={{ rotate: active ? 90 : 0 }}
                transition={{ duration: 0.5, ease: EASE }}
              >
                <path d="M2 2L9 2L9 9" stroke="currentColor" strokeWidth="1.4" />
                <path d="M9 2L2 9" stroke="currentColor" strokeWidth="1.4" />
              </motion.svg>
            </span>
          </div>
        </div>
      </div>
    </motion.button>
  );
}

function FolderArchive({
  folder,
  onLaunchApp,
  onOpenArtwork,
  onOpenDeck,
}: {
  folder: LabFolderId;
  onLaunchApp: (app: LabApp) => void;
  onOpenArtwork: (index: number) => void;
  onOpenDeck: (deck: LabDeck) => void;
}) {
  const folderData = lab.folders.find((f) => f.id === folder);
  const { t } = useLanguage();
  if (!folderData) return null;
  const folderKeys = folderCopyKeys[folderData.id];

  return (
    <motion.section
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.7, ease: CINEMA }}
      className="overflow-hidden"
    >
      <div className="mt-12 pt-10 border-t border-bone-line">
        <ArchiveHead label={t(folderKeys.label)} sub={t(folderKeys.desc)} />

        {folder === "apps" && (
          <AppsArchive onLaunch={onLaunchApp} />
        )}

        {folder === "graphic-design" && (
          <ArtworkMasonry items={lab.graphicDesign} onOpen={onOpenArtwork} />
        )}

        {folder === "carousels" && (
          <DeckGrid decks={lab.carousels} onOpen={onOpenDeck} />
        )}

        {folder === "motion-design" && (
          <EmptyArchive label={t(folderKeys.label)} />
        )}
      </div>
    </motion.section>
  );
}

function AppsArchive({ onLaunch }: { onLaunch: (app: LabApp) => void }) {
  return (
    <div className="mt-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
      {lab.apps.map((app, index) => (
        <AppTile key={app.id} app={app} index={index} onLaunch={onLaunch} />
      ))}
    </div>
  );
}

function AppTile({
  app,
  index,
  onLaunch,
}: {
  app: LabApp;
  index: number;
  onLaunch: (app: LabApp) => void;
}) {
  const tint = app.tint ?? "var(--signal)";
  const { t } = useLanguage();
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: EASE }}
      className="group relative border border-bone-line rounded-xl bg-ink-700/40 backdrop-blur-md p-6 flex flex-col gap-5 transition-colors duration-500 hover:border-bone-line/0"
      style={{ ["--tint" as string]: tint }}
    >
      <div
        className="pointer-events-none absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ boxShadow: "inset 0 0 0 1px var(--tint), 0 0 40px -12px var(--tint)" }}
      />
      <div className="flex items-start justify-between">
        <div
          className="relative w-16 h-16 rounded-2xl grid place-items-center overflow-hidden border border-bone-line"
          style={{
            background:
              "radial-gradient(120% 120% at 30% 20%, rgba(255,255,255,0.06), rgba(5,5,5,0.6))",
          }}
        >
          <span className="h-display text-[2rem] leading-none" style={{ color: "var(--tint)" }}>
            {app.glyph}
          </span>
          <div
            className="absolute -bottom-6 -right-6 w-14 h-14 rounded-full blur-2xl opacity-50"
            style={{ background: "var(--tint)" }}
          />
        </div>
        <StatusPill status={app.status} />
      </div>
      <div className="flex-1">
        <h3 className="font-sans text-[17px] font-medium text-bone leading-snug">
          {app.name}
        </h3>
        <p className="mt-2 body-sm leading-[1.55]">{app.blurb}</p>
      </div>
      <button
        type="button"
        onClick={() => onLaunch(app)}
        className="group/btn inline-flex items-center justify-center gap-2 mt-1 py-3 rounded-lg border border-bone-line font-mono text-[11px] tracking-[0.2em] uppercase text-bone transition-colors duration-400 hover:text-ink"
        style={{ position: "relative", overflow: "hidden" }}
      >
        <span
          className="absolute inset-0 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{ background: "var(--tint)" }}
        />
        <span className="relative z-10 flex items-center gap-2">
          {t("lab.launch")}
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M2 8L8 2M8 2H3M8 2V7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="square" />
          </svg>
        </span>
      </button>
    </motion.div>
  );
}

function StatusPill({ status }: { status: LabApp["status"] }) {
  const { t } = useLanguage();
  const live = status === "Live";
  const beta = status === "Beta";
  const color = live ? "var(--signal)" : beta ? "#63D7FF" : "#7a7a7a";
  return (
    <span className="inline-flex items-center gap-2 font-mono text-[9px] tracking-[0.2em] uppercase text-bone-dim">
      <span
        className="inline-block w-1.5 h-1.5 rounded-full"
        style={{ background: color, boxShadow: live ? `0 0 8px ${color}` : "none" }}
      />
      {t(statusKeys[status])}
    </span>
  );
}

function ArchiveHead({ label, sub }: { label: string; sub: string }) {
  return (
    <div className="flex flex-col gap-3">
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE }}
        className="h-eyebrow flex items-center gap-2"
      >
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-signal" />
        LAB / {label}
      </motion.p>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.06, ease: EASE }}
        className="body-sm max-w-lg"
      >
        {sub}
      </motion.p>
    </div>
  );
}

function ArtworkMasonry({
  items,
  onOpen,
}: {
  items: readonly LabArtwork[];
  onOpen: (index: number) => void;
}) {
  return (
    <div className="mt-12 columns-1 md:columns-2 xl:columns-4 gap-5 [column-fill:_balance]">
      {items.map((item, index) => (
        <motion.button
          key={item.id}
          type="button"
          onClick={() => onOpen(index)}
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: (index % 8) * 0.04, ease: EASE }}
          className="group relative mb-5 block w-full overflow-hidden bg-ink text-left focus-visible:outline-none"
          style={{ breakInside: "avoid" }}
        >
          <div style={{ aspectRatio: item.ratio }} className="relative">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={item.thumbnail}
              alt={item.title}
              loading="lazy"
              sizes="(min-width: 1280px) 23vw, (min-width: 768px) 45vw, 92vw"
              className="absolute inset-0 h-full w-full object-cover opacity-95 transition duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.035] group-hover:opacity-100"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <div className="absolute bottom-0 left-0 right-0 translate-y-2 p-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
              <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-bone">
                {String(index + 1).padStart(2, "0")} · {item.title}
              </p>
            </div>
          </div>
        </motion.button>
      ))}
    </div>
  );
}

function DeckGrid({
  decks,
  onOpen,
}: {
  decks: readonly LabDeck[];
  onOpen: (deck: LabDeck) => void;
}) {
  const { t } = useLanguage();

  return (
    <div className="mt-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 lg:gap-7">
      {decks.map((deck, index) => (
        <motion.button
          key={deck.id}
          type="button"
          onClick={() => onOpen(deck)}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: index * 0.08, ease: EASE }}
          className="group relative block w-full overflow-hidden rounded-2xl bg-ink-700/45 text-left backdrop-blur-md transition-opacity duration-500 hover:opacity-95 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-signal"
        >
          <div className="relative aspect-[4/5] overflow-hidden bg-ink">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={deck.thumbnail}
              alt={`${deck.title} thumbnail`}
              loading="lazy"
              sizes="(min-width: 1280px) 30vw, (min-width: 768px) 45vw, 92vw"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.045]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/15 to-transparent opacity-80" />
          </div>
          <div className="relative p-5 md:p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-bone-muted">
                  {t("lab.imageDeck")}
                </p>
                <h3 className="mt-3 font-sans text-[20px] md:text-[22px] font-medium leading-tight text-bone">
                  {deck.title}
                </h3>
              </div>
              <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-bone-muted">
                {deck.slides.length} {t("lab.pages")}
              </span>
            </div>
            <p className="mt-4 body-sm leading-[1.55]">{deck.description}</p>
            <span className="mt-6 inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.22em] uppercase text-signal">
              {t("lab.openDeck")}
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M2 8L8 2M8 2H3M8 2V7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="square" />
              </svg>
            </span>
          </div>
        </motion.button>
      ))}
    </div>
  );
}

function EmptyArchive({ label }: { label: string }) {
  const { t } = useLanguage();

  return (
    <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-5 max-w-4xl">
      {Array.from({ length: 6 }).map((_, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.04, ease: EASE }}
          className="aspect-[4/5] rounded-lg border border-dashed border-bone-line grid place-items-center"
          style={{
            background:
              "radial-gradient(120% 100% at 50% 0%, rgba(255,46,136,0.05), transparent 70%)",
          }}
        >
          <span className="font-mono text-[10px] tracking-[0.24em] uppercase text-bone-muted">
            {label} / {t("lab.slot")} {String(index + 1).padStart(2, "0")}
          </span>
        </motion.div>
      ))}
    </div>
  );
}

function AppStage({ app, onClose }: { app: LabApp; onClose: () => void }) {
  const { t } = useLanguage();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 1.04, filter: "blur(8px)" }}
      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      exit={{ opacity: 0, scale: 1.04, filter: "blur(8px)" }}
      transition={{ duration: 0.5, ease: CINEMA }}
      className="fixed inset-0 z-[100] bg-ink"
      role="dialog"
      aria-modal="true"
      aria-label={`${app.name} fullscreen`}
    >
      <div className="absolute top-0 inset-x-0 z-20 h-[var(--nav-h)] flex items-center justify-between px-[var(--gutter)] bg-ink/60 backdrop-blur-md border-b border-bone-line">
        <span className="flex items-center gap-3 font-mono text-[11px] tracking-[0.22em] uppercase text-bone-dim">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-signal" />
          THE LAB · {app.name}
        </span>
        <button
          type="button"
          onClick={onClose}
          className="group inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.22em] uppercase text-bone hover:text-signal transition-colors"
        >
          {t("lab.close")}
          <span className="grid place-items-center w-7 h-7 rounded-full border border-bone-line group-hover:border-signal transition-colors">
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M1 1L9 9M9 1L1 9" stroke="currentColor" strokeWidth="1.4" />
            </svg>
          </span>
        </button>
      </div>

      <div
        data-lenis-prevent
        className="absolute inset-0 h-screen overflow-y-auto overscroll-contain pt-[var(--nav-h)]"
      >
        {app.id === "glyph-engine" ? (
          <GlyphEngine />
        ) : app.id === "shinshoku-interview-rpg" ? (
          <ShinshokuInterviewRPG />
        ) : (
          <div className="h-full grid place-items-center">
            <p className="body-lead">{t("lab.notReady")}</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}

function ArtworkLightbox({
  index,
  onClose,
}: {
  index: number;
  onClose: () => void;
}) {
  const items = lab.graphicDesign as readonly LabArtwork[];
  const [currentIndex, setCurrentIndex] = useState(index);
  const total = items.length;

  const goTo = useCallback(
    (nextIndex: number) => setCurrentIndex((nextIndex + total) % total),
    [total]
  );
  const goPrev = useCallback(() => goTo(currentIndex - 1), [currentIndex, goTo]);
  const goNext = useCallback(() => goTo(currentIndex + 1), [currentIndex, goTo]);

  const onKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    },
    [goNext, goPrev, onClose]
  );

  useEffect(() => {
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onKey]);

  const item = items[currentIndex];
  const next = items[(currentIndex + 1) % total];

  return (
    <MediaOverlay
      title={item.title}
      counter={`${String(currentIndex + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}`}
      onClose={onClose}
      onPrev={goPrev}
      onNext={goNext}
    >
      <motion.div
        key={item.id}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.12}
        onDragEnd={(_, info) => {
          if (info.offset.x < -80) goNext();
          if (info.offset.x > 80) goPrev();
        }}
        initial={{ opacity: 0, x: 36, scale: 0.985 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        exit={{ opacity: 0, x: -36, scale: 0.985 }}
        transition={{ duration: 0.45, ease: EASE }}
        className="relative flex h-full w-full touch-pan-y items-center justify-center"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={item.src}
          alt={item.title}
          loading="eager"
          sizes="100vw"
          className="max-h-full max-w-full select-none object-contain shadow-[0_30px_90px_rgba(0,0,0,0.48)]"
          draggable={false}
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={next.src} alt="" loading="eager" className="sr-only" aria-hidden />
      </motion.div>
    </MediaOverlay>
  );
}

function DeckViewer({ deck, onClose }: { deck: LabDeck; onClose: () => void }) {
  const [index, setIndex] = useState(0);
  const total = deck.slides.length;

  const goTo = useCallback(
    (nextIndex: number) => setIndex((nextIndex + total) % total),
    [total]
  );
  const goPrev = useCallback(() => goTo(index - 1), [goTo, index]);
  const goNext = useCallback(() => goTo(index + 1), [goTo, index]);

  const onKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    },
    [goNext, goPrev, onClose]
  );

  useEffect(() => {
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onKey]);

  const current = deck.slides[index];
  const next = deck.slides[(index + 1) % total];

  return (
    <MediaOverlay
      title={deck.title}
      counter={`${String(index + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}`}
      onClose={onClose}
      onPrev={goPrev}
      onNext={goNext}
    >
      <motion.div
        key={`${deck.id}-${index}`}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.12}
        onDragEnd={(_, info) => {
          if (info.offset.x < -80) goNext();
          if (info.offset.x > 80) goPrev();
        }}
        initial={{ opacity: 0, x: 36, scale: 0.985 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        exit={{ opacity: 0, x: -36, scale: 0.985 }}
        transition={{ duration: 0.45, ease: EASE }}
        className="relative flex h-full w-full touch-pan-y items-center justify-center"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={current}
          alt={`${deck.title} page ${index + 1}`}
          loading={index === 0 ? "eager" : "lazy"}
          sizes="100vw"
          className="max-h-full max-w-full select-none object-contain shadow-[0_30px_90px_rgba(0,0,0,0.48)] md:rounded-[18px]"
          draggable={false}
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={next} alt="" loading="eager" className="sr-only" aria-hidden />
      </motion.div>
    </MediaOverlay>
  );
}

function MediaOverlay({
  title,
  counter,
  onClose,
  onPrev,
  onNext,
  children,
}: {
  title: string;
  counter: string;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  children: ReactNode;
}) {
  const { t } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0, filter: "blur(8px)" }}
      animate={{ opacity: 1, filter: "blur(0px)" }}
      exit={{ opacity: 0, filter: "blur(8px)" }}
      transition={{ duration: 0.45, ease: CINEMA }}
      className="fixed inset-0 z-[110] bg-ink/96 backdrop-blur-xl"
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div className="absolute inset-x-0 top-0 z-20 flex h-[var(--nav-h)] items-center justify-between border-b border-bone-line bg-ink/70 px-[var(--gutter)] backdrop-blur-md">
        <div className="min-w-0">
          <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-bone-muted">
            {t("lab.archive")}
          </p>
          <h2 className="mt-1 truncate font-sans text-[14px] font-medium text-bone md:text-[16px]">
            {title}
          </h2>
        </div>
        <div className="flex items-center gap-4">
          <span className="hidden font-mono text-[11px] tracking-[0.2em] uppercase text-bone-dim sm:inline">
            {counter}
          </span>
          <button
            type="button"
            onClick={onClose}
            className="group inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.22em] uppercase text-bone transition-colors hover:text-signal"
          >
            {t("lab.close")}
            <span className="grid h-8 w-8 place-items-center rounded-full border border-bone-line transition-colors group-hover:border-signal">
              <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                <path d="M1 1L10 10M10 1L1 10" stroke="currentColor" strokeWidth="1.4" />
              </svg>
            </span>
          </button>
        </div>
      </div>

      <div data-lenis-prevent className="absolute inset-0 overflow-hidden pt-[var(--nav-h)]">
        <div className="relative flex h-full items-center justify-center px-0 py-6 md:px-20 md:py-12">
          <button
            type="button"
            onClick={onPrev}
            aria-label={t("lab.previous")}
            className="absolute left-5 z-20 hidden h-11 w-11 place-items-center rounded-full border border-bone-line bg-ink/60 text-bone backdrop-blur-md transition-colors hover:border-signal hover:text-signal md:grid"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M9 2L4 7L9 12" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </button>

          {children}

          <button
            type="button"
            onClick={onNext}
            aria-label={t("lab.next")}
            className="absolute right-5 z-20 hidden h-11 w-11 place-items-center rounded-full border border-bone-line bg-ink/60 text-bone backdrop-blur-md transition-colors hover:border-signal hover:text-signal md:grid"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M5 2L10 7L5 12" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </button>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex justify-center px-[var(--gutter)] pb-5 md:pb-7">
        <span className="rounded-full border border-bone-line bg-ink/70 px-4 py-2 font-mono text-[10px] tracking-[0.18em] uppercase text-bone-dim backdrop-blur-md">
          {counter}
        </span>
      </div>
    </motion.div>
  );
}
