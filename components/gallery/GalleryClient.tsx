"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { GalleryPiece } from "@/content/gallery";
import { useNsfw } from "@/components/NsfwContext";
import Lightbox from "./Lightbox";

// The gallery: tag filtering with animated transitions, masonry columns,
// and a lightbox. NSFW pieces are filtered out of the data BEFORE render
// unless the visitor has confirmed 18+ — their thumbnails never mount,
// so nothing adult is fetched or preloaded ahead of consent.

export default function GalleryClient({ pieces }: { pieces: GalleryPiece[] }) {
  const { showNsfw } = useNsfw();
  const [activeTag, setActiveTag] = useState<string>("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const visible = useMemo(() => {
    const safe = pieces
      .filter((p) => showNsfw || !p.nsfw)
      .sort((a, b) => (a.date < b.date ? 1 : -1));
    return activeTag === "all"
      ? safe
      : safe.filter((p) => p.tags.includes(activeTag));
  }, [pieces, showNsfw, activeTag]);

  const tags = useMemo(() => {
    const t = new Set<string>();
    for (const p of pieces) {
      if (!showNsfw && p.nsfw) continue;
      p.tags.forEach((x) => t.add(x));
    }
    // Anatomy leads the row — it's the signature category.
    return Array.from(t).sort((a, b) => {
      if (a === "anatomy") return -1;
      if (b === "anatomy") return 1;
      return a.localeCompare(b);
    });
  }, [pieces, showNsfw]);

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

  return (
    <>
      {/* Filter row — plain tracked-caps text, underline marks the active one. */}
      <div
        className="flex flex-wrap gap-x-7 gap-y-3 mb-12"
        role="toolbar"
        aria-label="Filter by category"
      >
        {["all", ...tags].map((tag) => (
          <button
            key={tag}
            onClick={() => setActiveTag(tag)}
            aria-pressed={activeTag === tag}
            className={`font-mono text-[0.65rem] uppercase tracking-[0.2em] pb-1 border-b transition-colors ${
              activeTag === tag
                ? "border-bone text-bone"
                : "border-transparent text-muted hover:text-bone"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

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
                <figcaption className="flex items-baseline justify-between gap-3 pt-3">
                  <span className="text-sm text-bone">{p.title}</span>
                  <span className="font-mono text-[0.6rem] text-muted shrink-0">
                    {p.date}
                  </span>
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
