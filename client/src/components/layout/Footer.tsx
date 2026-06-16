import { Logo } from "@/components/common/Logo"
import { FOOTER_LINKS, SITE } from "@/constants/landing"

const linkGroups = [
  { title: "Product", links: FOOTER_LINKS.product },
  { title: "Company", links: FOOTER_LINKS.company },
  { title: "Legal", links: FOOTER_LINKS.legal },
] as const

export function Footer() {
  return (
    <footer className="border-t border-(--shorty-wire) bg-(--shorty-surface)">
      <div className="shorty-container py-12 sm:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-(--shorty-muted)">
              {SITE.description}
            </p>
            <p className="shorty-mono mt-5 inline-flex rounded-md border border-(--shorty-wire) bg-(--shorty-canvas) px-2.5 py-1 text-[0.6875rem] text-(--shorty-muted)">
              {SITE.domain}
            </p>
          </div>

          {linkGroups.map((group) => (
            <div key={group.title}>
              <h3 className="shorty-mono text-[0.625rem] font-medium uppercase tracking-[0.08em] text-(--shorty-muted)">
                {group.title}
              </h3>
              <ul className="mt-4 space-y-2">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-(--shorty-muted) transition-colors hover:text-(--shorty-ink)"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-(--shorty-wire) pt-8 sm:flex-row">
          <p className="shorty-mono text-xs text-(--shorty-muted)">
            © {new Date().getFullYear()} {SITE.name}
          </p>
          <p className="shorty-mono text-xs text-(--shorty-muted)">
            redirect fast · track everything
          </p>
        </div>
      </div>
    </footer>
  )
}
