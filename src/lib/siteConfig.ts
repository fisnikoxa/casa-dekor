/**
 * Central site constants. Social URLs resolve from `NEXT_PUBLIC_*` env vars (see `.env.example`).
 */
export const siteConfig = {
  name: "CASA DECOR",
  slogan: "Premium panels. Honest prices.",
  description:
    "Interior décor in the Republic of North Macedonia: PVC wall panels and marble-effect PVC finishes. Quality at the best price.",
  /** Cache-bust after replacing asset so stale ocean placeholder never sticks */
  logoSrc: "/logo.jpg?v=casa-decor-brand",
  social: {
    facebookUrl: process.env.NEXT_PUBLIC_FACEBOOK_URL?.trim() ?? "",
    instagramUrl: process.env.NEXT_PUBLIC_INSTAGRAM_URL?.trim() ?? "",
  },
} as const;
