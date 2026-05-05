"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { usePrefersReducedMotion } from "@/lib/hooks/mediaPreferences";
import { siteConfig } from "@/lib/siteConfig";

/** Full reloads: wait for window `load` so hero imagery can settle; cap wait so slow assets never block forever. */
const MIN_VISIBLE_MS = 900;
const SAFETY_MAX_MS = 4500;

export function PageLoader() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [show, setShow] = useState(false);
  const [exiting, setExiting] = useState(false);
  const [unmount, setUnmount] = useState(false);
  const finishedRef = useRef(false);

  useEffect(() => {
    finishedRef.current = false;

    const markDone = () => {
      if (finishedRef.current) return;
      finishedRef.current = true;
      setExiting(true);
      window.setTimeout(() => setUnmount(true), 420);
    };

    const raf = requestAnimationFrame(() => setShow(true));

    if (prefersReducedMotion) {
      const t = window.setTimeout(markDone, 140);
      return () => {
        finishedRef.current = true;
        cancelAnimationFrame(raf);
        window.clearTimeout(t);
      };
    }

    const started = performance.now();

    const scheduleComplete = () => {
      const elapsed = performance.now() - started;
      const remaining = Math.max(0, MIN_VISIBLE_MS - elapsed);
      window.setTimeout(markDone, remaining);
    };

    let safetyId = 0;

    const onReady = () => {
      scheduleComplete();
      window.removeEventListener("load", onReady);
      window.clearTimeout(safetyId);
    };

    if (document.readyState === "complete") {
      scheduleComplete();
    } else {
      window.addEventListener("load", onReady, { passive: true });
      safetyId = window.setTimeout(onReady, SAFETY_MAX_MS);
    }

    return () => {
      finishedRef.current = true;
      cancelAnimationFrame(raf);
      window.removeEventListener("load", onReady);
      window.clearTimeout(safetyId);
    };
  }, [prefersReducedMotion]);

  if (!show || unmount) return null;

  const reduce = prefersReducedMotion;

  return (
    <div
      role="status"
      aria-live="polite"
      aria-busy={!exiting}
      className={`fixed inset-0 z-[200] flex flex-col items-center justify-center bg-[var(--background)] ${
        !reduce && exiting ? "loader-exit" : ""
      }`}
    >
      <span className="sr-only">Loading</span>
      <div className="flex flex-col items-center gap-6">
        <div className={reduce ? "" : "loader-logo"}>
          <Image
            src={siteConfig.logoSrc}
            alt=""
            width={200}
            height={86}
            className="h-16 w-auto object-contain sm:h-20"
            priority
            unoptimized
          />
        </div>
        <div
          aria-hidden
          className={`h-px w-40 rounded-full bg-accent ${reduce ? "" : "loader-line"}`}
        />
        <div aria-hidden className="loader-spinner" />
      </div>
    </div>
  );
}
