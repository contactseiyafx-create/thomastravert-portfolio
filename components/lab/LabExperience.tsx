"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { lab, type LabApp, type LabExploration } from "@/data/lab";
import { GlyphEngine } from "./GlyphEngine";
import { ShinshokuInterviewRPG } from "./ShinshokuInterviewRPG";

const EASE = [0.16, 1, 0.3, 1] as const;
const CINEMA = [0.65, 0, 0.35, 1] as const;

type OpenFolder = "apps" | "design" | null;

/* ════════════════════════════════════════════════════════════
   THE LAB — a hidden room. Folders are the navigation.
   ════════════════════════════════════════════════════════════ */
export default function LabExperience() {
  const [open, setOpen] = useState<OpenFolder>(null);
  const [launched, setLaunched] = useState<LabApp | null>(null);
  const [lightbox, setLightbox] = useState<LabExploration | null>(null);
  const reduce = useReducedMotion();

  // lock scroll while an app is fullscreen
  useEffect(() => {
    if (launched) document.documentElement.style.overflow = "hidden";
    else document.documentElement.style.overflow = "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [launched]);

  return (
    <div className="relative min-h-screen pt-[var(--nav-h)] overflow-hidden">
      {/* ambient: a faint breathing glow, the room's only light source */}
      <Atmosphere reduce={!!reduce} active={open} />

      <div className="relative z-10 page-x pt-10 md:pt-16 pb-32">
        <Intro />

        {/* FOLDERS — the navigation */}
        <div className="mt-16 md:mt-24">
          <FolderRow open={open} setOpen={setOpen} />
        </div>

        {/* CONTENTS — cinematic in-place reveal */}
        <AnimatePresence mode="wait">
          {open === "apps" && (
            <AppsPanel key="apps" onLaunch={setLaunched} />
          )}
          {open === "design" && (
            <DesignPanel key="design" onOpen={setLightbox} />
          )}
        </AnimatePresence>
      </div>

      {/* APP FULLSCREEN — Vision-Pro / Arc feeling */}
      <AnimatePresence>
        {launched && (
          <AppStage app={launched} onClose={() => setLaunched(null)} />
        )}
      </AnimatePresence>

      {/* LIGHTBOX */}
      <AnimatePresence>
        {lightbox && (
          <Lightbox item={lightbox} onClose={() => setLightbox(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}

/* ────────────────────────────────────────────────
   ATMOSPHERE — the room's ambient light
   ──────────────────────────────────────────────── */
function Atmosphere({ reduce, active }: { reduce: boolean; active: OpenFolder }) {
  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
        animate={
          reduce
            ? {}
            : { opacity: active ? 0.5 : [0.32, 0.5, 0.32] }
        }
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        style={{
          background:
            "radial-gradient(60% 50% at 50% 30%, rgba(255,46,136,0.08), transparent 70%)",
        }}
      />
      {/* hairline grid, masked to centre — gives the vault depth */}
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

/* ────────────────────────────────────────────────
   INTRO — the discovery
   ──────────────────────────────────────────────── */
function Intro() {
  const i = lab.intro;
  return (
    <header className="max-w-3xl">
      <motion.p
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: EASE }}
        className="flex items-center gap-3 font-mono text-[11px] tracking-[0.28em] uppercase text-bone-dim"
      >
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-signal animate-pulse" />
        {i.eyebrow}
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
        {i.lead}
      </motion.p>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.55, ease: EASE }}
        className="mt-4 font-mono text-[11px] tracking-[0.2em] uppercase text-bone-muted"
      >
        {lab.intro.note}
      </motion.p>
    </header>
  );
}

/* ────────────────────────────────────────────────
   FOLDER ROW — the two tactile folders
   ──────────────────────────────────────────────── */
function FolderRow({
  open,
  setOpen,
}: {
  open: OpenFolder;
  setOpen: (f: OpenFolder) => void;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 max-w-5xl">
      {lab.folders.map((f, idx) => (
        <Folder
          key={f.id}
          data={f}
          index={idx}
          active={open === f.id}
          dimmed={open !== null && open !== f.id}
          onClick={() => setOpen(open === f.id ? null : (f.id as OpenFolder))}
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
  data: (typeof lab.folders)[number];
  index: number;
  active: boolean;
  dimmed: boolean;
  onClick: () => void;
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      aria-expanded={active}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: dimmed ? 0.4 : 1, y: 0 }}
      transition={{ duration: 0.9, delay: 0.5 + index * 0.12, ease: EASE }}
      whileHover={{ y: -8 }}
      className="group relative text-left focus-visible:outline-none"
    >
      {/* the folder object — tab + body, hairline + glass */}
      <div className="relative">
        {/* tab */}
        <div
          className="relative ml-5 h-9 w-40 rounded-t-lg border border-b-0 border-bone-line bg-ink-700/60 backdrop-blur-sm transition-colors duration-500 group-hover:border-signal/50"
          style={{ clipPath: "polygon(0 0, 82% 0, 100% 100%, 0 100%)" }}
        />
        {/* body */}
        <div className="relative -mt-px aspect-[16/10] w-full rounded-lg rounded-tl-none border border-bone-line bg-ink-700/40 backdrop-blur-md overflow-hidden transition-all duration-500 group-hover:border-signal/50">
          {/* glow wash on hover */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" style={{ background: "radial-gradient(80% 80% at 30% 0%, rgba(255,46,136,0.10), transparent 70%)" }} />
          {/* sheen sweep */}
          <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none" style={{ background: "linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.05) 50%, transparent 65%)" }} />

          {/* contents preview — count + chevron */}
          <div className="relative h-full p-7 flex flex-col justify-between">
            <div className="flex items-start justify-between">
              <span className="font-mono text-[10px] tracking-[0.24em] uppercase text-bone-muted">
                {data.sub}
              </span>
              <span className="font-mono text-[11px] tracking-[0.2em] text-bone-dim">
                {data.count}
              </span>
            </div>

            <div>
              <span className="block h-display text-[clamp(1.6rem,3.4vw,2.6rem)] leading-[0.95]">
                {data.label}
              </span>
              <span className="mt-2 block body-sm max-w-[28ch]">{data.desc}</span>
            </div>

            {/* open affordance */}
            <span className="flex items-center gap-2 font-mono text-[10px] tracking-[0.24em] uppercase text-signal">
              {active ? "CLOSE" : "OPEN FOLDER"}
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

/* ────────────────────────────────────────────────
   APPS PANEL — premium app launcher
   ──────────────────────────────────────────────── */
function AppsPanel({ onLaunch }: { onLaunch: (a: LabApp) => void }) {
  return (
    <motion.section
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.7, ease: CINEMA }}
      className="overflow-hidden"
    >
      <div className="mt-12 pt-10 border-t border-bone-line">
        <PanelHead label="APPS" sub="Real, interactive applications — built, not mocked up." />
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {lab.apps.map((app, i) => (
            <AppTile key={app.id} app={app} index={i} onLaunch={onLaunch} />
          ))}
        </div>
      </div>
    </motion.section>
  );
}

function AppTile({
  app,
  index,
  onLaunch,
}: {
  app: LabApp;
  index: number;
  onLaunch: (a: LabApp) => void;
}) {
  const launchable = app.href !== "";
  const tint = app.tint ?? "var(--signal)";
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: EASE }}
      className="group relative border border-bone-line rounded-xl bg-ink-700/40 backdrop-blur-md p-6 flex flex-col gap-5 transition-colors duration-500 hover:border-bone-line/0"
      style={{ ["--tint" as string]: tint }}
    >
      {/* hover ring in the app's tint */}
      <div
        className="pointer-events-none absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ boxShadow: "inset 0 0 0 1px var(--tint), 0 0 40px -12px var(--tint)" }}
      />

      {/* icon */}
      <div className="flex items-start justify-between">
        <div
          className="relative w-16 h-16 rounded-2xl grid place-items-center overflow-hidden border border-bone-line"
          style={{
            background:
              "radial-gradient(120% 120% at 30% 20%, rgba(255,255,255,0.06), rgba(5,5,5,0.6))",
          }}
        >
          <span
            className="h-display text-[2rem] leading-none"
            style={{ color: "var(--tint)" }}
          >
            {app.glyph}
          </span>
          <div
            className="absolute -bottom-6 -right-6 w-14 h-14 rounded-full blur-2xl opacity-50"
            style={{ background: "var(--tint)" }}
          />
        </div>
        <StatusPill status={app.status} />
      </div>

      {/* meta */}
      <div className="flex-1">
        <h3 className="font-sans text-[17px] font-medium text-bone leading-snug">
          {app.name}
        </h3>
        <p className="mt-2 body-sm leading-[1.55]">{app.blurb}</p>
      </div>

      {/* launch */}
      {launchable ? (
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
            Launch
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M2 8L8 2M8 2H3M8 2V7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="square" />
            </svg>
          </span>
        </button>
      ) : (
        <span className="mt-1 py-3 text-center font-mono text-[11px] tracking-[0.2em] uppercase text-bone-muted border border-dashed border-bone-line rounded-lg">
          Coming soon
        </span>
      )}
    </motion.div>
  );
}

function StatusPill({ status }: { status: LabApp["status"] }) {
  const live = status === "Live";
  const beta = status === "Beta";
  const color = live ? "var(--signal)" : beta ? "#63D7FF" : "#7a7a7a";
  return (
    <span className="inline-flex items-center gap-2 font-mono text-[9px] tracking-[0.2em] uppercase text-bone-dim">
      <span
        className="inline-block w-1.5 h-1.5 rounded-full"
        style={{ background: color, boxShadow: live ? `0 0 8px ${color}` : "none" }}
      />
      {status}
    </span>
  );
}

/* ────────────────────────────────────────────────
   DESIGN PANEL — the masonry vault
   ──────────────────────────────────────────────── */
function DesignPanel({ onOpen }: { onOpen: (i: LabExploration) => void }) {
  const items = lab.exploration as readonly LabExploration[];
  const empty = items.length === 0;

  return (
    <motion.section
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.7, ease: CINEMA }}
      className="overflow-hidden"
    >
      <div className="mt-12 pt-10 border-t border-bone-line">
        <PanelHead
          label="DESIGN EXPLORATION"
          sub="An evolving vault — experiments, concepts, research. No order, no end."
        />

        {empty ? (
          <EmptyVault />
        ) : (
          <div className="mt-10 columns-1 sm:columns-2 lg:columns-3 gap-5 [column-fill:_balance]">
            {items.map((it, i) => (
              <VaultItem key={it.id} item={it} index={i} onOpen={onOpen} />
            ))}
          </div>
        )}
      </div>
    </motion.section>
  );
}

