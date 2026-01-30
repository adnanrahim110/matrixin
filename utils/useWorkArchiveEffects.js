"use client";

import { ensureGsap } from "@/utils/gsap";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect } from "react";

export function useWorkArchiveEffects({ rootRef, lenisRef }) {
  useLayoutEffect(() => {
    ensureGsap();

    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => { }, root);
    const cleanups = [];

    const isMobile = window.matchMedia("(max-width: 1099px)").matches;

    const splitHover = (element) => {
      if (!element) return () => { };
      if (element.dataset.splitHoverInit === "1") return () => { };

      const text = element.textContent ?? "";
      element.dataset.splitHoverInit = "1";
      element.dataset.splitHoverText = text;

      element.innerHTML = `
        <span class="split split-hover">
          <span class="line line-normal">${text}</span>
          <span class="line line-hover">${text}</span>
        </span>
      `;

      return () => {
        if (!element) return;
        element.textContent = element.dataset.splitHoverText ?? "";
        delete element.dataset.splitHoverInit;
        delete element.dataset.splitHoverText;
      };
    };

    const remToPx = (rem) => {
      const rootFontSize = Number.parseFloat(
        window.getComputedStyle(document.documentElement).fontSize || "16"
      );
      return rem * rootFontSize;
    };

    const splitLine = (element) => {
      if (!element) return { line: null, revert: () => { } };
      if (element.dataset.splitLineInit === "1") {
        return { line: element.querySelector(".line"), revert: () => { } };
      }

      const text = element.textContent ?? "";
      element.dataset.splitLineInit = "1";
      element.dataset.splitLineText = text;

      element.innerHTML = `
        <span class="split split-line">
          <span class="line">${text}</span>
        </span>
      `;

      const line = element.querySelector(".line");

      const revert = () => {
        if (!element) return;
        element.textContent = element.dataset.splitLineText ?? "";
        delete element.dataset.splitLineInit;
        delete element.dataset.splitLineText;
      };

      return { line, revert };
    };

    const splitLines = (element) => {
      if (!element) return { inlines: [], revert: () => { } };
      if (element.dataset.splitLinesInit === "1") return { inlines: [], revert: () => { } };

      const originalText = element.textContent || "";
      const words = originalText.trim().split(/\s+/).filter(Boolean);

      element.dataset.splitLinesInit = "1";
      element.dataset.splitLinesText = originalText;

      element.classList.add("split", "split-lines");
      element.textContent = "";

      words.forEach((word, index) => {
        const span = document.createElement("span");
        span.className = "word";
        span.textContent = word + (index === words.length - 1 ? "" : "\u00A0");
        element.appendChild(span);
      });

      const wordEls = Array.from(element.querySelectorAll(".word"));
      if (!wordEls.length) {
        return {
          inlines: [],
          revert: () => {
            element.classList.remove("split", "split-lines");
            element.textContent = originalText;
            delete element.dataset.splitLinesInit;
            delete element.dataset.splitLinesText;
          },
        };
      }

      const lines = [];
      let currentLine = [];
      let currentTop = null;

      wordEls.forEach((wordEl) => {
        const top = wordEl.offsetTop;
        if (currentTop === null) currentTop = top;

        if (Math.abs(top - currentTop) > 2) {
          lines.push(currentLine);
          currentLine = [];
          currentTop = top;
        }

        currentLine.push(wordEl);
      });

      if (currentLine.length) lines.push(currentLine);

      const frag = document.createDocumentFragment();
      const inlines = [];

      lines.forEach((lineWords) => {
        const line = document.createElement("span");
        line.className = "line";

        const inner = document.createElement("span");
        inner.className = "line-inner";
        lineWords.forEach((w) => inner.appendChild(w));
        line.appendChild(inner);
        frag.appendChild(line);
        inlines.push(inner);
      });

      element.textContent = "";
      element.appendChild(frag);

      return {
        inlines,
        revert: () => {
          element.classList.remove("split", "split-lines");
          element.textContent = element.dataset.splitLinesText ?? "";
          delete element.dataset.splitLinesInit;
          delete element.dataset.splitLinesText;
        },
      };
    };

    const refreshScroll = () => {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          lenisRef.current?.resize?.();
          ScrollTrigger.update();
          ScrollTrigger.refresh(true);
        });
      });
    };

    const setupFilter = () => {
      const filterEl = root.querySelector(".work-filter");
      const filterInput = root.querySelector("#work-filter");
      const filterSelect = root.querySelector(".work-filter-select-text");
      const filterOptions = Array.from(root.querySelectorAll(".work-filter-btn"));
      const filterClose = root.querySelector(".work-filter-select-close");
      const filterBorder = root.querySelector(".work-filter-border");
      const filterBorderActive = root.querySelector(".work-filter-border-active");

      if (!filterEl || !filterInput || !filterSelect || !filterClose) {
        return { filterInput: null };
      }

      let current = "all";
      let active = false;
      let filtered = false;

      const revertSelect = splitHover(filterSelect);
      cleanups.push(revertSelect);

      const selectTexts = filterSelect.querySelectorAll(".line");

      const inTl = gsap.timeline({ paused: true, defaults: { overwrite: "auto" } });
      const outTl = gsap.timeline({ paused: true, defaults: { overwrite: "auto" } });

      if (!isMobile && filterBorder && filterBorderActive) {
        gsap.set(filterBorderActive, { autoAlpha: 0 });

        inTl.set(filterBorder, { autoAlpha: 0 }, 0);
        inTl.set(filterBorderActive, { autoAlpha: 1 }, 0);
        outTl.set(filterBorderActive, { autoAlpha: 0 }, 0);
        outTl.set(filterBorder, { autoAlpha: 1 }, 0);
      }

      inTl.to(
        filterEl,
        { width: "23.5rem", height: "auto", duration: 0.6, ease: "power3.out" },
        0
      );
      outTl.to(
        filterEl,
        { width: "auto", height: "4rem", duration: 0.3, ease: "power3.out" },
        0
      );

      const toggle = () => {
        active = !active;
        if (active) {
          filterEl.classList.add("active");
          outTl.pause(0);
          outTl.invalidate();
          inTl.invalidate();
          requestAnimationFrame(() => inTl.restart());
        } else {
          filterEl.classList.remove("active");
          inTl.pause(0);
          inTl.invalidate();
          outTl.invalidate();
          requestAnimationFrame(() => outTl.restart());
        }
      };

      const onSelectClick = (event) => {
        event.preventDefault();
        toggle();
      };

      const onCloseClick = (event) => {
        event.preventDefault();

        if (active) {
          toggle();
          return;
        }
        if (!filtered) return;

        filtered = false;
        filterEl.classList.remove("filtered");
        filterInput.value = "all";
        filterInput.dispatchEvent(new Event("change", { bubbles: true }));
        current = "all";

        selectTexts.forEach((line) => {
          line.textContent = "Work filter";
        });
      };

      const onDocClick = (event) => {
        if (!active) return;
        const target = event.target;
        if (target && filterEl.contains(target)) return;
        toggle();
      };

      filterSelect.addEventListener("click", onSelectClick);
      filterClose.addEventListener("click", onCloseClick);
      document.addEventListener("click", onDocClick);

      cleanups.push(() => filterSelect.removeEventListener("click", onSelectClick));
      cleanups.push(() => filterClose.removeEventListener("click", onCloseClick));
      cleanups.push(() => document.removeEventListener("click", onDocClick));

      filterOptions.forEach((option) => {
        const revertOption = splitHover(option);
        cleanups.push(revertOption);

        const onOptionClick = (event) => {
          event.preventDefault();

          const next = option.getAttribute("data-value") || "all";
          const title = option.getAttribute("data-title") || "Work filter";

          if (current === next) {
            toggle();
            return;
          }

          filterInput.value = next;
          filterInput.dispatchEvent(new Event("change", { bubbles: true }));
          current = next;

          selectTexts.forEach((line) => {
            line.textContent = title;
          });

          if (next === "all") {
            filtered = false;
            filterEl.classList.remove("filtered");
          } else {
            filtered = true;
            filterEl.classList.add("filtered");
          }

          toggle();
        };

        option.addEventListener("click", onOptionClick);
        cleanups.push(() => option.removeEventListener("click", onOptionClick));
      });

      return { filterInput };
    };

    const setupSwitcher = () => {
      const switcherEl = root.querySelector(".work-switcher");
      if (!switcherEl) return;

      const inputs = Array.from(switcherEl.querySelectorAll('[name="work-switcher"]'));
      const options = Array.from(switcherEl.querySelectorAll(".work-switcher-option"));
      let index = 0;

      if (inputs[0]) inputs[0].checked = true;

      options.forEach((option, optionIndex) => {
        const textEl = option.querySelector(".work-switcher-text");
        if (textEl) {
          const revert = splitHover(textEl);
          cleanups.push(revert);
        }

        const onClick = (event) => {
          event.preventDefault();
          if (optionIndex === index) return;

          const prev = options[index];
          const next = options[optionIndex];
          const input = inputs[optionIndex];

          if (input) {
            input.checked = true;
            input.dispatchEvent(new Event("change", { bubbles: true }));
          }

          prev?.classList.remove("active");
          next?.classList.add("active");
          index = optionIndex;
        };

        option.addEventListener("click", onClick);
        cleanups.push(() => option.removeEventListener("click", onClick));
      });
    };

    const setupTitlePin = () => {
      ctx.add(() => {
        const titleWrapper = root.querySelector(".work-title-wrapper");
        const title = root.querySelector(".work-title");
        if (!titleWrapper || !title) return;

        gsap
          .timeline({
            scrollTrigger: {
              trigger: titleWrapper,
              start: "top top",
              end: () => `+=${window.innerHeight * 0.3}`,
              pin: true,
              pinSpacing: false,
              anticipatePin: 1,
              pinType: isMobile ? "fixed" : "transform",
              scrub: true,
            },
          })
          .to(title, { autoAlpha: 0, filter: "blur(1.2rem)", duration: 0.5 }, 0);
      });
    };

    const setupListSplits = () => {
      const listSplits = [];

      const apply = () => {
        listSplits.splice(0).forEach((revert) => revert?.());

        root.querySelectorAll(".work-list-project").forEach((projectEl) => {
          const num = projectEl.querySelector(".project-number");
          const numSplit = splitLine(num);
          if (numSplit?.revert) listSplits.push(numSplit.revert);

          const clientSplit = splitLines(projectEl.querySelector(".project-client"));
          const titleSplit = splitLines(projectEl.querySelector(".project-title"));

          if (clientSplit?.revert) listSplits.push(clientSplit.revert);
          if (titleSplit?.revert) listSplits.push(titleSplit.revert);
        });
      };

      apply();
      cleanups.push(() => listSplits.splice(0).forEach((revert) => revert?.()));

      return { apply };
    };

    const collectProjects = () => {
      const projects = [];
      root.querySelectorAll(".project").forEach((projectEl) => {
        let services = "";
        try {
          services = JSON.parse(projectEl.getAttribute("data-services") || '""');
        } catch {
          services = projectEl.getAttribute("data-services") || "";
        }
        projects.push({ el: projectEl, services });
      });
      return projects;
    };

    const setupWorkTransitions = () => {
      const grid = root.querySelector(".work-grid");
      const list = root.querySelector(".work-list");

      const listWrapper = list?.querySelector(".work-list-wrapper");
      const listInner = list?.querySelector(".work-list-inner");
      const listProjects = list?.querySelector(".work-list-projects");

      const gridCtaWrapper = grid?.querySelector(".work-cta-wrapper");
      const gridCta = grid?.querySelector(".work-cta-inner");
      const listCtaWrapper = list?.querySelector(".work-cta-wrapper");
      const listCta = list?.querySelector(".work-cta-inner");

      let activeView = 0;
      let workContext = null;
      const stopAllVideos = () => {
        if (!grid) return;
        grid.querySelectorAll("video").forEach((video) => {
          video.pause?.();
        });
      };

      const out = () => {
        stopAllVideos();
        grid?.classList.remove("loaded");
        list?.classList.remove("loaded");
      };

      const gridIn = () => {
        if (!grid) return;

        workContext = gsap.context(() => {
          grid.classList.add("active");
          const projectsEls = grid.querySelectorAll(".project:not(.active)");

          if (!isMobile && gridCtaWrapper && gridCta) {
            gsap
              .timeline({
                scrollTrigger: {
                  trigger: gridCtaWrapper,
                  start: "top bottom",
                  end: "bottom bottom",
                  scrub: true,
                },
              })
              .fromTo(gridCta, { height: 0 }, { height: window.innerWidth * 0.44 });
          }

          const inTl = gsap
            .timeline({ paused: true })
            .fromTo(
              projectsEls,
              { autoAlpha: 0, y: "5rem" },
              { autoAlpha: 1, y: 0, duration: 2, ease: "power3.out", stagger: 0.1 }
            );

          grid.classList.add("loaded");
          inTl.play();
        }, root);
      };

      const listIn = () => {
        if (!list || !listWrapper || !listInner || !listProjects) return;

        workContext = gsap.context(() => {
          list.classList.add("active");

          const items = [];
          const revealTl = gsap.timeline({ paused: true });

          let height = 0;
          let activeHeight = 0;
          let imageHeight = 0;
          let activeImageHeight = 0;

          if (!isMobile) {
            height = remToPx(7.4);
            activeHeight = remToPx(26);
            imageHeight = remToPx(3.4);
            activeImageHeight = remToPx(22);
          }

          list.querySelectorAll(".project:not(.inactive)").forEach((projectEl, idx) => {
            const image = projectEl.querySelector(".project-media");
            const border = projectEl.querySelector(".project-border");
            const number = projectEl.querySelector(".project-number .line");
            const client = projectEl.querySelectorAll(".project-client .line-inner");
            const title = projectEl.querySelectorAll(".project-title .line-inner");

            if (number) number.textContent = String(idx + 1).padStart(2, "0");

            if (idx === 0 && !isMobile) {
              gsap.set(projectEl, { height: activeHeight });
              gsap.set(image, { height: activeImageHeight, autoAlpha: 1 });
            }

            items.push({ el: projectEl, image, border, number, client, title });
          });

          if (!isMobile && items.length > 1 && listCtaWrapper && listCta) {
            const ctaHeight = listCtaWrapper.offsetHeight;
            const totalHeight = Math.ceil(height * (items.length - 1) + activeHeight);
            const offCenter =
              window.innerHeight * 0.6 - (window.innerHeight - activeHeight) * 0.5;
            const finalOffset =
              (window.innerHeight - activeHeight) * 0.5 +
              activeHeight -
              (window.innerHeight - ctaHeight);

            const baseDuration = 1.5;
            const duration = baseDuration / (items.length - 1);
            const finalStart = 0.1 + baseDuration;

            const distanceOne = window.innerHeight * 0.5;
            const distanceTwo = totalHeight;
            const distanceThree = window.innerHeight * 4;

            gsap.set(list, { height: distanceOne + distanceTwo + distanceThree });
            gsap.set(listWrapper, { height: distanceOne + distanceTwo + distanceThree });

            const sTl = gsap
              .timeline({
                scrollTrigger: {
                  trigger: listWrapper,
                  start: "top top",
                  end: "bottom bottom",
                  pin: true,
                  scrub: true,
                  pinSpacing: false,
                },
                defaults: { ease: "none", duration },
              })
              .to(listInner, { y: -offCenter, ease: "power1.out", duration: 0.2 }, 0)
              .to(
                listProjects,
                {
                  y: -(
                    totalHeight -
                    window.innerHeight +
                    (window.innerHeight - activeHeight)
                  ),
                  duration: baseDuration,
                },
                0.1
              )
              .to(listInner, { y: -finalOffset, duration: 0.4 }, finalStart)
              .to(listCtaWrapper, { y: -finalOffset, duration: 0.4 }, finalStart)
              .fromTo(
                listCta,
                { height: 0 },
                { height: window.innerWidth * 0.44, duration: 0.4 },
                finalStart
              );

            items.forEach((item, index) => {
              const start = 0.1 + index * duration;
              const activeStart = start - duration;

              const el = item.el;
              const img = item.image;
              if (!el || !img) return;

              if (index === 0) {
                sTl.to(el, { height }, 0.1);
                sTl.to(img, { height: imageHeight }, 0.1);
                sTl.to(img, { autoAlpha: 0 }, 0.1);
                return;
              }

              if (index !== items.length - 1) {
                sTl.to(el, { height }, start);
                sTl.to(img, { height: imageHeight }, start);
                sTl.to(img, { autoAlpha: 0 }, start);
              } else {
                sTl.to(el, { height, duration: 0.4 }, finalStart);
                sTl.to(img, { height: imageHeight, duration: 0.4 }, finalStart);
                sTl.to(img, { autoAlpha: 0, duration: 0.4 }, finalStart);
              }

              sTl.to(el, { height: activeHeight }, activeStart);
              sTl.to(img, { height: activeImageHeight }, activeStart);
              sTl.to(img, { autoAlpha: 1 }, activeStart);
            });
          }

          items.forEach((item, index) => {
            const at = index * 0.2;

            if (item.border) {
              revealTl.fromTo(
                item.border,
                { clipPath: "inset(0 100% 0 0)" },
                { clipPath: "inset(0 0% 0 0)", duration: 1.4, ease: "power3.inOut" },
                at
              );
            }

            if (item.image) {
              revealTl.fromTo(
                item.image,
                { clipPath: "inset(0 0 100% 0)" },
                { clipPath: "inset(0 0 0% 0)", duration: 1.4, ease: "power3.inOut" },
                at + 0.1
              );
            }

            if (item.number) {
              revealTl.fromTo(
                item.number,
                { yPercent: 105 },
                { yPercent: 0, duration: 1.6, ease: "power3.out" },
                at
              );
            }

            if (item.client?.length) {
              revealTl.fromTo(
                item.client,
                { yPercent: 105 },
                { yPercent: 0, duration: 1.6, ease: "power3.out", stagger: 0.06 },
                at + 0.1
              );
            }

            if (item.title?.length) {
              revealTl.fromTo(
                item.title,
                { yPercent: 105 },
                { yPercent: 0, duration: 1.6, ease: "power3.out", stagger: 0.06 },
                at + 0.2
              );
            }
          });

          list.classList.add("loaded");
          lenisRef.current?.resize?.();
          revealTl.play();
        }, root);
      };

      const enter = () => {
        grid?.classList.remove("active");
        list?.classList.remove("active");
        workContext?.revert?.();
        workContext = null;

        if (activeView > 0) listIn();
        else gridIn();

        refreshScroll();
      };

      const bindViewInputs = () => {
        root.querySelectorAll('[name="work-switcher"]').forEach((input, viewIndex) => {
          const onChange = () => {
            if (!input.checked) return;

            out();
            activeView = viewIndex;

            window.setTimeout(() => {
              lenisRef.current?.scrollTo?.(0, { immediate: true });
              enter();
            }, 250);
          };

          input.addEventListener("change", onChange);
          cleanups.push(() => input.removeEventListener("change", onChange));
        });
      };

      const initial = () => {
        gridIn();
        refreshScroll();
      };

      return { out, enter, bindViewInputs, initial };
    };

    const { filterInput } = setupFilter();
    setupSwitcher();
    setupTitlePin();

    const { apply: applyListSplits } = setupListSplits();
    const projects = collectProjects();
    const work = setupWorkTransitions();

    const onFilterChange = () => {
      if (!filterInput) return;

      work.out();

      window.setTimeout(() => {
        lenisRef.current?.scrollTo?.(0, { immediate: true });

        projects.forEach((project) => {
          project.el.classList.remove("inactive");

          if (filterInput.value === "all") return;
          if (!project.services.includes(filterInput.value)) {
            project.el.classList.add("inactive");
          }
        });

        work.enter();
      }, 250);
    };

    if (filterInput) {
      filterInput.addEventListener("change", onFilterChange);
      cleanups.push(() => filterInput.removeEventListener("change", onFilterChange));
    }

    work.bindViewInputs();

    let resizeRaf = 0;
    const onResize = () => {
      window.cancelAnimationFrame(resizeRaf);
      resizeRaf = window.requestAnimationFrame(() => {
        applyListSplits();
        work.out();
        work.enter();
      });
    };

    window.addEventListener("resize", onResize, { passive: true });
    cleanups.push(() => window.removeEventListener("resize", onResize));
    cleanups.push(() => window.cancelAnimationFrame(resizeRaf));

    work.initial();

    return () => {
      cleanups.forEach((fn) => fn());
      ctx.revert();
    };
  }, [rootRef, lenisRef]);
}
