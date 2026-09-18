// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import node from "@astrojs/node";
import vercel from "@astrojs/vercel";

// https://astro.build/config
// Pages stay static (prerendered) by default for speed + SEO. Only routes that
// opt out with `export const prerender = false` (the Maître API) run in the Node
// standalone server (self-hosted on the FOH VPS), where the Anthropic key lives server-side.
export default defineConfig({
  site: "https://fohrestaurants.com",
  // Dual target during the VPS migration: Vercel sets VERCEL=1 in its builds, so
  // Vercel keeps its serverless adapter; Docker/Coolify builds get the Node
  // standalone server (dist/server/entry.mjs). Drop the Vercel branch after cutover.
  adapter: process.env.VERCEL ? vercel() : node({ mode: "standalone" }),
  integrations: [sitemap()],
  // Dev/preview only, no effect on the production build. 4999 is this site's
  // reserved port in the FOH orchestration registry (src/lib/foh/clients.ts),
  // so `npm run dev` matches what the orchestrator's startPreview() binds.
  server: { port: 4999, host: "127.0.0.1" },
});
