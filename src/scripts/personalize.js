// ─────────────────────────────────────────────────────────────
// Demo template personalization.
// Reads the visitor's answers (URL params → sessionStorage → none),
// fills every [data-slot] in the demo, sets the vibe palette, and
// drives the 60-second intake overlay + the FOH frame bar.
// No backend: URLs are shareable, state survives MPA navigation.
// ─────────────────────────────────────────────────────────────

import { applyBrand, normalizeHex, suggest } from "./brand-color.js";

const PARAMS = ["name", "city", "vibe", "tag", "accent", "finish"];

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

function store(slug, state) {
  try {
    sessionStorage.setItem(storageKey(slug), JSON.stringify(state));
  } catch {
    /* private mode etc. — the URL still carries the state */
  }
}

function syncUrl(state) {
  const q = new URLSearchParams();
  for (const key of PARAMS) if (state[key]) q.set(key, state[key]);
  const qs = q.toString();
  history.replaceState(
    null,
    "",
    window.location.pathname + (qs ? `?${qs}` : "")
  );
}

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
  let state = Object.keys(fromUrl).length ? fromUrl : readStored(cfg.slug);
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

  // ── Apply state to the page ──
  function apply() {
    const m = merged();
    root.setAttribute("data-vibe", m.vibe);
    applyBrand(root, m.accent, m.finish);
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

    if (personalized) {
      document.title = `${m.name} · ${cfg.label} website direction · Front of House`;
    }

    // The one-tap vibe switch names its destination
    const vibeBtn = document.querySelector("[data-foh-vibe]");
    if (vibeBtn) {
      const otherIdx = m.vibe === cfg.vibes[0] ? 1 : 0;
      const label = `Switch to the ${cfg.vibeLabels[otherIdx] || "other"} vibe`;
      vibeBtn.setAttribute("aria-label", label);
      vibeBtn.setAttribute("title", label);
    }
  }

  // ── Brand color picker (inside the intake) ──
  const picker = form?.querySelector("[data-brand-picker]");
  const customInput = document.getElementById("intake-brand-custom");
  const brandStatus = picker?.querySelector("[data-brand-status]");
  const CHECK =
    '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>';
  const NOTE =
    '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 8v5M12 16.5v.01"/></svg>';

  function formVibe() {
    return validVibe(form?.querySelector('input[name="vibe"]:checked')?.value);
  }
  function formFinish() {
    return form?.querySelector('input[name="finish"]:checked')?.value === "tonal" ? "tonal" : "solid";
  }
  function formAccent() {
    const r = picker?.querySelector('input[name="brand"]:checked');
    if (!r || !r.value) return "";
    return r.value === "custom" ? normalizeHex(customInput?.value) || "" : normalizeHex(r.value) || "";
  }

  // Suggestions are fitted to the vibe's background, so rebuild them
  // whenever the vibe changes. Keeps the visitor's slot selection.
  function buildSwatches(vibe) {
    if (!picker) return;
    root.setAttribute("data-vibe", vibe);
    const { bg, fg, vibeAccent } = applyBrand(root, "", "solid");
    const tChip = picker.querySelector("[data-brand-template]");
    if (tChip) tChip.style.setProperty("--chip", vibeAccent || "#ccc");
    const list = bg ? suggest(bg, fg, vibeAccent) : [];
    picker.querySelectorAll("[data-brand-slot]").forEach((slot, i) => {
      const sug = list[i];
      slot.hidden = !sug;
      if (!sug) return;
      slot.querySelector("input").value = sug.hex;
      slot.querySelector(".intake__chip").style.setProperty("--chip", sug.hex);
      slot.querySelector(".intake__swatch-name").textContent = sug.name;
      slot.title = `${sug.name} ${sug.hex}`;
    });
  }

  function previewBrand() {
    if (!form) return;
    const vibe = formVibe();
    root.setAttribute("data-vibe", vibe);
    const accent = formAccent();
    const { fit } = applyBrand(root, accent, formFinish());
    if (!brandStatus) return;
    if (!fit) {
      brandStatus.dataset.state = "template";
      brandStatus.textContent = "Using this template's own color.";
    } else if (fit.weak) {
      brandStatus.dataset.state = "adjusted";
      brandStatus.innerHTML = `${NOTE}<span>This color is hard to read on this background. We used the closest readable shade, ${fit.accent}.</span>`;
    } else if (fit.adjusted) {
      brandStatus.dataset.state = "adjusted";
      brandStatus.innerHTML = `${NOTE}<span>Deepened slightly to ${fit.accent} so it stays readable (${fit.ratio.toFixed(1)}:1).</span>`;
    } else {
      brandStatus.dataset.state = "ok";
      brandStatus.innerHTML = `${CHECK}<span>Readable on this background, ${fit.ratio.toFixed(1)}:1.</span>`;
    }
  }

  function prefillBrand() {
    if (!picker) return;
    const m = merged();
    buildSwatches(m.vibe);
    const radios = [...picker.querySelectorAll('input[name="brand"]')];
    let match = radios.find((r) => r.value && r.value !== "custom" && r.value === m.accent);
    if (!match && m.accent) {
      match = radios.find((r) => r.value === "custom");
      if (customInput) customInput.value = m.accent;
    }
    (match || radios[0]).checked = true;
    const fin = form.querySelector(`input[name="finish"][value="${m.finish}"]`);
    if (fin) fin.checked = true;
    previewBrand();
  }

  picker?.addEventListener("change", (e) => {
    if (e.target.name === "brand" || e.target.name === "finish") previewBrand();
  });
  // The color well sits on top of the Custom chip: using it selects Custom.
  customInput?.addEventListener("input", () => {
    const r = picker.querySelector('input[name="brand"][value="custom"]');
    if (r) r.checked = true;
    previewBrand();
  });

  // ── Intake overlay ──
  function prefillIntake() {
    if (!form) return;
    const m = merged();
    nameInput.value = state.name || "";
    cityInput.value = state.city || "";
    cityInput.placeholder = cfg.defaults.city;
    tagInput.value = state.tag || "";
    tagInput.placeholder = cfg.defaults.tag;
    const radio = form.querySelector(`input[name="vibe"][value="${m.vibe}"]`);
    if (radio) radio.checked = true;
    setNameError("");
    prefillBrand();
  }

  function openIntake() {
    if (!dialog) return;
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

  // Vibe cards preview live behind the overlay
  form?.querySelectorAll('input[name="vibe"]').forEach((radio) => {
    radio.addEventListener("change", () => {
      buildSwatches(validVibe(radio.value));
      previewBrand();
    });
  });

  form?.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = nameInput.value.trim();
    if (!name) {
      setNameError(NAME_MSG);
      nameInput.focus();
      return;
    }
    const vibe = form.querySelector('input[name="vibe"]:checked')?.value;
    state = { name };
    const city = cityInput.value.trim();
    const tag = tagInput.value.trim();
    if (city) state.city = city;
    if (tag) state.tag = tag;
    if (vibe) state.vibe = validVibe(vibe);
    const accent = formAccent();
    if (accent) state.accent = accent.slice(1);
    if (formFinish() === "tonal") state.finish = "tonal";
    personalized = true;

    store(cfg.slug, state);
    syncUrl(state);
    apply();
    dialog.close();

    // One restrained reveal moment (CSS keys off this class;
    // prefers-reduced-motion collapses it globally).
    root.classList.remove("is-revealed");
    void root.offsetWidth;
    root.classList.add("is-revealed");
    window.scrollTo({ top: 0, behavior: "instant" });
  });

  // Esc / "keep browsing" closes without answers: restore the real vibe
  dialog?.addEventListener("close", () => {
    apply();
  });
  dialog
    ?.querySelector("[data-intake-skip]")
    ?.addEventListener("click", () => dialog.close());

  document
    .querySelectorAll("[data-foh-edit]")
    .forEach((btn) => btn.addEventListener("click", openIntake));

  // ── One-tap vibe switch in the FOH bar ──
  document.querySelector("[data-foh-vibe]")?.addEventListener("click", () => {
    const next = merged().vibe === cfg.vibes[0] ? cfg.vibes[1] : cfg.vibes[0];
    state.vibe = next;
    store(cfg.slug, state);
    syncUrl(state);
    apply();
  });

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
    if (reduce || !("IntersectionObserver" in window)) {
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

  // ── Boot ──
  if (personalized) {
    store(cfg.slug, state);
    syncUrl(state);
  }
  apply();
  root.classList.add("is-ready");
  if (!personalized) {
    // Let the default site paint first so the intake reads as an
    // overlay on a real page, not a gate in front of a blank one.
    setTimeout(openIntake, 350);
  }
}
