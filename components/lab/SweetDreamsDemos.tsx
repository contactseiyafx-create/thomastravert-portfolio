"use client";

/**
 * SWEET DREAMS — CASE STUDY DEMOS
 * Lightweight, self-contained demonstrations of the real H5 components.
 * Styling values are copied from the game's own tokens (public/lab/sweet-dreams/styles/tokens.css).
 * None of these demos load the game or send analytics events.
 */

import { useEffect, useRef, useState } from "react";
import type { CSSProperties, PointerEvent as ReactPointerEvent, ReactNode } from "react";
import { animate, motion, useInView, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { Fredoka, Nunito } from "next/font/google";
import { smoothEase } from "@/components/motionConfig";

const fredoka = Fredoka({ subsets: ["latin"], display: "swap" });
const nunito = Nunito({ subsets: ["latin"], display: "swap" });

export const SD = {
  ink: "#2C2A6B",
  moon: "#FFF1B8",
  gold: "#FFE7A0",
  mist: "#DAD6FF",
  gCtaMoon: "linear-gradient(100deg, #fff0b8 0%, #f8d3e6 52%, #c8b8ff 100%)",
  gProgress: "linear-gradient(90deg, #ffe7a0, #f8c9e2)",
  gBadge: "linear-gradient(100deg, #fff0b8, #f8d3e6)",
  gPanel: "linear-gradient(160deg, rgba(40, 44, 120, 0.78), rgba(26, 28, 84, 0.82))",
  shCtaMoon: "0 14px 30px -8px rgba(255, 214, 170, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.8)",
  night: "linear-gradient(180deg, #0F1442 0%, #232A78 60%, #3E3F9C 100%)",
};

const sparklePath = (r: number) => {
  const k = r * 0.18;
  return `M0 ${-r} Q${k} ${-k} ${r} 0 Q${k} ${k} 0 ${r} Q${-k} ${k} ${-r} 0 Q${-k} ${-k} 0 ${-r}Z`;
};

export function DemoLabel({ children }: { children: ReactNode }) {
  return <p className="font-mono text-[9px] tracking-[0.2em] uppercase text-bone-muted">{children}</p>;
}

/** Stage tile in the game's night palette, used to frame each demo. */
function NightTile({ children, className = "", style }: { children: ReactNode; className?: string; style?: CSSProperties }) {
  return (
    <div
      className={`relative overflow-hidden rounded-xl border border-bone-line ${className}`}
      style={{ background: SD.night, ...style }}
    >
      {children}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Frame loop: plays real screenshots captured from the H5, in order.
// ---------------------------------------------------------------------------
export type Frame = { src: string; caption: string };

export function FrameLoop({ frames, alt, interval = 1150 }: { frames: Frame[]; alt: string; interval?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "0px 0px -15% 0px" });
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const running = frames.length > 1 && inView && !reduce && !paused;

  useEffect(() => {
    if (!running) return;
    const id = window.setInterval(() => setIndex((v) => (v + 1) % frames.length), interval);
    return () => window.clearInterval(id);
  }, [running, frames.length, interval]);

  const onControl = () => {
    if (reduce) setIndex((v) => (v + 1) % frames.length);
    else setPaused((p) => !p);
  };

  return (
    <div ref={ref}>
      <div
        className="relative overflow-hidden rounded-[22px] border border-bone-line bg-ink shadow-[0_30px_60px_-30px_rgba(255,46,136,0.25)]"
        style={{ aspectRatio: "390 / 844" }}
      >
        {frames.map((f, k) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={f.src}
            src={f.src}
            alt={k === index ? `${alt} — ${f.caption}` : ""}
            aria-hidden={k !== index}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover transition-opacity duration-500"
            style={{ opacity: k === index ? 1 : 0 }}
          />
        ))}
      </div>
      {frames.length === 1 && (
        <div className="mt-2 flex h-9 items-center">
          <span className="truncate font-mono text-[9px] tracking-[0.16em] uppercase text-bone-muted">
            Real capture · {frames[0].caption}
          </span>
        </div>
      )}
      {frames.length > 1 && (
        <div className="mt-2 flex items-center justify-between gap-2">
          <span className="min-w-0 truncate font-mono text-[9px] tracking-[0.16em] uppercase text-bone-muted">
            {String(index + 1).padStart(2, "0")}/{String(frames.length).padStart(2, "0")} · {frames[index].caption}
          </span>
          <button
            type="button"
            onClick={onControl}
            aria-label={reduce ? "Next frame" : paused ? "Play sequence" : "Pause sequence"}
            className="grid h-9 w-9 flex-none place-items-center rounded-full border border-bone-line text-bone-dim transition-colors hover:border-signal hover:text-signal focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-signal"
          >
            {reduce ? (
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                <path d="M3 1.5L7 5L3 8.5" stroke="currentColor" strokeWidth="1.4" />
              </svg>
            ) : paused ? (
              <svg width="9" height="10" viewBox="0 0 9 10" fill="currentColor" aria-hidden="true">
                <path d="M0 0L9 5L0 10Z" />
              </svg>
            ) : (
              <svg width="9" height="10" viewBox="0 0 9 10" fill="currentColor" aria-hidden="true">
                <rect x="0" y="0" width="3" height="10" />
                <rect x="6" y="0" width="3" height="10" />
              </svg>
            )}
          </button>
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Holographic foil layers (same recipe as the game's card, simplified for a demo).
// ---------------------------------------------------------------------------
function FoilLayers({ x, y, o }: { x: number; y: number; o: number }) {
  return (
    <>
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          mixBlendMode: "color-dodge",
          opacity: o * 0.8,
          background:
            "repeating-linear-gradient(115deg, rgba(255,150,225,.7) 0%, rgba(150,205,255,.75) 9%, rgba(160,255,210,.65) 18%, rgba(255,238,160,.75) 27%, rgba(210,165,255,.75) 36%, rgba(255,150,225,.7) 45%)",
          backgroundSize: "260% 260%",
          backgroundPosition: `${50 + (x - 50) * -1.4}% ${50 + (y - 50) * -1.4}%`,
          WebkitMaskImage: `radial-gradient(circle at ${x}% ${y}%, #000 0%, rgba(0,0,0,.6) 38%, rgba(0,0,0,.18) 80%)`,
          maskImage: `radial-gradient(circle at ${x}% ${y}%, #000 0%, rgba(0,0,0,.6) 38%, rgba(0,0,0,.18) 80%)`,
        }}
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          mixBlendMode: "overlay",
          opacity: 0.3 + o * 0.65,
          background: `radial-gradient(farthest-corner circle at ${x}% ${y}%, rgba(255,255,255,.7) 0%, rgba(255,255,255,.14) 26%, rgba(18,14,60,.28) 92%)`,
        }}
      />
    </>
  );
}

function useTilt(enabled: boolean) {
  const rx = useSpring(0, { stiffness: 170, damping: 16 });
  const ry = useSpring(0, { stiffness: 170, damping: 16 });
  const [light, setLight] = useState({ x: 50, y: 32, o: 0.35 });
  const onMove = (e: ReactPointerEvent<HTMLElement>) => {
    if (!enabled) return;
    if (e.pointerType !== "mouse" && e.buttons === 0) return;
    const r = e.currentTarget.getBoundingClientRect();
    const px = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width));
    const py = Math.min(1, Math.max(0, (e.clientY - r.top) / r.height));
    rx.set((0.5 - py) * 20);
    ry.set((px - 0.5) * 24);
    setLight({ x: px * 100, y: py * 100, o: 0.95 });
  };
  const reset = () => {
    rx.set(0);
    ry.set(0);
    setLight({ x: 50, y: 32, o: 0.35 });
  };
  return { rx, ry, light, onMove, reset };
}

