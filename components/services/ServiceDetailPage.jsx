"use client";

import gsap from "gsap";
import { useLayoutEffect, useMemo, useRef } from "react";

import ContactForm from "@/components/contact/ContactForm";
import Faqs from "@/components/home/Faqs";
import Testimonials from "@/components/home/Testimonials";
import BorderGlowCanvas from "@/components/ui/BorderGlowCanvas";
import Button from "@/components/ui/Button";
import { WORK_PROJECTS } from "@/constants/workProjects";
import { cn } from "@/utils/cn";
import { ensureGsap } from "@/utils/gsap";
import { usePrefersReducedMotion } from "@/utils/usePrefersReducedMotion";

import ServiceHero from "./ServiceHero";

const pickProjects = (service) => {
  const slugs = service?.related?.workServiceSlugs || [];
  const matches = slugs.length
    ? WORK_PROJECTS.filter((p) =>
        p.serviceSlugs?.some((s) => slugs.includes(s)),
      )
    : [];

  if (matches.length) return matches.slice(0, 3);
  return WORK_PROJECTS.slice(0, 3);
};

const ThemedSection = ({
  as: Tag = "section",
  id,
  theme = "light",
  labelledBy,
  className,
  children,
}) => {
  const isDark = theme === "dark";
  return (
    <Tag
      id={id}
      data-theme={theme}
      aria-labelledby={labelledBy}
      className={cn(
        "relative w-full border-t px-8",
        isDark
          ? "border-white/10 bg-dark text-light"
          : "border-dark/10 bg-light text-dark",
        className,
      )}
    >
      {children}
    </Tag>
  );
};

const themeTokens = (theme = "light") => {
  const isDark = theme === "dark";
  return {
    isDark,
    overline: isDark ? "text-light/60" : "text-dark/60",
    subtle: isDark ? "text-light/70" : "text-dark/70",
    subtle2: isDark ? "text-light/80" : "text-dark/80",
    border: isDark ? "border-white/10" : "border-dark/10",
    panel: isDark ? "bg-white/5" : "bg-dark/5",
    card: isDark
      ? "border-white/10 bg-white/5 hover:bg-white/10"
      : "border-dark/10 bg-transparent hover:bg-dark/5",
    cardStatic: isDark
      ? "border-white/10 bg-white/5"
      : "border-dark/10 bg-transparent",
    icon: isDark ? "bg-light/70" : "bg-dark/70",
    openBg: isDark ? "open:bg-white/10" : "open:bg-dark/5",
  };
};

const toneDot = (tone) =>
  cn(
    "h-[0.6rem] w-[0.6rem] rotate-45 rounded-[0.1rem] bg-primary",
    tone === "green" && "bg-green",
    tone === "purple" && "bg-purple",
    tone === "blue" && "bg-blue",
    tone === "yellow" && "bg-yellow",
    tone === "orange" && "bg-orange",
    tone === "pink" && "bg-primary",
    tone === "teal" && "bg-green",
    tone === "cyan" && "bg-blue",
    tone === "indigo" && "bg-purple",
    tone === "slate" && "bg-white/60",
  );

const toneBar = (tone) =>
  cn(
    "bg-primary",
    tone === "green" && "bg-green",
    tone === "purple" && "bg-purple",
    tone === "blue" && "bg-blue",
    tone === "yellow" && "bg-yellow",
    tone === "orange" && "bg-orange",
  );

const OrbitIcon = ({ tone, className }) => (
  <span
    aria-hidden="true"
    className={cn(
      "relative inline-flex h-8 w-8 items-center justify-center rounded-full",
      "border border-dark/10 bg-light/80",
      "shadow-[0_0_0_0.1rem_rgba(2,2,2,0.04)]",
      className,
    )}
  >
    <span className={cn("block", toneDot(tone), "h-[0.8rem] w-[0.8rem]")} />
  </span>
);

const SectionThumb = ({ src, alt = "", tokens, tone }) => {
  if (!src) return null;
  return (
    <figure
      data-parallax
      data-parallax-y="10"
      className={cn(
        "mt-10 hidden overflow-hidden rounded-[0.4rem] border min-[1100px]:block",
        tokens.border,
        tokens.panel,
      )}
    >
      <div className="relative aspect-4/3 w-full overflow-hidden">
        <img
          src={src}
          alt={alt}
          className="absolute inset-0 h-full w-full object-cover will-change-transform"
          loading="lazy"
        />
        <span
          aria-hidden="true"
          className={cn(
            "absolute left-6 top-6 z-1 block rotate-45 rounded-[0.12rem]",
            toneDot(tone),
            "h-4 w-4",
          )}
        />
      </div>
    </figure>
  );
};

