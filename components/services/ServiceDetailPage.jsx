"use client";

import gsap from "gsap";
import { useLayoutEffect, useMemo, useRef } from "react";

import ContactForm from "@/components/contact/ContactForm";
import Faqs from "@/components/home/Faqs";
import Testimonials from "@/components/home/Testimonials";
import { ensureGsap } from "@/utils/gsap";
import { usePrefersReducedMotion } from "@/utils/usePrefersReducedMotion";

import PreFooter from "../home/PreFooter";
import ServiceHero from "./ServiceHero";
import ServiceApproachSection from "./detail/ServiceApproachSection";
import ServiceCaseStudiesSection from "./detail/ServiceCaseStudiesSection";
import ServiceCtaSection from "./detail/ServiceCtaSection";
import ServiceIncludesSection from "./detail/ServiceIncludesSection";
import ServiceIndustriesSection from "./detail/ServiceIndustriesSection";
import ServiceOverviewSection from "./detail/ServiceOverviewSection";
import ServiceProblemSection from "./detail/ServiceProblemSection";
import ServiceProcessSection from "./detail/ServiceProcessSection";
import ServiceWhyChooseSection from "./detail/ServiceWhyChooseSection";
import ServiceWhyMattersSection from "./detail/ServiceWhyMattersSection";
import { themeTokens } from "./detail/serviceDetailPrimitives";

export default function ServiceDetailPage({ service }) {
  const reducedMotion = usePrefersReducedMotion();
  const rootRef = useRef(null);
  const caseStudyItems = service?.caseStudies?.items || [];
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
  const whyMatters = service.whyMatters;
  const whyChoose = service.whyChoose;
  const industries = service.industries;
  const caseStudies = service.caseStudies;
  const results = service.results;
  const faqs = service.faqs?.items || [];
  const hasFaqs = faqs.length > 0;

  const overviewT = themeTokens(overview?.theme);
  const problemT = themeTokens(problem?.theme);
  const approachT = themeTokens(approach?.theme);
  const includesT = themeTokens(includes?.theme);
  const processT = themeTokens(process?.theme);
  const ctaT = themeTokens(cta?.theme);
  const caseStudiesT = themeTokens(caseStudies?.theme);
  const tone = service?.tone || "default";

  return (
    <article ref={rootRef} className="relative w-full">
      <ServiceHero service={service} />
      <ServiceOverviewSection
        service={service}
        overview={overview}
        overviewT={overviewT}
        tone={tone}
        reducedMotion={reducedMotion}
      />
      <ServiceProblemSection
        service={service}
        problem={problem}
        problemT={problemT}
        tone={tone}
        reducedMotion={reducedMotion}
      />
      <ServiceApproachSection
        approach={approach}
        approachT={approachT}
        tone={tone}
        reducedMotion={reducedMotion}
      />
      <ServiceIncludesSection
        includes={includes}
        includesT={includesT}
        tone={tone}
        reducedMotion={reducedMotion}
      />
      <ServiceProcessSection
        process={process}
        processT={processT}
        tone={tone}
        reducedMotion={reducedMotion}
      />
      <ServiceWhyMattersSection
        whyMatters={whyMatters}
        tone={tone}
        reducedMotion={reducedMotion}
      />
      <ServiceWhyChooseSection whyChoose={whyChoose} tone={tone} />
      <ServiceIndustriesSection industries={industries} tone={tone} />

      {serviceTestimonials !== null && testimonialItems.length > 0 && (
        <Testimonials
          overline={serviceTestimonials?.overline}
          title={serviceTestimonials?.title}
          items={testimonialItems}
        />
      )}
      <ServiceCaseStudiesSection
        caseStudies={caseStudies}
        caseStudiesT={caseStudiesT}
        results={results}
        caseStudyItems={caseStudyItems}
      />

      <ServiceCtaSection cta={cta} ctaT={ctaT} serviceTone={tone} />
      {hasFaqs && <Faqs light title={service?.faqs?.title} items={faqs} />}

      <section aria-label={service?.pageCopy?.contactSectionLabel}>
        <ContactForm />
      </section>

      <PreFooter />
    </article>
  );
}
