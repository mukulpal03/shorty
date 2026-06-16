import { API_ENDPOINTS } from "@/constants/api"
import { apiGet, apiPost } from "@/lib/api/client"
import { ApiError } from "@/lib/api/errors"
import type {
  CreateUrlResponse,
  GetAllUrlsResponse,
  ShortUrl,
  UrlDocument,
} from "@/types/url"

function authHeaders(token: string | null | undefined) {
  return token ? { Authorization: `Bearer ${token}` } : undefined
}

function mapUrlDocument(document: UrlDocument): ShortUrl {
  return {
    id: document._id,
    shortUrl: document.shortUrl,
    originalUrl: document.originalUrl,
    accessCount: document.accessCount ?? 0,
    createdAt: document.createdAt,
  }
}

export async function fetchAllUrls(token: string | null): Promise<ShortUrl[]> {
  const response = await apiGet<GetAllUrlsResponse>(API_ENDPOINTS.urls, {
    headers: authHeaders(token),
  })
  const documents = response?.urls ?? []

  return documents.map(mapUrlDocument)
}

export async function createShortUrl(
  token: string | null,
  longUrl: string,
): Promise<ShortUrl> {
  const response = await apiPost<CreateUrlResponse>(API_ENDPOINTS.urls, {
    longUrl,
  }, {
    headers: authHeaders(token),
  })

  if (!response?.shortUrl) {
    throw new ApiError("Failed to create short URL")
  }

  return mapUrlDocument(response.shortUrl)
}
