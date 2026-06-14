import { Route, Routes } from "react-router-dom"

import { ROUTES } from "@/constants/routes"
import { DashboardPage } from "@/pages/DashboardPage"
import { LandingPage } from "@/pages/LandingPage"

export function AppRoutes() {
  return (
    <Routes>
      <Route path={ROUTES.home} element={<LandingPage />} />
      <Route path={ROUTES.dashboard} element={<DashboardPage />} />
    </Routes>
  )
}
