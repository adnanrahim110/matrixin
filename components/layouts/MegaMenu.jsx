"use client";

import gsap from "gsap";
import Link from "next/link";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";

import { cn } from "@/utils/cn";
import { useNewsletter } from "./NewsletterContext";
import { useShowreel } from "./ShowreelContext";

const MenuLine = ({ children, className }) => {
  return (
    <span className={cn("block overflow-hidden", className)}>
      <span className="block will-change-transform" data-menu-line>
        {children}
      </span>
    </span>
  );
};

const MenuCloseIcon = () => {
  const dotBase = cn(
    "absolute block h-[0.3rem] w-[0.3rem] rounded-[0.1rem] bg-light",
    "opacity-100",
    "transition-[transform,opacity,background-color] duration-[600ms] ease-ease",
    "group-hover:bg-dark",
  );

  const forced = "max-[1099px]:opacity-100";

  return (
    <div className="relative h-[1.3rem] w-[1.9rem] pointer-events-none">
      <span
        className={cn(
          dotBase,
          "left-0 top-2",
          "group-hover:translate-x-[0.38rem] group-hover:-translate-y-1",
          "max-[1099px]:translate-x-[0.38rem] max-[1099px]:-translate-y-1",
        )}
      />
      <span className={cn(dotBase, "left-[calc(50%-0.15rem)] top-2")} />
      <span
        className={cn(
          dotBase,
          "left-[calc(100%-0.3rem)] top-2",
          "group-hover:-translate-x-[0.38rem] group-hover:-translate-y-1",
          "max-[1099px]:-translate-x-[0.38rem] max-[1099px]:-translate-y-1",
        )}
      />

      <span
        className={cn(
          dotBase,
          "left-0 top-2 opacity-0",
          "group-hover:-translate-y-2 group-hover:opacity-100",
          "max-[1099px]:-translate-y-2",
          forced,
        )}
      />
      <span
        className={cn(
          dotBase,
          "left-0 top-2 opacity-0",
          "group-hover:translate-y-2 group-hover:opacity-100",
          "max-[1099px]:translate-y-2",
          forced,
        )}
      />
      <span
        className={cn(
          dotBase,
          "left-0 top-2 opacity-0",
          "group-hover:translate-x-[0.38rem] group-hover:trny1-translate-y-1 group-hover:opacity-100",
          "max-[1099px]:translate-x-[0.38rem] max-[1099px]:trny1-translate-y-1",
          forced,
        )}
      />
      <span
        className={cn(
          dotBase,
          "left-[calc(100%-0.3rem)] top-2 opacity-0",
          "group-hover:-translate-x-[0.38rem] group-hover:translate-y-[0.2rem] group-hover:opacity-100",
          "max-[1099px]:-translate-x-[0.38rem] max-[1099px]:translate-y-[0.2rem]",
          forced,
        )}
      />
      <span
        className={cn(
          dotBase,
          "left-[calc(100%-0.3rem)] top-2 opacity-0",
          "group-hover:-translate-y-2 group-hover:opacity-100",
          "max-[1099px]:-translate-y-2",
          forced,
        )}
      />
      <span
        className={cn(
          dotBase,
          "left-[calc(100%-0.3rem)] top-2 opacity-0",
          "group-hover:translate-y-2 group-hover:opacity-100",
          "max-[1099px]:translate-y-2",
          forced,
        )}
      />
    </div>
  );
};

const MenuCardButton = ({ label, dotClassName, className }) => {
  return (
    <div
      className={cn(
        "pointer-events-none relative inline-flex h-12 items-center rounded-[0.2rem] px-8",
        "text-[1.6rem] leading-none text-light",
        className,
      )}
    >
      <span className="relative z-1">{label}</span>
      <span className="ml-[1.2rem] inline-flex h-[0.9rem] w-[0.9rem] items-center justify-center">
        <span
          className={cn(
            "block h-[0.3rem] w-[0.3rem] rounded-[0.1rem] bg-light transition-colors duration-400 ease-ease",
            dotClassName,
          )}
        />
      </span>
    </div>
  );
};

