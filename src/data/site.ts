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
    "The web and brand studio built only for restaurants. We design the brand, capture the photos and video on site, and build a custom website you own outright — then host and keep it sharp for a flat yearly fee. Pay once, own it for good.",
  url: "https://frontofhouse.studio",

  // ── Contact: PLACEHOLDERS. Replace with real details. ──
  contact: {
    email: "hello@frontofhouse.studio",
    phone: "(555) 123-4567",
    phoneHref: "tel:+15551234567",
  },

  // ── The AI that runs each client's front of house. ──
  // Maître drafts changes, answers questions, and books time with the team;
  // we verify every change before it goes live. Runs on our own local models.
  assistant: {
    name: "Maître",
    role: "your front-of-house AI",
    blurb:
      "Maître is your front-of-house AI. Ask it to change a price, swap a photo, update your hours, answer a question, or book time with our team. It drafts the change, we make sure it's right, and it goes live.",
  },

  // ── The promise we lead with: own it, don't rent it. ──
  rival: {
    // The category we position against (subscription site rentals).
    name: "Owner.com & the rest",
    monthly: "$200–$500 / mo",
    yearly: "$2,400–$6,000 / yr",
  },
} as const;

// ── HAI: the team behind Killa & Burger Lab is Front of House. ──
export const hai = {
  name: "HAI",
  longName: "HAI Solutions",
  url: "https://www.haiconsultingservices.com",
  blurb:
    "The team that designed and built Killa and Burger Lab is Front of House. Those builds — and the owners behind them — came with us. Same people, same standard, now building restaurant sites owners keep for good.",
  footerCredit:
    "Built by the team behind Killa & Burger Lab · Custom-built. Owner-owned.",
} as const;

// ── Portfolio video from the team's real restaurant builds. ──
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
      "Email capture & AI-search articles",
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

// ── Spec showcase: concept builds by restaurant category (in production). ──
export const specConcepts = [
  { name: "Fine Dining", note: "Tasting-menu identity, reservation-led, editorial photography." },
  { name: "Fast Casual", note: "Order-first, fast, menu and locations front and center." },
  { name: "Mexican / Cantina", note: "Bold, warm, margarita-hour energy with a big visual menu." },
  { name: "Neighborhood Bar", note: "Events, specials, and a site that changes as fast as the chalkboard." },
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
      "A real, custom website you own outright — code and all. Fast, modern, made to convert covers.",
  },
  {
    name: "Care & Hosting",
    kind: "Core",
    blurb:
      "Hosting, maintenance, and a flat yearly fee. Edit it yourself or ask Maître. Either way, it gets done.",
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
    body: "Real custom code you keep for good. Leave whenever you want and we hand you the whole site — no hostage situation.",
  },
  {
    title: "Pay once, not every month",
    body: "No $200–$500 monthly rental. Buy your site, then a flat yearly fee keeps it hosted and current.",
  },
  {
    title: "Edit it yourself, or just ask Maître",
    body: "Change a price, swap a photo, ask a question. Maître drafts it, we check it, it goes live.",
  },
  {
    title: "Built for AI search",
    body: "We optimize so customers find you through AI answers (AEO), not Google alone.",
  },
] as const;

// ── How it works ──
export const steps = [
  {
    n: "1",
    title: "Scope your build",
    body: "We look at your menu, your photos, and what you need, then price it to your restaurant.",
  },
  {
    n: "2",
    title: "We design & build it",
    body: "A custom website you own outright. We can shoot it and brand it, too.",
  },
  {
    n: "3",
    title: "You own it. We keep it sharp.",
    body: "Go live, then a flat yearly Care fee keeps it hosted, current, and yours.",
  },
] as const;

// ── One-time build (you own the code) ──
export const build = {
  from: "$2,000",
  blurb:
    "Custom design, build, and launch of a website you own outright — code and all. Priced to the size of your restaurant.",
};

// What shapes the build price (scope drivers, not a rigid menu).
export const buildScope = [
  {
    label: "Menu & pages",
    note: "How much there is to build — menu size, number of pages, online ordering or reservations.",
  },
  {
    label: "Photo & video",
    note: "Whether we shoot on site, or build from photos you already have.",
  },
  {
    label: "Brand & design",
    note: "A full identity — logo, type, menu design — or a site on your existing brand.",
  },
] as const;

// Illustrative bands. Most builds land in one of these; bigger restaurants run higher.
export const buildBands = [
  {
    name: "The Essentials",
    price: "$2,000–$3,000",
    for: "A focused single-location site: your menu, your story, your photos — built fast and built to be found.",
  },
  {
    name: "The Full Build",
    price: "$3,000–$5,000",
    for: "A bigger menu and more to show. We help with content and light brand work, and shoot if you need it.",
  },
  {
    name: "The Works",
    price: "$5,000+",
    for: "On-site photo and video, a full brand and menu identity, multiple locations — the whole front of house.",
  },
] as const;

// ── Annual Care plans (the recurring layer — billed once a year) ──
export const carePlans = [
  {
    name: "Care",
    short: "Care",
    price: "$450",
    period: "/ year",
    pill: "Own It, Stay Sharp",
    featured: true,
    goodFor:
      "Everything it takes to keep your site live, current, and yours — for about what the rental crowd charges in a single month.",
    features: [
      "Reliable hosting, security, and backups",
      "Maître, your front-of-house AI, for edits and questions",
      "Real changes handled by our team when you need them",
      "AEO foundation so AI search can find and cite you",
      "Your exit kit, always: leave anytime with your full code",
    ],
  },
  {
    name: "Care+",
    short: "Care+",
    price: "$900",
    period: "/ year",
    pill: "Marketing Partner",
    featured: false,
    goodFor:
      "For owners who want us working on getting found and filling tables every month, not just keeping the lights on.",
    features: [
      "Everything in Care",
      "Ongoing AI-search content (answer-engine articles)",
      "Analytics, email capture, and competitor insights",
      "Seasonal refreshes and priority changes",
      "Scheduled strategy time with our team",
    ],
  },
] as const;

// ── Own-it vs. rent-it comparison (the pitch, in a table) ──
export const comparison = {
  rivalLabel: "Subscription rental",
  rivalSub: "Owner.com & the rest",
  fohLabel: "Front of House",
  fohSub: "Buy it, own it",
  rows: [
    { label: "Up front", rival: "$0–$500 setup", foh: "From $2,000 — you own the code" },
    { label: "Every month", rival: "$200–$500", foh: "$0" },
    { label: "Every year", rival: "$2,400–$6,000", foh: "$450 (Care)" },
    { label: "3-year total*", rival: "$7,200–$18,000", foh: "$3,350–$5,350" },
    { label: "Who owns it", rival: "They do — you rent", foh: "You do — code and all" },
    { label: "If you leave", rival: "You lose the site", foh: "You keep your full code" },
  ],
  footnote:
    "*Illustrative: a typical $2,000–$4,000 build plus $450/yr Care over three years, vs. a $200–$500/mo rental. Your build is priced to scope.",
} as const;

// ── Multi-location discounts (applied to annual Care; build stays full per site) ──
export const locationDiscounts = [
  { range: "2 to 3 locations", off: "10% off care" },
  { range: "4 to 5 locations", off: "15% off care" },
  { range: "6 or more locations", off: "20% off care" },
] as const;
