# Commissions

This folder holds the images for the commissions page: pricing sheets and/or example pieces for each commission tier.

## What goes here

Either or both of:

1. **A pricing-sheet image** — if you already make a graphic listing your tiers and prices, drop it here (e.g. `pricing-sheet.png`).
2. **Example pieces per tier** — one or a few finished examples showing what each tier looks like. Name them by tier so they're easy to match up in `content/commissions.ts`, e.g.:
   - `sketch-example-1.jpg`
   - `lineart-example-1.png`
   - `full-render-example-1.jpg`
   - `full-render-example-2.jpg`

The tier names, prices, descriptions, and whether commissions are currently open all live in `content/commissions.ts` — this folder is just the images that file points at.

## Format & size guidance

- **Pricing sheets:** PNG if they contain text (JPG makes text fuzzy). Up to 2000 px wide. If the text is small, err larger so it stays readable.
- **Example pieces:** JPG for painted work, PNG for line art. 1200–1600 px on the long side is plenty.
- Keep each file under ~800 KB.

## Adult content

If a tier's example piece is adult, mark that example `nsfw: true` in its entry in `content/commissions.ts`.
