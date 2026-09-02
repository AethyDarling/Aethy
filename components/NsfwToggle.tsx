"use client";

import { useNsfw } from "./NsfwContext";

// The 18+ switch. Rendered only on pages that actually hold adult content,
// and only when some of it exists, so a visitor with no interest in it
// never sees the control at all.
export default function NsfwToggle({ show }: { show: boolean }) {
  const { showNsfw, setShowNsfw } = useNsfw();
  if (!show) return null;
  return (
    <button
      role="switch"
      aria-checked={showNsfw}
      aria-label="Show 18+ artwork"
      onClick={() => setShowNsfw(!showNsfw)}
      className={`text-xs border px-2.5 py-1 transition-colors ${
        showNsfw
          ? "border-mint text-ink bg-mint"
          : "border-line text-muted hover:border-muted hover:text-bone"
      }`}
    >
      18+ {showNsfw ? "on" : "off"}
    </button>
  );
}
