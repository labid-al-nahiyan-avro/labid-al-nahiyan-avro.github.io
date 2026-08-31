/* ---------------------------------------------------------------------------
   _archive.js — everything cut from the site, kept so it is not lost.

   NOTHING IMPORTS THIS FILE. It is a drawer, not content. Move an entry back
   into the live file it came from if a situation ever calls for it — a
   different application, a job, a grant.

   THE RULE THAT PRODUCED IT
   Every item on the site was scored 1–100 for relevance to one specific
   goal — a Fall 2027 PhD application in AI security and biometrics/applied
   vision — and anything under 70 was cut. The score is not a judgement of the
   work; a hackathon win is a real achievement. It is a judgement of whether it
   helps a committee decide, and most things do not.

   The bar exists because a portfolio is read in about thirty seconds and every
   weak item costs attention that a strong one needed. Four excellent things
   read as excellent. Four excellent things plus six average ones read as
   average.
--------------------------------------------------------------------------- */

export const archive = {
  /* ---- experience ---- */
  /* INTELLESPHERE.AI IS BACK ON THE SITE. It was cut at 25 for the reason
     below, and restored when the updated CV listed it again: the site and the
     CV telling different stories about the same three months is worse than the
     entry, and the gap invites the question anyway. Kept here because the
     reasoning is still the reasoning that would cut it from a shorter page. */
  experience: [
    {
      score: 25,
      why:
        "Three months of frontend work in a list beside NIST-ranked biometrics R&D. " +
        "It fills a gap on a CV, but on a research page it reads as divided attention " +
        "and drags the average of the section down.",
      organization: "Intellesphere.AI",
      role: "Full-Stack Developer",
      period: "May 2025 — Jul 2025",
      location: "Remote",
      points: [
        "Built responsive frontend components from UI/UX designs and wired them to REST APIs for dynamic data rendering in a live production application.",
        "Tested, debugged, and optimized the deployed application for stability under real use.",
      ],
      technologies: ["React.js", "Express.js", "Zustand"],
    },
  ],

  /* ---- projects ---- */
  /* SHOP GENIE, BIDIRECTIONAL ROBOT (BABO) AND NERDHERD WERE PUT BACK on the
     live site and are no longer archived. They were cut on the grounds that
     they argue for a product engineer rather than a researcher, which was a
     defensible read of a three-item section and a wrong one for a seven-item
     one: a Projects section that shows only what is on-thesis reads as someone
     with three artifacts, not as someone with focus. All three have public
     repositories under teammates' accounts, found in the CV PDFs, and the
     cards say plainly that they were team projects.

     The reasoning that cut them is worth keeping, because it is the reasoning
     that would cut them again from a shorter section:

       Shop Genie   45  retrieval quality over 10,000 listings is a real
                        engineering problem, but the artifact is a shopping
                        assistant — it argues for a product engineer, and the
                        RAG angle is better carried by the security work.
       BABO         40  hierarchical Q-learning on a custom chassis is
                        genuinely interesting and genuinely unrelated to the
                        stated direction.
       NerdHerd     20  coursework-scale full-stack web.

     They live in content/projects.js now. */
  projects: [
    {
      score: 0,
      why:
        "SCORED ZERO BECAUSE IT DOES NOT EXIST YET, not because it does not matter. " +
        "AI security is one of the two directions being applied in, and a finished " +
        "PoisonGate would score in the 90s — it would be the only artifact behind the " +
        "security half of the statement. This is the single highest-value thing that " +
        "could be added to the site. Fill it in and move it back.",
      title: "PoisonGate",
      categories: ["AI security", "Machine learning"],
      description: "",
      technologies: [],
      year: "",
    },
  ],

  /* ---- education ---- */
  education: [
    {
      score: 35,
      why:
        "A perfect HSC result is a strong signal for undergraduate admission and a " +
        "non-signal for doctoral admission. No committee reads past the bachelor's.",
      school: "Notre Dame College, Dhaka",
      degree: "Higher Secondary Certificate",
      period: "Jul 2017 — Apr 2019",
      result: "GPA 5.00 / 5.00 · General scholarship recipient",
    },
  ],

  /* ---- honors ---- */
  honors: [
    {
      score: 55,
      why:
        "A national hackathon win is real and shows you can build under pressure. It " +
        "is also the kind of line that reads as undergraduate on a doctoral " +
        "application, and it competes for space with the NIST result. Worth keeping " +
        "on the CV PDF; not worth a section here.",
      year: "2024",
      title: "Champion — OpenAPI Hackathon",
      detail: "11th National ICT Fest, IUT",
    },
    {
      score: 50,
      why:
        "Competitive programming placement is honest evidence of coding ability, which " +
        "the Projects section now carries with actual repositories instead. Keep it on " +
        "the CV.",
      year: "2022",
      title: "7th place — SEC Inter-University Junior Programming Contest",
      detail: "Team BUET Fast & Furious",
    },
  ],

  /* ---- news ---- */
  news: [
    {
      score: 25,
      why: "Follows the Intellesphere entry out. Same reasoning.",
      date: "2025.05",
      title: "Full-stack work at Intellesphere.AI",
      summary: "A three-month stint building and shipping a live production app.",
    },
    {
      score: 50,
      why: "Archived with the honour it refers to.",
      date: "2024.11",
      title: "Champion — OpenAPI Hackathon",
      summary: "11th National ICT Fest, IUT.",
    },
  ],

  /* ---- skills ---- */
  /* ALL THREE OF THESE ARE BACK IN content/skills.js, for the same reason as
     Intellesphere: the CV lists them, and a site that lists fewer reads as
     evasive rather than as disciplined. The scoring below is kept because it is
     the argument for cutting them again if the CV ever shortens. */
  skills: [
    {
      score: 20,
      why:
        "THE MOST DAMAGING SECTION ON THE OLD SITE. A whole group arguing you are a " +
        "full-stack engineer, sitting beside a research statement. A committee reads " +
        "it as someone who will leave for industry.",
      group: "Engineering",
      items: ["React.js", "SvelteKit", "Express.js", "PostgreSQL", "REST API design"],
    },
    {
      score: 45,
      why:
        "Docker, Linux and Git are not distinguishing — every applicant has them, so " +
        "listing them says nothing and costs a line. CUDA was kept; it is not generic.",
      group: "Infrastructure (partial)",
      items: ["Docker", "Linux", "Git"],
    },
    {
      score: 40,
      why: "Java, TypeScript and SQL do not appear in any research or systems artifact here.",
      group: "Languages (partial)",
      items: ["Java", "TypeScript", "SQL"],
    },
  ],

  /* ---- not used, and why ---- */
  notes: [
    {
      subject: "SREGym",
      score: 0,
      why:
        "A fork of SREGym/SREGym with ZERO commits by this account — checked against " +
        "the GitHub API before it went anywhere near the site. Forking a lab's " +
        "repository to read it is completely normal; presenting it as work is not, and " +
        "a professor who clicks through finds an empty commit history. It goes on the " +
        "site the day there are merged contributions to point at, and not before.",
    },
    {
      subject: "Old GitHub account",
      score: 80,
      why:
        "github.com/labid-al-nahiyan is retired and unpushable but still public and " +
        "readable, and it holds the only public evidence of the thesis code, the " +
        "compiler and the early C work. Projects deep-links the individual " +
        "repositories and does not mention which account they sit on — a reader who " +
        "follows the link lands on working code either way.",
    },
  ],
};
