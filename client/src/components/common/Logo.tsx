import { Link2 } from "lucide-react"

import { cn } from "@/lib/utils"
import { SITE } from "@/constants/landing"

type LogoProps = {
  className?: string
  showText?: boolean
}

export function Logo({ className, showText = true }: LogoProps) {
  return (
    <a
      href="/"
      className={cn("inline-flex items-center gap-2.5 font-medium", className)}
    >
      <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
        <Link2 className="size-4" strokeWidth={2.5} />
      </span>
      {showText && (
        <span className="text-base tracking-tight">{SITE.name}</span>
      )}
    </a>
  )
}
