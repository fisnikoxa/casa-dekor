export type GalleryPlaceholder = {
  id: string;
  src: string;
  alt: string;
};

/** Curated royalty-free placeholders with consistent crop params for sizing. */

const q70 = "?auto=format&fit=crop&w=1200&q=70";

export const galleryPlaceholders: readonly GalleryPlaceholder[] = [
  {
    id: "g1",
    src: `https://images.unsplash.com/photo-1600607687939-ce8a6c25118c${q70}`,
    alt: "Wall panels in a softly lit lounge area",
  },
  {
    id: "g2",
    src: `https://images.unsplash.com/photo-1586023492125-27b2c045efd7${q70}`,
    alt: "Close-up marble-look decorative surface",
  },
  {
    id: "g3",
    src: `https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e${q70}`,
    alt: "Neutral interior vignette highlighting wall rhythm",
  },
  {
    id: "g4",
    src: `https://images.unsplash.com/photo-1598300042247-d088f8be3cae${q70}`,
    alt: "Vertical cladding sample with gentle gloss",
  },
  {
    id: "g5",
    src: `https://images.unsplash.com/photo-1540932234776-edf956269138${q70}`,
    alt: "Minimal bedroom with tonal wall décor",
  },
  {
    id: "g6",
    src: `https://images.unsplash.com/photo-1574359410119-3a38e817c104${q70}`,
    alt: "Tile-like pattern across a hallway wall",
  },
  {
    id: "g7",
    src: `https://images.unsplash.com/photo-1618221195710-cc6eaf8d6d93${q70}`,
    alt: "Contemporary shelving against panelled walls",
  },
  {
    id: "g8",
    src: `https://images.unsplash.com/photo-1519710164239-da123dc03ef4${q70}`,
    alt: "Living room ambience with restrained palette",
  },
  {
    id: "g9",
    src: `https://images.unsplash.com/photo-1574643156929-51fa098b0394${q70}`,
    alt: "Detail of soft shadow across wall texture",
  },
] as const;
