# Front of House — Design System

> Category: Editorial / Hospitality
> The restaurant web studio. Warm editorial serif, ember accent on paper surfaces, service-forward voice. A restaurant's website is its new front of house, and the brand is built to feel like one.

This is the FOH brand contract in the Open Design 9-section `DESIGN.md` schema.
Any agent generating FOH-branded output (this site, client mockups, decks,
social, email) reads this file plus the universal rules in `.claude/craft/`.
Tokens here are the live values in `src/styles/global.css` — keep the two in sync.

## 1. Visual Theme & Atmosphere

Warm, editorial, hospitable. The page should feel like the first room a guest walks into: calm, confident, well-lit, never busy. Menu-grade serif headlines over generous paper-toned negative space, with a single ember accent doing the emphasis.

- **Visual style:** editorial, warm, restaurant-native. Print-menu sensibility rendered for the web.
- **Color stance:** paper/bone surfaces dominant, ink for structure, ember as the one signature accent, brass reserved for premium (Care+) signals.
- **Design intent:** every surface should be identifiably Front of House. If a screenshot could belong to any generic SaaS site, it is wrong. Warmth and restraint over decoration and hype.
- **Feeling to avoid:** corporate, software-y, hype-driven, cold, template-assembled.

## 2. Color

Ink and ember carry the brand. Brass is premium-only. Bone and paper are the warm surfaces. Never introduce new hues — the extended palette below is derived from the core.

**Core**
- **Ink** `#221C18` — primary dark: dark sections, headlines on light, structural elements.
- **Ember** `#C75B39` — primary accent: CTAs, kickers, one emphasized word per headline, focus rings.
- **Brass** `#B5853F` — premium accent **only**: Care+, fine detailing. Must feel rare.
- **Bone** `#F4ECDD` — warm light surface: cards, alternating sections, reversed type on ink.
- **Paper** `#FBF7F0` — warm light background: the default page color.
- **Body** `#4A4038` — body copy on light surfaces.
- **Muted** `#9A8E7E` — secondary text, captions, labels, fine print.

**Derived (states, borders, depth — do not invent beyond these)**
- **Ember Deep** `#A8472B` — ember hover/active; text links.
- **Brass Deep** `#8A6420` — deep brass detailing.
- **Line** `#E4D9C4` — hairline borders on light surfaces.
- **Line Soft** `#EFE7D8` — soft dividers, alt section backgrounds.
- **Ink Border** `#3A322B` — borders/dividers on ink surfaces.
- **Muted on Ink** `#C9BBA0` — body/secondary text on ink backgrounds.
- **Live** `#5FB87A` — the "site live" status dot ONLY. Never a general success color in copy or buttons.
- **Danger** `#B23122` — form error/invalid state ONLY. A deep brick red, redder and darker than Ember so it never reads as the CTA/action accent. Never decorative.

**Rules**
- Dominant surfaces are Paper/Bone with Ink text — warm, editorial, calm.
- Ember is for a small, intentional share: CTAs, kickers, one emphasized headline word. Cap visible ember to ~2 uses per screen.
- Reserve Brass strictly for premium signals (Care+, special detailing). Never swap Ember and Brass — they mean different things (action vs. premium).
- On Ink surfaces: Bone/Paper for headings, Muted-on-Ink for body, Ember for accents.
- **Never** use the AI-default indigo family (`#6366f1`, `#4f46e5`, `#8b5cf6`, etc.) or a purple→blue hero gradient. See `.claude/craft/anti-ai-slop.md`.

**Accessibility**
- Ink on Paper/Bone and Bone/Paper on Ink both pass comfortably.
- Avoid Muted text on Paper for long passages — captions/labels only.
- Focus: 2.5px Ember outline with 3px offset.

## 3. Typography

A high-contrast editorial serif for everything menu-grade, a clean neutral sans for everything that has to work.

- **Display / wordmark:** Cormorant — weights 500/600/700 plus 500/600 italic. Headlines, tier names, prices, section numbers, the wordmark.
- **Body / UI:** Inter (Variable where available; fallback Helvetica Neue) — 400 body, 500 medium, 600 semibold labels/buttons. Paragraphs, tables, the app, the portal.
- **Mono (utility only):** system monospace for code/technical snippets; not a brand voice.

**Scale (responsive)**
| Level | Font | Size | Weight |
|---|---|---|---|
| H1 | Cormorant | `clamp(2.6rem, 6vw, 4.4rem)` | 700 |
| H2 | Cormorant | `clamp(1.9rem, 3.6vw, 2.9rem)` | 600 |
| H3 | Cormorant | `clamp(1.25rem, 2vw, 1.5rem)` | 600 |
| Lede | Inter | `clamp(1.05rem, 1.6vw, 1.28rem)` | 400 |
| Body | Inter | `1.0625rem` / line-height 1.65 | 400 |
| Kicker | Inter | `0.72rem`, uppercase, `0.22em` tracking | 600 |

**Rules**
- Display tracking tight at large sizes (~-0.01em to -0.02em); display leading 0.9–1.08.
- Emphasize exactly **one word** per headline in italic Cormorant Ember (the signature "*front of house.*" treatment) — never several.
- Headlines and prices in Cormorant; everything functional in Inter. Never set long body in Cormorant; never set headlines in Inter or system-ui.
- The **kicker** — small uppercase Inter label in Ember with 0.22em tracking above a headline — is a signature recurring device. Open sections with it.

