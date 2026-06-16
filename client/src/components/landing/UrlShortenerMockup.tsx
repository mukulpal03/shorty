import { ArrowRight, Copy, MousePointerClick, TrendingUp, type LucideIcon } from "lucide-react"

import { SITE } from "@/constants/landing"
import { cn } from "@/lib/utils"

type UrlShortenerMockupProps = {
  className?: string
}

export function UrlShortenerMockup({ className }: UrlShortenerMockupProps) {
  return (
    <div className={cn("relative mx-auto w-full max-w-lg", className)}>
      <div
        aria-hidden
        className="absolute -inset-6 rounded-[2rem] bg-[radial-gradient(ellipse_at_50%_0%,oklch(from_var(--shorty-signal)_l_c_h/18%),transparent_65%)]"
      />

      <div className="shorty-panel shorty-terminal relative">
        <div className="shorty-terminal__bar">
          <span className="shorty-terminal__dot" />
          <span className="shorty-terminal__dot" />
          <span className="shorty-terminal__dot" />
          <span className="shorty-terminal__title">shorty — compress</span>
        </div>

        <div className="space-y-4 p-5 sm:p-6">
          <div className="space-y-2">
            <label
              htmlFor="destination-url"
              className="shorty-mono text-[0.625rem] uppercase tracking-[0.08em] text-(--shorty-muted)"
            >
              input
            </label>
            <div className="shorty-url-field">
              <span
                id="destination-url"
                className="shorty-url-field__value text-(--shorty-muted)"
              >
                https://your-website.com/blog/launch-announcement
              </span>
            </div>
          </div>

          <div className="flex justify-center py-1">
            <span className="shorty-mono flex size-8 items-center justify-center rounded-full border border-(--shorty-wire) bg-(--shorty-signal-soft) text-(--shorty-signal)">
              <ArrowRight className="size-3.5" aria-hidden="true" />
            </span>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="short-link"
              className="shorty-mono text-[0.625rem] uppercase tracking-[0.08em] text-(--shorty-muted)"
            >
              output
            </label>
            <div className="shorty-url-field shorty-url-field--output">
              <span className="shorty-url-field__value" id="short-link">
                {SITE.domain}/launch
              </span>
              <button
                type="button"
                className="ml-auto shrink-0 text-(--shorty-signal)"
                aria-label="Copy link"
                tabIndex={-1}
              >
                <Copy className="size-3.5" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 border-t border-(--shorty-wire) pt-4">
            <StatItem icon={MousePointerClick} label="clicks" value="2,847" />
            <StatItem icon={TrendingUp} label="ctr" value="12.4%" />
            <StatItem icon={ArrowRight} label="redirect" value="<50ms" />
          </div>
        </div>
      </div>
    </div>
  )
}

type StatItemProps = {
  icon: LucideIcon
  label: string
  value: string
}

function StatItem({ icon: Icon, label, value }: StatItemProps) {
  return (
    <div className="flex flex-col items-center gap-1.5 text-center">
      <Icon className="size-3.5 text-(--shorty-signal)" aria-hidden="true" />
      <span className="shorty-stat-label">{label}</span>
      <span className="shorty-stat-value text-[1.125rem]">{value}</span>
    </div>
  )
}
