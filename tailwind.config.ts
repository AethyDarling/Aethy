import type { Config } from "tailwindcss";

// Colors resolve to CSS variables that app/layout.tsx sets from
// content/theme.ts — edit the palette THERE, not here.
// They use the `R G B` channel form so Tailwind opacity modifiers
// (bg-ink/95, bg-ink/80 …) produce a valid color; layout.tsx also
// injects the plain hex vars for hand-written CSS in globals.css.
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "rgb(var(--c-ink-rgb) / <alpha-value>)",
        surface: "rgb(var(--c-surface-rgb) / <alpha-value>)",
        line: "rgb(var(--c-line-rgb) / <alpha-value>)",
        bone: "rgb(var(--c-bone-rgb) / <alpha-value>)",
        muted: "rgb(var(--c-muted-rgb) / <alpha-value>)",
        amber: "rgb(var(--c-amber-rgb) / <alpha-value>)",
        mint: "rgb(var(--c-mint-rgb) / <alpha-value>)",
        rust: "rgb(var(--c-rust-rgb) / <alpha-value>)",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      transitionTimingFunction: {
        draw: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
