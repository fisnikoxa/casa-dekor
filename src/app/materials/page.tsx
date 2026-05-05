import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Materials",
  description:
    "Learn how CASA DECOR mixes PVC practicality with marble glamour — comparisons, suggested rooms in Macedonia, and honest maintenance cues.",
};

const sections = [
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
  {
    id: "marble-vs-solid",
    title: "Marble-effect glamour vs tonal solids",
    kicker: "Pick the storyline your space already hints at",
    body: (
      <>
        <p className="mb-6 text-base leading-[1.9]">
          Marble-style PVC thrives when lighting can graze the surface — think living rooms beside
          full-height drapes or hospitality booths with pin spots. Solid and micro-grain palettes let
          joinery or artwork lead; they conceal scuffs longer in corridors kids attack daily.
        </p>
        <div className="grid gap-4 md:grid-cols-2">
          <figure className="rounded-sm border border-foreground/10 bg-[var(--header-surface)] p-5">
            <figcaption className="font-serif text-xl text-foreground">Marble-look moods</figcaption>
            <p className="mt-4 text-sm leading-relaxed text-foreground/70">
              Amplify dusk lighting, veil TV walls, disguise oversized structural columns with continuous
              veining.
            </p>
          </figure>
          <figure className="rounded-sm border border-foreground/10 bg-[var(--header-surface)] p-5">
            <figcaption className="font-serif text-xl text-foreground">Solid & micro-grain moods</figcaption>
            <p className="mt-4 text-sm leading-relaxed text-foreground/70">
              Support bold furniture colours, camouflage fingerprints near entries, unify open-plan cubes
              with quiet surfaces.
            </p>
          </figure>
        </div>
      </>
    ),
  },
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

export default function MaterialsPage() {
  return (
    <main className="bg-background">
      <header className="border-b border-accent/25 bg-[var(--header-surface)] px-5 py-12 lg:px-8 lg:py-16">
        <div className="mx-auto max-w-4xl space-y-5">
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.32em] text-foreground/50">
            Specification primer
          </p>
          <h1 className="font-serif text-4xl font-semibold tracking-tight text-foreground sm:text-[2.75rem]">
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
      </header>

      <div className="mx-auto max-w-4xl px-5 py-16 lg:px-8 lg:py-20">
        <nav aria-label="On-page topics" className="mb-12 rounded-sm border border-foreground/10 p-6">
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.32em] text-foreground/50">
            Jump to section
          </p>
          <ol className="mt-5 space-y-2 font-sans text-sm text-accent">
            {sections.map((section, index) => (
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
          {sections.map((section) => (
            <section key={section.id} id={section.id} aria-labelledby={`${section.id}-heading`}>
              <header className="space-y-2">
                <p className="font-sans text-xs font-semibold uppercase tracking-[0.32em] text-foreground/50">
                  {section.kicker}
                </p>
                <h2
                  id={`${section.id}-heading`}
                  className="font-serif text-3xl font-semibold tracking-tight text-foreground"
                >
                  {section.title}
                </h2>
              </header>
              <div className="mt-8 text-foreground/75">{section.body}</div>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
