// ─────────────────────────────────────────────────────────────
// Demo template personalization.
// Reads the visitor's answers (URL params → this demo's sessionStorage →
// the shared studio answers → none), fills every [data-slot] in the demo,
// sets the vibe palette and brand color, and drives the name intake, the
// FOH bar's Color & vibe panel, and the frame bar.
// No backend: URLs are shareable, state survives MPA navigation.
//
// Embed mode (?embed=1): the /templates studio shows each demo as a live
// preview in an iframe. No intake, no FOH bar, nothing stored; the studio
// pushes answers in with postMessage.
// ─────────────────────────────────────────────────────────────

import { applyBrand, familyColors, normalizeHex, suggest } from "./brand-color.js";
import { readStudio, writeStudio } from "./studio-state.js";

const PARAMS = ["name", "city", "vibe", "tag", "accent", "finish"];
const EMBED = new URLSearchParams(window.location.search).get("embed") === "1";

function readParams() {
  const q = new URLSearchParams(window.location.search);
  const state = {};
  for (const key of PARAMS) {
    const v = (q.get(key) || "").trim();
    if (v) state[key] = v;
  }
  return state;
}

function storageKey(slug) {
  return `foh-demo:${slug}`;
}

function readStored(slug) {
  try {
    const raw = sessionStorage.getItem(storageKey(slug));
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

/** The answers given in the studio or another demo, shaped for this demo. */
function fromStudio(slug) {
  const s = readStudio();
  const state = {};
  if (s.name) state.name = s.name;
  if (s.accent) state.accent = String(s.accent).replace(/^#/, "");
  if (s.finish === "tonal") state.finish = "tonal";
  if (s.vibes?.[slug]) state.vibe = s.vibes[slug];
  return state;
}

function store(slug, state) {
  if (EMBED) return;
  try {
    sessionStorage.setItem(storageKey(slug), JSON.stringify(state));
  } catch {
    /* private mode etc. — the URL still carries the state */
  }
  writeStudio({
    name: state.name || "",
    accent: state.accent || "",
    finish: state.finish || "",
    vibes: state.vibe ? { [slug]: state.vibe } : {},
  });
}

function syncUrl(state) {
  if (EMBED) return;
  const q = new URLSearchParams();
  for (const key of PARAMS) if (state[key]) q.set(key, state[key]);
  const qs = q.toString();
  history.replaceState(
    null,
    "",
    window.location.pathname + (qs ? `?${qs}` : "")
  );
}

const CHECK =
  '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>';
const NOTE =
  '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 8v5M12 16.5v.01"/></svg>';

export function initDemo() {
  const root = document.getElementById("demo-root");
  if (!root) return;

  const cfg = {
    slug: root.dataset.slug,
    direction: root.dataset.direction || root.dataset.slug,
    label: root.dataset.templateLabel,
    defaults: {
      name: root.dataset.defaultName,
      city: root.dataset.defaultCity,
      tag: root.dataset.defaultTagline,
    },
    vibes: [root.dataset.vibeA, root.dataset.vibeB],
    vibeLabels: [root.dataset.vibeALabel, root.dataset.vibeBLabel],
    defaultVibe: root.dataset.vibe,
  };

  const dialog = document.getElementById("demo-intake");
  const form = dialog?.querySelector("form");
  const nameInput = document.getElementById("intake-name");
  const cityInput = document.getElementById("intake-city");
  const tagInput = document.getElementById("intake-tag");
  const nameErr = document.getElementById("intake-name-err");

  // ── State ──
  const fromUrl = readParams();
  const stored = readStored(cfg.slug);
  let state = Object.keys(fromUrl).length
    ? fromUrl
    : Object.keys(stored).length
      ? stored
      : EMBED
        ? {}
        : fromStudio(cfg.slug);
  let personalized = Boolean(state.name);

  function validVibe(v) {
    return cfg.vibes.includes(v) ? v : cfg.defaultVibe;
  }

  function merged() {
    return {
      name: state.name || cfg.defaults.name,
      city: state.city || cfg.defaults.city,
      tag: state.tag || cfg.defaults.tag,
      vibe: validVibe(state.vibe),
      accent: normalizeHex(state.accent) || "",
      finish: state.finish === "tonal" ? "tonal" : "solid",
    };
  }

  function save() {
    store(cfg.slug, state);
    syncUrl(state);
  }

  // ── Apply state to the page ──
  function apply() {
    const m = merged();
    root.setAttribute("data-vibe", m.vibe);
    for (const [slot, value] of [
      ["name", m.name],
      ["city", m.city],
      ["tagline", m.tag],
      ["initial", (m.name || "").trim().charAt(0).toUpperCase()],
    ]) {
      document
        .querySelectorAll(`[data-slot="${slot}"]`)
        .forEach((el) => (el.textContent = value));
    }

    // FOH frame bar
    const forLabel = document.querySelector("[data-foh-for]");
    if (forLabel) {
      forLabel.textContent = personalized
        ? `built for ${m.name}`
        : "try it with your name";
    }

    // CTA links carry the useful context into a short build brief before
    // asking for contact information.
    const q = new URLSearchParams({ directions: cfg.direction });
    if (personalized) {
      q.set("restaurant", m.name);
      if (state.city) q.set("city", state.city);
      if (state.tag) q.set("tag", state.tag);
    }
    if (m.accent) q.set("accent", m.accent.slice(1));
    if (m.finish === "tonal") q.set("finish", "tonal");
    document
      .querySelectorAll("a[data-foh-cta]")
      .forEach((a) => (a.href = `/templates/brief?${q.toString()}`));

    if (personalized && !EMBED) {
      document.title = `${m.name} · ${cfg.label} website direction · Front of House`;
    }

    renderLook(m);
  }

  // ── Color & vibe panel (FOH bar) ──
  // Live on the page: every choice applies at once and is saved, so the
  // panel never needs a submit. Suggestions are fitted to the current
  // vibe's background, so they rebuild when the vibe changes.
  const look = document.querySelector("[data-foh-look-panel]");
  const lookBtn = document.querySelector("[data-foh-look]");
  const lookChip = document.querySelector("[data-foh-look-chip]");
  const swatchBox = look?.querySelector("[data-look-swatches]");
  const lookStatus = look?.querySelector("[data-look-status]");
  let builtFor = "";

  function buildSwatches(vibe) {
    if (!swatchBox || builtFor === vibe) return;
    builtFor = vibe;
    // Read the vibe's own tokens without the brand override.
    const { bg, fg, vibeAccent } = applyBrand(root, "", "solid");
    const list = bg ? suggest(bg, fg, vibeAccent) : [];
    const chip = (hex, name, value) =>
      `<button type="button" class="foh-look__swatch" data-look-color="${value}" aria-pressed="false" title="${name}${value ? " " + value : ""}">` +
      `<span class="foh-look__chip" style="--chip:${hex}"></span><span class="foh-look__name">${name}</span></button>`;
    swatchBox.innerHTML =
      chip(vibeAccent || "#ccc", "Template", "") +
      list.map((s) => chip(s.hex, s.name, s.hex)).join("") +
      `<label class="foh-look__swatch foh-look__swatch--custom" title="Pick any color">` +
      `<span class="foh-look__chip foh-look__chip--custom"><input type="color" data-look-custom value="#1f5f8b" aria-label="Choose any brand color" /></span>` +
      `<span class="foh-look__name">Custom</span></label>`;
  }

  // Sets the vibe, then the brand color on top of it (buildSwatches needs
  // the bare vibe tokens first), and syncs the panel and bar chip.
  function renderLook(m) {
    buildSwatches(m.vibe);
    const brand = applyBrand(root, m.accent, m.finish);
    const fit = brand.fit;
    if (lookChip) lookChip.style.setProperty("--chip", fit?.accent || brand.vibeAccent || "#c75b39");
    if (!look) return;
    look.querySelectorAll("[data-look-vibe]").forEach((b) =>
      b.setAttribute("aria-pressed", String(b.dataset.lookVibe === m.vibe))
    );
    look.querySelectorAll("[data-look-finish]").forEach((b) =>
      b.setAttribute("aria-pressed", String(b.dataset.lookFinish === m.finish))
    );
    const buttons = [...look.querySelectorAll("[data-look-color]")];
    // A family picked in the studio arrives as its raw color; here the same
    // family is listed fitted to this vibe, so match it by name too.
    const family = familyColors().find((f) => f.hex === m.accent);
    const match =
      buttons.find((b) => b.dataset.lookColor === m.accent) ||
      (family && buttons.find((b) => b.title.startsWith(`${family.name} `)));
    buttons.forEach((b) => b.setAttribute("aria-pressed", String(b === match)));
    const custom = look.querySelector(".foh-look__swatch--custom");
    const customInput = look.querySelector("[data-look-custom]");
    const isCustom = Boolean(m.accent) && !match;
    custom?.classList.toggle("is-on", isCustom);
    if (isCustom && customInput && document.activeElement !== customInput) customInput.value = m.accent;

    if (!lookStatus) return;
    if (!fit) {
      lookStatus.dataset.state = "template";
      lookStatus.textContent = "Using this direction's own color.";
    } else if (fit.weak) {
      lookStatus.dataset.state = "adjusted";
      lookStatus.innerHTML = `${NOTE}<span>Hard to read on this background, so we used the closest readable shade, ${fit.accent}.</span>`;
    } else if (fit.adjusted) {
      lookStatus.dataset.state = "adjusted";
      lookStatus.innerHTML = `${NOTE}<span>Deepened slightly to ${fit.accent} so every word stays readable.</span>`;
    } else {
      lookStatus.dataset.state = "ok";
      lookStatus.innerHTML = `${CHECK}<span>Readable on this background.</span>`;
    }
  }

  function setLook(patch) {
    state = { ...state, ...patch };
    for (const k of Object.keys(state)) if (!state[k]) delete state[k];
    save();
    apply();
  }

  look?.addEventListener("click", (e) => {
    const vibeBtn = e.target.closest("[data-look-vibe]");
    if (vibeBtn) return setLook({ vibe: vibeBtn.dataset.lookVibe });
    const finBtn = e.target.closest("[data-look-finish]");
    if (finBtn) return setLook({ finish: finBtn.dataset.lookFinish === "tonal" ? "tonal" : "" });
    const colorBtn = e.target.closest("[data-look-color]");
    if (colorBtn) return setLook({ accent: colorBtn.dataset.lookColor.replace(/^#/, "") });
    if (e.target.closest("[data-look-close]")) closeLook();
  });
  look?.addEventListener("input", (e) => {
    if (e.target.matches("[data-look-custom]")) {
      const hex = normalizeHex(e.target.value);
      if (hex) setLook({ accent: hex.slice(1) });
    }
  });

  function openLook() {
    if (!look || !lookBtn) return;
    look.hidden = false;
    lookBtn.setAttribute("aria-expanded", "true");
    (look.querySelector('[aria-pressed="true"]') || look.querySelector("button"))?.focus({ preventScroll: true });
  }
  function closeLook(returnFocus = true) {
    if (!look || look.hidden) return;
    look.hidden = true;
    lookBtn?.setAttribute("aria-expanded", "false");
    if (returnFocus) lookBtn?.focus({ preventScroll: true });
  }
  lookBtn?.addEventListener("click", () => (look?.hidden ? openLook() : closeLook()));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && look && !look.hidden) closeLook();
  });
  document.addEventListener("pointerdown", (e) => {
    if (look && !look.hidden && !look.contains(e.target) && !lookBtn?.contains(e.target)) closeLook(false);
  });

  // ── Name intake ──
  function prefillIntake() {
    if (!form) return;
    nameInput.value = state.name || "";
    cityInput.value = state.city || "";
    cityInput.placeholder = cfg.defaults.city;
    tagInput.value = state.tag || "";
    tagInput.placeholder = cfg.defaults.tag;
    const details = form.querySelector("details");
    if (details && (state.city || state.tag)) details.open = true;
    setNameError("");
  }

  function openIntake() {
    if (!dialog) return;
    closeLook(false);
    prefillIntake();
    dialog.showModal();
  }

  function setNameError(msg) {
    if (!nameInput || !nameErr) return;
    if (msg) {
      nameInput.setAttribute("aria-invalid", "true");
      nameErr.textContent = msg;
    } else {
      nameInput.removeAttribute("aria-invalid");
      nameErr.textContent = "";
    }
  }

  const NAME_MSG = "Add your restaurant's name and we'll put it up in lights.";

  // Error appears on blur or submit, never while first typing;
  // once shown, it clears live as soon as the field is fixed.
  nameInput?.addEventListener("blur", () => {
    if (nameInput.value.trim() === "" && dialog?.open) setNameError(NAME_MSG);
    else setNameError("");
  });
  nameInput?.addEventListener("input", () => {
    if (nameInput.getAttribute("aria-invalid") && nameInput.value.trim()) {
      setNameError("");
    }
  });

  form?.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = nameInput.value.trim();
    if (!name) {
      setNameError(NAME_MSG);
      nameInput.focus();
      return;
    }
    const first = !personalized;
    state = { ...state, name };
    const city = cityInput.value.trim();
    const tag = tagInput.value.trim();
    if (city) state.city = city;
    else delete state.city;
    if (tag) state.tag = tag;
    else delete state.tag;
    personalized = true;

    save();
    apply();
    dialog.close();

    // One restrained reveal moment (CSS keys off this class;
    // prefers-reduced-motion collapses it globally).
    root.classList.remove("is-revealed");
    void root.offsetWidth;
    root.classList.add("is-revealed");
    window.scrollTo({ top: 0, behavior: "instant" });
    // Name first, then the look: open Color & vibe once the reveal lands.
    if (first) setTimeout(openLook, 700);
  });

  dialog?.addEventListener("close", () => apply());
  dialog
    ?.querySelector("[data-intake-skip]")
    ?.addEventListener("click", () => dialog.close());

  document
    .querySelectorAll("[data-foh-edit]")
    .forEach((btn) => btn.addEventListener("click", openIntake));

  // ── Copy the personalized link ──
  const shareBtn = document.querySelector("[data-foh-share]");
  const copiedTip = document.querySelector("[data-foh-copied]");
  shareBtn?.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      if (copiedTip) {
        copiedTip.hidden = false;
        setTimeout(() => (copiedTip.hidden = true), 1800);
      }
    } catch {
      window.prompt("Copy this link", window.location.href);
    }
  });

  // ── Scroll-staggered reveals (opt in with data-scroll-reveal) ──
  // The .js gate keeps content visible if this script never runs.
  document.documentElement.classList.add("js");
  const srItems = document.querySelectorAll("[data-scroll-reveal]");
  if (srItems.length) {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (EMBED || reduce || !("IntersectionObserver" in window)) {
      srItems.forEach((el) => el.classList.add("sr-in"));
    } else {
      const io = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (e.isIntersecting) {
              e.target.classList.add("sr-in");
              io.unobserve(e.target);
            }
          }
        },
        { rootMargin: "0px 0px -8% 0px", threshold: 0.15 }
      );
      srItems.forEach((el) => io.observe(el));
    }
  }

  // ── Embedded preview: the studio pushes answers in ──
  if (EMBED) {
    window.addEventListener("message", (e) => {
      if (e.origin !== window.location.origin || e.data?.type !== "foh:studio") return;
      const d = e.data;
      state = {};
      if (d.name) state.name = String(d.name).slice(0, 80);
      if (d.accent) state.accent = String(d.accent).replace(/^#/, "");
      if (d.finish === "tonal") state.finish = "tonal";
      if (d.vibe) state.vibe = d.vibe;
      personalized = Boolean(state.name);
      apply();
    });
    apply();
    root.classList.add("is-ready");
    window.parent?.postMessage({ type: "foh:embed-ready", slug: cfg.slug }, window.location.origin);
    return;
  }

  // ── Boot ──
  if (personalized) save();
  apply();
  root.classList.add("is-ready");
  if (!personalized) {
    // Let the default site paint first so the intake reads as an
    // overlay on a real page, not a gate in front of a blank one.
    setTimeout(openIntake, 350);
  }
}
