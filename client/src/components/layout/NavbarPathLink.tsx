import { Link } from "react-router-dom"

import { cn } from "@/lib/utils"

type NavbarPathLinkProps = {
  label: string
  active?: boolean
  className?: string
  onClick?: () => void
} & (
  | { href: string; to?: never }
  | { to: string; href?: never }
)

export function NavbarPathLink({
  href,
  to,
  label,
  active = false,
  className,
  onClick,
}: NavbarPathLinkProps) {
  const sharedProps = {
    className: cn("navbar-path", className),
    "data-active": active,
    onClick,
    children: label,
  }

  if (to) {
    return <Link to={to} {...sharedProps} />
  }

  return <a href={href} {...sharedProps} />
}
