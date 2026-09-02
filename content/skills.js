/* ---------------------------------------------------------------------------
   skills.js — grouped, and deliberately short.

   THE LIST TRACKS THE CV. It used to be governed by a stricter rule — only
   things visible in an artifact elsewhere on this page — which produced a
   shorter, sharper list that disagreed with the CV. Two different accounts of
   one person's toolkit is the worse problem, so the CV wins and this file
   follows it. Change one, change the other.
--------------------------------------------------------------------------- */

export const skills = {
  heading: "Skills",

  /* THESE NOW MATCH THE CV, GROUP FOR GROUP. The list used to be three short
     groups holding only what appeared in an artifact somewhere else on the
     page — the web and general-tooling entries were cut on the argument that
     React beside a research statement reads as someone leaving for industry.

     The CV lists them, so the site does too. A committee reading both should
     not find two different accounts of what one person can do, and the version
     that looks evasive is the shorter one. The scoring that cut them is still
     in content/_archive.js if the argument is ever wanted back. */
  groups: [
    {
      group: "Languages",
      items: ["Python", "C/C++", "Java", "TypeScript", "SQL"],
    },
    {
      group: "ML / Research",
      items: [
        "Distributed training (DDP)",
        "Model building",
        "Model evaluation & fine-tuning",
      ],
    },
    {
      group: "Frameworks & libraries",
      items: [
        "PyTorch",
        "Hugging Face",
        "OpenCV",
        "scikit-learn",
        "Pandas",
        "Matplotlib",
        "Node.js",
        "Express",
        "React",
      ],
    },
    {
      group: "Tools",
      items: ["Git", "Docker", "Linux", "Postman"],
    },
  ],
};
