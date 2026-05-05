"use client";

import {
  type RefObject,
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  useMediaMinMdHydrationSafe,
  usePrefersReducedMotion,
} from "@/lib/hooks/mediaPreferences";

/** Returns translateY (px) for parallax layers based on scroll position relative to viewport. */
export function useParallax(
  elementRef: RefObject<HTMLElement | null>,
  strength: number,
): number {
  const reduceMotion = usePrefersReducedMotion();
  const { ready } = useMediaMinMdHydrationSafe();
  const [offset, setOffset] = useState(0);

  /** Parallax on all breakpoints once hydrated (was desktop-only, so many visitors saw no motion). */
  const enabled = ready && !reduceMotion;

  const compute = useCallback(() => {
    const el = elementRef.current;
    if (!el || !enabled) {
      setOffset(0);
      return;
    }

    const rect = el.getBoundingClientRect();
    const vh = window.innerHeight;
    /** 0 → 1 as the element crosses the viewport while scrolling */
    const raw = (vh - rect.top) / (vh + rect.height);
    const p = Math.min(Math.max(raw, 0), 1);
    const e = p - 0.5;
    setOffset(e * 360 * strength);
  }, [elementRef, enabled, strength]);

  useEffect(() => {
    compute();

    if (!enabled) {
      return undefined;
    }

    let ticking = false;

    const tick = () => {
      if (ticking) {
        return;
      }
      ticking = true;
      requestAnimationFrame(() => {
        compute();
        ticking = false;
      });
    };

    window.addEventListener("scroll", tick, { passive: true });
    window.addEventListener("resize", tick);

    return () => {
      window.removeEventListener("scroll", tick);
      window.removeEventListener("resize", tick);
    };
  }, [compute, enabled]);

  return enabled ? offset : 0;
}
