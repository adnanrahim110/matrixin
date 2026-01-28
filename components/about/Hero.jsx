"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import lottie from "lottie-web";
import { memo, useEffect, useLayoutEffect, useMemo, useRef } from "react";

import { cn } from "@/utils/cn";
import { ensureGsap } from "@/utils/gsap";

const remToPx = (rem) => {
  const rootFontSize = Number.parseFloat(
    window.getComputedStyle(document.documentElement).fontSize || "16",
  );
  return rem * rootFontSize;
};

const lerp = (a, b, t) => a + (b - a) * t;

const HERO_IMAGES = [
  {
    src: "https://images.prismic.io/estrelastudio/aN6L155xUNkB1anY_Grid_01.jpg?w=1350&h=840&auto=compress,format",
    width: 900,
    height: 560,
  },
  {
    src: "https://images.prismic.io/estrelastudio/aN6L2J5xUNkB1anZ_Grid_02.jpg?w=1350&h=840&auto=compress,format",
    width: 900,
    height: 560,
  },
  {
    src: "https://images.prismic.io/estrelastudio/aN6L2Z5xUNkB1ana_Grid_03.jpg?w=1350&h=840&auto=compress,format",
    width: 900,
    height: 560,
  },
  {
    src: "https://images.prismic.io/estrelastudio/aN6L2p5xUNkB1anb_Grid_04.jpg?w=1350&h=840&auto=compress,format",
    width: 900,
    height: 560,
  },
  {
    src: "https://images.prismic.io/estrelastudio/aN6L3J5xUNkB1anc_Grid_05.jpg?w=1350&h=840&auto=compress,format",
    width: 900,
    height: 560,
  },
];

