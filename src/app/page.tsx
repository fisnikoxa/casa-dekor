import type { Metadata } from "next";
import Link from "next/link";

import { HomeHero } from "@/components/home/home-hero";
import { Reveal } from "@/components/home/reveal";
import { SocialLinks } from "@/components/social-links";
import { siteConfig } from "@/lib/siteConfig";

const foregroundHero = {
  src: "https://images.unsplash.com/photo-1598300042247-d088f8be3cae?auto=format&fit=crop&w=2000&q=80",
  alt: "Gloss marble-look PVC panel treated as the single hero surface",
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
    "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=60",
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
        lede='We stack a blurred ambience layer, parallax-shifted focal panel imagery, optional ambient video behind translucency, and restrained scroll cues — all tuned for the “Premium panels. Honest prices.” promise.'
      />

      <section
        aria-labelledby="home-pillars-heading"
        className="mx-auto max-w-6xl px-5 py-20 lg:px-8 lg:py-28"
      >
        <Reveal>
          <header className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="font-sans text-xs font-semibold uppercase tracking-[0.32em] text-foreground/50">
                Understand the categories fast
              </p>
              <h2
                id="home-pillars-heading"
                className="mt-3 font-serif text-3xl font-semibold text-foreground"
              >
                Three pillars grounding every conversation
              </h2>
            </div>
            <p className="max-w-sm font-sans text-sm leading-relaxed text-foreground/65">
              Each pillar links deeper into routed pages so visitors never dead-end — tuned to the educational
              tone in WEBSITE_SPEC.
            </p>
          </header>
        </Reveal>
        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {pillars.map((pillar, index) => (
            <Reveal key={pillar.title} delayMs={index * 85} className="h-full">
              <article className="flex h-full flex-col rounded-sm border border-foreground/10 bg-[var(--header-surface)] p-8 shadow-[0px_42px_60px_-50px_rgb(31_28_26)]">
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
            </Reveal>
          ))}
        </div>
      </section>

      <section
        aria-labelledby="credibility-strip"
        className="relative overflow-hidden bg-charcoal px-5 py-16 text-footer-fg lg:px-8"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 scale-105 opacity-[0.13]"
          style={{
            backgroundImage: `url("${motifs.texture}")`,
            backgroundSize: "cover",
            filter: "blur(28px)",
          }}
        />
        <Reveal className="relative z-[1]">
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
        </Reveal>
      </section>

      <section
        aria-labelledby="deep-dive-teasers"
        className="mx-auto max-w-6xl px-5 py-20 lg:px-8 lg:py-24"
      >
        <Reveal>
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
            <Reveal key={teaser.href} delayMs={index * 110} className="h-full">
              <article className="h-full rounded-sm border border-foreground/10 bg-background p-8 transition duration-300 motion-safe:hover:-translate-y-1 motion-safe:hover:shadow-xl motion-reduce:shadow-md">
                <h3 className="font-serif text-xl text-foreground">{teaser.title}</h3>
                <p className="mt-4 font-sans text-sm leading-relaxed text-foreground/70">{teaser.body}</p>
                <Link
                  href={teaser.href}
                  className="mt-6 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.24em] text-accent hover:text-foreground"
                >
                  Open section
                </Link>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <Reveal className="mx-auto max-w-4xl px-5 pb-20 lg:px-8 lg:pb-28">
        <section
          aria-labelledby="home-social-connect"
          className="rounded-sm border border-accent/35 bg-[var(--header-surface)] p-10 text-center lg:text-left"
        >
          <span className="font-sans text-xs font-semibold uppercase tracking-[0.34em] text-foreground/50">
            Same social stack as the site header
          </span>
          <h2 id="home-social-connect" className="mt-4 font-serif text-2xl text-foreground">
            Follow façade drops & install dispatches between email threads
          </h2>
          <p className="mt-3 font-sans text-sm leading-relaxed text-foreground/70">
            Facebook and Instagram use{" "}
            <code className="rounded-sm bg-foreground/5 px-2 py-0.5 font-mono text-[0.7rem] text-foreground/85">
              NEXT_PUBLIC_FACEBOOK_URL
            </code>{" "}
            and{" "}
            <code className="rounded-sm bg-foreground/5 px-2 py-0.5 font-mono text-[0.7rem] text-foreground/85">
              NEXT_PUBLIC_INSTAGRAM_URL
            </code>
            . Icons, typography, and contrast mirror the masthead for consistent signalling.
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
