import type { Metadata } from "next";
import { characters } from "@/content/characters";
import SectionHeading from "@/components/SectionHeading";
import CharacterIndex from "@/components/characters/CharacterIndex";

export const metadata: Metadata = {
  title: "Characters",
  description: "Aethy's characters — reference sheets, anatomy, and lore.",
};

export default function CharactersPage() {
  return (
    <div className="max-w-6xl mx-auto px-5 pt-14">
      <SectionHeading fig="fig. 01 — the cast" title="Characters" />
      <CharacterIndex characters={characters} />
    </div>
  );
}
