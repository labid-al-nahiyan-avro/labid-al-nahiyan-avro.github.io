/* =====================================================================
   app.js — loads data.txt, renders the page, wires up small interactions
   ---------------------------------------------------------------------
   You should never need to edit this file to change content.
   Edit data.txt instead.
   ===================================================================== */

(function () {
  "use strict";

  /* ============ 1. PARSER ============
     data.txt format:
       KEY: value          → top-level field (repeated keys become arrays)
       [BLOCK]             → starts a new item in a list (RESEARCH, PROJECT…)
       # comment           → ignored
  */
  function parseData(text) {
    var data = { blocks: {} };
    var current = null; // { type, obj }

    text.split(/\r?\n/).forEach(function (raw) {
      var line = raw.trim();
      if (!line || line.charAt(0) === "#") return;

      var blockMatch = line.match(/^\[([A-Z]+)\]$/);
      if (blockMatch) {
        var type = blockMatch[1];
        if (!data.blocks[type]) data.blocks[type] = [];
        current = {};
        data.blocks[type].push(current);
        return;
      }

      var kv = line.match(/^([A-Z]+):\s*(.*)$/);
      if (!kv) return;
      var key = kv[1], value = kv[2];

      var target = current || data;
      if (target[key] === undefined) {
        target[key] = value;
      } else if (Array.isArray(target[key])) {
        target[key].push(value);
      } else {
        target[key] = [target[key], value];
      }
    });

    return data;
  }

  // Always treat a field as an array (POINT, ABOUT, …)
  function asList(v) {
    if (v === undefined || v === "") return [];
    return Array.isArray(v) ? v : [v];
  }

  /* ============ 2. HTML HELPERS ============ */
  function esc(s) {
    return String(s || "").replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function el(html) {
    var t = document.createElement("template");
    t.innerHTML = html.trim();
    return t.content.firstElementChild;
  }

  function linkPill(label, href, accent) {
    if (!href) return "";
    var cls = accent ? "pill pill--accent" : "pill";
    var ext = href.indexOf("http") === 0 ? ' target="_blank" rel="noopener"' : "";
    return '<a class="' + cls + '" href="' + esc(href) + '"' + ext + ">" + esc(label) + "</a>";
  }

  // A mono eyebrow that names a section's role, followed by its title.
  function sectionHead(kicker, title) {
    return (
      '<div class="section-head">' +
        '<p class="eyebrow">' + esc(kicker) + "</p>" +
        '<h2>' + esc(title) + "</h2>" +
      "</div>"
    );
  }

  /* ============ 3. SECTION RENDERERS ============ */

  function renderHero(d) {
    var links = [
      linkPill("Email", d.EMAIL ? "mailto:" + d.EMAIL : ""),
      linkPill("CV", d.CV, true),
      linkPill("Research statement", d.STATEMENT),
      linkPill("GitHub", d.GITHUB),
      linkPill("LinkedIn", d.LINKEDIN),
      linkPill("Google Scholar", d.SCHOLAR),
      linkPill("ORCID", d.ORCID),
      linkPill("arXiv", d.ARXIV)
    ].join("");

    // Portrait now lives in the left rail (see renderRail); the hero is a
    // single comfortable text column.
    return el(
      '<section class="hero fade" id="home">' +
        '<div class="hero__text">' +
          '<p class="hero__role">' + esc(d.ROLE) + "</p>" +
          "<h1>" + esc(d.NAME) + "</h1>" +
          '<p class="hero__tagline">' + esc(d.TAGLINE) + "</p>" +
          '<p class="hero__affiliation">' + esc(d.AFFILIATION) + "</p>" +
          '<div class="hero__links">' + links + "</div>" +
        "</div>" +
      "</section>"
    );
  }

  // Left rail: framed portrait + the two newest updates ("Latest").
  // Standard scholar-site pattern — an author card that stays in view.
  function renderRail(d) {
    var photo = d.PHOTO
      ? '<div class="instrument" aria-label="Portrait of ' + esc(d.NAME) + '">' +
          '<div class="instrument__frame">' +
            '<img class="instrument__photo" src="' + esc(d.PHOTO) + '" alt="Portrait of ' +
            esc(d.NAME) + '" onerror="this.closest(\'.instrument\').remove()" />' +
          "</div>" +
        "</div>"
      : "";

    var news = asList(d.blocks && d.blocks.NEWS).slice(0, 2);
    var latest = "";
    if (news.length) {
      var rows = news.map(function (n) {
        var text = n.LINK
          ? esc(n.TEXT) + ' <a href="' + esc(n.LINK) +
            (n.LINK.indexOf("http") === 0 ? '" target="_blank" rel="noopener">' : '">') +
            (esc(n.LINKLABEL) || "details") + "</a>"
          : esc(n.TEXT);
        return (
          '<li class="latest__item">' +
            '<span class="latest__date">' + esc(n.DATE) + "</span>" +
            '<span class="latest__text">' + text + "</span>" +
          "</li>"
        );
      }).join("");
      latest =
        '<div class="latest">' +
          '<p class="eyebrow">Latest</p>' +
          '<ul class="latest__list">' + rows + "</ul>" +
          '<a class="latest__all" href="#news">All updates →</a>' +
        "</div>";
    }

    if (!photo && !latest) return null;
    return el('<aside class="rail" aria-label="At a glance">' + photo + latest + "</aside>");
  }

  function renderNews(items) {
    var rows = items.map(function (n) {
      var text = n.LINK
        ? esc(n.TEXT) + ' <a href="' + esc(n.LINK) +
          (n.LINK.indexOf("http") === 0 ? '" target="_blank" rel="noopener">' : '">') +
          (esc(n.LINKLABEL) || "details") + "</a>"
        : esc(n.TEXT);
      return (
        '<li class="news__item">' +
          '<span class="news__date">' + esc(n.DATE) + "</span>" +
          '<span class="news__text">' + text + "</span>" +
        "</li>"
      );
    }).join("");

    return el(
      '<section class="container fade" id="news">' +
        sectionHead("Recent", "News") +
        '<ul class="news">' + rows + "</ul>" +
      "</section>"
    );
  }

  function renderAbout(d) {
    var paras = asList(d.ABOUT).map(function (p) {
      return "<p>" + esc(p) + "</p>";
    }).join("");

    return el(
      '<section class="container fade" id="about">' +
        sectionHead("What I want to study", d.ABOUTHEADING || "About") +
        paras +
      "</section>"
    );
  }

  // Shared by the research cards and the slide-over panel
  var DETAIL_FIELDS = [
    ["PROBLEM", "Problem"],
    ["CONTRIBUTION", "My contribution"],
    ["METHOD", "Method"],
    ["RESULTS", "Results"],
    ["REFLECTION", "Looking ahead"]
  ];

  function hasDetails(r) {
    return DETAIL_FIELDS.some(function (f) { return r[f[0]]; });
  }

  function renderResearch(items) {
    var cards = items.map(function (r, i) {
      var featured = (r.FEATURED || "").toLowerCase() === "yes";
      var title = r.LINK
        ? '<a href="' + esc(r.LINK) + '" target="_blank" rel="noopener">' + esc(r.TITLE) + "</a>"
        : esc(r.TITLE);

      var tags = asList(r.TAGS ? r.TAGS.split(",") : []).map(function (t) {
        return '<span class="tag">' + esc(t.trim()) + "</span>";
      }).join("");

      var more = hasDetails(r)
        ? '<button class="card__more" type="button" data-research="' + i + '">' +
          "Read the full story →</button>"
        : "";

      return (
        '<article class="card' + (featured ? " card--featured" : "") + '">' +
          '<p class="card__meta">' + esc(r.DATE) + (r.VENUE ? " · " + esc(r.VENUE) : "") + "</p>" +
          '<h3 class="card__title">' + title + "</h3>" +
          '<p class="card__role">' + esc(r.ROLE) + "</p>" +
          '<p class="card__summary">' + esc(r.SUMMARY) + "</p>" +
          '<div class="tags">' + tags + "</div>" +
          more +
        "</article>"
      );
    }).join("");

    return el(
      '<section class="container fade" id="research">' +
        sectionHead("Where I go deep", "Research") + cards +
      "</section>"
    );
  }

  function renderPublications(items) {
    var pubs = items.map(function (p) {
      var link = p.LINK
        ? ' · <a href="' + esc(p.LINK) + '" target="_blank" rel="noopener">link</a>'
        : "";
      return (
        '<div class="pub">' +
          '<p class="pub__citation">' + esc(p.CITATION) + "</p>" +
          '<p class="pub__note">' + esc(p.NOTE) + link + "</p>" +
        "</div>"
      );
    }).join("");

    return el(
      '<section class="container fade" id="publications">' +
        sectionHead("On the record", "Publications") +
        '<div class="pubs">' + pubs + "</div>" +
      "</section>"
    );
  }

  function renderExperience(items) {
    var xps = items.map(function (x) {
      var points = asList(x.POINT).map(function (p) {
        return "<li>" + esc(p) + "</li>";
      }).join("");
      return (
        '<div class="xp">' +
          '<div class="xp__head">' +
            '<h3 class="xp__org">' + esc(x.ORG) + "</h3>" +
            '<span class="xp__date">' + esc(x.DATE) + "</span>" +
          "</div>" +
          '<p class="xp__title">' + esc(x.TITLE) + (x.LOCATION ? " · " + esc(x.LOCATION) : "") + "</p>" +
          "<ul>" + points + "</ul>" +
        "</div>"
      );
    }).join("");

    return el(
      '<section class="container fade" id="experience">' +
        sectionHead("In production", "Experience") + xps +
      "</section>"
    );
  }

  function renderProjects(items) {
    var cards = items.map(function (p) {
      var name = p.LINK
        ? '<a href="' + esc(p.LINK) + '" target="_blank" rel="noopener">' + esc(p.NAME) + "</a>"
        : esc(p.NAME);
      return (
        '<div class="project">' +
          "<h3>" + name + "</h3>" +
          "<p>" + esc(p.BLURB) + "</p>" +
          '<span class="tech">' + esc(p.TECH) + "</span>" +
        "</div>"
      );
    }).join("");

    return el(
      '<section class="container fade" id="projects">' +
        sectionHead("Systems I've built", "Selected projects") +
        '<div class="projects">' + cards + "</div>" +
      "</section>"
    );
  }

  function renderBackground(d) {
    var rows = "";

    asList(d.blocks.EDUCATION).forEach(function (e) {
      rows +=
        '<div class="row"><dt>Education</dt><dd>' + esc(e.SCHOOL) +
        '<br><span class="sub">' + esc(e.DEGREE) + " · " + esc(e.DATE) + "</span></dd></div>";
    });

    asList(d.blocks.HONOR).forEach(function (h) {
      rows +=
        '<div class="row"><dt>Honor</dt><dd>' + esc(h.TITLE) +
        '<br><span class="sub">' + esc(h.DETAIL) + "</span></dd></div>";
    });

    asList(d.blocks.SKILLS).forEach(function (s) {
      rows +=
        '<div class="row"><dt>' + esc(s.GROUP) + "</dt><dd>" + esc(s.ITEMS) + "</dd></div>";
    });

    return el(
      '<section class="container fade" id="background">' +
        sectionHead("Education · skills · honors", "Background") +
        "<dl>" + rows + "</dl>" +
      "</section>"
    );
  }

  function renderFooter(d) {
    var email = d.EMAIL
      ? 'Reach me at <a href="mailto:' + esc(d.EMAIL) + '">' + esc(d.EMAIL) + "</a>."
      : "";
    return el(
      '<footer class="footer"><div class="container">' +
        "<p>" + email + "</p>" +
        "<p>© " + new Date().getFullYear() + " " + esc(d.NAME) + "</p>" +
      "</div></footer>"
    );
  }

  /* ============ 3.5 SLIDE-OVER DETAIL PANEL ============
     Desktop: half-page panel from the right.
     Mobile (≤640px): bottom sheet (see style.css).
     Closes via: × button, clicking the dimmed area, or Escape.
  */
  function setupPanel(items) {
    if (!items.length) return;

    var overlay = el('<div class="panel-overlay"></div>');
    var panel = el(
      '<aside class="panel" role="dialog" aria-modal="true" aria-label="Research details">' +
        '<button class="panel__close" type="button" aria-label="Close details">✕</button>' +
        '<div class="panel__body"></div>' +
      "</aside>"
    );
    document.body.appendChild(overlay);
    document.body.appendChild(panel);

    var body = panel.querySelector(".panel__body");
    var closeBtn = panel.querySelector(".panel__close");
    var lastTrigger = null;

    function buildDetail(r) {
      var blocks = DETAIL_FIELDS
        .filter(function (f) { return r[f[0]]; })
        .map(function (f) {
          return '<div class="detail-block"><h4>' + f[1] + "</h4><p>" + esc(r[f[0]]) + "</p></div>";
        }).join("");

      var link = r.LINK
        ? '<p class="panel__link"><a class="pill pill--accent" href="' + esc(r.LINK) +
          '" target="_blank" rel="noopener">Read the paper ↗</a></p>'
        : "";

      return (
        '<p class="panel__meta">' + esc(r.DATE) + (r.VENUE ? " · " + esc(r.VENUE) : "") + "</p>" +
        '<h3 class="panel__title">' + esc(r.TITLE) + "</h3>" +
        '<p class="panel__role">' + esc(r.ROLE) + "</p>" +
        blocks + link
      );
    }

    function open(item, trigger) {
      lastTrigger = trigger;
      body.innerHTML = buildDetail(item);
      panel.scrollTop = 0;
      overlay.classList.add("open");
      panel.classList.add("open");
      document.body.style.overflow = "hidden"; // lock background scroll
      closeBtn.focus();
    }

    function close() {
      overlay.classList.remove("open");
      panel.classList.remove("open");
      document.body.style.overflow = "";
      if (lastTrigger) lastTrigger.focus();
    }

    overlay.addEventListener("click", close);
    closeBtn.addEventListener("click", close);
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && panel.classList.contains("open")) close();
    });

    // One listener for every "Read the full story" button
    document.addEventListener("click", function (e) {
      var btn = e.target.closest ? e.target.closest("[data-research]") : null;
      if (!btn) return;
      var item = items[parseInt(btn.getAttribute("data-research"), 10)];
      if (item) open(item, btn);
    });
  }

  /* ============ 4. NAV, THEME, FADE-IN ============ */

  // Section labels + anchors for the top nav. Edit/reorder these to match
  // the sections you keep in data.txt — this is the one place nav lives.
  var NAV_ITEMS = [
    ["News", "#news"],
    ["Research", "#research"],
    ["Publications", "#publications"],
    ["Experience", "#experience"],
    ["Projects", "#projects"],
    ["Background", "#background"]
  ];

  function setupNav(d) {
    var brand = document.querySelector("[data-brand]");
    if (brand && d.NAME) brand.textContent = d.NAME;

    // Only show nav links whose section actually rendered, so removing a
    // section from data.txt removes its nav link automatically.
    var nav = document.querySelector("[data-nav]");
    nav.innerHTML = NAV_ITEMS.filter(function (item) {
      return document.getElementById(item[1].slice(1));
    }).map(function (item) {
      return '<a href="' + item[1] + '">' + item[0] + "</a>";
    }).join("");

    var btn = document.querySelector("[data-menu]");
    btn.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    });
    nav.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        nav.classList.remove("open");
        btn.setAttribute("aria-expanded", "false");
      }
    });
  }

  function setupTheme() {
    var btn = document.querySelector("[data-theme-toggle]");
    btn.addEventListener("click", function () {
      var root = document.documentElement;
      var next = root.getAttribute("data-theme") === "dark" ? "" : "dark";
      if (next) root.setAttribute("data-theme", next);
      else root.removeAttribute("data-theme");
      try { localStorage.setItem("theme", next); } catch (e) {}
    });
  }

  // Highlight the nav link for the section currently in view.
  function setupScrollSpy() {
    if (!("IntersectionObserver" in window)) return;
    var links = {};
    document.querySelectorAll("[data-nav] a").forEach(function (a) {
      var id = a.getAttribute("href").slice(1);
      if (document.getElementById(id)) links[id] = a;
    });
    var ids = Object.keys(links);
    if (!ids.length) return;

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        ids.forEach(function (id) {
          links[id].classList.toggle("is-active", id === entry.target.id);
        });
      });
    }, { rootMargin: "-45% 0px -50% 0px", threshold: 0 });

    ids.forEach(function (id) { io.observe(document.getElementById(id)); });
  }

  // Fill in page metadata (title, description, social cards, structured data)
  // from data.txt, so sharing/SEO stays in sync with the content.
  function setupMeta(d) {
    var title = d.NAME + (d.ROLE ? " — " + d.ROLE : "");
    var desc = d.TAGLINE || "";
    var pageUrl = location.href.split("#")[0];
    var img = d.PHOTO ? new URL(d.PHOTO, location.href).href : "";

    document.title = title;

    function upsert(attr, key, content) {
      if (!content) return;
      var m = document.head.querySelector("meta[" + attr + '="' + key + '"]');
      if (!m) { m = document.createElement("meta"); m.setAttribute(attr, key); document.head.appendChild(m); }
      m.setAttribute("content", content);
    }

    upsert("name", "description", desc);
    upsert("property", "og:type", "profile");
    upsert("property", "og:title", title);
    upsert("property", "og:description", desc);
    upsert("property", "og:url", pageUrl);
    upsert("property", "og:image", img);
    upsert("name", "twitter:card", img ? "summary" : "summary");
    upsert("name", "twitter:title", title);
    upsert("name", "twitter:description", desc);
    upsert("name", "twitter:image", img);

    var ld = {
      "@context": "https://schema.org",
      "@type": "Person",
      name: d.NAME,
      url: pageUrl
    };
    if (d.ROLE) ld.jobTitle = d.ROLE;
    if (desc) ld.description = desc;
    if (img) ld.image = img;
    if (d.EMAIL) ld.email = "mailto:" + d.EMAIL;
    var sameAs = [d.GITHUB, d.LINKEDIN, d.SCHOLAR, d.ORCID, d.ARXIV].filter(Boolean);
    if (sameAs.length) ld.sameAs = sameAs;

    var s = document.createElement("script");
    s.type = "application/ld+json";
    s.textContent = JSON.stringify(ld);
    document.head.appendChild(s);
  }

  function setupFadeIn() {
    var els = document.querySelectorAll(".fade");
    if (!("IntersectionObserver" in window)) {
      els.forEach(function (e) { e.classList.add("visible"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
    els.forEach(function (e) { io.observe(e); });
  }

  /* ============ 5. BOOT ============ */
  fetch("data.txt")
    .then(function (res) {
      if (!res.ok) throw new Error("data.txt not found");
      return res.text();
    })
    .then(function (text) {
      var d = parseData(text);
      var app = document.querySelector("[data-app]");

      setupMeta(d);

      // Two-column shell: sticky left rail (portrait + latest) beside the
      // main content flow. On narrow screens they stack, rail first.
      var rail = renderRail(d);
      if (rail) app.appendChild(rail);

      var flow = el('<div class="flow"></div>');
      flow.appendChild(renderHero(d));
      if (d.ABOUT) flow.appendChild(renderAbout(d));
      if (d.blocks.NEWS) flow.appendChild(renderNews(d.blocks.NEWS));
      if (d.blocks.RESEARCH) flow.appendChild(renderResearch(d.blocks.RESEARCH));
      if (d.blocks.PUBLICATION) flow.appendChild(renderPublications(d.blocks.PUBLICATION));
      if (d.blocks.EXPERIENCE) flow.appendChild(renderExperience(d.blocks.EXPERIENCE));
      if (d.blocks.PROJECT) flow.appendChild(renderProjects(d.blocks.PROJECT));
      if (d.blocks.EDUCATION || d.blocks.HONOR || d.blocks.SKILLS) {
        flow.appendChild(renderBackground(d));
      }
      app.appendChild(flow);
      document.body.appendChild(renderFooter(d));

      setupNav(d);
      setupScrollSpy();
      setupTheme();
      setupFadeIn();
      setupPanel(d.blocks.RESEARCH || []);
    })
    .catch(function (err) {
      var app = document.querySelector("[data-app]");
      app.innerHTML =
        '<div class="container" style="padding:4rem 0">' +
        "<p>Could not load <code>data.txt</code> (" + esc(err.message) + ").</p>" +
        "<p>If you opened this file directly, run a local server instead:<br>" +
        "<code>python3 -m http.server</code> then visit <code>http://localhost:8000</code>.</p></div>";
    });
})();
