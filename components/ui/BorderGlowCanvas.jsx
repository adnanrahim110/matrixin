"use client";

import { useEffect, useRef } from "react";

const BorderGlowCanvas = ({
  enabled = true,
  color = "244, 122, 35",
  size = 100,
}) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!enabled) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const el = canvas.parentElement;
    if (!el) return;

    const mm = window.matchMedia("(max-width: 1099px)");
    if (mm.matches) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.max(1, Math.floor(window.devicePixelRatio || 1));
    const range = 1000;

    const mouse = { x: 0, y: 0 };
    const eased = { x: 0, y: 0 };

    let rafId = 0;
    let lastW = 0;
    let lastH = 0;
    let radius = 0;

    const updateRadius = () => {
      const value = Number.parseFloat(
        window.getComputedStyle(el).borderTopLeftRadius,
      );
      radius = Number.isFinite(value) ? value : 0;
    };

    const resizeCanvas = (w, h) => {
      const nextW = Math.max(1, Math.round(w * dpr));
      const nextH = Math.max(1, Math.round(h * dpr));
      if (nextW === lastW && nextH === lastH) return;
      lastW = nextW;
      lastH = nextH;
      canvas.width = nextW;
      canvas.height = nextH;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      updateRadius();
    };

    const onMouseMove = (event) => {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
    };

    const loop = () => {
      const rect = el.getBoundingClientRect();
      resizeCanvas(rect.width, rect.height);

      ctx.clearRect(0, 0, rect.width, rect.height);

      const inX = mouse.x > rect.left - range && mouse.x < rect.right + range;
      const inY = mouse.y > rect.top - range && mouse.y < rect.bottom + range;
      if (!inX || !inY) {
        rafId = window.requestAnimationFrame(loop);
        return;
      }

      eased.x += (mouse.x - rect.left - eased.x) * 0.1;
      eased.y += (mouse.y - rect.top - eased.y) * 0.1;

      const gradient = ctx.createRadialGradient(
        eased.x,
        eased.y,
        0,
        eased.x,
        eased.y,
        size,
      );
      gradient.addColorStop(0, `rgba(${color}, 1)`);
      gradient.addColorStop(1, `rgba(${color}, 0)`);

      ctx.fillStyle = gradient;
      ctx.beginPath();

      if (typeof ctx.roundRect === "function") {
        const rOuter = Math.max(0, radius);
        const rInner = Math.max(0, radius - 1);
        ctx.roundRect(0, 0, rect.width, rect.height, rOuter);
        ctx.roundRect(1, 1, rect.width - 2, rect.height - 2, rInner);
        ctx.fill("evenodd");
      }

      rafId = window.requestAnimationFrame(loop);
    };

    updateRadius();
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    rafId = window.requestAnimationFrame(loop);

    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, [enabled, color, size]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-2 h-full w-full"
    />
  );
};

export default BorderGlowCanvas;
