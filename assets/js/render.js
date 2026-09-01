/* ---------------------------------------------------------------------------
   render.js — turns the files in /content into the page.

   There is no portfolio text in this file. To change wording, edit /content.

   LAYOUT MODEL
   A horizontal deck of seven sections. Each is one deck-width wide and
   scrolls vertically on its own:

       horizontal  =  section to section
       vertical    =  content inside a section

   So a section is written here as an ordinary vertical column. It may be
   taller than the screen — that is expected, and it is why sections scroll.

   THE LIST IS THE UNIT
   Research, work, experience, education and news are all the same shape: an
   editorial list of rows separated by hairlines, not a grid of cards. A row
   is `number · title · one line · area`, with a `+` when there is more. Keep
   it that way — cards are what make a portfolio look like every other one.

   Moving between sections is done by the fixed edge navigation (left and
   right, vertically centred), the numbered header nav, or the arrow keys.
   Sections carry no controls of their own.
--------------------------------------------------------------------------- */

import { h, list, isFilled, reveal } from "./dom.js";
import { site } from "../../content/site.js";
import { links, profileLinks } from "../../content/links.js";
import { about } from "../../content/about.js";
import { news } from "../../content/news.js";
import { research } from "../../content/research.js";
import { experience } from "../../content/experience.js";
import { projects } from "../../content/projects.js";
import { skills } from "../../content/skills.js";
import { education } from "../../content/education.js";
import { honors } from "../../content/honors.js";
import { tagFamilies, fallback } from "../../content/tags.js";
import { overview } from "../../content/overview.js";
import { themeButton } from "./theme.js";

const num = (i) => String(i + 1).padStart(2, "0");

/* ---------- tags ----------
   A tag is coloured by what it is, not by where it sits: `Computer vision` is
   the same teal in Research, in Work and in Skills. The vocabulary is in
   content/tags.js and the seven colours are in tokens.css; this only does the
   lookup and writes the family onto the element for CSS to bind. */

/* Flattened once at module load — the lookup runs for every tag on the page.
   Sorted longest-keyword-first so `c++` is tested before `c`, otherwise every
   label containing a c would come back as a language. */
const TAG_INDEX = Object.entries(tagFamilies)
  .flatMap(([family, keywords]) => keywords.map((keyword) => [keyword, family]))
  .sort((a, b) => b[0].length - a[0].length);

const TAG_EXACT = new Map(TAG_INDEX.map(([keyword, family]) => [keyword, family]));

function tagFamily(label) {
  const key = String(label).trim().toLowerCase();
  if (TAG_EXACT.has(key)) return TAG_EXACT.get(key);
  const hit = TAG_INDEX.find(([keyword]) => key.includes(keyword));
  return hit ? hit[1] : fallback;
}

/**
 * One tag. `data-family` is what the stylesheet binds --tag to, so no colour
 * is ever named in this file.
 */
function tag(label) {
  return h("li", { class: "tag", "data-family": tagFamily(label), text: label });
}

/** A row of tags, or nothing at all when the list is empty. */
function tags(items, extraClass = "") {
  const list = (items || []).filter(isFilled);
  if (!list.length) return null;
  return h("ul", { class: `tags${extraClass ? " " + extraClass : ""}` }, list.map(tag));
}

const DECK = site.nav;
const indexOfSection = (id) => DECK.findIndex((item) => item.id === id);

/* ---------- section shell ---------- */

/**
 * `bare: true` drops the numbered eyebrow and the `<h2>`. Only the hero uses
 * it: a section heading reading "01 / About me" directly above a 56px name is
 * a label on top of a label, and the name is already the heading. The section
 * keeps its id, its accent and its place in the nav — only the visible header
 * goes.
 */
function section(id, children, { label, bare } = {}) {
  const i = indexOfSection(id);
  const heading = label || DECK[i].label;

  return h(
    "section",
    {
      class: id === "top" ? "section section--home" : "section",
      id,
      "data-section": true,
      "aria-label": heading,
      tabindex: "-1",
    },
    h(
      "div",
      { class: "frame section__inner" },
      /* The label leads the section's entry stagger; items follow from 1.
         The rule under it draws itself open as the section arrives — see
         `.section__rule` in site.css §5. It is the section's accent at its
         most saturated, and the only place that colour appears at full
         strength, which is what makes it read as a heading mark rather than
         as decoration. */
      /* The eyebrow and the title are two lines now, not one. `03 / RESEARCH`
         set small was doing both jobs and doing neither: it read as metadata,
         so a reader scanning the page had nothing to catch. The number stays
         small as an index; the name becomes an actual heading. */
      bare
        ? null
        : reveal(
        h(
          "header",
          { class: "section__head" },
          /* Just the index. The slash used to separate the number from the
             name; the name is the heading below now, so the slash separated
             nothing and read as an unfinished line. */
          h("p", { class: "section__eyebrow" },
            h("span", { class: "section__num", text: num(i) })),
          h("h2", { class: "section__title", text: heading }),
          h("span", { class: "section__rule", "aria-hidden": "true" })
        ),
        0
      ),
      /* `aria-label` on the <section> still names it for a screen reader, so
         a bare section is not an unlabelled landmark. */
      h("div", { class: "section__body" }, children)
    )
  );
}

