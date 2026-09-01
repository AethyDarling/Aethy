import { site } from "@/content/site";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-line mt-24 sm:mt-32">
      <div className="container-page py-14 sm:py-20">
        <div className="grid md:grid-cols-[1fr_auto] gap-10 md:items-start">
          <div>
            <p className="font-display text-2xl tracking-[0.2em] text-bone">
              AETHY
            </p>
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted mt-3">
              {site.roles.join("  |  ")}
            </p>
            <a
              href={`mailto:${site.email}`}
              className="draw-link inline-block font-mono text-sm tracking-[0.1em] text-bone mt-6"
            >
              {site.email}
            </a>
          </div>
          <nav
            aria-label="Social links"
            className="flex md:flex-col flex-wrap gap-x-6 gap-y-3 md:text-right"
          >
            {site.socials.map((s) => (
              <a
                key={s.label}
                href={s.url}
                target={s.url.startsWith("mailto:") ? undefined : "_blank"}
                rel="noopener noreferrer"
                className="draw-link font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted hover:text-bone transition-colors"
              >
                {s.label}
              </a>
            ))}
          </nav>
        </div>
        <div className="flex flex-wrap items-baseline justify-between gap-4 border-t border-line mt-12 pt-6">
          <p className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-muted">
            © {year} {site.artistName}
          </p>
          <p className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-muted">
            All artwork mine — do not repost
          </p>
        </div>
      </div>
    </footer>
  );
}
