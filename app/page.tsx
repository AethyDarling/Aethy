import fs from "node:fs";
import path from "node:path";
import Link from "next/link";
import { site } from "@/content/site";
import { commissions } from "@/content/commissions";
import Hero from "@/components/hero/Hero";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";

export default function HomePage() {
  // Featured pieces: SFW only, and only files that actually exist —
  // the homepage never renders adult work and never invents imagery.
  const dir = path.join(process.cwd(), "public", "art", "featured");
  const featured = site.featured
    .filter((f) => !f.nsfw)
    .filter((f) => fs.existsSync(path.join(dir, f.file)));
  const open = commissions.commissionsOpen;

  return (
    <>
      <Hero />

      {/* Featured strip */}
      <section className="max-w-6xl mx-auto px-5 pt-20">
        <Reveal>
          <SectionHeading fig="fig. 01 — selected work" title="Featured">
            <Link
              href="/gallery/"
              className="draw-link text-sm text-amber shrink-0 mb-1"
            >
              Full gallery →
            </Link>
          </SectionHeading>
        </Reveal>
        <div className="grid sm:grid-cols-3 gap-4">
          {featured.length > 0
            ? featured.slice(0, 6).map((f, i) => (
                <Reveal key={f.file} delay={i * 0.08}>
                  <Link
                    href="/gallery/"
                    className="trace relative block border border-line bg-surface"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`/art/featured/${f.file}`}
                      alt={f.title}
                      loading="lazy"
                      className="w-full aspect-[4/5] object-cover"
                    />
                    <p className="px-3 py-2.5 text-sm text-muted">{f.title}</p>
                  </Link>
                </Reveal>
              ))
            : [1, 2, 3].map((i) => (
                <Reveal key={i} delay={i * 0.08}>
                  <div className="art-slot aspect-[4/5]">
                    <p>
                      featured slot {i}
                      <br />
                      <span className="normal-case tracking-normal">
                        drop an image in /public/art/featured/ and list it in
                        content/site.ts
                      </span>
                    </p>
                  </div>
                </Reveal>
              ))}
        </div>
      </section>

      {/* Commission status + paths */}
      <section className="max-w-6xl mx-auto px-5 pt-20">
        <div className="grid md:grid-cols-2 gap-4">
          <Reveal>
            <Link
              href="/commissions/"
              className="trace relative block border border-line bg-surface p-8 h-full"
            >
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-amber mb-3">
                fig. 02 — commissions
              </p>
              <div className="flex items-center gap-3 mb-3">
                <span
                  aria-hidden
                  className={`inline-block w-2.5 h-2.5 ${open ? "bg-mint" : "bg-rust"}`}
                />
                <h2 className="font-display text-2xl text-bone">
                  {open ? "Commissions are open" : "Commissions are closed"}
                </h2>
              </div>
              <p className="text-muted text-sm leading-relaxed">
                {open
                  ? "Slots are available — tiers, prices, and terms are one click away."
                  : "Not taking new work right now. Prices and terms are still up so you can plan ahead."}
              </p>
            </Link>
          </Reveal>
          <Reveal delay={0.1}>
            <Link
              href="/characters/"
              className="trace relative block border border-line bg-surface p-8 h-full"
            >
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-amber mb-3">
                fig. 03 — cast
              </p>
              <h2 className="font-display text-2xl text-bone mb-3">Characters</h2>
              <p className="text-muted text-sm leading-relaxed">
                Reference sheets, anatomy passes, and the lore behind the
                bodies I keep drawing.
              </p>
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
