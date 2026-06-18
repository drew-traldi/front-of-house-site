# Front of House — Restaurant Web Studio

Marketing site for Front of House (FOH), built with [Astro](https://astro.build).
Static output, ready to deploy to Vercel.

## Stack

- **Astro 6** (static / zero-JS by default)
- **Cormorant** + **Inter** via `@fontsource` (self-hosted, no external requests) —
  matches the Claude Design brand system
- **@astrojs/sitemap** for `sitemap-index.xml`
- All brand tokens (color, type) in `src/styles/global.css`
- All site content & pricing in `src/data/site.ts`
- Logo, photo slots, pricing tiers, and CTA rebuilt to the Claude Design
  visual system ("FrontOfHouse visual components - claude design")

## Commands

Run from this `site/` folder:

| Command           | Action                                  |
| :---------------- | :-------------------------------------- |
| `npm install`     | Install dependencies                    |
| `npm run dev`     | Dev server at `localhost:4321`          |
| `npm run build`   | Build production site to `./dist/`      |
| `npm run preview` | Preview the production build locally    |

## Structure

```
src/
├── data/site.ts          ← single source of truth: contact, nav, pricing, copy
├── styles/global.css     ← brand palette + typography + base styles
├── layouts/Base.astro    ← <head>, SEO/AEO meta, JSON-LD, header + footer
├── components/           ← Logo (awning SVG), Header, Footer, Tiers, CtaBand
└── pages/                ← index, services, pricing, work, about, contact, 404
```

## Before going live — TODO

1. **Real contact details.** Edit `site.contact` in `src/data/site.ts`
   (email, phone) — currently placeholders. Updates the header, footer,
   contact page, and structured data everywhere at once.
2. **Domain.** Update `site.url` in `src/data/site.ts` and `site` in
   `astro.config.mjs` (also referenced in `public/robots.txt`).
3. **Contact form delivery.** The form on `/contact` currently opens the
   visitor's email client (no backend needed). To capture leads automatically,
   set `data-endpoint` on the form to a Formspree URL or a Vercel serverless
   function and it will POST JSON instead.
4. **Real photos.** The hero and gallery use `ImageSlot` placeholders
   (`src/components/ImageSlot.astro`). Drop in real photos by passing `src` —
   e.g. `<ImageSlot src="/photos/dining.jpg" alt="..." />` (put files in
   `public/photos/`). Without `src` they render a branded placeholder.
5. **Real work.** Replace the concept placeholders in `src/pages/work.astro`
   with client projects as they ship.

## Deploy to Vercel

Vercel auto-detects Astro. Either:

- **Dashboard:** import the repo, set **Root Directory** to `site`. Build
  command `npm run build`, output `dist` are detected automatically.
- **CLI:** `npm i -g vercel && vercel` from this folder.

## Notes

- The internal pricing PDF (margins, markups, talk track) is **not** reflected
  anywhere in this site — public pricing comes only from the partnership
  proposal.
