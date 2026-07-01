// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import vercel from "@astrojs/vercel";

// https://astro.build/config
// Pages stay static (prerendered) by default for speed + SEO. Only routes that
// opt out with `export const prerender = false` (the Maître API) run as Vercel
// serverless functions, where the Anthropic key lives server-side.
export default defineConfig({
  site: "https://frontofhouse.studio",
  adapter: vercel(),
  integrations: [sitemap()],
});