/* ---------- list rows ---------- */

/**
 * A row in an editorial list.
 *
 * `lead`    what sits in the left column — a number, a date, or THESIS
 * `areas`   the tags under the row: fields, categories, tools
 * `stage`   the status pill above the title — "Accepted", "In progress"
 * `state`   what that pill is coloured by: "done" or "ongoing"
 * `mark`    the affordance on the right: "+" (expands) or "→" (a link)
 * `details` the node revealed by the +, or null
 * `href`    makes the whole row a link instead
 *
 * Order inside the row is fixed and means something: title, then the
 * sentence, then grey metadata, then the tags last. The tags are the most
 * saturated thing in the row, so they go at the bottom where they anchor it
 * rather than competing with the title for the first glance.
 */
function row({ lead, leadKind, title, description, meta, areas, aside, stage, state, details, href, external }) {
  const head = [
    h("span", { class: "row__lead", "data-kind": leadKind || "plain", text: lead || "" }),
    h(
      "span",
      { class: "row__main" },
      /* The status pill. It sits ABOVE the title rather than beside it: a
         reader scanning the list is answering "is this finished?" before
         they read what it is, and a pill on the same line as the title
         competes with the title for the first glance. `data-state` is what
         the stylesheet colours it by — see `.row__status` in site.css. */
      isFilled(stage) && h("span", { class: "row__status", "data-state": state || "done", text: stage }),
      h("span", { class: "row__title", text: title }),
      isFilled(description) && h("span", { class: "row__desc", text: description }),
      /* THE FOOTER IS ONE LINE, NOT THREE.
         Metadata, the one coloured fact, and the tags are all the same kind of
         thing — what this row IS, as opposed to what it says — so they share a
         line and wrap together instead of stacking into three more rows. On
         fourteen cards that was most of a screen of height, and stacked they
         read as three separate afterthoughts rather than as one footer. */
      (isFilled(meta) || isFilled(aside) || (areas || []).length)
        ? h(
            "span",
            { class: "row__foot" },
            isFilled(meta) && h("span", { class: "row__meta", text: meta }),
            /* One fact worth colouring on its own — a grade, a standing.
               Accent, so it is found before the grey metadata beside it. */
            isFilled(aside) && h("span", { class: "row__aside", text: aside }),
            tags(areas)
          )
        : null
    ),
  ];

  if (href) {
    return h(
      "a",
      {
        class: "row row--link",
        href,
        ...(external ? { target: "_blank", rel: "noopener" } : {}),
      },
      ...head,
      h("span", { class: "row__mark row__mark--arrow", "aria-hidden": "true", text: "→" })
    );
  }

  if (!details) {
    return h("div", { class: "row" }, ...head);
  }

  return h(
    "details",
    { class: "row row--expand" },
    h(
      "summary",
      { class: "row__head" },
      ...head,
      h("span", { class: "row__mark", "aria-hidden": "true" })
    ),
    h("div", { class: "row__body" }, details)
  );
}

function field(label, text) {
  if (!isFilled(text)) return null;
  return h(
    "div",
    { class: "field" },
    h("p", { class: "field__label", text: label }),
    h("p", { class: "field__text", text })
  );
}

function outLink(href, label, external = true) {
  if (!isFilled(href)) return null;
  return h("a", {
    class: "outlink",
    href,
    ...(external ? { target: "_blank", rel: "noopener" } : {}),
    text: label,
  });
}

/* ---------- the top bar ---------- */

