"use client";

import { type MouseEvent as ReactMouseEvent, type ReactElement } from "react";

import { usePrefersReducedMotion } from "@/lib/hooks/mediaPreferences";

/** Wrap primary CTAs; shifts slightly toward cursor within proximity */
export function MagneticButton({ children }: { children: ReactElement }) {
  const prefersReducedMotion = usePrefersReducedMotion();

  const onLeave = (e: ReactMouseEvent<HTMLSpanElement>) => {
    e.currentTarget.style.transform = "translate3d(0,0,0)";
  };

  const onMove = (e: ReactMouseEvent<HTMLSpanElement>) => {
    if (prefersReducedMotion) return;

    const span = e.currentTarget;
    const rect = span.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const vx = e.clientX - cx;
    const vy = e.clientY - cy;
    const dist = Math.hypot(vx, vy);

    const margin = Math.max(rect.width, rect.height) / 2 + 60;
    let tx = 0;
    let ty = 0;
    if (dist < margin) {
      const pull = Math.max(0, 1 - dist / margin);
      const max = 8;
      tx = (vx / Math.max(dist, 1)) * max * pull;
      ty = (vy / Math.max(dist, 1)) * max * pull;
    }

    span.style.transform = `translate3d(${tx}px,${ty}px,0)`;
  };

  return (
    <span
      style={
        prefersReducedMotion
          ? undefined
          : {
              transition: `transform 400ms cubic-bezier(0.16,1,0.3,1)`,
            }
      }
      onMouseLeave={onLeave}
      onMouseMove={onMove}
      className="inline-flex"
    >
      {children}
    </span>
  );
}
