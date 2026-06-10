# Trusted logos

The 26 client / partner logos shown on the **About → THEY TRUSTED MY VISION** wall.

## Format

- PNG with transparent background.
- The set you uploaded is pre-coloured signal-pink — sits naturally on the dark
  editorial tiles without needing CSS filters or color inversion.
- Tile renders the logo with `object-fit: contain`, capped at `max-h-11` (≈44 px).
  Originals can be any resolution.

## Wiring

`/data/about.ts → trustedLogos.items` is the manifest. Add or reorder freely;
the grid is fully responsive:

| Breakpoint | Columns |
| ---------- | ------- |
| Mobile     | 2       |
| sm (640)   | 3       |
| md (768)   | 4       |
| lg (1024)  | 5       |
| xl (1280)  | 6       |
| 2xl (1536) | 7       |

To add a new logo:

1. Drop the file into `/public/logos/<file>.png`.
2. Append an entry to `trustedLogos.items` in `/data/about.ts`:

   ```ts
   { name: "New Brand", src: "/logos/new-brand.png" },
   ```

Entries with `src: ""` render an elegant text-tile placeholder.
