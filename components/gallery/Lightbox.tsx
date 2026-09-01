"use client";

import { useCallback, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { GalleryPiece } from "@/content/gallery";

// Polished lightbox: keyboard arrows + Escape, swipe/drag to navigate,
// caption panel with title/description/date/tags. Flat surfaces and
// hairline borders — no glows.

export default function Lightbox({
  pieces,
  index,
  onClose,
  onNavigate,
}: {
  pieces: GalleryPiece[];
  index: number | null;
  onClose: () => void;
  onNavigate: (i: number) => void;
}) {
  const open = index !== null && index >= 0 && index < pieces.length;
  const piece = open ? pieces[index] : null;
  const closeRef = useRef<HTMLButtonElement>(null);

  const step = useCallback(
    (dir: 1 | -1) => {
      if (index === null || pieces.length === 0) return;
      onNavigate((index + dir + pieces.length) % pieces.length);
    },
    [index, pieces.length, onNavigate]
  );

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose, step]);

  return (
    <AnimatePresence>
      {open && piece && (
        <motion.div
          className="fixed inset-0 z-[80] flex flex-col"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          role="dialog"
          aria-modal="true"
          aria-label={piece.title}
        >
          <button
            aria-label="Close"
            tabIndex={-1}
            className="absolute inset-0 bg-ink/95 cursor-default"
            onClick={onClose}
          />

          {/* Top bar */}
          <div className="relative flex items-center justify-between px-5 h-14 border-b border-line shrink-0">
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted">
              {index! + 1} / {pieces.length}
            </p>
            <button
              ref={closeRef}
              onClick={onClose}
              className="text-muted hover:text-bone p-2 -mr-2"
              aria-label="Close lightbox"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden>
                <path d="M3 3l12 12M15 3L3 15" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </button>
          </div>

          {/* Image area — drag horizontally to navigate */}
          <div className="relative flex-1 min-h-0 flex items-center justify-center p-4 sm:p-8">
            <AnimatePresence mode="wait">
              <motion.img
                key={piece.file}
                src={`/art/gallery/${piece.file}`}
                alt={piece.title}
                className="relative max-h-full max-w-full object-contain border border-line select-none"
                draggable={false}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.3}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -70) step(1);
                  else if (info.offset.x > 70) step(-1);
                }}
              />
            </AnimatePresence>

            <NavArrow dir={-1} onClick={() => step(-1)} />
            <NavArrow dir={1} onClick={() => step(1)} />
          </div>

          {/* Caption */}
          <div className="relative border-t border-line bg-surface px-5 py-4 shrink-0">
            <div className="max-w-3xl mx-auto flex flex-wrap items-baseline gap-x-6 gap-y-1.5">
              <h2 className="font-display text-xl text-bone">
                {piece.title}
                {piece.nsfw && (
                  <span className="ml-3 align-middle font-mono text-[0.6rem] uppercase tracking-[0.15em] text-mint border border-mint px-1.5 py-0.5">
                    18+
                  </span>
                )}
              </h2>
              {piece.credit && (
                <p className="font-mono text-[0.65rem] uppercase tracking-[0.15em] text-muted">
                  {piece.credit}
                </p>
              )}
              <p className="font-mono text-[0.65rem] text-muted">{piece.date}</p>
              {piece.tags.length > 0 && (
                <p className="font-mono text-[0.65rem] uppercase tracking-[0.1em] text-muted">
                  {piece.tags.join(" · ")}
                </p>
              )}
              {piece.description && (
                <p className="w-full text-sm text-muted leading-relaxed">
                  {piece.description}
                </p>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function NavArrow({ dir, onClick }: { dir: 1 | -1; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-label={dir === 1 ? "Next piece" : "Previous piece"}
      className={`absolute top-1/2 -translate-y-1/2 ${
        dir === 1 ? "right-2 sm:right-5" : "left-2 sm:left-5"
      } border border-line bg-ink text-muted hover:text-bone hover:border-bone p-3 transition-colors`}
    >
      <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden>
        <path
          d={dir === 1 ? "M5 2l6 6-6 6" : "M11 2L5 8l6 6"}
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
        />
      </svg>
    </button>
  );
}
