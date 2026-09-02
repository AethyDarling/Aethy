// =============================================================================
// CHARACTERS; one entry per character, matching one folder per character
// inside  public/art/characters/
//
// HOW TO ADD A CHARACTER:
//   1. Create their folder:  public/art/characters/<character-name>/
//      (lowercase, hyphens instead of spaces; see the _README.md in that folder)
//   2. Drop their reference sheets / art into that folder.
//   3. Copy the aethy entry below (the whole { ... }, block) and paste it
//      after the last entry, then edit each line.
//
// Rules that keep the file from breaking:
//   - Text always goes between quotes:  "like this"
//   - true / false do NOT get quotes
//   - Every line inside an entry ends with a comma
// =============================================================================

/** One image belonging to a character. (Shape definition; don't edit.) */
export type CharacterImage = {
  /** Filename inside that character's folder; must match exactly, including .jpg/.png/.webp */
  file: string;
  /** Optional. Images are shown unlabelled (just "Plate 01", "Plate 02", …); if given, used only as accessible alt text. */
  label?: string;
  /** true if THIS image is adult (hidden until the visitor confirms 18+), false otherwise. */
  nsfw: boolean;
};

/** One character. (Shape definition; don't edit.) */
export type Character = {
  /** The character's folder name inside public/art/characters/; must match the folder exactly. Also becomes their page address, e.g. /characters/aethy/ */
  folder: string;
  /** The character's display name, as visitors should see it. */
  name: string;
  /** The character's species, shown under their name. Can be "" if you'd rather not say. */
  species: string;
  /** A paragraph (or several; use \n\n between them) introducing the character: who they are, their story, their lore. */
  description: string;
  /** Which image (by filename, from the images list below) to use as this character's thumbnail on the index page. */
  thumbnail: string;
  /** true if the character as a whole is adult-only; hides the entire character until the visitor confirms 18+. Individual images also have their own nsfw flag. */
  nsfw: boolean;
  /** The character's images, in the order they should appear. Each is a { ... }, block. */
  images: CharacterImage[];
};

/**
 * All your characters. The aethy entry below points at the real files in
 * public/art/characters/aethy/; edit the [EDIT ME] text with your own
 * species/lore whenever.
 */
export const characters: Character[] = [
  {
    // Folder name inside public/art/characters/; must match exactly.
    folder: "aethy",

    // Display name, however you like it capitalized.
    name: "Aethy",

    // Species shown under the name. [EDIT ME]
    species: "Proto Gal!",

    // Their introduction. Multiple paragraphs are fine; keep it all inside
    // the quotes and use \n\n for a paragraph break. [EDIT ME]
    description: "Aethy is my main mascot, she has been here to help my anatomy development for the last few years!",

    // Filename (from the images list below) used as the thumbnail on the characters page.
    thumbnail: "aethy-character-example-7.webp",

    // true hides the ENTIRE character behind the 18+ gate. false shows them normally.
    nsfw: false,

    // The character's images. Copy a { ... }, block to add more.
    images: [
      {
        file: "aethy-character-example-7.webp",
        nsfw: false,
      },
      {
        file: "aethy-character-example-6.webp",
        nsfw: false,
      },
      {
        file: "aethy-character-example-8.webp",
        nsfw: false,
      },
      {
        file: "aethy-character-example-9.webp",
        nsfw: false,
      },
      {
        file: "aethy-character-example-10.webp",
        nsfw: false,
      },
      {
        file: "aethy-character-example-5.webp",
        nsfw: false,
      },
      // The gesture / lines / flats / light stages of the crawl study are
      // shown as a step-through breakdown on the Process page instead
      // (see content/process.ts). To also list them here as plain images,
      // add entries for aethy-character-example-1 … -4.webp.
    ],
  },

  // 👉 Paste your next character here, as another { ... }, block just like the one above.
];
