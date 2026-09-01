"use client";

import Link from "next/link";
import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";

// A flat, sharp-edged CTA that leans gently toward the cursor.
// No gradients, no glow — the hover state is a solid color swap
// plus the magnetic drift.
export default function MagneticButton({
  href,
  children,
  variant = "solid",
}: {
  href: string;
  children: React.ReactNode;
  /** "solid" = filled bone (the primary action); "outline" = hairline. */
  variant?: "solid" | "outline";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 260, damping: 20 });
  const sy = useSpring(y, { stiffness: 260, damping: 20 });

  function onMove(e: React.PointerEvent) {
    if (reduced || e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * 0.22);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.22);
  }
  function onLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      style={{ x: sx, y: sy }}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className="inline-block"
    >
      <Link
        href={href}
        className={`inline-block font-mono text-xs uppercase tracking-[0.25em] px-8 py-4 border transition-colors ${
          variant === "solid"
            ? "border-bone bg-bone text-ink hover:bg-transparent hover:text-bone"
            : "border-line text-bone hover:border-bone"
        }`}
      >
        {children}
      </Link>
    </motion.div>
  );
}
