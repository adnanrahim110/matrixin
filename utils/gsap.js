"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomEase } from "gsap/CustomEase";

let didInit = false;

export function ensureGsap() {
  if (didInit) return;
  didInit = true;

  gsap.registerPlugin(ScrollTrigger, CustomEase);
  CustomEase.create("inOut", "0.85,0,0.15,1");

  if (!gsap.effects?.blur) {
    gsap.registerEffect({
      name: "blur",
      effect: (targets, config) =>
        gsap.fromTo(
          targets,
          { autoAlpha: 0, filter: "blur(2rem)" },
          {
            autoAlpha: 1,
            filter: "blur(0rem)",
            duration: config.duration,
            ease: config.ease,
            stagger: config.stagger,
          }
        ),
      defaults: { duration: 1.2, ease: "power4.out", stagger: 0 },
      extendTimeline: true,
    });
  }

  if (!gsap.effects?.moveBlur) {
    gsap.registerEffect({
      name: "moveBlur",
      effect: (targets, config) =>
        gsap.fromTo(
          targets,
          { yPercent: config.yPercent, autoAlpha: 0, filter: config.filter },
          {
            yPercent: 0,
            autoAlpha: 1,
            filter: "blur(0rem)",
            duration: config.duration,
            ease: config.ease,
            stagger: config.stagger,
          }
        ),
      defaults: {
        duration: 1.2,
        ease: "power4.out",
        stagger: 0.07,
        yPercent: 100,
        filter: "blur(2rem)",
      },
      extendTimeline: true,
    });
  }
}
