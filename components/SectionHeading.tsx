// Portfolio section heading: a small tracked-caps overline, a large sharp
// title, and a hairline beneath. Openness comes from scale and air, not
// ornament.
export default function SectionHeading({
  label,
  title,
  children,
}: {
  /** Small overline annotation, e.g. "01 — Selected work". */
  label: string;
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="mb-12 sm:mb-16">
      <div className="flex items-end justify-between gap-6 pb-6 border-b border-line">
        <div>
          <p className="label-caps text-muted mb-4">{label}</p>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-bone leading-[0.95]">
            {title}
          </h2>
        </div>
        {children}
      </div>
    </div>
  );
}
