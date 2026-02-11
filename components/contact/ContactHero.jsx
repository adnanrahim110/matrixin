"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import lottie from "lottie-web";
import { useEffect, useLayoutEffect, useMemo, useRef } from "react";

import { ensureGsap } from "@/utils/gsap";

const HERO_MEDIA = [
  {
    desktop: [
      "https://images.prismic.io/estrelastudio/aN6L2J5xUNkB1anZ_Grid_02.jpg?w=750&h=450&auto=compress,format",
      "https://images.prismic.io/estrelastudio/aN5_a55xUNkB1acx_01.ProductStrat.jpg?w=750&h=450&auto=compress,format",
    ],
    mobile:
      "https://images.prismic.io/estrelastudio/aN6L2J5xUNkB1anZ_Grid_02.jpg?w=750&h=450&auto=compress,format",
  },
  {
    desktop: [
      "https://images.prismic.io/estrelastudio/aN6L2p5xUNkB1anb_Grid_04.jpg?w=750&h=450&auto=compress,format",
      "https://images.prismic.io/estrelastudio/aN1HGZ5xUNkB1YCM_hg-app-thumbnail.jpg?w=750&h=450&auto=compress,format",
    ],
    mobile:
      "https://images.prismic.io/estrelastudio/aN6L2p5xUNkB1anb_Grid_04.jpg?w=750&h=450&auto=compress,format",
  },
  {
    desktop: [
      "https://images.prismic.io/estrelastudio/aN6PdZ5xUNkB1aq4_WhoweAre_02.jpg?w=750&h=450&auto=compress,format",
      "https://images.prismic.io/estrelastudio/aN5_bZ5xUNkB1acy_02.App%26Web.jpg?w=750&h=450&auto=compress,format",
    ],
    mobile:
      "https://images.prismic.io/estrelastudio/aN6PdZ5xUNkB1aq4_WhoweAre_02.jpg?w=750&h=450&auto=compress,format",
  },
  {
    desktop: [
      "https://images.prismic.io/estrelastudio/aN6PdJ5xUNkB1aq3_WhoweAre_01.jpg?w=750&h=450&auto=compress,format",
      "https://images.prismic.io/estrelastudio/aN6cl55xUNkB1a1G_hg-billboard-1-.jpg?w=750&h=450&auto=compress,format",
    ],
    mobile:
      "https://images.prismic.io/estrelastudio/aN6PdJ5xUNkB1aq3_WhoweAre_01.jpg?w=750&h=450&auto=compress,format",
  },
  {
    desktop: [
      "https://images.prismic.io/estrelastudio/aN6MuJ5xUNkB1aoq_Transition_02.jpg?w=750&h=450&auto=compress,format",
      "https://images.prismic.io/estrelastudio/aNwJUJ5xUNkB1Ssk_yucca-thumbnail2.jpg?w=750&h=450&auto=compress,format",
    ],
    mobile:
      "https://images.prismic.io/estrelastudio/aN6MuJ5xUNkB1aoq_Transition_02.jpg?w=750&h=450&auto=compress,format",
  },
];

const ANGLES = [0.16, 0.34, 0.6, 0.75, 0.87];
const SCROLL_FACTORS = [2, 1, 2, 3, 2];
const SCALES = [
  [0.6, 0.55, 0.7, 0.8, 0.5],
  [0.5, 0.75, 0.6, 0.7, 0.8],
  [0.65, 0.6, 1, 0.6, 0.6],
];

const TWO_PI = Math.PI * 2;
const lerp = (a, b, t) => a + (b - a) * t;

const lerpAngle = (from, to, t) => {
  let delta = (to - from) % TWO_PI;
  if (delta > Math.PI) delta -= TWO_PI;
  if (delta < -Math.PI) delta += TWO_PI;
  return from + delta * t;
};

