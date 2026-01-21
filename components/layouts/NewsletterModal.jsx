"use client";

import gsap from "gsap";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

import { cn } from "@/utils/cn";
import { ensureGsap } from "@/utils/gsap";

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

const splitLines = (element) => {
  if (!element) return { revert: () => {}, inlines: [] };

  const originalText = element.textContent || "";
  const words = originalText.trim().split(/\s+/).filter(Boolean);
  element.textContent = "";

  words.forEach((word, index) => {
    const span = document.createElement("span");
    span.className = "word inline-block";
    span.textContent = word + (index === words.length - 1 ? "" : "\u00A0");
    element.appendChild(span);
  });

  const wordEls = Array.from(element.querySelectorAll(".word"));
  if (!wordEls.length) return { revert: () => {}, inlines: [] };

  const lines = [];
  let currentLine = [];
  let currentTop = null;

  wordEls.forEach((wordEl) => {
    const top = wordEl.offsetTop;
    if (currentTop === null) currentTop = top;

    if (Math.abs(top - currentTop) > 2) {
      lines.push(currentLine);
      currentLine = [];
      currentTop = top;
    }

    currentLine.push(wordEl);
  });

  if (currentLine.length) lines.push(currentLine);

  const frag = document.createDocumentFragment();
  const inlines = [];

  lines.forEach((lineWords) => {
    const line = document.createElement("span");
    line.className = "line block relative overflow-hidden";

    const inner = document.createElement("span");
    inner.className = "line-inner block relative will-change-transform";
    lineWords.forEach((w) => inner.appendChild(w));
    line.appendChild(inner);
    frag.appendChild(line);
    inlines.push(inner);
  });

  element.textContent = "";
  element.appendChild(frag);

  return {
    inlines,
    revert: () => {
      element.textContent = originalText;
    },
  };
};

const NewsletterModal = ({ open = false, onClose }) => {
  const rootRef = useRef(null);
  const textRef = useRef(null);
  const formRef = useRef(null);
  const splitRef = useRef(null);

  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("newsletter-active", open);
    return () => document.documentElement.classList.remove("newsletter-active");
  }, [open]);

  useLayoutEffect(() => {
    ensureGsap();

    const root = rootRef.current;
    const textEl = textRef.current;
    if (!root || !textEl) return;

    const mm = gsap.matchMedia();
    const ctx = gsap.context(() => {
      mm.add("(max-width: 1099px)", () => {
        splitRef.current?.revert?.();
        splitRef.current = splitLines(textEl);
        return () => {
          splitRef.current?.revert?.();
          splitRef.current = null;
        };
      });
    }, root);

    return () => {
      ctx.revert();
      mm.revert();
    };
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();
    const form = formRef.current;
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
        onClose?.();
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      ref={rootRef}
      aria-hidden={!open}
      className={cn(
        "newsletter-modal fixed inset-0 z-12 bg-dark",
        "transition-[clip-path,visibility] duration-800 ease-ease",
        "[clip-path:inset(0_0_100%_0)]",
        "min-[1100px]:hidden",
        open
          ? "visible pointer-events-auto duration-1000 [clip-path:inset(0_0_0%_0)]"
          : "invisible pointer-events-none",
      )}
    >
      <div className="newsletter-modal-inner absolute inset-0 p-8">
        <button
          type="button"
          className={cn(
            "newsletter-header group relative inline-flex h-18 items-center px-8",
            "rounded-t-[0.4rem]",
            "font-heading text-[1.6rem] leading-none text-light",
            "origin-bottom-left",
          )}
          aria-label="Close newsletter signup"
          onClick={onClose}
        >
          <span
            aria-hidden="true"
            className="newsletter-header-bg absolute inset-0 rounded-t-[0.4rem] bg-[#1b1b1b]"
          />
          <span className="newsletter-title relative">Newsletter signup</span>
          <span className="newsletter-close relative ml-4 h-[0.9rem] w-[0.9rem]">
            <CloseIcon />
          </span>
        </button>

        <div className="newsletter relative overflow-hidden">
          <div className="newsletter-bg absolute inset-0 rounded-b-[0.4rem] bg-[#1b1b1b]" />

          <div className="newsletter-inner relative">
            <p
              ref={textRef}
              className={cn(
                "newsletter-text font-body text-[1.6rem] leading-[140%] text-light",
                "px-8 pt-[2.8rem] pb-32",
              )}
            >
              Join our newsletter for fresh updates and exclusive studio
              insights.
            </p>

            <form
              ref={formRef}
              className="newsletter-form relative"
              action="/api/newsletter"
              method="POST"
              onSubmit={onSubmit}
            >
              <label className="form-label block">
                <span className="form-label-text sr-only">First name</span>
                <input
                  className={cn(
                    "form-input form-input-text block w-full bg-transparent",
                    "h-[6.2rem] px-8 pb-2",
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
                <span className="form-label-text sr-only">Last name</span>
                <input
                  className={cn(
                    "form-input form-input-text block w-full bg-transparent",
                    "h-[6.2rem] px-8 pb-2",
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
                <span className="form-label-text sr-only">Email Address</span>
                <input
                  className={cn(
                    "form-input form-input-text block w-full bg-transparent",
                    "h-[6.2rem] px-8 pb-2",
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
  );
};

export default NewsletterModal;
