// =============================================================================
// COMMISSIONS — whether you're open, your tiers, prices, and terms.
//
// The images these entries point at live in  public/art/commissions/
//
// ⭐ To open/close commissions: change `commissionsOpen` below to true or
//    false, save, redeploy. That's it — the badge and page update everywhere.
//
// HOW TO ADD A TIER: copy an example { ... }, block in the tiers list and
// edit each line.
//
// Rules that keep the file from breaking:
//   - Text always goes between quotes:  "like this"
//   - true / false and prices (numbers) do NOT get quotes
//   - Every line inside an entry ends with a comma
// =============================================================================

/** One example image for a tier. (Shape definition — don't edit.) */
export type CommissionExample = {
  /** Filename inside public/art/commissions/ — must match exactly, including .jpg/.png/.webp */
  file: string;
  /** true if this example is adult (hidden until the visitor confirms 18+). */
  nsfw: boolean;
};

/** One commission tier. (Shape definition — don't edit.) */
export type CommissionTier = {
  /** The tier's name, e.g. "Sketch", "Line Art", "Full Render". */
  name: string;
  /** What the client gets at this tier — a sentence or two. */
  description: string;
  /** Starting price in whole units of your currency, WITHOUT quotes and without a currency sign — just the number, e.g. 120 */
  priceFrom: number;
  /** The currency symbol or code to show next to the price, e.g. "$", "€", "USD". */
  currency: string;
  /** Example images for this tier, from public/art/commissions/. Can be [] if you have none yet. */
  examples: CommissionExample[];
};

/** The commissions page settings. (Shape definition — don't edit.) */
export type CommissionsConfig = {
  /**
   * THE OPEN/CLOSED SWITCH. true = the site says commissions are OPEN and
   * shows how to order. false = the site says commissions are CLOSED.
   * Flip this one word whenever your status changes — no quotes around it.
   */
  commissionsOpen: boolean;
  /** How people order — e.g. "Email me at ..." or a link to your form. Shown when open. */
  howToOrder: string;
  /** Your terms of service, one short sentence per line. Each string in the list becomes a bullet point. */
  terms: string[];
  /** Things you WILL draw — one per line, shown as a list. */
  willDraw: string[];
  /** Things you WON'T draw — one per line, shown as a list. */
  wontDraw: string[];
  /** Optional: the filename of a pricing-sheet image in public/art/commissions/, or "" if you don't use one. */
  pricingSheetImage: string;
  /** Your tiers, in the order they should appear on the page. */
  tiers: CommissionTier[];
};

export const commissions: CommissionsConfig = {
  // ⭐ The switch: true = open for commissions, false = closed. No quotes.
  commissionsOpen: false,

  // How a client actually orders once you're open.
  howToOrder: "Email aethy@aethy.studio with the tier you want, references for the character(s), and a description of the piece. I'll reply with a quote and my current queue time.",

  // Your terms — one bullet per line. [EDIT ME to match your real terms]
  terms: [
    "50% upfront, 50% on completion. Payment via invoice.",
    "Turnaround is typically 2–4 weeks depending on tier and queue.",
    "You'll receive WIP check-ins at sketch and line stages; two rounds of revisions are included.",
    "Finished pieces may be posted to my portfolio unless you ask for privacy.",
    "I reserve the right to decline any commission.",
  ],

  // Things you're happy to draw. [EDIT ME]
  willDraw: [
    "Anthro and feral characters",
    "Anatomy and figure studies of your character",
    "Character design and reference sheets",
    "Creatures, monsters, and hybrids",
  ],

  // Hard nos. [EDIT ME]
  wontDraw: [
    "[EDIT ME — list what you won't draw]",
  ],

  // If you use a single pricing-sheet graphic, put its filename here (it must
  // exist in public/art/commissions/). Leave as "" to skip it.
  pricingSheetImage: "",

  // Your tiers. Prices below are PLACEHOLDERS — [EDIT ME] with your real
  // prices. The example images point at real files already in the repo;
  // swap them for whichever pieces best represent each tier.
  tiers: [
    {
      name: "Sketch",
      description: "A clean single-character sketch — gesture and construction visible, the way a study should be.",
      priceFrom: 60, // [EDIT ME — placeholder price]
      currency: "$",
      examples: [
        { file: "commission-example-6.webp", nsfw: false },
        { file: "commission-example-10.webp", nsfw: false },
      ],
    },
    {
      name: "Line Art",
      description: "Full resolved line work of a single character, ready for print or your own coloring.",
      priceFrom: 120, // [EDIT ME — placeholder price]
      currency: "$",
      examples: [
        { file: "commission-example-2.webp", nsfw: false },
        { file: "commission-example-9.webp", nsfw: false },
      ],
    },
    {
      name: "Full Render",
      description: "A fully painted single character with simple background, delivered at print resolution.",
      priceFrom: 250, // [EDIT ME — placeholder price]
      currency: "$",
      examples: [
        { file: "commission-example-1.webp", nsfw: false },
        { file: "commission-example-3.webp", nsfw: false },
        { file: "commission-example-8.webp", nsfw: false },
      ],
    },

    // 👉 Paste your next tier here, as another { ... }, block just like the ones above.
  ],
};
