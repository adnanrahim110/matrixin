"use client";

import { cn } from "@/utils/cn";
import { ensureGsap } from "@/utils/gsap";
import { usePrefersReducedMotion } from "@/utils/usePrefersReducedMotion";
import gsap from "gsap";
import { useEffect, useMemo, useRef, useState } from "react";

function isTouchDevice() {
  if (typeof window === "undefined") return false;
  return (
    "ontouchstart" in window ||
    navigator.maxTouchPoints > 0 ||
    window.matchMedia("(pointer: coarse)").matches
  );
}

export default function AnimatedCursor() {
  const reduced = usePrefersReducedMotion();
  const disabled = useMemo(() => reduced || isTouchDevice(), [reduced]);

  const rootRef = useRef(null);
  const dotRef = useRef(null);
  const labelRef = useRef(null);

  const [visible, setVisible] = useState(false);
  const [label, setLabel] = useState("");
  const [scale, setScale] = useState(1);

  useEffect(() => {
    if (disabled) return;
    ensureGsap();

    const dot = dotRef.current;
    const root = rootRef.current;
    if (!dot || !root) return;

    gsap.set(root, { xPercent: -50, yPercent: -50 });
    gsap.set(dot, { xPercent: -50, yPercent: -50 });

    const quickX = gsap.quickTo(root, "x", {
      duration: 0.35,
      ease: "power3.out",
    });
    const quickY = gsap.quickTo(root, "y", {
      duration: 0.35,
      ease: "power3.out",
    });

    const onMove = (e) => {
      quickX(e.clientX);
      quickY(e.clientY);
    };

    const onEnter = () => setVisible(true);
    const onLeave = () => setVisible(false);

    const getCursorTarget = (el) => el?.closest?.("[data-cursor]");

    const onOver = (e) => {
      const target = getCursorTarget(e.target);
      if (!target) {
        setLabel("");
        setScale(1);
        return;
      }
      const nextLabel = target.getAttribute("data-cursor") || "";
      const nextScale = parseFloat(
        target.getAttribute("data-cursor-scale") || "1.8",
      );
      setLabel(nextLabel);
      setScale(Number.isFinite(nextScale) ? nextScale : 1.8);
    };

    const onOut = (e) => {
      const target = getCursorTarget(e.target);
      if (!target) return;
      setLabel("");
      setScale(1);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseenter", onEnter);
    window.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseover", onOver, true);
    document.addEventListener("mouseout", onOut, true);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseenter", onEnter);
      window.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseover", onOver, true);
      document.removeEventListener("mouseout", onOut, true);
    };
  }, [disabled]);

  useEffect(() => {
    if (disabled) return;
    ensureGsap();

    const dot = dotRef.current;
    const labelEl = labelRef.current;
    if (!dot || !labelEl) return;

    gsap.to(dot, { scale, duration: 0.2, ease: "power2.out" });
    gsap.to(labelEl, {
      opacity: label ? 1 : 0,
      duration: 0.15,
      ease: "power2.out",
    });
  }, [label, scale, disabled]);

  if (disabled) return null;

  return (
    <div
      ref={rootRef}
      className={cn(
        "pointer-events-none fixed left-0 top-0 z-9999 mix-blend-difference transition-opacity",
        visible ? "opacity-100" : "opacity-0",
      )}
      aria-hidden="true"
    >
      <div
        ref={dotRef}
        className="relative h-10 w-10 rounded-full border border-white/80"
      >
        <div
          ref={labelRef}
          className="absolute inset-0 flex items-center justify-center text-[10px] font-medium tracking-[0.16em] text-white opacity-0"
        >
          {label}
        </div>
      </div>
    </div>
  );
}
