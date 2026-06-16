import { Menu, X } from "lucide-react"
import { useCallback, useEffect, useState, type ReactNode } from "react"

import { Logo } from "@/components/common/Logo"
import { ROUTES } from "@/constants/routes"
import { cn } from "@/lib/utils"

import "./navbar.css"

type NavbarShellProps = {
  className?: string
  logoTo?: string
  desktopNav?: ReactNode
  mobileNav?: ReactNode | ((close: () => void) => ReactNode)
  actions?: ReactNode
  status?: ReactNode
}

export function NavbarShell({
  className,
  logoTo = ROUTES.home,
  desktopNav,
  mobileNav,
  actions,
  status,
}: NavbarShellProps) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const closeMobile = useCallback(() => setMobileOpen(false), [])

  useEffect(() => {
    if (!mobileOpen) return

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setMobileOpen(false)
    }

    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [mobileOpen])

  const showMobileToggle = Boolean(mobileNav)
  const resolvedMobileNav =
    typeof mobileNav === "function" ? mobileNav(closeMobile) : mobileNav

  return (
    <header className={cn("navbar-root relative z-10 px-3 pt-3 sm:px-5", className)}>
      <div className="mx-auto max-w-5xl">
        <div className="navbar-bar flex min-h-11 w-full items-center gap-2 rounded-2xl px-2.5 py-1.5 sm:gap-3 sm:px-3">
          <div className="navbar-brand shrink-0">
            <Logo to={logoTo} showIcon={false} />
          </div>

          {status ? <div className="hidden sm:block">{status}</div> : null}

          {desktopNav ? (
            <nav
              className="hidden min-w-0 flex-1 items-center gap-0.5 md:flex"
              aria-label="Primary"
            >
              {desktopNav}
            </nav>
          ) : null}

          <div className="navbar-actions ml-auto flex shrink-0 items-center gap-1 sm:gap-1.5">
            {actions}

            {showMobileToggle ? (
              <button
                type="button"
                className="navbar-menu-btn"
                aria-expanded={mobileOpen}
                aria-controls="navbar-mobile-panel"
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
                onClick={() => setMobileOpen((open) => !open)}
              >
                {mobileOpen ? <X className="size-3.5" /> : <Menu className="size-3.5" />}
              </button>
            ) : null}
          </div>
        </div>

        {showMobileToggle && mobileOpen ? (
          <div
            id="navbar-mobile-panel"
            className="navbar-mobile-panel md:hidden"
            role="dialog"
            aria-label="Mobile navigation"
          >
            {status ? <div className="mb-2 px-1 sm:hidden">{status}</div> : null}
            <nav aria-label="Mobile primary">{resolvedMobileNav}</nav>
          </div>
        ) : null}
      </div>
    </header>
  )
}
