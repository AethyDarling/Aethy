"use client";

import { useState } from "react";
import type { Character } from "@/content/characters";
import { useNsfw } from "@/components/NsfwContext";
import Reveal from "@/components/Reveal";

// One character's page. If the character itself is 18+ and the gate is off,
// nothing but a notice renders — no images mount, nothing preloads.
// Individual 18+ images inside a SFW character behave the same way.
export default function CharacterDetail({ character }: { character: Character }) {
  const { showNsfw, setShowNsfw } = useNsfw();
  const c = character;
  const [active, setActive] = useState(0);

  if (c.nsfw && !showNsfw) {
    return (
      <div className="border border-line bg-surface p-10 mt-8 text-center max-w-xl mx-auto">
        <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-mint mb-3">
          18+ character
        </p>
        <p className="text-muted text-sm leading-relaxed mb-6">
          This character's page is adult-only. Turn on the 18+ toggle to view it.
        </p>
        <button
          onClick={() => setShowNsfw(true)}
          className="border border-mint text-mint font-mono text-xs uppercase tracking-[0.2em] px-6 py-3 hover:bg-mint hover:text-ink transition-colors"
        >
          I'm 18+, show me
        </button>
      </div>
    );
  }

  const images = c.images.filter((img) => showNsfw || !img.nsfw);
  const current = images[Math.min(active, Math.max(images.length - 1, 0))];
  const lore = c.description.startsWith("[EDIT")
    ? "Lore coming soon."
    : c.description;

  return (
    <div className="grid lg:grid-cols-[7fr_5fr] gap-10 mt-8">
      {/* Image viewer */}
      <div>
        {current ? (
          <div className="relative border border-line bg-surface">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`/art/characters/${c.folder}/${current.file}`}
              alt={`${c.name} — ${current.label}`}
              className="w-full object-contain max-h-[75vh]"
            />
            {current.nsfw && (
              <span className="absolute top-2 right-2 font-mono text-[0.6rem] uppercase bg-ink text-mint border border-mint px-1.5 py-0.5">
                18+
              </span>
            )}
            <p className="px-4 py-2.5 border-t border-line text-sm text-muted">
              {current.label}
            </p>
          </div>
        ) : (
          <div className="art-slot aspect-[4/5]">
            <p>no viewable images for this character</p>
          </div>
        )}

        {images.length > 1 && (
          <div className="grid grid-cols-5 gap-2 mt-3">
            {images.map((img, i) => (
              <button
                key={img.file}
                onClick={() => setActive(i)}
                aria-label={`View ${img.label}`}
                aria-current={i === active}
                className={`relative border transition-colors ${
                  i === active ? "border-amber" : "border-line hover:border-muted"
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`/art/characters/${c.folder}/${img.file}`}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="w-full aspect-square object-cover"
                />
                {img.nsfw && (
                  <span className="absolute top-0.5 right-0.5 font-mono text-[0.5rem] uppercase bg-ink text-mint px-0.5">
                    18+
                  </span>
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Name, species, lore */}
      <Reveal>
        <div className="lg:sticky lg:top-20">
          <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-amber mb-2">
            character file
          </p>
          <h1 className="font-display text-4xl sm:text-5xl text-bone">{c.name}</h1>
          {c.species && !c.species.startsWith("[EDIT") && (
            <p className="font-mono text-sm text-mint mt-2">{c.species}</p>
          )}
          <div className="rule-ticks my-6" aria-hidden />
          <div className="text-muted text-sm leading-relaxed space-y-4">
            {lore.split("\n\n").map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </div>
      </Reveal>
    </div>
  );
}
