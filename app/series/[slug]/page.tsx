import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { gallery, series, seriesLabel } from "@/content/gallery";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import SeriesPlates from "@/components/gallery/SeriesPlates";

// A series page: one body of work, its pieces stacked oldest-first so the
// sequence reads as the design developed, with one paragraph of intent.
// Adult pieces are handled client-side by SeriesPlates, which never mounts
// them ahead of consent.

export function generateStaticParams() {
  return series.map((s) => ({ slug: s.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const s = series.find((x) => x.id === slug);
  if (!s) return {};
  return {
    title: seriesLabel(s),
    description: `A series by Aethy. ${s.intro}`,
  };
}

export default async function SeriesPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const s = series.find((x) => x.id === slug);
  if (!s) notFound();

  const pieces = gallery
    .filter((p) => p.series === s.id)
    .sort((a, b) => (a.date < b.date ? -1 : 1));
  const idx = series.findIndex((x) => x.id === s.id);
  const prev = idx > 0 ? series[idx - 1] : null;
  const next = idx < series.length - 1 ? series[idx + 1] : null;

  return (
    <div className="container-page pt-16 sm:pt-24">
      <Link
        href="/gallery/"
        className="draw-link font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted hover:text-bone"
      >
        ← All work
      </Link>
      <div className="mt-10">
        <SectionHeading label={`${pieces.length} pieces`} title={seriesLabel(s)} />
      </div>

      <Reveal>
        <p className="text-bone text-lg sm:text-xl leading-relaxed max-w-2xl mb-14 sm:mb-20">
          {s.intro}
        </p>
      </Reveal>

      <SeriesPlates pieces={pieces} />

      {/* Prev / next series — the chaining convention between bodies of work. */}
      <nav
        aria-label="Other series"
        className="flex items-baseline justify-between gap-6 border-t border-line pt-8 mt-20"
      >
        {prev ? (
          <Link
            href={`/series/${prev.id}/`}
            className="draw-link font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted hover:text-bone"
          >
            ← {seriesLabel(prev)}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link
            href={`/series/${next.id}/`}
            className="draw-link font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted hover:text-bone"
          >
            {seriesLabel(next)} →
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </div>
  );
}
