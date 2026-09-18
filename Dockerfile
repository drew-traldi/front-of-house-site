# syntax=docker/dockerfile:1
# Astro site with the Node standalone adapter. Pages are prerendered; only the
# Maitre API route runs on the server. ANTHROPIC_API_KEY is a runtime env var.
#   docker build -t foh-website . && docker run --rm -p 4321:4321 -e ANTHROPIC_API_KEY=... foh-website

FROM node:22-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund

FROM node:22-alpine AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:22-alpine AS run
WORKDIR /app
ENV NODE_ENV=production HOST=0.0.0.0 PORT=4321
COPY --from=deps /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY package.json ./
USER node
EXPOSE 4321
CMD ["node", "./dist/server/entry.mjs"]
