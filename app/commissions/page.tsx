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
    <div className="max-w-6xl mx-auto px-5 pt-14">
      <SectionHeading fig="fig. 01 — work with me" title="Commissions">
        <span
          className={`inline-flex items-center gap-2 font-mono text-[0.65rem] uppercase tracking-[0.2em] border px-3 py-1.5 mb-1 shrink-0 ${
            open ? "border-mint text-mint" : "border-rust text-rust"
          }`}
        >
          <span aria-hidden className={`w-2 h-2 ${open ? "bg-mint" : "bg-rust"}`} />
          {open ? "open" : "closed"}
        </span>
      </SectionHeading>

      <Reveal>
        <p className="text-muted max-w-2xl leading-relaxed mb-12">
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
            className="w-full border border-line mb-12"
          />
        </Reveal>
      )}

      {/* Tiers — hidden until prices are written in content/commissions.ts */}
      {c.tiers.length > 0 && (
        <div className="grid md:grid-cols-3 gap-4 mb-16">
          {c.tiers.map((tier, i) => (
            <Reveal key={tier.name} delay={i * 0.08}>
              <div className="trace relative border border-line bg-surface p-6 h-full flex flex-col">
                <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-amber mb-2">
                  tier {String(i + 1).padStart(2, "0")}
                </p>
                <h2 className="font-display text-2xl text-bone">{tier.name}</h2>
                {typeof tier.priceFrom === "number" ? (
                  <p className="font-mono text-lg text-mint mt-1 mb-3">
                    {tier.currency ?? ""}
                    {tier.priceFrom}
                    <span className="text-muted text-xs ml-1">from</span>
                  </p>
                ) : tier.priceNote ? (
                  <p className="font-mono text-sm text-mint mt-1 mb-3">
                    {tier.priceNote}
                  </p>
                ) : (
                  <span className="block mb-3" />
                )}
                <p className="text-muted text-sm leading-relaxed mb-5">
                  {tier.description}
                </p>
                <TierExamples examples={tier.examples} tierName={tier.name} />
              </div>
            </Reveal>
          ))}
        </div>
      )}

      {/* Will / won't draw — each card appears only once it has entries */}
      {(c.willDraw.length > 0 || c.wontDraw.length > 0) && (
        <div className="grid md:grid-cols-2 gap-4 mb-16">
          {c.willDraw.length > 0 && (
            <Reveal>
              <div className="border border-line p-6 h-full">
                <h2 className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-mint mb-4">
                  I will draw
                </h2>
                <ul className="space-y-2">
                  {c.willDraw.map((item) => (
                    <li key={item} className="text-sm text-bone flex gap-3">
                      <span aria-hidden className="text-mint">＋</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          )}
          {c.wontDraw.length > 0 && (
            <Reveal delay={0.08}>
              <div className="border border-line p-6 h-full">
                <h2 className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-rust mb-4">
                  I won't draw
                </h2>
                <ul className="space-y-2">
                  {c.wontDraw.map((item) => (
                    <li key={item} className="text-sm text-bone flex gap-3">
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
          <SectionHeading fig="fig. 02 — the fine print" title="Terms of service" />
          <ol className="max-w-2xl space-y-3 mb-16">
            {c.terms.map((t, i) => (
              <li key={t} className="flex gap-4 text-sm text-muted leading-relaxed">
                <span className="font-mono text-[0.65rem] text-amber pt-0.5 shrink-0">
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
        <div className="border border-amber p-8 sm:p-10 text-center mb-4">
          <h2 className="font-display text-2xl text-bone mb-2">
            {open ? "Ready when you are" : "For when I reopen"}
          </h2>
          <p className="text-muted text-sm mb-6">
            {site.email} —{" "}
            {c.tiers.length > 0
              ? "include references and the tier you're after."
              : "send references and what you have in mind, and I'll quote it."}
          </p>
          <a
            href={mailto}
            className="inline-block border border-amber text-amber font-mono text-xs uppercase tracking-[0.25em] px-8 py-4 hover:bg-amber hover:text-ink transition-colors"
          >
            Email me
          </a>
        </div>
      </Reveal>
    </div>
  );
}
