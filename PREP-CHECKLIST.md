# Prep Checklist — before the site gets built

Work through this list, checking boxes as you go (change `[ ]` to `[x]`). When everything is checked, the repo is ready for the build session.

Every folder mentioned below has its own `_README.md` inside it with the full details — this page is the summary.

---

## 1. Drop in the artwork

### Hero (`public/art/hero/`)
- [ ] EITHER `hero.svg` — your anatomy/figure study as clean vector paths (strokes, single color, nothing rasterized — see that folder's `_README.md` for exact export settings)
- [ ] OR the four construction-stage PNGs, all the same canvas size, transparent backgrounds:
  - [ ] `stage-1-gesture.png`
  - [ ] `stage-2-skeleton.png`
  - [ ] `stage-3-masses.png`
  - [ ] `stage-4-contour.png`

### Gallery (`public/art/gallery/`)
- [ ] All finished works and studies you want in the main gallery (lowercase filenames, hyphens instead of spaces)

### Characters (`public/art/characters/`)
- [ ] One folder per character (lowercase, hyphens), each with their reference sheet and supporting art
- [ ] Deleted the `example-character/` template folder once real ones exist

### Featured (`public/art/featured/`)
- [ ] 3–6 of your absolute best pieces for the homepage strip

### Commissions (`public/art/commissions/`)
- [ ] A pricing-sheet image and/or example pieces for each tier

## 2. Write the content entries (`content/` folder)

Each of these files has one fully-commented example entry showing exactly what to write — copy the example block, paste it below, and edit the values. You don't need to know any programming.

- [ ] `content/gallery.ts` — one entry per gallery image (title, description, date, tags, nsfw)
- [ ] `content/characters.ts` — one entry per character folder (name, description, thumbnail, their images)
- [ ] `content/site.ts` — your name, tagline, bio, links, and the featured-strip pieces
- [ ] `content/commissions.ts` — your tiers, prices, terms, and the `commissionsOpen: true/false` switch set to your current status

Double-checks:
- [ ] Every image file in `public/art/gallery/` has a matching entry in `gallery.ts` (and every entry's `file:` spelling matches the real filename exactly, including `.jpg`/`.png`)
- [ ] Every character folder has a matching entry in `characters.ts`
- [ ] Every file named in `site.ts`'s featured list actually exists in `public/art/featured/`

## 3. Image format & size — quick reference

**Which format to use:**
- **JPG** — painted, shaded, full-color work. Export at quality ~80–90%.
- **PNG** — line art, anything with text (pricing sheets), anything needing a transparent background. JPG smears clean lines and text.
- **SVG** — only the hero drawing, and only if it's true vector work (see the hero `_README.md`).

**Sizes:**
- Gallery pieces: 1600–2400 px on the longest side
- Featured pieces: 1600–2000 px
- Character reference sheets: up to 2400 px
- Thumbnails/portraits: 800–1200 px
- Commission examples: 1200–1600 px

**File-size targets:** aim under **500 KB** per image; **800 KB** is the ceiling. Never upload print-resolution originals — resize a web copy and keep the originals safe elsewhere.

## 4. ⚠️ Adult content — do not skip

- [ ] **Every adult piece, everywhere, is marked `nsfw: true` in its content entry.** Gallery entries, character images, whole characters, featured pieces, commission examples — they all have an `nsfw` field. The site can only blur/gate what's marked. Go through every entry once, at the end, just to check this.
- [ ] Featured strip is all-ages if at all possible (it's the first thing every visitor sees).

## 5. Done?

- [ ] Everything above checked
- [ ] Commit and push (or upload) all the files

Then the build session can start. 🎨
