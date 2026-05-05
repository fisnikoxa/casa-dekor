import { siteConfig } from "@/lib/siteConfig";
import { SocialLinks } from "@/components/social-links";

export function SiteFooter() {
  return (
    <footer className="border-t border-accent/30 bg-charcoal text-footer-fg">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-5 py-12 lg:flex-row lg:items-end lg:justify-between lg:px-8 lg:pb-14 lg:pt-16">
        <div className="max-w-xl space-y-3">
          <p className="font-serif text-xl font-bold tracking-tight text-footer-fg sm:text-[1.35rem]">
            Copyright © CASA DECOR · Republic of North Macedonia
          </p>
          <p className="font-sans text-sm leading-relaxed text-footer-muted">
            Interior décor and PVC wall finishes—serving homeowners and trade
            across North Macedonia. No showroom; by appointment via phone or
            email.
          </p>
        </div>

        <SocialLinks
          variant="footer"
          facebookHref={siteConfig.social.facebookUrl}
          instagramHref={siteConfig.social.instagramUrl}
        />
      </div>

      <div className="border-t border-accent/15 py-5 text-center font-sans text-xs uppercase tracking-[0.2em] text-footer-muted">
        Quality at the best price
      </div>
    </footer>
  );
}
