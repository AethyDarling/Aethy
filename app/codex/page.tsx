import type { Metadata } from "next";
import { site } from "@/content/site";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Aether Codex",
  description:
    "The Aether Codex — Aethy's fully custom, physics-based magic system: technical concept work outside the art sphere.",
};

// What the codex demonstrates — technical concept work, deliberately
// separate from the artwork: this is systems design, not illustration.
const facets = [
  {
    n: "01",
    title: "Physics-first system design",
    text: "Magic built the way physics is written: defined principles, costs, and constraints, with behavior derived from the rules instead of decreed case by case.",
  },
  {
    n: "02",
    title: "Unique in its application",
    text: "Not a reskinned spell list — the system's uses emerge from its mechanics, which is what makes them surprising and what keeps them consistent.",
  },
  {
    n: "03",
    title: "Rigor & documentation",
    text: "The whole thing is specified, not implied: edge cases considered, interactions defined, and the reasoning written down so the system can be tested against itself.",
  },
];

export default function CodexPage() {
  const url = site.codex.url;
  const linkReady = url.startsWith("https://") && !url.includes("EDIT-ME");

  return (
    <div className="container-page pt-16 sm:pt-24">
      <SectionHeading label="01 — Technical concept work" title="Aether Codex">
        {linkReady && (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="draw-link font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted hover:text-bone shrink-0 mb-2"
          >
            aethercodex.org ↗
          </a>
        )}
      </SectionHeading>

      <div className="grid lg:grid-cols-[7fr_4fr] gap-14 lg:gap-20">
        <div>
          <Reveal>
            <div className="text-bone leading-relaxed space-y-6 max-w-2xl">
              {site.codex.blurb.split("\n\n").map((para, i) => (
                <p
                  key={i}
                  className={i === 0 ? "text-xl sm:text-2xl leading-snug" : "text-muted"}
                >
                  {para}
                </p>
              ))}
            </div>
          </Reveal>

          <div className="mt-20">
            <Reveal>
              <p className="label-caps text-muted mb-2">02 — What it demonstrates</p>
            </Reveal>
            <div className="border-t border-line max-w-2xl">
              {facets.map((f, i) => (
                <Reveal key={f.n} delay={i * 0.05}>
                  <div className="grid sm:grid-cols-[4rem_1fr] gap-x-6 gap-y-1 py-6 border-b border-line">
                    <p className="font-mono text-[0.65rem] text-muted pt-1.5">{f.n}</p>
                    <div>
                      <h2 className="font-display text-xl sm:text-2xl text-bone mb-2">
                        {f.title}
                      </h2>
                      <p className="text-muted text-sm leading-relaxed">{f.text}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        <Reveal delay={0.1}>
          <div className="lg:sticky lg:top-28 border-t border-line lg:border lg:border-line lg:p-8 pt-8">
            <p className="label-caps text-muted mb-6">03 — Visit</p>
            <p className="text-muted text-sm leading-relaxed mb-8">
              The codex lives on its own site, built to be read — this page is
              just the doorway.
            </p>
            {linkReady ? (
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block border border-bone bg-bone text-ink font-mono text-xs uppercase tracking-[0.25em] px-8 py-4 hover:bg-transparent hover:text-bone transition-colors"
              >
                Enter the codex ↗
              </a>
            ) : (
              <p className="inline-block border border-line text-muted font-mono text-xs uppercase tracking-[0.25em] px-8 py-4">
                Link coming soon
              </p>
            )}
          </div>
        </Reveal>
      </div>
    </div>
  );
}
