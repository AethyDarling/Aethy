import type { Metadata } from "next";
import { commissions } from "@/content/commissions";
import { site } from "@/content/site";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import TierExamples from "@/components/commissions/TierExamples";

export const metadata: Metadata = {
  title: "Commissions",
  description:
    "Commission tiers, prices, and terms for Aethy — freelance concept artist.",
};

export default function CommissionsPage() {
  const c = commissions;
  const open = c.commissionsOpen;
  const mailto = `mailto:${site.email}?subject=${encodeURIComponent(
    "Commission inquiry"
  )}`;
  // Sections the artist hasn't written yet stay off the page entirely,
  // so it reads as finished at every stage of being filled in.
  const hasDetails =
    c.tiers.length > 0 ||
    c.terms.length > 0 ||
    c.willDraw.length > 0 ||
    c.wontDraw.length > 0 ||
    Boolean(c.pricingSheetImage);

  return (
    <div className="container-page pt-16 sm:pt-24">
      <SectionHeading label="01 — Work with me" title="Commissions">
        <span className="inline-flex items-center gap-2.5 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted mb-2 shrink-0">
          <span
            aria-hidden
            className={`w-2 h-2 rounded-full ${open ? "bg-mint" : "bg-rust"}`}
          />
          {open ? "Open" : "Closed"}
        </span>
      </SectionHeading>

      <Reveal>
        <p className="text-bone text-lg sm:text-xl leading-relaxed max-w-2xl mb-16 sm:mb-20">
          {open
            ? c.howToOrder
            : hasDetails
              ? "Commissions are currently closed — the details below are kept up to date so you can plan for the next opening. Follow my socials for the announcement."
              : "Commissions are currently closed. Follow my socials for the announcement when they reopen."}
        </p>
      </Reveal>

      {/* Optional pricing-sheet graphic supplied by the artist. */}
      {c.pricingSheetImage && (
        <Reveal>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`/art/commissions/${c.pricingSheetImage}`}
            alt="Commission pricing sheet"
            className="w-full border border-line mb-16"
          />
        </Reveal>
      )}

      {/* Tiers — hidden until prices are written in content/commissions.ts */}
      {c.tiers.length > 0 && (
        <div className="grid md:grid-cols-3 gap-6 mb-20">
          {c.tiers.map((tier, i) => (
            <Reveal key={tier.name} delay={i * 0.08}>
              <div className="trace border border-line p-8 h-full flex flex-col">
                <p className="font-mono text-[0.65rem] text-muted mb-4">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h2 className="font-display text-2xl sm:text-3xl text-bone">
                  {tier.name}
                </h2>
                {typeof tier.priceFrom === "number" ? (
                  <p className="font-mono text-lg text-bone mt-2 mb-4">
                    {tier.currency ?? ""}
                    {tier.priceFrom}
                    <span className="text-muted text-xs ml-2 uppercase tracking-[0.1em]">
                      from
                    </span>
                  </p>
                ) : tier.priceNote ? (
                  <p className="font-mono text-sm text-muted mt-2 mb-4">
                    {tier.priceNote}
                  </p>
                ) : (
                  <span className="block mb-4" />
                )}
                <p className="text-muted text-sm leading-relaxed mb-6">
                  {tier.description}
                </p>
                <TierExamples examples={tier.examples} tierName={tier.name} />
              </div>
            </Reveal>
          ))}
        </div>
      )}

      {/* Will / won't draw — each column appears only once it has entries */}
      {(c.willDraw.length > 0 || c.wontDraw.length > 0) && (
        <div className="grid md:grid-cols-2 gap-x-16 gap-y-10 mb-20 max-w-4xl">
          {c.willDraw.length > 0 && (
            <Reveal>
              <div className="border-t border-line pt-6">
                <h2 className="label-caps text-bone mb-6">I will draw</h2>
                <ul className="space-y-3">
                  {c.willDraw.map((item) => (
                    <li key={item} className="text-sm text-muted flex gap-4">
                      <span aria-hidden className="text-bone">＋</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          )}
          {c.wontDraw.length > 0 && (
            <Reveal delay={0.08}>
              <div className="border-t border-line pt-6">
                <h2 className="label-caps text-rust mb-6">I won't draw</h2>
                <ul className="space-y-3">
                  {c.wontDraw.map((item) => (
                    <li key={item} className="text-sm text-muted flex gap-4">
                      <span aria-hidden className="text-rust">－</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          )}
        </div>
      )}

      {/* Terms — hidden until written */}
      {c.terms.length > 0 && (
        <Reveal>
          <SectionHeading label="02 — The fine print" title="Terms" />
          <ol className="max-w-2xl space-y-4 mb-20">
            {c.terms.map((t, i) => (
              <li key={t} className="flex gap-5 text-sm text-muted leading-relaxed">
                <span className="font-mono text-[0.65rem] text-bone pt-0.5 shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {t}
              </li>
            ))}
          </ol>
        </Reveal>
      )}

      {/* Contact CTA */}
      <Reveal>
        <div className="border border-line py-16 sm:py-24 px-8 text-center">
          <p className="label-caps text-muted mb-6">
            {open ? "Booking now" : "For when I reopen"}
          </p>
          <h2 className="font-display text-4xl sm:text-6xl text-bone leading-[0.95] mb-6">
            {open ? "Ready when you are" : "Get in line early"}
          </h2>
          <p className="text-muted text-sm mb-10 max-w-md mx-auto leading-relaxed">
            {c.tiers.length > 0
              ? "Include references and the tier you're after."
              : "Send references and what you have in mind, and I'll quote it."}
          </p>
          <a
            href={mailto}
            className="inline-block border border-bone bg-bone text-ink font-mono text-xs uppercase tracking-[0.25em] px-10 py-4 hover:bg-transparent hover:text-bone transition-colors"
          >
            {site.email}
          </a>
        </div>
      </Reveal>
    </div>
  );
}
