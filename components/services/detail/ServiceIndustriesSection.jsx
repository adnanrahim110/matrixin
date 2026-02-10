"use client";

import { cn } from "@/utils/cn";

import { ThemedSection, themeTokens, toneDot } from "./serviceDetailPrimitives";

export default function ServiceIndustriesSection({ industries, tone }) {
  const items = Array.isArray(industries?.items) ? industries.items : [];
  const isEnabled = Boolean(industries?.title || items.length);
  if (!isEnabled) return null;

  const t = themeTokens(industries?.theme);

  return (
    <ThemedSection
      id="industries"
      theme={industries?.theme}
      labelledBy="industries-title"
    >
      <div className="mx-auto w-full max-w-480 py-32 max-[1099px]:py-24 max-[449px]:py-20">
        <header className="mx-auto max-w-6xl text-center">
          <h2
            id="industries-title"
            data-reveal
            className="font-heading text-[6.4rem] leading-[95%] tracking-[-0.02em] max-[1099px]:text-[4.2rem] max-[699px]:text-[3.8rem] max-[449px]:text-[3.4rem]"
          >
            {industries?.title}
          </h2>
        </header>

        {items.length > 0 && (
          <ul
            data-reveal-group
            className="mt-18 flex flex-wrap justify-center gap-4 max-[1099px]:mt-12 max-[449px]:mt-10"
          >
            {items.map((item) => (
              <li
                key={item}
                data-reveal-item
                className={cn(
                  "flex items-center gap-3 rounded-full border px-6 py-4 max-[449px]:gap-2 max-[449px]:px-5 max-[449px]:py-3",
                  t.border,
                  t.panel,
                )}
              >
                <span aria-hidden="true" className={toneDot(tone)} />
                <span
                  className={cn(
                    "text-[1.4rem] leading-[160%] max-[449px]:text-[1.3rem]",
                    t.subtle,
                  )}
                >
                  {item}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </ThemedSection>
  );
}
