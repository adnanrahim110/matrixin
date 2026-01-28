"use client";

import gsap from "gsap";
import { memo, useLayoutEffect, useRef } from "react";

import { cn } from "@/utils/cn";
import { ensureGsap } from "@/utils/gsap";

const IMAGE =
  "https://images.prismic.io/estrelastudio/aN1j_p5xUNkB1YXF_Divide.jpg?w=3000&h=1500&auto=compress,format";

const CONTENT =
  "At Estrela, we’re a small team by design. Female-led, close-knit, and committed to showing up with passion and dedication. We pride ourselves on creating one-on-one partnerships that feel personal, not transactional. Balance matters to us, because thriving as people helps us thrive as designers. So we celebrate the wins, learn from the challenges, and keep pushing ourselves to grow. At the heart of it all is that spark you can’t quite put your finger on, but you feel it in everything we do.";

const SmallButMighty = () => {
  const sectionRef = useRef(null);
  const wrapperRef = useRef(null);
  const innerRef = useRef(null);

  useLayoutEffect(() => {
    ensureGsap();

    const wrapper = wrapperRef.current;
    const inner = innerRef.current;
    if (!wrapper || !inner) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapper,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      tl.fromTo(
        inner,
        { height: "140%", yPercent: -40 },
        { yPercent: 0, ease: "none" },
      );

      return () => {
        tl.scrollTrigger?.kill?.();
        tl.kill();
      };
    }, wrapper);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      data-theme="light"
      className={cn(
        "relative z-0 bg-light text-dark",
        "pt-184 max-[1099px]:pt-48",
      )}
    >
      <div className="info-content max-[1099px]:p-8 min-[1100px]:flex min-[1100px]:mb-12 min-[1100px]:pl-8">
        <h2 className="info-title italic text-[1.8rem] leading-[120%] max-[1099px]:mb-16 min-[1100px]:w-176 min-[1100px]:shrink-0 min-[1100px]:pr-8">
          Small but Mighty
        </h2>
        <p className="info-text max-[1099px]:pr-[4.4rem] max-[1099px]:text-grey min-[1100px]:w-[81.3rem] min-[1100px]:text-[3.4rem] min-[1100px]:leading-[120%]">
          {CONTENT}
        </p>
      </div>

      <figure
        ref={wrapperRef}
        className={cn(
          "media-wrapper relative overflow-hidden rounded-[0.4rem]",
          "max-[1099px]:aspect-[4/3.8]",
          "min-[1100px]:mx-auto min-[1100px]:h-[72.4rem] min-[1100px]:w-[calc(100vw-4rem)]",
        )}
      >
        <div
          ref={innerRef}
          className="media-inner absolute left-0 top-0 w-full will-change-transform"
        >
          <img
            className="media absolute inset-0 h-full w-full object-cover"
            src={IMAGE}
            alt=""
            loading="lazy"
            width={2000}
            height={1000}
            sizes="(max-width: 1100px) 1000px, 2000px"
          />
        </div>
      </figure>
    </section>
  );
};

export default memo(SmallButMighty);
