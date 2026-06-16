import { SignUp } from "@clerk/react";

import { ROUTES } from "@/constants/routes";

export function SignUpPage() {
  return (
    <main className="flex min-h-svh items-center justify-center px-4 py-10">
      <SignUp
        path={ROUTES.signUp}
        routing="path"
        signInUrl={ROUTES.signIn}
        fallbackRedirectUrl={ROUTES.dashboard}
        forceRedirectUrl={ROUTES.dashboard}
      />
    </main>
  );
}
