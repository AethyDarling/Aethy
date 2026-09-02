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
  /** Optional — pieces are shown untitled; if given, used only as accessible alt text. */
  title?: string;
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
   * The Aether Codex — your physics-based magic system passion project,
   * showcased on its own page as technical concept work outside the art
   * sphere. It stands apart from the artwork and process pages entirely.
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

  // The discipline line under your name, e.g. AETHY / Concept Work | Anatomy.
  roles: ["Concept Work", "Anatomy", "Realism"],

  // Selected clients / projects / credits. [] = the strip stays hidden.
  // The two entries below are your public bodies of work — replace or
  // extend them with client credits as they come, e.g.
  //   "Client or studio name — what you did",
  //   "Project title — character design (2025)",
  credits: [
    "The Aether Codex — author and designer of a physics-based hard-magic system (aethercodex.org)",
    "Aethy — original mascot design and ongoing anatomy development",
  ],

  // Your Aether Codex site — the /codex/ page links out to it.
  codex: {
    url: "https://www.aethercodex.org",
    blurb:
      "The Aether Codex is a passion project standing entirely apart from my artwork: a fully custom, layered-field hard-magic system, unique in its application. No hand-waving — it's built from foundations up through the Grand Unified Aether Equation, with rules, costs, and constraints that hold under scrutiny, and applications that emerge from the mechanics rather than being bolted on.\n\nIt's the technical side of concept work — proof that the discipline extends past the canvas into systems design, internal consistency, and reference-grade documentation.",
  },

  // Your bio for the about page.
  bio: "I'm Aethy — a concept artist, 4+ years in the field, with a love for anatomy and realism in my work.",

  // The site's address.
  siteUrl: "https://aethy.studio",

  // Your public contact email.
  email: "aethy@aethy.studio",

  // SFW share image for link previews. "" = none yet.
  // Example once you've placed one: "art/featured/ascension.webp"
  ogImage: "",

  // Your links, in display order. Copy a { ... }, block to add more.
  socials: [
    {
      label: "Twitter/X",
      url: "https://x.com/AethyGoob",
    },
    {
      label: "TikTok",
      url: "https://www.tiktok.com/@aethygoob",
    },
    {
      label: "YouTube",
      url: "https://www.youtube.com/channel/UC3rbBH5DbFhpSPXSI9cqwzA",
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
    {
      file: "crowned-figure-flats.webp",
      nsfw: false,
    },
    {
      file: "kneeling-reach.webp",
      nsfw: false,
    },
    {
      file: "porcelain-bust.webp",
      nsfw: false,
    },
    {
      file: "crowned-figure-construction.webp",
      nsfw: false,
    },
    {
      file: "amber-torso-study.webp",
      nsfw: false,
    },
    {
      file: "leaping-figure.webp",
      nsfw: false,
    },
  ],
};
