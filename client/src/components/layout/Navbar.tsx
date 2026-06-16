import { ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"
import { useAuth } from "@clerk/react"

import { Logo } from "@/components/common/Logo"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import { NAV_LINKS } from "@/constants/landing"
import { ROUTES } from "@/constants/routes"
import { cn } from "@/lib/utils"

type NavbarProps = {
  className?: string
}

export function Navbar({ className }: NavbarProps) {
  const { isLoaded, isSignedIn } = useAuth()
  const showSignedIn = isLoaded && isSignedIn

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md",
        className
      )}
    >
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Logo />

        <NavigationMenu viewport={false} className="hidden md:flex">
          <NavigationMenuList>
            {NAV_LINKS.map((link) => (
              <NavigationMenuItem key={link.href}>
                <NavigationMenuLink href={link.href}>
                  {link.label}
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex items-center gap-2">
          {!showSignedIn ? (
            <Button
              variant="ghost"
              size="sm"
              className="hidden sm:inline-flex"
              asChild
            >
              <Link to={ROUTES.signIn}>Log in</Link>
            </Button>
          ) : null}

          {!showSignedIn ? (
            <Button size="sm" asChild>
              <Link to={ROUTES.signUp}>
                Get started
                <ArrowRight data-icon="inline-end" />
              </Link>
            </Button>
          ) : (
            <Button size="sm" asChild>
              <Link to={ROUTES.dashboard}>
                Dashboard
                <ArrowRight data-icon="inline-end" />
              </Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}
