import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";

/** Soft editorial serif — display / hero (variable cut supports heavy headlines cleanly) */
export const fontDisplay = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
});

/** Geometric sans — UI / nav / body */
export const fontBody = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["500", "600", "700", "800"],
});