export default function ServiceDetailPage({ service }) {
  const reducedMotion = usePrefersReducedMotion();
  const rootRef = useRef(null);

  const relatedProjects = useMemo(() => pickProjects(service), [service]);

  useLayoutEffect(() => {
    ensureGsap();

    const root = rootRef.current;
    if (!root) return;

    if (reducedMotion) return;

    const ctx = gsap.context(() => {
      const cleanups = [];

      const revealEls = Array.from(root.querySelectorAll("[data-reveal]"));
      revealEls.forEach((el) => {
        cleanups.push(
          gsap
            .timeline({
              scrollTrigger: { trigger: el, start: "top+=25% bottom" },
            })
            .moveBlur(el, { yPercent: 110 }),
        );
      });

      const groups = Array.from(root.querySelectorAll("[data-reveal-group]"));
      groups.forEach((group) => {
        const items = group.querySelectorAll("[data-reveal-item]");
        if (!items.length) return;
        cleanups.push(
          gsap
            .timeline({
              scrollTrigger: { trigger: group, start: "top+=20% bottom" },
            })
            .moveBlur(items, { yPercent: 80, stagger: 0.08 }),
        );
      });

      const parallax = Array.from(root.querySelectorAll("[data-parallax]"));
      parallax.forEach((wrap) => {
        const img = wrap.querySelector("img");
        if (!img) return;
        gsap.fromTo(
          img,
          { scale: 1.12 },
          {
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: wrap,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
              invalidateOnRefresh: true,
              refreshPriority: -1,
            },
          },
        );
      });

      const parallaxY = Array.from(root.querySelectorAll("[data-parallax-y]"));
      parallaxY.forEach((wrap) => {
        const amountAttr = wrap.getAttribute("data-parallax-y");
        const amount = Number(amountAttr);
        const y = Number.isFinite(amount) ? amount : 12;
        const target = wrap.querySelector("img") || wrap;
        gsap.fromTo(
          target,
          { yPercent: y },
          {
            yPercent: -y,
            ease: "none",
            scrollTrigger: {
              trigger: wrap,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
              invalidateOnRefresh: true,
              refreshPriority: -1,
            },
          },
        );
      });

      const drift = Array.from(root.querySelectorAll("[data-drift-x]"));
      drift.forEach((el) => {
        const amountAttr = el.getAttribute("data-drift-x");
        const amount = Number(amountAttr);
        const x = Number.isFinite(amount) ? amount : 6;
        gsap.fromTo(
          el,
          { xPercent: -x },
          {
            xPercent: x,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
              invalidateOnRefresh: true,
              refreshPriority: -2,
            },
          },
        );
      });

      const progressEls = Array.from(root.querySelectorAll("[data-progress]"));
      progressEls.forEach((wrap) => {
        const line = wrap.querySelector("[data-progress-line]");
        if (!line) return;
        gsap.set(line, { scaleY: 0, transformOrigin: "top" });
        gsap.to(line, {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: wrap,
            start: "top+=10% bottom",
            end: "bottom-=10% top",
            scrub: 1,
            invalidateOnRefresh: true,
            refreshPriority: -1,
          },
        });
      });

      return () => {
        cleanups.forEach((t) => t?.scrollTrigger?.kill?.());
        cleanups.forEach((t) => t?.kill?.());
      };
    }, root);

    return () => ctx.revert();
  }, [reducedMotion, service?.slug]);

  if (!service) return null;

  const overview = service.overview;
  const problem = service.problem;
  const approach = service.approach;
  const includes = service.includes;
  const process = service.process;
  const cta = service.cta;
  const caseStudies = service.caseStudies;
  const results = service.results;
  const faqs = service.faqs?.items || [];

  const hasIncludes = Boolean(
    includes?.intro || includes?.note || (includes?.groups || []).length,
  );
  const hasProcess = Boolean(process?.intro || (process?.steps || []).length);
  const hasFaqs = faqs.length > 0;

  const overviewT = themeTokens(overview?.theme);
  const problemT = themeTokens(problem?.theme);
  const approachT = themeTokens(approach?.theme);
  const includesT = themeTokens(includes?.theme);
  const processT = themeTokens(process?.theme);
  const ctaT = themeTokens(cta?.theme);
  const caseStudiesT = themeTokens(caseStudies?.theme);
  const tone = service?.tone || "default";

  const serviceTestimonials = service?.testimonials;
  const testimonialItems = useMemo(() => {
    if (!serviceTestimonials || serviceTestimonials === null) return [];
    const items = Array.isArray(serviceTestimonials.items)
      ? serviceTestimonials.items
      : [];
    return items
      .map((t) => ({
        text: t.text || (t.quote ? `\u201C${t.quote}\u201D` : "") || "",
        name: t.name,
        role: t.role,
      }))
      .filter((t) => t.text && t.name);
  }, [serviceTestimonials]);

  return (
    <article ref={rootRef} className="relative w-full">
      <ServiceHero service={service} />

      <ThemedSection
        id="service-overview"
        theme={overview?.theme}
        labelledBy="service-overview-title"
      >
        <div className="mx-auto w-full max-w-480 py-32 max-[1099px]:py-24">
          <div className="grid grid-cols-12 gap-14 max-[1099px]:gap-10">
            <header className="col-span-5 max-[1099px]:col-span-12">
              <p
                data-reveal
                className={cn(
                  "text-[1.4rem] uppercase tracking-[0.08em]",
                  overviewT.overline,
                )}
              >
                Service
              </p>
              <h2
                id="service-overview-title"
                data-reveal
                className="mt-6 font-heading text-[5.2rem] leading-[105%] tracking-[-0.02em] max-[1099px]:text-[3.8rem]"
              >
                {overview?.title || "Service overview"}
              </h2>

              <div className="mt-10 hidden min-[1100px]:block">
                <div
                  className={cn(
                    "relative overflow-hidden rounded-[0.6rem] border",
                    overviewT.border,
                  )}
                >
                  <div className={cn("absolute inset-0", overviewT.panel)} />
                  <figure
                    data-parallax
                    data-parallax-y="14"
                    className="relative aspect-7/8 w-full overflow-hidden"
                  >
                    <img
                      src={service?.hero?.image?.src}
                      alt={service?.hero?.image?.alt || ""}
                      className="absolute inset-0 h-full w-full object-cover"
                      loading="lazy"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-dark/0 via-dark/10 to-dark/35" />
                  </figure>
                  <div className="absolute left-8 top-8 flex items-center gap-3">
                    <OrbitIcon
                      tone={tone}
                      className="border-white/10 bg-white/10"
                    />
                    <span
                      className={cn(
                        "text-[1.2rem] uppercase tracking-[0.12em]",
                        overviewT.overline,
                      )}
                    >
                      Editorial build
                    </span>
                  </div>
                </div>
              </div>
            </header>

            <div className="col-span-7 max-[1099px]:col-span-12">
              {overview?.lede && (
                <p
                  data-reveal
                  className={cn(
                    "text-[2.4rem] leading-[150%]",
                    overviewT.subtle,
                  )}
                >
                  {overview.lede}
                </p>
              )}

              {(overview?.body || []).length > 0 && (
                <div className={cn("mt-10 space-y-6", overviewT.subtle)}>
                  {(overview.body || []).map((p) => (
                    <p key={p} data-reveal className="leading-[170%]">
                      {p}
                    </p>
                  ))}
                </div>
              )}

              {(overview?.highlights || []).length > 0 && (
                <div
                  data-reveal-group
                  className="mt-16 grid grid-cols-12 gap-6"
                >
                  {(overview.highlights || []).map((h) => (
                    <article
                      key={h.title}
                      data-reveal-item
                      className={cn(
                        "relative col-span-6 overflow-hidden rounded-[0.6rem] border p-8 max-[1099px]:col-span-12",
                        overviewT.cardStatic,
                      )}
                    >
                      <BorderGlowCanvas
                        enabled={!reducedMotion}
                        color={
                          overviewT.isDark ? "251, 251, 244" : "34, 34, 32"
                        }
                        size={140}
                      />
                      <div className="relative z-3">
                        <div className="flex items-center justify-between gap-6">
                          <h3 className="font-heading text-[2.6rem] leading-[120%]">
                            {h.title}
                          </h3>
                          <OrbitIcon
                            tone={tone}
                            className={
                              overviewT.isDark
                                ? "border-white/10 bg-white/10"
                                : ""
                            }
                          />
                        </div>
                        <p
                          className={cn(
                            "mt-5 leading-[170%]",
                            overviewT.subtle,
                          )}
                        >
                          {h.text}
                        </p>
                      </div>
                    </article>
                  ))}
                </div>
              )}

              <div className="mt-16 grid grid-cols-12 gap-6 max-[1099px]:mt-12">
                <figure
                  data-reveal
                  data-parallax
                  data-parallax-y="12"
                  className={cn(
                    "relative col-span-5 overflow-hidden rounded-[0.6rem] border max-[1099px]:col-span-12",
                    overviewT.border,
                    overviewT.panel,
                  )}
                >
                  <div className="relative aspect-16/10 w-full overflow-hidden">
                    <img
                      src={
                        service?.caseStudies?.image?.src ||
                        service?.hero?.image?.src
                      }
                      alt={service?.caseStudies?.image?.alt || ""}
                      className="absolute inset-0 h-full w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                </figure>
                <div className="col-span-7 max-[1099px]:col-span-12">
                  <div
                    data-reveal
                    className={cn(
                      "relative overflow-hidden rounded-[0.6rem] border p-10",
                      overviewT.cardStatic,
                    )}
                  >
                    <div
                      data-drift-x="4"
                      aria-hidden="true"
                      className={cn(
                        "pointer-events-none absolute -top-10 left-0 whitespace-nowrap font-heading text-[10rem] leading-[100%] opacity-[0.05]",
                        overviewT.isDark ? "text-light" : "text-dark",
                      )}
                    >
                      {service?.name}
                    </div>
                    <div className="relative z-2">
                      <p
                        className={cn(
                          "text-[1.4rem] uppercase tracking-[0.08em]",
                          overviewT.overline,
                        )}
                      >
                        What you get
                      </p>
                      <p
                        className={cn(
                          "mt-4 max-w-6xl leading-[170%]",
                          overviewT.subtle,
                        )}
                      >
                        A cohesive system of components, editorial spacing, and
                        motion that turns your service into a clear narrative
                        \u2014 so visitors understand value fast and act with
                        confidence.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ThemedSection>

      {problem && (
        <ThemedSection
          id="problem"
          theme={problem?.theme}
          labelledBy="problem-title"
        >
          <div className="mx-auto w-full max-w-480 py-32 max-[1099px]:py-24">
            <div className="grid grid-cols-12 gap-14 max-[1099px]:gap-10">
              <header className="col-span-5 max-[1099px]:col-span-12">
                <p
                  data-reveal
                  className={cn(
                    "text-[1.4rem] uppercase tracking-[0.08em]",
                    problemT.overline,
                  )}
                >
                  Focus
                </p>
                <h2
                  id="problem-title"
                  data-reveal
                  className="mt-6 font-heading text-[5.2rem] leading-[105%] tracking-[-0.02em] max-[1099px]:text-[3.8rem]"
                >
                  {problem?.title || "The problem we solve"}
                </h2>

                <div
                  data-reveal
                  className={cn(
                    "relative mt-10 overflow-hidden rounded-[0.6rem] border p-10",
                    problemT.cardStatic,
                  )}
                >
                  <div
                    data-drift-x="5"
                    aria-hidden="true"
                    className={cn(
                      "pointer-events-none absolute -top-10 left-0 whitespace-nowrap font-heading text-[12rem] leading-[100%] opacity-[0.06]",
                      problemT.isDark ? "text-light" : "text-dark",
                    )}
                  >
                    Pain points
                  </div>
                  <p
                    className={cn(
                      "relative z-2 leading-[170%]",
                      problemT.subtle,
                    )}
                  >
                    We isolate the friction that stops users from understanding,
                    trusting, or converting \u2014 then remove it with
                    structure, clarity, and performance.
                  </p>
                </div>
              </header>

              <div className="col-span-7 max-[1099px]:col-span-12">
                {(problem?.body || []).length > 0 && (
                  <div className={cn("space-y-6", problemT.subtle)}>
                    {(problem.body || []).map((p) => (
                      <p key={p} data-reveal className="leading-[170%]">
                        {p}
                      </p>
                    ))}
                  </div>
                )}

                {(problem?.points || []).length > 0 && (
                  <div className="mt-14 grid grid-cols-12 gap-6 max-[1099px]:mt-10">
                    <figure
                      data-reveal
                      data-parallax
                      data-parallax-y="16"
                      className={cn(
                        "relative col-span-5 overflow-hidden rounded-[0.6rem] border max-[1099px]:col-span-12",
                        problemT.border,
                        problemT.panel,
                      )}
                    >
                      <div className="relative aspect-4/5 w-full overflow-hidden">
                        <img
                          src={
                            service?.caseStudies?.image?.src ||
                            service?.hero?.image?.src
                          }
                          alt={service?.caseStudies?.image?.alt || ""}
                          className="absolute inset-0 h-full w-full object-cover"
                          loading="lazy"
                        />
                      </div>
                    </figure>

                    <ul
                      data-reveal-group
                      className="col-span-7 space-y-4 max-[1099px]:col-span-12"
                    >
                      {(problem.points || []).map((point) => (
                        <li
                          key={point}
                          data-reveal-item
                          className={cn(
                            "group relative overflow-hidden rounded-[0.6rem] border p-8",
                            "transition-[transform,background-color] duration-600 ease-ease hover:-translate-y-1",
                            problemT.cardStatic,
                          )}
                        >
                          <BorderGlowCanvas
                            enabled={!reducedMotion}
                            color={
                              problemT.isDark ? "251, 251, 244" : "34, 34, 32"
                            }
                            size={120}
                          />
                          <div className="relative z-3 flex items-start gap-4">
                            <OrbitIcon
                              tone={tone}
                              className={
                                problemT.isDark
                                  ? "border-white/10 bg-white/10"
                                  : ""
                              }
                            />
                            <p
                              className={cn("leading-[170%]", problemT.subtle2)}
                            >
                              {point}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </ThemedSection>
      )}

      {approach && (
        <ThemedSection
          id="approach"
          theme={approach?.theme}
          labelledBy="approach-title"
        >
          <div className="mx-auto w-full max-w-480 py-32 max-[1099px]:py-24">
            <div className="grid grid-cols-12 gap-14 max-[1099px]:gap-10">
              <header className="col-span-4 self-start max-[1099px]:col-span-12 min-[1100px]:sticky min-[1100px]:top-40">
                <p
                  data-reveal
                  className={cn(
                    "text-[1.4rem] uppercase tracking-[0.08em]",
                    approachT.overline,
                  )}
                >
                  Approach
                </p>
                <h2
                  id="approach-title"
                  data-reveal
                  className="mt-6 font-heading text-[5.2rem] leading-[105%] tracking-[-0.02em] max-[1099px]:text-[3.8rem]"
                >
                  {approach?.title || "Our approach"}
                </h2>

                <div
                  data-reveal
                  className={cn(
                    "mt-10 overflow-hidden rounded-[0.6rem] border",
                    approachT.border,
                  )}
                >
                  <figure
                    data-parallax
                    data-parallax-y="10"
                    className={cn(
                      "relative aspect-16/12 w-full overflow-hidden",
                      approachT.panel,
                    )}
                  >
                    <img
                      src={service?.hero?.image?.src}
                      alt={service?.hero?.image?.alt || ""}
                      className="absolute inset-0 h-full w-full object-cover"
                      loading="lazy"
                    />
                  </figure>
                </div>
              </header>

              <div className="relative col-span-8 max-[1099px]:col-span-12">
                <div
                  data-drift-x="6"
                  aria-hidden="true"
                  className={cn(
                    "pointer-events-none absolute left-0 top-0 z-0 whitespace-nowrap font-heading text-[16rem] leading-[100%] opacity-[0.04]",
                    approachT.isDark ? "text-light" : "text-dark",
                    "max-[1099px]:hidden",
                  )}
                >
                  Method
                </div>

                {(approach?.body || []).length > 0 && (
                  <div
                    className={cn("relative z-1 space-y-6", approachT.subtle)}
                  >
                    {(approach.body || []).map((p) => (
                      <p key={p} data-reveal className="leading-[170%]">
                        {p}
                      </p>
                    ))}
                  </div>
                )}

                {(approach?.steps || []).length > 0 && (
                  <div
                    data-progress
                    className="relative z-1 mt-16 pl-12 max-[1099px]:pl-0"
                  >
                    <div
                      aria-hidden="true"
                      className={cn(
                        "absolute left-0 top-0 h-full w-px max-[1099px]:hidden",
                        approachT.isDark ? "bg-white/10" : "bg-dark/10",
                      )}
                    />
                    <div
                      data-progress-line
                      aria-hidden="true"
                      className={cn(
                        "absolute left-0 top-0 h-full w-px max-[1099px]:hidden",
                        toneBar(tone),
                      )}
                    />

                    <ol data-reveal-group className="space-y-4">
                      {(approach.steps || []).map((step, index) => (
                        <li
                          key={step.title}
                          data-reveal-item
                          className={cn(
                            "group relative overflow-hidden rounded-[0.6rem] border p-8",
                            "transition-[transform,background-color] duration-600 ease-ease hover:-translate-y-1",
                            approachT.cardStatic,
                          )}
                        >
                          <BorderGlowCanvas
                            enabled={!reducedMotion}
                            color={
                              approachT.isDark ? "251, 251, 244" : "34, 34, 32"
                            }
                            size={140}
                          />
                          <div className="relative z-3 flex items-start gap-6 max-[1099px]:gap-4">
                            <div className="mt-1 flex items-center gap-4">
                              <p
                                className={cn(
                                  "text-[1.4rem] uppercase tracking-[0.08em]",
                                  approachT.overline,
                                )}
                              >
                                {(index + 1).toString().padStart(2, "0")}
                              </p>
                              <OrbitIcon
                                tone={tone}
                                className={
                                  approachT.isDark
                                    ? "border-white/10 bg-white/10"
                                    : ""
                                }
                              />
                            </div>
                            <div className="min-w-0">
                              <h3 className="font-heading text-[2.8rem] leading-[120%]">
                                {step.title}
                              </h3>
                              <p
                                className={cn(
                                  "mt-4 leading-[170%]",
                                  approachT.subtle,
                                )}
                              >
                                {step.text}
                              </p>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ol>
                  </div>
                )}
              </div>
            </div>
          </div>
        </ThemedSection>
      )}

      {hasIncludes && (
        <ThemedSection
          id="includes"
          theme={includes?.theme}
          labelledBy="includes-title"
        >
          <div className="mx-auto w-full max-w-480 py-32 max-[1099px]:py-24">
            <header className="mx-auto max-w-6xl text-center">
              <p
                data-reveal
                className={cn(
                  "text-[1.4rem] uppercase tracking-[0.08em]",
                  includesT.overline,
                )}
              >
                Includes
              </p>
              <h2
                id="includes-title"
                data-reveal
                className="mt-6 font-heading text-[6.4rem] leading-[95%] tracking-[-0.02em] max-[1099px]:text-[4.2rem]"
              >
                {includes?.title || "What\u2019s included"}
              </h2>
              {includes?.intro && (
                <p
                  data-reveal
                  className={cn("mt-8 leading-[170%]", includesT.subtle)}
                >
                  {includes.intro}
                </p>
              )}
            </header>

            <div className="mt-18 grid grid-cols-12 gap-6 max-[1099px]:mt-12">
              <figure
                data-reveal
                data-parallax
                data-parallax-y="10"
                className={cn(
                  "relative col-span-4 overflow-hidden rounded-[0.6rem] border max-[1099px]:col-span-12",
                  includesT.border,
                  includesT.panel,
                )}
              >
                <div className="relative aspect-16/10 w-full overflow-hidden">
                  <img
                    src={service?.hero?.image?.src}
                    alt={service?.hero?.image?.alt || ""}
                    className="absolute inset-0 h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
              </figure>
              <figure
                data-reveal
                data-parallax
                data-parallax-y="14"
                className={cn(
                  "relative col-span-4 overflow-hidden rounded-[0.6rem] border max-[1099px]:col-span-12",
                  includesT.border,
                  includesT.panel,
                )}
              >
                <div className="relative aspect-16/10 w-full overflow-hidden">
                  <img
                    src={
                      service?.caseStudies?.image?.src ||
                      service?.hero?.image?.src
                    }
                    alt={service?.caseStudies?.image?.alt || ""}
                    className="absolute inset-0 h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
              </figure>
              <div
                data-reveal
                className={cn(
                  "relative col-span-4 overflow-hidden rounded-[0.6rem] border p-10 max-[1099px]:col-span-12",
                  includesT.cardStatic,
                )}
              >
                <div
                  data-drift-x="4"
                  aria-hidden="true"
                  className={cn(
                    "pointer-events-none absolute -top-10 left-0 whitespace-nowrap font-heading text-[10rem] leading-[100%] opacity-[0.05]",
                    includesT.isDark ? "text-light" : "text-dark",
                  )}
                >
                  Scope
                </div>
                <p
                  className={cn(
                    "relative z-2 leading-[170%]",
                    includesT.subtle,
                  )}
                >
                  A structured scope that keeps momentum high: clear
                  deliverables, predictable collaboration, and enough
                  flexibility to iterate without losing direction.
                </p>
              </div>
            </div>

            {(includes?.groups || []).length > 0 && (
              <div className="mt-18 space-y-6 max-[1099px]:mt-12">
                {(includes.groups || []).map((group, idx) => {
                  const mediaSrc =
                    idx % 2 === 0
                      ? service?.hero?.image?.src
                      : service?.caseStudies?.image?.src ||
                        service?.hero?.image?.src;
                  const mediaAlt =
                    idx % 2 === 0
                      ? service?.hero?.image?.alt || ""
                      : service?.caseStudies?.image?.alt || "";

                  return (
                    <article
                      key={group.title}
                      data-reveal-group
                      className={cn(
                        "grid grid-cols-12 gap-6",
                        idx % 2 === 0
                          ? ""
                          : "min-[1100px]:**:data-media:order-2",
                      )}
                    >
                      <figure
                        data-reveal-item
                        data-media
                        data-parallax
                        data-parallax-y={idx % 2 === 0 ? "12" : "16"}
                        className={cn(
                          "relative col-span-5 overflow-hidden rounded-[0.6rem] border max-[1099px]:col-span-12",
                          includesT.border,
                          includesT.panel,
                        )}
                      >
                        <div className="relative aspect-4/3 w-full overflow-hidden">
                          <img
                            src={mediaSrc}
                            alt={mediaAlt}
                            className="absolute inset-0 h-full w-full object-cover"
                            loading="lazy"
                          />
                        </div>
                        <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-dark/0 via-dark/10 to-dark/40" />
                      </figure>

                      <section
                        data-reveal-item
                        className={cn(
                          "relative col-span-7 overflow-hidden rounded-[0.6rem] border p-10 max-[1099px]:col-span-12",
                          includesT.cardStatic,
                        )}
                      >
                        <BorderGlowCanvas
                          enabled={!reducedMotion}
                          color={
                            includesT.isDark ? "251, 251, 244" : "34, 34, 32"
                          }
                          size={160}
                        />
                        <div className="relative z-3">
                          <div className="flex items-center justify-between gap-6">
                            <div className="flex items-center gap-4">
                              <OrbitIcon
                                tone={tone}
                                className={
                                  includesT.isDark
                                    ? "border-white/10 bg-white/10"
                                    : ""
                                }
                              />
                              <h3 className="font-heading text-[3.2rem] leading-[110%]">
                                {group.title}
                              </h3>
                            </div>
                            <span
                              className={cn(
                                "text-[1.4rem] uppercase tracking-[0.08em]",
                                includesT.overline,
                              )}
                            >
                              {(idx + 1).toString().padStart(2, "0")}
                            </span>
                          </div>

                          <ul
                            className={cn(
                              "mt-8 grid grid-cols-2 gap-4",
                              includesT.subtle,
                              "max-[1099px]:grid-cols-1",
                            )}
                          >
                            {(group.items || []).map((item) => (
                              <li
                                key={item}
                                className="flex items-start gap-4 leading-[170%]"
                              >
                                <span
                                  aria-hidden="true"
                                  className={cn(
                                    "mt-[0.7rem] shrink-0",
                                    toneDot(tone),
                                  )}
                                />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </section>
                    </article>
                  );
                })}
              </div>
            )}

            {includes?.note && (
              <p
                data-reveal
                className={cn(
                  "mx-auto mt-12 max-w-6xl text-center leading-[170%]",
                  includesT.overline,
                )}
              >
                {includes.note}
              </p>
            )}
          </div>
        </ThemedSection>
      )}

      {hasProcess && (
        <ThemedSection
          id="process"
          theme={process?.theme}
          labelledBy="process-title"
        >
          <div className="mx-auto w-full max-w-480 py-32 max-[1099px]:py-24">
            <div className="flex items-end justify-between gap-10 max-[1099px]:flex-col max-[1099px]:items-start">
              <div className="max-w-6xl">
                <p
                  data-reveal
                  className={cn(
                    "text-[1.4rem] uppercase tracking-[0.08em]",
                    processT.overline,
                  )}
                >
                  Process
                </p>
                <h2
                  id="process-title"
                  data-reveal
                  className="mt-6 font-heading text-[6.4rem] leading-[95%] tracking-[-0.02em] max-[1099px]:text-[4.2rem]"
                >
                  {process?.title || "Process"}
                </h2>
                {process?.intro && (
                  <p
                    data-reveal
                    className={cn(
                      "mt-8 max-w-6xl leading-[170%]",
                      processT.subtle,
                    )}
                  >
                    {process.intro}
                  </p>
                )}
              </div>

              <div
                data-reveal
                className={cn(
                  "hidden items-center gap-3 rounded-full border px-6 py-4 min-[1100px]:flex",
                  processT.border,
                  processT.panel,
                )}
              >
                <span aria-hidden="true" className={toneDot(tone)} />
                <span
                  className={cn(
                    "text-[1.2rem] uppercase tracking-[0.12em]",
                    processT.overline,
                  )}
                >
                  Scroll to follow the steps
                </span>
              </div>
            </div>

            <div className="mt-18 grid grid-cols-12 gap-6 max-[1099px]:mt-12">
              <aside className="col-span-5 self-start max-[1099px]:col-span-12 min-[1100px]:sticky min-[1100px]:top-40">
                <figure
                  data-reveal
                  data-parallax
                  data-parallax-y="14"
                  className={cn(
                    "relative overflow-hidden rounded-[0.6rem] border",
                    processT.border,
                    processT.panel,
                  )}
                >
                  <div className="relative aspect-4/5 w-full overflow-hidden">
                    <img
                      src={service?.hero?.image?.src}
                      alt={service?.hero?.image?.alt || ""}
                      className="absolute inset-0 h-full w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                </figure>

                <div
                  data-reveal
                  className={cn(
                    "relative mt-6 overflow-hidden rounded-[0.6rem] border p-10",
                    processT.cardStatic,
                  )}
                >
                  <div
                    data-drift-x="4"
                    aria-hidden="true"
                    className={cn(
                      "pointer-events-none absolute -top-10 left-0 whitespace-nowrap font-heading text-[10rem] leading-[100%] opacity-[0.05]",
                      processT.isDark ? "text-light" : "text-dark",
                    )}
                  >
                    Delivery
                  </div>
                  <p
                    className={cn(
                      "relative z-2 leading-[170%]",
                      processT.subtle,
                    )}
                  >
                    A lightweight cadence designed for speed: crisp checkpoints,
                    clear feedback loops, and scope control that keeps quality
                    high without slowing decisions.
                  </p>
                </div>
              </aside>

              <div className="col-span-7 max-[1099px]:col-span-12">
                {(process?.steps || []).length > 0 && (
                  <div
                    data-progress
                    className="relative pl-12 max-[1099px]:pl-0"
                  >
                    <div
                      aria-hidden="true"
                      className={cn(
                        "absolute left-0 top-0 h-full w-px max-[1099px]:hidden",
                        processT.isDark ? "bg-white/10" : "bg-dark/10",
                      )}
                    />
                    <div
                      data-progress-line
                      aria-hidden="true"
                      className={cn(
                        "absolute left-0 top-0 h-full w-px max-[1099px]:hidden",
                        toneBar(tone),
                      )}
                    />

                    <ol data-reveal-group className="space-y-4">
                      {(process.steps || []).map((step, index) => (
                        <li
                          key={step.title}
                          data-reveal-item
                          className={cn(
                            "group relative overflow-hidden rounded-[0.6rem] border p-10",
                            "transition-[transform,background-color] duration-600 ease-ease hover:-translate-y-1",
                            processT.cardStatic,
                          )}
                        >
                          <BorderGlowCanvas
                            enabled={!reducedMotion}
                            color={
                              processT.isDark ? "251, 251, 244" : "34, 34, 32"
                            }
                            size={160}
                          />
                          <div className="relative z-3 flex items-start gap-6">
                            <div className="mt-1 flex items-center gap-4">
                              <span
                                className={cn(
                                  "inline-flex h-12 w-12 items-center justify-center rounded-full border",
                                  processT.isDark
                                    ? "border-white/10 bg-white/5"
                                    : "border-dark/10 bg-dark/5",
                                )}
                              >
                                <span
                                  className={cn(
                                    "text-[1.4rem] uppercase tracking-[0.08em]",
                                    processT.overline,
                                  )}
                                >
                                  {(index + 1).toString().padStart(2, "0")}
                                </span>
                              </span>
                              <OrbitIcon
                                tone={tone}
                                className={
                                  processT.isDark
                                    ? "border-white/10 bg-white/10"
                                    : ""
                                }
                              />
                            </div>
                            <div className="min-w-0">
                              <h3 className="font-heading text-[3.2rem] leading-[110%]">
                                {step.title}
                              </h3>
                              <p
                                className={cn(
                                  "mt-4 leading-[170%]",
                                  processT.subtle,
                                )}
                              >
                                {step.text}
                              </p>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ol>
                  </div>
                )}
              </div>
            </div>
          </div>
        </ThemedSection>
      )}

      {cta && (
        <ThemedSection id="cta" theme={cta?.theme} labelledBy="cta-title">
          <div className="mx-auto w-full max-w-480 py-40 max-[1099px]:py-28">
            <div className="grid grid-cols-12 gap-12 max-[1099px]:gap-10">
              <header className="col-span-7 max-[1099px]:col-span-12">
                <p
                  data-reveal
                  className={cn(
                    "text-[1.4rem] uppercase tracking-[0.08em]",
                    ctaT.overline,
                  )}
                >
                  Next
                </p>
                <h2
                  id="cta-title"
                  data-reveal
                  className="mt-6 font-heading text-[6.4rem] leading-[95%] tracking-[-0.02em] max-[1099px]:text-[4.2rem]"
                >
                  {cta.title}
                </h2>
                <p
                  data-reveal
                  className={cn("mt-8 max-w-6xl leading-[170%]", ctaT.subtle)}
                >
                  {cta.body}
                </p>
              </header>

              <div
                data-reveal-group
                className="col-span-5 flex flex-col justify-end gap-4 max-[1099px]:col-span-12"
              >
                <div data-reveal-item>
                  <Button
                    href={cta.primary?.href}
                    variant="magnetic"
                    tone={service?.tone}
                    className="h-24"
                  >
                    {cta.primary?.label}
                  </Button>
                </div>
                <div data-reveal-item>
                  <Button
                    href={cta.secondary?.href}
                    tone="light"
                    className={cn("h-24", ctaT.isDark && "text-light")}
                  >
                    {cta.secondary?.label}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </ThemedSection>
      )}

      {serviceTestimonials !== null && testimonialItems.length > 0 && (
        <Testimonials
          overline={serviceTestimonials?.overline || "Testimonials"}
          title={serviceTestimonials?.title}
          items={testimonialItems}
        />
      )}

      {caseStudies && (
        <ThemedSection
          id="case-studies"
          theme={caseStudies?.theme}
          labelledBy="case-studies-title"
        >
          <div className="mx-auto w-full max-w-480 py-32 max-[1099px]:py-24">
            <div className="flex items-end justify-between gap-8 max-[1099px]:flex-col max-[1099px]:items-start">
              <div>
                <p
                  data-reveal
                  className={cn(
                    "text-[1.4rem] uppercase tracking-[0.08em]",
                    caseStudiesT.overline,
                  )}
                >
                  Proof
                </p>
                <h2
                  id="case-studies-title"
                  data-reveal
                  className="mt-6 font-heading text-[4.4rem] leading-[110%] max-[1099px]:text-[3.4rem]"
                >
                  {caseStudies.title || "Case studies"}
                </h2>
                <p
                  data-reveal
                  className={cn(
                    "mt-8 max-w-6xl leading-[170%]",
                    caseStudiesT.subtle,
                  )}
                >
                  {caseStudies.intro}
                </p>
              </div>
              <div data-reveal>
                <Button
                  href="/work"
                  tone="dark"
                  className={cn("h-16", caseStudiesT.isDark && "text-light")}
                >
                  View all work
                </Button>
              </div>
            </div>

            {results && (results?.items || []).length > 0 && (
              <div className="mt-16 grid grid-cols-12 gap-6">
                <div className="col-span-4 max-[1099px]:col-span-12">
                  <h3
                    data-reveal
                    className="font-heading text-[2.6rem] leading-[120%]"
                  >
                    {results.title || "Results"}
                  </h3>
                  {results?.intro && (
                    <p
                      data-reveal
                      className={cn("mt-6 leading-[170%]", caseStudiesT.subtle)}
                    >
                      {results.intro}
                    </p>
                  )}
                </div>
                <ul
                  data-reveal-group
                  className="col-span-8 grid grid-cols-2 gap-6 max-[1099px]:col-span-12 max-[1099px]:grid-cols-1"
                >
                  {(results.items || []).map((r) => (
                    <li
                      key={r}
                      data-reveal-item
                      className={cn(
                        "rounded-[0.4rem] border p-8",
                        caseStudiesT.cardStatic,
                      )}
                    >
                      <p className={cn("leading-[170%]", caseStudiesT.subtle2)}>
                        {r}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {caseStudies?.image?.src && (
              <figure
                data-parallax
                className={cn(
                  "mt-18 overflow-hidden rounded-[0.4rem] border",
                  caseStudiesT.border,
                  caseStudiesT.panel,
                )}
              >
                <div className="relative aspect-[3/1.1] w-full overflow-hidden max-[1099px]:aspect-[3/1.4]">
                  <img
                    src={caseStudies.image.src}
                    alt={caseStudies.image.alt || ""}
                    className="absolute inset-0 h-full w-full object-cover will-change-transform"
                    loading="lazy"
                  />
                </div>
              </figure>
            )}

            <div data-reveal-group className="mt-18 grid grid-cols-12 gap-6">
              {relatedProjects.map((p) => (
                <div
                  key={p.href}
                  data-reveal-item
                  className={cn(
                    "group col-span-4 overflow-hidden rounded-[0.4rem] border max-[1099px]:col-span-12",
                    caseStudiesT.card,
                  )}
                >
                  <figure
                    className={cn(
                      "relative aspect-[3/1.8] w-full overflow-hidden",
                      caseStudiesT.panel,
                    )}
                  >
                    <img
                      src={p.image}
                      alt=""
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-ease group-hover:scale-[1.05]"
                      loading="lazy"
                    />
                  </figure>
                  <div className="p-8">
                    <p
                      className={cn(
                        "text-[1.4rem] uppercase tracking-[0.08em]",
                        caseStudiesT.overline,
                      )}
                    >
                      {p.client}
                    </p>
                    <h3 className="mt-3 font-heading text-[2.6rem] leading-[120%]">
                      {p.title}
                    </h3>
                    <p className={cn("mt-4", caseStudiesT.subtle)}>
                      {p.services?.slice?.(0, 3)?.join?.(", ")}
                    </p>
                    <span
                      className={cn(
                        "mt-6 inline-flex items-center text-[1.6rem] transition-colors duration-300",
                        caseStudiesT.subtle,
                        caseStudiesT.isDark
                          ? "group-hover:text-light"
                          : "group-hover:text-dark",
                      )}
                    >
                      View project
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ThemedSection>
      )}

      {hasFaqs && (
        <Faqs light title={service?.faqs?.title || "FAQs"} items={faqs} />
      )}

      <section aria-label="Contact">
        <ContactForm />
      </section>
    </article>
  );
}
