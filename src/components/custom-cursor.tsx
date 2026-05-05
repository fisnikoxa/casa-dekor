"use client";

import { useEffect, useRef, useState } from "react";

import { usePrefersReducedMotion } from "@/lib/hooks/mediaPreferences";

const BODY_CLASS = "cursor-custom-active";

export function CustomCursor() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [render, setRender] = useState(false);

  const hoverRef = useRef(false);
  const seenMouseRef = useRef(false);
  const dotRef = useRef({ x: 0, y: 0 });
  const ringRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef(0);
  const dotEl = useRef<HTMLDivElement | null>(null);
  const ringEl = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const enable = fine && !coarse && !prefersReducedMotion;

    queueMicrotask(() => {
      setRender(enable);

      const body = document.body;
      if (enable) body.classList.add(BODY_CLASS);
      else body.classList.remove(BODY_CLASS);
    });

    return () => {
      document.body.classList.remove(BODY_CLASS);
    };
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (!render) return undefined;

    const tick = () => {
      const t = dotRef.current;
      const r = ringRef.current;
      ringRef.current = {
        x: r.x + (t.x - r.x) * 0.12,
        y: r.y + (t.y - r.y) * 0.12,
      };

      const dot = dotEl.current;
      const ring = ringEl.current;
      if (dot && ring) {
        const seen = seenMouseRef.current;
        const h = hoverRef.current;
        const rr = ringRef.current;

        dot.style.opacity = seen && !h ? "1" : "0";
        dot.style.left = `${t.x - 3}px`;
        dot.style.top = `${t.y - 3}px`;

        ring.style.left = `${rr.x - 16}px`;
        ring.style.top = `${rr.y - 16}px`;
        ring.style.transform = h ? "scale(2.2)" : "scale(1)";
        ring.style.opacity = seen ? (h ? "0.42" : "0.55") : "0";
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(rafRef.current);
  }, [render]);

  useEffect(() => {
    if (!render) return undefined;

    const onMouseMove = (e: MouseEvent) => {
      if (!seenMouseRef.current) {
        ringRef.current = { x: e.clientX, y: e.clientY };
      }
      seenMouseRef.current = true;
      dotRef.current = { x: e.clientX, y: e.clientY };

      let overHover = false;
      const stack =
        typeof document.elementsFromPoint === "function"
          ? document.elementsFromPoint(e.clientX, e.clientY)
          : [];
      for (const node of stack) {
        if (node instanceof Element && node.closest("a, button, [role='button']")) {
          overHover = true;
          break;
        }
      }
      hoverRef.current = overHover;
    };

    document.addEventListener("mousemove", onMouseMove, { passive: true });
    return () => document.removeEventListener("mousemove", onMouseMove);
  }, [render]);

  if (!render) return null;

  return (
    <>
      <div
        aria-hidden
        ref={dotEl}
        className="pointer-events-none fixed left-0 top-0 z-[9999] rounded-full opacity-0 bg-accent"
        style={{
          width: 6,
          height: 6,
        }}
      />
      <div
        aria-hidden
        ref={ringEl}
        className="pointer-events-none fixed left-0 top-0 z-[9999] rounded-full border-[1.5px] border-[var(--accent)] opacity-0 motion-safe:transition-[opacity,transform] motion-safe:duration-200 motion-reduce:transition-none"
        style={{
          width: 32,
          height: 32,
        }}
      />
    </>
  );
}
