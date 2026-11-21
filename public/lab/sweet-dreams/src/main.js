// Sweet Dreams — app shell: fluid stage, screen flow, transitions, language, sound, analytics.
import { createRoot } from 'react-dom/client';
import { html, gsap, useState, useEffect, useLayoutEffect, useRef, useCallback, useMemo, prefersReducedMotion } from './lib.js';
import { CONFIG, loadManifest } from './config.js';
import { STRINGS, detectLang, saveLang } from './i18n.js';
import { initAnalytics, track, newPlay, EVENTS } from './analytics.js';
import { sound } from './sound.js';
import { AppCtx, Toast, StatusBar } from './ui.js';
import { Welcome } from './screens/Welcome.js';
import { Night } from './screens/Night.js';
import { Dreams } from './screens/Dreams.js';

const REF_W = 390;
const REF_H = 844;
const MIN_H = 800; // shortest artboard we allow before scaling down (keeps all UI clear)

/** Fits a 390px-wide stage to any phone: width-locked scale, fluid height (extra height = sky). */
function useStageFit(vpRef) {
  const [fit, setFit] = useState({ s: 1, h: REF_H, framed: false });
  useLayoutEffect(() => {
    const measure = () => {
      const el = vpRef.current;
      if (!el) return;
      const cs = getComputedStyle(el);
      const w = el.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
      const h = el.clientHeight - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom);
      const framed = w >= 700; // desktop: present as a framed phone, like the Figma
      if (framed) {
        const s = Math.min(1, (h - 48) / REF_H);
        setFit({ s, h: REF_H, framed });
      } else {
        const s = Math.min(w / REF_W, h / MIN_H);
        setFit({ s, h: h / s, framed });
      }
    };
    measure();
    window.addEventListener('resize', measure);
    window.addEventListener('orientationchange', measure);
    return () => { window.removeEventListener('resize', measure); window.removeEventListener('orientationchange', measure); };
  }, []);
  return fit;
}

function App({ manifest }) {
  const vpRef = useRef(null);
  const veilRef = useRef(null);
  const fit = useStageFit(vpRef);
  const reduced = useMemo(prefersReducedMotion, []);
  const [lang, setLangState] = useState(detectLang);
  const [screen, setScreen] = useState('welcome');
  const [run, setRun] = useState(0);
  const [soundOn, setSoundOn] = useState(CONFIG.soundDefaultOn);
  const [toast, setToast] = useState(null);
  const busy = useRef(false);
  const t = STRINGS[lang];

  useEffect(() => { document.documentElement.lang = lang; saveLang(lang); }, [lang]);
  useEffect(() => { sound.setAmbience(manifest.audio.ambience); sound.setMuted(!soundOn); }, [soundOn]);
  useEffect(() => { track(EVENTS.CAMPAIGN_VIEW, { screen: 'welcome', reduced_motion: reduced }, { once: true }); }, []);

  const notify = useCallback((text) => {
    setToast({ text, id: Date.now() });
    clearTimeout(notify.timer);
    notify.timer = setTimeout(() => setToast(null), 2200);
  }, []);

  /** Screen change with a soft "night veil" crossfade. */
  const go = useCallback((next) => {
    if (busy.current) return;
    busy.current = true;
    const swap = () => { if (next === 'welcome') setRun((r) => r + 1); setScreen(next); };
    if (reduced) { swap(); busy.current = false; return; }
    gsap.timeline({ onComplete: () => { busy.current = false; } })
      .to(veilRef.current, { opacity: 1, duration: 0.55, ease: 'power2.inOut' })
      .add(swap)
      .to(veilRef.current, { opacity: 0, duration: 0.8, ease: 'power2.out' }, '+=0.1');
  }, [reduced]);

  const ctx = {
    t, lang, manifest, reduced, notify, soundOn,
    stageH: fit.h, topInset: fit.framed ? 54 : 14,
    setLang: setLangState,
    toggleSound: () => { sound.unlock(); setSoundOn((v) => !v); },
  };

  const start = () => { sound.unlock(); sound.start(); newPlay(); track(EVENTS.GAME_START); go('night'); };
  const replay = (source) => { track(EVENTS.REPLAY_CLICK, { source }); go('welcome'); };

  return html`<${AppCtx.Provider} value=${ctx}>
    <div ref=${vpRef} className="viewport">
      <div style=${{ position: 'relative', width: REF_W * fit.s, height: fit.h * fit.s }}>
        <main className=${`stage ${fit.framed ? 'framed' : ''}`}
          style=${{ height: fit.h, transform: `scale(${fit.s})`, '--top': fit.framed ? '54px' : '14px' }}>
          ${screen === 'welcome' && html`<${Welcome} key=${`w${run}`} onStart=${start} />`}
          ${screen === 'night' && html`<${Night} key=${`n${run}`} onComplete=${() => go('dreams')} onBack=${() => go('welcome')} />`}
          ${screen === 'dreams' && html`<${Dreams} key=${`d${run}`} onReplay=${() => replay('card_reveal')} />`}
          <div ref=${veilRef} className="veil" aria-hidden="true"></div>
          <${Toast} message=${toast} />
          ${fit.framed && html`<${StatusBar} />`}
          ${fit.framed && html`<div className="home-indicator" aria-hidden="true"></div>`}
        </main>
      </div>
    </div>
  <//>`;
}

initAnalytics();
loadManifest().then((manifest) => {
  if (CONFIG.debug) console.info('[sweet-dreams] manifest', manifest);
  createRoot(document.getElementById('root')).render(html`<${App} manifest=${manifest} />`);
});
