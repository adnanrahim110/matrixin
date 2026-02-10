"use client";

import Button from "@/components/ui/Button";
import { cn } from "@/utils/cn";

import { ThemedSection } from "./serviceDetailPrimitives";

export default function ServiceCtaSection({ cta, ctaT, serviceTone }) {
  if (!cta) return null;

  const hasTitle = Boolean(cta?.title);
  const hasBody = Boolean(cta?.body);
  const hasEyebrow = Boolean(cta?.eyebrow);
  const hasPrimary = Boolean(cta?.primary?.href && cta?.primary?.label);
  const hasSecondary = Boolean(cta?.secondary?.href && cta?.secondary?.label);
  const isEnabled = Boolean(hasTitle || hasBody || hasPrimary || hasSecondary);

  if (!isEnabled) return null;

  return (
    <ThemedSection id="cta" theme={cta?.theme} labelledBy="cta-title">
      <div className="mx-auto w-full max-w-480 py-40 max-[1099px]:py-28 max-[449px]:py-24">
        <div className="grid grid-cols-12 gap-12 max-[1099px]:gap-10 max-[699px]:gap-8">
          <header className="col-span-7 max-[1099px]:col-span-12">
            {hasEyebrow && (
              <p
                data-reveal
                className={cn(
                  "text-[1.4rem] uppercase tracking-[0.08em]",
                  ctaT.overline,
                )}
              >
                {cta.eyebrow}
              </p>
            )}
            <h2
              id="cta-title"
              data-reveal
              className="mt-6 font-heading text-[6.4rem] leading-[95%] tracking-[-0.02em] max-[1099px]:text-[4.2rem] max-[699px]:text-[3.8rem] max-[449px]:text-[3.4rem]"
            >
              {cta.title}
            </h2>
            {hasBody && (
              <p
                data-reveal
                className={cn(
                  "mt-8 max-w-6xl leading-[170%] max-[449px]:mt-6",
                  ctaT.subtle,
                )}
              >
                {cta.body}
              </p>
            )}
          </header>

          <div
            data-reveal-group
            className="col-span-5 flex flex-col justify-end gap-4 max-[1099px]:col-span-12"
          >
            {hasPrimary && (
              <div data-reveal-item>
                <Button
                  href={cta.primary.href}
                  variant="magnetic"
                  tone={serviceTone}
                  className="h-24 max-[449px]:h-20"
                >
                  {cta.primary.label}
                </Button>
              </div>
            )}
            {hasSecondary && (
              <div data-reveal-item>
                <Button
                  href={cta.secondary.href}
                  tone="light"
                  className={cn(
                    "h-24 max-[449px]:h-20",
                    ctaT.isDark && "text-light",
                  )}
                >
                  {cta.secondary.label}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </ThemedSection>
  );
}
