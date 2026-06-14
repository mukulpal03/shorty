import { DashboardHeader } from "@/components/dashboard/DashboardHeader"
import { ShortUrlList } from "@/components/dashboard/ShortUrlList"
import { DashboardNavbar } from "@/components/layout/DashboardNavbar"

export function DashboardPage() {
  return (
    <div className="min-h-svh">
      <DashboardNavbar />
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
        <div className="space-y-8">
          <DashboardHeader />
          <ShortUrlList />
        </div>
      </main>
    </div>
  )
}
