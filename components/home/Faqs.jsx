"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { memo, useLayoutEffect, useMemo, useRef, useState } from "react";

import BorderGlowCanvas from "@/components/ui/BorderGlowCanvas";
import { cn } from "@/utils/cn";
import { ensureGsap } from "@/utils/gsap";
import { usePrefersReducedMotion } from "@/utils/usePrefersReducedMotion";

const FAQS_TITLE = "FAQs";

const FAQS = [
  {
    question: "What industries do you work with?",
    answer:
      "We work with startups, e-commerce brands, service providers, and enterprises across multiple industries. Let's discuss your niche.",
  },
  {
    question: "Do you offer custom marketing strategies?",
    answer:
      "Yes, every strategy is tailored to your business goals, audience, and budget. Request a free strategy call.",
  },
  {
    question: "How long does website development take?",
    answer:
      "Timelines vary, but most projects are completed within 3-6 weeks. Get a project timeline today.",
  },
  {
    question: "Can you manage SEO and paid ads together?",
    answer:
      "Absolutely. Combining SEO with paid campaigns maximizes visibility and results. Start optimizing your growth now.",
  },
  {
    question: "Do you provide ongoing support after launch?",
    answer:
      "Yes, we offer maintenance, updates, and performance optimization. Ask about our support plans.",
  },
  {
    question: "How do I get started with Marketinix?",
    answer:
      "Simply contact us, and we'll guide you through the next steps. Let's build something impactful.",
  },
];

const createInitialOpenMap = (list) => list.map((_, index) => index === 0);

const splitLines = (element, innerClassName) => {
  if (!element) return { revert: () => {}, inlines: [] };

  const originalText = element.textContent || "";
  const words = originalText.trim().split(/\s+/).filter(Boolean);
  element.textContent = "";

  words.forEach((word, index) => {
    const span = document.createElement("span");
    span.className = "word inline-block";
    span.textContent = word + (index === words.length - 1 ? "" : "\u00A0");
    element.appendChild(span);
  });

  const wordEls = Array.from(element.querySelectorAll(".word"));
  if (!wordEls.length) return { revert: () => {}, inlines: [] };

  const lines = [];
  let currentLine = [];
  let currentTop = null;

  wordEls.forEach((wordEl) => {
    const top = wordEl.offsetTop;
    if (currentTop === null) currentTop = top;

    if (Math.abs(top - currentTop) > 2) {
      lines.push(currentLine);
      currentLine = [];
      currentTop = top;
    }

    currentLine.push(wordEl);
  });

  if (currentLine.length) lines.push(currentLine);

  const frag = document.createDocumentFragment();
  const inlines = [];

  lines.forEach((lineWords) => {
    const line = document.createElement("span");
    line.className = "line block relative overflow-hidden";

    const inner = document.createElement("span");
    inner.className = innerClassName;
    lineWords.forEach((w) => inner.appendChild(w));
    line.appendChild(inner);
    frag.appendChild(line);
    inlines.push(inner);
  });

  element.textContent = "";
  element.appendChild(frag);

  return {
    inlines,
    revert: () => {
      element.textContent = originalText;
    },
  };
};

