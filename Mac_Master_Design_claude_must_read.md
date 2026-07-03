# Mac Master Design — Claude Must Read

The master design contract for all Front of House development on this Mac:
the marketing site, the four spec templates, and every future client build.
Any agent doing visual, UI, or copy work reads this first. It unifies four
sources of design guidance now installed in this repo and says exactly when
each one wins.

## The stack, in order of authority

When two sources disagree, the higher one wins. No exceptions.

1. **`FOH-DESIGN.md`** (repo root) — the FOH brand contract. Colors, type,
   voice, anti-patterns. Decides *what FOH-branded surfaces look like*.
   For spec templates and client sites, the equivalent is that project's own
   brief (`TEMPLATES-DESIGN.md` for the four specs, the client's DESIGN.md
   for client builds). A brand contract always outranks every tool below.
2. **`.claude/craft/`** — nine universal craft rulebooks (typography, color,
   forms, states, motion, accessibility, laws of UX, anti-AI-slop). The
   quality bar that applies regardless of brand. See the routing table in
   `CLAUDE.md` for which file to read when.
3. **`.claude/skills/frontend-design/`** (Anthropic) — the *process*:
   how to approach a design so it doesn't read as an AI default.
4. **`.claude/skills/ui-ux-pro-max/`** (Next Level Builder) — the
   *reference database and checklists*: 99 UX guidelines, 161 palettes,
   57 font pairings, stack-specific rules (including Astro), all searchable
   from the CLI.

## What each new skill is for (general findings)

### frontend-design (Anthropic) — the process skill

Its core claims, all of which we adopt:

- **Design like a hired studio lead, not a template engine.** Every brief
  gets deliberate, opinionated palette/type/layout choices specific to that
  subject, plus ONE justified aesthetic risk.
- **Ground everything in the subject's real world.** A restaurant's
  materials, menu language, and room are where distinctive choices come
  from, not from a component library.
- **The hero is a thesis.** Open with the most characteristic thing in the
  subject's world. A big number + small label + gradient is the template
  answer.
- **Known AI-slop looks to avoid spending free choices on:** (1) warm cream
  bg + high-contrast serif + terracotta accent, (2) near-black bg + one acid
  accent, (3) broadsheet hairline-rules layout. NOTE: FOH's own brand is
  adjacent to look 1, and that's fine, the brief's words always win and
  FOH-DESIGN.md is our brief. But every NEW surface (spec templates, client
  sites) must not default there; it must earn its direction from the
  subject.
- **Two-pass process:** first a compact design plan (4-6 named hex values,
  2+ type roles, layout concept in one sentence or ASCII, ONE signature
  element), then a self-review against "would I have produced this for any
  similar brief?" before writing code.
- **Restraint:** spend boldness in one place; quality floor without
  announcing it (responsive, visible focus, reduced motion); "remove one
  accessory" before shipping.
- **Copy is design material.** Name things by what users control, active
  voice, a button says exactly what happens, errors state cause + fix and
  never apologize vaguely, empty states invite action.

### ui-ux-pro-max (Next Level Builder) — the reference skill

- A searchable design database + reasoning engine, run locally (pure
  Python stdlib, no network):
  ```bash
  cd .claude/skills/ui-ux-pro-max
  python3 scripts/search.py "<keywords>" --design-system -p "Name"   # full system
  python3 scripts/search.py "<keywords>" --domain ux|color|typography|landing|style
  python3 scripts/search.py "<keywords>" --stack astro                # our stack
  ```
- **Its strongest assets for us:** the priority-ranked rule categories
  (1 Accessibility, 2 Touch & Interaction, 3 Performance are CRITICAL/HIGH),
  the pre-delivery checklists, the Astro stack guidance (astro:assets
  images, preload critical fonts), and the typography/color databases for
  ideation on NEW brands (it correctly surfaced restaurant pairings like
  Playfair Display SC/Karla).
- **Its known weakness, observed first-hand:** its `--design-system`
  generator suggested "Liquid Glass" style with a pink accent for a
  restaurant studio query. Style output is generic scaffolding.
  **Never let its generated styles/palettes override a brand contract.**
  Use it to ideate for brand-less new projects and to CHECK work, not to
  restyle existing brands.

