// =============================================================================
// GALLERY — the list of every piece shown on the main gallery page.
//
// HOW TO ADD A PIECE:
//   1. Drop the image file into  public/art/gallery/
//   2. Copy the example entry below (everything from the opening `{` to the
//      closing `},` — including both braces) and paste it after the last entry.
//   3. Edit each line. The notes next to each field tell you what to write.
//
// Rules that keep the file from breaking:
//   - Text always goes between quotes:  "like this"
//   - true / false and numbers do NOT get quotes
//   - Every line inside an entry ends with a comma
//   - Don't delete the lines at the very top or bottom of this file
// =============================================================================

/** One piece of art in the gallery. (This block defines the shape — don't edit it.) */
export type GalleryPiece = {
  /** The image's filename inside public/art/gallery/ — must match exactly, including .jpg/.png */
  file: string;
  /** The piece's title, shown under/over the image. */
  title: string;
  /** A sentence or two about the piece. Shown when the piece is opened. Can be "" if you have nothing to say. */
  description: string;
  /** When you finished it, as "YYYY-MM" (year and month). Used to sort the gallery, newest first. */
  date: string;
  /** Labels used for filtering, e.g. ["anatomy", "study"] — lowercase, each in its own quotes, comma between. Can be [] for none. */
  tags: string[];
  /** true if this is an adult piece (it will be blurred/gated), false if safe for everyone. EVERY adult piece MUST say true here. */
  nsfw: boolean;
};

/**
 * The gallery itself. Add one { ... } block per piece, in any order
 * (the site sorts by date). The example below is fake — replace it
 * with your first real piece.
 */
export const gallery: GalleryPiece[] = [
  {
    // The filename of the image in public/art/gallery/ — spelling and
    // capitalization must match the actual file exactly.
    file: "torso-study-03.jpg",

    // The title visitors see.
    title: "Torso Study III",

    // A short description. Keep it to a sentence or two.
    description: "Third in a series of muscle-layer studies, focusing on the obliques.",

    // Year and month you finished it, in quotes, like "2026-08".
    date: "2026-08",

    // Tags for filtering. Lowercase, in quotes, comma-separated inside the [ ].
    tags: ["anatomy", "study", "traditional"],

    // false = safe for everyone. Change to true (no quotes!) for adult pieces.
    nsfw: false,
  },

  // 👉 Paste your next piece here, as another { ... }, block just like the one above.
];
