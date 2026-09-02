import type { Metadata } from "next";
import { site } from "@/content/site";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Aether Codex",
  description:
    "The Aether Codex, Aethy's fully custom physics-based magic system: technical concept work outside the art sphere.",
};

// What the codex covers. Technical concept work, separate from the artwork.
const facets = [
  {
    n: "01",
    title: "Physics-first system design",
    text: "A layered-field hard-magic system written the way physics is: foundations first, unified under the Grand Unified Aether Equation, with behavior derived from the rules.",
  },
  {
    n: "02",
    title: "Applied, tier by tier",
    text: "A Power Hierarchy with techniques worked out tier by tier, where the applications follow from the mechanics.",
  },
  {
    n: "03",
    title: "Reference-grade documentation",
    text: "A 439-entry Spell Directory and a full symbol glossary, specified so the system can be tested against itself.",
  },
];

export default function CodexPage() {
  const url = site.codex.url;
  const linkReady = url.startsWith("https://") && !url.includes("EDIT-ME");

  return (
    <div className="container-page pt-16 sm:pt-24">
      <SectionHeading title="Aether Codex">
        {linkReady && (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="draw-link font-sans text-[0.65rem] uppercase tracking-[0.08em] text-muted hover:text-bone shrink-0 mb-2"
          >
            aethercodex.org</a>
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
              <h2 className="font-display text-2xl text-bone pb-4">What it covers</h2>
            </Reveal>
            <div className="border-t border-line max-w-2xl">
              {facets.map((f, i) => (
                <Reveal key={f.n} delay={i * 0.05}>
                  <div className="grid sm:grid-cols-[4rem_1fr] gap-x-6 gap-y-1 py-6 border-b border-line">
                    <div className="sm:col-span-2">
                      <h3 className="font-display text-xl sm:text-2xl text-bone mb-2">
                        {f.title}
                      </h3>
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
            <h2 className="font-display text-2xl text-bone mb-6">Visit</h2>
            <p className="text-muted text-sm leading-relaxed mb-8">
              The codex lives on its own site. This page links to it.
            </p>
            {linkReady ? (
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block border border-bone bg-bone text-ink font-sans text-xs uppercase tracking-[0.08em] px-8 py-4 hover:bg-transparent hover:text-bone transition-colors"
              >
                Open aethercodex.org</a>
            ) : (
              <p className="inline-block border border-line text-muted font-sans text-xs uppercase tracking-[0.08em] px-8 py-4">
                Link coming soon
              </p>
            )}
          </div>
        </Reveal>
      </div>
    </div>
  );
}
