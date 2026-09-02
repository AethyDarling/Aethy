// =============================================================================
// COMMISSIONS; whether you're open, your tiers, prices, and terms.
//
// Everything here is EMPTY on purpose; these are your prices and your
// terms to write, not guesses. The page hides any section you leave empty,
// so it looks finished at every stage of filling it in.
//
// The images these entries point at live in  public/art/commissions/
//
// ⭐ To open/close commissions: change `commissionsOpen` below to true or
//    false, save, redeploy. That's it; the badge and page update everywhere.
//
// HOW TO ADD A TIER: copy the commented-out example in the tiers list,
// remove the // marks, and edit each line.
//
// Rules that keep the file from breaking:
//   - Text always goes between quotes:  "like this"
//   - true / false and prices (numbers) do NOT get quotes
//   - Every line inside an entry ends with a comma
// =============================================================================

/** One example image for a tier. (Shape definition; don't edit.) */
export type CommissionExample = {
  /** Filename inside public/art/commissions/; must match exactly, including .jpg/.png/.webp */
  file: string;
  /** true if this example is adult (hidden until the visitor confirms 18+). */
  nsfw: boolean;
};

/** One commission tier. (Shape definition; don't edit.) */
export type CommissionTier = {
  /** The tier's name, e.g. "Sketch", "Line Art", "Full Render". */
  name: string;
  /** What the client gets at this tier; a sentence or two. */
  description: string;
  /**
   * Starting price; just the number, WITHOUT quotes and without a currency
   * sign, e.g. 120. Leave this line out entirely if you'd rather quote per
   * piece; the tier then shows your `priceNote` text instead (or nothing).
   */
  priceFrom?: number;
  /** The currency symbol or code shown next to the price, e.g. "$", "€", "USD". */
  currency?: string;
  /** Shown in place of a price when you haven't set one, e.g. "quoted per piece". Optional. */
  priceNote?: string;
  /** Example images for this tier, from public/art/commissions/. Can be [] if you have none yet. */
  examples: CommissionExample[];
};

/** The commissions page settings. (Shape definition; don't edit.) */
export type CommissionsConfig = {
  /**
   * THE OPEN/CLOSED SWITCH. true = the site says commissions are OPEN and
   * shows how to order. false = the site says commissions are CLOSED.
   * Flip this one word whenever your status changes; no quotes around it.
   */
  commissionsOpen: boolean;
  /** How people order; e.g. "Email me at ..." or a link to your form. Shown when open. */
  howToOrder: string;
  /** Your terms of service, one short sentence per line. Each string becomes a numbered point. Empty = the section is hidden. */
  terms: string[];
  /** Things you WILL draw; one per line. Empty = the section is hidden. */
  willDraw: string[];
  /** Things you WON'T draw; one per line. Empty = the section is hidden. */
  wontDraw: string[];
  /** Optional: the filename of a pricing-sheet image in public/art/commissions/, or "" if you don't use one. */
  pricingSheetImage: string;
  /** Your tiers, in the order they should appear on the page. Empty = the section is hidden. */
  tiers: CommissionTier[];
};

export const commissions: CommissionsConfig = {
  // ⭐ The switch: true = open for commissions, false = closed. No quotes.
  commissionsOpen: false,

  // How a client actually orders once you're open. Edit to taste.
  howToOrder:
    "Email aethy@aethy.studio with references for the character(s) and a description of what you're after.",

  // ---------------------------------------------------------------------------
  // TERMS OF SERVICE; your rules, in your words. Each line becomes a
  // numbered point. While this list is empty the whole section stays hidden.
  //
  // Example of the shape (delete the // marks and edit, or write your own):
  //   terms: [
  //     "Payment terms go here.",
  //     "Turnaround time goes here.",
  //   ],
  // ---------------------------------------------------------------------------
  terms: [],

  // What you're happy to draw; one per line. Hidden while empty.
  //   willDraw: ["Anthro characters", "Creature design"],
  willDraw: [],

  // Your hard nos; one per line. Hidden while empty.
  //   wontDraw: ["Mecha", "Real people"],
  wontDraw: [],

  // If you use a single pricing-sheet graphic, put its filename here (it must
  // exist in public/art/commissions/). Leave as "" to skip it.
  pricingSheetImage: "",

  // ---------------------------------------------------------------------------
  // TIERS; your prices. Empty until you write them; the section stays
  // hidden meanwhile, and the page invites people to email for a quote.
  //
  // Copy the block below, remove the // marks, and edit. You can list a
  // tier WITHOUT a price: just leave out the priceFrom/currency lines and
  // add a priceNote instead (or nothing at all).
  //
  //   tiers: [
  //     {
  //       name: "Sketch",
  //       description: "What the client gets at this tier.",
  //       priceFrom: 0,          // the number only; or delete this line
  //       currency: "$",         // delete this line too if there's no price
  //       priceNote: "",         // e.g. "quoted per piece" when there's no number
  //       examples: [
  //         { file: "commission-example-6.webp", nsfw: false },
  //       ],
  //     },
  //   ],
  //
  // The example images already in public/art/commissions/ are:
  //   commission-example-1.webp … commission-example-10.webp
  // ---------------------------------------------------------------------------
  tiers: [],
};
