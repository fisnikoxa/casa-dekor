"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";

import { usePrefersReducedMotion } from "@/lib/hooks/mediaPreferences";

/** Route wrapper: enter easing + View Transition CSS pseudo-elements where supported */
export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const prefersReducedMotion = usePrefersReducedMotion();

  if (prefersReducedMotion) {
    return children;
  }

  return (
    <div key={pathname} className="page-transition-enter isolate">
      {children}
    </div>
  );
}
