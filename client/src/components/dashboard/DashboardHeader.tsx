import { Link2, Plus } from "lucide-react"

import { CreateUrlDialog } from "@/components/dashboard/CreateUrlDialog"
import { Button } from "@/components/ui/button"
import { MOCK_SHORT_URLS } from "@/constants/dashboard"

export function DashboardHeader() {
  const urlCount = MOCK_SHORT_URLS.length

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Your links</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {urlCount} short {urlCount === 1 ? "link" : "links"} in your workspace.
        </p>
      </div>

      <CreateUrlDialog
        trigger={
          <Button>
            <Plus data-icon="inline-start" />
            Create short URL
          </Button>
        }
      />
    </div>
  )
}

export function DashboardEmptyAction() {
  return (
    <CreateUrlDialog
      trigger={
        <Button>
          <Link2 data-icon="inline-start" />
          Create your first link
        </Button>
      }
    />
  )
}
