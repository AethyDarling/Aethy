# Hero Line Art

This folder holds the artwork for the big animated drawing at the top of the homepage — your anatomy/figure study that "draws itself" as the page loads.

You can supply it in **one of two ways** (or both — SVG is preferred, PNGs are the fallback):

## Option A: One SVG file (preferred)

**Filename:** `hero.svg`

An SVG lets the site animate each stroke being drawn, like watching the drawing happen. For that to work, the file has to be exported a certain way:

- **Every stroke must be a real vector path** — not an embedded image. If you open the SVG in a text editor and see `<image` anywhere, it won't animate. You should only see `<path`, `<line>`, `<circle>`, `<g>`, etc.
- **Use strokes, not fills, for the line work.** Draw with a stroked path (a line with a color and thickness), not a filled shape traced around the outside of a line. "Outline stroke" / "expand stroke" options in your art program are exactly what to AVOID here.
- **Single color for the line work** (any color is fine — the site can recolor it). Don't use gradients on strokes.
- **No rasterized effects** — no blur, texture brushes, or grain. Clean pen/vector lines only.

### How to export from common programs

- **Clip Studio / Procreate / Photoshop:** these are raster programs — they can't produce animatable SVGs directly. Either redraw the piece with a vector/pen tool in a vector app, or use Option B (PNGs) instead.
- **Illustrator:** File → Export → Export As → SVG. In the options, set Styling to "Presentation Attributes" and make sure "Preserve Illustrator Editing" is off. Do NOT run Object → Path → Outline Stroke first.
- **Inkscape:** just save as Plain SVG. Don't use "Stroke to Path."
- **Vectornator/Linearity Curve, Affinity Designer:** export SVG, keep strokes as strokes.

Recommended canvas size: roughly **1200–2000 px on the long side** (SVGs scale, so this is just about proportions — a roughly 4:5 or 3:4 portrait orientation works well for a figure study).

## Option B: Construction-stage PNGs (fallback)

If you can't produce a clean SVG, export the drawing as **4 transparent PNGs**, one per construction stage, all the same canvas size so they stack perfectly on top of each other:

| Stage | Exact filename |
|---|---|
| Gesture lines | `stage-1-gesture.png` |
| Skeleton / armature | `stage-2-skeleton.png` |
| Mass blocking | `stage-3-masses.png` |
| Refined contour | `stage-4-contour.png` |

- **Format:** PNG with a transparent background (no white box behind the lines).
- **Dimensions:** all four files identical — **2000 px on the long side** is ideal.
- Each file should contain **only that stage's marks** (e.g. `stage-2-skeleton.png` is just the skeleton, not the gesture underneath). The site layers them.
- Keep each file under ~1 MB if you can (line art on transparency compresses well).

If you provide both `hero.svg` and the stage PNGs, the site will use the SVG and keep the PNGs as a fallback.
