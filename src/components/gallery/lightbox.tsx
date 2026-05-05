"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

import { usePrefersReducedMotion } from "@/lib/hooks/mediaPreferences";

export type LightboxImg = {
  src: string;
  alt: string;
};

export function Lightbox({
  images,
  initialIndex,
  onClose,
}: {
  images: LightboxImg[];
  initialIndex: number;
  onClose: () => void;
}) {
  const reduced = usePrefersReducedMotion();
  const [index, setIndex] = useState(initialIndex);
  const touchStartX = useRef<number | null>(null);
  const closingTimer = useRef<number | null>(null);
  const closingOnce = useRef(false);
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  const [visual, setVisual] = useState<"entry" | "show" | "exiting">(
    reduced ? "show" : "entry",
  );

  const lastIdx = Math.max(images.length - 1, 0);

  const animateClose = useCallback(() => {
    if (closingOnce.current) return;

    closingOnce.current = true;

    if (reduced) {
      onCloseRef.current();
      return;
    }

    setVisual("exiting");

    closingTimer.current = window.setTimeout(() => {
      onCloseRef.current();
    }, 220);
  }, [reduced]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        animateClose();
      }

      if (e.key === "ArrowLeft") {
        setIndex((i) => (i <= 0 ? lastIdx : i - 1));
      }

      if (e.key === "ArrowRight") {
        setIndex((i) => (i >= lastIdx ? 0 : i + 1));
      }
    }

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [animateClose, lastIdx]);

  useEffect(() => {
    if (reduced) return undefined;
    const id = window.requestAnimationFrame(() => setVisual("show"));
    return () => window.cancelAnimationFrame(id);
  }, [reduced]);

  useEffect(() => {
    return () => {
      if (closingTimer.current) {
        window.clearTimeout(closingTimer.current);
      }
    };
  }, []);

  const slide = (dir: number) => {
    setIndex((i) => {
      const n = i + dir;
      if (n < 0) return lastIdx;
      if (n > lastIdx) return 0;
      return n;
    });
  };

  const active = images[index];

  const overlayOpacity =
    reduced ? 1 : visual === "entry" ? 0 : visual === "show" ? 1 : 0;

  const imageScale =
    reduced ? 1 : visual === "entry" ? 0.88 : visual === "show" ? 1 : 0.88;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Gallery preview"
      className="fixed inset-0 z-[150] flex flex-col bg-[rgba(26,22,18,0.94)] backdrop-blur-[12px] motion-safe:transition-[opacity] motion-safe:ease-out"
      style={{
        opacity: overlayOpacity,
        transitionDuration:
          reduced ? undefined : `${visual === "exiting" ? 220 : 280}ms`,
      }}
      onClick={animateClose}
    >
      <button
        type="button"
        aria-label="Close gallery"
        onClick={(e) => {
          e.stopPropagation();
          animateClose();
        }}
        className="absolute right-5 top-[calc(env(safe-area-inset-top,0)+1.25rem)] z-[2] rounded-sm px-2 py-1 text-4xl leading-none text-footer-fg transition-colors hover:text-accent"
      >
        ×
      </button>

      <button
        type="button"
        aria-label="Previous image"
        onClick={(e) => {
          e.stopPropagation();
          slide(-1);
        }}
        className="absolute left-2 top-1/2 z-[2] hidden -translate-y-1/2 rounded-full bg-charcoal/55 px-4 py-6 text-accent hover:bg-charcoal md:block"
      >
        ‹
      </button>

      <button
        type="button"
        aria-label="Next image"
        onClick={(e) => {
          e.stopPropagation();
          slide(1);
        }}
        className="absolute right-2 top-1/2 z-[2] hidden -translate-y-1/2 rounded-full bg-charcoal/55 px-4 py-6 text-accent hover:bg-charcoal md:block"
      >
        ›
      </button>

      <div
        className="flex flex-1 flex-col items-center justify-center px-6 pb-28 pt-[calc(env(safe-area-inset-top,0)+5rem)]"
        role="presentation"
        onTouchStart={(e) => {
          touchStartX.current = e.touches[0]?.clientX ?? null;
        }}
        onTouchEnd={(e) => {
          if (touchStartX.current === null) return;

          const sx = touchStartX.current;
          touchStartX.current = null;
          const ex = e.changedTouches[0]?.clientX ?? sx;
          const d = ex - sx;

          if (d < -52) slide(1);
          else if (d > 52) slide(-1);
        }}
      >
        <div
          role="presentation"
          className="motion-safe:transition-[transform,opacity] motion-safe:ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{
            transform: reduced ? undefined : `scale(${imageScale})`,
            opacity: overlayOpacity,
            transitionDuration:
              reduced ? undefined : `${visual === "exiting" ? 220 : 280}ms`,
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {active ? (
            <Image
              src={active.src}
              alt={active.alt}
              width={1400}
              height={980}
              className="mx-auto block h-auto max-h-[88vh] w-auto max-w-full object-contain"
              sizes="92vw"
              priority
            />
          ) : null}
          <p className="mt-6 text-center font-sans text-sm text-footer-muted md:px-10">
            {active?.alt}
          </p>
        </div>
      </div>
    </div>
  );
}
