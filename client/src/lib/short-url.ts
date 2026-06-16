import { SHORT_LINK_BASE_URL } from "@/constants/api"

function getShortLinkHost() {
  if (SHORT_LINK_BASE_URL) {
    return SHORT_LINK_BASE_URL.replace(/^https?:\/\//, "").replace(/\/+$/, "")
  }

  if (typeof window !== "undefined" && window.location?.host) {
    return window.location.host
  }

  return "localhost:3000"
}

export function getShortLinkDisplay(slug: string): string {
  return `${getShortLinkHost()}/${slug.replace(/^\/+/, "")}`
}
