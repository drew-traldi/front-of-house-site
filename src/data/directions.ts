import type { ImageMetadata } from "astro";
import cinematicDining from "../assets/directions/cinematic-dining.jpg";
import counterGriddle from "../assets/directions/counter-griddle.jpg";
import barCocktail from "../assets/directions/bar-cocktail.jpg";
import candlelitTable from "../assets/demo/aurelia-table.jpg";
import cantinaRoom from "../assets/demo/palma-room.jpg";
import cantinaTacos from "../assets/demo/palma-tacos.jpg";
import cantinaMargs from "../assets/demo/palma-margs.jpg";

export type DirectionFormat =
  | "fine-dining"
  | "full-service"
  | "fast-casual"
  | "bar";

export type DirectionPriority =
  | "reservations"
  | "ordering"
  | "events"
  | "private-dining";

export type DirectionMood = "cinematic" | "editorial" | "bold" | "warm";

export interface Direction {
  slug: string;
  label: string;
  eyebrow: string;
  note: string;
  signature: string;
  formats: DirectionFormat[];
  priorities: DirectionPriority[];
  moods: DirectionMood[];
  capabilities: string[];
  suggestedNeeds: string[];
  image: ImageMetadata;
  imageAlt: string;
  swatch: string[];
  href: string;
  actionLabel: string;
  /** Preview routes are live, personalized demos. Brief routes are an intentional tease. */
  mode: "preview" | "brief";
}

export const directionFilters = {
  formats: [
    { value: "fine-dining", label: "Fine dining" },
    { value: "full-service", label: "Full service" },
    { value: "fast-casual", label: "Fast casual" },
    { value: "bar", label: "Bar" },
  ],
  priorities: [
    { value: "reservations", label: "Reservations" },
    { value: "ordering", label: "Ordering" },
    { value: "events", label: "Events" },
    { value: "private-dining", label: "Private dining" },
  ],
  moods: [
    { value: "cinematic", label: "Cinematic" },
    { value: "editorial", label: "Editorial" },
    { value: "bold", label: "Bold" },
    { value: "warm", label: "Warm" },
  ],
} as const;