const Hero = () => {
  const sectionRef = useRef(null);

  const titleTopRef = useRef(null);
  const titleBottomRef = useRef(null);
  const titleTopLeftRef = useRef(null);
  const titleTopRightRef = useRef(null);
  const titleBottomInnerRef = useRef(null);

  const imagesWrapperRef = useRef(null);
  const imagesInnerRef = useRef(null);
  const imageColsRef = useRef([]);

  const iconMobileRef = useRef(null);
  const iconDesktopRef = useRef(null);

  const lottieMobileRef = useRef(null);
  const lottieDesktopRef = useRef(null);
  const framesMobileRef = useRef(0);
  const framesDesktopRef = useRef(0);

  const mouseXRef = useRef(0);

  const titleAnimRef = useRef({
    topX: 0,
    bottomX: 0,
    frame: 0,
  });

  const sizesAttr = useMemo(() => "(max-width: 1100px) 450px, 900px", []);

  useEffect(() => {
    const host = iconMobileRef.current;
    if (!host) return;

    const anim = lottie.loadAnimation({
      container: host,
      renderer: "svg",
      loop: false,
      autoplay: false,
      path: "/icon.json",
    });
    lottieMobileRef.current = anim;

    const onReady = () => {
      framesMobileRef.current = anim.totalFrames || 0;
    };
    anim.addEventListener("data_ready", onReady);

    return () => {
      anim.removeEventListener("data_ready", onReady);
      anim.destroy();
      lottieMobileRef.current = null;
      framesMobileRef.current = 0;
    };
  }, []);

  useEffect(() => {
    const host = iconDesktopRef.current;
    if (!host) return;

    const anim = lottie.loadAnimation({
      container: host,
      renderer: "svg",
      loop: false,
      autoplay: false,
      path: "/icon.json",
    });
    lottieDesktopRef.current = anim;

    const onReady = () => {
      framesDesktopRef.current = anim.totalFrames || 0;
    };
    anim.addEventListener("data_ready", onReady);

    return () => {
      anim.removeEventListener("data_ready", onReady);
      anim.destroy();
      lottieDesktopRef.current = null;
      framesDesktopRef.current = 0;
    };
  }, []);

  useLayoutEffect(() => {
    ensureGsap();

    const section = sectionRef.current;
    const titleTop = titleTopRef.current;
    const titleBottom = titleBottomRef.current;
    const titleTopLeft = titleTopLeftRef.current;
    const titleTopRight = titleTopRightRef.current;
    const titleBottomInner = titleBottomInnerRef.current;
    const imagesWrapper = imagesWrapperRef.current;
    const imagesInner = imagesInnerRef.current;

    if (
      !section ||
      !titleTop ||
      !titleBottom ||
      !titleTopLeft ||
      !titleTopRight ||
      !titleBottomInner ||
      !imagesWrapper ||
      !imagesInner
    ) {
      return;
    }

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

          let active = true;

          const onMouseMove = (e) => {
            mouseXRef.current = e.clientX;
          };

          if (!isMobile) {
            window.addEventListener("mousemove", onMouseMove, {
              passive: true,
            });
            cleanups.push(() =>
              window.removeEventListener("mousemove", onMouseMove),
            );
          }

          // Intro animation (closest equivalent to Estrela's Site.introTl)
          const introTl = gsap.timeline({ delay: 0.05 });
          introTl.moveBlur(
            [titleTopLeft, titleTopRight],
            { yPercent: 60 },
            0.05,
          );
          introTl.moveBlur([titleBottomInner], { yPercent: 60 }, 0.15);
          introTl.moveBlur(
            isMobile ? iconMobileRef.current : iconDesktopRef.current,
            { yPercent: 40, duration: 1.1 },
            0,
          );

          if (isMobile) {
            introTl.fromTo(
              imagesWrapper,
              { clipPath: "inset(0 0 100% 0)" },
              {
                clipPath: "inset(0 0 0% 0)",
                duration: 1.2,
                ease: "power3.out",
              },
              0.1,
            );
          } else {
            const innerEls = imagesInner.querySelectorAll(".media-inner");
            introTl.fromTo(
              innerEls,
              { clipPath: "inset(0 0 100% 0)" },
              {
                clipPath: "inset(0 0 0% 0)",
                duration: 1,
                ease: "power3.out",
                stagger: 0.05,
              },
              0.25,
            );
          }

          // Active window (mirrors Estrela AboutHero initDesktop)
          const activeSt = ScrollTrigger.create({
            trigger: section,
            start: "top top",
            end: () => `+=${window.innerHeight * 1.4}`,
            scrub: true,
            onLeave: () => {
              active = false;
            },
            onEnterBack: () => {
              active = true;
            },
          });
          cleanups.push(() => activeSt.kill());

          // Pin image strip + expose scroll progress for the image accordion y-offset
          const progressRef = { current: 0 };
          const pinTl = gsap.timeline({
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: () => `+=${window.innerHeight}`,
              scrub: true,
              pin: imagesWrapper,
              pinSpacing: false,
              onUpdate: (self) => {
                progressRef.current = self.progress;
              },
            },
          });
          pinTl.to(imagesInner, {
            y: -(window.innerHeight - remToPx(20)),
            duration: 1,
            ease: "none",
          });
          cleanups.push(() => {
            pinTl.scrollTrigger?.kill?.();
            pinTl.kill();
          });

          // Mobile: scroll reveal + dim stack + scrub icon frames
          if (isMobile) {
            const cols = imageColsRef.current.filter(Boolean);
            const iconAnim = lottieMobileRef.current;
            const totalFrames = framesMobileRef.current;
            const iconObj = { frame: iconAnim?.currentFrame ?? 0 };

            const mobileTl = gsap.timeline({
              scrollTrigger: {
                trigger: section,
                start: "top top",
                end: "bottom top",
                scrub: true,
              },
            });

            if (iconAnim && totalFrames) {
              mobileTl.to(
                iconObj,
                {
                  frame: totalFrames * 0.5,
                  duration: 1,
                  ease: "none",
                  onUpdate: () => iconAnim.goToAndStop(iconObj.frame, true),
                },
                0,
              );
            }

            const denom = Math.max(1, cols.length - 2);
            const step = 1 / denom;

            cols.forEach((col, index) => {
              const wrapper = col.querySelector(".media-wrapper");
              const media = col.querySelector(".media");
              if (!wrapper || !media) return;

              if (index > 0) {
                mobileTl.fromTo(
                  wrapper,
                  { clipPath: "inset(0 0 100% 0)" },
                  { clipPath: "inset(0 0 0% 0)", ease: "none", duration: step },
                  (index - 1) * step,
                );
                mobileTl.fromTo(
                  media,
                  { scale: 1.4 },
                  { scale: 1, ease: "none", duration: step },
                  (index - 1) * step,
                );
              }

              mobileTl.fromTo(
                media,
                { autoAlpha: 1 },
                { autoAlpha: 0.6, ease: "none", duration: step },
                index * step,
              );
            });

            cleanups.push(() => {
              mobileTl.scrollTrigger?.kill?.();
              mobileTl.kill();
            });

            cleanups.push(() => introTl.kill());
            return () => cleanups.forEach((fn) => fn());
          }

          // Desktop: cursor-driven title drift + icon frames + image accordion layout
          const cols = imageColsRef.current.filter(Boolean);
          if (!cols.length) {
            cleanups.push(() => introTl.kill());
            return () => cleanups.forEach((fn) => fn());
          }

          const topSet = gsap.quickSetter(titleTop, "x", "px");
          const bottomSet = gsap.quickSetter(titleBottom, "x", "px");

          const imgCols = Array.from(cols);
          const imgLength = imgCols.length;

          const imgAnim = imgCols.map((col) => ({
            x: gsap.quickTo(col, "x", { duration: 0.15, ease: "power1.out" }),
            y: gsap.quickTo(col, "y", { duration: 0.15, ease: "power1.out" }),
            sx: gsap.quickTo(col, "scaleX", {
              duration: 0.15,
              ease: "power1.out",
            }),
            sy: gsap.quickTo(col, "scaleY", {
              duration: 0.15,
              ease: "power1.out",
            }),
          }));

          let tSmoothed = 0;

          const layoutState = {
            imgWidth: 0,
            imgScale: 0,
            imgGap: 0,
            x0: new Array(imgLength),
            baseHeights: new Array(imgLength),
          };

          const computeImageLayout = (immediate = true) => {
            const imgLargeBase = remToPx(42);
            layoutState.imgGap = remToPx(1);
            const pagePadding = remToPx(4);
            const usableWidth = window.innerWidth - pagePadding;

            layoutState.imgWidth =
              (usableWidth -
                imgLargeBase -
                layoutState.imgGap * (imgLength - 1)) /
              (imgLength - 1);
            layoutState.imgScale = imgLargeBase / layoutState.imgWidth - 1;

            let accumX = 0;
            for (let i = 0; i < imgLength; i += 1) {
              const col = imgCols[i];
              layoutState.baseHeights[i] = col.offsetHeight;
              col.style.width = `${layoutState.imgWidth}px`;
              col.style.transformOrigin = "left center";
              col.style.willChange = "transform";
              layoutState.x0[i] = accumX;

              if (immediate) {
                gsap.set(col, { x: accumX, scaleX: 1, scaleY: 1 });
              }
              accumX += layoutState.imgWidth + layoutState.imgGap;
            }
          };

          const weight = (i, t) => {
            const d = Math.abs(i - t);
            return Math.max(0, 1 - d);
          };

          const getFocusIndex = () => {
            const x = mouseXRef.current / window.innerWidth;
            const max = imgLength - 1;
            return Math.max(0, Math.min(max, x * max));
          };

          const layoutAt = (t, immediate = false) => {
            const w = new Array(imgLength);
            let sum = 0;
            for (let i = 0; i < imgLength; i += 1) {
              w[i] = weight(i, t);
              sum += w[i];
            }
            const inv = sum > 0 ? 1 / sum : 0;

            let extra = 0;
            for (let i = 0; i < imgLength; i += 1) {
              const h = layoutState.baseHeights[i];
              const u = 1 + layoutState.imgScale * (w[i] * inv);
              const yPos = lerp(
                ((1 - u) * h) / 2,
                ((u - 1) * h) / 2,
                progressRef.current,
              );
              const xPos = layoutState.x0[i] + layoutState.imgWidth * extra;

              if (immediate) {
                gsap.set(imgCols[i], {
                  x: xPos,
                  y: yPos,
                  scaleX: u,
                  scaleY: u,
                });
              } else {
                imgAnim[i].x(xPos);
                imgAnim[i].y(yPos);
                imgAnim[i].sx(u);
                imgAnim[i].sy(u);
              }

              extra += u - 1;
            }
          };

          computeImageLayout(true);
          layoutAt(tSmoothed, true);

          const getOffsets = () => {
            const topOffset = window.innerWidth - titleTop.offsetWidth;
            const bottomOffset = window.innerWidth - titleBottom.offsetWidth;
            return { topOffset, bottomOffset };
          };

          let { topOffset: titleTopOffset, bottomOffset: titleBottomOffset } =
            getOffsets();

          const onResize = () => {
            titleTopOffset = window.innerWidth - titleTop.offsetWidth;
            titleBottomOffset = window.innerWidth - titleBottom.offsetWidth;
            computeImageLayout(false);
            layoutAt(tSmoothed, true);
            ScrollTrigger.refresh();
          };

          window.addEventListener("resize", onResize, { passive: true });
          cleanups.push(() => window.removeEventListener("resize", onResize));

          const loop = () => {
            if (!active) return;

            const xPercent = (mouseXRef.current / window.innerWidth) * 100;
            const { topX, bottomX, frame } = titleAnimRef.current;

            const nextTopX = lerp(
              topX,
              (titleTopOffset / 100) * xPercent,
              0.025,
            );
            const nextBottomX = lerp(
              bottomX,
              (titleBottomOffset / 100) * xPercent,
              0.025,
            );

            topSet(nextTopX);
            bottomSet(nextBottomX);

            const anim = lottieDesktopRef.current;
            const totalFrames = framesDesktopRef.current;
            if (anim && totalFrames) {
              const target = (totalFrames * 0.5 * xPercent) / 100;
              const nextFrame = lerp(frame, target, 0.025);
              anim.goToAndStop(nextFrame, true);
              titleAnimRef.current.frame = nextFrame;
            }

            titleAnimRef.current.topX = nextTopX;
            titleAnimRef.current.bottomX = nextBottomX;

            const focus = getFocusIndex();
            tSmoothed += (focus - tSmoothed) * 0.15;
            layoutAt(tSmoothed, false);
          };

          gsap.ticker.add(loop);
          cleanups.push(() => gsap.ticker.remove(loop));

          cleanups.push(() => introTl.kill());
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
        "min-h-[calc(var(--vh,1vh)*100)]",
        "max-[1099px]:flex max-[1099px]:min-h-320 max-[1099px]:flex-col max-[1099px]:justify-end max-[1099px]:px-8 max-[1099px]:pb-8",
      )}
    >
      <div
        ref={iconMobileRef}
        aria-hidden="true"
        className="mx-auto mb-16 h-[7.2rem] w-[7.2rem] max-[1099px]:block min-[1100px]:hidden [&_path]:fill-dark"
      />

      <div className="w-full min-[1100px]:absolute min-[1100px]:left-0 min-[1100px]:top-[32vh]">
        <h1
          className={cn(
            "font-heading text-[8.4rem] leading-[120%]",
            "min-[1100px]:flex min-[1100px]:flex-col min-[1100px]:items-start",
            "max-[1099px]:mb-4 max-[1099px]:block max-[1099px]:text-center max-[1099px]:text-[5.4rem]",
          )}
        >
          <span
            ref={titleTopRef}
            className={cn(
              "inline-flex items-center",
              "min-[1100px]:px-8",
              "max-[1099px]:inline",
            )}
          >
            <span ref={titleTopLeftRef} className="inline-block">
              A people-first{" "}
            </span>
            <span
              ref={iconDesktopRef}
              aria-hidden="true"
              className="mx-4 hidden h-[7.2rem] w-[7.2rem] max-[1099px]:hidden min-[1100px]:block [&_path]:fill-dark"
            />
            <span ref={titleTopRightRef} className="inline-block">
              {" "}
              digital studio
            </span>
          </span>

          <span ref={titleBottomRef} className={cn("block min-[1100px]:px-8")}>
            <span ref={titleBottomInnerRef} className="inline-block">
              who build with heart.
            </span>
          </span>
        </h1>
      </div>

      <div
        ref={imagesWrapperRef}
        className={cn(
          "w-full p-8",
          "min-[1100px]:absolute min-[1100px]:bottom-0 min-[1100px]:left-0",
          "max-[1099px]:relative max-[1099px]:aspect-[3.62/2.4] max-[1099px]:p-0",
        )}
      >
        <div ref={imagesInnerRef} className="relative">
          {HERO_IMAGES.map((img, index) => (
            <div
              key={img.src}
              ref={(el) => {
                imageColsRef.current[index] = el;
              }}
              className={cn(
                "min-[1100px]:absolute min-[1100px]:bottom-0 min-[1100px]:left-0 min-[1100px]:transform-gpu",
                "max-[1099px]:absolute max-[1099px]:inset-0",
              )}
            >
              <figure className="relative w-full overflow-hidden rounded-[0.4rem] aspect-[1.6/1]">
                <div className="media-inner absolute inset-0 h-full w-full max-[1099px]:bg-dark max-[1099px]:backface-hidden">
                  <img
                    className="media absolute inset-0 h-full w-full object-cover will-change-transform"
                    src={img.src}
                    width={img.width}
                    height={img.height}
                    sizes={sizesAttr}
                    alt=""
                    loading={index === 0 ? "eager" : "lazy"}
                    fetchPriority={index === 0 ? "high" : undefined}
                  />
                </div>
              </figure>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default memo(Hero);
