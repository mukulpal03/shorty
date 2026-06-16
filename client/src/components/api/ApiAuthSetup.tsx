import { useClerk } from "@clerk/react"
import { useEffect } from "react"

import { setUnauthorizedHandler } from "@/lib/api/client"
import { notifyWarning } from "@/lib/api/notify"
import { ROUTES } from "@/constants/routes"

export function ApiAuthSetup() {
  const clerk = useClerk()

  useEffect(() => {
    setUnauthorizedHandler(() => {
      notifyWarning("Your session has expired. Please sign in again.")
      void clerk.signOut({ redirectUrl: ROUTES.signIn })
    })

    return () => setUnauthorizedHandler(null)
  }, [clerk])

  return null
}