function VaultItem({
  item,
  index,
  onOpen,
}: {
  item: LabExploration;
  index: number;
  onOpen: (i: LabExploration) => void;
}) {
  return (
    <motion.button
      type="button"
      onClick={() => onOpen(item)}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: (index % 6) * 0.06, ease: EASE }}
      className="group relative mb-5 block w-full overflow-hidden rounded-lg border border-bone-line bg-ink-700"
      style={{ breakInside: "avoid" }}
    >
      <div style={{ aspectRatio: item.ratio }} className="relative">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={item.src}
          alt={item.alt}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-t from-ink/70 to-transparent" />
      </div>
    </motion.button>
  );
}

/* graceful empty state — labelled slots in the LAB's own voice */
function EmptyVault() {
  const ratios = ["3/4", "1/1", "4/5", "1/1", "3/4", "4/5", "1/1", "3/4", "4/5"];
  return (
    <div>
      <div className="mt-10 columns-1 sm:columns-2 lg:columns-3 gap-5 [column-fill:_balance]">
        {Array.from({ length: lab.explorationPlaceholderCount }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: (i % 6) * 0.06, ease: EASE }}
            className="mb-5 rounded-lg border border-dashed border-bone-line grid place-items-center"
            style={{
              aspectRatio: ratios[i % ratios.length],
              breakInside: "avoid",
              background:
                "radial-gradient(120% 100% at 50% 0%, rgba(255,46,136,0.05), transparent 70%)",
            }}
          >
            <span className="font-mono text-[10px] tracking-[0.24em] uppercase text-bone-muted">
              slot {String(i + 1).padStart(2, "0")}
            </span>
          </motion.div>
        ))}
      </div>
      <p className="mt-6 font-mono text-[11px] tracking-[0.18em] uppercase text-bone-muted">
        The vault is being filled — drop work into{" "}
        <span className="text-bone-dim">/lab/exploration</span> and it appears here.
      </p>
    </div>
  );
}

