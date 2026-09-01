import fs from "node:fs";
import path from "node:path";
import Link from "next/link";
import { site } from "@/content/site";
import { gallery } from "@/content/gallery";
import { commissions } from "@/content/commissions";
import { characters } from "@/content/characters";
import { process as processSeries } from "@/content/process";
import Hero from "@/components/hero/Hero";
import Reveal from "@/components/Reveal";

// The homepage follows the shape of senior concept artists' portfolio
// sites — creature designers and worldbuilders especially: a compact
// identity band, the work immediately and image-first, an anatomy-plate
// strip (the Whitlatch convention: show the build under the creature), a
// bestiary specimen entry (the Keith Thompson convention: one creature
// paired with its writeup), and a single quiet contact row. Everything is
// SFW-only here and only files that actually exist render; nothing is
// invented.

type HomePiece = { src: string; title: string };

function collectWork(): HomePiece[] {
  const featuredDir = path.join(process.cwd(), "public", "art", "featured");
  const curated: HomePiece[] = site.featured
    .filter((f) => !f.nsfw)
    .filter((f) => fs.existsSync(path.join(featuredDir, f.file)))
    .map((f) => ({ src: `/art/featured/${f.file}`, title: f.title }));

  // When the curated strip is thin, backfill with the newest SFW gallery
  // pieces so the homepage always leads with as much work as exists.
  if (curated.length >= 6) return curated.slice(0, 9);
  const galleryDir = path.join(process.cwd(), "public", "art", "gallery");
  const fallback: HomePiece[] = gallery
    .filter((p) => !p.nsfw)
    .filter((p) => fs.existsSync(path.join(galleryDir, p.file)))
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .map((p) => ({ src: `/art/gallery/${p.file}`, title: p.title }))
    .filter((p) => !curated.some((c) => c.title === p.title));
  return [...curated, ...fallback].slice(0, 9);
}

// The first process series' stages, for the anatomy-plates strip.
function collectPlates(): { src: string; name: string }[] {
  const series = processSeries.find((s) => !s.nsfw);
  if (!series) return [];
  return series.stages
    .filter((s) => fs.existsSync(path.join(process.cwd(), "public", s.src)))
    .slice(0, 5)
    .map((s) => ({ src: `/${s.src}`, name: s.name }));
}

// The first SFW character with a viewable SFW image — the homepage's
// bestiary specimen entry.
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
      alt: `${c.name} — ${img.label}`,
      name: c.name,
      species: c.species && !c.species.startsWith("[EDIT") ? c.species : null,
      lore: c.description.startsWith("[EDIT") ? null : c.description.split("\n\n")[0],
    };
  }
  return null;
}

