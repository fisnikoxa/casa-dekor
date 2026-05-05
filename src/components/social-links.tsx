import type { JSX } from "react";

export function SocialLinks({
  facebookHref,
  instagramHref,
  variant,
  className = "",
}: {
  facebookHref: string;
  instagramHref: string;
  variant: "header" | "footer";
  className?: string;
}) {
  const fb = facebookHref.startsWith("http") ? facebookHref : undefined;
  const ig = instagramHref.startsWith("http") ? instagramHref : undefined;

  const iconTone =
    variant === "footer"
      ? "text-accent/90 hover:text-accent"
      : "text-accent hover:text-accent/80";

  const labelTone =
    variant === "footer" ? "text-footer-muted" : "text-foreground/60";
  const labelHoverTone =
    variant === "footer" ? "hover:text-footer-fg" : "hover:text-foreground";

  const items: {
    label: string;
    href?: string;
    icon: JSX.Element;
  }[] = [
    {
      label: "Facebook",
      href: fb,
      icon: <FacebookGlyph className={iconTone} />,
    },
    {
      label: "Instagram",
      href: ig,
      icon: <InstagramGlyph className={iconTone} />,
    },
  ];

  return (
    <ul
      className={`flex flex-wrap items-center gap-5 ${className}`.trim()}
      aria-label="Social profiles"
    >
      {items.map((item) => (
        <li key={item.label}>
          {item.href ? (
            <a
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-2 rounded-sm text-sm outline-offset-4 transition-colors ${labelTone} ${labelHoverTone}`}
            >
              <span className={`${iconTone} shrink-0 transition-colors`.trim()}>
                {item.icon}
              </span>
              <span className="font-medium tracking-wide">{item.label}</span>
              <span className="sr-only"> opens in a new tab</span>
            </a>
          ) : (
            <span
              className={`flex cursor-not-allowed items-center gap-2 text-sm opacity-55 ${labelTone}`}
              title={`${item.label} URL not configured`}
              aria-disabled="true"
            >
              {item.icon}
              <span className="sr-only">{item.label}; URL not configured yet</span>
            </span>
          )}
        </li>
      ))}
    </ul>
  );
}

function FacebookGlyph({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={20}
      height={20}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden
      focusable="false"
    >
      <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V7.332C14 6.067 14.192 6 14.893 6H18V2h-4.596C11.086 2 9 3.325 9 6.286V8z" />
    </svg>
  );
}

function InstagramGlyph({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={20}
      height={20}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden
      focusable="false"
    >
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 11-2.881 0 1.44 1.44 0 012.881 0z" />
    </svg>
  );
}
