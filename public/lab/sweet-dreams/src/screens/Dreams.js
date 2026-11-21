// SCREEN 03 — Sweet Dreams (Figma frame "03 Sweet Dreams")
// Phase 1 "sleep": Nubi falls asleep, Pip is revealed (Figma composition).
// Phase 2 "reveal": the scene UI fades, stars gather into the mystery Dream Card → flip → conversion panel.
import { html, gsap, useRef, useState, useEffect, useMemo, useGsap } from '../lib.js';
import { useApp, TopBar, Steps, Background, Clouds, Twinkles, Fireflies, Particles, Icon, burst } from '../ui.js';
import { pip } from '../art.js';
import { CharacterSlot } from '../character/CharacterSlot.js';
import { CardReveal } from '../reveal/CardReveal.js';
import { CONFIG } from '../config.js';
import { sound } from '../sound.js';
import { track, EVENTS } from '../analytics.js';

const CLOUDS = [
  [-50, 250, 1.4, '#6C63C2', 0.45, 22, 19],
  [200, 320, 1.0, '#6C63C2', 0.4, -16, 16],
];
const PIP = { x: 300, y: 448 };

export function Dreams({ onReplay }) {
  const { t, manifest, reduced } = useApp();
  const ref = useRef(null);
  const fxRef = useRef(null);
  const charRef = useRef(null);
  const [phase, setPhase] = useState('sleep');
  const pipMarkup = useMemo(() => `<svg width="120" height="120" viewBox="-60 -60 120 120" overflow="visible">${pip('d-pip')}</svg>`, []);

  useGsap(ref, () => {
    const revealed = () => track(EVENTS.DREAM_REVEAL, { companion: 'pip' });
    if (reduced) { revealed(); return; }
    gsap.set('.badge', { xPercent: -50, x: 0 });
    gsap.timeline({ defaults: { ease: 'power3.out' } })
      .from('.d-bg', { opacity: 0.4, scale: 1.04, duration: 2, ease: 'power2.out' }, 0)
      .from('.d-in', { y: 18, opacity: 0, stagger: 0.1, duration: 0.8 }, 0.3)
      .from('.badge', { scale: 0.4, opacity: 0, duration: 0.7, ease: 'back.out(2.2)' }, 0.9)
      .fromTo('.d-pip', { x: 140, y: -200, scale: 0.2, opacity: 0 }, { x: 0, y: 0, scale: 1, opacity: 1, duration: 1.8, ease: 'power2.out' }, 2.6)
      .add(() => { burst(fxRef.current, PIP.x, PIP.y, { count: 12 }); sound.reveal(); revealed(); }, 4.3)
      .from('.pip-name', { y: 8, opacity: 0, duration: 0.5 }, 4.4);
    gsap.to('.d-pip-bob', { y: -8, duration: 1.6, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 4.4 });
    gsap.to('.d-pip .pip-wings', { scaleX: 0.82, transformOrigin: '50% 50%', duration: 0.22, ease: 'sine.inOut', yoyo: true, repeat: -1 });
    gsap.utils.toArray('.zz').forEach((el, i) => {
      const peak = [0.55, 0.75, 0.95][i];
      gsap.timeline({ repeat: -1, delay: 2.6 + i * 1.2 })
        .fromTo(el, { y: 14, x: -6, scale: 0.7 }, { y: -26, x: 8, scale: 1.1, duration: 3.6, ease: 'sine.in' }, 0)
        .fromTo(el, { opacity: 0 }, { opacity: peak, duration: 0.9 }, 0)
        .to(el, { opacity: 0, duration: 1.2 }, 2.4);
    });
  }, [reduced]);

  // Nubi falls asleep, then the Dream Card reveal begins.
  useEffect(() => {
    const sleep = setTimeout(() => charRef.current && charRef.current.fallAsleep(), reduced ? 0 : 500);
    const reveal = setTimeout(() => setPhase('reveal'), (reduced ? 1.2 : CONFIG.revealDelay) * 1000);
    return () => { clearTimeout(sleep); clearTimeout(reveal); };
  }, [reduced]);

  // Fade the scene UI out when the card arrives.
  useEffect(() => {
    if (phase !== 'reveal' || !ref.current) return;
    gsap.to(ref.current.querySelectorAll('.d-ui'), { opacity: 0, y: -8, duration: reduced ? 0 : 0.6, stagger: 0.05, ease: 'power2.in', pointerEvents: 'none' });
  }, [phase]);

  return html`<section ref=${ref} className="screen" style=${{ background: '#0B0C30' }} aria-labelledby="d-title">
    <div className="scene">
      <${Background} src=${manifest.backgrounds.dreams} className="d-bg" />
      <${Clouds} items=${CLOUDS} />
      <${Twinkles} seed=${21} count=${16} area=${[10, 380, 60, 500]} />
      <${CharacterSlot} ref=${charRef} id="d" x=${178} y=${468} rotate=${-4} blanket=${true} />
      ${[[262, 392, 16, 0.55], [276, 372, 21, 0.75], [294, 346, 27, 0.95]].map(([x, y, s, o], i) =>
        html`<span key=${i} className="zz" aria-hidden="true" style=${{ left: x, top: y - s, fontSize: s, opacity: reduced ? o : 0 }}>${i === 2 ? 'Z' : 'z'}</span>`)}
      <div className="d-pip" aria-hidden="true" style=${{ position: 'absolute', left: PIP.x - 60, top: PIP.y - 60, width: 120, height: 120 }}>
        <div className="d-pip-bob">
          ${manifest.companion.image
            ? html`<img src=${manifest.companion.image} alt="" width="120" height="120" />`
            : html`<div dangerouslySetInnerHTML=${{ __html: pipMarkup }} />`}
        </div>
      </div>
      <div className="pip-name d-ui" style=${{ left: 268, top: 478 }}>${t.dreams.meet}</div>
      <${Particles} seed=${9} count=${26} area=${[20, 370, 380, 620]} />
      <${Fireflies} seed=${7} count=${5} area=${[40, 350, 400, 600]} />
      <div ref=${fxRef} className="fx" style=${{ zIndex: 16 }}></div>
      <div className="fx" style=${{ top: 580, background: 'linear-gradient(180deg, rgba(20,18,63,0) 0%, rgba(14,12,51,.95) 100%)' }}></div>

      <div className="block d-ui" style=${{ top: 640 }}>
        <div className="d-in"><${Steps} active=${2} /></div>
        <h1 id="d-title" className="h1 hero d-in">${t.dreams.title}</h1>
        <p className="sub d-in">${t.dreams.subtitle}</p>
      </div>
    </div>
    <div className="badge d-ui" style=${{ top: 'calc(var(--top) + 54px)' }}>${Icon.check()}${t.dreams.badge}</div>
    ${phase === 'reveal' && html`<${CardReveal} onReplay=${onReplay} />`}
    <${TopBar} variant="logo" />
  </section>`;
}
