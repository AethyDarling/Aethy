import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { characters } from "@/content/characters";
import CharacterDetail from "@/components/characters/CharacterDetail";

export function generateStaticParams() {
  return characters.map((c) => ({ slug: c.folder }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const c = characters.find((x) => x.folder === slug);
  if (!c) return {};
  // NSFW-flagged characters get no descriptive metadata beyond the name,
  // and never an image.
  return {
    title: c.name,
    description: c.nsfw
      ? `${c.name}, character page.`
      : `${c.name}, character reference and lore by Aethy.`,
  };
}

export default async function CharacterPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const character = characters.find((x) => x.folder === slug);
  if (!character) notFound();

  return (
    <div className="container-page pt-16 sm:pt-24">
      <Link
        href="/characters/"
        className="draw-link text-sm text-muted hover:text-bone"
      >All characters
      </Link>
      <CharacterDetail character={character} />
    </div>
  );
}
