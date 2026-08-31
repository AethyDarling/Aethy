import Link from "next/link";

export default function NotFound() {
  return (
    <div className="max-w-6xl mx-auto px-5 py-32 text-center">
      <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-amber mb-4">
        fig. 404 — reference not found
      </p>
      <h1 className="font-display text-6xl sm:text-8xl text-bone">Lost the line</h1>
      <p className="text-muted text-sm mt-5 mb-10 max-w-md mx-auto leading-relaxed">
        This page doesn't exist — like a figure drawn without construction,
        there's nothing underneath. Head back and start from the gesture.
      </p>
      <div className="rule-ticks max-w-xs mx-auto mb-10" aria-hidden />
      <Link
        href="/"
        className="inline-block border border-amber text-amber font-mono text-xs uppercase tracking-[0.25em] px-8 py-4 hover:bg-amber hover:text-ink transition-colors"
      >
        Back to the studio
      </Link>
    </div>
  );
}
