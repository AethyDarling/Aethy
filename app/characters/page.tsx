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
    <div className="container-page pt-16 sm:pt-24">
      <SectionHeading label="01 — The cast" title="Characters" />
      <CharacterIndex characters={characters} />
    </div>
  );
}
