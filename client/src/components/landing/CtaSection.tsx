import { ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"
import { useAuth } from "@clerk/react"

import { ROUTES } from "@/constants/routes"

export function CtaSection() {
  const { isLoaded, isSignedIn } = useAuth()
  const showSignedIn = isLoaded && isSignedIn

  return (
    <section className="shorty-section border-t border-(--shorty-wire)">
      <div className="shorty-container">
        <div className="shorty-panel shorty-terminal mx-auto max-w-3xl">
          <div className="shorty-terminal__bar">
            <span className="shorty-terminal__dot" />
            <span className="shorty-terminal__dot" />
            <span className="shorty-terminal__dot" />
            <span className="shorty-terminal__title">~/shorty — ready</span>
          </div>

          <div className="px-6 py-12 text-center sm:px-10 sm:py-14">
            <h2 className="shorty-heading text-2xl sm:text-3xl">
              Ready to shorten smarter?
            </h2>
            <p className="shorty-lead mx-auto mt-4">
              Join thousands of marketers, founders, and teams who trust Shorty for
              their most important links.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              {!showSignedIn ? (
                <Link to={ROUTES.signUp} className="shorty-cta">
                  create free account
                  <ArrowRight aria-hidden="true" />
                </Link>
              ) : null}

              {!showSignedIn ? (
                <Link to={ROUTES.signIn} className="shorty-ghost-btn">
                  view dashboard
                </Link>
              ) : (
                <Link to={ROUTES.dashboard} className="shorty-cta">
                  open dashboard
                  <ArrowRight aria-hidden="true" />
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
