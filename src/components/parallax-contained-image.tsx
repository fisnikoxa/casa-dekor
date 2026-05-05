"use client";

import Image from "next/image";
import { useRef } from "react";

import { useParallax } from "@/lib/hooks/useParallax";

type ParallaxContainedImageProps = {
  src: string;
  alt: string;
  sizes: string;
  containerClassName: string;
  className?: string;
  strength: number;
  priority?: boolean;
  loading?: "eager" | "lazy";
};

export function ParallaxContainedImage({
  src,
  alt,
  sizes,
  containerClassName,
  className = "object-cover",
  strength,
  priority,
  loading,
}: ParallaxContainedImageProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const y = useParallax(wrapRef, strength);

  return (
    <div ref={wrapRef} className={containerClassName}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        loading={loading}
        className={className}
        style={{ transform: `translate3d(0, ${y}px, 0)` }}
      />
    </div>
  );
}
