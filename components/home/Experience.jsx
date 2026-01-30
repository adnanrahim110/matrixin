"use client";

import gsap from "gsap";
import { memo, useEffect, useLayoutEffect, useRef } from "react";

import { useShowreel } from "@/components/layouts/ShowreelContext";
import { cn } from "@/utils/cn";
import { ensureGsap } from "@/utils/gsap";

const SHOWREEL_PREVIEW = "/videos/mega-menu.mp4";

const RIPPLE_IMAGES = [
  "https://images.prismic.io/estrelastudio/aN7NX55xUNkB1bRi_Experiences_01.jpg?w=600&h=810&auto=compress,format",
  "https://images.prismic.io/estrelastudio/aN7NX55xUNkB1bRj_Experiences_02.jpg?w=600&h=810&auto=compress,format",
  "https://images.prismic.io/estrelastudio/aN7NYZ5xUNkB1bRk_Experiences_03.jpg?w=600&h=810&auto=compress,format",
  "https://images.prismic.io/estrelastudio/aN7NY55xUNkB1bRl_Experiences_04.jpg?w=600&h=810&auto=compress,format",
  "https://images.prismic.io/estrelastudio/aN7NY55xUNkB1bRm_Experiences_05.jpg?w=600&h=810&auto=compress,format",
  "https://images.prismic.io/estrelastudio/aN7NZJ5xUNkB1bRn_Experiences_06.jpg?w=600&h=810&auto=compress,format",
  "https://images.prismic.io/estrelastudio/aN7NZZ5xUNkB1bRo_Experiences_07.jpg?w=600&h=810&auto=compress,format",
  "https://images.prismic.io/estrelastudio/aN7NZp5xUNkB1bRp_Experiences_08.jpg?w=600&h=810&auto=compress,format",
];

