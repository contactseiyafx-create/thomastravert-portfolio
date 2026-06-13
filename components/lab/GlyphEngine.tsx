"use client";

import { useState, useRef, useEffect, useMemo } from "react";

/* ════════════════════════════════════════════════════════════
   GLYPH ENGINE — a real generative type toy.
   Type a word; bend, scatter, and warp the letterforms live.
   Pure SVG + a little trig — no libraries, no canvas.
   ════════════════════════════════════════════════════════════ */
export function GlyphEngine() {
  const [text, setText] = useState("LAB");
  const [warp, setWarp] = useState(46); // vertical wave amplitude
  const [scatter, setScatter] = useState(22); // rotation jitter
  const [spread, setSpread] = useState(8); // tracking
  const [weight, setWeight] = useState(700);
  const [t, setT] = useState(0);
  const [animate, setAnimate] = useState(true);
  const raf = useRef<number>();

  // ambient time driver for the live wave
  useEffect(() => {
    if (!animate) return;
    let mounted = true;
    const loop = () => {
      if (!mounted) return;
      setT((p) => p + 0.012);
      raf.current = requestAnimationFrame(loop);
    };
    raf.current = requestAnimationFrame(loop);
    return () => {
      mounted = false;
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [animate]);

  const chars = useMemo(() => text.split("").slice(0, 12), [text]);

  // deterministic per-index pseudo-random so layout is stable
  const rand = (i: number, salt = 0) => {
    const x = Math.sin((i + 1) * 12.9898 + salt * 78.233) * 43758.5453;
    return x - Math.floor(x); // 0..1
  };

  const VB_W = 1000;
  const VB_H = 420;
  const count = Math.max(chars.length, 1);
  const step = (VB_W - 160) / Math.max(count, 1);

  return (
    <div className="h-full w-full flex flex-col lg:flex-row">
      {/* STAGE */}
      <div className="relative flex-1 grid place-items-center overflow-hidden">
        {/* ambient glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(50% 50% at 50% 45%, rgba(255,46,136,0.07), transparent 70%)",
          }}
        />
        <svg
          viewBox={`0 0 ${VB_W} ${VB_H}`}
          className="relative w-full h-full max-h-[70vh] px-6"
          aria-label={`Generative rendering of "${text}"`}
        >
          {chars.map((ch, i) => {
            const x = 80 + i * step + (spread * i - (spread * (count - 1)) / 2);
            const phase = i * 0.6;
            const wave = Math.sin(t * 2 + phase) * warp;
            const y = VB_H / 2 + wave;
            const rot =
              (rand(i) - 0.5) * scatter * 2 +
              Math.cos(t * 1.4 + phase) * (scatter * 0.4);
            const scale = 0.92 + rand(i, 3) * 0.16;
            return (
              <text
                key={i}
                x={x}
                y={y}
                textAnchor="middle"
                dominantBaseline="middle"
                transform={`rotate(${rot} ${x} ${y}) scale(${scale} 1)`}
                style={{
                  fontFamily: "var(--font-heading), system-ui, sans-serif",
                  fontWeight: weight,
                  fontSize: 150,
                  fill: i % 5 === 2 ? "var(--signal)" : "var(--bone)",
                  letterSpacing: "-0.03em",
                  textTransform: "uppercase",
                }}
              >
                {ch === " " ? "\u00A0" : ch}
              </text>
            );
          })}
        </svg>

        {/* readout */}
        <div className="pointer-events-none absolute bottom-5 left-6 font-mono text-[10px] tracking-[0.24em] uppercase text-bone-muted">
          {count} glyph{count === 1 ? "" : "s"} · warp {warp} · scatter {scatter}°
        </div>
      </div>

      {/* CONTROLS */}
      <aside className="w-full lg:w-[340px] shrink-0 border-t lg:border-t-0 lg:border-l border-bone-line bg-ink-700/40 backdrop-blur-md p-7 flex flex-col gap-7 overflow-y-auto">
        <div>
          <p className="h-eyebrow">GLYPH ENGINE</p>
          <p className="mt-2 body-sm">Type something. Then bend it.</p>
        </div>

        {/* text input */}
        <label className="block">
          <span className="font-mono text-[10px] tracking-[0.24em] uppercase text-bone-muted">
            Text
          </span>
          <input
            value={text}
            onChange={(e) => setText(e.target.value.toUpperCase())}
            maxLength={12}
            className="mt-2 w-full bg-ink border border-bone-line rounded-lg px-4 py-3 font-sans text-bone tracking-[0.1em] uppercase focus:border-signal focus:outline-none transition-colors"
            placeholder="TYPE HERE"
          />
        </label>

        <Slider label="Warp" value={warp} min={0} max={120} onChange={setWarp} />
        <Slider label="Scatter" value={scatter} min={0} max={60} onChange={setScatter} suffix="°" />
        <Slider label="Spread" value={spread} min={-20} max={40} onChange={setSpread} />
        <Slider label="Weight" value={weight} min={300} max={700} step={100} onChange={setWeight} />

        <label className="flex items-center justify-between cursor-pointer">
          <span className="font-mono text-[10px] tracking-[0.24em] uppercase text-bone-muted">
            Live motion
          </span>
          <button
            type="button"
            onClick={() => setAnimate((v) => !v)}
            className="relative w-11 h-6 rounded-full border border-bone-line transition-colors"
            style={{ background: animate ? "var(--signal)" : "transparent" }}
            aria-pressed={animate}
          >
            <span
              className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-bone transition-all duration-300"
              style={{ left: animate ? "calc(100% - 20px)" : "4px" }}
            />
          </button>
        </label>

        <button
          type="button"
          onClick={() => {
            setWarp(Math.round(Math.random() * 110));
            setScatter(Math.round(Math.random() * 55));
            setSpread(Math.round(Math.random() * 50 - 15));
          }}
          className="mt-auto py-3 rounded-lg border border-bone-line font-mono text-[11px] tracking-[0.2em] uppercase text-bone hover:border-signal hover:text-signal transition-colors"
        >
          Randomize
        </button>
      </aside>
    </div>
  );
}

function Slider({
  label,
  value,
  min,
  max,
  step = 1,
  suffix = "",
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  suffix?: string;
  onChange: (v: number) => void;
}) {
  return (
    <label className="block">
      <span className="flex items-center justify-between">
        <span className="font-mono text-[10px] tracking-[0.24em] uppercase text-bone-muted">
          {label}
        </span>
        <span className="font-mono text-[10px] tracking-[0.16em] text-bone-dim">
          {value}
          {suffix}
        </span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="lab-range mt-2 w-full"
      />
    </label>
  );
}
