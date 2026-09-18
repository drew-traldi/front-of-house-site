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
    "The web and brand studio built only for restaurants. We design the brand, capture the photos and video on site, and build a custom website you own outright, then host and keep it sharp for a flat yearly fee. Pay once, own it for good.",
  url: "https://fohrestaurants.com",
  foundingYear: 2026,
  areaServed: [
    "Park City, Utah",
    "Salt Lake City, Utah",
    "Metro Atlanta, Georgia",
  ],
  knowsAbout: [
    "Restaurant website design",
    "Restaurant branding",
    "Restaurant photography and videography",
    "Answer engine optimization (AEO)",
    "Generative engine optimization (GEO)",
    "AI search optimization for restaurants",
    "Restaurant menu design",
    "Restaurant digital marketing",
  ],
  sameAs: [] as string[],

  // ── Primary contact ──
  contact: {
    name: "Drew Traldi",
    email: "hello@fohrestaurants.com",
    phone: "(770) 364-2664",
    phoneHref: "tel:+17703642664",
  },

  // ── The AI that runs each client's front of house. ──
  // The Host drafts changes, answers questions, and books time with the team;
  // we verify every change before it goes live. Runs on our own local models.
  assistant: {
    name: "the Host",
    role: "your front-of-house AI",
    blurb:
      "The Host is your front-of-house AI. Ask it to change a price, swap a photo, update your hours, answer a question, or book time with our team. It drafts the change, we make sure it's right, and it goes live.",
  },

} as const;

// ── HAI: the team behind Killa & Burger Lab is Front of House. ──
export const hai = {
  name: "HAI",
  longName: "HAI Solutions",
  url: "https://www.haiconsultingservices.com",
  blurb:
    "The team that designed and built Killa and Burger Lab is Front of House. Those builds, and the owners behind them, came with us. Same people, same standard, now building restaurant sites owners keep for good.",
  footerCredit:
    "Built by the team behind Killa & Burger Lab · Custom-built. Owner-owned.",
} as const;

// ── Portfolio video from the team's real restaurant builds. ──
// Each has an optimized MP4 + WebM source and a poster frame (same basename).
export const portfolioVideo = {
  burgerLab: {
    mp4: "/videos/burger-lab.mp4",
    webm: "/videos/burger-lab.webm",
    poster: "/videos/burger-lab.jpg",
  },
  killa: {
    mp4: "/videos/killa-nikkei.mp4",
    webm: "/videos/killa-nikkei.webm",
    poster: "/videos/killa-nikkei.jpg",
  },
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
    alt: "Burger Lab: gourmet burgers and cocktail lab in Salt Lake City",
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
    alt: "Killa: Peruvian-Japanese Nikkei restaurant in Salt Lake City",
  },
] as const;

// ── Spec showcase: live interactive demos under /templates. ──
// Full registry (vibes, demo identities): src/data/templates.ts
export const specConcepts = [
  { name: "Fine Dining", note: "Tasting-menu identity, reservation-led, editorial photography.", href: "/templates/fine-dining" },
  { name: "Fast Casual", note: "Order-first, fast, menu and locations front and center.", href: "/templates/fast-casual" },
  { name: "Mexican / Cantina", note: "Bold, warm, margarita-hour energy with a big visual menu.", href: "/templates/cantina" },
  { name: "Neighborhood Bar", note: "Events, specials, and a site that changes as fast as the chalkboard.", href: "/templates/neighborhood-bar" },
] as const;

export const nav = [
  { label: "Websites", href: "/websites-for-restaurants" },
  { label: "Services", href: "/services" },
  { label: "Pricing", href: "/pricing" },
  { label: "Templates", href: "/templates" },
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
] as const;