/**
 * A sticky bar: section links on the left, theme control on the right, and on
 * a narrow screen a Menu button that folds the links away.
 *
 * IT CARRIES NO NAME. The hero underneath sets the name at 56px and it is the
 * first thing on the page — repeating it in the bar would be the second time a
 * reader is told who this is before they have read anything. The bar exists to
 * get from one section to another and to hold the theme control, and it is
 * sized so that it never competes with the content it scrolls over.
 *
 * The numbers came off the links too. `01 ABOUT ME` set small read as a table
 * of contents; the sections still carry their own numbered eyebrow, which is
 * where an index belongs.
 */
export function renderTopbar(mount) {
  const nav = h(
    "nav",
    { class: "topbar__nav", id: "site-nav", "aria-label": "Sections" },
    DECK.map((item) =>
      h(
        "a",
        { class: "navlink", href: `#${item.id}`, "data-goto": item.id },
        h("span", { class: "navlink__label", text: item.label })
      )
    )
  );

  const toggle = h("button", {
    class: "topbar__toggle",
    type: "button",
    "aria-expanded": "false",
    "aria-controls": "site-nav",
    text: "Menu",
  });

  const setOpen = (open) => {
    nav.dataset.open = String(open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.textContent = open ? "Close" : "Menu";
  };
  toggle.addEventListener("click", () => setOpen(nav.dataset.open !== "true"));
  nav.addEventListener("click", (event) => {
    if (event.target.closest(".navlink")) setOpen(false);
  });

  mount.append(
    h(
      "div",
      { class: "topbar__in frame" },
      nav,
      h("div", { class: "topbar__end" }, themeButton(), toggle)
    )
  );
}

/* ---------- icons ----------
   Five line marks, drawn here rather than pulled from a library: the site has
   no dependencies and five glyphs do not justify starting. All are one stroke
   weight in currentColor at 13px, so they sit as quiet punctuation in front
   of the contact text rather than as logos.

   THERE IS NO .svg FILE FOR THESE. Editing one means editing this object.
   (The sun and moon live in theme.js; the favicon is a data URI in both
   index.html and photography.html.)

   HOW TO WRITE AN ENTRY. Three forms, in order of how often you want them:

     name: '<circle .../><path .../>'                inner markup, 16×16 grid
     name: { paths: '…', viewBox: '0 0 24 24' }      a different grid
     name: { paths: '…', solid: true }               a filled icon, not stroked

   The default is stroke-drawn on a 16×16 grid, because that is what the other
   five are and what `.icon` in site.css is set up to paint: it forces
   `fill: none; stroke: currentColor`. **A filled icon pasted in without
   `solid: true` renders completely invisible** — the CSS overrides its fill,
   and it looks exactly like the edit did nothing. That was worth a comment.

   Pasting a whole `<svg>…</svg>` document is handled rather than punished:
   `icon()` unwraps it, adopts its viewBox, and warns once in the console. It
   still reads better to paste the inner markup. */

const ICONS = {
  /* Solid 24×24 glyphs. These were stroke-drawn abstractions before — a
     circle on a line standing in for GitHub, an outlined square for LinkedIn —
     which read as decoration rather than as the services they point at. On a
     CV the reader should recognise a Scholar profile without reading the
     label beside it.

     Solid rather than outlined because these are brand marks and brand marks
     are drawn as filled silhouettes; `solid: true` is what tells site.css to
     paint them instead of stroking them. See the note above `icon()`. */
  email: {
    viewBox: "0 0 24 24", solid: true,
    paths: '<path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>',
  },
  github: {
    viewBox: "0 0 24 24", solid: true,
    paths: '<path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>',
  },
  linkedin: {
    viewBox: "0 0 24 24", solid: true,
    paths: '<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>',
  },
  /* The mortarboard over a disc — Scholar's own mark. */
  scholar: {
    viewBox: "0 0 24 24", solid: true,
    paths: '<path d="M5.242 13.769L0 9.5 12 0l12 9.5-5.242 4.269C17.548 11.249 14.978 9.5 12 9.5c-2.977 0-5.548 1.748-6.758 4.269zM12 10a7 7 0 1 0 0 14 7 7 0 0 0 0-14z"/>',
  },
  /* A page with its corner turned. */
  cv: {
    viewBox: "0 0 24 24", solid: true,
    paths: '<path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>',
  },
};


function icon(name) {
  const entry = ICONS[name];
  if (!entry) return null;

  const spec = typeof entry === "string" ? { paths: entry } : { ...entry };
  let { paths, viewBox, solid } = spec;
  if (!paths) return null;

  /* A pasted `<svg>…</svg>` would otherwise become an svg inside an svg —
     measured at 10×10 inside the 13×13 parent, wrong scale, wrong grid, and
     silent. Unwrap it, take its viewBox if one was not given, and say so. */
  const wrapped = paths.trim().match(/^<svg\b([^>]*)>([\s\S]*)<\/svg>\s*$/i);
  if (wrapped) {
    const vb = wrapped[1].match(/viewBox\s*=\s*["']([^"']+)["']/i);
    if (vb && !viewBox) viewBox = vb[1];
    paths = wrapped[2];
    console.warn(
      `icon("${name}"): a full <svg> element was pasted into ICONS. It has been ` +
      `unwrapped${vb ? ` and its viewBox (${vb[1]}) adopted` : ""}, but the entry ` +
      `should hold the inner markup only — see the note above ICONS in render.js.`
    );
  }

  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("class", "icon");
  svg.setAttribute("viewBox", viewBox || "0 0 16 16");
  svg.setAttribute("aria-hidden", "true");
  svg.setAttribute("focusable", "false");
  /* Read by site.css to swap the paint over: filled, not stroked. */
  if (solid) svg.setAttribute("data-solid", "true");
  svg.innerHTML = paths;
  return svg;
}

/* ---------- 01 profile ---------- */

/**
 * The bio's three bits of markup:
 *
 *     [BUET](https://buet.ac.bd)      a link — any URL, or a local path
 *     **objective design**            a marked phrase — bold, underlined
 *     {photography|behind a camera}   the photography page, specifically
 *
 * The first two are the markdown spellings on purpose rather than more brace
 * forms. They are the syntaxes everybody already knows, and the bio is the file
 * a non-programmer is most likely to edit.
 *
 * THEY NEST, AND THAT WAS NOT TRUE AT FIRST.
 *
 *     **[TigerIT](https://tigerit.com/)**
 *
 * is the obvious thing to write for a link that should also be bold, and the
 * first version of this parser matched the `**` in one flat pass, took
 * everything between the stars as literal text, and printed the brackets and
 * the URL onto the page. Anyone marking a link would hit it immediately.
 *
 * `parseInline` is recursive for that reason. It terminates because the inner
 * pattern of each form excludes its own delimiter — `[^*]+` inside `**…**` and
 * `[^\]]+` inside `[…]` — so nothing can contain another copy of itself.
 *
 * A LINK OPENS IN A NEW TAB ONLY IF IT LEAVES THE SITE. `https://…` gets
 * `target="_blank"` and `rel="noopener"`; `assets/cv.pdf` or `photography.html`
 * does not, because taking over the tab is correct for your own pages and rude
 * for someone else's.
 *
 * WHAT DESERVES A MARK. Where you studied, the idea your work is actually
 * about, what has landed, and what you are asking for. Not adjectives, and not
 * more than a handful — the marks are a path through the paragraph for someone
 * skimming it, and a paragraph where six things are important has nothing
 * important in it.
 */
const BIO_PATTERN =
  /\{([a-z-]+)\|([^}]+)\}|\[([^\]]+)\]\(([^)\s]+)\)|\*\*([^*]+)\*\*/;

