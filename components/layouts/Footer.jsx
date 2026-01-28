"use client";

import gsap from "gsap";
import lottie from "lottie-web";
import Link from "next/link";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";

import { cn } from "@/utils/cn";
import { ensureGsap } from "@/utils/gsap";

import Button from "../ui/Button";
import EstrelaFooterLogo from "./EstrelaFooterLogo";
import EstrelaFooterOverlay from "./EstrelaFooterOverlay";
import { useNewsletter } from "./NewsletterContext";

const CloseIcon = () => (
  <svg
    width="11"
    height="11"
    viewBox="0 0 11 11"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M1 1L5.5 5.5M10 10L5.5 5.5M5.5 5.5L10 1M5.5 5.5L1 10"
      stroke="white"
    />
  </svg>
);

const FOOTER_LETTERS = {
  M: [
    { x: 12, y: 58, scale: 2.6 },
    { x: 30, y: 18, scale: 1.0 },
    { x: 70, y: 22, scale: 1.9 },
    { x: 42, y: 10, scale: 0.9 },
  ],
  a: [
    { x: 22, y: 78, scale: 1.1 },
    { x: 80, y: 52, scale: 2.4 },
    { x: 58, y: 62, scale: 1.6 },
    { x: 66, y: 36, scale: 2.2 },
  ],
  r: [
    { x: 74, y: 30, scale: 2.2 },
    { x: 18, y: 34, scale: 1.6 },
    { x: 72, y: 46, scale: 0.9 },
    { x: 46, y: 18, scale: 1.8 },
  ],
  k: [
    { x: 86, y: 62, scale: 2.0 },
    { x: 54, y: 20, scale: 1.4 },
    { x: 26, y: 62, scale: 2.5 },
    { x: 56, y: 72, scale: 0.8 },
  ],
  e: [
    { x: 60, y: 12, scale: 0.9 },
    { x: 28, y: 66, scale: 2.3 },
    { x: 52, y: 28, scale: 1.5 },
    { x: 36, y: 74, scale: 2.0 },
  ],
  t: [
    { x: 10, y: 22, scale: 1.8 },
    { x: 64, y: 18, scale: 1.1 },
    { x: 84, y: 44, scale: 2.4 },
    { x: 40, y: 12, scale: 0.9 },
  ],
  i1: [
    { x: 42, y: 30, scale: 1.2 },
    { x: 18, y: 52, scale: 2.0 },
    { x: 58, y: 46, scale: 1.0 },
    { x: 30, y: 18, scale: 1.6 },
  ],
  n: [
    { x: 78, y: 70, scale: 1.8 },
    { x: 40, y: 58, scale: 2.4 },
    { x: 66, y: 38, scale: 1.2 },
    { x: 22, y: 66, scale: 2.0 },
  ],
  i2: [
    { x: 56, y: 80, scale: 1.2 },
    { x: 74, y: 40, scale: 2.0 },
    { x: 34, y: 24, scale: 1.1 },
    { x: 84, y: 22, scale: 1.7 },
  ],
  x: [
    { x: 88, y: 18, scale: 1.4 },
    { x: 22, y: 18, scale: 2.3 },
    { x: 70, y: 58, scale: 1.2 },
    { x: 46, y: 44, scale: 2.0 },
  ],
};

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

