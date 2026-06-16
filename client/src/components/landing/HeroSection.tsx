import { ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"
import { useAuth } from "@clerk/react"

import { UrlShortenerMockup } from "@/components/landing/UrlShortenerMockup"
import { HERO_BADGES, SITE } from "@/constants/landing"
import { ROUTES } from "@/constants/routes"

export function HeroSection() {
  const { isLoaded, isSignedIn } = useAuth()
  const showSignedIn = isLoaded && isSignedIn
  const [headline, subline] = SITE.tagline.split(".")

  return (
    <section className="shorty-section relative overflow-hidden pb-8 pt-2 sm:pb-12 sm:pt-4">
      <div className="shorty-container relative">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div>
            <p className="shorty-eyebrow">url compression</p>

            <h1 className="shorty-heading max-w-xl">
              {headline.trim()}.
              <span className="mt-2 block font-normal text-(--shorty-muted)">
                {subline?.trim()}.
              </span>
            </h1>

            <p className="shorty-lead max-w-lg">{SITE.description}</p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              {!showSignedIn ? (
                <Link to={ROUTES.signUp} className="shorty-cta w-fit">
                  start for free
                  <ArrowRight aria-hidden="true" />
                </Link>
              ) : null}

              {!showSignedIn ? (
                <Link to={ROUTES.signIn} className="shorty-ghost-btn w-fit">
                  view demo
                </Link>
              ) : (
                <Link to={ROUTES.dashboard} className="shorty-cta w-fit">
                  go to dashboard
                  <ArrowRight aria-hidden="true" />
                </Link>
              )}
            </div>

            <div className="mt-10 flex flex-wrap gap-2">
              {HERO_BADGES.map(({ icon: Icon, label }) => (
                <span key={label} className="shorty-chip">
                  <Icon aria-hidden="true" />
                  {label}
                </span>
              ))}
            </div>
          </div>

          <div className="lg:pt-4">
            <UrlShortenerMockup />
          </div>
        </div>
      </div>
    </section>
  )
}
