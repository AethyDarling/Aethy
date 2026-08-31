// =============================================================================
// COMMISSIONS — whether you're open, your tiers, prices, and terms.
//
// The images these entries point at live in  public/art/commissions/
//
// HOW TO ADD A TIER: copy the example { ... }, block in the tiers list and
// edit each line.
//
// Rules that keep the file from breaking:
//   - Text always goes between quotes:  "like this"
//   - true / false and prices (numbers) do NOT get quotes
//   - Every line inside an entry ends with a comma
// =============================================================================

/** One example image for a tier. (Shape definition — don't edit.) */
export type CommissionExample = {
  /** Filename inside public/art/commissions/ — must match exactly, including .jpg/.png */
  file: string;
  /** true if this example is adult (blurred/gated). */
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
  /** Your terms of service in short bullet-like sentences — what you will/won't draw, payment terms, turnaround. */
  terms: string;
  /** Optional: the filename of a pricing-sheet image in public/art/commissions/, or "" if you don't use one. */
  pricingSheetImage: string;
  /** Your tiers, in the order they should appear on the page. */
  tiers: CommissionTier[];
};

export const commissions: CommissionsConfig = {
  // ⭐ The switch: true = open for commissions, false = closed. No quotes.
  commissionsOpen: false,

  // How a client actually orders once you're open.
  howToOrder: "Email hello@aethy.studio with the tier you want, references, and a description of the piece.",

  // Your terms — payment, turnaround, what you won't draw. All inside the quotes.
  terms: "50% upfront, 50% on completion. Turnaround 2–4 weeks depending on tier. I reserve the right to decline any subject.",

  // If you use a single pricing-sheet graphic, put its filename here (it must
  // exist in public/art/commissions/). Leave as "" to skip it.
  pricingSheetImage: "",

  // Your tiers. The one below is an example — edit it, then copy the whole
  // { ... }, block for each additional tier.
  tiers: [
    {
      // Tier name as shown on the page.
      name: "Full Render",

      // What this tier includes.
      description: "A fully painted single character with simple background, delivered at print resolution.",

      // Starting price — just the number, no quotes, no currency sign.
      priceFrom: 250,

      // The currency sign shown next to the number.
      currency: "$",

      // Example images for this tier (files in public/art/commissions/).
      examples: [
        {
          file: "full-render-example-1.jpg",  // filename in public/art/commissions/
          nsfw: false,                        // true if this example is adult
        },
      ],
    },

    // 👉 Paste your next tier here, as another { ... }, block just like the one above.
  ],
};
