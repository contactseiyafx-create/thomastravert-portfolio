# Sweet Dreams — interactive H5 campaign

A 20–30 second bedtime ritual built from the Figma design *Sweet Dreams — H5 Campaign UI*
(3 screens: Welcome → Interactive Night → Sweet Dreams), ending with a collectible holographic
Dream Card reveal, a measurable conversion CTA, GA4-ready analytics and a slot for a Blender 3D character.

> **Sweet Dreams is an unofficial, fan-made portfolio concept.** It is not affiliated with or endorsed by
> The Pokémon Company, Nintendo, Creatures, GAME FREAK or SELECT BUTTON. No official logos or characters are used;
> the product is only named in the CTA text, and the notice is shown next to it.

**Stack:** React 18 · Tailwind CSS (compiled utilities) · GSAP 3 · Three.js + React Three Fiber (lazy-loaded, character only) · Netlify.
Modules load from CDNs through an import map, so there is **no build step**: the folder is the deployable site.

## Run locally

```bash
python3 -m http.server 8080
```
Then open http://localhost:8080. Useful URL params: `?lang=ja`, `?cta=https://…`, `?model=assets/character/nubi.glb`, `?debug`.

## Deploy to Netlify
Drag this folder onto https://app.netlify.com/drop, or connect the repo (publish directory `.`; `netlify.toml` is included).

## Experience flow
| Screen | What happens | Events |
|---|---|---|
| 01 Welcome | Clouds drift, stars twinkle, Nubi breathes and blinks. "Let's Begin". | `campaign_view`, `game_start` |
| 02 Interactive Night | Tap the 5 over-bright stars to calm them; drag the moon into the glowing ring (keyboard: arrows / Enter). Night Peace bar + ring fill, sky darkens, Nubi reacts and gets drowsier. Advances only when all 6 tasks are done. | `star_tap`, `moon_drag_complete`, `challenge_complete` |
| 03 Sweet Dreams | Nubi falls asleep (eyes close, sprout droops, blanket), Pip flies in. | `dream_reveal` |
| 03 → Card reveal | UI fades, stars gather, a mystery card materialises: "You've unlocked a Dream Card!" → **Tap to Reveal** → GSAP 3D flip → holographic Nubi & Pip card (tilt/drag foil, specular light, parallax). | `card_reveal_start`, `card_flip_complete`, `card_interaction` |
| 03 → Conversion | "Your Dream Is Just Beginning" · primary **Discover Pokémon Sleep** (configurable URL) · Save Card (1200×1696 PNG) · Share Your Dream (Web Share → fallback download + copy link) · Play Again · optional 1080×1920 Story export · unofficial-concept notice. | `cta_click`, `reward_download`, `share_click`, `share_success`, `replay_click` |

## Configuration
Edit `src/config.js` or define before `src/main.js` loads:
```html
<script>
  window.SWEET_DREAMS_CONFIG = {
    ctaUrl: 'https://www.pokemonsleep.net/',       // primary CTA destination (verify before launch)
    ctaLabel: { en: 'Discover Pokémon Sleep', ja: 'Pokémon Sleep をチェック' },
    revealDelay: 5.6,                              // seconds of sleeping scene before the card appears
    ga4MeasurementId: 'G-XXXXXXX',                 // empty = console + dataLayer logging only
    shareUrl: 'https://campaign.example/',
    soundDefaultOn: false,
  };
</script>
```

## Analytics & KPIs
`src/analytics.js` exposes `track(name, params)`. With a GA4 ID it loads gtag.js and sends events;
without one, events go to `window.dataLayer` (GTM-ready) and are logged in the console (development logging).
Every event carries `session_id` and `play_id` (one per play-through) so funnels work per play.

| KPI | Formula (GA4 funnel / free-form exploration, unique users or plays) |
|---|---|
| Game completion rate | `challenge_complete` ÷ `game_start` |
| Card reveal rate | `card_flip_complete` ÷ `challenge_complete` |
| Reward download rate | `reward_download` ÷ `card_flip_complete` |
| Share rate | `share_click` ÷ `card_flip_complete` (success: `share_success` ÷ `share_click`) |
| Final CTA click-through rate | `cta_click` ÷ `card_flip_complete` |

QA: run `sweetDreamsFunnel()` in the console to see these ratios for your own test session (real events only).
No performance data is generated or estimated anywhere.

## Tailwind
Utilities are compiled to `styles/tailwind.css` (≈3 KB) from the classes used in `src/` with the official Tailwind CLI
(standalone binary, no Node required). Rebuild after adding classes:
```bash
./tailwindcss -c tailwind.config.js -i styles/tailwind.input.css -o styles/tailwind.css --minify
```
The design system itself (Figma tokens + components) lives in `styles/tokens.css` and `styles/components.css`.

## Project structure
```
index.html              import map, fonts, entry
styles/tokens.css       design tokens extracted from Figma (colours, type, gradients, radii, shadows)
styles/components.css   UI components (CTA pills, glass cards, progress, chips, modal, card)
tailwind.config.js      same tokens as Tailwind theme (for a future build pipeline)
src/main.js             app shell: fluid 390px stage, screen flow, transitions, language, sound
src/screens/            Welcome, Night (gameplay), Dreams
src/reveal/             CardReveal (sequence + conversion panel), HoloCard (3D flip + holographic foil)
src/character/          CharacterSlot (2D ↔ 3D), Nubi2D (placeholder), Character3D (R3F + GLTF)
src/art.js              vector art kit (Nubi, Pip, clouds, Dream Card)
src/card.js             card PNG (1200×1696), story PNG (1080×1920), Web Share with fallbacks
src/i18n.js             English / Japanese copy
src/analytics.js        GA4 adapter
src/sound.js            optional Web Audio chimes (off by default) + ambience slot
assets/                 replaceable assets + manifest.json (see assets/README.md)
```

## Accessibility & performance
- All interactive elements are real buttons with labels; the moon has a keyboard alternative; the Dream Card is a focus-trapped dialog (Esc closes).
- `prefers-reduced-motion`: ambient loops are disabled, transitions become instant, holographic shimmer is frozen.
- Sound is opt-in. Three.js is only downloaded when a model is configured; DPR is capped at 2.
- Fluid layout: the 390px artboard scales to the device width; extra height becomes sky (bottom-anchored scenes, top-anchored UI) and safe areas are respected.

## Production notes
- Check the CTA destination URL and the trademark notice wording before any public use.
- For maximum load speed you can later vendor the CDN modules or move to Vite; the code is plain ES modules and ports directly.
