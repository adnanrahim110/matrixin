"use client";

import gsap from "gsap";
import Link from "next/link";
import { useLayoutEffect, useRef } from "react";

import { cn } from "@/utils/cn";
import { ensureGsap } from "@/utils/gsap";

const Loader = () => (
  <svg
    className="animate-spin h-5 w-5"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    ></circle>
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    ></path>
  </svg>
);

const TONES = {
  default: "bg-primary",
  dark: "bg-dark",
  light: "bg-light",
  green: "bg-green",
  purple: "bg-purple",
  blue: "bg-blue",
};

const BEFORE_TONES = {
  default: "before:bg-primary",
  dark: "before:bg-dark",
  light: "before:bg-light",
  green: "before:bg-green",
  purple: "before:bg-purple",
  blue: "before:bg-blue",
};

const Button = ({
  children,
  href,
  onClick,
  type = "button",
  disabled = false,
  loading = false,
  variant = "static",
  tone = "default",
  className,
  ...props
}) => {
  const blockRef = useRef(null);
  const btnRef = useRef(null);

  const Tag = href ? Link : "button";
  const isMagnetic = variant === "magnetic";
  const isDisabled = disabled || loading;

  let effectiveTone = tone;
  if (!isMagnetic && tone === "default") {
    effectiveTone = "dark";
  }

  const toneClass = TONES[effectiveTone] || TONES.default;
  const beforeClass = BEFORE_TONES[effectiveTone] || BEFORE_TONES.default;

  useLayoutEffect(() => {
    if (!isMagnetic || isDisabled) return;
    ensureGsap();

    const block = blockRef.current;
    const btn = btnRef.current;
    if (!block || !btn) return;

    if (window.matchMedia("(max-width: 1099px)").matches) return;

    const x = gsap.quickTo(btn, "x", {
      duration: 0.6,
      ease: "power3.out",
      overwrite: "auto",
    });
    const y = gsap.quickTo(btn, "y", {
      duration: 0.6,
      ease: "power3.out",
      overwrite: "auto",
    });

    const onMove = (event) => {
      block.classList.add("active");
      const r = block.getBoundingClientRect();
      x(event.clientX - r.left - r.width * 0.5);
      y(event.clientY - r.top - r.height * 0.5);
    };

    const onLeave = () => {
      block.classList.remove("active");
      x(0);
      y(0);
    };

    block.addEventListener("mousemove", onMove);
    block.addEventListener("mouseleave", onLeave);

    return () => {
      block.removeEventListener("mousemove", onMove);
      block.removeEventListener("mouseleave", onLeave);
      x(0);
      y(0);
    };
  }, [isMagnetic, isDisabled]);

  const renderInner = () => (
    <>
      <span
        className={cn(
          "btn-bg absolute left-[-1%] top-[-1%] z-0 h-[102%] w-[102%]",
          isMagnetic
            ? effectiveTone === "dark"
              ? "bg-white"
              : "bg-dark"
            : toneClass,
          "-translate-y-[102%] transition-transform duration-300 ease-ease",
          "group-[.active]/btnblock:translate-y-0 group-active/btnblock:translate-y-0",
          "group-[.active]/btnblock:duration-400 group-active/btnblock:duration-400",
          !isMagnetic &&
            "group-hover/btn:translate-y-0 group-hover/btn:duration-400",
        )}
      />

      <span
        className={cn(
          "btn-text relative z-1 mr-[2.7rem] transition-transform duration-600 ease-ease flex items-center justify-center",
          "group-[.active]/btnblock:translate-x-[2.7rem] group-active/btnblock:translate-x-[2.7rem]",
          !isMagnetic && "group-hover/btn:translate-x-[2.7rem]",
          loading && "opacity-0",
        )}
      >
        {children}
      </span>

      {loading && (
        <span className="absolute z-2 inset-0 flex items-center justify-center text-current">
          <Loader />
        </span>
      )}

      <span
        className={cn(
          "btn-dot absolute left-[1.8rem] top-[calc(50%-0.4rem)] h-[0.8rem] w-[calc(100%-4rem)] transition-transform duration-600 ease-ease",
          "group-[.active]/btnblock:translate-x-[calc(-100%+0.4rem)] group-active/btnblock:translate-x-[calc(-100%+0.4rem)]",
          !isMagnetic && "group-hover/btn:translate-x-[calc(-100%+0.4rem)]",
        )}
      >
        <span
          className={cn(
            "btn-dot-inner absolute right-0 top-[calc(50%-0.2rem)] block h-[0.4rem] w-[0.4rem] rotate-45 rounded-[0.1rem] transition-colors duration-600 ease-ease",
            !isMagnetic ? "bg-primary" : toneClass,
          )}
        />
      </span>
    </>
  );

  if (isMagnetic) {
    return (
      <div
        ref={blockRef}
        className={cn(
          "btn-block group/btnblock relative flex min-h-48 w-full items-center justify-center overflow-hidden rounded-[0.2rem]",
          "bg-[rgba(247,247,247,0.1)]",
          "before:content-[''] before:absolute before:inset-0 before:z-0 before:rounded-[0.2rem]",
          beforeClass,
          "before:[clip-path:inset(0_0_102%_0)] before:transition-[clip-path] before:duration-600 before:ease-ease",
          !isDisabled &&
            "[&.active]:before:[clip-path:inset(0_0_0%_0)] active:before:[clip-path:inset(0_0_0%_0)]",
          isDisabled && "opacity-50 cursor-not-allowed",
          className,
        )}
      >
        {!isDisabled && href && (
          <Link
            href={href}
            className="btn-block-link absolute inset-0 z-1 block"
            {...props}
          />
        )}

        {!isDisabled && !href && (
          <button
            type={type}
            onClick={onClick}
            disabled={isDisabled}
            className="btn-block-link absolute inset-0 z-1 block appearance-none bg-transparent"
            {...props}
          />
        )}

        <span
          ref={btnRef}
          className={cn(
            "btn pointer-events-none relative z-1 inline-flex h-12 items-center overflow-hidden rounded-[0.4rem] bg-transparent px-[2.2rem] text-light",
            isMagnetic &&
              effectiveTone === "dark" &&
              "group-[.active]/btnblock:text-dark group-active/btnblock:text-dark",
          )}
        >
          {renderInner()}
        </span>
      </div>
    );
  }

  return (
    <Tag
      href={href || ""}
      onClick={!isDisabled ? onClick : undefined}
      type={!href ? type : undefined}
      disabled={!href ? isDisabled : undefined}
      className={cn(
        "btn group/btn relative inline-flex h-16 items-center overflow-hidden rounded-[0.4rem] px-[2.2rem]",
        effectiveTone === "light"
          ? "bg-[rgba(255,255,255,0.1)] text-light"
          : "bg-[rgba(188,188,188,0.1)] text-dark",
        "transition-colors duration-300 ease-ease",
        !isDisabled &&
          (effectiveTone === "light" ? "hover:text-dark" : "hover:text-light"),
        isDisabled && "opacity-50 cursor-not-allowed bg-gray-200 text-gray-500",
        className,
      )}
      {...props}
    >
      {renderInner()}
    </Tag>
  );
};

export default Button;
