import type { Metadata } from "next";
import { gallery, series } from "@/content/gallery";
import SectionHeading from "@/components/SectionHeading";
import GalleryClient from "@/components/gallery/GalleryClient";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Finished works and studies by Aethy — anatomy studies, character design, illustration, and reference sheets.",
};

export default function GalleryPage() {
  return (
    <div className="container-page pt-16 sm:pt-24">
      <SectionHeading label="01 — Complete works" title="Work" />
      <GalleryClient pieces={gallery} series={series} />
    </div>
  );
}
