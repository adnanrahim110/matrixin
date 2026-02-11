"use client";

import gsap from "gsap";
import { memo, useLayoutEffect, useRef } from "react";

import { cn } from "@/utils/cn";
import { ensureGsap } from "@/utils/gsap";

const VALUES = [
  {
    number: "01",
    title: "Strategy First",
    text: "We begin with research, audience insight, and clear objectives before execution. A strong strategy ensures every page, campaign, and creative decision has purpose.",
  },
  {
    number: "02",
    title: "Performance Mindset",
    text: "We focus on outcomes that matter: qualified traffic, conversion quality, lead generation, and revenue impact. We measure results and optimize continuously.",
  },
  {
    number: "03",
    title: "Craft and Clarity",
    text: "From visual design to development quality, we care about details. We build digital experiences that are clean, user-friendly, and aligned with your brand.",
  },
  {
    number: "04",
    title: "Partnership and Transparency",
    text: "We work as an extension of your team with clear communication, realistic timelines, and transparent reporting so you always know what is happening and why.",
  },
];

const MISSION =
  "At Marketinix, our mission is to help businesses in the USA grow with digital strategies that are practical, measurable, and built for long-term impact. We combine web design, web development, SEO, social media marketing, and brand-led creative execution to solve real growth challenges. We partner closely with every client, align on clear goals, and deliver with accountability so each digital investment moves your business forward.";

const splitLines = (element) => {
  if (!element) return { revert: () => {}, lines: [] };
  if (element.dataset.splitLinesInit === "1")
    return { revert: () => {}, lines: [] };

  const originalText = element.textContent || "";
  const words = originalText.trim().split(/\s+/).filter(Boolean);

  element.dataset.splitLinesInit = "1";
  element.dataset.splitLinesText = originalText;

  element.textContent = "";
  words.forEach((word, index) => {
    const span = document.createElement("span");
    span.className = "word inline-block";
    span.textContent = word + (index === words.length - 1 ? "" : "\u00A0");
    element.appendChild(span);
  });

  const wordEls = Array.from(element.querySelectorAll(".word"));
  if (!wordEls.length) {
    return {
      revert: () => {
        element.textContent = originalText;
        delete element.dataset.splitLinesInit;
        delete element.dataset.splitLinesText;
      },
      lines: [],
    };
  }

  const grouped = [];
  let current = [];
  let currentTop = null;

  wordEls.forEach((wordEl) => {
    const top = wordEl.offsetTop;
    if (currentTop === null) currentTop = top;

    if (Math.abs(top - currentTop) > 2) {
      grouped.push(current);
      current = [];
      currentTop = top;
    }
    current.push(wordEl);
  });
  if (current.length) grouped.push(current);

  const frag = document.createDocumentFragment();
  const lineInners = [];

  grouped.forEach((lineWords, index) => {
    const line = document.createElement("span");
    line.className = "line block relative overflow-hidden";

    const inner = document.createElement("span");
    inner.className =
      "line-inner block will-change-transform min-[1100px]:translate-y-[108%] min-[1100px]:transition-transform min-[1100px]:duration-[1800ms] min-[1100px]:ease-ease group-hover:translate-y-0";
    inner.style.transitionDelay = `${(index + 1) * 0.03}s`;

    lineWords.forEach((w) => inner.appendChild(w));
    line.appendChild(inner);
    frag.appendChild(line);
    lineInners.push(inner);
  });

  element.textContent = "";
  element.appendChild(frag);

  return {
    lines: lineInners,
    revert: () => {
      element.textContent = element.dataset.splitLinesText ?? originalText;
      delete element.dataset.splitLinesInit;
      delete element.dataset.splitLinesText;
    },
  };
};

