/** @type {import('next').NextConfig} */
const nextConfig = {
  // No `output: 'export'` here: the Cloudflare Workers project builds this
  // site with OpenNext (`npx opennextjs-cloudflare build`), which needs
  // Next's standalone server output. Every page is still fully prerendered
  // at build time — nothing renders on-demand.
  // Folder-style URLs (/gallery/ instead of /gallery) so every page keeps
  // the same address it had as a static export.
  trailingSlash: true,
  images: {
    // No image-optimizer: images are served as the exact files placed in
    // /public/art/ (already web-sized WebP).
    unoptimized: true,
  },
};

export default nextConfig;
