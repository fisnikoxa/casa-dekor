"use client";

import type { ReactNode } from "react";
import { useRef } from "react";

import { Reveal } from "@/components/home/reveal";
import { useParallax } from "@/lib/hooks/useParallax";

export function CredibilityStrip({
  textureUrl,
  children,
}: {
  textureUrl: string;
  children: ReactNode;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const y = useParallax(sectionRef, 0.3);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="credibility-strip"
      className="relative overflow-hidden bg-charcoal px-5 py-16 text-footer-fg lg:px-8"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 scale-105 opacity-[0.13]"
        style={{
          transform: `translate3d(0, ${y}px, 0) scale(1.05)`,
          backgroundImage: `url("${textureUrl}")`,
          backgroundSize: "cover",
          filter: "blur(28px)",
        }}
      />
      <Reveal scrollParallax className="relative z-[1]">
        {children}
      </Reveal>
    </section>
  );
}
