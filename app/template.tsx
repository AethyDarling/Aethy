"use client";

import { motion, useReducedMotion } from "framer-motion";

// App Router remounts this on every navigation, giving each page a quiet
// entrance. Exit animations are deliberately skipped — static export keeps
// navigation instant and we never want transitions to feel laggy.
export default function Template({ children }: { children: React.ReactNode }) {
  const reduced = useReducedMotion();
  if (reduced) return <>{children}</>;
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
