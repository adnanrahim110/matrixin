"use client";

import gsap from "gsap";
import { useLayoutEffect, useMemo, useRef } from "react";

import Button from "@/components/ui/Button";
import { cn } from "@/utils/cn";
import { ensureGsap } from "@/utils/gsap";
import { usePrefersReducedMotion } from "@/utils/usePrefersReducedMotion";

const toneDotClass = (tone) =>
  cn(
    "mt-[0.5rem] h-[0.6rem] w-[0.6rem] rotate-45 rounded-[0.1rem] bg-primary",
    tone === "green" && "bg-green",
    tone === "purple" && "bg-purple",
    tone === "blue" && "bg-blue",
    tone === "yellow" && "bg-yellow",
  );

export default function ServiceHero({ service }) {
  const reducedMotion = usePrefersReducedMotion();

  const rootRef = useRef(null);
  const glowRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const ledeRefs = useRef([]);
  const bulletsRef = useRef(null);
  const factsRef = useRef(null);
  const mediaWrapRef = useRef(null);
  const mediaImgRef = useRef(null);

  const tone = service?.tone || "default";

  const hero = service?.hero || {};
  const primaryCta = hero?.primaryCta || service?.cta?.primary;
  const secondaryCta = hero?.secondaryCta || service?.cta?.secondary;
  const theme = hero?.theme || "dark";
  const isDark = theme === "dark";

  const lede = useMemo(() => {
    const raw = hero?.lede;
    if (!raw) return [];
    return Array.isArray(raw) ? raw : [String(raw)];
  }, [hero?.lede]);

  const bullets = useMemo(() => {
    const raw = hero?.bullets;
    if (!raw) return [];
    return Array.isArray(raw) ? raw : [String(raw)];
  }, [hero?.bullets]);

  const facts = useMemo(() => {
    const raw = hero?.facts;
    if (!raw) return [];
    return Array.isArray(raw) ? raw : [];
  }, [hero?.facts]);

  useLayoutEffect(() => {
    ensureGsap();

    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      const title = titleRef.current;
      const subtitle = subtitleRef.current;
      const glow = glowRef.current;
      const mediaWrap = mediaWrapRef.current;
      const mediaImg = mediaImgRef.current;

      const eyebrow = root.querySelector("[data-hero-eyebrow]");
      const ledes = ledeRefs.current.filter(Boolean);
      const revealTargets = [
        eyebrow,
        title,
        subtitle,
        ...ledes,
        bulletsRef.current,
        factsRef.current,
      ].filter(Boolean);

      const introTl = gsap.timeline({ delay: 0.05 });

      if (reducedMotion) {
        gsap.set(revealTargets, {
          autoAlpha: 1,
          filter: "blur(0rem)",
          yPercent: 0,
        });
        if (mediaWrap) gsap.set(mediaWrap, { clipPath: "inset(0 0 0% 0)" });
        if (mediaImg) gsap.set(mediaImg, { scale: 1 });
        return () => {
          introTl.kill();
          mm.revert();
        };
      }

      introTl.moveBlur(revealTargets, { yPercent: 60, stagger: 0.06 }, 0);

      if (mediaWrap) {
        introTl.fromTo(
          mediaWrap,
          { clipPath: "inset(0 0 100% 0)" },
          { clipPath: "inset(0 0 0% 0)", duration: 1.1, ease: "power3.out" },
          0.1,
        );
      }

      if (mediaImg) {
        gsap.fromTo(
          mediaImg,
          { scale: 1.08 },
          {
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: root,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
              invalidateOnRefresh: true,
              refreshPriority: -1,
            },
          },
        );
      }

      if (title) {
        gsap.fromTo(
          title,
          { y: 0 },
          {
            y: -24,
            ease: "none",
            scrollTrigger: {
              trigger: root,
              start: "top top",
              end: "bottom top",
              scrub: 1,
              invalidateOnRefresh: true,
              refreshPriority: -1,
            },
          },
        );
      }

      if (mediaWrap) {
        gsap.fromTo(
          mediaWrap,
          { y: 0 },
          {
            y: 22,
            ease: "none",
            scrollTrigger: {
              trigger: root,
              start: "top top",
              end: "bottom top",
              scrub: 1,
              invalidateOnRefresh: true,
              refreshPriority: -1,
            },
          },
        );
      }

      mm.add("(min-width: 1100px)", () => {
        if (!title || !subtitle) return () => {};

        const titleX = gsap.quickTo(title, "x", {
          duration: 0.6,
          ease: "power3.out",
          overwrite: "auto",
        });
        const subtitleX = gsap.quickTo(subtitle, "x", {
          duration: 0.6,
          ease: "power3.out",
          overwrite: "auto",
        });

        const glowX = glow
          ? gsap.quickTo(glow, "--mx", {
              duration: 0.4,
              ease: "power3.out",
              overwrite: "auto",
            })
          : null;
        const glowY = glow
          ? gsap.quickTo(glow, "--my", {
              duration: 0.4,
              ease: "power3.out",
              overwrite: "auto",
            })
          : null;

        const onMove = (e) => {
          const px = e.clientX / window.innerWidth - 0.5;
          titleX(-px * 28);
          subtitleX(px * 16);

          if (glowX && glowY) {
            glowX(`${(e.clientX / window.innerWidth) * 100}%`);
            glowY(`${(e.clientY / window.innerHeight) * 100}%`);
          }
        };

        window.addEventListener("mousemove", onMove, { passive: true });
        return () => window.removeEventListener("mousemove", onMove);
      });

      return () => {
        introTl.kill();
        mm.revert();
      };
    }, root);

    return () => ctx.revert();
  }, [reducedMotion, service?.slug]);

  const borderClass = isDark ? "border-white/10" : "border-dark/10";
  const subtleText = isDark ? "text-light/70" : "text-dark/70";
  const trustText = isDark ? "text-light/60" : "text-dark/60";

  const hasMedia = Boolean(hero?.image?.src);
  const hasBullets = bullets.length > 0;
  const hasFacts = facts.length > 0;
  const hasAside = hasMedia || hasBullets || hasFacts;
  const hasPrimaryCta = Boolean(primaryCta?.href && primaryCta?.label);
  const hasSecondaryCta = Boolean(secondaryCta?.href && secondaryCta?.label);
  const hasHeroCta = hasPrimaryCta || hasSecondaryCta;
  const showRightCta = hasHeroCta && !hasBullets && hasAside;
  const showLeftCta = hasHeroCta && !showRightCta;

  return (
    <header
      ref={rootRef}
      data-theme={theme}
      className={cn(
        "relative w-full overflow-hidden",
        isDark ? "bg-dark text-light" : "bg-light text-dark",
      )}
    >
      <div
        ref={glowRef}
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-0 z-0 opacity-70",
          "max-[1099px]:opacity-40",
          "[--mx:55%] [--my:35%]",
        )}
        style={{
          background:
            "radial-gradient(40rem 40rem at var(--mx) var(--my), rgba(244,122,35,0.22), rgba(2,2,2,0) 60%), radial-gradient(60rem 60rem at 20% 75%, rgba(255,255,255,0.06), rgba(2,2,2,0) 55%)",
        }}
      />

      <div className="px-8 pt-48 pb-32 max-[1099px]:pt-28 max-[1099px]:pb-24 max-[699px]:pt-24 max-[699px]:pb-20 max-[449px]:px-6 max-[449px]:pt-20">
        <div className="mx-auto w-full max-w-480">
          <div className="mt-10 grid grid-cols-12 gap-12 max-[1099px]:gap-10 max-[699px]:mt-8 max-[449px]:mt-6 max-[449px]:gap-8">
            <div
              className={cn(
                "min-w-0 relative z-2 max-[1099px]:col-span-12",
                hasAside ? "col-span-6" : "col-span-12",
              )}
            >
              {hero?.eyebrow && (
                <p
                  data-hero-eyebrow
                  className={cn(
                    "text-[1.4rem] uppercase tracking-[0.08em]",
                    trustText,
                  )}
                >
                  {hero.eyebrow}
                </p>
              )}
              <h1
                ref={titleRef}
                className={cn(
                  "font-heading text-[clamp(6.2rem,5vw+1rem,6.5rem)] leading-[105%] tracking-[-0.03em]",
                  "max-w-240 max-[1099px]:max-w-none",
                  "max-[1099px]:text-[5.4rem] max-[1099px]:leading-[110%] max-[699px]:text-[4.4rem] max-[449px]:text-[3.8rem]",
                  hero?.eyebrow && "mt-6",
                )}
              >
                {hero?.title || service?.name}
              </h1>

              <p
                ref={subtitleRef}
                className={cn(
                  "mt-8 text-[2rem] leading-[140%] max-w-208",
                  "max-[1099px]:mt-6 max-[1099px]:max-w-none max-[699px]:text-[2rem] max-[449px]:text-[1.8rem]",
                  subtleText,
                )}
              >
                {hero?.subtitle || service?.shortDescription}
              </p>

              {lede.length > 0 && (
                <div
                  className={cn(
                    "mt-10 space-y-6 max-[1099px]:mt-8 max-[449px]:space-y-5",
                    subtleText,
                  )}
                >
                  {lede.map((p, idx) => (
                    <p
                      key={p}
                      ref={(el) => {
                        ledeRefs.current[idx] = el;
                      }}
                      className="leading-[160%]"
                    >
                      {p}
                    </p>
                  ))}
                </div>
              )}

              {showLeftCta && (
                <div className="mt-12 grid gap-4 max-[1099px]:mt-10 max-[449px]:mt-8">
                  {hasPrimaryCta && (
                    <Button
                      href={primaryCta.href}
                      variant="magnetic"
                      tone={tone}
                      className="h-24 max-[449px]:h-20"
                    >
                      {primaryCta.label}
                    </Button>
                  )}
                  {hasSecondaryCta && (
                    <Button
                      href={secondaryCta.href}
                      tone="light"
                      className={cn("h-24 max-[449px]:h-20")}
                    >
                      {secondaryCta.label}
                    </Button>
                  )}
                </div>
              )}
            </div>

            {hasAside && (
              <div className="col-span-6 min-w-0 relative z-1 max-[1099px]:col-span-12">
                {hasMedia && (
                  <figure
                    ref={mediaWrapRef}
                    className={cn(
                      "relative aspect-16/10 w-full overflow-hidden rounded-[0.4rem] border",
                      borderClass,
                      isDark ? "bg-white/5" : "bg-dark/5",
                    )}
                  >
                    <img
                      ref={mediaImgRef}
                      className="absolute inset-0 h-full w-full object-cover will-change-transform"
                      src={hero?.image?.src}
                      alt={hero?.image?.alt}
                      loading="lazy"
                    />
                  </figure>
                )}

                {showRightCta && (
                  <div
                    className={cn(
                      hasMedia ? "mt-8" : "mt-0",
                      "grid gap-4 max-[1099px]:mt-8 max-[449px]:mt-6",
                    )}
                  >
                    {hasPrimaryCta && (
                      <Button
                        href={primaryCta.href}
                        variant="magnetic"
                        tone={tone}
                        className="h-24 max-[449px]:h-20"
                      >
                        {primaryCta.label}
                      </Button>
                    )}
                    {hasSecondaryCta && (
                      <Button
                        href={secondaryCta.href}
                        tone="light"
                        className={cn("h-24 max-[449px]:h-20")}
                      >
                        {secondaryCta.label}
                      </Button>
                    )}
                  </div>
                )}

                {hasBullets && (
                  <ul
                    ref={bulletsRef}
                    className={cn(
                      hasMedia ? "mt-8" : "mt-0",
                      "space-y-4 rounded-[0.4rem] border p-8 max-[449px]:p-6",
                      borderClass,
                      isDark ? "bg-white/5" : "bg-dark/5",
                    )}
                  >
                    {bullets.map((b) => (
                      <li key={b} className="flex items-start gap-4">
                        <span
                          className={toneDotClass(tone)}
                          aria-hidden="true"
                        />
                        <span className={cn("leading-[160%]", subtleText)}>
                          {b}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}

                {hasFacts && (
                  <dl
                    ref={factsRef}
                    className={cn(
                      "mt-8 grid grid-cols-3 gap-8 border-t pt-10 max-[1099px]:grid-cols-1 max-[449px]:gap-6 max-[449px]:pt-8",
                      borderClass,
                    )}
                  >
                    {facts.map((f) => (
                      <div key={f.label} className="space-y-3">
                        <dt
                          className={cn(
                            "text-[1.2rem] uppercase tracking-[0.08em]",
                            isDark ? "text-light/60" : "text-dark/60",
                          )}
                        >
                          {f.label}
                        </dt>
                        <dd
                          className={cn(
                            "text-[1.3rem] leading-[160%]",
                            subtleText,
                          )}
                        >
                          {f.value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {hero?.trustBarText && (
        <div
          data-reveal
          className={cn(
            "border-t px-8 py-6 max-[449px]:px-6",
            borderClass,
            isDark ? "bg-white/5" : "bg-dark/5",
          )}
        >
          <div className="mx-auto w-full max-w-480">
            <p
              className={cn(
                "text-[1.2rem] uppercase tracking-[0.12em] leading-[160%]",
                trustText,
              )}
            >
              {hero.trustBarText}
            </p>
          </div>
        </div>
      )}
    </header>
  );
}
