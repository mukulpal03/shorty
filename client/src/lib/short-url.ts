import { SITE } from "@/constants/landing"

export function getShortLinkDisplay(slug: string): string {
  return `${SITE.domain}/${slug}`
}
