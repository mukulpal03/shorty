import { API_BASE_URL, API_ENDPOINTS } from "@/constants/api"

export async function copyToClipboard(text: string) {
  if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text)
    return
  }

  // Fallback for insecure contexts / older browsers.
  const textarea = document.createElement("textarea")
  textarea.value = text
  textarea.setAttribute("readonly", "")
  textarea.style.position = "fixed"
  textarea.style.left = "-9999px"
  textarea.style.top = "-9999px"
  document.body.appendChild(textarea)
  textarea.select()
  document.execCommand("copy")
  document.body.removeChild(textarea)
}

export function buildPublicShortUrl(shortCodeOrUrl: string) {
  const value = shortCodeOrUrl.trim()
  if (/^https?:\/\//i.test(value)) return value

  const slug = value.replace(/^\/+/, "")
  const base =
    API_BASE_URL ||
    (typeof window !== "undefined" && window.location?.origin
      ? window.location.origin
      : "")

  if (!base) return API_ENDPOINTS.urlBySlug(slug)

  const normalizedBase = base.replace(/\/+$/, "")
  return `${normalizedBase}${API_ENDPOINTS.urlBySlug(slug)}`
}
