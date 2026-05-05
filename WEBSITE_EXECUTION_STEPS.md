# CASA DECOR — 5-step execution plan (Cursor)

This file breaks **[WEBSITE_SPEC.md](./WEBSITE_SPEC.md)** into five ordered phases so an agent can implement the site incrementally without re-reading the full spec each time. After each step, the project should remain buildable (`next build`) where applicable.

---

## Step 1 — Scaffold & configuration

**Goal:** Empty Next.js foundation that matches deployment and wiring decisions from the spec.

**Do:**

- Initialize **Next.js (App Router)** + **React**; choose **one** styling approach (Tailwind, CSS Modules, or CSS-in-JS) and use it consistently.
- Prepare **Vercel** compatibility (default Next output; no conflicting experimental flags unless needed).
- Add **`public/logo.jpg`** (or keep a documented placeholder until the asset exists); ensure the app references **`/logo.jpg`** per spec.
- Add **`siteConfig`** (or equivalent) plus **env placeholders** for social URLs: `NEXT_PUBLIC_FACEBOOK_URL`, `NEXT_PUBLIC_INSTAGRAM_URL` (TBD values OK).
- Set **English** as UI language baseline; codify **MKD** formatting helper or comment where prices will appear later.
- Add a minimal **root layout**: semantic landmarks (`header`, `main`, `footer`), base **`<title>`** / meta description strategy for extension in Step 3.

**Spec coverage:** Spec sections 2 (language/currency/context), 3 (logo path), 8 (stack/hosting/social env pattern), 10.

**Done when:** `npm run build` (or equivalent) succeeds; logo path and env-driven social hooks exist even if URLs are placeholders.

---

## Step 2 — Brand shell: navigation, footer, typography, colors

**Goal:** Sitewide frame that matches CASA DECOR visual direction before page-specific layouts.

**Do:**

- **Header:** Logo, primary nav linking to all top-level routes (placeholders `#` acceptable until routes exist — replace in Step 3).
- **Footer:** Copyright **© CASA DECOR**, **Republic of North Macedonia** / service-area line, Facebook & Instagram icons wired to Step 1 env/config.
- **Colors:** Warm **cream/beige** surfaces, **black** primary text (~`#111`–`#0a0a0a`), **muted gold/warm tan** accents, optional **dark charcoal** (`#1a1a1a`) sections.
- **Type:** Bold **serif** for headings; clean **sans** for UI/body; optional light **script/italic** for a single tagline only.
- Optionally define **motion tokens** (e.g. easing/duration variables) for reuse in Step 4.

**Spec coverage:** Spec sections 1 (slogan placement readiness), 3 (brand/assets/typography), 9 (footer), 12 partial (brand alignment).

**Done when:** Every page stub can reuse the same header/footer without visual drift; Macedonia + social requirement is visible in footer.

---

## Step 3 — Information architecture & all routes (content + SEO baseline)

**Goal:** Full route map from spec sections 6–7 with real pages, copy, and per-route metadata — **before** heavy motion polish.

**Do:**

Implement **App Router** routes:

| Route | Deliverable |
| --- | --- |
| `/` | Minimal structure only — full hero/teasers finalized in Step 4. |
| `/collections` | Responsive **grid** of collections/categories; link into detail pattern. |
| `/collections/[slug]` | Collection detail; agree **one** product-depth pattern (**nested** `/[productSlug]` *or* flat `/products/[slug]`) and use it consistently. |
| `/materials` | Educational sections: PVC benefits, marble-effect vs solid colors, rooms, maintenance (skimmable). |
| `/gallery` | Masonry **or** uniform grid; **placeholder** images OK (`next/image` + dimensions/`fill` + `sizes`). |
| `/about` | Tone: trustworthy, **North Macedonia** focus, quality at reachable prices. |
| `/contact` | **No forms.** Email, phone, optional WhatsApp, social links — placeholders OK; single “contact us” stance per page requirements in the spec. |

- **Semantic HTML** (headings hierarchy, landmarks, meaningful link text).
- **Per-page `<title>` and meta description** (starter copy is fine).
- Home: scaffold **sections** named in spec — three pillar cards, credibility strip, teasers — with **stub** visuals; defer parallax/video to Step 4.
- Clarify **no showroom**: at most service-area copy (already in footer from Step 2).

**Spec coverage:** Spec section 6 (IA), section 7 (page requirements: structure + copy depth), section 8 (images/semantic/SEO baseline), section 11 out-of-scope (do not add forms/CMS/checkout).

**Done when:** Acceptance checklist (spec section 12) item “All six areas live” is satisfied at the **routing + content** level; internal links work end-to-end.

---

## Step 4 — Hero, “one panel” creative, motion & accessibility

**Goal:** Creative centerpiece (spec sections 4–5) plus scroll/parallax/video **with** `prefers-reduced-motion` support.

**Do:**

- **Home hero:** Strong **single focal surface** (stock marble/panel imagery or short loop); optional **video** behind content with overlay for readability (poster + muted autoplay patterns as appropriate).
- **Layered parallax:** 2–3 layers on hero/key strips on desktop; **simplify or disable on mobile** if performance suffers.
- **Scroll reveals:** Stagger headings/cards sparingly — not every paragraph.
- **`prefers-reduced-motion`:** Swap to static imagery; disable/disable-heavy parallax and autoplay jitter.
- Reinforce slogan: **“Premium panels. Honest prices.”** (or alt line) prominently in hero/SEO-aligned placement.
- **Repeating motif** (optional, spec section 4): blurred texture/footer or divider echo — only if time allows without hurting performance.

**Spec coverage:** Spec sections 4 (centerpiece), 5 (motion), 7 (Home hero completeness), 12 (bold motion + reduced-motion).

**Done when:** Hero + key motion behaviors match spec intent; reducing system motion yields a usable static experience.

---

## Step 5 — Acceptance pass, placeholders, deploy readiness

**Goal:** Acceptance checklist (spec section 12) and production hygiene.

**Do:**

- Verify **six areas** remain complete after motion work (no broken layouts on mobile/tablet/desktop smoke check).
- **MKD:** Any price placeholders labeled or formatted consistently (spec section 2).
- **Macedonia-only** messaging clear **About** + **footer** alignment.
- **Facebook + Instagram** visible (header/footer) and driven by Step 1 config.
- **`public/logo.jpg`** loads everywhere the brand mark appears.
- **Images:** `next/image` usage with explicit sizing / `sizes` on hero + grids.
- **`next build`** clean; brief **README** note: deploy on **Vercel**, env vars needed for social links.

**Spec coverage:** Section 8 performance note (reasonable defaults), section 9 polish, section 12 full checklist.

**Done when:** All section-12 bullets can be checked; site is merge/deploy-ready pending real asset URLs and photography swaps later (spec section 11).

---

## Quick trace: spec sections → steps

| Spec sections | Primary step |
| --- | --- |
| 2, 8, 10 — context, stack, env | Step 1 |
| 3, 9 — brand, footer | Step 2 |
| 6, 7 — routes, pages, copy | Step 3 |
| 4, 5 — hero, motion | Step 4 |
| 12 — acceptance | Step 5 |

*For the authoritative requirements, always reconcile against [WEBSITE_SPEC.md](./WEBSITE_SPEC.md).*
