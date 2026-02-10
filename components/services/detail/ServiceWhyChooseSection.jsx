"use client";

import { cn } from "@/utils/cn";

import { ThemedSection, themeTokens, toneDot } from "./serviceDetailPrimitives";

export default function ServiceWhyChooseSection({ whyChoose, tone }) {
  const items = Array.isArray(whyChoose?.items) ? whyChoose.items : [];
  const isEnabled = Boolean(whyChoose?.title || items.length);
  if (!isEnabled) return null;

  const t = themeTokens(whyChoose?.theme);

  return (
    <ThemedSection
      id="why-choose"
      theme={whyChoose?.theme}
      labelledBy="why-choose-title"
    >
      <div className="mx-auto w-full max-w-480 py-32 max-[1099px]:py-24 max-[449px]:py-20">
        <header className="mx-auto max-w-8xl text-center">
          <h2
            id="why-choose-title"
            data-reveal
            className="font-heading text-[6.4rem] leading-[95%] tracking-[-0.02em] max-[1099px]:text-[4.2rem] max-[699px]:text-[3.8rem] max-[449px]:text-[3.4rem]"
          >
            {whyChoose?.title}
          </h2>
        </header>

        {items.length > 0 && (
          <ul
            data-reveal-group
            className="mt-18 grid grid-cols-12 gap-6 max-[1099px]:mt-12 max-[449px]:mt-10"
          >
            {items.map((item) => (
              <li
                key={item}
                data-reveal-item
                className={cn(
                  "col-span-6 flex items-start gap-4 rounded-[0.6rem] border p-8 max-[1099px]:col-span-12 max-[449px]:p-6",
                  t.cardStatic,
                )}
              >
                <span
                  aria-hidden="true"
                  className={cn("mt-[0.7rem] shrink-0", toneDot(tone))}
                />
                <span className={cn("leading-[170%]", t.subtle)}>{item}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </ThemedSection>
  );
}
