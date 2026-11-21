// Holographic collectible card: CSS 3D flip + pointer-driven foil, no 3D library.
// GPU-friendly: only transform/opacity/background-position and a few CSS variables change per frame.
import { html, gsap, forwardRef, useImperativeHandle, useMemo, useRef, useEffect } from '../lib.js';
import { useApp } from '../ui.js';
import { cardSVG, cardBackSVG } from '../art.js';
import { cardText, CARD_W, CARD_H } from '../card.js';

let noiseUrl = null;
function holoNoise() {
  if (noiseUrl) return noiseUrl;
  const c = document.createElement('canvas');
  c.width = c.height = 128;
  const x = c.getContext('2d');
  const d = x.createImageData(128, 128);
  for (let i = 0; i < d.data.length; i += 4) {
    const v = 140 + Math.random() * 115;
    d.data[i] = v; d.data[i + 1] = v * (0.9 + Math.random() * 0.1); d.data[i + 2] = 255;
    d.data[i + 3] = Math.random() < 0.55 ? 255 : 0;
  }
  x.putImageData(d, 0, 0);
  noiseUrl = `url(${c.toDataURL('image/png')})`;
  return noiseUrl;
}

const IDLE = { rx: 0, ry: 0, mx: 50, my: 32, o: 0.35 };

