import type { Metadata } from "next";
import { site } from "@/content/site";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Aethy — freelance concept artist known for anatomy: figure construction, musculature, and believable bodies.",
};

const specialties = [
  {
    n: "01",
    title: "Anatomy & figure construction",
    text: "The signature. Gesture, skeleton, mass, contour — every body starts from structure, so every body holds up.",
  },
  {
    n: "02",
    title: "Character design",
    text: "Anthro and creature design built to turn around: silhouettes that read, forms that a modeler or animator can trust.",
  },
  {
    n: "03",
    title: "Reference sheets",
    text: "Clear, buildable references — proportions, views, and details laid out the way another artist needs them.",
  },
  {
    n: "04",
    title: "Illustration",
    text: "Finished pieces where the underlying draftsmanship still shows through the paint.",
  },
];

export default function AboutPage() {
  const mailto = `mailto:${site.email}?subject=${encodeURIComponent("Hello")}`;
  return (
    <div className="container-page pt-16 sm:pt-24">
      <SectionHeading label="01 — The artist" title="About" />

      <div className="grid lg:grid-cols-[7fr_4fr] gap-14 lg:gap-20">
        <Reveal>
          <div className="text-bone leading-relaxed space-y-6 max-w-2xl">
            {site.bio.split("\n\n").map((para, i) => (
              <p
                key={i}
                className={i === 0 ? "text-xl sm:text-2xl leading-snug" : "text-muted"}
              >
                {para.startsWith("[EDIT") ? "" : para}
              </p>
            ))}
          </div>

          {site.credits.length > 0 && (
            <div className="mt-20">
              <p className="label-caps text-muted pb-5 border-b border-line max-w-2xl">
                Selected credits
              </p>
              <ul className="max-w-2xl">
                {site.credits.map((credit) => (
                  <li
                    key={credit}
                    className="py-4 border-b border-line text-sm text-bone"
                  >
                    {credit}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-20">
            <p className="label-caps text-muted mb-2">02 — Services</p>
            <div className="border-t border-line max-w-2xl">
              {specialties.map((s) => (
                <div
                  key={s.n}
                  className="grid sm:grid-cols-[4rem_1fr] gap-x-6 gap-y-1 py-6 border-b border-line"
                >
                  <p className="font-mono text-[0.65rem] text-muted pt-1.5">{s.n}</p>
                  <div>
                    <h2 className="font-display text-xl sm:text-2xl text-bone mb-2">
                      {s.title}
                    </h2>
                    <p className="text-muted text-sm leading-relaxed">{s.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="lg:sticky lg:top-28 border-t border-line lg:border lg:border-line lg:p-8 pt-8">
            <p className="label-caps text-muted mb-6">03 — Contact</p>
            <ul className="space-y-3 mb-10">
              {site.socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.url}
                    target={s.url.startsWith("mailto:") ? undefined : "_blank"}
                    rel="noopener noreferrer"
                    className="draw-link text-sm text-bone hover:text-muted transition-colors"
                  >
                    {s.label}
                    {s.url.includes("EDIT-ME") && (
                      <span className="font-mono text-[0.6rem] uppercase text-muted ml-2">
                        [soon]
                      </span>
                    )}
                  </a>
                </li>
              ))}
            </ul>
            <p className="text-muted text-xs mb-5 leading-relaxed">
              For commissions, collaborations, or just to say the anatomy looks
              right:
            </p>
            <a
              href={mailto}
              className="inline-block border border-bone text-bone font-mono text-xs uppercase tracking-[0.2em] px-6 py-3 hover:bg-bone hover:text-ink transition-colors"
            >
              {site.email}
            </a>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
