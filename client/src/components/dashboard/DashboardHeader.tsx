import { Link2, Plus } from "lucide-react"

import { CreateUrlDialog } from "@/components/dashboard/CreateUrlDialog"
import { Button } from "@/components/ui/button"
import type { CreateUrlInput, ShortUrl } from "@/types/url"

type CreateUrlResult =
  | { success: true; url: ShortUrl }
  | { success: false; error: string }

type DashboardHeaderProps = {
  urlCount: number
  isLoading: boolean
  isCreating: boolean
  onCreate: (input: CreateUrlInput) => Promise<CreateUrlResult>
}

export function DashboardHeader({
  urlCount,
  isLoading,
  isCreating,
  onCreate,
}: DashboardHeaderProps) {
  const createDisabled = isLoading || isCreating

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Your links</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {isLoading
            ? "Loading your short links..."
            : `${urlCount} short ${urlCount === 1 ? "link" : "links"} in your workspace.`}
        </p>
      </div>

      <CreateUrlDialog
        onCreate={onCreate}
        disabled={createDisabled}
        trigger={
          <Button disabled={createDisabled}>
            <Plus data-icon="inline-start" />
            Create short URL
          </Button>
        }
      />
    </div>
  )
}

type DashboardEmptyActionProps = {
  isCreating: boolean
  onCreate: (input: CreateUrlInput) => Promise<CreateUrlResult>
}

export function DashboardEmptyAction({
  isCreating,
  onCreate,
}: DashboardEmptyActionProps) {
  return (
    <CreateUrlDialog
      onCreate={onCreate}
      disabled={isCreating}
      trigger={
        <Button disabled={isCreating}>
          <Link2 data-icon="inline-start" />
          Create your first link
        </Button>
      }
    />
  )
}
