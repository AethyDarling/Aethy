"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function AgeGateModal({
  open,
  onConfirm,
  onDeny,
}: {
  open: boolean;
  onConfirm: () => void;
  onDeny: () => void;
}) {
  const confirmRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    confirmRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onDeny();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onDeny]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[90] flex items-center justify-center p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="agegate-title"
        >
          <button
            aria-label="Close"
            className="absolute inset-0 bg-ink/85 cursor-default"
            onClick={onDeny}
            tabIndex={-1}
          />
          <motion.div
            className="relative bg-surface border border-line max-w-sm w-full p-8"
            initial={{ y: 16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 8, opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-sm text-mint mb-4">Content notice</p>
            <h2 id="agegate-title" className="font-display text-2xl mb-3">
              Adult artwork ahead
            </h2>
            <p className="text-muted text-sm leading-relaxed mb-7">
              Some pieces on this site are marked 18+. They stay hidden unless
              you confirm you're an adult. Your choice lasts for this browser
              session only.
            </p>
            <div className="flex gap-3">
              <button
                ref={confirmRef}
                onClick={onConfirm}
                className="flex-1 border border-bone bg-bone text-ink font-medium py-2.5 text-sm hover:bg-transparent hover:text-bone transition-colors"
              >
                I'm 18 or older
              </button>
              <button
                onClick={onDeny}
                className="flex-1 border border-line text-muted py-2.5 text-sm hover:border-bone hover:text-bone transition-colors"
              >
                Keep it SFW
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
