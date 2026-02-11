"use client";

import gsap from "gsap";
import { memo, useLayoutEffect, useRef } from "react";

import { cn } from "@/utils/cn";
import { ensureGsap } from "@/utils/gsap";
import Button from "../ui/Button";

const SERVICES_TITLE = "What we do";

const SERVICES = [
  {
    number: "01",
    title: "Web Design",
    text: "Custom, responsive website designs built to reflect your brand, enhance usability, and improve conversions across all devices.",
    image: "/imgs/s1.jpg",
  },
  {
    number: "02",
    title: "Web Development",
    text: "Scalable, secure, and fast web solutions engineered to support growth, performance, and long-term business stability.",
    image: "/imgs/s2.jpg",
  },
  {
    number: "03",
    title: "Digital Marketing",
    text: "Strategic SEO, PPC, social media, and content marketing focused on traffic growth, lead generation, and ROI.",
    image: "/imgs/s3.jpg",
  },
  {
    number: "04",
    title: "Graphic Design",
    text: "Creative branding, visuals, and marketing assets designed to capture attention and strengthen brand recognition.",
    image: "/imgs/s4.jpg",
  },
];

const CTA = {
  title:
    "Looking for a custom project? <br /> <span class='text-primary'>Let's work together.</span>",
  href: "/contact",
  label: "Get in Touch",
};

