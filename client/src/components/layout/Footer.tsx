import { Logo } from "@/components/common/Logo"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { FOOTER_LINKS, SITE } from "@/constants/landing"

const linkGroups = [
  { title: "Product", links: FOOTER_LINKS.product },
  { title: "Company", links: FOOTER_LINKS.company },
  { title: "Legal", links: FOOTER_LINKS.legal },
] as const

export function Footer() {
  return (
    <footer className="border-t border-border/60 bg-muted/30">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              {SITE.description}
            </p>
          </div>

          {linkGroups.map((group) => (
            <div key={group.title}>
              <h3 className="text-sm font-medium">{group.title}</h3>
              <ul className="mt-4 space-y-1">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Button
                      variant="link"
                      size="sm"
                      className="h-auto p-0 text-muted-foreground"
                      asChild
                    >
                      <a href={link.href}>{link.label}</a>
                    </Button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} {SITE.name}. All rights reserved.
          </p>
          <Badge variant="outline" className="font-mono">
            {SITE.domain}
          </Badge>
        </div>
      </div>
    </footer>
  )
}
