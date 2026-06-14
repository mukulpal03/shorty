import { Link2 } from "lucide-react"

import { Badge } from "@/components/ui/badge"
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
      <Badge className="size-8 rounded-lg p-0">
        <Link2 className="size-4" strokeWidth={2.5} />
      </Badge>
      {showText && (
        <span className="text-base tracking-tight">{SITE.name}</span>
      )}
    </a>
  )
}
