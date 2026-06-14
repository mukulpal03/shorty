import { cn } from "@/lib/utils"

type GridBackgroundProps = {
  className?: string
}

export function GridBackground({ className }: GridBackgroundProps) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className
      )}
    >
      <div className="absolute inset-0 bg-[linear-gradient(to_right,oklch(0.922_0_0_/_0.5)_1px,transparent_1px),linear-gradient(to_bottom,oklch(0.922_0_0_/_0.5)_1px,transparent_1px)] bg-size-[4rem_4rem] mask-[radial-gradient(ellipse_80%_60%_at_50%_0%,black_40%,transparent_100%)]" />
      <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-border to-transparent" />
    </div>
  )
}
