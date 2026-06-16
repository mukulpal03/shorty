import { useCallback, useEffect, useState } from "react"
import { useAuth } from "@clerk/react"

import { getErrorMessage } from "@/lib/api/errors"
import {
  createShortUrl,
  deleteShortUrl,
  fetchAllUrls,
  fetchUrlAnalytics,
  updateShortUrl,
} from "@/lib/api/urls"
import type { CreateUrlInput, ShortUrl, UpdateUrlInput, UrlMutationResult } from "@/types/url"

type UseShortUrlsState = {
  urls: ShortUrl[]
  isLoading: boolean
  isCreating: boolean
  updatingId: string | null
  deletingId: string | null
  refreshingAnalyticsId: string | null
  error: string | null
}

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
    updatingId: null,
    deletingId: null,
    refreshingAnalyticsId: null,
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

  const createUrl = useCallback(
    async (input: CreateUrlInput): Promise<UrlMutationResult> => {
      setState((current) => ({ ...current, isCreating: true }))

      try {
        const token = await getToken()
        const url = await createShortUrl(token, input)
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
    },
    [getToken],
  )

  const updateUrl = useCallback(
    async (id: string, shortCode: string, input: UpdateUrlInput): Promise<UrlMutationResult> => {
      setState((current) => ({ ...current, updatingId: id }))

      try {
        const token = await getToken()
        const url = await updateShortUrl(token, shortCode, input)
        setState((current) => ({
          ...current,
          urls: current.urls.map((item) => (item.id === id ? url : item)),
          error: null,
        }))
        return { success: true, url }
      } catch (error) {
        return { success: false, error: getErrorMessage(error) }
      } finally {
        setState((current) => ({ ...current, updatingId: null }))
      }
    },
    [getToken],
  )

  const deleteUrl = useCallback(
    async (id: string, shortCode: string): Promise<UrlMutationResult> => {
      setState((current) => ({ ...current, deletingId: id }))

      try {
        const token = await getToken()
        await deleteShortUrl(token, shortCode)
        setState((current) => ({
          ...current,
          urls: current.urls.filter((item) => item.id !== id),
          error: null,
        }))
        return { success: true }
      } catch (error) {
        return { success: false, error: getErrorMessage(error) }
      } finally {
        setState((current) => ({ ...current, deletingId: null }))
      }
    },
    [getToken],
  )

  const refreshUrlAnalytics = useCallback(
    async (id: string, shortCode: string): Promise<UrlMutationResult> => {
      setState((current) => ({ ...current, refreshingAnalyticsId: id }))

      try {
        const token = await getToken()
        const url = await fetchUrlAnalytics(token, shortCode)
        setState((current) => ({
          ...current,
          urls: current.urls.map((item) => (item.id === id ? url : item)),
          error: null,
        }))
        return { success: true, url }
      } catch (error) {
        return { success: false, error: getErrorMessage(error) }
      } finally {
        setState((current) => ({ ...current, refreshingAnalyticsId: null }))
      }
    },
    [getToken],
  )

  return {
    urls: state.urls,
    isLoading: state.isLoading,
    isCreating: state.isCreating,
    updatingId: state.updatingId,
    deletingId: state.deletingId,
    refreshingAnalyticsId: state.refreshingAnalyticsId,
    error: state.error,
    refetch,
    createUrl,
    updateUrl,
    deleteUrl,
    refreshUrlAnalytics,
  }
}
