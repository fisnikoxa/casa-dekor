import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description:
    "CASA DECOR supplies PVC wall décors across North Macedonia — quality finishes, approachable MKD brackets, installer-first thinking.",
};

export default function AboutPage() {
  return (
    <main className="bg-background pb-24">
      <header className="border-b border-accent/25 bg-[var(--header-surface)] px-5 py-12 lg:px-8 lg:py-16">
        <div className="mx-auto max-w-3xl space-y-6 text-left">
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.32em] text-foreground/50">
            Local partner
          </p>
          <h1 className="font-serif text-4xl font-semibold tracking-tight text-foreground sm:text-[2.75rem]">
            Honest décors calibrated for Macedonia
          </h1>
          <p className="font-sans text-lg leading-relaxed text-foreground/75">
            Casa Decor concentrates on layered PVC façades rather than juggling endless SKUs unrelated to
            wall finishes. Families, designers, and contractors collaborate with us when they need tactile
            presence without marble maintenance anxiety.
          </p>
        </div>
      </header>

      <article className="mx-auto grid max-w-5xl gap-12 px-5 py-16 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)] lg:px-8 lg:py-20">
        <section aria-labelledby="about-story" className="space-y-6">
          <h2 id="about-story" className="font-serif text-3xl text-foreground">
            Our footing
          </h2>
          <p className="font-sans text-base leading-[1.9] text-foreground/75">
            North Macedonia connects historic masonry architecture with brisk modern infill construction.
            That juxtaposition informs our palettes: tonal creams respect Skopje’s limestone skyline, marble
            veins echo Ohrid’s lakeside terraces, graphite suites suit tech offices cropping up nationwide.
          </p>
          <p className="font-sans text-base leading-[1.9] text-foreground/75">
            We do not chase showroom theatrics — there is{" "}
            <strong className="font-semibold text-foreground">no walk-in flagship</strong>. Instead we keep
            sample sets touring with installers, shortening the loop between inspiration images and taped-up
            mock walls on your site.
          </p>
          <blockquote className="rounded-sm border-l-4 border-accent bg-[var(--header-surface)] p-8 font-serif text-2xl italic leading-snug text-foreground">
            “Quality at reachable prices” is interpreted as predictable logistics, disciplined batch QA, and
            transparent MKD scaffolding — never as cutting corners quietly.
          </blockquote>
        </section>

        <aside
          aria-labelledby="about-manifesto"
          className="flex flex-col gap-6 rounded-sm border border-foreground/10 bg-charcoal px-8 py-10 text-footer-fg"
        >
          <h2 id="about-manifesto" className="font-serif text-2xl text-footer-fg">
            What “honest MKD framing” entails
          </h2>
          <ul className="space-y-4 font-sans text-sm leading-relaxed text-footer-muted">
            <li>Indicative numbers appear alongside collections so procurement teams anchor early budgeting.</li>
            <li>Site visits confirm freight zones, hoist limitations, adhesives reacting to substrates.</li>
            <li>Install partners receive layering diagrams—not vague inspiration shots alone.</li>
          </ul>
          <Link
            href="/contact"
            className="mt-auto rounded-full bg-footer-fg px-6 py-3 text-center font-sans text-xs font-semibold uppercase tracking-[0.3em] text-charcoal hover:bg-accent hover:text-charcoal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
          >
            Book a briefing
          </Link>
        </aside>
      </article>
    </main>
  );
}
