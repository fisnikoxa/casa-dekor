"use client";

import { useSyncExternalStore } from "react";

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