function parseInline(text) {
  /* A FRESH REGEX PER CALL. A shared /g regex carries `lastIndex` between
     calls, so a recursive parse re-entering it would resume from wherever the
     outer scan had reached and silently drop the start of the inner string. */
  const pattern = new RegExp(BIO_PATTERN.source, "g");
  const nodes = [];
  let cursor = 0;
  let match;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > cursor) nodes.push(text.slice(cursor, match.index));

    const [, target, label, linkText, href, marked] = match;

    if (marked !== undefined) {
      nodes.push(h("strong", { class: "mark" }, parseInline(marked)));
    } else if (href !== undefined) {
      const external = /^https?:/i.test(href);
      nodes.push(
        h(
          "a",
          {
            class: "link",
            href,
            ...(external ? { target: "_blank", rel: "noopener" } : {}),
          },
          parseInline(linkText)
        )
      );
    } else if (target === "photography") {
      /* Always a link now. The page carries its own empty state, and the
         request was for photography to be discoverable from the bio rather
         than conditional on there being albums yet. */
      nodes.push(
        h(
          "a",
          { class: "link--aside", href: "photography.html" },
          label,
          h("span", { class: "link--aside__mark", "aria-hidden": "true", text: "→" })
        )
      );
    } else {
      nodes.push(label);
    }
    cursor = match.index + match[0].length;
  }

  if (cursor < text.length) nodes.push(text.slice(cursor));
  return nodes;
}

function bioParagraph(text) {
  return h("p", {}, parseInline(text));
}

