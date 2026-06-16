import { Check, Copy, ExternalLink, MousePointerClick, Pencil, RefreshCw, Trash2 } from "lucide-react"
import { useRef, useState } from "react"
import { toast } from "sonner"

import { DeleteUrlDialog } from "@/components/dashboard/DeleteUrlDialog"
import { DashboardEmptyAction } from "@/components/dashboard/DashboardHeader"
import { EditUrlDialog } from "@/components/dashboard/EditUrlDialog"
import { Button } from "@/components/ui/button"
import { getErrorMessage } from "@/lib/api/errors"
import { buildPublicShortUrl, copyToClipboard } from "@/lib/clipboard"
import { formatDate } from "@/lib/format-date"
import { getShortLinkDisplay } from "@/lib/short-url"
import type { CreateUrlInput, ShortUrl, UpdateUrlInput, UrlMutationResult } from "@/types/url"

type ShortUrlListProps = {
  urls: ShortUrl[]
  isLoading: boolean
  error: string | null
  onRetry: () => void
  isCreating: boolean
  updatingId: string | null
  deletingId: string | null
  refreshingAnalyticsId: string | null
  onCreate: (input: CreateUrlInput) => Promise<UrlMutationResult>
  onUpdate: (
    id: string,
    shortCode: string,
    input: UpdateUrlInput,
  ) => Promise<UrlMutationResult>
  onDelete: (id: string, shortCode: string) => Promise<UrlMutationResult>
  onRefreshAnalytics: (
    id: string,
    shortCode: string,
  ) => Promise<UrlMutationResult>
}

export function ShortUrlList({
  urls,
  isLoading,
  error,
  onRetry,
  isCreating,
  updatingId,
  deletingId,
  refreshingAnalyticsId,
  onCreate,
  onUpdate,
  onDelete,
  onRefreshAnalytics,
}: ShortUrlListProps) {
  if (isLoading) {
    return (
      <div className="shorty-panel shorty-empty-state">
        <p className="shorty-mono text-sm text-(--shorty-muted)">
          Loading your short links...
        </p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="shorty-panel shorty-empty-state">
        <div className="shorty-empty-state__icon">
          <RefreshCw className="size-4" />
        </div>
        <h2 className="text-base font-semibold">Could not load links</h2>
        <p className="mt-2 text-sm text-(--shorty-muted)">{error}</p>
        <Button
          className="shorty-mono mt-5 h-8 rounded-full bg-(--shorty-ink) px-4 text-xs text-(--shorty-surface) hover:bg-(--shorty-ink)/90"
          onClick={() => void onRetry()}
        >
          Try again
        </Button>
      </div>
    )
  }

  if (urls.length === 0) {
    return (
      <div className="shorty-panel shorty-empty-state">
        <div className="shorty-empty-state__icon">
          <ExternalLink className="size-4" />
        </div>
        <h2 className="text-base font-semibold">No short links yet</h2>
        <p className="mt-2 text-sm text-(--shorty-muted)">
          Create a short URL from any long link and it will show up here.
        </p>
        <div className="mt-5">
          <DashboardEmptyAction isCreating={isCreating} onCreate={onCreate} />
        </div>
      </div>
    )
  }

  return (
    <div className="shorty-panel shorty-registry">
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Short link</th>
            <th className="hidden md:table-cell">Original URL</th>
            <th className="hidden sm:table-cell text-right">Clicks</th>
            <th className="hidden sm:table-cell">Created</th>
            <th className="w-[130px] text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {urls.map((url) => (
            <ShortUrlRow
              key={url.id}
              url={url}
              isUpdating={updatingId === url.id}
              isDeleting={deletingId === url.id}
              isRefreshingAnalytics={refreshingAnalyticsId === url.id}
              onUpdate={(input) => onUpdate(url.id, url.shortUrl, input)}
              onDelete={() => onDelete(url.id, url.shortUrl)}
              onRefreshAnalytics={() =>
                onRefreshAnalytics(url.id, url.shortUrl)
              }
            />
          ))}
        </tbody>
      </table>
    </div>
  )
}

