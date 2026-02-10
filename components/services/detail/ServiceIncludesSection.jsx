"use client";

import BorderGlowCanvas from "@/components/ui/BorderGlowCanvas";
import { cn } from "@/utils/cn";

import { OrbitIcon, ThemedSection, toneDot } from "./serviceDetailPrimitives";

export default function ServiceIncludesSection({
  includes,
  includesT,
  tone,
  reducedMotion,
}) {
  const cards = Array.isArray(includes?.cards) ? includes.cards : [];
  const groups = Array.isArray(includes?.groups) ? includes.groups : [];
  const hasCallout = Boolean(
    includes?.callout?.body || includes?.callout?.backdropText,
  );
  const media = Array.isArray(includes?.media) ? includes.media : [];

  const isEnabled = Boolean(
    includes?.title ||
    includes?.intro ||
    includes?.note ||
    cards.length ||
    groups.length ||
    hasCallout ||
    media.length,
  );
  if (!isEnabled) return null;

  const cardSpan = cards.length === 4 ? "col-span-6" : "col-span-4";

  return (
    <ThemedSection
      id="includes"
      theme={includes?.theme}
      labelledBy="includes-title"
    >
      <div className="mx-auto w-full max-w-480 py-32 max-[1099px]:py-24 max-[449px]:py-20">
        <header className="mx-auto max-w-8xl text-center">
          {includes?.eyebrow && (
            <p
              data-reveal
              className={cn(
                "text-[1.4rem] uppercase tracking-[0.08em]",
                includesT.overline,
              )}
            >
              {includes.eyebrow}
            </p>
          )}
          <h2
            id="includes-title"
            data-reveal
            className="mt-6 font-heading text-[6.4rem] leading-[95%] tracking-[-0.02em] max-[1099px]:text-[4.2rem] max-[699px]:text-[3.8rem] max-[449px]:text-[3.4rem]"
          >
            {includes.title}
          </h2>
          {includes?.intro && (
            <p
              data-reveal
              className={cn("mt-8 leading-[170%] max-[449px]:mt-6", includesT.subtle)}
            >
              {includes.intro}
            </p>
          )}
        </header>

        {cards.length > 0 ? (
          <div
            data-reveal-group
            className="mt-18 grid grid-cols-12 gap-6 max-[1099px]:mt-12 max-[449px]:mt-10"
          >
            {cards.map((card, index) => (
              <article
                key={card?.title || index}
                data-reveal-item
                className={cn(
                  "relative overflow-hidden rounded-[0.6rem] border p-10 max-[1099px]:col-span-12 max-[449px]:p-8",
                  cardSpan,
                  includesT.cardStatic,
                )}
              >
                <BorderGlowCanvas
                  enabled={!reducedMotion}
                  color="244, 122, 35"
                  size={160}
                />
                <div className="relative z-3">
                  <div className="flex items-start justify-between gap-6 max-[449px]:gap-4">
                    <h3 className="font-heading text-[3.2rem] leading-[110%] max-[449px]:text-[2.6rem]">
                      {card?.title}
                    </h3>
                    <OrbitIcon
                      tone={tone}
                      className={
                        includesT.isDark ? "border-white/10 bg-white/10" : ""
                      }
                    />
                  </div>
                  <p className={cn("mt-5 leading-[170%]", includesT.subtle)}>
                    {card?.text || card?.description || ""}
                  </p>
                </div>
              </article>
            ))}
          </div>
        ) : (
          (media.length > 0 || hasCallout) && (
            <div className="mt-18 grid grid-cols-12 gap-6 max-[1099px]:mt-12 max-[449px]:mt-10">
              {media.slice(0, 2).map((mediaItem, index) => (
                <figure
                  key={mediaItem?.src || index}
                  data-reveal
                  data-parallax
                  data-parallax-y={index === 0 ? "10" : "14"}
                  className={cn(
                    "relative col-span-4 overflow-hidden rounded-[0.6rem] border max-[1099px]:col-span-12",
                    includesT.border,
                    includesT.panel,
                  )}
                >
                  <div className="relative aspect-16/10 w-full overflow-hidden">
                    <img
                      src={mediaItem?.src}
                      alt={mediaItem?.alt}
                      className="absolute inset-0 h-full w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                </figure>
              ))}

              {hasCallout && (
                <div
                  data-reveal
                  className={cn(
                    "relative col-span-4 overflow-hidden rounded-[0.6rem] border p-10 max-[1099px]:col-span-12 max-[449px]:p-8",
                    includesT.cardStatic,
                  )}
                >
                  <div
                    data-drift-x="4"
                    aria-hidden="true"
                    className={cn(
                      "pointer-events-none absolute -top-10 left-0 whitespace-nowrap font-heading text-[10rem] leading-[100%] opacity-[0.05] max-[699px]:text-[9rem] max-[449px]:text-[8rem]",
                      includesT.isDark ? "text-light" : "text-dark",
                    )}
                  >
                    {includes.callout?.backdropText}
                  </div>
                  <p
                    className={cn(
                      "relative z-2 leading-[170%]",
                      includesT.subtle,
                    )}
                  >
                    {includes.callout?.body}
                  </p>
                </div>
              )}
            </div>
          )
        )}

        {groups.length > 0 && (
          <div className="mt-18 space-y-6 max-[1099px]:mt-12 max-[449px]:mt-10">
            {(groups || []).map((group, idx) => {
              const mediaPool = media;
              const groupMedia =
                group?.image ||
                (mediaPool.length ? mediaPool[idx % mediaPool.length] : null);
              const hasGroupMedia = Boolean(groupMedia?.src);

              return (
                <article
                  key={`${group.title}-${idx}`}
                  data-reveal-group
                  className={cn(
                    "grid grid-cols-12 gap-6",
                    hasGroupMedia &&
                      idx % 2 !== 0 &&
                      "min-[1100px]:**:data-media:order-2",
                  )}
                >
                  {hasGroupMedia && (
                    <figure
                      data-reveal-item
                      data-media
                      data-parallax
                      data-parallax-y={idx % 2 === 0 ? "12" : "16"}
                      className={cn(
                        "relative col-span-5 overflow-hidden rounded-[0.6rem] border max-[1099px]:col-span-12",
                        includesT.border,
                        includesT.panel,
                      )}
                    >
                      <div className="relative aspect-4/3 w-full overflow-hidden">
                        <img
                          src={groupMedia.src}
                          alt={groupMedia.alt}
                          className="absolute inset-0 h-full w-full object-cover"
                          loading="lazy"
                        />
                      </div>
                      <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-dark/0 via-dark/10 to-dark/40" />
                    </figure>
                  )}

                  <section
                    data-reveal-item
                    className={cn(
                      "relative overflow-hidden rounded-[0.6rem] border p-10 max-[1099px]:col-span-12 max-[449px]:p-8",
                      includesT.cardStatic,
                      hasGroupMedia ? "col-span-7" : "col-span-12",
                    )}
                  >
                    <BorderGlowCanvas
                      enabled={!reducedMotion}
                      color="244, 122, 35"
                      size={160}
                    />
                    <div className="relative z-3">
                      <div className="flex items-center justify-between gap-6 max-[449px]:gap-4">
                        <div className="flex items-center gap-4">
                          <OrbitIcon
                            tone={tone}
                            className={
                              includesT.isDark
                                ? "border-white/10 bg-white/10"
                                : ""
                            }
                          />
                          <h3 className="font-heading text-[3.2rem] leading-[110%] max-[449px]:text-[2.6rem]">
                            {group.title}
                          </h3>
                        </div>
                        <span
                          className={cn(
                            "text-[1.4rem] uppercase tracking-[0.08em]",
                            includesT.overline,
                          )}
                        >
                          {(idx + 1).toString().padStart(2, "0")}
                        </span>
                      </div>

                      <ul
                        className={cn(
                          "mt-8 grid grid-cols-2 gap-4 max-[449px]:mt-6",
                          includesT.subtle,
                          "max-[1099px]:grid-cols-1",
                        )}
                      >
                        {(group.items || []).map((item, itemIdx) => (
                          <li
                            key={`${item}-${itemIdx}`}
                            className="flex items-start gap-4 leading-[170%]"
                          >
                            <span
                              aria-hidden="true"
                              className={cn(
                                "mt-[0.7rem] shrink-0",
                                toneDot(tone),
                              )}
                            />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </section>
                </article>
              );
            })}
          </div>
        )}

        {includes?.note && (
          <p
            data-reveal
            className={cn(
              "mx-auto mt-12 max-w-6xl text-center leading-[170%] max-[449px]:mt-10",
              includesT.overline,
            )}
          >
            {includes.note}
          </p>
        )}
      </div>
    </ThemedSection>
  );
}
