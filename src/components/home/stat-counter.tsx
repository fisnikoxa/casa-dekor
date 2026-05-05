"use client";

import { useEffect, useRef, useState } from "react";

import { Reveal } from "@/components/home/reveal";
import { usePrefersReducedMotion } from "@/lib/hooks/mediaPreferences";

const STATS = [
  { value: 200, suffix: "+", label: "PVC panel designs" },
  { value: 8, suffix: "+", label: "Years supplying Macedonia" },
  { value: 1000, suffix: "+", label: "Projects installed" },
  { value: 100, suffix: "%", label: "North Macedonia coverage" },
] as const;

function AnimatedNumber({
  target,
  suffix,
  animate,
}: {
  target: number;
  suffix: string;
  animate: boolean;
}) {
  const [n, setN] = useState(0);
  const frame = useRef(0);
  const start = useRef<number | null>(null);

  useEffect(() => {
    if (!animate) {
      cancelAnimationFrame(frame.current);
      start.current = null;
      return undefined;
    }

    start.current = null;
    const durationMs = 1800;

    const tick = (t: number) => {
      if (start.current === null) start.current = t;

      const s = start.current;
      if (s === null) return;

      const elapsed = t - s;
      const p = Math.min(1, elapsed / durationMs);
      const eased = 1 - (1 - p) * (1 - p);
      const next = elapsed >= durationMs ? target : Math.round(eased * target);

      setN(next);

      if (p < 1) {
        frame.current = requestAnimationFrame(tick);
      }
    };

    const kickoff = requestAnimationFrame(() => {
      setN(0);
      frame.current = requestAnimationFrame(tick);
    });

    return () => {
      cancelAnimationFrame(kickoff);
      cancelAnimationFrame(frame.current);
    };
  }, [animate, target]);

  const display = animate ? n : target;

  return (
    <>
      <span className="font-serif tabular-nums">{display}</span>
      <span aria-hidden>{suffix}</span>
    </>
  );
}

export function StatCounterSection() {
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLElement | null>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return undefined;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setRevealed(true);
          obs.disconnect();
        }
      },
      { threshold: 0.3 },
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [reduced]);

  return (
    <Reveal scrollParallax>
      <section
        ref={ref}
        aria-labelledby="home-stats-heading"
        className="bg-charcoal px-5 py-16 text-footer-fg lg:px-8 lg:py-20"
      >
        <div className="mx-auto max-w-6xl">
          <h2
            id="home-stats-heading"
            className="text-center font-serif text-2xl tracking-tight text-footer-fg sm:text-3xl"
          >
            Numbers that travel with every installation
          </h2>
          <div className="mt-12 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {STATS.map((stat) => (
              <div
                key={stat.label}
                className="text-center sm:text-left"
              >
                <p className="font-serif text-4xl font-extrabold text-accent sm:text-[2.75rem]">
                  <AnimatedNumber
                    target={stat.value}
                    suffix={stat.suffix}
                    animate={revealed && !reduced}
                  />
                </p>
                <p className="mt-3 font-sans text-sm uppercase tracking-[0.22em] text-footer-muted">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Reveal>
  );
}
