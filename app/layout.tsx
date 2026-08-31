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
const cssVars = {
  "--c-ink": theme.colors.ink,
  "--c-surface": theme.colors.surface,
  "--c-line": theme.colors.line,
  "--c-bone": theme.colors.bone,
  "--c-muted": theme.colors.muted,
  "--c-amber": theme.colors.amber,
  "--c-mint": theme.colors.mint,
  "--c-rust": theme.colors.rust,
} as React.CSSProperties;

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
