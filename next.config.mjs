/** @type {import('next').NextConfig} */
const nextConfig = {
  // Fully static export — no server. This is what lets the site deploy to
  // Cloudflare Pages as plain files from the `out/` folder.
  output: 'export',
  // Folder-style URLs (/gallery/ instead of /gallery) so static hosting
  // serves every page cleanly without redirect rules.
  trailingSlash: true,
  images: {
    // The static export has no image-optimizer server; images are served
    // as the exact files placed in /public/art/ (already web-sized WebP).
    unoptimized: true,
  },
};

export default nextConfig;
