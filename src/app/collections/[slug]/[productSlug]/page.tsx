import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import {
  getCollectionProductSlugParams,
  getProductDetail,
} from "@/lib/collections";
import { formatMkd } from "@/lib/formatMkd";

export const dynamicParams = false;

export function generateStaticParams() {
  return getCollectionProductSlugParams();
}

type PageProps = {
  params: Promise<{ slug: string; productSlug: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug, productSlug } = await params;
  const detail = getProductDetail(slug, productSlug);

  if (!detail) {
    return { title: "Product" };
  }

  const { collection, product } = detail;

  return {
    title: product.title,
    description: product.teaser,
    openGraph: {
      title: `${product.title} · ${collection.title}`,
      description: product.teaser,
    },
  };
}

export default async function CollectionProductPage({ params }: PageProps) {
  const { slug, productSlug } = await params;
  const detail = getProductDetail(slug, productSlug);

  if (!detail) {
    notFound();
  }

  const { collection, product } = detail;

  return (
    <article className="bg-background pb-24">
      <header className="border-b border-accent/25 bg-[var(--header-surface)] px-5 py-12 lg:px-8 lg:py-16">
        <nav
          aria-label="Breadcrumb"
          className="mx-auto mb-10 max-w-6xl font-sans text-xs uppercase tracking-[0.26em] text-foreground/50"
        >
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link href="/collections" className="hover:text-foreground">
                Collections
              </Link>
              <span className="px-2 text-accent">/</span>
            </li>
            <li>
              <Link
                href={`/collections/${collection.slug}`}
                className="hover:text-foreground"
              >
                {collection.title}
              </Link>
              <span className="px-2 text-accent">/</span>
            </li>
            <li aria-current="page" className="max-w-xl text-pretty text-foreground/80">
              {product.title}
            </li>
          </ol>
        </nav>

        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.06fr_minmax(0,0.95fr)] lg:items-center lg:gap-16">
          <div className="relative aspect-square overflow-hidden rounded-sm border border-accent/35 lg:aspect-[11/13]">
            <Image
              src={product.image.src}
              alt={product.image.alt}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="flex flex-col gap-6">
            <p className="font-sans text-xs font-semibold uppercase tracking-[0.32em] text-foreground/50">
              SKU spotlight
            </p>
            <h1 className="font-serif text-4xl font-extrabold tracking-tight text-foreground sm:text-[2.75rem]">
              {product.title}
            </h1>
            <p className="font-sans text-lg leading-relaxed text-foreground/75">
              {product.teaser}
            </p>
            {typeof product.indicativeFromMKD === "number" ? (
              <div className="rounded-sm border border-accent/40 bg-accent/15 px-6 py-5">
                <p className="font-sans text-sm font-semibold uppercase tracking-[0.28em] text-foreground">
                  Illustrative MKD bracket
                </p>
                <p className="mt-4 font-serif text-3xl text-foreground">
                  from {formatMkd(product.indicativeFromMKD)}
                </p>
                <p className="mt-3 font-sans text-xs leading-relaxed text-foreground/65">
                  Shown strictly as a directional placeholder in Macedonian Denar —
                  confirm allowances, trims, adhesives, and logistics with CASA DECOR prior to awarding work.
                </p>
              </div>
            ) : (
              <p className="font-sans text-sm text-foreground/65">
                Request an MKD quote — we reconcile batch pricing once wall conditions and logistics are clarified.
              </p>
            )}
            <section aria-labelledby={`${product.slug}-highlights`}>
              <h2
                id={`${product.slug}-highlights`}
                className="font-sans text-xs font-semibold uppercase tracking-[0.32em] text-foreground/50"
              >
                Installer highlights
              </h2>
              <ul className="mt-4 space-y-2 pl-5 font-sans text-sm text-foreground/75 marker:text-accent list-disc">
                {product.highlights.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
            <div className="flex flex-wrap gap-4">
              <Link
                href={`/collections/${collection.slug}`}
                className="rounded-full bg-foreground px-7 py-3 font-sans text-xs font-semibold uppercase tracking-[0.26em] text-background transition-colors hover:bg-charcoal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
              >
                Return to lineup
              </Link>
              <Link
                href="/contact"
                className="rounded-full border border-foreground px-7 py-3 font-sans text-xs font-semibold uppercase tracking-[0.26em] text-foreground hover:bg-foreground hover:text-background"
              >
                Request quoting
              </Link>
            </div>
          </div>
        </div>
      </header>

      <section
        aria-labelledby={`${product.slug}-detail-copy`}
        className="mx-auto max-w-3xl px-5 pt-16 lg:px-8"
      >
        <h2
          id={`${product.slug}-detail-copy`}
          className="font-serif text-2xl text-foreground"
        >
          Application notes
        </h2>
        <p className="mt-8 font-sans text-base leading-[1.9] text-foreground/76">
          {product.body}
        </p>
      </section>
    </article>
  );
}
