import { cn } from "@/utils/cn";
import WorkCta from "./WorkCta";

export default function WorkList({ projects }) {
  return (
    <div className="work-list">
      <div className="work-list-wrapper relative w-full min-[1100px]:absolute min-[1100px]:inset-0">
        <div className="work-list-inner z-10 pt-[60vh] min-[1100px]:absolute min-[1100px]:left-0 min-[1100px]:top-[-60vh] min-[1100px]:w-full min-[1100px]:pt-0">
          <div className="work-list-projects relative w-full bg-dark min-[1100px]:absolute min-[1100px]:inset-0">
            {projects.map((project) => {
              const dataServices = JSON.stringify(
                project.serviceSlugs.join(","),
              );

              return (
                <div
                  key={`list-${project.href}`}
                  className={cn(
                    "project work-list-project relative overflow-hidden p-8",
                    "min-[1100px]:flex min-[1100px]:h-[7.4rem] min-[1100px]:justify-center",
                    "max-[1099px]:pr-48 max-[1099px]:pb-12",
                  )}
                  data-services={dataServices}
                  aria-label={project.client}
                >
                  <div
                    aria-hidden="true"
                    className="project-link pointer-events-none absolute inset-0 z-10"
                  />

                  <div
                    aria-hidden="true"
                    className={cn(
                      "project-border absolute left-0 top-0 z-0 h-px w-full",
                      "bg-white/20 min-[1100px]:bg-dark",
                    )}
                  />

                  <span
                    className={cn(
                      "project-number font-heading text-[1.8rem] leading-[120%]",
                      "block",
                      "min-[1100px]:absolute min-[1100px]:left-8 min-[1100px]:top-8",
                      "max-[1099px]:mb-2",
                    )}
                  >
                    01
                  </span>

                  <h3
                    className={cn(
                      "project-client font-body text-[1.8rem] leading-[120%]",
                      "block",
                      "min-[1100px]:absolute min-[1100px]:left-24 min-[1100px]:top-8",
                      "max-[1099px]:mb-2",
                    )}
                  >
                    {project.client}
                  </h3>

                  <p
                    className={cn(
                      "project-text project-title font-body text-[1.8rem] leading-[120%]",
                      "block",
                      "min-[1100px]:absolute min-[1100px]:right-8 min-[1100px]:top-8",
                    )}
                  >
                    {project.title}
                  </p>

                  <div
                    className={cn(
                      "project-media relative overflow-hidden rounded-[0.4rem]",
                      "min-[1100px]:h-[3.4rem] min-[1100px]:w-184 min-[1100px]:opacity-0",
                      "max-[1099px]:absolute max-[1099px]:right-8 max-[1099px]:top-8 max-[1099px]:h-32 max-[1099px]:w-32 max-[1099px]:opacity-100",
                    )}
                  >
                    <figure className="media-wrapper image-wrapper absolute inset-0">
                      <div className="media-inner absolute inset-0">
                        <img
                          className="media image h-full w-full object-cover"
                          src={project.image.replace(
                            "w=2700&h=1200",
                            "w=3000&h=2400",
                          )}
                          alt=""
                          loading="lazy"
                        />
                      </div>
                    </figure>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <WorkCta wrapperClassName="min-[1100px]:mt-[calc(50vh+13rem)]" />
    </div>
  );
}
