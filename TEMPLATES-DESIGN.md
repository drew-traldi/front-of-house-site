# FOH Spec Templates — Design Briefs

Four interactive demo restaurant sites under `/templates/*`. A visitor enters
their restaurant name, city, a one-tap vibe, and an optional tagline, and the
demo personalizes in place in under 60 seconds, framed by a slim FOH bar with
a "Get this built" CTA.

Read with `FOH-DESIGN.md` and `.claude/craft/`. Split of authority:

- **FOH-DESIGN.md governs the FOH chrome only**: the `/templates` gallery
  page, the intake overlay, and the FOH frame bar. Ember accent, Cormorant +
  Inter, kicker device, paper surfaces.
- **Each demo is its own fictional restaurant brand.** It must NOT look like
  FOH and must not look like the other three. The craft rulebooks
  (`anti-ai-slop`, `typography`, `color`, `accessibility-baseline`,
  `animation-discipline`, `state-coverage`, `form-validation`, `laws-of-ux`)
  apply to everything.

Universal rules for all four demos:

- Two typefaces max per demo. Body face is Inter Variable (already shipped);
  each demo gets its own display face, self-hosted via fontsource.
- Palette per `color.md`: neutrals carry 70–90% of pixels, ONE accent capped
  at ~2 visible uses per screen, semantic colors only where functional.
- ALL CAPS always tracks at 0.06em minimum. Display type tracks negative.
- No emoji icons, no invented metrics, no lorem, no hotlinked stock CDNs.
  Photos are CC0 stock downloaded into `src/assets/demo/` and served through
  astro:assets (temporary until FOH shoots real assets; each was visually
  vetted; swap in place, keep the alt text honest).
- Default state (no params) is a fully written fictional restaurant, below.
  Personalization swaps name, city, and tagline; menus and copy stay.
- Every demo breaks the generic landing skeleton with its signature section.
- No em dashes anywhere in copy.
- Both vibes of every demo pass 4.5:1 body contrast, 3:1 large text.

Personalization slots each demo must include: `data-slot="name"` (multiple
places: header wordmark, hero, footer), `data-slot="city"`,
`data-slot="tagline"`, and `data-vibe` palettes on the page root.
`data-slot="initial"` (optional) receives the uppercased first letter of the
name — used for monogram marks (Aurelia).

---

## 1. Fine Dining — "Aurelia" (`/templates/fine-dining`)

Tasting-menu house in Park City, Utah. Reservation-led, editorial, quiet
confidence. The site should feel like the first page of a beautiful menu.

- **Default identity:** Aurelia · Park City, Utah · tagline "A seven course
  conversation."
- **Display face:** Fraunces (variable, incl. italic). Body: Inter.
- **Identity devices (July 2026):** circled italic-initial monogram (masthead
  and hero, fills from `data-slot="initial"`), uppercase tracked wordmark
  (0.12em+), tagline set on a hairline rule, roman-numeral course indices.
- **Vibes:**
  - `candlelit` (default): bg `#171310`, surface `#211b16`, fg `#f2ead9`,
    muted `#b3a68e`, hairline `rgba(242,234,217,0.14)`, accent candle gold
    `#d9ab5e` (large type and rules; buttons get fg-on-accent dark text).
  - `daylight`: bg `#faf7f1`, surface `#ffffff`, fg `#211d18`, muted
    `#6f6554`, hairline `#e6ddcc`, accent bronze `#7d6a3f`.
- **Sections:** masthead (wordmark, reserve CTA) → hero (name, tagline, city,
  seating times) → **signature: the tasting menu as a numbered typographic
  centerpiece** (seven courses, course name in Fraunces italic, one-line
  description, wine pairing note) → story/chef note with photo slot → private
  dining strip → hours + address + reservation footer.
- **Voice:** spare, warm, no superlatives. "Seatings at 5:30 and 8:30."
- **Micro-interaction:** courses reveal with a slow stagger on scroll,
  respecting reduced motion.

## 2. Fast Casual — "Stacked" (`/templates/fast-casual`)

Counter-service smashburger and bowls spot in Midtown Atlanta. Order-first:
the order CTA is sticky and everything routes to the menu.

- **Default identity:** Stacked · Midtown Atlanta · tagline "Good food,
  fast, no fuss."
- **Display face:** Archivo (variable, used at 800–900, tight tracking).
  Body: Inter.
- **Identity devices (July 2026):** accent full-stop after the name (header,
  hero, footer — the brand tic), taglines as mustard tape labels (Archivo 800
  caps on the fill color).
- **Vibes:**
  - `bold` (default): bg cream `#fff8ec`, surface `#ffffff`, fg `#1a1613`,
    muted `#7a7062`, accent tomato `#c93a29` (CTA + one headline word),
    fill mustard `#ffc93c` (color-block panels with fg text, not an accent).
  - `fresh`: bg `#f3f8ef`, surface `#ffffff`, fg `#17211a`, muted `#5f6c5f`,
    accent deep green `#2e7d4f`, fill pale lime `#dff0c8`.
