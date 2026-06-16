import { ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"
import { useAuth } from "@clerk/react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ROUTES } from "@/constants/routes"

export function CtaSection() {
  const { isLoaded, isSignedIn } = useAuth()
  const showSignedIn = isLoaded && isSignedIn

  return (
    <section className="border-t border-border/60 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Card className="overflow-hidden bg-muted/30 text-center">
          <CardHeader className="mx-auto max-w-lg items-center px-6 pt-14 sm:px-12 sm:pt-16">
            <CardTitle className="text-3xl text-balance sm:text-4xl">
              Ready to shorten smarter?
            </CardTitle>
            <CardDescription className="text-base">
              Join thousands of marketers, founders, and teams who trust Shorty
              for their most important links.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center gap-3 pb-14 sm:flex-row sm:pb-16">
            {!showSignedIn ? (
              <Button size="lg" className="h-10 px-5" asChild>
                <Link to={ROUTES.signUp}>
                  Create free account
                  <ArrowRight data-icon="inline-end" />
                </Link>
              </Button>
            ) : null}

            {!showSignedIn ? (
              <Button variant="outline" size="lg" className="h-10 px-5" asChild>
                <Link to={ROUTES.signIn}>View dashboard</Link>
              </Button>
            ) : (
              <Button size="lg" className="h-10 px-5" asChild>
                <Link to={ROUTES.dashboard}>
                  Open dashboard
                  <ArrowRight data-icon="inline-end" />
                </Link>
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
