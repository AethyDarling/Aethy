"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import AgeGateModal from "./AgeGateModal";

// Session-scoped 18+ gate. The site is SFW by default; nsfw-flagged pieces
// are not rendered AT ALL (no thumbnails, no preloads) until the visitor
// confirms. The confirmation persists for the browser session only.

const STORAGE_KEY = "aethy-nsfw-ok";

type NsfwState = {
  /** true only after the visitor has confirmed 18+ AND toggled nsfw on. */
  showNsfw: boolean;
  /** Ask to enable (opens the age gate on first use) or disable. */
  setShowNsfw: (on: boolean) => void;
};

const Ctx = createContext<NsfwState>({ showNsfw: false, setShowNsfw: () => {} });

export function useNsfw() {
  return useContext(Ctx);
}

export function NsfwProvider({ children }: { children: React.ReactNode }) {
  const [showNsfw, setShown] = useState(false);
  const [gateOpen, setGateOpen] = useState(false);

  // Restore a previous confirmation for this session.
  useEffect(() => {
    try {
      if (sessionStorage.getItem(STORAGE_KEY) === "1") setShown(true);
    } catch {
      /* storage unavailable — stay SFW */
    }
  }, []);

  const setShowNsfw = useCallback((on: boolean) => {
    if (!on) {
      setShown(false);
      try {
        sessionStorage.removeItem(STORAGE_KEY);
      } catch {}
      return;
    }
    let confirmed = false;
    try {
      confirmed = sessionStorage.getItem(STORAGE_KEY) === "1";
    } catch {}
    if (confirmed) {
      setShown(true);
    } else {
      setGateOpen(true);
    }
  }, []);

  const confirmAge = useCallback(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {}
    setShown(true);
    setGateOpen(false);
  }, []);

  return (
    <Ctx.Provider value={{ showNsfw, setShowNsfw }}>
      {children}
      <AgeGateModal
        open={gateOpen}
        onConfirm={confirmAge}
        onDeny={() => setGateOpen(false)}
      />
    </Ctx.Provider>
  );
}
