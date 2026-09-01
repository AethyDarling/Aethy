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

  const index = [
    {
      href: "/gallery/",
      n: "01",
      title: "Work",
      text: "Finished pieces, studies, and reference sheets.",
    },
    {
      href: "/process/",
      n: "02",
      title: "Process",
      text: "Stage-by-stage breakdowns — construction first, then line, colour, and light.",
    },
    {
      href: "/characters/",
      n: "03",
      title: "Characters",
      text: "Reference sheets, anatomy passes, and the lore behind them.",
    },
    {
      href: "/commissions/",
      n: "04",
      title: "Commissions",
      text: open
        ? "Currently open — tiers, terms, and how to book."
        : "Currently closed — see what I offer and get in touch.",
      status: open,
    },
    {
      href: "/about/",
      n: "05",
      title: "About",
      text: "Background, specialties, and where to find me.",
    },
  ];

  return (
    <>
      <Hero />

      {/* Selected work */}
      <section className="container-page pt-24 sm:pt-32">
        <Reveal>
          <SectionHeading label="01 — Selected work" title="Featured">
            <Link
              href="/gallery/"
              className="draw-link font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted hover:text-bone shrink-0 mb-2"
            >
              All work →
            </Link>
          </SectionHeading>
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {featured.length > 0
            ? featured.slice(0, 6).map((f, i) => (
                <Reveal key={f.file} delay={i * 0.08}>
                  <Link href="/gallery/" className="group block">
                    <span className="trace block overflow-hidden border border-line">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={`/art/featured/${f.file}`}
                        alt={f.title}
                        loading="lazy"
                        className="trace-img w-full aspect-[4/5] object-cover"
                      />
                    </span>
                    <span className="flex items-baseline justify-between gap-4 pt-3">
                      <span className="text-sm text-bone">{f.title}</span>
                      <span className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-muted group-hover:text-bone transition-colors">
                        View
                      </span>
                    </span>
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

      {/* Site index — large list rows, hairline-divided. */}
      <section className="container-page pt-24 sm:pt-32" aria-label="Site index">
        <Reveal>
          <p className="label-caps text-muted mb-2">02 — Index</p>
        </Reveal>
        <div className="border-t border-line">
          {index.map((item, i) => (
            <Reveal key={item.href} delay={i * 0.05}>
              <Link
                href={item.href}
                className="index-row group grid sm:grid-cols-[4rem_1fr_auto] items-baseline gap-x-6 gap-y-1 py-7 sm:py-9 border-b border-line"
              >
                <span className="font-mono text-[0.65rem] text-muted pt-1">
                  {item.n}
                </span>
                <span>
                  <span className="font-display text-3xl sm:text-4xl lg:text-5xl text-bone leading-none inline-flex items-center gap-4">
                    {item.title}
                    {"status" in item && (
                      <span
                        aria-hidden
                        className={`inline-block w-2 h-2 rounded-full ${
                          item.status ? "bg-mint" : "bg-rust"
                        }`}
                      />
                    )}
                  </span>
                  <span className="block text-muted text-sm leading-relaxed mt-2 max-w-lg">
                    {item.text}
                  </span>
                </span>
                <span
                  aria-hidden
                  className="index-arrow hidden sm:block font-display text-2xl text-bone self-center"
                >
                  →
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Contact band */}
      <section className="container-page pt-24 sm:pt-32">
        <Reveal>
          <div className="text-center py-16 sm:py-24 border border-line">
            <p className="label-caps text-muted mb-6">
              {open ? "Booking now" : "Inquiries"}
            </p>
            <h2 className="font-display text-4xl sm:text-6xl text-bone leading-[0.95] mb-8">
              Let&rsquo;s build something
            </h2>
            <a
              href={`mailto:${site.email}?subject=${encodeURIComponent("Commission inquiry")}`}
              className="draw-link font-mono text-sm sm:text-base tracking-[0.15em] text-bone"
            >
              {site.email}
            </a>
          </div>
        </Reveal>
      </section>
    </>
  );
}
