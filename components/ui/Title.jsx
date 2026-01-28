"use client";

import { cn } from "@/utils/cn";
import { ensureGsap } from "@/utils/gsap";
import gsap from "gsap";
import { memo, useLayoutEffect, useRef } from "react";

const SIZES = {
  h1: "text-[clamp(3.8rem,4vw+2rem,5.4rem)] leading-[100%]",
  h2: "text-[clamp(3rem,3.5vw+1.5rem,4.4rem)] leading-[110%]",
  h3: "text-[clamp(2.4rem,3vw+1rem,3.4rem)] leading-[120%]",
  h4: "text-[clamp(2rem,2.5vw+0.8rem,2.8rem)] leading-[130%]",
  h5: "text-[clamp(1.8rem,2vw+0.5rem,2.4rem)] leading-[140%]",
  h6: "text-[clamp(1.6rem,1.5vw+0.5rem,2rem)] leading-[150%]",
  display: "text-[clamp(4.2rem,6vw+1rem,12rem)] leading-[90%]", // For Hero/large text
};

const TONES = {
  black: "text-dark",
  white: "text-light",
};

/**
 * Splits text content into words wrapped in spans, preserving HTML structure.
 * Returns a document fragment.
 */
const splitNodes = (element, wordsArray = []) => {
  const frag = document.createDocumentFragment();
  const childNodes = Array.from(element.childNodes);

  childNodes.forEach((node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent;
      if (!text.trim()) {
        frag.appendChild(node.cloneNode(true));
        return;
      }

      const words = text.split(/(\s+)/);
      words.forEach((word) => {
        if (!word.trim().length) {
          frag.appendChild(document.createTextNode(word));
          return;
        }
        const span = document.createElement("span");
        span.className = "word inline-block will-change-transform";
        span.textContent = word;
        frag.appendChild(span);
        wordsArray.push(span);
      });
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      const clone = node.cloneNode(false);
      const { words } = splitNodes(node, wordsArray); // Recurse
      // Move children from recursive call to clone
      while (clone.firstChild) clone.removeChild(clone.firstChild); // Should be empty anyway but safe
      // We need to append the fragment content to the clone.
      // splitNodes returns a fragment, but we can't append it directly to clone
      // if we are restructuring. Wait, splitNodes doesn't return frag, it mutates.
      // Let's adjust helper.

      // Actually, let's keep it simple.
      // Logic: recursive function returns a fragment and populates wordsArray.
      const childrenFrag = splitNodes(node, wordsArray).fragment;
      clone.appendChild(childrenFrag);
      frag.appendChild(clone);
    } else {
      frag.appendChild(node.cloneNode(true));
    }
  });

  return { fragment: frag, words: wordsArray };
};

// Helper correctly implementing the recursive split
const splitChildren = (element) => {
  const words = [];

  const processNode = (node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent;
      const frag = document.createDocumentFragment();

      const parts = text.split(/(\s+)/);
      parts.forEach((part) => {
        if (!part.trim()) {
          frag.appendChild(document.createTextNode(part));
          return;
        }
        const span = document.createElement("span");
        span.className =
          "word inline-block will-change-transform opacity-0 blur-sm"; // Initial state handled by GSAP usually, but good to have class
        span.textContent = part;
        words.push(span);
        frag.appendChild(span);
      });
      return frag;
    }

    if (node.nodeType === Node.ELEMENT_NODE) {
      const clone = node.cloneNode(false);
      const childNodes = Array.from(node.childNodes);
      childNodes.forEach((child) => {
        clone.appendChild(processNode(child));
      });
      return clone;
    }

    return node.cloneNode(true);
  };

  const frag = document.createDocumentFragment();
  Array.from(element.childNodes).forEach((child) => {
    frag.appendChild(processNode(child));
  });

  return { fragment: frag, words };
};

const Title = ({
  as: Tag = "h2",
  size,
  tone = "black",
  className,
  children,
  ...props
}) => {
  const elRef = useRef(null);
  const originalRef = useRef(null); // To store original content for revert

  const sizeClass = SIZES[size || Tag] || SIZES.h2;
  const toneClass = TONES[tone] || TONES.black;

  useLayoutEffect(() => {
    ensureGsap();
    const el = elRef.current;
    if (!el) return;

    // Save original content if not saved
    if (!originalRef.current) originalRef.current = el.innerHTML;

    // 1. Split text
    // We need to render children first, then split.
    // React renders children. We manipulate DOM.

    const { fragment, words } = splitChildren(el);
    el.innerHTML = "";
    el.appendChild(fragment);

    // 2. Animate
    // We used simple word staggering in About.jsx or moveBlur.
    // moveBlur expects { autoAlpha: 0, filter: 'blur(2rem)', yPercent: 100 }

    gsap.set(words, { autoAlpha: 0, filter: "blur(2rem)", yPercent: 60 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: "top 85%", // Reveal when top of element hits 85% of viewport height
        toggleActions: "play none none reverse",
      },
    });

    tl.to(words, {
      autoAlpha: 1,
      filter: "blur(0rem)",
      yPercent: 0,
      duration: 1.2,
      ease: "power4.out",
      stagger: 0.05,
    });

    return () => {
      tl.kill();
      if (originalRef.current) el.innerHTML = originalRef.current;
    };
  }, [children]); // Re-run if children change, though dangerous for layout effect + dom manip

  return (
    <Tag
      ref={elRef}
      className={cn("font-heading block", sizeClass, toneClass, className)}
      {...props}
    >
      {children}
    </Tag>
  );
};

export default memo(Title);
