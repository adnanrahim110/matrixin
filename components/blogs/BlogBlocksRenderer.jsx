"use client";

import { cn } from "@/utils/cn";

const headingClass = (level) => {
  if (level === 2) return "text-[4.4rem] leading-[115%] max-[1099px]:text-[3.2rem]";
  if (level === 3) return "text-[3.2rem] leading-[120%] max-[1099px]:text-[2.6rem]";
  return "text-[2.6rem] leading-[120%]";
};

const BlockHeading = ({ level = 2, children }) => {
  const Tag = `h${Math.min(4, Math.max(2, Number(level) || 2))}`;
  return (
    <Tag className={cn("font-heading tracking-[-0.01em]", headingClass(level))}>
      {children}
    </Tag>
  );
};

const CheckIcon = () => (
  <span
    aria-hidden="true"
    className="mt-[0.9rem] inline-block h-[0.9rem] w-[0.9rem] rotate-45 rounded-[0.12rem] bg-primary"
  />
);

export default function BlogBlocksRenderer({ blocks = [] }) {
  if (!Array.isArray(blocks) || !blocks.length) return null;

  return (
    <div className="prose-blocks space-y-14">
      {blocks.map((block, index) => {
        if (!block) return null;
        const key = `${block.type || "block"}-${index}`;

        if (block.type === "heading") {
          return (
            <div key={key} data-reveal>
              <BlockHeading level={block.level}>{block.text}</BlockHeading>
            </div>
          );
        }

        if (block.type === "paragraph") {
          return (
            <p
              key={key}
              data-reveal
              className="text-[2rem] leading-[180%] text-dark/80 max-[1099px]:text-[1.9rem]"
            >
              {block.text}
            </p>
          );
        }

        if (block.type === "list") {
          const variant = block.variant || "check";
          const isNumbered = variant === "numbered";
          const items = Array.isArray(block.items) ? block.items : [];
          const Tag = isNumbered ? "ol" : "ul";
          return (
            <div key={key} data-reveal>
              <Tag
                className={cn(
                  "mt-2 grid gap-5 text-[1.9rem] leading-[170%] text-dark/80",
                  isNumbered ? "list-decimal pl-10" : "",
                )}
              >
                {items.map((item) => (
                  <li key={item} className={cn(!isNumbered && "flex gap-5")}>
                    {!isNumbered && <CheckIcon />}
                    <span className="min-w-0">{item}</span>
                  </li>
                ))}
              </Tag>
            </div>
          );
        }

        if (block.type === "quote") {
          return (
            <figure
              key={key}
              data-reveal
              className="rounded-[0.6rem] border border-dark/10 bg-dark/5 p-10"
            >
              <blockquote className="font-heading text-[3.2rem] leading-[125%] tracking-[-0.01em] max-[1099px]:text-[2.6rem]">
                “{block.text}”
              </blockquote>
              {block.cite && (
                <figcaption className="mt-6 text-[1.4rem] uppercase tracking-[0.12em] text-dark/60">
                  {block.cite}
                </figcaption>
              )}
            </figure>
          );
        }

        if (block.type === "callout") {
          return (
            <aside
              key={key}
              data-reveal
              className="rounded-[0.6rem] border border-dark/10 bg-white p-10 shadow-[0_1.6rem_5rem_rgba(2,2,2,0.06)]"
            >
              <div className="flex items-center gap-4">
                <span aria-hidden="true" className="h-4 w-4 rotate-45 rounded-[0.12rem] bg-primary" />
                <p className="text-[1.4rem] uppercase tracking-[0.12em] text-dark/60">
                  {block.title || "Note"}
                </p>
              </div>
              <p className="mt-6 text-[2rem] leading-[180%] text-dark/80">
                {block.text}
              </p>
            </aside>
          );
        }

        if (block.type === "statGrid") {
          const items = Array.isArray(block.items) ? block.items : [];
          return (
            <div
              key={key}
              data-reveal-group
              className="grid grid-cols-12 gap-6"
            >
              {items.map((it) => (
                <div
                  key={`${it.label}-${it.value}`}
                  data-reveal-item
                  className="col-span-4 rounded-[0.6rem] border border-dark/10 bg-dark/5 p-10 max-[1099px]:col-span-12"
                >
                  <p className="text-[1.4rem] uppercase tracking-[0.12em] text-dark/60">
                    {it.label}
                  </p>
                  <p className="mt-5 font-heading text-[4.4rem] leading-[100%]">
                    {it.value}
                  </p>
                  {it.desc && (
                    <p className="mt-6 leading-[170%] text-dark/70">{it.desc}</p>
                  )}
                </div>
              ))}
            </div>
          );
        }

        if (block.type === "image") {
          return (
            <figure
              key={key}
              data-parallax
              data-parallax-y={String(block.parallaxY ?? 10)}
              className="overflow-hidden rounded-[0.6rem] border border-dark/10 bg-dark/5"
            >
              <div className="relative aspect-[16/9] w-full overflow-hidden">
                <img
                  src={block.src}
                  alt={block.alt || ""}
                  className="absolute inset-0 h-full w-full object-cover will-change-transform"
                  loading="lazy"
                />
              </div>
              {block.caption && (
                <figcaption className="px-8 py-6 text-[1.4rem] leading-[170%] text-dark/60">
                  {block.caption}
                </figcaption>
              )}
            </figure>
          );
        }

        return null;
      })}
    </div>
  );
}

