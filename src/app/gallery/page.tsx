import type { Metadata } from "next";
import Image from "next/image";

import { galleryPlaceholders } from "@/lib/galleryPlaceholders";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Placeholder installs visualising CASA DECOR cladding moods — Macedonia residential and light-commercial inspiration.",
};

export default function GalleryPage() {
  return (
    <main className="bg-background pb-24">
      <header className="border-b border-accent/25 bg-[var(--header-surface)] px-5 py-12 lg:px-8 lg:py-16">
        <div className="mx-auto max-w-4xl space-y-5">
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.32em] text-foreground/50">
            Visual references
          </p>
          <h1 className="font-serif text-4xl font-semibold tracking-tight text-foreground sm:text-[2.75rem]">
            Moodboard placeholders while photography catches up
          </h1>
          <p className="font-sans text-lg leading-relaxed text-foreground/73">
            These royalty-free vignettes imitate the gloss control, tactile grain, and scale we specify on
            site. Swap them for Macedonia-based installs whenever your photographer schedules capture days.
          </p>
        </div>
      </header>

      <section
        aria-labelledby="gallery-grid-heading"
        className="mx-auto max-w-6xl px-5 py-14 lg:px-8 lg:py-16"
      >
        <div className="flex flex-wrap items-center justify-between gap-4 pb-12">
          <h2 id="gallery-grid-heading" className="font-serif text-2xl text-foreground">
            Editorial masonry preview
          </h2>
          <p className="max-w-xl font-sans text-sm leading-relaxed text-foreground/65">
            Responsive columns keep breathing room across tablets; captions stay meaningful for SEO and
            screen readers alike.
          </p>
        </div>

        <div className="columns-1 gap-8 md:columns-2 xl:columns-3">
          {galleryPlaceholders.map((item) => (
            <figure
              key={item.id}
              className="relative mb-8 break-inside-avoid overflow-hidden rounded-sm border border-foreground/10 bg-[var(--header-surface)] shadow-[0px_42px_60px_-50px_rgb(31_31_31)]"
            >
              <div className="relative aspect-[4/5] w-full">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  className="object-cover"
                  loading={item.id === "g1" ? "eager" : "lazy"}
                />
              </div>
              <figcaption className="px-5 py-4 font-sans text-sm leading-snug text-foreground/72">
                {item.alt}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
    </main>
  );
}
