"use client";

import gsap from "gsap";
import lottie from "lottie-web";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

import { ensureGsap } from "@/utils/gsap";

const ESTRELA_HERO_VIDEO =
  "https://estrelastudio.cdn.prismic.io/estrelastudio/aK8JRWGNHVfTOXgT_estrela-hero.mp4";

const Hero = () => {
  const sectionRef = useRef(null);
  const bgRef = useRef(null);
  const videoRef = useRef(null);
  const titleLeftRef = useRef(null);
  const titleRightRef = useRef(null);
  const lineLeftRef = useRef(null);
  const lineRightRef = useRef(null);
  const scrollRef = useRef(null);
  const iconRef = useRef(null);

  const lottieRef = useRef(null);
  const totalFramesRef = useRef(0);

  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const src = video.dataset.src;
    if (src && !video.src) {
      video.src = src;
      video.load();
    }

    const onLoaded = () => setVideoLoaded(true);
    video.addEventListener("loadeddata", onLoaded, { once: true });

    return () => {
      video.removeEventListener("loadeddata", onLoaded);
    };
  }, []);

  useLayoutEffect(() => {
    ensureGsap();

    const iconHost = iconRef.current;
    if (iconHost) {
      const anim = lottie.loadAnimation({
        container: iconHost,
        renderer: "svg",
        loop: false,
        autoplay: false,
        path: "/icon.json",
      });
      lottieRef.current = anim;

      const onDataReady = () => {
        totalFramesRef.current = anim.totalFrames || 0;
      };

      anim.addEventListener("data_ready", onDataReady);

      return () => {
        anim.removeEventListener("data_ready", onDataReady);
        anim.destroy();
        lottieRef.current = null;
        totalFramesRef.current = 0;
      };
    }
  }, []);

  useLayoutEffect(() => {
    ensureGsap();

    const el = sectionRef.current;
    const bg = bgRef.current;
    const video = videoRef.current;
    const titleLeft = titleLeftRef.current;
    const titleRight = titleRightRef.current;
    const lineLeft = lineLeftRef.current;
    const lineRight = lineRightRef.current;
    const scroll = scrollRef.current;
    const icon = iconRef.current;

    if (
      !el ||
      !bg ||
      !titleLeft ||
      !titleRight ||
      !lineLeft ||
      !lineRight ||
      !icon
    )
      return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add(
        {
          isDesktop: "(min-width: 1100px)",
          isMobile: "(max-width: 1099px)",
        },
        ({ conditions }) => {
          const isMobile = Boolean(conditions?.isMobile);

          gsap.set(bg, { autoAlpha: 0, filter: "blur(2rem)" });
          gsap.set([lineLeft, lineRight], {
            yPercent: 100,
            autoAlpha: 0,
            filter: "blur(2rem)",
          });
          if (!isMobile && scroll) {
            gsap.set(scroll, {
              yPercent: 100,
              autoAlpha: 0,
              filter: "blur(2rem)",
            });
          }
          gsap.set(icon, { scale: 1.8 });

          const introTl = gsap.timeline();
          introTl.add(() => {
            video?.play?.().catch(() => {});
          }, 0.1);

          introTl.fromTo(
            icon,
            { scale: 1.8 },
            { scale: 1, duration: 2, ease: "expo.out" },
            0,
          );

          introTl.fromTo(
            bg,
            { filter: "blur(2rem)", autoAlpha: 0 },
            {
              filter: "blur(0rem)",
              autoAlpha: 1,
              duration: 2,
              ease: "power3.out",
            },
            0.2,
          );

          introTl.moveBlur([lineLeft, lineRight], { stagger: 0.08 }, 0.1);
          if (!isMobile && scroll)
            introTl.moveBlur(scroll, { duration: 1 }, 0.2);

          const stTl = gsap.timeline({
            scrollTrigger: {
              trigger: el,
              pin: true,
              start: "top top",
              end: () => `+=${window.innerHeight}`,
              pinSpacing: false,
              scrub: true,
              invalidateOnRefresh: true,
              pinType: isMobile ? "fixed" : "transform",
              onUpdate: (self) => {
                const anim = lottieRef.current;
                const totalFrames = totalFramesRef.current;
                if (!anim || !totalFrames) return;

                const frame = self.progress * 0.5 * (totalFrames - 1);
                anim.goToAndStop(frame, true);
              },
            },
          });

          if (!isMobile) {
            stTl.to(
              titleLeft,
              {
                x: () => window.innerWidth * 0.45 - titleLeft.offsetWidth,
                duration: 0.7,
              },
              0,
            );
            stTl.to(
              titleRight,
              {
                x: () => -(window.innerWidth * 0.45 - titleRight.offsetWidth),
                duration: 0.7,
              },
              0,
            );
            if (scroll) {
              stTl.fromTo(
                scroll,
                { autoAlpha: 1 },
                { autoAlpha: 0, duration: 1, overwrite: "auto" },
                0,
              );
            }
          }

          return () => {
            stTl.scrollTrigger?.kill?.();
            stTl.kill();
            introTl.kill();
          };
        },
      );

      return () => {
        mm.revert();
      };
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      data-theme="dark"
      className="pointer-events-none relative z-0 flex h-[calc(var(--vh,1vh)*100)] w-full max-w-[100vw] flex-col items-center justify-center"
    >
      <figure
        ref={bgRef}
        className="pointer-events-none absolute inset-0 z-0 h-full w-full overflow-hidden"
      >
        <div className="absolute inset-0 h-full w-full">
          <video
            ref={videoRef}
            className={[
              "h-full w-full object-cover transition-opacity duration-1000",
              videoLoaded ? "opacity-100" : "opacity-0",
            ].join(" ")}
            data-src={ESTRELA_HERO_VIDEO}
            muted
            playsInline
            loop
            preload="auto"
          />
        </div>
      </figure>

      <h1 className="relative z-2 flex w-full justify-between px-8 font-heading text-[5.4rem] leading-[100%] max-[1099px]:absolute max-[1099px]:bottom-8 max-[1099px]:left-0 max-[1099px]:flex-col max-[1099px]:text-center max-[1099px]:leading-[120%]">
        <span ref={titleLeftRef} className="hero-title-left">
          <span ref={lineLeftRef} className="block">
            A people first
          </span>
        </span>
        <span ref={titleRightRef} className="hero-title-right">
          <span ref={lineRightRef} className="block">
            digital studio
          </span>
        </span>
      </h1>

      <div
        ref={iconRef}
        className="pointer-events-none absolute left-1/2 top-1/2 z-2 h-[7.2rem] w-[7.2rem] -translate-x-1/2 -translate-y-1/2 text-light [&_path]:fill-light"
        aria-hidden="true"
      />

      <span
        ref={scrollRef}
        className="pointer-events-none absolute bottom-12 left-1/2 z-2 -translate-x-1/2 text-[1.4rem] min-[1100px]:block max-[1099px]:hidden"
      >
        Scroll to discover our world
      </span>
    </section>
  );
};

export default Hero;
