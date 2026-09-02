import fs from "node:fs";
import path from "node:path";
import Link from "next/link";
import { site } from "@/content/site";
import { gallery } from "@/content/gallery";
import { commissions } from "@/content/commissions";
import { characters } from "@/content/characters";
import { process as processSeries } from "@/content/process";
import Hero from "@/components/hero/Hero";

// The homepage: identity, then the work, then process stages, a character,
// the codex, credits, and contact. Everything here is SFW-only and only
// files that actually exist render.

type HomePiece = { src: string; file: string; alt: string };

function collectWork(): HomePiece[] {
  const featuredDir = path.join(process.cwd(), "public", "art", "featured");
  const curated: HomePiece[] = site.featured
    .filter((f) => !f.nsfw)
    .filter((f) => fs.existsSync(path.join(featuredDir, f.file)))
    .map((f) => ({
      src: `/art/featured/${f.file}`,
      file: f.file,
      alt: f.title ?? "Artwork by Aethy",
    }));

  // When the curated strip is thin, backfill with the newest SFW gallery
  // pieces so the homepage always leads with as much work as exists.
  if (curated.length >= 6) return curated.slice(0, 9);
  const galleryDir = path.join(process.cwd(), "public", "art", "gallery");
  const fallback: HomePiece[] = gallery
    .filter((p) => !p.nsfw)
    .filter((p) => fs.existsSync(path.join(galleryDir, p.file)))
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .map((p) => ({
      src: `/art/gallery/${p.file}`,
      file: p.file,
      alt: p.title ?? "Artwork by Aethy",
    }))
    .filter((p) => !curated.some((c) => c.file === p.file));
  return [...curated, ...fallback].slice(0, 9);
}

// The first process series' stages, shown side by side.
function collectPlates(): { src: string; name: string }[] {
  const series = processSeries.find((s) => !s.nsfw);
  if (!series) return [];
  return series.stages
    .filter((s) => fs.existsSync(path.join(process.cwd(), "public", s.src)))
    .slice(0, 5)
    .map((s) => ({ src: `/${s.src}`, name: s.name }));
}

// The first SFW character with a viewable SFW image.
function collectSpecimen() {
  for (const c of characters) {
    if (c.nsfw) continue;
    const img =
      c.images.find((i) => i.file === c.thumbnail && !i.nsfw) ??
      c.images.find((i) => !i.nsfw);
    if (!img) continue;
    const p = path.join(process.cwd(), "public", "art", "characters", c.folder, img.file);
    if (!fs.existsSync(p)) continue;
    return {
      href: `/characters/${c.folder}/`,
      src: `/art/characters/${c.folder}/${img.file}`,
      alt: img.label ? `${c.name}, ${img.label}` : c.name,
      name: c.name,
      species: c.species && !c.species.startsWith("[EDIT") ? c.species : null,
      lore: c.description.startsWith("[EDIT") ? null : c.description.split("\n\n")[0],
    };
  }
  return null;
}

const sectionLink =
  "draw-link text-sm text-muted hover:text-bone shrink-0";

function SectionRow({ title, href, linkText }: { title: string; href: string; linkText: string }) {
  return (
    <div className="flex items-baseline justify-between gap-6 pb-4 border-b border-line mb-8">
      <h2 className="font-display text-2xl sm:text-3xl text-bone">{title}</h2>
      <Link href={href} className={sectionLink}>
        {linkText}
      </Link>
    </div>
  );
}

