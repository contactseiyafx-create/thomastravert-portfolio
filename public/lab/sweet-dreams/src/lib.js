// Shared runtime: React + htm (JSX-like tagged templates, no build step) and GSAP.
import React from 'react';
import htm from 'htm';
import { gsap } from 'gsap';

export { React, gsap };
export const {
  useState, useEffect, useLayoutEffect, useRef, useMemo, useCallback,
  createContext, useContext, forwardRef, useImperativeHandle, Suspense, lazy,
} = React;
export const html = htm.bind(React.createElement);

export const prefersReducedMotion = () =>
  !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);

/** Seeded PRNG so decorative layouts are stable between renders. */
export function rng(seed) {
  let a = seed >>> 0;
  return () => {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** GSAP context scoped to a ref; reverted on unmount (no leaking tweens). */
export function useGsap(ref, setup, deps = []) {
  useLayoutEffect(() => {
    if (!ref.current) return undefined;
    const ctx = gsap.context(setup, ref);
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
