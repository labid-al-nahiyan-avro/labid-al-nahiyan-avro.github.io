/* ---------------------------------------------------------------------------
   theme.js — the light / dark control.

   THE STYLESHEET DOES THE WORK, NOT THIS FILE. tokens.css carries both
   palettes. All this does is decide which one is on, and remember it.

   Two states:

       (no attribute)        light — the default
       data-theme="dark"     dark
       data-theme="light"    light, written explicitly once the visitor has
                             chosen it, so the choice survives a reload

   THE SITE DEFAULTS TO LIGHT AND DOES NOT FOLLOW THE SYSTEM. There used to be
   a third state — no attribute meant "follow `prefers-color-scheme`" — and the
   control cycled light, dark, back to system. That was removed by request:
   light is the design the page is meant to be met in, and a visitor whose
   laptop is set to dark was being shown a different site than the one that was
   designed. The matching `@media (prefers-color-scheme: dark)` block is gone
   from tokens.css, and the note there says how to put both halves back.

   The choice is stored in localStorage and re-applied by the inline script in
   <head>, before the first paint. It has to be inline: a module is deferred,
   so restoring the choice here would paint light first and snap to dark.
   This file only handles the click.
--------------------------------------------------------------------------- */

/* The control's markup lives here rather than in render.js because the
   photography page has no header to render and still needs the button. */
export function themeButton() {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("class", "themebtn__mark");
  svg.setAttribute("viewBox", "0 0 16 16");
  svg.setAttribute("aria-hidden", "true");
  svg.setAttribute("focusable", "false");
  svg.innerHTML =
    '<g class="themebtn__sun"><circle cx="8" cy="8" r="3.1"/>' +
    '<path d="M8 1.4v1.6M8 13v1.6M14.6 8h-1.6M3 8H1.4M12.7 3.3l-1.1 1.1M4.4 11.6l-1.1 1.1M12.7 12.7l-1.1-1.1M4.4 4.4 3.3 3.3"/></g>' +
    '<g class="themebtn__moon"><path d="M13.2 9.7A5.8 5.8 0 0 1 6.3 2.8a5.9 5.9 0 1 0 6.9 6.9Z"/></g>';
  const btn = document.createElement("button");
  btn.className = "themebtn";
  btn.type = "button";
  btn.setAttribute("data-theme-btn", "true");
  btn.append(svg);
  return btn;
}

const KEY = "labid-theme";
const ORDER = ["light", "dark"];

const root = document.documentElement;

/** Which theme is on. No attribute means light, because light is the default. */
function current() {
  return root.getAttribute("data-theme") === "dark" ? "dark" : "light";
}

/** Kept as a named export: what is on screen is now the same as what is set,
 *  but callers should not have to know that. */
export function resolved() {
  return current();
}

function apply(mode) {
  root.setAttribute("data-theme", mode);
  try { localStorage.setItem(KEY, mode); } catch (e) {}
}

/**
 * Wires up a button. The label says what you are looking at, and the
 * `aria-label` says what pressing it will do — a switch that only announces
 * its own state leaves a screen reader guessing at the outcome.
 */
export function setupTheme(button) {
  if (!button) return;

  const label = () => {
    const mode = current();
    const next = ORDER[(ORDER.indexOf(mode) + 1) % ORDER.length];
    button.dataset.mode = mode;
    button.dataset.resolved = mode;
    button.setAttribute("aria-label", `Theme: ${mode}. Switch to ${next}.`);
  };

  button.addEventListener("click", () => {
    apply(ORDER[(ORDER.indexOf(current()) + 1) % ORDER.length]);
    label();
  });

  label();
}
