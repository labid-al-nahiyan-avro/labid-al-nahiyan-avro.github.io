# Labid Al Nahiyan — Portfolio

A fast, modular, static portfolio site. No build step, no frameworks — just open and edit.

## How it's organized

```
Portfolio/
├── data.txt                # ← ALL your text lives here. Edit this. (plain text)
├── index.html              # homepage shell
├── case-study.html         # research case-study page (loads ?id=...)
├── assets/
│   ├── cv.pdf              # ← drop your CV here (named exactly cv.pdf)
│   ├── css/
│   │   ├── variables.css   # ← colors, fonts, spacing (theme control panel)
│   │   ├── base.css        # resets & typography
│   │   ├── layout.css      # nav, hero, sections, footer
│   │   └── components.css  # cards, buttons, chips, animations
│   └── js/
│       ├── data-loader.js  # reads data.txt (don't edit)
│       ├── render.js       # builds the page from your data (don't edit)
│       └── animations.js   # gentle fade-in + active nav (visual only)
└── README.md
```

## Editing your site

**To change any text** (bio, projects, publications, links): open **`data.txt`** in any
text editor and edit the text after each `KEY:`. That is the only file you need.

- Add an item (a project, paper, etc.) by copying one `[BLOCK]` section and editing it.
- Remove an item by deleting its whole `[BLOCK]`.
- Hide a link by leaving its value blank, e.g. `SCHOLAR:`
- Keep each value on a single line (long lines are fine).

**To add your CV:** save your PDF as `assets/cv.pdf`.

**To set your links:** fill in `SCHOLAR:` and `ORCID:` in `data.txt` when you have them.

**To restyle:** open `assets/css/variables.css` and change `--accent`, the background
colors, or the fonts. Everything updates automatically. Dark-mode values live in the same
file.

**To add a new research case study:** copy a `[RESEARCH]` block in `data.txt`, give it a
unique `ID:`, and fill in the fields. The homepage card and its
`case-study.html?id=...` page are generated for you.

> Note: because the site reads `data.txt`, preview it with a local server (below) rather
> than double-clicking `index.html`. On GitHub Pages it just works.

## Preview locally

Open a terminal in this folder and run:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`. (Opening `index.html` directly also works for most
things, but a local server matches how it behaves when deployed.)

## Deploy free on GitHub Pages

1. Create a repo named `labid-al-nahiyan.github.io` (use your exact GitHub username).
2. Push these files to the `main` branch:
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio"
   git branch -M main
   git remote add origin https://github.com/labid-al-nahiyan/labid-al-nahiyan.github.io.git
   git push -u origin main
   ```
3. In the repo: **Settings → Pages → Source: Deploy from branch → main / root → Save.**
4. Your site goes live at `https://labid-al-nahiyan.github.io` in ~1 minute.

To update later: edit `content.js`, then `git commit` and `git push`. Live in seconds.

## Accessibility & performance notes
- Respects `prefers-reduced-motion` and `prefers-color-scheme`.
- Skip link, focus styles, semantic landmarks, and screen-reader labels included.
- No external dependencies except Google Fonts; everything else is local.