## 4. Spacing & Grid

- **Baseline:** 8pt rhythm; keep vertical rhythm consistent across sections.
- **Max content width:** ~1140px, centered, fluid gutter `clamp(1.25rem, 4vw, 3rem)`.
- **Section padding:** generous — `clamp(3.5rem, 8vw, 6.5rem)`; tight variant `clamp(2.5rem, 5vw, 4rem)`. Let things breathe.
- **Radius:** 14px cards/large surfaces, 9px small, 4px brand-document panels. Buttons are full pills (`999px`).
- Align modules to a predictable grid; whitespace separates concerns before borders or shadows do.

## 5. Layout & Composition

- **Editorial, not busy.** Warm negative space; one clear focal point per section.
- **Alternate surfaces** — Paper → Bone → Ink sections create rhythm down a page.
- **Numbered sections** (01, 02, 03…) in Cormorant Ember are a recurring structural device.
- **Hairline rules** (`#E4D9C4`) separate sections and table rows; a 3px Ember rule can sit under a masthead.
- **Photography earns space** — large, confident, full-bleed or large-card placements, never decoration.
- Hierarchy is always obvious: kicker → Cormorant headline (one italic ember word) → lede → primary action.
- **Break the template.** Do not ship the generic Hero → Features → Pricing → FAQ → CTA skeleton unvaried. Include at least one unconventional section (full-bleed pull-quote, own-it-vs-rent-it comparison, live-status proof motif).

## 6. Components

- **Buttons**
  - Primary: Ember fill, Paper text, pill radius. Hover → Ember Deep + soft ember shadow. Inter 600, ~0.96rem, `0.85rem 1.5rem` padding, 1px press-down on active.
  - Ghost: transparent, Line border, Ink text. Hover → Ink border.
  - On-ink: Paper fill, Ink text, for dark surfaces.
- **Cards:** white or Bone fill, 1px Line border, 14px radius, soft shadow `0 8px 28px rgba(34,28,24,0.07)`. Never a rounded card with a colored left-border accent (AI dashboard tile tell).
- **Surfaces:** `surface-bone` (alt sections); `surface-ink` (headings → Paper, body → Muted-on-Ink, accents → Ember).
- **Signature motifs:** ember kicker + Cormorant headline; ember dots as punctuation around the wordmark; a live-status card ("Site live · edited this morning") as proof-of-service.
- **Care plans (recurring):** Care on an Ink surface with an "Own It, Stay Sharp" ember badge (featured/default, tied to $450/yr); Care+ on a light surface with Brass accents and a "Marketing Partner" badge (premium); a build pill pairing the one-time build ("From $2,000 · you own the code") with annual care ("From $450/yr · no monthly rent").
- **Icons:** 1.6–1.8px-stroke monoline SVG using `currentColor`. Never emoji as feature icons.

## 7. Motion & Interaction

- Short and quiet: 150–250ms, stable easing. Ember is the interaction signal.
- Every interactive element defines hover, focus-visible, active, disabled, and loading states explicitly.
- One or two memorable micro-interactions per page (a 2px button press, a number that counts up) — earned, not blanket transitions on everything.
- Always respect `prefers-reduced-motion: reduce`.
- No decorative blob/wave SVG backgrounds; no motion that fights readability.

## 8. Voice & Brand

Warm, plainspoken, restaurant-native. Insiders, not vendors. Show, don't oversell. Service is the promise.

- **Speak restaurant** — kitchen and hospitality language; sound like someone who has worked a Friday rush.
- **Warm, never corporate** — confident, plainspoken, no buzzwords.
- **Concrete** — "Just ask Maître. It gets done." beats "leverage our streamlined support workflow."
- **Naming:** *Front of House* (full, first reference) → *FOH* (short/mark). *Maître* — the front-of-house AI (title case). *Care / Care+* — the two flat annual plans (title case).
- **Phrases that belong to us:** "Own it. Don't rent it." · "Your new front of house." · "Just ask Maître. It gets done." · "Built only for restaurants." · "You own it. We keep it sharp."
- **Style rule:** never use em dashes in FOH copy — use commas, colons, or periods instead.
- **Microcopy is action-oriented and specific:** "Scope your build" beats "Get started."

## 9. Anti-patterns

- **No AI-slop tells:** no indigo accent, no purple→blue hero gradient, no emoji feature icons, no invented metrics ("10× faster", "99.9% uptime"), no lorem/filler copy, no left-border-accent dashboard tiles. (See `.claude/craft/anti-ai-slop.md`.)
- Do not introduce off-palette colors when a token solves it; do not invent hues beyond the derived palette.
- Do not flatten hierarchy by using one size/weight for everything.
- Do not set body in Cormorant or headlines in Inter/system-ui.
- Do not use Ember and Brass interchangeably; do not spend Brass on non-premium elements.
- Do not use agency jargon (synergy, leverage, solutions, best-in-class, robust) or oversell with piled-on adjectives.
- Do not use generic stock photography — FOH shoots real rooms, plates, and people; use the `.ph-img` placeholder pattern until real photography exists.
- Do not use em dashes in copy.
- Do not ship the unvaried SaaS section skeleton — earn one distinctive section per page.
