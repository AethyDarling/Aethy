"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { theme } from "@/content/theme";
import { site } from "@/content/site";
import { commissions } from "@/content/commissions";
import MagneticButton from "@/components/MagneticButton";
import DrawOnSvg from "./DrawOnSvg";
import StagedReveal from "./StagedReveal";
import HeroTicks from "./HeroTicks";

// The choreographed hero. Two acts:
//   Act 1 (entrance): the figure study draws itself in, then the name,
//     role, and CTA reveal with staggered timing.
//   Act 2 (ambient): construction-tick canvas drifts behind everything,
//     art layers respond to the cursor with parallax (or sway gently on
//     touch devices), the CTA leans toward the pointer.
// All timing/strength knobs live in content/theme.ts → theme.hero.
// Reduced motion: everything renders in its final state, no animation.

type Layer = { src: string; title: string };

export default function HeroStage({
  svgMarkup,
  stages,
  heroImage,
  layers,
}: {
  svgMarkup: string | null;
  stages: string[];
  /** A finished piece used as a static centerpiece (slow reveal, no draw-on). */
  heroImage?: string | null;
  layers: Layer[];
}) {
  const reduced = useReducedMotion() ?? false;
  const cfg = theme.hero;
  // Only the animatable forms use the draw-on timing budget; a static
  // centerpiece reveals quickly alongside the text.
  const hasArt = Boolean(svgMarkup) || stages.length > 0;

  // Entrance phases: draw → text → ambient.
  const [drawn, setDrawn] = useState(reduced || !hasArt);
  const [ambient, setAmbient] = useState(reduced);

  useEffect(() => {
    if (reduced) return;
    if (!hasArt) {
      // No artwork yet: skip straight to the text entrance.
      const t = setTimeout(() => setAmbient(true), 600);
      return () => clearTimeout(t);
    }
  }, [reduced, hasArt]);

  useEffect(() => {
    if (!drawn || reduced) return;
    const t = setTimeout(() => setAmbient(true), cfg.textDelayMs + 500);
    return () => clearTimeout(t);
  }, [drawn, reduced, cfg.textDelayMs]);

  // Pointer parallax (mouse) / autonomous sway (touch).
  const sectionRef = useRef<HTMLElement>(null);
  const px = useMotionValue(0); // -1 … 1
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 60, damping: 18 });
  const sy = useSpring(py, { stiffness: 60, damping: 18 });

  useEffect(() => {
    if (reduced) return;
    const el = sectionRef.current;
    if (!el) return;
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (fine) {
      const onMove = (e: PointerEvent) => {
        const r = el.getBoundingClientRect();
        px.set(((e.clientX - r.left) / r.width) * 2 - 1);
        py.set(((e.clientY - r.top) / r.height) * 2 - 1);
      };
      const onLeave = () => {
        px.set(0);
        py.set(0);
      };
      el.addEventListener("pointermove", onMove);
      el.addEventListener("pointerleave", onLeave);
      return () => {
        el.removeEventListener("pointermove", onMove);
        el.removeEventListener("pointerleave", onLeave);
      };
    }
    // Touch: slow autonomous sway, no sensors needed, capped cost.
    let raf = 0;
    const t0 = performance.now();
    const loop = (t: number) => {
      const s = ((t - t0) / 1000) * cfg.particleSpeed;
      px.set(Math.sin(s * 0.3) * 0.4);
      py.set(Math.cos(s * 0.23) * 0.4);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [reduced, px, py, cfg.particleSpeed]);

  const figX = useTransform(sx, (v) => v * cfg.parallaxPx);
  const figY = useTransform(sy, (v) => v * cfg.parallaxPx * 0.6);
  const backX = useTransform(sx, (v) => v * -cfg.parallaxPx * 0.5);
  const backY = useTransform(sy, (v) => v * -cfg.parallaxPx * 0.3);

  const textDelay = (i: number) =>
    reduced ? 0 : (hasArt ? cfg.drawDurationMs + cfg.textDelayMs : 200) / 1000 +
      (i * cfg.textStaggerMs) / 1000;

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden border-b border-line"
      aria-label="Aethy — concept artist"
    >
      {/* Ambient construction-tick field (Act 2). Flat lines, capped cost. */}
      {ambient && !reduced && cfg.particleCount > 0 && (
        <HeroTicks pointerX={sx} pointerY={sy} />
      )}

      <div className="relative container-page min-h-[60vh] lg:min-h-[68vh] grid lg:grid-cols-[5fr_5fr] items-center gap-12 py-16 lg:py-20">
        {/* Identity block — the way senior artists' sites do it: name, a
            discipline line, availability, one quiet action. The work itself
            begins immediately below. */}
        <div className="relative z-10 order-2 lg:order-1 text-center lg:text-left">
          <motion.h1
            className="font-display text-bone leading-[0.95] text-[clamp(3rem,7vw,5.5rem)]"
            initial={reduced ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: textDelay(0), ease: [0.22, 1, 0.36, 1] }}
          >
            AETHY
          </motion.h1>
          <motion.p
            className="font-mono text-[0.7rem] sm:text-xs uppercase tracking-[0.25em] text-muted mt-5"
            initial={reduced ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: textDelay(1), ease: [0.22, 1, 0.36, 1] }}
          >
            {site.roles.join("  |  ")}
          </motion.p>
          <motion.div
            className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4 justify-center lg:justify-start"
            initial={reduced ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: textDelay(2), ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="inline-flex items-center gap-2.5 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted">
              <span
                aria-hidden
                className={`inline-block w-1.5 h-1.5 rounded-full ${
                  commissions.commissionsOpen ? "bg-mint" : "bg-rust"
                }`}
              />
              {commissions.commissionsOpen
                ? "Available for freelance"
                : "Books closed — inquiries welcome"}
            </span>
            <MagneticButton href="/commissions/" variant="outline">
              Commissions
            </MagneticButton>
          </motion.div>
        </div>

        {/* Figure centerpiece — the artist's own study, animated by code. */}
        <motion.div
          className="relative z-[5] order-1 lg:order-2 h-[38vh] lg:h-[54vh]"
          style={reduced ? undefined : { x: figX, y: figY }}
        >
          {/* Deeper parallax layers from featured art, behind the figure. */}
          {layers.length > 0 && (
            <motion.div
              aria-hidden
              className="absolute inset-0 -z-10"
              style={reduced ? undefined : { x: backX, y: backY }}
            >
              {layers.map((l, i) => (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  key={l.src}
                  src={l.src}
                  alt=""
                  loading="eager"
                  className={`absolute w-2/5 opacity-25 ${
                    i === 0 ? "left-0 top-4" : "right-0 bottom-4"
                  }`}
                />
              ))}
            </motion.div>
          )}

          {svgMarkup ? (
            <DrawOnSvg markup={svgMarkup} onDone={() => setDrawn(true)} reduced={reduced} />
          ) : stages.length > 0 ? (
            <StagedReveal stages={stages} onDone={() => setDrawn(true)} reduced={reduced} />
          ) : heroImage ? (
            <motion.img
              src={heroImage}
              alt="Figure study by Aethy"
              draggable={false}
              className="w-full h-full object-contain select-none"
              initial={reduced ? false : { opacity: 0, scale: 1.03 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            />
          ) : (
            <div className="art-slot w-full h-full">
              <p>
                hero artwork slot
                <br />
                <span className="normal-case tracking-normal">
                  drop <code>hero.svg</code> (animatable line art) or the four{" "}
                  <code>stage-*.png</code> files into <code>/public/art/hero/</code> —
                  see the _README there
                </span>
              </p>
            </div>
          )}
        </motion.div>
      </div>

      {/* Bottom hairline. */}
      <div className="absolute bottom-0 left-0 right-0 rule-ticks" aria-hidden />
    </section>
  );
}
