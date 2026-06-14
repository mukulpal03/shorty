export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? ""

export const API_ENDPOINTS = {
  urls: "/api/url",
  urlBySlug: (slug: string) => `/api/url/${slug}`,
} as const
