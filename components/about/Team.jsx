"use client";

import BorderGlowCanvas from "@/components/ui/BorderGlowCanvas";
import { cn } from "@/utils/cn";
import { ensureGsap } from "@/utils/gsap";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { memo, useLayoutEffect, useRef } from "react";

const TEAM_INTRO_IMAGE =
  "https://images.prismic.io/estrelastudio/aN6Mt55xUNkB1aoo_Transition_01.jpg?w=2700&h=1500&auto=compress,format";
const TEAM_TRANSITION_OVERLAY =
  "https://images.prismic.io/estrelastudio/aN6MuJ5xUNkB1aoq_Transition_02.jpg?w=2700&h=1500&auto=compress,format";

const TEAM_COLLAGE_01 =
  "https://images.prismic.io/estrelastudio/aN6Nrp5xUNkB1apU_Collage_01.jpg?w=975&h=1200&auto=compress,format";
const TEAM_COLLAGE_02 =
  "https://images.prismic.io/estrelastudio/aN6Nup5xUNkB1apV_Collage_02.jpg?w=1500&h=1800&auto=compress,format";
const TEAM_COLLAGE_03 =
  "https://images.prismic.io/estrelastudio/aN6Nu55xUNkB1apW_Collage_03.jpg?w=2700&h=1800&auto=compress,format";

const TEAM_MEMBERS = [
  {
    name: "Natalia Carvalho",
    role: "Digital Director",
    image:
      "https://images.prismic.io/estrelastudio/aRW5trpReVYa4bEn_Natalia.png?w=900&h=1050&auto=compress,format",
    social: {
      linkedin: "https://www.linkedin.com/in/natalia-carvalho-9b605b62/",
      instagram: "https://www.instagram.com/estrela_digitalstudio/?hl=en",
    },
  },
  {
    name: "Leigh-Ann Clarke",
    role: "Creative Director",
    image:
      "https://images.prismic.io/estrelastudio/aN6M1Z5xUNkB1aoy_Leigh.jpg?w=900&h=1050&auto=compress,format",
    social: {
      linkedin: "https://www.linkedin.com/in/leighanntheart/",
      instagram: "https://www.instagram.com/estrela_digitalstudio/?hl=en",
      dribbble: "https://dribbble.com/leighannclarke",
    },
  },
  {
    name: "Kristen Patterson",
    role: "Senior Product Designer",
    image:
      "https://images.prismic.io/estrelastudio/aN6M055xUNkB1aow_Kris.jpg?w=900&h=1050&auto=compress,format",
    social: {
      linkedin: "https://www.linkedin.com/in/kristen-ryan-aa5894114/",
      dribbble: "https://dribbble.com/KristenRyan",
    },
  },
  {
    name: "Sydney Warren",
    role: "Product Designer",
    image:
      "https://images.prismic.io/estrelastudio/aN6M2J5xUNkB1ao1_Sydney.jpg?w=900&h=1050&auto=compress,format",
    social: {
      linkedin: "https://www.linkedin.com/in/sydney-warren-b29423a7/",
    },
  },
  {
    name: "Lauren Forssman",
    role: "Product Designer",
    image:
      "https://images.prismic.io/estrelastudio/aN6M1J5xUNkB1aox_Lauren.jpg?w=900&h=1050&auto=compress,format",
    social: {
      linkedin: "https://www.linkedin.com/in/lauren-forssman-b70790215/",
    },
  },
  {
    name: "Abby Jankelow",
    role: "Product Designer",
    image:
      "https://images.prismic.io/estrelastudio/aN6M0p5xUNkB1aov_Abby.jpg?w=900&h=1050&auto=compress,format",
    social: {
      linkedin: "https://www.linkedin.com/in/abby-jankelow-9267a3293/",
    },
  },
  {
    name: "Phil Quma",
    role: "Operational Assistant",
    image:
      "https://images.prismic.io/estrelastudio/aRW5yrpReVYa4bEz_Phil.png?w=900&h=1050&auto=compress,format",
    social: {
      linkedin: "https://www.linkedin.com/in/madoda-quma-81ab3825/",
    },
  },
  {
    name: "Penelope Clarke",
    role: "Chief of Happiness",
    image:
      "https://images.prismic.io/estrelastudio/aN6M155xUNkB1ao0_Penelope.jpg?w=900&h=1050&auto=compress,format",
    social: {
      instagram: "https://www.instagram.com/black.staffy.duo/",
    },
  },
];

