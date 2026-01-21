"use client";

import { useEffect, useRef } from "react";

import { cn } from "@/utils/cn";

const ESTRELA_SHOWREEL =
  "https://estrelastudio.cdn.prismic.io/estrelastudio/aRwnE7pReVYa4l9N_Estrela_CompressedShowreel.mp4";

const Showreel = ({ open = false, onClose }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    document.documentElement.classList.toggle("showreel-active", open);
    return () => document.documentElement.classList.remove("showreel-active");
  }, [open]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (open) {
      video.play?.().catch(() => {});
      return;
    }

    video.pause?.();
  }, [open]);

  return (
    <div
      aria-hidden={!open}
      className={cn(
        "fixed inset-0 z-12 flex items-center justify-center bg-grey-dark",
        "transition-[clip-path,background-color,visibility] duration-700 ease-ease",
        "[clip-path:polygon(0_0,100%_0,100%_0,0_-25%)]",
        open
          ? "visible pointer-events-auto bg-dark duration-1000 [clip-path:polygon(0_0,100%_0,100%_100%,0_100%)]"
          : "invisible pointer-events-none",
      )}
      data-showreel
    >
      <button
        type="button"
        aria-label="Close showreel"
        onClick={onClose}
        className={cn(
          "group absolute right-8 top-8 z-1 inline-flex h-24 items-center justify-center rounded-[0.2rem] px-8",
          "text-[1.4rem] leading-none text-light",
        )}
      >
        <span
          aria-hidden="true"
          className={cn(
            "absolute inset-0 rounded-[0.2rem] bg-white/10",
            "[-webkit-backdrop-filter:blur(1.2rem)] backdrop-blur-[1.2rem]",
            "shadow-[inset_0_0_.8rem_rgba(255,255,255,0.02),inset_0_0_.2rem_rgba(255,255,255,0.2)]",
            "transition-[clip-path] duration-600 delay-100 ease-ease",
            open
              ? "[clip-path:inset(0_0_0%_0)]"
              : "[clip-path:inset(0_0_100%_0)]",
          )}
        />
        <span className="relative block overflow-hidden">
          <span
            className={cn(
              "block translate-y-[105%] transition-transform duration-400 ease-ease",
              open ? "translate-y-0 delay-400 duration-1000" : "",
            )}
          >
            Close
          </span>
        </span>
      </button>

      <div
        className={cn(
          "relative w-[80vw] overflow-hidden rounded-[0.2rem] bg-dark",
          "transition-[clip-path] duration-800 ease-ease",
          "max-[1099px]:w-[calc(100%-4rem)]",
          open
            ? "[clip-path:inset(0_0_0%_0)] delay-200 duration-1000"
            : "[clip-path:inset(0_0_100%_0)]",
        )}
      >
        <div className="relative aspect-video w-full">
          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full object-cover"
            src={ESTRELA_SHOWREEL}
            playsInline
            muted
            loop
            preload="metadata"
          />
        </div>
      </div>
    </div>
  );
};

export default Showreel;
