import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-page py-32 sm:py-40 text-center">
      <p className="label-caps text-muted mb-6">404 — Page not found</p>
      <h1 className="font-display text-6xl sm:text-8xl text-bone leading-[0.95]">
        Lost the line
      </h1>
      <p className="text-muted text-sm mt-6 mb-12 max-w-md mx-auto leading-relaxed">
        This page doesn&rsquo;t exist. Head back to the studio and start again
        from the gesture.
      </p>
      <Link
        href="/"
        className="inline-block border border-bone bg-bone text-ink font-mono text-xs uppercase tracking-[0.25em] px-8 py-4 hover:bg-transparent hover:text-bone transition-colors"
      >
        Back to the studio
      </Link>
    </div>
  );
}
