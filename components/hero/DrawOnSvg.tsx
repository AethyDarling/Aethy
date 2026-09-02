"use client";

import { useEffect, useRef } from "react";
import { theme } from "@/content/theme";

// The classical atelier draw-on: every stroked path in the artist's
// hero.svg is measured, hidden behind a full dash offset, then animated
// drawing itself in, staggered in document order (the order the artist
// drew them). Filled shapes without strokes fade in near the end.
// Uses the Web Animations API; no per-frame JS cost, fully compositable.

export default function DrawOnSvg({
  markup,
  onDone,
  reduced,
}: {
  markup: string;
  onDone: () => void;
  reduced: boolean;
}) {
  const hostRef = useRef<HTMLDivElement>(null);
  const doneRef = useRef(onDone);
  doneRef.current = onDone;

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    const svg = host.querySelector("svg");
    if (!svg) return;

    svg.setAttribute("width", "100%");
    svg.setAttribute("height", "100%");
    svg.setAttribute("preserveAspectRatio", "xMidYMid meet");
    svg.style.display = "block";

    const cfg = theme.hero;
    const drawables = Array.from(
      svg.querySelectorAll<SVGGeometryElement>(
        "path, line, polyline, polygon, circle, ellipse, rect"
      )
    );
    if (drawables.length === 0) {
      doneRef.current();
      return;
    }

    const stroked: SVGGeometryElement[] = [];
    const filledOnly: SVGGeometryElement[] = [];
    for (const el of drawables) {
      const style = getComputedStyle(el);
      const hasStroke = style.stroke !== "none" && style.stroke !== "";
      if (cfg.recolorStrokes && hasStroke) {
        el.style.stroke = cfg.strokeColor;
      }
      if (hasStroke && typeof el.getTotalLength === "function") {
        stroked.push(el);
      } else {
        filledOnly.push(el);
      }
    }

    if (reduced) {
      // Final state immediately.
      doneRef.current();
      return;
    }

    const total = cfg.drawDurationMs;
    const n = Math.max(stroked.length, 1);
    // Each stroke draws for a window, staggered so the whole pass fits
    // in drawDurationMs with generous overlap (atelier ink, not plotter).
    const per = Math.min(total * 0.6, Math.max(500, total / Math.sqrt(n)));
    const step = n > 1 ? (total - per) / (n - 1) : 0;

    const anims: Animation[] = [];
    stroked.forEach((el, i) => {
      let len = 0;
      try {
        len = el.getTotalLength();
      } catch {
        len = 0;
      }
      if (!len) return;
      el.style.strokeDasharray = `${len}`;
      el.style.strokeDashoffset = `${len}`;
      const a = el.animate(
        [{ strokeDashoffset: len }, { strokeDashoffset: 0 }],
        {
          duration: per,
          delay: i * step,
          easing: "cubic-bezier(0.45, 0, 0.25, 1)",
          fill: "forwards",
        }
      );
      anims.push(a);
    });

    filledOnly.forEach((el) => {
      el.style.opacity = "0";
      const a = el.animate([{ opacity: 0 }, { opacity: 1 }], {
        duration: 600,
        delay: total * 0.7,
        easing: "ease-out",
        fill: "forwards",
      });
      anims.push(a);
    });

    const doneTimer = setTimeout(() => doneRef.current(), total + 50);
    return () => {
      clearTimeout(doneTimer);
      anims.forEach((a) => a.cancel());
    };
  }, [markup, reduced]);

  return (
    <div
      ref={hostRef}
      className="w-full h-full [&_svg]:mx-auto"
      role="img"
      aria-label="Figure study by Aethy, drawing itself in"
      dangerouslySetInnerHTML={{ __html: markup }}
    />
  );
}
