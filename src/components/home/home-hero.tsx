"use client";

import Image from "next/image";
import Link from "next/link";
import {
  type ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import { MagneticButton } from "@/components/magnetic-button";
import {
  useMediaMinMdHydrationSafe,
  usePrefersReducedMotion,
} from "@/lib/hooks/mediaPreferences";
import { siteConfig } from "@/lib/siteConfig";

export type HomeHeroProps = {
  foregroundSrc: string;
  foregroundAlt: string;
  eyebrow: string;
  title: string;
  slogan: ReactNode;
  lede: string;
};

export function HomeHero({
  foregroundSrc,
  foregroundAlt,
  eyebrow,
  title,
  slogan,
  lede,
}: HomeHeroProps) {
  const reduceMotion = usePrefersReducedMotion();
  const { mdUp, ready } = useMediaMinMdHydrationSafe();
  const sectionRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [parallaxY, setParallaxY] = useState({
    back: 0,
    mid: 0,
    glow: 0,
    panel: 0,
    copy: 0,
  });
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });

  /** Scroll parallax: every viewport once hydrated (was gated to `md+`, so most testers saw zero motion). */
  const parallaxEnabled = ready && !reduceMotion;
  const tiltEnabled = ready && mdUp && !reduceMotion;

  const readParallax = useCallback(() => {
    const el = sectionRef.current;
    if (!el || !parallaxEnabled) {
      setParallaxY({ back: 0, mid: 0, glow: 0, panel: 0, copy: 0 });
      return;
    }

    const rect = el.getBoundingClientRect();
    const vh = typeof window !== "undefined" ? window.innerHeight : 800;
    /** 0 → 1 as the hero crosses the viewport while scrolling */
    const raw = (vh - rect.top) / (vh + rect.height);
    const p = Math.min(Math.max(raw, 0), 1);
    const e = p - 0.5;

    setParallaxY({
      back: e * 190,
      mid: e * -130,
      glow: e * 85,
      panel: e * 72,
      copy: e * -48,
    });
  }, [parallaxEnabled]);

  useEffect(() => {
    if (!parallaxEnabled) {
      readParallax();
      return undefined;
    }

    let ticking = false;
    const onScrollOrResize = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        readParallax();
        ticking = false;
      });
    };

    readParallax();
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);

    return () => {
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, [parallaxEnabled, readParallax]);

  const videoSrc =
    typeof process.env.NEXT_PUBLIC_HERO_VIDEO_URL === "string"
      ? process.env.NEXT_PUBLIC_HERO_VIDEO_URL.trim()
      : "";

  const showVideo = Boolean(videoSrc) && !reduceMotion;

  const onPanelMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!tiltEnabled) return;
    const el = panelRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    setTilt({
      rx: Math.max(-7, Math.min(7, py * -14)),
      ry: Math.max(-9, Math.min(9, px * 18)),
    });
  };

  const onPanelLeave = () => {
    if (!tiltEnabled) return;
    setTilt({ rx: 0, ry: 0 });
  };

  return (
    <section
      ref={sectionRef}
      aria-labelledby="home-hero-heading"
      className="relative isolate -mt-[var(--header-height)] mb-0 min-h-[100svh] overflow-hidden pt-[var(--header-height)]"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          aria-hidden
          className="hero-grain absolute inset-[-40%] opacity-[0.07] mix-blend-overlay"
        />

        <div
          aria-hidden
          className="absolute inset-[-14%] will-change-transform"
          style={{
            transform: parallaxEnabled
              ? `translate3d(0, ${parallaxY.back}px, 0) scale(${1 + Math.abs(parallaxY.back) * 0.00025})`
              : undefined,
          }}
        >
          <Image
            src={foregroundSrc}
            alt=""
            fill
            priority
            sizes="100vw"
            className="scale-110 object-cover opacity-90 blur-[36px]"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-br from-charcoal/82 via-charcoal/35 to-background/88"
          />
        </div>

        <div
          aria-hidden
          className="absolute inset-0 will-change-transform"
          style={{
            transform: parallaxEnabled
              ? `translate3d(0, ${parallaxY.mid}px, 0) scale(${1.06 + (-parallaxY.mid / 130) * 0.06})`
              : "scale(1.06)",
          }}
        >
          {showVideo ? (
            <video
              className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-[0.32]"
              autoPlay
              muted
              playsInline
              loop
              poster={foregroundSrc}
              aria-hidden
            >
              <source src={videoSrc} type="video/mp4" />
            </video>
          ) : null}
          <Image
            src={foregroundSrc}
            alt=""
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 55vw"
            className={`object-cover object-[center_38%] transition-opacity duration-[1.1s] ${
              showVideo ? "opacity-[0.88]" : "opacity-100"
            }`}
            aria-hidden
          />
          <div
            aria-hidden
            className="absolute inset-y-[-12%] left-[-18%] w-[92%] bg-gradient-to-r from-charcoal/92 via-charcoal/55 to-transparent lg:left-[-8%] lg:w-[78%]"
          />
          <div
            aria-hidden
            className="hero-shimmer absolute inset-0 mix-blend-screen opacity-55"
          />
        </div>

        <div
          aria-hidden
          className="absolute inset-0 will-change-transform"
          style={{
            transform: parallaxEnabled
              ? `translate3d(0, ${parallaxY.glow}px, 0)`
              : undefined,
          }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_85%_65%_at_70%_42%,transparent_0%,rgb(26_26_26/0.78)_62%,rgb(26_26_26/0.94)_100%)]" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-charcoal/28 to-transparent lg:via-transparent" />
        </div>

        <div
          aria-hidden
          className="pointer-events-none absolute left-[8%] top-[22%] hidden h-48 w-48 rounded-full bg-accent/18 blur-[80px] lg:block"
        />
      </div>

      <div className="relative z-10 mx-auto grid max-w-6xl gap-14 px-5 pb-20 pt-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-center lg:gap-16 lg:px-8 lg:pb-28 lg:pt-14">
        <div
          className="flex max-w-xl flex-col justify-center will-change-transform"
          style={{
            transform: parallaxEnabled
              ? `translate3d(0, ${parallaxY.copy}px, 0)`
              : undefined,
          }}
        >
          <div className="hero-enter hero-enter-delay-1 flex items-center gap-4">
            <span className="rounded-md bg-[#f4efe6] px-3 py-2 shadow-[0_20px_50px_-28px_rgba(0,0,0,0.85)] ring-2 ring-accent/50 ring-offset-2 ring-offset-charcoal/90">
              <Image
                src={siteConfig.logoSrc}
                alt={`${siteConfig.name} logo`}
                width={168}
                height={72}
                sizes="168px"
                className="h-[3.35rem] w-auto object-contain sm:h-[4.1rem]"
                priority
                unoptimized
              />
            </span>
            <div className="hero-line-accent hidden h-px flex-1 bg-gradient-to-r from-accent/90 to-transparent sm:block" />
          </div>

          <p className="hero-enter hero-enter-delay-2 mt-8 font-sans text-[0.65rem] font-extrabold uppercase tracking-[0.42em] text-accent">
            {eyebrow}
          </p>

          <div className="hero-enter hero-enter-delay-3 mt-5 h-px w-16 bg-accent/85 sm:hidden" />

          <h1
            id="home-hero-heading"
            className="hero-enter hero-enter-delay-3 mt-6 font-serif text-[2.5rem] font-black leading-[1.05] tracking-tight text-footer-fg sm:text-5xl sm:tracking-tighter lg:text-[3.65rem]"
          >
            {title}
          </h1>

          <p className="hero-enter hero-enter-delay-4 mt-7 font-sans text-[0.8125rem] font-extrabold uppercase leading-snug tracking-[0.34em] text-accent sm:text-[0.9375rem]">
            {slogan}
          </p>

          <p className="hero-enter hero-enter-delay-5 mt-9 max-w-[46ch] font-sans text-[0.96875rem] font-semibold leading-relaxed text-footer-fg sm:text-[1.0625rem]">
            {lede}
          </p>

          <div className="hero-enter hero-enter-delay-6 mt-11 flex flex-wrap gap-4">
            <MagneticButton>
              <Link
                href="/collections"
                className="inline-flex rounded-full bg-footer-fg px-8 py-3.5 font-sans text-[0.6875rem] font-semibold uppercase tracking-[0.32em] text-charcoal shadow-[0_16px_42px_-22px_rgba(0,0,0,0.65)] transition-[transform,box-shadow,background-color] duration-300 hover:bg-accent hover:shadow-[0_22px_48px_-18px_rgba(174,143,96,0.55)] motion-safe:hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
              >
                View collections grid
              </Link>
            </MagneticButton>
            <MagneticButton>
              <Link
                href="/contact"
                className="inline-flex rounded-full border border-footer-muted/90 bg-charcoal/25 px-8 py-3.5 font-sans text-[0.6875rem] font-semibold uppercase tracking-[0.28em] text-footer-fg backdrop-blur-sm transition-[border-color,background-color,transform] duration-300 hover:border-accent hover:bg-charcoal/45 motion-safe:hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
              >
                Contact the studio
              </Link>
            </MagneticButton>
          </div>

          <div className="hero-enter hero-enter-delay-6 mt-14 hidden items-center gap-3 font-sans text-[0.625rem] uppercase tracking-[0.35em] text-footer-muted lg:flex">
            <span aria-hidden className="hero-scroll-hint inline-block h-9 w-px bg-gradient-to-b from-transparent via-accent to-transparent" />
            <Link href="/collections" className="transition-colors hover:text-footer-fg">
              Scroll collections
            </Link>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-md lg:mx-0 lg:max-w-none">
          <p className="sr-only">{foregroundAlt}</p>
          <div
            className="mx-auto max-w-[22rem] will-change-transform lg:max-w-none"
            style={{
              transform: parallaxEnabled
                ? `translate3d(0, ${parallaxY.panel}px, 0)`
                : undefined,
            }}
          >
            <div className="hero-panel-float">
              <div
                ref={panelRef}
                onMouseMove={onPanelMove}
                onMouseLeave={onPanelLeave}
                className="relative aspect-[3/4] overflow-hidden rounded-[3px] shadow-[0_40px_120px_-40px_rgba(0,0,0,0.85)] ring-1 ring-white/12 motion-safe:transition-transform motion-safe:duration-300 motion-safe:ease-out lg:aspect-[4/5]"
                style={{
                  transform: tiltEnabled
                    ? `perspective(1400px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`
                    : undefined,
                }}
              >
              <Image
                src={foregroundSrc}
                alt={foregroundAlt}
                fill
                sizes="(max-width: 1024px) 88vw, 42vw"
                className="object-cover object-[center_42%]"
                priority
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-charcoal/55 via-transparent to-white/10 opacity-90 mix-blend-soft-light"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-charcoal/75 to-transparent"
              />
              <div className="pointer-events-none absolute left-5 top-5 font-sans text-[0.5625rem] font-semibold uppercase tracking-[0.45em] text-footer-fg/90 drop-shadow-md">
                Featured mood
              </div>
              <div className="pointer-events-none absolute bottom-5 left-5 right-5 border-t border-footer-fg/20 pt-4 font-sans text-xs leading-snug text-footer-muted">
                Architectural surfaces · Charcoal & warm wood mood
              </div>
            </div>
            </div>
          </div>

          <div
            aria-hidden
            className="absolute -right-4 top-1/4 hidden h-24 w-24 rounded-full border border-accent/35 lg:block"
          />
          <div
            aria-hidden
            className="absolute -left-8 bottom-[18%] hidden h-px w-24 bg-gradient-to-r from-accent/80 to-transparent lg:block"
          />
        </div>
      </div>
    </section>
  );
}
