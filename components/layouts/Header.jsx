"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";

import BorderGlowCanvas from "@/components/ui/BorderGlowCanvas";
import { cn } from "@/utils/cn";
import { ensureGsap } from "@/utils/gsap";

const SplitHoverText = ({ children }) => {
  return (
    <span className="relative block overflow-hidden">
      <span className="block transition-transform duration-800 ease-ease group-hover:-translate-y-[110%]">
        {children}
      </span>
      <span className="absolute left-0 top-0 block translate-y-[110%] transition-transform duration-800 ease-ease group-hover:translate-y-0">
        {children}
      </span>
    </span>
  );
};

const ToggleDots = () => {
  const dotBase =
    "absolute block h-[0.3rem] w-[0.3rem] max-h-[3.5px] max-w-[3.5px] rounded-[0.1rem] bg-current transition-[transform,opacity] duration-600 ease-ease";

  return (
    <div className="relative z-3 h-[1.9rem] w-[1.9rem] transition-transform duration-600 ease-ease group-hover:rotate-90">
      <span
        className={cn(
          dotBase,
          "left-0 top-[calc(50%-0.15rem)] -translate-x-[0.6rem] opacity-0 group-hover:translate-x-0 group-hover:opacity-100",
        )}
      />
      <span
        className={cn(
          dotBase,
          "left-[0.4rem] top-[calc(50%-0.15rem)] -translate-x-[0.3rem] group-hover:translate-x-0",
        )}
      />
      <span
        className={cn(
          dotBase,
          "left-[calc(50%-0.15rem)] top-[calc(50%-0.15rem)] group-hover:translate-x-0",
        )}
      />
      <span
        className={cn(
          dotBase,
          "left-[1.2rem] top-[calc(50%-0.15rem)] translate-x-[0.3rem] group-hover:translate-x-0",
        )}
      />
      <span
        className={cn(
          dotBase,
          "left-[calc(100%-0.3rem)] top-[calc(50%-0.15rem)] translate-x-[0.6rem] opacity-0 group-hover:translate-x-0 group-hover:opacity-100",
        )}
      />
      <span
        className={cn(
          dotBase,
          "left-[calc(50%-0.15rem)] top-0 -translate-y-[0.6rem] opacity-0 group-hover:translate-y-0 group-hover:opacity-100",
        )}
      />
      <span
        className={cn(
          dotBase,
          "left-[calc(50%-0.15rem)] top-[0.4rem] -translate-y-[0.3rem] opacity-0 group-hover:translate-y-0 group-hover:opacity-100",
        )}
      />
      <span
        className={cn(
          dotBase,
          "left-[calc(50%-0.15rem)] top-[1.2rem] translate-y-[0.3rem] opacity-0 group-hover:translate-y-0 group-hover:opacity-100",
        )}
      />
      <span
        className={cn(
          dotBase,
          "left-[calc(50%-0.15rem)] top-[calc(100%-0.3rem)] translate-y-[0.6rem] opacity-0 group-hover:translate-y-0 group-hover:opacity-100",
        )}
      />
    </div>
  );
};

