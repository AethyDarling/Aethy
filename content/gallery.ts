// =============================================================================
// GALLERY — the list of every piece shown on the main gallery page.
//
// HOW TO ADD A PIECE:
//   1. Drop the image file into  public/art/gallery/
//   2. Copy the example entry below (everything from the opening `{` to the
//      closing `},` — including both braces) and paste it inside the
//      `gallery` list, after the last entry.
//   3. Edit each line. The notes next to each field tell you what to write.
//
// Rules that keep the file from breaking:
//   - Text always goes between quotes:  "like this"
//   - true / false and numbers do NOT get quotes
//   - Every line inside an entry ends with a comma
//   - Don't delete the lines at the very top or bottom of this file
//
// TAGS the gallery filters by — use any of these (or invent new ones,
// they appear as filter buttons automatically):
//   "anatomy"          — figure/anatomy studies (your signature — use it!)
//   "character design" — character concepts and designs
//   "illustration"     — finished illustrative pieces
//   "reference sheet"  — character reference sheets
//   "wip"              — works in progress / process shots
//   "sketchbook"       — rough studies and sketches (a home for loose work)
//
// SERIES group related pieces into a body of work with its own page
// (e.g. construction → flats of one design). Define the series in the
// `series` list below, then put its id in each piece's `series` field.
// =============================================================================

/** One piece of art in the gallery. (This block defines the shape — don't edit it.) */
export type GalleryPiece = {
  /** The image's filename inside public/art/gallery/ — must match exactly, including .jpg/.png/.webp */
  file: string;
  /**
   * Optional title. Pieces are shown untitled by default — the image
   * speaks for itself. If given, it's used only as the image's accessible
   * alt text, never displayed.
   */
  title?: string;
  /** A sentence or two about the piece. Shown when the piece is opened. Can be "" if you have nothing to say. */
  description: string;
  /** When you finished it, as "YYYY-MM" (year and month). Used to sort the gallery, newest first. */
  date: string;
  /** Labels used for filtering — lowercase, each in its own quotes, comma between. Can be [] for none. */
  tags: string[];
  /** true if this is an adult piece (hidden until the visitor confirms 18+), false if safe for everyone. EVERY adult piece MUST say true here. */
  nsfw: boolean;
  /**
   * Optional credit line under the title, for crediting the commissioner
   * or client a piece was made for — e.g. "Commission for Client name" or
   * "Client — art director Jane Doe". Left out, no line is shown; never
   * use it to claim a design that belongs to someone else.
   */
  credit?: string;
  /** The id of the series this piece belongs to (see the `series` list). Leave out if it stands alone. */
  series?: string;
};

/** A body of work with its own page. (Shape definition — don't edit.) */
export type GallerySeries = {
  /** Short id used in the web address and in pieces' `series` fields — lowercase, hyphens, no spaces. */
  id: string;
  /** The series title, e.g. "Crowned figure". */
  title: string;
  /** One paragraph on the intent of the series, shown at the top of its page. */
  intro: string;
};

/**
 * Series — bodies of work. Pieces are ordered oldest-first on a series
 * page, so the sequence reads as the design developed.
 */
export const series: GallerySeries[] = [
  {
    id: "crowned-figure",
    title: "Crowned figure",
    intro:
      "An ornamented figure taken from symmetrical construction lines through to a flat colour pass — the crown, horns, and blade motif blocked in over the structure before any rendering.",
  },
  {
    id: "winged-creature",
    title: "Winged creature",
    intro:
      "A creature design built in two passes: the anatomy first — full-figure front with feathered ears — then armour laid directly over it, so every plate follows the muscle group underneath.",
  },
];

/**
 * The gallery itself. Add one { ... } block per piece, in any order
 * (the site sorts by date, newest first). The commented example shows
 * every field; the real entries follow it.
 */
