const q72 = "?auto=format&fit=crop&w=1200&q=72";

export type CollectionImage = {
  src: string;
  alt: string;
};

export type ProductDetail = {
  slug: string;
  title: string;
  teaser: string;
  body: string;
  highlights: readonly string[];
  image: CollectionImage;
  /** Demonstrates MKD label where future retail figures will appear — spec §2. */
  indicativeFromMKD?: number;
};

export type CollectionDetail = {
  slug: string;
  title: string;
  summary: string;
  story: string;
  cover: CollectionImage;
  /** Alternate texture revealed on hover */
  coverDetail?: CollectionImage;
  products: readonly ProductDetail[];
};

export const catalogue: readonly CollectionDetail[] = [
  {
    slug: "marble-look-decor",
    title: "Marble-look décor",
    summary:
      "PVC panels that emulate natural veining — depth, polish, and day-to-night consistency without stone maintenance.",
    story:
      "Our marble-effect range is layered for nuanced highlights: soft gloss where light travels, subdued matt channels where shadow should rest. Panels align on a repeatable grid so installers waste less time aligning book-matched fantasies.",
    cover: {
      src: `https://images.unsplash.com/photo-1586023492125-27b2c045efd7${q72}`,
      alt: "Close-up marble-look surface with tonal veining",
    },
    coverDetail: {
      src: `https://images.unsplash.com/photo-1574359410119-3a38e817c104${q72}`,
      alt: "Rhythmic wall grid pattern photographed at an angle",
    },
    products: [
      {
        slug: "alba-veined-panels",
        title: "Alba veined panels",
        teaser: "Pearl-forward base with restrained graphite ribbons.",
        body: "Sized for seamless vertical stacking in living rooms or hospitality vignettes where you want luminous walls without porous stone upkeep.",
        highlights: [
          "Joint-friendly repeat for faster installs",
          "Low-VOC adhesives paired in our install briefs",
        ],
        image: {
          src: `https://images.unsplash.com/photo-1598300042247-d088f8be3cae${q72}`,
          alt: "Pearl-tone marble-effect panel sample leaned against cabinetry",
        },
        indicativeFromMKD: 12_900,
      },
      {
        slug: "noir-depth-slats",
        title: "Noir depth slats",
        teaser: "Dramatic chocolate base with slender metallic threads.",
        body: "Balances moody offices and boutique retail backdrops — pair with directional lighting so the shimmer reads intentional, never glittery.",
        highlights: ["Matte/low-sheen face option available", "Fire-class notes supplied per batch"],
        image: {
          src: `https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b${q72}`,
          alt: "Dark marble-inspired wall cladding behind seating",
        },
        indicativeFromMKD: 14_250,
      },
      {
        slug: "mist-coast-lines",
        title: "Mist coast lines",
        teaser: "Cool grey wash with drifting ivory veins.",
        body: "Ideal for corridors and bedrooms that borrow light from adjoining spaces — veins stay subtle enough for north-facing Macedonian winters.",
        highlights: ["Finger-print resistant face", "Colour batch tracking for phased projects"],
        image: {
          src: `https://images.unsplash.com/photo-1615876234889-df9faa6e5c10${q72}`,
          alt: "Light grey faux marble wall spanning a headboard wall",
        },
        indicativeFromMKD: 11_760,
      },
    ],
  },
  {
    slug: "precision-wall-panels",
    title: "Precision wall panels",
    summary:
      "Linear and geometric PVC systems engineered for rhythmic walls in residential and light commercial footprints.",
    story:
      "These collections favour crisp reveals: micro-bevel transitions, repeatable modules, and factory-controlled tolerances so your contractor spends time finishing, not shimming drywall surprises.",
    cover: {
      src: `https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b${q72}`,
      alt: "Architectural wall with vertical grooves and soft lighting",
    },
    coverDetail: {
      src: `https://images.unsplash.com/photo-1600607687939-ce8a6c25118c${q72}`,
      alt: "Lounge vignette emphasizing soft wall panel rhythm",
    },
    products: [
      {
        slug: "axis-fluted-system",
        title: "Axis fluted system",
        teaser: "Tall grooves that stretch ceiling height visually.",
        body: "Adds vertical rhythm to tight Skopje flats or studio offices — install instructions include relief cuts for sockets and vents.",
        highlights: ["Panels ship in boxed lengths with matched trims", "Can be stained-washed on site for bespoke tonality"],
        image: {
          src: `https://images.unsplash.com/photo-1600607687939-ce8a6c25118c${q72}`,
          alt: "Fluted timber-like wall cladding behind a sectional sofa",
        },
        indicativeFromMKD: 9_440,
      },
      {
        slug: "metro-step-grid",
        title: "Metro step grid",
        teaser: "Layered rectangles with understated shadow casting.",
        body: "Brings quiet structure to corridors and breakout spaces without overwhelming art or signage.",
        highlights: ["Optional acoustic backing layer", "Panel rotation diagram included"],
        image: {
          src: `https://images.unsplash.com/photo-1574359410119-3a38e817c104${q72}`,
          alt: "Minimal grid wall décor in beige palette",
        },
        indicativeFromMKD: 8_905,
      },
      {
        slug: "ribbon-rail-accent",
        title: "Ribbon rail accent",
        teaser: "Slim ribbons that skim across uninterrupted fields.",
        body: "Acts like functional wainscotting for dining rooms needing chair protection while staying graphic.",
        highlights: ["Rails align with IKEA-adjacent module heights upon request", "Moisture-tolerant formulation"],
        image: {
          src: `https://images.unsplash.com/photo-1501183638710-84113be63d94${q72}`,
          alt: "Dining nook with accented wall cladding",
        },
        indicativeFromMKD: 7_995,
      },
    ],
  },
  {
    slug: "tonal-finishes-suite",
    title: "Tonal finishes suite",
    summary:
      "Solid and gently textured PVC faces for calm envelopes where marble drama is secondary to colour discipline.",
    story:
      "When architecture already carries pattern — terrazzo flooring, ornate lighting — tonal suites let furnishings speak. Matte-forward chemistry keeps grazing light forgiving on camera.",
    cover: {
      src: `https://images.unsplash.com/photo-1519710164239-da123dc03ef4${q72}`,
      alt: "Warm neutral interior emphasizing soft wall tones",
    },
    coverDetail: {
      src: `https://images.unsplash.com/photo-1600566753229-7d8d6c9657d4${q72}`,
      alt: "Cream pressed-grain wall surface under stair lighting",
    },
    products: [
      {
        slug: "sandstone-softwave",
        title: "Sandstone softwave",
        teaser: "Pressed grain resembling limestone cream.",
        body: "Balances oak millwork or brass hardware without yellowing aggressively under LEDs.",
        highlights: ["Class-leading colour stabilisers on batch certs", "Field touch-up kit bundled"],
        image: {
          src: `https://images.unsplash.com/photo-1600566753229-7d8d6c9657d4${q72}`,
          alt: "Cream sandstone-like wall cladding near stairwell",
        },
        indicativeFromMKD: 6_875,
      },
      {
        slug: "lichen-mist-flat",
        title: "Lichen mist (flat)",
        teaser: "Dewy sage with negligible texture.",
        body: "Healthcare-friendly aesthetic for clinics wanting hospitality warmth — sanitiser resilient topcoat optional.",
        highlights: ["Scrubbability tested to common disinfectants"],
        image: {
          src: `https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e${q72}`,
          alt: "Muted green wall spanning a serene interior",
        },
        indicativeFromMKD: 6_545,
      },
      {
        slug: "basalt-micrograin",
        title: "Basalt micrograin",
        teaser: "Deep charcoal fleck hiding finger marks.",
        body: "Anchors theatres, lounges, or statement entry walls paired with metallics.",
        highlights: ["Low glare for projection-friendly rooms"],
        image: {
          src: `https://images.unsplash.com/photo-1574643156929-51fa098b0394${q72}`,
          alt: "Dark textured wall cladding near indirect lighting",
        },
        indicativeFromMKD: 7_415,
      },
    ],
  },
] as const;

export type CollectionSlug = (typeof catalogue)[number]["slug"];

export function listCollections(): readonly CollectionDetail[] {
  return catalogue;
}

export function getCollection(slug: string): CollectionDetail | undefined {
  return catalogue.find((entry) => entry.slug === slug);
}

export function getProductDetail(collectionSlug: string, productSlug: string) {
  const collection = getCollection(collectionSlug);
  if (!collection) {
    return undefined;
  }

  const product = collection.products.find((item) => item.slug === productSlug);
  if (!product) {
    return undefined;
  }

  return { collection, product } as const;
}

export function getCollectionSlugParams() {
  return catalogue.map((entry) => ({ slug: entry.slug }));
}

export function getCollectionProductSlugParams() {
  return catalogue.flatMap((collection) =>
    collection.products.map((product) => ({
      slug: collection.slug,
      productSlug: product.slug,
    })),
  );
}
