# CASA DECOR — Design Upgrade Directives

This file is the authoritative source of truth for all UI/UX improvements to be applied on top of the existing codebase. Every instruction below is a concrete, actionable change. Do not add any content to the site that references this file, this audit, or anything about design evaluation. All changes must feel native to the brand.

---

## 0. Critical Content Fixes — Apply First, Zero Risk

These are pure text edits. Apply before touching any code.

### 0.1 `src/components/home/home-hero.tsx`
- In the hero panel, replace the caption at the bottom of the floating card:
  - **Remove:** `"Marble-intent PVC layer — swap this plate when photography lands without changing routes."`
  - **Replace with:** `"Calacatta Oro · High-gloss PVC finish"`

### 0.2 `src/app/page.tsx`
- In the social section (`aria-labelledby="home-social-connect"`):
  - **Remove the `<span>` eyebrow:** `"Same social stack as the site header"`
  - **Replace eyebrow with:** `"Stay connected"`
  - **Replace the entire `<p>` body** that mentions `NEXT_PUBLIC_FACEBOOK_URL` and `NEXT_PUBLIC_INSTAGRAM_URL` env var code snippets with:
    `"Follow our latest collections, installation previews, and design inspiration on Facebook and Instagram."`
- In the pillars section description `<p>`:
  - **Remove:** `"tuned to the educational tone in WEBSITE_SPEC"`
  - **Replace with:** `"Each pillar links deeper so visitors always have a clear next step."`

### 0.3 `src/app/gallery/page.tsx`
- Replace `<h1>` text:
  - **Remove:** `"Moodboard placeholders while photography catches up"`
  - **Replace with:** `"Installation vignettes & material moods"`
- Replace the `<p>` intro below the h1:
  - **Remove:** `"These royalty-free vignettes imitate the gloss control, tactile grain, and scale we specify on site. Swap them for Macedonia-based installs whenever your photographer schedules capture days."`
  - **Replace with:** `"A curated collection of surfaces, textures, and installed environments that reflect the depth and quality of CASA DECOR's PVC wall panel range."`
- Replace the gallery section subtitle `<p>`:
  - **Remove:** `"Responsive columns keep breathing room across tablets; captions stay meaningful for SEO and screen readers alike."`
  - **Replace with:** `"Browse by mood — from marble drama to tonal calm."`

### 0.4 `src/app/contact/page.tsx`
- Remove the `<dd>` note under the phone field:
  - **Remove:** `"Replace placeholder digits with your routed studio line whenever ready."`
- Remove the `<dd>` note under WhatsApp:
  - **Remove:** `"Optional — disable the link whenever you prefer purely email workflows."`

---

## 1. Page Loader / Entry Animation

**File to create:** `src/components/page-loader.tsx`
**File to edit:** `src/app/layout.tsx`

### Behavior
When any page first loads (initial navigation only, not client-side route changes), show a full-screen branded entry animation that plays for ~1.4 seconds then transitions out, revealing the page beneath.

### Implementation spec
- A `<PageLoader>` client component that:
  - Renders a fixed full-screen overlay (`position: fixed; inset: 0; z-index: 200`) with the site background color (`var(--background)`)
  - In the center, animates the logo image: starts at scale 0.7 and opacity 0, eases to scale 1 and opacity 1 over 600ms using `cubic-bezier(0.16, 1, 0.3, 1)`
  - After 600ms, a thin horizontal line (1px, accent color) grows from the center outward (scaleX 0 → 1) over 300ms
  - After 1000ms total, the entire overlay fades out (`opacity: 0`) and slides up (`translateY(-8px)`) over 400ms, then unmounts
  - Use `useEffect` + `useState` to track `mounted` and `exiting` states
  - Once exited, remove from DOM entirely (conditional render)
  - Respects `prefers-reduced-motion`: if reduced motion is preferred, skip the animation entirely and unmount immediately after 100ms
- Mount `<PageLoader>` at the top of the `<body>` in `src/app/layout.tsx` so it appears on all pages
- Use `sessionStorage` to only show on the first page load per browser session, not on every route change

