// Final section of screen 03: stars gather → mystery card → tap to flip → holographic Nubi card
// → conversion panel (primary CTA + save / share / play again + story export).
import { html, gsap, useRef, useState, useEffect, useLayoutEffect, useMemo } from '../lib.js';
import { useApp, Icon, burst } from '../ui.js';
import { sparklePath } from '../art.js';
import { HoloCard } from './HoloCard.js';
import { renderCardPNG, renderStoryPNG, downloadBlob, shareCard, CARD_W, CARD_H } from '../card.js';
import { CONFIG } from '../config.js';
import { sound } from '../sound.js';
import { track, EVENTS } from '../analytics.js';

const PANEL_H = 330; // height reserved for the conversion panel (headline → disclaimer), incl. spacing

export function CardReveal({ onReplay }) {
  const { t, lang, reduced, notify, manifest, stageH, topInset } = useApp();
  const ref = useRef(null);
  const cardRef = useRef(null);
  const fxRef = useRef(null);
  const blob = useRef(null);
  const startedAt = useRef(performance.now());
  const interactions = useRef(0);
  const [phase, setPhase] = useState('materialize'); // materialize → ready → flipping → revealed
  const [serial] = useState(() => 1 + Math.floor(Math.random() * 9999));

  // Responsive card size: fill the space between the top bar and the conversion panel.
  const layout = useMemo(() => {
    const top = topInset + 50;
    const avail = stageH - PANEL_H - 12 - top;
    const s = Math.min(1, avail / CARD_H);
    const h = CARD_H * s; const w = CARD_W * s;
    const cardTop = top + Math.max(0, (avail - h) / 2);
    return { s, w, h, left: (390 - w) / 2, top: cardTop, cx: 195, cy: cardTop + h / 2 };
  }, [stageH, topInset]);

  const exportOpts = { t, lang, serial, frontImage: manifest.card.front, companionImage: manifest.companion.image };

  // ---------- 1. gather stars + materialize the card ----------
  useLayoutEffect(() => {
    track(EVENTS.CARD_REVEAL_START);
    const ctx = gsap.context(() => {
      gsap.fromTo('.rv-dim', { opacity: 0 }, { opacity: 1, duration: reduced ? 0 : 0.9, ease: 'power2.out' });
      if (reduced) {
        gsap.set('.rv-card, .rv-pre', { opacity: 1 });
        setPhase('ready');
        return;
      }
      sound.gather();
      const layer = fxRef.current;
      const stars = [];
      for (let i = 0; i < 28; i++) {
        const s = document.createElement('i');
        s.className = 'rv-gather';
        const size = 8 + Math.random() * 12;
        s.innerHTML = `<svg width="${size * 2}" height="${size * 2}" viewBox="${-size} ${-size} ${size * 2} ${size * 2}"><path d="${sparklePath(0, 0, size)}" fill="#FFF1B8"/></svg>`;
        const ang = Math.random() * Math.PI * 2; const dist = 220 + Math.random() * 260;
        s.style.left = `${layout.cx + Math.cos(ang) * dist}px`;
        s.style.top = `${layout.cy + Math.sin(ang) * dist}px`;
        layer.appendChild(s);
        stars.push(s);
      }
      const tl = gsap.timeline();
      tl.fromTo(stars, { opacity: 0, scale: 0.4 }, { opacity: 1, scale: 1, duration: 0.4, stagger: 0.015 }, 0.1)
        .to(stars, {
          left: layout.cx, top: layout.cy, scale: 0.15, rotation: 180, duration: 1.1, ease: 'power3.in', stagger: { each: 0.02, from: 'random' },
          onComplete: () => stars.forEach((s) => s.remove()),
        }, 0.35)
        .fromTo('.rv-light', { opacity: 0, scale: 0.2 }, { opacity: 1, scale: 1, duration: 0.9, ease: 'power2.out' }, 1.35)
        .fromTo('.rv-card', { opacity: 0, scale: 0.25, y: 20, filter: 'brightness(3)' },
          { opacity: 1, scale: 1, y: 0, filter: 'brightness(1)', duration: 1.1, ease: 'back.out(1.5)', clearProps: 'filter' }, 1.45)
        .add(() => burst(fxRef.current, layout.cx, layout.cy, { count: 16, ring: true }), 1.5)
        .fromTo('.rv-pre > *', { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.12 }, 2.1)
        .add(() => setPhase('ready'), 2.2);
      gsap.to('.rv-float', { y: -6, duration: 1.8, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 2.6 });
      gsap.to('.rv-tap', { boxShadow: '0 0 0 8px rgba(255,241,184,.12), 0 0 40px rgba(255,241,184,.65)', duration: 1.1, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 2.4 });
      gsap.to('.rv-light', { scale: 1.08, opacity: 0.85, duration: 2.4, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 2.3 });
    }, ref);
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ---------- 2. flip ----------
  const reveal = () => {
    if (phase !== 'ready' || !cardRef.current) return;
    setPhase('flipping');
    sound.flip();
    gsap.to(ref.current.querySelectorAll('.rv-pre > *'), { opacity: 0, y: -8, duration: 0.3, stagger: 0.05 });
    cardRef.current.flip().then(() => {
      burst(fxRef.current, layout.cx, layout.cy, { count: 22 });
      burst(fxRef.current, layout.cx, layout.top + 30, { count: 10, ring: false, color: '#C9B6FF' });
      if (!reduced) {
        gsap.fromTo(ref.current.querySelector('.rv-beam'), { opacity: 0, scaleY: 0.3 }, { opacity: 1, scaleY: 1, duration: 0.9, ease: 'power2.out', transformOrigin: '50% 0%' });
        gsap.fromTo(ref.current.querySelector('.rv-light'), { scale: 1.5 }, { scale: 1, duration: 1.4, ease: 'power2.out' });
      }
      track(EVENTS.CARD_FLIP_COMPLETE, { ms_since_reveal_start: Math.round(performance.now() - startedAt.current) });
      setPhase('revealed');
    });
  };

  // Pre-render the PNG once revealed so Share runs inside the user's tap.
  useEffect(() => {
    if (phase !== 'revealed') return undefined;
    let alive = true;
    blob.current = null;
    renderCardPNG(exportOpts).then((b) => { if (alive) blob.current = b; }).catch((e) => console.warn('[sweet-dreams] card render failed', e));
    return () => { alive = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, lang]);

  // ---------- 3. conversion panel ----------
  useLayoutEffect(() => {
    if (phase !== 'revealed' || !ref.current) return undefined;
    const ctx = gsap.context(() => {
      if (reduced) return;
      gsap.fromTo('.rv-panel > *', { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.7, stagger: 0.09, ease: 'power3.out', delay: 0.25 });
      gsap.fromTo('.rv-hint', { opacity: 0, y: 6 }, { opacity: 1, y: 0, duration: 0.5, delay: 1.2 });
      gsap.to('.rv-primary', {
        boxShadow: '0 0 0 8px rgba(255,241,184,.12), 0 0 46px rgba(255,214,170,.55), 0 14px 30px -8px rgba(255,214,170,.45), inset 0 1px 0 rgba(255,255,255,.8)',
        duration: 1.4, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 1.4,
      });
    }, ref);
    return () => ctx.revert();
  }, [phase]);

  const onInteract = (info) => {
    interactions.current += 1;
    if (interactions.current === 1) gsap.to(ref.current.querySelector('.rv-hint'), { opacity: 0, duration: 0.4 });
    if (interactions.current <= 10) track(EVENTS.CARD_INTERACTION, { interaction: info.dragged ? 'tilt_drag' : 'tilt_tap', duration_ms: info.duration_ms, count: interactions.current });
  };

  const getBlob = async () => blob.current || (blob.current = await renderCardPNG(exportOpts));
  const save = async () => {
    sound.tap();
    downloadBlob(await getBlob(), 'sweet-dreams-dream-card.png');
    notify(t.card.saved);
    track(EVENTS.REWARD_DOWNLOAD, { format: 'card_png', width: 1200, height: 1696 });
  };
  const saveStory = async () => {
    sound.tap();
    downloadBlob(await renderStoryPNG(exportOpts), 'sweet-dreams-story-1080x1920.png');
    notify(t.card.saved);
    track(EVENTS.REWARD_DOWNLOAD, { format: 'story_png', width: 1080, height: 1920 });
  };
  const share = async () => {
    track(EVENTS.SHARE_CLICK);
    const res = await shareCard({ blob: blob.current, filename: 'sweet-dreams-dream-card.png', title: t.card.shareTitle, text: t.card.shareText, url: CONFIG.shareUrl });
    if (res.success) track(EVENTS.SHARE_SUCCESS, { method: res.method });
    if (res.method === 'download_copy_link') notify(t.reveal.savedBoth);
    else if (res.method === 'download_only') notify(t.card.saved);
    else if (!res.success && res.method !== 'native') notify(t.card.shareFail);
  };
  const ctaLabel = (CONFIG.ctaLabel && CONFIG.ctaLabel[lang]) || t.reveal.cta;
  const openCta = () => {
    track(EVENTS.CTA_CLICK, { destination: CONFIG.ctaUrl, label: 'discover_pokemon_sleep', position: 'card_reveal' });
    window.open(CONFIG.ctaUrl, '_blank', 'noopener,noreferrer');
  };

  const revealed = phase === 'revealed';
  return html`<div ref=${ref} className="absolute inset-0 z-[22]">
    <div className="rv-dim absolute inset-0 opacity-0" style=${{ background: 'radial-gradient(120% 70% at 50% 40%, rgba(20,18,70,.55) 0%, rgba(6,6,30,.86) 70%)' }}></div>
    <div className="rv-beam absolute pointer-events-none opacity-0" style=${{ left: 195 - 110, width: 220, top: 0, height: layout.top + layout.h * 0.6, background: 'linear-gradient(180deg, rgba(255,241,184,0) 0%, rgba(255,241,184,.16) 55%, rgba(255,241,184,0) 100%)', filter: 'blur(6px)' }}></div>
    <div className="rv-light absolute pointer-events-none rounded-full opacity-0" style=${{
      left: layout.cx - layout.w * 0.95, top: layout.cy - layout.w * 0.95, width: layout.w * 1.9, height: layout.w * 1.9,
      background: 'radial-gradient(closest-side, rgba(255,241,184,.42), rgba(201,182,255,.22) 55%, rgba(201,182,255,0))',
    }}></div>

    <div className="rv-card absolute opacity-0" style=${{ left: layout.left, top: layout.top }}>
      <div className="rv-float">
        <${HoloCard} ref=${cardRef} serial=${serial} scale=${layout.s} onBackTap=${reveal} onInteract=${onInteract} />
      </div>
    </div>
    <div ref=${fxRef} className="absolute inset-0 pointer-events-none z-[3]"></div>

    ${!revealed && html`<div className="rv-pre absolute inset-x-6 flex flex-col items-center gap-4 text-center" style=${{ top: layout.top + layout.h + 22 }}>
      <h2 className="h2 opacity-0" aria-live="polite">${t.reveal.unlocked}</h2>
      <button type="button" className="rv-tap opacity-0 flex items-center gap-2 h-12 px-6 rounded-full font-display font-semibold text-[17px] text-ink"
        style=${{ background: 'var(--g-cta-moon)', boxShadow: '0 0 0 4px rgba(255,241,184,.12), 0 0 26px rgba(255,241,184,.45)' }} onClick=${reveal}>
        ${Icon.star(15, '#2C2A6B')} ${t.reveal.tap}
      </button>
    </div>`}

    ${revealed && html`<${React_Fragment}>
      <div className="rv-hint chip opacity-0" style=${{ left: '50%', top: layout.top + layout.h - 12, transform: 'translateX(-50%)', textTransform: 'none', letterSpacing: 0 }}>${t.reveal.tiltHint}</div>
      <div className="rv-panel absolute inset-x-6 bottom-[18px] flex flex-col items-center text-center">
        <h2 className="h2 max-w-[330px] whitespace-pre-line" style=${{ fontSize: 26 }}>${t.reveal.headline}</h2>
        <p className="sub !mt-1.5">${t.reveal.subtitle}</p>
        <button type="button" className="rv-primary cta cta-moon static mt-4" onClick=${openCta}>
          ${ctaLabel}<span className="cta-icon" aria-hidden="true">${Icon.arrow()}</span>
          <span className="sr-only"> (opens in a new tab)</span>
        </button>
        <div className="mt-3 grid w-full grid-cols-3 gap-2">
          <button type="button" className="btn-glass !h-[56px] flex-col !gap-1 !text-[12.5px] leading-tight" onClick=${save} aria-label=${t.reveal.saveLabel}>${Icon.download('#fff')}<span>${t.reveal.save}</span></button>
          <button type="button" className="btn-glass !h-[56px] flex-col !gap-1 !text-[12.5px] leading-tight" onClick=${share}>${Icon.share()}<span>${t.reveal.share}</span></button>
          <button type="button" className="btn-glass !h-[56px] flex-col !gap-1 !text-[12.5px] leading-tight" onClick=${onReplay}>${Icon.replay('#fff')}<span>${t.reveal.again}</span></button>
        </div>
        <button type="button" className="link mt-1 !py-2 text-[12px]" onClick=${saveStory}>${t.reveal.story}</button>
        <p className="mt-0.5 max-w-[340px] text-[10px] leading-snug text-[#9C99DC]">${t.reveal.disclaimer}</p>
      </div>
    <//>`}
  </div>`;
}

const React_Fragment = ({ children }) => children;
