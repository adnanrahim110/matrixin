import { cn } from "@/utils/cn";
import Button from "../ui/Button";

export default function WorkCta({ wrapperClassName }) {
  return (
    <div className={cn("work-cta-wrapper", wrapperClassName)}>
      <div className={cn("work-cta", "p-8 text-dark")}>
        <div
          className={cn(
            "work-cta-inner",
            "flex w-full flex-col items-center justify-center overflow-hidden rounded-[0.4rem] text-center",
            "bg-linear-to-b from-primary to-orange-300",
            "min-[1100px]:h-[44vw]",
            "max-[1099px]:px-8 max-[1099px]:py-36",
          )}
        >
          <h2
            className={cn(
              "work-cta-title font-heading text-[8rem] leading-[110%]",
              "mb-[1.7rem]",
              "max-[1099px]:text-[5.4rem] max-[1099px]:leading-[115%]",
              "max-[449px]:text-[4.4rem]",
            )}
          >
            Lets work together
          </h2>

          <p
            className={cn(
              "work-cta-text text-grey",
              "mb-24 w-204 leading-[140%]",
              "max-[1099px]:mb-16 max-[1099px]:w-full max-[1099px]:max-w-92",
            )}
          >
            Sound like your kind of studio? Tell us about your project and let’s
            work together to make it memorable.
          </p>

          <Button
            variant="magnetic"
            href="/contact"
            tone="dark"
            className="min-h-64 w-full max-w-92 min-[1100px]:h-48 min-[1100px]:min-h-48 min-[1100px]:w-176"
          >
            Get in touch
          </Button>
        </div>
      </div>
    </div>
  );
}
