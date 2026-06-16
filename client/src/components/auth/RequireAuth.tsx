import { useAuth } from "@clerk/react"
import type { ReactNode } from "react"
import { Navigate, useLocation } from "react-router-dom"

import { ROUTES } from "@/constants/routes"

export function RequireAuth({ children }: { children: ReactNode }) {
  const location = useLocation()
  const { isLoaded, isSignedIn } = useAuth()

  if (!isLoaded) {
    return (
      <div className="flex min-h-svh items-center justify-center text-sm text-muted-foreground">
        Loading...
      </div>
    )
  }

  if (!isSignedIn) {
    return (
      <Navigate
        to={ROUTES.signIn}
        replace
        state={{ from: location.pathname + location.search }}
      />
    )
  }

  return <>{children}</>
}
