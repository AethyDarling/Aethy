import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { characters } from "@/content/characters";
import { series } from "@/content/gallery";

export const dynamic = "force-static";

// NSFW-flagged characters are excluded — their pages exist but are not
// advertised to crawlers. Gallery images live behind the gallery page and
// are never listed individually.
export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.siteUrl.replace(/\/$/, "");
  const now = new Date();
  const staticPages = ["", "/gallery", "/process", "/characters", "/codex", "/commissions", "/about"].map(
    (p) => ({
      url: `${base}${p}/`,
      lastModified: now,
    })
  );
  const characterPages = characters
    .filter((c) => !c.nsfw)
    .map((c) => ({
      url: `${base}/characters/${c.folder}/`,
      lastModified: now,
    }));
  const seriesPages = series.map((s) => ({
    url: `${base}/series/${s.id}/`,
    lastModified: now,
  }));
  return [...staticPages, ...characterPages, ...seriesPages];
}
