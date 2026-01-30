"use client";

import gsap from "gsap";
import { memo, useLayoutEffect, useRef } from "react";

import { cn } from "@/utils/cn";
import { ensureGsap } from "@/utils/gsap";
import Button from "../ui/Button";

const WORK_ITEMS = [
  {
    href: "/work/payjustnow-app",
    ariaLabel: "PayJustNow",
    number: "01",
    client: "PayJustNow",
    title: "An App Redesign Built for Discovery",
    services: ["UI Design", "UX Design"],
    image:
      "https://images.prismic.io/estrelastudio/aTFlu3NYClf9n0A7_pjn-app-thumbnail-1-.jpg?w=1380&h=1620&auto=compress,format",
  },
  {
    href: "/work/yucca",
    ariaLabel: "Yucca Packaging",
    number: "02",
    client: "Yucca Packaging",
    title: "A Packaging Website with Purpose",
    services: ["UX Design", "Brand Design", "UI Design"],
    image:
      "https://images.prismic.io/estrelastudio/aTFlTHNYClf9n0A2_yucca-thumbnail.jpg?w=1380&h=1620&auto=compress,format",
  },
  {
    href: "/work/helpguide",
    ariaLabel: "Helpguide",
    number: "03",
    client: "Helpguide",
    title: "A Digital Revamp for Mental Wellbeing",
    services: ["Design Strategy", "UI Design", "Brand Design", "UX Design"],
    image:
      "https://images.prismic.io/estrelastudio/aTFtHHNYClf9n0Jw_hg-app-thumbnail-2.jpg?w=1380&h=1620&auto=compress,format",
  },
  {
    href: "/work/payjustnow-web",
    ariaLabel: "PayJustNow",
    number: "04",
    client: "PayJustNow",
    title: "PayJustNow's Website Reimagined",
    services: [],
    image:
      "https://images.prismic.io/estrelastudio/aTFoeHNYClf9n0Ds_pjn-web-thumbnail.jpg?w=1380&h=1620&auto=compress,format",
  },
];

const INTRO_TITLE = "Featured Work";
const INTRO_TEXT =
  "Design without compromise. Explore our blend of digital product design, website design, and branding.";

