import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/siteConfig";
import { SocialLinks } from "@/components/social-links";

const navItems = [
  { href: "/collections", label: "Collections" },
  { href: "/materials", label: "Materials" },
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  return (
    <header className="border-b border-accent/35 bg-[var(--header-surface)]">
      <div className="mx-auto flex max-w-6xl flex-col gap-5 px-5 py-5 sm:flex-row sm:items-center sm:justify-between lg:px-8">
        <Link
          href="/"
          className="flex items-center gap-3 rounded-sm outline-offset-4 transition-opacity hover:opacity-[0.94]"
        >
          <Image
            src={siteConfig.logoSrc}
            alt={`${siteConfig.name} logo`}
            width={136}
            height={54}
            sizes="(max-width: 640px) 110px, 136px"
            className="h-11 w-auto object-contain"
            priority
          />
          <span className="font-sans text-xs font-semibold uppercase tracking-[0.28em] text-foreground/90">
            {siteConfig.name}
          </span>
        </Link>

        <div className="flex flex-wrap items-center justify-between gap-x-10 gap-y-4 sm:flex-nowrap">
          <nav aria-label="Primary">
            <ul className="flex flex-wrap gap-x-7 gap-y-2 font-sans text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-foreground/70">
              {navItems.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="transition-colors duration-200 ease-out hover:text-accent"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <SocialLinks
            variant="header"
            facebookHref={siteConfig.social.facebookUrl}
            instagramHref={siteConfig.social.instagramUrl}
            className="gap-4"
          />
        </div>
      </div>
    </header>
  );
}
