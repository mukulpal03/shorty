import { SignIn } from "@clerk/react"

import { ROUTES } from "@/constants/routes"

export function SignInPage() {
  return (
    <main className="flex min-h-svh items-center justify-center px-4 py-10">
      <SignIn
        path={ROUTES.signIn}
        routing="path"
        signUpUrl={ROUTES.signUp}
        fallbackRedirectUrl={ROUTES.dashboard}
      />
    </main>
  )
}

