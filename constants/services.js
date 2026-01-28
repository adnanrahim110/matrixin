const DEFAULT_HERO_IMAGES = [
  "https://images.prismic.io/estrelastudio/aN6L155xUNkB1anY_Grid_01.jpg?w=2700&h=1680&auto=compress,format",
  "https://images.prismic.io/estrelastudio/aN6L2J5xUNkB1anZ_Grid_02.jpg?w=2700&h=1680&auto=compress,format",
  "https://images.prismic.io/estrelastudio/aN6L2p5xUNkB1anb_Grid_04.jpg?w=2700&h=1680&auto=compress,format",
  "https://images.prismic.io/estrelastudio/aN5_a55xUNkB1acx_01.ProductStrat.jpg?w=2700&h=1680&auto=compress,format",
  "https://images.prismic.io/estrelastudio/aN5_bZ5xUNkB1acy_02.App%26Web.jpg?w=2700&h=1680&auto=compress,format",
  "https://images.prismic.io/estrelastudio/aN6PdJ5xUNkB1aq3_WhoweAre_01.jpg?w=2700&h=1680&auto=compress,format",
];

const DEFAULT_TESTIMONIALS = [
  {
    quote:
      "They challenged our assumptions, brought clarity to the chaos, and helped us ship a premium experience that our users immediately felt.",
    name: "Craig Newborn",
    role: "Former CEO, PayJustNow",
  },
  {
    quote:
      "A rare mix of taste and execution. The work feels thoughtful, fast, and genuinely collaborative from first workshop to final polish.",
    name: "Donna Blackwell-Kopotic",
    role: "Sims Lifecycle Service (US)",
  },
  {
    quote:
      "They asked the right questions, made the hard decisions easy, and delivered design that elevated our product without losing simplicity.",
    name: "Brianna Bond",
    role: "CEO, LCFO (US)",
  },
];

const DEFAULT_SECTION_THEME = {
  hero: "dark",
  overview: "light",
  problem: "light",
  approach: "light",
  includes: "light",
  process: "light",
  cta: "dark",
  testimonials: "light",
  caseStudies: "light",
  faqs: "light",
};

const makeService = ({
  name,
  slug,
  tone = "default",
  shortDescription = "",
  description = "",
  keywords = [],
  theme = {},
  hero = {},
  overview = {},
  problem = null,
  approach = null,
  includes = {},
  process = {},
  cta = {},
  testimonials = undefined,
  caseStudies = {},
  results = null,
  faqs = [],
  workServiceSlugs = [],
  heroImage = DEFAULT_HERO_IMAGES[0],
  caseStudiesImage = DEFAULT_HERO_IMAGES[1],
} = {}) => {
  const resolvedTheme = { ...DEFAULT_SECTION_THEME, ...(theme || {}) };
  const metaDescription =
    description ||
    shortDescription ||
    overview?.body?.[0] ||
    hero?.lede?.[0] ||
    "";

  const resolvedTestimonials =
    testimonials === null
      ? null
      : testimonials || {
          title: "Testimonials",
          intro:
            "A few words from teams we’ve supported — from discovery to launch and everything in between.",
          items: DEFAULT_TESTIMONIALS,
          theme: resolvedTheme.testimonials,
        };

  return {
    name,
    slug,
    tone,
    shortDescription,
    meta: {
      title: `${name} | Matrixin`,
      description: metaDescription,
      keywords,
    },
    theme: resolvedTheme,
    hero: {
      theme: resolvedTheme.hero,
      eyebrow: "Service",
      title: name,
      subtitle: hero?.subtitle || shortDescription,
      lede: hero?.lede || [],
      bullets: hero?.bullets || [],
      facts: hero?.facts || [],
      image: {
        src: hero?.image?.src || heroImage,
        alt: hero?.image?.alt || "",
      },
    },
    overview: {
      theme: resolvedTheme.overview,
      title: overview?.title || "Service overview",
      lede: overview?.lede || "",
      body: overview?.body || [],
      highlights: overview?.highlights || [],
    },
    problem: problem
      ? {
          theme: resolvedTheme.problem,
          title: problem?.title || "The problem we solve",
          body: problem?.body || [],
          points: problem?.points || [],
        }
      : null,
    approach: approach
      ? {
          theme: resolvedTheme.approach,
          title: approach?.title || "Our approach",
          body: approach?.body || [],
          steps: approach?.steps || [],
        }
      : null,
    includes: {
      theme: resolvedTheme.includes,
      title: includes?.title || "What’s included",
      intro: includes?.intro || "",
      groups: includes?.groups || [],
      note: includes?.note || "",
    },
    process: {
      theme: resolvedTheme.process,
      title: process?.title || "Process",
      intro: process?.intro || "",
      steps: process?.steps || [],
    },
    cta:
      cta === null
        ? null
        : {
            theme: resolvedTheme.cta,
            title:
              cta?.title ||
              "Ready to ship something clean, fast, and conversion-focused?",
            body:
              cta?.body ||
              "Tell us what you’re building. We’ll recommend the right approach, scope the work clearly, and help you move with confidence.",
            primary: cta?.primary || { label: "Contact us", href: "/contact-us" },
            secondary: cta?.secondary || { label: "View work", href: "/work" },
          },
    testimonials: resolvedTestimonials,
    caseStudies: {
      theme: resolvedTheme.caseStudies,
      title: caseStudies?.title || "Case studies",
      intro:
        caseStudies?.intro ||
        "A selection of work that reflects our taste, detail, and the outcomes we aim for.",
      image: {
        src: caseStudies?.image?.src || caseStudiesImage,
        alt: caseStudies?.image?.alt || "",
      },
    },
    results: results
      ? {
          theme: resolvedTheme.caseStudies,
          title: results?.title || "Results you can measure",
          intro: results?.intro || "",
          items: results?.items || [],
        }
      : null,
    faqs: {
      theme: resolvedTheme.faqs,
      title: "FAQs",
      items: faqs,
    },
    related: {
      workServiceSlugs,
    },
  };
};

