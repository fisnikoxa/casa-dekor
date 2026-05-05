import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import {
  getCollection,
  getCollectionSlugParams,
} from "@/lib/collections";
import { formatMkd } from "@/lib/formatMkd";

export const dynamicParams = false;

export function generateStaticParams() {
  return getCollectionSlugParams();
}

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const catalog = getCollection(slug);

  return {
    title: catalog?.title ?? "Collection",
    description:
      catalog?.summary ??
      "Explore CASA DECOR PVC wall décors calibrated for Macedonia-based installs.",
    openGraph: catalog
      ? {
          title: `${catalog.title} · CASA DECOR`,
          description: catalog.summary,
        }
      : undefined,
  };
}

export default async function CollectionDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const collection = getCollection(slug);

  if (!collection) {
    notFound();
  }

  return (
    <main className="bg-background pb-24">
      <header className="border-b border-accent/25 bg-[var(--header-surface)] px-5 py-12 lg:px-8 lg:py-16">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.08fr_minmax(0,0.9fr)] lg:items-center lg:gap-16">
          <div className="flex flex-col gap-6">
            <nav aria-label="Breadcrumb" className="font-sans text-xs uppercase tracking-[0.26em] text-foreground/50">
              <ol className="flex flex-wrap gap-2">
                <li>
                  <Link href="/collections" className="hover:text-foreground">
                    Collections
                  </Link>
                  <span className="px-2 text-accent">/</span>
                </li>
                <li aria-current="page" className="text-foreground/80">
                  {collection.title}
                </li>
              </ol>
            </nav>
            <div>
              <h1 className="font-serif text-4xl font-semibold tracking-tight text-foreground sm:text-[2.75rem]">
                {collection.title}
              </h1>
              <p className="mt-6 max-w-2xl font-sans text-lg leading-relaxed text-foreground/74">
                {collection.summary}
              </p>
            </div>
            <p className="max-w-2xl rounded-sm border border-foreground/15 bg-background/95 p-6 font-sans text-sm leading-[1.8] text-foreground/70 shadow-[inset_0px_1px_0_rgba(17,17,17,0.06)]">
              {collection.story}
            </p>
            <nav aria-labelledby="collections-product-range" className="space-y-3">
              <p
                id="collections-product-range"
                className="font-sans text-xs uppercase tracking-[0.32em] text-foreground/50"
              >
                Products in this lineup
              </p>
              <ul className="grid gap-2 font-sans text-sm text-accent sm:grid-cols-2">
                {collection.products.map((product) => (
                  <li key={product.slug}>
                    <Link
                      href={`/collections/${collection.slug}/${product.slug}`}
                      className="underline-offset-[6px] hover:underline hover:text-accent/80"
                    >
                      {product.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          <div className="relative aspect-[11/13] overflow-hidden rounded-sm border border-accent/30">
            <Image
              src={collection.cover.src}
              alt={collection.cover.alt}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover"
            />
          </div>
        </div>
      </header>

      <section
        aria-labelledby="collection-product-grid"
        className="mx-auto max-w-6xl px-5 pt-14 lg:px-8 lg:pt-16"
      >
        <header className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-sans text-xs uppercase tracking-[0.32em] text-foreground/50">
              Responsive grid preview
            </p>
            <h2 id="collection-product-grid" className="mt-3 font-serif text-3xl text-foreground">
              Panel systems & finishes
            </h2>
          </div>
          <p className="max-w-sm font-sans text-sm text-foreground/65">
            Indicative “from” prices include MKD labelling once you drill into SKUs —
            final quotes depend on site conditions and batch availability.
          </p>
        </header>

        <div className="mt-12 grid gap-10 sm:grid-cols-2 xl:grid-cols-3">
          {collection.products.map((product) => {
            const href = `/collections/${collection.slug}/${product.slug}`;
            return (
              <article
                key={product.slug}
                className="flex h-full flex-col overflow-hidden rounded-sm border border-foreground/10 bg-background shadow-[0px_32px_60px_-50px_rgb(43_42_41)]"
              >
                <Link href={href} className="relative aspect-square w-full">
                  <Image
                    src={product.image.src}
                    alt={product.image.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1280px) 45vw, 30vw"
                    className="object-cover"
                  />
                </Link>
                <div className="flex flex-1 flex-col gap-5 p-7">
                  <div>
                    <h3 className="font-serif text-2xl text-foreground">
                      <Link href={href}>{product.title}</Link>
                    </h3>
                    <p className="mt-3 font-sans text-sm leading-relaxed text-foreground/70">
                      {product.teaser}
                    </p>
                  </div>
                  {typeof product.indicativeFromMKD === "number" ? (
                    <p className="font-sans text-xs uppercase tracking-[0.24em] text-foreground/55">
                      Indicative from{" "}
                      <span className="text-accent">
                        {formatMkd(product.indicativeFromMKD)}
                      </span>
                      <span className="block pt-3 text-[0.7rem] font-normal normal-case tracking-normal text-foreground/45">
                        All listed amounts are illustrative MKD placeholders until your
                        project is surveyed.
                      </span>
                    </p>
                  ) : (
                    <p className="font-sans text-sm text-foreground/60">
                      Detailed pricing forthcoming — contact CASA DECOR directly for MKD quotations.
                    </p>
                  )}
                  <Link
                    href={href}
                    className="mt-auto inline-flex items-center justify-center rounded-full border border-foreground px-5 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-foreground hover:bg-foreground hover:text-background focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                  >
                    Open product sheet
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
}
