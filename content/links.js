/* ---------------------------------------------------------------------------
   links.js — every outbound link on the site.
   Leave a value as an empty string to hide that link everywhere it appears.
--------------------------------------------------------------------------- */

export const links = {
  email: "labid.nahiyan12@gmail.com",

  /* Current account. The older one is below as `githubPrevious`. */
  github: "https://github.com/labid-al-nahiyan-avro",
  linkedin: "https://www.linkedin.com/in/labid-al-nahiyan-4a3810198/",
  scholar: "https://scholar.google.com/citations?user=YU8RyQEAAAAJ&hl=en",

  /* Fill this in when the profile exists; blank hides it. */
  orcid: "",

  /* THE SERVED CV, AND THERE IS ONLY ONE COPY OF IT. It used to be a generic
     `assets/cv.pdf`, on the theory that a stable filename meant no code change
     when the file was replaced. The descriptive name is better where it counts:
     what lands in a reviewer's downloads folder is the thing they will look at
     again in three weeks, and "cv.pdf" among forty other cv.pdf files is not
     findable.

     Two copies would be the real trap — the next update would silently refresh
     only one of them — so the generic duplicate is gone. If this filename
     changes, the no-JavaScript block in index.html links to it too. */
  cv: "assets/Labid_al_nahiyan_academic_CV.pdf",

  /* Earlier work lives on the account you lost access to. Shown as a small
     note at the end of the last section. Blank hides the note. */
  githubPrevious: "https://github.com/labid-al-nahiyan",
};

/* The contact block in the profile column, in order.
   `key` refers to a field above. `style` decides how it is written out:

     "plain"  — shown exactly as stored (email addresses)
     "url"    — the path only, so /labid-al-nahiyan rather than the whole URL
     "action" — shown as its label with an arrow (the CV)

   `text` overrides what a "url" row reads as. Use it only where the path says
   nothing on its own — a Scholar URL is /citations?user=…, and neither half
   of that is worth showing.

   arXiv is deliberately not here. The paper is still linked from Research,
   from News, and from the no-JavaScript block in index.html; it just is not a
   contact row.                                                             */
export const profileLinks = [
  { key: "email", style: "plain" },
  { key: "github", style: "url" },
  { key: "linkedin", style: "url" },
  { key: "scholar", style: "url", text: "Google Scholar" },
  { key: "cv", style: "action", label: "Curriculum vitae" },
];
