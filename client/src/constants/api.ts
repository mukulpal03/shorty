export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? ""

export const SHORT_LINK_BASE_URL =
  import.meta.env.VITE_SHORT_LINK_BASE_URL ?? API_BASE_URL

export const API_ENDPOINTS = {
  urls: "/api/url",
  urlBySlug: (slug: string) => `/api/url/${slug}`,
  urlStats: (slug: string) => `/api/url/${slug}/stats`,
  me: "/api/users/me",
} as const

export function publicShortUrlPath(slug: string) {
  return `/${slug.replace(/^\/+/, "")}`
}