const remToPx = (rem) => {
  const rootFontSize = Number.parseFloat(
    window.getComputedStyle(document.documentElement).fontSize || "16",
  );
  return rem * rootFontSize;
};

const setActiveMember = (members, next) => {
  members.forEach((el, index) => {
    el.classList.toggle("active", index === next);
  });
};

const Team = () => {
  const sectionRef = useRef(null);
  const introBgRef = useRef(null);
  const titleWrapperRef = useRef(null);
  const titleRef = useRef(null);
  const innerRef = useRef(null);
  const introRef = useRef(null);
  const introImageRef = useRef(null);
  const membersWrapperRef = useRef(null);
  const membersInnerRef = useRef(null);
  const mobileImagesWrapperRef = useRef(null);

  useLayoutEffect(() => {
    ensureGsap();

    const section = sectionRef.current;
    const introBg = introBgRef.current;
    const titleWrapper = titleWrapperRef.current;
    const title = titleRef.current;
    const inner = innerRef.current;
    const intro = introRef.current;
    const introImage = introImageRef.current;
    const membersWrapper = membersWrapperRef.current;
    const membersInner = membersInnerRef.current;
    const mobileImagesWrapper = mobileImagesWrapperRef.current;

    if (
      !section ||
      !titleWrapper ||
      !title ||
      !inner ||
      !intro ||
      !introImage ||
      !membersWrapper ||
      !membersInner
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

          const members = Array.from(section.querySelectorAll(".team-member"));
          const memberNames = members.map((el) =>
            el.querySelector(".team-member-name"),
          );
          const memberImages = members.map((el) =>
            el.querySelector(".team-member-image"),
          );

          const firstMemberImage = memberImages[0];
          const transitionOverlayWrapper =
            firstMemberImage?.querySelectorAll("figure")?.[1] ?? null;

          const grid1 = section.querySelector(".team-image-grid-1 figure");
          const grid2Desktop = section.querySelector(
            ".team-image-grid-left .team-image-grid-2 figure",
          );
          const grid3 = section.querySelector(".team-image-grid-3 figure");

          let activeIndex = -1;

          const cleanupActive = () => {
            members.forEach((el) => el.classList.remove("active"));
          };

          cleanups.push(cleanupActive);

          if (isMobile) {
            if (!mobileImagesWrapper)
              return () => cleanups.forEach((fn) => fn());

            const mobileFigures = Array.from(
              mobileImagesWrapper.querySelectorAll("figure"),
            );
            const mobileMediaInners = mobileFigures.map((figure) =>
              figure.querySelector(".media-inner"),
            );

            gsap.set(members, { opacity: 0.2 });
            gsap.set(members[0], { opacity: 1 });

            gsap.set(mobileFigures, {
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              clipPath: "inset(0 0 100% 0)",
            });
            gsap.set(mobileFigures[0], { clipPath: "inset(0 0 0% 0)" });
            gsap.set(mobileMediaInners, { autoAlpha: 0.4 });
            gsap.set(mobileMediaInners[0], { autoAlpha: 1 });

            const st = ScrollTrigger.create({
              trigger: membersWrapper,
              start: "top top",
              end: () =>
                `+=${window.innerHeight * (TEAM_MEMBERS.length * 0.85)}`,
              pin: mobileImagesWrapper,
              scrub: 1,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              onUpdate: (self) => {
                const idx = Math.round(self.progress * (members.length - 1));
                if (idx === activeIndex) return;
                activeIndex = idx;

                members.forEach((el, i) => {
                  gsap.to(el, {
                    opacity: i === idx ? 1 : 0.2,
                    duration: 0.4,
                    ease: "power2.out",
                    overwrite: "auto",
                  });
                });

                mobileFigures.forEach((figure, i) => {
                  gsap.to(figure, {
                    clipPath:
                      i <= idx ? "inset(0 0 0% 0)" : "inset(0 0 100% 0)",
                    duration: 0.6,
                    ease: "power3.inOut",
                    overwrite: "auto",
                  });
                });

                mobileMediaInners.forEach((innerEl, i) => {
                  if (!innerEl) return;
                  gsap.to(innerEl, {
                    autoAlpha: i === idx ? 1 : 0.4,
                    duration: 0.4,
                    ease: "power2.out",
                    overwrite: "auto",
                  });
                });
              },
            });

            cleanups.push(() => st.kill());

            return () => cleanups.forEach((fn) => fn());
          }

          const getDesktopExtra = () =>
            remToPx(11) * TEAM_MEMBERS.length + remToPx(22) + remToPx(39.6);

          const setDesktopHeight = () => {
            const vh = window.innerHeight;
            const height = vh * 5 + getDesktopExtra() + vh * 0.2;
            section.style.height = `${Math.max(vh, height)}px`;
          };

          setDesktopHeight();

          const onResize = () => {
            window.requestAnimationFrame(() => {
              setDesktopHeight();
              ScrollTrigger.refresh();
            });
          };

          window.addEventListener("resize", onResize, { passive: true });
          cleanups.push(() => window.removeEventListener("resize", onResize));
          cleanups.push(() => {
            section.style.height = "";
          });

          if (introBg) {
            const bgPin = ScrollTrigger.create({
              trigger: section,
              start: "top top",
              end: () => `+=${window.innerHeight * 3}`,
              pin: introBg,
              pinSpacing: false,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            });
            cleanups.push(() => bgPin.kill());
          }

          const titleTl = gsap.timeline({
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: () => `+=${window.innerHeight * 3.6}`,
              scrub: 1,
              pin: titleWrapper,
              pinSpacing: false,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });

          titleTl.fromTo(
            title,
            { "--blur": "0rem", autoAlpha: 1 },
            { "--blur": "2rem", autoAlpha: 0, ease: "none", duration: 1 },
          );

          cleanups.push(() => {
            titleTl.scrollTrigger?.kill?.();
            titleTl.kill();
          });

          gsap.set([intro, membersWrapper], { y: window.innerHeight });
          gsap.set(membersWrapper, { clipPath: "inset(105vh 0 0 0)" });

          if (grid1) gsap.set(grid1, { clipPath: "inset(0 0 100% 0)" });
          if (grid2Desktop) {
            gsap.set(grid2Desktop, { clipPath: "inset(0 100% 0 0)" });
          }
          if (grid3)
            gsap.set(grid3, { clipPath: "inset(0 0 100% 0)", yPercent: 20 });

          gsap.set(memberNames, { opacity: 0.2 });

          const shrinkW = remToPx(20);
          const shrinkH = remToPx(22);

          const mainTl = gsap.timeline({
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: () => {
                const vh = window.innerHeight;
                return `+=${vh * 5 + getDesktopExtra() + vh * 0.2}`;
              },
              scrub: 1,
              pin: inner,
              pinSpacing: false,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });

          mainTl.to([intro, membersWrapper], {
            y: 0,
            duration: 0.6,
            ease: "power3.out",
          });

          mainTl.to(
            membersWrapper,
            {
              clipPath: "inset(0vh 0 0 0)",
              duration: 1.2,
              ease: "power3.inOut",
            },
            "<+0.1",
          );

          if (transitionOverlayWrapper) {
            gsap.set(transitionOverlayWrapper, { clipPath: "inset(0)" });
            mainTl.to(
              transitionOverlayWrapper,
              {
                clipPath: "inset(0 0 100% 0)",
                duration: 1.2,
                ease: "power3.inOut",
              },
              "<+0.1",
            );
          }

          mainTl.to(
            introImage,
            {
              width: shrinkW,
              height: shrinkH,
              duration: 1.2,
              ease: "power3.inOut",
            },
            "<+0.2",
          );

          if (firstMemberImage) {
            mainTl.to(
              firstMemberImage,
              {
                width: shrinkW,
                height: shrinkH,
                duration: 1.2,
                ease: "power3.inOut",
              },
              "<",
            );
          }

          mainTl.to(
            intro,
            { autoAlpha: 0, duration: 0.4, ease: "power2.out" },
            "<+0.2",
          );

          const scrollDist = getDesktopExtra();

          mainTl.addLabel("membersScroll");
          mainTl.to(
            membersInner,
            {
              y: -scrollDist,
              duration: TEAM_MEMBERS.length,
              ease: "none",
            },
            "membersScroll",
          );

          const membersTl = gsap.timeline();
          membersTl.set(memberImages.slice(1), { height: 0 }, 0);
          membersTl.set(memberNames, { opacity: 0.2 }, 0);
          if (memberImages[0])
            membersTl.set(memberImages[0], { height: shrinkH }, 0);

          TEAM_MEMBERS.forEach((_, index) => {
            const name = memberNames[index];
            const img = memberImages[index];
            if (!name || !img) return;

            const start = index;
            membersTl.to(
              name,
              { opacity: 1, duration: 0.2, ease: "none" },
              start,
            );
            membersTl.to(
              name,
              { opacity: 0.2, duration: 0.2, ease: "none" },
              start + 0.8,
            );
            membersTl.to(
              img,
              { height: shrinkH, duration: 0.2, ease: "none" },
              start,
            );
            membersTl.to(
              img,
              { height: 0, duration: 0.2, ease: "none" },
              start + 0.8,
            );
          });

          mainTl.add(membersTl, "membersScroll");

          mainTl.addLabel(
            "gridReveal",
            `membersScroll+=${TEAM_MEMBERS.length * 0.95}`,
          );

          if (grid1) {
            mainTl.to(
              grid1,
              {
                clipPath: "inset(0 0 0% 0)",
                duration: 1.2,
                ease: "power3.inOut",
              },
              "gridReveal",
            );
          }
          if (grid2Desktop) {
            mainTl.to(
              grid2Desktop,
              {
                clipPath: "inset(0 0% 0 0)",
                duration: 1.2,
                ease: "power3.inOut",
              },
              "gridReveal+=0.15",
            );
          }
          if (grid3) {
            mainTl.to(
              grid3,
              {
                clipPath: "inset(0 0 0% 0)",
                yPercent: 0,
                duration: 1.2,
                ease: "power3.inOut",
              },
              "gridReveal+=0.3",
            );
          }

          const scrollStart = mainTl.labels.membersScroll ?? 0;
          const scrollEnd = scrollStart + TEAM_MEMBERS.length;

          const updateActiveFromScroll = () => {
            const t = mainTl.time();
            if (t < scrollStart || t > scrollEnd) {
              if (activeIndex !== -1) {
                activeIndex = -1;
                cleanupActive();
              }
              return;
            }

            const p = (t - scrollStart) / (scrollEnd - scrollStart);
            const idx = Math.round(p * (members.length - 1));
            if (idx === activeIndex) return;
            activeIndex = idx;
            setActiveMember(members, idx);
          };

          const st = mainTl.scrollTrigger;
          if (st) {
            const prevOnUpdate = st.vars?.onUpdate;
            st.vars.onUpdate = (self) => {
              if (typeof prevOnUpdate === "function") prevOnUpdate(self);
              updateActiveFromScroll();
            };
            updateActiveFromScroll();
          }

          cleanups.push(() => {
            mainTl.scrollTrigger?.kill?.();
            mainTl.kill();
          });

          return () => cleanups.forEach((fn) => fn());
        },
      );

      return () => mm.revert();
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="team relative z-0 bg-dark">
      <div
        ref={introBgRef}
        aria-hidden="true"
        className={cn(
          "team-intro-bg desktop-only absolute inset-0 z-0",
          "h-[calc(var(--vh,1vh)*100)]",
          "bg-[linear-gradient(#fbfbf4,#ff852d)]",
          "max-[1099px]:hidden",
        )}
      />

      <div
        ref={titleWrapperRef}
        className={cn(
          "team-title-wrapper absolute left-0 z-2 w-full",
          "top-96",
          "min-[1100px]:top-[-30vh]",
        )}
      >
        <h2
          ref={titleRef}
          className={cn(
            "team-title w-full text-center text-light filter-[blur(var(--blur))]",
            "text-[24rem] leading-[80%]",
            "max-[1099px]:text-[7.4rem] max-[1099px]:leading-[100%]",
          )}
          style={{ "--blur": "0rem" }}
        >
          Meet the team
        </h2>
      </div>

      <div
        ref={innerRef}
        className={cn(
          "team-inner relative z-1",
          "min-[1100px]:absolute min-[1100px]:inset-0 min-[1100px]:h-[calc(var(--vh,1vh)*100)]",
        )}
      >
        <div
          ref={introRef}
          data-theme="light"
          className={cn(
            "team-intro relative px-8 pb-8 pt-168",
            "max-[1099px]:bg-[linear-gradient(#fbfbf4,#ff852d)]",
            "min-[1100px]:absolute min-[1100px]:left-0 min-[1100px]:top-0 min-[1100px]:w-full",
            "min-[1100px]:px-0 min-[1100px]:pb-0 min-[1100px]:pt-[calc((100vh-49.2rem)/2)]",
          )}
        >
          <div
            ref={introImageRef}
            className={cn(
              "team-intro-image relative mx-auto overflow-hidden rounded-[0.4rem]",
              "max-[1099px]:aspect-[3.6/3]",
              "min-[1100px]:h-[49.2rem] min-[1100px]:w-[93.1rem]",
            )}
          >
            <figure className="media-wrapper absolute inset-0">
              <div className="media-inner absolute inset-0">
                <img
                  className="media absolute inset-0 h-full w-full object-cover"
                  src={TEAM_INTRO_IMAGE}
                  width={1800}
                  height={1000}
                  alt=""
                  loading="lazy"
                />
              </div>
            </figure>
          </div>
        </div>

        <div
          ref={membersWrapperRef}
          data-theme="dark"
          className={cn(
            "team-members-wrapper relative",
            "min-[1100px]:absolute min-[1100px]:left-0 min-[1100px]:top-0 min-[1100px]:w-full",
          )}
        >
          <div
            ref={mobileImagesWrapperRef}
            className={cn(
              "team-images-wrapper mobile-only pointer-events-none z-1 flex justify-center py-[6vh]",
              "min-[1100px]:hidden",
            )}
          >
            <div className="team-images relative h-[18.6rem] w-[18rem] overflow-hidden rounded-[0.4rem]">
              {TEAM_MEMBERS.map((member) => (
                <figure key={member.name} className="media-wrapper">
                  <div className="media-inner absolute inset-0 bg-dark backface-hidden">
                    <img
                      className="media absolute inset-0 h-full w-full object-cover"
                      src={member.image}
                      width={600}
                      height={700}
                      alt=""
                      loading="lazy"
                    />
                  </div>
                </figure>
              ))}
            </div>
          </div>

          <div ref={membersInnerRef} className="team-members-inner">
            <div
              className={cn(
                "team-members bg-dark text-light",
                "max-[1099px]:mb-72",
                "min-[1100px]:pt-[calc((100vh-49.2rem)/2)]",
              )}
            >
              {TEAM_MEMBERS.map((member, index) => {
                const socials = [
                  member.social.linkedin && {
                    label: "LinkedIn",
                    short: "In",
                    href: member.social.linkedin,
                  },
                  member.social.instagram && {
                    label: "Instagram",
                    short: "Ig",
                    href: member.social.instagram,
                  },
                  member.social.dribbble && {
                    label: "Dribbble",
                    short: "Dr",
                    href: member.social.dribbble,
                  },
                ].filter(Boolean);

                return (
                  <div
                    key={member.name}
                    className={cn(
                      "team-member flex flex-col items-start",
                      "max-[1099px]:items-center max-[1099px]:text-center",
                      "max-[1099px]:not-last:mb-16",
                      "[&_.team-member-name]:opacity-20 [&.active_.team-member-name]:opacity-100",
                      "[&.active_.team-member-role_.line]:translate-y-0",
                      "[&.active_.team-member-socials-border-wrapper]:[clip-path:inset(0)] [&.active_.team-member-socials-border-wrapper]:delay-0",
                      "[&.active_.team-member-socials-bg]:scale-x-100 [&.active_.team-member-socials-bg]:delay-0",
                      "[&.active_.team-member-social]:opacity-100 [&.active_.team-member-social]:pointer-events-auto [&.active_.team-member-social]:duration-1600",
                    )}
                  >
                    <div
                      className={cn(
                        "team-member-image desktop-only relative w-[20rem] overflow-hidden",
                        "h-0",
                        "max-[1099px]:hidden",
                        index === 0 &&
                          "first h-[49.2rem] w-[93.1rem] max-w-[calc(100vw-4rem)]",
                      )}
                    >
                      <figure className="media-wrapper absolute inset-0 overflow-hidden rounded-[0.4rem] translate-z-0">
                        <div className="media-inner absolute inset-0">
                          <img
                            className="media absolute inset-0 h-full w-full object-cover"
                            src={member.image}
                            width={600}
                            height={700}
                            alt=""
                            loading={index === 0 ? "eager" : "lazy"}
                          />
                        </div>
                      </figure>

                      {index === 0 && (
                        <figure className="media-wrapper absolute inset-0 overflow-hidden rounded-[0.4rem] translate-z-0">
                          <div className="media-inner absolute inset-0">
                            <img
                              className="media absolute inset-0 h-full w-full object-cover"
                              src={TEAM_TRANSITION_OVERLAY}
                              width={1800}
                              height={1000}
                              alt=""
                              loading="eager"
                            />
                          </div>
                        </figure>
                      )}
                    </div>

                    <div
                      className={cn(
                        "team-member-content relative w-full",
                        "min-[1100px]:h-44",
                        "max-[1099px]:flex max-[1099px]:flex-col max-[1099px]:items-center",
                      )}
                    >
                      <span
                        className={cn(
                          "team-member-role",
                          "min-[1100px]:absolute min-[1100px]:left-8 min-[1100px]:top-1/2 min-[1100px]:-translate-y-1/2",
                        )}
                      >
                        <span className="split split-line block overflow-hidden">
                          <span className="line block translate-y-[110%] transition-transform duration-2000 ease-ease will-change-transform">
                            {member.role}
                          </span>
                        </span>
                      </span>

                      <h3
                        className={cn(
                          "team-member-name text-[8rem] leading-[100%] transition-opacity duration-600 ease-ease",
                          "max-[1099px]:-order-1 max-[1099px]:mb-4 max-[1099px]:text-[5rem] max-[1099px]:leading-[120%]",
                        )}
                      >
                        {member.name}
                      </h3>

                      <div
                        className={cn(
                          "team-member-socials desktop-only relative ml-auto h-16 px-6",
                          "hidden min-[1100px]:block",
                          "min-[1100px]:absolute min-[1100px]:right-8 min-[1100px]:top-1/2 min-[1100px]:-translate-y-1/2",
                        )}
                      >
                        <div
                          aria-hidden="true"
                          className={cn(
                            "team-member-socials-border-wrapper absolute inset-0 z-1 overflow-visible",
                            "[clip-path:inset(0_0_0_100%)]",
                            "transition-[clip-path] duration-800 ease-ease delay-100 will-change-[clip-path]",
                          )}
                        >
                          <BorderGlowCanvas color="244, 122, 35" />
                        </div>
                        <div
                          aria-hidden="true"
                          className={cn(
                            "team-member-socials-bg absolute inset-0",
                            "rounded-[0.2rem] bg-white/10",
                            "[-webkit-backdrop-filter:blur(1.2rem)] backdrop-blur-[1.2rem]",
                            "shadow-[inset_0_0_.8rem_rgba(255,255,255,0.02),inset_0_0_.2rem_rgba(255,255,255,0.2)]",
                            "origin-right scale-x-0",
                            "transition-transform duration-800 ease-ease delay-100",
                          )}
                        />

                        <div className="team-member-socials-inner relative z-2 flex h-full items-center">
                          {socials.map((social, socialIndex) => (
                            <a
                              key={social.short}
                              className={cn(
                                "team-member-social flex h-16 items-center px-6 text-[1.4rem] uppercase tracking-wide",
                                "opacity-0 pointer-events-none transition-opacity duration-400 ease-ease",
                              )}
                              href={social.href}
                              target="_blank"
                              rel="noreferrer"
                              aria-label={social.label}
                              style={{
                                transitionDelay: `${0.16 + socialIndex * 0.06}s`,
                              }}
                            >
                              {social.short}
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="team-image-grid relative -mt-px flex w-full max-[1099px]:flex-col max-[1099px]:px-8 max-[1099px]:pb-40">
              <div className="team-image-grid-left desktop-only hidden shrink-0 px-8 min-[1100px]:block min-[1100px]:w-[calc((100vw-32.5rem)/2)]">
                <div className="team-image-grid-2 relative mt-[22.4rem] h-[60.8rem] w-full">
                  <figure className="media-wrapper absolute right-0 top-0 h-full w-full overflow-hidden rounded-[0.4rem]">
                    <div className="media-inner absolute inset-0">
                      <img
                        className="media absolute inset-0 h-full w-full object-cover"
                        src={TEAM_COLLAGE_02}
                        width={1000}
                        height={1200}
                        alt=""
                        loading="lazy"
                      />
                    </div>
                  </figure>
                </div>
              </div>

              <div className="team-image-grid-right grow">
                <div className="team-image-grid-1 relative min-[1100px]:h-[39.6rem] min-[1100px]:w-130 max-[1099px]:-order-1 max-[1099px]:mb-8 max-[1099px]:aspect-[3.6/4.4]">
                  <figure className="media-wrapper absolute inset-0 overflow-hidden rounded-[0.4rem]">
                    <div className="media-inner absolute inset-0">
                      <img
                        className="media absolute inset-0 h-full w-full object-cover"
                        src={TEAM_COLLAGE_01}
                        width={650}
                        height={800}
                        alt=""
                        loading="lazy"
                      />
                    </div>
                  </figure>
                </div>

                <div className="team-image-grid-2 mobile-only relative mb-8 aspect-[3.6/4.4] min-[1100px]:hidden">
                  <figure className="media-wrapper absolute inset-0 overflow-hidden rounded-[0.4rem]">
                    <div className="media-inner absolute inset-0">
                      <img
                        className="media absolute inset-0 h-full w-full object-cover"
                        src={TEAM_COLLAGE_02}
                        width={1000}
                        height={1200}
                        alt=""
                        loading="lazy"
                      />
                    </div>
                  </figure>
                </div>

                <div className="team-image-grid-3 relative max-[1099px]:aspect-[3.6/2.8] min-[1100px]:mt-8 min-[1100px]:h-[66.7rem] min-[1100px]:w-[calc(100%-2rem)]">
                  <figure className="media-wrapper absolute inset-0 overflow-hidden rounded-[0.4rem]">
                    <div className="media-inner absolute inset-0">
                      <img
                        className="media absolute inset-0 h-full w-full object-cover"
                        src={TEAM_COLLAGE_03}
                        width={1800}
                        height={1200}
                        alt=""
                        loading="lazy"
                      />
                    </div>
                  </figure>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default memo(Team);
