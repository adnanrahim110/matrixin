"use client";

import gsap from "gsap";
import { useLayoutEffect, useMemo, useRef, useState } from "react";

import PreFooter from "@/components/home/PreFooter";
import Button from "@/components/ui/Button";
import { cn } from "@/utils/cn";
import { ensureGsap } from "@/utils/gsap";
import { usePrefersReducedMotion } from "@/utils/usePrefersReducedMotion";

import BlogCard from "./BlogCard";

const unique = (arr) => Array.from(new Set(arr.filter(Boolean)));

export default function BlogIndexPage({ blogs = [] }) {
  const reducedMotion = usePrefersReducedMotion();
  const rootRef = useRef(null);
  const heroRef = useRef(null);

  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = useMemo(() => {
    const cats = unique(blogs.map((b) => b.category));
    return ["All", ...cats];
  }, [blogs]);

  const featured = useMemo(() => blogs[0] || null, [blogs]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return blogs.filter((b) => {
      if (activeCategory !== "All" && b.category !== activeCategory)
        return false;
      if (!q) return true;
      const hay =
        `${b.title} ${b.excerpt} ${(b.tags || []).join(" ")}`.toLowerCase();
      return hay.includes(q);
    });
  }, [blogs, query, activeCategory]);

  const rest = useMemo(() => {
    if (!featured) return filtered;
    return filtered.filter((b) => b.slug !== featured.slug);
  }, [filtered, featured]);

  useLayoutEffect(() => {
    ensureGsap();
    const root = rootRef.current;
    const hero = heroRef.current;
    if (!root || !hero) return;
    if (reducedMotion) return;

    const ctx = gsap.context(() => {
      const reveals = Array.from(root.querySelectorAll("[data-reveal]"));
      reveals.forEach((el) => {
        gsap
          .timeline({
            scrollTrigger: { trigger: el, start: "top+=25% bottom" },
          })
          .moveBlur(el, { yPercent: 80 });
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
        const y = Number.parseFloat(el.getAttribute("data-parallax-y") || "8");
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

  return (
    <main ref={rootRef} className="relative w-full bg-light text-dark">
      <header
        ref={heroRef}
        data-theme="light"
        className="relative border-b border-dark/10 px-8 pt-76"
      >
        <div className="mx-auto w-full max-w-480 pb-24">
          <p
            data-reveal
            className="text-[1.4rem] uppercase tracking-[0.12em] text-dark/60"
          >
            Blogs
          </p>
          <h1
            data-reveal
            className={cn(
              "mt-8 font-heading text-[12.4rem] leading-[92%] tracking-[-0.02em]",
              "max-[1099px]:text-[7.4rem] max-[1099px]:leading-[102%]",
            )}
          >
            Notes on design,
            <br />
            product, and craft.
          </h1>
          <p
            data-reveal
            className="mt-10 max-w-312 leading-[170%] text-dark/70"
          >
            Editorial thinking from the studio — practical systems, UX clarity,
            performance, and the details that make digital feel premium.
          </p>

          <div className="mt-14 flex flex-wrap items-center gap-6">
            <div className="relative flex h-18 min-w-lg items-center rounded-[0.4rem] border border-dark/10 bg-white px-6">
              <span
                aria-hidden="true"
                className="mr-5 h-4 w-4 rotate-45 rounded-[0.12rem] bg-primary"
              />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search articles…"
                aria-label="Search articles"
                className="h-full w-full bg-transparent text-[1.8rem] text-dark placeholder:text-dark/40 outline-none"
              />
            </div>

            <div className="flex flex-wrap gap-3">
              {categories.map((cat) => {
                const active = cat === activeCategory;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setActiveCategory(cat)}
                    className={cn(
                      "inline-flex h-14 items-center rounded-[0.4rem] border px-6 text-[1.4rem] uppercase tracking-[0.08em]",
                      active
                        ? "border-dark/20 bg-dark text-light"
                        : "border-dark/10 bg-transparent text-dark/70 hover:bg-dark/5",
                      "transition-[background-color,color,border-color] duration-400 ease-ease",
                    )}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </header>

      <section
        data-theme="light"
        className="relative border-b border-dark/10 px-8 py-24"
      >
        <div className="mx-auto w-full max-w-480">
          {featured && (
            <div data-reveal-group>
              <div
                data-reveal-item
                className="flex items-center justify-between gap-6"
              >
                <h2 className="font-heading text-[3.2rem] leading-[120%]">
                  Featured
                </h2>
                <Button href="/work" className="h-16" tone="dark">
                  View work
                </Button>
              </div>
              <div data-reveal-item className="mt-10">
                <BlogCard blog={featured} variant="featured" />
              </div>
            </div>
          )}
        </div>
      </section>

      <section data-theme="light" className="relative px-8 py-24">
        <div className="mx-auto w-full max-w-480">
          <div data-reveal className="flex items-end justify-between gap-6">
            <div>
              <p className="text-[1.4rem] uppercase tracking-[0.12em] text-dark/60">
                Latest
              </p>
              <h2 className="mt-4 font-heading text-[4.4rem] leading-[110%] max-[1099px]:text-[3.2rem]">
                Browse the library
              </h2>
            </div>
            <p className="max-w-184 text-right leading-[170%] text-dark/70 max-[1099px]:hidden">
              Clean structure, premium pacing, and thoughtful interactions —
              designed for reading.
            </p>
          </div>

          <div data-reveal-group className="mt-16 grid grid-cols-12 gap-6">
            {rest.map((blog) => (
              <div
                key={blog.slug}
                data-reveal-item
                className="col-span-6 max-[1099px]:col-span-12"
              >
                <BlogCard blog={blog} />
              </div>
            ))}
          </div>

          {!rest.length && (
            <p className="mt-16 text-dark/60">No articles match your search.</p>
          )}
        </div>
      </section>

      <section
        data-theme="dark"
        className="relative border-t border-white/10 bg-dark px-8 py-24 text-light"
      >
        <div className="mx-auto w-full max-w-480">
          <div className="grid grid-cols-12 gap-6 items-end">
            <div className="col-span-7 max-[1099px]:col-span-12">
              <p className="text-[1.4rem] uppercase tracking-[0.12em] text-light/60">
                Newsletter
              </p>
              <h2 className="mt-4 font-heading text-[5.2rem] leading-[110%] max-[1099px]:text-[3.6rem]">
                Get the good parts — no noise.
              </h2>
              <p className="mt-6 max-w-5xl leading-[170%] text-light/70">
                Occasional updates on design systems, UI craftsmanship,
                performance, and what we’re learning while building modern
                websites and products.
              </p>
            </div>
            <div className="col-span-5 max-[1099px]:col-span-12">
              <div className="rounded-[0.4rem] border border-white/10 bg-white/5 p-8">
                <div className="flex items-center gap-4">
                  <span
                    aria-hidden="true"
                    className="h-4 w-4 rotate-45 rounded-[0.12rem] bg-primary"
                  />
                  <p className="text-[1.4rem] uppercase tracking-[0.12em] text-light/60">
                    Simple updates
                  </p>
                </div>
                <p className="mt-5 text-light/70">
                  We keep it short and useful. Unsubscribe anytime.
                </p>
                <div className="mt-8">
                  <Button href="/contact-us" className="h-16" tone="green">
                    Contact us
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="bg-dark pt-24">
        <PreFooter />
      </div>
    </main>
  );
}
