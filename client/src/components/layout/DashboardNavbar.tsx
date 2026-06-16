import { useAuth, useClerk } from "@clerk/react"
import { Link } from "react-router-dom"

import { ROUTES } from "@/constants/routes"
import { notifyError } from "@/lib/api/notify"
import { getErrorMessage } from "@/lib/api/errors"

import { NavbarPathLink } from "./NavbarPathLink"
import { NavbarShell } from "./NavbarShell"

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
      notifyError(error, getErrorMessage(error))
    }
  }

  const navLinks = (onNavigate?: () => void) => (
    <>
      <NavbarPathLink to={ROUTES.home} label="home" onClick={onNavigate} />
      <NavbarPathLink to={ROUTES.dashboard} label="dashboard" active />
    </>
  )

  return (
    <NavbarShell
      className={className}
      logoTo={ROUTES.dashboard}
      status={<span className="navbar-status">live</span>}
      desktopNav={navLinks()}
      mobileNav={(close) => navLinks(close)}
      actions={
        <>
          <Link to={ROUTES.home} className="navbar-ghost hidden sm:inline-flex">
            ← home
          </Link>

          {isLoaded && isSignedIn ? (
            <button
              type="button"
              className="navbar-ghost"
              onClick={() => void handleLogout()}
            >
              log out
            </button>
          ) : null}
        </>
      }
    />
  )
}
