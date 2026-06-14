import { Link } from "react-router-dom"

import { Logo } from "@/components/common/Logo"
import { Button } from "@/components/ui/button"
import { ROUTES } from "@/constants/routes"
import { cn } from "@/lib/utils"

type DashboardNavbarProps = {
  className?: string
}

export function DashboardNavbar({ className }: DashboardNavbarProps) {
  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md",
        className
      )}
    >
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Logo to={ROUTES.dashboard} />

        <Button variant="ghost" size="sm" asChild>
          <Link to={ROUTES.home}>Back to home</Link>
        </Button>
      </div>
    </header>
  )
}
