"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Pins the viewport to the top on full reload and on client navigations.
 * Stops the browser from restoring a non-zero scroll offset after refresh,
 * and offsets scroll anchoring fighting first-paint layout shifts.
 */
export function ScrollRestorationFix() {
  const pathname = usePathname();

  useEffect(() => {
    window.history.scrollRestoration = "manual";
  }, []);

  useEffect(() => {
    const snapTop = () => {
      window.scrollTo(0, 0);
    };

    snapTop();
    const raf = requestAnimationFrame(snapTop);
    window.addEventListener("load", snapTop, { once: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("load", snapTop);
    };
  }, [pathname]);

  return null;
}
