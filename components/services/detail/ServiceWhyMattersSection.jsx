"use client";

import BorderGlowCanvas from "@/components/ui/BorderGlowCanvas";
import { cn } from "@/utils/cn";

import { ThemedSection, themeTokens, toneDot } from "./serviceDetailPrimitives";

export default function ServiceWhyMattersSection({
  whyMatters,
  tone,
  reducedMotion,
}) {
  const items = Array.isArray(whyMatters?.items) ? whyMatters.items : [];
  const intro = whyMatters?.intro || "";
  const conclusion = whyMatters?.conclusion || "";
  const isEnabled = Boolean(
    whyMatters?.title || intro || items.length || conclusion,
  );
  if (!isEnabled) return null;

  const t = themeTokens(whyMatters?.theme);

  return (
    <ThemedSection
      id="why-matters"
      theme={whyMatters?.theme}
      labelledBy="why-matters-title"
    >
      <div className="mx-auto w-full max-w-480 py-32 max-[1099px]:py-24 max-[449px]:py-20">
        <div className="grid grid-cols-12 gap-14 max-[1099px]:gap-10 max-[699px]:gap-8">
          <header className="col-span-5 max-[1099px]:col-span-12">
            <h2
              id="why-matters-title"
              data-reveal
              className="font-heading text-[5.6rem] leading-[105%] tracking-[-0.02em] max-[1099px]:text-[3.8rem] max-[699px]:text-[3.4rem] max-[449px]:text-[3rem]"
            >
              {whyMatters?.title}
            </h2>
          </header>

          <div className="col-span-7 max-[1099px]:col-span-12">
            {intro && (
              <p data-reveal className={cn("leading-[170%]", t.subtle)}>
                {intro}
              </p>
            )}

            {items.length > 0 && (
              <ul
                data-reveal-group
                className={cn(
                  "space-y-4",
                  intro && "mt-10 max-[449px]:mt-8",
                )}
              >
                {items.map((item) => (
                  <li
                    key={item}
                    data-reveal-item
                    className={cn(
                      "group relative overflow-hidden rounded-[0.6rem] border p-8 max-[449px]:p-6",
                      t.cardStatic,
                    )}
                  >
                    <BorderGlowCanvas
                      enabled={!reducedMotion}
                      color="244, 122, 35"
                      size={120}
                    />
                    <div className="relative z-3 flex items-start gap-4">
                      <span
                        aria-hidden="true"
                        className={cn("mt-[0.7rem] shrink-0", toneDot(tone))}
                      />
                      <p className={cn("leading-[170%]", t.subtle2)}>{item}</p>
                    </div>
                  </li>
                ))}
              </ul>
            )}

            {conclusion && (
              <p
                data-reveal
                className={cn(
                  "mt-10 leading-[170%] max-[449px]:mt-8",
                  t.subtle,
                )}
              >
                {conclusion}
              </p>
            )}
          </div>
        </div>
      </div>
    </ThemedSection>
  );
}
