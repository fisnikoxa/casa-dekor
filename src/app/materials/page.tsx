import type { Metadata } from "next";
import Link from "next/link";

import { InnerPageHeader } from "@/components/inner-page-header";
import { MarbleVsSolidBody } from "@/components/materials/marble-vs-solid-body";
import { Reveal } from "@/components/home/reveal";

const BACKDROP_MATERIALS =
  "https://images.unsplash.com/photo-1574359410119-3a38e817c104?auto=format&fit=crop&w=1600&q=65";

export const metadata: Metadata = {
  title: "Materials",
  description:
    "Learn how CASA DECOR mixes PVC practicality with marble glamour — comparisons, suggested rooms in Macedonia, and honest maintenance cues.",
};

const sectionsBeforeMarble = [
  {
    id: "pvc-benefits",
    title: "Why PVC wall cladding works",
    kicker: "Performance without theatre",
    body: (
      <>
        <p className="mb-6 text-base leading-[1.9]">
          Macedonia’s winters are damp, summers switch on AC-heavy swings. PVC laminates shrug off the
          micro-movements that crack brittle finishes, resist splashes beside kitchen runs, and keep
          install-day dust lower than poured solutions.
        </p>
        <ul className="space-y-3 pl-5 text-sm leading-relaxed marker:text-accent list-disc">
          <li>Hygienic wipe-down routine for cafes, studios, clinics.</li>
          <li>Lighter payloads vs stone slabs — freight within the region stays predictable.</li>
          <li>Repeatable trims so electricians can reposition outlets without patching marble veins.</li>
        </ul>
      </>
    ),
  },
] as const;

const marbleSection = {
  id: "marble-vs-solid",
  title: "Marble-effect glamour vs tonal solids",
  kicker: "Pick the storyline your space already hints at",
} as const;

const sectionsAfterMarble = [
  {
    id: "rooms",
    title: "Suggested rooms & adjacencies",
    kicker: "Skimmable planning cues",
    body: (
      <>
        <dl className="space-y-5 text-sm leading-relaxed text-foreground/75">
          <div className="rounded-sm border border-foreground/10 p-6">
            <dt className="font-serif text-xl text-foreground">Living rooms & media walls</dt>
            <dd className="mt-3">
              Pair fluted rails with recessed LED channels; marble-look slabs behind media conceal cable
              jungles elegantly.
            </dd>
          </div>
          <div className="rounded-sm border border-foreground/10 p-6">
            <dt className="font-serif text-xl text-foreground">Kitchens & dining niches</dt>
            <dd className="mt-3">
              Use heat-tolerant adhesives noted in our batches; solids near prep zones for easier wipe
              cycles.
            </dd>
          </div>
          <div className="rounded-sm border border-foreground/10 p-6">
            <dt className="font-serif text-xl text-foreground">Retail & workspaces</dt>
            <dd className="mt-3">
              Combine tonal suites with directional graphics; acoustic backing optional on conference
              runs.
            </dd>
          </div>
        </dl>
      </>
    ),
  },
  {
    id: "care",
    title: "Care & refurbishment honesty",
    kicker: "What we promise — and what to plan for",
    body: (
      <>
        <p className="mb-6 text-base leading-[1.9]">
          PVC excels at resisting stains yet despises solvents that dissolve protective topcoats.
          Expectations stay realistic: swaps are faster than sanding solid timber, meaning your space can
          refresh between tenants without masonry demolition.
        </p>
        <ul className="space-y-3 pl-5 text-sm marker:text-accent list-disc">
          <li>Stick to neutral pH cleaners — we publish a crib sheet alongside every delivery note.</li>
          <li>Deep scratches merit panel swaps, not fillers — stock a few attic panels upfront.</li>
          <li>Rotate artwork mounts carefully; adhesives adhering directly to façades void niche warranties.</li>
        </ul>
      </>
    ),
  },
] as const;

const navSections = [
  sectionsBeforeMarble[0],
  marbleSection,
  ...sectionsAfterMarble,
];

export default function MaterialsPage() {
  return (
    <main className="bg-background">
      <InnerPageHeader backdropSrc={BACKDROP_MATERIALS} parallaxStrength={0.4}>
        <Reveal>
          <div className="mx-auto max-w-4xl space-y-5">
            <p className="font-sans text-xs font-semibold uppercase tracking-[0.32em] text-foreground/50">
              Specification primer
            </p>
            <h1 className="font-serif text-4xl font-extrabold tracking-tight text-foreground sm:text-[2.75rem]">
              Materials playbook for Macedonia’s interiors
            </h1>
            <p className="font-sans text-lg leading-relaxed text-foreground/73">
              We trade in PVC wall décors—not mystery composites. Browse the headings below before diving
              into{" "}
              <Link href="/collections" className="text-accent underline-offset-4 hover:underline">
                collection dossiers
              </Link>
              .
            </p>
          </div>
        </Reveal>
      </InnerPageHeader>

      <div className="mx-auto max-w-4xl px-5 py-16 lg:px-8 lg:py-20">
        <nav aria-label="On-page topics" className="mb-12 rounded-sm border border-foreground/10 p-6">
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.32em] text-foreground/50">
            Jump to section
          </p>
          <ol className="mt-5 space-y-2 font-sans text-sm text-accent">
            {navSections.map((section, index) => (
              <li key={section.id}>
                <a className="hover:underline hover:text-accent/80" href={`#${section.id}`}>
                  <span className="text-foreground/40">{`${String(index + 1).padStart(2, "0")}.`}</span>{" "}
                  {section.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="space-y-16">
          {sectionsBeforeMarble.map((section, index) => (
            <Reveal key={section.id} delayMs={index * 100}>
              <section id={section.id} aria-labelledby={`${section.id}-heading`}>
                <header className="space-y-2">
                  <p className="font-sans text-xs font-semibold uppercase tracking-[0.32em] text-foreground/50">
                    {section.kicker}
                  </p>
                  <h2
                    id={`${section.id}-heading`}
                    className="font-serif text-3xl font-bold tracking-tight text-foreground"
                  >
                    {section.title}
                  </h2>
                </header>
                <div className="mt-8 text-foreground/75">{section.body}</div>
              </section>
            </Reveal>
          ))}

          <Reveal delayMs={100}>
            <section id={marbleSection.id} aria-labelledby={`${marbleSection.id}-heading`}>
              <header className="space-y-2">
                <p className="font-sans text-xs font-semibold uppercase tracking-[0.32em] text-foreground/50">
                  {marbleSection.kicker}
                </p>
                <h2
                  id={`${marbleSection.id}-heading`}
                  className="font-serif text-3xl font-bold tracking-tight text-foreground"
                >
                  {marbleSection.title}
                </h2>
              </header>
              <div className="mt-8 text-foreground/75">
                <MarbleVsSolidBody />
              </div>
            </section>
          </Reveal>

          {sectionsAfterMarble.map((section, index) => (
            <Reveal key={section.id} delayMs={(index + 2) * 100}>
              <section id={section.id} aria-labelledby={`${section.id}-heading`}>
                <header className="space-y-2">
                  <p className="font-sans text-xs font-semibold uppercase tracking-[0.32em] text-foreground/50">
                    {section.kicker}
                  </p>
                  <h2
                    id={`${section.id}-heading`}
                    className="font-serif text-3xl font-bold tracking-tight text-foreground"
                  >
                    {section.title}
                  </h2>
                </header>
                <div className="mt-8 text-foreground/75">{section.body}</div>
              </section>
            </Reveal>
          ))}
        </div>
      </div>
    </main>
  );
}
