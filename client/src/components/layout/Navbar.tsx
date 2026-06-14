import { ArrowRight } from "lucide-react"

import { Logo } from "@/components/common/Logo"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import { NAV_LINKS } from "@/constants/landing"
import { cn } from "@/lib/utils"

type NavbarProps = {
  className?: string
}

export function Navbar({ className }: NavbarProps) {
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
          <Button variant="ghost" size="sm" className="hidden sm:inline-flex">
            Log in
          </Button>
          <Button size="sm">
            Get started
            <ArrowRight data-icon="inline-end" />
          </Button>
        </div>
      </div>
    </header>
  )
}
