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

  /* THE SHAPE HERE FOLLOWS WHAT ACADEMIC PAGES ACTUALLY DO, with one
     deliberate departure.

     Surveyed: a faculty page opens "I am an Assistant Professor of Computer
     Science at UMass Amherst CICS," then research focus, then background, then
     one personal line. Another opens with the doctorate and its supervisor,
     then past employment, then the interests as a list. A peer applying in the
     same area opens with the interests themselves and gets to the work second.
     Two to four sentences a paragraph, one or two paragraphs, first person,
     no throat-clearing.

     THE DEPARTURE: those pages lead with position because nothing else on the
     page states it. This one already does — the role line sits directly above
     this text and the availability pill above that — so spending the first
     sentence on the job would say it three times before saying anything. The
     interest leads instead.

     IT READS AS A STORY, IN ORDER, AND EACH PARAGRAPH HANDS OFF TO THE NEXT:

       greeting   "Hi! I am Labid. I studied … at BUET. My research focuses …"
       origin     "It started with my undergraduate thesis …"
       sharpened  "That question sharpened at work …"
       forward    "That curiosity has lately pulled me toward …"
       outside    "Outside research I enjoy photography, travelling …"

     THE FIRST WORDS OF EVERY PARAGRAPH AFTER THE FIRST POINT BACKWARDS — `It
     started`, `That question`, `That curiosity`. That is the entire mechanism
     and it is fragile: it has broken twice.

     Once when the origin paragraph was moved to the end, leaving "that"
     reaching back past a paragraph about employment for something to refer to.
     Once when the paragraphs were rewritten to stand alone, which left `Lately
     it has pulled me toward …` with no antecedent at all — "it" pointed at a
     sentence about being curious, two paragraphs away.

     So: if a paragraph here is reordered or rewritten, check the first three
     words of the one after it. That is where the seam shows.

     THE GREETING IS A CHOICE, AND IT HAS A COST WORTH KNOWING. The peer pages
     that open with an introduction do it because that sentence is the only
     place their role and institution appear. Here the name is set at 56px
     directly above this text and the role line under it reads "ML Engineer @
     TigerIT LTD" — so "Hi! I am Labid" is the second statement of the name, and
     the TigerIT title in the third paragraph is the second statement of the
     job. That is a deliberate trade of concision for warmth, not an oversight;
     the work-first version is in the git history if it is ever wanted back.

     THE LAST LINE IS THE HOBBY LINE, and it is conventional — the peer pages
     close on "Outside of research, I enjoy …". Keep it to one line; this is a
     signature, not a second biography.

     "photography" IS PLAIN TEXT AND NOT A LINK, DELIBERATELY, FOR NOW. The
     gallery has no photographs in it yet, and a link that lands a reader on an
     empty page costs more than the link is worth. To turn it on once the images
     are up, wrap the word:

         "Outside research I enjoy {photography|photography}, travelling, and
          watching anime."

     The syntax still works — see `parseInline` in assets/js/render.js — it is
     simply not being used.

     What survives from the pattern, and should survive an edit:
       · the specific sub-topics are named early, because a professor scanning
         for a match is scanning for those words and nothing else
       · the degree is named in full with the field
       · two paragraphs, not four; nothing here is the statement of purpose

     "MY RESEARCH…" IS THE OPENING, AND THAT IS NOT A STYLE CHOICE. Four peer
     pages, all PhD students or applicants in this area:

       "My research focuses on the security and robustness of modern machine
        learning systems…"                     — Tel Aviv, LLM / agent security
       "My research interests include distributed machine learning…"  — GaTech
       "My research interests span mobile security, scam, fraud…"       — UCLA
       "My research interests span robotics, machine learning…"       — GaTech

     Four out of four make "My research" the grammatical subject of the first
     sentence about the work. It is what a professor skimming a dozen applicant
     pages is pattern-matching against, and "I work on…" — which is what this
     said before — says the identical thing while missing the string they are
     looking for.

     `focuses on` rather than `interests include/span`, because two of those
     four enumerate a list right there in the sentence and this page does not
     need to: content/research.js already renders the interests as tags at the
     top of the Research section, and the CV has its own Research Interests
     block. The one page in the sample that also has a separate list — Tel Aviv,
     and the closest match to this subfield — is the one that uses `focuses on`.
     Prose in the bio, keywords in the list, each said once. */
  bio: [
    "Hi! I am Labid. I studied Computer Science and Engineering at **[Bangladesh University of Engineering and Technology (BUET)](https://www.buet.ac.bd/)**. My research focuses on the security and reliability of machine learning systems once they are deployed — the gap between a model that scores well and a model that holds up.",

    "It started with my undergraduate thesis, on objective design in tracking. What it taught me is that the interesting part is not only what a model learns, but what it quietly fails to learn.",

    "That question sharpened at work. I am currently a Machine Learning Engineer (R&D) at **[TigerIT](https://tigerit.com/)**, where I focus on biometric matching, and being inside a security-sensitive system made me far more curious about how these systems fail, or get fooled, than about the next accuracy point.",

    "That curiosity has lately pulled me toward **agentic AI security** — systems that reason, use tools, and act on someone's behalf. I have been working through agent security, tool-use safety, and how to evaluate an agent in a way you can trust.",

    "Outside research I enjoy photography, travelling, and watching anime.",
  ],
};
