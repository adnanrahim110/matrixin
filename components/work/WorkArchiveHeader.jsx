import { cn } from "@/utils/cn";

export default function WorkArchiveHeader() {
  return (
    <div
      className={cn(
        "work-header absolute left-0 top-0 z-20 w-full p-8",
        "flex justify-between pointer-events-none",
        "max-[1099px]:fixed max-[1099px]:top-auto max-[1099px]:bottom-0 max-[1099px]:items-end",
      )}
    >
      <div className="work-filter group/filter relative h-16 overflow-hidden text-[1.4rem]">
        <div
          aria-hidden="true"
          className={cn(
            "work-filter-bg pointer-events-none absolute inset-0 z-0 rounded-[0.2rem]",
            "bg-white/10 backdrop-blur-[1.2rem]",
            "shadow-[inset_0_0_.8rem_rgba(255,255,255,0.02),inset_0_0_.2rem_rgba(255,255,255,0.2)]",
          )}
        />
        <div
          aria-hidden="true"
          className="work-filter-border pointer-events-none absolute inset-0 z-1 rounded-[0.2rem] border border-white/20"
        />
        <div
          aria-hidden="true"
          className="work-filter-border-active pointer-events-none absolute inset-0 z-1 rounded-[0.2rem] border border-white/40 opacity-0"
        />

        <div className="work-filter-select relative flex h-16 items-center">
          <button
            type="button"
            className="work-filter-select-text flex h-16 flex-1 items-center px-6 text-light pointer-events-auto"
            aria-label="Work filter"
          >
            Work filter
          </button>

          <button
            type="button"
            className={cn(
              "work-filter-select-close flex h-16 w-0 items-center justify-center overflow-hidden px-0 text-light opacity-100 pointer-events-none",
              "group-[.active]/filter:w-16 group-[.active]/filter:pointer-events-auto",
              "group-[.filtered]/filter:w-16 group-[.filtered]/filter:pointer-events-auto",
            )}
            aria-label="Close work filter"
          >
            <svg
              width="10"
              height="11"
              viewBox="0 0 10 11"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M0.484375 1L4.98437 5.5M9.48437 10L4.98437 5.5M4.98437 5.5L9.48437 1M4.98437 5.5L0.484375 10"
                stroke="white"
              />
            </svg>
          </button>
        </div>

        <ul className="work-filter-options relative w-px pt-32 pb-8 group-[.active]/filter:w-auto">
          <li className="work-filter-option">
            <button
              type="button"
              className="work-filter-btn flex h-16 w-full items-center px-6 text-light pointer-events-auto"
              data-value="all"
              data-title="Work Filter"
              aria-label="All"
            >
              All
            </button>
          </li>

          <li className="work-filter-option">
            <button
              type="button"
              className="work-filter-btn flex h-16 w-full items-center px-6 text-light pointer-events-auto"
              data-value="design-strategy"
              data-title="Design Strategy"
              aria-label="Design Strategy"
            >
              Design Strategy
            </button>
          </li>

          <li className="work-filter-option">
            <button
              type="button"
              className="work-filter-btn flex h-16 w-full items-center px-6 text-light pointer-events-auto"
              data-value="brand-design"
              data-title="Brand Design"
              aria-label="Brand Design"
            >
              Brand Design
            </button>
          </li>

          <li className="work-filter-option">
            <button
              type="button"
              className="work-filter-btn flex h-16 w-full items-center px-6 text-light pointer-events-auto"
              data-value="ui-design"
              data-title="UI Design"
              aria-label="UI Design"
            >
              UI Design
            </button>
          </li>

          <li className="work-filter-option">
            <button
              type="button"
              className="work-filter-btn flex h-16 w-full items-center px-6 text-light pointer-events-auto"
              data-value="ux-design"
              data-title="UX Design"
              aria-label="UX Design"
            >
              UX Design
            </button>
          </li>
        </ul>

        <label htmlFor="work-filter" className="sr-only">
          <select
            id="work-filter"
            defaultValue="all"
            className="pointer-events-auto"
          >
            <option value="all">All</option>
            <option value="design-strategy">Design Strategy</option>
            <option value="brand-design">Brand Design</option>
            <option value="ui-design">UI Design</option>
            <option value="ux-design">UX Design</option>
          </select>
        </label>
      </div>

      <div className="work-switcher relative text-[1.4rem]">
        <div className="work-switcher-options flex items-center justify-center gap-[0.3rem] pointer-events-auto">
          <button
            type="button"
            className={cn(
              "work-switcher-option active relative flex h-16 w-[4.4rem] items-center justify-center overflow-hidden rounded-[0.2rem] pointer-events-auto",
              "text-light",
            )}
            data-value="grid"
            aria-label="Grid view"
          >
            <span
              aria-hidden="true"
              className={cn(
                "work-switcher-bg pointer-events-none absolute inset-0 z-0 rounded-[0.2rem]",
                "bg-white/10 backdrop-blur-[1.2rem]",
                "shadow-[inset_0_0_.8rem_rgba(255,255,255,0.02),inset_0_0_.2rem_rgba(255,255,255,0.2)]",
              )}
            />
            <span className="work-switcher-text relative z-1">01</span>
          </button>

          <button
            type="button"
            className={cn(
              "work-switcher-option relative flex h-16 w-[4.4rem] items-center justify-center overflow-hidden rounded-[0.2rem] pointer-events-auto",
              "text-light",
            )}
            data-value="list"
            aria-label="List view"
          >
            <span
              aria-hidden="true"
              className={cn(
                "work-switcher-bg pointer-events-none absolute inset-0 z-0 rounded-[0.2rem]",
                "bg-white/10 backdrop-blur-[1.2rem]",
                "shadow-[inset_0_0_.8rem_rgba(255,255,255,0.02),inset_0_0_.2rem_rgba(255,255,255,0.2)]",
              )}
            />
            <span className="work-switcher-text relative z-1">02</span>
          </button>
        </div>

        <fieldset className="filter-group sr-only pointer-events-auto">
          <legend>Filter projects</legend>
          <label className="filter-option">
            <input type="radio" name="work-switcher" value="grid" />
            <span>Grid</span>
          </label>
          <label className="filter-option">
            <input type="radio" name="work-switcher" value="list" />
            <span>List</span>
          </label>
        </fieldset>
      </div>
    </div>
  );
}
