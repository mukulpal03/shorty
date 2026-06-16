import { Check, Copy, ExternalLink, RefreshCw, Trash2 } from "lucide-react"
import { useRef, useState } from "react"
import { toast } from "sonner"

import { DashboardEmptyAction } from "@/components/dashboard/DashboardHeader"
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
import type { CreateUrlInput, ShortUrl } from "@/types/url"

type CreateUrlResult =
  | { success: true; url: ShortUrl }
  | { success: false; error: string }

type ShortUrlListProps = {
  urls: ShortUrl[]
  isLoading: boolean
  error: string | null
  onRetry: () => void
  isCreating: boolean
  onCreate: (input: CreateUrlInput) => Promise<CreateUrlResult>
}

export function ShortUrlList({
  urls,
  isLoading,
  error,
  onRetry,
  isCreating,
  onCreate,
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
            <TableHead className="hidden sm:table-cell">Created</TableHead>
            <TableHead className="w-[100px] text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {urls.map((url) => (
            <ShortUrlRow key={url.id} url={url} />
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

function ShortUrlRow({ url }: { url: ShortUrl }) {
  const shortLink = getShortLinkDisplay(url.shortUrl)
  const publicShortUrl = buildPublicShortUrl(url.shortUrl)
  const [didCopy, setDidCopy] = useState(false)
  const resetTimerRef = useRef<number | null>(null)

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
        </div>
      </TableCell>
      <TableCell className="hidden max-w-xs md:table-cell">
        <span className="block truncate text-muted-foreground">
          {url.originalUrl}
        </span>
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
            onClick={() => void handleCopy()}
          >
            {didCopy ? <Check /> : <Copy />}
          </Button>
          <Button variant="ghost" size="icon-sm" aria-label="Delete link">
            <Trash2 />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  )
}