const Faqs = ({ title, items: itemsProp, light = false, className = "" }) => {
  const reducedMotion = usePrefersReducedMotion();
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const itemRefs = useRef([]);
  const splitRefs = useRef([]);
  const tlRefs = useRef([]);

  const isLight = Boolean(light);
  const glowColor = isLight ? "244, 122, 35" : "251, 251, 244";
  const borderOuter = isLight ? "border-dark/20" : "border-white/20";
  const borderInner = isLight ? "border-dark/10" : "border-white/10";
  const plusColor = isLight ? "bg-dark/60" : "bg-white/60";
  const answerColor = isLight ? "text-dark/60" : "text-light/50";

  const initialItems =
    Array.isArray(itemsProp) && itemsProp.length ? itemsProp : FAQS;

  const [openMap, setOpenMap] = useState(() => createInitialOpenMap(initialItems));
  const openMapRef = useRef(openMap);

  const items = useMemo(() => initialItems, [itemsProp]);

  useLayoutEffect(() => {
    openMapRef.current = openMap;
  }, [openMap]);

  useLayoutEffect(() => {
    const nextOpenMap = createInitialOpenMap(items);
    setOpenMap(nextOpenMap);
    openMapRef.current = nextOpenMap;
    itemRefs.current.length = items.length;
    splitRefs.current.forEach((split) => split?.revert?.());
    splitRefs.current = [];
    tlRefs.current.forEach((tl) => tl?.kill?.());
    tlRefs.current = [];
  }, [items]);

  useLayoutEffect(() => {
    ensureGsap();

    const section = sectionRef.current;
    const titleEl = titleRef.current;
    if (!section || !titleEl) return;

    const ctx = gsap.context(() => {
      const titleTl = gsap.timeline({
        scrollTrigger: {
          trigger: titleEl,
          start: "top+=30% bottom",
        },
      });

      if (reducedMotion) {
        titleTl.scrollTrigger?.kill?.();
        titleTl.kill();
        gsap.set(titleEl, { autoAlpha: 1, filter: "blur(0rem)", yPercent: 0 });
      } else {
        titleTl.moveBlur(titleEl, { yPercent: 110 });
      }

      const setupItems = () => {
        itemRefs.current.forEach((faqEl, index) => {
          if (!faqEl) return;

          const inner = faqEl.querySelector("[data-faq-inner]");
          const answerWrapper = faqEl.querySelector(
            "[data-faq-answer-wrapper]",
          );
          const answer = faqEl.querySelector("[data-faq-answer]");

          if (!inner || !answerWrapper || !answer) return;

          splitRefs.current[index]?.revert?.();
          splitRefs.current[index] = null;

          const innerClassName = cn(
            "line-inner block relative will-change-transform",
          );
          const split = splitLines(answer, innerClassName);
          splitRefs.current[index] = split;

          gsap.set(split.inlines, {
            yPercent: 110,
            clipPath: "inset(100% 0% 0% 0%)",
          });
          gsap.set(answer, { yPercent: 10 });

          if (openMapRef.current[index]) {
            gsap.set(split.inlines, {
              yPercent: 0,
              clipPath: "inset(0% 0% 0% 0%)",
            });
            gsap.set(answer, { yPercent: 0 });
          }
        });
      };

      const applyLayout = () => {
        tlRefs.current.forEach((tl) => tl?.kill?.());
        tlRefs.current = [];

        setupItems();

        itemRefs.current.forEach((faqEl, index) => {
          if (!faqEl) return;
          const inner = faqEl.querySelector("[data-faq-inner]");
          const wrapper = faqEl.querySelector("[data-faq-answer-wrapper]");
          if (!inner || !wrapper) return;

          gsap.set(inner, { height: "auto" });
          gsap.set(wrapper, {
            height: openMapRef.current[index] ? "auto" : 0,
          });
        });
      };

      let resizeRaf = 0;
      const onResize = () => {
        window.cancelAnimationFrame(resizeRaf);
        resizeRaf = window.requestAnimationFrame(applyLayout);
      };

      applyLayout();
      window.addEventListener("resize", onResize, { passive: true });

      return () => {
        tlRefs.current.forEach((tl) => tl?.kill?.());
        tlRefs.current = [];
        splitRefs.current.forEach((split) => split?.revert?.());
        splitRefs.current = [];
        window.cancelAnimationFrame(resizeRaf);
        window.removeEventListener("resize", onResize);
      };
    }, section);

    return () => ctx.revert();
  }, [items, reducedMotion]);

  const toggleFaq = (index) => {
    const dur = reducedMotion ? 0.01 : 0.8;
    const durLong = reducedMotion ? 0.01 : 1.4;
    const ease = reducedMotion ? "none" : "power4.out";
    const animateFaqState = (itemIndex, shouldOpen) => {
      const faqEl = itemRefs.current[itemIndex];
      if (!faqEl) return;

      const answerWrapper = faqEl.querySelector("[data-faq-answer-wrapper]");
      const answer = faqEl.querySelector("[data-faq-answer]");
      const split = splitRefs.current[itemIndex];
      const inlines = split?.inlines ?? [];

      if (!answerWrapper || !answer) return;

      tlRefs.current[itemIndex]?.kill?.();

      const tl = gsap.timeline({
        defaults: { overwrite: "auto" },
        onComplete: () => {
          ScrollTrigger.refresh?.();
        },
      });

      if (shouldOpen) {
        tl.add(() => faqEl.classList.add("active"), 0);
        tl.to(answerWrapper, { height: "auto", duration: dur, ease }, 0);
        tl.to(answer, { yPercent: 0, duration: durLong, ease }, 0);
        if (inlines.length) {
          tl.to(
            inlines,
            {
              yPercent: 0,
              clipPath: "inset(0% 0% 0% 0%)",
              duration: durLong,
              ease,
              stagger: reducedMotion ? 0 : 0.05,
            },
            0,
          );
        }
      } else {
        tl.add(() => faqEl.classList.remove("active"), 0);
        tl.to(answerWrapper, { height: 0, duration: dur, ease }, 0);
        tl.to(answer, { yPercent: 10, duration: durLong, ease }, 0);
        if (inlines.length) {
          tl.to(
            inlines,
            {
              yPercent: 110,
              clipPath: "inset(100% 0% 0% 0%)",
              duration: durLong,
              ease,
              stagger: reducedMotion ? 0 : 0.05,
            },
            0,
          );
        }
      }

      tlRefs.current[itemIndex] = tl;
    };

    const prevMap = [...openMapRef.current];
    const nextOpen = !prevMap[index];
    const nextMap = prevMap.map((_, itemIndex) => nextOpen && itemIndex === index);

    setOpenMap(nextMap);
    openMapRef.current = nextMap;

    prevMap.forEach((isOpen, itemIndex) => {
      if (isOpen && itemIndex !== index) {
        animateFaqState(itemIndex, false);
      }
    });

    animateFaqState(index, nextOpen);
  };

  return (
    <section
      ref={sectionRef}
      data-theme={isLight ? "light" : "dark"}
      className={cn(
        "faqs relative",
        isLight && "bg-light text-dark border-t border-dark/10",
        "pt-84 pb-64",
        "max-[1099px]:py-48",
        className,
      )}
    >
      <h2
        ref={titleRef}
        className={cn(
          "faqs-title font-heading",
          "ml-290 mb-20 text-[12.4rem] leading-[100%]",
          "max-[1099px]:ml-12 max-[1099px]:mb-[4.2rem] max-[1099px]:text-[7.4rem] max-[1099px]:leading-[110%]",
        )}
      >
        {title || FAQS_TITLE}
      </h2>

      <div className={cn("faqs-inner px-[13.7rem]", "max-[1099px]:px-8")}>
        {items.map((item, index) => {
          const isOpen = openMap[index];

          return (
            <div
              key={item.question}
              ref={(el) => {
                itemRefs.current[index] = el;
              }}
              className={cn("faq relative", isOpen && "active")}
            >
              <div
                aria-hidden="true"
                className={cn(
                  "faq-border absolute left-0 top-0 h-0.5 w-full",
                  "border-t",
                  borderOuter,
                )}
              >
                <BorderGlowCanvas color={glowColor} size={140} />
                <div
                  className={cn(
                    "border-inner absolute inset-0 border-t",
                    borderInner,
                  )}
                />
              </div>

              <div
                data-faq-inner
                className={cn(
                  "faq-inner flex items-start overflow-hidden",
                  "pt-8 pb-12",
                  "max-[1099px]:block",
                )}
              >
                <h3
                  className={cn(
                    "faq-question font-body text-[1.8rem] leading-[140%]",
                    "w-[56.7rem] mr-8",
                    "max-[1099px]:w-auto max-[1099px]:mr-[4.8rem]",
                  )}
                >
                  {item.question}
                </h3>

                <div
                  data-faq-answer-wrapper
                  className={cn(
                    "faq-answer-wrapper overflow-hidden",
                    "h-0",
                  )}
                >
                  <p
                    data-faq-answer
                    className={cn(
                      "faq-answer font-body text-[1.8rem] leading-[140%]",
                      answerColor,
                      "w-206 mr-auto",
                      "max-[1099px]:w-auto max-[1099px]:pt-8 max-[1099px]:text-[1.6rem]",
                    )}
                  >
                    {item.answer}
                  </p>
                </div>
              </div>

              <button
                type="button"
                aria-label={isOpen ? "Collapse FAQ" : "Expand FAQ"}
                aria-expanded={isOpen}
                onClick={() => toggleFaq(index)}
                className={cn(
                  "faq-toggle group absolute top-0 -right-8 cursor-pointer",
                  "flex items-center p-8",
                  "font-heading italic text-[2.4rem]",
                  isLight ? "text-dark/70" : "text-light/70",
                  "transition-transform duration-800 ease-[cubic-bezier(.8,0,.17,1)]",
                  isOpen && "rotate-180",
                )}
              >
                <span className="faq-toggle-bracket left transition-transform duration-600 ease-ease min-[1100px]:group-hover:translate-x-[-0.6rem]">
                  (
                </span>

                <span className="faq-toggle-icon relative mx-[0.4rem] ml-[0.6rem] h-[0.8rem] w-[0.8rem] transition-transform duration-600 ease-ease min-[1100px]:group-hover:scale-[1.2]">
                  <span
                    className={cn(
                      "absolute left-1/2 top-1/2 block h-px w-4 -translate-x-1/2 -translate-y-1/2",
                      plusColor,
                    )}
                  />
                  <span
                    className={cn(
                      "absolute left-1/2 top-1/2 block h-4 w-px -translate-x-1/2 -translate-y-1/2 rotate-15",
                      plusColor,
                      "transition-opacity duration-400 ease-ease delay-200",
                      isOpen ? "opacity-0" : "opacity-100",
                    )}
                  />
                </span>

                <span className="faq-toggle-bracket right transition-transform duration-600 ease-ease min-[1100px]:group-hover:translate-x-[0.6rem]">
                  )
                </span>
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default memo(Faqs);
