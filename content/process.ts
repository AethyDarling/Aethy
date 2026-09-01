// =============================================================================
// PROCESS — step-by-step breakdowns of how a piece gets built.
//
// This is the showcase for your workflow: a viewer steps (or plays) through
// the stages of a drawing and watches it come together, gesture first.
//
// HOW TO ADD A SERIES:
//   1. Put the stage images in a folder under public/art/ (any folder — a
//      character folder is fine, or make public/art/process/).
//   2. Copy a { ... }, block below and list the stages IN ORDER, earliest
//      first. Two stages is enough; five or six is a great walkthrough.
//
// The `caption` on each stage is YOUR commentary — what you're actually
// doing at that step. Leave it as "" and the stage shows just its name;
// the page looks right either way, so fill them in whenever you feel like it.
//
// Rules that keep the file from breaking:
//   - Text always goes between quotes:  "like this"
//   - true / false do NOT get quotes
//   - Every line inside an entry ends with a comma
// =============================================================================

/** One stage in a process series. (Shape definition — don't edit.) */
export type ProcessStage = {
  /** Path to the image from inside /public — e.g. "art/characters/aethy/step-1.webp" */
  src: string;
  /** Short name for this stage, e.g. "Gesture", "Flats", "Render". */
  name: string;
  /** Your commentary on what happens at this stage. "" = show just the name. */
  caption: string;
};

/** One process series. (Shape definition — don't edit.) */
export type ProcessSeries = {
  /** URL-safe id, lowercase with hyphens. Used as the anchor link on the page. */
  id: string;
  /** The piece's title. */
  title: string;
  /** A line or two introducing the piece. "" = skipped. */
  intro: string;
  /** true if this series is adult (hidden until the visitor confirms 18+). */
  nsfw: boolean;
  /** The stages, EARLIEST FIRST. */
  stages: ProcessStage[];
};

/**
 * Your process series. The one below is the crawling-creature piece —
 * the stage images already in the repo, in the order you drew them.
 * The stage names describe what's visible in each file; the `caption`
 * lines are left blank for you to say what you're actually doing.
 */
export const process: ProcessSeries[] = [
  {
    id: "crawl-study",
    title: "Crawl Study",

    // A line or two about the piece. Leave "" to skip it. [EDIT ME]
    intro: "",

    nsfw: false,

    stages: [
      {
        src: "art/characters/aethy/aethy-character-example-1.webp",
        name: "Gesture",
        caption: "", // [EDIT ME] e.g. what you're looking for in the first pass
      },
      {
        src: "art/characters/aethy/aethy-character-example-2.webp",
        name: "Line work",
        caption: "", // [EDIT ME]
      },
      {
        src: "art/characters/aethy/aethy-character-example-3.webp",
        name: "Flats",
        caption: "", // [EDIT ME]
      },
      {
        src: "art/characters/aethy/aethy-character-example-4.webp",
        name: "Light",
        caption: "", // [EDIT ME]
      },
      {
        src: "art/characters/aethy/aethy-character-example-5.webp",
        name: "Render",
        caption: "", // [EDIT ME]
      },
    ],
  },

  // 👉 Paste your next series here, as another { ... }, block like the one above.
];
