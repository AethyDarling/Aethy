"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { ProcessSeries } from "@/content/process";
import { useNsfw } from "@/components/NsfwContext";

// A process series as an interactive build-up: step through the stages,
// or press play and watch the drawing assemble itself gesture-first.
// All stage images are mounted (stacked, opacity-switched) so stepping is
// instant and the autoplay never stutters on a cold fetch.

const AUTOPLAY_MS = 1400;

export default function ProcessViewer({ series }: { series: ProcessSeries }) {
  const { showNsfw } = useNsfw();
  const reduced = useReducedMotion() ?? false;
  const [i, setI] = useState(0);
  const [playing, setPlaying] = useState(false);
  const frameRef = useRef<HTMLDivElement>(null);

  const stages = series.stages;
  const last = stages.length - 1;

  const go = useCallback(
    (next: number) => {
      setI(Math.max(0, Math.min(last, next)));
    },
    [last]
  );

  // Autoplay: advance through the stages, stop at the finished piece.
  useEffect(() => {
    if (!playing) return;
    if (i >= last) {
      setPlaying(false);
      return;
    }
    const t = setTimeout(() => setI((v) => Math.min(last, v + 1)), AUTOPLAY_MS);
    return () => clearTimeout(t);
  }, [playing, i, last]);

  // Arrow keys when the viewer has focus.
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      setPlaying(false);
      go(i + 1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      setPlaying(false);
      go(i - 1);
    }
  };

  const play = () => {
    if (i >= last) setI(0);
    setPlaying(true);
  };

  // Adult series stay entirely unmounted until the visitor confirms 18+.
  if (series.nsfw && !showNsfw) {
    return (
      <div className="border border-line p-10 text-center">
        <p className="label-caps text-mint mb-4">18+ series</p>
        <p className="text-muted text-sm">
          Turn on the 18+ toggle in the header to view this breakdown.
        </p>
      </div>
    );
  }

  const current = stages[i];

  return (
    <section aria-labelledby={`${series.id}-title`} className="mb-28 sm:mb-36">
      <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
        <div>
          <p className="label-caps text-muted mb-3">
            Plate sequence — {stages.length} stages
          </p>
          <h2
            id={`${series.id}-title`}
            className="font-display text-3xl sm:text-4xl text-bone"
          >
            {series.title}
          </h2>
        </div>
        <button
          onClick={() => (playing ? setPlaying(false) : play())}
          className="font-mono text-[0.65rem] uppercase tracking-[0.2em] border border-bone text-bone px-5 py-2.5 hover:bg-bone hover:text-ink transition-colors"
          aria-label={playing ? "Pause the build-up" : "Play the build-up"}
        >
          {playing ? "❙❙ pause" : i >= last ? "↻ replay" : "▶ play build"}
        </button>
      </div>

      {series.intro && (
        <p className="text-muted text-sm leading-relaxed max-w-2xl mb-8">
          {series.intro}
        </p>
      )}

      <div
        ref={frameRef}
        tabIndex={0}
        role="group"
        aria-label={`${series.title} — stage ${i + 1} of ${stages.length}, ${current.name}`}
        onKeyDown={onKeyDown}
        className="relative border border-line bg-surface focus:outline-none focus-visible:border-mint"
      >
        {/* Stacked stages — all mounted so switching is instant. */}
        <div className="relative w-full aspect-[4/3] sm:aspect-[16/10]">
          {stages.map((s, idx) => (
            <motion.img
              key={s.src}
              src={`/${s.src}`}
              alt={`${series.title} — ${s.name} stage`}
              draggable={false}
              className="absolute inset-0 w-full h-full object-contain select-none"
              initial={false}
              animate={{ opacity: idx === i ? 1 : 0 }}
              transition={{ duration: reduced ? 0 : 0.4, ease: "easeOut" }}
              style={{ zIndex: idx === i ? 2 : 1 }}
              // Only the first stage is eager; the rest load right after.
              loading={idx === 0 ? "eager" : "lazy"}
              decoding="async"
            />
          ))}

          {/* Stage counter, top-left, like a plate number. */}
          <p className="absolute top-3 left-3 z-10 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-muted bg-ink/80 px-2 py-1">
            {String(i + 1).padStart(2, "0")} / {String(stages.length).padStart(2, "0")}
          </p>
        </div>

        {/* Progress track: a hairline that fills as the piece builds. */}
        <div className="relative h-px bg-line" aria-hidden>
          <motion.div
            className="absolute left-0 top-0 h-px bg-bone"
            initial={false}
            animate={{ width: `${((i + 1) / stages.length) * 100}%` }}
            transition={{ duration: reduced ? 0 : 0.4, ease: "easeOut" }}
          />
        </div>

        {/* Current stage name + the artist's commentary. */}
        <div className="px-4 py-3 min-h-[3.75rem] flex flex-wrap items-baseline gap-x-4 gap-y-1">
          <p className="font-display text-lg text-bone">{current.name}</p>
          {current.caption && (
            <p className="text-muted text-sm leading-relaxed flex-1 min-w-[16rem]">
              {current.caption}
            </p>
          )}
        </div>
      </div>

      {/* Stage rail — click any stage to jump straight to it. */}
      <ol className="grid grid-cols-3 sm:grid-cols-5 gap-2 mt-3">
        {stages.map((s, idx) => (
          <li key={s.src}>
            <button
              onClick={() => {
                setPlaying(false);
                go(idx);
              }}
              aria-current={idx === i ? "step" : undefined}
              className={`w-full text-left border transition-colors ${
                idx === i
                  ? "border-bone"
                  : "border-line hover:border-muted"
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`/${s.src}`}
                alt=""
                loading="lazy"
                decoding="async"
                className={`w-full aspect-square object-cover transition-opacity ${
                  idx === i ? "opacity-100" : "opacity-50"
                }`}
              />
              <span
                className={`block px-2 py-1.5 font-mono text-[0.6rem] uppercase tracking-[0.1em] ${
                  idx === i ? "text-bone" : "text-muted"
                }`}
              >
                {String(idx + 1).padStart(2, "0")} {s.name}
              </span>
            </button>
          </li>
        ))}
      </ol>
    </section>
  );
}
