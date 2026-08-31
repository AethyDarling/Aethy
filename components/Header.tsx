"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { site } from "@/content/site";
import { commissions } from "@/content/commissions";
import { useNsfw } from "./NsfwContext";

const nav = [
  { href: "/gallery/", label: "Gallery" },
  { href: "/characters/", label: "Characters" },
  { href: "/commissions/", label: "Commissions" },
  { href: "/about/", label: "About" },
];

export default function Header() {
  const pathname = usePathname();
  const { showNsfw, setShowNsfw } = useNsfw();
  const [menuOpen, setMenuOpen] = useState(false);
  const open = commissions.commissionsOpen;

  return (
    <header className="sticky top-0 z-50 bg-ink/95 backdrop-blur-none border-b border-line">
      <div className="max-w-6xl mx-auto px-5 h-14 flex items-center gap-5">
        <Link
          href="/"
          className="font-display text-lg tracking-wide text-bone shrink-0"
          onClick={() => setMenuOpen(false)}
        >
          AETHY
        </Link>

        <Link
          href="/commissions/"
          className={`hidden sm:inline-flex items-center gap-1.5 font-mono text-[0.6rem] uppercase tracking-[0.15em] border px-2 py-1 ${
            open ? "border-mint text-mint" : "border-rust text-rust"
          }`}
        >
          <span
            aria-hidden
            className={`inline-block w-1.5 h-1.5 ${open ? "bg-mint" : "bg-rust"}`}
          />
          {open ? "comms open" : "comms closed"}
        </Link>

        <nav className="hidden md:flex items-center gap-6 ml-auto" aria-label="Main">
          {nav.map((item) => {
            const active = pathname?.startsWith(item.href.replace(/\/$/, ""));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`draw-link text-sm ${
                  active ? "text-amber" : "text-muted hover:text-bone"
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
          className="md:hidden border-t border-line bg-ink px-5 py-4 flex flex-col gap-4"
          aria-label="Main mobile"
        >
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="text-bone text-base"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/commissions/"
            onClick={() => setMenuOpen(false)}
            className={`font-mono text-[0.65rem] uppercase tracking-[0.15em] ${
              open ? "text-mint" : "text-rust"
            }`}
          >
            commissions {open ? "open" : "closed"}
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
      className={`font-mono text-[0.6rem] uppercase tracking-[0.15em] border px-2 py-1 transition-colors ${
        showNsfw
          ? "border-mint text-ink bg-mint"
          : "border-line text-muted hover:border-mint hover:text-mint"
      }`}
    >
      18+ {showNsfw ? "on" : "off"}
    </button>
  );
}
