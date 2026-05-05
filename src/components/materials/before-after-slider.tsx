"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import { usePrefersReducedMotion } from "@/lib/hooks/mediaPreferences";

type BeforeAfterSliderProps = {
  beforeSrc: string;
  beforeAlt: string;
  afterSrc: string;
  afterAlt: string;
  beforeLabel: string;
  afterLabel: string;
};

export function BeforeAfterSlider({
  beforeSrc,
  beforeAlt,
  afterSrc,
  afterAlt,
  beforeLabel,
  afterLabel,
}: BeforeAfterSliderProps) {
  const reduced = usePrefersReducedMotion();
  const [pct, setPct] = useState(reduced ? 50 : 0);
  const dragging = useRef(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const seenRef = useRef(false);

  const setFromClientX = useCallback(
    (clientX: number) => {
      const el = rootRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = Math.min(Math.max(clientX - rect.left, 0), rect.width);
      setPct((x / rect.width) * 100);
    },
    [],
  );

  useEffect(() => {
    const el = rootRef.current;
    if (!el || reduced || seenRef.current) return undefined;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting && !seenRef.current) {
          seenRef.current = true;
          let start: number | null = null;
          const duration = 800;

          const step = (t: number) => {
            if (start === null) start = t;
            const p = Math.min(1, (t - start) / duration);
            const eased = 1 - (1 - p) * (1 - p);
            setPct(eased * 50);
            if (p < 1) requestAnimationFrame(step);
          };

          requestAnimationFrame(step);
          obs.disconnect();
        }
      },
      { threshold: 0.25 },
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [reduced]);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      if (!dragging.current) return;
      setFromClientX(e.clientX);
    };

    const onUp = () => {
      dragging.current = false;
    };

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, [setFromClientX]);

  return (
    <div
      ref={rootRef}
      className="relative mx-auto aspect-[4/3] w-full max-w-3xl overflow-hidden rounded-sm border border-foreground/10 bg-[var(--header-surface)] md:aspect-video"
    >
      <Image
        src={afterSrc}
        alt={afterAlt}
        fill
        sizes="(max-width: 768px) 100vw, 48rem"
        className="object-cover"
      />

      <div
        className="absolute inset-0"
        style={{ clipPath: `inset(0 ${100 - pct}% 0 0)` }}
      >
        <Image
          src={beforeSrc}
          alt={beforeAlt}
          fill
          sizes="(max-width: 768px) 100vw, 48rem"
          className="object-cover"
        />
      </div>

      <div
        className="absolute inset-y-0 w-0.5 bg-accent"
        style={{ left: `${pct}%`, transform: "translateX(-50%)" }}
      >
        <button
          type="button"
          aria-label="Drag to compare before and after"
          className="absolute left-1/2 top-1/2 flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-accent bg-white shadow-md"
          onPointerDown={(e) => {
            dragging.current = true;
            e.currentTarget.setPointerCapture(e.pointerId);
            setFromClientX(e.clientX);
          }}
        />
      </div>

      <p className="pointer-events-none absolute bottom-3 left-3 rounded-sm bg-charcoal/70 px-3 py-1 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-footer-fg backdrop-blur-sm">
        {beforeLabel}
      </p>

      <p className="pointer-events-none absolute bottom-3 right-3 rounded-sm bg-charcoal/70 px-3 py-1 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-footer-fg backdrop-blur-sm">
        {afterLabel}
      </p>
    </div>
  );
}
