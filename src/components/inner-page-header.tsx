"use client";

import type { ReactNode } from "react";
import { useRef } from "react";

import { useParallax } from "@/lib/hooks/useParallax";

type InnerPageHeaderProps = {
  backdropSrc: string;
  /** Parallax strength (0–1 scale in hook); defaults to inner-page header preset */
  parallaxStrength?: number;
  children: ReactNode;
  className?: string;
};

/** Ambient blurred backdrop, radial glow, film grain, and gradient divider */
export function InnerPageHeader({
  backdropSrc,
  parallaxStrength = 0.4,
  children,
  className = "",
}: InnerPageHeaderProps) {
  const headerRef = useRef<HTMLElement>(null);
  const y = useParallax(headerRef, parallaxStrength);

  return (
    <header
      ref={headerRef}
      className={`relative overflow-hidden ${className}`.trim()}
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute inset-[-26%] scale-110 opacity-[0.24]"
          style={{
            transform: `translate3d(0, ${y}px, 0)`,
            backgroundImage: `url("${backdropSrc}")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "blur(32px)",
          }}
        />
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-[5] bg-[radial-gradient(ellipse_60%_80%_at_90%_50%,rgba(174,143,96,0.07)_0%,transparent_100%)]"
      />

      <div
        aria-hidden
        className="hero-grain pointer-events-none absolute inset-0 -z-[5] opacity-[0.03] mix-blend-multiply"
      />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-px"
        style={{
          background:
            "linear-gradient(to right, transparent, rgba(174,143,96,0.4) 30%, rgba(174,143,96,0.4) 70%, transparent)",
        }}
      />

      <div className="relative z-10 bg-[var(--header-surface)]/96 px-5 py-12 backdrop-blur-[1px] lg:px-8 lg:py-16">
        {children}
      </div>
    </header>
  );
}
