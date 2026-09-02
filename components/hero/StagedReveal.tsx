"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { theme } from "@/content/theme";

// Fallback entrance when the artist supplies construction-stage PNGs
// instead of an SVG: gesture skeleton masses contour, each stage
// wiping in over the last with a sharp masked reveal (clip-path, no
// blurs or gradients), earlier stages dimming as the drawing resolves.

export default function StagedReveal({
  stages,
  onDone,
  reduced,
}: {
  stages: string[];
  onDone: () => void;
  reduced: boolean;
}) {
  const cfg = theme.hero;
  const per = cfg.drawDurationMs / stages.length;
  const [shown, setShown] = useState(reduced ? stages.length : 0);

  useEffect(() => {
    if (reduced) {
      onDone();
      return;
    }
    if (shown >= stages.length) {
      onDone();
      return;
    }
    const t = setTimeout(() => setShown((s) => s + 1), per);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shown, reduced, stages.length, per]);

  return (
    <div
      className="relative w-full h-full"
      role="img"
      aria-label="Figure study by Aethy, built up construction stage by construction stage"
    >
      {stages.map((src, i) => {
        const isLast = i === stages.length - 1;
        const visible = reduced ? isLast : i < shown;
        // Once later stages arrive, earlier construction fades back like
        // ghosted underdrawing.
        const settledOpacity = isLast ? 1 : 0.28;
        return (
          <motion.img
            key={src}
            src={src}
            alt=""
            draggable={false}
            className="absolute inset-0 w-full h-full object-contain select-none"
            initial={
              reduced
                ? false
                : { clipPath: "inset(0 0 100% 0)", opacity: 1 }
            }
            animate={
              visible
                ? {
                    clipPath: "inset(0 0 0% 0)",
                    opacity:
                      shown > i + 1 || (reduced && !isLast)
                        ? settledOpacity
                        : 1,
                  }
                : {}
            }
            transition={{
              clipPath: { duration: per / 1000 * 0.9, ease: [0.45, 0, 0.25, 1] },
              opacity: { duration: 0.6 },
            }}
          />
        );
      })}
    </div>
  );
}