/**
 * The controls under the bio: the CV as a labelled button, every other profile
 * as an icon button beside it.
 *
 * `style: "action"` in content/links.js is what marks the labelled one. Every
 * other row becomes an icon, and gets both `aria-label` and `title` — the
 * glyph is the whole visible content, so the accessible name is the only name
 * it has. A row with a blank URL in content/links.js disappears here, which is
 * still how a link is switched off.
 */
function contactRow() {
  const rows = profileLinks.filter((item) => isFilled(links[item.key]));

  const action = rows.find((item) => item.style === "action");
  const rest = rows.filter((item) => item.style !== "action");

  const label = (item) =>
    item.text ||
    item.label ||
    (item.key === "email" ? "Email" : item.key[0].toUpperCase() + item.key.slice(1));

  return h(
    "div",
    { class: "actions" },
    action
      ? h(
          "a",
          {
            class: "btn",
            href: links[action.key],
            "aria-label": action.label || "Curriculum vitae",
          },
          icon(action.key),
          h("span", { text: action.label || "Curriculum vitae" })
        )
      : null,
    h(
      "div",
      { class: "iconrow" },
      rest.map((item) => {
        const raw = links[item.key];
        const href = item.key === "email" ? `mailto:${raw}` : raw;
        const external = /^https?:/.test(href);
        return h(
          "a",
          {
            class: "iconbtn",
            "data-key": item.key,
            href,
            title: label(item),
            "aria-label": label(item),
            ...(external ? { target: "_blank", rel: "noopener" } : {}),
          },
          icon(item.key)
        );
      })
    )
  );
}


/**
 * The hero, and the whole of section 01.
 *
 * Name, what you do and where, the bio, then one row of controls — CV first as
 * a labelled button, the profiles after it as icon buttons — with the portrait
 * beside all of it. That is the arrangement almost every academic homepage
 * arrives at, and it is what replaced the fixed identity rail.
 *
 * WHY THE PROFILES ARE ICONS AND THE CV IS NOT. Four services a reader may
 * want once do not deserve four lines of text; the CV is the one thing a
 * committee actually opens, so it keeps its label and the visual weight of a
 * real button. Every icon still carries an `aria-label` and a `title`, so
 * nothing is only available to someone who recognises the glyph.
 */
function renderProfile() {
  /* The one line a PhD admissions reader is looking for, directly under the
     role. Green whatever section it is in: that colour means "available" here
     and nothing else. */
  const status = site.availability.show
    ? h(
        "p",
        { class: "status" },
        h("span", { class: "status__dot", "aria-hidden": "true" }),
        h("span", { class: "status__text", text: site.availability.text })
      )
    : null;

  /* The figures block from the old overview — four numbers and three linked
     lines — is behind `overview.show` in content/overview.js and is off. The
     reasoning lives there rather than here. `statement` is still live. */
  const figures = overview.show
    ? [
        h(
          "ul",
          { class: "glance__facts" },
          overview.facts.map((f) =>
            h(
              "li",
              { class: "glance__fact" },
              h(
                "span",
                { class: "glance__value" },
                f.value,
                isFilled(f.unit) ? h("span", { class: "glance__unit", text: f.unit }) : null
              ),
              h("span", { class: "glance__note", text: f.note })
            )
          )
        ),
        h(
          "ul",
          { class: "glance__points" },
          overview.highlights.map((hl) =>
            h(
              "li",
              {},
              h("span", { class: "glance__text", text: hl.text }),
              h("a", {
                class: "glance__jump",
                href: `#${hl.to}`,
                "data-goto": hl.to,
                text: hl.label,
              })
            )
          )
        ),
      ]
    : [];

  const portrait = isFilled(about.portrait && about.portrait.src)
    ? h(
        "figure",
        { class: "hero__figure" },
        h("img", {
          class: "hero__photo",
          src: about.portrait.src,
          alt: about.portrait.alt || "",
          decoding: "async",
          fetchpriority: "high",
          width: "400",
          height: "500",
        })
      )
    : null;

  const text = h(
    "div",
    { class: "hero__text" },
    h("h1", { class: "hero__name", text: site.name }),
    h("p", { class: "hero__role", text: site.roles.join(" · ") }),
    status,
    isFilled(overview.statement)
      ? h("p", { class: "hero__lede", text: overview.statement })
      : null,
    h("div", { class: "bio__text" }, about.bio.map((p) => bioParagraph(p))),
    figures,
    contactRow()
  );

  return section("top", [reveal(h("div", { class: "hero" }, text, portrait), 0)], { bare: true });
}

