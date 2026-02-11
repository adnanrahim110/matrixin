"use client";

import gsap from "gsap";
import {
  memo,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import BorderGlowCanvas from "@/components/ui/BorderGlowCanvas";
import { cn } from "@/utils/cn";
import { ensureGsap } from "@/utils/gsap";
import { usePrefersReducedMotion } from "@/utils/usePrefersReducedMotion";

const TESTIMONIALS_BG = "/imgs/testi.jpg";

const TESTIMONIALS = [
  {
    text: "Marketinix rebuilt our website with a clear conversion strategy and stronger user experience. Within three months, our qualified inbound leads increased and our sales team had better opportunities to close.",
    name: "Michael Turner",
    role: "Director of Growth, US Home Services Company",
  },
  {
    text: "Their team combined web design, web development, and SEO in one clear plan. The new site is faster, easier to manage, and now ranks for high-intent keywords in our target US markets.",
    name: "Emily Carter",
    role: "Marketing Manager, US Professional Services Firm",
  },
  {
    text: "We needed a partner who could align brand messaging with measurable digital performance. Marketinix delivered a complete strategy that improved both our online visibility and lead quality.",
    name: "Daniel Brooks",
    role: "Founder, B2B SaaS Startup",
  },
  {
    text: "From technical SEO fixes to landing page improvements, every recommendation was practical and data-backed. We saw better organic traffic and lower cost per acquisition across campaigns.",
    name: "Sophia Mitchell",
    role: "Head of Marketing, US E-commerce Brand",
  },
  {
    text: "Marketinix took ownership from discovery to execution and kept communication transparent at every stage. Their digital marketing support gave us stronger performance and a clear path to scale.",
    name: "Olivia Reed",
    role: "Operations Lead, US Healthcare Group",
  },
  {
    text: "What impressed us most was their ability to turn complex requirements into a clean, conversion-focused website. The final product reflects our brand and performs far better than our previous platform.",
    name: "Ryan Foster",
    role: "Co-Founder, US Logistics Platform",
  },
  {
    text: "Their social media marketing and paid campaign strategy helped us reach the right audience instead of just increasing impressions. Engagement quality improved and we started generating consistent inquiries.",
    name: "Ava Jenkins",
    role: "Brand Manager, US Consumer Services Company",
  },
  {
    text: "We were looking for a long-term digital partner, not a short-term vendor. Marketinix consistently delivered on strategy, design quality, and reporting clarity, which made decision-making much easier for our team.",
    name: "Nathan Cole",
    role: "Business Development Director, US Consulting Firm",
  },
];

const OVERLINE = "Testimonials";
const TITLE = "Some words from our valued clients";

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

const Testimonials = ({ items: itemsProp, title, overline, backgroundSrc }) => {
  const sectionRef = useRef(null);
  const bgRef = useRef(null);
  const overlineRef = useRef(null);
  const titleRef = useRef(null);
  const carouselRef = useRef(null);
  const trackRef = useRef(null);
  const arrowRef = useRef(null);

  const reducedMotion = usePrefersReducedMotion();

  const items = useMemo(() => {
    if (Array.isArray(itemsProp) && itemsProp.length) return itemsProp;
    return TESTIMONIALS;
  }, [itemsProp]);

  const slideCount = items.length;

  const slides = useMemo(() => [...items, ...items, ...items], [items]);

  const [activeIndex, setActiveIndex] = useState(() => slideCount);
  const activeIndexRef = useRef(activeIndex);

  const goToRef = useRef(null);

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  useEffect(() => {
    setActiveIndex(slideCount);
    activeIndexRef.current = slideCount;
  }, [slideCount]);

  useLayoutEffect(() => {
    ensureGsap();

    const section = sectionRef.current;
    const bg = bgRef.current;
    const overlineEl = overlineRef.current;
    const titleEl = titleRef.current;
    const carousel = carouselRef.current;
    const track = trackRef.current;
    const arrow = arrowRef.current;

    if (
      !section ||
      !bg ||
      !overlineEl ||
      !titleEl ||
      !carousel ||
      !track ||
      !arrow
    )
      return;

    const minIndex = slideCount;
    const maxIndex = slideCount * 2 - 1;

    const ctx = gsap.context((self) => {
      if (reducedMotion) {
        gsap.set(bg, { height: "100%", yPercent: 0 });
        gsap.set([overlineEl, titleEl, carousel], {
          autoAlpha: 1,
          filter: "blur(0rem)",
          yPercent: 0,
        });
      } else {
        gsap.set(bg, { height: "110%", yPercent: -10 });

        gsap.to(bg, {
          yPercent: 0,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
            invalidateOnRefresh: true,
          },
        });

        const titleInnerClassName = cn(
          "line-inner block relative will-change-transform",
        );
        const titleSplit = splitLines(titleEl, titleInnerClassName);

        const revealTl = gsap.timeline({
          scrollTrigger: {
            trigger: titleEl,
            start: "top+=20% bottom",
          },
        });

        revealTl.moveBlur(overlineEl, { yPercent: 110 }, 0);
        revealTl.moveBlur(
          titleSplit.inlines.length ? titleSplit.inlines : titleEl,
          { stagger: 0.12 },
          0.1,
        );

        // Ensure split gets reverted on cleanup (only created in non-reduced motion)
        self.add(() => titleSplit.revert());
      }

      const getSlides = () =>
        Array.from(track.querySelectorAll("[data-carousel-item]"));

      const centerToIndex = (index, immediate = false, onComplete) => {
        const slides = getSlides();
        const slide = slides[index];
        if (!slide) return;

        const bounds = carousel.getBoundingClientRect();
        const slideBounds = slide.getBoundingClientRect();

        const centerOffset = (bounds.width - slideBounds.width) / 2;
        const x = centerOffset - slide.offsetLeft;

        if (immediate || reducedMotion) {
          gsap.set(track, { x });
          onComplete?.();
          return;
        }

        gsap.to(track, {
          x,
          duration: 1.3,
          ease: "expo.out",
          overwrite: "auto",
          onComplete,
        });
      };

      const wrapIndex = (nextIndex, immediate = false) => {
        let index = nextIndex;

        if (index < minIndex) index += slideCount;
        if (index > maxIndex) index -= slideCount;

        if (index !== nextIndex) {
          setActiveIndex(index);
          activeIndexRef.current = index;
          centerToIndex(index, immediate);
        }
      };

      const goTo = (nextIndex) => {
        const index = Number.isFinite(nextIndex)
          ? nextIndex
          : activeIndexRef.current;

        setActiveIndex(index);
        activeIndexRef.current = index;

        centerToIndex(index, false, () => wrapIndex(index, true));
      };

      const goBy = (delta) => {
        goTo(activeIndexRef.current + delta);
      };

      goToRef.current = { goTo, goBy };

      const onResize = () => centerToIndex(activeIndexRef.current, true);
      window.addEventListener("resize", onResize, { passive: true });

      // Initial positioning: center the first slide in the middle set.
      requestAnimationFrame(() => {
        centerToIndex(activeIndexRef.current, true);
      });

      // Desktop cursor-follow arrow + click zones.
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1100px)", () => {
        if (reducedMotion) return () => {};
        let arrowX = null;
        let arrowY = null;

        const onMove = (event) => {
          if (!arrowX || !arrowY) return;
          carousel.classList.add("active");

          const bounds = carousel.getBoundingClientRect();
          const x = event.clientX - bounds.left - bounds.width / 2;
          const y = event.clientY - bounds.top - bounds.height / 2;
          arrowX(x);
          arrowY(y);
        };

        const onLeave = () => {
          carousel.classList.remove("active");
          carousel.classList.remove("prev");
        };

        arrowX = gsap.quickTo(arrow, "x", {
          duration: 0.6,
          ease: "power3.out",
        });
        arrowY = gsap.quickTo(arrow, "y", {
          duration: 0.6,
          ease: "power3.out",
        });

        carousel.addEventListener("mousemove", onMove, { passive: true });
        carousel.addEventListener("mouseleave", onLeave, { passive: true });

        return () => {
          carousel.removeEventListener("mousemove", onMove);
          carousel.removeEventListener("mouseleave", onLeave);
        };
      });

      return () => {
        window.removeEventListener("resize", onResize);
        mm.revert();
      };
    }, section);

    return () => ctx.revert();
  }, [reducedMotion, slideCount, title, overline, backgroundSrc]);

  const onPrev = () => goToRef.current?.goBy?.(-1);
  const onNext = () => goToRef.current?.goBy?.(1);

  const onDragStart = (event) => {
    const carousel = carouselRef.current;
    const track = trackRef.current;
    if (!carousel || !track) return;

    const mm = window.matchMedia("(max-width: 1099px)");
    if (!mm.matches) return;

    carousel.setPointerCapture?.(event.pointerId);
    carousel.classList.add("dragging");

    const startX = event.clientX;
    const start = Number.parseFloat(gsap.getProperty(track, "x")) || 0;

    const state = {
      pointerId: event.pointerId,
      startX,
      start,
    };

    const onMove = (e) => {
      if (e.pointerId !== state.pointerId) return;
      const dx = e.clientX - state.startX;
      gsap.set(track, { x: state.start + dx });
    };

    const settleToClosest = () => {
      carousel.classList.remove("dragging");

      const slidesEls = Array.from(
        track.querySelectorAll("[data-carousel-item]"),
      );
      if (!slidesEls.length) return;

      const bounds = carousel.getBoundingClientRect();
      const centerX = bounds.width / 2;
      const currentX = Number.parseFloat(gsap.getProperty(track, "x")) || 0;

      let closestIndex = activeIndexRef.current;
      let closestDist = Number.POSITIVE_INFINITY;

      slidesEls.forEach((el, idx) => {
        const b = el.getBoundingClientRect();
        const mid = el.offsetLeft + b.width / 2 + currentX;
        const dist = Math.abs(mid - centerX);
        if (dist < closestDist) {
          closestDist = dist;
          closestIndex = idx;
        }
      });

      goToRef.current?.goTo?.(closestIndex);
    };

    const onUp = (e) => {
      if (e.pointerId !== state.pointerId) return;
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      settleToClosest();
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
  };

  return (
    <section
      ref={sectionRef}
      data-theme="dark"
      className={cn(
        "testimonials relative overflow-hidden",
        "py-64 max-[1099px]:pt-[8.4rem] max-[1099px]:pb-62",
      )}
    >
      <figure
        ref={bgRef}
        className="media-wrapper pointer-events-none absolute inset-0 z-0 h-full w-full overflow-hidden"
      >
        <div className="media-inner absolute inset-0 h-full w-full">
          <img
            className="media image absolute inset-0 h-full w-full object-cover"
            src={backgroundSrc || TESTIMONIALS_BG}
            alt=""
            loading="lazy"
          />
        </div>
      </figure>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-1"
      >
        <div className="absolute left-0 top-0 h-1/2 w-full bg-linear-to-b from-black to-transparent" />
        <div className="absolute left-0 top-1/2 h-1/2 w-full bg-linear-to-b from-transparent to-black" />
      </div>

      <span
        ref={overlineRef}
        className={cn(
          "testimonials-overline relative z-2 mx-auto block text-center",
          "mb-20 font-heading text-[1.8rem] italic leading-[120%]",
        )}
      >
        {overline || OVERLINE}
      </span>

      <h2
        ref={titleRef}
        className={cn(
          "testimonials-title relative z-2 mx-auto text-center font-heading",
          "px-8 mb-[10.4rem] text-[5.4rem] leading-[120%]",
          "min-[1100px]:max-w-7xl min-[1100px]:mb-[6.4rem] min-[1100px]:text-[7rem] min-[1100px]:leading-[100%]",
        )}
      >
        {title || TITLE}
      </h2>

      <div
        ref={carouselRef}
        className={cn(
          "carousel group/carousel relative z-2 overflow-hidden",
          "[&.active_.carousel-arrow]:opacity-100",
          "[&.prev_.carousel-arrow_svg]:transform-[rotateY(180deg)]",
        )}
        onPointerDown={onDragStart}
      >
        <div
          ref={trackRef}
          className={cn(
            "carousel-inner flex items-stretch",
            "[touch-action:pan-y_pinch-zoom]",
          )}
        >
          {slides.map((item, index) => {
            const diff = index - activeIndex;
            const isCurrent = diff === 0;
            const isPrev = diff === -1;
            const isNext = diff === 1;
            const isGlowEnabled =
              index >= activeIndex - 1 && index <= activeIndex + 1;

            const innerTransform = isCurrent
              ? "min-[1100px]:[transform:scale(1)] max-[1099px]:[transform:scale(1)]"
              : isPrev
                ? "min-[1100px]:[transform:scale(0.7)_perspective(0.5rem)_rotateY(-0.1deg)] max-[1099px]:[transform:scaleY(0.9)]"
                : isNext
                  ? "min-[1100px]:[transform:scale(0.7)_perspective(0.5rem)_rotateY(0.1deg)] max-[1099px]:[transform:scaleY(0.9)]"
                  : "min-[1100px]:[transform:scale(0.7)] max-[1099px]:[transform:scaleY(0.9)]";

            return (
              <div
                key={`${index}-${item.name}`}
                data-carousel-item
                className={cn(
                  "carousel-item relative min-w-0 flex-[0_0_81.6rem] w-[81.6rem] h-120",
                  "max-[1099px]:flex-[0_0_calc(100vw-6rem)] max-[1099px]:w-[calc(100vw-6rem)] max-[1099px]:h-0 max-[1099px]:pb-[72%] max-[1099px]:mx-2",
                  isCurrent && "current",
                  isPrev && "prev",
                  isNext && "next",
                )}
              >
                <div
                  className={cn(
                    "carousel-item-inner h-full w-full transition-transform duration-1300 ease-ease will-change-transform",
                    "[-webkit-backface-visibility:hidden] backface-hidden",
                    "max-[1099px]:duration-400 max-[1099px]:relative",
                    innerTransform,
                  )}
                >
                  <div
                    className={cn(
                      "testimonial relative flex h-full w-full flex-col items-start justify-center",
                      "rounded-[0.4rem] bg-white/10 text-light",
                      "[-webkit-backdrop-filter:blur(1.2rem)] backdrop-blur-[1.2rem]",
                      "shadow-[inset_0_0_.8rem_rgba(255,255,255,0.02),inset_0_0_.2rem_rgba(255,255,255,0.2)]",
                      "[-webkit-backface-visibility:hidden] backface-hidden transform-[translateZ(0)]",
                      "min-[1100px]:absolute min-[1100px]:inset-0 min-[1100px]:px-[12.8rem]",
                      "max-[1099px]:relative max-[1099px]:px-[3.6rem] max-[1099px]:py-40",
                    )}
                  >
                    <BorderGlowCanvas
                      enabled={isGlowEnabled}
                      color="251, 251, 244"
                      size={140}
                    />

                    <p
                      className={cn(
                        "testimonial-text relative z-3 font-body leading-[140%]",
                        "mb-10 text-[1.8rem] min-[1100px]:text-[2.2rem]",
                        "transition-opacity duration-1300 ease-ease",
                        isCurrent ? "opacity-100" : "opacity-10",
                      )}
                    >
                      {item.text}
                    </p>
                    <p
                      className={cn(
                        "testimonial-name relative z-3 font-heading text-[2rem] leading-[100%]",
                        "mb-10",
                        "transition-opacity duration-1300 ease-ease",
                        isCurrent ? "opacity-100" : "opacity-10",
                      )}
                    >
                      {item.name}
                    </p>
                    <p
                      className={cn(
                        "testimonial-role relative z-3 font-body text-[1.8rem] leading-[140%]",
                        "transition-opacity duration-1300 ease-ease",
                        isCurrent ? "opacity-50" : "opacity-10",
                      )}
                    >
                      {item.role}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <button
          type="button"
          aria-label="Previous testimonial"
          onClick={onPrev}
          onMouseEnter={() => carouselRef.current?.classList.add("prev")}
          onMouseLeave={() => carouselRef.current?.classList.remove("prev")}
          className={cn(
            "carousel-prev absolute left-0 top-0 z-3 h-full w-1/2 cursor-pointer",
            "max-[1099px]:hidden",
          )}
        />
        <button
          type="button"
          aria-label="Next testimonial"
          onClick={onNext}
          onMouseEnter={() => carouselRef.current?.classList.remove("prev")}
          className={cn(
            "carousel-next absolute left-1/2 top-0 z-3 h-full w-1/2 cursor-pointer",
            "max-[1099px]:hidden",
          )}
        />

        <div
          ref={arrowRef}
          aria-hidden="true"
          className={cn(
            "carousel-arrow pointer-events-none absolute left-1/2 top-1/2 z-5",
            "h-[3.6rem] w-[3.6rem] -translate-x-1/2 -translate-y-1/2",
            "opacity-0 transition-opacity duration-600 ease-ease",
            "max-[1099px]:hidden",
          )}
        >
          <svg
            className="h-full w-full transition-transform duration-800 ease-ease"
            width="37"
            height="22"
            viewBox="0 0 37 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18.36 0.324001L18.414 0L36.99 10.854V11.016L18.414 21.87L18.36 21.6L30.24 11.556L0 12.366V9.666L30.294 10.476L18.36 0.324001Z"
              fill="#FBFBF4"
            />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default memo(Testimonials);
