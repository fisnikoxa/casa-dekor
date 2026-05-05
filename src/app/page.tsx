import type { Metadata } from "next";
import Link from "next/link";

import { CredibilityStrip } from "@/components/home/credibility-strip";
import { HomeHero } from "@/components/home/home-hero";
import { Reveal } from "@/components/home/reveal";
import { StatCounterSection } from "@/components/home/stat-counter";
import { SocialLinks } from "@/components/social-links";
import { TiltCard } from "@/components/tilt-card";
import { siteConfig } from "@/lib/siteConfig";

const foregroundHero = {
  src: "/heroimage.png",
  alt: "Modern tiled storefront façade with stone panels, warm wood accents, and glass entrance — architectural exterior mood",
};

export const metadata: Metadata = {
  description:
    "PVC wall panels and marble-effect décors for Macedonia — deliberate collections, honest MKD scaffolding, installer-minded details.",
};

const pillars = [
  {
    title: "PVC wall panels",
    copy: "Architectural grooves, tonal solids, acoustic-ready stacks — PVC engineered for repeatable installs.",
    href: "/materials#pvc-benefits",
    cta: "Review material logic",
  },
  {
    title: "PVC marble décor",
    copy: "Veined drama without stone porosity — curated gloss levels that respect ambient Macedonian daylight.",
    href: "/materials#marble-vs-solid",
    cta: "Compare moods",
  },
  {
    title: "Interior transformation",
    copy: "Collection dossiers unify trims, adhesives cues, illustrative MKD so concepts translate to drywall quickly.",
    href: "/collections",
    cta: "Inspect suites",
  },
] as const;

const teasers = [
  {
    title: "Browse collections",
    body: "Marble glamour, rhythmic flutes, tonal suites — navigate SKUs anchored to illustrative MKD placeholders.",
    href: "/collections",
  },
  {
    title: "Materials intelligence",
    body: "Skimmable guidance on PVC benefits, marble vs solids, pragmatic room pairings, and maintenance honesty.",
    href: "/materials",
  },
  {
    title: "Gallery vignettes",
    body: "Masonry-inspired columns of placeholder photography until your portfolio sessions wrap.",
    href: "/gallery",
  },
] as const;

const motifs = {
  texture:
    "https://images.unsplash.com/photo-1631679706909-1844bbd07221?auto=format&fit=crop&w=1200&q=60",
};

