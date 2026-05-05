"use client";

import { useEffect, useRef, useState } from "react";

import { usePrefersReducedMotion } from "@/lib/hooks/mediaPreferences";

export function ScrollProgress() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const frame = useRef(0);
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const update = () => {
      cancelAnimationFrame(frame.current);
      frame.current = requestAnimationFrame(() => {
        const scrollH = Math.max(
          document.documentElement.scrollHeight - window.innerHeight,
          1,
        );
        setPct(Math.min(Math.max(window.scrollY / scrollH, 0), 1) * 100);
      });
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      cancelAnimationFrame(frame.current);
    };
  }, []);

  return (
    <div
      role="presentation"
      className="pointer-events-none fixed inset-x-0 top-0 z-[75] h-0.5 bg-transparent"
    >
      <div
        className={`origin-left bg-accent motion-safe:ease-[var(--motion-ease-standard)] ${
          prefersReducedMotion ? "" : "motion-safe:transition-[width] motion-safe:duration-150"
        }`}
        style={{
          height: "2px",
          width: `${pct}%`,
          willChange: prefersReducedMotion ? undefined : "width",
        }}
      />
    </div>
  );
}
