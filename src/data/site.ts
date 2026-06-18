// ─────────────────────────────────────────────────────────────
// Front of House central site config.
// Everything client-specific lives here. Swap real details in one place.
// ─────────────────────────────────────────────────────────────

export const site = {
  name: "Front of House",
  shortName: "FOH",
  tagline: "Your new front of house.",
  studioType: "Restaurant Web Studio",
  description:
    "The web and brand studio built only for restaurants. We design the brand, capture the photos and video on site, build a custom website you own, and keep it sharp month to month.",
  url: "https://frontofhouse.studio",

  // ── Contact: PLACEHOLDERS. Replace with real details. ──
  contact: {
    email: "hello@frontofhouse.studio",
    phone: "(555) 123-4567",
    phoneHref: "tel:+15551234567",
  },

  // Concierge persona used across the partnership copy.
  concierge: "Sage",
} as const;

// ── HAI: separate company; four FOH co-founders also built it. ──
export const hai = {
  name: "HAI",
  longName: "HAI Solutions",
  url: "https://www.haiconsultingservices.com",
  blurb:
    "Front of House is its own studio. Four of our co-founders also built HAI — the web and AI company behind Burger Lab and Killa. That same talent is here, building restaurant sites owners actually own.",
  footerCredit:
    "Co-founded with talent from HAI Solutions · Custom-built. Owner-owned.",
} as const;

// ── Portfolio video from HAI client builds (replaces generic stock). ──
export const portfolioVideo = {
  burgerLab: "/videos/burger-lab.mp4",
  killa: "/videos/killa-nikkei.mp4",
} as const;

// ── Case studies: real restaurant builds by the Front of House team. ──
export const caseStudies = [
  {
    name: "BURGER.LAB",
    type: "Gourmet burgers & cocktail lab",
    location: "Salt Lake City, UT",
    tagline: "We don't cook, we experiment.",
    blurb:
      "A science-lab burger and craft-cocktail concept. We built a video-led site with online ordering, a waitlist and email-capture system, and AI-search articles to get found across downtown SLC.",
    points: [
      "Video hero & lab aesthetic",
      "Online ordering + waitlist",
      "Email capture & SEO articles",
    ],
    video: portfolioVideo.burgerLab,
    url: "https://www.burgerlabbar.com",
  },
  {
    name: "Killa",
    type: "Peruvian-Japanese Nikkei",
    location: "Salt Lake City, UT",
    tagline: "Two worlds, one moon.",
    blurb:
      "An upscale Nikkei fusion restaurant. We built a cinematic, reservation-ready site with online booking, newsletter signup, and an admin dashboard, refined to match its gold-on-black identity.",
    points: [
      "Cinematic video hero",
      "Online reservations + confirmations",
      "Newsletter & admin dashboard",
    ],
    video: portfolioVideo.killa,
    url: "https://www.killanikkei.com",
  },
] as const;

export const nav = [
  { label: "Services", href: "/services" },
  { label: "Pricing", href: "/pricing" },
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
] as const;

// ── What we do: the four offerings (core first) ──
export const offerings = [
  {
    name: "The Website",
    kind: "Core",
    blurb:
      "A real, custom website the owner fully owns. Fast, modern, made to convert covers.",
  },
  {
    name: "Care & Hosting",
    kind: "Core",
    blurb:
      "Hosting, maintenance, and tiered support. Edit it yourself or text Sage. Either way, it gets done.",
  },
  {
    name: "Brand & Identity",
    kind: "Optional",
    blurb:
      "Identity, menu, and visual system for restaurants that need a look, not just a site.",
  },
  {
    name: "Photo & Video",
    kind: "Optional",
    blurb:
      "On-site photo and video of the space, the plates, and the people. Shot, edited, delivered.",
  },
] as const;

// ── Why Front of House ──
export const reasons = [
  {
    title: "You own your website",
    body: "Real custom code, not a locked drag-and-drop template you rent forever.",
  },
  {
    title: "Edit it yourself, or just text us",
    body: "Make your own updates, or send Sage a message. Changes go live fast.",
  },
  {
    title: "Built for AI search",
    body: "We optimize so customers find you through AI answers, not Google alone.",
  },
  {
    title: "A real partner",
    body: "Direct access to our team every month, with hosting and maintenance always included.",
  },
] as const;

// ── How it works ──
export const steps = [
  {
    n: "1",
    title: "Pick your tier",
    body: "Choose the level of access and support that fits your business.",
  },
  {
    n: "2",
    title: "We build your site",
    body: "We scope, design, and launch a custom website you own.",
  },
  {
    n: "3",
    title: "Your partnership begins",
    body: "You go live, and we keep it sharp month to month.",
  },
] as const;

// ── One-time build ──
export const build = {
  from: "$2,000",
  blurb:
    "Custom design, build, and launch of a website you fully own. Priced to scope.",
};

// ── Monthly partnership tiers (public, client-facing) ──
export const tiers = [
  {
    name: "Partner Basic",
    short: "Basic",
    price: "$20",
    period: "/ month",
    pill: "Live & Current",
    featured: false,
    goodFor: "A polished site that stays live and current with a light touch.",
    features: [
      "Reliable hosting and maintenance, always included",
      "Your admin portal for simple text updates, anytime",
      "One website change a month, handled by our team",
    ],
  },
  {
    name: "Partner Premium",
    short: "Premium",
    price: "$45",
    period: "/ month",
    pill: "Most Popular",
    featured: true,
    goodFor: "For owners who want to actively shape their site and get found online.",
    features: [
      "Everything in Basic",
      "Full portal to request real changes to your custom site",
      "AI-powered website enhancement tools",
      "$25 / month of AI usage included",
      "Direct line to our team (meet Sage)",
      "One AI-search article each month",
      "30-minute monthly strategy session",
    ],
  },
  {
    name: "Partner Platinum",
    short: "Platinum",
    price: "$75",
    period: "/ month",
    pill: "Top Tier",
    featured: false,
    goodFor: "For owners who want a true marketing partner working every month.",
    features: [
      "Everything in Premium",
      "Text requests straight to Sage, no portal needed",
      "Two AI-search articles each month",
      "60-minute monthly strategy session",
      "Email capture, analytics, competitor insights",
      "Automatic photo placement (coming soon)",
    ],
  },
] as const;

// ── Multi-location discounts ──
export const locationDiscounts = [
  { range: "2 to 3 locations", off: "10% off monthly" },
  { range: "4 to 5 locations", off: "15% off monthly" },
  { range: "6 or more locations", off: "20% off monthly" },
] as const;