- **Sections:** compact header with sticky "Order ahead" button → hero (big
  Archivo name, tagline, city, hours-now line) → **signature: the menu board**,
  a dense price-forward grid (item, one-line build, price) that reads like the
  board above the counter → three-step "order, pickup, eat" strip → locations
  + hours → footer with order CTA repeated.
- **Voice:** short, direct, a little cocky. "In line to fed, four minutes."
- **Micro-interaction:** the sticky order button compresses 2px on press;
  menu prices are tabular-nums.

## 3. Mexican / Cantina — "La Palma" (`/templates/cantina`)

Neighborhood cantina in East Atlanta Village. Warm, loud in color, generous.
Big visual menu, margarita hour front and center.

- **Default identity:** La Palma · East Atlanta Village · tagline "Tacos,
  mezcal, y buena gente."
- **Display face:** Alfa Slab One (poster slab, headlines only, used
  sparingly). Body: Inter.
- **Identity devices (July 2026):** the serape tri-stripe band (chile /
  marigold / teal, 8px, framing the top of the page and the footer),
  three-dot punctuation under the hero tagline, marquee band on tile teal.
- **Vibes:**
  - `fiesta` (default): bg sand `#fdf3e3`, surface `#ffffff`, fg `#2b1c14`,
    muted `#75604e`, accent chile `#c3352b`, fill marigold `#e9a13b` and
    tile teal `#256d67` as color-block fills with light/dark fg as contrast
    requires.
  - `cocina`: bg deep clay `#2e1f1a`, surface `#3a2820`, fg `#f6e7d3`,
    muted `#c4a98d`, accent marigold `#e9a13b`, hairline
    `rgba(246,231,211,0.16)`.
- **Sections:** header (wordmark, "Reserve a table") → hero with tiled
  photo-slot mosaic → **signature: the Marg Hour marquee strip** (a full-bleed
  band: "Marg hour, 3 to 6, every day" with the drink list) → big visual menu
  (photo tile + name + price, grid) → mezcal note / story → hours, address,
  footer.
- **Voice:** warm host energy, bilingual accents used naturally, never
  costume Spanish.
- **Micro-interaction:** marquee band scrolls slowly, pauses on hover, static
  under reduced motion.

## 4. Neighborhood Bar — "The Grackle" (`/templates/neighborhood-bar`)

Corner bar in Sugar House, Salt Lake City. The site changes as fast as the
chalkboard: taps and events are the content.

- **Default identity:** The Grackle · Sugar House, Salt Lake City · tagline
  "Your corner since whenever you found us."
- **Display face:** Oswald (condensed poster caps, tracked properly). Body:
  Inter.
- **Identity devices (July 2026):** "Est. whenever" eyebrow, chalk dashed
  rule under the hero name, zero-padded amber tap numbers (01, 02…), the
  live-dot "board updated" line.
- **Vibes:**
  - `dive` (default): bg `#141815`, surface `#1d221e`, fg chalk `#edefe8`,
    muted `#9aa396`, accent amber `#efa63e`, hairline
    `rgba(237,239,232,0.14)`.
  - `pub`: bg warm cream `#f5efe4`, surface wood `#e9ddc7`, fg `#241d16`,
    muted `#6b5f4f`, accent oxblood `#7d2a20`.
- **Sections:** header (wordmark, "Tonight" anchor) → hero (name, tagline,
  city, open-now line) → **signature: the tap board**, a numbered chalkboard
  list (tap number, pour, brewery, price) with a "board updated" date line →
  this-week events list (day, event, time) → kitchen menu shortlist → photos
  strip → hours + address footer.
- **Voice:** dry, friendly, zero marketing gloss. "Cash and cards. Dogs on
  the patio."
- **Micro-interaction:** the "board updated" line carries the live-dot
  device; tap rows get a subtle chalk-underline hover.

---

## Intake (FOH chrome, shared)

Four inputs, in this order, per `form-validation.md` and `laws-of-ux.md`:

1. **Restaurant name** (text, required, autofocus). Error only on blur or
   submit: "Add your restaurant's name and we'll put it up in lights."
2. **City or neighborhood** (text, optional, placeholder from the demo's
   default city).
3. **Vibe** (two tappable cards, radio semantics, template-specific labels,
   default preselected).
4. **Tagline** (text, optional, placeholder suggests the demo default).

One screen, no steps, submit label "Show me my site". Completing it updates
the URL (shareable) and reveals the personalized demo with one restrained
reveal moment (fade + 12px rise on the hero, stagger 60ms, skipped under
`prefers-reduced-motion`). "Change details" in the FOH bar reopens it.

## FOH frame bar (FOH chrome, shared)

Slim ink bar, always visible, Cormorant wordmark "Front of House", Inter
label "Spec template · built for {name}", ember "Get this built" button
linking to `/contact?restaurant=&template=&city=&vibe=&tag=`, ghost "Change
details" button. On mobile it collapses to wordmark + CTA.
