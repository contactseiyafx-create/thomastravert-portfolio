// Vector illustration kit, matching the Figma reference. Written as SVG strings so the same
// art drives the live screens (animated by GSAP through class names) and the exported Dream Card.
import { rng } from './lib.js';

const f1 = (n) => Number(n.toFixed(1));

export const sparklePath = (cx, cy, r) => {
  const k = r * 0.18;
  return `M${cx} ${cy - r} Q${f1(cx + k)} ${f1(cy - k)} ${cx + r} ${cy} Q${f1(cx + k)} ${f1(cy + k)} ${cx} ${cy + r} Q${f1(cx - k)} ${f1(cy + k)} ${cx - r} ${cy} Q${f1(cx - k)} ${f1(cy - k)} ${cx} ${cy - r}Z`;
};

export const crescentPath = (cx, cy, R, k = 0.72) =>
  `M${cx} ${cy - R} A${R} ${R} 0 1 0 ${cx} ${cy + R} A${f1(R * k)} ${R} 0 1 1 ${cx} ${cy - R}Z`;

export const glowGrad = (id, color, strength = 0.85) =>
  `<radialGradient id="${id}"><stop offset="0" stop-color="${color}" stop-opacity="${strength}"/>` +
  `<stop offset=".35" stop-color="${color}" stop-opacity="${f1(strength * 0.33)}"/>` +
  `<stop offset="1" stop-color="${color}" stop-opacity="0"/></radialGradient>`;

export const linGrad = (id, stops) =>
  `<linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1">` +
  stops.map(([o, c, a = 1]) => `<stop offset="${o}" stop-color="${c}" stop-opacity="${a}"/>`).join('') +
  '</linearGradient>';

export function starField(seed, n, [x0, x1, y0, y1]) {
  const r = rng(seed);
  let out = '';
  for (let i = 0; i < n; i++) {
    out += `<circle cx="${f1(x0 + r() * (x1 - x0))}" cy="${f1(y0 + r() * (y1 - y0))}" r="${(0.4 + r() * 1.1).toFixed(2)}" fill="#fff" opacity="${(0.3 + r() * 0.6).toFixed(2)}"/>`;
  }
  return out;
}

export const cloudShape = (x, y, s, fill, op = 1) =>
  `<g opacity="${op}" fill="${fill}">` +
  `<circle cx="${x}" cy="${y}" r="${f1(18 * s)}"/><circle cx="${f1(x + 22 * s)}" cy="${f1(y - 12 * s)}" r="${f1(25 * s)}"/>` +
  `<circle cx="${f1(x + 50 * s)}" cy="${f1(y - 4 * s)}" r="${f1(20 * s)}"/><circle cx="${f1(x + 70 * s)}" cy="${f1(y + 4 * s)}" r="${f1(14 * s)}"/>` +
  `<rect x="${x}" y="${y}" width="${f1(70 * s)}" height="${f1(18 * s)}" rx="${f1(9 * s)}"/></g>`;

/** A Figma cloud(x, y, s) as its own <svg>; place it at left = x - 20s, top = y - 38s. */
export const cloudSVG = (s, fill, op) =>
  `<svg width="${Math.ceil(110 * s)}" height="${Math.ceil(60 * s)}" viewBox="0 0 ${Math.ceil(110 * s)} ${Math.ceil(60 * s)}" aria-hidden="true">${cloudShape(f1(20 * s), f1(38 * s), s, fill, op)}</svg>`;

// ---------------------------------------------------------------------------
// Nubi (2D placeholder for the Blender character).
// Animatable hooks: .nubi-breath .nubi-lid .nubi-eyes .nubi-closed .nubi-sprout
//                   .nubi-mouth .nubi-mouth-o .nubi-blanket .nubi-cheek
// Lid offsets: 0 = wide open · 12.5 = sleepy (Figma) · 34 = shut
// ---------------------------------------------------------------------------
export const LID = { open: 0, sleepy: 12.5, drowsy: 20, shut: 34 };