/* ---------- 02 news ---------- */

function renderNews() {
  const items = news.items.map((item, i) => {
    const extra = [];
    if (isFilled(item.details)) extra.push(h("p", { class: "row__text", text: item.details }));
    if (isFilled(item.link)) extra.push(outLink(item.link, item.linkLabel || "Read more"));

    return reveal(
      row({
        lead: item.date,
        /* A news date is a label, not a column of numbers: it gets an
           outlined chip in the section accent. See `.row__lead[data-kind]`. */
        leadKind: "date",
        title: item.title,
        description: item.summary,
        details: extra.length ? extra : null,
      }),
      i + 1
    );
  });

  return section("news", h("div", { class: "rows rows--news" }, items), {
    label: news.heading,
  });
}

/* ---------- 03 research ---------- */

/**
 * What opens behind the + on a research card.
 *
 * Order is fixed and it is the order a committee reads in: WHERE it landed
 * first — venue, track, dates, identifiers — then problem, approach, my part,
 * then the measured outcome and the links. Putting the venue first is the
 * whole point of the card; a reader should never have to leave it to find out
 * whether the work is published and where.
 *
 * Every field disappears when it is empty, so an ongoing item with no venue
 * and no results renders as problem/approach/contribution and nothing else.
 */
function researchDetail(item) {
  const d = item.details || {};
  return [
    field("Venue", d.venue),
    field("Problem", d.problem),
    field("Approach", d.approach),
    field("Contribution", d.contribution),
    isFilled(d.results)
      ? h(
          "p",
          { class: "result" },
          h("span", { class: "result__label", text: "Results" }),
          h("span", { text: d.results })
        )
      : null,
    (item.links || []).length
      ? h(
          "p",
          { class: "row__links" },
          item.links.map((l) => outLink(l.href, l.label))
        )
      : null,
  ].filter(Boolean);
}

function renderResearch() {
  const body = [];

  body.push(
    reveal(
      h(
        "div",
        { class: "intro-block" },
        /* The interests are the section's thesis statement in tag form, and
           the one place tags are set a size larger. */
        tags(research.interests, "tags--lead"),
        isFilled(research.statement)
          ? h("p", { class: "lede", text: research.statement })
          : null
      ),
      0
    )
  );

  /* THE TWO SUB-LISTS.
     content/research.js decides the order and the wording; this only sorts
     the items into them. Numbering stays GLOBAL — the index comes from the
     item's position in `research.items`, not from its position in its group,
     so no two cards on the page carry the same number and moving an item
     between groups never renumbers the other one.

     A group with nothing in it does not render, heading included. That is
     what lets `ongoing` be emptied out without leaving a promise on the page
     that the section cannot keep. */
  const GROUPS = research.groups && research.groups.length
    ? research.groups
    : [{ id: "done", heading: "" }];

  const card = (item, i) => {
    /* An empty array is truthy, so it has to be nulled here or a card with
       nothing behind the + still renders as expandable. */
    const detail = researchDetail(item);

    return reveal(
      row({
        lead: item.kind === "thesis" ? "Thesis" : num(i),
        leadKind: item.kind === "thesis" ? "mark" : "num",
        stage: item.stage,
        state: item.status || "done",
        title: item.title,
        description: item.description,
        meta: item.meta,
        areas: item.areas,
        details: detail.length ? detail : null,
      }),
      i + 1
    );
  };

  GROUPS.forEach((group, g) => {
    const inGroup = research.items
      .map((item, i) => [item, i])
      .filter(([item]) => (item.status || "done") === group.id);

    if (!inGroup.length) return;

    body.push(
      reveal(
        h(
          "div",
          { class: "group" },
          h(
            "div",
            { class: "group__head" },
            h("h3", { class: "group__title", "data-state": group.id, text: group.heading }),
            /* The count is the honest version of the heading: "Ongoing" with
               nothing under it would be a claim, "Ongoing 01" is a fact. */
            h("span", { class: "group__count", text: num(inGroup.length - 1) }),
            h("span", { class: "group__rule", "aria-hidden": "true" })
          ),
          isFilled(group.note) ? h("p", { class: "group__note", text: group.note }) : null,
          h("div", { class: "rows" }, inGroup.map(([item, i]) => card(item, i)))
        ),
        g + 1
      )
    );
  });

  /* The research statement, off behind `direction.show` in
     content/research.js — the reasoning for that is written there. */
  if (research.direction && research.direction.show) {
    body.push(
      reveal(
        h(
          "div",
          { class: "block" },
          h("h3", { class: "block__title", text: research.direction.heading }),
          h("div", { class: "prose" }, research.direction.text.map((t) => h("p", { text: t })))
        ),
        3
      )
    );
  }

  // if (research.publications && research.publications.length) {
  //   body.push(
  //     reveal(
  //       h(
  //         "div",
  //         { class: "block" },
  //         h("h3", { class: "block__title", text: "Publications" }),
  //         h(
  //           "ul",
  //           { class: "pubs" },
  //           research.publications.map((pub) =>
  //             h(
  //               "li",
  //               {},
  //               isFilled(pub.link)
  //                 ? h("a", {
  //                     class: "link",
  //                     href: pub.link,
  //                     target: "_blank",
  //                     rel: "noopener",
  //                     text: pub.citation,
  //                   })
  //                 : pub.citation,
  //               isFilled(pub.note) && h("span", { class: "pubs__note", text: pub.note })
  //             )
  //           )
  //         )
  //       ),
  //       4
  //     )
  //   );
  // }

  return section("research", body, { label: research.heading });
}

