import { useState, type FormEvent, type ReactNode } from "react"

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

type CreateUrlDialogProps = {
  trigger: ReactNode
}

export function CreateUrlDialog({ trigger }: CreateUrlDialogProps) {
  const [open, setOpen] = useState(false)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Create short URL</DialogTitle>
            <DialogDescription>
              Paste the long URL you want to shorten. Backend integration coming
              soon.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-2 py-4">
            <Label htmlFor="original-url">Original URL</Label>
            <Input
              id="original-url"
              type="url"
              placeholder="https://example.com/very-long-path"
              defaultValue=""
            />
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Create link</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