## The unified FOH workflow

For any new surface (page, template, client site):

1. **Brief first, code second.** Write or read the design brief. New
   fictional/client brand → follow frontend-design's two-pass plan (palette
   as named hexes, type roles, layout concept, one signature element), and
   optionally consult `ui-ux-pro-max --domain typography|color` for
   ideation. Existing brand → the contract's tokens, no re-ideation.
2. **Self-review the plan** against the anti-default test (frontend-design)
   and `.claude/craft/anti-ai-slop.md` before building.
3. **Build against craft rules.** Use the CLAUDE.md routing table
   (forms → form-validation.md, motion → animation-discipline.md, etc.).
   Match code style to the file you're in.
4. **Run the merged pre-delivery checklist** (below).
5. **Verify in the browser** (preview tools): 375px mobile, keyboard-only
   pass, reduced motion, both themes/vibes where they exist, screenshots as
   proof.

## Merged pre-delivery checklist (the FOH quality gate)

Sources: FOH-DESIGN.md §9, craft rulebooks, frontend-design, ui-ux-pro-max
§1-§8. Run this before calling any visual work done.

**Brand & soul**
- [ ] Could a screenshot be identified as THIS product/restaurant? If it
      could be anyone's, it's a template, redo the 20% distinctive part.
- [ ] One signature element per page; boldness spent in one place.
- [ ] FOH surfaces: ember ≤2 visible uses/screen, brass premium-only, one
      italic-ember word per headline, kicker device, no em dashes.
- [ ] No AI tells: no indigo defaults, no purple→blue hero gradient, no
      emoji icons (monoline SVG only), no invented metrics, no lorem.

**Typography**
- [ ] Max 2 typefaces; display has negative tracking; ALL CAPS tracked
      ≥0.06em; body 16px+ on mobile, line-height 1.5-1.65, 50-75ch measure.
- [ ] Prices/data in tabular-nums.

**Color & contrast (gates, not goals)**
- [ ] Body text ≥4.5:1, large text ≥3:1, UI vs adjacent surface ≥3:1.
      Check EVERY theme/vibe separately, dark is never inverted light.
- [ ] Semantic tokens (--accent, --danger), no raw hex in components,
      ≤2 accent uses per screen.

**Interaction & accessibility**
- [ ] Touch targets ≥44×44px with ≥8px spacing; cursor-pointer on
      clickables; press feedback within ~100ms.
- [ ] Visible focus rings; tab order = visual order; labels on every input
      (never placeholder-only); skip link; heading hierarchy sequential.
- [ ] Errors: on blur not keystroke, below the field, state cause + fix,
      focus first invalid on submit, role="alert"/aria-live.
- [ ] Active nav state marked (aria-current="page").
- [ ] Esc/close affordance on every modal; nothing hover-only.

**Motion**
- [ ] Micro-interactions 150-300ms, transform/opacity only, ease-out in /
      ease-in out, exits faster than entrances, stagger 30-60ms.
- [ ] 1-2 animated elements per view; every animation expresses cause and
      effect; prefers-reduced-motion collapses everything.

**Performance (Astro specifics)**
- [ ] Real images through astro:assets `<Image>`/`<Picture>`, WebP/AVIF,
      explicit dimensions or aspect-ratio (CLS < 0.1), lazy below the fold.
- [ ] Preload the critical display-font woff2 per page; font-display: swap.
- [ ] Zero-JS by default; scripts only where interaction demands them.

**States & copy**
- [ ] Empty, loading, error, and success states all designed, none blank.
- [ ] Buttons say what they do ("Show me my site", not "Submit"); same verb
      through the whole flow; sentence case; conversational register.

## Scope notes

- The four spec templates are their OWN brands (TEMPLATES-DESIGN.md). FOH
  rules govern only their chrome (FOH bar, intake, gallery). Craft rules
  and this checklist govern everything.
- ui-ux-pro-max ships mobile-app rules (safe areas, haptics, gestures);
  apply those only when we build native/PWA surfaces, not the website.
- Keep this file, FOH-DESIGN.md, and `src/styles/global.css` in sync; if a
  token changes in one, change all three.
