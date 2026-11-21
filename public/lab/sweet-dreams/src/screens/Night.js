// SCREEN 02 — Interactive Night (Figma frame "02 Interactive Night")
// Gameplay: calm the 5 over-bright stars (tap) + drag the moon into the glowing ring.
import { html, gsap, useRef, useState, useEffect, useGsap } from '../lib.js';
import { useApp, TopBar, Steps, Background, Twinkles, Fireflies, Icon, burst } from '../ui.js';
import { sparklePath, crescentPath } from '../art.js';
import { CharacterSlot } from '../character/CharacterSlot.js';
import { sound } from '../sound.js';
import { track, EVENTS } from '../analytics.js';

const STARS = [[60, 392], [334, 380], [236, 290], [118, 340], [300, 300]];
const START = { x: 96, y: 244 };
const TARGET = { x: 328, y: 222 };
const SNAP = 46;
const RING_C = 119.4; // 2πr, r = 19
const TOTAL = STARS.length + 1;

const trailPath = (p) => `M${START.x + 30} ${START.y - 4} Q${(START.x + p.x) / 2} ${Math.min(START.y, p.y) - 60} ${p.x} ${p.y}`;

export function Night({ onComplete, onBack }) {
  const { t, reduced, notify, manifest } = useApp();
  const ref = useRef(null);
  const sceneRef = useRef(null);
  const fxRef = useRef(null);
  const moonRef = useRef(null);
  const charRef = useRef(null);
  const loops = useRef({});
  const calmRef = useRef([]);
  const moonDoneRef = useRef(false);
  const doneRef = useRef(false);
  const pos = useRef({ ...START });
  const drag = useRef(null);
  const attempts = useRef(0);
  const startedAt = useRef(performance.now());
  const ring = useRef({ v: 0 });
  const [calmCount, setCalmCount] = useState(0);
  const [moonDone, setMoonDone] = useState(false);
  const [done, setDone] = useState(false);
  const q = (sel) => (ref.current ? ref.current.querySelector(sel) : null);
  const qa = (sel) => (ref.current ? ref.current.querySelectorAll(sel) : []);

  // ---------- intro + idle loops ----------
  useGsap(ref, () => {
    if (reduced) return;
    gsap.timeline({ defaults: { ease: 'power3.out' } })
      .from('.n-top', { y: -16, opacity: 0, stagger: 0.08, duration: 0.7 }, 0.1)
      .from('.n-panel', { y: 50, opacity: 0, duration: 0.8 }, 0.2)
      .from('.star-btn', { scale: 0, opacity: 0, stagger: 0.08, duration: 0.6, ease: 'back.out(2)' }, 0.35)
      .from('.moon-btn', { scale: 0.6, opacity: 0, duration: 0.8, ease: 'back.out(1.6)' }, 0.45)
      .from('.chip', { y: 8, opacity: 0, stagger: 0.1, duration: 0.5 }, 1);
    STARS.forEach((_, i) => {
      loops.current[i] = [
        gsap.to(`.star-${i} .halo-bright`, { scale: 1.18, opacity: 0.6, duration: gsap.utils.random(0.35, 0.6), ease: 'sine.inOut', yoyo: true, repeat: -1 }),
        gsap.to(`.star-${i} svg`, { rotation: gsap.utils.random([-12, 12]), duration: gsap.utils.random(0.16, 0.28), ease: 'sine.inOut', yoyo: true, repeat: -1 }),
      ];
      gsap.to(`.star-${i}`, { y: -6, duration: 1.8 + i * 0.3, ease: 'sine.inOut', yoyo: true, repeat: -1 });
    });
    gsap.to('.mring', { scale: 1.08, opacity: 0.2, duration: 1.2, ease: 'sine.inOut', yoyo: true, repeat: -1, stagger: 0.3 });
    gsap.to('.target-ring', { scale: 1.12, duration: 0.9, ease: 'sine.inOut', yoyo: true, repeat: -1 });
    gsap.to('.chip', { y: -3, duration: 0.8, ease: 'sine.inOut', yoyo: true, repeat: -1, stagger: 0.2 });
  }, [reduced]);

  // ---------- progress feedback ----------
  useEffect(() => {
    const progress = (calmCount + (moonDone ? 1 : 0)) / TOTAL;
    qa('.segs span i').forEach((el, i) => gsap.to(el, { scaleX: i < calmCount ? 1 : 0, duration: reduced ? 0 : 0.6, ease: 'power2.out' }));
    if (calmCount > 0 && !reduced) gsap.fromTo(q('.pcount b'), { scale: 1.6 }, { scale: 1, duration: 0.45, ease: 'back.out(3)' });
    gsap.to(ring.current, {
      v: progress, duration: reduced ? 0 : 0.8, ease: 'power2.out',
      onUpdate: () => {
        const arc = q('.ring-arc'); const txt = q('.ring-pct');
        if (arc) arc.setAttribute('stroke-dasharray', `${(RING_C * ring.current.v).toFixed(1)} ${RING_C}`);
        if (txt) txt.textContent = `${Math.round(ring.current.v * 100)}%`;
      },
    });
    gsap.to(q('.n-veil'), { opacity: progress * 0.5, duration: reduced ? 0 : 1.4, ease: 'power2.out' });
    charRef.current && charRef.current.setRelax(progress);

    if (calmCount === STARS.length && moonDone && !doneRef.current) {
      doneRef.current = true;
      setDone(true);
      sound.complete();
      track(EVENTS.CHALLENGE_COMPLETE, { duration_ms: Math.round(performance.now() - startedAt.current), moon_attempts: attempts.current });
      burst(fxRef.current, 195, 380, { count: 18 });
      if (!reduced) gsap.fromTo(q('.n-panel-copy'), { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.6 });
      const timer = setTimeout(onComplete, reduced ? 800 : 2000);
      return () => clearTimeout(timer);
    }
    return undefined;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [calmCount, moonDone]);

  const hideChip = (sel) => gsap.to(q(sel), { opacity: 0, y: -6, duration: 0.3, overwrite: true });

  // ---------- stars ----------
  const tapStar = (i) => {
    if (doneRef.current) return;
    sound.unlock();
    const el = q(`.star-${i}`);
    const [x, y] = STARS[i];
    if (calmRef.current.includes(i)) {
      gsap.fromTo(el.querySelector('svg'), { scale: 1.35 }, { scale: 1.15, duration: 0.4, ease: 'back.out(2)' });
      return;
    }
    (loops.current[i] || []).forEach((tw) => tw.kill());
    const d = reduced ? 0 : 1;
    gsap.to(el.querySelector('.halo-bright'), { opacity: 0, scale: 0.4, duration: 0.6 * d });
    gsap.fromTo(el.querySelector('.halo-calm'), { opacity: 0, scale: 0.3 }, { opacity: 1, scale: 1, duration: 0.9 * d, ease: 'back.out(1.6)' });
    gsap.to(el.querySelector('svg'), { rotation: 0, scale: 1.15, duration: 0.6 * d, ease: 'back.out(2)' });
    gsap.to(el.querySelector('.sp'), { attr: { fill: '#FFF1B8' }, duration: 0.5 * d });
    burst(fxRef.current, x, y);
    calmRef.current = [...calmRef.current, i];
    const n = calmRef.current.length;
    sound.dim(n);
    charRef.current && charRef.current.happy();
    hideChip('.chip-tap');
    track(EVENTS.STAR_TAP, { star_index: i + 1, stars_calmed: n });
    setCalmCount(n);
  };

  // ---------- moon ----------
  const placeMoon = (p) => {
    pos.current = p;
    const el = moonRef.current;
    el.style.left = `${p.x}px`; el.style.top = `${p.y}px`;
    const d = Math.hypot(p.x - START.x, p.y - START.y) > 24 ? trailPath(p) : '';
    qa('.n-trail').forEach((path) => path.setAttribute('d', d));
    q('.target-ring').classList.toggle('near', Math.hypot(p.x - TARGET.x, p.y - TARGET.y) < SNAP);
  };

  const completeMoon = (method) => {
    if (moonDoneRef.current) return;
    moonDoneRef.current = true;
    const from = { ...pos.current };
    gsap.to(from, {
      x: TARGET.x, y: TARGET.y, duration: reduced ? 0 : 0.5, ease: 'back.out(2)',
      onUpdate: () => placeMoon({ x: from.x, y: from.y }),
    });
    gsap.to(qa('.mring, .target-ring, .n-guide'), { opacity: 0, duration: 0.4, overwrite: true });
    gsap.to(q('.mglow'), { scale: 1.5, duration: 1, ease: 'power2.out' });
    burst(fxRef.current, TARGET.x, TARGET.y, { count: 14 });
    sound.moon();
    charRef.current && charRef.current.happy();
    track(EVENTS.MOON_DRAG_COMPLETE, { method, attempts: attempts.current + 1 });
    setMoonDone(true);
  };

  const local = (e) => {
    const r = sceneRef.current.getBoundingClientRect();
    const s = r.width / 390;
    return { x: (e.clientX - r.left) / s, y: (e.clientY - r.top) / s };
  };

  const onDown = (e) => {
    if (moonDoneRef.current || doneRef.current) return;
    e.preventDefault();
    sound.unlock();
    moonRef.current.setPointerCapture(e.pointerId);
    const l = local(e);
    drag.current = { dx: pos.current.x - l.x, dy: pos.current.y - l.y, moved: false };
    moonRef.current.classList.add('dragging');
    gsap.to(moonRef.current.querySelector('svg'), { scale: 1.12, duration: 0.25 });
    gsap.to(q('.n-guide'), { opacity: 0.18, duration: 0.3 });
    hideChip('.chip-drag');
  };
  const onMove = (e) => {
    if (!drag.current) return;
    const l = local(e);
    drag.current.moved = true;
    placeMoon({
      x: Math.max(36, Math.min(354, l.x + drag.current.dx)),
      y: Math.max(150, Math.min(560, l.y + drag.current.dy)),
    });
  };
  const onUp = () => {
    if (!drag.current) return;
    const { moved } = drag.current;
    drag.current = null;
    moonRef.current.classList.remove('dragging');
    gsap.to(moonRef.current.querySelector('svg'), { scale: 1, duration: 0.3 });
    if (Math.hypot(pos.current.x - TARGET.x, pos.current.y - TARGET.y) < SNAP) completeMoon('drag');
    else if (moved) {
      attempts.current += 1;
      notify(t.night.miss);
      gsap.fromTo(q('.target-ring'), { scale: 1.35 }, { scale: 1, duration: 0.5, ease: 'elastic.out(1,0.4)' });
    }
  };
  const onKey = (e) => {
    if (moonDoneRef.current) return;
    const step = 16;
    const moves = { ArrowLeft: [-step, 0], ArrowRight: [step, 0], ArrowUp: [0, -step], ArrowDown: [0, step] };
    if (moves[e.key]) {
      e.preventDefault();
      const [dx, dy] = moves[e.key];
      placeMoon({ x: Math.max(36, Math.min(354, pos.current.x + dx)), y: Math.max(150, Math.min(560, pos.current.y + dy)) });
      if (Math.hypot(pos.current.x - TARGET.x, pos.current.y - TARGET.y) < SNAP * 0.6) completeMoon('keyboard');
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      completeMoon('keyboard');
    }
  };

  const left = STARS.length - calmCount;
  const tapHint = left ? t.night.tapLeft(left) : t.night.starsDone;
  const moonHint = moonDone ? t.night.moonDone : t.night.moon;

  return html`<section ref=${ref} className="screen" style=${{ background: '#0F1442' }} aria-labelledby="n-title">
    <div ref=${sceneRef} className="scene">
      <${Background} src=${manifest.backgrounds.night} />
      <${Twinkles} seed=${12} count=${14} area=${[10, 380, 60, 500]} />
      <div className="fx n-veil" style=${{ background: '#04061C', opacity: 0 }}></div>
      <${CharacterSlot} ref=${charRef} id="n" x=${195} y=${462} scale=${0.88} />
      <${Fireflies} seed=${5} count=${5} area=${[40, 350, 470, 590]} />

      <svg className="fx" width="390" height="844" viewBox="0 0 390 844" aria-hidden="true">
        <defs><linearGradient id="n-trail-g" gradientUnits="userSpaceOnUse" x1="96" y1="0" x2="330" y2="0">
          <stop offset="0" stop-color="#FFF1B8" stop-opacity=".9" /><stop offset="1" stop-color="#C9B6FF" stop-opacity=".2" /></linearGradient></defs>
        <g className="n-guide">
          <path d="M126 240 C185 200 252 192 320 218" stroke="#C9C6FF" stroke-width="2" fill="none" stroke-linecap="round" stroke-dasharray="2 9" opacity=".55" />
          <path d="M294 212 l8 10 l-8 10" stroke="#C9C6FF" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" opacity=".7" />
        </g>
        <path className="n-trail" d="" stroke="url(#n-trail-g)" stroke-width="14" fill="none" stroke-linecap="round" opacity=".3" />
        <path className="n-trail" d="" stroke="url(#n-trail-g)" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-dasharray="2 9" />
      </svg>
      <div className="target-ring" style=${{ left: TARGET.x, top: TARGET.y }}></div>

      ${STARS.map(([x, y], i) => html`<button key=${i} type="button" className=${`star-btn star-${i}`} style=${{ left: x, top: y }}
          onClick=${() => tapStar(i)} aria-label=${t.night.starLabel(i + 1, calmRef.current.includes(i))} aria-pressed=${calmRef.current.includes(i)}>
        <span className="halo halo-bright" style=${{ background: 'radial-gradient(circle, rgba(255,255,255,.95) 0, rgba(214,224,255,.5) 20%, rgba(214,224,255,0) 62%)' }}></span>
        <span className="halo halo-calm" style=${{ opacity: 0, background: 'radial-gradient(circle, rgba(255,233,160,.8) 0, rgba(255,233,160,.25) 30%, rgba(255,233,160,0) 68%)' }}></span>
        <svg width="40" height="40" viewBox="-20 -20 40 40"><path className="sp" d=${sparklePath(0, 0, 15)} fill="#FFFFFF" /><circle r="4" fill="#fff" /></svg>
      </button>`)}

      <div ref=${moonRef} className="moon-btn" role="button" tabIndex="0" aria-label=${t.night.moonLabel} aria-disabled=${moonDone}
        style=${{ left: START.x, top: START.y }} onPointerDown=${onDown} onPointerMove=${onMove} onPointerUp=${onUp} onPointerCancel=${onUp} onKeyDown=${onKey}>
        <div className="mglow"></div><div className="mring"></div><div className="mring r2"></div>
        <svg width="120" height="120" viewBox="0 0 120 120"><path d=${crescentPath(60, 60, 34)} fill="#FFF1B8" /></svg>
      </div>

      <div className="chip chip-drag" style=${{ left: 44, top: 300 }}>${t.night.chipDrag}</div>
      <div className="chip chip-tap" style=${{ left: 94, top: 364 }}>${t.night.chipTap}</div>
      <div ref=${fxRef} className="fx" style=${{ zIndex: 16 }}></div>

      <div className="glass panel n-panel" style=${{ top: 600 }}>
        <div className="n-panel-copy" aria-live="polite">
          <h2 id="n-title" className="h2">${done ? t.night.done : t.night.title}</h2>
          <p className="sub">${done ? t.night.doneSub : t.night.instruction}</p>
        </div>
        <div className="hints">
          <div className=${`hint ${left ? '' : 'done'}`}><span className="hint-icon">${Icon.star(16)}</span><span><b>${tapHint[0]}</b>${tapHint[1]}</span></div>
          <div className=${`hint ${moonDone ? 'done' : ''}`}><span className="hint-icon">${Icon.moon(16)}</span><span><b>${moonHint[0]}</b>${moonHint[1]}</span></div>
        </div>
        <div className="panel-foot">
          <${Steps} active=${1} />
          <div className="ring" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow=${Math.round(((calmCount + (moonDone ? 1 : 0)) / TOTAL) * 100)} aria-label=${t.night.progress}>
            <svg width="44" height="44" viewBox="0 0 44 44"><circle cx="22" cy="22" r="19" fill="none" stroke="rgba(255,255,255,.14)" stroke-width="4" />
              <circle className="ring-arc" cx="22" cy="22" r="19" fill="none" stroke="#FFE7A0" stroke-width="4" stroke-linecap="round" stroke-dasharray=${`0 ${RING_C}`} transform="rotate(-90 22 22)" /></svg>
            <span className="ring-pct">0%</span>
          </div>
        </div>
      </div>
    </div>

    <div className="glass progress n-top" style=${{ top: 'calc(var(--top) + 54px)' }}>
      <div className="prow">
        <div className="ptitle">${Icon.star(14)}${t.night.progress}</div>
        <div className="pcount" dangerouslySetInnerHTML=${t.night.stars(calmCount)}></div>
      </div>
      <div className="segs">${STARS.map((_, i) => html`<span key=${i}><i></i></span>`)}</div>
    </div>
    <div className="n-top"><${TopBar} variant="back" label=${t.night.step} onBack=${onBack} /></div>
  </section>`;
}
