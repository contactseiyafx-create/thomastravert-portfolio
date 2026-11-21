// Reusable UI components (Figma design system) + ambient motion layers.
import { html, gsap, createContext, useContext, useRef, useMemo, rng, useGsap } from './lib.js';
import { cloudSVG, sparklePath } from './art.js';
import { LANGS, STRINGS } from './i18n.js';

export const AppCtx = createContext(null);
export const useApp = () => useContext(AppCtx);

// ---------- Icons ----------
export const Icon = {
  arrow: (c = '#2C2A6B') => html`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke=${c} stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>`,
  back: () => html`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 5l-7 7 7 7"/></svg>`,
  close: () => html`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.6" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg>`,
  moon: (s = 14, c = '#FFEDA6') => html`<svg width=${s} height=${s} viewBox="0 0 24 24" aria-hidden="true"><path d="M14 2a10 10 0 1 0 8 15A8 8 0 0 1 14 2z" fill=${c}/></svg>`,
  star: (s = 14, c = '#FFEDA6') => html`<svg width=${s} height=${s} viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2 Q13.5 10.5 22 12 Q13.5 13.5 12 22 Q10.5 13.5 2 12 Q10.5 10.5 12 2Z" fill=${c}/></svg>`,
  check: () => html`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2C2A6B" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>`,
  replay: (c = '#E3DFFF') => html`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke=${c} stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/></svg>`,
  download: (c = '#2C2A6B') => html`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke=${c} stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 4v11M7 10l5 5 5-5M5 20h14"/></svg>`,
  share: () => html`<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 15V4M7.5 8.5 12 4l4.5 4.5M5 13v6a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-6"/></svg>`,
  sound: (on) => html`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M11 5 6 9H3v6h3l5 4V5z" fill="#fff"/>
      ${on ? html`<path d="M15.5 8.5a5 5 0 0 1 0 7"/><path d="M18.5 5.5a9 9 0 0 1 0 13"/>` : html`<path d="M16 9.5l5 5M21 9.5l-5 5"/>`}
    </svg>`,
};

// ---------- Top bar (logo or back + step label, language, sound) ----------
export function TopBar({ variant = 'logo', label, onBack }) {
  const { t, lang, setLang, soundOn, toggleSound, manifest } = useApp();
  const left = variant === 'back'
    ? html`<button type="button" className="icon-btn" onClick=${onBack} aria-label=${t.a11y.back}>${Icon.back()}</button>`
    : html`<div className="logo">${manifest.ui.logo ? html`<img src=${manifest.ui.logo} alt="" />` : Icon.moon()}${t.brand}</div>`;
  return html`<div className="topbar">
    ${left}
    ${label ? html`<div className="steplabel">${label}</div>` : null}
    <div className="right">
      <div className="lang" role="group" aria-label=${t.a11y.language}>
        ${LANGS.map((l) => html`<button key=${l} type="button" lang=${l} aria-pressed=${lang === l} onClick=${() => setLang(l)}>${STRINGS[l].langLabel}</button>`)}
      </div>
      <button type="button" className="icon-btn" onClick=${toggleSound} aria-pressed=${soundOn}
        aria-label=${soundOn ? t.a11y.soundOn : t.a11y.soundOff}>${Icon.sound(soundOn)}</button>
    </div>
  </div>`;
}

export function Steps({ active }) {
  return html`<div className="steps" aria-hidden="true">${[0, 1, 2].map((i) =>
    html`<span key=${i} className=${i === active ? 'on' : i < active ? 'done' : ''}></span>`)}</div>`;
}

