// Tiny Web Audio sound kit: soft bell tones, no audio files needed.
let ctx = null;
let muted = true; // sound is opt-in (off by default)

function audio() {
  if (!ctx) {
    try { ctx = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) { return null; }
  }
  if (ctx.state === 'suspended') ctx.resume();
  return ctx;
}

function tone(freq, { delay = 0, dur = 1.3, vol = 0.09, type = 'sine', glide = 0 } = {}) {
  if (muted) return;
  const c = audio();
  if (!c) return;
  const t = c.currentTime + delay;
  const o = c.createOscillator();
  const g = c.createGain();
  const o2 = c.createOscillator();
  const g2 = c.createGain();
  o.type = type; o.frequency.setValueAtTime(freq, t);
  if (glide) o.frequency.exponentialRampToValueAtTime(freq * glide, t + dur * 0.8);
  o2.type = 'sine'; o2.frequency.setValueAtTime(freq * 2.005, t);
  g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(vol, t + 0.02); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  g2.gain.setValueAtTime(0, t); g2.gain.linearRampToValueAtTime(vol * 0.22, t + 0.02); g2.gain.exponentialRampToValueAtTime(0.0001, t + dur * 0.6);
  o.connect(g).connect(c.destination); o2.connect(g2).connect(c.destination);
  o.start(t); o2.start(t); o.stop(t + dur); o2.stop(t + dur);
}

const PENTA = [523.25, 587.33, 659.25, 783.99, 880, 1046.5];

// Optional looping ambience file (assets/manifest.json → audio.ambience). Only fetched once sound is enabled.
let ambienceUrl = null;
let ambienceEl = null;
function syncAmbience() {
  if (!ambienceUrl) return;
  if (!ambienceEl && !muted) {
    ambienceEl = new Audio(ambienceUrl);
    ambienceEl.loop = true;
    ambienceEl.volume = 0.35;
  }
  if (!ambienceEl) return;
  if (muted) ambienceEl.pause();
  else ambienceEl.play().catch(() => {});
}

export const sound = {
  unlock: () => audio(),
  setAmbience: (url) => { ambienceUrl = url; },
  setMuted: (m) => { muted = m; if (!m) audio(); syncAmbience(); },
  isMuted: () => muted,
  tap: () => tone(659.25, { dur: 0.5, vol: 0.05 }),
  start: () => { tone(659.25, { dur: 1 }); tone(987.77, { delay: 0.12, dur: 1.4, vol: 0.06 }); },
  dim: (i) => tone(PENTA[(i + 3) % PENTA.length], { dur: 1.4, vol: 0.08, glide: 0.75 }),
  moon: () => { tone(392, { dur: 1.6 }); tone(587.33, { delay: 0.15, dur: 2, vol: 0.07 }); },
  firefly: (i) => tone(PENTA[i % PENTA.length] * 1.5, { dur: 0.8, vol: 0.05 }),
  complete: () => [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => tone(f, { delay: i * 0.16, dur: 2.2, vol: 0.07 })),
  reveal: () => [783.99, 987.77, 1174.66, 1567.98].forEach((f, i) => tone(f, { delay: 0.1 + i * 0.12, dur: 1.8, vol: 0.05 })),
  soft: () => tone(440, { dur: 0.9, vol: 0.05 }),
  gather: () => [523.25, 659.25, 783.99, 987.77, 1174.66, 1567.98].forEach((f, i) => tone(f, { delay: 0.15 + i * 0.16, dur: 1.4, vol: 0.04 })),
  flip: () => { tone(392, { dur: 0.6, vol: 0.05, glide: 2 }); [659.25, 830.61, 987.77, 1318.51].forEach((f, i) => tone(f, { delay: 0.75 + i * 0.09, dur: 2.2, vol: 0.06 })); },
};