// The catalog deliberately describes directions, never client work. The production
// patterns behind a direction are generalized into an anonymous starting point.
export const directions: Direction[] = [
  {
    slug: "cinematic-fine-dining",
    label: "Cinematic fine dining",
    eyebrow: "Reservation-led",
    note: "A quiet, filmic front door for tasting menus, celebratory dinners, and a room with a point of view.",
    signature: "Video welcome, a considered menu, and private dining that feels like part of the evening.",
    formats: ["fine-dining", "full-service"],
    priorities: ["reservations", "private-dining"],
    moods: ["cinematic", "editorial"],
    capabilities: ["Reservation path", "Seasonal menu", "Private dining"],
    suggestedNeeds: ["reservations", "private-dining", "seasonal-menu", "photo-video"],
    image: cinematicDining,
    imageAlt: "Dinner and wine set on a warmly lit restaurant table",
    swatch: ["#171310", "#f2ead9", "#d9ab5e"],
    href: "/templates/fine-dining",
    actionLabel: "Try it with your name",
    mode: "preview",
  },
  {
    slug: "order-first-kitchen-bar",
    label: "Order-first kitchen + bar",
    eyebrow: "Orders, drinks, tonight",
    note: "A high-energy home for a counter, cocktail bar, or hybrid spot where the next guest should know exactly what to do.",
    signature: "A large food moment, a live board, and clear paths to order, gather, or come by tonight.",
    formats: ["fast-casual", "bar"],
    priorities: ["ordering", "events"],
    moods: ["bold", "cinematic"],
    capabilities: ["Order destination", "Food + drinks", "Tonight's board"],
    suggestedNeeds: ["ordering", "drinks", "events", "catering"],
    image: counterGriddle,
    imageAlt: "Burger patties cooking on a hot griddle",
    swatch: ["#151a18", "#f4e8d4", "#d44d2f"],
    href: "/templates/fast-casual",
    actionLabel: "Try it with your name",
    mode: "preview",
  },
  {
    slug: "big-table-cantina",
    label: "Big-table cantina",
    eyebrow: "Menus + momentum",
    note: "For generous rooms with a full visual menu, a reason to come in now, and plenty to share around the table.",
    signature: "A food-forward mosaic and a moving moment for happy hour, specials, or a weekly ritual.",
    formats: ["full-service"],
    priorities: ["reservations", "events"],
    moods: ["bold", "warm"],
    capabilities: ["Visual menu", "Specials", "Group dining"],
    suggestedNeeds: ["reservations", "events", "catering", "seasonal-menu"],
    image: cantinaTacos,
    imageAlt: "A colorful plate of tacos prepared for sharing",
    swatch: ["#fdf3e3", "#c3352b", "#e9a13b", "#256d67"],
    href: "/templates/cantina",
    actionLabel: "Try it with your name",
    mode: "preview",
  },
  {
    slug: "corner-bar",
    label: "Corner bar",
    eyebrow: "Tonight changes fast",
    note: "A useful, no-fuss home for a neighborhood bar where taps, specials, and this week's calendar are the reason to return.",
    signature: "A board that stays current, an events rhythm, and the kitchen menu people check on the way over.",
    formats: ["bar"],
    priorities: ["events", "ordering"],
    moods: ["warm", "bold"],
    capabilities: ["Tap or specials board", "Events", "Kitchen menu"],
    suggestedNeeds: ["events", "drinks", "seasonal-menu", "private-dining"],
    image: barCocktail,
    imageAlt: "A bartender preparing a cocktail at a neighborhood bar",
    swatch: ["#141815", "#edefe8", "#efa63e"],
    href: "/templates/neighborhood-bar",
    actionLabel: "Try it with your name",
    mode: "preview",
  },
  {
    slug: "jewel-toned-supper",
    label: "Jewel-toned supper",
    eyebrow: "After-dark dining",
    note: "A rich, composed direction for a chef-led dining room that earns the reservation before the menu is even opened.",
    signature: "A dark room, crisp navigation, and a menu that lets ingredients do the talking.",
    formats: ["fine-dining", "full-service"],
    priorities: ["reservations", "private-dining"],
    moods: ["cinematic", "warm"],
    capabilities: ["Reservations", "Chef story", "Events"],
    suggestedNeeds: ["reservations", "private-dining", "photo-video"],
    image: candlelitTable,
    imageAlt: "A pasta course and red wine at a candlelit restaurant table",
    swatch: ["#1c1d2b", "#b99b47", "#d6c5a8"],
    href: "/templates/brief?directions=jewel-toned-supper",
    actionLabel: "Build from this direction",
    mode: "brief",
  },
  {
    slug: "date-night-italian",
    label: "Date-night Italian",
    eyebrow: "Warm + intimate",
    note: "A romantic, old-world direction for the neighborhood place where wine, pasta, and the room all matter equally.",
    signature: "Editorial pacing, a gallery worth lingering in, and a reservation path that never gets in the way.",
    formats: ["full-service"],
    priorities: ["reservations", "private-dining"],
    moods: ["editorial", "warm"],
    capabilities: ["Wine + dinner", "Gallery", "Reservations"],
    suggestedNeeds: ["reservations", "drinks", "photo-video"],
    image: candlelitTable,
    imageAlt: "A restaurant dinner table set with a pasta course and wine",
    swatch: ["#2d2723", "#c8ad78", "#e9ded0"],
    href: "/templates/brief?directions=date-night-italian",
    actionLabel: "Build from this direction",
    mode: "brief",
  },
  {
    slug: "downtown-table",
    label: "Downtown table",
    eyebrow: "Full-service, all day",
    note: "For a polished city restaurant carrying lunch, dinner, wine, parties, and a calendar that needs room to breathe.",
    signature: "Clear wayfinding for a fuller operation, without losing the sense of a real dining room.",
    formats: ["full-service"],
    priorities: ["reservations", "private-dining", "events"],
    moods: ["editorial", "warm"],
    capabilities: ["Lunch + dinner", "Private events", "Wine list"],
    suggestedNeeds: ["reservations", "private-dining", "events", "drinks"],
    image: cantinaRoom,
    imageAlt: "An inviting restaurant interior prepared for dinner service",
    swatch: ["#292522", "#ece4d6", "#9b613b"],
    href: "/templates/brief?directions=downtown-table",
    actionLabel: "Build from this direction",
    mode: "brief",
  },
  {
    slug: "alpine-supper",
    label: "Alpine supper",
    eyebrow: "Place-driven hospitality",
    note: "A warm, grounded direction for mountain towns, destination restaurants, and places that welcome guests after a day outside.",
    signature: "A calm room, practical visit details, and menus that can shift with the season.",
    formats: ["full-service"],
    priorities: ["reservations", "private-dining"],
    moods: ["warm", "cinematic"],
    capabilities: ["Seasonal menu", "Visit details", "Group dining"],
    suggestedNeeds: ["reservations", "seasonal-menu", "private-dining", "photo-video"],
    image: cinematicDining,
    imageAlt: "Dinner and wine on a wooden table in a warm restaurant",
    swatch: ["#2b3028", "#cfb98d", "#ede3d1"],
    href: "/templates/brief?directions=alpine-supper",
    actionLabel: "Build from this direction",
    mode: "brief",
  },
  {
    slug: "contemporary-cantina",
    label: "Contemporary cantina",
    eyebrow: "Big energy, clear choices",
    note: "A bold direction for a lively dining room with events, catering, dietary details, and a reason to come back next week.",
    signature: "Strong color, useful menu filters, and a dedicated place for groups and special nights.",
    formats: ["full-service"],
    priorities: ["events", "private-dining", "reservations"],
    moods: ["bold", "warm"],
    capabilities: ["Events", "Catering", "Menu details"],
    suggestedNeeds: ["events", "catering", "reservations", "seasonal-menu"],
    image: cantinaMargs,
    imageAlt: "A cocktail served with a fresh citrus garnish",
    swatch: ["#40251d", "#d44d2f", "#ebb14c"],
    href: "/templates/brief?directions=contemporary-cantina",
    actionLabel: "Build from this direction",
    mode: "brief",
  },
  {
    slug: "neighborhood-everyday",
    label: "Neighborhood everyday",
    eyebrow: "More than one location",
    note: "A welcoming, practical direction for an everyday place with menus, gift cards, catering, specials, and more than one front door.",
    signature: "A clear location system and enough flexibility to keep regulars in the loop without making the site feel busy.",
    formats: ["full-service", "fast-casual"],
    priorities: ["ordering", "events"],
    moods: ["warm", "bold"],
    capabilities: ["Locations", "Gift cards", "Catering"],
    suggestedNeeds: ["ordering", "catering", "events", "locations"],
    image: cantinaTacos,
    imageAlt: "A colorful restaurant meal made for sharing around the table",
    swatch: ["#e86136", "#ffe0a3", "#2e6961"],
    href: "/templates/brief?directions=neighborhood-everyday",
    actionLabel: "Build from this direction",
    mode: "brief",
  },
];

export const directionBySlug = (slug: string) =>
  directions.find((direction) => direction.slug === slug);

export const directionLabel = (slug: string) =>
  directionBySlug(slug)?.label ?? "A Front of House direction";
