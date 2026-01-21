"use client";

import gsap from "gsap";
import { useLayoutEffect, useRef } from "react";

import { ensureGsap } from "@/utils/gsap";

const ESTRELA_PRE_FOOTER_IMAGE =
  "https://images.prismic.io/estrelastudio/aN6C555xUNkB1af4_Rectangle2381-1-min.jpg?w=3000&h=1800&auto=compress,format";

const remToPx = (rem) => {
  const rootFontSize = Number.parseFloat(
    window.getComputedStyle(document.documentElement).fontSize || "16",
  );
  return rem * rootFontSize;
};

const PreFooter = () => {
  const sectionRef = useRef(null);
  const imageWrapperRef = useRef(null);
  const imageRef = useRef(null);

  useLayoutEffect(() => {
    ensureGsap();

    const section = sectionRef.current;
    const imageWrapper = imageWrapperRef.current;
    const image = imageRef.current;
    if (!section || !imageWrapper || !image) return;

    const mm = gsap.matchMedia();
    const ctx = gsap.context(() => {
      gsap.fromTo(
        image,
        { scale: 1.2 },
        {
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
            invalidateOnRefresh: true,
            refreshPriority: -1,
          },
        },
      );

      mm.add(
        {
          isMobile: "(max-width: 1099px)",
          isDesktop: "(min-width: 1100px)",
        },
        ({ conditions }) => {
          const isMobile = Boolean(conditions?.isMobile);
          const offset = isMobile ? remToPx(2) : remToPx(0.5);

          const collapseTl = gsap.timeline({
            scrollTrigger: {
              trigger: section,
              start: `top-=${offset} top`,
              end: "bottom top",
              scrub: true,
              invalidateOnRefresh: true,
              refreshPriority: -1,
            },
          });

          collapseTl.to(
            imageWrapper,
            { height: 0, duration: 1, ease: "none" },
            0,
          );

          if (!isMobile) {
            collapseTl.fromTo(
              imageWrapper,
              { y: remToPx(1.5) },
              { y: remToPx(-0.5), height: 0, duration: 0.1, ease: "none" },
              0.9,
            );
          }

          return () => {
            collapseTl.scrollTrigger?.kill?.();
            collapseTl.kill();
          };
        },
      );
    }, section);

    return () => {
      ctx.revert();
      mm.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="pre-footer relative mx-auto h-180 w-[calc(100%-4rem)] max-[1099px]:h-80"
    >
      <div className="relative h-full overflow-hidden rounded-[0.4rem]">
        <figure
          ref={imageWrapperRef}
          className="absolute inset-x-0 bottom-0 h-full overflow-hidden rounded-[0.4rem] will-change-[height,transform]"
        >
          <img
            ref={imageRef}
            src={ESTRELA_PRE_FOOTER_IMAGE}
            alt=""
            className="absolute left-0 top-1/2 h-180 w-full -translate-y-1/2 object-cover will-change-transform max-[1099px]:h-80"
            loading="lazy"
          />
        </figure>
      </div>
    </section>
  );
};

export default PreFooter;