/* ────────────────────────────────────────────────
   SHARED — panel head
   ──────────────────────────────────────────────── */
function PanelHead({ label, sub }: { label: string; sub: string }) {
  return (
    <div className="flex flex-col gap-3">
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE }}
        className="h-eyebrow flex items-center gap-2"
      >
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-signal" />
        {label}
      </motion.p>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.06, ease: EASE }}
        className="body-sm max-w-md"
      >
        {sub}
      </motion.p>
    </div>
  );
}

/* ────────────────────────────────────────────────
   APP STAGE — fullscreen immersive launch
   ──────────────────────────────────────────────── */
function AppStage({ app, onClose }: { app: LabApp; onClose: () => void }) {
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
      aria-label={`${app.name} — fullscreen`}
    >
      {/* slim chrome bar */}
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
          Close
          <span className="grid place-items-center w-7 h-7 rounded-full border border-bone-line group-hover:border-signal transition-colors">
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M1 1L9 9M9 1L1 9" stroke="currentColor" strokeWidth="1.4" />
            </svg>
          </span>
        </button>
      </div>

      {/* the app itself */}
      <div className="absolute inset-0 pt-[var(--nav-h)] overflow-y-auto overscroll-contain">
        {app.id === "glyph-engine" ? (
          <GlyphEngine />
        ) : app.id === "shinshoku-interview-rpg" ? (
          <ShinshokuInterviewRPG />
        ) : (
          <div className="h-full grid place-items-center">
            <p className="body-lead">This experience isn't ready yet.</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}

/* ────────────────────────────────────────────────
   LIGHTBOX
   ──────────────────────────────────────────────── */
function Lightbox({
  item,
  onClose,
}: {
  item: LabExploration;
  onClose: () => void;
}) {
  const onKey = useCallback(
    (e: KeyboardEvent) => e.key === "Escape" && onClose(),
    [onClose]
  );
  useEffect(() => {
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onKey]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, ease: EASE }}
      onClick={onClose}
      className="fixed inset-0 z-[110] grid place-items-center bg-ink/90 backdrop-blur-lg p-6 md:p-16"
      role="dialog"
      aria-modal="true"
    >
      <motion.figure
        initial={{ scale: 0.94, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.94, opacity: 0 }}
        transition={{ duration: 0.5, ease: CINEMA }}
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-5xl max-h-full"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={item.src}
          alt={item.alt}
          className="block max-h-[80vh] w-auto rounded-lg border border-bone-line"
        />
        {item.caption && (
          <figcaption className="mt-4 font-mono text-[11px] tracking-[0.16em] uppercase text-bone-dim">
            {item.caption}
          </figcaption>
        )}
      </motion.figure>

      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute top-6 right-6 grid place-items-center w-10 h-10 rounded-full border border-bone-line text-bone hover:border-signal hover:text-signal transition-colors"
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M1 1L11 11M11 1L1 11" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </button>
    </motion.div>
  );
}