const Work = () => {
  const sectionRef = useRef(null);
  const cursorBtnRef = useRef(null);
  const gridRef = useRef(null);

  useLayoutEffect(() => {
    ensureGsap();

    const section = sectionRef.current;
    const cursorBtn = cursorBtnRef.current;
    const grid = gridRef.current;

    if (!section || !cursorBtn || !grid) return;

    const mm = gsap.matchMedia();

    const remToPx = (rem) => {
      const rootFontSize = Number.parseFloat(
        window.getComputedStyle(document.documentElement).fontSize || "16",
      );
      return rem * rootFontSize;
    };

    const splitLines = (element) => {
      if (!element) return () => {};

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
      if (!wordEls.length) return () => {};

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

      lines.forEach((lineWords, index) => {
        const line = document.createElement("span");
        line.className = "line block relative overflow-hidden";

        const inner = document.createElement("span");
        inner.className = cn(
          "line-inner block will-change-transform",
          "translate-y-full transition-transform duration-[1200ms] ease-ease",
          "[transition-delay:0ms] group-[.active]/col:[transition-delay:var(--work-line-delay)]",
          "group-[.active]/col:translate-y-0",
        );
        inner.style.setProperty("--work-line-delay", `${(index + 1) * 80}ms`);

        lineWords.forEach((w) => inner.appendChild(w));
        line.appendChild(inner);
        frag.appendChild(line);
      });

      element.textContent = "";
      element.appendChild(frag);

      return () => {
        element.textContent = originalText;
      };
    };

    mm.add("(min-width: 1100px)", () => {
      let activeIndex = null;
      let itemWidth = 0;
      let itemLargeWidth = 0;
      let bounds = section.getBoundingClientRect();
      let cursorBtnBounds = cursorBtn.getBoundingClientRect();
      let tl = null;

      const cols = Array.from(grid.querySelectorAll("[data-work-col]"));
      const wrappers = cols.map((col) => col.querySelector("[data-work-wrap]"));

      const featuredText = section.querySelector(
        ".work-col-featured [data-work-featured-text]",
      );
      const revertFeaturedText = splitLines(featuredText);

      const getWidths = () => {
        itemLargeWidth = remToPx(46);
        itemWidth = (window.innerWidth - remToPx(3) - itemLargeWidth) / 4;
      };

      const getBounds = () => {
        bounds = section.getBoundingClientRect();
        cursorBtnBounds = cursorBtn.getBoundingClientRect();
      };

      const xTo = gsap.quickTo(cursorBtn, "x", {
        duration: 0.5,
        ease: "power3.out",
        overwrite: "auto",
      });
      const yTo = gsap.quickTo(cursorBtn, "y", {
        duration: 0.5,
        ease: "power3.out",
        overwrite: "auto",
      });

      const reset = () => {
        cols.forEach((col, index) => {
          col.classList.remove("active", "sub-active");
          if (index === 0) col.classList.add("active");
          else if (index === 1) col.classList.add("sub-active");
        });
        activeIndex = null;
      };

      const setActive = (index) => {
        if (!Number.isFinite(index)) return;

        tl?.kill();
        tl = gsap.timeline({
          defaults: { overwrite: "auto", duration: 1.2, ease: "power4.out" },
        });

        cols.forEach((col, colIndex) => {
          const wrap = wrappers[colIndex];
          if (!wrap) return;

          col.classList.remove("active", "sub-active");

          if (colIndex === index) {
            col.classList.add("active");
            tl.to(col, { width: itemLargeWidth }, 0);
            tl.to(wrap, { height: remToPx(56) }, 0);
          } else if (colIndex === index - 1 || colIndex === index + 1) {
            col.classList.add("sub-active");
            tl.to(col, { width: itemWidth }, 0);
            tl.to(wrap, { height: remToPx(38) }, 0);
          } else {
            tl.to(col, { width: itemWidth }, 0);
            tl.to(wrap, { height: remToPx(32) }, 0);
          }

          if (colIndex > 0) {
            if (colIndex <= index) tl.to(col, { x: colIndex * itemWidth }, 0);
            else
              tl.to(col, { x: itemLargeWidth + (colIndex - 1) * itemWidth }, 0);
          } else {
            tl.to(col, { x: 0 }, 0);
          }
        });
      };

      const isInsideAnyWrap = (target) => {
        return cols.some((col) => {
          const wrap = col.querySelector("[data-work-wrap]");
          return wrap && wrap.contains(target);
        });
      };

      const getHoveredIndex = (target) => {
        return cols.findIndex((col) => {
          const wrap = col.querySelector("[data-work-wrap]");
          return wrap && wrap.contains(target);
        });
      };

      getWidths();
      getBounds();
      reset();
      setActive(0);

      const onMouseMove = (event) => {
        const target = event.target;
        if (!(target instanceof Element)) return;

        if (!isInsideAnyWrap(target)) {
          reset();
          section.classList.remove("active");
          setActive(0);
          return;
        }

        getBounds();

        const featuredCol = section.querySelector(".work-col-featured");
        const isOverFeatured = featuredCol?.contains(target) ?? false;

        if (isOverFeatured) section.classList.remove("active");
        else section.classList.add("active");

        xTo(
          event.clientX -
            bounds.left -
            bounds.width * 0.5 -
            cursorBtnBounds.width * 0.5,
        );
        yTo(
          event.clientY -
            bounds.top -
            bounds.height * 0.5 -
            cursorBtnBounds.height * 0.5,
        );

        const nextIndex = getHoveredIndex(target);
        if (nextIndex !== -1 && nextIndex !== activeIndex) {
          activeIndex = nextIndex;
          setActive(nextIndex);
        }
      };

      const onMouseLeave = () => {
        reset();
        section.classList.remove("active");
        setActive(0);
      };

      const onResize = () => {
        getWidths();
        getBounds();
        reset();
        setActive(0);
      };

      section.addEventListener("mousemove", onMouseMove);
      section.addEventListener("mouseleave", onMouseLeave);
      window.addEventListener("resize", onResize, { passive: true });

      return () => {
        section.removeEventListener("mousemove", onMouseMove);
        section.removeEventListener("mouseleave", onMouseLeave);
        window.removeEventListener("resize", onResize);
        section.removeEventListener("mouseleave", onMouseLeave);
        window.removeEventListener("resize", onResize);
        tl?.kill();
        revertFeaturedText?.();
      };
    });

    mm.add("(max-width: 1099px)", () => {
      section.classList.remove("active");

      return () => {
        section.classList.remove("active");
      };
    });

    return () => {
      mm.revert();
      mm.revert();
    };
  }, []);

  const renderNumberChars = (value) => {
    const chars = String(value).split("");
    return (
      <span className="inline-flex">
        {chars.map((char, index) => (
          <span
            key={`${char}-${index}`}
            className={cn(
              "char inline-block translate-y-[110%]",
              "transition-transform duration-1000 ease-ease",
              "delay-[0ms] group-[.active]/col:delay-(--work-char-delay)",
              "group-[.active]/col:translate-y-0",
            )}
            style={{ "--work-char-delay": `${(index + 1) * 60}ms` }}
          >
            {char}
          </span>
        ))}
      </span>
    );
  };

  const renderPill = (text, index) => {
    return (
      <p
        key={`${text}-${index}`}
        className={cn(
          "work-text inline-flex h-10 items-center justify-center rounded-[0.2rem] px-4",
          "font-body text-[1.4rem] leading-[120%]",
          "max-[1099px]:opacity-100",
          "min-[1100px]:opacity-0 min-[1100px]:translate-y-[1.8rem]",
          "min-[1100px]:transition-[opacity,transform] min-[1100px]:duration-400 min-[1100px]:ease-ease",
          "group-[.active]/col:opacity-100 group-[.active]/col:translate-y-0 group-[.active]/col:duration-1000",
          "delay-[0ms] group-[.active]/col:delay-(--work-pill-delay)",
        )}
        style={{ "--work-pill-delay": `${(index + 1) * 60}ms` }}
      >
        {text}
      </p>
    );
  };

  return (
    <section
      ref={sectionRef}
      data-theme="light"
      data-theme-mobile="dark"
      className={cn(
        "work group/work relative z-1",
        "bg-light text-dark min-[1100px]:px-8",
        "max-[1099px]:bg-dark max-[1099px]:text-light",
        "max-[1099px]:pt-[10.4rem] max-[1099px]:pb-48",
      )}
    >
      <button
        ref={cursorBtnRef}
        type="button"
        aria-label="View project"
        className={cn(
          "btn btn-view btn-light pointer-events-none absolute left-1/2 top-1/2 z-1 hidden",
          "min-[1100px]:inline-flex",
          "h-12 overflow-hidden rounded-[0.4rem] bg-transparent px-4 text-dark",
          "opacity-0 transition-opacity duration-400 ease-ease",
          "group-[.active]/work:opacity-100 group-[.active]/work:duration-1000",
        )}
      >
        <span
          className={cn(
            "btn-bg absolute left-[-1%] top-[-1%] z-0 h-[102%] w-[102%] bg-light",
            "-translate-y-[102%] transition-transform duration-300 ease-ease",
            "group-[.active]/work:translate-y-0 group-[.active]/work:duration-400",
          )}
        />
        <span
          className={cn(
            "btn-text relative z-1 mr-[2.7rem] transition-transform duration-600 ease-ease",
            "group-[.active]/work:translate-x-[2.7rem]",
          )}
        >
          View project
        </span>
        <span
          className={cn(
            "btn-dot absolute left-[1.8rem] top-[calc(50%-0.4rem)] h-[0.8rem] w-[calc(100%-4rem)] transition-transform duration-600 ease-ease",
            "group-[.active]/work:translate-x-[calc(-100%+0.4rem)]",
          )}
        >
          <span className="btn-dot-inner absolute right-0 top-[calc(50%-0.2rem)] block h-[0.4rem] w-[0.4rem] rotate-45 rounded-[0.1rem] bg-dark transition-colors duration-600 ease-ease" />
        </span>
      </button>

      <h2 className="work-title mobile-only mb-8 px-8 font-heading text-[3.8rem] leading-[120%] min-[1100px]:hidden">
        {INTRO_TITLE}
      </h2>
      <p className="work-text mobile-only mb-14 max-w-132 px-8 opacity-50 min-[1100px]:hidden">
        {INTRO_TEXT}
      </p>

      <div className="work-grid-wrapper">
        <div
          ref={gridRef}
          className={cn(
            "work-grid relative flex",
            "min-[1100px]:min-h-240 min-[1100px]:-mx-2",
            "max-[1099px]:overflow-x-auto max-[1099px]:px-6 max-[1099px]:[scrollbar-width:none] max-[1099px]:[&::-webkit-scrollbar]:hidden",
            "max-[1099px]:snap-x max-[1099px]:snap-mandatory max-[1099px]:scroll-px-6",
          )}
        >
          <div
            data-work-col
            className={cn(
              "work-col work-col-featured group/col active hidden min-[1100px]:block",
              "min-[1100px]:absolute min-[1100px]:left-0 min-[1100px]:top-0",
            )}
          >
            <div className="work-number mb-[0.6rem] block overflow-hidden pl-4 font-heading text-[1.6rem] italic opacity-0">
              0
            </div>
            <div
              data-work-wrap
              className={cn(
                "work-wrapper relative w-full px-2 text-light will-change-transform",
                "min-[1100px]:h-224",
              )}
            >
              <div className="work-inner absolute left-2 top-0 flex h-full w-[calc(100%-1rem)] flex-col overflow-hidden rounded-[0.2rem] bg-dark">
                <div className="work-content relative flex-1 p-12">
                  <h2
                    className={cn(
                      "work-title absolute left-12 top-12 font-heading text-[3.2rem] leading-[100%]",
                      "origin-top-left scale-[0.6] w-full translate-x-[-1.4rem] translate-y-[-1.4rem]",
                      "transition-transform duration-1000 ease-ease",
                      "group-[.active]/col:scale-100 group-[.active]/col:translate-x-0 group-[.active]/col:translate-y-0",
                    )}
                  >
                    {INTRO_TITLE}
                  </h2>
                  <p
                    data-work-featured-text
                    className="work-text absolute left-12 top-[8.2rem] w-154 text-[1.4rem] leading-[140%] opacity-50"
                  >
                    {INTRO_TEXT}
                  </p>
                </div>

                <Button
                  href="/work"
                  variant="magnetic"
                  tone="purple"
                  className="mx-4 mb-4 mt-auto min-h-80 w-[calc(100%-2rem)]"
                >
                  All Work
                </Button>
              </div>
            </div>
          </div>

          {WORK_ITEMS.map((item) => (
            <div
              key={item.href}
              data-work-col
              className={cn(
                "work-col work-col-project group/col",
                "min-[1100px]:absolute min-[1100px]:left-0 min-[1100px]:top-0",
                "max-[1099px]:flex-[0_0_calc(100%-5.2rem)] max-[1099px]:w-[calc(100%-5.2rem)] max-[1099px]:snap-start",
                "max-[1099px]:last:mr-6",
              )}
            >
              <div className="work-number desktop-only mb-[0.6rem] hidden overflow-hidden pl-4 font-heading text-[1.6rem] italic min-[1100px]:block">
                {renderNumberChars(item.number)}
              </div>

              <div
                data-work-wrap
                className={cn(
                  "work-wrapper relative w-full px-2 text-light will-change-transform",
                  "max-[1099px]:h-184",
                )}
              >
                <a
                  aria-hidden="true"
                  className="work-link pointer-events-none absolute inset-0 z-1"
                />

                <div className="work-inner absolute left-2 top-0 h-full w-[calc(100%-1rem)] overflow-hidden rounded-[0.2rem]">
                  <figure className="media-wrapper absolute inset-0 h-full w-full overflow-hidden rounded-[0.2rem]">
                    <div className="media-inner absolute inset-0 h-full w-full">
                      <img
                        className="media image absolute inset-0 h-full w-full object-cover"
                        src={item.image}
                        alt=""
                        loading="lazy"
                      />
                    </div>
                  </figure>

                  <div className="work-content pointer-events-none absolute left-0 top-0 z-1 flex flex-col items-start p-4">
                    {renderPill(item.client, 0)}
                    {renderPill(item.title, 1)}
                    {item.services.map((service, idx) =>
                      renderPill(service, idx + 2),
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Button
        href="/work"
        variant="magnetic"
        tone="purple"
        className="mt-16 ml-8 hidden min-h-56 w-[calc(100%-4rem)] max-[1099px]:flex"
      >
        All Work
      </Button>
    </section>
  );
};

export default memo(Work);
