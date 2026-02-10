const DEFAULT_SECTION_THEME = {
  hero: "dark",
  whyMatters: "light",
  whyChoose: "light",
  industries: "light",
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

const toArray = (value) => (Array.isArray(value) ? value : []);

const makeService = ({
  name,
  slug,
  tone = "default",
  metaTitle = "",
  shortDescription = "",
  description = "",
  keywords = [],
  theme = {},
  pageCopy = {},
  whyMatters = null,
  whyChoose = null,
  industries = null,
  hero = {},
  overview = {},
  problem = null,
  approach = null,
  includes = {},
  process = {},
  cta = {},
  testimonials = null,
  caseStudies = null,
  results = null,
  faqs = null,
  workServiceSlugs = [],
} = {}) => {
  const resolvedTheme = { ...DEFAULT_SECTION_THEME, ...(theme || {}) };
  const metaDescription =
    description ||
    shortDescription ||
    overview?.body?.[0] ||
    hero?.lede?.[0] ||
    "";

  const resolvedTestimonials =
    testimonials && typeof testimonials === "object"
      ? {
        ...testimonials,
        theme: testimonials?.theme || resolvedTheme.testimonials,
        items: toArray(testimonials?.items),
      }
      : null;

  const resolvedResults = results
    ? {
      ...results,
      title: results?.title || "",
      intro: results?.intro || "",
      items: toArray(results?.items),
    }
    : null;

  const resolvedFaqs =
    faqs && typeof faqs === "object" && !Array.isArray(faqs)
      ? {
        theme: faqs?.theme || resolvedTheme.faqs,
        title: faqs?.title || "",
        items: toArray(faqs?.items),
      }
      : null;

  const resolvedWhyChoose =
    whyChoose && typeof whyChoose === "object" && !Array.isArray(whyChoose)
      ? {
        theme: whyChoose?.theme || resolvedTheme.whyChoose,
        title: whyChoose?.title || "",
        items: toArray(whyChoose?.items),
      }
      : null;

  const resolvedIndustries =
    industries && typeof industries === "object" && !Array.isArray(industries)
      ? {
        theme: industries?.theme || resolvedTheme.industries,
        title: industries?.title || "",
        items: toArray(industries?.items),
      }
      : null;

  const resolvedWhyMatters =
    whyMatters && typeof whyMatters === "object" && !Array.isArray(whyMatters)
      ? {
        theme: whyMatters?.theme || resolvedTheme.whyMatters,
        title: whyMatters?.title || "",
        intro: whyMatters?.intro || "",
        items: toArray(whyMatters?.items),
        conclusion: whyMatters?.conclusion || "",
      }
      : null;

  return {
    name,
    slug,
    tone,
    shortDescription,
    pageCopy: pageCopy || {},
    meta: {
      title: metaTitle || `${name} | Marketinix`,
      description: metaDescription,
      keywords,
    },
    theme: resolvedTheme,
    hero: {
      theme: hero?.theme || resolvedTheme.hero,
      eyebrow: hero?.eyebrow || "",
      title: hero?.title || name,
      subtitle: hero?.subtitle || shortDescription,
      lede: toArray(hero?.lede),
      bullets: toArray(hero?.bullets),
      facts: toArray(hero?.facts),
      primaryCta: hero?.primaryCta || cta?.primary || null,
      secondaryCta: hero?.secondaryCta || null,
      trustBarText: hero?.trustBarText || "",
      image: {
        src: hero?.image?.src || "",
        alt: hero?.image?.alt || "",
      },
    },
    overview: {
      theme: overview?.theme || resolvedTheme.overview,
      eyebrow: overview?.eyebrow || "",
      badgeLabel: overview?.badgeLabel || "",
      title: overview?.title || "",
      lede: overview?.lede || "",
      body: toArray(overview?.body),
      highlights: toArray(overview?.highlights),
      summary: overview?.summary || { eyebrow: "", body: "" },
    },
    problem: problem
      ? {
          theme: problem?.theme || resolvedTheme.problem,
          eyebrow: problem?.eyebrow || "",
          title: problem?.title || "",
          body: toArray(problem?.body),
          points: toArray(problem?.points),
          callout: problem?.callout || { backdropText: "", body: "" },
          image: {
            src: problem?.image?.src || null,
            alt: problem?.image?.alt || "",
          },
        }
      : null,
    approach: approach
      ? {
        theme: approach?.theme || resolvedTheme.approach,
        eyebrow: approach?.eyebrow || "",
        title: approach?.title || "",
        body: toArray(approach?.body),
        steps: toArray(approach?.steps),
        backdropText: approach?.backdropText || "",
        image: {
          src: approach?.image?.src || null,
          alt: approach?.image?.alt || "",
        },
      }
      : null,
    includes: {
      theme: includes?.theme || resolvedTheme.includes,
      eyebrow: includes?.eyebrow || "",
      title: includes?.title || "",
      intro: includes?.intro || "",
      note: includes?.note || "",
      groups: toArray(includes?.groups),
      cards: toArray(includes?.cards),
      media: toArray(includes?.media),
      callout: includes?.callout || { backdropText: "", body: "" },
      image: {
        src: includes?.image?.src || null,
        alt: includes?.image?.alt || "",
      },
    },
    process: {
      theme: process?.theme || resolvedTheme.process,
      eyebrow: process?.eyebrow || "",
      title: process?.title || "",
      intro: process?.intro || "",
      helperText: process?.helperText || "",
      callout: process?.callout || { backdropText: "", body: "" },
      steps: toArray(process?.steps),
      image: {
        src: process?.image?.src || null,
        alt: process?.image?.alt || "",
      },
    },
    cta: {
      theme: cta?.theme || resolvedTheme.cta,
      eyebrow: cta?.eyebrow || "",
      title: cta?.title || "",
      body: cta?.body || "",
      primary: cta?.primary || null,
      secondary: cta?.secondary || null,
    },
    testimonials: resolvedTestimonials,
    caseStudies: caseStudies
      ? {
        theme: caseStudies?.theme || resolvedTheme.caseStudies,
        eyebrow: caseStudies?.eyebrow || "",
        title: caseStudies?.title || "",
        intro: caseStudies?.intro || "",
        items: toArray(caseStudies?.items),
        cta: caseStudies?.cta || null,
        cardCtaLabel: caseStudies?.cardCtaLabel || "",
        image: {
          src: caseStudies?.image?.src || "",
          alt: caseStudies?.image?.alt || "",
        },
      }
      : null,
    results: resolvedResults,
    faqs: resolvedFaqs,
    whyMatters: resolvedWhyMatters,
    whyChoose: resolvedWhyChoose,
    industries: resolvedIndustries,
    related: {
      workServiceSlugs,
    },
  };
};

export const SERVICES = [
  makeService({
    name: "Web Designing Services in USA",
    slug: "web-designing-services",
    metaTitle: "Web Designing Services in USA – Marketinix",
    tone: "blue",
    shortDescription:
      "We design modern, user-friendly, and conversion-focused websites that help USA businesses build trust and generate leads.",
    description:
      "We design modern, user-friendly, and conversion-focused websites that help USA businesses build trust and generate leads.",
    hero: {
      title: "Professional Web Designing Services in USA",
      subtitle:
        "We design modern, user-friendly, and conversion-focused websites that help USA businesses build trust and generate leads.",
      bullets: [
        "Mobile-first & responsive designs",
        "UI/UX focused for better conversions",
        "SEO-ready structure",
        "Clean, modern, and brand-aligned layouts",
      ],
      primaryCta: { label: "Get Free Design Consultation", href: "/contact-us" },
      secondaryCta: {
        label: "View Our Design Process",
        href: "/services/web-designing-services#process",
      },
      trustBarText:
        "USA-Focused Designs | User-Centric UI/UX | Conversion-Driven Layouts | Marketinix",
      image: { src: "/imgs/services/s1-h.jpg", alt: "Web Designing Services in USA" },
    },
    problem: {
      eyebrow: "PROBLEM → SOLUTION",
      title: "Common Website Design Problems",
      points: [
        "Outdated or generic designs",
        "Poor mobile experience",
        "Confusing navigation",
        "Low engagement & conversions",
        "Weak brand impression",
      ],
      callout: {
        backdropText: "Our Solution",
        body:
          "At Marketinix, we provide web designing services in the USA that focus on clarity, usability, and conversions.\nWe don’t just design websites — we design experiences that guide users toward action.",
      },
      image: {
        src: "/imgs/services/s1-prob.jpg",
        alt: "Common Website Design Problems",
      },
    },
    includes: {
      title: "OUR WEB DESIGNING SERVICES",
      cards: [
        {
          title: "Custom Website Design",
          text: "Unique designs tailored to your brand identity and business goals — no templates.",
        },
        {
          title: "Responsive Web Design",
          text: "Pixel-perfect designs that work smoothly across desktop, tablet, and mobile devices.",
        },
        {
          title: "UI/UX Design",
          text: "User-focused layouts that improve engagement, reduce bounce rate, and increase conversions.",
        },
        {
          title: "Website Redesign",
          text: "Transform outdated websites into modern, high-performing digital experiences.",
        },
      ],
    },
    process: {
      eyebrow: "OUR DESIGN PROCESS",
      title: "How We Design Websites That Work",
      steps: [
        {
          title: "Discovery & Research",
          text: "Understanding your business, audience, and goals.",
        },
        {
          title: "Wireframing & Layout Planning",
          text: "Creating user journeys and content structure.",
        },
        { title: "Visual Design (UI)", text: "Clean, modern, and brand-aligned visuals." },
        { title: "UX Optimization", text: "Ensuring ease of use and smooth navigation." },
        { title: "Final Review & Handoff", text: "Designs ready for development and launch." },
      ],
      image: {
        src: "/imgs/services/s1-proc.jpg",
        alt: "How We Design Websites That Work",
      },
    },
    whyMatters: {
      title: "WHY GOOD WEB DESIGN MATTERS",
      items: [
        "Builds trust in the first few seconds",
        "Improves user experience",
        "Increases conversion rates",
        "Strengthens brand identity",
        "Supports SEO and marketing efforts",
      ],
      conclusion:
        "Your website design is often your first impression — we make sure it’s the right one.",
    },
    whyChoose: {
      title: "WHY CHOOSE MARKETINIX",
      items: [
        "USA-focused web design approach",
        "User-centric UI/UX thinking",
        "Conversion-optimized layouts",
        "SEO-friendly design structure",
        "Clear communication & timelines",
        "Affordable pricing for US businesses",
      ],
    },
    industries: {
      title: "INDUSTRIES WE SERVE",
      items: [
        "Small & local businesses",
        "Startups",
        "Professional services",
        "E-commerce brands",
        "SaaS & tech companies",
        "Corporate websites",
      ],
    },
    faqs: {
      title: "FAQs",
      items: [
        {
          question: "Do you provide custom web designs?",
          answer: "Yes. Every design is created based on your brand, goals, and target audience.",
        },
        {
          question: "Will my website be mobile-friendly?",
          answer: "Absolutely. All designs are fully responsive and mobile-first.",
        },
        {
          question: "Do you design SEO-friendly websites?",
          answer: "Yes. Our designs follow SEO best practices for structure and usability.",
        },
        {
          question: "Can you redesign my existing website?",
          answer: "Yes. We specialize in modern redesigns that improve performance and user experience.",
        },
      ],
    },
    cta: {
      title: "Ready to Design a Website That Converts?",
      body:
        "Let Marketinix create a professional, user-friendly website design that helps your business stand out and grow in the USA market.",
      primary: { label: "Get Free Web Design Consultation", href: "/contact-us" },
      secondary: null,
    },
    testimonials: null,
    caseStudies: null,
  }),
  makeService({
    name: "Web Development Services in USA",
    slug: "web-development-services",
    metaTitle: "Web Development Services in USA – Marketinix",
    tone: "orange",
    shortDescription:
      "We build fast, secure, and scalable websites and applications that help USA businesses grow online.",
    description:
      "We build fast, secure, and scalable websites and applications that help USA businesses grow online.",
    hero: {
      title: "Professional Web Development Services in USA",
      subtitle:
        "We build fast, secure, and scalable websites and applications that help USA businesses grow online.",
      bullets: [
        "Custom website & web app development",
        "Mobile-friendly and responsive",
        "SEO-ready code and structure",
        "Scalable solutions for businesses of all sizes",
      ],
      primaryCta: { label: "Get Free Development Consultation", href: "/contact-us" },
      secondaryCta: {
        label: "View Our Development Process",
        href: "/services/web-development-services#process",
      },
      trustBarText:
        "5+ Years’ Experience | 100+ Projects Delivered | USA & Global Clients | Marketinix",
      image: { src: "/imgs/services/s2-h.jpg", alt: "Web Development Services in USA" },
    },
    problem: {
      eyebrow: "PROBLEM → SOLUTION",
      title: "Common Web Development Challenges",
      points: [
        "Slow or outdated websites",
        "Lack of responsive design",
        "Poor security or scalability",
        "Low engagement and conversions",
        "Difficult content management",
      ],
      callout: {
        backdropText: "Our Solution",
        body:
          "At Marketinix, we provide web development services in the USA focused on speed, security, and scalability.\nWe build websites and web applications that perform, rank in search, and convert users into customers.",
      },
      image: {
        src: "/imgs/services/s2-prob.jpg",
        alt: "Common Web Development Challenges",
      },
    },
    includes: {
      title: "OUR WEB DEVELOPMENT SERVICES",
      cards: [
        {
          title: "Custom Website Development",
          text: "Full-stack custom websites designed to meet your unique business goals.",
        },
        {
          title: "Responsive & Mobile-Friendly Development",
          text: "Websites and apps that function perfectly across all devices.",
        },
        {
          title: "E-Commerce Development",
          text: "Shopify, WooCommerce, and custom online stores optimized for sales.",
        },
        {
          title: "Website Redesign & Upgrades",
          text: "Modern, fast, and secure redesigns for outdated websites.",
        },
        {
          title: "Web Application Development",
          text: "Scalable web apps with clean, maintainable code for startups and enterprises.",
        },
      ],
    },
    process: {
      title: "OUR DEVELOPMENT PROCESS",
      steps: [
        { title: "Discovery & Planning", text: "Understand your business, audience, and objectives." },
        { title: "Wireframing & UI/UX Design", text: "Plan layouts, user journeys, and interface." },
        { title: "Development & Coding", text: "Clean, secure, and scalable development." },
        { title: "Testing & Optimization", text: "Performance, security, and compatibility testing." },
        { title: "Launch & Ongoing Support", text: "Smooth deployment and continued maintenance." },
      ],
      image: { src: "/imgs/services/s2-proc.jpg", alt: "OUR DEVELOPMENT PROCESS" },
    },
    whyMatters: {
      title: "WHY QUALITY WEB DEVELOPMENT MATTERS",
      items: [
        "Faster websites increase engagement",
        "SEO-friendly coding improves visibility",
        "Scalable websites support business growth",
        "Secure websites protect your users",
        "User-focused design drives conversions",
      ],
    },
    whyChoose: {
      title: "WHY CHOOSE MARKETINIX",
      items: [
        "Custom USA-focused development",
        "Fast, secure, and scalable solutions",
        "Mobile-first and responsive design",
        "SEO-friendly architecture",
        "Clear communication & timelines",
        "Affordable packages for US businesses",
      ],
    },
    industries: {
      title: "INDUSTRIES WE SERVE",
      items: [
        "Startups & Tech Companies",
        "Professional Services",
        "E-commerce & Retail",
        "SaaS Platforms",
        "Corporate & Enterprise Websites",
      ],
    },
    faqs: {
      title: "FAQs",
      items: [
        {
          question: "Q1: Do you provide custom development?",
          answer: "A1: Yes. Every website and web application is fully customized.",
        },
        {
          question: "Q2: Will my site be mobile-friendly?",
          answer: "A2: Absolutely. All our development is fully responsive and mobile-first.",
        },
        {
          question: "Q3: Can you integrate SEO during development?",
          answer: "A3: Yes. We follow SEO best practices in coding, structure, and speed.",
        },
        {
          question: "Q4: Do you offer ongoing support after launch?",
          answer:
            "A4: Yes. We provide maintenance and updates to ensure continuous performance.",
        },
      ],
    },
    cta: {
      title: "Build a Website That Works for Your Business",
      body:
        "Let Marketinix create fast, secure, and scalable web solutions designed for USA businesses.",
      primary: { label: "Get Free Consultation Today", href: "/contact-us" },
      secondary: null,
    },
    testimonials: null,
    caseStudies: null,
  }),
  makeService({
    name: "Custom Web Development Services in USA",
    slug: "custom-web-development-services",
    metaTitle: "Custom Web Development Services in USA – Marketinix",
    tone: "yellow",
    shortDescription: "Build a Website That Actually Grows Your Business",
    description:
      "At Marketinix, we provide custom web development services in the USA for businesses that want more than just a good-looking website. We build fast, secure, SEO-ready, and conversion-focused websites designed to turn visitors into customers.",
    hero: {
      eyebrow: "Custom Web Development Services in USA",
      title: "Build a Website That Actually Grows Your Business",
      subtitle:
        "At Marketinix, we provide custom web development services in the USA for businesses that want more than just a good-looking website. We build fast, secure, SEO-ready, and conversion-focused websites designed to turn visitors into customers.",
      lede: [
        "Whether you’re a startup, local business, or growing company, we develop websites that support your business goals — leads, sales, and long-term scalability.",
      ],
      image: { src: "/imgs/services/s3-h.jpg", alt: "Custom Web Development Services in USA" },
    },
    includes: {
      title: "Our Custom Web Development Services",
      intro: "We don’t use one-size-fits-all templates. Every website is tailor-made.",
      groups: [
        {
          title: "Custom Website Development",
          items: [
            "Fully custom design & development",
            "Clean, scalable code",
            "Built for performance & security",
          ],
        },
        {
          title: "WordPress Development",
          items: [
            "Custom WordPress themes",
            "Easy content management",
            "SEO-friendly structure",
          ],
        },
        {
          title: "E-Commerce Development",
          items: [
            "Shopify & WooCommerce stores",
            "Secure payment integrations",
            "Conversion-optimized product pages",
          ],
        },
        {
          title: "Website Redesign",
          items: [
            "Modern UI/UX upgrades",
            "Speed & performance optimization",
            "Mobile-first redesign",
          ],
        },
      ],
    },
    process: {
      title: "Our Development Process (Simple & Transparent)",
      steps: [
        { title: "Business & requirement analysis", text: "" },
        { title: "UI/UX wireframing & design", text: "" },
        { title: "Custom development & testing", text: "" },
        { title: "SEO, speed & security optimization", text: "" },
        { title: "Launch & ongoing support", text: "" },
      ],
      image: {
        src: "/imgs/services/s3-proc.jpg",
        alt: "Our Development Process (Simple & Transparent)",
      },
    },
    whyChoose: {
      title: "Why USA Businesses Choose Marketinix",
      items: [
        "✔ SEO-optimized from day one",
        "✔ Mobile-responsive & fast loading",
        "✔ Conversion-focused layouts",
        "✔ Clear communication & timelines",
        "✔ Affordable pricing for US businesses",
      ],
    },
    cta: {
      title: "Let’s build a website that works as hard as you do.",
    },
    testimonials: null,
    caseStudies: null,
    faqs: null,
  }),
  makeService({
    name: "SEO Services in USA",
    slug: "seo-services",
    metaTitle: "SEO Services in USA – Marketinix",
    tone: "green",
    shortDescription: "Rank Higher. Get Traffic. Generate Leads.",
    description:
      "Marketinix offers professional SEO services in the USA focused on real business growth, not just rankings. Our strategies help your website attract qualified traffic, improve visibility, and convert users into paying customers.",
    hero: {
      eyebrow: "SEO Services in USA",
      title: "Rank Higher. Get Traffic. Generate Leads.",
      subtitle:
        "Marketinix offers professional SEO services in the USA focused on real business growth, not just rankings. Our strategies help your website attract qualified traffic, improve visibility, and convert users into paying customers.",
      lede: ["We follow 100% white-hat SEO practices aligned with Google’s latest algorithms."],
      image: { src: "/imgs/services/s4-h.jpg", alt: "SEO Services in USA" },
    },
    includes: {
      title: "What Our SEO Services Include",
      groups: [
        {
          title: "Keyword Research & Strategy",
          items: ["High-intent keyword research", "Competitor analysis", "Search intent mapping"],
        },
        {
          title: "On-Page SEO",
          items: [
            "Content optimization",
            "Meta titles & descriptions",
            "Internal linking",
            "Image & page optimization",
          ],
        },
        {
          title: "Technical SEO",
          items: [
            "Site speed optimization",
            "Core Web Vitals improvements",
            "Crawl & index fixes",
            "Schema implementation",
          ],
        },
        {
          title: "Off-Page SEO",
          items: ["High-quality backlinks", "Authority building", "Brand mentions"],
        },
        {
          title: "Local SEO (USA)",
          items: [
            "Google Business Profile optimization",
            "Local citations",
            "Geo-targeted keyword optimization",
          ],
        },
      ],
    },
    whyMatters: {
      title: "Our SEO Approach",
      intro: "We focus on:",
      items: [
        "Long-term sustainable rankings",
        "Traffic that converts",
        "Monthly performance tracking",
        "Transparent reporting",
      ],
      conclusion: "No shortcuts. No black-hat tactics.",
    },
    whyChoose: {
      title: "Why Choose Marketinix for SEO in USA?",
      items: [
        "✔ Data-driven strategies",
        "✔ Industry-specific SEO plans",
        "✔ Clear monthly reports",
        "✔ Affordable US SEO packages",
        "✔ Dedicated SEO experts",
      ],
    },
    cta: {
      title: "Grow your online visibility with SEO that delivers results.",
    },
    testimonials: null,
    caseStudies: null,
    faqs: null,
  }),
  makeService({
    name: "Social Media Marketing Services in USA",
    slug: "social-media-marketing-services",
    metaTitle: "Social Media Marketing Services in USA – Marketinix",
    tone: "purple",
    shortDescription: "Turn Followers into Customers",
    description:
      "Social media isn’t just about posting — it’s about engagement, branding, and conversions. Marketinix provides social media marketing services in the USA to help brands connect with the right audience and drive measurable results.",
    hero: {
      eyebrow: "Social Media Marketing Services in USA",
      title: "Turn Followers into Customers",
      subtitle:
        "Social media isn’t just about posting — it’s about engagement, branding, and conversions. Marketinix provides social media marketing services in the USA to help brands connect with the right audience and drive measurable results.",
      image: {
        src: "/imgs/services/s5-h.jpg",
        alt: "Social Media Marketing Services in USA",
      },
    },
    includes: {
      title: "Our Social Media Services",
      groups: [
        {
          title: "Platforms We Manage",
          items: ["Facebook", "Instagram", "TikTok", "LinkedIn"],
        },
        {
          title: "Social Media Management",
          items: ["Content planning & posting", "Brand-aligned visuals", "Caption & hashtag strategy"],
        },
        {
          title: "Paid Social Media Ads",
          items: [
            "Meta (Facebook & Instagram) Ads",
            "Audience targeting & retargeting",
            "Lead generation campaigns",
          ],
        },
        {
          title: "Content Strategy",
          items: ["Platform-specific content", "Engagement-focused posts", "Consistent brand voice"],
        },
        {
          title: "Performance Tracking",
          items: ["Monthly insights & analytics", "Campaign optimization", "ROI-focused reporting"],
        },
      ],
    },
    whyMatters: {
      title: "Our Strategy for USA Brands",
      intro: "We focus on:",
      items: [
        "Reaching the right audience, not everyone",
        "Consistent brand messaging",
        "Conversion-focused ad creatives",
        "Scalable growth",
      ],
    },
    whyChoose: {
      title: "Why Marketinix?",
      items: [
        "✔ USA-focused audience targeting",
        "✔ Creative + data-driven approach",
        "✔ Transparent communication",
        "✔ Affordable social media packages",
      ],
    },
    cta: {
      title: "Let’s grow your brand where your customers already are.",
    },
    testimonials: null,
    caseStudies: null,
    faqs: null,
  }),
  makeService({
    name: "Digital Marketing Services in USA",
    slug: "digital-marketing-services",
    metaTitle: "Digital Marketing Services in USA – Marketinix",
    tone: "green",
    shortDescription:
      "We help USA businesses grow online through SEO, social media, paid campaigns, and data-driven marketing strategies.",
    description:
      "We help USA businesses grow online through SEO, social media, paid campaigns, and data-driven marketing strategies.",
    hero: {
      title: "Professional Digital Marketing Services in USA",
      subtitle:
        "We help USA businesses grow online through SEO, social media, paid campaigns, and data-driven marketing strategies.",
      bullets: [
        "SEO & content marketing",
        "Social media management & ads",
        "Pay-per-click (PPC) campaigns",
        "Analytics, tracking & performance reporting",
      ],
      primaryCta: { label: "Get Free Marketing Consultation", href: "/contact-us" },
      secondaryCta: {
        label: "View Our Marketing Process",
        href: "/services/digital-marketing-services#process",
      },
      trustBarText:
        "5+ Years’ Experience | 100+ Campaigns Delivered | USA Clients | Marketinix",
      image: { src: "/imgs/services/s6-h.jpg", alt: "Digital Marketing Services in USA" },
    },
    problem: {
      eyebrow: "PROBLEM → SOLUTION",
      title: "Common Digital Marketing Challenges",
      points: [
        "Low online visibility",
        "Poor lead generation",
        "Inconsistent social media presence",
        "Ineffective ad campaigns",
        "Lack of measurable results",
      ],
      callout: {
        backdropText: "Our Solution",
        body:
          "At Marketinix, we provide digital marketing services in the USA that drive results.\nFrom SEO and social media to paid campaigns and analytics, we create strategies that attract, engage, and convert your audience.",
      },
      image: {
        src: "/imgs/services/s6-prob.jpg",
        alt: "Common Digital Marketing Challenges",
      },
    },
    includes: {
      title: "OUR DIGITAL MARKETING SERVICES",
      cards: [
        {
          title: "Search Engine Optimization (SEO)",
          text: "Boost your website’s visibility on Google and attract qualified leads with on-page, technical, and local SEO strategies.",
        },
        {
          title: "Social Media Marketing",
          text: "Manage your Facebook, Instagram, LinkedIn, and TikTok profiles with content, engagement, and paid campaigns to grow your audience.",
        },
        {
          title: "Pay-Per-Click (PPC) Advertising",
          text: "Run targeted Google Ads and social media ads to drive high-quality traffic and conversions quickly.",
        },
        {
          title: "Content Marketing",
          text: "Create blogs, videos, and resources that educate your audience, improve SEO, and generate inbound leads.",
        },
        {
          title: "Analytics & Reporting",
          text: "Track performance, ROI, and growth using data-driven insights to optimize marketing efforts continuously.",
        },
      ],
    },
    process: {
      title: "OUR MARKETING PROCESS",
      steps: [
        {
          title: "Discovery & Research",
          text: "Analyze your audience, competitors, and business goals.",
        },
        {
          title: "Strategy & Planning",
          text: "Build a detailed digital marketing plan aligned with your objectives.",
        },
        {
          title: "Execution",
          text: "Implement campaigns across SEO, social media, PPC, and content channels.",
        },
        {
          title: "Monitoring & Optimization",
          text: "Track results and continuously improve campaigns for better ROI.",
        },
        {
          title: "Reporting & Insights",
          text: "Provide clear, actionable reports for transparency and strategy alignment.",
        },
      ],
      image: { src: "/imgs/services/s6-proc.jpg", alt: "OUR MARKETING PROCESS" },
    },
    whyMatters: {
      title: "WHY DIGITAL MARKETING MATTERS",
      items: [
        "Increases brand visibility and reach",
        "Generates high-quality leads",
        "Builds trust and authority online",
        "Improves ROI with measurable campaigns",
        "Supports long-term business growth",
      ],
    },
    whyChoose: {
      title: "WHY CHOOSE MARKETINIX",
      items: [
        "USA-focused digital marketing strategies",
        "Experienced team of marketers & designers",
        "Transparent reporting & clear KPIs",
        "Custom campaigns for your business goals",
        "Affordable packages with measurable results",
      ],
    },
    industries: {
      title: "INDUSTRIES WE SERVE",
      items: [
        "E-commerce & Retail",
        "Startups & Tech Companies",
        "Professional Services",
        "SaaS & Software Platforms",
        "Corporate Businesses",
      ],
    },
    faqs: {
      title: "FAQs",
      items: [
        {
          question: "Q1: What digital marketing services do you provide?",
          answer:
            "A1: We offer SEO, social media, PPC, content marketing, analytics, and performance tracking.",
        },
        {
          question: "Q2: Will you target customers in the USA?",
          answer: "A2: Yes. All campaigns are designed for USA businesses and audiences.",
        },
        {
          question: "Q3: How do I measure results?",
          answer:
            "A3: We provide monthly reports with traffic, leads, conversions, and ROI metrics.",
        },
        {
          question: "Q4: Can you manage both social media and ads?",
          answer: "A4: Yes. We handle organic posts and paid campaigns for maximum results.",
        },
      ],
    },
    cta: {
      title: "Grow Your Business with Marketinix",
      body:
        "Let us create data-driven digital marketing campaigns that attract, engage, and convert your audience in the USA.",
      primary: { label: "Get Free Consultation Today", href: "/contact-us" },
      secondary: null,
    },
    testimonials: null,
    caseStudies: null,
  }),
  makeService({
    name: "Graphic Designing Services in USA",
    slug: "graphic-designing-services",
    metaTitle: "Graphic Designing Services in USA – Marketinix",
    tone: "purple",
    shortDescription:
      "We create visually stunning designs that communicate your brand story, captivate your audience, and drive business growth.",
    description:
      "We create visually stunning designs that communicate your brand story, captivate your audience, and drive business growth.",
    hero: {
      title: "Creative Graphic Designing Services in USA",
      subtitle:
        "We create visually stunning designs that communicate your brand story, captivate your audience, and drive business growth.",
      bullets: [
        "Logos, branding & corporate identity",
        "Marketing materials & social media designs",
        "UI/UX visuals for web & apps",
        "Custom graphics for print and digital campaigns",
      ],
      primaryCta: { label: "Get Free Design Consultation", href: "/contact-us" },
      secondaryCta: { label: "View Our Portfolio", href: "/portfolio" },
      trustBarText:
        "5+ Years of Creative Experience | 100+ Projects Delivered | USA Clients | Marketinix",
      image: { src: "/imgs/services/s7-h.jpg", alt: "Graphic Designing Services in USA" },
    },
    problem: {
      eyebrow: "PROBLEM → SOLUTION",
      title: "Common Design Challenges",
      points: [
        "Generic or inconsistent branding",
        "Low engagement graphics",
        "Poor visual communication",
        "Outdated marketing materials",
        "Lack of creativity & uniqueness",
      ],
      callout: {
        backdropText: "Our Solution",
        body:
          "At Marketinix, we provide graphic designing services in the USA that focus on creativity, consistency, and visual impact.\nFrom branding to digital graphics, we help businesses stand out, build trust, and engage their audience effectively.",
      },
      image: {
        src: "/imgs/services/s7-prob.jpg",
        alt: "Common Design Challenges",
      },
    },
    includes: {
      title: "OUR GRAPHIC DESIGN SERVICES",
      cards: [
        {
          title: "Logo & Branding Design",
          text: "Create a memorable brand identity that resonates with your target audience.",
        },
        {
          title: "Marketing Materials",
          text: "Design brochures, flyers, posters, banners, and promotional materials that communicate your message clearly.",
        },
        {
          title: "Social Media Graphics",
          text: "Engaging visuals for Facebook, Instagram, LinkedIn, and other platforms to grow your online presence.",
        },
        {
          title: "UI/UX Visual Design",
          text: "Custom graphics and visuals for web apps, websites, and mobile applications.",
        },
        {
          title: "Print & Digital Design",
          text: "High-quality designs optimized for both print and digital campaigns.",
        },
      ],
    },
    process: {
      title: "OUR DESIGN PROCESS",
      steps: [
        {
          title: "Discovery & Research",
          text: "Understand your brand, audience, and business goals.",
        },
        { title: "Conceptualization", text: "Develop creative ideas and mood boards." },
        {
          title: "Design Creation",
          text: "Produce high-quality graphics, layouts, and visual elements.",
        },
        {
          title: "Review & Feedback",
          text: "Refine designs based on client feedback for perfection.",
        },
        {
          title: "Delivery & Support",
          text: "Provide final assets in all necessary formats for digital and print.",
        },
      ],
      image: { src: "/imgs/services/s7-proc.jpg", alt: "OUR DESIGN PROCESS" },
    },
    whyMatters: {
      title: "WHY PROFESSIONAL GRAPHIC DESIGN MATTERS",
      items: [
        "Builds a strong and consistent brand identity",
        "Increases audience engagement",
        "Communicates your message clearly",
        "Enhances visual appeal across channels",
        "Supports marketing and sales efforts",
      ],
    },
    whyChoose: {
      title: "WHY CHOOSE MARKETINIX",
      items: [
        "Creative and USA-focused designs",
        "Brand-consistent visuals",
        "Quick turnaround & revisions",
        "High-quality print and digital assets",
        "Affordable packages for USA businesses",
        "Expert team of designers",
      ],
    },
    industries: {
      title: "INDUSTRIES WE SERVE",
      items: [
        "Startups & Tech Companies",
        "E-commerce & Retail",
        "Professional Services",
        "Corporate & Enterprise",
        "Social Media Brands",
      ],
    },
    faqs: {
      title: "FAQs",
      items: [
        {
          question: "Q1: What type of designs do you provide?",
          answer:
            "A1: Logos, branding, marketing materials, social media graphics, UI/UX visuals, and print/digital designs.",
        },
        {
          question: "Q2: Can you create designs for social media campaigns?",
          answer:
            "A2: Yes. We design engaging visuals optimized for Facebook, Instagram, LinkedIn, and other platforms.",
        },
        {
          question: "Q3: Do you provide revisions?",
          answer: "A3: Absolutely. We refine designs based on your feedback until you are satisfied.",
        },
        {
          question: "Q4: Do you offer both digital and print-ready designs?",
          answer:
            "A4: Yes. All designs are delivered in formats suitable for both digital and print use.",
        },
      ],
    },
    cta: {
      title: "Make Your Brand Stand Out with Marketinix",
      body:
        "Let us create creative, professional, and impactful designs that strengthen your brand and engage your audience in the USA.",
      primary: { label: "Get Free Graphic Design Consultation", href: "/contact-us" },
      secondary: null,
    },
    testimonials: null,
    caseStudies: null,
  }),
];

export const getServiceBySlug = (slug) => {
  const normalized = decodeURIComponent(String(slug || "")).trim().toLowerCase();
  return SERVICES.find((s) => s.slug === normalized) || null;
};