const Services = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const wrapperRef = useRef(null);

  useLayoutEffect(() => {
    ensureGsap();

    const section = sectionRef.current;
    const titleEl = titleRef.current;
    const wrapper = wrapperRef.current;
    if (!section || !titleEl || !wrapper) return;

    const remToPx = (rem) => {
      const rootFontSize = Number.parseFloat(
        window.getComputedStyle(document.documentElement).fontSize || "16",
      );
      return rem * rootFontSize;
    };

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
      if (!wordEls.length)
        return { revert: () => {}, inlines: [], originalText };

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

      lines.forEach((lineWords, index) => {
        const line = document.createElement("span");
        line.className = "line block relative overflow-hidden";

        const inner = document.createElement("span");
        inner.className = innerClassName;
        inner.style.setProperty(
          "--service-line-delay",
          `${(index + 1) * 60}ms`,
        );

        lineWords.forEach((w) => inner.appendChild(w));
        line.appendChild(inner);
        frag.appendChild(line);
        inlines.push(inner);
      });

      element.textContent = "";
      element.appendChild(frag);

      return {
        inlines,
        originalText,
        revert: () => {
          element.textContent = originalText;
        },
      };
    };

    const ctx = gsap.context(() => {
      const titleInnerClassName = cn(
        "line-inner block relative will-change-transform",
      );
      const titleSplit = splitLines(titleEl, titleInnerClassName);

      const titleTl = gsap.timeline({
        scrollTrigger: {
          trigger: titleEl,
          start: "top+=20% bottom",
        },
      });

      titleTl.moveBlur(
        titleSplit.inlines.length ? titleSplit.inlines : titleEl,
        { stagger: 0.12 },
      );

      const mm = gsap.matchMedia();

      mm.add("(min-width: 1100px)", () => {
        const items = Array.from(
          wrapper.querySelectorAll("[data-service-item]"),
        );
        if (!items.length) return () => {};

        const getOffsets = () => ({
          base: remToPx(10.7),
          active: remToPx(24.7),
        });

        const serviceInnerClassName = cn(
          "line-inner block will-change-transform",
          "translate-y-[105%] transition-transform duration-[600ms] ease-ease",
          "[transition-delay:0ms] group-[.active]/service:[transition-delay:var(--service-line-delay)]",
          "group-[.active]/service:translate-y-0 group-[.active]/service:duration-[1200ms]",
        );

        const resplitters = [];
        const splitCleanups = [];

        items.forEach((item, index) => {
          item.classList.toggle("active", index === 0);

          const text = item.querySelector("[data-service-text]");
          if (!text) return;

          let split = splitLines(text, serviceInnerClassName);
          resplitters.push(() => {
            split.revert?.();
            split = splitLines(text, serviceInnerClassName);
          });
          splitCleanups.push(() => split.revert?.());
        });

        const setInitialPositions = () => {
          const { base, active } = getOffsets();
          items.forEach((item, index) => {
            if (index === 0) {
              gsap.set(item, { y: 0, overwrite: "auto" });
              return;
            }

            const y = index === 1 ? active : (index - 1) * base + active;
            gsap.set(item, { y, overwrite: "auto" });
          });
        };

        const setActiveItem = (activeIndex) => {
          const { base, active } = getOffsets();

          items.forEach((item, index) => {
            item.classList.toggle("active", activeIndex === index);
            if (index === 0) return;

            let y = 0;
            if (activeIndex === 0) {
              y = index === 1 ? active : (index - 1) * base + active;
            } else if (activeIndex === index || activeIndex > index) {
              y = index * base;
            } else {
              y = (index - 1) * base + active;
            }

            gsap.to(item, {
              y,
              ease: "power3.out",
              duration: 0.8,
              overwrite: "auto",
            });
          });
        };

        setInitialPositions();

        const onWrapperLeave = () => setActiveItem(0);
        wrapper.addEventListener("mouseleave", onWrapperLeave);

        const enterCleanups = [];
        items.forEach((item, index) => {
          const onEnter = () => {
            if (index === items.length - 1) {
              setActiveItem(0);
              return;
            }
            setActiveItem(index);
          };
          item.addEventListener("mouseenter", onEnter);
          enterCleanups.push(() =>
            item.removeEventListener("mouseenter", onEnter),
          );
        });

        const onResize = () => {
          gsap.killTweensOf(items);
          items.forEach((item, index) =>
            item.classList.toggle("active", index === 0),
          );
          resplitters.forEach((fn) => fn());
          setInitialPositions();
        };

        window.addEventListener("resize", onResize, { passive: true });

        return () => {
          wrapper.removeEventListener("mouseleave", onWrapperLeave);
          window.removeEventListener("resize", onResize);
          enterCleanups.forEach((cleanup) => cleanup());
          splitCleanups.forEach((cleanup) => cleanup());
          gsap.killTweensOf(items);
        };
      });

      return () => {
        titleTl.scrollTrigger?.kill?.();
        titleTl.kill();
        titleSplit.revert?.();
        mm.revert();
      };
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      data-theme="light"
      className={cn(
        "services relative bg-light text-dark",
        "min-[1100px]:px-8 min-[1100px]:pb-8",
      )}
    >
      <h2
        ref={titleRef}
        className={cn(
          "services-title font-heading text-[5.4rem] leading-[100%]",
          "px-8 mb-12",
          "max-[1099px]:text-[3.8rem]",
          "min-[1100px]:ml-282 min-[1100px]:mb-16 min-[1100px]:px-0",
        )}
      >
        {SERVICES_TITLE}
      </h2>

      <div
        ref={wrapperRef}
        className={cn("services-inner relative", "min-[1100px]:h-356")}
      >
        {SERVICES.map((service, index) => (
          <div
            key={service.number}
            data-service-item
            className={cn(
              "service group/service flex w-full justify-between",
              "h-[42.7rem] p-8",
              "min-[1100px]:absolute min-[1100px]:left-0 min-[1100px]:top-0",
              "max-[1099px]:block max-[1099px]:h-auto max-[1099px]:pb-[5.6rem]",
              index === 0 && "bg-[#f7f6f0]",
              index === 1 && "bg-n-5",
              index === 2 && "bg-[#dddcd0]",
            )}
          >
            <figure
              className={cn(
                "media-wrapper relative shrink-0 overflow-hidden rounded-[0.2rem]",
                "h-104 w-176",
                "max-[1099px]:h-0 max-[1099px]:w-full max-[1099px]:pb-[60%]",
              )}
            >
              <div className="media-inner absolute inset-0 h-full w-full">
                <img
                  className="media image absolute inset-0 h-full w-full object-cover"
                  src={service.image}
                  alt=""
                  loading="lazy"
                />
              </div>
            </figure>

            <div
              className={cn(
                "service-content pt-8",
                "min-[1100px]:w-270 min-[1100px]:pt-[1.8rem]",
              )}
            >
              <div
                className={cn(
                  "service-header flex justify-between pr-8",
                  "mb-[3.2rem]",
                  "max-[1099px]:flex-col max-[1099px]:pr-0 max-[1099px]:mb-8",
                )}
              >
                <h3
                  className={cn(
                    "service-title font-heading text-[3.4rem] leading-[100%]",
                    "max-[1099px]:text-[2.6rem] max-[1099px]:leading-[120%]",
                    "min-[1100px]:w-212",
                  )}
                >
                  {service.title}
                </h3>
                <span
                  className={cn(
                    "service-number font-heading text-[3.4rem] leading-[100%]",
                    "max-[1099px]:text-[2.6rem] max-[1099px]:leading-[120%] max-[1099px]:-order-1",
                  )}
                >
                  {service.number}
                </span>
              </div>

              <p
                data-service-text
                className={cn(
                  "service-text font-body text-[1.5rem] leading-[140%] opacity-50",
                  "min-[1100px]:w-184",
                )}
              >
                {service.text}
              </p>
            </div>
          </div>
        ))}

        <div
          data-service-item
          className={cn(
            "service service-cta group/service flex w-full justify-between",
            "h-[42.7rem] bg-n-4 p-16",
            "min-[1100px]:absolute min-[1100px]:left-0 min-[1100px]:top-0",
            "max-[1099px]:block max-[1099px]:h-auto max-[1099px]:px-8 max-[1099px]:pt-[9.2rem] max-[1099px]:pb-[10.4rem]",
          )}
        >
          <div
            className={cn(
              "service-content",
              "pt-0",
              "min-[1100px]:ml-266 min-[1100px]:w-270",
            )}
          >
            <div
              className={cn(
                "service-header flex justify-between",
                "mb-20",
                "max-[1099px]:mb-8",
              )}
            >
              <h3
                className={cn(
                  "service-title font-heading text-[3.4rem] leading-[120%]",
                  "max-[1099px]:text-[2.6rem] max-[1099px]:leading-[120%]",
                )}
                dangerouslySetInnerHTML={{ __html: CTA.title }}
              />
            </div>

            <Button href={CTA.href}>{CTA.label}</Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default memo(Services);