const Values = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const valueRefs = useRef([]);

  useLayoutEffect(() => {
    ensureGsap();

    const section = sectionRef.current;
    const titleEl = titleRef.current;
    if (!section || !titleEl) return;

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

          // Title reveal (matches Estrela: start "bottom+=20% bottom")
          const titleTl = gsap.timeline({
            scrollTrigger: { trigger: titleEl, start: "bottom+=20% bottom" },
          });
          titleTl.moveBlur(titleEl, { yPercent: 40, stagger: 0 });
          cleanups.push(() => {
            titleTl.scrollTrigger?.kill?.();
            titleTl.kill();
          });

          if (isMobile) return () => cleanups.forEach((fn) => fn());

          // Split value text into lines so hover can animate line-by-line.
          const splits = [];
          valueRefs.current.filter(Boolean).forEach((valueEl) => {
            const textEl = valueEl.querySelector("[data-value-text]");
            if (!textEl) return;
            splits.push(splitLines(textEl));
          });
          cleanups.push(() => splits.forEach((s) => s.revert()));

          // Hover state: active/inactive across the list (matches Estrela Values.initHover)
          const values = valueRefs.current.filter(Boolean);
          const setActive = (activeIndex) => {
            values.forEach((el, index) => {
              const isActive = index === activeIndex;
              el.classList.toggle("active", isActive);
              el.classList.toggle("inactive", !isActive);
            });
          };

          // Start with the first value active.
          setActive(0);

          const handlers = values.map((el, index) => {
            const onEnter = () => setActive(index);
            const onLeave = () => setActive(0);
            el.addEventListener("mouseenter", onEnter);
            el.addEventListener("mouseleave", onLeave);
            return { el, onEnter, onLeave };
          });
          cleanups.push(() => {
            handlers.forEach(({ el, onEnter, onLeave }) => {
              el.removeEventListener("mouseenter", onEnter);
              el.removeEventListener("mouseleave", onLeave);
            });
          });

          // Re-split lines on resize (line breaks change).
          let raf = 0;
          const onResize = () => {
            window.cancelAnimationFrame(raf);
            raf = window.requestAnimationFrame(() => {
              splits.forEach((s) => s.revert());
              splits.length = 0;
              values.forEach((valueEl) => {
                const textEl = valueEl.querySelector("[data-value-text]");
                if (!textEl) return;
                splits.push(splitLines(textEl));
              });
            });
          };
          window.addEventListener("resize", onResize, { passive: true });
          cleanups.push(() => window.removeEventListener("resize", onResize));
          cleanups.push(() => window.cancelAnimationFrame(raf));

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
        "relative z-1 bg-light text-dark",
        "p-8 max-[449px]:p-6",
        "min-[1100px]:px-0 min-[1100px]:pb-96 min-[1100px]:pt-8",
      )}
    >
      <h2
        ref={titleRef}
        className={cn(
          "mv-title font-heading leading-[100%]",
          "mb-40 text-[7.4rem] max-[1099px]:mb-24 max-[1099px]:leading-[115%] max-[699px]:text-[6.4rem] max-[449px]:text-[5.4rem]",
          "min-[1100px]:mb-[7.3rem] min-[1100px]:pl-8 min-[1100px]:text-[12.4rem] min-[1100px]:leading-[100%]",
        )}
      >
        Our Mission &amp; Values
      </h2>

      <div className="mv-mission mb-40 max-[1099px]:mb-28 min-[1100px]:mb-[15.1rem] min-[1100px]:ml-[72.6rem] min-[1100px]:w-184">
        <h3 className="mv-mission-title mb-16 text-[1.8rem] italic leading-[120%] min-[1100px]:mb-10 min-[1100px]:text-[2.2rem]">
          Why We Build
        </h3>
        <p className="mv-mission-text text-grey max-[1099px]:text-[1.8rem] max-[1099px]:leading-[160%] max-[449px]:text-[1.6rem]">
          {MISSION}
        </p>
      </div>

      <div className="m-values">
        <h3 className="mv-values-title mb-12 max-[1099px]:mb-8 text-[1.8rem] italic leading-[120%] min-[1100px]:mb-10 min-[1100px]:ml-[72.6rem] min-[1100px]:text-[2.2rem]">
          Our Values
        </h3>

        <div className="values-list">
          {VALUES.map((value, index) => (
            <div
              key={value.title}
              ref={(el) => {
                valueRefs.current[index] = el;
              }}
              className={cn(
                "value group relative hover:z-1",
                "max-[1099px]:block max-[1099px]:border-t max-[1099px]:border-dark/10 max-[1099px]:py-12 max-[449px]:py-10",
                "min-[1100px]:flex min-[1100px]:h-[7.6rem] min-[1100px]:cursor-default min-[1100px]:items-center min-[1100px]:justify-end",
                "[&.active_.value-title]:opacity-100 [&.inactive_.value-title]:opacity-20",
                "[&.active_.value-text]:opacity-100",
                "[&.active_.line-inner]:translate-y-0",
                "[&.active_.char]:translate-y-0",
                "[&.active_.value-border]:[clip-path:inset(0)]",
              )}
            >
              <div
                aria-hidden="true"
                className={cn(
                  "value-border absolute left-0 top-0 h-0.5 w-full will-change-[clip-path]",
                  "border-t border-dark/20",
                  "max-[1099px]:hidden",
                  "min-[1100px]:[clip-path:inset(0_0_0_calc(100vw-71.5rem))] min-[1100px]:transition-[clip-path] min-[1100px]:duration-800 min-[1100px]:ease-ease",
                  "min-[1100px]:group-hover:[clip-path:inset(0)] min-[1100px]:group-hover:duration-1600",
                )}
              />

              <div className="value-title-wrapper relative">
                <span
                  data-value-number
                  className={cn(
                    "value-number italic overflow-hidden",
                    "max-[1099px]:mb-4",
                    "min-[1100px]:absolute min-[1100px]:right-[calc(100%+2rem)] min-[1100px]:top-[0.6rem] min-[1100px]:w-12 min-[1100px]:text-right",
                  )}
                >
                  {value.number.split("").map((char, charIndex) => (
                    <span
                      key={`${value.number}-${charIndex}`}
                      className={cn(
                        "char inline-block",
                        "min-[1100px]:translate-y-[110%] min-[1100px]:transition-transform min-[1100px]:duration-1400 min-[1100px]:ease-ease",
                        "min-[1100px]:group-hover:translate-y-0",
                      )}
                      style={{
                        transitionDelay: `${(charIndex + 1) * 0.07}s`,
                      }}
                    >
                      {char}
                    </span>
                  ))}
                </span>

                <h3
                  className={cn(
                    "value-title font-body leading-[100%] transition-opacity duration-1200 ease-ease",
                    "text-[3.8rem] max-[1099px]:mb-4 max-[1099px]:leading-[115%] max-[699px]:text-[3.4rem] max-[449px]:text-[3.0rem]",
                    "min-[1100px]:w-286 min-[1100px]:text-[4.5rem]",
                  )}
                >
                  {value.title}
                </h3>
              </div>

              <p
                data-value-text
                className={cn(
                  "value-text text-grey",
                  "max-[1099px]:text-[1.8rem] max-[1099px]:leading-[160%] max-[449px]:text-[1.6rem]",
                  "min-[1100px]:absolute min-[1100px]:left-8 min-[1100px]:top-6 min-[1100px]:w-[34.3rem]",
                  "min-[1100px]:opacity-0 min-[1100px]:transition-opacity min-[1100px]:duration-800 min-[1100px]:ease-ease",
                  "min-[1100px]:group-hover:opacity-100",
                )}
              >
                {value.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default memo(Values);
