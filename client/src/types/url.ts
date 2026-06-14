export type ShortUrl = {
  id: string
  shortUrl: string
  originalUrl: string
  accessCount: number
  createdAt: string
}

export type UrlDocument = {
  _id: string
  originalUrl: string
  shortUrl: string
  accessCount?: number
  createdAt: string
  updatedAt?: string
}

export type GetAllUrlsResponse = {
  urls?: UrlDocument[]
}

export type CreateUrlResponse = {
  shortUrl?: UrlDocument
}

export type ApiErrorResponse = {
  error?: string
}
