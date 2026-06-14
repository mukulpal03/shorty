import { DashboardHeader } from "@/components/dashboard/DashboardHeader"
import { ShortUrlList } from "@/components/dashboard/ShortUrlList"
import { DashboardNavbar } from "@/components/layout/DashboardNavbar"
import { useShortUrls } from "@/hooks/use-short-urls"

export function DashboardPage() {
  const { urls, isLoading, error, refetch } = useShortUrls()

  return (
    <div className="min-h-svh">
      <DashboardNavbar />
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
        <div className="space-y-8">
          <DashboardHeader urlCount={urls.length} isLoading={isLoading} />
          <ShortUrlList
            urls={urls}
            isLoading={isLoading}
            error={error}
            onRetry={refetch}
          />
        </div>
      </main>
    </div>
  )
}
