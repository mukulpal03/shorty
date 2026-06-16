import { useCallback, useEffect, useState } from "react"
import { useAuth } from "@clerk/react"

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

async function loadUrls(
  token: string | null,
): Promise<Pick<UseShortUrlsState, "urls" | "error">> {
  try {
    const urls = await fetchAllUrls(token)
    return { urls, error: null }
  } catch (error) {
    return { urls: [], error: getErrorMessage(error) }
  }
}

export function useShortUrls() {
  const { isLoaded, isSignedIn, getToken } = useAuth()
  const [state, setState] = useState<UseShortUrlsState>({
    urls: [],
    isLoading: true,
    isCreating: false,
    error: null,
  })

  useEffect(() => {
    let cancelled = false

    if (!isLoaded) return

    if (!isSignedIn) {
      setState((current) => ({ ...current, isLoading: false }))
      return
    }

    void getToken()
      .then((token) => loadUrls(token))
      .then((result) => {
        if (cancelled) return
        setState((current) => ({ ...current, ...result, isLoading: false }))
      })
      .catch((error) => {
        if (cancelled) return
        setState((current) => ({
          ...current,
          urls: [],
          error: getErrorMessage(error),
          isLoading: false,
        }))
      })

    return () => {
      cancelled = true
    }
  }, [getToken, isLoaded, isSignedIn])

  const refetch = useCallback(async () => {
    setState((current) => ({ ...current, isLoading: true, error: null }))

    try {
      const token = await getToken()
      const result = await loadUrls(token)
      setState((current) => ({ ...current, ...result, isLoading: false }))
    } catch (error) {
      setState((current) => ({
        ...current,
        urls: [],
        error: getErrorMessage(error),
        isLoading: false,
      }))
    }
  }, [getToken])

  const createUrl = useCallback(async (longUrl: string): Promise<CreateUrlResult> => {
    setState((current) => ({ ...current, isCreating: true }))

    try {
      const token = await getToken()
      const url = await createShortUrl(token, longUrl)
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
  }, [getToken])

  return {
    urls: state.urls,
    isLoading: state.isLoading,
    isCreating: state.isCreating,
    error: state.error,
    refetch,
    createUrl,
  }
}
