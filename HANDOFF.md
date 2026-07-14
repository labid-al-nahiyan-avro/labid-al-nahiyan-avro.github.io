# Portfolio project — handoff summary

Paste this into a new conversation to continue work on the site.

## Who / goal
Labid Al Nahiyan — building an academic portfolio website to support **PhD applications**.
Positioning: *"researcher in the reliability and evaluation of large language models, with a
focus on safety and alignment failures."* Lead with the published safety paper; CV/vision
work is supporting evidence of methodological range.

## Key CV facts (already in the site)
- **arXiv:2512.01037** — "When Safety Blocks Sense: Semantic Confusion in LLM Refusals"
  (co-author, Dec 2025). Introduced ParaGuard (10k-prompt corpus) + Confusion
  Index/Rate/Depth metrics. This is the hero / featured research item.
- **Undergrad thesis (BUET)** — custom size-aware, gradient-stabilized loss for dense crowd
  tracking; beats CIoU/DIoU/GIoU on JHU-CROWD++ and SCUT-HEAD.
- **TigerIT, ML Engineer** (Aug 2025–present) — 41% FNMR reduction on NIST MINEX III; custom
  loss for elastic distortion; 100k+ image pipeline.
- Projects: Shop Genie (LLM/RAG), NerdHerd (SvelteKit), C compiler (Flex/Bison/YACC).
- Honor: Champion, OpenAPI Hackathon (ICT Fest 2024).

## Decisions made
- **Stack:** plain static HTML/CSS/JS, no framework, no build step (chosen for longevity +
  easy editing). Host free on **GitHub Pages** (repo `labid-al-nahiyan.github.io`).
- **Structure:** single-page homepage + per-research **case-study pages**
  (`case-study.html?id=...`, generated from data).
- **Content is plain text:** everything editable lives in **`data.txt`** (KEY: value lines +
  `[BLOCK]` sections). `assets/js/data-loader.js` parses it into `window.CONTENT`;
  `assets/js/render.js` builds the DOM. CSS split into `variables.css` (theme control
  panel) / base / layout / components.
- **Design:** warm & light — cream `#fdf8f1` background, terracotta `#b35a2f` accent, honey
  secondary; Fraunces (serif headings) + Inter (body); light/dark toggle.
- **Motion:** deliberately minimal per user — gentle fade-in only (no slide/lift), short
  transitions (`--t-fast` / `--t-base`).

## File map
```
Portfolio/
├── data.txt                 ← edit this for all content
├── index.html, case-study.html
├── assets/
│   ├── cv.pdf
│   ├── css/ variables.css · base.css · layout.css · components.css
│   └── js/  data-loader.js · render.js · animations.js
├── README.md                ← editing + GitHub Pages deploy guide
└── site-map-and-wireframe.md
```

## Important quirk
The site reads `data.txt` via fetch, so **preview with a local server**
(`python3 -m http.server 8000` → `http://localhost:8000`), NOT by double-clicking the HTML.
Works automatically on GitHub Pages.

## Status
Site is built and tested (both render paths verified). Pre-filled with real CV content.

## Open to-dos
- User to paste **Google Scholar** + **ORCID** URLs into `data.txt` (left blank for now).
- A few duplicate CV/resume PDFs sit in the folder root — safe to delete; only
  `assets/cv.pdf` is used.
- Not yet done: refine the research-interests statement + case-study copy in the user's own
  voice; deploy to GitHub Pages; optional preview.
