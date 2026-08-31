# aethy.studio

Portfolio site for **Aethy** — freelance concept artist, anatomy first.

Built with Next.js (static export), Tailwind CSS, and Framer Motion.
Deployed on **Cloudflare Pages** straight from this GitHub repo: push to
`main`, and the site rebuilds and goes live automatically. No servers.

---

## How to update the site (the short version)

1. Drop image files into the right folder under `public/art/`
2. Describe them in the matching file in `content/`
3. Commit and push to `main` (or edit the files right on GitHub — the
   pencil icon — and press "Commit changes")
4. Cloudflare rebuilds the site automatically. Done in a couple minutes.

Every folder in `public/art/` has a `_README.md` inside explaining exactly
what goes there, with formats and sizes. `PREP-CHECKLIST.md` has the full
pre-flight list.

---

## The content files — your control panel

Everything you'd want to change lives in the `content/` folder. Each file
is heavily commented with a copy-paste example — you never need to touch
anything in `app/` or `components/`.

| File | What it controls |
|---|---|
| `content/gallery.ts` | Every piece in the gallery: filename, title, description, date, tags, `nsfw` flag |
| `content/characters.ts` | Your characters: name, species, lore, their images (each with its own `nsfw` flag) |
| `content/commissions.ts` | **`commissionsOpen: true/false`** ← the open/closed switch, plus tiers, prices, will/won't draw, terms |
| `content/site.ts` | Your bio, email, social links, the homepage featured strip, the share-preview image |
| `content/theme.ts` | The color palette and every hero-animation knob (timing, parallax strength, tick count) |

### Flipping commissions open or closed

Open `content/commissions.ts`, find this near the top, change the word,
push:

```ts
commissionsOpen: false,   // ← change to true when you open
```

The header badge, homepage card, and commissions page all update together.

### Adding a gallery piece

1. Export a web copy of the piece (JPG for painted work at ~85% quality,
   PNG for line art, 1600–2400 px on the long side, under ~800 KB) into
   `public/art/gallery/`.
2. Open `content/gallery.ts` and copy the commented example block, paste
   it inside the list, and fill in the filename, title, description, date,
   and tags.
3. **If the piece is adult, set `nsfw: true`.** That's what hides it
   behind the 18+ gate — nothing else does.

Tags become filter buttons automatically. `"anatomy"` is always sorted
first — it's the signature category.

### Adding a character

1. Make a folder: `public/art/characters/your-character-name/` (lowercase,
   hyphens for spaces), and drop their art in it.
2. Copy the existing `aethy` block in `content/characters.ts` and edit
   folder, name, species, lore, thumbnail, and the images list.
3. The character automatically gets a page at
   `aethy.studio/characters/your-character-name/`.

### The hero (homepage centerpiece)

The homepage animates **your** artwork drawing itself in. It's waiting for
files in `public/art/hero/` (full instructions in the `_README.md` there):

- **Best:** `hero.svg` — your figure study as real vector strokes. Every
  path draws itself on in sequence, atelier-style.
- **Also great:** the four construction stages as transparent PNGs —
  `stage-1-gesture.png`, `stage-2-skeleton.png`, `stage-3-masses.png`,
  `stage-4-contour.png` — revealed stage by stage.

Until you add either, the homepage shows a labeled slot. Timing, stroke
color, parallax strength, and the ambient tick field are all tunable in
`content/theme.ts` → `hero`.

### Changing the colors

All colors live in `content/theme.ts`. Eyedropper a hex code from one of
your pieces, paste it in, push. The whole site (buttons, borders, badges,
hero strokes) follows.

---

## The 18+ system, in one paragraph

The site is safe-for-work by default. Anything you flag `nsfw: true` — a
gallery piece, a character image, a whole character, a commission example —
does not render at all (not even a hidden thumbnail) until a visitor turns
on the 18+ toggle in the header and confirms the age dialog. The choice
lasts for their browser session. NSFW work is also excluded from the
homepage featured strip, link-preview images, and the sitemap. **The only
thing you have to do is remember the flag.**

---

## Cloudflare Pages settings

In the Cloudflare dashboard → your Pages project → Settings → Build:

| Setting | Value |
|---|---|
| Framework preset | Next.js (Static HTML Export) |
| Build command | `npm run build` |
| Build output directory | `out` |
| Production branch | `main` |

No environment variables are required. If the build image asks for a Node
version, set environment variable `NODE_VERSION` to `20` or higher.

---

## For developers (or future you)

```bash
npm install     # once
npm run dev     # local dev server at localhost:3000
npm run build   # static export into out/
npm run typecheck
```

- `app/` — pages (App Router). `components/` — UI. Both read exclusively
  from `content/`.
- Static export (`output: 'export'` in `next.config.mjs`): no server code,
  no API routes. Keep it that way — client-side solutions only.
- Design rules baked into the codebase: **no gradients, no glows, no
  generated imagery.** Flat color, hairlines, typography, and the artist's
  own files. If a visual is missing, render a labeled `.art-slot` instead.
- The hero detects what's in `public/art/hero/` at build time
  (`components/hero/Hero.tsx`) and picks SVG draw-on, staged PNG reveal,
  or the labeled slot.
- Reduced motion is honored everywhere (`useReducedMotion` + a global CSS
  clamp); the hero renders its finished composition statically.
