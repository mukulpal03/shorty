import { useCallback, useEffect, useState } from "react"

import { getErrorMessage } from "@/lib/api/errors"
import { createShortUrl, fetchAllUrls } from "@/lib/api/urls"
import type { ShortUrl } from "@/types/url"

type UseShortUrlsState = {
  urls: ShortUrl[]
  isLoading: boolean
  isCreating: boolean
  error: string | null
}

type CreateUrlResult =
  | { success: true; url: ShortUrl }
  | { success: false; error: string }

async function loadUrls(): Promise<Pick<UseShortUrlsState, "urls" | "error">> {
  try {
    const urls = await fetchAllUrls()
    return { urls, error: null }
  } catch (error) {
    return { urls: [], error: getErrorMessage(error) }
  }
}

export function useShortUrls() {
  const [state, setState] = useState<UseShortUrlsState>({
    urls: [],
    isLoading: true,
    isCreating: false,
    error: null,
  })

  useEffect(() => {
    let cancelled = false

    void loadUrls().then((result) => {
      if (cancelled) return
      setState((current) => ({ ...current, ...result, isLoading: false }))
    })

    return () => {
      cancelled = true
    }
  }, [])

  const refetch = useCallback(async () => {
    setState((current) => ({ ...current, isLoading: true, error: null }))

    const result = await loadUrls()
    setState((current) => ({ ...current, ...result, isLoading: false }))
  }, [])

  const createUrl = useCallback(async (longUrl: string): Promise<CreateUrlResult> => {
    setState((current) => ({ ...current, isCreating: true }))

    try {
      const url = await createShortUrl(longUrl)
      setState((current) => ({
        ...current,
        urls: [url, ...current.urls],
        error: null,
      }))
      return { success: true, url }
    } catch (error) {
      return { success: false, error: getErrorMessage(error) }
    } finally {
      setState((current) => ({ ...current, isCreating: false }))
    }
  }, [])

  return {
    urls: state.urls,
    isLoading: state.isLoading,
    isCreating: state.isCreating,
    error: state.error,
    refetch,
    createUrl,
  }
}
