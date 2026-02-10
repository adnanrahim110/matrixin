"use client";

import gsap from "gsap";
import lottie from "lottie-web";
import Link from "next/link";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

import { contactDetails, navlinks, socials } from "@/constants";
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

const Footer = () => {
  const newsletter = useNewsletter();

  const footerRef = useRef(null);
  const iconWrapperRef = useRef(null);
  const iconRef = useRef(null);
  const logoWrapperRef = useRef(null);
  const desktopNewsletterRef = useRef(null);
  const desktopFormRef = useRef(null);

  const lottieRef = useRef(null);
  const iconSvgRef = useRef(null);
  const totalFramesRef = useRef(0);

  const letterTlRef = useRef(null);
  const iconTlRef = useRef(null);
  const hideTweenRef = useRef(null);

  const [overlayActive, setOverlayActive] = useState(false);
  const [newsletterOpen, setNewsletterOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const dropdownNav = navlinks.find(
    (link) => link.href === false && Array.isArray(link.dropdown),
  );

  const siteIndexLinks = [
    ...navlinks
      .slice(0, -1)
      .filter((link) => typeof link.href === "string")
      .map((link) => ({ label: link.name, href: link.href })),
  ];
  const [emailContact, phoneContact] = contactDetails;

  useEffect(() => {
    ensureGsap();
    const host = iconRef.current;
    if (!host) return;

    const anim = lottie.loadAnimation({
      container: host,
      renderer: "svg",
      loop: false,
      autoplay: false,
      path: "/mkrt.json",
    });

    lottieRef.current = anim;

    const onDomLoaded = () => {
      const svgEl = anim?.renderer?.svgElement || host.querySelector("svg");
      if (!svgEl) return;
      iconSvgRef.current = svgEl;
      gsap.set(svgEl, {
        transformOrigin: "50% 50%",
        willChange: "transform",
      });
    };

    const onReady = () => {
      totalFramesRef.current = anim.totalFrames || 0;
    };

    anim.addEventListener("DOMLoaded", onDomLoaded);
    anim.addEventListener("data_ready", onReady);

    return () => {
      anim.removeEventListener("DOMLoaded", onDomLoaded);
      anim.removeEventListener("data_ready", onReady);
      anim.destroy();
      lottieRef.current = null;
      totalFramesRef.current = 0;
      iconSvgRef.current = null;
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
            repeatDelay: 0.55,
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
          if (!anim) return;

          const svgEl =
            iconSvgRef.current ||
            anim?.renderer?.svgElement ||
            iconRef.current?.querySelector?.("svg");
          if (!svgEl) return;

          const totalFrames = totalFramesRef.current || anim.totalFrames || 0;

          const tl = gsap.timeline({
            paused: true,
            repeat: -1,
            defaults: { overwrite: "auto", duration: 1.6, ease: "inOut" },
          });

          const loopDuration = 1.7 * 6;
          tl.to(
            svgEl,
            { rotation: "+=360", duration: loopDuration, ease: "none" },
            0,
          );

          if (totalFrames) {
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

          const svgEl =
            iconSvgRef.current ||
            anim?.renderer?.svgElement ||
            iconRef.current?.querySelector?.("svg");

          const totalFrames = anim.totalFrames || 0;
          const currentFrame = anim.currentFrame ?? 0;
          const targetFrame =
            totalFrames && currentFrame < totalFrames * 0.5
              ? 0
              : totalFrames - 1;
          const frameState = { frame: currentFrame };

          const currentRotation = svgEl
            ? Number(gsap.getProperty(svgEl, "rotation")) || 0
            : 0;
          const normalized = ((currentRotation % 360) + 360) % 360;
          const base = currentRotation - normalized;
          const cand0 = base;
          const cand360 = base + 360;
          const targetRotation =
            Math.abs(cand0 - currentRotation) <
            Math.abs(cand360 - currentRotation)
              ? cand0
              : cand360;

          hideTweenRef.current?.kill?.();
          const tl = gsap.timeline({
            defaults: { duration: 0.6, ease: "expo.out", overwrite: "auto" },
          });

          if (totalFrames) {
            tl.to(
              frameState,
              {
                frame: targetFrame,
                onUpdate: () => {
                  anim.goToAndStop(frameState.frame, true);
                },
              },
              0,
            );
          } else {
            anim.goToAndStop(0, true);
          }

          if (svgEl) {
            tl.to(svgEl, { rotation: targetRotation }, 0);
          }

          hideTweenRef.current = tl;
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
        "max-[1099px]:h-auto max-[1099px]:min-h-[calc(var(--vh,1vh)*100)] max-[1099px]:overflow-visible",
      )}
    >
      <div
        aria-hidden="true"
        className="f-bg absolute inset-8 rounded-[0.4rem] bg-white/10 max-[1099px]:inset-4"
      />

      <div className="f-inner absolute inset-8 z-1 flex h-[calc(100%-4rem)] w-[calc(100%-4rem)] flex-col items-start overflow-hidden rounded-[0.4rem] max-[1099px]:static max-[1099px]:mx-4 max-[1099px]:my-4 max-[1099px]:h-auto max-[1099px]:w-auto max-[1099px]:overflow-visible">
        <div className="f-top flex w-full justify-between max-[1099px]:flex-col max-[1099px]:gap-16">
          <div className="f-left mt-[4.4rem] ml-16 flex max-[1099px]:m-0 max-[1099px]:w-full max-[1099px]:grid max-[1099px]:grid-cols-2 max-[1099px]:gap-14 max-[1099px]:p-[2rem_2rem_0] max-[699px]:grid-cols-1">
            <div className="f-social mr-48 max-[1099px]:mr-0">
              <h6 className="links-title mb-[2.4rem] font-heading text-[1.6rem] opacity-60">
                {dropdownNav?.name || "Services"}
              </h6>
              <div className="space-y-2">
                {(dropdownNav?.dropdown || []).map((item) => (
                  <Link
                    key={item.slug}
                    href={`/services/${item.slug}`}
                    aria-label={item.name}
                    className={cn(
                      "link relative block w-fit text-[1.5rem] leading-[120%] text-light/50 transition-opacity duration-600 ease-ease hover:text-light hover:opacity-100",
                      "after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:bg-current after:scale-x-0 after:origin-right after:transition-transform after:duration-1400 after:ease-[cubic-bezier(.19,1,.22,1)]",
                      "hover:after:scale-x-100 hover:after:origin-left",
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
            <div className="f-menu max-[1099px]:w-full">
              <h6 className="links-title mb-[2.4rem] font-heading text-[1.6rem] opacity-60">
                Quick Links
              </h6>
              <div className="space-y-2">
                {siteIndexLinks.map((link) => (
                  <Link
                    key={`${link.label}-${link.href}`}
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
              <h6 className="links-title mt-12 mb-[2.4rem] font-heading text-[1.6rem] opacity-60">
                Legal &amp; Privacy
              </h6>
              <div className="space-y-2">
                {[
                  { label: "Privacy Policy", href: "/legal/privacy-policy" },
                  {
                    label: "Terms & Conditions",
                    href: "/legal/terms-and-conditions",
                  },
                ].map((link) => (
                  <Link
                    key={`${link.label}-${link.href}`}
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
            </div>
          </div>

          <div className="f-right mt-[2.4rem] mr-8 w-176 max-[1099px]:m-0 max-[1099px]:w-full max-[1099px]:p-[0_2rem_2rem]">
            <Button
              href="/contact-us"
              variant="magnetic"
              tone="green"
              className="max-[1099px]:min-h-40"
            >
              Contact Us
            </Button>
            <div className="f-contact mt-10 flex justify-between pr-8 max-[1099px]:flex-col max-[1099px]:gap-12 max-[1099px]:pr-0">
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
                      href={phoneContact?.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={phoneContact?.name || "Phone"}
                      className={cn(
                        "contact-link relative z-1 inline-block overflow-hidden text-light",
                        "after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:bg-current after:scale-x-0 after:origin-right after:transition-transform after:duration-1400 after:ease-[cubic-bezier(.19,1,.22,1)]",
                        "hover:after:scale-x-100 hover:after:origin-left",
                      )}
                    >
                      {phoneContact?.value}
                    </a>
                  </div>

                  <div className="contact-link-wrapper mb-4 flex items-start">
                    <span
                      aria-hidden="true"
                      className="contact-bullet mt-4 mr-4 block h-[0.4rem] w-[0.4rem] rotate-45 bg-light"
                    />
                    <a
                      href={emailContact?.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={emailContact?.name || "Email"}
                      className={cn(
                        "contact-link relative z-1 inline-block overflow-hidden text-light",
                        "after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:bg-current after:scale-x-0 after:origin-right after:transition-transform after:duration-1400 after:ease-[cubic-bezier(.19,1,.22,1)]",
                        "hover:after:scale-x-100 hover:after:origin-left",
                      )}
                    >
                      {emailContact?.value}
                    </a>
                  </div>
                </div>
              </div>

              <div className="font-heading max-[1099px]:order-1 max-[1099px]:mb-12">
                <div className="flex flex-col items-start gap-2">
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
                      <span className="inline-flex items-center gap-4">
                        {social.Icon && (
                          <social.Icon className="h-6 w-6 text-current" />
                        )}
                        {social.label}
                      </span>
                    </a>
                  ))}
                </div>
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
              overlayActive && "text-primary",
            )}
          />
        </div>

        <div className="f-bottom mt-auto w-full p-8">
          <div ref={logoWrapperRef}>
            <EstrelaFooterLogo className="f-logo block w-full h-full text-light" />
          </div>
        </div>

        <EstrelaFooterOverlay active={overlayActive} />
      </div>
    </footer>
  );
};

export default Footer;