export function nubi(p, { blanket = false, asleep = false } = {}) {
  const eye = (cx, id) =>
    `<clipPath id="${p}${id}"><ellipse cx="${cx}" cy="-26" rx="7.2" ry="8.2"/></clipPath>` +
    `<g clip-path="url(#${p}${id})"><ellipse cx="${cx}" cy="-26" rx="7.2" ry="8.2" fill="#2C2A6B"/>` +
    `<circle cx="${cx + 3}" cy="-24" r="2.2" fill="#fff"/>` +
    `<g class="nubi-lid" transform="translate(0 ${asleep ? LID.shut : LID.sleepy})">` +
    `<path d="M${cx - 10} -90 H${cx + 10} V-42 Q${cx} -50 ${cx - 10} -42Z" fill="#B3BCF9"/>` +
    `<path d="M${cx - 9} -41.5 Q${cx} -47 ${cx + 9} -41.5" stroke="#2C2A6B" stroke-width="2.6" fill="none" stroke-linecap="round"/></g></g>`;
  const ears = [[-42, -66, 17], [-58, -54, 12], [-30, -76, 10], [42, -66, 17], [58, -54, 12], [30, -76, 10]]
    .map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#BAC3FB"/>`).join('');
  const body = 'M-72 34 C-80 -32 -44 -80 0 -80 C44 -80 80 -32 72 34 C68 70 34 84 0 84 C-34 84 -68 70 -72 34Z';
  return (
    `<defs>${linGrad(`${p}nb`, [[0, '#C9D1FF'], [0.55, '#A7B2F6'], [1, '#8590E2']])}` +
    `<radialGradient id="${p}ns" cx=".35" cy=".25" r=".6"><stop offset="0" stop-color="#fff" stop-opacity=".55"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient></defs>` +
    `<ellipse class="nubi-shadow" cx="0" cy="84" rx="72" ry="10" fill="#1F1F5E" opacity=".35"/>` +
    `<g class="nubi-breath">` +
    `<g class="nubi-sprout" transform="rotate(${asleep ? -80 : 0} 0 -78)"><path d="M0 -78 C2 -94 10 -102 12 -110" stroke="#7E88D8" stroke-width="5" fill="none" stroke-linecap="round"/>` +
    `<circle cx="14" cy="-116" r="18" fill="#FFF1B8" opacity=".25"/><path d="${crescentPath(14, -116, 10, 0.6)}" fill="#FFEDA6"/></g>` +
    ears +
    `<ellipse cx="-64" cy="30" rx="12" ry="20" fill="#97A2EE" transform="rotate(20 -64 30)"/>` +
    `<ellipse cx="64" cy="30" rx="12" ry="20" fill="#97A2EE" transform="rotate(-20 64 30)"/>` +
    `<path d="${body}" fill="url(#${p}nb)"/><path d="${body}" fill="url(#${p}ns)"/>` +
    `<ellipse cx="0" cy="36" rx="44" ry="38" fill="#EEEBFF" opacity=".9"/><path d="${crescentPath(0, 34, 12, 0.55)}" fill="#C8BEFA"/>` +
    `<ellipse cx="-32" cy="82" rx="20" ry="10" fill="#DCDDFF"/><ellipse cx="32" cy="82" rx="20" ry="10" fill="#DCDDFF"/>` +
    `<g class="nubi-cheek"><ellipse cx="-42" cy="-12" rx="11" ry="7" fill="#F7A8CB" opacity=".75"/><ellipse cx="42" cy="-12" rx="11" ry="7" fill="#F7A8CB" opacity=".75"/></g>` +
    `<g class="nubi-eyes" opacity="${asleep ? 0 : 1}">${eye(-24, 'eL')}${eye(24, 'eR')}</g>` +
    `<g class="nubi-closed" opacity="${asleep ? 1 : 0}"><path d="M-34 -28 Q-24 -20 -14 -28" stroke="#2C2A6B" stroke-width="3.4" fill="none" stroke-linecap="round"/>` +
    `<path d="M14 -28 Q24 -20 34 -28" stroke="#2C2A6B" stroke-width="3.4" fill="none" stroke-linecap="round"/></g>` +
    `<path class="nubi-mouth" opacity="${asleep ? 0 : 1}" d="M-6 -8 Q0 -3 6 -8" stroke="#2C2A6B" stroke-width="2.6" fill="none" stroke-linecap="round"/>` +
    `<ellipse class="nubi-mouth-o" opacity="${asleep ? 1 : 0}" cx="0" cy="-8" rx="4" ry="3" fill="#5B3F7E"/>` +
    (blanket
      ? `<g class="nubi-blanket"><path d="M-84 30 C-40 14 40 14 84 30 C86 60 60 92 0 94 C-60 92 -86 60 -84 30Z" fill="#6F63C9"/>` +
        `<path d="M-84 30 C-40 14 40 14 84 30" stroke="#B8AEF5" stroke-width="5" fill="none" stroke-linecap="round"/>` +
        `<path d="${sparklePath(-40, 56, 7)}" fill="#FFEDA6"/><path d="${sparklePath(22, 66, 5)}" fill="#FFEDA6"/><path d="${sparklePath(52, 44, 4)}" fill="#FFEDA6"/>` +
        `<circle cx="-10" cy="48" r="2" fill="#FFEDA6"/><circle cx="62" cy="70" r="2" fill="#FFEDA6"/></g>`
      : '') +
    `</g>`
  );
}

