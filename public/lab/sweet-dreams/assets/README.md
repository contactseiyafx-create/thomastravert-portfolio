# Assets — replace placeholders without rebuilding

Every visual slot is listed in [`manifest.json`](manifest.json). Change a path (or set it to `null` to use the
built-in placeholder), save, redeploy the folder. No code changes and no build step.

```
assets/
├── manifest.json        ← the only file you edit to swap assets
├── backgrounds/         ← welcome.svg · night.svg · dreams.svg (390×844 artboards from Figma)
├── character/           ← your Blender export: nubi.glb (+ optional textures)
├── companion/           ← Pip artwork (PNG/SVG/WebP, square, transparent)
├── card/                ← your Dream Card front/back artwork (300:424)
├── ui/                  ← logo, custom icons
├── audio/               ← ambience loop (mp3/ogg, plays only when the user enables sound)
└── moodboard/           ← your references (not loaded by the app)
```

## Slots

| Slot | Default | Notes |
|---|---|---|
| `backgrounds.welcome` / `night` / `dreams` | exported Figma art | 390×844 (SVG, or PNG/WebP at 2× = 780×1688). Bottom-anchored: on taller phones extra sky is added above, so keep the top 80px simple. Animated clouds, stars, moon (screen 02), Nubi and Pip are drawn on top. |
| `character.model` | `null` → 2D Nubi | Path to a `.glb`/`.gltf`. Loaded lazily; the 2D Nubi stays visible until the model is ready and returns if it fails. Test any model with `?model=assets/character/nubi.glb`. |
| `character.animations` | Idle, Breathe, Blink, Happy, FallAsleep, Sleep, WakeUp | Map each slot to your Blender action names. Missing clips are fine (procedural fallbacks). |
| `character.transform` | scale 1, rotationY 0 | The model is auto-normalised to the same on-screen size as the 2D Nubi; use these to fine-tune. |
| `character.camera` | fov 30, position, target | GSAP dollies this camera closer as Nubi relaxes and falls asleep. |
| `companion.image` | `null` → vector Pip | Used on screen 03 and on the Dream Card. |
| `card.front` | `null` → built-in Nubi & Pip card | Your collectible card artwork, 300:424 ratio (e.g. 1200×1696 PNG/WebP). Replaces the front in the reveal, the holographic effect and both PNG exports (text is not overlaid on a custom front). |
| `card.back` | `null` → moon-emblem back | Mystery side shown before the flip. Same ratio. |
| `ui.logo` | `null` → moon icon | Shown in the top-bar pill next to "Sweet Dreams". |
| `audio.ambience` | `null` | Looping ambience; only fetched once the user turns sound on. |

## Blender → GLB checklist

1. **Scale & origin**: character standing at the world origin, feet on Z=0 (glTF Y-up is handled by the exporter). Facing −Y in Blender (= towards the camera).
2. **Actions** (Dope Sheet → Action Editor), named exactly like `character.animations`:
   - `Idle`: loop, subtle sway
   - `Breathe`: loop, chest/body scale (optional; procedural breathing is used if absent)
   - `Blink`: short, eyelid bones or shape keys only, so it blends on top of Idle
   - `Happy`: one-shot reaction (played on every star tap and when the moon is placed)
   - `FallAsleep`: one-shot, ends in the sleeping pose
   - `Sleep`: loop, sleeping breath
   - `WakeUp`: one-shot (reserved for future use)
   Push each action to an NLA track (or enable *Export → Animation → Actions*) so all clips export.
3. **Export**: File → Export → glTF 2.0 → Format *glTF Binary (.glb)*, include *Animations*, *Shape Keys*, *Skinning*. Apply modifiers.
4. **Optimise for mobile**: aim for < 30k triangles, 1024² textures (WebP/KTX2 if possible), < 3 MB total. Draco or Meshopt compression is supported (`gltf-transform optimize nubi.glb nubi.glb --compress meshopt`).
5. Save it as `assets/character/nubi.glb` and set `"model": "assets/character/nubi.glb"`.
