// =============================================================================
// THEME — the site's look and the hero animation's tuning knobs.
//
// Everything visual that you might want to tweak lives here: the color
// palette, and the timing/strength of the homepage hero animation.
// Edit a value, save, redeploy — no component code needs touching.
//
// Colors are hex codes in quotes ("#d99a3d"). A good way to pick them:
// open one of your pieces, eyedropper a color, paste the hex here.
// The palette below was sampled from the artwork currently in the repo
// (dark umber fur, bone/paper light, amber-ochre, and that mint glow).
// =============================================================================

export const theme = {
  colors: {
    /** Page background — very dark, warm, so artwork pops. */
    ink: "#141009",
    /** Slightly raised surfaces: cards, header, modals. */
    surface: "#1d1712",
    /** Hairline borders and construction lines. */
    line: "#3a3128",
    /** Primary text — warm bone/paper white. */
    bone: "#eae0cf",
    /** Secondary/dimmed text. */
    muted: "#a3988a",
    /** Primary accent — amber ochre (links, buttons, active states). */
    amber: "#d99a3d",
    /** Secondary accent — the mint glow from your character art (small highlights, focus rings, the 18+ marker). */
    mint: "#8fe3c0",
    /** Deep rust — used sparingly (CLOSED badge, warnings). */
    rust: "#a34d28",
  },

  /**
   * HERO — tuning for the homepage entrance and ambient motion.
   * All times are in milliseconds unless named otherwise.
   */
  hero: {
    /** Color the line art draws in with. Use any hex, or one of the palette colors above. */
    strokeColor: "#eae0cf",
    /** If true, every path in hero.svg is recolored to strokeColor. Set false to keep the SVG's own colors. */
    recolorStrokes: true,
    /** How long the whole draw-on takes (the SVG strokes, or the PNG stage reveals, share this budget). */
    drawDurationMs: 2600,
    /** Pause between the drawing finishing and the name appearing. */
    textDelayMs: 300,
    /** How far apart the name / role / button appear from each other. */
    textStaggerMs: 140,
    /** Cursor parallax strength: how many pixels the art layers drift at most. 0 disables. */
    parallaxPx: 18,
    /** Number of drifting construction-line ticks in the background canvas. 0 disables the canvas entirely. */
    particleCount: 26,
    /** Speed multiplier for the ambient tick drift. 1 = default, 0.5 = half speed. */
    particleSpeed: 1,
    /** Idle sway of the artwork layers when there is no cursor (touch devices), in pixels. */
    ambientDriftPx: 8,
  },
} as const;

export type Theme = typeof theme;