// ---------------------------------------------------------------------------
// Pip — the tiny dream companion (star-moth) from screen 03.
// ---------------------------------------------------------------------------
export const pip = (p) =>
  `<defs>${glowGrad(`${p}pg`, '#FFE9A0')}</defs><circle cx="0" cy="0" r="46" fill="url(#${p}pg)"/>` +
  `<g class="pip-wings"><ellipse cx="-14" cy="-6" rx="13" ry="8" fill="#D9CCFF" opacity=".85" transform="rotate(-25 -14 -6)"/>` +
  `<ellipse cx="14" cy="-6" rx="13" ry="8" fill="#D9CCFF" opacity=".85" transform="rotate(25 14 -6)"/>` +
  `<ellipse cx="-10" cy="6" rx="8" ry="5" fill="#C6B6FF" opacity=".8" transform="rotate(20 -10 6)"/>` +
  `<ellipse cx="10" cy="6" rx="8" ry="5" fill="#C6B6FF" opacity=".8" transform="rotate(-20 10 6)"/></g>` +
  `<circle cx="0" cy="0" r="10" fill="#FFF3C2"/>` +
  `<path d="M-4.5 -1 Q-3 1 -1.5 -1" stroke="#5B4A8F" stroke-width="1.4" fill="none" stroke-linecap="round"/>` +
  `<path d="M1.5 -1 Q3 1 4.5 -1" stroke="#5B4A8F" stroke-width="1.4" fill="none" stroke-linecap="round"/>` +
  `<circle cx="-5" cy="3" r="1.6" fill="#F7A8CB"/><circle cx="5" cy="3" r="1.6" fill="#F7A8CB"/>` +
  `<path d="M-3 -9 Q-6 -16 -9 -17 M3 -9 Q6 -16 9 -17" stroke="#FFF3C2" stroke-width="1.4" fill="none" stroke-linecap="round"/>` +
  `<circle cx="-9" cy="-17" r="1.8" fill="#FFF3C2"/><circle cx="9" cy="-17" r="1.8" fill="#FFF3C2"/>`;

