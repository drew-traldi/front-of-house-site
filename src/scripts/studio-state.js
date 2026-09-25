// ─────────────────────────────────────────────────────────────
// Shared "studio" answers for the spec templates: the visitor's
// restaurant name, brand color, button finish, and a vibe per
// template. Written by the /templates studio and by each demo, so a
// name typed once follows the visitor everywhere in this tab.
// The URL stays the shareable source of truth; this is the fallback.
// ─────────────────────────────────────────────────────────────

const KEY = "foh-studio";

export function readStudio() {
  try {
    const s = JSON.parse(sessionStorage.getItem(KEY) || "{}");
    return s && typeof s === "object" ? s : {};
  } catch {
    return {};
  }
}

export function writeStudio(patch) {
  const next = { ...readStudio(), ...patch };
  if (patch.vibes) next.vibes = { ...(readStudio().vibes || {}), ...patch.vibes };
  for (const k of Object.keys(next)) if (next[k] === "" || next[k] == null) delete next[k];
  try {
    sessionStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    /* private mode: the URL still carries the answers */
  }
  document.dispatchEvent(new CustomEvent("foh:studio", { detail: next }));
  return next;
}

/** Query params that carry the studio answers into a demo or the brief. */
export function studioParams(s = readStudio(), slug) {
  const q = new URLSearchParams();
  if (s.name) q.set("name", s.name);
  if (s.accent) q.set("accent", String(s.accent).replace(/^#/, ""));
  if (s.finish === "tonal") q.set("finish", "tonal");
  if (slug && s.vibes?.[slug]) q.set("vibe", s.vibes[slug]);
  return q;
}
