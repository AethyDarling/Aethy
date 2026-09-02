"use client";

import type { GalleryPiece } from "@/content/gallery";
import { useNsfw } from "@/components/NsfwContext";
import Reveal from "@/components/Reveal";

// The pieces of one series, stacked single-column and full width in the
// order they were made. Adult pieces stay unmounted until the visitor
// confirms 18+, same as everywhere else on the site.
export default function SeriesPlates({ pieces }: { pieces: GalleryPiece[] }) {
  const { showNsfw } = useNsfw();
  const visible = pieces.filter((p) => showNsfw || !p.nsfw);

  if (visible.length === 0) {
    return (
      <p className="text-muted text-sm py-16 text-center">
        Nothing viewable in this series yet.
      </p>
    );
  }

  return (
    <ol className="space-y-16 sm:space-y-24 max-w-5xl">
      {visible.map((p, i) => (
        <li key={p.file}>
          <Reveal>
            <figure>
              <span className="relative block border border-line">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`/art/gallery/${p.file}`}
                  alt={p.title ?? "Artwork by Aethy"}
                  loading={i === 0 ? "eager" : "lazy"}
                  decoding="async"
                  className="w-full block"
                />
                {p.nsfw && (
                  <span className="absolute top-2 right-2 font-sans text-[0.6rem] uppercase tracking-[0.08em] bg-ink text-mint border border-mint px-1.5 py-0.5">
                    18+
                  </span>
                )}
              </span>
              <figcaption className="grid sm:grid-cols-[4rem_1fr] gap-x-6 gap-y-2 pt-4">
                <span className="text-sm text-muted pt-0.5">{i + 1}</span>
                <span>
                  {p.credit && (
                    <span className="block text-sm text-muted">
                      {p.credit}
                    </span>
                  )}
                  {p.description && (
                    <span className="block text-muted text-sm leading-relaxed max-w-2xl">
                      {p.description}
                    </span>
                  )}
                </span>
              </figcaption>
            </figure>
          </Reveal>
        </li>
      ))}
    </ol>
  );
}
