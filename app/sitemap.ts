import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { characters } from "@/content/characters";

export const dynamic = "force-static";

// NSFW-flagged characters are excluded — their pages exist but are not
// advertised to crawlers. Gallery images live behind the gallery page and
// are never listed individually.
export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.siteUrl.replace(/\/$/, "");
  const now = new Date();
  const staticPages = ["", "/gallery", "/process", "/characters", "/commissions", "/about"].map(
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
  return [...staticPages, ...characterPages];
}
