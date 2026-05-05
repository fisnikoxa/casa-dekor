"use client";

import { useEffect, useState, useSyncExternalStore } from "react";

function subscribeReducedMotion(cb: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}

function subscribeMin768(cb: () => void) {
  const mq = window.matchMedia("(min-width: 768px)");
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}

function snapshotReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function snapshotMin768() {
  return window.matchMedia("(min-width: 768px)").matches;
}

/** True when the user has requested reduced UI motion (OS / browser setting). */
export function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(
    subscribeReducedMotion,
    snapshotReducedMotion,
    () => false,
  );
}

/** True at `md` breakpoint and up (Tailwind default 768px). */
export function useMediaMinMd(): boolean {
  return useSyncExternalStore(subscribeMin768, snapshotMin768, () => false);
}

/**
 * Same as {@link useMediaMinMd}, but stays `false` until after mount so SSR markup
 * matches the first client paint (avoids hydration mismatches in motion layouts).
 */
export function useMediaMinMdHydrationSafe(): { mdUp: boolean; ready: boolean } {
  const [state, setState] = useState<{ mdUp: boolean; ready: boolean }>({
    mdUp: false,
    ready: false,
  });

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    requestAnimationFrame(() => {
      setState({ mdUp: mq.matches, ready: true });
    });
    const onChange = () =>
      setState((prev) => ({ ...prev, mdUp: mq.matches }));
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return state;
}
