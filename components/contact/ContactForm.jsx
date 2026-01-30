"use client";

import { useLenis } from "lenis/react";
import { useEffect, useMemo, useRef, useState } from "react";

import BorderGlowCanvas from "@/components/ui/BorderGlowCanvas";
import Button from "@/components/ui/Button";
import { contactDetails } from "@/constants";
import { cn } from "@/utils/cn";
import { usePrefersReducedMotion } from "@/utils/usePrefersReducedMotion";

const Toast = ({ message, error, active }) => {
  return (
    <div
      className={cn(
        "fixed bottom-16 left-8 z-90 w-[calc(100%-4rem)]",
        "transition-transform duration-1000 ease-ease",
        active ? "translate-y-0" : "translate-y-[calc(110%+4rem)]",
      )}
      aria-live="polite"
      aria-atomic="true"
    >
      <div
        className={cn(
          "pointer-events-auto flex items-center gap-5 rounded-[0.6rem] border px-8 py-6",
          "bg-dark/80 text-light backdrop-blur-[1.2rem]",
          error ? "border-yellow/40" : "border-green/40",
          "shadow-[0_2.4rem_8rem_rgba(0,0,0,0.35)]",
        )}
      >
        <span
          aria-hidden="true"
          className={cn(
            "h-4 w-4 rotate-45 rounded-[0.12rem]",
            error ? "bg-yellow" : "bg-green",
          )}
        />
        {message}
      </div>
    </div>
  );
};

