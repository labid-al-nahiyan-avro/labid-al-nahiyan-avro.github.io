/* ---------------------------------------------------------------------------
   tags.js — which colour a category, a field or a tool is drawn in.

   Tags are coloured by WHAT THEY ARE, not by which section they appear in.
   `Computer vision` is the same teal in Research, in Work and in Skills, so
   one colour can be followed down the whole deck as a single thread. The
   seven colours themselves live in assets/css/tokens.css.

   HOW A TAG FINDS ITS FAMILY
   1. an exact match against the lists below, ignoring case
   2. failing that, the longest keyword that appears inside the label
   3. failing that, `fallback`

   So "PyTorch" matches exactly, and "Loss design for crowds" would still be
   caught by the "loss design" keyword. Longest-wins is what stops the "c"
   in the languages list from claiming every label with a c in it.

   ADDING A TAG
   Write it into the family it belongs to, lower case. If nothing fits, put it
   in the closest family rather than inventing an eighth — seven is the point
   at which a taxonomy stops reading as one and starts reading as confetti.
--------------------------------------------------------------------------- */

export const tagFamilies = {
  /* Fields of study and the vocabulary of research itself. */
  research: [
    "research", "llm safety", "alignment", "evaluation", "trustworthy ai",
    "academic", "benchmarking", "metrics",
  ],

  /* Anything about looking at pixels. */
  vision: [
    "computer vision", "object tracking", "object detection", "tracking",
    "detection", "opencv", "image processing", "biometrics",
  ],

  /* Breaking things, and stopping things being broken. */
  security: [
    "ai security", "computer security", "security", "rag / llm security",
    "adversarial", "robustness",
  ],

  /* Models: training them, and deciding what they optimise for. */
  ml: [
    "machine learning", "deep learning", "loss design", "reinforcement learning",
    "hierarchical q-learning", "pytorch", "distributed training (ddp)",
    "hugging face", "langchain / langgraph", "rag systems", "rag", "llm",
    "llm application", "retrieval", "transformers", "ml / ai",
    "agentic systems", "agents", "artificial intelligence", "scikit-learn",
    "sklearn", "pandas", "matplotlib", "model building",
    "model evaluation & fine-tuning", "ml / research",
  ],

  /* Things that get shipped to a browser or a database. */
  web: [
    "full-stack web", "web", "react.js", "react", "next.js", "sveltekit",
    "express.js", "express", "node.js", "zustand", "tailwindcss", "postgresql",
    "rest api design", "database systems", "software engineering", "fastapi",
    "engineering", "frameworks & libraries",
  ],

  /* Languages and the machinery underneath them. A language belongs here even
     when it is mostly written for the web — `typescript` and `sql` sit with
     the other languages so the Languages row in Skills reads as one colour
     rather than as two arbitrary halves. */
  systems: [
    "compilers", "systems", "compiler design", "embedded", "embedded c",
    "arduino", "c", "c/c++", "c++", "c#", "java", "python", "go", "typescript",
    "sql", "object-oriented programming", "oop",
    "flex", "bison", "yacc", "data structures & algorithms", "languages",
    "opengl", "graphics",
  ],

  /* The toolchain around the work. */
  infra: [
    "cuda", "docker", "linux", "git", "infrastructure", "ci", "bash",
    "postman", "tools",
  ],
};

/** Used when nothing matches. The quietest of the seven, on purpose. */
export const fallback = "systems";
