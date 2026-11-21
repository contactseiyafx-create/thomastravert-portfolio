// Dream Card exports: high-res card PNG, 1080×1920 story PNG, Web Share with fallbacks.
// Exports contain only artwork (no website UI).
import { cardSVG, crescentPath, sparklePath } from './art.js';
import { rng } from './lib.js';

const DISPLAY = 'Fredoka, "Zen Maru Gothic", sans-serif';
const BODY = 'Nunito, "Zen Maru Gothic", sans-serif';
export const CARD_W = 300;
export const CARD_H = 424;

const fmtDate = (lang) => new Intl.DateTimeFormat(lang === 'ja' ? 'ja-JP' : 'en-GB', { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date());

/** Text layers of the built-in card (300×424 space). Not used when a custom card.front image is supplied. */
export function cardText({ t, lang, serial }) {
  return [
    { text: t.card.label.toUpperCase(), x: 34, y: 28, size: 10, weight: 800, family: BODY, color: '#E4E1FF', align: 'left', spacing: 2 },
    { text: `${t.card.night} No. ${String(serial).padStart(4, '0')}`, x: 278, y: 28, size: 11, weight: 600, family: DISPLAY, color: '#FFE7A0', align: 'right', spacing: 0.4 },
    { text: t.card.completed.toUpperCase(), x: 150, y: 324, size: 10.5, weight: 800, family: BODY, color: '#FFE7A0', align: 'center', spacing: 2.2 },
    { text: t.card.names, x: 150, y: 354, size: 27, weight: 600, family: DISPLAY, color: '#FFFFFF', align: 'center' },
    { text: fmtDate(lang), x: 278, y: 400, size: 10.5, weight: 700, family: BODY, color: '#CFC8FF', align: 'right' },
  ];
}

const loadImage = (src) => new Promise((resolve, reject) => {
  const img = new Image();
  img.crossOrigin = 'anonymous';
  img.onload = () => resolve(img);
  img.onerror = reject;
  img.src = src;
});
const svgImage = (svg) => loadImage('data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg));

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath();
}

async function drawText(ctx, layers) {
  if (document.fonts) await Promise.all(layers.map((l) => document.fonts.load(`${l.weight} ${l.size}px ${l.family}`, l.text).catch(() => null)));
  for (const l of layers) {
    ctx.font = `${l.weight} ${l.size}px ${l.family}`;
    ctx.fillStyle = l.color;
    ctx.textAlign = l.align;
    if ('letterSpacing' in ctx) ctx.letterSpacing = `${l.spacing || 0}px`;
    ctx.fillText(l.text, l.x, l.y, l.maxWidth || 264);
  }
  if ('letterSpacing' in ctx) ctx.letterSpacing = '0px';
}

/** Card front on a canvas, transparent rounded corners. */
export async function renderCardCanvas({ t, lang, serial, frontImage = null, companionImage = null, scale = 4 }) {
  const canvas = document.createElement('canvas');
  canvas.width = CARD_W * scale; canvas.height = CARD_H * scale;
  const ctx = canvas.getContext('2d');
  ctx.scale(scale, scale);
  roundRect(ctx, 0, 0, CARD_W, CARD_H, 24);
  ctx.clip();
  if (frontImage) {
    const img = await loadImage(frontImage);
    const k = Math.max(CARD_W / img.width, CARD_H / img.height);
    ctx.drawImage(img, (CARD_W - img.width * k) / 2, (CARD_H - img.height * k) / 2, img.width * k, img.height * k);
  } else {
    ctx.drawImage(await svgImage(cardSVG(serial, { companionImage })), 0, 0, CARD_W, CARD_H);
  }
  // frozen holographic sheen so the export keeps a hint of foil
  const g = ctx.createLinearGradient(0, 0, CARD_W, CARD_H);
  g.addColorStop(0.22, 'rgba(255,241,184,0)');
  g.addColorStop(0.4, 'rgba(255,241,184,0.14)');
  g.addColorStop(0.48, 'rgba(201,182,255,0.18)');
  g.addColorStop(0.56, 'rgba(167,227,255,0.12)');
  g.addColorStop(0.64, 'rgba(248,211,230,0.12)');
  g.addColorStop(0.78, 'rgba(255,255,255,0)');
  ctx.fillStyle = g; ctx.fillRect(0, 0, CARD_W, CARD_H);
  if (!frontImage) await drawText(ctx, cardText({ t, lang, serial }));
  return canvas;
}

const toBlob = (canvas) => new Promise((resolve) => canvas.toBlob(resolve, 'image/png'));

/** High-resolution card PNG (4× → 1200×1696). */
export async function renderCardPNG(opts) {
  return toBlob(await renderCardCanvas({ ...opts, scale: 4 }));
}

/** 1080×1920 story image: night sky + card + campaign line. */
export async function renderStoryPNG({ t, lang, serial, frontImage = null, companionImage = null }) {
  const W = 1080; const H = 1920;
  const canvas = document.createElement('canvas');
  canvas.width = W; canvas.height = H;
  const ctx = canvas.getContext('2d');
  const bg = ctx.createLinearGradient(0, 0, 0, H);
  bg.addColorStop(0, '#0B0C30'); bg.addColorStop(0.5, '#231F5C'); bg.addColorStop(1, '#5B4AB5');
  ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);
  const r = rng(serial);
  for (let i = 0; i < 220; i++) {
    ctx.globalAlpha = 0.2 + r() * 0.7;
    ctx.fillStyle = '#fff';
    ctx.beginPath(); ctx.arc(r() * W, r() * H * 0.9, 0.8 + r() * 2.2, 0, Math.PI * 2); ctx.fill();
  }
  ctx.globalAlpha = 1;
  const glow = (x, y, rad, color, a) => {
    const rg = ctx.createRadialGradient(x, y, 0, x, y, rad);
    rg.addColorStop(0, color.replace('A', a)); rg.addColorStop(1, color.replace('A', 0));
    ctx.fillStyle = rg; ctx.fillRect(x - rad, y - rad, rad * 2, rad * 2);
  };
  glow(940, 150, 340, 'rgba(255,241,184,A)', 0.45);
  ctx.fillStyle = '#FFF1B8';
  ctx.fill(new Path2D(crescentPath(950, 140, 62)));
  glow(540, 980, 620, 'rgba(185,163,255,A)', 0.4);
  ctx.fillStyle = '#FFF6D6';
  [[150, 360, 22], [250, 230, 12], [930, 620, 16], [120, 1480, 14], [960, 1420, 20]].forEach(([x, y, s]) => ctx.fill(new Path2D(sparklePath(x, y, s))));

  const card = await renderCardCanvas({ t, lang, serial, frontImage, companionImage, scale: 3 });
  const cw = 780; const ch = (cw * CARD_H) / CARD_W;
  const cx = (W - cw) / 2; const cy = 420;
  ctx.save();
  ctx.shadowColor = 'rgba(201,182,255,0.65)'; ctx.shadowBlur = 90; ctx.shadowOffsetY = 20;
  roundRect(ctx, cx, cy, cw, ch, 62); ctx.fillStyle = '#2E2A7A'; ctx.fill();
  ctx.restore();
  ctx.drawImage(card, cx, cy, cw, ch);

  await drawText(ctx, [
    { text: 'Sweet Dreams', x: W / 2, y: 260, size: 92, weight: 600, family: DISPLAY, color: '#FFFFFF', align: 'center', maxWidth: 900 },
    { text: t.reveal.storyLine, x: W / 2, y: 1640, size: 50, weight: 600, family: DISPLAY, color: '#FFE7A0', align: 'center', maxWidth: 960 },
    { text: t.reveal.subtitle, x: W / 2, y: 1712, size: 36, weight: 700, family: BODY, color: '#DAD6FF', align: 'center', maxWidth: 960 },
    { text: t.reveal.storyDisclaimer, x: W / 2, y: 1860, size: 26, weight: 700, family: BODY, color: 'rgba(218,214,255,0.6)', align: 'center', maxWidth: 960 },
  ]);
  return toBlob(canvas);
}

export function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = filename; a.rel = 'noopener';
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 4000);
}

/**
 * Share flow: native share with the PNG → native share with the link → fallback (download PNG + copy link).
 * @returns {{ method: string, success: boolean }}
 */
export async function shareCard({ blob, filename, title, text, url }) {
  try {
    if (blob && navigator.canShare) {
      const file = new File([blob], filename, { type: 'image/png' });
      if (navigator.canShare({ files: [file] })) {
        await navigator.share({ files: [file], title, text, url });
        return { method: 'native_file', success: true };
      }
    }
    if (navigator.share) {
      await navigator.share({ title, text, url });
      return { method: 'native_link', success: true };
    }
  } catch (e) {
    if (e && e.name === 'AbortError') return { method: 'native', success: false };
  }
  // Fallback: save the card and copy the link
  if (blob) downloadBlob(blob, filename);
  let copied = false;
  try { await navigator.clipboard.writeText(`${text} ${url}`); copied = true; } catch (e) { copied = false; }
  return { method: copied ? 'download_copy_link' : 'download_only', success: !!blob || copied };
}
