import { Route, Routes } from "react-router-dom"

import { RequireAuth } from "@/components/auth/RequireAuth"
import { ROUTES } from "@/constants/routes"
import { DashboardPage } from "@/pages/DashboardPage"
import { LandingPage } from "@/pages/LandingPage"
import { SignInPage } from "@/pages/SignInPage"
import { SignUpPage } from "@/pages/SignUpPage"

export function AppRoutes() {
  return (
    <Routes>
      <Route path={ROUTES.home} element={<LandingPage />} />
      <Route path={`${ROUTES.signIn}/*`} element={<SignInPage />} />
      <Route path={`${ROUTES.signUp}/*`} element={<SignUpPage />} />
      <Route
        path={ROUTES.dashboard}
        element={
          <RequireAuth>
            <DashboardPage />
          </RequireAuth>
        }
      />
    </Routes>
  )
}
