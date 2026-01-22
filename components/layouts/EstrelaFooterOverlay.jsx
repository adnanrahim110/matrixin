"use client";

import { cn } from "@/utils/cn";

const svgClass = (active) =>
  cn(
    "w-full opacity-0 [filter:blur(2rem)] transition-[opacity,filter] duration-[1310ms] ease-ease",
    active && "opacity-100 [filter:blur(0rem)]",
  );

const Letter = ({ id, active, char }) => {
  return (
    <div
      className={cn(
        "f-letter absolute left-0 top-0 will-change-transform",
        `f-letter-${id}`,
      )}
      data-footer-letter={id}
    >
      <svg
        width="140"
        height="160"
        viewBox="0 0 140 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn(svgClass(active), "text-dark")}
      >
        <text
          x="0"
          y="125"
          fill="currentColor"
          fontSize="90"
          fontWeight="600"
          style={{ fontFamily: "var(--font-heading, Inter, system-ui)" }}
        >
          {char}
        </text>
      </svg>
    </div>
  );
};

const EstrelaFooterOverlay = ({ active = false }) => {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "f-overlay pointer-events-none absolute inset-0 z-2 hidden min-[1100px]:block",
        "bg-linear-to-b from-n-5 to-orange",
        "transition-[clip-path,transform] duration-600 ease-ease",
        "[clip-path:polygon(0_0,100%_0,100%_0,0_-50%)]",
        "-translate-y-0.5 will-change-[clip-path]",
        active &&
          "pointer-events-auto duration-900 [clip-path:polygon(0_0,100%_0,100%_100%,0_100%)] translate-y-0",
      )}
    >
      <div className="f-letters absolute inset-0">
        <Letter id="M" active={active} char="M" />
        <Letter id="a" active={active} char="a" />
        <Letter id="r" active={active} char="r" />
        <Letter id="k" active={active} char="k" />
        <Letter id="e" active={active} char="e" />
        <Letter id="t" active={active} char="t" />
        <Letter id="i1" active={active} char="i" />
        <Letter id="n" active={active} char="n" />
        <Letter id="i2" active={active} char="i" />
        <Letter id="x" active={active} char="x" />
      </div>
    </div>
  );
};

export default EstrelaFooterOverlay;
