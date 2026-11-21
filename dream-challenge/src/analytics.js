// Analytics adapter, ready for GA4.
//  • GA4 configured (CONFIG.ga4MeasurementId) → gtag.js is loaded and events go to gtag('event', …)
//  • Not configured → events go to window.dataLayer (GTM-compatible) AND are logged to the console
//  • Every event carries session_id + play_id so GA4 funnels can be built per play-through
//  • window.sweetDreamsFunnel() prints this browser session's own funnel (QA only, real events only)
// Nothing here fabricates data: rates are computed in GA4 from real events (see FUNNEL + README).
import { CONFIG } from './config.js';

export const EVENTS = Object.freeze({
  CAMPAIGN_VIEW: 'campaign_view',
  GAME_START: 'game_start',
  STAR_TAP: 'star_tap',
  MOON_DRAG_COMPLETE: 'moon_drag_complete',
  CHALLENGE_COMPLETE: 'challenge_complete',
  DREAM_REVEAL: 'dream_reveal',
  CARD_REVEAL_START: 'card_reveal_start',
  CARD_FLIP_COMPLETE: 'card_flip_complete',
  CARD_INTERACTION: 'card_interaction',
  REWARD_DOWNLOAD: 'reward_download',
  SHARE_CLICK: 'share_click',
  SHARE_SUCCESS: 'share_success',
  CTA_CLICK: 'cta_click',
  REPLAY_CLICK: 'replay_click',
});

/**
 * Campaign KPIs, each = numerator event users ÷ denominator event users (GA4 Funnel / Free-form exploration).
 */
export const FUNNEL = Object.freeze([
  { kpi: 'Game completion rate', numerator: 'challenge_complete', denominator: 'game_start' },
  { kpi: 'Card reveal rate', numerator: 'card_flip_complete', denominator: 'challenge_complete' },
  { kpi: 'Reward download rate', numerator: 'reward_download', denominator: 'card_flip_complete' },
  { kpi: 'Share rate', numerator: 'share_click', denominator: 'card_flip_complete' },
  { kpi: 'Share success rate', numerator: 'share_success', denominator: 'share_click' },
  { kpi: 'Final CTA click-through rate', numerator: 'cta_click', denominator: 'card_flip_complete' },
]);

const ga4Enabled = () => !!CONFIG.ga4MeasurementId;
const sentOnce = new Set();
const sessionId = (crypto.randomUUID && crypto.randomUUID()) || `s${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`;
let playId = 0;
let started = false;

export function initAnalytics() {
  if (started) return;
  started = true;
  window.dataLayer = window.dataLayer || [];
  window.__sweetDreamsEvents = [];
  if (ga4Enabled() && typeof window.gtag !== 'function') {
    const s = document.createElement('script');
    s.async = true;
    s.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(CONFIG.ga4MeasurementId)}`;
    document.head.appendChild(s);
    window.gtag = function gtag() { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', CONFIG.ga4MeasurementId);
  }
  window.sweetDreamsFunnel = funnelSummary;
}

/** Call at the start of each play-through (game_start). */
export function newPlay() { playId += 1; return playId; }

/**
 * @param {string} name   one of EVENTS
 * @param {object} params snake_case parameters
 * @param {{once?: boolean}} opts  once: at most once per page view
 */
export function track(name, params = {}, opts = {}) {
  if (opts.once) {
    if (sentOnce.has(name)) return;
    sentOnce.add(name);
  }
  const payload = {
    campaign_id: CONFIG.campaignId,
    session_id: sessionId,
    play_id: playId,
    language: document.documentElement.lang || 'en',
    ...params,
  };
  try {
    window.__sweetDreamsEvents?.push({ name, payload, t: Date.now() });
    if (ga4Enabled() && typeof window.gtag === 'function') window.gtag('event', name, payload);
    else (window.dataLayer = window.dataLayer || []).push({ event: name, ...payload });
  } catch (e) {
    /* analytics must never break the experience */
  }
  if (!ga4Enabled() || CONFIG.debug) console.info(`%c[analytics] ${name}`, 'color:#a796ff;font-weight:700', payload);
}

/** QA helper: this browser session's real funnel (counts of plays reaching each step). */
function funnelSummary() {
  const ev = window.__sweetDreamsEvents || [];
  const plays = (name) => new Set(ev.filter((e) => e.name === name).map((e) => e.payload.play_id)).size;
  const rows = FUNNEL.map((f) => {
    const n = plays(f.numerator); const d = plays(f.denominator);
    return { KPI: f.kpi, [f.numerator]: n, [f.denominator]: d, rate: d ? `${Math.round((n / d) * 100)}%` : '—' };
  });
  console.table(rows);
  return rows;
}
