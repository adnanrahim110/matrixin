"use client";

import gsap from "gsap";
import { memo, useEffect, useLayoutEffect, useRef, useState } from "react";

import BorderGlowCanvas from "@/components/ui/BorderGlowCanvas";
import { cn } from "@/utils/cn";
import { ensureGsap } from "@/utils/gsap";

const TESTIMONIALS_BG =
  "https://images.prismic.io/estrelastudio/aN-dN55xUNkB1cOz_testimonials-bg.jpg?w=3000&h=1800&auto=compress,format";

const TESTIMONIALS = [
  {
    text: `"The team at Estrela have been amazing and critical to our UI/UX journey, they challenge our thoughts for the better and have allowed us to become South Africa's fastest-growing Buy Now Pay Later platform. I cannot recommend them enough."`,
    name: "Craig Newborn",
    role: "Former CEO, PayJustNow",
  },
  {
    text: `"Working with Estrela Studio has been a genuinely outstanding experience. Their team brings a rare combination of creativity, technical expertise, and collaborative spirit. Estrela met us exactly where we were - they listened closely, understood the strategic goals and translated that direction into clear, compelling visual design. They led the project with confidence, and I recommend them without hesitation."`,
    name: "Donna Blackwell-Kopotic",
    role: "Sims Lifecycle Service (US)",
  },
  {
    text: `"The Estrela team have a grasp of branding and product design like I've never seen before. We searched the globe for a tech-focused CI design agency and found that the top talent was right here in Cape Town."`,
    name: "Colleen Harrison",
    role: "Former Head of Marketing, Payfast",
  },
  {
    text: `"Working with Natalia and the Estrela team is like working with a bomb squad. They know exactly which wires to cut to get exactly the results we were looking for. They are the only agency we have on speed dial."`,
    name: "Jason Bagley",
    role: "Founder and CEO, Growth Experts (US)",
  },
  {
    text: `"Working with Natalia and the Estrela team on the HelpGuide rebrand has been a true pleasure. Their design approach is strategic, thoughtful, and truly user-centric, and we couldn't be more pleased with the results."`,
    name: "Melinda Smith",
    role: "Executive Director & Editor in Chief, HelpGuide (US)",
  },
  {
    text: `"The team at Estrela Studio are a powerhouse squad of design, UI and UX professionals. Their DNA can be found in our brand for good reason. Smart, dedicated and always tackling each new brief with diligence and enthusiasm. Highly recommended without hesitation."`,
    name: "Mark McChlery",
    role: "Chief Data and Analytics Officer, PayJustNow",
  },
  {
    text: `"Working with Estrela Studio has been a truly special experience. Leigh and Kristen invested themselves in our journey, capturing the essence of our brand and going the extra mile at every step. Their creativity, care, and dedication shine through in a site that feels world-class and truly ours. Sharing tears with us at launch was a testament to how much they cared. We're deeply grateful and proud to recommend Estrela Studio."`,
    name: "Keith Hesketh",
    role: "Marketing & eCommerce Manager, Yucca Packaging",
  },
  {
    text: `"Working with the Estrela team was a joy. The experience of turning an idea into a product design has the potential to be chaotic and overwhelming, but the experts at Estrela knew how to ask the right questions and turn the answers into a structured, clear design process that delivered stunning results that exceeded the project goals, and on deadline, to boot!"`,
    name: "Brianna Bond",
    role: "CEO, LCFO (US)",
  },
  {
    text: `"We at Itemate have worked with the Estrela team for the past two years. During this time, their professionalism and creativity has added a dimension to our solutions which has had a major positive impact on our client's experience and assisting us grow with these clients. A big thanks to Natalia and Team."`,
    name: "Robert van Breukelen",
    role: "CEO, Itemate Solutions",
  },
  {
    text: `"Estrela has been fantastic to collaborate with and went to great detail to understand my brands needs and turned that into the most effective user experience for my customers. Look forward to working together again soon."`,
    name: "Justin Archer",
    role: "Founder, Bashwax Animation Studio",
  },
  {
    text: `"Natalia and her team at Estrela are some of the best UX/UI designers we've had the privilege of working with. From conception through to execution, their thoughtfulness and thoroughness never fail to impress."`,
    name: "Anton Van Diermen",
    role: "Director and Co-Founder, Zulik",
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

const Testimonials = () => {
  const sectionRef = useRef(null);
  const bgRef = useRef(null);
  const overlineRef = useRef(null);
  const titleRef = useRef(null);
  const carouselRef = useRef(null);
  const trackRef = useRef(null);
  const arrowRef = useRef(null);

  const [activeIndex, setActiveIndex] = useState(TESTIMONIALS.length);
  const activeIndexRef = useRef(activeIndex);

  const goToRef = useRef(null);

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

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

    const slideCount = TESTIMONIALS.length;
    const minIndex = slideCount;
    const maxIndex = slideCount * 2 - 1;

    const ctx = gsap.context(() => {
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

        if (immediate) {
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
        titleSplit.revert();
        mm.revert();
      };
    }, section);

    return () => ctx.revert();
  }, []);

  const slides = [...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS];

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
            src={TESTIMONIALS_BG}
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
        {OVERLINE}
      </span>

      <h2
        ref={titleRef}
        className={cn(
          "testimonials-title relative z-2 mx-auto text-center font-heading",
          "px-8 mb-[10.4rem] text-[5.4rem] leading-[120%]",
          "min-[1100px]:w-[81.6rem] min-[1100px]:mb-[6.4rem] min-[1100px]:text-[8.4rem] min-[1100px]:leading-[100%]",
        )}
      >
        {TITLE}
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
                  "carousel-item relative min-w-0 flex-[0_0_81.6rem] w-[81.6rem] h-200",
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