/* ---------- 04 projects ---------- */

function renderProjects() {
  const body = [];

  if (isFilled(projects.intro)) {
    body.push(reveal(h("p", { class: "lede", text: projects.intro }), 0));
  }

  /* Every card is a link — `href` is required in content/projects.js, and the
     whole row is the anchor rather than a "view repo" affordance tucked in a
     corner. A project card that does not go to the code is a claim. */
  const items = projects.items.map((item, i) =>
    reveal(
      row({
        lead: num(i),
        leadKind: "num",
        title: item.title,
        description: item.description,
        meta: item.meta,
        areas: item.areas,
        href: item.href || undefined,
        external: true,
      }),
      i + 1
    )
  );

  body.push(h("div", { class: "rows" }, items));

  /* The closing line. See the `more` note in content/projects.js for why the
     section says out loud that it is a selection. */
  const more = projects.more || {};
  if (isFilled(more.label)) {
    const href = isFilled(more.href) ? more.href : links.github;
    body.push(
      reveal(
        h(
          "p",
          { class: "more" },
          isFilled(more.text) ? h("span", { class: "more__text", text: more.text }) : null,
          outLink(href, more.label)
        ),
        items.length + 1
      )
    );
  }

  return section("projects", body, { label: projects.heading });
}

/* ---------- 05 experience ---------- */

/** The only chart on the site. Bars are drawn to scale from real numbers. */
function metricChart(metric) {
  if (!metric || !metric.rows || metric.rows.length < 2) return null;

  const values = metric.rows.map((r) => Number(r.value));
  const scale = Math.max(...values);
  const best = metric.lowerIsBetter ? Math.min(...values) : Math.max(...values);

  return h(
    "figure",
    { class: "metric" },
    h(
      "figcaption",
      { class: "metric__head" },
      h("span", { class: "metric__label", text: metric.label }),
      isFilled(metric.delta) && h("span", { class: "metric__delta", text: metric.delta })
    ),
    h(
      "div",
      { class: "metric__rows" },
      metric.rows.map((r) => {
        const value = Number(r.value);
        const width = scale > 0 ? value / scale : 0;
        return h(
          "div",
          { class: value === best ? "metric__row metric__row--best" : "metric__row" },
          h("span", { class: "metric__name", text: r.label }),
          h(
            "span",
            { class: "metric__track", "aria-hidden": "true" },
            h("span", { class: "metric__fill", style: `--w:${width.toFixed(4)}` })
          ),
          h("span", { class: "metric__value", text: String(r.value) })
        );
      })
    ),
    isFilled(metric.note) && h("p", { class: "metric__note", text: metric.note })
  );
}

function renderExperience() {
  const items = experience.items.map((job, i) => {
    const detail = [
      job.points && job.points.length
        ? h("ul", { class: "points" }, job.points.map((p) => h("li", { text: p })))
        : null,
      metricChart(job.metric),
    ].filter(Boolean);

    return reveal(
      row({
        lead: job.period,
        leadKind: "date",
        title: job.organization,
        description: job.role,
        /* The location is grey metadata; the stack is what a reader is
           actually scanning a job for, so it comes out from behind the + and
           onto the row as tags. */
        meta: job.location,
        areas: job.technologies,
        details: detail.length ? detail : null,
      }),
      i + 1
    );
  });

  return section("experience", h("div", { class: "rows rows--wide" }, items), {
    label: experience.heading,
  });
}

