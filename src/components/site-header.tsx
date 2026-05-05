"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { SocialLinks } from "@/components/social-links";
import { siteConfig } from "@/lib/siteConfig";

const navItems = [
  { href: "/collections", label: "Collections" },
  { href: "/materials", label: "Materials" },
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const overHero = !scrolled;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[70] transition-[background-color,box-shadow,border-color,backdrop-filter] duration-500 ease-out ${
        scrolled
          ? "border-b border-accent/25 bg-[color-mix(in_srgb,var(--header-surface)_96%,transparent)] shadow-[0_12px_48px_-24px_rgba(26,22,18,0.55)] backdrop-blur-xl"
          : "border-b border-white/[0.12] bg-gradient-to-b from-charcoal/65 via-charcoal/28 to-transparent backdrop-blur-md"
      }`}
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-5 px-5 py-4 sm:flex-row sm:items-center sm:justify-between lg:px-8">
        <Link
          href="/"
          className={`group flex items-center gap-3 rounded-sm outline-offset-4 transition-[opacity,transform] duration-300 hover:opacity-95 motion-safe:hover:translate-y-px`}
        >
          <span className="rounded-md bg-[#f4efe6] p-2 shadow-[0_12px_40px_-16px_rgba(0,0,0,0.65)] ring-2 ring-accent/45 ring-offset-2 ring-offset-transparent transition-[box-shadow] duration-500 group-hover:shadow-[0_18px_50px_-14px_rgba(174,143,96,0.35)]">
            <Image
              src={siteConfig.logoSrc}
              alt={`${siteConfig.name} — home`}
              width={148}
              height={56}
              sizes="(max-width: 640px) 120px, 148px"
              className="h-11 w-auto object-contain sm:h-12"
              priority
              unoptimized
            />
          </span>
        </Link>

        <div className="flex flex-wrap items-center justify-between gap-x-10 gap-y-4 sm:flex-nowrap">
          <nav aria-label="Primary">
            <ul
              className={`flex flex-wrap gap-x-7 gap-y-2 font-sans text-[0.6875rem] font-extrabold uppercase tracking-[0.24em] transition-colors duration-500 ${
                overHero ? "text-footer-fg/88" : "text-foreground/72"
              }`}
            >
              {navItems.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className={`relative pb-0.5 transition-colors duration-300 after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-300 after:ease-out hover:text-accent motion-safe:hover:after:scale-x-100 ${
                      overHero ? "hover:text-footer-fg" : ""
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <SocialLinks
            variant="header"
            headerOverDark={overHero}
            facebookHref={siteConfig.social.facebookUrl}
            instagramHref={siteConfig.social.instagramUrl}
            className="gap-4"
          />
        </div>
      </div>
    </header>
  );
}
