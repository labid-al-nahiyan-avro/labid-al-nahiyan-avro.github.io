/* ---------------------------------------------------------------------------
   education.js — degrees, newest first.

   `thesis` is optional and only belongs on the degree it was written for.
   `courses` is optional; keep it to the ones a committee would care about.
--------------------------------------------------------------------------- */

export const education = {
  heading: "Education",

  items: [
    {
      // school: "Bangladesh University of Engineering and Technology",
      shortName: "Bangladesh University of Engineering and Technology (BUET)",
      degree: "BSc in Computer Science and Engineering",
      period: "Feb 2020 — Mar 2025",
      result: "CGPA 3.62 / 4.00",
      thesis:
        "Digging into a New Contextually Appropriate Loss Function for Dense Crowd Tracking — supervised by Prof. A. B. M. Alim Al Islam",
      /* All eight from the CV, in its order. It was a four-course subset here
         on the grounds that a committee only cares about the relevant ones —
         but the CV lists eight, and a shorter list on the site just looks like
         a different transcript. */
      courses: [
        "Machine Learning",
        "Computer Security",
        "Artificial Intelligence",
        "Compiler Design",
        "Database Systems",
        "Software Engineering",
        "Data Structures & Algorithms",
        "Object-oriented programming",
      ],
    },
  ],
};
