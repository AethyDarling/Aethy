"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import type { GalleryPiece, GallerySeries } from "@/content/gallery";
import { useNsfw } from "@/components/NsfwContext";
import Lightbox from "./Lightbox";

// The gallery: tag and series filtering with animated transitions, masonry
// columns, and a lightbox. NSFW pieces are filtered out of the data BEFORE
// render unless the visitor has confirmed 18+ — their thumbnails never
// mount, so nothing adult is fetched or preloaded ahead of consent.

type Filter = { kind: "all" } | { kind: "tag"; value: string } | { kind: "series"; value: string };

export default function GalleryClient({
  pieces,
  series,
}: {
  pieces: GalleryPiece[];
  series: GallerySeries[];
}) {
  const { showNsfw } = useNsfw();
  const [filter, setFilter] = useState<Filter>({ kind: "all" });
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const visible = useMemo(() => {
    const safe = pieces
      .filter((p) => showNsfw || !p.nsfw)
      .sort((a, b) => (a.date < b.date ? 1 : -1));
    if (filter.kind === "tag") return safe.filter((p) => p.tags.includes(filter.value));
    if (filter.kind === "series") {
      // A series reads oldest-first, the way the design developed.
      return safe.filter((p) => p.series === filter.value).reverse();
    }
    return safe;
  }, [pieces, showNsfw, filter]);

  const tags = useMemo(() => {
    const t = new Set<string>();
    for (const p of pieces) {
      if (!showNsfw && p.nsfw) continue;
      p.tags.forEach((x) => t.add(x));
    }
    // Anatomy leads the row — it's the signature category; sketchbook closes it.
    return Array.from(t).sort((a, b) => {
      if (a === "anatomy") return -1;
      if (b === "anatomy") return 1;
      if (a === "sketchbook") return 1;
      if (b === "sketchbook") return -1;
      return a.localeCompare(b);
    });
  }, [pieces, showNsfw]);

  // Only series that have at least one viewable piece appear as tabs.
  const visibleSeries = useMemo(
    () =>
      series.filter((s) =>
        pieces.some((p) => p.series === s.id && (showNsfw || !p.nsfw))
      ),
    [series, pieces, showNsfw]
  );
  const activeSeries =
    filter.kind === "series" ? visibleSeries.find((s) => s.id === filter.value) : undefined;

  if (pieces.length === 0) {
    return (
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="art-slot aspect-[4/5]">
            <p>
              artwork slot — 1600×2000
              <br />
              <span className="normal-case tracking-normal">
                drop images in /public/art/gallery/ and add entries to
                content/gallery.ts
              </span>
            </p>
          </div>
        ))}
      </div>
    );
  }

  const tabClass = (active: boolean) =>
    `font-mono text-[0.65rem] uppercase tracking-[0.2em] pb-1 border-b transition-colors ${
      active ? "border-bone text-bone" : "border-transparent text-muted hover:text-bone"
    }`;

  return (
    <>
      {/* Filter rows — plain tracked-caps text, underline marks the active one. */}
      <div className="mb-12 space-y-4">
        <div className="flex flex-wrap gap-x-7 gap-y-3" role="toolbar" aria-label="Filter by category">
          <button
            onClick={() => setFilter({ kind: "all" })}
            aria-pressed={filter.kind === "all"}
            className={tabClass(filter.kind === "all")}
          >
            all
          </button>
          {tags.map((tag) => {
            const active = filter.kind === "tag" && filter.value === tag;
            return (
              <button
                key={tag}
                onClick={() => setFilter({ kind: "tag", value: tag })}
                aria-pressed={active}
                className={tabClass(active)}
              >
                {tag}
              </button>
            );
          })}
        </div>
        {visibleSeries.length > 0 && (
          <div className="flex flex-wrap items-baseline gap-x-7 gap-y-3" role="toolbar" aria-label="Filter by series">
            <span className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-muted/70">
              Series
            </span>
            {visibleSeries.map((s) => {
              const active = filter.kind === "series" && filter.value === s.id;
              return (
                <button
                  key={s.id}
                  onClick={() => setFilter({ kind: "series", value: s.id })}
                  aria-pressed={active}
                  className={tabClass(active)}
                >
                  {s.title}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* A selected series shows its intent and a door to its own page. */}
      {activeSeries && (
        <div className="mb-10 max-w-2xl">
          <p className="text-muted text-sm leading-relaxed">{activeSeries.intro}</p>
          <Link
            href={`/series/${activeSeries.id}/`}
            className="draw-link inline-block font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted hover:text-bone mt-4"
          >
            Open the series →
          </Link>
        </div>
      )}

      {/* Masonry columns */}
      <motion.div layout className="columns-1 sm:columns-2 lg:columns-3 gap-6">
        <AnimatePresence mode="popLayout">
          {visible.map((p, i) => (
            <motion.figure
              layout
              key={p.file}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="mb-10 break-inside-avoid"
            >
              <button
                onClick={() => setLightboxIndex(i)}
                className="block w-full text-left group"
                aria-label={`Open ${p.title}`}
              >
                <span className="trace relative block border border-line">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`/art/gallery/${p.file}`}
                    alt={p.title}
                    loading="lazy"
                    decoding="async"
                    className="trace-img w-full block"
                  />
                  {p.nsfw && (
                    <span className="absolute top-2 right-2 font-mono text-[0.6rem] uppercase tracking-[0.15em] bg-ink text-mint border border-mint px-1.5 py-0.5">
                      18+
                    </span>
                  )}
                </span>
                {/* Caption: title, then the credit line — never a date. */}
                <figcaption className="pt-3">
                  <span className="block text-sm text-bone">{p.title}</span>
                  {p.credit && (
                    <span className="block font-mono text-[0.6rem] uppercase tracking-[0.18em] text-muted mt-1">
                      {p.credit}
                    </span>
                  )}
                </figcaption>
              </button>
            </motion.figure>
          ))}
        </AnimatePresence>
      </motion.div>

      {visible.length === 0 && (
        <p className="text-muted text-sm py-16 text-center">
          Nothing in this category yet.
        </p>
      )}

      <Lightbox
        pieces={visible}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={setLightboxIndex}
      />
    </>
  );
}
