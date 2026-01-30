"use client";

import gsap from "gsap";
import Link from "next/link";
import { useLayoutEffect, useRef } from "react";

import Button from "@/components/ui/Button";
import { cn } from "@/utils/cn";
import { ensureGsap } from "@/utils/gsap";
import { usePrefersReducedMotion } from "@/utils/usePrefersReducedMotion";

const formatDate = (value) => {
  try {
    const d = new Date(value);
    if (Number.isNaN(d.getTime())) return value;
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
    }).format(d);
  } catch {
    return value;
  }
};

export default function BlogCard({ blog, variant = "standard" }) {
  const reducedMotion = usePrefersReducedMotion();
  const cardRef = useRef(null);
  const dotRef = useRef(null);

  useLayoutEffect(() => {
    ensureGsap();
    const card = cardRef.current;
    const dot = dotRef.current;
    if (!card || !dot) return;
    if (reducedMotion) return;
    if (window.matchMedia("(max-width: 1099px)").matches) return;

    const xTo = gsap.quickTo(dot, "x", {
      duration: 0.35,
      ease: "power3.out",
      overwrite: "auto",
    });
    const yTo = gsap.quickTo(dot, "y", {
      duration: 0.35,
      ease: "power3.out",
      overwrite: "auto",
    });

    const onMove = (e) => {
      const b = card.getBoundingClientRect();
      const x = e.clientX - b.left;
      const y = e.clientY - b.top;
      xTo(x);
      yTo(y);
    };

    const onEnter = () =>
      gsap.to(dot, { autoAlpha: 1, duration: 0.2, ease: "none" });
    const onLeave = () => {
      gsap.to(dot, { autoAlpha: 0, duration: 0.2, ease: "none" });
      xTo(card.clientWidth * 0.5);
      yTo(card.clientHeight * 0.5);
    };

    card.addEventListener("mousemove", onMove);
    card.addEventListener("mouseenter", onEnter);
    card.addEventListener("mouseleave", onLeave);
    gsap.set(dot, {
      x: card.clientWidth * 0.5,
      y: card.clientHeight * 0.5,
      autoAlpha: 0,
    });

    return () => {
      card.removeEventListener("mousemove", onMove);
      card.removeEventListener("mouseenter", onEnter);
      card.removeEventListener("mouseleave", onLeave);
    };
  }, [reducedMotion]);

  if (!blog) return null;

  const isFeatured = variant === "featured";
  const isCompact = variant === "compact";

  return (
    <article
      ref={cardRef}
      className={cn(
        "group relative overflow-hidden rounded-[0.4rem] border border-dark/10 bg-transparent",
        "transition-[background-color,transform] duration-700 ease-ease hover:bg-dark/5",
        isFeatured && "grid grid-cols-12 gap-6 p-8 max-[1099px]:block",
        !isFeatured && "p-8",
        isCompact && "p-6",
      )}
    >
      <span
        ref={dotRef}
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute left-0 top-0 z-5 hidden h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full",
          "border border-dark/10 bg-light/90",
          "shadow-[0_0_0_0.1rem_rgba(2,2,2,0.04)]",
          "min-[1100px]:block",
        )}
      >
        <span className="absolute left-1/2 top-1/2 h-[0.6rem] w-[0.6rem] -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-[0.12rem] bg-primary" />
      </span>

      {isFeatured ? (
        <>
          <header className="col-span-5 max-[1099px]:mb-10">
            <div className="flex flex-wrap items-center gap-4 text-[1.3rem] uppercase tracking-widest text-dark/60">
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

            <h2 className="mt-6 font-heading text-[4.4rem] leading-[110%]! max-[1099px]:text-[3.4rem]">
              <Link
                href={`/blogs/${blog.slug}`}
                className="after:absolute after:inset-0"
              >
                {blog.title}
              </Link>
            </h2>

            <p className="mt-5 max-w-208 leading-[170%] text-dark/70">
              {blog.excerpt}
            </p>

            <div className="mt-10 flex items-center gap-6">
              <Button href={`/blogs/${blog.slug}`} className="h-16" tone="dark">
                Read article
              </Button>
              <span className="text-[1.4rem] uppercase tracking-[0.08em] text-dark/50">
                Editorial
              </span>
            </div>
          </header>

          <figure
            data-parallax
            data-parallax-y="8"
            className="col-span-7 overflow-hidden rounded-[0.4rem] border border-dark/10 bg-dark/5"
          >
            <div className="relative aspect-video w-full overflow-hidden">
              <img
                src={blog.cover?.src}
                alt={blog.cover?.alt || ""}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-900 ease-ease will-change-transform group-hover:scale-[1.04]"
                loading="lazy"
              />
            </div>
            {blog.cover?.caption && (
              <figcaption className="px-6 py-5 text-[1.3rem] leading-[160%] text-dark/60">
                {blog.cover.caption}
              </figcaption>
            )}
          </figure>
        </>
      ) : (
        <>
          <header className="relative">
            <div className="flex flex-wrap items-center gap-4 text-[1.2rem] uppercase tracking-widest text-dark/60">
              <span className="inline-flex items-center gap-3">
                <span className="h-2 w-2 rotate-45 rounded-[0.12rem] bg-primary" />
                {blog.category}
              </span>
              <span aria-hidden="true" className="opacity-50">
                •
              </span>
              <time dateTime={blog.publishedAt}>
                {formatDate(blog.publishedAt)}
              </time>
            </div>

            <h2
              className={cn(
                "mt-5 font-heading leading-[110%]!",
                isCompact ? "text-[2.4rem]" : "text-[3.2rem]",
              )}
            >
              <Link
                href={`/blogs/${blog.slug}`}
                className="after:absolute after:inset-0"
              >
                {blog.title}
              </Link>
            </h2>

            {!isCompact && (
              <p className="mt-4 leading-[170%] text-dark/70">{blog.excerpt}</p>
            )}
          </header>

          <figure
            data-parallax
            data-parallax-y="6"
            className={cn(
              "mt-8 overflow-hidden rounded-[0.4rem] border border-dark/10 bg-dark/5",
              isCompact && "mt-6",
            )}
          >
            <div className="relative aspect-16/10 w-full overflow-hidden">
              <img
                src={blog.cover?.src}
                alt={blog.cover?.alt || ""}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-900 ease-ease will-change-transform group-hover:scale-[1.05]"
                loading="lazy"
              />
            </div>
          </figure>

          <div
            className={cn(
              "mt-8 flex items-center justify-between",
              isCompact && "mt-6",
            )}
          >
            <span className="text-[1.4rem] text-dark/60">
              {blog.readingTime || ""}
            </span>
            <span className="text-[1.4rem] uppercase tracking-[0.08em] text-dark/50">
              Read
            </span>
          </div>
        </>
      )}
    </article>
  );
}
