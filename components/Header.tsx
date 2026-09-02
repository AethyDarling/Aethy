"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { commissions } from "@/content/commissions";
import { useNsfw } from "./NsfwContext";

const nav = [
  { href: "/gallery/", label: "Work" },
  { href: "/process/", label: "Process" },
  { href: "/characters/", label: "Characters" },
  { href: "/codex/", label: "Codex" },
  { href: "/commissions/", label: "Commissions" },
  { href: "/about/", label: "About" },
];

export default function Header() {
  const pathname = usePathname();
  const { showNsfw, setShowNsfw } = useNsfw();
  const [menuOpen, setMenuOpen] = useState(false);
  const open = commissions.commissionsOpen;

  return (
    <header className="sticky top-0 z-50 bg-ink border-b border-line">
      <div className="container-page h-16 md:h-20 flex items-center gap-6">
        <Link
          href="/"
          className="font-display text-xl tracking-[0.2em] text-bone shrink-0"
          onClick={() => setMenuOpen(false)}
        >
          AETHY
        </Link>

        <Link
          href="/commissions/"
          className="hidden lg:inline-block text-sm text-muted hover:text-bone transition-colors"
        >
          {open ? "Commissions open" : "Commissions closed"}
        </Link>

        <nav className="hidden md:flex items-center gap-8 ml-auto" aria-label="Main">
          {nav.map((item) => {
            const active = pathname?.startsWith(item.href.replace(/\/$/, ""));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`draw-link text-sm ${
                  active ? "text-bone" : "text-muted hover:text-bone"
                } transition-colors`}
              >
                {item.label}
              </Link>
            );
          })}
          <NsfwToggle showNsfw={showNsfw} setShowNsfw={setShowNsfw} />
        </nav>

        <div className="md:hidden ml-auto flex items-center gap-4">
          <NsfwToggle showNsfw={showNsfw} setShowNsfw={setShowNsfw} />
          <button
            className="text-muted hover:text-bone p-1"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden>
              {menuOpen ? (
                <path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="1.5" />
              ) : (
                <path d="M2 5h16M2 10h16M2 15h16" stroke="currentColor" strokeWidth="1.5" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav
          className="md:hidden border-t border-line bg-ink px-6 py-6 flex flex-col gap-5"
          aria-label="Main mobile"
        >
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="font-display text-2xl text-bone"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/commissions/"
            onClick={() => setMenuOpen(false)}
            className="text-sm text-muted"
          >
            {open ? "Commissions open" : "Commissions closed"}
          </Link>
        </nav>
      )}
    </header>
  );
}

function NsfwToggle({
  showNsfw,
  setShowNsfw,
}: {
  showNsfw: boolean;
  setShowNsfw: (on: boolean) => void;
}) {
  return (
    <button
      role="switch"
      aria-checked={showNsfw}
      aria-label="Show 18+ artwork"
      onClick={() => setShowNsfw(!showNsfw)}
      className={`text-xs border px-2.5 py-1 transition-colors ${
        showNsfw
          ? "border-mint text-ink bg-mint"
          : "border-line text-muted hover:border-muted hover:text-bone"
      }`}
    >
      18+ {showNsfw ? "on" : "off"}
    </button>
  );
}
