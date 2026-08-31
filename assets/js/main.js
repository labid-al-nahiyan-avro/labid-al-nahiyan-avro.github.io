/* ---------------------------------------------------------------------------
   main.js — homepage entry point.
--------------------------------------------------------------------------- */

import { site } from "../../content/site.js";
import { renderTopbar, renderFlow, renderFooter } from "./render.js";
import { playIntro, INTRO_DONE } from "./intro.js";
import { setupNav } from "./nav.js";
import { setupTheme } from "./theme.js";
import { setupAmbient } from "./ambient.js";

const topbar = document.querySelector("[data-topbar]");
const flow = document.querySelector("[data-flow]");
const foot = document.querySelector("[data-foot]");

/* Metadata comes from content too, so the tab title lives in one place. */
document.title = site.meta.title;
const description = document.querySelector('meta[name="description"]');
if (description) description.setAttribute("content", site.meta.description);

/* The opening card is written into index.html so it can paint immediately;
   only its words come from content. */
const introName = document.querySelector("[data-intro-name]");
const introRoles = document.querySelector("[data-intro-roles]");
if (introName) introName.textContent = site.name;
if (introRoles) introRoles.textContent = site.roles.join("  ·  ");

renderTopbar(topbar);
setupTheme(document.querySelector("[data-theme-btn]"));
renderFlow(flow);
renderFooter(foot);

const navLinks = Array.from(document.querySelectorAll(".navlink"));
const sections = Array.from(flow.querySelectorAll("[data-section]"));

setupNav({
  sections,
  onSectionChange(section) {
    navLinks.forEach((link) => {
      if (link.getAttribute("href") === `#${section.id}`) {
        link.setAttribute("aria-current", "true");
      } else {
        link.removeAttribute("aria-current");
      }
    });

    /* The top bar and the ambient ground sit outside the section, so they
       cannot inherit its --accent. Copy the active value up to <html> and both
       follow along; sections still override it for their own subtree, so
       nothing inside them changes. This is also what makes the background
       drift from one section's colour to the next. */
    const accent = getComputedStyle(section).getPropertyValue("--accent").trim();
    if (accent) document.documentElement.style.setProperty("--accent", accent);
  },
});

/* Failsafe. Reveals are driven by an observer; if that never fires — an odd
   browser, a bug — the content would stay invisible for good. Nothing on this
   site is allowed to depend on an animation having run. */
window.setTimeout(() => {
  document.querySelectorAll(".reveal:not(.is-in)").forEach((el) => el.classList.add("is-in"));
}, 3400);

/* Gated by content/site.js. Off while the background concept is still being
   chosen — the layer's markup stays in index.html and is simply never turned
   on, so there is no half-removed state to clean up later. */
if (site.ambient && site.ambient.enabled) setupAmbient();

if (site.intro.enabled) {
  playIntro(document.querySelector("[data-intro]"));
} else {
  const node = document.querySelector("[data-intro]");
  if (node) node.remove();
  document.documentElement.classList.add("intro-done");
  document.dispatchEvent(new CustomEvent(INTRO_DONE));
}