### CSS for loader
Add to `globals.css`:
```css
@keyframes loader-logo-in {
  from { opacity: 0; transform: scale(0.72) translateY(12px); }
  to   { opacity: 1; transform: scale(1) translateY(0); }
}
@keyframes loader-line-grow {
  from { transform: scaleX(0); opacity: 0; }
  to   { transform: scaleX(1); opacity: 1; }
}
@keyframes loader-exit {
  from { opacity: 1; transform: translateY(0); }
  to   { opacity: 0; transform: translateY(-10px); }
}
.loader-logo { animation: loader-logo-in 0.6s cubic-bezier(0.16,1,0.3,1) forwards; }
.loader-line { transform-origin: center; animation: loader-line-grow 0.3s cubic-bezier(0.16,1,0.3,1) 0.62s forwards; opacity: 0; }
.loader-exit { animation: loader-exit 0.4s ease-in forwards; }
```

---

## 2. Page Transitions (client-side navigation)

**File to create:** `src/components/page-transition.tsx`
**File to edit:** `src/app/layout.tsx`

### Behavior
When navigating between pages (not first load), sections on the departing page fade out and the arriving page fades + slides up into view.

### Implementation spec
- Use the **View Transitions API** where available, with a CSS `::view-transition-old` / `::view-transition-new` fallback
- In `layout.tsx`, wrap `{children}` in a `<PageTransition>` client component
- `<PageTransition>` uses `usePathname()` from `next/navigation` to detect route changes
- On route change: briefly apply `opacity: 0; transform: translateY(6px)` to the outgoing content wrapper, then remove it on the new page
- Duration: 280ms exit, 320ms enter
- Use `transition-[opacity,transform]` with the standard motion ease
- Respects `prefers-reduced-motion`: if preferred, skip transitions entirely

Add to `globals.css`:
```css
::view-transition-old(root) {
  animation: 280ms ease-in both page-fade-out;
}
::view-transition-new(root) {
  animation: 320ms cubic-bezier(0.16,1,0.3,1) both page-fade-in;
}
@keyframes page-fade-out {
  from { opacity: 1; transform: translateY(0); }
  to   { opacity: 0; transform: translateY(-6px); }
}
@keyframes page-fade-in {
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: translateY(0); }
}
@media (prefers-reduced-motion: reduce) {
  ::view-transition-old(root),
  ::view-transition-new(root) { animation: none; }
}
```

Enable View Transitions in Next.js by adding to `next.config.ts`:
```ts
experimental: { viewTransition: true }
```

---

## 3. Custom Cursor

**File to create:** `src/components/custom-cursor.tsx`
**File to edit:** `src/app/layout.tsx`

### Behavior
Replace the browser cursor on non-touch devices with a branded two-layer cursor: a small filled dot that follows the pointer precisely, and a larger ring that follows with a smooth lag (interpolated position).

### Implementation spec
- A `<CustomCursor>` client component, mounted once in `layout.tsx`
- Two `div` elements, both `position: fixed; pointer-events: none; z-index: 9999`
- **Dot:** 6px × 6px, `border-radius: 50%`, background `var(--accent)`, follows mouse at exact position (no lag)
- **Ring:** 32px × 32px, `border-radius: 50%`, `border: 1.5px solid var(--accent)`, opacity 0.55, follows mouse position interpolated at ~12% lerp factor using `requestAnimationFrame`
- Both start with `opacity: 0` until the first `mousemove` event fires (avoids flash at 0,0)
- **Hover state:** When cursor is over any `a`, `button`, or `[role="button"]` element, the ring scales to 2.2× and reduces opacity; the dot disappears. Detect via `mouseover`/`mouseout` on `document`
- **Hidden on touch:** `@media (pointer: coarse)` — don't render the component at all
- **Hide native cursor sitewide** when the custom cursor is active: add `cursor: none` to `body` only when the component confirms non-touch

---

## 4. Scroll Progress Bar

**File to create:** `src/components/scroll-progress.tsx`
**File to edit:** `src/app/layout.tsx`

### Behavior
A 2px-tall accent-colored bar at the very top of the viewport (above the header) that fills left-to-right as the user scrolls down the page.

