import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { listCollections } from "@/lib/collections";

export const metadata: Metadata = {
  title: "Collections",
  description:
    "Browse CASA DECOR PVC wall décor collections curated for Macedonia — marble-effect, precision panels, tonal finishes.",
};

export default function CollectionsIndexPage() {
  const collections = listCollections();

  return (
    <>
      <header className="border-b border-accent/35 bg-[var(--header-surface)] px-5 py-12 lg:px-8 lg:py-16">
        <div className="mx-auto flex max-w-5xl flex-col gap-6 text-left">
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.32em] text-foreground/55">
            Product families
          </p>
          <h1 className="font-serif text-4xl font-semibold tracking-tight text-foreground sm:text-[2.85rem]">
            Collections calibrated for Macedonia-based interiors
          </h1>
          <p className="max-w-2xl font-sans text-base leading-[1.8] text-foreground/72">
            Every range below ladders into detailed install notes, tonal pairings,
            and indicative budgeting in MKD. Tap a suite to inspect individual
            façade systems.
          </p>
          <nav aria-label="Collection shortcuts">
            <ol className="flex flex-wrap gap-3 font-sans text-sm text-foreground/70">
              {collections.map((entry) => (
                <li key={entry.slug}>
                  <Link
                    href={`#${entry.slug}`}
                    className="rounded-full border border-foreground/20 px-4 py-2 text-xs uppercase tracking-[0.2em] text-foreground hover:border-accent hover:text-accent"
                  >
                    {entry.title}
                  </Link>
                </li>
              ))}
            </ol>
          </nav>
        </div>
      </header>

      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 lg:gap-14 lg:px-8 lg:py-24">
        {collections.map((collection) => (
          <article
            key={collection.slug}
            id={collection.slug}
            className="grid gap-8 rounded-sm border border-foreground/10 bg-background/95 p-6 shadow-[0px_36px_80px_-64px_rgb(31_28_25)] lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:items-center lg:p-10"
          >
            <Link
              href={`/collections/${collection.slug}`}
              className="group relative isolate block aspect-[4/3] w-full overflow-hidden rounded-sm lg:aspect-[11/13]"
              aria-label={`Explore ${collection.title}`}
            >
              <Image
                src={collection.cover.src}
                alt={collection.cover.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover transition duration-500 ease-out group-hover:scale-[1.02]"
              />
              <span className="absolute inset-x-4 bottom-4 rounded-full bg-charcoal/80 px-4 py-3 text-xs font-semibold uppercase tracking-[0.22em] text-footer-fg opacity-95 backdrop-blur">
                Explore full suite
              </span>
            </Link>

            <div className="flex flex-col gap-5">
              <div>
                <h2 className="font-serif text-3xl font-semibold tracking-tight text-foreground">
                  <Link href={`/collections/${collection.slug}`}>{collection.title}</Link>
                </h2>
                <p className="mt-3 font-sans text-base leading-[1.8] text-foreground/70">
                  {collection.summary}
                </p>
              </div>
              <ul className="grid gap-2 font-sans text-sm text-foreground/65 md:grid-cols-2">
                {collection.products.slice(0, 4).map((product) => (
                  <li key={product.slug}>
                    <Link
                      href={`/collections/${collection.slug}/${product.slug}`}
                      className="underline-offset-4 hover:text-accent hover:underline"
                    >
                      {product.title}
                    </Link>
                  </li>
                ))}
              </ul>
              <div>
                <Link
                  href={`/collections/${collection.slug}`}
                  className="inline-flex rounded-full bg-foreground px-7 py-3 font-sans text-xs font-semibold uppercase tracking-[0.28em] text-background transition-colors hover:bg-charcoal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                >
                  Open collection dossier
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