/** Interactive miniature of the Dream Card: tap to flip, then drag or hover to tilt the foil. */
export function MiniDreamCard() {
  const reduce = useReducedMotion();
  const [flipped, setFlipped] = useState(false);
  const tilt = useTilt(flipped && !reduce);

  return (
    <div className="flex flex-col items-center gap-3">
      <button
        type="button"
        onClick={() => setFlipped((f) => !f)}
        onPointerMove={tilt.onMove}
        onPointerLeave={tilt.reset}
        onPointerUp={tilt.reset}
        aria-pressed={flipped}
        aria-label={flipped ? "Dream Card front. Tap to flip back" : "Mystery Dream Card. Tap to reveal"}
        className="relative block w-[200px] sm:w-[230px] touch-none select-none rounded-[18px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal focus-visible:ring-offset-4 focus-visible:ring-offset-ink"
        style={{ aspectRatio: "300 / 424", perspective: 1000 }}
      >
        <motion.div className="absolute inset-0" style={{ rotateX: tilt.rx, rotateY: tilt.ry, transformStyle: "preserve-3d" }}>
          <motion.div
            className="absolute inset-0"
            style={{ transformStyle: "preserve-3d" }}
            animate={{ rotateY: flipped ? 180 : 0 }}
            transition={{ duration: reduce ? 0 : 1, ease: smoothEase }}
          >
            <div
              className="absolute inset-0 overflow-hidden rounded-[18px] shadow-[0_24px_50px_-20px_rgba(0,0,0,.8),0_0_40px_-10px_rgba(201,182,255,.55)]"
              style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/lab/campaigns/sweet-dreams/card-back.jpg" alt="" loading="lazy" className="h-full w-full object-cover" draggable={false} />
            </div>
            <div
              className="absolute inset-0 overflow-hidden rounded-[18px] shadow-[0_24px_50px_-20px_rgba(0,0,0,.8),0_0_40px_-10px_rgba(201,182,255,.55)]"
              style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/lab/campaigns/sweet-dreams/card-front.jpg" alt="" loading="lazy" className="h-full w-full object-cover" draggable={false} />
              <FoilLayers x={tilt.light.x} y={tilt.light.y} o={tilt.light.o} />
            </div>
          </motion.div>
        </motion.div>
      </button>
      <p className="font-mono text-[9px] tracking-[0.18em] uppercase text-bone-muted">
        {flipped ? "Drag or hover to tilt · tap to flip back" : "Tap to reveal"}
      </p>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Button system — the real CTA (.cta.cta-moon) in its states.
// ---------------------------------------------------------------------------
type CtaState = "default" | "hover" | "pressed" | "disabled";

function CtaPill({ state, live = false, label = "Let’s Begin" }: { state: CtaState; live?: boolean; label?: string }) {
  const style: CSSProperties = {
    height: 60,
    borderRadius: 30,
    background: SD.gCtaMoon,
    color: SD.ink,
    boxShadow: state === "disabled" ? "none" : SD.shCtaMoon,
    filter: state === "hover" ? "brightness(1.05)" : state === "disabled" ? "saturate(.35)" : undefined,
    transform: state === "pressed" ? "scale(0.97)" : undefined,
    opacity: state === "disabled" ? 0.45 : 1,
    cursor: state === "disabled" ? "not-allowed" : live ? "pointer" : "default",
  };
  return (
    <button
      type="button"
      tabIndex={live ? 0 : -1}
      aria-disabled={state === "disabled" || !live}
      onClick={(e) => !live && e.preventDefault()}
      className={`${fredoka.className} relative flex w-full max-w-[326px] items-center justify-center text-[19px] font-semibold tracking-[0.01em] ${
        live ? "transition-[filter,transform] duration-200 hover:brightness-105 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal focus-visible:ring-offset-2 focus-visible:ring-offset-ink" : "pointer-events-none"
      }`}
      style={style}
    >
      {label}
      <span className="absolute right-2 top-2 grid h-11 w-11 place-items-center rounded-full" style={{ background: "rgba(255,255,255,.6)" }} aria-hidden="true">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={SD.ink} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </span>
    </button>
  );
}

export function ButtonShowcase() {
  const states: { state: CtaState; title: string; spec: string; note?: string }[] = [
    { state: "default", title: "Default", spec: "background: var(--g-cta-moon) · box-shadow: var(--sh-cta-moon)" },
    { state: "hover", title: "Hover", spec: ".cta:hover { filter: brightness(1.05) }" },
    { state: "pressed", title: "Pressed", spec: ".cta:active { transform: scale(0.97) }" },
    { state: "disabled", title: "Disabled", spec: "opacity .45 · no glow", note: "Demo state · not used in the game" },
  ];
  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {states.map((s) => (
          <div key={s.state} className="flex flex-col gap-3">
            <NightTile className="flex h-[120px] items-center justify-center px-4">
              <CtaPill state={s.state} />
            </NightTile>
            <div>
              <p className="font-sans text-[14px] text-bone">
                {s.title}
                {s.note && <span className="ml-2 font-mono text-[9px] tracking-[0.16em] uppercase text-signal">{s.note}</span>}
              </p>
              <p className="mt-1 font-mono text-[10px] leading-[1.5] text-bone-muted">{s.spec}</p>
            </div>
          </div>
        ))}
      </div>
      <NightTile className="mt-4 flex flex-col items-center gap-3 px-4 py-6 sm:flex-row sm:justify-between sm:px-8">
        <p className={`${nunito.className} text-[13px] font-bold`} style={{ color: SD.mist }}>
          Try the live component: hover, press, focus with Tab.
        </p>
        <div className="w-full max-w-[326px]">
          <CtaPill state="default" live />
        </div>
      </NightTile>
      <p className="mt-3 body-sm leading-[1.55]">
        Pill 326 × 60, Fredoka 19px, icon in a 44px disc on the right. The same gradient token feeds the CTA, the
        progress fill and the status badge, so every “positive” action reads in moonlight.
      </p>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Progress system — "Night peace" bar + completion ring (5 stars + 1 moon).
// ---------------------------------------------------------------------------
const RING_C = 119.4;

export function ProgressShowcase() {
  const [stars, setStars] = useState(3);
  const [moon, setMoon] = useState(true);
  const pct = Math.round(((stars + (moon ? 1 : 0)) / 6) * 100);
  const presets = [
    { label: "Initial", s: 0, m: false },
    { label: "Partial", s: 3, m: true },
    { label: "Completed", s: 5, m: true },
  ];

  return (
    <div className="grid gap-4 lg:grid-cols-[1.2fr_1fr]">
      <NightTile className="p-5 sm:p-6">
        <div className="rounded-[24px] border border-white/20 px-[18px] py-[14px]" style={{ background: "linear-gradient(160deg, rgba(255,255,255,.18), rgba(255,255,255,.07))" }}>
          <div className="flex items-center justify-between">
            <span className={`${fredoka.className} flex items-center gap-2 text-[15px] font-semibold text-white`}>
              <svg width="14" height="14" viewBox="-12 -12 24 24" aria-hidden="true"><path d={sparklePath(10)} fill={SD.moon} /></svg>
              Night peace
            </span>
            <span className={`${nunito.className} text-[13px] font-semibold`} style={{ color: "#CFCBFF" }}>
              <b className={fredoka.className} style={{ color: SD.gold, fontWeight: 600 }}>{stars}</b> / 5 stars
            </span>
          </div>
          <div className="mt-3 flex gap-1.5" aria-hidden="true">
            {[0, 1, 2, 3, 4].map((i) => (
              <span key={i} className="relative h-[7px] flex-1 overflow-hidden rounded" style={{ background: "rgba(255,255,255,.16)" }}>
                <i
                  className="absolute inset-0 origin-left transition-transform duration-500"
                  style={{ background: SD.gProgress, boxShadow: "0 0 10px rgba(255,231,160,.55)", transform: `scaleX(${i < stars ? 1 : 0})` }}
                />
              </span>
            ))}
          </div>
        </div>
        <div className="mt-5 flex items-center gap-4">
          <div className="relative h-11 w-11" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={pct} aria-label="Night peace">
            <svg width="44" height="44" viewBox="0 0 44 44">
              <circle cx="22" cy="22" r="19" fill="none" stroke="rgba(255,255,255,.14)" strokeWidth="4" />
              <circle
                cx="22" cy="22" r="19" fill="none" stroke={SD.gold} strokeWidth="4" strokeLinecap="round"
                strokeDasharray={`${(RING_C * pct) / 100} ${RING_C}`} transform="rotate(-90 22 22)"
                style={{ transition: "stroke-dasharray .6s cubic-bezier(.3,1,.4,1)" }}
              />
            </svg>
            <span className={`${nunito.className} absolute inset-0 grid place-items-center text-[10px] font-bold text-white`}>{pct}%</span>
          </div>
          <p className={`${nunito.className} text-[13px] font-semibold`} style={{ color: SD.mist }}>
            {pct === 100 ? "The night is peaceful" : moon ? "Moon placed ✓" : "Drag the moon"}
          </p>
        </div>
      </NightTile>
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap gap-2">
          {presets.map((p) => {
            const active = stars === p.s && moon === p.m;
            return (
              <button
                key={p.label}
                type="button"
                onClick={() => { setStars(p.s); setMoon(p.m); }}
                aria-pressed={active}
                className={`min-h-[40px] rounded-lg border px-4 font-mono text-[10px] tracking-[0.2em] uppercase transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-signal ${
                  active ? "border-signal bg-signal text-ink" : "border-bone-line text-bone hover:border-signal hover:text-signal"
                }`}
              >
                {p.label}
              </button>
            );
          })}
        </div>
        <label className="block">
          <DemoLabel>Stars calmed · {stars} / 5</DemoLabel>
          <input
            type="range" min={0} max={5} step={1} value={stars}
            onChange={(e) => setStars(Number(e.target.value))}
            className="mt-2 w-full accent-[#FF2E88]"
          />
        </label>
        <label className="flex min-h-[40px] items-center gap-3 body-sm text-bone">
          <input type="checkbox" checked={moon} onChange={(e) => setMoon(e.target.checked)} className="h-4 w-4 accent-[#FF2E88]" />
          Moon in its ring
        </label>
        <p className="body-sm leading-[1.55]">
          The bar counts the five stars; the ring adds the moon, so it reaches 100% only when all six tasks are
          done. The game advances to the next scene at exactly that moment.
        </p>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Interaction components — star, moon target, status badge, navigation, foil.
// ---------------------------------------------------------------------------
function StarDemo() {
  const [calm, setCalm] = useState(false);
  return (
    <button
      type="button"
      onClick={() => setCalm((c) => !c)}
      aria-pressed={calm}
      aria-label={calm ? "Calm star. Tap to reset" : "Glowing star. Tap to calm it"}
      className="relative grid h-full w-full place-items-center focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-signal"
    >
      <span
        className="absolute h-28 w-28 rounded-full transition-all duration-700"
        style={{
          background: calm
            ? "radial-gradient(circle, rgba(255,233,160,.8) 0, rgba(255,233,160,.25) 30%, rgba(255,233,160,0) 68%)"
            : "radial-gradient(circle, rgba(255,255,255,.95) 0, rgba(214,224,255,.5) 20%, rgba(214,224,255,0) 62%)",
          transform: calm ? "scale(.75)" : "scale(1)",
        }}
      />
      <svg width="44" height="44" viewBox="-20 -20 40 40" className="relative transition-transform duration-500" style={{ transform: calm ? "scale(1.15)" : "rotate(8deg)" }} aria-hidden="true">
        <path d={sparklePath(15)} fill={calm ? SD.moon : "#FFFFFF"} style={{ transition: "fill .5s" }} />
        <circle r="4" fill="#fff" />
      </svg>
    </button>
  );
}

function MoonDemo() {
  const area = useRef<HTMLDivElement>(null);
  const moon = useRef<HTMLButtonElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const [placed, setPlaced] = useState(false);
  const reduce = useReducedMotion();

  const snap = () => {
    if (!moon.current || !ring.current) return;
    const m = moon.current.getBoundingClientRect();
    const r = ring.current.getBoundingClientRect();
    const dx = r.left + r.width / 2 - (m.left + m.width / 2);
    const dy = r.top + r.height / 2 - (m.top + m.height / 2);
    animate(x, x.get() + dx, { duration: reduce ? 0 : 0.45, ease: [0.3, 1.4, 0.5, 1] });
    animate(y, y.get() + dy, { duration: reduce ? 0 : 0.45, ease: [0.3, 1.4, 0.5, 1] });
    setPlaced(true);
  };
  const onDragEnd = () => {
    if (!moon.current || !ring.current) return;
    const m = moon.current.getBoundingClientRect();
    const r = ring.current.getBoundingClientRect();
    const d = Math.hypot(r.left + r.width / 2 - (m.left + m.width / 2), r.top + r.height / 2 - (m.top + m.height / 2));
    if (d < 34) snap();
  };
  const reset = () => {
    setPlaced(false);
    animate(x, 0, { duration: reduce ? 0 : 0.4 });
    animate(y, 0, { duration: reduce ? 0 : 0.4 });
  };

  return (
    <div ref={area} className="relative h-full w-full">
      <div
        ref={ring}
        className="absolute right-[14%] top-[22%] h-12 w-12 rounded-full transition-all duration-300"
        style={{
          border: placed ? `1.5px solid ${SD.moon}` : "1.5px dashed rgba(201,198,255,.7)",
          boxShadow: placed ? "0 0 24px rgba(255,241,184,.6)" : "none",
        }}
        aria-hidden="true"
      />
      <motion.button
        ref={moon}
        type="button"
        drag={!placed}
        dragConstraints={area}
        dragElastic={0.1}
        dragMomentum={false}
        onDragEnd={onDragEnd}
        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); if (placed) reset(); else snap(); } }}
        onClick={() => placed && reset()}
        style={{ x, y }}
        aria-label={placed ? "Moon placed. Press Enter to reset" : "Moon. Drag it to the ring, or press Enter"}
        className="absolute left-[12%] top-[38%] grid h-14 w-14 cursor-grab touch-none place-items-center rounded-full active:cursor-grabbing focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-signal"
      >
        <span className="absolute -inset-6 rounded-full" style={{ background: "radial-gradient(circle, rgba(255,241,184,.45) 0, rgba(255,241,184,0) 65%)" }} />
        <svg width="40" height="40" viewBox="0 0 40 40" className="relative" aria-hidden="true">
          <path d="M20 4 A16 16 0 1 0 20 36 A11.5 16 0 1 1 20 4Z" fill={SD.moon} />
        </svg>
      </motion.button>
    </div>
  );
}

function NavDemo() {
  const [lang, setLang] = useState<"EN" | "JA">("EN");
  const [sound, setSound] = useState(false);
  const iconBtn = "grid h-10 w-10 place-items-center rounded-full border border-white/25 bg-white/15 transition-transform active:scale-[.92] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-signal";
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-4 px-3">
      <div className="flex w-full max-w-[260px] items-center justify-between">
        <button type="button" className={iconBtn} aria-label="Back (demo)">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M15 5l-7 7 7 7" /></svg>
        </button>
        <span className={`${nunito.className} text-[11px] font-bold uppercase tracking-[0.16em]`} style={{ color: "#D7D3FF" }}>Step 2 of 3</span>
        <button type="button" className={iconBtn} aria-pressed={sound} aria-label={sound ? "Turn sound off (demo)" : "Turn sound on (demo)"} onClick={() => setSound((s) => !s)}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M11 5 6 9H3v6h3l5 4V5z" fill="#fff" />
            {sound ? (<><path d="M15.5 8.5a5 5 0 0 1 0 7" /><path d="M18.5 5.5a9 9 0 0 1 0 13" /></>) : <path d="M16 9.5l5 5M21 9.5l-5 5" />}
          </svg>
        </button>
      </div>
      <div className="flex h-8 rounded-2xl border border-white/20 bg-white/10 p-[3px]" role="group" aria-label="Language (demo)">
        {(["EN", "JA"] as const).map((l) => (
          <button
            key={l}
            type="button"
            aria-pressed={lang === l}
            onClick={() => setLang(l)}
            className={`${nunito.className} rounded-[13px] px-3 text-[11px] font-extrabold focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-signal`}
            style={lang === l ? { background: SD.moon, color: SD.ink } : { color: "#D7D3FF" }}
          >
            {l}
          </button>
        ))}
      </div>
    </div>
  );
}

