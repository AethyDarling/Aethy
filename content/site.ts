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
  /** Filename inside public/art/featured/ — must match exactly, including .jpg/.png */
  file: string;
  /** Title shown with the piece. */
  title: string;
  /** true if adult (it will be blurred/gated) — but ideally keep the featured strip all-ages. */
  nsfw: boolean;
};

/** The site-wide settings. (Shape definition — don't edit.) */
export type SiteConfig = {
  /** Your artist name, used in the header and page titles. */
  artistName: string;
  /** The one-line tagline shown under your name on the homepage. */
  tagline: string;
  /** Your longer bio for the about section — a paragraph or two, all inside the quotes. */
  bio: string;
  /** The site's web address (used for sharing links and previews). */
  siteUrl: string;
  /** Your social/contact links, in the order they should appear. */
  socials: SocialLink[];
  /** The 3–6 pieces in the homepage featured strip, in display order. Files live in public/art/featured/. */
  featured: FeaturedPiece[];
};

export const site: SiteConfig = {
  // Your name as it appears across the site.
  artistName: "Aethy",

  // One line under your name. Edit to taste.
  tagline: "Freelance concept artist — anatomy first, always.",

  // Your bio for the about section. Replace this placeholder with your own words.
  bio: "Write a paragraph or two about yourself here: your background, what you love drawing, what you're known for, and what kind of work you take on.",

  // The site's address.
  siteUrl: "https://aethy.studio",

  // Your links. Copy a { ... }, block to add more; delete ones you don't use.
  socials: [
    {
      label: "Email",                       // what visitors see
      url: "mailto:hello@aethy.studio",     // replace with your real contact email
    },
    // 👉 Add more links here, e.g. { label: "Bluesky", url: "https://bsky.app/profile/..." },
  ],

  // The featured strip: 3–6 of your best. Each file must exist in public/art/featured/.
  featured: [
    {
      file: "ascension-final.jpg",   // filename in public/art/featured/ — replace with a real one
      title: "Ascension",            // its title
      nsfw: false,                   // keep featured pieces all-ages if you can
    },
    // 👉 Paste more featured pieces here, one { ... }, block each.
  ],
};
