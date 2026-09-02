// Section heading: a large title with an optional short overline, rule beneath.
export default function SectionHeading({
  label,
  title,
  children,
}: {
  label?: string;
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="mb-12 sm:mb-16">
      <div className="flex items-end justify-between gap-6 pb-6 border-b border-line">
        <div>
          {label && <p className="overline text-muted mb-3">{label}</p>}
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-bone leading-[0.95]">
            {title}
          </h2>
        </div>
        {children}
      </div>
    </div>
  );
}
