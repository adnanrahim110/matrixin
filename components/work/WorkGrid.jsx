import { cn } from "@/utils/cn";
import Link from "next/link";
import WorkCta from "./WorkCta";

export default function WorkGrid({ projects }) {
  return (
    <div className="work-grid active">
      <div
        className={cn(
          "work-grid-inner px-8",
          "min-[1100px]:grid min-[1100px]:grid-cols-2 min-[1100px]:gap-8",
        )}
      >
        {projects.map((project, index) => {
          const dataServices = JSON.stringify(project.serviceSlugs.join(","));
          const eager = index < 2;

          return (
            <div
              key={project.href}
              className={cn(
                "project work-grid-project group relative overflow-hidden rounded-[0.4rem]",
                "min-[1100px]:h-200",
                "max-[1099px]:aspect-3/4 max-[1099px]:h-auto",
                "max-[1099px]:mb-8",
              )}
              data-services={dataServices}
            >
              <Link
                href={project.href}
                aria-label={project.ariaLabel}
                className="project-link absolute inset-0 z-10"
              />

              <div className="project-media absolute inset-0 overflow-hidden rounded-[0.4rem]">
                <figure className="media-wrapper image-wrapper absolute inset-0">
                  <div className="media-inner absolute inset-0">
                    <img
                      className="media image h-full w-full object-cover"
                      src={project.image}
                      alt=""
                      loading={eager ? "eager" : "lazy"}
                      fetchPriority={eager ? "high" : "auto"}
                    />
                  </div>
                </figure>

                <figure className="media-wrapper video-wrapper absolute inset-0 opacity-0 transition-opacity duration-800 ease-ease group-hover:opacity-100">
                  <div className="media-inner absolute inset-0">
                    <video
                      className="media video h-full w-full object-cover"
                      src={project.video}
                      autoPlay
                      muted
                      playsInline
                      loop
                      preload="auto"
                    />
                  </div>
                </figure>
              </div>

              <div className="project-content absolute left-0 top-0 z-1 flex flex-col items-start p-4 pointer-events-none">
                <h3
                  className={cn(
                    "project-text project-client font-heading",
                    "inline-flex h-10 items-center rounded-[0.2rem] px-4",
                    "bg-white/10 backdrop-blur-[1.2rem]",
                    "shadow-[inset_0_0_.8rem_rgba(255,255,255,0.02),inset_0_0_.2rem_rgba(255,255,255,0.2)]",
                    "min-[1100px]:translate-y-[1.8rem] min-[1100px]:opacity-0",
                    "min-[1100px]:transition-[opacity,transform] min-[1100px]:duration-400 min-[1100px]:ease-[cubic-bezier(.25,1,.5,1)]",
                    "min-[1100px]:group-hover:translate-y-0 min-[1100px]:group-hover:opacity-100",
                  )}
                >
                  {project.client}
                </h3>

                <p
                  className={cn(
                    "project-text project-title font-body",
                    "mt-2 inline-flex h-10 items-center rounded-[0.2rem] px-4",
                    "bg-white/10 backdrop-blur-[1.2rem]",
                    "shadow-[inset_0_0_.8rem_rgba(255,255,255,0.02),inset_0_0_.2rem_rgba(255,255,255,0.2)]",
                    "min-[1100px]:translate-y-[1.8rem] min-[1100px]:opacity-0",
                    "min-[1100px]:transition-[opacity,transform] min-[1100px]:duration-400 min-[1100px]:ease-[cubic-bezier(.25,1,.5,1)]",
                    "min-[1100px]:group-hover:translate-y-0 min-[1100px]:group-hover:opacity-100",
                  )}
                >
                  {project.title}
                </p>

                {project.services.map((service) => (
                  <p
                    key={`${project.href}-${service}`}
                    className={cn(
                      "project-text project-service font-body italic",
                      "mt-2 inline-flex h-10 items-center rounded-[0.2rem] px-4",
                      "bg-white/10 backdrop-blur-[1.2rem]",
                      "shadow-[inset_0_0_.8rem_rgba(255,255,255,0.02),inset_0_0_.2rem_rgba(255,255,255,0.2)]",
                      "min-[1100px]:translate-y-[1.8rem] min-[1100px]:opacity-0",
                      "min-[1100px]:transition-[opacity,transform] min-[1100px]:duration-400 min-[1100px]:ease-[cubic-bezier(.25,1,.5,1)]",
                      "min-[1100px]:group-hover:translate-y-0 min-[1100px]:group-hover:opacity-100",
                    )}
                  >
                    {service}
                  </p>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <WorkCta wrapperClassName="min-[1100px]:h-[calc(44vw+4rem)]" />
    </div>
  );
}
