"use client";

import { useLenis } from "lenis/react";
import { useEffect, useMemo, useRef, useState } from "react";

import Button from "@/components/ui/Button";
import { cn } from "@/utils/cn";

const Toast = ({ message, error, active }) => {
  return (
    <div
      className={cn(
        "fixed bottom-[4rem] left-[2rem] z-[90] w-[calc(100%-4rem)]",
        "transition-transform duration-1000 ease-ease",
        active ? "translate-y-0" : "translate-y-[calc(110%+4rem)]",
      )}
      aria-live="polite"
      aria-atomic="true"
    >
      <div
        className={cn(
          "flex h-[5rem] items-center rounded-[0.4rem] bg-green px-[3rem] text-dark",
          error && "bg-yellow",
          "max-[1099px]:h-auto max-[1099px]:p-[2rem]",
        )}
      >
        {message}
      </div>
    </div>
  );
};

export default function ContactForm() {
  const formRef = useRef(null);
  const tsInputRef = useRef(null);

  const lenis = useLenis();

  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState({
    active: false,
    message: "",
    error: false,
  });

  const showToast = useMemo(() => {
    let timer = null;
    return (message, error = false) => {
      if (timer) window.clearTimeout(timer);
      setToast({ active: true, message, error });
      timer = window.setTimeout(() => {
        setToast((t) => ({ ...t, active: false }));
      }, 4200);
    };
  }, []);

  useEffect(() => {
    if (tsInputRef.current) {
      tsInputRef.current.value = String(Date.now());
    }
  }, []);

  useEffect(() => {
    const form = formRef.current;
    if (!form) return;
    if (window.matchMedia("(max-width: 1099px)").matches) return;

    const stop = () => lenis?.stop?.();
    const start = () => lenis?.start?.();

    form.addEventListener("pointerdown", stop, { passive: true });
    form.addEventListener("pointerup", start, { passive: true });
    form.addEventListener("pointercancel", start, { passive: true });
    form.addEventListener("submit", start);

    return () => {
      form.removeEventListener("pointerdown", stop);
      form.removeEventListener("pointerup", start);
      form.removeEventListener("pointercancel", start);
      form.removeEventListener("submit", start);
    };
  }, [lenis]);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;

    const form = formRef.current;
    if (!form) return;

    setSubmitting(true);
    try {
      const res = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
      });

      if (!res.ok) {
        showToast(
          "Oops, something went wrong. Please refresh the page and try again.",
          true,
        );
        return;
      }

      form.reset();
      if (tsInputRef.current) tsInputRef.current.value = String(Date.now());
      showToast("Thanks for getting in touch! We'll get back to you shortly.");
    } catch {
      showToast(
        "Oops, something went wrong. Please refresh the page and try again.",
        true,
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <section
        data-theme="dark"
        className="w-full border-t border-white/15 bg-dark px-[2rem] pb-[10rem] pt-[4rem] text-light min-[1100px]:mt-[10rem] min-[1100px]:px-[4rem]"
      >
        <h2 className="mb-[3rem] w-[24.8rem] text-[2.6rem] leading-[120%] min-[1100px]:mb-[4rem] min-[1100px]:ml-[2rem] min-[1100px]:w-auto min-[1100px]:text-[2.4rem]">
          We would love to hear from you.
        </h2>

        <form
          ref={formRef}
          className={cn(submitting && "loading")}
          action="/api/contact"
          method="POST"
          onSubmit={onSubmit}
        >
          <label className="sr-only" aria-hidden="true">
            <input type="text" name="extra" tabIndex={-1} autoComplete="off" />
          </label>

          <input ref={tsInputRef} type="hidden" name="ts" defaultValue="" />

          <div className="min-[1100px]:mb-[2rem] min-[1100px]:grid min-[1100px]:grid-cols-2 min-[1100px]:gap-[2rem]">
            <label>
              <span className="sr-only">First name</span>
              <input
                className="mb-[1rem] h-[8rem] w-full rounded-[0.4rem] border border-white/10 bg-[#131313] px-[3rem] text-light outline-none transition-colors duration-800 ease-ease placeholder:text-white/30 focus:border-white/30 min-[1100px]:mb-0"
                type="text"
                name="first_name"
                placeholder="First name*"
                required
              />
            </label>

            <label>
              <span className="sr-only">Last name</span>
              <input
                className="mb-[1rem] h-[8rem] w-full rounded-[0.4rem] border border-white/10 bg-[#131313] px-[3rem] text-light outline-none transition-colors duration-800 ease-ease placeholder:text-white/30 focus:border-white/30 min-[1100px]:mb-0"
                type="text"
                name="last_name"
                placeholder="Last name*"
                required
              />
            </label>
          </div>

          <div className="min-[1100px]:mb-[2rem] min-[1100px]:grid min-[1100px]:grid-cols-2 min-[1100px]:gap-[2rem]">
            <label>
              <span className="sr-only">Company name*</span>
              <input
                className="mb-[1rem] h-[8rem] w-full rounded-[0.4rem] border border-white/10 bg-[#131313] px-[3rem] text-light outline-none transition-colors duration-800 ease-ease placeholder:text-white/30 focus:border-white/30 min-[1100px]:mb-0"
                type="text"
                name="company"
                placeholder="Company name*"
                required
              />
            </label>

            <label>
              <span className="sr-only">Company email*</span>
              <input
                className="mb-[1rem] h-[8rem] w-full rounded-[0.4rem] border border-white/10 bg-[#131313] px-[3rem] text-light outline-none transition-colors duration-800 ease-ease placeholder:text-white/30 focus:border-white/30 min-[1100px]:mb-0"
                type="email"
                name="email"
                placeholder="Company email*"
                required
              />
            </label>
          </div>

          <div className="min-[1100px]:mb-[2rem]">
            <label>
              <span className="sr-only">Company website url*</span>
              <input
                className="mb-[1rem] h-[8rem] w-full rounded-[0.4rem] border border-white/10 bg-[#131313] px-[3rem] text-light outline-none transition-colors duration-800 ease-ease placeholder:text-white/30 focus:border-white/30"
                type="text"
                name="company_website_url"
                placeholder="Company website url*"
                required
              />
            </label>
          </div>

          <div className="mt-[4rem]">
            <label>
              <span className="mb-[2.4rem] ml-[3rem] block text-[1.8rem] leading-[140%] max-[1099px]:mb-[2rem] max-[1099px]:ml-0 max-[1099px]:w-[28rem]">
                Tell us about the project (Scope, Timeline, Budget):*
              </span>
              <textarea
                className="h-[22rem] w-full resize-none rounded-[0.4rem] border border-white/10 bg-[#131313] px-[3rem] py-[2.6rem] text-light outline-none transition-colors duration-800 ease-ease placeholder:text-white/30 focus:border-white/30 leading-[140%]"
                name="message"
                placeholder="Type us a message"
                required
              />
            </label>
          </div>

          <div className="mb-[3rem] mt-[9rem] max-[1099px]:mb-[2rem] max-[1099px]:mt-[6rem]">
            <label className="group inline-flex cursor-pointer items-center min-[1100px]:ml-[3rem]">
              <input name="newsletter" type="checkbox" className="peer sr-only" />

              <span className="relative mr-[1.4rem] h-[2.5rem] w-[2.5rem] rounded-[1rem] border border-white/50 transition-colors duration-1000 ease-ease group-hover:border-white">
                <span className="absolute left-[0.65rem] top-[0.65rem] h-[1.2rem] w-[1.2rem] rounded-[0.4rem] bg-light opacity-0 transition-opacity duration-800 ease-ease peer-checked:opacity-100" />
              </span>

              <span className="text-[1.8rem] leading-[140%]">
                Yes, sign me up to newsletter
              </span>
            </label>
          </div>

          <div
            className={cn(
              "min-[1100px]:ml-[2rem]",
              submitting && "pointer-events-none opacity-40",
            )}
          >
            <Button
              type="submit"
              variant="magnetic"
              tone="green"
              className="h-[18rem] w-full min-h-0 min-[1100px]:w-[67.5rem]"
            >
              Submit Form
            </Button>
          </div>
        </form>
      </section>

      <Toast {...toast} />
    </>
  );
}
