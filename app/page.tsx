import fs from "node:fs";
import path from "node:path";
import Link from "next/link";
import { site } from "@/content/site";
import { gallery } from "@/content/gallery";
import { commissions } from "@/content/commissions";
import Hero from "@/components/hero/Hero";
import Reveal from "@/components/Reveal";

// The homepage follows the shape of senior concept artists' portfolio
// sites: a compact identity band, then the work itself — immediately and
// image-first — with a credits strip for credibility and a single quiet
// contact row. Everything is SFW-only here and only files that actually
// exist render; nothing is invented.

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

export default function HomePage() {
  const work = collectWork();
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
