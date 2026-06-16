import { Check, Copy, ExternalLink, MousePointerClick, Pencil, RefreshCw, Trash2 } from "lucide-react"
import { useRef, useState } from "react"
import { toast } from "sonner"

import { DeleteUrlDialog } from "@/components/dashboard/DeleteUrlDialog"
import { DashboardEmptyAction } from "@/components/dashboard/DashboardHeader"
import { EditUrlDialog } from "@/components/dashboard/EditUrlDialog"
import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
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
      <div className="rounded-xl border p-8 text-center text-sm text-muted-foreground">
        Loading your short links...
      </div>
    )
  }

  if (error) {
    return (
      <Empty className="border">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <RefreshCw />
          </EmptyMedia>
          <EmptyTitle>Could not load links</EmptyTitle>
          <EmptyDescription>{error}</EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button onClick={() => void onRetry()}>Try again</Button>
        </EmptyContent>
      </Empty>
    )
  }

  if (urls.length === 0) {
    return (
      <Empty className="border">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <ExternalLink />
          </EmptyMedia>
          <EmptyTitle>No short links yet</EmptyTitle>
          <EmptyDescription>
            Create a short URL from any long link and it will show up here.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <DashboardEmptyAction isCreating={isCreating} onCreate={onCreate} />
        </EmptyContent>
      </Empty>
    )
  }

  return (
    <div className="rounded-xl border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Short link</TableHead>
            <TableHead className="hidden md:table-cell">Original URL</TableHead>
            <TableHead className="hidden sm:table-cell text-right">Clicks</TableHead>
            <TableHead className="hidden sm:table-cell">Created</TableHead>
            <TableHead className="w-[130px] text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
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
        </TableBody>
      </Table>
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
    <TableRow>
      <TableCell>
        <p className="max-w-[160px] truncate font-medium">
          {url.title || "—"}
        </p>
      </TableCell>
      <TableCell>
        <div className="space-y-1">
          <p className="font-mono text-sm font-medium">{shortLink}</p>
          <p className="truncate text-xs text-muted-foreground md:hidden">
            {url.originalUrl}
          </p>
          <p className="inline-flex items-center gap-1 text-xs text-muted-foreground sm:hidden">
            <MousePointerClick className="size-3" />
            {url.accessCount.toLocaleString()} clicks
          </p>
        </div>
      </TableCell>
      <TableCell className="hidden max-w-xs md:table-cell">
        <span className="block truncate text-muted-foreground">
          {url.originalUrl}
        </span>
      </TableCell>
      <TableCell className="hidden sm:table-cell text-right">
        <div className="flex items-center justify-end gap-1">
          <span className="inline-flex items-center gap-1 text-sm tabular-nums text-muted-foreground">
            <MousePointerClick className="size-3.5" />
            {url.accessCount.toLocaleString()}
          </span>
          <Button
            variant="ghost"
            size="icon-sm"
            aria-label="Refresh click count"
            disabled={isMutating}
            onClick={() => void handleRefreshAnalytics()}
          >
            <RefreshCw
              className={isRefreshingAnalytics ? "animate-spin" : undefined}
            />
          </Button>
        </div>
      </TableCell>
      <TableCell className="hidden text-muted-foreground sm:table-cell">
        {formatDate(url.createdAt)}
      </TableCell>
      <TableCell className="text-right">
        <div className="flex items-center justify-end gap-1">
          <Button
            variant="ghost"
            size="icon-sm"
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
                aria-label="Delete link"
                disabled={isMutating}
              >
                <Trash2 />
              </Button>
            }
          />
        </div>
      </TableCell>
    </TableRow>
  )
}
