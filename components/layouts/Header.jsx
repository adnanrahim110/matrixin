"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";

import BorderGlowCanvas from "@/components/ui/BorderGlowCanvas";
import { cn } from "@/utils/cn";
import { ensureGsap } from "@/utils/gsap";
import Image from "next/image";

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

const Header = ({ menuOpen = false, onToggleMenu, navlinks = [] }) => {
  const navRef = useRef(null);
  const inTlRef = useRef(null);
  const outTlRef = useRef(null);
  const scrolledRef = useRef(false);
  const mobileRef = useRef(false);
  const [theme, setTheme] = useState("dark");
  const [scrolled, setScrolled] = useState(false);

  const pathname = usePathname();

  const links = useMemo(() => {
    if (Array.isArray(navlinks) && navlinks.length) {
      return navlinks.map((link) => ({
        label: link.name,
        href: link.href,
        dropdown: link.dropdown,
      }));
    }

    return [
      { label: "Work", href: "/work" },
      { label: "About", href: "/about-us" },
      { label: "Services", href: false, dropdown: [] },
      { label: "Contact", href: "/contact-us" },
    ];
  }, [navlinks]);

  const servicesLink = useMemo(
    () => links.find((l) => l.href === false && Array.isArray(l.dropdown)),
    [links],
  );

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownTriggerRef = useRef(null);
  const dropdownRef = useRef(null);

  const pillBase = cn(
    "pointer-events-auto relative flex h-[4rem] items-center justify-center rounded-[0.2rem]",
    "[-webkit-backdrop-filter:blur(1.2rem)] backdrop-blur-[1.2rem]",
    "shadow-[inset_0_0_.8rem_rgba(255,255,255,0.02),inset_0_0_.2rem_rgba(255,255,255,0.2)]",
    "[-webkit-backface-visibility:hidden] [backface-visibility:hidden] [transform:translateZ(0)]",
    "transition-[background-color,transform] duration-[400ms] ease-ease",
  );

  const borderColor = theme === "dark" ? "244, 122, 35" : "244, 122, 35";

  useLayoutEffect(() => {
    ensureGsap();

    const nav = navRef.current;
    if (!nav) return;

    let rafId = 0;

    const getThemeAtViewport = () => {
      const rect = nav.getBoundingClientRect();
      const sampleY = Math.min(
        window.innerHeight - 1,
        Math.ceil(rect.bottom) + 1,
      );
      const sampleX = Math.min(window.innerWidth - 1, window.innerWidth / 2);

      let el = document.elementFromPoint(sampleX, sampleY);
      while (el && el !== document.documentElement) {
        const value = el.getAttribute?.("data-theme");
        if (value) return value;
        el = el.parentElement;
      }

      return null;
    };

    const syncTheme = () => {
      rafId = 0;
      const nextTheme = getThemeAtViewport() || "dark";
      setTheme((prev) => (prev === nextTheme ? prev : nextTheme));
    };

    const scheduleSync = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(syncTheme);
    };

    const onUpdate = () => scheduleSync();
    const onResize = () => scheduleSync();

    scheduleSync();

    ScrollTrigger.addEventListener("update", onUpdate);
    ScrollTrigger.addEventListener("refresh", onUpdate);
    window.addEventListener("scroll", onUpdate, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });

    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
      ScrollTrigger.removeEventListener("update", onUpdate);
      ScrollTrigger.removeEventListener("refresh", onUpdate);
      window.removeEventListener("scroll", onUpdate);
      window.removeEventListener("resize", onResize);
    };
  }, [pathname]);

  useLayoutEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    const linkWrapper = nav.querySelector("[data-nav-links]");
    const links = nav.querySelectorAll("[data-nav-link]");

    const mm = window.matchMedia("(max-width: 1099px)");
    const isMobile = mm.matches;
    mobileRef.current = isMobile;

    const getFullWidth = () => {
      const inner = nav.querySelector("[data-nav-links-inner]");
      if (!inner) return "32.4rem";
      const innerWidth = inner.scrollWidth || 0;
      const padding = isMobile ? 0 : 44;
      const px = Math.max(220, innerWidth + padding);
      return `${px}px`;
    };
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
          { width: getFullWidth(), duration: 0.5, ease: "power3.out" },
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
    setDropdownOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (menuOpen) setDropdownOpen(false);
  }, [menuOpen]);

  useEffect(() => {
    if (!dropdownOpen) return;

    const onScroll = () => setDropdownOpen(false);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [dropdownOpen]);

  useEffect(() => {
    if (!dropdownOpen) return;

    const onPointerDown = (event) => {
      const target = event.target;
      if (!(target instanceof Node)) return;

      if (dropdownTriggerRef.current?.contains?.(target)) return;
      if (dropdownRef.current?.contains?.(target)) return;

      setDropdownOpen(false);
    };

    window.addEventListener("pointerdown", onPointerDown);
    return () => window.removeEventListener("pointerdown", onPointerDown);
  }, [dropdownOpen]);

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
        "max-[1099px]:justify-between max-[1099px]:px-8 max-[1099px]:pt-6",
        theme === "dark" ? "text-light" : "text-dark",
      )}
    >
      <Link
        href="/"
        aria-label="Home"
        className={cn(
          "pointer-events-auto mx-[0.15rem] px-[2.2rem] backdrop-blur-sm rounded-lg relative",
          "max-[1099px]:mx-0 max-[1099px]:px-0 max-[1099px]:backdrop-blur-0",
        )}
        data-nav-logo
      >
        <Image
          src={theme === "dark" ? "/imgs/logo-w.png" : "/imgs/logo-b.png"}
          alt="Marketinix"
          width={500}
          height={250}
          className="h-32 w-auto max-[1099px]:h-28"
        />
      </Link>

      <div
        className={cn(
          "relative mx-[0.15rem] pointer-events-auto",
          "max-[1099px]:hidden",
        )}
      >
        <div
          className={cn(
            pillBase,
            "w-[32.4rem] overflow-hidden",
            theme === "dark" ? "bg-white/10" : "bg-[rgba(188,188,188,0.1)]",
          )}
          data-nav-links
        >
          <BorderGlowCanvas color={borderColor} />
          <div
            data-nav-links-inner
            className="absolute left-1/2 top-1/2 z-3 flex -translate-x-1/2 -translate-y-1/2 items-center"
          >
            {links.map((link, index) => {
              const isDropdownTrigger =
                link.href === false && Array.isArray(link.dropdown);

              const isActive =
                typeof link.href === "string"
                  ? pathname === link.href ||
                    (link.href !== "/" && pathname?.startsWith(`${link.href}/`))
                  : isDropdownTrigger
                    ? pathname?.startsWith("/services")
                    : false;

              const baseClassName = cn(
                "group relative p-[0.4rem] text-[1.6rem] leading-none transition-colors duration-600 ease-ease",
                index !== links.length - 1 && "mr-[2.2rem]",
                isActive && "text-primary",
              );

              if (isDropdownTrigger) {
                return (
                  <button
                    key={link.label}
                    ref={dropdownTriggerRef}
                    type="button"
                    aria-label={link.label}
                    aria-expanded={dropdownOpen}
                    aria-haspopup="menu"
                    aria-controls="header-services-dropdown"
                    onClick={() => setDropdownOpen((prev) => !prev)}
                    className={cn(baseClassName, "cursor-pointer")}
                    data-nav-link
                  >
                    <span className="inline-flex items-center gap-3">
                      <SplitHoverText>{link.label}</SplitHoverText>
                      <span
                        aria-hidden="true"
                        className={cn(
                          "mt-[0.2rem] inline-block h-[0.6rem] w-[0.6rem] rotate-45 rounded-[0.12rem]",
                          theme === "dark" ? "bg-light/60" : "bg-dark/60",
                          "transition-transform duration-600 ease-ease",
                          dropdownOpen && "rotate-135",
                        )}
                      />
                    </span>
                  </button>
                );
              }

              return (
                <Link
                  key={`${link.label}-${link.href}`}
                  href={link.href}
                  aria-label={link.label}
                  onClick={() => setDropdownOpen(false)}
                  className={baseClassName}
                  data-nav-link
                >
                  <SplitHoverText>{link.label}</SplitHoverText>
                </Link>
              );
            })}
          </div>
        </div>

        {servicesLink && dropdownOpen && (
          <div
            ref={dropdownRef}
            id="header-services-dropdown"
            role="menu"
            className={cn(
              "absolute left-1/2 top-full z-20 mt-8 w-188 -translate-x-1/2 overflow-hidden rounded-[0.4rem] border",
              "[-webkit-backdrop-filter:blur(1.2rem)] backdrop-blur-[2rem]",
              theme === "dark"
                ? "border-white/10 bg-black/70 text-light"
                : "border-dark/10 bg-[rgba(188,188,188,0.12)] text-dark",
              "shadow-[inset_0_0_.8rem_rgba(255,255,255,0.02),inset_0_0_.2rem_rgba(255,255,255,0.2)]",
              "max-[1099px]:w-[calc(100vw-3.2rem)]",
            )}
          >
            <BorderGlowCanvas color={borderColor} />
            <div
              className={cn(
                "flex items-center justify-between gap-6 px-8 py-6",
                theme === "dark"
                  ? "border-b border-white/10"
                  : "border-b border-dark/10",
              )}
            >
              <p
                className={cn(
                  "text-[1.4rem] uppercase tracking-[0.08em]",
                  theme === "dark" ? "text-light/60" : "text-dark/60",
                )}
              >
                Services
              </p>
              <button
                type="button"
                aria-label="Close services dropdown"
                onClick={() => setDropdownOpen(false)}
                className={cn(
                  "group inline-flex items-center gap-3 text-[1.4rem] uppercase tracking-[0.08em]",
                  theme === "dark"
                    ? "text-light/60 hover:text-light"
                    : "text-dark/60 hover:text-dark",
                )}
              >
                Close
                <span
                  aria-hidden="true"
                  className={cn(
                    "block h-[0.8rem] w-[0.8rem] rotate-45 rounded-[0.12rem]",
                    theme === "dark"
                      ? "bg-light/60 group-hover:bg-light"
                      : "bg-dark/60 group-hover:bg-dark",
                  )}
                />
              </button>
            </div>

            <div className="px-4 py-4">
              <div>
                <div className="grid grid-cols-2 gap-2 max-[1099px]:grid-cols-1">
                  {(servicesLink.dropdown || []).map((service) => {
                    const isActive =
                      pathname === `/services/${service.slug}` ||
                      pathname?.startsWith?.(`/services/${service.slug}/`);

                    return (
                      <Link
                        key={service.slug}
                        href={`/services/${service.slug}`}
                        role="menuitem"
                        onClick={() => setDropdownOpen(false)}
                        className={cn(
                          "group flex items-center justify-between rounded-[0.3rem] pl-3 pr-6 py-5",
                          "transition-[background-color,transform] duration-600 ease-ease",
                          isActive &&
                            (theme === "dark"
                              ? "bg-white/10 text-primary"
                              : "bg-dark/5 text-primary"),
                          theme === "dark"
                            ? "hover:bg-white/10"
                            : "hover:bg-dark/5",
                        )}
                      >
                        <span className="font-heading text-[1.4rem] leading-[110%] max-[1099px]:text-[2rem]">
                          {service.name}
                        </span>
                        <span
                          aria-hidden="true"
                          className={cn(
                            "h-[0.8rem] w-[0.8rem] rotate-45 ml-4 rounded-[0.12rem] opacity-0 transition-[opacity,transform] duration-600 ease-ease group-hover:opacity-100 group-hover:rotate-135",
                            isActive ? "bg-primary opacity-100" : "",
                            theme === "dark"
                              ? "bg-light/60 group-hover:bg-primary"
                              : "bg-dark/60 group-hover:bg-primary",
                          )}
                        />
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}
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
          "max-[1099px]:mx-0",
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
