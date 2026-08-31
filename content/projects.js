/* ---------------------------------------------------------------------------
   projects.js — the Projects section.

   THIS SECTION EXISTS TO ANSWER ONE QUESTION: can this person build things?

   The rule here is stricter than for the rest of the site: nothing goes in
   without a public repository a reader can open. A described project with no
   code is a claim; a repository is evidence. `href` is therefore required —
   the whole card is the link, and clicking anywhere on it opens the repo.

   WHICH ACCOUNT A REPOSITORY SITS ON IS NOT SAID, AND THAT IS DELIBERATE.
   Some of these live on an earlier GitHub account. Explaining that in `meta`
   put a small apology under half the cards — a reader who follows the link
   lands on working code either way, and one who does not follow it did not
   need the footnote. `meta` carries the language and the year, which is what
   someone scanning this section is actually reading it for.
   TEAM PROJECTS SAY SO, IN `meta`. Three of these were built with other
   people and the repository sits under a teammate's account or a team org.
   That is written on the card rather than left to be discovered by whoever
   opens the commit history — the same rule the NIST claim in Experience
   follows. Nobody has ever been hurt by saying who they worked with; the
   opposite is not true.

   ORDER IS REVERSE-CHRONOLOGICAL, strongest first inside a year. It is the
   only ordering that does not require defending.
--------------------------------------------------------------------------- */

export const projects = {
  heading: "Projects",

  // intro:
  //   "Everything here is public. Each card links to its repository.",

  items: [
    // {
    //   title: "Dense crowd tracking — training code",
    //   description:
    //     "The models and training setup behind the thesis loss: size-aware weighting and focal stabilization on top of YOLO-based detection, evaluated on JHU-CROWD++ and SCUT-HEAD.",
    //   areas: ["Computer vision", "PyTorch", "Loss design"],
    //   meta: "Python · 2024",
    //   href: "https://github.com/labid-al-nahiyan/tracking_models",
    // },
    {
      title: "Shop Genie — retrieval over 10,000 listings",
      description:
        "A shopping assistant that answers plain-language questions over 10,000+ scraped listings. The hard part was retrieval quality, not generation: a bad chunk ranked first is a wrong answer no amount of prompting recovers.",
      areas: ["Retrieval", "RAG", "SvelteKit"],
      meta: "Svelte · team project · 2024",
      href: "https://github.com/yoboBUETGenesis/ShopGenie",
    },
    {
      title: "NerdHerd — collaborative learning platform",
      description:
        "Live classes, video calls, collaborative notes, forums and real-time quizzes in one application, where most of the work was deciding which state belongs on the server and which belongs in the client.",
      areas: ["Full-stack web", "SvelteKit", "PostgreSQL"],
      meta: "Svelte · team project · 2024",
      href: "https://github.com/TheDeadcoder/nerdherd2ndrun",
    },
    {
      title: "BABO — a robot that learns to get out of its own way",
      description:
        "A crawling robot trained with hierarchical Q-learning on a custom chassis, adapting its policy live rather than replaying a fixed route. Runner-up, CSE 316 project showcase.",
      areas: ["Reinforcement learning", "Hierarchical Q-learning", "Embedded"],
      meta: "Python · team project · 2023",
      href: "https://github.com/zarifikram/BABO",
    },
    {
      title: "Search, planning and adversarial games",
      description:
        "Coursework implementations of the classical AI algorithms — informed search, constraint propagation and adversarial game-tree search — written from the papers rather than from a library.",
      areas: ["Algorithms", "C++"],
      meta: "C++ · 2023",
      href: "https://github.com/labid-al-nahiyan/CSE-318_Artificial_inteligence",
    },
    // {
    //   title: "A subset of a C compiler",
    //   description:
    //     "Lexical analysis, parsing, symbol tables and assembly generation for a working subset of C — built to find out what a language actually costs to implement.",
    //   areas: ["Compilers", "C", "Flex / Bison"],
    //   meta: "C · 2022",
    //   href: "https://github.com/labid-al-nahiyan/Cse-310_Compiler",
    // },
    // {
    //   title: "Pac-Man in C",
    //   description:
    //     "The whole game written against a raw OpenGL wrapper — sprite sheets, collision, ghost pathfinding and a score file, with no engine underneath any of it.",
    //   areas: ["Graphics", "C", "OpenGL"],
    //   meta: "C · 2021",
    //   href: "https://github.com/labid-al-nahiyan/pacman",
    // },
  ],

  /* THE LINE UNDER THE LIST. This section is a selection, not an inventory —
     several projects are commented out above, and more repositories exist than
     are worth a card. This is the honest way to say so: the list is curated,
     and the rest is one click away.

     `href` blank falls back to `links.github` in content/links.js, so the
     profile URL lives in exactly one place. Set it to a specific URL to point
     this line somewhere else. Blank `label` removes the line entirely. */
  more: {
    text: "This is a selection.",
    label: "Explore more on GitHub",
    href: "",
  },
};