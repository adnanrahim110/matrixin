"use client";

import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLenis } from "lenis/react";
import { useRef } from "react";

import { WORK_PROJECTS } from "@/constants/workProjects";
import { useWorkArchiveEffects } from "@/utils/useWorkArchiveEffects";

import WorkArchiveHeader from "./WorkArchiveHeader";
import WorkArchiveTitle from "./WorkArchiveTitle";
import WorkGrid from "./WorkGrid";
import WorkList from "./WorkList";

export default function WorkArchive() {
  const rootRef = useRef(null);

  const lenis = useLenis(() => {
    ScrollTrigger.update();
  }, []);

  const lenisRef = useRef(null);
  lenisRef.current = lenis;

  useWorkArchiveEffects({ rootRef, lenisRef });

  return (
    <section
      id="work"
      ref={rootRef}
      data-theme="dark"
      className="relative w-full bg-dark text-light"
    >
      <section className="work-archive relative">
        <WorkArchiveTitle />
        <WorkArchiveHeader />

        <div className="work-wrapper relative z-0 -mt-[40vh]">
          <div className="work-inner relative overflow-hidden">
            <WorkGrid projects={WORK_PROJECTS} />
            <WorkList projects={WORK_PROJECTS} />
          </div>
        </div>
      </section>
    </section>
  );
}