export const HoloCard = forwardRef(function HoloCard({ serial, scale = 1, onBackTap, onInteract }, ref) {
  const { t, lang, reduced, manifest } = useApp();
  const rootRef = useRef(null);
  const tiltRef = useRef(null);
  const flipRef = useRef(null);
  const frontRef = useRef(null);
  const charsRef = useRef(null);
  const flashRef = useRef(null);
  const st = useRef({ flipped: false, p: { ...IDLE }, idle: null, idleDelay: null, down: null, active: false });

  const frontImg = manifest.card.front;
  const base = useMemo(() => (frontImg ? null : cardSVG(serial, { layer: 'base', companionImage: manifest.companion.image })), [serial, frontImg]);
  const chars = useMemo(() => (frontImg ? null : cardSVG(serial, { layer: 'chars', companionImage: manifest.companion.image })), [serial, frontImg]);
  const back = useMemo(() => (manifest.card.back ? null : cardBackSVG()), [manifest.card.back]);
  const texts = frontImg ? [] : cardText({ t, lang, serial });
  const amp = reduced ? 0.4 : 1;

  const apply = () => {
    const p = st.current.p;
    if (tiltRef.current) tiltRef.current.style.transform = `rotateX(${p.rx.toFixed(2)}deg) rotateY(${p.ry.toFixed(2)}deg)`;
    const f = frontRef.current;
    if (f) {
      f.style.setProperty('--mx', `${p.mx.toFixed(1)}%`);
      f.style.setProperty('--my', `${p.my.toFixed(1)}%`);
      f.style.setProperty('--o', p.o.toFixed(3));
      f.style.setProperty('--bgx', `${(50 + (p.mx - 50) * -1.4).toFixed(1)}%`);
      f.style.setProperty('--bgy', `${(50 + (p.my - 50) * -1.4).toFixed(1)}%`);
    }
    if (charsRef.current) charsRef.current.style.transform = `translate3d(${((p.mx - 50) * -0.12).toFixed(2)}px, ${((p.my - 50) * -0.1).toFixed(2)}px, 0)`;
  };

  const stopIdle = () => {
    const s = st.current;
    if (s.idle) { s.idle.kill(); s.idle = null; }
    if (s.idleDelay) { s.idleDelay.kill(); s.idleDelay = null; }
  };
  // Slow specular sweep while nobody is touching the card.
  const scheduleIdle = (delay = 1.6) => {
    const s = st.current;
    if (reduced || !s.flipped) return;
    stopIdle();
    s.idleDelay = gsap.delayedCall(delay, () => {
      s.idle = gsap.timeline({ repeat: -1, yoyo: true, onUpdate: apply })
        .to(s.p, { mx: 82, my: 22, ry: 5, rx: -2.5, o: 0.5, duration: 2.8, ease: 'sine.inOut' })
        .to(s.p, { mx: 22, my: 62, ry: -5, rx: 2.5, o: 0.42, duration: 3.2, ease: 'sine.inOut' });
    });
  };

  useEffect(() => { apply(); return stopIdle; /* eslint-disable-next-line */ }, []);

  const toTarget = (e) => {
    const r = rootRef.current.getBoundingClientRect();
    const px = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width));
    const py = Math.min(1, Math.max(0, (e.clientY - r.top) / r.height));
    return { rx: (0.5 - py) * 22 * amp, ry: (px - 0.5) * 26 * amp, mx: px * 100, my: py * 100, o: st.current.flipped ? 0.95 : 0.5 };
  };

  const onDown = (e) => {
    const s = st.current;
    s.down = { x: e.clientX, y: e.clientY, t: performance.now(), moved: false };
    s.active = true;
    try { rootRef.current.setPointerCapture(e.pointerId); } catch (err) { /* ignore */ }
    stopIdle();
    gsap.to(s.p, { ...toTarget(e), duration: 0.45, ease: 'power3.out', overwrite: true, onUpdate: apply });
  };
  const onMove = (e) => {
    const s = st.current;
    if (e.pointerType !== 'mouse' && !s.down) return;
    if (s.down && Math.hypot(e.clientX - s.down.x, e.clientY - s.down.y) > 8) s.down.moved = true;
    s.active = true;
    stopIdle();
    gsap.to(s.p, { ...toTarget(e), duration: 0.45, ease: 'power3.out', overwrite: true, onUpdate: apply });
  };
  const release = () => {
    const s = st.current;
    const down = s.down;
    s.down = null;
    if (!s.active) return;
    s.active = false;
    gsap.to(s.p, { rx: 0, ry: 0, mx: IDLE.mx, my: IDLE.my, duration: reduced ? 0.4 : 1.3, ease: reduced ? 'power2.out' : 'elastic.out(1, 0.45)', overwrite: true, onUpdate: apply });
    gsap.to(s.p, { o: IDLE.o, duration: 0.9, ease: 'power2.out', onUpdate: apply });
    if (down && !s.flipped && !down.moved) onBackTap && onBackTap();
    else if (down && s.flipped) onInteract && onInteract({ duration_ms: Math.round(performance.now() - down.t), dragged: down.moved });
    scheduleIdle();
  };
  const onKey = (e) => {
    if ((e.key === 'Enter' || e.key === ' ') && !st.current.flipped) { e.preventDefault(); onBackTap && onBackTap(); }
  };

  useImperativeHandle(ref, () => ({
    /** Flips to the front; returns the GSAP timeline (thenable). */
    flip() {
      const s = st.current;
      if (s.flipped) return gsap.timeline();
      s.flipped = true;
      stopIdle();
      const tl = gsap.timeline();
      if (reduced) {
        tl.set(flipRef.current, { rotateY: 180 }).fromTo(rootRef.current, { opacity: 0.4 }, { opacity: 1, duration: 0.3 });
      } else {
        tl.to(flipRef.current, { rotateY: -14, scale: 0.96, duration: 0.22, ease: 'power2.out' })
          .to(flipRef.current, { rotateY: 180, scale: 1.06, duration: 1.05, ease: 'power3.inOut' })
          .fromTo(flashRef.current, { opacity: 0, scale: 0.6 }, { opacity: 0.9, scale: 1.1, duration: 0.2, yoyo: true, repeat: 1, ease: 'power2.out' }, '-=0.62')
          .to(flipRef.current, { scale: 1, duration: 0.45, ease: 'back.out(2.2)' })
          .fromTo(s.p, { mx: 0, my: 10, o: 1 }, { mx: 100, my: 70, o: IDLE.o, duration: 1.4, ease: 'power2.inOut', onUpdate: apply }, '-=0.5');
      }
      tl.add(() => scheduleIdle(1.2));
      return tl;
    },
  }), [reduced]);

  return html`<div ref=${rootRef} className="hc" role="button" tabIndex="0"
      aria-label=${st.current.flipped ? `${t.card.label}: ${t.card.completed}. ${t.card.names}` : t.reveal.backLabel}
      style=${{ width: CARD_W * scale, height: CARD_H * scale }}
      onPointerDown=${onDown} onPointerMove=${onMove} onPointerUp=${release} onPointerCancel=${release} onPointerLeave=${release} onKeyDown=${onKey}>
    <div className="hc-stage" style=${{ transform: `scale(${scale})` }}>
      <div ref=${tiltRef} className="hc-tilt">
        <div ref=${flipRef} className="hc-flip">
          <div className="hc-face hc-back">
            ${manifest.card.back
              ? html`<img className="hc-layer" src=${manifest.card.back} alt="" draggable="false" />`
              : html`<div className="hc-layer" dangerouslySetInnerHTML=${{ __html: back }} />`}
            <div className="hc-sheen"></div>
            <div className="hc-ring"></div>
          </div>
          <div ref=${frontRef} className="hc-face hc-front" style=${{ '--holo-noise': holoNoise() }}>
            ${frontImg
              ? html`<img className="hc-layer" src=${frontImg} alt="" draggable="false" />`
              : html`<div className="hc-layer" dangerouslySetInnerHTML=${{ __html: base }} />
                <div ref=${charsRef} className="hc-layer hc-chars" dangerouslySetInnerHTML=${{ __html: chars }} />`}
            ${texts.map((l, i) => html`<div key=${i} className="card-text" aria-hidden="true" style=${{
              left: l.align === 'left' ? l.x : l.align === 'center' ? 0 : undefined,
              right: l.align === 'right' ? CARD_W - l.x : undefined,
              width: l.align === 'center' ? CARD_W : undefined,
              textAlign: l.align, top: l.y - l.size * 0.92, fontSize: l.size,
              fontWeight: l.weight, fontFamily: l.family, color: l.color, letterSpacing: l.spacing || 0,
            }}>${l.text}</div>`)}
            <div className="hc-rainbow"></div>
            <div className="hc-lines"></div>
            <div className="hc-grain"></div>
            <div className="hc-glare"></div>
            <div className="hc-ring"></div>
          </div>
        </div>
      </div>
      <div ref=${flashRef} className="hc-flash"></div>
    </div>
  </div>`;
});