export default function ContactForm() {
  const formRef = useRef(null);
  const tsInputRef = useRef(null);

  const lenis = useLenis();
  const reducedMotion = usePrefersReducedMotion();
  const [emailContact, phoneContact] = contactDetails;

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
        className={cn(
          "relative w-full bg-dark px-8 py-24 text-light",
          "min-[1100px]:py-46",
        )}
      >
        <div className="mx-auto w-full max-w-480">
          <div className="grid grid-cols-[auto_52%] max-[1099px]:grid-cols-1 gap-20 items-start">
            <header className="w-full">
              <p className="text-[1.4rem] uppercase tracking-[0.12em] text-light/60">
                Contact
              </p>
              <h2 className="mt-8 font-heading text-[6rem] leading-[105%] tracking-[-0.02em] max-[1099px]:text-[4.2rem]">
                Let&apos;s build something clean, fast, and premium.
              </h2>
              <p className="mt-8 max-w-216 leading-[170%] text-light/70">
                Share a few details and we’ll come back with clear next steps, a
                practical scope, and a timeline that makes sense.
              </p>

              <div className="mt-16 grid gap-6">
                <a
                  href={emailContact?.href}
                  className={cn(
                    "group flex items-start gap-5 rounded-[0.6rem] border border-white/10 bg-white/5 p-8",
                    "transition-[background-color,border-color] duration-600 ease-ease hover:bg-white/10 hover:border-white/20",
                  )}
                >
                  <span
                    aria-hidden="true"
                    className="mt-4 h-[0.6rem] w-[0.6rem] rotate-45 rounded-[0.12rem] bg-primary"
                  />
                  <div className="min-w-0">
                    <p className="text-[1.4rem] uppercase tracking-[0.12em] text-light/60">
                      Email
                    </p>
                    <p className="mt-3 font-heading text-[2.4rem] leading-[110%]">
                      {emailContact?.value}
                    </p>
                    <p className="mt-4 text-light/70">
                      Send a brief — or just say hello.
                    </p>
                  </div>
                </a>

                <a
                  href={phoneContact?.href}
                  className={cn(
                    "group flex items-start gap-5 rounded-[0.6rem] border border-white/10 bg-white/5 p-8",
                    "transition-[background-color,border-color] duration-600 ease-ease hover:bg-white/10 hover:border-white/20",
                  )}
                >
                  <span
                    aria-hidden="true"
                    className="mt-4 h-[0.6rem] w-[0.6rem] rotate-45 rounded-[0.12rem] bg-green"
                  />
                  <div className="min-w-0">
                    <p className="text-[1.4rem] uppercase tracking-[0.12em] text-light/60">
                      Phone
                    </p>
                    <p className="mt-3 font-heading text-[2.4rem] leading-[110%]">
                      {phoneContact?.value}
                    </p>
                    <p className="mt-4 text-light/70">
                      Prefer a call? We’re happy to chat.
                    </p>
                  </div>
                </a>
              </div>
            </header>

            <div className="w-full">
              <form
                ref={formRef}
                className={cn(
                  "relative overflow-hidden rounded-[0.8rem] border border-white/10 bg-white/5 p-10",
                  "max-[1099px]:p-8",
                )}
                action="/api/contact"
                method="POST"
                onSubmit={onSubmit}
              >
                <BorderGlowCanvas
                  enabled={!reducedMotion}
                  color="244, 122, 35"
                  size={160}
                />

                <div className="relative z-3">
                  <div className="flex flex-wrap items-center justify-between gap-6 border-b border-white/10 pb-6">
                    <p className="text-[1.4rem] uppercase tracking-[0.12em] text-light/60">
                      Project inquiry
                    </p>
                    <p className="text-[1.4rem] text-light/60">
                      Fields marked * are required
                    </p>
                  </div>

                  <label className="sr-only" aria-hidden="true">
                    <input
                      type="text"
                      name="extra"
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </label>

                  <input
                    ref={tsInputRef}
                    type="hidden"
                    name="ts"
                    defaultValue=""
                  />

                  <div className="mt-10 grid gap-8">
                    <fieldset className="grid gap-6 grid-cols-2 max-[1099px]:grid-cols-1">
                      <legend className="sr-only">Your details</legend>
                      <input
                        id="contact-first-name"
                        className={cn(
                          "h-20 w-full rounded-[0.4rem] border border-white/10 bg-grey-dark px-8",
                          "text-light outline-none transition-colors duration-600 ease-ease",
                          "placeholder:text-white/30 focus:border-white/25",
                        )}
                        type="text"
                        name="first_name"
                        placeholder="Your first name *"
                        autoComplete="given-name"
                        required
                      />
                      <input
                        id="contact-last-name"
                        className={cn(
                          "h-20 w-full rounded-[0.4rem] border border-white/10 bg-grey-dark px-8",
                          "text-light outline-none transition-colors duration-600 ease-ease",
                          "placeholder:text-white/30 focus:border-white/25",
                        )}
                        type="text"
                        name="last_name"
                        placeholder="Your last name *"
                        autoComplete="family-name"
                        required
                      />
                    </fieldset>

                    <fieldset className="grid gap-6 grid-cols-2 max-[1099px]:grid-cols-1">
                      <legend className="sr-only">
                        Contact Details details
                      </legend>
                      <input
                        id="contact-email"
                        className={cn(
                          "h-20 w-full rounded-[0.4rem] border border-white/10 bg-grey-dark px-8",
                          "text-light outline-none transition-colors duration-600 ease-ease",
                          "placeholder:text-white/30 focus:border-white/25",
                        )}
                        type="email"
                        name="email"
                        placeholder="Your email address *"
                        autoComplete="email"
                        required
                      />
                      <input
                        id="contact-phone"
                        className={cn(
                          "h-20 w-full rounded-[0.4rem] border border-white/10 bg-grey-dark px-8",
                          "text-light outline-none transition-colors duration-600 ease-ease",
                          "placeholder:text-white/30 focus:border-white/25",
                        )}
                        type="text"
                        name="company_phone"
                        placeholder="Your phone number"
                        autoComplete="tel"
                        required
                      />
                    </fieldset>

                    <fieldset className="grid gap-6">
                      <legend className="sr-only">Project details</legend>
                      <textarea
                        id="contact-message"
                        className={cn(
                          "h-70 w-full resize-none rounded-[0.4rem] border border-white/10 bg-grey-dark px-8 py-7",
                          "text-light outline-none transition-colors duration-600 ease-ease",
                          "placeholder:text-white/30 focus:border-white/25",
                          "leading-[170%]",
                        )}
                        name="message"
                        placeholder="Tell us about scope, timeline, budget, and any links we should see."
                        required
                      />
                    </fieldset>
                  </div>

                  <div className="mt-12 flex flex-col gap-10 border-t border-white/10 pt-10">
                    <div
                      className={cn(
                        submitting && "pointer-events-none opacity-60",
                      )}
                    >
                      <Button
                        type="submit"
                        variant="magnetic"
                        tone="green"
                        className="h-50 w-full min-h-0"
                        loading={submitting}
                        disabled={submitting}
                      >
                        Submit form
                      </Button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Toast {...toast} />
    </>
  );
}
