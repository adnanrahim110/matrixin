"use client";

import gsap from "gsap";
import { memo, useLayoutEffect, useRef } from "react";

import { cn } from "@/utils/cn";
import { ensureGsap } from "@/utils/gsap";
import Button from "../ui/Button";

const ABOUT_IMAGES = [
  "https://images.prismic.io/estrelastudio/aN6PdJ5xUNkB1aq3_WhoweAre_01.jpg?w=2100&h=1350&auto=compress,format",
  "https://images.prismic.io/estrelastudio/aN6PdZ5xUNkB1aq4_WhoweAre_02.jpg?w=2100&h=1350&auto=compress,format",
  "https://images.prismic.io/estrelastudio/aN6VT55xUNkB1avI_WhoweAre_03.jpg?w=2100&h=1350&auto=compress,format",
];

const ABOUT_TEXT =
  "Estrela Studio is a people-first design studio that cares as much about your business and product as you do. We’re big on honesty, collaboration, and good coffee, the foundations of every great partnership. No project is too small for our A-game and we pour the same craft and care into every brief. Our promise is simple: to guide you with a steady, nurturing hand and turn your ideas, big or small, into brands, websites, and experiences that truly matter.";

const About = () => {
  const sectionRef = useRef(null);
  const innerRef = useRef(null);
  const titleRef = useRef(null);
  const contentRef = useRef(null);
  const imagesRef = useRef(null);

  useLayoutEffect(() => {
    ensureGsap();

    const section = sectionRef.current;
    const inner = innerRef.current;
    const titleEl = titleRef.current;
    const content = contentRef.current;
    const imagesWrap = imagesRef.current;
    if (!section || !inner || !titleEl || !content || !imagesWrap) return;

    const splitWords = (element) => {
      const text = element.textContent || "";
      const parts = text.trim().split(/\s+/).filter(Boolean);

      element.textContent = "";
      parts.forEach((word, index) => {
        const span = document.createElement("span");
        span.className = "word relative inline-block";
        span.textContent = word + (index === parts.length - 1 ? "" : "\u00A0");
        element.appendChild(span);
      });

      const words = Array.from(element.querySelectorAll(".word"));

      return {
        words,
        revert: () => {
          element.textContent = text;
        },
      };
    };

    const wrapLines = (element) => {
      const words = Array.from(element.querySelectorAll(".word"));
      if (!words.length) return [];

      const lines = [];
      let current = [];
      let currentTop = null;

      words.forEach((word) => {
        const top = word.offsetTop;
        if (currentTop === null) currentTop = top;

        if (Math.abs(top - currentTop) > 2) {
          lines.push(current);
          current = [];
          currentTop = top;
        }

        current.push(word);
      });

      if (current.length) lines.push(current);

      const frag = document.createDocumentFragment();
      const lineInners = [];

      lines.forEach((lineWords) => {
        const line = document.createElement("span");
        line.className = "line block relative overflow-hidden";

        const innerSpan = document.createElement("span");
        innerSpan.className = "line-inner block relative will-change-transform";
        lineWords.forEach((w) => innerSpan.appendChild(w));

        line.appendChild(innerSpan);
        frag.appendChild(line);
        lineInners.push(innerSpan);
      });

      element.textContent = "";
      element.appendChild(frag);

      return lineInners;
    };

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

          const split = splitWords(titleEl);
          const lineInners = wrapLines(titleEl);

          const imageWrappers = Array.from(
            imagesWrap.querySelectorAll("[data-about-image]"),
          );

          if (isMobile) {
            const titleTl = gsap.timeline({
              scrollTrigger: {
                trigger: titleEl,
                start: "top+=30% bottom",
              },
            });
            titleTl.moveBlur(lineInners.length ? lineInners : split.words, {
              stagger: 0.2,
              yPercent: 110,
            });

            const imagesTl = gsap.timeline({
              scrollTrigger: {
                trigger: imagesWrap,
                start: "top bottom",
                end: "top top",
                scrub: true,
                invalidateOnRefresh: true,
              },
            });

            if (imageWrappers[0]) {
              imagesTl.fromTo(
                imageWrappers[0],
                { scale: 1.4 },
                { scale: 1, duration: 1 },
                0,
              );
            }
            if (imageWrappers[1]) {
              imagesTl.fromTo(
                imageWrappers[1],
                { scale: 1.4, clipPath: "inset(100% 0% 0% 0%)" },
                { clipPath: "inset(0% 0% 0% 0%)", scale: 1, duration: 1 },
                1,
              );
            }
            if (imageWrappers[2]) {
              imagesTl.fromTo(
                imageWrappers[2],
                { scale: 1.4, clipPath: "inset(100% 0% 0% 0%)" },
                { clipPath: "inset(0% 0% 0% 0%)", scale: 1, duration: 1 },
                2,
              );
            }

            cleanups.push(() => {
              titleTl.scrollTrigger?.kill?.();
              titleTl.kill();
              imagesTl.scrollTrigger?.kill?.();
              imagesTl.kill();
            });

            cleanups.push(split.revert);
            return () => cleanups.forEach((fn) => fn());
          }

          gsap.set(section, {
            paddingBottom: () => `${window.innerHeight * 2.5}px`,
          });

          const desktopTl = gsap.timeline({
            scrollTrigger: {
              trigger: inner,
              start: "center center",
              end: () => `+=${window.innerHeight * 9}`,
              pin: true,
              pinSpacing: false,
              scrub: true,
              invalidateOnRefresh: true,
              pinType: "transform",
            },
          });

          desktopTl
            .fromTo(
              content,
              { y: () => window.innerHeight * 1.5 },
              { y: () => window.innerHeight * -3, duration: 12 },
              0,
            )
            .fromTo(
              titleEl,
              {
                transformOrigin: "left",
                scale: 0.95,
                yPercent: () => window.innerHeight * 0.15,
              },
              { scale: 1, yPercent: 0, ease: "power1.out", duration: 1.5 },
              0,
            )
            .fromTo(
              lineInners.length ? lineInners : split.words,
              { yPercent: 110, autoAlpha: 0, filter: "blur(2rem)" },
              {
                yPercent: 0,
                autoAlpha: 1,
                filter: "blur(0rem)",
                duration: 2,
                ease: "power3.out",
                stagger: 0.2,
              },
              0.1,
            )
            .fromTo(
              imageWrappers,
              { scale: 1.2 },
              { scale: 1, duration: 2.6 },
              0.8,
            );

          if (imageWrappers[1]) {
            desktopTl.fromTo(
              imageWrappers[1],
              { clipPath: "inset(100% 0% 0% 0%)" },
              { clipPath: "inset(0% 0% 0% 0%)", duration: 0.6 },
              1.4,
            );
          }

          if (imageWrappers[2]) {
            desktopTl.fromTo(
              imageWrappers[2],
              { clipPath: "inset(100% 0% 0% 0%)" },
              { clipPath: "inset(0% 0% 0% 0%)", duration: 0.6 },
              1.9,
            );
          }

          desktopTl.to(
            titleEl,
            {
              yPercent: () => window.innerHeight * -1,
              ease: "power1.in",
              duration: 6,
            },
            1.8,
          );

          cleanups.push(() => {
            desktopTl.scrollTrigger?.kill?.();
            desktopTl.kill();
          });

          cleanups.push(split.revert);
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
      className={cn("about relative z-0 bg-light text-dark")}
    >
      <div
        ref={innerRef}
        className={cn(
          "about-inner flex items-center justify-between px-8",
          "h-[calc(var(--vh,1vh)*100)] -mt-[calc(var(--vh,1vh)*60)]",
          "max-[1099px]:block max-[1099px]:h-auto max-[1099px]:mt-0 max-[1099px]:px-8 max-[1099px]:pt-32 max-[1099px]:pb-56",
        )}
      >
        <div className="about-left shrink-0 min-[1100px]:w-[61.8rem]">
          <h2
            ref={titleRef}
            className={cn(
              "about-title font-heading text-[18rem] leading-[80%]",
              "max-[1099px]:mb-8 max-[1099px]:text-[12.4rem] max-[1099px]:leading-[100%]",
            )}
          >
            Who we are
          </h2>
        </div>

        <div className="about-right shrink-0 min-[1100px]:w-278">
          <div
            ref={contentRef}
            className="about-content flex flex-col items-start"
          >
            <div
              ref={imagesRef}
              className={cn(
                "about-images relative mb-10 h-180 w-full overflow-hidden rounded-[0.4rem]",
                "max-[1099px]:mb-12 max-[1099px]:h-0 max-[1099px]:pb-[84%]",
              )}
            >
              {ABOUT_IMAGES.map((src) => (
                <figure
                  key={src}
                  data-about-image
                  className="media-wrapper absolute inset-0 h-full w-full overflow-hidden rounded-[0.4rem]"
                >
                  <div className="media-inner absolute inset-0 h-full w-full">
                    <img
                      className="media image absolute inset-0 h-full w-full object-cover"
                      src={src}
                      alt=""
                      loading="lazy"
                    />
                  </div>
                </figure>
              ))}
            </div>

            <p
              className={cn(
                "about-text mb-28 font-body text-[1.5rem] leading-[140%] text-grey",
                "min-[1100px]:w-[49.3rem]",
                "max-[1099px]:mb-24 max-[1099px]:w-auto",
              )}
            >
              {ABOUT_TEXT}
            </p>

            <Button href="/about-us">Discover Our Spark</Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default memo(About);
