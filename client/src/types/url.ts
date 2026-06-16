export type ShortUrl = {
  id: string
  shortUrl: string
  title?: string
  originalUrl: string
  accessCount: number
  createdAt: string
}

export type UrlDocument = {
  _id: string
  title?: string
  originalUrl: string
  shortUrl: string
  accessCount?: number
  createdAt: string
  updatedAt?: string
}

export type GetAllUrlsResponse = {
  urls?: UrlDocument[]
}

export type CreateUrlInput = {
  longUrl: string
  title?: string
}

export type UpdateUrlInput = {
  longUrl: string
  title?: string
}

export type CreateUrlResponse = {
  shortUrl?: UrlDocument
}

export type UpdateUrlResponse = {
  url?: UrlDocument
}

export type UrlMutationResult =
  | { success: true; url?: ShortUrl }
  | { success: false; error: string }

export type ApiErrorResponse = {
  error?: string
  code?: string
}