const ButtonBlock = ({
  href,
  label,
  hideButton = false,
  dotClassName,
  hoverBgClassName,
  className,
  children,
  onClick,
}) => {
  const wrapperRef = useRef(null);
  const btnRef = useRef(null);
  const activeRef = useRef(false);
  const [active, setActive] = useState(false);

  useLayoutEffect(() => {
    if (window.matchMedia("(max-width: 1099px)").matches) return;

    const btn = btnRef.current;
    if (!btn) return;

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

    const setActiveSafe = (next) => {
      if (activeRef.current === next) return;
      activeRef.current = next;
      setActive(next);
    };

    const onEnter = () => {
      setActiveSafe(true);
      xTo(0);
      yTo(0);
    };

    const onMove = (event) => {
      const wrapper = wrapperRef.current;
      if (!wrapper) return;
      const bounds = wrapper.getBoundingClientRect();
      xTo(event.clientX - bounds.left - bounds.width * 0.5);
      yTo(event.clientY - bounds.top - bounds.height * 0.5);
      setActiveSafe(true);
    };

    const onLeave = () => {
      setActiveSafe(false);
      xTo(0);
      yTo(0);
    };

    const wrapper = wrapperRef.current;
    wrapper?.addEventListener("mouseenter", onEnter);
    wrapper?.addEventListener("mousemove", onMove);
    wrapper?.addEventListener("mouseleave", onLeave);

    return () => {
      wrapper?.removeEventListener("mouseenter", onEnter);
      wrapper?.removeEventListener("mousemove", onMove);
      wrapper?.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      className={cn("relative h-full w-full overflow-hidden", className)}
    >
      <div
        aria-hidden="true"
        className={cn(
          "absolute inset-0 z-0 rounded-[0.2rem] [clip-path:inset(0_0_102%_0)]",
          "transition-[clip-path] duration-600 ease-ease",
          hoverBgClassName ?? "bg-light",
          active && "[clip-path:inset(0_0_0%_0)]",
        )}
      />
      {children}
      {href ? (
        <Link
          href={href}
          aria-label={label}
          className="absolute inset-0 z-2"
          onClick={onClick}
        />
      ) : (
        <button
          type="button"
          aria-label={label}
          className="absolute inset-0 z-2"
          onClick={onClick}
        />
      )}

      <div
        ref={btnRef}
        className={cn(
          "absolute left-1/2 top-1/2 z-3 -translate-x-1/2 -translate-y-1/2",
          hideButton &&
            cn(
              "opacity-0 transition-opacity duration-400 ease-ease",
              active && "opacity-100",
              "max-[1099px]:opacity-100",
            ),
        )}
      >
        <MenuCardButton
          label={label}
          dotClassName={dotClassName}
          className="bg-transparent"
        />
      </div>
    </div>
  );
};

export default function MegaMenu({ open, onClose }) {
  const showreel = useShowreel();
  const newsletter = useNewsletter();
  const menuRef = useRef(null);
  const innerRef = useRef(null);

  const inTlRef = useRef(null);
  const outTlRef = useRef(null);

  const links = useMemo(
    () => [
      { label: "Home", href: "/" },
      { label: "Work", href: "/work" },
      { label: "About", href: "/about-us" },
      { label: "Services", href: "/services" },
    ],
    [],
  );

  useLayoutEffect(() => {
    const menu = menuRef.current;
    if (!menu) return;

    const topCols = menu.querySelectorAll("[data-menu-top-col]");
    const menuLinks = menu.querySelectorAll("[data-menu-link]");
    const lines = menu.querySelectorAll("[data-menu-line]");
    const contactBullets = menu.querySelectorAll("[data-menu-bullet]");

    const ctx = gsap.context(() => {
      gsap.set(menu, {
        visibility: "hidden",
        pointerEvents: "none",
        backgroundColor: "#0e0e0e",
        clipPath: "polygon(0 0, 100% 0, 100% 0, 0 -50%)",
      });

      gsap.set(topCols, { yPercent: -120 });
      gsap.set(menuLinks, { autoAlpha: 0, yPercent: 80, filter: "blur(2rem)" });
      gsap.set(lines, { yPercent: 105 });
      gsap.set(contactBullets, { scale: 0, yPercent: 105 });

      inTlRef.current = gsap
        .timeline({ paused: true, defaults: { overwrite: "auto" } })
        .add(() => {
          document.documentElement.classList.add("menu-active");
        })
        .set(menu, { visibility: "visible" }, 0)
        .set(menu, { pointerEvents: "auto" }, 0)
        .fromTo(
          menu,
          { backgroundColor: "#0e0e0e" },
          { backgroundColor: "#020202", duration: 1.6, ease: "none" },
          0,
        )
        .fromTo(
          menu,
          { clipPath: "polygon(0 0, 100% 0, 100% 0, 0 -50%)" },
          {
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
            duration: 1.2,
            ease: "expo.out",
          },
          0,
        )
        .to(
          topCols,
          {
            yPercent: 0,
            duration: 1.5,
            ease: "expo.out",
            stagger: { each: 0.08, from: "center" },
          },
          0.2,
        )
        .fromTo(
          menuLinks,
          { autoAlpha: 0, yPercent: 80, filter: "blur(2rem)" },
          {
            autoAlpha: 1,
            yPercent: 0,
            filter: "blur(0rem)",
            duration: 1.8,
            ease: "expo.out",
            stagger: 0.07,
          },
          0.2,
        )
        .to(
          contactBullets,
          {
            scale: 1,
            yPercent: 0,
            duration: 1,
            ease: "power3.out",
            stagger: 0.03,
          },
          0.5,
        )
        .to(
          lines,
          { yPercent: 0, duration: 0.8, ease: "power3.out", stagger: 0.03 },
          0.6,
        );

      outTlRef.current = gsap
        .timeline({ paused: true, defaults: { overwrite: "auto" } })
        .set(menu, { pointerEvents: "none" }, 0)
        .to(
          topCols,
          {
            yPercent: -120,
            duration: 1,
            ease: "expo.inOut",
            stagger: { each: 0.02, from: "center", grid: "auto" },
          },
          0,
        )
        .to(
          menuLinks,
          {
            autoAlpha: 0,
            filter: "blur(2rem)",
            yPercent: 80,
            duration: 1,
            ease: "power3.inOut",
            stagger: 0.03,
          },
          0,
        )
        .to(
          contactBullets,
          { scale: 0, duration: 0.3, ease: "power1.out", stagger: 0.03 },
          0,
        )
        .to(
          lines,
          { yPercent: 105, duration: 0.6, ease: "power3.inOut", stagger: 0.03 },
          0,
        )
        .fromTo(
          menu,
          { backgroundColor: "#020202" },
          { backgroundColor: "#0e0e0e", duration: 1.6, ease: "none" },
          0,
        )
        .fromTo(
          menu,
          { clipPath: "polygon(0 0, 100% 0, 100% 150%, 0 100%)" },
          {
            clipPath: "polygon(0 0, 100% 0%, 100% 0%, 0% 0%)",
            duration: 1,
            ease: "expo.inOut",
          },
          0,
        )
        .add(() => {
          document.documentElement.classList.remove("menu-active");
        }, 0.6)
        .set(menu, { visibility: "hidden" });
    }, menu);

    return () => {
      ctx.revert();
      document.documentElement.classList.remove("menu-active");
    };
  }, []);

  useEffect(() => {
    if (!inTlRef.current || !outTlRef.current) return;

    if (open) {
      outTlRef.current.pause(0);
      outTlRef.current.invalidate();
      inTlRef.current.invalidate();
      requestAnimationFrame(() => inTlRef.current.restart());
      return;
    }

    inTlRef.current.pause(0);
    inTlRef.current.invalidate();
    outTlRef.current.invalidate();
    if (window.matchMedia("(max-width: 1099px)").matches && innerRef.current) {
      innerRef.current.scrollTop = 0;
    }
    requestAnimationFrame(() => outTlRef.current.restart());
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose?.();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  return (
    <div
      ref={menuRef}
      id="mega-menu"
      className={cn(
        "fixed inset-0 z-30 flex bg-dark",
        "pointer-events-none invisible",
        "will-change-[clip-path] translate-z-0",
      )}
      aria-hidden={!open}
    >
      <div
        ref={innerRef}
        className={cn(
          "relative flex w-full flex-col",
          "max-[1099px]:block max-[1099px]:overflow-y-auto",
        )}
      >
        <div
          className={cn(
            "relative grid grid-cols-3 gap-[0.4rem] p-8 overflow-hidden",
            "max-[1099px]:flex max-[1099px]:justify-end max-[1099px]:pb-0",
          )}
        >
          <div
            className="relative overflow-hidden max-[1099px]:hidden"
            data-menu-top-col
          >
            <div
              className={cn(
                "h-[13.3rem] rounded-[0.2rem] bg-grey-dark transition-[height,background-color] duration-800 ease-ease",
                "min-[1100px]:hover:h-80",
                "max-[1099px]:h-64",
              )}
            >
              <ButtonBlock
                label="Showreel"
                href="#"
                hideButton
                hoverBgClassName="bg-transparent"
                className="h-full w-full"
                onClick={(event) => {
                  event.preventDefault();
                  onClose?.();
                  showreel.show();
                }}
              >
                <div className="absolute inset-0 z-0 bg-dark/40" />
              </ButtonBlock>
            </div>
          </div>

          <div className="relative overflow-hidden" data-menu-top-col>
            <button
              type="button"
              aria-label="Close menu"
              onClick={onClose}
              className={cn(
                "group relative flex h-[13.3rem] w-full cursor-pointer items-center justify-center overflow-hidden rounded-[0.2rem]",
                "bg-grey-dark transition-[height,background-color] duration-800 ease-ease",
                "min-[1100px]:hover:h-80 min-[1100px]:hover:bg-light",
                "max-[1099px]:h-48 max-[1099px]:w-48",
              )}
            >
              <MenuCloseIcon />
            </button>
          </div>

          <div
            className="relative overflow-hidden max-[1099px]:hidden"
            data-menu-top-col
          >
            <div
              className={cn(
                "h-[13.3rem] rounded-[0.2rem] bg-grey-dark transition-[height,background-color] duration-800 ease-ease",
                "min-[1100px]:hover:h-80",
                "max-[1099px]:h-64",
              )}
            >
              <ButtonBlock
                label="Contact Us"
                href="/contact-us"
                dotClassName="bg-green"
                hoverBgClassName="bg-green"
                className="h-full w-full"
                onClick={onClose}
              />
            </div>
          </div>
        </div>

        <div className="relative flex flex-1 items-end overflow-hidden max-[1099px]:flex-col max-[1099px]:items-start max-[1099px]:pb-16">
          <div
            className={cn(
              "mb-16 ml-16",
              "max-[1099px]:mb-60 max-[1099px]:ml-8",
            )}
          >
            <nav className="flex flex-col">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-label={link.label}
                  onClick={onClose}
                  className={cn(
                    "group relative block font-heading text-[8.4rem] leading-[120%] text-light",
                    "max-[1099px]:text-[5.4rem]",
                  )}
                  data-menu-link
                >
                  <span
                    className={cn(
                      "absolute left-0 top-1/2 h-[1.2rem] w-[1.2rem] -translate-y-1/2 rounded-[0.2rem] bg-light",
                      "scale-0 rotate-0 transition-transform duration-1000 ease-ease",
                      "group-hover:translate-y-[-50%] group-hover:rotate-45 group-hover:scale-100",
                    )}
                    aria-hidden="true"
                  />
                  <span className="block transition-transform duration-1000 ease-ease group-hover:translate-x-16">
                    {link.label}
                  </span>
                </Link>
              ))}
            </nav>
          </div>

          <div
            className={cn(
              "relative z-1 mb-24 mr-24 w-2xl",
              "max-[1099px]:mb-0 max-[1099px]:mr-0 max-[1099px]:flex max-[1099px]:w-full max-[1099px]:justify-between",
            )}
          >
            <div
              className={cn(
                "relative mb-32",
                "max-[1099px]:mb-0 max-[1099px]:pt-[3.6rem] max-[1099px]:pr-[4.8rem]",
              )}
            >
              <div className="flex items-start" data-menu-contact>
                <span
                  className="mt-4 mr-4 block h-[0.4rem] w-[0.4rem] rotate-45 bg-light"
                  data-menu-bullet
                />
                <a
                  href="tel:+27780548476"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Phone"
                  className={cn(
                    "relative inline-block overflow-hidden text-light",
                    "after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:bg-current after:scale-x-0 after:origin-right after:transition-transform after:duration-1400 after:ease-[cubic-bezier(.19,1,.22,1)]",
                    "hover:after:scale-x-100 hover:after:origin-left",
                  )}
                >
                  <MenuLine>(+27) 78 054 8476</MenuLine>
                </a>
              </div>

              <div className="mt-4 flex items-start">
                <span
                  className="mt-4 mr-4 block h-[0.4rem] w-[0.4rem] rotate-45 bg-light"
                  data-menu-bullet
                />
                <a
                  href="mailto:accounts@matrixin.example"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Email"
                  className={cn(
                    "relative inline-block overflow-hidden text-light",
                    "after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:bg-current after:scale-x-0 after:origin-right after:transition-transform after:duration-1400 after:ease-[cubic-bezier(.19,1,.22,1)]",
                    "hover:after:scale-x-100 hover:after:origin-left",
                  )}
                >
                  <MenuLine>Write Us</MenuLine>
                </a>
              </div>

              <div className="mt-4 flex items-start">
                <span
                  className="mt-4 mr-4 block h-[0.4rem] w-[0.4rem] rotate-45 bg-light"
                  data-menu-bullet
                />
                <button
                  type="button"
                  aria-label="Newsletter signup"
                  onClick={() => {
                    if (!window.matchMedia("(max-width: 1099px)").matches)
                      return;
                    onClose?.();
                    newsletter.show();
                  }}
                  className={cn(
                    "relative inline-block overflow-hidden text-left text-light",
                    "after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:bg-current after:scale-x-0 after:origin-right after:transition-transform after:duration-1400 after:ease-[cubic-bezier(.19,1,.22,1)]",
                    "hover:after:scale-x-100 hover:after:origin-left",
                  )}
                >
                  <MenuLine>Newsletter Signup</MenuLine>
                </button>
              </div>
            </div>

            <div
              className={cn("links", "max-[1099px]:-order-1 max-[1099px]:pl-8")}
            >
              <MenuLine className="mb-[2.4rem] opacity-60">Social</MenuLine>
              <div className="flex flex-col">
                {[
                  { label: "Instagram", href: "https://instagram.com" },
                  { label: "Facebook", href: "https://facebook.com" },
                  { label: "LinkedIn", href: "https://linkedin.com" },
                  { label: "Behance", href: "https://behance.net" },
                ].map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={social.label}
                    className="opacity-50 transition-opacity duration-600 ease-ease hover:opacity-100"
                  >
                    <MenuLine>{social.label}</MenuLine>
                  </a>
                ))}
              </div>
            </div>

            <div
              className={cn(
                "absolute bottom-24 right-[7.8rem] font-heading text-light",
                "max-[1099px]:bottom-0",
              )}
            >
              <MenuLine>
                <ClockText />
              </MenuLine>
            </div>
          </div>
        </div>

        <div className="p-8 max-[1099px]:block min-[1100px]:hidden">
          <div className="grid gap-[0.4rem]">
            <div className="h-64 rounded-[0.2rem] bg-grey-dark">
              <ButtonBlock
                label="Contact Us"
                href="/contact-us"
                dotClassName="bg-green"
                hoverBgClassName="bg-green"
                className="h-full w-full"
                onClick={onClose}
              />
            </div>
            <div className="h-64 rounded-[0.2rem] bg-grey-dark">
              <ButtonBlock
                label="Showreel"
                href="#"
                hideButton={false}
                hoverBgClassName="bg-transparent"
                className="h-full w-full"
                onClick={(event) => {
                  event.preventDefault();
                  onClose?.();
                  showreel.show();
                }}
              >
                <div className="absolute inset-0 z-0 bg-dark/40" />
              </ButtonBlock>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const ClockText = () => {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const time = useMemo(() => {
    return new Intl.DateTimeFormat("en-GB", {
      timeZone: "Etc/GMT-2",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    }).format(now);
  }, [now]);

  return (
    <>
      <span className="inline-block min-w-[5.2rem]">{time}</span> (GMT+2)
    </>
  );
};
