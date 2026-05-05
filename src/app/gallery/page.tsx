import type { Metadata } from "next";

import { GalleryMasonry } from "@/components/gallery/gallery-masonry";
import { InnerPageHeader } from "@/components/inner-page-header";
import { Reveal } from "@/components/home/reveal";

const BACKDROP_GALLERY =
  "https://images.unsplash.com/photo-1631679706909-1844bbd07221?auto=format&fit=crop&w=1600&q=65";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Placeholder installs visualising CASA DECOR cladding moods — Macedonia residential and light-commercial inspiration.",
};

export default function GalleryPage() {
  return (
    <main className="bg-background pb-24">
      <InnerPageHeader backdropSrc={BACKDROP_GALLERY} parallaxStrength={0.4}>
        <Reveal>
          <div className="mx-auto max-w-4xl space-y-5">
            <p className="font-sans text-xs font-semibold uppercase tracking-[0.32em] text-foreground/50">
              Visual references
            </p>
            <h1 className="font-serif text-4xl font-extrabold tracking-tight text-foreground sm:text-[2.75rem]">
              Installation vignettes & material moods
            </h1>
            <p className="font-sans text-lg leading-relaxed text-foreground/73">
              A curated collection of surfaces, textures, and installed environments that reflect the depth and
              quality of CASA DECOR&apos;s PVC wall panel range.
            </p>
          </div>
        </Reveal>
      </InnerPageHeader>

      <section
        aria-labelledby="gallery-grid-heading"
        className="mx-auto max-w-6xl px-5 py-14 lg:px-8 lg:py-16"
      >
        <Reveal>
          <div className="flex flex-wrap items-center justify-between gap-4 pb-12">
            <h2 id="gallery-grid-heading" className="font-serif text-2xl text-foreground">
              Editorial masonry preview
            </h2>
            <p className="max-w-xl font-sans text-sm leading-relaxed text-foreground/65">
              Browse by mood — from marble drama to tonal calm.
            </p>
          </div>
        </Reveal>

        <GalleryMasonry />
      </section>
    </main>
  );
}
