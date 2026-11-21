// SCREEN 01 — Welcome (Figma frame "01 Welcome")
import { html, gsap, useRef, useGsap } from '../lib.js';
import { useApp, TopBar, Steps, Background, Clouds, Twinkles, Fireflies, Icon } from '../ui.js';
import { CharacterSlot } from '../character/CharacterSlot.js';

const CLOUDS = [
  [-20, 260, 1.3, '#E9E2FF', 0.55, 22, 18],
  [250, 360, 1.1, '#F2EBFF', 0.5, -18, 15],
  [120, 300, 0.8, '#FFFFFF', 0.35, 16, 20],
];

export function Welcome({ onStart }) {
  const { t, manifest, reduced } = useApp();
  const ref = useRef(null);

  useGsap(ref, () => {
    if (reduced) return;
    gsap.timeline({ defaults: { ease: 'power3.out' } })
      .from('.w-bg', { scale: 1.06, duration: 2.4, ease: 'power2.out', transformOrigin: '50% 60%' }, 0)
      .from('.w-char', { y: 28, opacity: 0, duration: 1.1 }, 0.25)
      .from('.w-in', { y: 18, opacity: 0, stagger: 0.1, duration: 0.8, clearProps: 'transform' }, 0.5);
    gsap.to('.w-cta-icon', { x: 4, duration: 0.9, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 1.6 });
  }, [reduced]);

  return html`<section ref=${ref} className="screen" style=${{ background: '#2E3485' }} aria-labelledby="w-title">
    <div className="scene">
      <${Background} src=${manifest.backgrounds.welcome} className="w-bg" />
      <${Clouds} items=${CLOUDS} />
      <${Twinkles} seed=${4} count=${12} area=${[10, 380, 60, 460]} />
      <div className="w-char"><${CharacterSlot} id="w" x=${195} y=${482} scale=${1} /></div>
      <${Fireflies} seed=${3} count=${6} area=${[30, 360, 420, 640]} />
      <div className="fx" style=${{ top: 560, background: 'linear-gradient(180deg, rgba(38,38,112,0) 0%, rgba(30,30,96,.95) 100%)' }}></div>

      <div className="block" style=${{ top: 610 }}>
        <div className="w-in"><${Steps} active=${0} /></div>
        <h1 id="w-title" className="h1 w-in">${t.welcome.title}</h1>
        <p className="sub w-in">${t.welcome.subtitle}</p>
      </div>
      <button type="button" className="cta cta-moon w-in" style=${{ top: 722 }} onClick=${onStart}>
        ${t.welcome.cta}<span className="cta-icon w-cta-icon" aria-hidden="true">${Icon.arrow()}</span>
      </button>
      <p className="caption w-in" style=${{ top: 796 }}>${t.welcome.caption}</p>
    </div>
    <${TopBar} variant="logo" />
  </section>`;
}
