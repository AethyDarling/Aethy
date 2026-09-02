import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-page py-32 sm:py-40 text-center">
      <p className="text-sm text-muted mb-6">404</p>
      <h1 className="font-display text-6xl sm:text-8xl text-bone leading-[0.95]">
        Page not found
      </h1>
      <p className="text-muted text-sm mt-6 mb-12 max-w-md mx-auto leading-relaxed">
        This page does not exist.
      </p>
      <Link
        href="/"
        className="inline-block border border-bone text-bone text-sm px-6 py-3 hover:bg-bone hover:text-ink transition-colors"
      >
        Back to the homepage
      </Link>
    </div>
  );
}