export default function HomePage() {
  const work = collectWork();
  const plates = collectPlates();
  const specimen = collectSpecimen();
  const open = commissions.commissionsOpen;

  return (
    <>
      <Hero />

      {/* The work — straight in, image-first. */}
      <section className="container-page pt-16 sm:pt-20" aria-label="Selected work">
        <Reveal>
          <div className="flex items-baseline justify-between gap-6 pb-5 border-b border-line mb-8 sm:mb-10">
            <p className="label-caps text-muted">Selected work</p>
            <Link
              href="/gallery/"
              className="draw-link font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted hover:text-bone shrink-0"
            >
              All work →
            </Link>
          </div>
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {work.length > 0
            ? work.map((piece, i) => (
                <Reveal key={piece.src} delay={(i % 3) * 0.07}>
                  <Link href="/gallery/" className="group block">
                    <span className="trace block border border-line">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={piece.src}
                        alt={piece.title}
                        loading={i < 3 ? "eager" : "lazy"}
                        className="trace-img w-full aspect-[4/5] object-cover"
                      />
                    </span>
                    <span className="block pt-3 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-muted group-hover:text-bone transition-colors">
                      {piece.title}
                    </span>
                  </Link>
                </Reveal>
              ))
            : [1, 2, 3].map((i) => (
                <Reveal key={i} delay={i * 0.07}>
                  <div className="art-slot aspect-[4/5]">
                    <p>
                      work slot {i}
                      <br />
                      <span className="normal-case tracking-normal">
                        drop images in /public/art/featured/ (or the gallery)
                        and list them in content/site.ts / content/gallery.ts
                      </span>
                    </p>
                  </div>
                </Reveal>
              ))}
        </div>
      </section>

      {/* Anatomy plates — the build under the creature, gesture to render. */}
      {plates.length > 0 && (
        <section className="container-page pt-24 sm:pt-32" aria-label="Anatomy plates">
          <Reveal>
            <div className="flex items-baseline justify-between gap-6 pb-5 border-b border-line mb-8 sm:mb-10">
              <p className="label-caps text-muted">Anatomy plates</p>
              <Link
                href="/process/"
                className="draw-link font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted hover:text-bone shrink-0"
              >
                Watch the build →
              </Link>
            </div>
          </Reveal>
          <Reveal>
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
                  <span className="block pt-3 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-muted group-hover:text-bone transition-colors">
                    {String(i + 1).padStart(2, "0")} — {s.name}
                  </span>
                </span>
              ))}
            </Link>
          </Reveal>
        </section>
      )}

      {/* The bestiary — one specimen entry, image paired with its writeup. */}
      {specimen && (
        <section className="container-page pt-24 sm:pt-32" aria-label="The bestiary">
          <Reveal>
            <div className="flex items-baseline justify-between gap-6 pb-5 border-b border-line mb-8 sm:mb-10">
              <p className="label-caps text-muted">The bestiary</p>
              <Link
                href="/characters/"
                className="draw-link font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted hover:text-bone shrink-0"
              >
                All characters →
              </Link>
            </div>
          </Reveal>
          <Reveal>
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
                <span className="label-caps text-muted block mb-5">
                  Field entry 01
                </span>
                <span className="font-display text-4xl sm:text-5xl text-bone leading-none block">
                  {specimen.name}
                </span>
                {specimen.species && (
                  <span className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-muted block mt-4">
                    {specimen.species}
                  </span>
                )}
                {specimen.lore && (
                  <span className="text-muted text-sm leading-relaxed block mt-6 max-w-md">
                    {specimen.lore}
                  </span>
                )}
                <span className="draw-link inline-block font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted group-hover:text-bone transition-colors mt-8">
                  Open the entry →
                </span>
              </span>
            </Link>
          </Reveal>
        </section>
      )}

      {/* The world behind the work — a doorway row to the codex. */}
      <section className="container-page pt-24 sm:pt-32" aria-label="Aether Codex">
        <Reveal>
          <Link
            href="/codex/"
            className="index-row group flex items-center justify-between gap-6 border-t border-b border-line py-8 sm:py-10"
          >
            <span className="block">
              <span className="label-caps text-muted block mb-4">
                The world behind the work
              </span>
              <span className="font-display text-2xl sm:text-4xl text-bone leading-none block">
                Aether Codex
              </span>
              <span className="text-muted text-sm leading-relaxed block mt-3 max-w-lg">
                A physics-based hard-magic system, fully documented — the
                technical concept work beyond the canvas.
              </span>
            </span>
            <span
              aria-hidden
              className="index-arrow hidden sm:block font-display text-2xl text-bone shrink-0"
            >
              →
            </span>
          </Link>
        </Reveal>
      </section>

      {/* Selected credits — the credibility strip. Hidden until written. */}
      {site.credits.length > 0 && (
        <section className="container-page pt-20 sm:pt-28" aria-label="Selected credits">
          <Reveal>
            <p className="label-caps text-muted pb-5 border-b border-line">
              Selected credits
            </p>
          </Reveal>
          <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-10">
            {site.credits.map((credit, i) => (
              <Reveal key={credit} delay={(i % 3) * 0.05}>
                <li className="py-4 border-b border-line text-sm text-bone">
                  {credit}
                </li>
              </Reveal>
            ))}
          </ul>
        </section>
      )}

      {/* Contact — one quiet row, the email is the whole point. */}
      <section className="container-page pt-20 sm:pt-28">
        <Reveal>
          <div className="border-t border-line pt-10 sm:pt-14 flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-6">
            <div>
              <p className="label-caps text-muted mb-4">
                {open ? "Commissions open" : "Commissions & inquiries"}
              </p>
              <a
                href={`mailto:${site.email}?subject=${encodeURIComponent("Commission inquiry")}`}
                className="draw-link font-display text-2xl sm:text-4xl text-bone"
              >
                {site.email}
              </a>
            </div>
            <Link
              href="/commissions/"
              className="draw-link font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted hover:text-bone shrink-0"
            >
              {open ? "Tiers & terms →" : "What I offer →"}
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
