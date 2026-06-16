import { useState, type ReactNode } from "react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { getShortLinkDisplay } from "@/lib/short-url"
import type { ShortUrl, UrlMutationResult } from "@/types/url"

type DeleteUrlDialogProps = {
  url: ShortUrl
  disabled?: boolean
  trigger: ReactNode
  onDelete: () => Promise<UrlMutationResult>
}

export function DeleteUrlDialog({
  url,
  disabled = false,
  trigger,
  onDelete,
}: DeleteUrlDialogProps) {
  const [open, setOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen)
    if (!nextOpen) {
      setError(null)
      setIsDeleting(false)
    }
  }

  async function handleDelete() {
    setIsDeleting(true)
    setError(null)

    const result = await onDelete()

    if ("error" in result) {
      setError(result.error)
      setIsDeleting(false)
      return
    }

    toast.success("Link deleted")
    handleOpenChange(false)
  }

  const shortLink = getShortLinkDisplay(url.shortUrl)

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild disabled={disabled}>
        {trigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Delete link?</DialogTitle>
          <DialogDescription>
            This will permanently delete{" "}
            <span className="font-medium text-foreground">
              {url.title || shortLink}
            </span>
            . This action cannot be undone.
          </DialogDescription>
        </DialogHeader>

        {error ? <p className="text-sm text-destructive">{error}</p> : null}

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => handleOpenChange(false)}
            disabled={isDeleting}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={() => void handleDelete()}
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : "Delete link"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
