// Content is shown at rest. This wrapper used to fade blocks in on scroll;
// it now renders children plainly and stays only so call sites keep working.
export default function Reveal({
  children,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return className ? <div className={className}>{children}</div> : <>{children}</>;
}
