"use client";

import { cn } from "@/utils/cn";

export const ThemedSection = ({
  as: Tag = "section",
  id,
  theme = "light",
  labelledBy,
  className,
  children,
}) => {
  const isDark = theme === "dark";
  return (
    <Tag
      id={id}
      data-theme={theme}
      aria-labelledby={labelledBy}
      className={cn(
        "relative w-full border-t px-8 max-[449px]:px-6",
        isDark
          ? "border-white/10 bg-dark text-light"
          : "border-dark/10 bg-light text-dark",
        className,
      )}
    >
      {children}
    </Tag>
  );
};

export const themeTokens = (theme = "light") => {
  const isDark = theme === "dark";
  return {
    isDark,
    overline: isDark ? "text-light/60" : "text-dark/60",
    subtle: isDark ? "text-light/70" : "text-dark/70",
    subtle2: isDark ? "text-light/80" : "text-dark/80",
    border: isDark ? "border-white/10" : "border-dark/10",
    panel: isDark ? "bg-white/5" : "bg-dark/5",
    card: isDark
      ? "border-white/10 bg-white/5 hover:bg-white/10"
      : "border-dark/10 bg-transparent hover:bg-dark/5",
    cardStatic: isDark
      ? "border-white/10 bg-white/5"
      : "border-dark/10 bg-transparent",
    icon: isDark ? "bg-light/70" : "bg-dark/70",
    openBg: isDark ? "open:bg-white/10" : "open:bg-dark/5",
  };
};

export const toneDot = (tone) =>
  cn(
    "h-[0.6rem] w-[0.6rem] rotate-45 rounded-[0.1rem] bg-primary",
    tone === "green" && "bg-green",
    tone === "purple" && "bg-purple",
    tone === "blue" && "bg-blue",
    tone === "yellow" && "bg-yellow",
    tone === "orange" && "bg-orange",
    tone === "pink" && "bg-primary",
    tone === "teal" && "bg-green",
    tone === "cyan" && "bg-blue",
    tone === "indigo" && "bg-purple",
    tone === "slate" && "bg-white/60",
  );

export const toneBar = (tone) =>
  cn(
    "bg-primary",
    tone === "green" && "bg-green",
    tone === "purple" && "bg-purple",
    tone === "blue" && "bg-blue",
    tone === "yellow" && "bg-yellow",
    tone === "orange" && "bg-orange",
  );

export const OrbitIcon = ({ tone, className }) => (
  <span
    aria-hidden="true"
    className={cn(
      "relative shrink-0 inline-flex h-8 w-8 items-center justify-center rounded-full",
      "border border-dark/10 bg-light/80",
      "shadow-[0_0_0_0.1rem_rgba(2,2,2,0.04)]",
      className,
    )}
  >
    <span className={cn("block", toneDot(tone), "h-[0.8rem] w-[0.8rem]")} />
  </span>
);
