import { Link } from "react-router-dom"
import { useAuth, useClerk } from "@clerk/react"

import { Logo } from "@/components/common/Logo"
import { Button } from "@/components/ui/button"
import { ROUTES } from "@/constants/routes"
import { cn } from "@/lib/utils"

type DashboardNavbarProps = {
  className?: string
}

export function DashboardNavbar({ className }: DashboardNavbarProps) {
  const { isLoaded, isSignedIn } = useAuth()
  const clerk = useClerk()

  async function handleLogout() {
    try {
      await clerk.signOut({ redirectUrl: ROUTES.home })
    } catch (error) {
      // keep UI responsive even if sign-out fails
      console.error("Failed to sign out", error)
    }
  }

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md",
        className
      )}
    >
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Logo to={ROUTES.dashboard} />

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" asChild>
            <Link to={ROUTES.home}>Back to home</Link>
          </Button>

          {isLoaded && isSignedIn ? (
            <Button variant="outline" size="sm" onClick={handleLogout}>
              Log out
            </Button>
          ) : null}
        </div>
      </div>
    </header>
  )
}
