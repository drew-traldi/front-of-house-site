const FILTER_KEYS = ["format", "priority", "mood"];
const STORAGE_KEY = "foh-direction-catalog";

function parseState(cards) {
  const params = new URLSearchParams(window.location.search);
  const known = new Set([...cards].map((card) => card.dataset.directionSlug));
  const fromUrl = {
    format: params.get("format") || "",
    priority: params.get("priority") || "",
    mood: params.get("mood") || "",
    directions: (params.get("directions") || "")
      .split(",")
      .filter((slug) => known.has(slug))
      .slice(0, 2),
  };

  if (FILTER_KEYS.some((key) => fromUrl[key]) || fromUrl.directions.length) {
    return fromUrl;
  }

  try {
    const stored = JSON.parse(sessionStorage.getItem(STORAGE_KEY) || "");
    return {
      format: typeof stored.format === "string" ? stored.format : "",
      priority: typeof stored.priority === "string" ? stored.priority : "",
      mood: typeof stored.mood === "string" ? stored.mood : "",
      directions: Array.isArray(stored.directions)
        ? stored.directions.filter((slug) => known.has(slug)).slice(0, 2)
        : [],
    };
  } catch {
    return fromUrl;
  }
}

function values(card, key) {
  return (card.dataset[key] || "").split(" ").filter(Boolean);
}

export function initDirectionCatalog() {
  const root = document.querySelector("[data-direction-filters]");
  const cards = [...document.querySelectorAll("[data-direction-card]")];
  if (!root || !cards.length) return;

  const results = document.querySelector("[data-direction-results]");
  const empty = document.querySelector("[data-catalog-empty]");
  const briefBar = document.querySelector("[data-brief-bar]");
  const briefSummary = document.querySelector("[data-brief-summary]");
  const briefLink = document.querySelector("[data-brief-link]");
  const filterButtons = [...root.querySelectorAll("[data-filter-group]")];
  const clearButtons = [...document.querySelectorAll("[data-clear-filters]")];
  const clearFilters = root.querySelector("[data-clear-filters]");
  const clearBrief = document.querySelector("[data-clear-brief]");
  const cardLabels = new Map(
    cards.map((card) => [
      card.dataset.directionSlug,
      card.querySelector("h3")?.textContent?.trim() || "A direction",
    ]),
  );

  let state = parseState(cards);
  let note = "";

  const sync = () => {
    const params = new URLSearchParams(window.location.search);
    FILTER_KEYS.forEach((key) => {
      if (state[key]) params.set(key, state[key]);
      else params.delete(key);
    });
    if (state.directions.length) params.set("directions", state.directions.join(","));
    else params.delete("directions");
    const query = params.toString();
    history.replaceState(null, "", `${window.location.pathname}${query ? `?${query}` : ""}`);
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // The URL is the durable share path if storage is unavailable.
    }
  };

  const render = () => {
    let count = 0;
    cards.forEach((card) => {
      const matches = FILTER_KEYS.every(
        (key) => !state[key] || values(card, key).includes(state[key]),
      );
      card.hidden = !matches;
      if (matches) count += 1;

      const add = card.querySelector("[data-add-to-brief]");
      const selected = state.directions.includes(card.dataset.directionSlug);
      if (add) {
        add.setAttribute("aria-pressed", String(selected));
        add.textContent = selected ? "In your brief" : "Add to brief";
      }
    });

    filterButtons.forEach((button) => {
      const selected = state[button.dataset.filterGroup] === button.dataset.filterValue;
      button.setAttribute("aria-pressed", String(selected));
    });

    const hasFilters = FILTER_KEYS.some((key) => state[key]);
    if (clearFilters) clearFilters.hidden = !hasFilters;
    if (empty) empty.hidden = count !== 0;
    if (results) {
      results.textContent = note || `Showing ${count} of ${cards.length} directions${hasFilters ? " for your choices" : ""}.`;
    }

    if (briefBar) briefBar.hidden = state.directions.length === 0;
    if (briefSummary) {
      const labels = state.directions.map((slug) => cardLabels.get(slug));
      briefSummary.textContent = labels.length
        ? `${labels.join(" and ")} ${labels.length === 1 ? "is" : "are"} in your brief.`
        : "Choose up to two directions.";
    }
    if (briefLink) {
      const params = new URLSearchParams();
      if (state.directions.length) params.set("directions", state.directions.join(","));
      briefLink.href = `/templates/brief${params.toString() ? `?${params.toString()}` : ""}`;
    }
    sync();
  };

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const group = button.dataset.filterGroup;
      const value = button.dataset.filterValue;
      if (!FILTER_KEYS.includes(group) || !value) return;
      state[group] = state[group] === value ? "" : value;
      note = "";
      render();
    });
  });

  cards.forEach((card) => {
    const add = card.querySelector("[data-add-to-brief]");
    add?.addEventListener("click", () => {
      const slug = card.dataset.directionSlug;
      if (!slug) return;
      if (state.directions.includes(slug)) {
        state.directions = state.directions.filter((entry) => entry !== slug);
        note = "";
      } else if (state.directions.length === 2) {
        note = "Your build brief can hold two directions. Remove one before adding another.";
      } else {
        state.directions = [...state.directions, slug];
        note = "";
      }
      render();
    });
  });

  clearButtons.forEach((button) =>
    button.addEventListener("click", () => {
      state.format = "";
      state.priority = "";
      state.mood = "";
      note = "";
      render();
    }),
  );

  clearBrief?.addEventListener("click", () => {
    state.directions = [];
    note = "";
    render();
  });

  window.addEventListener("popstate", () => {
    state = parseState(cards);
    note = "";
    render();
  });

  render();
}
