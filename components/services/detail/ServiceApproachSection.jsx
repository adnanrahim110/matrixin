"use client";

import BorderGlowCanvas from "@/components/ui/BorderGlowCanvas";
import { cn } from "@/utils/cn";

import { OrbitIcon, ThemedSection, toneBar } from "./serviceDetailPrimitives";

export default function ServiceApproachSection({
  approach,
  approachT,
  tone,
  reducedMotion,
}) {
  if (!approach) return null;

  return (
    <ThemedSection
      id="approach"
      theme={approach?.theme}
      labelledBy="approach-title"
    >
      <div className="mx-auto w-full max-w-480 py-32 max-[1099px]:py-24 max-[449px]:py-20">
        <div className="grid grid-cols-12 gap-14 max-[1099px]:gap-10 max-[699px]:gap-8">
          <header className="col-span-4 self-start max-[1099px]:col-span-12 min-[1100px]:sticky min-[1100px]:top-40">
            <p
              data-reveal
              className={cn(
                "text-[1.4rem] uppercase tracking-[0.08em]",
                approachT.overline,
              )}
            >
              {approach.eyebrow}
            </p>
            <h2
              id="approach-title"
              data-reveal
              className="mt-6 font-heading text-[5.2rem] leading-[105%] tracking-[-0.02em] max-[1099px]:text-[3.8rem] max-[699px]:text-[3.4rem] max-[449px]:text-[3rem]"
            >
              {approach.title}
            </h2>

            {approach?.image?.src && (
              <div
                data-reveal
                className={cn(
                  "mt-10 overflow-hidden rounded-[0.6rem] border max-[449px]:mt-8",
                  approachT.border,
                )}
              >
                <figure
                  data-parallax
                  data-parallax-y="10"
                  className={cn(
                    "relative aspect-16/12 w-full overflow-hidden",
                    approachT.panel,
                  )}
                >
                  <img
                    src={approach.image.src}
                    alt={approach.image.alt}
                    className="absolute inset-0 h-full w-full object-cover"
                    loading="lazy"
                  />
                </figure>
              </div>
            )}
          </header>

          <div className="relative col-span-8 max-[1099px]:col-span-12">
            <div
              data-drift-x="6"
              aria-hidden="true"
              className={cn(
                "pointer-events-none absolute left-0 top-0 z-0 whitespace-nowrap font-heading text-[16rem] leading-[100%] opacity-[0.04]",
                approachT.isDark ? "text-light" : "text-dark",
                "max-[1099px]:hidden",
              )}
            >
              {approach.backdropText}
            </div>

            {(approach?.body || []).length > 0 && (
              <div className={cn("relative z-1 space-y-6", approachT.subtle)}>
                {(approach.body || []).map((p) => (
                  <p key={p} data-reveal className="leading-[170%]">
                    {p}
                  </p>
                ))}
              </div>
            )}

            {(approach?.steps || []).length > 0 && (
              <div
                data-progress
                className="relative z-1 mt-16 pl-12 max-[1099px]:mt-12 max-[1099px]:pl-0 max-[449px]:mt-10"
              >
                <div
                  aria-hidden="true"
                  className={cn(
                    "absolute left-0 top-0 h-full w-px max-[1099px]:hidden",
                    approachT.isDark ? "bg-white/10" : "bg-dark/10",
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
                  {(approach.steps || []).map((step, index) => (
                    <li
                      key={step.title}
                      data-reveal-item
                      className={cn(
                        "group relative overflow-hidden rounded-[0.6rem] border p-8 max-[449px]:p-6",
                        "transition-[transform,background-color] duration-600 ease-ease hover:-translate-y-1",
                        approachT.cardStatic,
                      )}
                    >
                      <BorderGlowCanvas
                        enabled={!reducedMotion}
                        color="244, 122, 35"
                        size={140}
                      />
                      <div className="relative z-3 flex items-start gap-6 max-[1099px]:gap-4">
                        <div className="mt-1 flex items-center gap-4">
                          <p
                            className={cn(
                              "text-[1.4rem] uppercase tracking-[0.08em]",
                              approachT.overline,
                            )}
                          >
                            {(index + 1).toString().padStart(2, "0")}
                          </p>
                          <OrbitIcon
                            tone={tone}
                            className={
                              approachT.isDark
                                ? "border-white/10 bg-white/10"
                                : ""
                            }
                          />
                        </div>
                        <div className="min-w-0">
                          <h3 className="font-heading text-[2.8rem] leading-[120%] max-[449px]:text-[2.4rem]">
                            {step.title}
                          </h3>
                          {step?.text && (
                            <p
                              className={cn(
                                "mt-4 leading-[170%] max-[449px]:mt-3",
                                approachT.subtle,
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
