import type { Metadata } from "next";
import { gallery } from "@/content/gallery";
import SectionHeading from "@/components/SectionHeading";
import GalleryClient from "@/components/gallery/GalleryClient";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Finished works and studies by Aethy — anatomy studies, character design, illustration, and reference sheets.",
};

export default function GalleryPage() {
  return (
    <div className="max-w-6xl mx-auto px-5 pt-14">
      <SectionHeading fig="fig. 01 — the work" title="Gallery" />
      <GalleryClient pieces={gallery} />
    </div>
  );
}
