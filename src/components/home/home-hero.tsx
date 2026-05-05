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

import { useMediaMinMd, usePrefersReducedMotion } from "@/lib/hooks/mediaPreferences";

const backLayerStill =
  "https://images.unsplash.com/photo-1618221195710-cc6eaf8d6d93?auto=format&fit=crop&w=1600&q=68";

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
  const mdUp = useMediaMinMd();
  const sectionRef = useRef<HTMLElement>(null);
  const [parallaxY, setParallaxY] = useState({ back: 0, mid: 0, glow: 0 });

  const parallaxEnabled = mdUp && !reduceMotion;

  const readParallax = useCallback(() => {
    const el = sectionRef.current;
    if (!el || !parallaxEnabled) {
      setParallaxY({ back: 0, mid: 0, glow: 0 });
      return;
    }

    const rect = el.getBoundingClientRect();
    const viewport = typeof window !== "undefined" ? window.innerHeight : 800;
    const travel = viewport + rect.height;
    /** 0 → 1 as hero moves from below viewport to fully past top */
    const t = Math.min(
      Math.max((viewport - rect.top) / travel, 0),
      1,
    );

    const back = (t - 0.35) * 42;
    const mid = (t - 0.42) * -28;
    const glow = (t - 0.5) * 18;

    setParallaxY({ back, mid, glow });
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

  return (
    <section
      ref={sectionRef}
      aria-labelledby="home-hero-heading"
      className="relative isolate min-h-[68vh] overflow-hidden lg:min-h-[78vh]"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Layer A — softened wash */}
        <div
          aria-hidden
          className={`absolute inset-[-12%] will-change-transform ${parallaxEnabled ? "motion-safe:transition-transform" : ""}`}
          style={{
            transform: parallaxEnabled
              ? `translate3d(0, ${parallaxY.back}px, 0)`
              : undefined,
          }}
        >
          <Image
            src={backLayerStill}
            alt=""
            fill
            priority
            sizes="100vw"
            className="scale-110 object-cover opacity-85 blur-[32px]"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-br from-charcoal/70 via-transparent to-background/85"
          />
        </div>

        {/* Layer B — focal “single panel”, sharp */}
        <div
          className={`absolute inset-0 will-change-transform ${parallaxEnabled ? "motion-safe:transition-transform" : ""}`}
          style={{
            transform: parallaxEnabled
              ? `translate3d(0, ${parallaxY.mid}px, 0)`
              : undefined,
          }}
        >
          {/* Decorative stack: video tucked under still for motion-rich setups */}
          {showVideo ? (
            <video
              className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-[0.38]"
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
            alt={foregroundAlt}
            fill
            priority
            sizes="100vw"
            className={`object-cover object-[center_42%] transition-opacity duration-[1.1s] ${
              showVideo ? "opacity-[0.9]" : "opacity-100"
            }`}
          />
          <div
            aria-hidden
            className="absolute inset-y-[-8%] right-[-26%] w-[118%] bg-gradient-to-l from-transparent via-transparent to-charcoal/80 sm:right-[-18%]"
          />
          <div
            aria-hidden
            className="hero-shimmer absolute inset-0 bg-gradient-to-tr from-charcoal via-transparent to-transparent mix-blend-screen opacity-65"
          />
        </div>

        {/* Layer C — legibility scaffold */}
        <div
          aria-hidden
          className="absolute inset-0 will-change-transform"
          style={{
            transform: parallaxEnabled
              ? `translate3d(0, ${parallaxY.glow}px, 0)`
              : undefined,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-charcoal/90 via-charcoal/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
        </div>
      </div>

      <div className="relative z-10 mx-auto flex min-h-[68vh] max-w-5xl flex-col justify-end px-5 pb-16 pt-48 text-footer-fg lg:min-h-[78vh] lg:pb-24 lg:pt-56">
        <p className="font-sans text-xs font-semibold uppercase tracking-[0.36em] text-footer-muted">
          {eyebrow}
        </p>
        <h1
          id="home-hero-heading"
          className="mt-5 max-w-3xl font-serif text-4xl font-semibold leading-tight tracking-tight sm:text-5xl"
        >
          {title}
        </h1>
        <p className="mt-4 max-w-2xl font-serif text-2xl font-medium italic tracking-tight text-accent sm:text-[1.85rem]">
          {slogan}
        </p>
        <p className="mt-8 max-w-2xl font-sans text-sm leading-relaxed text-footer-muted sm:text-base">
          {lede}
        </p>
        <div className="mt-10 flex flex-wrap gap-5">
          <Link
            href="/collections"
            className="inline-flex rounded-full bg-footer-fg px-8 py-3 font-sans text-xs font-semibold uppercase tracking-[0.32em] text-charcoal hover:bg-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
          >
            View collections grid
          </Link>
          <Link
            href="/contact"
            className="inline-flex rounded-full border border-footer-muted px-8 py-3 font-sans text-xs font-semibold uppercase tracking-[0.28em] text-footer-fg hover:border-footer-fg"
          >
            Contact the studio
          </Link>
        </div>
      </div>
    </section>
  );
}
