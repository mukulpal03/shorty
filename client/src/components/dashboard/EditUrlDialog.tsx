import { useActionState, useEffect, useState, type ReactNode } from "react"
import { useFormStatus } from "react-dom"
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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { ShortUrl, UpdateUrlInput, UrlMutationResult } from "@/types/url"

type EditUrlFormState = {
  error: string | null
  success: boolean
}

const initialFormState: EditUrlFormState = {
  error: null,
  success: false,
}

type EditUrlDialogProps = {
  url: ShortUrl
  disabled?: boolean
  trigger: ReactNode
  onUpdate: (input: UpdateUrlInput) => Promise<UrlMutationResult>
}

type EditUrlFormProps = {
  url: ShortUrl
  onUpdate: (input: UpdateUrlInput) => Promise<UrlMutationResult>
  onSuccess: () => void
  onCancel: () => void
}

function EditUrlSubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Saving..." : "Save changes"}
    </Button>
  )
}

function EditUrlCancelButton({ onCancel }: { onCancel: () => void }) {
  const { pending } = useFormStatus()

  return (
    <Button
      type="button"
      variant="outline"
      onClick={onCancel}
      disabled={pending}
    >
      Cancel
    </Button>
  )
}

function EditUrlForm({ url, onUpdate, onSuccess, onCancel }: EditUrlFormProps) {
  const [formState, formAction] = useActionState(
    async (_previousState: EditUrlFormState, formData: FormData) => {
      const trimmedUrl = formData.get("longUrl")?.toString().trim() ?? ""
      const trimmedTitle = formData.get("title")?.toString().trim() ?? ""

      if (!trimmedUrl) {
        return { error: "Please enter a URL.", success: false }
      }

      const result = await onUpdate({
        longUrl: trimmedUrl,
        title: trimmedTitle,
      })

      if (result.success === false) {
        return { error: result.error, success: false }
      }

      return { error: null, success: true }
    },
    initialFormState,
  )

  useEffect(() => {
    if (formState.success) {
      onSuccess()
    }
  }, [formState.success, onSuccess])

  return (
    <form action={formAction}>
      <DialogHeader>
        <DialogTitle>Edit link</DialogTitle>
        <DialogDescription>
          Update the title or destination URL for this short link.
        </DialogDescription>
      </DialogHeader>

      <div className="grid gap-4 py-4">
        <div className="grid gap-2">
          <Label htmlFor={`edit-title-${url.id}`}>Title</Label>
          <Input
            id={`edit-title-${url.id}`}
            name="title"
            type="text"
            defaultValue={url.title ?? ""}
            placeholder="e.g. Product launch page"
            maxLength={100}
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor={`edit-url-${url.id}`}>Original URL</Label>
          <Input
            id={`edit-url-${url.id}`}
            name="longUrl"
            type="url"
            defaultValue={url.originalUrl}
            required
          />
        </div>

        {formState.error ? (
          <p className="text-sm text-destructive">{formState.error}</p>
        ) : null}
      </div>

      <DialogFooter>
        <EditUrlCancelButton onCancel={onCancel} />
        <EditUrlSubmitButton />
      </DialogFooter>
    </form>
  )
}

export function EditUrlDialog({
  url,
  disabled = false,
  trigger,
  onUpdate,
}: EditUrlDialogProps) {
  const [open, setOpen] = useState(false)
  const [formKey, setFormKey] = useState(0)

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen)
    if (!nextOpen) {
      setFormKey((current) => current + 1)
    }
  }

  const handleSuccess = () => {
    toast.success("Link updated")
    handleOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild disabled={disabled}>
        {trigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        {open ? (
          <EditUrlForm
            key={formKey}
            url={url}
            onUpdate={onUpdate}
            onSuccess={handleSuccess}
            onCancel={() => handleOpenChange(false)}
          />
        ) : null}
      </DialogContent>
    </Dialog>
  )
}