// ---------------------------------------------------------------------------
// Dream Card (300×424). The front is split into layers so the live card can add parallax:
//   'base'  → frame, sky window, moon, clouds, hill, foil details (no characters)
//   'chars' → Nubi + Pip + Zz only (same coordinates, transparent background)
//   'all'   → both (used for PNG export)
// Text is layered separately (live translation + crisp canvas export).
// ---------------------------------------------------------------------------
const CARD_P = 'dc';
const cardDefs = () =>
  `${linGrad(`${CARD_P}bg`, [[0, '#1A1D5C'], [0.55, '#2E2A7A'], [1, '#6C5BC9']])}` +
  `<linearGradient id="${CARD_P}foil" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#FFF1B8"/><stop offset=".3" stop-color="#F8D3E6"/><stop offset=".55" stop-color="#C9B6FF"/><stop offset=".8" stop-color="#FFF1B8"/><stop offset="1" stop-color="#A7B2F6"/></linearGradient>` +
  `${linGrad(`${CARD_P}sky`, [[0, '#0F1442'], [0.5, '#2E3485'], [1, '#A493DF']])}` +
  `${linGrad(`${CARD_P}hill`, [[0, '#5E5CBC'], [1, '#2B2B78']])}` +
  `${glowGrad(`${CARD_P}moon`, '#FFF1B8')}${glowGrad(`${CARD_P}lav`, '#B9A3FF', 0.7)}` +
  `<clipPath id="${CARD_P}win"><rect x="18" y="52" width="264" height="244" rx="18"/></clipPath>`;

