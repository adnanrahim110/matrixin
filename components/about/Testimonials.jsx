"use client";

import gsap from "gsap";
import { memo, useLayoutEffect, useRef } from "react";

import { cn } from "@/utils/cn";
import { ensureGsap } from "@/utils/gsap";

const TESTIMONIALS = [
  {
    quote:
      "The team at Estrela have been amazing and critical to our UI/UX journey, they challenge our thoughts for the better and have allowed us to become South Africa's fastest-growing Buy Now Pay Later platform. I cannot recommend them enough.",
    name: "Craig Newborn",
    title: "Former CEO, PayJustNow",
  },
  {
    quote:
      "Working with Estrela Studio has been a genuinely outstanding experience. Their team brings a rare combination of creativity, technical expertise, and collaborative spirit. Estrela met us exactly where we were – they listened closely, understood the strategic goals and translated that direction into clear, compelling visual design.",
    name: "Donna Blackwell-Kopotic",
    title: "Sims Lifecycle Service (US)",
  },
  {
    quote:
      "The Estrela team have a grasp of branding and product design like I've never seen before. We searched the globe for a tech-focused CI design agency and found that the top talent was right here in Cape Town.",
    name: "Colleen Harrison",
    title: "Former Head of Marketing, Payfast",
  },
  {
    quote:
      "Working with Natalia and the Estrela team is like working with a bomb squad. They know exactly which wires to cut to get exactly the results we were looking for. They are the only agency we have on speed dial.",
    name: "Jason Bagley",
    title: "Founder and CEO, Growth Experts (US)",
  },
  {
    quote:
      "Working with Natalia and the Estrela team on the HelpGuide rebrand has been a true pleasure. Their design approach is strategic, thoughtful, and truly user-centric, and we couldn't be more pleased with the results.",
    name: "Melinda Smith",
    title: "Executive Director & Editor in Chief, HelpGuide (US)",
  },
  {
    quote:
      "The team at Estrela Studio are a powerhouse squad of design, UI and UX professionals. Their DNA can be found in our brand for good reason. Smart, dedicated and always tackling each new brief with diligence and enthusiasm.",
    name: "Mark McChlery",
    title: "Chief Data and Analytics Officer, PayJustNow",
  },
  {
    quote:
      "Working with Estrela Studio has been a truly special experience. Leigh and Kristen invested themselves in our journey, capturing the essence of our brand and going the extra mile at every step. Their creativity, care, and dedication shine through in a site that feels world-class and truly ours.",
    name: "Keith Hesketh",
    title: "Marketing & eCommerce Manager, Yucca Packaging",
  },
  {
    quote:
      "Working with the Estrela team was a joy. The experience of turning an idea into a product design has the potential to be chaotic and overwhelming, but the experts at Estrela knew how to ask the right questions and turn the answers into a structured, clear design process.",
    name: "Brianna Bond",
    title: "CEO, LCFO (US)",
  },
];

const Testimonials = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const trackRef = useRef(null);

  useLayoutEffect(() => {
    ensureGsap();

    const section = sectionRef.current;
    const titleEl = titleRef.current;
    const track = trackRef.current;

    if (!section || !titleEl || !track) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add(
        {
          isDesktop: "(min-width: 1100px)",
          isMobile: "(max-width: 1099px)",
        },
        ({ conditions }) => {
          const isMobile = Boolean(conditions?.isMobile);
          const cleanups = [];

          // Background color transition back to light
          gsap.timeline({
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              onEnter: () =>
                gsap.to("body", { backgroundColor: "#FBFBF4", duration: 0.6 }),
              onLeaveBack: () =>
                gsap.to("body", { backgroundColor: "#020202", duration: 0.6 }),
            },
          });

          // Title reveal
          const titleTl = gsap.timeline({
            scrollTrigger: {
              trigger: titleEl,
              start: "top+=30% bottom",
            },
          });
          titleTl.moveBlur(titleEl, { yPercent: 80 });

          if (!isMobile) {
            // Horizontal scroll effect
            const cards = Array.from(
              track.querySelectorAll("[data-testimonial-card]"),
            );
            const totalWidth = track.scrollWidth - track.offsetWidth;

            const scrollTl = gsap.timeline({
              scrollTrigger: {
                trigger: section,
                start: "top top",
                end: () => `+=${totalWidth}`,
                scrub: 1,
                pin: true,
                anticipatePin: 1,
              },
            });

            scrollTl.to(track, {
              x: -totalWidth,
              ease: "none",
            });

            // Card reveal
            const cardTl = gsap.timeline({
              scrollTrigger: {
                trigger: track,
                start: "top 80%",
              },
            });
            cardTl.fromTo(
              cards,
              { yPercent: 20, autoAlpha: 0 },
              {
                yPercent: 0,
                autoAlpha: 1,
                duration: 0.8,
                ease: "power3.out",
                stagger: 0.1,
              },
            );

            cleanups.push(() => {
              scrollTl.scrollTrigger?.kill?.();
              scrollTl.kill();
              cardTl.scrollTrigger?.kill?.();
              cardTl.kill();
            });
          } else {
            // Mobile: simple vertical layout
            const cards = Array.from(
              track.querySelectorAll("[data-testimonial-card]"),
            );
            const cardTl = gsap.timeline({
              scrollTrigger: {
                trigger: track,
                start: "top 80%",
              },
            });
            cardTl.fromTo(
              cards,
              { yPercent: 20, autoAlpha: 0 },
              {
                yPercent: 0,
                autoAlpha: 1,
                duration: 0.8,
                ease: "power3.out",
                stagger: 0.1,
              },
            );

            cleanups.push(() => {
              cardTl.scrollTrigger?.kill?.();
              cardTl.kill();
            });
          }

          cleanups.push(() => {
            titleTl.scrollTrigger?.kill?.();
            titleTl.kill();
          });

          return () => cleanups.forEach((fn) => fn());
        },
      );

      return () => mm.revert();
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      data-theme="light"
      className={cn(
        "testimonials relative z-0 bg-light text-dark overflow-hidden",
        "py-48",
        "max-[1099px]:py-32",
      )}
    >
      <div className={cn("testimonials-inner px-16", "max-[1099px]:px-8")}>
        <h2
          ref={titleRef}
          className={cn(
            "testimonials-title font-heading leading-[100%] mb-20",
            "text-[clamp(2.5rem,4vw,5rem)]",
            "max-[1099px]:text-[clamp(2rem,6vw,3rem)] max-[1099px]:mb-12",
          )}
        >
          Some words from our valued clients
        </h2>

        <div
          ref={trackRef}
          className={cn(
            "testimonials-track flex gap-8",
            "min-[1100px]:flex-nowrap",
            "max-[1099px]:flex-col max-[1099px]:gap-6",
          )}
        >
          {TESTIMONIALS.map((testimonial, index) => (
            <div
              key={testimonial.name}
              data-testimonial-card
              className={cn(
                "testimonial-card shrink-0 flex flex-col justify-between",
                "w-100 p-8 rounded-[0.4rem]",
                "bg-[rgba(0,0,0,0.02)] border border-dark/5",
                "max-[1099px]:w-full",
              )}
            >
              <p className="testimonial-quote font-body text-[1.5rem] leading-[160%] text-grey mb-8">
                "{testimonial.quote}"
              </p>
              <div className="testimonial-author">
                <p className="testimonial-name font-heading text-[1.6rem] leading-[120%]">
                  {testimonial.name}
                </p>
                <p className="testimonial-title font-body text-[1.3rem] leading-[140%] text-grey/60">
                  {testimonial.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default memo(Testimonials);
