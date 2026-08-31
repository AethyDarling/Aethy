// Atelier-style section heading: a small mono "fig." annotation, the title,
// and a fine construction rule with proportion ticks beneath.
export default function SectionHeading({
  fig,
  title,
  children,
}: {
  /** Small annotation label, e.g. "fig. 01 — selected work". */
  fig: string;
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="mb-10">
      <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-amber mb-2">
        {fig}
      </p>
      <div className="flex items-end justify-between gap-6 mb-4">
        <h2 className="font-display text-3xl sm:text-4xl text-bone">{title}</h2>
        {children}
      </div>
      <div className="rule-ticks" aria-hidden />
    </div>
  );
}