export const SERVICES = [
  makeService({
    name: "Web Development",
    slug: "web-development",
    tone: "blue",
    shortDescription:
      "Fast, responsive websites engineered for performance, accessibility, and SEO.",
    description:
      "Web development services for high-performance marketing sites and modern web builds — responsive, accessible, SEO-ready, and built to scale.",
    keywords: [
      "web development",
      "next.js development",
      "responsive website",
      "performance optimization",
      "technical seo",
      "accessibility",
    ],
    hero: {
      subtitle: "Build a premium website that loads instantly and scales cleanly.",
      lede: [
        "We build modern marketing and brand websites with a focus on speed, clarity, and conversion.",
        "From structure and components to motion and polish, everything is designed to look premium, load fast, and remain easy to evolve.",
      ],
      bullets: [
        "Core Web Vitals & performance-led builds",
        "Accessible UI patterns and semantic markup",
        "SEO foundations baked in from day one",
      ],
      facts: [
        {
          label: "Ideal for",
          value: "Marketing sites, landing pages, corporate sites, launches",
        },
        {
          label: "Outcomes",
          value: "Faster load times, cleaner UX, improved conversion",
        },
        {
          label: "Best with",
          value: "Design system or existing brand guidelines (we can help if not)",
        },
      ],
      image: {
        src: DEFAULT_HERO_IMAGES[0],
        alt: "Website interface collage",
      },
    },
    overview: {
      title: "Service overview",
      lede: "A website shouldn’t just look good — it should perform.",
      body: [
        "We approach web development as a product: structured, performance-led, and built with long-term maintenance in mind. That means clean semantics, scalable components, and a layout system that works across screens without hacks.",
        "You get a site that feels editorial and intentional, with motion and interaction that supports the story instead of distracting from it.",
      ],
      highlights: [
        {
          title: "Performance-first",
          text: "Optimized media, smart loading, and clean bundles for real devices.",
        },
        {
          title: "SEO-ready",
          text: "Metadata patterns, semantic structure, and technical foundations that search engines trust.",
        },
        {
          title: "Built to scale",
          text: "Reusable sections and components that make iteration fast and safe.",
        },
      ],
    },
    problem: {
      body: [
        "Many sites fail for the same reasons: pages are heavy, content is hard to maintain, and the experience falls apart on mobile. The result is slow loading, low engagement, and missed conversions.",
        "We solve this by combining a robust component system with performance discipline and a clear content hierarchy.",
      ],
      points: [
        "Slow pages caused by unoptimized images and bloated scripts",
        "Inconsistent layouts that break across devices",
        "Missing SEO structure that limits discoverability",
        "Motion that feels random (or none at all), reducing perceived quality",
      ],
    },
    approach: {
      body: [
        "We keep the approach simple: design the structure, build the system, then polish the interaction.",
        "You’ll get a predictable workflow with clear milestones — and a site that feels premium without sacrificing speed.",
      ],
      steps: [
        {
          title: "Architecture & content hierarchy",
          text: "We define the page structure, component system, and content rules so everything stays consistent.",
        },
        {
          title: "Build & responsiveness",
          text: "We implement layout and components mobile-first, then refine across breakpoints.",
        },
        {
          title: "Motion & interaction",
          text: "We add scroll reveals, subtle parallax, and cursor micro-interactions — respecting reduced-motion preferences.",
        },
        {
          title: "Performance & launch readiness",
          text: "We tune Core Web Vitals, validate accessibility, and prep for deployment and analytics.",
        },
      ],
    },
    includes: {
      intro:
        "Everything is scoped to your needs, but this is what a typical engagement includes.",
      groups: [
        {
          title: "Core build",
          items: [
            "Responsive component-based UI build",
            "Reusable section system for fast iteration",
            "Typography, spacing, and layout rules aligned to your brand",
          ],
        },
        {
          title: "Quality, SEO & performance",
          items: [
            "Core Web Vitals optimization",
            "Technical SEO setup (metadata, structure, sitemap-ready)",
            "Accessibility pass (keyboard, semantics, contrast)",
          ],
        },
        {
          title: "Handoff",
          items: [
            "Deployment guidance and environment setup",
            "Analytics-ready event points (if required)",
            "Documentation for maintainable updates",
          ],
        },
      ],
      note:
        "Need CMS integration or multilingual support? We can extend the build to fit your requirements.",
    },
    process: {
      intro:
        "A lightweight process that keeps momentum high while protecting quality.",
      steps: [
        {
          title: "Discovery & scope",
          text: "We align on goals, audience, key pages, and success metrics with a clear delivery plan.",
        },
        {
          title: "Wire & structure (optional)",
          text: "If needed, we map content hierarchy and layout before the visual build starts.",
        },
        {
          title: "Implementation",
          text: "We build sections and components, then iterate with feedback in short cycles.",
        },
        {
          title: "Polish & QA",
          text: "We refine motion, spacing, accessibility, and device behavior.",
        },
        {
          title: "Launch support",
          text: "We assist with deployment, checks, and post-launch tweaks to ensure stability.",
        },
      ],
    },
    results: {
      items: [
        "Improved perceived speed through lighter UI and intentional motion",
        "Cleaner mobile layouts with consistent spacing and hierarchy",
        "Higher trust through better UX clarity and accessibility",
        "Stronger technical SEO foundations for long-term discoverability",
      ],
    },
    faqs: [
      {
        question: "Can you work with our existing design?",
        answer:
          "Yes. We can build from your existing designs or refine them during implementation to ensure responsiveness and performance.",
      },
      {
        question: "Will the site be editable later?",
        answer:
          "If you need CMS editing, we can integrate a CMS or create structured content components that are easy to maintain.",
      },
      {
        question: "Do you build with SEO in mind?",
        answer:
          "Yes. We implement semantic HTML, metadata patterns, performance improvements, and clean structure that supports SEO.",
      },
      {
        question: "Do you support animations and scroll effects?",
        answer:
          "Yes — we add motion where it improves clarity and polish, and we respect prefers-reduced-motion for accessibility.",
      },
      {
        question: "What stack do you use?",
        answer:
          "We typically build with modern React and Next.js patterns. We’ll recommend the best approach based on your goals and constraints.",
      },
    ],
  }),

  makeService({
    name: "E-Commerce Solutions",
    slug: "e-commerce-solutions",
    tone: "green",
    shortDescription:
      "Conversion-focused storefront experiences designed to build trust and increase sales.",
    description:
      "E-commerce solutions for product discovery, PDP/PLP UX, carts, and checkout flows — designed for conversion, performance, and trust.",
    keywords: [
      "e-commerce solutions",
      "shopify",
      "conversion rate optimization",
      "checkout ux",
      "product page design",
      "headless commerce",
    ],
    hero: {
      subtitle: "Reduce friction, increase confidence, and sell more online.",
      lede: [
        "We design and build storefront experiences that feel fast, familiar, and premium — from discovery to checkout.",
        "The focus is simple: clearer product decisions, stronger trust signals, and flows that don’t leak conversion.",
      ],
      bullets: [
        "Product discovery UX and category structure",
        "PDP patterns that increase confidence",
        "Checkout flows built for completion",
      ],
      facts: [
        { label: "Best for", value: "DTC brands, marketplaces, catalog-heavy stores" },
        { label: "Platforms", value: "Shopify, headless storefronts, custom builds" },
        { label: "Focus", value: "Conversion, trust, performance, retention" },
      ],
      image: { src: DEFAULT_HERO_IMAGES[2], alt: "E-commerce interface mockups" },
    },
    overview: {
      lede: "E-commerce is a UX problem before it’s a marketing problem.",
      body: [
        "When product pages are unclear, filters don’t help, or checkout feels risky, users bounce — even with great ads.",
        "We design e-commerce experiences that reduce decision fatigue, strengthen trust, and make the path to purchase feel effortless.",
      ],
      highlights: [
        {
          title: "Conversion UX",
          text: "Clear CTAs, hierarchy, and funnel logic across PLP → PDP → checkout.",
        },
        {
          title: "Trust signals",
          text: "Shipping clarity, social proof, returns policy, and reassurance at key moments.",
        },
        {
          title: "Performance at scale",
          text: "Media and layout patterns that stay fast even with large catalogs.",
        },
      ],
    },
    problem: {
      points: [
        "Shoppers can’t find what they want quickly enough",
        "PDP pages don’t answer questions (leading to drop-off)",
        "Checkout is slow, confusing, or feels insecure",
        "Inconsistent UI reduces trust and perceived quality",
      ],
      body: [
        "E-commerce drop-off often happens because customers don’t feel confident. They’re not sure the product is right, they’re unsure about shipping/returns, or checkout introduces friction.",
        "We address those problems with tighter information design and cleaner, faster flows.",
      ],
    },
    approach: {
      steps: [
        {
          title: "Audit the funnel",
          text: "We identify friction points across discovery, product detail, cart, and checkout.",
        },
        {
          title: "Design confidence",
          text: "We improve product presentation, variant selection, and trust signals.",
        },
        {
          title: "Optimize flow",
          text: "We simplify steps, reduce cognitive load, and increase completion.",
        },
        {
          title: "Measure and iterate",
          text: "We align the UI with analytics so improvements can be tested over time.",
        },
      ],
    },
    includes: {
      groups: [
        {
          title: "Storefront UX",
          items: [
            "Category / collection structure",
            "Filtering, sorting, and search patterns",
            "Product comparison and decision support",
          ],
        },
        {
          title: "Product pages & checkout",
          items: [
            "PLP/PDP layout system",
            "Cart and checkout improvements",
            "Trust signals, social proof, and policy clarity",
          ],
        },
        {
          title: "Performance & tracking",
          items: [
            "Optimized media patterns for catalog-heavy pages",
            "Conversion event instrumentation points",
            "Component system for promos and campaigns",
          ],
        },
      ],
    },
    process: {
      steps: [
        {
          title: "Discovery",
          text: "Align on customers, products, and your conversion goals.",
        },
        {
          title: "Funnel audit",
          text: "Review analytics, usability, and key drop-off points.",
        },
        {
          title: "Design system",
          text: "Define reusable storefront UI patterns for speed and consistency.",
        },
        {
          title: "Build & refine",
          text: "Implement and polish motion, states, and device behavior.",
        },
      ],
    },
    results: {
      items: [
        "Clearer product decisions with better hierarchy and content structure",
        "Higher checkout completion by removing friction and uncertainty",
        "Faster catalog performance through optimized media patterns",
        "A consistent storefront UI that supports campaigns and growth",
      ],
    },
    faqs: [
      {
        question: "Do you support Shopify and headless builds?",
        answer:
          "Yes. We can design and build patterns for Shopify, headless commerce, or custom storefront architectures.",
      },
      {
        question: "Can you improve an existing store without a redesign?",
        answer:
          "Yes. We can target high-impact improvements (PDP, cart, checkout) without changing your entire UI.",
      },
      {
        question: "Do you handle conversion tracking?",
        answer:
          "We can align key UI events for analytics so you can measure and iterate effectively.",
      },
      {
        question: "Will this work on mobile?",
        answer:
          "Yes. Mobile-first layout and thumb-friendly behavior are core to the approach.",
      },
    ],
  }),

  makeService({
    name: "Web Applications",
    slug: "web-applications",
    tone: "purple",
    shortDescription:
      "Product-grade web app UX and UI that stays clear as complexity grows.",
    description:
      "Web application design and development for dashboards, portals, and internal tools — scalable UX patterns, clean IA, and premium interaction.",
    keywords: [
      "web applications",
      "dashboard design",
      "saas ux",
      "portal development",
      "design systems",
      "frontend architecture",
    ],
    hero: {
      subtitle: "Design and build interfaces that scale with features — not chaos.",
      lede: [
        "Dashboards, portals, and SaaS apps become complex fast. Without strong information design, users get lost and teams ship inconsistently.",
        "We build web apps with clean hierarchy, reusable patterns, and interaction that feels fast and intentional.",
      ],
      bullets: [
        "Scalable navigation and IA",
        "Design-system-ready components",
        "Premium interaction and state clarity",
      ],
      facts: [
        { label: "Ideal for", value: "SaaS products, portals, internal tools, dashboards" },
        { label: "Focus", value: "Clarity, workflows, reusable components" },
        { label: "Outcomes", value: "Less support load, faster iteration, happier users" },
      ],
      image: { src: DEFAULT_HERO_IMAGES[3], alt: "Dashboard UI collage" },
    },
    overview: {
      lede: "Complex software still needs to feel simple.",
      body: [
        "Web applications succeed when users understand what’s happening, what to do next, and how to recover when something changes.",
        "We design and implement clear workflows, predictable components, and states that reduce friction — so your product can grow without becoming messy.",
      ],
      highlights: [
        {
          title: "Workflow UX",
          text: "Information architecture built around real tasks, roles, and permissions.",
        },
        {
          title: "System thinking",
          text: "Reusable UI patterns and component rules that keep delivery consistent.",
        },
        {
          title: "Interaction polish",
          text: "Transitions and feedback that make your product feel premium and fast.",
        },
      ],
    },
    problem: {
      body: [
        "As features expand, apps often become a patchwork: inconsistent screens, unclear navigation, and confusing states. That leads to slower onboarding, higher support load, and user frustration.",
        "We solve this by designing a system — not just screens.",
      ],
      points: [
        "Navigation that doesn’t scale with modules and roles",
        "Data-heavy layouts that overwhelm users",
        "Inconsistent components and spacing across teams",
        "Missing empty/loading/error states that reduce trust",
      ],
    },
    approach: {
      steps: [
        {
          title: "Map workflows",
          text: "We identify core tasks, user roles, and the shortest paths to success.",
        },
        {
          title: "Design the system",
          text: "We define reusable patterns for navigation, tables, forms, and states.",
        },
        {
          title: "Prototype interactions",
          text: "We validate flows and polish feedback, motion, and micro-interactions.",
        },
        {
          title: "Build with maintainability",
          text: "We ship components and layouts that stay consistent as the app grows.",
        },
      ],
    },
    includes: {
      groups: [
        {
          title: "UX foundations",
          items: [
            "Information architecture and navigation model",
            "Workflow mapping and user journeys",
            "Component and state definitions",
          ],
        },
        {
          title: "UI system",
          items: [
            "Dashboard and data layout patterns",
            "Forms, tables, filters, and search patterns",
            "Interaction guidelines and visual hierarchy",
          ],
        },
        {
          title: "Build support",
          items: [
            "Frontend implementation support (optional)",
            "Accessibility and keyboard behavior",
            "Documentation for scaling across teams",
          ],
        },
      ],
    },
    process: {
      steps: [
        { title: "Discovery", text: "Align on users, roles, and business outcomes." },
        { title: "Structure", text: "Define IA, navigation, and core UI patterns." },
        { title: "Design", text: "Create screens and components with consistent rules." },
        { title: "Polish", text: "Refine states, motion, and edge cases." },
      ],
    },
    results: {
      items: [
        "Clearer workflows and faster onboarding",
        "Consistent UI that reduces rework and design debt",
        "Better state feedback and higher user confidence",
        "A scalable system for new features and teams",
      ],
    },
    faqs: [
      {
        question: "Can you work with our existing design system?",
        answer:
          "Yes. We can extend an existing system or help you formalize one if it’s currently informal.",
      },
      {
        question: "Do you cover edge states like empty/loading/error?",
        answer:
          "Yes. State clarity is a major part of building a product-grade experience.",
      },
      {
        question: "Can you also implement the frontend?",
        answer:
          "If you want. We can support build implementation or collaborate with your dev team for a clean handoff.",
      },
    ],
  }),

  makeService({
    name: "UI/UX Design",
    slug: "ui-ux-design",
    tone: "orange",
    shortDescription:
      "Human-first UX and polished UI systems for premium digital products.",
    description:
      "UI/UX design for websites and products — research-led UX, clean information design, and a scalable UI system with premium interaction.",
    keywords: [
      "ui ux design",
      "product design",
      "user experience",
      "user interface",
      "design systems",
      "prototyping",
    ],
    hero: {
      subtitle: "Design that feels effortless — and looks unmistakably premium.",
      lede: [
        "We combine research-led UX with refined UI to create experiences users can navigate without thinking.",
        "The result is clarity, consistency, and a design language that scales across pages and products.",
      ],
      bullets: [
        "UX discovery and friction mapping",
        "UI systems that scale across screens",
        "Interaction and motion that adds polish",
      ],
      facts: [
        { label: "Ideal for", value: "Websites, apps, dashboards, product redesigns" },
        { label: "Outputs", value: "Flows, wireframes, UI kit, prototypes" },
        { label: "Focus", value: "Clarity, consistency, trust, conversion" },
      ],
      image: { src: DEFAULT_HERO_IMAGES[4], alt: "UI design mockups collage" },
    },
    overview: {
      lede: "Great design is structured — not decorative.",
      body: [
        "Good UX reduces friction. Great UI increases trust. Together, they shape how a product feels — and whether users come back.",
        "We design systems that are easy to use, easy to build, and easy to maintain — from the smallest component to the biggest screens.",
      ],
      highlights: [
        {
          title: "UX discovery",
          text: "Research, audits, flows, and friction mapping aligned to business goals.",
        },
        {
          title: "UI systems",
          text: "Components, spacing, and typography rules that keep everything consistent.",
        },
        {
          title: "Prototyping",
          text: "Interactive prototypes that clarify behavior before development begins.",
        },
      ],
    },
    problem: {
      points: [
        "Users don’t understand the flow or next step",
        "Interfaces feel inconsistent across screens",
        "Design debt slows down shipping",
        "Interactions feel flat or unpredictable",
      ],
    },
    approach: {
      steps: [
        { title: "Understand", text: "We learn users, context, and goals through research and audits." },
        { title: "Structure", text: "We map flows and hierarchy to make complexity feel simple." },
        { title: "Design", text: "We craft UI with a strong typographic system and consistent components." },
        { title: "Prototype", text: "We validate interactions and states before handoff or build." },
      ],
    },
    includes: {
      groups: [
        {
          title: "UX deliverables",
          items: [
            "User journeys and workflow mapping",
            "Wireframes and information architecture",
            "Friction analysis and recommendations",
          ],
        },
        {
          title: "UI system",
          items: [
            "Typography, spacing, and component rules",
            "UI kit or design system foundation",
            "Interaction and motion guidelines",
          ],
        },
        {
          title: "Handoff",
          items: [
            "Clickable prototypes for behavior clarity",
            "Design-to-dev handoff support",
            "Iteration and refinement based on feedback",
          ],
        },
      ],
    },
    process: {
      steps: [
        { title: "Discovery", text: "Workshops, research, and audits." },
        { title: "UX", text: "Flows, hierarchy, and wireframes." },
        { title: "UI", text: "Visual system, components, and polish." },
        { title: "Prototype", text: "Validate interaction and edge states." },
      ],
    },
    workServiceSlugs: ["ui-design", "ux-design"],
    results: {
      items: [
        "Clearer journeys and reduced friction in key flows",
        "A scalable UI system that keeps delivery consistent",
        "Higher trust through better hierarchy and polish",
        "Better handoff and fewer implementation surprises",
      ],
    },
    faqs: [
      {
        question: "Do you do research and strategy or only UI?",
        answer:
          "We do both. We can start with UX discovery (research, flows, wireframes) or work from an existing strategy if you already have one.",
      },
      {
        question: "Can you work with our dev team?",
        answer:
          "Yes. We collaborate closely to ensure designs translate cleanly into build-ready components.",
      },
      {
        question: "Do you include motion design?",
        answer:
          "Yes. We define interaction states and motion principles, and we ensure everything respects reduced-motion preferences.",
      },
    ],
  }),

  makeService({
    name: "Mobile Applications",
    slug: "mobile-applications",
    tone: "pink",
    shortDescription:
      "Mobile UX and UI for apps that feel fast, familiar, and genuinely useful.",
    description:
      "Mobile application design and development for iOS/Android — clear onboarding, scalable UI patterns, and premium interaction built for real usage.",
    keywords: [
      "mobile applications",
      "app design",
      "ios ui",
      "android ui",
      "mobile ux",
      "product design",
    ],
    hero: {
      subtitle: "Ship an app experience users understand instantly — and keep using.",
      lede: [
        "Mobile is ruthless: attention is short, context changes fast, and small UX mistakes cost retention.",
        "We design and build mobile experiences that are clear, fast, and thumb-friendly — with polish that feels premium without being heavy.",
      ],
      bullets: [
        "Onboarding and activation flows",
        "Navigation that scales with features",
        "Interaction that respects platform patterns",
      ],
      facts: [
        { label: "Ideal for", value: "Consumer apps, fintech, marketplaces, internal tools" },
        { label: "Focus", value: "Onboarding, retention, clarity, speed" },
        { label: "Platforms", value: "iOS, Android, cross-platform (if required)" },
      ],
      image: { src: DEFAULT_HERO_IMAGES[5], alt: "Mobile UI mockups collage" },
    },
    overview: {
      lede: "Mobile UX should feel obvious.",
      body: [
        "We craft mobile interfaces that prioritize clarity: the right information at the right time, with interaction that feels natural in-hand.",
        "From onboarding to power-user flows, we design systems that stay consistent as features grow.",
      ],
      highlights: [
        {
          title: "Thumb-first layouts",
          text: "Spacing, tap targets, and navigation that feel effortless to use.",
        },
        {
          title: "Platform-aware UI",
          text: "Patterns that respect iOS/Android conventions without losing your brand.",
        },
        {
          title: "Retention-minded flows",
          text: "Better onboarding, clearer value, and smoother re-engagement moments.",
        },
      ],
    },
    problem: {
      points: [
        "Onboarding doesn’t reach activation",
        "Navigation becomes inconsistent as features grow",
        "UI feels slow due to unclear states and heavy visuals",
        "Flows aren’t designed for real-world constraints",
      ],
    },
    approach: {
      steps: [
        { title: "Define core journeys", text: "We map activation and repeat-use workflows first." },
        { title: "Design patterns", text: "We build a component system for mobile screens and states." },
        { title: "Prototype behavior", text: "We validate interactions, gestures, and edge cases early." },
        { title: "Polish and ship", text: "We refine motion, performance, and platform details." },
      ],
    },
    includes: {
      groups: [
        {
          title: "UX & flows",
          items: [
            "Core user journeys and onboarding",
            "Navigation model and IA",
            "Empty/loading/error state definitions",
          ],
        },
        {
          title: "UI system",
          items: [
            "Mobile UI kit and component rules",
            "Design tokens (type, spacing, color)",
            "Interaction and motion guidelines",
          ],
        },
        {
          title: "Handoff / build",
          items: [
            "Clickable prototypes and annotations",
            "Implementation support (optional)",
            "Accessibility considerations",
          ],
        },
      ],
    },
    process: {
      steps: [
        { title: "Discovery", text: "Understand users, goals, and success metrics." },
        { title: "Flows", text: "Map journeys and friction points." },
        { title: "UI", text: "Build screens and components consistently." },
        { title: "Refine", text: "Polish states, motion, and device behavior." },
      ],
    },
    results: {
      items: [
        "Cleaner onboarding and faster activation",
        "More consistent navigation and screen patterns",
        "Higher trust through state clarity and polish",
        "Better retention from smoother repeat-use journeys",
      ],
    },
    faqs: [
      {
        question: "Do you design for both iOS and Android?",
        answer:
          "Yes. We can design platform-specific UI patterns or use a shared system with platform-aware details.",
      },
      {
        question: "Can you work with an existing backend or API?",
        answer:
          "Yes. We can collaborate with your technical team to ensure flows and states match real data behavior.",
      },
    ],
  }),

  makeService({
    name: "Branding & Design",
    slug: "branding-and-design",
    tone: "teal",
    shortDescription:
      "Brand identity and visual systems that feel modern, consistent, and instantly recognizable.",
    description:
      "Branding and design services — identity systems, guidelines, and visual language that translate across digital touchpoints and campaigns.",
    keywords: [
      "branding",
      "brand identity",
      "visual design",
      "brand guidelines",
      "logo design",
      "design systems",
    ],
    hero: {
      subtitle: "Build a brand system that stays consistent everywhere.",
      lede: [
        "A brand isn’t a logo — it’s the system behind how you look, sound, and feel across every touchpoint.",
        "We create cohesive brand identities with a digital-first mindset so your product, website, and marketing all feel like one story.",
      ],
      bullets: [
        "Brand strategy and positioning",
        "Identity systems and guidelines",
        "Digital-first design language",
      ],
      facts: [
        { label: "Ideal for", value: "New brands, rebrands, product-led companies" },
        { label: "Outputs", value: "Identity, guidelines, templates, assets" },
        { label: "Focus", value: "Consistency, recognition, trust" },
      ],
      image: { src: DEFAULT_HERO_IMAGES[1], alt: "Brand identity visuals collage" },
    },
    overview: {
      lede: "A strong brand makes every experience feel intentional.",
      body: [
        "When brand rules are unclear, teams design by instinct — and the result becomes inconsistent fast.",
        "We create brand systems that help you move quickly without losing quality: typography, color, layout rules, and guidance that scales across products and campaigns.",
      ],
      highlights: [
        {
          title: "Clear positioning",
          text: "A sharper message so your visuals and copy align with what you stand for.",
        },
        {
          title: "Cohesive identity",
          text: "A visual language that feels consistent across web, product, and marketing.",
        },
        {
          title: "Practical guidelines",
          text: "Rules and templates your team can actually use.",
        },
      ],
    },
    problem: {
      points: [
        "Inconsistent visuals across teams and channels",
        "A brand that doesn’t translate well to digital",
        "No clear rules for typography, layout, or content",
        "Hard to move quickly without compromising quality",
      ],
    },
    approach: {
      steps: [
        { title: "Discover", text: "Define positioning, audience, and what makes you distinct." },
        { title: "Design the identity", text: "Create a visual system rooted in strong typography and structure." },
        { title: "Build the toolkit", text: "Guidelines, templates, and reusable assets for consistency." },
        { title: "Apply and refine", text: "Test across key touchpoints and adjust for real-world usage." },
      ],
    },
    includes: {
      groups: [
        {
          title: "Strategy",
          items: [
            "Positioning and messaging direction",
            "Visual references and mood exploration",
            "Brand principles and tone",
          ],
        },
        {
          title: "Identity system",
          items: [
            "Logo (if required) and mark usage rules",
            "Typography and color systems",
            "Layout and composition rules",
          ],
        },
        {
          title: "Guidelines & assets",
          items: [
            "Brand guideline document",
            "Templates for key marketing formats",
            "Digital-first asset library direction",
          ],
        },
      ],
    },
    process: {
      steps: [
        { title: "Discovery", text: "Workshops and strategy alignment." },
        { title: "Exploration", text: "Concept routes and system directions." },
        { title: "System", text: "Define final identity and usage rules." },
        { title: "Toolkit", text: "Deliver guidelines and templates." },
      ],
    },
    workServiceSlugs: ["brand-design"],
    results: {
      items: [
        "A cohesive identity that translates across touchpoints",
        "Faster creation with clear brand rules and templates",
        "Better recognition and trust through consistency",
        "A system that supports growth campaigns and product updates",
      ],
    },
    faqs: [
      {
        question: "Do you do naming or messaging too?",
        answer:
          "We can support positioning and messaging direction. If naming is required, we can scope it as an add-on.",
      },
      {
        question: "Will we get guidelines our team can use?",
        answer:
          "Yes. We focus on practical guidelines and templates that make consistency easy.",
      },
    ],
  }),

  makeService({
    name: "Digital Marketing",
    slug: "digital-marketing",
    tone: "yellow",
    shortDescription:
      "Campaign-driven marketing built around clarity, creative consistency, and measurable growth.",
    description:
      "Digital marketing services — campaign creative, landing pages, performance messaging, and growth experiments aligned to your brand and conversion goals.",
    keywords: [
      "digital marketing",
      "campaign strategy",
      "landing pages",
      "performance creative",
      "growth marketing",
      "conversion",
    ],
    hero: {
      subtitle: "Run campaigns that look premium — and convert.",
      lede: [
        "Marketing that performs isn’t just about volume. It’s about clear messaging, strong creative, and experiences that make taking action feel easy.",
        "We help teams ship campaigns with a consistent brand, clean landing pages, and measurement that supports iteration.",
      ],
      bullets: [
        "Creative direction and campaign systems",
        "Landing pages built for conversion",
        "Messaging that matches the product experience",
      ],
      facts: [
        { label: "Ideal for", value: "Launches, product growth, lead generation" },
        { label: "Focus", value: "Consistency, conversion, iteration" },
        { label: "Best with", value: "A clear offer and a measurable goal" },
      ],
      image: { src: DEFAULT_HERO_IMAGES[2], alt: "Campaign visuals" },
    },
    overview: {
      lede: "Creative and UX should work together.",
      body: [
        "Campaigns fail when the ad story and the landing experience feel disconnected. We bridge that gap with consistent creative direction and pages that convert.",
        "The output is a repeatable system: creative templates, messaging structure, and pages you can iterate quickly.",
      ],
      highlights: [
        {
          title: "Campaign systems",
          text: "Reusable creative patterns that keep your brand consistent.",
        },
        {
          title: "Landing experiences",
          text: "Pages designed for clarity, speed, and action.",
        },
        {
          title: "Iteration-ready",
          text: "Structure and measurement that supports testing and improvement.",
        },
      ],
    },
    approach: {
      steps: [
        { title: "Clarify the offer", text: "Define the message, audience, and action." },
        { title: "Build the system", text: "Create creative and layout rules that scale." },
        { title: "Ship campaigns", text: "Launch fast with clean pages and consistent creative." },
        { title: "Improve", text: "Iterate using feedback and measurable performance signals." },
      ],
    },
    includes: {
      groups: [
        {
          title: "Strategy & messaging",
          items: [
            "Campaign direction and positioning",
            "Message hierarchy and headline systems",
            "Offer clarity and CTA alignment",
          ],
        },
        {
          title: "Creative & execution",
          items: [
            "Creative templates and ad-ready assets (if required)",
            "Landing pages and performance layout patterns",
            "On-brand motion and interaction polish",
          ],
        },
        {
          title: "Measurement",
          items: [
            "Analytics event points (where applicable)",
            "Experiment structure for iterations",
            "Reporting guidance and next-step recommendations",
          ],
        },
      ],
    },
    process: {
      steps: [
        { title: "Direction", text: "Align on goals, audience, and story." },
        { title: "Design", text: "Create creative + landing system." },
        { title: "Launch", text: "Ship, validate, and refine quickly." },
        { title: "Iterate", text: "Improve based on results." },
      ],
    },
    results: {
      items: [
        "Better conversion through clearer hierarchy and CTA alignment",
        "More consistent creative across channels",
        "Faster iteration with reusable campaign patterns",
        "A premium look that increases trust",
      ],
    },
    faqs: [
      {
        question: "Do you run paid ads too?",
        answer:
          "We can support creative direction, landing pages, and measurement. Paid media management can be scoped separately depending on your needs.",
      },
      {
        question: "Can you create landing pages only?",
        answer:
          "Yes. We can build high-performing landing pages that align with your brand and campaign story.",
      },
    ],
  }),

  makeService({
    name: "SEO Services",
    slug: "seo-services",
    tone: "cyan",
    shortDescription:
      "Technical SEO and content foundations that compound long-term visibility.",
    description:
      "SEO services including technical audits, on-page improvements, content structure, performance optimization, and schema foundations for sustainable growth.",
    keywords: [
      "seo services",
      "technical seo",
      "on-page seo",
      "site speed",
      "schema markup",
      "content strategy",
    ],
    hero: {
      subtitle: "Build search foundations that keep working while you sleep.",
      lede: [
        "SEO is the compounding channel — but only when the fundamentals are right. That means performance, structure, and content that answers real intent.",
        "We focus on the foundations: technical health, clean architecture, and a content plan that supports long-term discoverability.",
      ],
      bullets: [
        "Technical SEO audits and fixes",
        "Information architecture and content structure",
        "Performance-led improvements for better rankings",
      ],
      facts: [
        { label: "Ideal for", value: "Marketing sites, content sites, SaaS, e-commerce" },
        { label: "Focus", value: "Technical health, structure, content clarity" },
        { label: "Outcomes", value: "Visibility, higher-intent traffic, compounding growth" },
      ],
      image: { src: DEFAULT_HERO_IMAGES[0], alt: "SEO and performance visuals" },
    },
    overview: {
      lede: "SEO is strategy, structure, and performance working together.",
      body: [
        "A site can have great content and still fail if it’s slow, poorly structured, or technically inconsistent. We fix the foundations first, then build a plan that keeps you moving.",
        "The goal isn’t just more traffic — it’s better traffic: people who are already looking for what you do.",
      ],
      highlights: [
        {
          title: "Technical health",
          text: "Fix crawlability, indexing, metadata patterns, and site structure.",
        },
        {
          title: "Content clarity",
          text: "Build pages that match intent and communicate value fast.",
        },
        {
          title: "Performance",
          text: "Speed improvements that benefit users and search engines.",
        },
      ],
    },
    problem: {
      points: [
        "Pages aren’t indexed or crawled consistently",
        "Content doesn’t map to real search intent",
        "Site speed and Core Web Vitals are poor",
        "Information architecture is confusing or inconsistent",
      ],
    },
    approach: {
      steps: [
        { title: "Audit", text: "Technical review, structure review, and quick-win opportunities." },
        { title: "Fix foundations", text: "Clean structure, metadata, internal linking, and performance." },
        { title: "Plan content", text: "Identify topics, intent clusters, and page templates." },
        { title: "Measure", text: "Track changes and iterate based on results." },
      ],
    },
    includes: {
      groups: [
        {
          title: "Technical SEO",
          items: [
            "Crawl and indexability review",
            "Metadata and heading structure patterns",
            "Schema and structured data guidance",
          ],
        },
        {
          title: "On-page & content",
          items: [
            "Page hierarchy and content recommendations",
            "Internal linking strategy",
            "Template guidance for scalable content publishing",
          ],
        },
        {
          title: "Performance",
          items: [
            "Core Web Vitals analysis",
            "Media and bundle optimization guidance",
            "Speed improvements aligned to real devices",
          ],
        },
      ],
    },
    process: {
      steps: [
        { title: "Audit", text: "Baseline analysis and priority roadmap." },
        { title: "Implement", text: "Fix high-impact issues and improve structure." },
        { title: "Content", text: "Align pages to intent and improve clarity." },
        { title: "Iterate", text: "Measure and refine over time." },
      ],
    },
    results: {
      items: [
        "Improved crawlability and indexing reliability",
        "Better content alignment to high-intent searches",
        "Faster pages and stronger Core Web Vitals",
        "A repeatable structure for ongoing SEO growth",
      ],
    },
    faqs: [
      {
        question: "Do you guarantee rankings?",
        answer:
          "No one can guarantee rankings. We focus on the fundamentals that consistently improve visibility over time.",
      },
      {
        question: "Can you work with our dev team?",
        answer:
          "Yes. We can provide a clear technical roadmap and collaborate on implementation.",
      },
    ],
  }),

  makeService({
    name: "Social Media Management",
    slug: "social-media-management",
    tone: "indigo",
    shortDescription:
      "Consistent, on-brand social content with strategy behind every post.",
    description:
      "Social media management including strategy, content planning, creative direction, community support, and performance reporting aligned to brand and growth goals.",
    keywords: [
      "social media management",
      "content strategy",
      "brand consistency",
      "content calendar",
      "community management",
      "social reporting",
    ],
    hero: {
      subtitle: "Stay consistent, stay premium, and stay top-of-mind.",
      lede: [
        "Social isn’t about posting more — it’s about showing up consistently with a clear point of view.",
        "We help brands build a repeatable content system so social feels intentional, not reactive.",
      ],
      bullets: [
        "Content system and calendar",
        "Creative direction and formats",
        "Consistency across campaigns",
      ],
      facts: [
        { label: "Ideal for", value: "Brands that want consistent presence and polish" },
        { label: "Focus", value: "Planning, consistency, quality, reporting" },
        { label: "Outputs", value: "Content plan, templates, publishing rhythm" },
      ],
      image: { src: DEFAULT_HERO_IMAGES[4], alt: "Social content layout" },
    },
    overview: {
      lede: "Consistency beats spikes.",
      body: [
        "Most social feeds fail because content isn’t planned and the visuals drift. We solve that by creating a simple system: formats, templates, and a cadence that fits your team.",
        "The result is a clean, premium presence that reinforces the brand and supports growth campaigns when you need them.",
      ],
      highlights: [
        {
          title: "Systemized content",
          text: "Repeatable formats that keep quality high and production faster.",
        },
        {
          title: "Brand consistency",
          text: "Visual rules and templates that prevent drift over time.",
        },
        {
          title: "Measurement",
          text: "Simple reporting and feedback loops so content improves.",
        },
      ],
    },
    approach: {
      steps: [
        { title: "Define pillars", text: "Clarify themes, audience, and brand voice." },
        { title: "Build formats", text: "Create reusable content formats and templates." },
        { title: "Plan cadence", text: "Design a schedule your team can maintain." },
        { title: "Review & improve", text: "Use reporting to refine what performs." },
      ],
    },
    includes: {
      groups: [
        {
          title: "Strategy",
          items: [
            "Content pillars and messaging structure",
            "Creative direction and formatting rules",
            "Publishing cadence plan",
          ],
        },
        {
          title: "Execution support",
          items: [
            "Template and layout systems for consistency",
            "Creative guidance for posts and campaigns",
            "Lightweight reporting and recommendations",
          ],
        },
      ],
    },
    process: {
      steps: [
        { title: "Kickoff", text: "Align on goals, audience, and tone." },
        { title: "System", text: "Create formats, templates, and guidelines." },
        { title: "Calendar", text: "Plan a schedule and maintain consistency." },
        { title: "Review", text: "Track performance and iterate." },
      ],
    },
    results: {
      items: [
        "A more consistent presence that strengthens trust",
        "Faster content creation through reusable templates",
        "Cleaner visuals and messaging across posts",
        "A feedback loop that improves performance over time",
      ],
    },
    faqs: [
      {
        question: "Do you write captions and copy?",
        answer:
          "We can support copy guidance and messaging structure. Full copywriting can be scoped depending on your needs.",
      },
      {
        question: "Do you manage community and replies?",
        answer:
          "Community support can be added depending on your workload and platform needs.",
      },
    ],
  }),

  makeService({
    name: "White Label Services",
    slug: "white-label-services",
    tone: "slate",
    shortDescription:
      "A behind-the-scenes delivery partner for agencies that want to scale without hiring.",
    description:
      "White label design and development services for agencies — reliable delivery, consistent quality, and flexible collaboration under your brand.",
    keywords: [
      "white label services",
      "agency partner",
      "outsourced design",
      "outsourced development",
      "delivery partner",
      "retainer",
    ],
    hero: {
      subtitle:
        "Scale your agency with a reliable design and dev partner behind the scenes.",
      lede: [
        "When workload spikes, quality often suffers — or timelines slip. White label support gives you capacity without sacrificing standards.",
        "We plug into your workflow, communicate clearly, and deliver work that feels consistent with your agency’s quality bar.",
      ],
      bullets: [
        "Confidential, under-your-brand delivery",
        "Sprints or ongoing retainers",
        "Design + dev support depending on scope",
      ],
      facts: [
        { label: "Ideal for", value: "Agencies, studios, consultants with variable capacity" },
        { label: "Engagement", value: "Project-based, sprint-based, or ongoing retainer" },
        { label: "Focus", value: "Predictable delivery and consistent quality" },
      ],
      image: { src: DEFAULT_HERO_IMAGES[3], alt: "Behind the scenes collaboration" },
    },
    overview: {
      lede: "Your clients don’t need to know we exist.",
      body: [
        "White label support works best when quality is consistent and communication is smooth. We operate as an extension of your team, matching your process and standards.",
        "Whether it’s design support, development support, or both — we help you deliver without the overhead of hiring.",
      ],
      highlights: [
        {
          title: "Consistent output",
          text: "Work that matches your quality bar and your timelines.",
        },
        {
          title: "Flexible capacity",
          text: "Scale up for launches and slow down when workload settles.",
        },
        {
          title: "Clear process",
          text: "Transparent handover, documentation, and predictable delivery.",
        },
      ],
    },
    approach: {
      steps: [
        { title: "Align", text: "Understand your workflow, tools, and communication preferences." },
        { title: "Plan", text: "Set expectations, scope, and delivery cadence." },
        { title: "Deliver", text: "Ship work in predictable cycles with quality checks." },
        { title: "Refine", text: "Iterate and improve with feedback and reporting." },
      ],
    },
    includes: {
      groups: [
        {
          title: "Delivery modes",
          items: [
            "Sprints and structured delivery cycles",
            "Retainer support for ongoing work",
            "Project-based collaboration when needed",
          ],
        },
        {
          title: "Capabilities",
          items: [
            "UI/UX support, design system work, or page builds",
            "Frontend development support (where applicable)",
            "QA and consistency checks",
          ],
        },
        {
          title: "Collaboration",
          items: [
            "Documentation and handoff that fits your agency process",
            "Optional client-facing support (if agreed)",
            "Confidentiality-first operations",
          ],
        },
      ],
    },
    process: {
      steps: [
        { title: "Kickoff", text: "Align on scope, tools, and communication." },
        { title: "Backlog", text: "Maintain a clear backlog and priorities." },
        { title: "Delivery", text: "Ship in predictable cycles with QA." },
        { title: "Review", text: "Refine quality and process over time." },
      ],
    },
    results: {
      items: [
        "More capacity without permanent hiring",
        "Consistent delivery during workload spikes",
        "Higher quality through a structured process",
        "Happier clients due to predictable timelines",
      ],
    },
    faqs: [
      {
        question: "Do you sign NDAs?",
        answer:
          "Yes. We’re comfortable working under NDAs and supporting confidentiality-first workflows.",
      },
      {
        question: "Can you match our design style?",
        answer:
          "Yes. We adapt to your design language and follow your guidelines for consistency.",
      },
      {
        question: "Is this month-to-month?",
        answer:
          "It can be. We can structure month-to-month retainers or fixed sprints depending on your needs.",
      },
    ],
  }),

  makeService({
    name: "Services",
    slug: "services",
    tone: "dark",
    shortDescription:
      "Flexible packages and retainers for teams who need consistent support and fast iteration.",
    description:
      "Ongoing service packages and retainers for product, design, and growth teams — predictable delivery, clear priorities, and premium polish.",
    keywords: [
      "retainer",
      "design retainer",
      "development retainer",
      "product support",
      "ongoing services",
      "sprints",
    ],
    hero: {
      subtitle: "A delivery model that fits how your team actually works.",
      lede: [
        "Some teams don’t need a big project — they need consistent momentum. We offer flexible packages that keep work moving without chaos.",
        "From focused sprints to ongoing retainers, we help you iterate quickly while maintaining the same quality standards across everything you ship.",
      ],
      bullets: [
        "Sprints, retainers, or project-based delivery",
        "Clear backlog and prioritization",
        "Consistent quality across iterations",
      ],
      facts: [
        { label: "Ideal for", value: "Teams needing ongoing design/dev support" },
        { label: "Rhythm", value: "Weekly or sprint-based delivery cycles" },
        { label: "Focus", value: "Prioritization, predictability, quality" },
      ],
      image: { src: DEFAULT_HERO_IMAGES[1], alt: "Service delivery visuals" },
    },
    overview: {
      lede: "Consistency is a competitive advantage.",
      body: [
        "Retainers and packages work best when priorities are clear and delivery is predictable. We help you maintain momentum while keeping quality high.",
        "This model is ideal for teams that want to ship improvements continuously — across product, web, marketing, and design systems.",
      ],
      highlights: [
        {
          title: "Flexible engagement",
          text: "Choose a rhythm that fits your roadmap: sprints, monthly, or project-based.",
        },
        {
          title: "Clear prioritization",
          text: "A backlog that stays focused on impact and effort — with full transparency.",
        },
        {
          title: "Consistent quality",
          text: "The same standards and polish across every iteration.",
        },
      ],
    },
    approach: {
      steps: [
        { title: "Align on goals", text: "Define what success looks like and how to measure it." },
        { title: "Build a backlog", text: "Create a clear queue of work and priorities." },
        { title: "Ship in cycles", text: "Deliver predictably with built-in review and QA." },
        { title: "Improve continuously", text: "Refine the system and raise the baseline over time." },
      ],
    },
    includes: {
      groups: [
        {
          title: "Planning",
          items: [
            "Sprint planning and prioritization",
            "Weekly delivery cadence (optional)",
            "Reporting and handover documentation",
          ],
        },
        {
          title: "Execution",
          items: [
            "Design + dev support across touchpoints",
            "Optimization and improvement backlog",
            "Performance and UX enhancement roadmap",
          ],
        },
      ],
    },
    process: {
      steps: [
        { title: "Kickoff", text: "Align on priorities, scope, and cadence." },
        { title: "Backlog", text: "Maintain a clear, structured backlog." },
        { title: "Delivery", text: "Ship in predictable cycles with quality checks." },
        { title: "Review", text: "Evaluate outcomes and plan what’s next." },
      ],
    },
    results: {
      items: [
        "More output without losing quality",
        "Faster iteration through clear prioritization",
        "Better consistency across product and marketing",
        "A smoother workflow between teams",
      ],
    },
    faqs: [
      {
        question: "Can we start with a small sprint first?",
        answer:
          "Yes. Many teams start with a sprint to validate the workflow, then scale to ongoing support once it’s proven.",
      },
      {
        question: "How do you prioritize work?",
        answer:
          "We prioritize by impact, effort, and dependencies — with transparency so you always know what’s next.",
      },
      {
        question: "Can you integrate with our in-house team?",
        answer:
          "Yes. We can plug into your existing workflow and collaborate smoothly with designers and developers.",
      },
    ],
  }),
];

export const getServiceBySlug = (slug) => {
  const normalized = decodeURIComponent(String(slug || "")).trim().toLowerCase();
  return SERVICES.find((s) => s.slug === normalized) || null;
};
