import { cn } from "@/utils/cn";

export default function WorkArchiveTitle() {
  return (
    <div className="work-title-wrapper flex h-screen w-full items-center justify-center">
      <h1
        className={cn(
          "work-title font-heading text-[12.4rem] leading-[100%]",
          "max-[1099px]:text-[7.4rem] max-[1099px]:leading-[110%]",
        )}
      >
        <span className="work-title-text">All Work</span>
      </h1>
    </div>
  );
}
