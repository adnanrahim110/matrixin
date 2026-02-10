"use client";

import gsap from "gsap";
import Link from "next/link";
import { useLayoutEffect, useMemo, useRef } from "react";

import ContactForm from "@/components/contact/ContactForm";
import Faqs from "@/components/home/Faqs";
import PreFooter from "@/components/home/PreFooter";
import Testimonials from "@/components/home/Testimonials";
import Button from "@/components/ui/Button";
import { cn } from "@/utils/cn";
import { ensureGsap } from "@/utils/gsap";
import { usePrefersReducedMotion } from "@/utils/usePrefersReducedMotion";

import BlogBlocksRenderer from "./BlogBlocksRenderer";
import BlogCard from "./BlogCard";

const formatDate = (value) => {
  try {
    const d = new Date(value);
    if (Number.isNaN(d.getTime())) return value;
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "2-digit",
    }).format(d);
  } catch {
    return value;
  }
};

export default function BlogDetailPage({ blog, related = [] }) {
  const reducedMotion = usePrefersReducedMotion();
  const rootRef = useRef(null);

  const hasFaqs = useMemo(
    () => Array.isArray(blog?.faqs) && blog.faqs.length,
    [blog],
  );
  const testimonials = blog?.testimonials;
  const hasTestimonials =
    testimonials &&
    Array.isArray(testimonials.items) &&
    testimonials.items.length > 0;

  useLayoutEffect(() => {
    ensureGsap();
    const root = rootRef.current;
    if (!root) return;
    if (reducedMotion) return;

    const ctx = gsap.context(() => {
      const reveals = Array.from(root.querySelectorAll("[data-reveal]"));
      reveals.forEach((el) => {
        gsap
          .timeline({
            scrollTrigger: { trigger: el, start: "top+=25% bottom" },
          })
          .moveBlur(el, { yPercent: 90 });
      });

      const groups = Array.from(root.querySelectorAll("[data-reveal-group]"));
      groups.forEach((group) => {
        const items = Array.from(group.querySelectorAll("[data-reveal-item]"));
        if (!items.length) return;
        gsap.set(items, { yPercent: 18, autoAlpha: 0, filter: "blur(1.2rem)" });
        gsap
          .timeline({
            scrollTrigger: { trigger: group, start: "top+=20% bottom" },
          })
          .to(items, {
            yPercent: 0,
            autoAlpha: 1,
            filter: "blur(0rem)",
            duration: 1.1,
            ease: "power3.out",
            stagger: 0.06,
          });
      });

      const parallaxEls = Array.from(root.querySelectorAll("[data-parallax]"));
      parallaxEls.forEach((el) => {
        const y = Number.parseFloat(el.getAttribute("data-parallax-y") || "10");
        const img = el.querySelector("img");
        const target = img || el;
        gsap.fromTo(
          target,
          { yPercent: -y },
          {
            yPercent: y,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
              invalidateOnRefresh: true,
              refreshPriority: -1,
            },
          },
        );
      });
    }, root);

    return () => ctx.revert();
  }, [reducedMotion]);

  if (!blog) return null;

  return (
    <main ref={rootRef} className="relative w-full bg-light text-dark">
      <article className="relative">
        <header
          data-theme="light"
          className="relative border-b border-dark/10 px-8 pt-70"
        >
          <div className="mx-auto w-full max-w-480 pb-18">
            <nav
              aria-label="Breadcrumb"
              className="text-[1.4rem] uppercase tracking-[0.12em]"
            >
              <ol className="flex flex-wrap items-center gap-3 text-dark/60">
                <li>
                  <Link
                    href="/"
                    className="hover:text-dark transition-colors duration-300"
                  >
                    Home
                  </Link>
                </li>
                <li aria-hidden="true" className="opacity-40">
                  /
                </li>
                <li>
                  <Link
                    href="/blogs"
                    className="hover:text-dark transition-colors duration-300"
                  >
                    Blog
                  </Link>
                </li>
                <li aria-hidden="true" className="opacity-40">
                  /
                </li>
                <li className="text-dark/80">{blog.category}</li>
              </ol>
            </nav>

            <div className="mt-10 grid gap-6 items-end">
              <div className="">
                <div
                  data-reveal
                  className="flex flex-wrap items-center gap-4 text-[1.3rem] uppercase tracking-widest text-dark/60"
                >
                  <span className="inline-flex items-center gap-3">
                    <span className="h-[0.6rem] w-[0.6rem] rotate-45 rounded-[0.12rem] bg-primary" />
                    {blog.category}
                  </span>
                  <span aria-hidden="true" className="opacity-50">
                    •
                  </span>
                  <time dateTime={blog.publishedAt}>
                    {formatDate(blog.publishedAt)}
                  </time>
                  {blog.readingTime && (
                    <>
                      <span aria-hidden="true" className="opacity-50">
                        •
                      </span>
                      <span className="normal-case tracking-normal text-[1.4rem] text-dark/60">
                        {blog.readingTime}
                      </span>
                    </>
                  )}
                </div>

                <h1
                  data-reveal
                  className={cn(
                    "mt-8 font-heading text-[8rem] leading-[105%] tracking-[-0.02em]",
                    "max-[1099px]:text-[6.4rem] max-[1099px]:leading-[102%]",
                  )}
                >
                  {blog.title}
                </h1>
                <div className="grid grid-cols-12 gap-6 items-start mt-18">
                  <p
                    data-reveal
                    className="col-span-8 max-[1099px]:col-span-12 max-w-312 text-[2.2rem] leading-[175%] text-dark/70 max-[1099px]:text-[2rem]"
                  >
                    {blog.excerpt}
                  </p>
                  <div className="col-span-4 max-[1099px]:col-span-12">
                    <div
                      data-reveal
                      className="rounded-[0.6rem] border border-dark/10 bg-white p-8 shadow-[0_1.6rem_5rem_rgba(2,2,2,0.06)]"
                    >
                      <p className="text-[1.4rem] uppercase tracking-[0.12em] text-dark/60">
                        Written by
                      </p>
                      <div className="mt-6 flex items-center gap-6">
                        <div className="relative h-20 w-20 overflow-hidden rounded-full border border-dark/10 bg-dark/5">
                          <img
                            src={blog.author?.avatar}
                            alt={blog.author?.name || ""}
                            className="absolute inset-0 h-full w-full object-cover"
                            loading="lazy"
                          />
                        </div>
                        <div className="min-w-0">
                          <p className="font-heading text-[2.2rem] leading-[110%]">
                            {blog.author?.name}
                          </p>
                          <p className="mt-2 text-dark/60">
                            {blog.author?.role}
                          </p>
                        </div>
                      </div>
                      {Array.isArray(blog.tags) && blog.tags.length > 0 && (
                        <div className="mt-8 flex flex-wrap gap-3">
                          {blog.tags.slice(0, 6).map((t) => (
                            <span
                              key={t}
                              className="inline-flex h-12 items-center rounded-[0.4rem] border border-dark/10 bg-dark/5 px-5 text-[1.3rem] uppercase tracking-widest text-dark/70"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        <section
          data-theme="light"
          className="relative border-b border-dark/10 px-8 py-18"
        >
          <div className="mx-auto w-full max-w-480">
            <figure
              data-parallax
              data-parallax-y="10"
              className="overflow-hidden rounded-[0.8rem] border border-dark/10 bg-dark/5"
            >
              <div className="relative aspect-16/8 w-full overflow-hidden max-[1099px]:aspect-16/10">
                <img
                  src={blog.cover?.src}
                  alt={blog.cover?.alt || ""}
                  className="absolute inset-0 h-full w-full object-cover will-change-transform"
                  loading="lazy"
                />
              </div>
              {blog.cover?.caption && (
                <figcaption className="px-8 py-6 text-[1.4rem] leading-[170%] text-dark/60">
                  {blog.cover.caption}
                </figcaption>
              )}
            </figure>
          </div>
        </section>

        <section data-theme="light" className="relative px-8 py-24">
          <div className="mx-auto w-full max-w-480">
            <div className="grid grid-cols-12 gap-6 items-start">
              <div className="col-span-8 max-[1099px]:col-span-12">
                <div className="max-w-312">
                  <BlogBlocksRenderer blocks={blog.contentBlocks} />
                </div>
              </div>

              <aside className="col-span-4 max-[1099px]:col-span-12">
                <div className="sticky top-[calc(var(--header-height)+2rem)] max-[1099px]:static">
                  <div className="rounded-[0.6rem] border border-dark/10 bg-dark/5 p-10">
                    <p className="text-[1.4rem] uppercase tracking-[0.12em] text-dark/60">
                      Key takeaways
                    </p>
                    <ul className="mt-7 grid gap-5">
                      {(blog.keyTakeaways || []).slice(0, 5).map((item) => (
                        <li key={item} className="flex gap-5 text-dark/80">
                          <span
                            aria-hidden="true"
                            className="mt-[0.9rem] h-[0.9rem] w-[0.9rem] rotate-45 rounded-[0.12rem] bg-primary"
                          />
                          <span className="leading-[170%]">{item}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-10 flex items-center gap-4">
                      <Button href="/contact-us" className="h-16" tone="dark">
                        Work with us
                      </Button>
                      <Button
                        href="/services/web-development-services"
                        className="h-16"
                        tone="green"
                      >
                        Explore services
                      </Button>
                    </div>
                  </div>

                  <div className="mt-6 rounded-[0.6rem] border border-dark/10 bg-white p-10 shadow-[0_1.6rem_5rem_rgba(2,2,2,0.06)]">
                    <p className="text-[1.4rem] uppercase tracking-[0.12em] text-dark/60">
                      Updated
                    </p>
                    <p className="mt-5 font-heading text-[2.6rem] leading-[110%]">
                      {formatDate(blog.updatedAt || blog.publishedAt)}
                    </p>
                    <p className="mt-4 text-dark/60">
                      Built with semantic structure, smooth motion, and a
                      premium editorial rhythm.
                    </p>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>

        <section
          data-theme="dark"
          className="relative border-t border-white/10 bg-dark px-8 py-24 text-light"
        >
          <div className="mx-auto w-full max-w-480">
            <div className="grid grid-cols-12 gap-6 items-end">
              <div className="col-span-7 max-[1099px]:col-span-12">
                <p
                  data-reveal
                  className="text-[1.4rem] uppercase tracking-[0.12em] text-light/60"
                >
                  Next step
                </p>
                <h2
                  data-reveal
                  className="mt-4 font-heading text-[5.6rem] leading-[110%] max-[1099px]:text-[3.8rem]"
                >
                  Want this level of craft on your site?
                </h2>
                <p
                  data-reveal
                  className="mt-6 max-w-5xl leading-[170%] text-light/70"
                >
                  We design and build editorial, premium websites with clean
                  structure, fast performance, and subtle motion.
                </p>
              </div>
              <div className="col-span-5 max-[1099px]:col-span-12">
                <div
                  data-reveal
                  className="rounded-[0.6rem] border border-white/10 bg-white/5 p-10"
                >
                  <div className="flex items-center gap-4">
                    <span
                      aria-hidden="true"
                      className="h-4 w-4 rotate-45 rounded-[0.12rem] bg-primary"
                    />
                    <p className="text-[1.4rem] uppercase tracking-[0.12em] text-light/60">
                      Quick contact
                    </p>
                  </div>
                  <p className="mt-6 text-light/70">
                    Tell us what you’re building and we’ll respond with next
                    steps and a clean scope.
                  </p>
                  <div className="mt-10 flex items-center gap-4">
                    <Button href="/contact-us" className="h-16" tone="green">
                      Contact us
                    </Button>
                    <Button href="/work" className="h-16" tone="dark">
                      View work
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {hasTestimonials && (
          <section aria-label="Testimonials">
            <Testimonials
              title={testimonials.title}
              items={testimonials.items}
            />
          </section>
        )}

        {hasFaqs && (
          <Faqs light title={blog.faqsTitle || "FAQs"} items={blog.faqs} />
        )}

        <section
          data-theme="light"
          className="relative border-t border-dark/10 px-8 py-24"
        >
          <div className="mx-auto w-full max-w-480">
            <div data-reveal className="flex items-end justify-between gap-6">
              <div>
                <p className="text-[1.4rem] uppercase tracking-[0.12em] text-dark/60">
                  Related
                </p>
                <h2 className="mt-4 font-heading text-[4.4rem] leading-[110%] max-[1099px]:text-[3.2rem]">
                  More articles
                </h2>
              </div>
              <Button href="/blogs" className="h-16" tone="dark">
                All blogs
              </Button>
            </div>

            <div data-reveal-group className="mt-16 grid grid-cols-12 gap-6">
              {(related || []).map((b) => (
                <div
                  key={b.slug}
                  data-reveal-item
                  className="col-span-4 max-[1099px]:col-span-12"
                >
                  <BlogCard blog={b} variant="compact" />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section aria-label="Contact">
          <ContactForm />
        </section>

        <div className="bg-dark pt-24">
          <PreFooter />
        </div>
      </article>
    </main>
  );
}
