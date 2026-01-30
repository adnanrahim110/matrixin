export const BLOGS = [
  {
    slug: "building-an-editorial-design-system",
    title: "Building an editorial design system that scales",
    excerpt:
      "A practical, design-led approach to typography, spacing, and component rhythm that keeps a site feeling premium as content grows.",
    publishedAt: "2026-01-12",
    updatedAt: "2026-01-22",
    readingTime: "7 min read",
    author: {
      name: "Matrixin Studio",
      role: "Design & Development",
      avatar:
        "https://images.prismic.io/estrelastudio/aN6C555xUNkB1af4_Rectangle2381-1-min.jpg?w=800&h=800&auto=compress,format",
    },
    category: "Design",
    tags: ["design-system", "typography", "ui"],
    cover: {
      src: "https://images.prismic.io/estrelastudio/aN6L155xUNkB1anY_Grid_01.jpg?w=2600&h=1600&auto=compress,format",
      alt: "Editorial grid layout with typography and imagery",
      caption: "Editorial systems are less about components and more about rhythm.",
    },
    meta: {
      title: "Building an editorial design system that scales | Matrixin",
      description:
        "Learn how to build an editorial design system that stays premium as content grows: typography, spacing, and interaction rhythm.",
      keywords: ["editorial design", "design system", "typography", "ui"],
    },
    keyTakeaways: [
      "Start with type scale + spacing tokens, then build components.",
      "Design for rhythm: headline, lede, media, body, callout, CTA.",
      "Use motion as emphasis, not decoration (respect reduced motion).",
    ],
    contentBlocks: [
      {
        type: "paragraph",
        text: "Editorial UI works when it’s calm, consistent, and structured. The goal is to guide the reader with hierarchy — without shouting.",
      },
      {
        type: "heading",
        level: 2,
        text: "Begin with type, not components",
      },
      {
        type: "paragraph",
        text: "A scalable editorial system starts with a reliable type scale, line-height, and readable measure. Components come after the content rules are clear.",
      },
      {
        type: "list",
        variant: "check",
        items: [
          "Define an H1–H4 scale and keep it tight",
          "Set body measure around ~60–75 characters",
          "Use consistent vertical rhythm between blocks",
        ],
      },
      {
        type: "image",
        src: "https://images.prismic.io/estrelastudio/aN6L2J5xUNkB1anZ_Grid_02.jpg?w=2600&h=1600&auto=compress,format",
        alt: "A minimal editorial layout with strong typography",
        caption: "Strong hierarchy makes pages feel intentional.",
        parallaxY: 10,
      },
      {
        type: "heading",
        level: 2,
        text: "Motion as editorial emphasis",
      },
      {
        type: "callout",
        title: "Rule of thumb",
        text: "If motion doesn’t clarify hierarchy or feedback, it’s usually noise. Use subtle reveal, parallax on media, and small cursor cues on cards.",
      },
      {
        type: "quote",
        text: "A premium feel isn’t the number of effects — it’s the restraint and consistency.",
        cite: "Matrixin notes",
      },
      {
        type: "statGrid",
        items: [
          { label: "Hierarchy", value: "H1–H4", desc: "Keep headings predictable." },
          { label: "Measure", value: "70ch", desc: "Comfortable reading width." },
          { label: "Rhythm", value: "8–24", desc: "Consistent spacing steps." },
        ],
      },
    ],
    faqs: [
      {
        question: "Do I need a full design system for a blog?",
        answer:
          "Not always. Start with typography, spacing, and a small set of editorial blocks. Expand into components as your content library grows.",
      },
      {
        question: "How do I keep pages feeling premium over time?",
        answer:
          "Lock down hierarchy rules, keep spacing consistent, and only add interactions that improve clarity or feedback.",
      },
    ],
    testimonials: null,
  },
  {
    slug: "conversion-first-landing-pages",
    title: "Conversion-first landing pages (without looking generic)",
    excerpt:
      "How to balance clarity and personality: structure, proof, and a visual system that feels custom — not templated.",
    publishedAt: "2025-12-10",
    updatedAt: "2026-01-05",
    readingTime: "6 min read",
    author: {
      name: "Matrixin Studio",
      role: "UX Strategy",
      avatar:
        "https://images.prismic.io/estrelastudio/aN6PdJ5xUNkB1aq3_WhoweAre_01.jpg?w=800&h=800&auto=compress,format",
    },
    category: "Strategy",
    tags: ["ux", "conversion", "landing-page"],
    cover: {
      src: "https://images.prismic.io/estrelastudio/aN5_a55xUNkB1acx_01.ProductStrat.jpg?w=2600&h=1600&auto=compress,format",
      alt: "A dark editorial hero with product imagery",
      caption: "Clarity first, personality second — but never absent.",
    },
    meta: {
      title: "Conversion-first landing pages (without looking generic) | Matrixin",
      description:
        "Learn a conversion-first landing page structure that stays premium and custom: clarity, proof, and editorial rhythm.",
      keywords: ["landing pages", "conversion rate", "ux", "ui design"],
    },
    keyTakeaways: [
      "Lead with outcomes, not features.",
      "Proof should be scannable and contextual.",
      "Use editorial spacing to avoid the “template” feel.",
    ],
    contentBlocks: [
      {
        type: "paragraph",
        text: "Most landing pages fail for one of two reasons: unclear value or weak proof. Great pages fix both, then let design do the finishing work.",
      },
      { type: "heading", level: 2, text: "A structure that converts" },
      {
        type: "list",
        variant: "numbered",
        items: [
          "Hero: outcome + crisp supporting line",
          "Proof: logos, numbers, testimonials",
          "Offer: what’s included + timeline",
          "CTA: low-friction next step",
        ],
      },
      {
        type: "image",
        src: "https://images.prismic.io/estrelastudio/aN6L2p5xUNkB1anb_Grid_04.jpg?w=2600&h=1600&auto=compress,format",
        alt: "An editorial grid of visuals and text",
        caption: "Scannability is a design decision.",
        parallaxY: 12,
      },
      {
        type: "callout",
        title: "Small UI detail that matters",
        text: "Make the primary CTA visually stable. Hover states should feel premium and consistent, not loud.",
      },
    ],
    faqs: [],
  },
  {
    slug: "ui-ux-audit-checklist",
    title: "A practical UI/UX audit checklist for modern websites",
    excerpt:
      "A concise checklist we use to find friction: accessibility, performance, hierarchy, and conversion blockers — plus quick wins.",
    publishedAt: "2025-11-18",
    updatedAt: "2025-11-18",
    readingTime: "8 min read",
    author: {
      name: "Matrixin Studio",
      role: "Product Design",
      avatar:
        "https://images.prismic.io/estrelastudio/aN5_bZ5xUNkB1acy_02.App%26Web.jpg?w=800&h=800&auto=compress,format",
    },
    category: "UX",
    tags: ["audit", "accessibility", "performance"],
    cover: {
      src: "https://images.prismic.io/estrelastudio/aN5_bZ5xUNkB1acy_02.App%26Web.jpg?w=2600&h=1600&auto=compress,format",
      alt: "Product UI on a laptop in an editorial layout",
      caption: "Audits are fastest when you follow a consistent rubric.",
    },
    meta: {
      title: "A practical UI/UX audit checklist | Matrixin",
      description:
        "Use this UI/UX audit checklist to identify friction and quick wins across hierarchy, accessibility, performance, and conversion.",
      keywords: ["ux audit", "ui audit", "accessibility", "performance"],
    },
    keyTakeaways: [
      "Audit hierarchy before colors and polish.",
      "Accessibility issues often hide in interactions.",
      "Performance is UX — treat it like design.",
    ],
    contentBlocks: [
      { type: "heading", level: 2, text: "Audit priorities" },
      {
        type: "statGrid",
        items: [
          { label: "Hierarchy", value: "1st", desc: "Can users scan and decide?" },
          { label: "Accessibility", value: "Always", desc: "Keyboard + contrast + motion." },
          { label: "Performance", value: "UX", desc: "Speed impacts trust and conversion." },
        ],
      },
      {
        type: "heading",
        level: 2,
        text: "Quick checklist",
      },
      {
        type: "list",
        variant: "check",
        items: [
          "Buttons: consistent labels and clear states",
          "Forms: inline validation and helpful errors",
          "Content: strong headings and short ledes",
          "Motion: reduced-motion friendly",
        ],
      },
      {
        type: "quote",
        text: "If it feels slow, it feels untrustworthy — even if it’s technically “fine.”",
        cite: "Audit principle",
      },
    ],
    faqs: [],
  },
  {
    slug: "seo-for-editorial-sites",
    title: "SEO for editorial sites: structure beats hacks",
    excerpt:
      "How to build SEO foundations that last: semantic sections, internal linking, metadata, and content structure.",
    publishedAt: "2025-10-02",
    updatedAt: "2025-10-12",
    readingTime: "5 min read",
    author: {
      name: "Matrixin Studio",
      role: "SEO & Content",
      avatar:
        "https://images.prismic.io/estrelastudio/aN-dN55xUNkB1cOz_testimonials-bg.jpg?w=800&h=800&auto=compress,format",
    },
    category: "SEO",
    tags: ["seo", "content", "semantics"],
    cover: {
      src: "https://images.prismic.io/estrelastudio/aN-dN55xUNkB1cOz_testimonials-bg.jpg?w=2600&h=1600&auto=compress,format",
      alt: "Minimal layout representing SEO and structure",
      caption: "Structure makes content indexable and understandable.",
    },
    meta: {
      title: "SEO for editorial sites: structure beats hacks | Matrixin",
      description:
        "Build durable SEO for editorial sites with semantic structure, internal linking, and clean metadata — no hacks needed.",
      keywords: ["SEO", "editorial site", "semantic HTML", "content strategy"],
    },
    keyTakeaways: [
      "Semantics improves both UX and SEO.",
      "Internal links should follow user intent.",
      "Metadata should match on-page hierarchy.",
    ],
    contentBlocks: [
      { type: "paragraph", text: "Good SEO is rarely a trick. It’s clarity." },
      { type: "heading", level: 2, text: "Semantic layout" },
      {
        type: "paragraph",
        text: "Use real headings, sections, and descriptive link labels. Search engines reward clarity because users do too.",
      },
      {
        type: "callout",
        title: "Do this today",
        text: "Add a readable table of contents only when it helps users, not because it’s an SEO myth. Structure content with clear headings first.",
      },
      {
        type: "image",
        src: "https://images.prismic.io/estrelastudio/aN6PdJ5xUNkB1aq3_WhoweAre_01.jpg?w=2600&h=1600&auto=compress,format",
        alt: "A clean editorial composition",
        caption: "Clear structure makes pages easier to navigate and index.",
        parallaxY: 10,
      },
    ],
    faqs: [],
  },
  {
    slug: "case-study-writing-that-actually-sells",
    title: "Case study writing that actually sells",
    excerpt:
      "A simple structure to write case studies people read: problem, constraints, approach, and measurable results.",
    publishedAt: "2025-09-04",
    updatedAt: "2025-09-04",
    readingTime: "6 min read",
    author: {
      name: "Matrixin Studio",
      role: "Brand & Content",
      avatar:
        "https://images.prismic.io/estrelastudio/aN6L155xUNkB1anY_Grid_01.jpg?w=800&h=800&auto=compress,format",
    },
    category: "Branding",
    tags: ["case-studies", "copywriting", "results"],
    cover: {
      src: "https://images.prismic.io/estrelastudio/aN5_bZ5xUNkB1acy_02.App%26Web.jpg?w=2600&h=1600&auto=compress,format",
      alt: "A portfolio-style editorial presentation",
      caption: "People buy outcomes, not aesthetics.",
    },
    meta: {
      title: "Case study writing that actually sells | Matrixin",
      description:
        "Learn a case study structure that sells: problem, constraints, approach, and measurable results — written for skimmers.",
      keywords: ["case study", "copywriting", "portfolio", "results"],
    },
    keyTakeaways: [
      "Lead with the problem in plain language.",
      "Include constraints — they build credibility.",
      "Show results as numbers and as user impact.",
    ],
    contentBlocks: [
      { type: "heading", level: 2, text: "The structure" },
      {
        type: "list",
        variant: "numbered",
        items: [
          "The moment of friction (problem)",
          "Constraints and context (why it was hard)",
          "What changed (approach)",
          "Proof (results + artifacts)",
        ],
      },
      {
        type: "quote",
        text: "The best case studies read like a clear story — not a feature list.",
        cite: "Matrixin writing note",
      },
      {
        type: "statGrid",
        items: [
          { label: "Skimmability", value: "High", desc: "Headings and short paragraphs." },
          { label: "Proof", value: "Concrete", desc: "Numbers, screenshots, artifacts." },
          { label: "Tone", value: "Direct", desc: "Less hype, more clarity." },
        ],
      },
    ],
    faqs: [],
  },
  {
    slug: "performance-as-a-design-feature",
    title: "Performance as a design feature",
    excerpt:
      "Why speed feels like quality — and how to make performance decisions that improve UX without compromising brand.",
    publishedAt: "2025-08-12",
    updatedAt: "2025-08-26",
    readingTime: "7 min read",
    author: {
      name: "Matrixin Studio",
      role: "Frontend",
      avatar:
        "https://images.prismic.io/estrelastudio/aN6L2J5xUNkB1anZ_Grid_02.jpg?w=800&h=800&auto=compress,format",
    },
    category: "Engineering",
    tags: ["performance", "frontend", "ux"],
    cover: {
      src: "https://images.prismic.io/estrelastudio/aN6L2p5xUNkB1anb_Grid_04.jpg?w=2600&h=1600&auto=compress,format",
      alt: "A minimal UI representing performance and speed",
      caption: "Fast is a feeling, not only a metric.",
    },
    meta: {
      title: "Performance as a design feature | Matrixin",
      description:
        "Improve UX by treating performance as a design feature: motion restraint, image strategy, and interaction latency.",
      keywords: ["performance", "web vitals", "ux", "frontend"],
    },
    keyTakeaways: [
      "Interaction latency is the hidden killer.",
      "Use motion sparingly, but make it intentional.",
      "Image strategy affects both speed and aesthetics.",
    ],
    contentBlocks: [
      { type: "paragraph", text: "Performance is how premium feels." },
      {
        type: "callout",
        title: "Design choice",
        text: "Prefer fewer, larger, high-quality visuals with good compression over many small decorative assets.",
      },
      {
        type: "heading",
        level: 2,
        text: "Reduce latency",
      },
      {
        type: "list",
        variant: "check",
        items: [
          "Avoid heavy effects on scroll",
          "Use transforms instead of layout thrash",
          "Defer non-critical scripts",
        ],
      },
    ],
    faqs: [],
  },
];

export const getBlogBySlug = (slug) => {
  const normalized = decodeURIComponent(String(slug || "")).trim().toLowerCase();
  return BLOGS.find((b) => b.slug === normalized) || null;
};

export const getRelatedBlogs = (blog, limit = 3) => {
  if (!blog) return BLOGS.slice(0, limit);
  const tagSet = new Set(blog.tags || []);
  const related = BLOGS.filter((b) => b.slug !== blog.slug).sort((a, b) => {
    const aScore =
      (a.category === blog.category ? 3 : 0) +
      (a.tags || []).reduce((acc, t) => acc + (tagSet.has(t) ? 1 : 0), 0);
    const bScore =
      (b.category === blog.category ? 3 : 0) +
      (b.tags || []).reduce((acc, t) => acc + (tagSet.has(t) ? 1 : 0), 0);
    return bScore - aScore;
  });
  return related.slice(0, limit);
};

