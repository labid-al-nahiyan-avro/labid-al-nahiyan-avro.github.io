/* ---------------------------------------------------------------------------
   research.js — the Research section.

   THE SECTION IS SPLIT IN TWO, AND THE SPLIT IS THE POINT.
   `groups` below decides the order and the wording of the two sub-lists;
   every item names which one it belongs to with `status`:

       status: "ongoing"   still running, with no result to claim yet
       status: "done"      finished — published, accepted, or defended

   Ongoing is printed first. `groups` decides that, and `items` decides the
   order inside each group — keep the array in page order and the card numbers
   run 01, 02, … straight down the section.

   A reader who wants to know what is finished should never have to infer it
   from a date. Nothing that is merely planned goes in `ongoing` — ongoing
   means work that exists and is being done now.

   Each item is a card in an editorial list. Collapsed it shows only:

       number · status · title · one-line description · meta · tags · +

   `areas` are the coloured tags under the row. Their colour comes from the
   field itself, not from this section — see content/tags.js.

   Everything in `details` is behind the +. Keep each detail field to one or
   two sentences; the paper is where the long version lives.

   `details.venue` is where the whole publication record goes — conference,
   track, place, dates, identifiers. One card should answer every question a
   committee has about where a piece of work landed, so they never have to
   go looking for it elsewhere on the page.

   `details.results` is the measured outcome. LEAVE IT BLANK IF THERE IS NO
   REAL NUMBER — an empty field disappears, an invented one is a lie. An
   ongoing item usually has no results, and that is the correct state for it.

   `kind: "thesis"` gives an item the THESIS label instead of a number, so it
   does not read as just another project.
--------------------------------------------------------------------------- */

