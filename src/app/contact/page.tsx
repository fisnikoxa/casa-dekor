import type { Metadata } from "next";
import Link from "next/link";

import { InnerPageHeader } from "@/components/inner-page-header";
import { Reveal } from "@/components/home/reveal";
import { SocialLinks } from "@/components/social-links";
import { contactInfo } from "@/lib/contactInfo";
import { siteConfig } from "@/lib/siteConfig";

const BACKDROP_CONTACT =
  "https://images.unsplash.com/photo-1501183638710-84113be63d94?auto=format&fit=crop&w=1600&q=65";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Reach CASA DECOR for Macedonia-wide PVC décors — email, phone, optional WhatsApp, and social messaging with no showroom visits required.",
};

export default function ContactPage() {
  return (
    <main className="bg-background pb-24">
      <InnerPageHeader backdropSrc={BACKDROP_CONTACT} parallaxStrength={0.4}>
        <Reveal>
          <div className="mx-auto max-w-3xl space-y-6">
            <p className="font-sans text-xs font-semibold uppercase tracking-[0.32em] text-foreground/50">
              Conversation first
            </p>
            <h1 className="font-serif text-4xl font-extrabold tracking-tight text-foreground sm:text-[2.75rem]">
              Talk through your wall programme
            </h1>
            <p className="font-sans text-lg leading-relaxed text-foreground/75">
              There is intentionally <strong className="text-foreground">no contact form</strong> —
              Macedonia-based projects iterate faster via direct correspondence. Reach us whichever channel suits
              your studio or site caravan.
            </p>
          </div>
        </Reveal>
      </InnerPageHeader>

      <div className="mx-auto mt-14 grid max-w-5xl gap-12 px-5 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:px-8">
        <Reveal>
          <section aria-labelledby="contact-methods" className="rounded-sm border border-foreground/10 p-10">
            <h2 id="contact-methods" className="font-serif text-3xl text-foreground">
              Direct lines & channels
            </h2>
            <dl className="mt-8 space-y-6 font-sans text-base text-foreground/75">
              <div className="space-y-2">
                <dt className="text-xs font-semibold uppercase tracking-[0.32em] text-foreground/50">
                  Email
                </dt>
                <dd>
                  <Link className="text-accent hover:underline" href={`mailto:${contactInfo.email}`}>
                    {contactInfo.email}
                  </Link>
                </dd>
              </div>
              <div className="space-y-2">
                <dt className="text-xs font-semibold uppercase tracking-[0.32em] text-foreground/50">
                  Phone
                </dt>
                <dd>
                  <Link className="text-accent hover:underline" href={contactInfo.phoneHref}>
                    {contactInfo.phoneDisplay}
                  </Link>
                </dd>
              </div>
              <div className="space-y-2">
                <dt className="text-xs font-semibold uppercase tracking-[0.32em] text-foreground/50">
                  WhatsApp / mobile messaging
                </dt>
                <dd>
                  <Link
                    className="text-accent hover:underline"
                    href={contactInfo.whatsAppHref}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {contactInfo.whatsAppDisplay}
                  </Link>
                </dd>
              </div>
            </dl>
            <div className="mt-12 border-t border-foreground/10 pt-10">
              <h3 className="font-serif text-xl text-foreground">Social checkpoints</h3>
              <p className="mt-3 font-sans text-sm text-foreground/70">
                Mirrors the header/footer treatment — URLs resolve from{" "}
                <code className="rounded-sm bg-[var(--header-surface)] px-2 py-1 text-[0.7rem] text-foreground/80">
                  NEXT_PUBLIC_*
                </code>{" "}
                env keys.
              </p>
              <SocialLinks
                variant="header"
                className="mt-6 gap-8"
                facebookHref={siteConfig.social.facebookUrl}
                instagramHref={siteConfig.social.instagramUrl}
              />
            </div>
          </section>
        </Reveal>

        <Reveal delayMs={100}>
          <section
            aria-labelledby="contact-expectations"
            className="space-y-6 rounded-sm bg-charcoal px-10 py-12 text-footer-fg shadow-[inset_0px_1px_0_rgb(224_217_207)]"
          >
            <h2 id="contact-expectations" className="font-serif text-3xl">
              Expectations snapshot
            </h2>
            <ul className="space-y-4 font-sans text-sm leading-relaxed text-footer-muted">
              <li>State your municipality, timeline, whether you&apos;re renovating or furnishing new shells.</li>
              <li>
                Attach inspiration links — Pinterest boards welcomed — so we steer you toward aligned
                collections faster.
              </li>
              <li>MKD placeholders on the site escalate into binding quotes once field measurements exist.</li>
              <li>Service geography: Republic of North Macedonia only — installs beyond border need partner referrals.</li>
            </ul>
            <Link
              href="/collections"
              className="inline-flex rounded-full border border-footer-muted px-6 py-3 font-sans text-xs font-semibold uppercase tracking-[0.28em] text-footer-muted transition-colors hover:border-footer-fg hover:text-footer-fg"
            >
              Browse collections meanwhile
            </Link>
          </section>
        </Reveal>
      </div>
    </main>
  );
}