### Implementation spec
- A `<ScrollProgress>` client component
- `position: fixed; top: 0; left: 0; z-index: 80` (below the header's z-70 but above content... actually use z-[75] so it sits just above header)
- Height: 2px
- Background: `var(--accent)`
- Width: driven by `scrollY / (documentHeight - viewportHeight) * 100%`
- Update via `scroll` event listener with `passive: true`, reading `window.scrollY`
- Use `requestAnimationFrame` to throttle
- `will-change: width`
- Respects `prefers-reduced-motion`: still show but skip the smooth `transition-[width]`

---

## 5. Parallax — Extend to All Pages

**Current state:** Parallax only exists in `home-hero.tsx`. It must be added to inner pages.

### 5.1 Inner page headers (Collections, Gallery, Materials, About, Contact)
Each inner page has a `<header>` section at the top. Wrap the background of these headers with a subtle parallax effect:
- Add a blurred background texture image (use a second Unsplash marble/interior image, NOT the same `photo-1615876235889` already used in the hero)
- The background image should move at 40% of scroll speed (when the section exits upward, the image moves slower, creating depth)
- Use the same `IntersectionObserver` + scroll listener pattern already in `home-hero.tsx`
- On mobile or when `prefers-reduced-motion` is active, disable parallax (no transform applied)

### 5.2 Section dividers / mid-page parallax moments
- On the home page credibility strip (the dark charcoal section), the blurred texture background should parallax at 30% scroll speed
- On the Collections page, each collection article's cover image should parallax at 15% speed within its clipped container (the image moves slightly slower than scroll, creating a "window into a world" effect)
- On the Gallery page, the masonry images should parallax at 10% speed within their fixed-height containers

### 5.3 Parallax utility hook
**File to create:** `src/lib/hooks/useParallax.ts`

```ts
// Returns a translateY value in px based on element's scroll position relative to viewport
// strength: 0.1 = subtle, 0.5 = strong
export function useParallax(elementRef: RefObject<HTMLElement | null>, strength: number): number
```
- Uses `IntersectionObserver` to only activate when element is near the viewport
- Uses `requestAnimationFrame`-throttled scroll listener
- Returns 0 when `prefers-reduced-motion` is true or on touch devices

---

## 6. Reveal Animations — All Inner Pages

**Current state:** `<Reveal>` component exists but is only used on the home page.

**Apply `<Reveal>` wrappers to every content section on these pages:**

### 6.1 `/collections` (`src/app/collections/page.tsx`)
- Wrap the page `<header>` content div in `<Reveal>`
- Wrap each `<article>` collection card in `<Reveal delayMs={index * 80}>`

### 6.2 `/collections/[slug]` (`src/app/collections/[slug]/page.tsx`)
- Wrap the page header in `<Reveal>`
- Wrap each product card/row in `<Reveal delayMs={index * 60}>`

### 6.3 `/gallery` (`src/app/gallery/page.tsx`)
- Wrap the page header in `<Reveal>`
- Wrap each `<figure>` in `<Reveal delayMs={index * 40}>` (small delay since masonry loads many)

### 6.4 `/materials` (`src/app/materials/page.tsx`)
- Wrap the page header in `<Reveal>`
- Wrap each `<section>` content block in `<Reveal delayMs={index * 100}>`

### 6.5 `/about` (`src/app/about/page.tsx`)
- Wrap the page header in `<Reveal>`
- Wrap the story `<section>` in `<Reveal>`
- Wrap the manifesto `<aside>` in `<Reveal delayMs={120}>`

### 6.6 `/contact` (`src/app/contact/page.tsx`)
- Wrap the page header in `<Reveal>`
- Wrap the contact methods `<section>` in `<Reveal>`
- Wrap the expectations `<section>` in `<Reveal delayMs={100}>`

---

## 7. Gallery Lightbox

**File to create:** `src/components/gallery/lightbox.tsx`
**File to edit:** `src/app/gallery/page.tsx`

### Behavior
Clicking any gallery image opens a full-screen lightbox overlay with the image centered, keyboard navigation (arrow keys, Escape to close), and a swipe gesture on mobile.

### Implementation spec
- `<Lightbox>` client component with props: `images: { src, alt }[]`, `initialIndex: number`, `onClose: () => void`
- Renders a fixed full-screen overlay: `position: fixed; inset: 0; z-index: 150; background: rgba(26,22,18,0.94); backdrop-filter: blur(12px)`
- The active image renders centered with `object-fit: contain; max-height: 88vh; max-width: 92vw`
- Previous/Next arrow buttons (left/right edges), styled with the accent color
- Close button (top-right corner, × glyph)
- Keyboard listeners: `ArrowLeft`, `ArrowRight`, `Escape`
- Touch swipe: track `touchstart`/`touchend` deltaX; swipe left = next, swipe right = prev
- Image caption displayed below the image (from `alt` text)
- Entry animation: overlay fades in, image scales from 0.88 → 1 over 280ms
- Exit animation: reverse — image scales to 0.88, overlay fades out over 220ms, then unmounts
- Respects `prefers-reduced-motion`: skip scale animations, just fade
- In `gallery/page.tsx`: convert each `<figure>` to be clickable (add `onClick`, `cursor: pointer`, `role="button"`), pass the `images` array and clicked index to `<Lightbox>`

---

## 8. Gallery Image Hover Effect

**File to edit:** `src/app/gallery/page.tsx`

On hover of each gallery `<figure>`:
- The image smoothly scales to 1.04 (currently no hover effect exists)
- A thin accent-colored border appears on the figure container
- The caption slides up 4px
- All transitions at 400ms with `cubic-bezier(0.16, 1, 0.3, 1)`

Apply via Tailwind classes on the `<figure>` and the inner `<Image>`:
```
group overflow-hidden
```
On the `<Image>`:
```
transition-transform duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]
```
On the `<figcaption>`:
```
transition-transform duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1
```

---

## 9. Collection Cards — Dual Image Hover Reveal

**File to edit:** `src/app/collections/page.tsx`

On hover of each collection's cover image link, reveal a second "detail" image (a close-up texture) using a clip-path or opacity cross-fade.

### Implementation
- Each collection article already has an image. Add a second `<Image>` stacked absolutely on top, with `opacity: 0` initially
- On hover (`group-hover`), the second image fades to `opacity: 1` over 500ms
- The second image should be a different Unsplash texture (use a variety — interior room shots, material close-ups — not the same marble image)
- Use Tailwind `group` on the parent link, `group-hover:opacity-100 opacity-0 transition-opacity duration-500` on the overlay image

---

## 10. Animated Statistics Section (Home Page)

**File to edit:** `src/app/page.tsx`

Add a new section between the credibility strip and the deep-dive teasers section. This section shows 3–4 brand numbers with a count-up animation that triggers when the section enters the viewport.

### Content
| Stat | Value | Label |
|------|-------|-------|
| 1 | 200+ | PVC panel designs |
| 2 | 8+ | Years supplying Macedonia |
| 3 | 1,000+ | Projects installed |
| 4 | 100% | North Macedonia coverage |

### Implementation
- Create `src/components/home/stat-counter.tsx` — a client component
- Each stat animates from 0 to its target number over 1.8s using an `easeOut` curve when it enters the viewport (`IntersectionObserver`, threshold 0.3)
- Non-numeric suffixes (`+`, `%`) are appended statically after the number
- Layout: 4-column grid on desktop, 2×2 on tablet, stacked on mobile
- Background: dark charcoal (`bg-charcoal`), text in `text-footer-fg`, numbers in `text-accent` at large serif size
- Wrap the section in `<Reveal>`
- Respects `prefers-reduced-motion`: if preferred, show final numbers immediately without animation

### Placement in `page.tsx`
Insert after the `<section aria-labelledby="credibility-strip">` block and before the teasers section.

---

## 11. Magnetic CTA Buttons

**File to create:** `src/components/magnetic-button.tsx`

### Behavior
Primary call-to-action buttons attract the cursor magnetically within a proximity radius, giving them a physical, tactile feel.

### Implementation spec
- A `<MagneticButton>` wrapper client component
- Tracks mouse position relative to the button center using `mousemove` on the button element
- When cursor is within 60px of the button edge, applies a `translate3d` shift of up to 8px in the cursor's direction (proportional to proximity)
- On `mouseleave`, smoothly springs back to 0,0 using a CSS transition of 400ms with `cubic-bezier(0.16,1,0.3,1)`
- Wraps the existing primary CTA buttons on the home hero (`View collections grid` and `Contact the studio`)
- Also wrap the `Book a briefing` button on the About page and `Open collection dossier` buttons on Collections
- Respects `prefers-reduced-motion`: skip translation, button is still clickable

---

## 12. Hover Effect on Pillar Cards (Home Page)

**File to edit:** `src/app/page.tsx`

The pillar cards and teaser cards already have a slight lift on hover. Enhance:
- Add the same 3D perspective tilt from the hero panel to each pillar card — on `mousemove`, apply `perspective(1000px) rotateX(Xdeg) rotateY(Ydeg)` (max ±5° each axis)
- Apply a subtle accent-glow in the direction of the cursor using a `radial-gradient` mask that tracks mouse position within the card
- The glow should be: `background: radial-gradient(circle at X% Y%, rgba(174,143,96,0.12) 0%, transparent 60%)`
- Use a client component wrapper `src/components/tilt-card.tsx` that accepts `children` and applies the mouse tracking behavior

---

## 13. Image Diversity Fix

**Current problem:** `photo-1615876235889` from Unsplash is used 4+ times throughout the site for different visual roles.

**Fix:** Replace with distinct images per visual role:

| Usage location | Current image | Replace with |
|---|---|---|
| `home-hero.tsx` — `backLayerStill` (blurred background wash) | photo-1615876235889 | `https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1800&q=78` (dark interior) |
| `home-hero.tsx` — `foregroundSrc` prop (from page.tsx) | photo-1615876235889 | Keep as-is (this is the primary hero panel — real photo will replace later) |
| `page.tsx` — `motifs.texture` (credibility strip background) | photo-1615876235889 | `https://images.unsplash.com/photo-1631679706909-1844bbd07221?auto=format&fit=crop&w=1200&q=60` (stone texture) |
| Collections cover images | Same marble image for all | Use distinct images per collection — see collection data in `src/lib/collections.ts` and assign unique Unsplash IDs |

---

## 14. Inner Page Header Ambient Effect

**Apply to:** Collections, Gallery, Materials, About, Contact page headers

Each inner page `<header>` currently has a plain `bg-[var(--header-surface)]` background with a bottom border. Upgrade:

- Add a very subtle radial glow in one corner: `background: radial-gradient(ellipse 60% 80% at 90% 50%, rgba(174,143,96,0.07) 0%, transparent 100%)`
- Add a film grain overlay (reuse the `hero-grain` class from `globals.css`) at 3% opacity
- Add the bottom border gradient: instead of a solid `border-b border-accent/25`, use a pseudo-element or inline `div` as a 1px gradient line: `background: linear-gradient(to right, transparent, rgba(174,143,96,0.4) 30%, rgba(174,143,96,0.4) 70%, transparent)`

---

## 15. Materials Page — Before/After Comparison Slider

**File to create:** `src/components/materials/before-after-slider.tsx`
**File to edit:** `src/app/materials/page.tsx`

### Behavior
In the "Marble-effect glamour vs tonal solids" section, replace the two static `<figure>` comparison cards with an interactive drag slider that shows a marble-look PVC image on the left and a solid/micro-grain PVC image on the right, split by a draggable divider.

### Implementation spec
- A `<BeforeAfterSlider>` client component
- Props: `beforeSrc`, `beforeAlt`, `afterSrc`, `afterAlt`, `beforeLabel`, `afterLabel`
- Layout: a fixed-height container (aspect ratio 16/9 on desktop, 4/3 on mobile) with two absolutely positioned images
- The "after" image is clipped using `clip-path: inset(0 0 0 X%)` where X is driven by the slider handle position (0–100%)
- A draggable vertical divider line (2px, accent color) with a circular handle (32px, white fill, accent border)
- Supports mouse drag and touch drag
- Labels appear on each half: `beforeLabel` bottom-left, `afterLabel` bottom-right
- Default position: 50%
- Animate to initial position (from 0% to 50%) over 800ms on first enter (triggered by IntersectionObserver) to show the user it's interactive
- Respects `prefers-reduced-motion`: start at 50% without the animation reveal

### Images to use
- Before (marble-look): `https://images.unsplash.com/photo-1615876235889-fd91a7d29dde?auto=format&fit=crop&w=1200&q=80`
- After (solid/minimal): `https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80`

---

## 16. Scroll-Triggered Horizontal Reveal on Collections Page

**File to edit:** `src/app/collections/page.tsx`

The collection shortcuts navigation at the top of the page currently renders as a static flex-wrap. Upgrade:
- Convert to a horizontally scrollable row on mobile (add `overflow-x-auto; white-space: nowrap; -webkit-overflow-scrolling: touch`)
- On desktop, the pill links animate in from left to right on page entry: each pill starts at `opacity: 0; transform: translateX(-12px)` and staggers in at 60ms intervals

---

## 17. Technical Implementation Notes

### Motion constants (already in `globals.css` — do not duplicate)
```
--motion-ease-standard: cubic-bezier(0.16, 1, 0.3, 1);
--motion-duration-fast: 200ms;
--motion-duration-reveal: 520ms;
```

### z-index layering (do not conflict)
| Layer | z-index |
|---|---|
| Custom cursor | 9999 |
| Page loader | 200 |
| Lightbox | 150 |
| Site header | 70 |
| Scroll progress bar | 75 |
| Parallax backgrounds | below content (negative or 0) |

### Component file locations
All new components go in `src/components/` under an appropriate subfolder:
- `src/components/page-loader.tsx`
- `src/components/page-transition.tsx`
- `src/components/custom-cursor.tsx`
- `src/components/scroll-progress.tsx`
- `src/components/magnetic-button.tsx`
- `src/components/tilt-card.tsx`
- `src/components/gallery/lightbox.tsx`
- `src/components/home/stat-counter.tsx`
- `src/components/materials/before-after-slider.tsx`
- `src/lib/hooks/useParallax.ts`

### `layout.tsx` mount order (top to bottom inside `<body>`)
```tsx
<PageLoader />
<ScrollProgress />
<CustomCursor />
<SiteHeader />
<PageTransition>
  {children}
</PageTransition>
<SiteFooter />
```

### Always respect these constraints
- Every animation must have a `prefers-reduced-motion: reduce` fallback that either disables the animation entirely or shows the final state immediately
- Custom cursor must not render on touch/pointer-coarse devices
- Parallax must disable on mobile (`max-width: 768px`) for performance
- The `<Reveal>` component already exists at `src/components/home/reveal.tsx` — use it as-is, do not create a new one
- Do not change the color palette, font choices, or brand identity
- Do not add any placeholder-facing developer notes into component JSX (no comments about "swap later" visible to users)
- All `next/image` usages must keep `sizes`, `fill`, `priority`, and `alt` attributes intact

---

## 18. Implementation Order

Apply in this order to keep the project buildable at each step:

1. **Section 0** — Content fixes (text edits only, no risk)
2. **Section 13** — Image diversity fix (swap URLs)
3. **Section 4** — Scroll progress bar (isolated, no dependencies)
4. **Section 3** — Custom cursor (isolated)
5. **Section 6** — Reveal wrappers on all inner pages (uses existing component)
6. **Section 5** — Parallax on inner pages (requires `useParallax` hook first)
7. **Section 1** — Page loader (requires `layout.tsx` edit)
8. **Section 2** — Page transitions (requires `next.config.ts` edit)
9. **Section 8** — Gallery hover effects (CSS only)
10. **Section 7** — Gallery lightbox (new component + page edit)
11. **Section 9** — Collection dual-image hover (page edit)
12. **Section 10** — Statistics counter section (new component + page edit)
13. **Section 11** — Magnetic buttons (new component)
14. **Section 12** — Tilt cards (new component)
15. **Section 14** — Inner page header ambient effects
16. **Section 15** — Before/after slider (new component + page edit)
17. **Section 16** — Collections horizontal pill animation

---

*This document is the complete design upgrade specification for CASA DECOR. All implementation should reference this file alongside `WEBSITE_SPEC.md` and `WEBSITE_EXECUTION_STEPS.md`.*
