/* ---------------------------------------------------------------------------
   overview.js — the statement, and the figures block that is currently off.

   `statement` is live: one sentence above the bio, saying what the work is.

   `facts` and `highlights` — the four figures and the three linked lines —
   are BEHIND `show: false` AND ARE NOT ON THE PAGE.

   WHY THEY WERE SWITCHED OFF. They were built for a reader who would not
   scroll: four numbers and three lines that each jumped to the section
   proving them. What they actually produced was a dashboard at the top of an
   academic homepage — a KPI strip and a bulleted feature list, which is the
   shape of a product landing page and not the shape of anything a professor
   or a committee has ever seen on a personal page. An academic homepage is a
   portrait, a two-or-three paragraph bio, contact details and a CV link; the
   evidence lives in Research, Experience and Education, where a reader
   already knows to look for it.

   Nothing was lost by removing them. Every figure was a restatement of
   something further down the page, which was the rule for this file and is
   now the argument against the block:

       5th NIST MINEX III  →  Experience → TigerIT → points[0]
       −41% FNMR           →  Experience → TigerIT → metric (drawn as a chart)
       1 IEEE paper        →  Research → publications, and the News entry
       3.62 / 4.00         →  Education → BUET → result

   THE RULE STILL HOLDS IF THEY EVER COME BACK: every figure must already be
   true somewhere else in /content, each entry names its source in `from:`,
   and it stops being an overview at five. Set `show: true` to restore it.
--------------------------------------------------------------------------- */

export const overview = {
  /* The four figures and the three linked lines. Off — see the note above. */
  show: false,

  /* One sentence, and the only part of this file still rendered. What you
     work on, not what you are called. It sits above the bio as a lede. */
  statement:
    // "I work on making machine learning systems secure and reliable once they are deployed — hard to break, fool or misuse, not just accurate on a benchmark.",
    "",
  /* The four hardest facts on the site, in the order a committee reads them.
     `from` is not rendered; it is there so the next person can check. */
  facts: [
    {
      value: "5th",
      unit: "NIST MINEX III",
      note: "team submission · fingerprint matching",
      from: "experience.js → TigerIT → points[0]. TEAM ranking, not individual — " +
            "the site says so in the Experience entry. NIST publishes these results, " +
            "so the claim is checkable and must stay exact.",
    },
    {
      value: "−41%",
      unit: "FNMR",
      note: "on that benchmark",
      from: "experience.js → TigerIT → metric.delta",
    },
    {
      value: "1",
      unit: "IEEE paper",
      note: "accepted · DSAA 2026",
      from: "research.js → publications[0]. ACCEPTED, not yet presented — " +
            "DSAA 2026 is in October 2026. Says 'accepted' for that reason, " +
            "and the count stays at 1 until a second one is accepted.",
    },
    {
      value: "3.62",
      unit: "/ 4.00",
      note: "BSc CSE, BUET",
      from: "education.js → BUET → result",
    },
  ],

  highlights: [
    {
      text: "Data preparation and model training for the biometric matcher now ranked 5th on NIST MINEX III.",
      to: "experience",
      label: "Experience",
    },
    {
      text: "Named and measured a failure mode in LLM refusals; co-author on the paper accepted at IEEE DSAA 2026.",
      to: "research",
      label: "Research",
    },
    {
      text: "BSc thesis on a size-aware loss for dense crowd tracking, supervised at BUET — code public.",
      to: "research",
      label: "Thesis",
    },
  ],
};
