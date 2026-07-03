// ─────────────────────────────────────────────────────────────
// Demo template personalization.
// Reads the visitor's answers (URL params → sessionStorage → none),
// fills every [data-slot] in the demo, sets the vibe palette, and
// drives the 60-second intake overlay + the FOH frame bar.
// No backend: URLs are shareable, state survives MPA navigation.
// ─────────────────────────────────────────────────────────────

const PARAMS = ["name", "city", "vibe", "tag"];

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
    };
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

    // CTA links carry the full context to /contact
    const q = new URLSearchParams({ template: cfg.label });
    if (personalized) {
      q.set("restaurant", m.name);
      if (state.city) q.set("city", state.city);
      if (state.tag) q.set("tag", state.tag);
      q.set("vibe", m.vibe);
    }
    document
      .querySelectorAll("a[data-foh-cta]")
      .forEach((a) => (a.href = `/contact?${q.toString()}`));

    if (personalized) {
      document.title = `${m.name} · ${cfg.label} spec template · Front of House`;
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
      root.setAttribute("data-vibe", validVibe(radio.value));
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
    root.setAttribute("data-vibe", merged().vibe);
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
