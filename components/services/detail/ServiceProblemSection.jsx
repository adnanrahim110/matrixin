"use client";

import BorderGlowCanvas from "@/components/ui/BorderGlowCanvas";
import { cn } from "@/utils/cn";

import { OrbitIcon, ThemedSection } from "./serviceDetailPrimitives";

export default function ServiceProblemSection({
  service,
  problem,
  problemT,
  tone,
  reducedMotion,
}) {
  if (!service || !problem) return null;

  const image = service.problem?.image ? service.problem.image : null;
  const hasImage = Boolean(image?.src);

  return (
    <ThemedSection
      id="problem"
      theme={problem?.theme}
      labelledBy="problem-title"
    >
      <div className="mx-auto w-full max-w-480 py-32 max-[1099px]:py-24 max-[449px]:py-20">
        <div className="grid grid-cols-12 gap-14 max-[1099px]:gap-10 max-[699px]:gap-8">
          <header className="col-span-5 max-[1099px]:col-span-12">
            {problem?.eyebrow && (
              <p
                data-reveal
                className={cn(
                  "text-[1.4rem] uppercase tracking-[0.08em]",
                  problemT.overline,
                )}
              >
                {problem.eyebrow}
              </p>
            )}
            <h2
              id="problem-title"
              data-reveal
              className="mt-6 font-heading text-[5.2rem] leading-[105%] tracking-[-0.02em] max-[1099px]:text-[3.8rem] max-[699px]:text-[3.4rem] max-[449px]:text-[3rem]"
            >
              {problem.title}
            </h2>

            <div
              data-reveal
              className={cn(
                "relative mt-10 overflow-hidden rounded-[0.6rem] border p-10 max-[449px]:p-8",
                problemT.cardStatic,
              )}
            >
              <div
                data-drift-x="5"
                aria-hidden="true"
                className={cn(
                  "pointer-events-none absolute -top-10 left-0 whitespace-nowrap font-heading text-[12rem] leading-[100%] opacity-[0.06] max-[699px]:text-[10rem] max-[449px]:text-[9rem]",
                  problemT.isDark ? "text-light" : "text-dark",
                )}
              >
                {problem.callout?.backdropText}
              </div>
              <p className={cn("relative z-2 leading-[170%]", problemT.subtle)}>
                {problem.callout?.body}
              </p>
            </div>
          </header>

          <div className="col-span-7 max-[1099px]:col-span-12">
            {(problem?.body || []).length > 0 && (
              <div className={cn("space-y-6", problemT.subtle)}>
                {(problem.body || []).map((p) => (
                  <p key={p} data-reveal className="leading-[170%]">
                    {p}
                  </p>
                ))}
              </div>
            )}

            {(problem?.points || []).length > 0 && (
              <div className="mt-14 grid grid-cols-12 gap-6 max-[1099px]:mt-10 max-[449px]:mt-8">
                {hasImage && (
                  <figure
                    data-reveal
                    data-parallax
                    data-parallax-y="16"
                    className={cn(
                      "relative col-span-5 overflow-hidden rounded-[0.6rem] border max-[1099px]:col-span-12",
                      problemT.border,
                      problemT.panel,
                    )}
                  >
                    <div className="relative aspect-4/5 w-full overflow-hidden">
                      <img
                        src={image.src}
                        alt={image.alt}
                        className="absolute inset-0 h-full w-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  </figure>
                )}

                <ul
                  data-reveal-group
                  className={cn(
                    "space-y-4 max-[1099px]:col-span-12",
                    hasImage ? "col-span-7" : "col-span-12",
                  )}
                >
                  {(problem.points || []).map((point) => (
                    <li
                      key={point}
                      data-reveal-item
                      className={cn(
                        "group relative overflow-hidden rounded-[0.6rem] border p-8 max-[449px]:p-6",
                        "transition-[transform,background-color] duration-600 ease-ease hover:-translate-y-1",
                        problemT.cardStatic,
                      )}
                    >
                      <BorderGlowCanvas
                        enabled={!reducedMotion}
                        color="244, 122, 35"
                        size={120}
                      />
                      <div className="relative z-3 flex items-start gap-4">
                        <OrbitIcon
                          tone={tone}
                          className={
                            problemT.isDark ? "border-white/10 bg-white/10" : ""
                          }
                        />
                        <p className={cn("leading-[170%]", problemT.subtle2)}>
                          {point}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </ThemedSection>
  );
}
