// ─────────────────────────────────────────────────────────────
// The /templates studio: one name, one color, every direction live.
// Answers live in the URL (shareable) and in the shared studio state, so
// they follow the visitor into each demo, the catalog, and the brief.
// Previews are the real demos in iframes (?embed=1), loaded when the
// studio nears the viewport and updated in place with postMessage.
// ─────────────────────────────────────────────────────────────

import { familyColors, normalizeHex } from "./brand-color.js";
import { readStudio, studioParams, writeStudio } from "./studio-state.js";

// The virtual screen each preview renders at before it is scaled down.
const SCREENS = {
  desktop: { w: 1280, h: 820 },
  phone: { w: 390, h: 780 },
};

const domainFor = (name) =>
  (name || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "");

export function initStudio() {
  const root = document.querySelector("[data-studio]");
  if (!root) return;

  const grid = root.querySelector("[data-studio-grid]");
  const nameInput = root.querySelector("[data-studio-name]");
  const swatchBox = root.querySelector("[data-studio-swatches]");
  const customWrap = root.querySelector("[data-studio-custom-wrap]");
  const customInput = root.querySelector("[data-studio-custom]");
  const status = root.querySelector("[data-studio-status]");
  const heading = root.querySelector("[data-studio-heading]");
  const title = root.querySelector("#studio-title");

  const previews = [...root.querySelectorAll("[data-preview]")].map((el) => ({
    el,
    slug: el.dataset.preview,
    href: el.dataset.href,
    direction: el.dataset.direction,
    demoName: el.dataset.demoName,
    iframe: el.querySelector("[data-preview-iframe]"),
    viewport: el.querySelector("[data-preview-viewport]"),
    ready: false,
  }));

  // ── Hue family swatches (raw colors; each demo fits them to its ground) ──
  const families = familyColors();
  customWrap?.insertAdjacentHTML(
    "beforebegin",
    families
      .map(
        (f) =>
          `<button type="button" class="studio__swatch" data-studio-color="${f.hex}" aria-pressed="false" title="${f.name}">` +
          `<span class="studio__chip" style="--chip:${f.hex}"></span><span class="studio__swatch-name">${f.name}</span></button>`
      )
      .join("")
  );

  // ── State: URL first (shared links), then this tab's answers ──
  const q = new URLSearchParams(window.location.search);
  let s = readStudio();
  const fromUrl = {};
  if (q.get("name")?.trim()) fromUrl.name = q.get("name").trim().slice(0, 60);
  if (normalizeHex(q.get("accent"))) fromUrl.accent = normalizeHex(q.get("accent")).slice(1);
  if (q.get("finish") === "tonal") fromUrl.finish = "tonal";
  if (Object.keys(fromUrl).length) s = writeStudio(fromUrl);

  const narrow = window.matchMedia("(max-width: 760px)");
  let view = narrow.matches ? "phone" : "desktop";

  const accentHex = () => normalizeHex(s.accent) || "";

  // ── Render ──
  function syncUrl() {
    const params = new URLSearchParams(window.location.search);
    for (const [key, value] of [
      ["name", s.name],
      ["accent", s.accent ? String(s.accent).replace(/^#/, "") : ""],
      ["finish", s.finish === "tonal" ? "tonal" : ""],
    ]) {
      if (value) params.set(key, value);
      else params.delete(key);
    }
    const qs = params.toString();
    history.replaceState(null, "", `${window.location.pathname}${qs ? `?${qs}` : ""}${window.location.hash}`);
  }

  function payload(p) {
    return {
      type: "foh:studio",
      name: s.name || "",
      accent: s.accent || "",
      finish: s.finish || "",
      vibe: s.vibes?.[p.slug] || "",
    };
  }

  function push(p) {
    if (p.ready) p.iframe.contentWindow?.postMessage(payload(p), window.location.origin);
  }

  function statusText() {
    const hex = accentHex();
    if (!hex) return "Each direction in its own colors.";
    const fam = families.find((f) => f.hex === hex);
    const label = fam ? fam.name : hex.toUpperCase();
    return `${label} across all ${previews.length}, fitted to each background so every word stays readable.`;
  }

  function render() {
    const hex = accentHex();
    if (heading) heading.textContent = s.name || "Your restaurant";
    if (nameInput && document.activeElement !== nameInput) nameInput.value = s.name || "";

    const buttons = [...swatchBox.querySelectorAll("[data-studio-color]")];
    const match = buttons.find((b) => b.dataset.studioColor === hex);
    buttons.forEach((b) => b.setAttribute("aria-pressed", String(b === match)));
    const isCustom = Boolean(hex) && !match;
    customWrap?.classList.toggle("is-on", isCustom);
    if (isCustom && customInput && document.activeElement !== customInput) customInput.value = hex;

    root.querySelectorAll("[data-studio-finish]").forEach((b) =>
      b.setAttribute("aria-pressed", String(b.dataset.studioFinish === (s.finish === "tonal" ? "tonal" : "solid")))
    );
    root.querySelectorAll("[data-studio-view]").forEach((b) =>
      b.setAttribute("aria-pressed", String(b.dataset.studioView === view))
    );

    if (status) {
      status.innerHTML = "";
      if (hex) {
        const dot = document.createElement("span");
        dot.className = "studio__status-chip";
        dot.style.setProperty("--chip", hex);
        status.append(dot);
      }
      status.append(document.createTextNode(statusText()));
    }

    for (const p of previews) {
      const domain = domainFor(s.name) || domainFor(p.demoName);
      const url = p.el.querySelector("[data-preview-url]");
      if (url) url.textContent = `${domain}.com`;
      const vibe = s.vibes?.[p.slug];
      p.el.querySelectorAll("[data-preview-vibe]").forEach((b, i) =>
        b.setAttribute("aria-pressed", String(vibe ? b.dataset.previewVibe === vibe : i === 0))
      );
      const open = `${p.href}?${studioParams(s, p.slug).toString()}`.replace(/\?$/, "");
      p.el.querySelectorAll("[data-preview-open]").forEach((a) => (a.href = open));
      const brief = new URLSearchParams({ directions: p.direction });
      if (s.name) brief.set("restaurant", s.name);
      if (hex) brief.set("accent", hex.slice(1));
      if (s.finish === "tonal") brief.set("finish", "tonal");
      const briefLink = p.el.querySelector("[data-preview-brief]");
      if (briefLink) briefLink.href = `/templates/brief?${brief.toString()}`;
      push(p);
    }

    // Catalog links to the same demos carry the answers too.
    document.querySelectorAll("a[data-carry-studio]").forEach((a) => {
      const base = a.dataset.carryStudio;
      const slug = base.split("/").pop();
      const qs = studioParams(s, slug).toString();
      a.href = qs ? `${base}?${qs}` : base;
    });

    syncUrl();
  }

  function set(patch) {
    s = writeStudio(patch);
    render();
  }

  // ── Layout: scale each virtual screen down to its card ──
  function layout() {
    grid.dataset.view = view;
    const screen = SCREENS[view];
    for (const p of previews) {
      const w = p.viewport.clientWidth;
      if (!w) continue;
      const scale = w / screen.w;
      p.iframe.style.width = `${screen.w}px`;
      p.iframe.style.height = `${screen.h}px`;
      p.iframe.style.transform = `scale(${scale})`;
      p.viewport.style.setProperty("--vh", `${Math.round(screen.h * scale)}px`);
    }
  }

  // ── Lazy-load the previews as the studio approaches ──
  function load() {
    for (const p of previews) {
      if (p.iframe.getAttribute("src")) continue;
      const qs = studioParams(s, p.slug);
      qs.set("embed", "1");
      p.iframe.src = `${p.href}?${qs.toString()}`;
      // Fallback if the ready message never arrives (older cached demo).
      p.iframe.addEventListener("load", () => setTimeout(() => p.el.classList.add("is-loaded"), 400), { once: true });
    }
  }
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          load();
          io.disconnect();
        }
      },
      { rootMargin: "600px 0px" }
    );
    io.observe(grid);
  } else {
    load();
  }

  window.addEventListener("message", (e) => {
    if (e.origin !== window.location.origin || e.data?.type !== "foh:embed-ready") return;
    const p = previews.find((x) => x.iframe.contentWindow === e.source);
    if (!p) return;
    p.ready = true;
    p.el.classList.add("is-loaded");
    push(p);
  });

  // ── Controls ──
  let nameTimer;
  nameInput?.addEventListener("input", () => {
    clearTimeout(nameTimer);
    nameTimer = setTimeout(() => set({ name: nameInput.value.trim().slice(0, 60) }), 140);
  });
  nameInput?.addEventListener("change", () => set({ name: nameInput.value.trim().slice(0, 60) }));

  swatchBox?.addEventListener("click", (e) => {
    const b = e.target.closest("[data-studio-color]");
    if (b) set({ accent: (b.dataset.studioColor || "").replace(/^#/, "") });
  });
  customInput?.addEventListener("input", () => {
    const hex = normalizeHex(customInput.value);
    if (hex) set({ accent: hex.slice(1) });
  });
  root.querySelectorAll("[data-studio-finish]").forEach((b) =>
    b.addEventListener("click", () => set({ finish: b.dataset.studioFinish === "tonal" ? "tonal" : "" }))
  );
  root.querySelectorAll("[data-studio-view]").forEach((b) =>
    b.addEventListener("click", () => {
      view = b.dataset.studioView === "phone" ? "phone" : "desktop";
      layout();
      render();
    })
  );
  for (const p of previews) {
    p.el.querySelectorAll("[data-preview-vibe]").forEach((b) =>
      b.addEventListener("click", () => set({ vibes: { [p.slug]: b.dataset.previewVibe } }))
    );
  }
  narrow.addEventListener("change", () => {
    view = narrow.matches ? "phone" : "desktop";
    layout();
    render();
  });
  if ("ResizeObserver" in window) new ResizeObserver(layout).observe(grid);
  else window.addEventListener("resize", layout);

  // ── The hero's name field starts everything ──
  const start = document.querySelector("[data-studio-start]");
  start?.addEventListener("submit", (e) => {
    e.preventDefault();
    const input = start.querySelector("input");
    const name = (input?.value || "").trim().slice(0, 60);
    if (!name) {
      input?.focus();
      input?.setAttribute("aria-invalid", "true");
      return;
    }
    input.removeAttribute("aria-invalid");
    set({ name });
    load();
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    root.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    title?.focus({ preventScroll: true });
  });
  const startInput = start?.querySelector("input");
  if (startInput && s.name) startInput.value = s.name;
  startInput?.addEventListener("input", () => startInput.removeAttribute("aria-invalid"));

  layout();
  render();
}
