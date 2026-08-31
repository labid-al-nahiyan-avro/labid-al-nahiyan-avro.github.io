/* ---------------------------------------------------------------------------
   about.js — the portrait and the bio.

   Both are visible in the first section, side by side: portrait and contact
   details on the left, this bio on the right. Nothing here is behind a click.
   Three to five short sentences.

   LINKING A WORD OR PHRASE
   Square brackets, then the URL in round ones — the markdown spelling:

       "I studied at [BUET](https://www.buet.ac.bd/)."
       "Download the [CV](assets/cv.pdf)."

   An `https://` link opens in a new tab; a local path like `assets/cv.pdf`
   opens in the same one. A link does NOT also need ** ** around it — it
   already arrives coloured and underlined, and doing both makes one phrase
   shout in two registers.

   MARKING A PHRASE
   Wrap it in ** ** and it is set bold with an accent underline:

       "a computer science graduate of **BUET**."

   Five marks across the whole bio is the ceiling, and there are four. They are
   a path through the paragraph for a reader who is skimming it — where you
   studied, what the work is about, what has landed, and what you are asking
   for. A paragraph where six things are important has nothing important in it,
   so adding one means taking one out.

   BUET LEADS THE PARAGRAPH, AND IT IS SPELLED OUT.
   It used to sit mid-sentence in a subordinate clause — "and a computer
   science graduate of BUET" — which is the weakest position in a paragraph.
   It is the opening clause now.

   The full name is there because the acronym alone is a local one: a reader in
   Dhaka knows exactly what BUET is and how hard it is to get into, and a
   committee in Zurich or Ann Arbor may be seeing four letters they cannot
   place. "Bangladesh University of Engineering and Technology" is legible to
   both, and it is the form that will appear on the transcript they eventually
   read.

   TIGERIT LOST ITS MARK, deliberately, and that is part of giving BUET the
   focus. It is already named in the role line directly above the bio — marking
   it again put two competing marks in one sentence and split the emphasis.

   PHOTOGRAPHY LINK
   Wrap a phrase like this to turn it into a link to the photography page:

       "Outside research I'm usually {photography|behind a camera}."

   Before the | is the destination (only "photography" is defined), after it
   is the text a reader sees. While content/photography.js has no albums with
   images, the phrase renders as plain text instead of a dead link — nobody
   gets sent to an empty gallery.
--------------------------------------------------------------------------- */

export const about = {
  /* Square image, 400×400 or larger. Displayed as a circle.
     Leave src blank to hide it. */
  portrait: {
    src: "assets/images/profile/profile2.png",
    alt: "Labid Al Nahiyan",
  },

  bio: [
    "I graduated from **[Bangladesh University of Engineering and Technology (BUET)](https://www.buet.ac.bd/)** with a BSc in Computer Science and Engineering, and I am now working as a Machine Learning Engineer (R&D) at **[TigerIT](https://tigerit.com/)**.",

    "Working at TigerIT changed my thinking. Biometric matching is a security-sensitive setting, and being inside one made me far more curious about how these systems fail, or get fooled than about the next accuracy point.",

    "My undergraduate research was already circling the same question. It was on objective design in tracking, where what matters is not only what a model learns but what it quietly fails to learn. Lately that has pulled me toward **agentic AI security** - systems that reason, use tools, and act on someone's behalf. They can be broken and misused in ways that are hard to see from the outside, so I have been working through **agent security**, **tool-use safety**, and **how to evaluate a system in a way you can trust**.",
  ],
};