export default function ContactHero() {
  const sectionRef = useRef(null);
  const wrapperRef = useRef(null);
  const titleTopRef = useRef(null);
  const titleBottomRef = useRef(null);
  const scrollRef = useRef(null);

  const iconMobileHostRef = useRef(null);
  const iconDesktopHostRef = useRef(null);

  const lottieMobileRef = useRef(null);
  const lottieDesktopRef = useRef(null);
  const framesMobileRef = useRef(0);
  const framesDesktopRef = useRef(0);

  const anglesRad = useMemo(() => ANGLES.map((a) => a * TWO_PI), []);

  useEffect(() => {
    const host = iconMobileHostRef.current;
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
    const host = iconDesktopHostRef.current;
    if (!host) return;

    const anim = lottie.loadAnimation({
      container: host,
      renderer: "svg",
      loop: false,
      autoplay: false,
      path: "/mkrt.json",
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
    const wrapper = wrapperRef.current;
    const titleTop = titleTopRef.current;
    const titleBottom = titleBottomRef.current;
    const scroll = scrollRef.current;

    if (!section || !wrapper || !titleTop || !titleBottom) return;

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

          const iconHost = isMobile
            ? iconMobileHostRef.current
            : iconDesktopHostRef.current;

          const introTl = gsap.timeline({ delay: 0.05 });

          if (iconHost) {
            introTl.moveBlur(iconHost, { yPercent: 40, duration: 1.1 }, 0);
          }

          if (isMobile) {
            introTl.moveBlur([titleTop, titleBottom], { stagger: 0.06 }, 0);
            introTl.fromTo(
              wrapper,
              { clipPath: "inset(0 0 100% 0)" },
              { clipPath: "inset(0 0 0% 0)", duration: 1, ease: "power3.out" },
              0,
            );
            if (scroll) introTl.moveBlur(scroll, {}, 0.1);
          } else {
            introTl.moveBlur(
              [titleTop, titleBottom],
              { stagger: 0.06, yPercent: 60 },
              0,
            );

            const desktopInners = section.querySelectorAll(
              ".hero-media-inner.desktop-only",
            );
            introTl.fromTo(
              desktopInners,
              { clipPath: "inset(0 0 100% 0)" },
              {
                clipPath: "inset(0 0 0% 0)",
                duration: 1.4,
                ease: "power3.out",
                stagger: 0.07,
              },
              0.2,
            );
            if (scroll) introTl.moveBlur(scroll, {}, 0.3);
          }

          if (isMobile) {
            const medias = Array.from(section.querySelectorAll(".hero-media"));
            const iconAnim = lottieMobileRef.current;
            const totalFrames = framesMobileRef.current;
            const segment = totalFrames ? Math.floor(totalFrames / 6) : 0;
            const iconObj = { frame: iconAnim?.currentFrame ?? 0 };

            const stTl = gsap.timeline({
              scrollTrigger: {
                trigger: section,
                start: "top top",
                end: "bottom top",
                scrub: true,
              },
            });

            if (iconAnim && segment) {
              stTl.to(
                iconObj,
                {
                  frame: segment * 3,
                  duration: 1,
                  ease: "none",
                  onUpdate: () => iconAnim.goToAndStop(iconObj.frame, true),
                },
                0,
              );
            }

            const step = medias.length > 2 ? 1 / (medias.length - 2) : 0.5;

            medias.forEach((mediaEl, index) => {
              const mediaWrapper = mediaEl.querySelector(
                ".hero-media-inner.mobile-only .media-wrapper",
              );
              const media = mediaEl.querySelector(
                ".hero-media-inner.mobile-only .media",
              );

              if (!mediaWrapper || !media) return;

              gsap.set(media, { autoAlpha: 1 });
              if (index > 0) {
                gsap.set(mediaWrapper, { clipPath: "inset(0 0 100% 0)" });
                gsap.set(media, { scale: 1.4 });
              }
            });

            medias.forEach((mediaEl, index) => {
              const mediaWrapper = mediaEl.querySelector(
                ".hero-media-inner.mobile-only .media-wrapper",
              );
              const media = mediaEl.querySelector(
                ".hero-media-inner.mobile-only .media",
              );

              if (!mediaWrapper || !media) return;

              if (index > 0) {
                stTl.fromTo(
                  mediaWrapper,
                  { clipPath: "inset(0 0 100% 0)" },
                  { clipPath: "inset(0 0 0% 0)", ease: "none", duration: step },
                  (index - 1) * step,
                );
                stTl.fromTo(
                  media,
                  { scale: 1.4 },
                  { scale: 1, ease: "none", duration: step },
                  (index - 1) * step,
                );
              }

              stTl.fromTo(
                media,
                { autoAlpha: 1 },
                { autoAlpha: 0.6, ease: "none", duration: step },
                index * step,
              );
            });

            cleanups.push(() => {
              stTl.scrollTrigger?.kill?.();
              stTl.kill();
            });
          } else {
            const items = [];
            const progress = { time: 0 };
            const shiftStep = 2;

            let active = false;
            let changeInterval = null;
            let angleOffset = 0;
            let scaleIndex = 0;
            let radiusX = 0;
            let radiusY = 0;
            let iconIndex = 0;

            const heroMedia = Array.from(
              section.querySelectorAll(".hero-media"),
            );

            const stTl = gsap.timeline({
              scrollTrigger: {
                trigger: section,
                start: "top top",
                end: "bottom top",
                scrub: 1,
              },
            });

            heroMedia.forEach((el, index) => {
              const inner = el.querySelector(".hero-media-inner.desktop-only");
              const media = Array.from(
                el.querySelectorAll(
                  ".hero-media-inner.desktop-only .media-wrapper",
                ),
              );

              media.forEach((mw, i) => {
                gsap.set(mw, {
                  autoAlpha: i === 0 ? 1 : 0,
                  zIndex: i === 0 ? 2 : 1,
                });
              });

              if (inner) {
                const factor = SCROLL_FACTORS[index] ?? 2;
                stTl.to(inner, { y: -(factor * 80) }, 0);
              }

              items.push({
                el,
                media,
                index: 0,
                bounds: null,
              });
            });

            const getBounds = () => {
              const bounds = wrapper.getBoundingClientRect();
              radiusX = bounds.width * 0.5;
              radiusY = bounds.height * 0.5;
              items.forEach((item) => {
                item.bounds = item.el.getBoundingClientRect();
              });
            };

            const setPositions = (immediate = false) => {
              const len = anglesRad.length;
              const t = progress.time;
              const currentScaleIndex = scaleIndex;
              const nextScaleIndex = (scaleIndex + 1) % SCALES.length;

              items.forEach((item, i) => {
                if (!item.bounds) return;

                const a0 = anglesRad[(i + angleOffset) % len];
                const a1 = anglesRad[(i + angleOffset - shiftStep + len) % len];
                const angle = immediate ? a0 : lerpAngle(a0, a1, t);

                const s0 = SCALES[currentScaleIndex][(i + angleOffset) % len];
                const s1 =
                  SCALES[nextScaleIndex][
                    (i + angleOffset - shiftStep + len) % len
                  ];
                const scale = immediate ? s0 : lerp(s0, s1, t);

                const x =
                  radiusX + Math.cos(angle) * radiusX - item.bounds.width * 0.5;
                const y =
                  radiusY -
                  Math.sin(angle) * radiusY -
                  item.bounds.height * 0.5;

                gsap.set(item.el, { x, y, scale });
              });
            };

            const crossfade = (item) => {
              if (!item.media?.length || item.media.length <= 1) return;

              const current = item.media[item.index];
              item.index = (item.index + 1) % item.media.length;
              const next = item.media[item.index];

              gsap.set(next, { zIndex: 3, autoAlpha: 0 });
              gsap.set(current, { zIndex: 2 });
              gsap.to(next, {
                autoAlpha: 1,
                duration: 0.8,
                ease: "power2.out",
                onComplete: () => {
                  gsap.set(current, { autoAlpha: 0, zIndex: 1 });
                  gsap.set(next, { zIndex: 2 });
                },
              });
            };

            const change = () => {
              if (active) return;
              active = true;

              const iconAnim = lottieDesktopRef.current;
              const totalFrames = framesDesktopRef.current;
              const segment = totalFrames ? Math.floor(totalFrames / 6) : 0;

              const duration = 2;

              const tl = gsap.timeline({
                defaults: { overwrite: "auto" },
                onComplete: () => {
                  const len = anglesRad.length;
                  angleOffset = (angleOffset - shiftStep + len) % len;
                  scaleIndex = (scaleIndex + 1) % SCALES.length;
                  active = false;
                },
              });

              tl.fromTo(
                progress,
                { time: 0 },
                {
                  time: 1,
                  duration,
                  ease: "inOut",
                  onUpdate: () => setPositions(false),
                },
                0,
              );

              if (iconAnim && segment) {
                let fromFrame = iconAnim.currentFrame ?? 0;
                let toFrame = segment;

                if (iconIndex === 6) {
                  iconAnim.goToAndStop(1, true);
                  iconIndex = 1;
                  fromFrame = 0;
                  toFrame = iconIndex * segment;
                } else if (iconIndex === 5) {
                  iconIndex += 1;
                  toFrame = iconIndex * segment - 1;
                } else {
                  iconIndex += 1;
                  toFrame = iconIndex * segment;
                }

                const iconObj = { frame: fromFrame };

                tl.to(
                  iconObj,
                  {
                    frame: toFrame,
                    duration,
                    ease: "inOut",
                    onUpdate: () => iconAnim.goToAndStop(iconObj.frame, true),
                  },
                  0,
                );
              }

              tl.add(() => items.forEach((it) => crossfade(it)), 0.8);
            };

            getBounds();
            setPositions(true);

            const onResize = () => {
              getBounds();
              setPositions(true);
              ScrollTrigger.refresh();
            };

            window.addEventListener("resize", onResize, { passive: true });
            cleanups.push(() => window.removeEventListener("resize", onResize));

            const iconEl = iconDesktopHostRef.current;
            if (iconEl) {
              const onEnter = () => {
                if (changeInterval) clearInterval(changeInterval);
                changeInterval = window.setInterval(change, 2000);
              };
              const onLeave = () => {
                if (changeInterval) clearInterval(changeInterval);
                changeInterval = null;
              };

              iconEl.addEventListener("mouseenter", onEnter);
              iconEl.addEventListener("mouseleave", onLeave);

              cleanups.push(() => {
                iconEl.removeEventListener("mouseenter", onEnter);
                iconEl.removeEventListener("mouseleave", onLeave);
                if (changeInterval) clearInterval(changeInterval);
              });
            }

            cleanups.push(() => {
              stTl.scrollTrigger?.kill?.();
              stTl.kill();
            });
          }

          return () => {
            introTl.kill();
            cleanups.forEach((fn) => fn());
          };
        },
      );

      return () => mm.revert();
    }, sectionRef);

    return () => ctx.revert();
  }, [anglesRad]);

  return (
    <section
      ref={sectionRef}
      data-theme="dark"
      className={[
        "relative w-full bg-dark text-light",
        "h-[calc(var(--vh,1vh)*100)]",
        "max-[1099px]:flex max-[1099px]:min-h-[80rem] max-[1099px]:flex-col max-[1099px]:justify-end",
      ].join(" ")}
    >
      <div
        ref={iconMobileHostRef}
        className={[
          "hero-icon icon mobile-only mx-auto mb-[4rem] h-[7.2rem] w-[7.2rem] text-light [&_path]:fill-light",
          "min-[1100px]:hidden",
        ].join(" ")}
        aria-hidden="true"
      />

      <div className="hero-title-wrapper w-full min-[1100px]:absolute min-[1100px]:left-0 min-[1100px]:top-[32vh]">
        <h1 className="hero-title flex flex-col items-center font-heading text-[8.4rem] leading-[120%] max-[1099px]:mb-[4rem] max-[1099px]:block max-[1099px]:text-[5.4rem] max-[1099px]:text-center">
          <span
            ref={titleTopRef}
            className="hero-title-top flex items-center max-[1099px]:inline min-[1100px]:px-[2rem]"
          >
            <span className="hero-title-top-left">Let&apos;s chat</span>

            <span
              ref={iconDesktopHostRef}
              className={[
                "hero-icon icon desktop-only hidden h-[7.2rem] w-[7.2rem] text-light [&_path]:fill-light",
                "mx-[1.5rem] min-[1100px]:block",
                "min-[1100px]:cursor-pointer min-[1100px]:transition-transform min-[1100px]:duration-800 min-[1100px]:ease-ease min-[1100px]:hover:scale-[1.15]",
              ].join(" ")}
              aria-hidden="true"
            />

            <span className="hero-title-top-right">and build</span>
          </span>

          <span
            ref={titleBottomRef}
            className="hero-title-bottom min-[1100px]:px-[2rem]"
          >
            something beautiful.
          </span>
        </h1>
      </div>

      <div
        ref={wrapperRef}
        className={[
          "hero-media-wrapper pointer-events-none",
          "absolute left-1/2 top-[52%] h-[75vh] w-[80vw] -translate-x-1/2 -translate-y-1/2",
          "max-[1099px]:relative max-[1099px]:left-auto max-[1099px]:top-auto max-[1099px]:mx-auto",
          "max-[1099px]:w-[30rem] max-[1099px]:h-auto max-[1099px]:aspect-[3/1.8]",
          "max-[1099px]:transform-none",
        ].join(" ")}
      >
        {HERO_MEDIA.map((item) => (
          <div
            key={item.mobile}
            className={[
              "hero-media absolute left-0 top-0 h-[23.2rem] w-[37.3rem] will-change-transform",
              "max-[1099px]:h-full max-[1099px]:w-full",
            ].join(" ")}
          >
            <div className="hero-media-inner desktop-only relative hidden h-full w-full overflow-hidden rounded-[0.4rem] min-[1100px]:block">
              {item.desktop.map((src) => (
                <figure
                  key={src}
                  className="media-wrapper absolute inset-0 overflow-hidden rounded-[0.4rem] opacity-0"
                >
                  <div className="media-inner h-full w-full">
                    <img
                      className="media h-full w-full object-cover"
                      src={src}
                      alt=""
                      loading="lazy"
                    />
                  </div>
                </figure>
              ))}
            </div>

            <div className="hero-media-inner mobile-only relative h-full w-full overflow-hidden rounded-[0.4rem] min-[1100px]:hidden">
              <figure className="media-wrapper absolute inset-0 overflow-hidden rounded-[0.4rem]">
                <div className="media-inner h-full w-full bg-dark [backface-visibility:hidden] [-webkit-backface-visibility:hidden]">
                  <img
                    className="media h-full w-full object-cover"
                    src={item.mobile}
                    alt=""
                    loading="lazy"
                  />
                </div>
              </figure>
            </div>
          </div>
        ))}
      </div>

      <span
        ref={scrollRef}
        className={[
          "hero-scroll opacity-50",
          "min-[1100px]:absolute min-[1100px]:bottom-[2.6rem] min-[1100px]:left-1/2 min-[1100px]:-translate-x-1/2",
          "max-[1099px]:py-[2rem] max-[1099px]:text-center",
        ].join(" ")}
      >
        Scroll to get in touch
      </span>
    </section>
  );
}
