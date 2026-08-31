import fs from "node:fs";
import path from "node:path";
import { site } from "@/content/site";
import HeroStage from "./HeroStage";

// Server component (runs at build time in the static export). It looks at
// what hero artwork actually exists in /public/art/hero/ and hands the
// client stage exactly one of three situations:
//   1. hero.svg          → inline SVG markup for the stroke draw-on
//   2. stage-*.png set   → staged construction reveal (gesture → contour)
//   3. nothing yet       → a clearly labeled slot, animation system idle
// It never invents artwork — it only reports what the artist has supplied.

const HERO_DIR = path.join(process.cwd(), "public", "art", "hero");
const STAGE_FILES = [
  "stage-1-gesture.png",
  "stage-2-skeleton.png",
  "stage-3-masses.png",
  "stage-4-contour.png",
];

function readHeroSvg(): string | null {
  const p = path.join(HERO_DIR, "hero.svg");
  if (!fs.existsSync(p)) return null;
  let svg = fs.readFileSync(p, "utf8");
  // Strip anything script-like from the artist-supplied file before inlining.
  svg = svg.replace(/<script[\s\S]*?<\/script>/gi, "");
  svg = svg.replace(/\son\w+="[^"]*"/gi, "");
  // Drop any XML prolog / doctype so it inlines cleanly.
  svg = svg.replace(/<\?xml[\s\S]*?\?>/g, "").replace(/<!DOCTYPE[\s\S]*?>/g, "");
  return svg.trim();
}

function findStages(): string[] {
  if (!fs.existsSync(HERO_DIR)) return [];
  return STAGE_FILES.filter((f) => fs.existsSync(path.join(HERO_DIR, f))).map(
    (f) => `/art/hero/${f}`
  );
}

function findParallaxLayers(): { src: string; title: string }[] {
  // Ambient depth layers come from the artist's featured picks (SFW only,
  // and only files that really exist). At most two, so the figure stays
  // the undisputed centerpiece.
  const dir = path.join(process.cwd(), "public", "art", "featured");
  return site.featured
    .filter((f) => !f.nsfw)
    .filter((f) => fs.existsSync(path.join(dir, f.file)))
    .slice(0, 2)
    .map((f) => ({ src: `/art/featured/${f.file}`, title: f.title }));
}

export default function Hero() {
  const svgMarkup = readHeroSvg();
  const stages = svgMarkup ? [] : findStages();
  const layers = findParallaxLayers();

  return <HeroStage svgMarkup={svgMarkup} stages={stages} layers={layers} />;
}
