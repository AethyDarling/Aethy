// =============================================================================
// SITE — the site-wide settings: your name, bio, links, and which pieces
// appear in the homepage featured strip.
//
// This file has exactly ONE entry (the site only has one of you). Just edit
// the values in place — don't copy/paste extra blocks here.
//
// Rules that keep the file from breaking:
//   - Text always goes between quotes:  "like this"
//   - Every line ends with a comma
// =============================================================================

/** One social/contact link. (Shape definition — don't edit.) */
export type SocialLink = {
  /** The site's name as shown to visitors, e.g. "Bluesky", "Twitter/X", "Email". */
  label: string;
  /** The full web address, starting with https:// (for email use "mailto:you@example.com"). */
  url: string;
};

/** One piece in the homepage featured strip. (Shape definition — don't edit.) */
export type FeaturedPiece = {
  /** Filename inside public/art/featured/ — must match exactly, including .jpg/.png/.webp */
  file: string;
  /** Title shown with the piece. */
  title: string;
  /** true if adult — featured pieces marked true are NEVER shown on the homepage, so keep this strip all-ages. */
  nsfw: boolean;
};

/** The site-wide settings. (Shape definition — don't edit.) */
export type SiteConfig = {
  /** Your artist name, used in the header and page titles. */
  artistName: string;
  /** The one-line tagline used in page metadata and the footer (the hero itself stays wordless beyond your name). */
  tagline: string;
  /**
   * Your disciplines, shown as the "Concept Art | Character Design | …" line
   * under your name (the way senior artists' sites do it). 2–5 short entries.
   */
  roles: string[];
  /**
   * Selected clients / projects / credits, shown as a credibility strip on
   * the homepage and about page — e.g. "Indie VN — character art (2025)".
   * Leave [] to hide the section entirely until you have entries.
   */
  credits: string[];
  /**
   * The Aether Codex — your external worldbuilding/concept site, showcased
   * on its own page as concept work beyond the artwork itself.
   */
  codex: {
    /** The codex's full web address, starting with https://. */
    url: string;
    /** A paragraph (or two, with \n\n between) introducing what's there. */
    blurb: string;
  };
  /** Your longer bio for the about section — a paragraph or two, all inside the quotes. Use \n\n for a paragraph break. */
  bio: string;
  /** The site's web address (used for sharing links and previews). */
  siteUrl: string;
  /** Your public contact email. */
  email: string;
  /**
   * Filename (inside public/art/) of the image used when a link to the site
   * is shared on social media. MUST be a safe-for-work piece — this shows up
   * everywhere. Use a path relative to /public, e.g. "art/featured/my-best.webp".
   * Leave as "" for no share image until you pick one.
   */
  ogImage: string;
  /** Your social/contact links, in the order they should appear. */
  socials: SocialLink[];
  /** The 3–6 pieces in the homepage featured strip, in display order. Files live in public/art/featured/. */
  featured: FeaturedPiece[];
};

export const site: SiteConfig = {
  // Your name as it appears across the site.
  artistName: "Aethy",

  // One line used in page titles and link previews.
  tagline: "Freelance concept artist. Anatomy first, always.",

  // The discipline line under your name, e.g. AETHY / Concept Art | Character Design.
  roles: ["Concept Art", "Character Design", "Anatomy"],

  // Selected clients / projects / credits. [] = the strip stays hidden.
  // Example entries once you have some:
  //   "Client or studio name — what you did",
  //   "Project title — character design (2025)",
  credits: [],

  // Your Aether Codex site — the /codex/ page links out to it. Put the real
  // address in url; until then the page shows a "link coming soon" state.
  codex: {
    url: "https://EDIT-ME", // [EDIT ME] — the Aether Codex's address
    blurb:
      "The Aether Codex is the worldbuilding companion to my artwork — the written and structural side of concept work. Settings, factions, species, and the systems that hold them together: the same inside-out construction I bring to a body, applied to a world.\n\nIt's proof that the concepting doesn't stop at the canvas — design thinking, lore architecture, and documentation are part of the same practice.",
  },

  // Your bio for the about page. Replace with your own words whenever —
  // this placeholder leads with anatomy, as the site does.
  bio: "I'm Aethy, a freelance concept artist working primarily in the furry community. Anatomy is the spine of everything I make: strong figure construction, honest musculature, and bodies that feel like they could stand up and walk off the page. Whether it's a creature study or a full character design, the drawing starts from the inside out — gesture, structure, mass, then contour.\n\n[EDIT ME — add a second paragraph about your workflow, history, and what you love to draw. This text lives in content/site.ts.]",

  // The site's address.
  siteUrl: "https://aethy.studio",

  // Your public contact email.
  email: "aethy@aethy.studio",

  // SFW share image for link previews. "" = none yet.
  // Example once you've placed one: "art/featured/ascension.webp"
  ogImage: "",

  // Your links. Replace the [EDIT-ME] URLs with your real profiles;
  // delete any row you don't use. Copy a { ... }, block to add more.
  socials: [
    {
      label: "Twitter/X",
      url: "https://x.com/EDIT-ME", // [EDIT ME]
    },
    {
      label: "Bluesky",
      url: "https://bsky.app/profile/EDIT-ME", // [EDIT ME]
    },
    {
      label: "FurAffinity",
      url: "https://www.furaffinity.net/user/EDIT-ME", // [EDIT ME]
    },
    {
      label: "Telegram",
      url: "https://t.me/EDIT-ME", // [EDIT ME]
    },
    {
      label: "Email",
      url: "mailto:aethy@aethy.studio",
    },
  ],

  // The featured strip: 3–6 of your best, all-ages pieces.
  // Drop the image files into public/art/featured/ first, then list them here.
  // Until this list has entries, the homepage shows labeled empty slots.
  featured: [
    // 👉 Example — copy this block (without the // marks) once files exist:
    // {
    //   file: "ascension.webp",   // filename in public/art/featured/
    //   title: "Ascension",       // its title
    //   nsfw: false,              // keep featured pieces all-ages
    // },
  ],
};