function HoloSwatch() {
  const reduce = useReducedMotion();
  const tilt = useTilt(!reduce);
  return (
    <div className="h-full w-full p-4 [perspective:800px]" onPointerMove={tilt.onMove} onPointerLeave={tilt.reset} onPointerUp={tilt.reset}>
      <motion.div
        className="relative h-full w-full touch-none overflow-hidden rounded-xl"
        style={{ rotateX: tilt.rx, rotateY: tilt.ry, background: "linear-gradient(180deg, #1A1D5C 0%, #2E2A7A 55%, #6C5BC9 100%)", boxShadow: "inset 0 0 0 2px rgba(255,241,184,.55)" }}
        aria-hidden="true"
      >
        <FoilLayers x={tilt.light.x} y={tilt.light.y} o={tilt.light.o} />
      </motion.div>
    </div>
  );
}

export function InteractionShowcase() {
  const tiles: { title: string; hint: string; node: ReactNode }[] = [
    { title: "Interactive star", hint: "Tap: over-bright → calm", node: <StarDemo /> },
    { title: "Moon drag target", hint: "Drag into the ring · snaps", node: <MoonDemo /> },
    {
      title: "Status badge",
      hint: "Completion feedback",
      node: (
        <div className="grid h-full w-full place-items-center">
          <span
            className={`${nunito.className} flex h-8 items-center gap-1.5 whitespace-nowrap rounded-2xl pl-2.5 pr-3.5 text-[12px] font-extrabold`}
            style={{ background: SD.gBadge, color: SD.ink, boxShadow: "0 0 30px rgba(255,231,160,.35)" }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={SD.ink} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
            Night complete · 5/5 stars
          </span>
        </div>
      ),
    },
    { title: "Navigation controls", hint: "Back · step · EN/JA · sound", node: <NavDemo /> },
    { title: "Holographic surface", hint: "Hover or drag to move the light", node: <HoloSwatch /> },
  ];
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
      {tiles.map((tile) => (
        <div key={tile.title} className="flex flex-col gap-2">
          <NightTile className="h-[170px]">{tile.node}</NightTile>
          <p className="font-sans text-[13px] text-bone">{tile.title}</p>
          <DemoLabel>{tile.hint}</DemoLabel>
        </div>
      ))}
    </div>
  );
}
