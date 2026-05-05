import Link from "next/link";

export default function GlobalNotFound() {
  return (
    <main className="mx-auto flex min-h-[50vh] max-w-xl flex-col justify-center gap-6 px-5 py-20 text-center">
      <div>
        <p className="font-sans text-xs font-semibold uppercase tracking-[0.32em] text-foreground/50">
          404 · Page not found
        </p>
        <h1 className="mt-4 font-serif text-3xl font-bold tracking-tight text-foreground">
          Let’s guide you home
        </h1>
      </div>
      <p className="font-sans text-base leading-relaxed text-foreground/70">
        The page you requested is unavailable. Head back to the overview or browse
        our collections curated for Macedonia-based projects.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-5">
        <Link
          href="/"
          className="rounded-full border border-foreground px-8 py-3 font-sans text-xs font-semibold uppercase tracking-[0.24em] text-foreground transition-colors hover:bg-foreground hover:text-background"
        >
          Home
        </Link>
        <Link
          href="/collections"
          className="font-sans text-sm font-semibold text-accent underline-offset-4 hover:underline"
        >
          Explore collections
        </Link>
      </div>
    </main>
  );
}