export default function HomePage() {
  const work = collectWork();
  const plates = collectPlates();
  const specimen = collectSpecimen();
  const open = commissions.commissionsOpen;

  return (
    <>
      <Hero />

      <section className="container-page pt-16 sm:pt-20" aria-label="Selected work">
        <SectionRow title="Selected work" href="/gallery/" linkText="All work" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {work.length > 0
            ? work.map((piece, i) => (
                <Link key={piece.src} href="/gallery/" className="group block">
                  <span className="trace block border border-line">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={piece.src}
                      alt={piece.alt}
                      loading={i < 3 ? "eager" : "lazy"}
                      className="trace-img w-full aspect-[4/5] object-cover"
                    />
                  </span>
                </Link>
              ))
            : [1, 2, 3].map((i) => (
                <div key={i} className="art-slot aspect-[4/5]">
                  <p>
                    work slot {i}
                    <br />
                    <span className="normal-case tracking-normal">
                      drop images in /public/art/featured/ (or the gallery)
                      and list them in content/site.ts / content/gallery.ts
                    </span>
                  </p>
                </div>
              ))}
        </div>
      </section>

      {plates.length > 0 && (
        <section className="container-page pt-24 sm:pt-32" aria-label="Process">
          <SectionRow title="Process" href="/process/" linkText="See the breakdown" />
          <Link
            href="/process/"
            className="group grid grid-cols-2 sm:grid-cols-5 gap-4 lg:gap-6"
            aria-label="Open the process breakdowns"
          >
            {plates.map((s, i) => (
              <span key={s.src} className="block">
                <span className="trace block border border-line bg-surface">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={s.src}
                    alt={`${s.name} stage`}
                    loading="lazy"
                    decoding="async"
                    className="trace-img w-full aspect-square object-cover object-[70%_30%]"
                  />
                </span>
                <span className="block pt-3 text-sm text-muted group-hover:text-bone transition-colors">
                  {i + 1}. {s.name}
                </span>
              </span>
            ))}
          </Link>
        </section>
      )}

      {specimen && (
        <section className="container-page pt-24 sm:pt-32" aria-label="Characters">
          <SectionRow title="Characters" href="/characters/" linkText="All characters" />
          <Link
            href={specimen.href}
            className="group grid md:grid-cols-[2fr_3fr] gap-8 lg:gap-14 items-center"
          >
            <span className="trace block border border-line">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={specimen.src}
                alt={specimen.alt}
                loading="lazy"
                decoding="async"
                className="trace-img w-full aspect-[4/5] object-cover"
              />
            </span>
            <span className="block">
              <span className="font-display text-4xl sm:text-5xl text-bone leading-none block">
                {specimen.name}
              </span>
              {specimen.species && (
                <span className="text-sm text-muted block mt-3">{specimen.species}</span>
              )}
              {specimen.lore && (
                <span className="text-muted text-sm leading-relaxed block mt-6 max-w-md">
                  {specimen.lore}
                </span>
              )}
              <span className="draw-link inline-block text-sm text-muted group-hover:text-bone transition-colors mt-8">
                Open the character page
              </span>
            </span>
          </Link>
        </section>
      )}

      <section className="container-page pt-24 sm:pt-32" aria-label="Aether Codex">
        <Link
          href="/codex/"
          className="group flex items-baseline justify-between gap-6 border-t border-b border-line py-8 sm:py-10"
        >
          <span className="block">
            <span className="font-display text-2xl sm:text-4xl text-bone leading-none block">
              Aether Codex
            </span>
            <span className="text-muted text-sm leading-relaxed block mt-3 max-w-lg">
              A physics-based hard-magic system, fully documented. Technical
              concept work, separate from the artwork.
            </span>
          </span>
          <span className="draw-link text-sm text-muted group-hover:text-bone transition-colors shrink-0">
            Read
          </span>
        </Link>
      </section>

      {site.credits.length > 0 && (
        <section className="container-page pt-24 sm:pt-32" aria-label="Selected credits">
          <h2 className="font-display text-2xl sm:text-3xl text-bone pb-4 border-b border-line">
            Selected credits
          </h2>
          <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-10">
            {site.credits.map((credit) => (
              <li key={credit} className="py-4 border-b border-line text-sm text-bone">
                {credit}
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="container-page pt-24 sm:pt-32" aria-label="Contact">
        <div className="border-t border-line pt-10 sm:pt-14 flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-6">
          <div>
            <p className="text-sm text-muted mb-3">
              {open ? "Commissions are open." : "Commissions are closed. Inquiries are welcome."}
            </p>
            <a
              href={`mailto:${site.email}?subject=${encodeURIComponent("Commission inquiry")}`}
              className="draw-link font-display text-2xl sm:text-4xl text-bone"
            >
              {site.email}
            </a>
          </div>
          <Link href="/commissions/" className={sectionLink}>
            {open ? "Tiers and terms" : "What I offer"}
          </Link>
        </div>
      </section>
    </>
  );
}