export const gallery: GalleryPiece[] = [
  // {
  //   // The filename of the image in public/art/gallery/ — spelling and
  //   // capitalization must match the actual file exactly.
  //   file: "torso-study-03.webp",
  //
  //   // A short description. Keep it to a sentence or two.
  //   description: "Third in a series of muscle-layer studies, focusing on the obliques.",
  //
  //   // Year and month you finished it, in quotes, like "2026-08".
  //   date: "2026-08",
  //
  //   // Tags for filtering. Lowercase, in quotes, comma-separated inside the [ ].
  //   tags: ["anatomy", "wip"],
  //
  //   // false = safe for everyone. Change to true (no quotes!) for adult pieces.
  //   nsfw: false,
  // },

  // 👉 Paste your pieces here.
  // NOTE: dates below are placeholders in display order — edit them to the
  // real finish dates whenever; the gallery sorts newest-first by this field.
  {
    file: "crowned-figure-flats.webp",
    description:
      "Flat colour pass on an ornamented figure — crown, horns, and blade motif blocked in over the construction lines.",
    date: "2026-08",
    tags: ["character design", "wip"],
    nsfw: false,
    series: "crowned-figure",
  },
  {
    file: "crowned-figure-construction.webp",
    description:
      "The same figure one stage earlier: symmetrical construction line work, white on black.",
    date: "2026-07",
    tags: ["character design", "wip"],
    nsfw: false,
    series: "crowned-figure",
  },
  {
    file: "crawl-study.webp",
    description:
      "Weight on all fours in low light — scapula, spine, and loaded shoulders doing the storytelling.",
    date: "2026-06",
    tags: ["anatomy", "illustration"],
    nsfw: false,
  },
  {
    file: "kneeling-reach.webp",
    description:
      "Silhouette-first pose study — a kneeling figure reaching into the dark.",
    date: "2026-05",
    tags: ["anatomy"],
    nsfw: false,
  },
  {
    file: "porcelain-bust.webp",
    description:
      "Painted head study — cracked porcelain over dark fur, lit from within.",
    date: "2026-04",
    tags: ["illustration"],
    nsfw: false,
  },
  {
    file: "leaping-figure.webp",
    description:
      "Full-figure gesture pushed to a finished contour — the twist through the torso carries the jump.",
    date: "2026-03",
    tags: ["anatomy"],
    nsfw: false,
  },
  {
    file: "winged-creature-armor.webp",
    description:
      "Armour design built directly over the anatomy pass, so every plate follows a muscle group underneath.",
    date: "2026-02",
    tags: ["character design", "reference sheet"],
    nsfw: false,
    series: "winged-creature",
  },
  {
    file: "winged-creature-anatomy.webp",
    description:
      "The base body for the armour design: full-figure front, feathered ears, structure before costume.",
    date: "2026-01",
    tags: ["character design", "reference sheet"],
    nsfw: false,
    series: "winged-creature",
  },
  {
    file: "amber-torso-study.webp",
    description:
      "Torso and shoulder-girdle study in warm flats, construction sketch still visible behind.",
    date: "2025-12",
    tags: ["anatomy", "wip"],
    nsfw: false,
  },
  {
    file: "drapery-study.webp",
    description:
      "Cloth against a standing figure — fold weight and gather, line kept loose below the waist.",
    date: "2025-11",
    tags: ["anatomy", "illustration"],
    nsfw: false,
  },
  {
    file: "sitting-study.webp",
    description:
      "Quiet seated pose on toned ground — hands clasped, tail wrapping the composition closed.",
    date: "2025-10",
    tags: ["anatomy"],
    nsfw: false,
  },

  // Sketchbook — loose studies, kept deliberately rough.
  {
    file: "sketch-head-study.webp",
    description: "Quick construction of a long-muzzled head — planes first, fur direction second.",
    date: "2025-09",
    tags: ["sketchbook", "anatomy"],
    nsfw: false,
  },
  {
    file: "sketch-profile-headphones.webp",
    description: "A loose profile sketch — skull shape, ear placement, and how the band sits against both.",
    date: "2025-08",
    tags: ["sketchbook"],
    nsfw: false,
  },
  {
    file: "sketch-goblin-bust.webp",
    description: "Rough bust with the arm thrown over the shoulder — mass and gesture before any cleanup.",
    date: "2025-07",
    tags: ["sketchbook", "character design"],
    nsfw: false,
  },
];
