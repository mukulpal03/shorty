import { Copy, ExternalLink, Trash2 } from "lucide-react"

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
import { DashboardEmptyAction } from "@/components/dashboard/DashboardHeader"
import { MOCK_SHORT_URLS, type MockShortUrl } from "@/constants/dashboard"

export function ShortUrlList() {
  if (MOCK_SHORT_URLS.length === 0) {
    return (
      <Empty className="border">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <ExternalLink />
          </EmptyMedia>
          <EmptyTitle>No short links yet</EmptyTitle>
          <EmptyDescription>
            Create a short URL from any long link. Your links will appear here
            once the backend is connected.
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
          {MOCK_SHORT_URLS.map((url) => (
            <ShortUrlRow key={url.id} url={url} />
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

function ShortUrlRow({ url }: { url: MockShortUrl }) {
  return (
    <TableRow>
      <TableCell>
        <div className="space-y-1">
          <p className="font-mono text-sm font-medium">{url.shortLink}</p>
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
        {url.createdAt}
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
