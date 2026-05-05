"use client";

import type { PointerEvent as ReactPointerEvent } from "react";
import type { CSSProperties, ReactNode } from "react";
import { useRef, useState } from "react";

import {
  useMediaMinMdHydrationSafe,
  usePrefersReducedMotion,
} from "@/lib/hooks/mediaPreferences";

type TiltCardProps = {
  children: ReactNode;
  className?: string;
};

/** 3D tilt + accent glow tracked to pointer (pillars / teaser cards) */
export function TiltCard({ children, className = "" }: TiltCardProps) {
  const reduceMotion = usePrefersReducedMotion();
  const { mdUp, ready } = useMediaMinMdHydrationSafe();
  const cardRef = useRef<HTMLDivElement>(null);
  const enabled = ready && mdUp && !reduceMotion;

  const [tiltStyle, setTiltStyle] = useState<Pick<CSSProperties, "transform">>(
    {},
  );
  const [glowStyle, setGlowStyle] = useState<
    Pick<CSSProperties, "background">
  >({});

  const onLeave = () => {
    setTiltStyle({});
    setGlowStyle({});
  };

  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!enabled) return;

    const el = cardRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const px = ((e.clientX - rect.left) / rect.width) * 100;
    const py = ((e.clientY - rect.top) / rect.height) * 100;
    const rx = Math.max(
      Math.min(((e.clientY - rect.top) / rect.height - 0.5) * -10, 5),
      -5,
    );
    const ry = Math.max(
      Math.min(((e.clientX - rect.left) / rect.width - 0.5) * 10, 5),
      -5,
    );

    setTiltStyle({
      transform: `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg)`,
    });
    setGlowStyle({
      background: `radial-gradient(circle at ${px}% ${py}%, rgba(174,143,96,0.12) 0%, transparent 60%)`,
    });
  };

  return (
    <div
      ref={cardRef}
      onPointerMove={onPointerMove}
      onPointerLeave={onLeave}
      className={`relative ${className}`.trim()}
    >
      <div
        className="motion-safe:transition-[transform] motion-safe:duration-300 motion-safe:ease-out"
        style={{
          ...(enabled ? tiltStyle : undefined),
          transformStyle: "preserve-3d",
          backfaceVisibility: "hidden",
        }}
      >
        <div
          aria-hidden
          className={`pointer-events-none absolute inset-0 z-[5] rounded-sm ${
            enabled ? "" : "hidden"
          }`}
          style={glowStyle}
        />
        <div className="relative z-[10] h-full">{children}</div>
      </div>
    </div>
  );
}
