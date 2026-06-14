import { useCallback, useEffect, useState } from "react"

import { getErrorMessage } from "@/lib/api/errors"
import { fetchAllUrls } from "@/lib/api/urls"
import type { ShortUrl } from "@/types/url"

type UseShortUrlsState = {
  urls: ShortUrl[]
  isLoading: boolean
  error: string | null
}

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
    error: null,
  })

  useEffect(() => {
    let cancelled = false

    void loadUrls().then((result) => {
      if (cancelled) return
      setState({ ...result, isLoading: false })
    })

    return () => {
      cancelled = true
    }
  }, [])

  const refetch = useCallback(async () => {
    setState((current) => ({ ...current, isLoading: true, error: null }))

    const result = await loadUrls()
    setState({ ...result, isLoading: false })
  }, [])

  return {
    urls: state.urls,
    isLoading: state.isLoading,
    error: state.error,
    refetch,
  }
}
