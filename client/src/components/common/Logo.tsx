import { Link2 } from "lucide-react"
import { Link } from "react-router-dom"

import { Badge } from "@/components/ui/badge"
import { ROUTES } from "@/constants/routes"
import { SITE } from "@/constants/landing"
import { cn } from "@/lib/utils"

type LogoProps = {
  className?: string
  showText?: boolean
  showIcon?: boolean
  to?: string
}

export function Logo({
  className,
  showText = true,
  showIcon = true,
  to = ROUTES.home,
}: LogoProps) {
  return (
    <Link
      to={to}
      className={cn("inline-flex items-center gap-2.5 font-medium", className)}
    >
      {showIcon ? (
        <Badge className="size-8 rounded-lg p-0">
          <Link2 className="size-4" strokeWidth={2.5} />
        </Badge>
      ) : null}
      {showText && (
        <span className="text-base tracking-tight">{SITE.name}</span>
      )}
    </Link>
  )
}