export function StatusBar() {
  return html`<div className="status" aria-hidden="true"><span>9:41</span><span className="sicons">
    <svg width="18" height="12" viewBox="0 0 18 12"><rect x="0" y="8" width="3" height="4" rx="1" fill="#fff"/><rect x="5" y="5.5" width="3" height="6.5" rx="1" fill="#fff"/><rect x="10" y="3" width="3" height="9" rx="1" fill="#fff"/><rect x="15" y="0" width="3" height="12" rx="1" fill="#fff"/></svg>
    <svg width="16" height="12" viewBox="0 0 16 12"><path d="M8 11.5 L5.6 8.9 a3.4 3.4 0 0 1 4.8 0Z M2.9 6.3 a7.3 7.3 0 0 1 10.2 0 l-1.5 1.5 a5.2 5.2 0 0 0 -7.2 0Z M0.2 3.6 a11.2 11.2 0 0 1 15.6 0 l-1.4 1.4 a9.2 9.2 0 0 0 -12.8 0Z" fill="#fff"/></svg>
    <svg width="27" height="13" viewBox="0 0 27 13"><rect x=".5" y=".5" width="23" height="12" rx="3.5" fill="none" stroke="#fff" opacity=".5"/><rect x="2.5" y="2.5" width="19" height="8" rx="2" fill="#fff"/><rect x="25" y="4.5" width="1.6" height="4" rx=".8" fill="#fff" opacity=".5"/></svg>
  </span></div>`;
}

export function Toast({ message }) {
  const ref = useRef(null);
  useGsap(ref, () => {
    if (message) gsap.fromTo('.toast', { y: -14, opacity: 0 }, { y: 0, opacity: 1, duration: 0.35, ease: 'back.out(2)' });
  }, [message]);
  return html`<div ref=${ref} className="toast-wrap" role="status" aria-live="polite">${message ? html`<div className="toast">${message.text}</div>` : null}</div>`;
}

/** Replaceable background art (assets/manifest.json → backgrounds.*). */
export function Background({ src, className = '' }) {
  if (!src) return null;
  return html`<img className=${`bg ${className}`} src=${src} alt="" width="390" height="844" decoding="async" draggable="false" />`;
}

// ---------- Ambient motion layers ----------
/** Figma clouds: [x, y, scale, fill, opacity, driftPx, seconds] in scene coordinates. */
export function Clouds({ items }) {
  const { reduced } = useApp();
  const ref = useRef(null);
  useGsap(ref, () => {
    if (reduced) return;
    gsap.utils.toArray('.cloud').forEach((el, i) => {
      const [, , , , , drift = 18, dur = 16] = items[i];
      gsap.fromTo(el, { x: -drift * 0.5 }, { x: drift, duration: dur, ease: 'sine.inOut', yoyo: true, repeat: -1 });
    });
  }, [reduced]);
  return html`<div ref=${ref} className="fx" aria-hidden="true">
    ${items.map(([x, y, s, fill, op], i) => html`<div key=${i} className="cloud" style=${{ position: 'absolute', left: x - 20 * s, top: y - 38 * s }}
      dangerouslySetInnerHTML=${{ __html: cloudSVG(s, fill, op) }} />`)}
  </div>`;
}

export function Twinkles({ seed = 1, count = 12, area = [10, 380, 60, 470] }) {
  const { reduced } = useApp();
  const ref = useRef(null);
  const items = useMemo(() => {
    const r = rng(seed);
    return Array.from({ length: count }, () => ({ x: area[0] + r() * (area[1] - area[0]), y: area[2] + r() * (area[3] - area[2]), s: 6 + r() * 7 }));
  }, [seed, count]);
  useGsap(ref, () => {
    if (reduced) return;
    gsap.utils.toArray('.twinkle').forEach((el) => {
      gsap.fromTo(el, { opacity: 0.15, scale: 0.55 }, { opacity: 1, scale: 1, duration: gsap.utils.random(1.1, 2.2), ease: 'sine.inOut', yoyo: true, repeat: -1, delay: gsap.utils.random(0, 3) });
    });
  }, [reduced]);
  return html`<div ref=${ref} className="fx" aria-hidden="true">
    ${items.map((s, i) => html`<i key=${i} className="twinkle" style=${{ left: s.x, top: s.y, width: s.s, height: s.s, opacity: 0.6 }}></i>`)}
  </div>`;
}