/* ---------- 06 education ---------- */

function renderEducation() {
  const items = education.items.map((item, i) => {
    const detail = [
      field("Thesis", item.thesis),
      item.courses && item.courses.length
        ? h(
            "div",
            { class: "field" },
            h("p", { class: "field__label", text: "Notable coursework" }),
            tags(item.courses)
          )
        : null,
    ].filter(Boolean);

    return reveal(
      row({
        lead: item.period,
        leadKind: "date",
        title: item.shortName || item.school,
        description: item.degree,
        /* The result is the number a committee looks for, so it is drawn in
           the section accent rather than left as grey metadata. */
        meta: item.school !== (item.shortName || item.school) ? item.school : "",
        areas: null,
        details: detail.length ? detail : null,
        aside: item.result,
      }),
      i + 1
    );
  });

  const body = [h("div", { class: "rows rows--wide" }, items)];

  if (honors.items && honors.items.length) {
    body.push(
      reveal(
        h(
          "div",
          { class: "block" },
          h("h3", { class: "block__title", text: honors.heading }),
          h(
            "div",
            { class: "rows rows--tight" },
            honors.items.map((item) =>
              row({
                lead: item.year,
                leadKind: "date",
                title: item.title,
                description: item.detail,
              })
            )
          )
        ),
        items.length
      )
    );
  }

  return section("education", body, { label: education.heading });
}

/* ---------- 07 skills & closing ---------- */

function renderSkills() {
  const body = [
    h(
      "div",
      { class: "skills" },
      skills.groups.map((group, i) =>
        reveal(
          h(
            "div",
            { class: "skillgroup" },
            h("p", { class: "skillgroup__label", text: group.group }),
            /* Coloured per item, by the same taxonomy as everywhere else —
               not per group. The groups happen to be homogeneous enough that
               each row reads as one colour anyway, and where it does not
               (OpenCV sitting in ML / AI) the odd one out is telling the
               truth about what the tool is. One rule, no exceptions. */
            tags(group.items, "tags--skills")
          ),
          i
        )
      )
    ),
  ];

  /* The name-and-location line that used to close this section has moved into
     the page footer, where it belongs — a section should not be signing the
     document. See `renderFooter`. */
  return section("skills", body, { label: skills.heading });
}

/* ---------- page ---------- */

const SECTIONS = {
  top: renderProfile,
  news: renderNews,
  research: renderResearch,
  projects: renderProjects,
  experience: renderExperience,
  education: renderEducation,
  skills: renderSkills,
};

/**
 * The page footer.
 *
 * WHY IT REPEATS THE CONTACTS. The fixed identity rail this site used to have
 * guaranteed the email, the profiles and the CV were on screen at every
 * moment. The top bar that replaced it carries navigation and nothing else, so
 * a reader who has just finished the last section is as far from the hero as
 * it is possible to be. Making them scroll back up to find an address is the
 * exact friction the rail existed to remove, and a footer costs one screen of
 * height to remove it again.
 *
 * It is the same `contactRow()` the hero uses, not a second implementation —
 * one CV button, the profiles as icons, and a link that disappears when its
 * URL in content/links.js is blank.
 */
export function renderFooter(mount) {
  if (!mount) return;

  const f = site.footer || {};

  const identity = h(
    "div",
    { class: "pagefoot__id" },
    h("p", { class: "pagefoot__name", text: site.name }),
    h("p", {
      class: "pagefoot__meta",
      text: [site.roles.join(" · "), site.location].filter(Boolean).join(" · "),
    }),
    isFilled(f.signoff) ? h("p", { class: "pagefoot__signoff", text: f.signoff }) : null
  );

  const bar = h(
    "div",
    { class: "pagefoot__bar" },
    isFilled(f.note) ? h("p", { class: "pagefoot__note", text: f.note }) : null,
    /* `data-goto` is what nav.js listens for, so this honours reduced motion
       and moves focus with the page rather than only the scroll position. */
    h(
      "a",
      { class: "pagefoot__top", href: "#top", "data-goto": "top" },
      "Back to top",
      h("span", { "aria-hidden": "true", text: " ↑" })
    )
  );

  mount.append(
    h(
      "div",
      { class: "pagefoot__in frame" },
      h("div", { class: "pagefoot__row" }, identity, contactRow()),
      bar
    )
  );
}

export function renderFlow(mount) {
  mount.append(
    ...DECK.map((item) => (SECTIONS[item.id] ? SECTIONS[item.id]() : null)).filter(Boolean)
  );
}
