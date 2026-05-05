"use client";

import Link from "next/link";

import {
  useMediaMinMdHydrationSafe,
  usePrefersReducedMotion,
} from "@/lib/hooks/mediaPreferences";

type Entry = {
  slug: string;
  title: string;
};

export function CollectionShortcutsNav({ collections }: { collections: Entry[] }) {
  const reduced = usePrefersReducedMotion();
  const { mdUp, ready } = useMediaMinMdHydrationSafe();
  const stagger = ready && mdUp && !reduced;

  return (
    <nav aria-label="Collection shortcuts">
      <ol
        className="-mx-1 flex gap-3 overflow-x-auto whitespace-nowrap px-1 py-2 [-webkit-overflow-scrolling:touch] md:flex-wrap md:overflow-visible md:py-0"
      >
        {collections.map((entry, idx) => (
          <li key={entry.slug} className="shrink-0">
            <Link
              href={`#${entry.slug}`}
              style={
                stagger
                  ? {
                      animationDelay: `${idx * 60}ms`,
                      animationFillMode: "both",
                      animationDuration: "480ms",
                      animationName: "shortcut-pill-in",
                      animationTimingFunction: `var(--motion-ease-standard)`,
                    }
                  : undefined
              }
              className={`inline-flex rounded-full border border-foreground/20 px-4 py-2 text-xs uppercase tracking-[0.2em] text-foreground hover:border-accent hover:text-accent`}
            >
              {entry.title}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}
