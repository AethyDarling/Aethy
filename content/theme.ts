// =============================================================================
// THEME; the site's look and the hero animation's tuning knobs.
//
// Everything visual that you might want to tweak lives here: the color
// palette, and the timing/strength of the homepage hero animation.
// Edit a value, save, redeploy; no component code needs touching.
//
// Colors are hex codes in quotes ("#d9a03d"). A good way to pick them:
// open one of your pieces, eyedropper a color, paste the hex here.
// The palette below is a neutral graphite studio ground; near-black,
// colorless, so the artwork supplies all the warmth and color; with a
// single restrained brass accent.
// =============================================================================

export const theme = {
  colors: {
    /** Page background; near-black neutral graphite, so artwork carries the color. */
    ink: "#0a0a0b",
    /** Slightly raised surfaces: cards, header, modals. */
    surface: "#121214",
    /** Hairline borders and dividers. */
    line: "#232326",
    /** Primary text; crisp near-white. */
    bone: "#f2f2f0",
    /** Secondary/dimmed text. */
    muted: "#8e8e94",
    /** Primary accent; restrained brass (links, buttons, active states). Used sparingly. */
    amber: "#d0a24a",
    /** Secondary accent; cool mint, functional only (focus rings, the 18+ marker). */
    mint: "#7fd6ba",
    /** Deep rust; used sparingly (CLOSED badge, warnings). */
    rust: "#b0512e",
  },

  /**
   * HERO; tuning for the homepage entrance and ambient motion.
   * All times are in milliseconds unless named otherwise.
   */
  hero: {
    /** Color the line art draws in with. Use any hex, or one of the palette colors above. */
    strokeColor: "#f2f2f0",
    /** If true, every path in hero.svg is recolored to strokeColor. Set false to keep the SVG's own colors. */
    recolorStrokes: true,
    /** How long the whole draw-on takes (the SVG strokes, or the PNG stage reveals, share this budget). */
    drawDurationMs: 2600,
    /** Pause between the drawing finishing and the name appearing. */
    textDelayMs: 300,
    /** How far apart the name / role / button appear from each other. */
    textStaggerMs: 140,
    /** Cursor parallax strength: how many pixels the art layers drift at most. 0 disables. */
    parallaxPx: 0,
    /** Number of drifting construction-line ticks in the background canvas. 0 disables the canvas entirely. */
    particleCount: 0,
    /** Speed multiplier for the ambient tick drift. 1 = default, 0.5 = half speed. */
    particleSpeed: 1,
    /** Idle sway of the artwork layers when there is no cursor (touch devices), in pixels. */
    ambientDriftPx: 0,
  },
} as const;

export type Theme = typeof theme;
