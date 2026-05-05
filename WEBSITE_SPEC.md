# CASA DECOR — Website specification (Cursor handoff)

Use this document as the single source of truth when scaffolding and building the site. Prefer **React + Next.js**, deploy on **Vercel**.

---

## 1. Business & positioning

| Field | Value |
| --- | --- |
| **Brand / legal name** | CASA DECOR |
| **What we sell** | Interior décor: **PVC wall panels**, **PVC marble-effect décor** (and related finishes). |
| **Differentiator** | **Quality at the best price.** |
| **Primary goal** | Visitors immediately **understand the product categories** we sell—not full e‑commerce urgency yet. |

### Suggested marketing slogan (site hero / SEO title—logo tagline stays as on asset)

Use one line prominently; A/B wording is optional:

- **Primary:** “Premium panels. Honest prices.”
- **Alt:** “Marble looks. Walls that last.”

(Brand still reads as upscale; aligns with quality + price.)

---

## 2. Audience, language, commerce context

| Field | Value |
| --- | --- |
| **Language** | English only (UI, copy). |
| **Currency** | Display prices in **MKD** wherever prices appear (MKD formatter: e.g. `1.234 MKD` or locale-appropriate—not critical for v1 if prices are placeholders). |
| **Service area** | **North Macedonia only** (state plainly in footer or About). |

---

## 3. Brand & assets

### Logo

- **Use file:** `logo.jpg`.
- **Next.js convention:** Place at **`public/logo.jpg`** so it is served from `/logo.jpg`.
- **Note:** If `logo.jpg` is not yet in the repo, add it under `public/` before shipping.

### Color direction (match logo vibe)

| Role | Guidance |
| --- | --- |
| **Surfaces** | Warm **cream/beige** (large backgrounds; “quiet luxury”). |
| **Primary text / structure** | **Black** (`#111`–`#0a0a0a`). |
| **Accent** | **Muted gold/warm tan** (highlights, key CTAs, fine lines—don’t overpower). |
| **Contrast sections** | **Dark charcoal** blocks allowed (`#1a1a1a` range) over cream typography or inverted for variety. |

### Typography direction (approximate logo feel)

| Use | Feel |
| --- | --- |
| **Headings** | Bold, editorial **serif** (premium, stable). |
| **UI / labels / DECOR-like blocks** | Clean **sans-serif**, generous letter-spacing on small caps where needed. |
| **Optional accent** | **Script or subtle italic** for one short tagline—not overused (logo already has elegance). |

### Imagery

- **v1:** **Placeholders** for product/showroom imagery (premium marble/panel texture from free stock OK).
- **Later:** Swap for real SKU photography without changing routes or layout assumptions.

---

## 4. Creative centerpiece: “one tile / one panel”

**Concept:** Hero and key scroll moments revolve around **one standout surface** (a single PVC marble-look tile or panel sample) treated as the “hero object.”

Ideas compatible with bolder motion:

- **Layered parallax:** foreground panel/tile sharp; background blurred stone or interior wash.
- **Scroll narrative:** headline + subcopy pin while the hero surface **slowly scales or rotates** subtly (within performance bounds).
- **Optional video:** short loop—light moving across glossy PVC marble veins (muted, no loud music).
- **Repeating motif:** blurred/scaled repeats of the same texture in footer or section dividers (cohesive branding).

No real SKU/name yet—**pick one high-quality stock image or short clip** aligned with PVC marble décor; replace later.

---

## 5. Motion & interaction

User wants **bolder** treatments:

| Technique | Guidance |
| --- | --- |
| **Scroll-triggered reveals** | Sections stagger in (opacity + translate)—not aggressive on every paragraph; reserve for headings and cards. |
| **Layered parallax** | 2–3 depth layers max on hero / key strips; reduce on mobile if janky. |
| **Video background** | Allowed on hero behind content with dark/cream overlay for readability; `prefers-reduced-motion`: static poster frame. |

