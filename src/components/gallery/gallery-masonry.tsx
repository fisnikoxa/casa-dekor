"use client";

import { useMemo, useState } from "react";

import { galleryPlaceholders, type GalleryPlaceholder } from "@/lib/galleryPlaceholders";

import { Lightbox } from "@/components/gallery/lightbox";
import { ParallaxContainedImage } from "@/components/parallax-contained-image";

export function GalleryMasonry() {
  const [lb, setLb] = useState<{ open: boolean; idx: number }>({
    open: false,
    idx: 0,
  });

  const images = useMemo(
    () =>
      galleryPlaceholders.map(({ src, alt }) => ({
        src,
        alt,
      })),
    [],
  );

  return (
    <>
      <div className="columns-1 gap-8 md:columns-2 xl:columns-3">
        {galleryPlaceholders.map((item: GalleryPlaceholder, index) => (
          <figure
            role="button"
            tabIndex={0}
            key={item.id}
            onClick={() => setLb({ open: true, idx: index })}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setLb({ open: true, idx: index });
              }
            }}
            className="group relative mb-8 cursor-pointer break-inside-avoid overflow-hidden rounded-sm border border-foreground/10 bg-[var(--header-surface)] shadow-[0px_42px_60px_-50px_rgb(31_31_31)] transition-[border-color,transform] duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-safe:hover:border-accent"
          >
            <ParallaxContainedImage
              src={item.src}
              alt={item.alt}
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
              loading={item.id === "g1" ? "eager" : "lazy"}
              containerClassName="relative aspect-[4/5] w-full overflow-hidden"
              strength={0.1}
              className="object-cover transition-transform duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
            />
            <figcaption className="px-5 py-4 font-sans text-sm leading-snug text-foreground/72 transition-transform duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1">
              {item.alt}
            </figcaption>
          </figure>
        ))}
      </div>

      {lb.open ? (
        <Lightbox
          images={images}
          initialIndex={lb.idx}
          onClose={() => setLb((s) => ({ ...s, open: false }))}
        />
      ) : null}
    </>
  );
}
