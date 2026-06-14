import { API_ENDPOINTS } from "@/constants/api"
import { apiGet } from "@/lib/api/client"
import type {
  GetAllUrlsResponse,
  ShortUrl,
  UrlDocument,
} from "@/types/url"

function mapUrlDocument(document: UrlDocument): ShortUrl {
  return {
    id: document._id,
    shortUrl: document.shortUrl,
    originalUrl: document.originalUrl,
    accessCount: document.accessCount ?? 0,
    createdAt: document.createdAt,
  }
}

export async function fetchAllUrls(): Promise<ShortUrl[]> {
  const response = await apiGet<GetAllUrlsResponse>(API_ENDPOINTS.urls)
  const documents = response?.urls ?? []

  return documents.map(mapUrlDocument)
}
