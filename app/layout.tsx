import type { Metadata } from "next";
import { Fraunces, Space_Grotesk, IBM_Plex_Mono } from "next/font/google";
import { theme } from "@/content/theme";
import { site } from "@/content/site";
import { NsfwProvider } from "@/components/NsfwContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  axes: ["opsz"],
});
const sans = Space_Grotesk({ subsets: ["latin"], variable: "--font-sans" });
const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
});

const ogImages = site.ogImage ? [{ url: `/${site.ogImage}` }] : [];

export const metadata: Metadata = {
  metadataBase: new URL(site.siteUrl),
  title: {
    default: `${site.artistName} — Concept Artist`,
    template: `%s — ${site.artistName}`,
  },
  description: site.tagline,
  openGraph: {
    siteName: `${site.artistName} Studio`,
    type: "website",
    images: ogImages,
  },
  twitter: {
    card: site.ogImage ? "summary_large_image" : "summary",
    images: ogImages,
  },
};

// The palette lives in content/theme.ts; it's injected here as CSS variables
// so Tailwind classes and hand-written CSS both read from the same source.
//
// Each color is injected twice: `--c-x` as the plain hex (used by the
// hand-written rules in globals.css) and `--c-x-rgb` as "R G B" channels,
// which is what Tailwind needs for opacity modifiers like bg-ink/95 to
// resolve to a real color instead of silently becoming transparent.
function channels(hex: string): string {
  const h = hex.trim().replace("#", "");
  const full =
    h.length === 3
      ? h
          .split("")
          .map((c) => c + c)
          .join("")
      : h;
  const n = Number.parseInt(full.slice(0, 6), 16);
  if (Number.isNaN(n)) return "0 0 0";
  return `${(n >> 16) & 255} ${(n >> 8) & 255} ${n & 255}`;
}

const cssVars = Object.fromEntries(
  Object.entries(theme.colors).flatMap(([name, hex]) => [
    [`--c-${name}`, hex],
    [`--c-${name}-rgb`, channels(hex)],
  ])
) as React.CSSProperties;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      style={cssVars}
      className={`${display.variable} ${sans.variable} ${mono.variable}`}
    >
      <body className="font-sans min-h-dvh flex flex-col">
        <NsfwProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </NsfwProvider>
      </body>
    </html>
  );
}
