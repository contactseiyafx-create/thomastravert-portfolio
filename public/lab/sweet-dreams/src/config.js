// Campaign configuration.
// Override without editing code: define window.SWEET_DREAMS_CONFIG before src/main.js loads,
// or use URL params: ?cta=https://…  ?lang=ja  ?debug  ?model=assets/character/nubi.glb
const params = new URLSearchParams(location.search);
const overrides = window.SWEET_DREAMS_CONFIG || {};

export const CONFIG = {
  campaignId: 'sweet_dreams',
  /** Destination of the final marketing CTA (official product page). Verify before launch. */
  ctaUrl: params.get('cta') || overrides.ctaUrl || 'https://www.pokemonsleep.net/',
  /** Optional per-language CTA label override, e.g. { en: 'Discover Pokémon Sleep', ja: '…' }. */
  ctaLabel: overrides.ctaLabel || null,
  /** Seconds the sleeping scene plays before the Dream Card reveal starts. */
  revealDelay: overrides.revealDelay ?? 5.6,
  /** GA4 measurement ID (G-XXXXXXX). Empty = events are logged to the console + window.dataLayer. */
  ga4MeasurementId: overrides.ga4MeasurementId || '',
  /** URL shared by the share sheet. */
  shareUrl: overrides.shareUrl || location.origin + location.pathname,
  defaultLang: params.get('lang') || overrides.defaultLang || null,
  /** Sound is opt-in. */
  soundDefaultOn: !!overrides.soundDefaultOn,
  debug: params.has('debug') || !!overrides.debug,
  manifestUrl: overrides.manifestUrl || 'assets/manifest.json',
  modelOverride: params.get('model') || null,
};

const DEFAULT_MANIFEST = {
  backgrounds: { welcome: 'assets/backgrounds/welcome.svg', night: 'assets/backgrounds/night.svg', dreams: 'assets/backgrounds/dreams.svg' },
  character: {
    model: null,
    animations: { idle: 'Idle', breathe: 'Breathe', blink: 'Blink', happy: 'Happy', fallAsleep: 'FallAsleep', sleep: 'Sleep', wakeUp: 'WakeUp' },
    transform: { scale: 1, position: [0, 0, 0], rotationY: 0 },
    camera: { fov: 30, position: [0, 1.1, 5.4], target: [0, 0.8, 0] },
    dracoDecoderPath: 'https://www.gstatic.com/draco/versioned/decoders/1.5.7/',
  },
  companion: { image: null },
  card: { front: null, back: null },
  ui: { logo: null },
  audio: { ambience: null },
};

const merge = (base, extra) => {
  const out = { ...base };
  for (const [k, v] of Object.entries(extra || {})) {
    out[k] = v && typeof v === 'object' && !Array.isArray(v) && base[k] && typeof base[k] === 'object' ? merge(base[k], v) : v;
  }
  return out;
};

/** Loads assets/manifest.json (asset slots). Falls back to built-in placeholders on any error. */
export async function loadManifest() {
  let manifest = DEFAULT_MANIFEST;
  try {
    const res = await fetch(CONFIG.manifestUrl, { cache: 'no-cache' });
    if (res.ok) manifest = merge(DEFAULT_MANIFEST, await res.json());
  } catch (e) {
    console.warn('[sweet-dreams] manifest not loaded, using placeholders', e);
  }
  if (CONFIG.modelOverride) manifest = merge(manifest, { character: { model: CONFIG.modelOverride } });
  return manifest;
}
