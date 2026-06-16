import { BrowserRouter } from "react-router-dom"

import { ApiAuthSetup } from "@/components/api/ApiAuthSetup"
import { ErrorBoundary } from "@/components/common/ErrorBoundary"
import { AppRoutes } from "@/routes"

function App() {
  return (
    <BrowserRouter>
      <ApiAuthSetup />
      <ErrorBoundary>
        <AppRoutes />
      </ErrorBoundary>
    </BrowserRouter>
  )
}

export default App