export const research = {
  heading: "Research",

  /* Shown once at the top of the section. */
  /* The two directions being applied in, and the vocabulary underneath them.
     Kept to five: a longer list reads as undecided. */
  /* THE FIVE FROM THE CV, IN ITS ORDER. Keep them in step: this row and the
     CV's Research Interests block are the two places a reader matches against,
     and they should not disagree. `Agentic security` arrived with the Sep 2026
     CV and `Biometrics` left with it — biometrics is still all over the page as
     work, but it is no longer being advertised as a direction. */
  interests: [
    "Machine Learning",
    "AI Security and Privacy",
    "Agentic security",
    "Trustworthy AI",
    "Computer vision",
  ],

  statement:
    // "I'm drawn to the moments where a model's behaviour diverges from what it should do, and to the problem of measuring those gaps precisely rather than anecdotally.",
    "",
  /* The two sub-lists, in the order they appear on the page. `id` matches
     `status` on the items below; `note` is one line under the heading and may
     be left blank. A group with no items in it does not render at all.

     ONGOING LEADS. What is running now is the answer to "what would this
     person do next", which is the question a committee is actually reading
     for; what is finished is the evidence for it and sits underneath. Swap
     these two entries to put Completed back on top — nothing else needs
     touching. */
  groups: [
    {
      id: "ongoing",
      heading: "Ongoing",
      // note: "Running now. No results are claimed here until there are results.",
    },
    {
      id: "done",
      heading: "Completed",
      // note: "Finished work — accepted, published, or defended.",
    },
  ],

  items: [
    /* ONGOING FIRST — see the `groups` note above. The rule for this group is
       the same as for the rest of the site: it describes work that is actually
       being done, and it claims no result that has not been measured. The
       entry below is the R&D line at TigerIT — it appears in Experience as a
       job, and here as the research question inside that job, which is a
       different claim and worth making twice.

       To add another, copy this block, keep `status: "ongoing"`, and leave
       `details.results` blank until a number exists. */
    {
      id: "agentic-security-trajectories",
      status: "ongoing",
      kind: "paper",
      stage: "In progress",
      title: "Agentic security: trajectory behavioural motif analysis",
      description:
        "An agent that is being attacked still leaves a trace of what it did. We are mining those traces for the shapes an attack makes, rather than for the exploit that made it.",
      areas: ["AI security", "Agentic systems", "Evaluation"],
      meta: "Team project · in progress",

      details: {
        venue: "Ongoing collaboration. Nothing submitted yet.",
        problem:
          "Defences for agentic systems are mostly written against known exploits, so each new phrasing of an attack is a new signature to write. What is missing is a description of what an attack looks like at the level of behaviour, independent of how it was triggered.",
        approach:
          "We analyse trajectory data from agentic systems — the sequence of steps an agent actually took — and look for anomalous behavioural motifs: recurring shapes in that sequence that separate a compromised run from an ordinary one.",
        contribution:
          "Team project. The question I care about here is the same one the refusal work asks: whether a failure can be measured in a way that generalizes, rather than catalogued one instance at a time.",
        results: "",
      },

      links: [],
    },

    // {
    //   id: "distortion-robust-matching",
    //   status: "ongoing",
    //   kind: "paper",
    //   stage: "In progress",
    //   title: "Distortion-robust objectives for fingerprint matching",
    //   description:
    //     "Real fingerprint capture is non-linear elastic distortion and rotation, not clean impressions. The objective should say so.",
    //   areas: ["Biometrics", "Loss design", "Robustness", "Computer vision"],
    //   meta: "R&D at TigerIT Bangladesh · Aug 2025 – present",

    //   details: {
    //     venue: "Industrial R&D. No write-up submitted yet.",
    //     problem:
    //       "Minutiae-based matchers are trained as if impressions were clean, then deployed against skin that stretches and fingers that land at an angle. The two dominant real-capture failure modes are absent from the objective the matcher is optimized for.",
    //     approach:
    //       "A custom loss that models non-linear elastic distortion and rotational variance directly, trained with multi-GPU distributed PyTorch over an 800K+ class output layer, and evaluated against the NIST MINEX III protocol.",
    //     contribution:
    //       "My part is the objective, the data preparation and the training. The open question I want to carry into a PhD is whether the same distortion model that improves genuine matching also changes what an attacker has to do to force a false match.",
    //     results: "",
    //   },

    //   links: [],
    // },

    /* COMPLETED. Order inside a group follows the array, so the accepted paper
       leads and the thesis follows it. */
    {
      id: "semantic-stability",
      status: "done",
      kind: "paper",
      stage: "Accepted at DSAA 2026",

      /* RENAMED. This is the same paper that went up as a preprint in
         December 2025 under "When Safety Blocks Sense: Measuring Semantic
         Confusion in LLM Refusals". The camera-ready title is the one below,
         and it is the only title the site uses — an applicant with two names
         for one paper reads as two half-papers. The old title survives in
         exactly one place, `details.venue`, so a reader who arrives from the
         December arXiv posting can see that it is the same work. */
      title: "How Semantically Stable Are LLM Refusals?",
      description:
        "Language models reject harmless paraphrases of intents they otherwise accept. We named the failure mode, built a corpus for it, and gave it three metrics.",
      areas: ["LLM safety", "Alignment", "Evaluation", "Benchmarking"],
      meta: "Co-author · Supervisor: Dr. Ch. Md. Rakin Haider · IEEE DSAA 2026",

      details: {
        /* Everything about where it landed, in one place. */
        venue:
          "Accepted to the 13th IEEE International Conference on Data Science and Advanced Analytics (DSAA 2026), New Delhi, India, 6–9 October 2026, for Short Presentation, and appearing in the IEEE conference proceedings. Supervised by Dr. Ch. Md. Rakin Haider. Subtitled “Measuring Confusion in Local Safety Boundaries”; the December 2025 arXiv posting carries the earlier title “When Safety Blocks Sense”.",
        problem:
          "Safety-aligned models refuse inconsistently: one phrasing of a harmless intent is accepted, a near-identical paraphrase is rejected. Refusal rate alone cannot see it — models with near-identical rates turn out to have very different confusion profiles.",
        approach:
          "Each refusal is compared against its FAISS-retrieved accepted neighbours on three axes — score drift, probability shift and perplexity contrast — which exposes safety-alignment gaps that coarse prompt-embedding similarity misses.",
        contribution:
          "I developed ParaGuard, the 10,000-prompt corpus of controlled paraphrase clusters, and designed the three token-level metrics — Confusion Index, Rate and Depth. I also ran the cohort analysis across model families.",
        results:
          "ParaGuard · 10,000 prompts · CI/CR/CD across Llama, Mistral, Qwen and GPT families",
      },

      links: [{ label: "Read the paper", href: "https://arxiv.org/abs/2512.01037" }],
    },

    {
      id: "crowd-tracking-loss",
      status: "done",
      kind: "thesis",
      stage: "Defended",
      title: "A Contextually Appropriate Loss Function for Dense Crowd Tracking",
      description:
        "Standard bounding-box losses weigh a tiny head in a crowd the same as a large isolated one. This one does not.",
      areas: ["Computer vision", "Loss design", "Object tracking"],
      meta: "BSc thesis, BUET · Supervisor: Prof. A. B. M. Alim Al Islam · Feb 2024 – Mar 2025",

      details: {
        venue:
          "Undergraduate thesis, Department of Computer Science and Engineering, Bangladesh University of Engineering and Technology. Defended March 2025; planned submission to NSysS 2026.",
        problem:
          "Tracking small, overlapping objects in dense crowds fails for a specific reason: CIoU, DIoU and GIoU weigh a tiny head like a large isolated one, and destabilize gradients for the clustered targets that dominate crowd scenes.",
        approach:
          "A size-aware, gradient-stabilized loss that reweights each contribution by object scale, so small targets are not drowned out during optimization. Integrated into YOLO-based detection and tracking models.",
        contribution:
          "The loss is the thesis. It is where I learned that the objective, not the architecture, is usually where the real modelling decisions live.",
        results: "Higher mAP@50 and F1 than CIoU, DIoU and GIoU · JHU-CROWD++, SCUT-HEAD",
      },

      /* The code and the write-up. A research page with no link to the code is
         asking to be taken on trust; these are the only public evidence the
         thesis exists. Both live on the retired account, which is readable. */
      links: [
        { label: "Training code", href: "https://github.com/labid-al-nahiyan/tracking_models" },
        { label: "Abstract", href: "https://github.com/labid-al-nahiyan-avro/Digging-into-A-New-Contextually-Appropriate-Loss-Function-for-Dense-Crowd-Tracking" },
      ],
    },

  ],

  /* Closes the section. Two or three sentences on where this is going. */
  /* THE RESEARCH STATEMENT. This was the largest gap on the old site: two
     sentences of interests is not a statement of direction, and a committee
     cannot place an applicant who has not said what they want to work on.
     Written from the two directions actually being applied in — AI security
     and biometrics/applied vision — and from the work that already exists to
     back them. Correct the wording; keep the shape. */
  /* OFF. The research statement is not rendered, and `show: false` is the only
     thing switching it off — the text below is intact and one word from
     returning.

     WHY IT WENT. It was three paragraphs saying what the work is for, sitting
     under four cards that already say it: the Ongoing group is the direction,
     stated as work actually being done rather than as intent. Read in order,
     the section made its argument twice — once in evidence and once in prose —
     and the prose half was the weaker one, because anybody can write that they
     want to work on agentic security and only the cards prove it.

     It is also the paragraph a committee is least likely to believe from a
     website; that argument belongs in a statement of purpose, addressed to a
     specific lab, not broadcast to everyone.

     Keep it here rather than deleting it: it is the clearest existing draft of
     the research statement, and it is worth having when one is being written. */
  direction: {
    show: false,
    heading: "What I want to work on",
    text: [
      "I want to work on the security and reliability of machine learning systems after they are deployed, and increasingly on agentic ones. An agent has a much larger attack surface than a classifier and much less settled ground on how to test it.",

      "Three threads in what I have already done lead there: evaluation, naming a failure mode precisely enough to measure it; robustness, writing the objective around the conditions a system actually meets rather than the inputs it was trained on; and behaviour, reading what a system did for the shape an attack leaves rather than the exploit that made it. Agentic systems are where all three have to hold at once.",

      "What I want to push on is the move from diagnosis to intervention — measuring inconsistency during training rather than only after it — and evaluation for agents that holds up when the agent is adversarial, not merely wrong.",
    ],
  },

  publications: [
    {
      citation:
        'L. Al Nahiyan et al. "How Semantically Stable Are LLM Refusals? Measuring Confusion in Local Safety Boundaries." In Proc. 13th IEEE International Conference on Data Science and Advanced Analytics (DSAA), New Delhi, India, 2026.',
      link: "https://arxiv.org/abs/2512.01037",
      note: "Accepted — IEEE DSAA 2026",
    },
    {
      citation:
        'L. Al Nahiyan. "Digging into a New Contextually Appropriate Loss Function for Dense Crowd Tracking." BSc thesis, Bangladesh University of Engineering and Technology, 2025.',
      link: "",
      note: "Undergraduate thesis",
    },
  ],
};