type ShortUrlRowProps = {
  url: ShortUrl
  isUpdating: boolean
  isDeleting: boolean
  isRefreshingAnalytics: boolean
  onUpdate: (input: UpdateUrlInput) => Promise<UrlMutationResult>
  onDelete: () => Promise<UrlMutationResult>
  onRefreshAnalytics: () => Promise<UrlMutationResult>
}

function ShortUrlRow({
  url,
  isUpdating,
  isDeleting,
  isRefreshingAnalytics,
  onUpdate,
  onDelete,
  onRefreshAnalytics,
}: ShortUrlRowProps) {
  const shortLink = getShortLinkDisplay(url.shortUrl)
  const publicShortUrl = buildPublicShortUrl(url.shortUrl)
  const [didCopy, setDidCopy] = useState(false)
  const resetTimerRef = useRef<number | null>(null)
  const isMutating = isUpdating || isDeleting || isRefreshingAnalytics

  async function handleCopy() {
    try {
      await copyToClipboard(publicShortUrl)
      toast.success("Copied link to clipboard")
      setDidCopy(true)
      if (resetTimerRef.current) window.clearTimeout(resetTimerRef.current)
      resetTimerRef.current = window.setTimeout(() => setDidCopy(false), 1200)
    } catch (error) {
      toast.error(getErrorMessage(error) || "Could not copy link")
    }
  }

  async function handleRefreshAnalytics() {
    const result = await onRefreshAnalytics()

    if ("error" in result) {
      toast.error(result.error)
    }
  }

  return (
    <tr>
      <td>
        <p className="max-w-[160px] truncate font-medium">
          {url.title || "—"}
        </p>
      </td>
      <td>
        <div className="space-y-1">
          <p className="shorty-link-cell">{shortLink}</p>
          <p className="shorty-muted-cell truncate md:hidden">{url.originalUrl}</p>
          <p className="shorty-muted-cell inline-flex items-center gap-1 sm:hidden">
            <MousePointerClick className="size-3" />
            {url.accessCount.toLocaleString()} clicks
          </p>
        </div>
      </td>
      <td className="hidden max-w-xs md:table-cell">
        <span className="shorty-muted-cell block truncate">{url.originalUrl}</span>
      </td>
      <td className="hidden sm:table-cell text-right">
        <div className="flex items-center justify-end gap-1">
          <span className="shorty-mono inline-flex items-center gap-1 text-sm tabular-nums text-(--shorty-muted)">
            <MousePointerClick className="size-3.5" />
            {url.accessCount.toLocaleString()}
          </span>
          <Button
            variant="ghost"
            size="icon-sm"
            className="text-(--shorty-muted) hover:bg-(--shorty-signal-soft) hover:text-(--shorty-ink)"
            aria-label="Refresh click count"
            disabled={isMutating}
            onClick={() => void handleRefreshAnalytics()}
          >
            <RefreshCw
              className={isRefreshingAnalytics ? "animate-spin" : undefined}
            />
          </Button>
        </div>
      </td>
      <td className="shorty-muted-cell hidden sm:table-cell">
        {formatDate(url.createdAt)}
      </td>
      <td className="text-right">
        <div className="flex items-center justify-end gap-1">
          <Button
            variant="ghost"
            size="icon-sm"
            className="text-(--shorty-muted) hover:bg-(--shorty-signal-soft) hover:text-(--shorty-ink)"
            aria-label="Copy link"
            disabled={isMutating}
            onClick={() => void handleCopy()}
          >
            {didCopy ? <Check /> : <Copy />}
          </Button>
          <EditUrlDialog
            url={url}
            disabled={isMutating}
            onUpdate={onUpdate}
            trigger={
              <Button
                variant="ghost"
                size="icon-sm"
                className="text-(--shorty-muted) hover:bg-(--shorty-signal-soft) hover:text-(--shorty-ink)"
                aria-label="Edit link"
                disabled={isMutating}
              >
                <Pencil />
              </Button>
            }
          />
          <DeleteUrlDialog
            url={url}
            disabled={isMutating}
            onDelete={onDelete}
            trigger={
              <Button
                variant="ghost"
                size="icon-sm"
                className="text-(--shorty-muted) hover:bg-(--shorty-signal-soft) hover:text-(--shorty-ink)"
                aria-label="Delete link"
                disabled={isMutating}
              >
                <Trash2 />
              </Button>
            }
          />
        </div>
      </td>
    </tr>
  )
}
