// ─────────────────────────────────────────────────────────────
// Spec template registry.
// Each entry drives one interactive demo under /templates/*:
// the gallery card, the intake overlay, the FOH frame bar, and
// the personalization defaults (the no-answers state is a fully
// written fictional restaurant, never lorem).
// Design contract: TEMPLATES-DESIGN.md at the project root.
// ─────────────────────────────────────────────────────────────

export interface VibeDef {
  /** value stored in the URL (?vibe=) and set as data-vibe on the page */
  key: string;
  label: string;
  /** one-line hint under the label on the vibe cards */
  hint: string;
}

export interface TemplateDef {
  slug: string;
  href: string;
  /** category label, e.g. "Fine Dining" */
  label: string;
  /** what this template is for, shown on gallery + work cards */
  note: string;
  /** fictional default restaurant (the empty state) */
  demoName: string;
  demoCity: string;
  demoTagline: string;
  vibes: [VibeDef, VibeDef];
  /** 3–4 palette chips for the gallery card preview */
  swatch: string[];
}

export const templates: TemplateDef[] = [
  {
    slug: "fine-dining",
    href: "/templates/fine-dining",
    label: "Fine Dining",
    note: "Tasting-menu identity, reservation-led, editorial photography.",
    demoName: "Aurelia",
    demoCity: "Park City, Utah",
    demoTagline: "A seven course conversation.",
    vibes: [
      { key: "candlelit", label: "Candlelit", hint: "Dark, warm, after dusk" },
      { key: "daylight", label: "Daylight", hint: "Ivory, airy, lunch light" },
    ],
    swatch: ["#171310", "#f2ead9", "#d9ab5e"],
  },
  {
    slug: "fast-casual",
    href: "/templates/fast-casual",
    label: "Fast Casual",
    note: "Order-first, fast, menu and locations front and center.",
    demoName: "Stacked",
    demoCity: "Midtown Atlanta",
    demoTagline: "Good food, fast, no fuss.",
    vibes: [
      { key: "bold", label: "Bold", hint: "Cream, tomato red, loud type" },
      { key: "fresh", label: "Fresh", hint: "Pale green, clean, light" },
    ],
    swatch: ["#fff8ec", "#c93a29", "#ffc93c", "#1a1613"],
  },
  {
    slug: "cantina",
    href: "/templates/cantina",
    label: "Mexican / Cantina",
    note: "Bold, warm, margarita-hour energy with a big visual menu.",
    demoName: "La Palma",
    demoCity: "East Atlanta Village",
    demoTagline: "Tacos, mezcal, y buena gente.",
    vibes: [
      { key: "fiesta", label: "Fiesta", hint: "Sand, chile red, marigold" },
      { key: "cocina", label: "Cocina", hint: "Deep clay, warm dusk" },
    ],
    swatch: ["#fdf3e3", "#c3352b", "#e9a13b", "#256d67"],
  },
  {
    slug: "neighborhood-bar",
    href: "/templates/neighborhood-bar",
    label: "Neighborhood Bar",
    note: "Events, specials, and a site that changes as fast as the chalkboard.",
    demoName: "The Grackle",
    demoCity: "Sugar House, Salt Lake City",
    demoTagline: "Your corner since whenever you found us.",
    vibes: [
      { key: "dive", label: "Dive", hint: "Near-black, chalk, amber" },
      { key: "pub", label: "Corner pub", hint: "Warm cream, wood, oxblood" },
    ],
    swatch: ["#141815", "#edefe8", "#efa63e"],
  },
];

export function templateBySlug(slug: string): TemplateDef {
  const t = templates.find((t) => t.slug === slug);
  if (!t) throw new Error(`Unknown template slug: ${slug}`);
  return t;
}
