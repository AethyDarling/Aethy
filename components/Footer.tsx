import { site } from "@/content/site";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-line mt-24">
      <div className="max-w-6xl mx-auto px-5 py-10 flex flex-col sm:flex-row gap-6 sm:items-center sm:justify-between">
        <div>
          <p className="font-display text-lg text-bone">AETHY</p>
          <p className="text-muted text-xs mt-1">{site.tagline}</p>
        </div>
        <nav aria-label="Social links" className="flex flex-wrap gap-x-5 gap-y-2">
          {site.socials.map((s) => (
            <a
              key={s.label}
              href={s.url}
              target={s.url.startsWith("mailto:") ? undefined : "_blank"}
              rel="noopener noreferrer"
              className="draw-link text-sm text-muted hover:text-amber transition-colors"
            >
              {s.label}
            </a>
          ))}
        </nav>
        <p className="font-mono text-[0.6rem] uppercase tracking-[0.15em] text-muted">
          © {year} {site.artistName} — all artwork mine, do not repost
        </p>
      </div>
    </footer>
  );
}
