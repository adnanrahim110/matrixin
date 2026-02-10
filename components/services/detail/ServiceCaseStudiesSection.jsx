"use client";

import Button from "@/components/ui/Button";
import { cn } from "@/utils/cn";

import { ThemedSection } from "./serviceDetailPrimitives";

export default function ServiceCaseStudiesSection({
  caseStudies,
  caseStudiesT,
  results,
  caseStudyItems,
}) {
  if (!caseStudies) return null;

  return (
    <ThemedSection
      id="case-studies"
      theme={caseStudies?.theme}
      labelledBy="case-studies-title"
    >
      <div className="mx-auto w-full max-w-480 py-32 max-[1099px]:py-24 max-[449px]:py-20">
        <div className="flex items-end justify-between gap-8 max-[1099px]:flex-col max-[1099px]:items-start max-[449px]:gap-6">
          <div>
            <p
              data-reveal
              className={cn(
                "text-[1.4rem] uppercase tracking-[0.08em]",
                caseStudiesT.overline,
              )}
            >
              {caseStudies.eyebrow}
            </p>
            <h2
              id="case-studies-title"
              data-reveal
              className="mt-6 font-heading text-[4.4rem] leading-[110%] max-[1099px]:text-[3.4rem] max-[449px]:text-[3rem]"
            >
              {caseStudies.title}
            </h2>
            <p
              data-reveal
              className={cn(
                "mt-8 max-w-6xl leading-[170%] max-[449px]:mt-6",
                caseStudiesT.subtle,
              )}
            >
              {caseStudies.intro}
            </p>
          </div>
          <div data-reveal>
            <Button
              href={caseStudies?.cta?.href}
              tone="dark"
              className={cn(
                "h-16 max-[449px]:h-14",
                caseStudiesT.isDark && "text-light",
              )}
            >
              {caseStudies?.cta?.label}
            </Button>
          </div>
        </div>

        {results && (results?.items || []).length > 0 && (
          <div className="mt-16 grid grid-cols-12 gap-6 max-[449px]:mt-12">
            <div className="col-span-4 max-[1099px]:col-span-12">
              <h3
                data-reveal
                className="font-heading text-[2.6rem] leading-[120%] max-[449px]:text-[2.3rem]"
              >
                {results.title}
              </h3>
              {results?.intro && (
                <p
                  data-reveal
                  className={cn("mt-6 leading-[170%]", caseStudiesT.subtle)}
                >
                  {results.intro}
                </p>
              )}
            </div>
            <ul
              data-reveal-group
              className="col-span-8 grid grid-cols-2 gap-6 max-[1099px]:col-span-12 max-[1099px]:grid-cols-1"
            >
              {(results.items || []).map((r) => (
                <li
                  key={r}
                  data-reveal-item
                  className={cn(
                    "rounded-[0.4rem] border p-8 max-[449px]:p-6",
                    caseStudiesT.cardStatic,
                  )}
                >
                  <p className={cn("leading-[170%]", caseStudiesT.subtle2)}>{r}</p>
                </li>
              ))}
            </ul>
          </div>
        )}

        {caseStudies?.image?.src && (
          <figure
            data-parallax
            className={cn(
              "mt-18 overflow-hidden rounded-[0.4rem] border max-[449px]:mt-12",
              caseStudiesT.border,
              caseStudiesT.panel,
            )}
          >
            <div className="relative aspect-[3/1.1] w-full overflow-hidden max-[1099px]:aspect-[3/1.4] max-[449px]:aspect-[3/1.6]">
              <img
                src={caseStudies.image.src}
                alt={caseStudies.image.alt}
                className="absolute inset-0 h-full w-full object-cover will-change-transform"
                loading="lazy"
              />
            </div>
          </figure>
        )}

        {(caseStudyItems || []).length > 0 && (
          <div data-reveal-group className="mt-18 grid grid-cols-12 gap-6 max-[449px]:mt-12">
            {caseStudyItems.map((p) => (
              <div
                key={p.href}
                data-reveal-item
                className={cn(
                  "group col-span-4 overflow-hidden rounded-[0.4rem] border max-[1099px]:col-span-12",
                  caseStudiesT.card,
                )}
              >
                <figure
                  className={cn(
                    "relative aspect-[3/1.8] w-full overflow-hidden",
                    caseStudiesT.panel,
                  )}
                >
                  <img
                    src={p.image}
                    alt={p.ariaLabel || p.client || ""}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-ease group-hover:scale-[1.05]"
                    loading="lazy"
                  />
                </figure>
                <div className="p-8 max-[449px]:p-6">
                  <p
                    className={cn(
                      "text-[1.4rem] uppercase tracking-[0.08em]",
                      caseStudiesT.overline,
                    )}
                  >
                    {p.client}
                  </p>
                  <h3 className="mt-3 font-heading text-[2.6rem] leading-[120%] max-[449px]:text-[2.3rem]">
                    {p.title}
                  </h3>
                  <p className={cn("mt-4", caseStudiesT.subtle)}>
                    {p.services?.slice?.(0, 3)?.join?.(", ")}
                  </p>
                  <span
                    className={cn(
                      "mt-6 inline-flex items-center text-[1.6rem] transition-colors duration-300",
                      caseStudiesT.subtle,
                      caseStudiesT.isDark
                        ? "group-hover:text-light"
                        : "group-hover:text-dark",
                    )}
                  >
                    {caseStudies?.cardCtaLabel}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </ThemedSection>
  );
}
