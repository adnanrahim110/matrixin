import { cn } from "@/utils/cn";
import Link from "next/link";

export default function WorkCta({ wrapperClassName }) {
  return (
    <div className={cn("work-cta-wrapper", wrapperClassName)}>
      <div className={cn("work-cta", "p-8 text-dark")}>
        <div
          className={cn(
            "work-cta-inner",
            "flex w-full flex-col items-center justify-center overflow-hidden rounded-[0.4rem] text-center",
            "bg-linear-to-b from-[#aff9a8] to-[#b2c0a7]",
            "min-[1100px]:h-[44vw]",
            "max-[1099px]:px-8 max-[1099px]:py-36",
          )}
        >
          <h2 className={cn("work-cta-title font-heading", "mb-[1.7rem]")}>
            Lets work together
          </h2>

          <p
            className={cn(
              "work-cta-text text-grey",
              "mb-24 w-204 leading-[140%]",
              "max-[1099px]:w-92",
            )}
          >
            Sound like your kind of studio? Tell us about your project and let’s
            work together to make it memorable.
          </p>

          <div
            className={cn(
              "btn-block group/btnblock relative flex w-full items-center justify-center overflow-hidden rounded-[0.2rem]",
              "min-h-64 bg-grey-light/20",
              "min-[1100px]:h-48 min-[1100px]:min-h-48 min-[1100px]:w-176",
              "before:absolute before:inset-0 before:z-0 before:rounded-[0.2rem] before:bg-dark",
              "before:[clip-path:inset(0_0_102%_0)] before:transition-[clip-path] before:duration-600 before:ease-ease",
              "[&.active]:before:[clip-path:inset(0_0_0%_0)] active:before:[clip-path:inset(0_0_0%_0)]",
            )}
          >
            <Link
              href="/contact"
              aria-label="Get in touch"
              className="btn-block-link absolute inset-0 z-1 block"
            />

            <Link
              href="/contact"
              className="btn pointer-events-none relative z-1 inline-flex h-12 items-center overflow-hidden rounded-[0.4rem] bg-transparent px-[2.2rem] text-light"
            >
              <span
                aria-hidden="true"
                className={cn(
                  "btn-bg absolute left-[-1%] top-[-1%] z-0 h-[102%] w-[102%] bg-dark",
                  "-translate-y-[102%] transition-transform duration-300 ease-ease",
                  "group-[.active]/btnblock:translate-y-0 group-active/btnblock:translate-y-0",
                  "group-[.active]/btnblock:duration-400 group-active/btnblock:duration-400",
                )}
              />

              <span
                className={cn(
                  "btn-text relative z-1 mr-[2.7rem] transition-transform duration-600 ease-ease",
                  "group-[.active]/btnblock:translate-x-[2.7rem] group-active/btnblock:translate-x-[2.7rem]",
                )}
              >
                Get in touch
              </span>

              <span
                aria-hidden="true"
                className={cn(
                  "btn-dot absolute left-[1.8rem] top-[calc(50%-0.4rem)] h-[0.8rem] w-[calc(100%-4rem)] transition-transform duration-600 ease-ease",
                  "group-[.active]/btnblock:translate-x-[calc(-100%+0.4rem)] group-active/btnblock:translate-x-[calc(-100%+0.4rem)]",
                )}
              >
                <span className="btn-dot-inner absolute right-0 top-[calc(50%-0.2rem)] block h-[0.4rem] w-[0.4rem] rotate-45 rounded-[0.1rem] bg-green transition-colors duration-600 ease-ease" />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
