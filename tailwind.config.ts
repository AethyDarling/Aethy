import type { Config } from "tailwindcss";

// Colors resolve to CSS variables that app/layout.tsx sets from
// content/theme.ts — edit the palette THERE, not here.
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "var(--c-ink)",
        surface: "var(--c-surface)",
        line: "var(--c-line)",
        bone: "var(--c-bone)",
        muted: "var(--c-muted)",
        amber: "var(--c-amber)",
        mint: "var(--c-mint)",
        rust: "var(--c-rust)",
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
