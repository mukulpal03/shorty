import { ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"
import { useAuth } from "@clerk/react"

import { NAV_LINKS } from "@/constants/landing"
import { ROUTES } from "@/constants/routes"

import { NavbarPathLink } from "./NavbarPathLink"
import { NavbarShell } from "./NavbarShell"

type NavbarProps = {
  className?: string
}

function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <>
      {NAV_LINKS.map((link) => (
        <NavbarPathLink
          key={link.href}
          href={link.href}
          label={link.label.toLowerCase().replace(/\s+/g, "-")}
          onClick={onNavigate}
        />
      ))}
    </>
  )
}

export function Navbar({ className }: NavbarProps) {
  const { isLoaded, isSignedIn } = useAuth()
  const showSignedIn = isLoaded && isSignedIn

  return (
    <NavbarShell
      className={className}
      desktopNav={<NavLinks />}
      mobileNav={(close) => <NavLinks onNavigate={close} />}
      actions={
        <>
          {!showSignedIn ? (
            <Link to={ROUTES.signIn} className="navbar-ghost hidden sm:inline-flex">
              log in
            </Link>
          ) : null}

          {!showSignedIn ? (
            <Link to={ROUTES.signUp} className="navbar-cta">
              get started
              <ArrowRight aria-hidden="true" />
            </Link>
          ) : (
            <Link to={ROUTES.dashboard} className="navbar-cta">
              dashboard
              <ArrowRight aria-hidden="true" />
            </Link>
          )}
        </>
      }
    />
  )
}