const Footer = () => {
  const newsletter = useNewsletter();

  const footerRef = useRef(null);
  const iconWrapperRef = useRef(null);
  const iconRef = useRef(null);
  const logoWrapperRef = useRef(null);
  const desktopNewsletterRef = useRef(null);
  const desktopFormRef = useRef(null);

  const lottieRef = useRef(null);
  const totalFramesRef = useRef(0);

  const letterTlRef = useRef(null);
  const iconTlRef = useRef(null);
  const hideTweenRef = useRef(null);

  const [overlayActive, setOverlayActive] = useState(false);
  const [newsletterOpen, setNewsletterOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const links = useMemo(
    () => [
      { label: "Home", href: "/" },
      { label: "Work", href: "/work" },
      { label: "About", href: "/about-us" },
      { label: "Services", href: "/services" },
      { label: "Privacy Policy", href: "/privacy-policy" },
    ],
    [],
  );

  const socials = useMemo(
    () => [
      {
        label: "Instagram",
        href: "https://www.instagram.com/estrela_digitalstudio/?hl=en",
      },
      {
        label: "Facebook",
        href: "https://www.facebook.com/profile.php?id=100091661185714",
      },
      {
        label: "LinkedIn",
        href: "https://www.linkedin.com/company/estrela-digital-studio",
      },
      { label: "Awwwards", href: "https://www.awwwards.com/estrelastudio/" },
      { label: "Behance", href: "https://www.behance.net/estrelastudio" },
    ],
    [],
  );

  useEffect(() => {
    const host = iconRef.current;
    if (!host) return;

    const anim = lottie.loadAnimation({
      container: host,
      renderer: "svg",
      loop: false,
      autoplay: false,
      path: "/icon.json",
    });

    lottieRef.current = anim;

    const onReady = () => {
      totalFramesRef.current = anim.totalFrames || 0;
    };

    anim.addEventListener("data_ready", onReady);

    return () => {
      anim.removeEventListener("data_ready", onReady);
      anim.destroy();
      lottieRef.current = null;
      totalFramesRef.current = 0;
    };
  }, []);

  useLayoutEffect(() => {
    ensureGsap();

    const footer = footerRef.current;
    if (!footer) return;
    if (window.matchMedia("(max-width: 1099px)").matches) return;

    const block = footer.querySelector("[data-footer-btn-block]");
    const target = footer.querySelector("[data-footer-btn-block-link]");
    const btn = footer.querySelector("[data-footer-btn]");
    if (!block || !target || !btn) return;

    const x = gsap.quickTo(btn, "x", {
      duration: 0.6,
      ease: "power3.out",
      overwrite: "auto",
    });
    const y = gsap.quickTo(btn, "y", {
      duration: 0.6,
      ease: "power3.out",
      overwrite: "auto",
    });

    const onMove = (event) => {
      block.classList.add("active");
      const r = target.getBoundingClientRect();
      x(event.clientX - r.left - r.width * 0.5);
      y(event.clientY - r.top - r.height * 0.5);
    };

    const onLeave = () => {
      block.classList.remove("active");
      x(0);
      y(0);
    };

    block.addEventListener("mousemove", onMove);
    block.addEventListener("mouseleave", onLeave);

    return () => {
      block.removeEventListener("mousemove", onMove);
      block.removeEventListener("mouseleave", onLeave);
      block.classList.remove("active");
      x(0);
      y(0);
    };
  }, []);

  useLayoutEffect(() => {
    ensureGsap();

    const footer = footerRef.current;
    const logoWrapper = logoWrapperRef.current;
    if (!footer || !logoWrapper) return;
    if (window.matchMedia("(max-width: 1099px)").matches) return;

    const paths = logoWrapper.querySelectorAll("path");
    if (!paths.length) return;

    const tl = gsap
      .timeline({
        scrollTrigger: {
          trigger: footer,
          start: "bottom-=30% bottom",
          end: "bottom bottom",
          scrub: true,
        },
      })
      .fromTo(
        paths,
        { y: "10rem" },
        { y: 0, ease: "power1.out", stagger: 0.03 },
      );

    return () => {
      tl.scrollTrigger?.kill?.();
      tl.kill();
    };
  }, []);

  useLayoutEffect(() => {
    ensureGsap();

    const footer = footerRef.current;
    const iconWrapper = iconWrapperRef.current;
    if (!footer || !iconWrapper) return;

    const mm = gsap.matchMedia();
    const ctx = gsap.context(() => {
      mm.add("(min-width: 1100px)", () => {
        const letterEls = {
          M: footer.querySelector(".f-letter-M"),
          a: footer.querySelector(".f-letter-a"),
          r: footer.querySelector(".f-letter-r"),
          k: footer.querySelector(".f-letter-k"),
          e: footer.querySelector(".f-letter-e"),
          t: footer.querySelector(".f-letter-t"),
          i1: footer.querySelector(".f-letter-i1"),
          n: footer.querySelector(".f-letter-n"),
          i2: footer.querySelector(".f-letter-i2"),
          x: footer.querySelector(".f-letter-x"),
        };

        const ensureLetterTl = () => {
          if (letterTlRef.current) return;
          const tl = gsap.timeline({
            paused: true,
            repeat: -1,
            defaults: { overwrite: "auto", duration: 1.6, ease: "inOut" },
          });

          Object.entries(letterEls).forEach(([key, el]) => {
            if (!el) return;
            const frames = FOOTER_LETTERS[key];
            if (!frames?.length) return;

            const start = frames[3] ?? frames[0];
            gsap.set(el, {
              scale: start.scale,
              x: `${start.x}vw`,
              y: `${start.y}vh`,
            });

            frames.forEach((frame, index) => {
              tl.to(
                el,
                {
                  scale: frame.scale,
                  x: `${frame.x}vw`,
                  y: `${frame.y}vh`,
                  duration: 1.7,
                  ease: "inOut",
                },
                index * 1.7,
              );
            });
          });

          letterTlRef.current = tl;
        };

        const ensureIconTl = () => {
          if (iconTlRef.current) return;

          const anim = lottieRef.current;
          const totalFrames = totalFramesRef.current;
          if (!anim || !totalFrames) return;

          const tl = gsap.timeline({
            paused: true,
            repeat: -1,
            defaults: { overwrite: "auto", duration: 1.6, ease: "inOut" },
          });

          const frameStep = totalFrames / 6;
          for (let i = 0; i <= 5; i++) {
            const frameState = { frame: i * frameStep };
            tl.to(
              frameState,
              {
                frame: (i + 1) * frameStep,
                duration: 1.7,
                ease: "inOut",
                overwrite: "auto",
                onUpdate: () => {
                  anim.goToAndStop(frameState.frame, true);
                },
              },
              i * 1.7,
            );
          }

          iconTlRef.current = tl;
        };

        const show = () => {
          setOverlayActive(true);
          footer.classList.add("active");

          hideTweenRef.current?.kill?.();
          hideTweenRef.current = null;

          ensureLetterTl();
          ensureIconTl();

          iconTlRef.current?.restart?.();
          letterTlRef.current?.restart?.();
        };

        const hide = () => {
          setOverlayActive(false);
          footer.classList.remove("active");

          iconTlRef.current?.pause?.();
          letterTlRef.current?.pause?.();

          const anim = lottieRef.current;
          if (!anim) return;
          const totalFrames = anim.totalFrames || 0;
          if (!totalFrames) return;

          const current = anim.currentFrame ?? 0;
          const targetFrame = current < totalFrames * 0.5 ? 0 : totalFrames - 1;
          const frameState = { frame: current };

          hideTweenRef.current?.kill?.();
          hideTweenRef.current = gsap.to(frameState, {
            frame: targetFrame,
            duration: 0.6,
            ease: "expo.out",
            overwrite: "auto",
            onUpdate: () => {
              anim.goToAndStop(frameState.frame, true);
            },
          });
        };

        iconWrapper.addEventListener("mouseenter", show);
        iconWrapper.addEventListener("mouseleave", hide);

        return () => {
          iconWrapper.removeEventListener("mouseenter", show);
          iconWrapper.removeEventListener("mouseleave", hide);

          hideTweenRef.current?.kill?.();
          hideTweenRef.current = null;

          iconTlRef.current?.kill?.();
          iconTlRef.current = null;

          letterTlRef.current?.kill?.();
          letterTlRef.current = null;

          footer.classList.remove("active");
        };
      });
    }, footer);

    return () => {
      ctx.revert();
      mm.revert();
    };
  }, []);

  useEffect(() => {
    if (!newsletterOpen) return;

    const onPointerDown = (event) => {
      const wrapper = desktopNewsletterRef.current;
      if (!wrapper) return;
      if (event.target instanceof Node && wrapper.contains(event.target))
        return;
      setNewsletterOpen(false);
    };

    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [newsletterOpen]);

  const onSubmitDesktop = async (event) => {
    event.preventDefault();
    const form = desktopFormRef.current;
    if (!form) return;

    setSubmitting(true);
    try {
      const payload = new FormData(form);
      if (!payload.get("ts")) payload.set("ts", String(Date.now()));

      const response = await fetch(form.action, {
        method: "POST",
        body: payload,
      });

      if (response.ok) {
        form.reset();
        setNewsletterOpen(false);
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <footer
      ref={footerRef}
      data-theme="dark"
      className={cn(
        "footer relative w-full overflow-hidden bg-dark text-light",
        "h-[calc(var(--vh,1vh)*100)]",
        "max-[1099px]:h-auto max-[1099px]:min-h-[calc(var(--vh,1vh)*100)]",
      )}
    >
      <div
        aria-hidden="true"
        className="f-bg absolute inset-8 rounded-[0.4rem] bg-white/10"
      />

      <div className="f-inner absolute inset-8 z-1 flex h-[calc(100%-4rem)] w-[calc(100%-4rem)] flex-col items-start overflow-hidden rounded-[0.4rem]">
        <div className="f-top flex w-full justify-between max-[1099px]:flex-1 max-[1099px]:flex-col">
          <div className="f-left mt-[4.4rem] ml-16 flex max-[1099px]:m-0 max-[1099px]:p-[2rem_2rem_0]">
            <div className="f-menu mr-48 max-[1099px]:mr-40">
              <h6 className="links-title mb-[2.4rem] font-heading text-[1.6rem] opacity-60">
                Site index
              </h6>
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-label={link.label}
                  className={cn(
                    "link relative block w-fit text-[1.6rem] leading-[140%] text-light/50 transition-opacity duration-600 ease-ease hover:text-light hover:opacity-100",
                    "after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:bg-current after:scale-x-0 after:origin-right after:transition-transform after:duration-1400 after:ease-[cubic-bezier(.19,1,.22,1)]",
                    "hover:after:scale-x-100 hover:after:origin-left",
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="f-social">
              <h6 className="links-title mb-[2.4rem] font-heading text-[1.6rem] opacity-60">
                Social
              </h6>
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.label}
                  className={cn(
                    "link relative block w-fit text-[1.6rem] leading-[140%] text-light/50 transition-opacity duration-600 ease-ease hover:text-light hover:opacity-100",
                    "after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:bg-current after:scale-x-0 after:origin-right after:transition-transform after:duration-1400 after:ease-[cubic-bezier(.19,1,.22,1)]",
                    "hover:after:scale-x-100 hover:after:origin-left",
                  )}
                >
                  {social.label}
                </a>
              ))}
            </div>
          </div>

          <div className="f-right mt-[2.4rem] mr-8 w-176 max-[1099px]:mt-auto max-[1099px]:mr-0 max-[1099px]:flex max-[1099px]:w-auto max-[1099px]:flex-col max-[1099px]:p-[2rem_2rem_0]">
            <Button variant="magnetic" tone="green">
              Contact Us
            </Button>
            <div className="f-contact flex justify-between pr-8 max-[1099px]:flex-col max-[1099px]:pr-0">
              <div className="f-contact-inner max-[1099px]:order-2">
                <p className="f-contact-text mb-[1.8rem] text-[1.6rem] leading-[160%] opacity-50">
                  Tell us about your project.
                  <br />
                  Let&apos;s collaborate.
                </p>

                <div className="contact flex flex-col items-start">
                  <div className="contact-link-wrapper mb-4 flex items-start">
                    <span
                      aria-hidden="true"
                      className="contact-bullet mt-4 mr-4 block h-[0.4rem] w-[0.4rem] rotate-45 bg-light"
                    />
                    <a
                      href="tel:+27780548476"
                      target="_blank"
                      rel="noreferrer"
                      aria-label="Phone"
                      className={cn(
                        "contact-link relative z-1 inline-block overflow-hidden text-light",
                        "after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:bg-current after:scale-x-0 after:origin-right after:transition-transform after:duration-1400 after:ease-[cubic-bezier(.19,1,.22,1)]",
                        "hover:after:scale-x-100 hover:after:origin-left",
                      )}
                    >
                      +27 (0) 78 054 8476
                    </a>
                  </div>

                  <div className="contact-link-wrapper mb-4 flex items-start">
                    <span
                      aria-hidden="true"
                      className="contact-bullet mt-4 mr-4 block h-[0.4rem] w-[0.4rem] rotate-45 bg-light"
                    />
                    <a
                      href="mailto:accounts@estrela.studio"
                      target="_blank"
                      rel="noreferrer"
                      aria-label="Email"
                      className={cn(
                        "contact-link relative z-1 inline-block overflow-hidden text-light",
                        "after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:bg-current after:scale-x-0 after:origin-right after:transition-transform after:duration-1400 after:ease-[cubic-bezier(.19,1,.22,1)]",
                        "hover:after:scale-x-100 hover:after:origin-left",
                      )}
                    >
                      Write Us
                    </a>
                  </div>

                  <div className="contact-link-wrapper mb-4 flex items-start min-[1100px]:hidden">
                    <span
                      aria-hidden="true"
                      className="contact-bullet mt-4 mr-4 block h-[0.4rem] w-[0.4rem] rotate-45 bg-light"
                    />
                    <button
                      type="button"
                      aria-label="Newsletter signup"
                      onClick={() => newsletter.show()}
                      className={cn(
                        "contact-link relative z-1 inline-block overflow-hidden text-left text-light",
                        "after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:bg-current after:scale-x-0 after:origin-right after:transition-transform after:duration-1400 after:ease-[cubic-bezier(.19,1,.22,1)]",
                        "hover:after:scale-x-100 hover:after:origin-left",
                      )}
                    >
                      Newsletter Signup
                    </button>
                  </div>

                  <div
                    ref={desktopNewsletterRef}
                    className={cn(
                      "contact-link-wrapper newsletter-wrapper relative mb-4 hidden items-start min-[1100px]:flex",
                      newsletterOpen && "active",
                    )}
                  >
                    <span
                      aria-hidden="true"
                      className="contact-bullet mt-4 mr-4 block h-[0.4rem] w-[0.4rem] rotate-45 bg-light"
                    />

                    <button
                      type="button"
                      aria-label={
                        newsletterOpen
                          ? "Close newsletter signup"
                          : "Open newsletter signup"
                      }
                      onClick={() => setNewsletterOpen((prev) => !prev)}
                      className="contact-link relative z-1 text-left"
                    >
                      <span
                        className={cn(
                          "contact-link-text relative flex items-center",
                          "transition-transform duration-800 ease-ease",
                          "after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:bg-current after:scale-x-0 after:origin-right after:transition-transform after:duration-1400 after:ease-[cubic-bezier(.19,1,.22,1)]",
                          !newsletterOpen &&
                            "hover:after:scale-x-100 hover:after:origin-left",
                          newsletterOpen && "overflow-visible after:hidden",
                          newsletterOpen &&
                            "-translate-x-6 translate-y-[0.8rem]",
                        )}
                      >
                        <span className="line text-light">
                          Newsletter Signup
                        </span>
                        <span
                          aria-hidden="true"
                          className={cn(
                            "contact-link-close absolute left-[calc(100%+1rem)] top-0 h-[0.9rem] w-[0.9rem]",
                            "transition-opacity duration-800 ease-ease",
                            newsletterOpen ? "opacity-100" : "opacity-0",
                          )}
                        >
                          <CloseIcon />
                        </span>
                      </span>
                    </button>

                    <span
                      aria-hidden="true"
                      className={cn(
                        "contact-link-bg absolute -left-6 top-0 h-[3.4rem] w-[calc(100%+3.4rem)] origin-bottom-left rounded-t-[0.4rem] bg-black",
                        "scale-0 transition-transform duration-600 ease-ease",
                        newsletterOpen && "scale-100 duration-800",
                      )}
                    />

                    <div
                      className={cn(
                        "newsletter absolute -left-6 top-[calc(100%+1rem)] w-176",
                        "transition-[clip-path,visibility] duration-800 ease-ease",
                        "[clip-path:inset(0_0_100%_0)]",
                        newsletterOpen
                          ? "visible pointer-events-auto [clip-path:inset(0_0_0%_0)]"
                          : "invisible pointer-events-none",
                      )}
                    >
                      <div className="newsletter-bg absolute inset-0 rounded-b-[0.4rem] bg-[#1b1b1b]" />
                      <div className="newsletter-inner relative">
                        <p className="newsletter-text px-8 pt-[2.8rem] pb-32 text-[1.6rem] leading-[140%] text-light">
                          Join our newsletter for fresh updates and exclusive
                          studio insights.
                        </p>

                        <form
                          ref={desktopFormRef}
                          className="newsletter-form relative"
                          action="/api/newsletter"
                          method="POST"
                          onSubmit={onSubmitDesktop}
                        >
                          <label className="form-label block">
                            <span className="form-label-text sr-only">
                              First name
                            </span>
                            <input
                              className={cn(
                                "form-input form-input-text block h-[6.2rem] w-full bg-transparent px-8 pb-2",
                                "text-[1.6rem] text-light placeholder:text-white/30",
                                "border-b border-black outline-none",
                                "transition-[border-color] duration-1000 ease-ease",
                                "focus:border-white/30",
                              )}
                              type="text"
                              name="first_name"
                              placeholder="First name"
                              required
                            />
                          </label>

                          <label className="form-label block">
                            <span className="form-label-text sr-only">
                              Last name
                            </span>
                            <input
                              className={cn(
                                "form-input form-input-text block h-[6.2rem] w-full bg-transparent px-8 pb-2",
                                "text-[1.6rem] text-light placeholder:text-white/30",
                                "border-b border-black outline-none",
                                "transition-[border-color] duration-1000 ease-ease",
                                "focus:border-white/30",
                              )}
                              type="text"
                              name="last_name"
                              placeholder="Last name"
                              required
                            />
                          </label>

                          <label className="form-label block">
                            <span className="form-label-text sr-only">
                              Email Address
                            </span>
                            <input
                              className={cn(
                                "form-input form-input-text block h-[6.2rem] w-full bg-transparent px-8 pb-2",
                                "text-[1.6rem] text-light placeholder:text-white/30",
                                "border-b border-black outline-none",
                                "transition-[border-color] duration-1000 ease-ease",
                                "focus:border-white/30",
                              )}
                              type="text"
                              name="email"
                              placeholder="Email Address"
                              required
                            />
                          </label>

                          <label className="sr-only" aria-hidden="true">
                            <input
                              type="text"
                              name="extra"
                              tabIndex={-1}
                              autoComplete="off"
                            />
                          </label>
                          <input type="hidden" name="ts" value="" />

                          <div className="form-btn px-8 py-[0.8rem] text-right">
                            <button
                              className={cn(
                                "btn group relative inline-flex h-24 items-center overflow-hidden rounded-[0.4rem] px-8",
                                "bg-transparent text-light",
                                submitting && "pointer-events-none opacity-30",
                              )}
                              type="submit"
                              aria-label="Submit"
                            >
                              <span className="btn-text relative z-1 mr-8">
                                Submit Details
                              </span>
                              <span className="btn-dot absolute left-[1.8rem] top-[calc(50%-0.4rem)] h-[0.8rem] w-[calc(100%-3.6rem)]">
                                <span className="btn-dot-inner absolute right-0 top-[calc(50%-0.2rem)] block h-[0.4rem] w-[0.4rem] rotate-45 rounded-[0.1rem] bg-green" />
                              </span>
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="clock font-heading max-[1099px]:order-1 max-[1099px]:mb-12">
                <ClockText />
              </div>
            </div>
          </div>
        </div>

        <div
          ref={iconWrapperRef}
          className="f-icon-wrapper absolute left-1/2 top-1/2 z-3 h-[7.2rem] w-[7.2rem] -translate-x-1/2 -translate-y-1/2 max-[1099px]:hidden"
        >
          <div
            ref={iconRef}
            aria-hidden="true"
            className={cn(
              "f-icon icon absolute left-1/2 top-1/2 h-[7.2rem] w-[7.2rem] -translate-x-1/2 -translate-y-1/2",
              "text-light [&_path]:fill-current",
              overlayActive && "text-dark",
            )}
          />
        </div>

        <div className="f-bottom mt-auto w-full p-8">
          <div ref={logoWrapperRef}>
            <EstrelaFooterLogo className="f-logo block w-full text-light" />
          </div>
        </div>

        <EstrelaFooterOverlay active={overlayActive} />
      </div>
    </footer>
  );
};

export default Footer;
