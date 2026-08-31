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
    <div className="max-w-6xl mx-auto px-5 pt-14">
      <SectionHeading fig="fig. 01 — the artist" title="About" />

      <div className="grid lg:grid-cols-[7fr_5fr] gap-12">
        <Reveal>
          <div className="text-bone leading-relaxed space-y-5 max-w-2xl">
            {site.bio.split("\n\n").map((para, i) => (
              <p key={i} className={i === 0 ? "text-lg" : "text-muted text-sm"}>
                {para.startsWith("[EDIT") ? "" : para}
              </p>
            ))}
          </div>

          <div className="mt-14">
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-amber mb-6">
              fig. 02 — what I do
            </p>
            <div className="grid sm:grid-cols-2 gap-4 max-w-2xl">
              {specialties.map((s) => (
                <div key={s.n} className="border border-line p-5">
                  <p className="font-mono text-[0.65rem] text-amber mb-2">{s.n}</p>
                  <h2 className="font-display text-lg text-bone mb-2">{s.title}</h2>
                  <p className="text-muted text-sm leading-relaxed">{s.text}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="lg:sticky lg:top-20 border border-line bg-surface p-7">
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-amber mb-5">
              fig. 03 — find me
            </p>
            <ul className="space-y-3 mb-8">
              {site.socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.url}
                    target={s.url.startsWith("mailto:") ? undefined : "_blank"}
                    rel="noopener noreferrer"
                    className="draw-link text-sm text-bone hover:text-amber transition-colors"
                  >
                    {s.label}
                    {s.url.includes("EDIT-ME") && (
                      <span className="font-mono text-[0.6rem] text-rust ml-2">
                        [link coming soon]
                      </span>
                    )}
                  </a>
                </li>
              ))}
            </ul>
            <div className="rule-ticks mb-6" aria-hidden />
            <p className="text-muted text-xs mb-4">
              For commissions, collabs, or just to say the anatomy looks right:
            </p>
            <a
              href={mailto}
              className="inline-block border border-amber text-amber font-mono text-xs uppercase tracking-[0.2em] px-6 py-3 hover:bg-amber hover:text-ink transition-colors"
            >
              {site.email}
            </a>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
