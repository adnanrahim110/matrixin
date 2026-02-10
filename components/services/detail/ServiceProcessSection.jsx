"use client";

import BorderGlowCanvas from "@/components/ui/BorderGlowCanvas";
import { cn } from "@/utils/cn";

import { ThemedSection, toneBar, toneDot } from "./serviceDetailPrimitives";

export default function ServiceProcessSection({
  process,
  processT,
  tone,
  reducedMotion,
}) {
  const isEnabled = Boolean(process?.intro || (process?.steps || []).length);
  if (!isEnabled) return null;

  const hasHelperText = Boolean(process?.helperText);
  const hasCallout = Boolean(
    process?.callout?.body || process?.callout?.backdropText,
  );

  return (
    <ThemedSection
      id="process"
      theme={process?.theme}
      labelledBy="process-title"
    >
      <div className="mx-auto w-full max-w-480 py-32 max-[1099px]:py-24 max-[449px]:py-20">
        <div className="flex items-end justify-between gap-10 max-[1099px]:flex-col max-[1099px]:items-start">
          <div className="max-w-8xl">
            {process?.eyebrow && (
              <p
                data-reveal
                className={cn(
                  "text-[1.4rem] uppercase tracking-[0.08em]",
                  processT.overline,
                )}
              >
                {process.eyebrow}
              </p>
            )}
            <h2
              id="process-title"
              data-reveal
              className="mt-6 font-heading text-[6.4rem] leading-[95%] tracking-[-0.02em] max-[1099px]:text-[4.2rem] max-[699px]:text-[3.8rem] max-[449px]:text-[3.4rem]"
            >
              {process.title}
            </h2>
            {process?.intro && (
              <p
                data-reveal
                className={cn(
                  "mt-8 max-w-6xl leading-[170%] max-[449px]:mt-6",
                  processT.subtle,
                )}
              >
                {process.intro}
              </p>
            )}
          </div>

          {hasHelperText && (
            <div
              data-reveal
              className={cn(
                "hidden items-center gap-3 rounded-full border px-6 py-4 min-[1100px]:flex",
                processT.border,
                processT.panel,
              )}
            >
              <span aria-hidden="true" className={toneDot(tone)} />
              <span
                className={cn(
                  "text-[1.2rem] uppercase tracking-[0.12em]",
                  processT.overline,
                )}
              >
                {process.helperText}
              </span>
            </div>
          )}
        </div>

        <div className="mt-18 grid grid-cols-12 gap-6 max-[1099px]:mt-12 max-[449px]:mt-10">
          <aside className="col-span-5 self-start max-[1099px]:col-span-12 min-[1100px]:sticky min-[1100px]:top-40">
            {process?.image?.src && (
              <figure
                data-reveal
                data-parallax
                data-parallax-y="14"
                className={cn(
                  "relative overflow-hidden rounded-[0.6rem] border",
                  processT.border,
                  processT.panel,
                )}
              >
                <div className="relative aspect-4/5 w-full overflow-hidden">
                  <img
                    src={process.image.src}
                    alt={process.image.alt}
                    className="absolute inset-0 h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
              </figure>
            )}

            {hasCallout && (
              <div
                data-reveal
                className={cn(
                  "relative mt-6 overflow-hidden rounded-[0.6rem] border p-10 max-[449px]:p-8",
                  processT.cardStatic,
                )}
              >
                <div
                  data-drift-x="4"
                  aria-hidden="true"
                  className={cn(
                    "pointer-events-none absolute -top-10 left-0 whitespace-nowrap font-heading text-[10rem] leading-[100%] opacity-[0.05] max-[699px]:text-[9rem] max-[449px]:text-[8rem]",
                    processT.isDark ? "text-light" : "text-dark",
                  )}
                >
                  {process.callout?.backdropText}
                </div>
                <p
                  className={cn("relative z-2 leading-[170%]", processT.subtle)}
                >
                  {process.callout?.body}
                </p>
              </div>
            )}
          </aside>

          <div className="col-span-7 max-[1099px]:col-span-12">
            {(process?.steps || []).length > 0 && (
              <div data-progress className="relative pl-12 max-[1099px]:pl-0">
                <div
                  aria-hidden="true"
                  className={cn(
                    "absolute left-0 top-0 h-full w-px max-[1099px]:hidden",
                    processT.isDark ? "bg-white/10" : "bg-dark/10",
                  )}
                />
                <div
                  data-progress-line
                  aria-hidden="true"
                  className={cn(
                    "absolute left-0 top-0 h-full w-px max-[1099px]:hidden",
                    toneBar(tone),
                  )}
                />

                <ol data-reveal-group className="space-y-4">
                  {(process.steps || []).map((step, index) => (
                    <li
                      key={step.title}
                      data-reveal-item
                      className={cn(
                        "group relative overflow-hidden rounded-[0.6rem] border p-10 max-[449px]:p-8",
                        "transition-[transform,background-color] duration-600 ease-ease hover:-translate-y-1",
                        processT.cardStatic,
                      )}
                    >
                      <BorderGlowCanvas
                        enabled={!reducedMotion}
                        color="244, 122, 35"
                        size={160}
                      />
                      <div className="relative z-3 flex items-start gap-6 max-[449px]:gap-4">
                        <div className="mt-1 flex items-center gap-4">
                          <span
                            className={cn(
                              "inline-flex h-12 w-12 items-center justify-center rounded-full border max-[449px]:h-10 max-[449px]:w-10",
                              processT.isDark
                                ? "border-white/10 bg-white/5"
                                : "border-dark/10 bg-dark/5",
                            )}
                          >
                            <span
                              className={cn(
                                "text-[1.4rem] uppercase tracking-[0.08em]",
                                processT.overline,
                              )}
                            >
                              {(index + 1).toString().padStart(2, "0")}
                            </span>
                          </span>
                        </div>
                        <div className="min-w-0">
                          <h3 className="font-heading text-[3.2rem] leading-[110%] max-[449px]:text-[2.6rem]">
                            {step.title}
                          </h3>
                          {step?.text && (
                            <p
                              className={cn(
                                "mt-4 leading-[170%] max-[449px]:mt-3",
                                processT.subtle,
                              )}
                            >
                              {step.text}
                            </p>
                          )}
                        </div>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            )}
          </div>
        </div>
      </div>
    </ThemedSection>
  );
}
