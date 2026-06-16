import { Link2, Plus } from "lucide-react"

import { CreateUrlDialog } from "@/components/dashboard/CreateUrlDialog"
import { Button } from "@/components/ui/button"
import type { CreateUrlInput, UrlMutationResult } from "@/types/url"

type DashboardHeaderProps = {
  urlCount: number
  isLoading: boolean
  isCreating: boolean
  onCreate: (input: CreateUrlInput) => Promise<UrlMutationResult>
}

export function DashboardHeader({
  urlCount,
  isLoading,
  isCreating,
  onCreate,
}: DashboardHeaderProps) {
  const createDisabled = isLoading || isCreating

  return (
    <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="shorty-eyebrow">link registry</p>
        <h1 className="shorty-heading text-2xl sm:text-3xl">Your links</h1>
        <p className="shorty-mono mt-2 text-xs text-(--shorty-muted)">
          {isLoading
            ? "loading your short links..."
            : `${urlCount} short ${urlCount === 1 ? "link" : "links"} in your workspace`}
        </p>
      </div>

      <CreateUrlDialog
        onCreate={onCreate}
        disabled={createDisabled}
        trigger={
          <Button
            disabled={createDisabled}
            className="shorty-mono h-9 rounded-full bg-(--shorty-ink) px-4 text-xs font-medium text-(--shorty-surface) hover:bg-(--shorty-ink)/90"
          >
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
  onCreate: (input: CreateUrlInput) => Promise<UrlMutationResult>
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
        <Button
          disabled={isCreating}
          className="shorty-mono h-9 rounded-full bg-(--shorty-ink) px-4 text-xs font-medium text-(--shorty-surface) hover:bg-(--shorty-ink)/90"
        >
          <Link2 data-icon="inline-start" />
          Create your first link
        </Button>
      }
    />
  )
}