// ── What we do: the four offerings (core first) ──
export const offerings = [
  {
    name: "The Website",
    kind: "Core",
    blurb:
      "A real, custom website you own outright, code and all. Fast, modern, made to convert covers.",
  },
  {
    name: "Care & Hosting",
    kind: "Core",
    blurb:
      "Hosting, maintenance, and a flat yearly fee. Edit it yourself or ask the Host. Either way, it gets done.",
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
    body: "Real custom code you keep for good. Leave whenever you want and we hand you the whole site, no hostage situation.",
  },
  {
    title: "Pay once, not every month",
    body: "Buy your custom site once, then a flat yearly Care fee keeps it hosted and current.",
  },
  {
    title: "Edit it yourself, or just ask the Host",
    body: "Change a price, swap a photo, ask a question. The Host drafts it, we check it, it goes live.",
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
    "Custom design, build, and launch of a website you own outright, code and all. Priced to the size of your restaurant.",
};

// What shapes the build price (scope drivers, not a rigid menu).
export const buildScope = [
  {
    label: "Menu & pages",
    note: "How much there is to build: menu size, number of pages, online ordering or reservations.",
  },
  {
    label: "Photo & video",
    note: "Whether we shoot on site, or build from photos you already have.",
  },
  {
    label: "Brand & design",
    note: "A full identity (logo, type, menu design), or a site on your existing brand.",
  },
] as const;

// Illustrative bands. Most builds land in one of these; bigger restaurants run higher.
export const buildBands = [
  {
    name: "The Essentials",
    price: "$2,000–$3,000",
    for: "A focused single-location site: your menu, your story, your photos, built fast and built to be found.",
  },
  {
    name: "The Full Build",
    price: "$3,000–$5,000",
    for: "A bigger menu and more to show. We help with content and light brand work, and shoot if you need it.",
  },
  {
    name: "The Works",
    price: "$5,000+",
    for: "On-site photo and video, a full brand and menu identity, multiple locations: the whole front of house.",
  },
] as const;

// ── Annual Care plans (the recurring layer, billed once a year) ──
export const carePlans = [
  {
    name: "Care",
    short: "Care",
    price: "$450",
    period: "/ year",
    pill: "Own It, Stay Sharp",
    featured: true,
    goodFor:
      "Hosting, maintenance, and support to keep your site live, current, and yours, with a flat yearly Care fee.",
    features: [
      "Reliable hosting, security, and backups",
      "The Host, your front-of-house AI, for edits and questions",
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
  rivalLabel: "Illustrative subscription",
  rivalSub: "Example budget, not a vendor quote",
  fohLabel: "Front of House",
  fohSub: "Buy it, own it",
  rows: [
    { label: "Up front", rival: "Not included in example", foh: "From $2,000, you own the code" },
    { label: "Every month", rival: "$200–$500", foh: "$0" },
    { label: "Every year", rival: "$2,400–$6,000", foh: "$450 (Care)" },
    { label: "3-year total*", rival: "$7,200–$18,000", foh: "$3,350–$5,350" },
    { label: "Who owns it", rival: "Check the contract", foh: "You do, code and all" },
    { label: "If you leave", rival: "Check export rights", foh: "You keep your full code" },
  ],
  footnote:
    "*Illustration: a $2,000–$4,000 build plus three annual $450 Care payments, compared with 36 monthly payments of $200–$500. These are example budgets, not current competitor quotes. Setup, domain, third-party, processing, and out-of-scope charges are excluded. Confirm comparable services before choosing.",
} as const;

// ── The Host: the on-site AI concierge (renamed from Maître, 2026-09-18) ──
// The chat endpoint is set at build time via PUBLIC_MAITRE_ENDPOINT (ContRelate
// local_server `/api/v1/maitre/chat`, via its Cloudflare tunnel). When unset,
// the widget still renders and falls back gracefully to the contact page.
export const maitre = {
  name: "The Host", // headings and sentence starts
  nameInline: "the Host", // mid-sentence: "Ask the Host"
  title: "Front-of-house AI",
  // Optional avatar image in /public (e.g. "/maitre-avatar.png"). Empty = built-in emblem.
  avatar: "",
  greeting:
    "Hi, I'm the Host, Front of House's AI. Ask me anything about Front of House, or tell me what you'd like to see and I'll take you there.",
  suggestions: [
    "What does a website cost?",
    "Do I own my site?",
    "Show me your work",
    "How does it work?",
  ],
} as const;

// ── Analytics: Umami, self-hosted on the FOH server ──
// umamiWebsiteId comes from the Umami dashboard (Settings, Websites). Empty =
// no tracking script is rendered. See Infrastructure/ANALYTICS.md.
export const analytics = {
  umamiScript: "https://analytics.fohrestaurants.com/insights.js",
  umamiWebsiteId: "",
  domains: "fohrestaurants.com,www.fohrestaurants.com",
} as const;

// ── Multi-location discounts (applied to annual Care; build stays full per site) ──
export const locationDiscounts = [
  { range: "2 to 3 locations", off: "10% off care" },
  { range: "4 to 5 locations", off: "15% off care" },
  { range: "6 or more locations", off: "20% off care" },
] as const;

// ── GEO: comprehensive FAQ set for structured data + on-page use ──
export const faq = {
  pricing: [
    {
      q: "How much does a restaurant website from Front of House cost?",
      a: `The website is a one-time custom build from ${build.from}, priced to the size of your restaurant, and you own the code outright. After launch there is no monthly fee: a flat ${carePlans[0].price}/year Care plan covers hosting, maintenance, and support.`,
    },
    {
      q: "Is there a monthly subscription for a Front of House website?",
      a: "Front of House charges a one-time build fee plus a flat yearly Care fee from $450. There is no monthly FOH website subscription. Any domain, third-party tools, or additional work are scoped separately.",
    },
    {
      q: "Do I own my restaurant website?",
      a: "Yes. Front of House builds a real, custom website that you own outright. If you ever leave, we hand you your full code. Every Care plan includes an exit kit so you can take your site with you.",
    },
    {
      q: "What is the difference between Care and Care+ plans?",
      a: "Care ($450/year) covers hosting, security, backups, the Host AI assistant, team-handled changes, and an AEO foundation. Care+ ($900/year) adds ongoing AI-search content and articles, analytics and email capture, competitor insights, seasonal refreshes, and scheduled strategy time with our team.",
    },
    {
      q: "How much does a restaurant website subscription cost compared to Front of House?",
      a: "For illustration, 36 monthly payments of $200 to $500 total $7,200 to $18,000. A $2,000 to $4,000 FOH build plus three annual $450 Care payments totals $3,350 to $5,350. These examples exclude setup for the subscription, domain registration, third-party tools, payment fees, and out-of-scope work. Compare the same services and current provider quotes.",
    },
  ],
  services: [
    {
      q: "What services does Front of House offer for restaurants?",
      a: "Front of House offers four services: (1) The Website Build, a custom site you own outright; (2) Care & Hosting, flat yearly hosting and maintenance; (3) Brand & Design, full identity and menu design; and (4) Capture, on-site photo and video of the space, food, and team.",
    },
    {
      q: "How do I make changes to my restaurant website?",
      a: "Edit it yourself, or ask the Host, your front-of-house AI. The Host drafts the change, our team reviews it, and it goes live. You can also reach our team directly for any update.",
    },
    {
      q: "What is the Host?",
      a: "The Host is Front of House's AI assistant included with every Care plan. It helps restaurant owners update their website: change a price, swap a photo, update hours, or answer questions. The Host runs on our own local models with no per-message billing. Every change it drafts is reviewed by our team before going live.",
    },
    {
      q: "Will my restaurant website be found by AI search like ChatGPT and Perplexity?",
      a: "We build crawlable pages, readable menus, and structured data that matches your visible restaurant information. These foundations help search engines and AI assistants understand your site. Inclusion and rankings depend on the search service and the question being asked; we do not guarantee a recommendation.",
    },
    {
      q: "Is my website mobile-friendly?",
      a: "Yes. Every Front of House website is mobile-first, with readable menus, clear ordering and reservation links, tap-to-call, and tap-for-directions. We check the site on small screens as part of the build.",
    },
  ],
  about: [
    {
      q: "Who is Front of House?",
      a: "Front of House is a web and brand studio built exclusively for restaurants. Founded in 2026 by six co-founders: two restaurant-industry operators and four builders from HAI Solutions who designed and built restaurant sites including Killa and Burger Lab. We are based in Park City, Utah and metro Atlanta, Georgia.",
    },
    {
      q: "Does Front of House only work with restaurants?",
      a: "Yes. Front of House is 100% specialized in restaurants. That is all we build for: independents and small groups with 1 to 6+ locations.",
    },
    {
      q: "What makes Front of House different from other restaurant website companies?",
      a: "You own your custom website code and receive an exit kit. You pay for the build once, then a flat annual Care fee. We specialize in restaurants and include readable menus, crawlable pages, and accurate structured information to support discovery in search.",
    },
  ],
} as const;
