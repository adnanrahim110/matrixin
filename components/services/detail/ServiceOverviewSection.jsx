"use client";

import BorderGlowCanvas from "@/components/ui/BorderGlowCanvas";
import { cn } from "@/utils/cn";

import { OrbitIcon, ThemedSection } from "./serviceDetailPrimitives";

export default function ServiceOverviewSection({
  service,
  overview,
  overviewT,
  tone,
  reducedMotion,
}) {
  if (!service || !overview) return null;

  const hasSummary = Boolean(
    overview?.summary?.eyebrow || overview?.summary?.body,
  );
  const isEnabled = Boolean(
    overview?.title ||
    overview?.lede ||
    (overview?.body || []).length ||
    (overview?.highlights || []).length ||
    hasSummary,
  );
  if (!isEnabled) return null;

  const caseImage = service?.caseStudies?.image?.src
    ? service.caseStudies.image
    : null;
  const heroImage = service?.hero?.image?.src ? service.hero.image : null;

  return (
    <ThemedSection
      id="service-overview"
      theme={overview?.theme}
      labelledBy="service-overview-title"
    >
      <div className="mx-auto w-full max-w-480 py-32 max-[1099px]:py-24 max-[449px]:py-20">
        <div className="grid grid-cols-12 gap-14 max-[1099px]:gap-10">
          <header className="col-span-5 max-[1099px]:col-span-12">
            <p
              data-reveal
              className={cn(
                "text-[1.4rem] uppercase tracking-[0.08em]",
                overviewT.overline,
              )}
            >
              {overview.eyebrow}
            </p>
            <h2
              id="service-overview-title"
              data-reveal
              className="mt-6 font-heading text-[5.2rem] leading-[105%] tracking-[-0.02em] max-[1099px]:text-[3.8rem] max-[699px]:text-[3.4rem] max-[449px]:text-[3rem] max-[449px]:leading-[112%]"
            >
              {overview.title}
            </h2>

            {heroImage?.src && (
              <div className="mt-10 hidden min-[1100px]:block">
                <div
                  className={cn(
                    "relative overflow-hidden rounded-[0.6rem] border",
                    overviewT.border,
                  )}
                >
                  <div className={cn("absolute inset-0", overviewT.panel)} />
                  <figure
                    data-parallax
                    data-parallax-y="14"
                    className="relative aspect-7/8 w-full overflow-hidden"
                  >
                    <img
                      src={heroImage.src}
                      alt={heroImage.alt}
                      className="absolute inset-0 h-full w-full object-cover"
                      loading="lazy"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-dark/0 via-dark/10 to-dark/35" />
                  </figure>
                  <div className="absolute left-8 top-8 flex items-center gap-3">
                    <OrbitIcon
                      tone={tone}
                      className="border-white/10 bg-white/10"
                    />
                    <span
                      className={cn(
                        "text-[1.2rem] uppercase tracking-[0.12em]",
                        overviewT.overline,
                      )}
                    >
                      {overview.badgeLabel}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </header>

          <div className="col-span-7 max-[1099px]:col-span-12">
            {overview?.lede && (
              <p
                data-reveal
                className={cn(
                  "text-[2.4rem] leading-[150%] max-[449px]:text-[2rem]",
                  overviewT.subtle,
                )}
              >
                {overview.lede}
              </p>
            )}

            {(overview?.body || []).length > 0 && (
              <div className={cn("mt-10 space-y-6", overviewT.subtle)}>
                {(overview.body || []).map((p) => (
                  <p key={p} data-reveal className="leading-[170%]">
                    {p}
                  </p>
                ))}
              </div>
            )}

            {(overview?.highlights || []).length > 0 && (
              <div data-reveal-group className="mt-16 grid grid-cols-12 gap-6">
                {(overview.highlights || []).map((h) => (
                  <article
                    key={h.title}
                    data-reveal-item
                    className={cn(
                      "relative col-span-6 overflow-hidden rounded-[0.6rem] border p-8 max-[1099px]:col-span-12 max-[449px]:p-6",
                      overviewT.cardStatic,
                    )}
                  >
                    <BorderGlowCanvas
                      enabled={!reducedMotion}
                      color="244, 122, 35"
                      size={140}
                    />
                    <div className="relative z-3">
                      <div className="flex items-center justify-between gap-6">
                        <h3 className="font-heading text-[2.6rem] leading-[120%] max-[449px]:text-[2.2rem]">
                          {h.title}
                        </h3>
                        <OrbitIcon
                          tone={tone}
                          className={
                            overviewT.isDark
                              ? "border-white/10 bg-white/10"
                              : ""
                          }
                        />
                      </div>
                      <p
                        className={cn("mt-5 leading-[170%]", overviewT.subtle)}
                      >
                        {h.text}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            )}

            <div className="mt-16 grid grid-cols-12 gap-6 max-[1099px]:mt-12">
              {caseImage?.src && (
                <figure
                  data-reveal
                  data-parallax
                  data-parallax-y="12"
                  className={cn(
                    "relative col-span-5 overflow-hidden rounded-[0.6rem] border max-[1099px]:col-span-12",
                    overviewT.border,
                    overviewT.panel,
                  )}
                >
                  <div className="relative aspect-16/10 w-full overflow-hidden">
                    <img
                      src={caseImage.src}
                      alt={caseImage.alt}
                      className="absolute inset-0 h-full w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                </figure>
              )}
              <div
                className={cn(
                  caseImage?.src
                    ? "col-span-7 max-[1099px]:col-span-12"
                    : "col-span-12",
                )}
              >
                <div
                  data-reveal
                  className={cn(
                    "relative overflow-hidden rounded-[0.6rem] border p-10 max-[449px]:p-8",
                    overviewT.cardStatic,
                  )}
                >
                  <div
                    data-drift-x="4"
                    aria-hidden="true"
                    className={cn(
                      "pointer-events-none absolute -top-10 left-0 whitespace-nowrap font-heading text-[10rem] leading-[100%] opacity-[0.05]",
                      overviewT.isDark ? "text-light" : "text-dark",
                    )}
                  >
                    {service?.name}
                  </div>
                  <div className="relative z-2">
                    <p
                      className={cn(
                        "text-[1.4rem] uppercase tracking-[0.08em]",
                        overviewT.overline,
                      )}
                    >
                      {overview.summary.eyebrow}
                    </p>
                    {overview?.summary?.body && (
                      <p
                        className={cn(
                          "mt-4 max-w-6xl leading-[170%]",
                          overviewT.subtle,
                        )}
                      >
                        {overview.summary.body}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ThemedSection>
  );
}
