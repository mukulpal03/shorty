import { useAuth } from "@clerk/react"
import { useEffect } from "react"

import { DashboardHeader } from "@/components/dashboard/DashboardHeader"
import { ShortUrlList } from "@/components/dashboard/ShortUrlList"
import { DashboardNavbar } from "@/components/layout/DashboardNavbar"
import { useShortUrls } from "@/hooks/use-short-urls"
import { getErrorMessage } from "@/lib/api/errors"
import { notifyWarning } from "@/lib/api/notify"
import { syncMe } from "@/lib/api/users"

export function DashboardPage() {
  const { isLoaded, isSignedIn, getToken } = useAuth()
  const {
    urls,
    isLoading,
    isCreating,
    updatingId,
    deletingId,
    error,
    refetch,
    createUrl,
    updateUrl,
    deleteUrl,
  } = useShortUrls()

  useEffect(() => {
    if (!isLoaded || !isSignedIn) return

    void getToken()
      .then((token) => syncMe(token))
      .catch((error) => {
        notifyWarning(getErrorMessage(error) || "Could not sync your profile.")
      })
  }, [getToken, isLoaded, isSignedIn])

  return (
    <div className="min-h-svh">
      <DashboardNavbar />
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
        <div className="space-y-8">
          <DashboardHeader
            urlCount={urls.length}
            isLoading={isLoading}
            isCreating={isCreating}
            onCreate={createUrl}
          />
          <ShortUrlList
            urls={urls}
            isLoading={isLoading}
            error={error}
            onRetry={refetch}
            isCreating={isCreating}
            updatingId={updatingId}
            deletingId={deletingId}
            onCreate={createUrl}
            onUpdate={updateUrl}
            onDelete={deleteUrl}
          />
        </div>
      </main>
    </div>
  )
}