export function Fireflies({ seed = 2, count = 6, area = [20, 370, 420, 640] }) {
  const { reduced } = useApp();
  const ref = useRef(null);
  const items = useMemo(() => {
    const r = rng(seed);
    return Array.from({ length: count }, () => ({ x: area[0] + r() * (area[1] - area[0]), y: area[2] + r() * (area[3] - area[2]) }));
  }, [seed, count]);
  useGsap(ref, () => {
    if (reduced) return;
    gsap.utils.toArray('.firefly').forEach((el) => {
      const wander = () => gsap.to(el, {
        x: gsap.utils.random(-24, 24), y: gsap.utils.random(-30, 18), opacity: gsap.utils.random(0.3, 1),
        duration: gsap.utils.random(2.2, 4), ease: 'sine.inOut', onComplete: wander,
      });
      wander();
    });
  }, [reduced]);
  return html`<div ref=${ref} className="fx" aria-hidden="true">
    ${items.map((f, i) => html`<i key=${i} className="firefly" style=${{ left: f.x, top: f.y }}></i>`)}
  </div>`;
}

/** Slow golden dust rising (screen 03 particles). */
export function Particles({ seed = 9, count = 26, area = [20, 370, 380, 620] }) {
  const { reduced } = useApp();
  const ref = useRef(null);
  const items = useMemo(() => {
    const r = rng(seed);
    return Array.from({ length: count }, () => ({ x: area[0] + r() * (area[1] - area[0]), y: area[2] + r() * (area[3] - area[2]), s: 1.6 + r() * 2.4 }));
  }, [seed, count]);
  useGsap(ref, () => {
    if (reduced) return;
    gsap.utils.toArray('.dust').forEach((el) => {
      const d = gsap.utils.random(4, 7);
      gsap.timeline({ repeat: -1, delay: gsap.utils.random(0, 5) })
        .fromTo(el, { y: 0, x: 0, opacity: 0 }, { y: gsap.utils.random(-120, -60), x: gsap.utils.random(-14, 14), duration: d, ease: 'none' }, 0)
        .to(el, { opacity: 0.9, duration: d * 0.3 }, 0)
        .to(el, { opacity: 0, duration: d * 0.4 }, d * 0.6);
    });
  }, [reduced]);
  return html`<div ref=${ref} className="fx" aria-hidden="true">
    ${items.map((p, i) => html`<i key=${i} className="dust" style=${{ position: 'absolute', left: p.x, top: p.y, width: p.s, height: p.s, borderRadius: '50%', background: '#FFEFB0', boxShadow: '0 0 6px #FFE9A0', opacity: 0.7 }}></i>`)}
  </div>`;
}

/** Spark burst + ripple at (x, y) inside container (scene coordinates). */
export function burst(container, x, y, { count = 10, ring = true, color } = {}) {
  if (!container) return;
  for (let i = 0; i < count; i++) {
    const p = document.createElement('i');
    p.className = 'spark';
    if (color) p.style.background = color;
    p.style.left = `${x}px`; p.style.top = `${y}px`;
    container.appendChild(p);
    const a = (Math.PI * 2 * i) / count + Math.random() * 0.4;
    const r = 28 + Math.random() * 30;
    gsap.to(p, { x: Math.cos(a) * r, y: Math.sin(a) * r, scale: 0.2, opacity: 0, duration: 0.8, ease: 'power2.out', onComplete: () => p.remove() });
  }
  if (ring) {
    const rp = document.createElement('div');
    rp.className = 'ripple';
    rp.style.left = `${x}px`; rp.style.top = `${y}px`;
    container.appendChild(rp);
    gsap.fromTo(rp, { scale: 0.4, opacity: 1 }, { scale: 2.2, opacity: 0, duration: 0.9, ease: 'power2.out', onComplete: () => rp.remove() });
  }
}

export const sparkleSVG = (r, fill) => html`<svg width=${r * 2} height=${r * 2} viewBox=${`${-r} ${-r} ${r * 2} ${r * 2}`} aria-hidden="true"><path d=${sparklePath(0, 0, r)} fill=${fill} /></svg>`;