const Experience = () => {
  const showreel = useShowreel();

  const sectionRef = useRef(null);
  const btnBlockWrapperRef = useRef(null);
  const btnBlockRef = useRef(null);
  const btnBlockLinkRef = useRef(null);
  const btnRef = useRef(null);

  const contentRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const textWrapperRef = useRef(null);
  const rippleWrapRef = useRef(null);

  const previewVideoRef = useRef(null);

  useEffect(() => {
    const video = previewVideoRef.current;
    if (!video) return;

    const src = video.dataset.src;
    if (src && !video.src) {
      video.src = src;
      video.load();
    }
  }, []);

  useLayoutEffect(() => {
    ensureGsap();

    const section = sectionRef.current;
    const btnBlockWrapper = btnBlockWrapperRef.current;
    const btnBlock = btnBlockRef.current;
    const btnBlockLink = btnBlockLinkRef.current;
    const btn = btnRef.current;
    const content = contentRef.current;
    const titleEl = titleRef.current;
    const subtitle = subtitleRef.current;
    const textWrapper = textWrapperRef.current;
    const rippleWrap = rippleWrapRef.current;

    if (
      !section ||
      !btnBlockWrapper ||
      !btnBlock ||
      !btnBlockLink ||
      !btn ||
      !content ||
      !titleEl ||
      !subtitle ||
      !textWrapper ||
      !rippleWrap
    )
      return;

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
      const lastWord = words[words.length - 1] ?? null;

      return {
        words,
        lastWord,
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

        const inner = document.createElement("span");
        inner.className = "line-inner block relative will-change-transform";
        lineWords.forEach((w) => inner.appendChild(w));

        line.appendChild(inner);
        frag.appendChild(line);
        lineInners.push(inner);
      });

      element.textContent = "";
      element.appendChild(frag);
      return lineInners;
    };

    const hoverBase =
      "exp-title-hover italic !bg-clip-text !text-transparent ![-webkit-text-fill-color:transparent]";
    const hoverDesktop = `${hoverBase} [background:linear-gradient(45deg,#020202,#020202)]`;
    const hoverMobile = `${hoverBase} [background:linear-gradient(45deg,#f4803a,#fbcb6e)]`;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add(
        {
          isDesktop: "(min-width: 1100px)",
          isMobile: "(max-width: 1099px)",
        },
        ({ conditions }) => {
          const isMobile = Boolean(conditions?.isMobile);

          const split = splitWords(titleEl);
          const lineInners = isMobile ? [] : wrapLines(titleEl);
          const lastWord = split.lastWord;
          if (lastWord) {
            lastWord.className = cn(
              lastWord.className,
              isMobile ? hoverMobile : hoverDesktop,
            );
          }

          const cleanups = [];

          if (isMobile) {
            const tl = gsap.timeline({
              scrollTrigger: {
                trigger: titleEl,
                start: "top+=30% bottom",
              },
            });
            tl.moveBlur(split.words);

            cleanups.push(() => {
              tl.scrollTrigger?.kill?.();
              tl.kill();
            });

            cleanups.push(split.revert);
            return () => cleanups.forEach((fn) => fn());
          }

          gsap.set(section, {
            paddingBottom: () => `${window.innerHeight * 3.3}px`,
          });

          const xTo = gsap.quickTo(btn, "x", {
            duration: 0.6,
            ease: "power3.out",
            overwrite: "auto",
          });
          const yTo = gsap.quickTo(btn, "y", {
            duration: 0.6,
            ease: "power3.out",
            overwrite: "auto",
          });

          const getBtnBounds = () => btnBlockLink.getBoundingClientRect();
          let btnBounds = getBtnBounds();

          const onBtnMove = (event) => {
            btnBlock.classList.add("active");
            btnBounds = getBtnBounds();
            xTo(event.clientX - btnBounds.left - btnBounds.width * 0.5);
            yTo(event.clientY - btnBounds.top - btnBounds.height * 0.5);
          };

          const onBtnLeave = () => {
            btnBlock.classList.remove("active");
          };

          btnBlock.addEventListener("mousemove", onBtnMove);
          btnBlock.addEventListener("mouseleave", onBtnLeave);
          cleanups.push(() => {
            btnBlock.removeEventListener("mousemove", onBtnMove);
            btnBlock.removeEventListener("mouseleave", onBtnLeave);
          });

          const btnTl = gsap.timeline({
            scrollTrigger: {
              trigger: btnBlockWrapper,
              start: "top bottom",
              end: () => `+=${window.innerHeight * 3.2}`,
              scrub: true,
              invalidateOnRefresh: true,
            },
          });

          btnTl
            .fromTo(
              btnBlock,
              { y: () => window.innerHeight * 0.05 },
              { y: 0, ease: "power1.in", duration: 0.3 },
              0,
            )
            .fromTo(
              btnBlock,
              { y: 0 },
              {
                y: () => window.innerHeight * 1,
                duration: 0.7,
                ease: "power1.in",
              },
              0.3,
            )
            .to(
              btnBlock,
              {
                width: () => btnBlock.offsetWidth * 0.5,
                height: () => btnBlock.offsetHeight * 0.5,
                duration: 1,
              },
              0,
            );

          const contentTl = gsap.timeline({
            scrollTrigger: {
              trigger: content,
              start: "center center",
              end: () => `+=${window.innerHeight * 4}`,
              scrub: true,
              pin: true,
              pinSpacing: false,
              invalidateOnRefresh: true,
              pinType: "transform",
            },
          });

          contentTl
            .to(content, { duration: 10 }, 0)
            .fromTo(
              titleEl,
              { yPercent: () => window.innerHeight * 0.2, scale: 0.9 },
              { scale: 1, yPercent: 0, ease: "power2.out", duration: 4.8 },
              0,
            )
            .fromTo(
              lineInners,
              { yPercent: 110, autoAlpha: 0, filter: "blur(2rem)" },
              {
                yPercent: 0,
                autoAlpha: 1,
                filter: "blur(0rem)",
                duration: 4,
                ease: "power3.out",
                stagger: 0.4,
              },
              0.3,
            )
            .fromTo(
              lastWord,
              { background: "linear-gradient(45deg, #020202, #020202)" },
              {
                background: "linear-gradient(45deg, #F4803A, #FBCB6E)",
                duration: 2.5,
                ease: "power3.out",
              },
              1.5,
            )
            .fromTo(
              subtitle,
              { y: () => window.innerHeight * 0.8 },
              { y: () => window.innerHeight * -1, duration: 10 },
              2,
            )
            .fromTo(
              textWrapper,
              { y: () => window.innerHeight * 1.2 },
              { y: () => window.innerHeight * -1, duration: 7 },
              2.5,
            )
            .fromTo(
              titleEl,
              { yPercent: 0 },
              {
                yPercent: () => window.innerHeight * -0.3,
                ease: "power1.in",
                duration: 5,
              },
              4.85,
            );

          cleanups.push(() => {
            btnTl.scrollTrigger?.kill?.();
            btnTl.kill();
            contentTl.scrollTrigger?.kill?.();
            contentTl.kill();
          });

          const figures = Array.from(
            rippleWrap.querySelectorAll("[data-exp-ripple-figure]"),
          ).map((figure) => {
            return {
              el: figure,
              img: figure.querySelector("img"),
              bounds: null,
            };
          });

          gsap.set(
            figures.map((f) => f.el),
            { opacity: 0 },
          );

          const threshold = 60;
          const mouse = {
            x: window.innerWidth * 0.5,
            y: window.innerHeight * 0.5,
          };
          const last = { x: 0, y: 0 };
          const cache = { x: mouse.x, y: mouse.y };
          let wrapBounds = rippleWrap.getBoundingClientRect();

          let hovered = false;
          let imgPosition = 0;
          let zIndexVal = 1;
          let activeImagesCount = 0;
          let isIdle = true;
          let rafId = 0;

          const distance = (x1, y1, x2, y2) => Math.hypot(x1 - x2, y1 - y2);
          const lerp = (a, b, t) => a + (b - a) * t;

          const onImageActivated = () => {
            activeImagesCount += 1;
            isIdle = false;
          };
          const onImageDeactivated = () => {
            activeImagesCount -= 1;
            if (activeImagesCount <= 0) {
              activeImagesCount = 0;
              isIdle = true;
            }
          };

          const showNextImage = () => {
            if (!hovered || !figures.length) return;

            zIndexVal += 1;
            imgPosition =
              imgPosition < figures.length - 1 ? imgPosition + 1 : 0;
            const item = figures[imgPosition];
            if (!item?.el || !item.img) return;

            item.bounds = item.el.getBoundingClientRect();

            gsap.killTweensOf(item.el);

            let dx = mouse.x - cache.x;
            let dy = mouse.y - cache.y;
            const magnitude = Math.sqrt(dx * dx + dy * dy);
            if (magnitude !== 0) {
              dx /= magnitude;
              dy /= magnitude;
            }
            dx *= magnitude / 100;
            dy *= magnitude / 100;

            gsap
              .timeline({
                onStart: onImageActivated,
                onComplete: onImageDeactivated,
              })
              .fromTo(
                item.el,
                {
                  opacity: 1,
                  scale: 0,
                  zIndex: zIndexVal,
                  x: cache.x - item.bounds.width / 2 - wrapBounds.left,
                  y: cache.y - item.bounds.height / 2 - wrapBounds.top,
                },
                {
                  duration: 0.4,
                  ease: "power1",
                  scale: 1,
                  x: mouse.x - item.bounds.width / 2 - wrapBounds.left,
                  y: mouse.y - item.bounds.height / 2 - wrapBounds.top,
                },
                0,
              )
              .fromTo(
                item.img,
                { scale: 2 },
                { duration: 0.4, ease: "power1", scale: 1 },
                0,
              )
              .to(item.el, { duration: 0.4, opacity: 0 }, 0.4)
              .to(
                item.el,
                {
                  duration: 1.5,
                  ease: "power4",
                  x: `+=${dx * 110}`,
                  y: `+=${dy * 110}`,
                },
                0.05,
              );
          };

          const onMouseMove = (event) => {
            mouse.x = event.clientX;
            mouse.y = event.clientY;
          };
          window.addEventListener("mousemove", onMouseMove, { passive: true });

          const onRippleEnter = () => {
            hovered = true;
            wrapBounds = rippleWrap.getBoundingClientRect();
          };
          const onRippleLeave = () => {
            hovered = false;
            cache.x = mouse.x;
            cache.y = mouse.y;
          };

          lastWord?.addEventListener("mouseover", onRippleEnter);
          lastWord?.addEventListener("mouseleave", onRippleLeave);

          const onResize = () => {
            wrapBounds = rippleWrap.getBoundingClientRect();
            figures.forEach((item) => {
              item.bounds = item.el.getBoundingClientRect();
            });
          };
          window.addEventListener("resize", onResize, { passive: true });

          const loop = () => {
            if (hovered) {
              if (distance(mouse.x, mouse.y, last.x, last.y) > threshold) {
                showNextImage();
                last.x = mouse.x;
                last.y = mouse.y;
              }

              cache.x = lerp(cache.x || mouse.x, mouse.x, 0.1);
              cache.y = lerp(cache.y || mouse.y, mouse.y, 0.1);

              if (isIdle && zIndexVal !== 1) zIndexVal = 1;
            }

            rafId = window.requestAnimationFrame(loop);
          };

          rafId = window.requestAnimationFrame(loop);

          cleanups.push(() => {
            window.cancelAnimationFrame(rafId);
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("resize", onResize);
            lastWord?.removeEventListener("mouseover", onRippleEnter);
            lastWord?.removeEventListener("mouseleave", onRippleLeave);
            figures.forEach((item) => gsap.killTweensOf(item.el));
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
      data-theme="light"
      ref={sectionRef}
      className={cn(
        "exp relative z-1 min-h-[calc(var(--vh,1vh)*100)] bg-light text-dark",
        "min-[1100px]:pb-[330vh]",
      )}
    >
      <div
        ref={btnBlockWrapperRef}
        className={cn(
          "exp-btn-block-wrapper absolute inset-0 z-1 flex h-[calc(var(--vh,1vh)*100)] items-center justify-center",
          "max-[1099px]:relative max-[1099px]:block max-[1099px]:h-auto max-[1099px]:px-8 max-[1099px]:py-32",
        )}
      >
        <div
          ref={btnBlockRef}
          className={cn(
            "btn-block hide-btn group relative flex items-center justify-center overflow-hidden rounded-[0.2rem]",
            "h-270 w-480 bg-[rgba(247,247,247,0.1)] transform-gpu",
            "max-[1099px]:aspect-video max-[1099px]:h-auto max-[1099px]:w-full",
            "before:content-[''] before:absolute before:inset-0 before:z-0 before:rounded-[0.2rem] before:bg-(--hoverColor)",
            "before:[clip-path:inset(0_0_102%_0)] before:transition-[clip-path] before:duration-600 before:ease-ease",
            "[&.active]:before:[clip-path:inset(0_0_0%_0)]",
            "cursor-default",
          )}
          style={{ "--hoverColor": "rgba(2,2,2,0.06)" }}
          data-exp-btn-block
        >
          <div className="btn-block-inner absolute inset-0 z-0 h-full w-full overflow-hidden">
            <a
              ref={btnBlockLinkRef}
              href="#"
              aria-label="Showreel"
              className={cn(
                "btn-block-link absolute inset-0 z-1 block",
                "max-[1099px]:bg-dark max-[1099px]:opacity-20",
              )}
              onClick={(event) => {
                event.preventDefault();
                showreel.show();
              }}
              data-exp-btn-block-link
            />

            <figure className="media-wrapper absolute inset-0 z-0 h-full w-full overflow-hidden">
              <div className="media-inner absolute inset-0 h-full w-full">
                <video
                  ref={previewVideoRef}
                  className="media video absolute inset-0 h-full w-full object-cover"
                  data-src={SHOWREEL_PREVIEW}
                  muted
                  playsInline
                  loop
                  autoPlay
                  preload="auto"
                />
              </div>
            </figure>
          </div>

          <button
            ref={btnRef}
            type="button"
            aria-label="Showreel"
            className={cn(
              "btn exp-showreel-btn pointer-events-none relative z-1 inline-flex h-16 items-center overflow-hidden rounded-[0.4rem] px-[2.2rem]",
              "bg-[rgba(188,188,188,0.1)] text-dark",
              "min-[1100px]:opacity-0 min-[1100px]:transition-opacity min-[1100px]:duration-400 min-[1100px]:ease-ease",
              "max-[1099px]:bg-light",
              "group-[.active]:opacity-100",
            )}
            data-exp-btn
          >
            <span
              className={cn(
                "btn-bg absolute left-[-1%] top-[-1%] z-0 h-[102%] w-[102%] bg-light",
                "-translate-y-[102%] transition-transform duration-300 ease-ease",
                "group-[.active]:translate-y-0 group-[.active]:duration-400",
              )}
            />
            <span
              className={cn(
                "btn-text relative z-1 mr-[2.7rem] transition-transform duration-600 ease-ease",
                "group-[.active]:translate-x-[2.7rem]",
              )}
            >
              Showreel
            </span>
            <span
              className={cn(
                "btn-dot absolute left-[1.8rem] top-[calc(50%-0.4rem)] h-[0.8rem] w-[calc(100%-4rem)] transition-transform duration-600 ease-ease",
                "group-[.active]:translate-x-[calc(-100%+0.4rem)]",
              )}
            >
              <span className="btn-dot-inner absolute right-0 top-[calc(50%-0.2rem)] block h-[0.4rem] w-[0.4rem] rotate-45 rounded-[0.1rem] bg-dark transition-colors duration-600 ease-ease" />
            </span>
          </button>
        </div>
      </div>

      <div
        className={cn(
          "exp-content-wrapper absolute inset-0 flex h-[calc(var(--vh,1vh)*100)] items-center justify-center",
          "max-[1099px]:relative max-[1099px]:block max-[1099px]:h-auto max-[1099px]:pb-48",
        )}
      >
        <div
          ref={contentRef}
          className={cn(
            "exp-content relative mx-auto flex h-full w-full flex-col items-center justify-center",
            "min-[1100px]:w-[107.6rem]",
          )}
          data-exp-content
        >
          <div
            aria-hidden="true"
            ref={rippleWrapRef}
            className="exp-images pointer-events-none absolute inset-0 hidden min-[1100px]:block"
            data-exp-ripple-wrap
          >
            {RIPPLE_IMAGES.map((src) => (
              <figure
                key={src}
                className={cn(
                  "media-wrapper absolute left-0 top-0 h-108 w-76 overflow-hidden rounded-[0.2rem] opacity-0",
                )}
                data-exp-ripple-figure
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

          <h2
            ref={titleRef}
            className={cn(
              "exp-title font-heading text-[11rem] leading-[110%] text-center",
              "cursor-default",
              "max-[1099px]:mb-32 max-[1099px]:text-[7.4rem] max-[1099px]:leading-[110%]",
            )}
            data-exp-title
          >
            Crafting competitive digital experiences
          </h2>

          <span
            ref={subtitleRef}
            className={cn(
              "exp-subtitle pointer-events-none absolute top-1/2 left-[4.3rem] w-182 rounded-[0.2rem] bg-[rgba(251,251,244,0.5)] p-12",
              "[-webkit-backdrop-filter:blur(1.2rem)] backdrop-blur-[1.2rem]",
              "shadow-[inset_0_0_.8rem_rgba(255,255,255,0.02),inset_0_0_.2rem_rgba(255,255,255,0.2)]",
              "font-heading text-[1.8rem] leading-[120%] italic",
              "max-[1099px]:relative max-[1099px]:top-auto max-[1099px]:left-0 max-[1099px]:w-auto max-[1099px]:bg-transparent max-[1099px]:p-0 max-[1099px]:px-8 max-[1099px]:mb-16",
            )}
            data-exp-subtitle
          >
            Inside Estrela Studio
          </span>

          <div
            ref={textWrapperRef}
            className={cn(
              "exp-text-wrapper pointer-events-none absolute top-1/2 left-[50.4rem] w-216 rounded-[0.2rem] bg-[rgba(251,251,244,0.5)] px-16 py-12 text-grey",
              "[-webkit-backdrop-filter:blur(1.2rem)] backdrop-blur-[1.2rem]",
              "shadow-[inset_0_0_.8rem_rgba(255,255,255,0.02),inset_0_0_.2rem_rgba(255,255,255,0.2)]",
              "max-[1099px]:relative max-[1099px]:top-auto max-[1099px]:left-auto max-[1099px]:w-full max-[1099px]:bg-transparent max-[1099px]:p-0 max-[1099px]:px-8 max-[1099px]:pr-[6.4rem]",
            )}
            data-exp-text
          >
            <p className="exp-text text-[1.5rem] leading-[140%] text-grey">
              Estrela Studio is a global branding and digital design agency
              rooted in Vienna and Cape Town. We live and breathe our craft,
              building brands, websites, and digital products that turn bold
              ideas into design that matters.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default memo(Experience);
