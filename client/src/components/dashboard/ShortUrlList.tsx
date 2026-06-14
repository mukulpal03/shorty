import { Copy, ExternalLink, RefreshCw, Trash2 } from "lucide-react"

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
import { formatDate } from "@/lib/format-date"
import { getShortLinkDisplay } from "@/lib/short-url"
import type { ShortUrl } from "@/types/url"

type ShortUrlListProps = {
  urls: ShortUrl[]
  isLoading: boolean
  error: string | null
  onRetry: () => void
}

export function ShortUrlList({
  urls,
  isLoading,
  error,
  onRetry,
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
          <DashboardEmptyAction />
        </EmptyContent>
      </Empty>
    )
  }

  return (
    <div className="rounded-xl border">
      <Table>
        <TableHeader>
          <TableRow>
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

  return (
    <TableRow>
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
          <Button variant="ghost" size="icon-sm" aria-label="Copy link">
            <Copy />
          </Button>
          <Button variant="ghost" size="icon-sm" aria-label="Delete link">
            <Trash2 />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  )
}
