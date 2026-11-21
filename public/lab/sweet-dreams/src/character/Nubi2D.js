// 2D Nubi from the Figma design: the placeholder until the Blender model is provided.
// Exposes the same imperative API as Character3D: setRelax(v), happy(), fallAsleep().
import { html, gsap, forwardRef, useImperativeHandle, useMemo, useRef, useEffect, useGsap } from '../lib.js';
import { nubi, LID } from '../art.js';
import { useApp } from '../ui.js';

export const Nubi2D = forwardRef(function Nubi2D({ id, x, y, scale = 1, rotate = 0, blanket = false, asleep = false, hidden = false }, ref) {
  const { reduced } = useApp();
  const wrap = useRef(null);
  const st = useRef({ base: asleep ? LID.shut : LID.sleepy, breath: null, sway: null, blink: null, asleep });
  const markup = useMemo(() => nubi(id, { blanket, asleep }), [id, blanket, asleep]);
  const q = (sel) => (wrap.current ? wrap.current.querySelectorAll(sel) : []);

  const scheduleBlink = () => {
    const s = st.current;
    if (reduced || s.asleep) return;
    s.blink = gsap.delayedCall(gsap.utils.random(2.2, 4.6), () => {
      gsap.timeline()
        .to(q('.nubi-lid'), { y: LID.shut, duration: 0.09, ease: 'power1.in' })
        .to(q('.nubi-lid'), { y: () => st.current.base, duration: 0.16, ease: 'power1.out' });
      scheduleBlink();
    });
  };

  useGsap(wrap, () => {
    const s = st.current;
    if (blanket && !asleep) gsap.set('.nubi-blanket', { opacity: 0, y: -46 });
    if (reduced) return;
    s.breath = gsap.to('.nubi-breath', { scaleX: 1.025, scaleY: 0.975, transformOrigin: '50% 100%', duration: 1.8, ease: 'sine.inOut', yoyo: true, repeat: -1 });
    if (asleep) s.breath.timeScale(0.6);
    else s.sway = gsap.to('.nubi-sprout', { rotation: 6, svgOrigin: '0 -78', duration: 2.4, ease: 'sine.inOut', yoyo: true, repeat: -1 });
  }, [reduced]);

  useEffect(() => {
    scheduleBlink();
    return () => st.current.blink && st.current.blink.kill();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced]);

  useImperativeHandle(ref, () => ({
    /** 0 = awake-sleepy (Figma) … 1 = very drowsy. */
    setRelax(v) {
      const s = st.current;
      if (s.asleep) return;
      s.base = LID.sleepy + v * (LID.drowsy + 2 - LID.sleepy);
      gsap.to(q('.nubi-lid'), { y: s.base, duration: reduced ? 0 : 0.9, ease: 'power2.out' });
      if (s.breath) gsap.to(s.breath, { timeScale: 1 - 0.4 * v, duration: 1 });
    },
    /** Small joyful reaction to a successful interaction. */
    happy() {
      if (reduced || st.current.asleep) return;
      const svg = wrap.current && wrap.current.querySelector('svg');
      gsap.timeline()
        .to(svg, { y: -12 * scale, scaleX: 0.96, scaleY: 1.05, transformOrigin: '50% 100%', duration: 0.18, ease: 'power2.out' })
        .to(svg, { y: 0, scaleX: 1, scaleY: 1, duration: 0.5, ease: 'bounce.out' });
      gsap.timeline()
        .to(q('.nubi-lid'), { y: LID.open + 4, duration: 0.15 })
        .to(q('.nubi-lid'), { y: () => st.current.base, duration: 0.6, ease: 'power2.inOut' }, '+=0.25');
      gsap.fromTo(q('.nubi-cheek'), { scale: 1.25, transformOrigin: '50% 50%' }, { scale: 1, duration: 0.8, ease: 'elastic.out(1, 0.5)' });
    },
    /** Slowly falls asleep; resolves when finished. */
    fallAsleep() {
      const s = st.current;
      s.asleep = true;
      if (s.blink) s.blink.kill();
      if (s.sway) s.sway.kill();
      const tl = gsap.timeline();
      tl.to(q('.nubi-lid'), { y: 24, duration: 1.0, ease: 'sine.inOut' })
        .to(q('.nubi-lid'), { y: 19, duration: 0.4, ease: 'sine.inOut' })
        .to(q('.nubi-lid'), { y: LID.shut, duration: 1.1, ease: 'sine.inOut' })
        .to(q('.nubi-eyes'), { opacity: 0, duration: 0.3 })
        .to(q('.nubi-closed'), { opacity: 1, duration: 0.4 }, '<')
        .to(q('.nubi-mouth'), { opacity: 0, duration: 0.3 }, '<')
        .to(q('.nubi-mouth-o'), { opacity: 1, duration: 0.3 }, '<')
        .to(q('.nubi-sprout'), { rotation: -80, svgOrigin: '0 -78', duration: 1.4, ease: 'power2.inOut' }, 0.8)
        .to(q('.nubi-blanket'), { opacity: 1, y: 0, duration: 1.0, ease: 'back.out(1.4)' }, 1.7);
      if (s.breath) tl.to(s.breath, { timeScale: 0.6, duration: 1.5 }, 1);
      if (reduced) tl.progress(1);
      return tl;
    },
  }), [reduced, scale]);

  return html`<div ref=${wrap} aria-hidden="true" style=${{
    position: 'absolute', left: x - 100 * scale, top: y - 140 * scale, width: 200 * scale, height: 240 * scale,
    transform: rotate ? `rotate(${rotate}deg)` : undefined, transformOrigin: '50% 100%',
    opacity: hidden ? 0 : 1, transition: 'opacity .6s',
  }}>
    <svg width=${200 * scale} height=${240 * scale} viewBox="-100 -140 200 240" overflow="visible"
      dangerouslySetInnerHTML=${{ __html: markup }} />
  </div>`;
});
