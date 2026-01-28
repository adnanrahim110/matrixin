"use client";

import gsap from "gsap";
import { useLayoutEffect, useMemo, useRef } from "react";

import Button from "@/components/ui/Button";
import { SERVICES } from "@/constants/services";
import { cn } from "@/utils/cn";
import { ensureGsap } from "@/utils/gsap";

export default function ServicesIndex() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const cardRefs = useRef([]);

  const services = useMemo(() => SERVICES, []);

  useLayoutEffect(() => {
    ensureGsap();

    const section = sectionRef.current;
    const title = titleRef.current;
    const subtitle = subtitleRef.current;
    if (!section || !title || !subtitle) return;

    const ctx = gsap.context(() => {
      const introTl = gsap.timeline({ delay: 0.05 });
      introTl.moveBlur(title, { yPercent: 60 }, 0);
      introTl.moveBlur(subtitle, { yPercent: 60 }, 0.05);

      const cards = cardRefs.current.filter(Boolean);
      if (cards.length) {
        gsap.set(cards, { yPercent: 20, autoAlpha: 0, filter: "blur(1.2rem)" });
        gsap.timeline({
          scrollTrigger: { trigger: section, start: "top+=20% bottom" },
        }).to(cards, {
          yPercent: 0,
          autoAlpha: 1,
          filter: "blur(0rem)",
          duration: 1,
          ease: "power3.out",
          stagger: 0.06,
        });
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      data-theme="dark"
      className="relative w-full bg-dark px-8 pb-40 pt-32 text-light"
    >
      <div className="mx-auto w-full max-w-[120rem]">
        <h1
          ref={titleRef}
          className={cn(
            "font-heading text-[12.4rem] leading-[100%]",
            "max-[1099px]:text-[7.4rem] max-[1099px]:leading-[110%]",
          )}
        >
          Services
        </h1>

        <p ref={subtitleRef} className="mt-8 max-w-[70rem] text-light/60">
          Explore our services and how we build purpose-driven digital, design,
          and growth experiences. Each page includes a detailed breakdown,
          deliverables, process, and work references.
        </p>

        <div className="mt-18 grid grid-cols-12 gap-6">
          {services.map((service, index) => (
            <article
              key={service.slug}
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
              className="col-span-4 flex flex-col overflow-hidden rounded-[0.4rem] bg-white/10 p-8 max-[1099px]:col-span-12"
            >
              <p className="text-[1.4rem] uppercase tracking-[0.08em] text-light/50">
                {(index + 1).toString().padStart(2, "0")}
              </p>

              <h2 className="mt-4 font-heading text-[3.4rem] leading-[100%] max-[1099px]:text-[2.6rem] max-[1099px]:leading-[120%]">
                {service.name}
              </h2>

              <p className="mt-5 text-light/60">{service.shortDescription}</p>

              <div className="mt-10">
                <Button href={`/services/${service.slug}`} tone="dark" className="h-16">
                  Explore
                </Button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
