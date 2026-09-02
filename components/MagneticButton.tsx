import Link from "next/link";

// A plain button-styled link. "solid" is the primary action; "outline" the
// secondary. No motion beyond the color swap on hover.
export default function MagneticButton({
  href,
  children,
  variant = "solid",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "solid" | "outline";
}) {
  return (
    <Link
      href={href}
      className={`inline-block font-sans text-xs uppercase tracking-[0.08em] px-7 py-3.5 border transition-colors ${
        variant === "solid"
          ? "border-bone bg-bone text-ink hover:bg-transparent hover:text-bone"
          : "border-line text-bone hover:border-bone"
      }`}
    >
      {children}
    </Link>
  );
}
