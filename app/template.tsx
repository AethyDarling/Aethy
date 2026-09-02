// No page-transition animation: navigation in a static export is instant,
// and the content should be readable the moment it lands.
export default function Template({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
