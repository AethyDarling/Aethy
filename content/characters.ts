// =============================================================================
// CHARACTERS — one entry per character, matching one folder per character
// inside  public/art/characters/
//
// HOW TO ADD A CHARACTER:
//   1. Create their folder:  public/art/characters/<character-name>/
//      (lowercase, hyphens instead of spaces — see the _README.md in that folder)
//   2. Drop their reference sheets / art into that folder.
//   3. Copy the example entry below (the whole { ... }, block) and paste it
//      after the last entry, then edit each line.
//
// Rules that keep the file from breaking:
//   - Text always goes between quotes:  "like this"
//   - true / false do NOT get quotes
//   - Every line inside an entry ends with a comma
// =============================================================================

/** One image belonging to a character. (Shape definition — don't edit.) */
export type CharacterImage = {
  /** Filename inside that character's folder — must match exactly, including .jpg/.png */
  file: string;
  /** A short label for this image, e.g. "Reference sheet" or "Winter outfit". */
  label: string;
  /** true if THIS image is adult (blurred/gated), false otherwise. */
  nsfw: boolean;
};

/** One character. (Shape definition — don't edit.) */
export type Character = {
  /** The character's folder name inside public/art/characters/ — must match the folder exactly. */
  folder: string;
  /** The character's display name, as visitors should see it. */
  name: string;
  /** A paragraph introducing the character — who they are, their story, whatever you want shown. */
  description: string;
  /** Which image (by filename, from the images list below) to use as this character's thumbnail. */
  thumbnail: string;
  /** true if the character as a whole is adult-only — hides the entire character behind the gate. Individual images also have their own nsfw flag. */
  nsfw: boolean;
  /** The character's images, in the order they should appear. Each is a { ... }, block. */
  images: CharacterImage[];
};

/**
 * All your characters. The example below matches the example-character
 * template folder — replace it with your first real character.
 */
export const characters: Character[] = [
  {
    // Folder name inside public/art/characters/ — must match exactly.
    folder: "example-character",

    // Display name, however you like it capitalized.
    name: "Example Character",

    // Their introduction. Multiple sentences are fine; keep it all inside the quotes.
    description: "A placeholder character showing how entries work. Replace me with someone real.",

    // Filename (from the images list below) used as the thumbnail on the characters page.
    thumbnail: "portrait.jpg",

    // true hides the ENTIRE character behind the adult gate. false shows them normally.
    nsfw: false,

    // The character's images. Copy a { ... }, block to add more.
    images: [
      {
        file: "ref-sheet.png",          // filename inside this character's folder
        label: "Reference sheet",       // caption shown with the image
        nsfw: false,                    // true if this specific image is adult
      },
      {
        file: "portrait.jpg",
        label: "Portrait",
        nsfw: false,
      },
    ],
  },

  // 👉 Paste your next character here, as another { ... }, block just like the one above.
];
