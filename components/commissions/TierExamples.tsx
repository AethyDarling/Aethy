"use client";

import type { CommissionExample } from "@/content/commissions";
import { useNsfw } from "@/components/NsfwContext";

// Example thumbnails for one tier. NSFW examples are excluded from the
// DOM entirely until the visitor confirms 18+, then shown with a marker.
export default function TierExamples({
  examples,
  tierName,
}: {
  examples: CommissionExample[];
  tierName: string;
}) {
  const { showNsfw } = useNsfw();
  const visible = examples.filter((e) => showNsfw || !e.nsfw);
  if (visible.length === 0) return null;
  return (
    <div className="mt-auto grid grid-cols-3 gap-2">
      {visible.map((e) => (
        <span key={e.file} className="relative block border border-line">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`/art/commissions/${e.file}`}
            alt={`${tierName} example`}
            loading="lazy"
            decoding="async"
            className="w-full aspect-square object-cover"
          />
          {e.nsfw && (
            <span className="absolute top-1 right-1 font-sans text-[0.55rem] uppercase bg-ink text-mint border border-mint px-1">
              18+
            </span>
          )}
        </span>
      ))}
    </div>
  );
}
