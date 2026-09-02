import type { Metadata } from "next";
import Link from "next/link";
import { process } from "@/content/process";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import ProcessViewer from "@/components/process/ProcessViewer";

export const metadata: Metadata = {
  title: "Process",
  description:
    "Stage-by-stage breakdowns of how Aethy builds a piece, gesture and construction first, then line, colour, and light.",
};

export default function ProcessPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 md:px-10 pt-16 sm:pt-24">
      <SectionHeading title="Process">
        <Link
          href="/gallery/"
          className="draw-link text-sm text-muted hover:text-bone shrink-0 mb-2"
        >
          Finished work</Link>
      </SectionHeading>

      {process.length > 0 ? (
        process.map((series, i) => (
          <Reveal key={series.id} delay={i * 0.05}>
            <ProcessViewer series={series} />
          </Reveal>
        ))
      ) : (
        <div className="art-slot aspect-[16/9]">
          <p>
            no process series yet
            <br />
            <span className="normal-case tracking-normal">
              add stage images and list them in content/process.ts
            </span>
          </p>
        </div>
      )}
    </div>
  );
}
