import { ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"
import { useAuth } from "@clerk/react"

import { GridBackground } from "@/components/common/GridBackground"
import { UrlShortenerMockup } from "@/components/landing/UrlShortenerMockup"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { HERO_BADGES, SITE } from "@/constants/landing"
import { ROUTES } from "@/constants/routes"

export function HeroSection() {
  const { isLoaded, isSignedIn } = useAuth()
  const showSignedIn = isLoaded && isSignedIn

  return (
    <section className="relative overflow-hidden pb-16 pt-12 sm:pb-24 sm:pt-20">
      <GridBackground />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
            {SITE.tagline.split(".")[0]}.
            <span className="block text-muted-foreground">
              {SITE.tagline.split(".")[1]?.trim()}.
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground text-pretty sm:text-lg">
            {SITE.description}
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            {!showSignedIn ? (
              <Button size="lg" className="h-10 px-5" asChild>
                <Link to={ROUTES.signUp}>
                  Start for free
                  <ArrowRight data-icon="inline-end" />
                </Link>
              </Button>
            ) : null}

            {!showSignedIn ? (
              <Button variant="outline" size="lg" className="h-10 px-5" asChild>
                <Link to={ROUTES.signIn}>View demo</Link>
              </Button>
            ) : (
              <Button size="lg" className="h-10 px-5" asChild>
                <Link to={ROUTES.dashboard}>
                  Go to dashboard
                  <ArrowRight data-icon="inline-end" />
                </Link>
              </Button>
            )}
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            {HERO_BADGES.map(({ icon: Icon, label }) => (
              <Badge key={label} variant="outline">
                <Icon data-icon="inline-start" />
                {label}
              </Badge>
            ))}
          </div>
        </div>

        <div className="mt-16 sm:mt-20">
          <UrlShortenerMockup />
        </div>
      </div>
    </section>
  )
}
