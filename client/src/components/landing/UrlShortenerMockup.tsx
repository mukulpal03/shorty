import { ArrowRight, Copy, MousePointerClick, TrendingUp, type LucideIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { SITE } from "@/constants/landing"
import { cn } from "@/lib/utils"

type UrlShortenerMockupProps = {
  className?: string
}

export function UrlShortenerMockup({ className }: UrlShortenerMockupProps) {
  return (
    <div className={cn("relative mx-auto w-full max-w-xl", className)}>
      <div
        aria-hidden
        className="absolute -inset-4 rounded-3xl bg-linear-to-b from-foreground/5 to-transparent blur-2xl"
      />

      <Card className="relative overflow-hidden shadow-lg shadow-foreground/5 ring-foreground/8">
        <CardContent className="space-y-4 pt-0">
          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground">
              Destination URL
            </label>
            <div className="flex items-center gap-2 rounded-lg border border-border bg-muted/40 px-3 py-2.5">
              <span className="truncate font-mono text-sm text-muted-foreground">
                https://your-website.com/blog/launch-announcement
              </span>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <div className="flex size-8 items-center justify-center rounded-full border border-border bg-background">
              <ArrowRight className="size-4 text-muted-foreground" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground">
              Short link
            </label>
            <div className="flex items-center gap-2 rounded-lg border border-primary/20 bg-primary/5 px-3 py-2.5">
              <span className="truncate font-mono text-sm font-medium">
                {SITE.domain}/launch
              </span>
              <Button
                variant="ghost"
                size="icon-xs"
                className="ml-auto shrink-0"
                aria-label="Copy link"
              >
                <Copy />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 border-t border-border/60 pt-4">
            <StatPill icon={MousePointerClick} label="Clicks" value="2,847" />
            <StatPill icon={TrendingUp} label="CTR" value="12.4%" />
            <StatPill icon={ArrowRight} label="Redirects" value="<50ms" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

type StatPillProps = {
  icon: LucideIcon
  label: string
  value: string
}

function StatPill({ icon: Icon, label, value }: StatPillProps) {
  return (
    <div className="rounded-lg bg-muted/50 px-3 py-2.5 text-center">
      <div className="flex items-center justify-center gap-1 text-muted-foreground">
        <Icon className="size-3" />
        <span className="text-[10px] font-medium uppercase tracking-wide">
          {label}
        </span>
      </div>
      <p className="mt-1 text-sm font-semibold tabular-nums">{value}</p>
    </div>
  )
}