export default function Home() {
  return (
    <div className="bg-background">
      <HomeHero
        foregroundSrc={foregroundHero.src}
        foregroundAlt={foregroundHero.alt}
        eyebrow="Republic of North Macedonia · Wall décors supplier"
        title="CASA DECOR elevates PVC walls with marble intent"
        slogan={siteConfig.slogan}
        lede="Based in North Macedonia, we supply PVC wall panels and marble-effect finishes engineered for real installs — durable coatings, honest MKD scaffolding, and surfaces that read luxury without stone-maintenance drama."
      />

      <section
        aria-labelledby="home-pillars-heading"
        className="mx-auto max-w-6xl px-5 py-20 lg:px-8 lg:py-28"
      >
        <Reveal scrollParallax>
          <header className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="font-sans text-xs font-semibold uppercase tracking-[0.32em] text-foreground/50">
                Understand the categories fast
              </p>
              <h2
                id="home-pillars-heading"
                className="mt-3 font-serif text-3xl font-bold text-foreground"
              >
                Three pillars grounding every conversation
              </h2>
            </div>
            <p className="max-w-sm font-sans text-sm leading-relaxed text-foreground/65">
              Each pillar links deeper so visitors always have a clear next step.
            </p>
          </header>
        </Reveal>
        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {pillars.map((pillar, index) => (
            <Reveal
              key={pillar.title}
              delayMs={index * 85}
              className="h-full"
              scrollParallax
            >
              <TiltCard className="h-full">
                <article className="group relative flex h-full flex-col overflow-hidden rounded-sm border border-foreground/10 bg-[var(--header-surface)] p-8 shadow-[0px_42px_60px_-50px_rgb(31_28_26)] transition-[transform,box-shadow,border-color] duration-500 motion-safe:hover:-translate-y-1 motion-safe:hover:border-accent/40 motion-safe:hover:shadow-[0_48px_80px_-52px_rgba(26,22,18,0.45)]">
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/45 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  />
                  <h3 className="font-serif text-2xl text-foreground">{pillar.title}</h3>
                  <p className="mt-4 flex-1 font-sans text-sm leading-relaxed text-foreground/70">
                    {pillar.copy}
                  </p>
                  <Link
                    href={pillar.href}
                    className="mt-10 inline-flex text-xs font-semibold uppercase tracking-[0.26em] text-accent underline-offset-8 hover:text-foreground hover:underline"
                  >
                    {pillar.cta}
                  </Link>
                </article>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </section>

      <CredibilityStrip textureUrl={motifs.texture}>
        <div className="mx-auto flex max-w-5xl flex-col gap-6 text-center lg:text-left">
          <h2 id="credibility-strip" className="font-serif text-3xl tracking-tight text-footer-fg">
            Credibility anchored in Macedonia-wide logistics — not gimmicks.
          </h2>
          <p className="font-sans text-base leading-relaxed text-footer-muted">
            We obsess over repeatable batches, adhesives pairing with local substrates, and contractor-friendly trims.
            Transparent MKD scaffolding keeps procurement talking with finance early — no phantom “call for price”
            traps.
          </p>
          <p className="font-sans text-sm text-footer-muted">
            No showroom curbs clutter; service stays within Republic of North Macedonia per our operating charter.
          </p>
        </div>
      </CredibilityStrip>

      <StatCounterSection />

      <section
        aria-labelledby="deep-dive-teasers"
        className="mx-auto max-w-6xl px-5 py-20 lg:px-8 lg:py-24"
      >
        <Reveal scrollParallax>
          <div className="flex flex-wrap items-center justify-between gap-6 pb-14">
            <div>
              <p className="font-sans text-xs font-semibold uppercase tracking-[0.32em] text-foreground/50">
                Continue exploring
              </p>
              <h2 id="deep-dive-teasers" className="mt-3 font-serif text-3xl text-foreground">
                Collections, guidance, imagery — one disciplined route map
              </h2>
            </div>
            <Link
              href="/about"
              className="text-sm font-semibold uppercase tracking-[0.22em] text-accent hover:text-foreground"
            >
              Read our Macedonia story →
            </Link>
          </div>
        </Reveal>
        <div className="grid gap-8 md:grid-cols-3">
          {teasers.map((teaser, index) => (
            <Reveal
              key={teaser.href}
              delayMs={index * 110}
              className="h-full"
              scrollParallax
            >
              <TiltCard className="h-full">
                <article className="group relative h-full overflow-hidden rounded-sm border border-foreground/10 bg-background p-8 shadow-[0_28px_56px_-44px_rgba(26,22,18,0.35)] transition-[transform,box-shadow,border-color] duration-500 motion-safe:hover:-translate-y-1 motion-safe:hover:border-accent/35 motion-safe:hover:shadow-[0_40px_72px_-48px_rgba(26,22,18,0.42)] motion-reduce:shadow-md">
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 bg-gradient-to-br from-accent/[0.06] via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  />
                  <h3 className="font-serif text-xl text-foreground">{teaser.title}</h3>
                  <p className="mt-4 font-sans text-sm leading-relaxed text-foreground/70">{teaser.body}</p>
                  <Link
                    href={teaser.href}
                    className="mt-6 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.24em] text-accent hover:text-foreground"
                  >
                    Open section
                  </Link>
                </article>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </section>

      <Reveal scrollParallax className="mx-auto max-w-4xl px-5 pb-20 lg:px-8 lg:pb-28">
        <section
          aria-labelledby="home-social-connect"
          className="rounded-sm border border-accent/35 bg-[var(--header-surface)] p-10 text-center lg:text-left"
        >
          <span className="font-sans text-xs font-semibold uppercase tracking-[0.34em] text-foreground/50">
            Stay connected
          </span>
          <h2 id="home-social-connect" className="mt-4 font-serif text-2xl text-foreground">
            Follow façade drops & install dispatches between email threads
          </h2>
          <p className="mt-3 font-sans text-sm leading-relaxed text-foreground/70">
            Follow our latest collections, installation previews, and design inspiration on Facebook and Instagram.
          </p>
          <SocialLinks
            variant="header"
            className="mt-8 justify-center lg:justify-start"
            facebookHref={siteConfig.social.facebookUrl}
            instagramHref={siteConfig.social.instagramUrl}
          />
        </section>
      </Reveal>
    </div>
  );
}
