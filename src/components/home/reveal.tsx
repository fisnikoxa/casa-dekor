"use client";

import {
  type CSSProperties,
  type HTMLAttributes,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";

import { usePrefersReducedMotion } from "@/lib/hooks/mediaPreferences";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Stagger sequencing for sibling reveals */
  delayMs?: number;
  /** Subtle vertical drift while scrolling after the block has entered view */
  scrollParallax?: boolean;
} & HTMLAttributes<HTMLDivElement>;

/** Single rAF-scheduled scroll flush shared by all parallax reveals */
const parallaxCallbacks = new Set<() => void>();
let parallaxRaf = 0;

function scheduleParallaxFlush() {
  if (parallaxRaf) return;
  parallaxRaf = requestAnimationFrame(() => {
    parallaxRaf = 0;
    parallaxCallbacks.forEach((fn) => fn());
  });
}

function subscribeParallaxScroll(cb: () => void) {
  parallaxCallbacks.add(cb);

  const onScrollOrResize = () => scheduleParallaxFlush();

  window.addEventListener("scroll", onScrollOrResize, { passive: true });
  window.addEventListener("resize", onScrollOrResize);

  return () => {
    parallaxCallbacks.delete(cb);
    window.removeEventListener("scroll", onScrollOrResize);
    window.removeEventListener("resize", onScrollOrResize);
    if (parallaxCallbacks.size === 0 && parallaxRaf) {
      cancelAnimationFrame(parallaxRaf);
      parallaxRaf = 0;
    }
  };
}

export function Reveal({
  children,
  className = "",
  delayMs = 0,
  scrollParallax = false,
  style,
  ...rest
}: RevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);
  const [parallaxY, setParallaxY] = useState(0);
  const reduceMotion = usePrefersReducedMotion();
  const parallaxOn = scrollParallax && !reduceMotion;

  useEffect(() => {
    const el = ref.current;
    if (!el) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.06, rootMargin: "0px 0px -5% 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!parallaxOn || !visible) {
      setParallaxY(0);
      return undefined;
    }

    const update = () => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const mid = rect.top + rect.height / 2;
      const norm = (mid - vh / 2) / Math.max(vh, 1);
      const clamped = Math.max(-1, Math.min(1, norm));
      setParallaxY(clamped * -32);
    };

    update();
    return subscribeParallaxScroll(update);
  }, [parallaxOn, visible]);

  const inner =
    parallaxOn ? (
      <div
        className="h-full min-h-0 w-full will-change-transform"
        style={
          visible ? { transform: `translate3d(0, ${parallaxY}px, 0)` } : undefined
        }
      >
        {children}
      </div>
    ) : (
      children
    );

  return (
    <div
      ref={ref}
      className={`reveal ${visible ? "reveal-visible" : ""} ${className}`.trim()}
      style={
        {
          ...style,
          "--reveal-delay": `${delayMs}ms`,
        } as CSSProperties
      }
      {...rest}
    >
      {inner}
    </div>
  );
}