**Accessibility:** Respect `prefers-reduced-motion` (disable parallax/video autoplay jitter; show stills).

---

## 6. Information architecture & routing

Suggested **Next.js App Router** routes:

| Route | Purpose |
| --- | --- |
| `/` | Home |
| `/collections` | Collections index |
| `/collections/[slug]` | Collection detail |
| `/materials` | Materials overview (PVC types, marble effect, finishes) |
| `/gallery` | Visual gallery grid (portfolio / installs—placeholders OK) |
| `/about` | Story, Macedonia-only service, quality + value |
| `/contact` | Contact only (see Legal) |

**Product depth:**

- **Collections / products:** Simple **responsive grid** on listing pages.
- **Detail pages:** **Per-product or per-collection detail** routes (e.g. `/collections/[slug]/[productSlug]` **or** flat `/products/[slug]`—choose one pattern and stay consistent).

**No showroom:** No map, hours, or “visit us”—optional single line “Republic of North Macedonia” / service area text only.

---

## 7. Page-level requirements

### Home

- Stunning **hero** with parallax/video option and **one-panel** creative focus.
- Clear **three pillars** or cards: PVC wall panels • PVC marble décor • Interior transformation (adjust copy).
- Short **credibility strip:** quality + fair pricing (differentiator).
- Teasers linking to Collections, Materials, Gallery.
- **Social:** Facebook & Instagram icons linking to profiles (URLs to be configured via env or `siteConfig`).

### Collections

- Grid of collections/categories; each links to listing or detail.

### Materials

- Educational breakdown: PVC benefits, marble-effect vs solid colors, suggested rooms, maintenance (honest, skimmable).

### Gallery

- Masonry or uniform grid—placeholder tiles OK.

### About

- Tone: trustworthy, Macedonia-focused, supplier of quality décor at reachable prices.

### Contact

- **No forms/analytics v1.** Display **directions**: email, phone (placeholders OK), WhatsApp optional, social links. “Contact us” as the minimal policy stance.

---

## 8. Technical stack & deployment

| Item | Choice |
| --- | --- |
| **Framework** | **Next.js** (App Router), **React** |
| **Styling** | CSS Modules, Tailwind, or CSS-in-JS—pick one consistently |
| **Images** | `next/image` with explicit dimensions or fill + sizes for hero/grid |
| **Hosting** | **Vercel** |
| **Forms** | None for now |
| **Analytics** | None for now |

### SEO & performance note

Stakeholder deferred strict SEO/Lighthouse targets for **v1**—still ship **semantic HTML**, **meaningful `<title>`/meta description per page**, and **readable layout** without blocking later SEO work.

---

## 9. Legal & polish

| Item | v1 |
| --- | --- |
| **Privacy / cookie policy** | Not required—**single Contact page** suffices. |
| **Footer** | Copyright © CASA DECOR · Republic of North Macedonia · Social icons |

---

## 10. Social

| Platform | Requirement |
| --- | --- |
| **Facebook** | Header/footer link (URL TBD—use env `NEXT_PUBLIC_*` placeholders). |
| **Instagram** | Same |

---

## 11. Out of scope (later)

- Real product photography pipeline  
- Checkout / cart / Stripe  
- Showroom locator  
- Blog / CMS wiring (unless you add it explicitly)  
- Analytics, contact forms  

---

## 12. Acceptance checklist (minimum “done” for v1)

- [ ] All six areas live: Home, Collections (+ detail), Materials, Gallery, About, Contact  
- [ ] Hero matches brand (cream/black/gold, logo + suggested slogan integration)  
- [ ] Bold motion implemented with reduced-motion fallback  
- [ ] `public/logo.jpg` loads site-wide logo  
- [ ] MKD mentioned where pricing placeholders exist  
- [ ] Macedonia-only service clarified  
- [ ] Facebook + Instagram present (configurable URLs)  
- [ ] Builds and deploys cleanly on **Vercel**  

---

*End of spec.*
