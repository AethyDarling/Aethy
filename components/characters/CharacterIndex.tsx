"use client";

import Link from "next/link";
import type { Character } from "@/content/characters";
import { useNsfw } from "@/components/NsfwContext";
import Reveal from "@/components/Reveal";

// Character cards. A character flagged nsfw at the top level is entirely
// absent (card, name, thumbnail) until the visitor confirms 18+.
export default function CharacterIndex({
  characters,
}: {
  characters: Character[];
}) {
  const { showNsfw } = useNsfw();
  const visible = characters.filter((c) => showNsfw || !c.nsfw);

  if (visible.length === 0) {
    return (
      <div className="art-slot aspect-[3/1]">
        <p>
          no characters to show
          <br />
          <span className="normal-case tracking-normal">
            add folders in /public/art/characters/ and entries in
            content/characters.ts
          </span>
        </p>
      </div>
    );
  }

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
      {visible.map((c, i) => {
        // Thumbnail must itself be SFW-safe: if the chosen thumbnail image
        // is flagged nsfw and the gate is off, fall back to any SFW image.
        const thumbEntry =
          c.images.find((img) => img.file === c.thumbnail && (showNsfw || !img.nsfw)) ??
          c.images.find((img) => showNsfw || !img.nsfw);
        return (
          <Reveal key={c.folder} delay={i * 0.06}>
            <Link href={`/characters/${c.folder}/`} className="group block">
              <span className="trace relative block border border-line">
                {thumbEntry ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={`/art/characters/${c.folder}/${thumbEntry.file}`}
                    alt={thumbEntry.label ? `${c.name} — ${thumbEntry.label}` : c.name}
                    loading="lazy"
                    decoding="async"
                    className="trace-img w-full aspect-[4/5] object-cover"
                  />
                ) : (
                  <span className="art-slot aspect-[4/5] block">
                    <p>no SFW preview</p>
                  </span>
                )}
              </span>
              <span className="flex items-baseline justify-between gap-3 pt-3">
                <span className="font-display italic text-xl text-bone">
                  {c.name}
                  {c.nsfw && (
                    <span className="ml-2 align-middle font-mono text-[0.55rem] uppercase text-mint border border-mint px-1">
                      18+
                    </span>
                  )}
                </span>
                {c.species && !c.species.startsWith("[EDIT") && (
                  <span className="font-mono text-[0.6rem] uppercase tracking-[0.15em] text-muted">
                    {c.species}
                  </span>
                )}
              </span>
            </Link>
          </Reveal>
        );
      })}
    </div>
  );
}