export function cardSVG(serial = 421, { layer = 'all', companionImage = null } = {}) {
  const p = CARD_P;
  const r = rng(serial * 13);
  let dust = '';
  for (let i = 0; i < 18; i++) {
    dust += `<circle cx="${f1(24 + r() * 252)}" cy="${f1(316 + r() * 96)}" r="${(0.5 + r() * 1.1).toFixed(2)}" fill="#fff" opacity="${(0.15 + r() * 0.4).toFixed(2)}"/>`;
  }
  const companion = companionImage
    ? `<image href="${companionImage}" x="190" y="150" width="64" height="64"/>`
    : `<g transform="translate(222 184) scale(.95)">${pip(p + 'p')}</g>`;
  const base =
    `<rect width="300" height="424" rx="24" fill="url(#${p}bg)"/>` +
    `<rect x="5" y="5" width="290" height="414" rx="20" fill="none" stroke="url(#${p}foil)" stroke-width="2.5"/>` +
    `<rect x="10" y="10" width="280" height="404" rx="16" fill="none" stroke="url(#${p}foil)" stroke-width=".8" opacity=".6"/>` +
    `<g clip-path="url(#${p}win)"><rect x="18" y="52" width="264" height="244" fill="url(#${p}sky)"/>` +
    starField(serial + 5, 50, [18, 282, 52, 240]) +
    `<circle cx="236" cy="96" r="80" fill="url(#${p}moon)"/><path d="${crescentPath(236, 96, 22)}" fill="#FFF1B8"/>` +
    cloudShape(-6, 196, 1.1, '#E9E2FF', 0.3) + cloudShape(206, 232, 0.9, '#E9E2FF', 0.25) +
    `<circle cx="140" cy="230" r="110" fill="url(#${p}lav)" opacity=".5"/>` +
    `<path d="M8 300 C70 250 110 244 140 244 C180 244 240 256 300 300Z" fill="url(#${p}hill)"/>` +
    `<path d="${sparklePath(52, 92, 7)}" fill="#FFF6D6"/><path d="${sparklePath(84, 70, 4)}" fill="#FFF6D6" opacity=".8"/>` +
    `<path d="${sparklePath(262, 180, 5)}" fill="#FFF6D6" opacity=".9"/></g>` +
    `<rect x="18" y="52" width="264" height="244" rx="18" fill="none" stroke="url(#${p}foil)" stroke-width="1.5"/>` +
    dust +
    `<path d="M70 368 H138 M162 368 H230" stroke="url(#${p}foil)" stroke-width="1" opacity=".7"/>` +
    `<path d="${sparklePath(150, 368, 5)}" fill="url(#${p}foil)"/>` +
    Array.from({ length: 5 }, (_, i) => `<path d="${sparklePath(34 + i * 13, 396, 4.6)}" fill="#FFE7A0"/>`).join('') +
    `<path d="${sparklePath(22, 24, 5)}" fill="#FFE7A0"/>`;
  const chars =
    `<g clip-path="url(#${p}win)">` +
    `<g transform="translate(128 214) scale(.62) rotate(-4)">${nubi(p + 'n', { blanket: true, asleep: true })}</g>` +
    companion +
    `<text x="186" y="148" font-family="Fredoka, sans-serif" font-weight="600" font-size="15" fill="#EDE8FF" opacity=".9">z</text>` +
    `<text x="196" y="132" font-family="Fredoka, sans-serif" font-weight="600" font-size="19" fill="#EDE8FF">Z</text></g>`;
  const body = layer === 'base' ? base : layer === 'chars' ? chars : base + chars;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="300" height="424" viewBox="0 0 300 424"><defs>${cardDefs()}</defs>${body}</svg>`;
}

/** Mystery card back: moon emblem, orbit rings, star dust, foil frame. */
export function cardBackSVG() {
  const p = 'cb';
  const r = rng(77);
  let stars = '';
  for (let i = 0; i < 60; i++) {
    stars += `<circle cx="${f1(20 + r() * 260)}" cy="${f1(20 + r() * 384)}" r="${(0.4 + r() * 1.1).toFixed(2)}" fill="#fff" opacity="${(0.15 + r() * 0.5).toFixed(2)}"/>`;
  }
  const orbit = [0, 45, 90, 135, 180, 225, 270, 315]
    .map((a, i) => {
      const rad = (a * Math.PI) / 180; const R = 92;
      return `<path d="${sparklePath(f1(150 + Math.cos(rad) * R), f1(196 + Math.sin(rad) * R), i % 2 ? 3.5 : 5.5)}" fill="url(#${p}foil)"/>`;
    }).join('');
  return (
    `<svg xmlns="http://www.w3.org/2000/svg" width="300" height="424" viewBox="0 0 300 424">` +
    `<defs>${linGrad(`${p}bg`, [[0, '#141852'], [0.55, '#2A2672'], [1, '#4B3FA8']])}` +
    `<linearGradient id="${p}foil" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#FFF1B8"/><stop offset=".3" stop-color="#F8D3E6"/><stop offset=".55" stop-color="#C9B6FF"/><stop offset=".8" stop-color="#FFF1B8"/><stop offset="1" stop-color="#A7B2F6"/></linearGradient>` +
    `${glowGrad(`${p}glow`, '#FFF1B8', 0.75)}${glowGrad(`${p}lav`, '#A796FF', 0.6)}</defs>` +
    `<rect width="300" height="424" rx="24" fill="url(#${p}bg)"/>` + stars +
    `<circle cx="150" cy="196" r="150" fill="url(#${p}lav)" opacity=".55"/>` +
    `<rect x="5" y="5" width="290" height="414" rx="20" fill="none" stroke="url(#${p}foil)" stroke-width="2.5"/>` +
    `<rect x="16" y="16" width="268" height="392" rx="14" fill="none" stroke="url(#${p}foil)" stroke-width=".8" opacity=".55"/>` +
    `<circle cx="150" cy="196" r="120" fill="none" stroke="url(#${p}foil)" stroke-width=".8" opacity=".25"/>` +
    `<circle cx="150" cy="196" r="92" fill="none" stroke="url(#${p}foil)" stroke-width="1" opacity=".4" stroke-dasharray="2 6"/>` +
    `<circle cx="150" cy="196" r="64" fill="none" stroke="url(#${p}foil)" stroke-width="1.2" opacity=".6"/>` + orbit +
    `<circle cx="150" cy="196" r="70" fill="url(#${p}glow)"/>` +
    `<path d="${crescentPath(150, 196, 40, 0.7)}" fill="url(#${p}foil)"/>` +
    `<path d="${sparklePath(176, 168, 7)}" fill="#FFF6D6"/>` +
    [[34, 34], [266, 34], [34, 390], [266, 390]].map(([x, y]) => `<path d="${sparklePath(x, y, 6)}" fill="url(#${p}foil)"/>`).join('') +
    `<text x="150" y="346" text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="600" font-size="26" fill="url(#${p}foil)">Sweet Dreams</text>` +
    `<text x="150" y="370" text-anchor="middle" font-family="Nunito, sans-serif" font-weight="800" font-size="9.5" letter-spacing="3" fill="#CFC8FF">DREAM CARD</text>` +
    `</svg>`
  );
}
