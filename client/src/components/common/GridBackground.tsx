import { cn } from "@/lib/utils"

type GridBackgroundProps = {
  className?: string
}

export function GridBackground({ className }: GridBackgroundProps) {
  return <div aria-hidden className={cn("shorty-mesh-bg", className)} />
}
