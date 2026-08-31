/* ---------------------------------------------------------------------------
   experience.js — professional history, newest first.

   `points` are the bullets. One sentence each, and lead with what you did
   rather than what the team wanted.

   `metric` is optional and renders the only chart on the site: a before/after
   pair drawn to scale. Use it ONLY where you have two real measured numbers.
   `lowerIsBetter: true` means a smaller bar is the better result.
--------------------------------------------------------------------------- */

export const experience = {
  heading: "Experience",

  items: [
    {
      organization: "TigerIT Bangladesh Ltd.",
      role: "Machine Learning Engineer (R&D)",
      period: "Aug 2025 — Present",
      location: "Dhaka, Bangladesh",

      /* HOW THIS IS PHRASED, AND WHY IT MATTERS.
         The ranking is a TEAM submission, not an individual one, and the
         submission itself was handled by colleagues. The site says so. An
         overstated claim on a verifiable public benchmark is the fastest way
         to lose a committee, and NIST MINEX III results are published — a
         professor can look them up in a minute.
         Role on it: data preparation and model training. */
      metric: {
        label: "False Non-Match Rate",
        note: "NIST MINEX III · at FMR ≤ 10⁻²",
        lowerIsBetter: true,
        delta: "−41%",
        rows: [
          { label: "Baseline", value: 0.0151 },
          { label: "Optimized", value: 0.0089 },
        ],
      },

      points: [
        "Team submission currently ranked 5th on NIST MINEX III. My part is the data preparation and the model training and evaluate metrics.",
        "Cut the False Non-Match Rate 41% on that benchmark by optimizing the minutiae-based template generator and matching pipeline.",
        "Engineered a custom loss for non-linear elastic distortion and rotational variance — the two failure modes that dominate real fingerprint capture.",
        "Engineered multi-GPU distributed training in PyTorch: memory scaling on an 800K+ class output layer, duplicated forward passes, host out-of-memory crashes.",
        "Built the cross-language production pipeline, tracing coordinate-transform and rotation-angle bugs across the C++/managed boundary and shipping reproducible builds.",
      ],
      technologies: ["Python", "C++", "C#", "PyTorch", "CUDA", "OpenCV"],
    },

    /* BACK FROM THE ARCHIVE. Cut at score 25 — "three months of frontend
       beside NIST-ranked R&D reads as divided attention" — and restored
       because the updated CV lists it. The site and the CV telling different
       stories about the same three months is worse than the entry itself, and
       an unexplained gap invites the question anyway. Kept to one bullet so it
       stays a line on the record rather than a second career. */
    {
      organization: "Intellesphere.AI",
      role: "Full-Stack Developer",
      period: "May 2025 — Jul 2025",
      location: "Remote",

      points: [
        "Built and integrated frontend components against REST APIs for a live production application.",
      ],
      technologies: ["React.js", "Express.js", "Zustand"],
    },
  ],
};
