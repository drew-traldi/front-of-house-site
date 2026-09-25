// ─────────────────────────────────────────────────────────────
// Brand color layer for the spec templates.
// A visitor can swap the demo's accent for their own brand color.
// Three jobs, all client-side, no dependencies:
//   1. suggest   — a short, restaurant-friendly palette fitted to the
//                  current vibe (light or dark ground)
//   2. fit       — WCAG gate: the accent must hold 3:1 against the page
//                  background (large type, rules, buttons) and its button
//                  label must hold 4.5:1; if not, nudge lightness until it does
//   3. finish    — solid, or a tonal gradient (same hue only, never a
//                  two-hue sweep; see anti-ai-slop.md)
// The raw choice is stored; fitting happens per vibe at apply time, so the
// same brand color reads correctly on candlelit and daylight alike.
// ─────────────────────────────────────────────────────────────

const HEX = /^#?([0-9a-f]{6})$/i;

export function normalizeHex(v) {
  const m = String(v || "").trim().match(HEX);
  return m ? `#${m[1].toLowerCase()}` : null;
}

function rgb(hex) {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function toHex([r, g, b]) {
  return (
    "#" +
    [r, g, b]
      .map((v) => Math.round(Math.max(0, Math.min(255, v))).toString(16).padStart(2, "0"))
      .join("")
  );
}

function hsl(hex) {
  const [r, g, b] = rgb(hex).map((v) => v / 255);
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    h = max === r ? (g - b) / d + (g < b ? 6 : 0) : max === g ? (b - r) / d + 2 : (r - g) / d + 4;
    h *= 60;
  }
  return [h, s * 100, l * 100];
}

function fromHsl(h, s, l) {
  s /= 100;
  l /= 100;
  const k = (n) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return toHex([f(0) * 255, f(8) * 255, f(4) * 255]);
}

function luminance(hex) {
  const [r, g, b] = rgb(hex).map((v) => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export function contrast(a, b) {
  const x = luminance(a);
  const y = luminance(b);
  return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05);
}

/** Resolve a CSS color (hex or rgb()) that the browser computed into #rrggbb. */
export function cssToHex(value) {
  const hex = normalizeHex(value);
  if (hex) return hex;
  const m = String(value).match(/rgba?\(\s*([\d.]+)[ ,]+([\d.]+)[ ,]+([\d.]+)/);
  return m ? toHex([+m[1], +m[2], +m[3]]) : null;
}

const MIN_ACCENT = 3; // accent vs page background (large text, rules, buttons)
const MIN_LABEL = 4.5; // button label vs accent

/** Best label color for a filled accent: the page fg or bg, else ink/white. */
function labelFor(accent, fg, bg) {
  const best = (list) => list.reduce((b, c) => (contrast(accent, c) > contrast(accent, b) ? c : b), list[0]);
  const brand = [fg, bg].filter(Boolean);
  const onBrand = brand.length ? best(brand) : null;
  if (onBrand && contrast(accent, onBrand) >= MIN_LABEL) return onBrand;
  return best([...brand, "#141210", "#ffffff"]);
}

/**
 * Fit a raw brand color to a vibe. Walks lightness away from the background
 * (darker on light grounds, lighter on dark grounds) in small steps until the
 * accent clears 3:1 and some label clears 4.5:1. Hue and saturation are kept.
 */
export function fitAccent(raw, bg, fg) {
  const hex = normalizeHex(raw);
  if (!hex || !bg) return null;
  const [h, s, l0] = hsl(hex);
  const darkGround = luminance(bg) < 0.2;
  const step = darkGround ? 1.5 : -1.5;
  let l = l0;
  let out = hex;
  for (let i = 0; i < 70; i++) {
    const label = labelFor(out, fg, bg);
    if (contrast(out, bg) >= MIN_ACCENT && contrast(out, label) >= MIN_LABEL) {
      return { accent: out, onAccent: label, ratio: contrast(out, bg), adjusted: out !== hex };
    }
    l = Math.max(4, Math.min(96, l + step));
    out = fromHsl(h, s, l);
  }
  // A background too close to every usable shade of this hue: keep the most
  // readable version we reached and say so.
  const label = labelFor(out, fg, bg);
  return { accent: out, onAccent: label, ratio: contrast(out, bg), adjusted: true, weak: true };
}

/** Tonal gradient: same hue, a lighter and a deeper stop. */
export function tonalFill(accent) {
  const [h, s, l] = hsl(accent);
  const hi = fromHsl(h, Math.min(100, s + 4), Math.min(92, l + 7));
  const lo = fromHsl(h, Math.min(100, s + 6), Math.max(6, l - 9));
  return `linear-gradient(135deg, ${hi} 0%, ${accent} 52%, ${lo} 100%)`;
}

// Restaurant-world hue families (degrees, saturation). Deliberately skips the
// indigo/violet band the craft rules call an AI tell.
const FAMILIES = [
  { name: "Chile", h: 6, s: 68 },
  { name: "Marigold", h: 36, s: 78 },
  { name: "Olive", h: 72, s: 40 },
  { name: "Herb", h: 145, s: 42 },
  { name: "Tile teal", h: 176, s: 48 },
  { name: "Harbor", h: 205, s: 55 },
  { name: "Wine", h: 345, s: 55 },
];

/** The hue families as raw mid-tone colors, for pickers that span several
 *  templates at once (each template fits the raw color to its own ground). */
export function familyColors() {
  return FAMILIES.map((f) => ({ name: f.name, hex: fromHsl(f.h, f.s, 40) }));
}

/** Six suggestions fitted to the ground, excluding hues near the vibe accent. */
export function suggest(bg, fg, vibeAccent) {
  const darkGround = luminance(bg) < 0.2;
  const vibeHue = vibeAccent ? hsl(vibeAccent)[0] : -999;
  return FAMILIES.filter((f) => Math.min(Math.abs(f.h - vibeHue), 360 - Math.abs(f.h - vibeHue)) > 14)
    .slice(0, 6)
    .map((f) => {
      const fitted = fitAccent(fromHsl(f.h, f.s, darkGround ? 62 : 38), bg, fg);
      return { name: f.name, hex: fitted.accent };
    });
}

/**
 * Apply (or clear) a brand color on the demo root for the current vibe.
 * Reads the vibe's own tokens, so call it after data-vibe is set.
 * Returns the fit result (or null when using the template's own accent).
 */
export function applyBrand(root, raw, finish) {
  const props = ["--accent", "--on-accent", "--accent-fill"];
  props.forEach((p) => root.style.removeProperty(p));
  root.removeAttribute("data-brand");
  const cs = getComputedStyle(root);
  const bg = cssToHex(cs.getPropertyValue("--bg"));
  const fg = cssToHex(cs.getPropertyValue("--fg"));
  const vibeAccent = cssToHex(cs.getPropertyValue("--accent"));

  const fit = normalizeHex(raw) && bg ? fitAccent(raw, bg, fg) : null;
  const accent = fit ? fit.accent : vibeAccent;
  if (fit) {
    root.style.setProperty("--accent", fit.accent);
    root.style.setProperty("--on-accent", fit.onAccent);
    root.setAttribute("data-brand", "custom");
  }
  if (finish === "tonal" && accent) root.style.setProperty("--accent-fill", tonalFill(accent));
  return { fit, bg, fg, vibeAccent };
}
