# Front of House — Website

Astro marketing site for Front of House, the restaurant web studio.

## Design contract — read before any visual or copy work

**Start with `Mac_Master_Design_claude_must_read.md`** (project root): the
master doc that unifies all design guidance, sets the order of authority,
and carries the merged pre-delivery checklist. It layers two installed
skills on top of the contract below: `.claude/skills/frontend-design/`
(design process, anti-default thinking) and `.claude/skills/ui-ux-pro-max/`
(searchable UX/color/type database + Astro stack rules; its style generator
never overrides a brand contract).

Any agent generating or editing UI, layout, styling, imagery, or copy for this
project MUST work against two sources of truth:

1. **`FOH-DESIGN.md`** (project root) — the FOH brand contract in the Open Design
   9-section schema: color tokens, typography, spacing, components, motion, voice,
   and anti-patterns. This defines *what FOH looks and sounds like*.
2. **`.claude/craft/`** — universal, brand-agnostic craft rulebooks that apply on
   top of the brand contract. These define *the quality bar a competent designer
   holds regardless of brand*.

The live design tokens are in `src/styles/global.css`. `FOH-DESIGN.md` mirrors
them — if you change one, change the other.

### Which craft file to consult when

| Working on… | Read |
|---|---|
| Any marketing/landing surface | `.claude/craft/anti-ai-slop.md` |
| Any typed content | `.claude/craft/typography.md` + `typography-hierarchy.md` |
| Long-form reading (blog, about, docs) | also `typography-hierarchy-editorial.md` |
| Any styled output | `.claude/craft/color.md` |
| Motion, transitions, micro-interactions | `.claude/craft/animation-discipline.md` |
| Pricing, dashboards, onboarding, modals | `.claude/craft/laws-of-ux.md` |
| Any interactive UI (focus, labels, keyboard) | `.claude/craft/accessibility-baseline.md` |
| Any form (contact, lead capture, intake) | `.claude/craft/form-validation.md` |
| Stateful UI (lists, tables, loading, empty) | `.claude/craft/state-coverage.md` |

### Non-negotiables (fast checklist)

- Ember `#C75B39` is the only signature accent; Brass `#B5853F` is premium-only
  (Care+). Never the AI-default indigo family or a purple→blue hero gradient.
- Cormorant for display/prices, Inter for body/UI. Never body in Cormorant or
  headlines in Inter/system-ui. One italic-ember word per headline, not several.
- Monoline SVG icons (`currentColor`), never emoji as feature icons.
- No em dashes in copy — commas, colons, periods instead.
- No invented metrics, no lorem/filler, no generic stock photography.
- Break the generic Hero→Features→Pricing→FAQ→CTA skeleton with at least one
  distinctive FOH section per page.

> This design contract was seeded from the Open Design toolkit
> (`Claude Design/open-design`, `craft/` + 9-section `DESIGN.md` schema).
> To refresh the craft rulebooks, re-copy from that repo's `craft/` folder.
