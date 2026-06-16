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
import type { CreateUrlInput, ShortUrl } from "@/types/url"

type CreateUrlResult =
  | { success: true; url: ShortUrl }
  | { success: false; error: string }

type CreateUrlFormState = {
  error: string | null
  success: boolean
}

const initialFormState: CreateUrlFormState = {
  error: null,
  success: false,
}

type CreateUrlDialogProps = {
  trigger: ReactNode
  onCreate: (input: CreateUrlInput) => Promise<CreateUrlResult>
  disabled?: boolean
}

type CreateUrlFormProps = {
  onCreate: (input: CreateUrlInput) => Promise<CreateUrlResult>
  onSuccess: () => void
  onCancel: () => void
}

function CreateUrlSubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Creating..." : "Create link"}
    </Button>
  )
}

function CreateUrlCancelButton({ onCancel }: { onCancel: () => void }) {
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

function CreateUrlForm({ onCreate, onSuccess, onCancel }: CreateUrlFormProps) {
  const [formState, formAction] = useActionState(
    async (_previousState: CreateUrlFormState, formData: FormData) => {
      const trimmedUrl = formData.get("longUrl")?.toString().trim() ?? ""
      const trimmedTitle = formData.get("title")?.toString().trim() ?? ""

      if (!trimmedUrl) {
        return { error: "Please enter a URL.", success: false }
      }

      const result = await onCreate({
        longUrl: trimmedUrl,
        ...(trimmedTitle ? { title: trimmedTitle } : {}),
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
        <DialogTitle>Create short URL</DialogTitle>
        <DialogDescription>
          Add a name and the long URL you want to shorten.
        </DialogDescription>
      </DialogHeader>

      <div className="grid gap-4 py-4">
        <div className="grid gap-2">
          <Label htmlFor="link-title">Title</Label>
          <Input
            id="link-title"
            name="title"
            type="text"
            placeholder="e.g. Product launch page"
            maxLength={100}
          />
          <p className="text-xs text-muted-foreground">
            Optional — helps you remember what this link is for.
          </p>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="original-url">Original URL</Label>
          <Input
            id="original-url"
            name="longUrl"
            type="url"
            placeholder="https://example.com/very-long-path"
            required
          />
        </div>

        {formState.error ? (
          <p className="text-sm text-destructive">{formState.error}</p>
        ) : null}
      </div>

      <DialogFooter>
        <CreateUrlCancelButton onCancel={onCancel} />
        <CreateUrlSubmitButton />
      </DialogFooter>
    </form>
  )
}

export function CreateUrlDialog({
  trigger,
  onCreate,
  disabled = false,
}: CreateUrlDialogProps) {
  const [open, setOpen] = useState(false)
  const [formKey, setFormKey] = useState(0)

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen)
    if (!nextOpen) {
      setFormKey((current) => current + 1)
    }
  }

  const handleSuccess = () => {
    toast.success("Short link created")
    handleOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild disabled={disabled}>
        {trigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        {open ? (
          <CreateUrlForm
            key={formKey}
            onCreate={onCreate}
            onSuccess={handleSuccess}
            onCancel={() => handleOpenChange(false)}
          />
        ) : null}
      </DialogContent>
    </Dialog>
  )
}