const Header = ({ menuOpen = false, onToggleMenu }) => {
  const navRef = useRef(null);
  const inTlRef = useRef(null);
  const outTlRef = useRef(null);
  const scrolledRef = useRef(false);
  const mobileRef = useRef(false);
  const [theme, setTheme] = useState("dark");
  const [scrolled, setScrolled] = useState(false);

  const links = useMemo(
    () => [
      { label: "Work", href: "/work" },
      { label: "About", href: "/about-us" },
      { label: "Services", href: "/services" },
      { label: "Contact", href: "/contact-us" },
    ],
    [],
  );

  const pillBase = cn(
    "pointer-events-auto relative flex h-[4rem] items-center justify-center rounded-[0.2rem]",
    "[-webkit-backdrop-filter:blur(1.2rem)] backdrop-blur-[1.2rem]",
    "shadow-[inset_0_0_.8rem_rgba(255,255,255,0.02),inset_0_0_.2rem_rgba(255,255,255,0.2)]",
    "[-webkit-backface-visibility:hidden] [backface-visibility:hidden] [transform:translateZ(0)]",
    "transition-[background-color,transform] duration-[400ms] ease-ease",
  );

  const borderColor = theme === "dark" ? "215, 150, 255" : "255, 123, 32";

  useLayoutEffect(() => {
    ensureGsap();

    const nav = navRef.current;
    if (!nav) return;

    const getHeaderOffset = () => nav.getBoundingClientRect().height;

    const triggers = [];
    const ctx = gsap.context(() => {
      document.querySelectorAll("[data-theme]").forEach((el) => {
        triggers.push(
          ScrollTrigger.create({
            trigger: el,
            start: () => `top top+=${getHeaderOffset()}`,
            end: () => `bottom top+=${getHeaderOffset()}`,
            onEnter: () => setTheme(el.dataset.theme || "dark"),
            onEnterBack: () => setTheme(el.dataset.theme || "dark"),
          }),
        );
      });
    }, nav);

    return () => {
      triggers.forEach((trigger) => trigger.kill());
      ctx.revert();
    };
  }, []);

  useLayoutEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    const linkWrapper = nav.querySelector("[data-nav-links]");
    const links = nav.querySelectorAll("[data-nav-link]");

    const mm = window.matchMedia("(max-width: 1099px)");
    const isMobile = mm.matches;
    mobileRef.current = isMobile;

    const FULL_WIDTH = "32.4rem";
    const SCROLL_THRESHOLD = 100;

    const scrollIn = () => {
      if (!linkWrapper) return;

      outTlRef.current?.kill?.();
      outTlRef.current = null;

      inTlRef.current?.kill?.();
      inTlRef.current = gsap
        .timeline({ defaults: { overwrite: "auto" } })
        .fromTo(
          linkWrapper,
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: 0.01, ease: "none" },
          0,
        )
        .add(() => {
          linkWrapper.style.webkitBackdropFilter = "none";
          linkWrapper.style.backdropFilter = "none";
          requestAnimationFrame(() => {
            linkWrapper.style.webkitBackdropFilter = "blur(1.2rem)";
            linkWrapper.style.backdropFilter = "blur(1.2rem)";
          });
        })
        .to(
          linkWrapper,
          { width: FULL_WIDTH, duration: 0.5, ease: "power3.out" },
          0,
        )
        .fromTo(
          links,
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: 0.01, ease: "none" },
          0,
        )
        .fromTo(
          links,
          { yPercent: 110 },
          { yPercent: 0, duration: 0.8, ease: "power3.out", stagger: 0.02 },
          0,
        );
    };

    const scrollOut = () => {
      if (!linkWrapper) return;

      inTlRef.current?.kill?.();
      inTlRef.current = null;

      outTlRef.current?.kill?.();
      outTlRef.current = gsap
        .timeline({ defaults: { overwrite: "auto" } })
        .to(
          linkWrapper,
          { width: 0, autoAlpha: 0, duration: 0.5, ease: "power3.out" },
          0,
        )
        .to(links, { autoAlpha: 0, duration: 0.1, ease: "none" }, 0);
    };

    const applyScrolled = (nextScrolled) => {
      scrolledRef.current = nextScrolled;
      setScrolled(nextScrolled);
      document.documentElement.classList.toggle("scrolled", nextScrolled);

      nextScrolled ? scrollOut() : scrollIn();
    };

    const onScroll = () => {
      const nextScrolled = window.scrollY > SCROLL_THRESHOLD;
      if (nextScrolled === scrolledRef.current) return;
      applyScrolled(nextScrolled);
    };

    const ctx = gsap.context(() => {
      gsap.set(nav, {
        yPercent: isMobile ? -200 : -125,
        visibility: "visible",
      });

      if (linkWrapper) gsap.set(linkWrapper, { width: 0, autoAlpha: 0 });
      if (links?.length) gsap.set(links, { yPercent: 110, autoAlpha: 0 });

      gsap.to(nav, { yPercent: 0, duration: 1.4, ease: "expo.out" });
    }, nav);

    applyScrolled(window.scrollY > SCROLL_THRESHOLD);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      document.documentElement.classList.remove("scrolled");
      inTlRef.current?.kill?.();
      outTlRef.current?.kill?.();
      ctx.revert();
    };
  }, []);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    gsap.to(nav, {
      yPercent: menuOpen ? (mobileRef.current ? -200 : -125) : 0,
      duration: 1.4,
      ease: "expo.out",
      overwrite: "auto",
    });
  }, [menuOpen]);

  return (
    <nav
      ref={navRef}
      data-theme={theme}
      style={{ visibility: "hidden" }}
      className={cn(
        "pointer-events-none fixed left-0 top-0 z-11 flex w-full items-center justify-center pt-8",
        theme === "dark" ? "text-light" : "text-dark",
      )}
    >
      <Link
        href="/"
        aria-label="Home"
        className={cn(
          pillBase,
          "mx-[0.15rem] px-[2.2rem]",
          scrolled
            ? "max-[1099px]:translate-y-0 max-[1099px]:duration-600 max-[1099px]:delay-50"
            : "max-[1099px]:translate-y-[4.4rem] max-[1099px]:duration-200 max-[1099px]:delay-0",
          theme === "dark" ? "bg-white/10" : "bg-[rgba(188,188,188,0.1)]",
        )}
        data-nav-logo
      >
        <span className="sr-only">Home</span>
        <BorderGlowCanvas color={borderColor} />
        <span className="relative z-3 font-heading text-[1.6rem] leading-none tracking-[0.02em]">
          Matrixin
        </span>
      </Link>

      <div
        className={cn(
          pillBase,
          "mx-[0.15rem] w-[32.4rem] overflow-hidden",
          "max-[1099px]:absolute max-[1099px]:left-1/2 max-[1099px]:top-8 max-[1099px]:-translate-x-1/2",
          theme === "dark" ? "bg-white/10" : "bg-[rgba(188,188,188,0.1)]",
        )}
        data-nav-links
      >
        <BorderGlowCanvas color={borderColor} />
        <div className="absolute left-1/2 top-1/2 z-3 flex -translate-x-1/2 -translate-y-1/2 items-center">
          {links.map((link, index) => (
            <Link
              key={link.href}
              href={link.href}
              aria-label={link.label}
              className={cn(
                "group relative p-[0.4rem] text-[1.6rem] leading-none transition-colors duration-600 ease-ease",
                index !== links.length - 1 && "mr-[2.2rem]",
              )}
              data-nav-link
            >
              <SplitHoverText>{link.label}</SplitHoverText>
            </Link>
          ))}
        </div>
      </div>

      <button
        type="button"
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        aria-expanded={menuOpen}
        aria-controls="mega-menu"
        onClick={onToggleMenu}
        className={cn(
          pillBase,
          "group mx-[0.15rem] w-[6.3rem] cursor-pointer",
          scrolled
            ? "max-[1099px]:translate-y-0 max-[1099px]:duration-600 max-[1099px]:delay-50"
            : "max-[1099px]:translate-y-[4.4rem] max-[1099px]:duration-200 max-[1099px]:delay-0",
          theme === "dark" ? "bg-white/10" : "bg-[rgba(188,188,188,0.1)]",
        )}
        data-nav-toggle
      >
        <BorderGlowCanvas color={borderColor} />
        <ToggleDots />
      </button>
    </nav>
  );
};

export default Header;
