# Portfolio Site Map & Wireframe Spec

**Owner:** Labid Al Nahiyan
**Positioning:** CS researcher — reliability & evaluation of large language models, with a focus on safety and alignment failures.
**Architecture:** Single-page scroll homepage + 2 dedicated research case-study pages.

---

## Homepage section order (top → bottom)

| # | Section | Above fold? | Content | What committees look for |
|---|---------|-------------|---------|--------------------------|
| — | Sticky nav | yes | Name + anchor links (About, Research, Publications, Projects, CV, Contact) | Easy navigation |
| 1 | Hero | yes | Name, one-line research identity, links (arXiv, Scholar, GitHub, CV) | Instant clarity on who + field |
| 2 | Research interests | yes (top) | 2–3 short paragraphs anchored on LLM reliability & safety | Focus and lab fit |
| 3 | Research (core) | on scroll | Two cards → link to case-study pages | Depth, individual contribution, rigor |
| 4 | Publications | on scroll | Formal citations w/ links (preprint + thesis) | Scholarly output |
| 5 | Selected projects | on scroll | Engineering grid: Shop Genie, C compiler, NerdHerd | Breadth, systems-building |
| 6 | Experience | on scroll | TigerIT ML Engineer — quantified R&D metrics | Funded research readiness |
| 7 | Skills | on scroll | ML/Research · Languages · Tools | Practical readiness |
| 8 | Honors | on scroll | Hackathon champion, contest placement | Extra signal |
| 9 | Contact / footer | on scroll | Email, GitHub, LinkedIn, Scholar, ORCID | Verification + reach |

**Cut for now:** Teaching section (no TA experience yet), public References list.

---

## Research case-study page template

Each of the two research items gets its own page with this arc:

1. **Title block** — title, role, date, venue/arXiv ID, tags
2. **The problem** — the gap/question and why it matters
3. **Approach / contribution** — your specific role + the core idea
4. **Method** — how it works (figure/diagram optional)
5. **Results** — key findings, a number or chart
6. **Reflection / next steps** — open questions, what you'd extend
7. **Links** — paper, code, BibTeX

### Case study 1 — When Safety Blocks Sense (Semantic Confusion)
Published, arXiv:2512.01037. ParaGuard 10k-prompt corpus; Confusion Index/Rate/Depth metrics; embeddings + perplexity signals. **This is the hero.**

### Case study 2 — Loss Function for Dense Crowd Tracking
Undergrad thesis (BUET, Prof. A.B.M. Alim Al Islam). Size-aware gradient-stabilized loss; YOLO integration; beats CIoU/DIoU/GIoU on JHU-CROWD++ and SCUT-HEAD.

---

## Design principles
- Single-page = skimmable in <90s, instant load, mobile-friendly, one clear narrative.
- Lead with research substance over visual flair.
- Every claim verifiable via a link.
- Through-line connecting all work: *designs ways to measure and improve ML systems*.
- Modern, minimal aesthetic; responsive; speed-optimized.

## Open to-do before build
- Create an ORCID iD (makes the preprint look official).
- Confirm Google Scholar profile link.
- Decide hosting (e.g. GitHub Pages) and whether to use a framework or plain HTML/CSS.
