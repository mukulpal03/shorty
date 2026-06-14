import { ArrowRight } from "lucide-react"

import { GridBackground } from "@/components/common/GridBackground"
import { UrlShortenerMockup } from "@/components/landing/UrlShortenerMockup"
import { Button } from "@/components/ui/button"
import { HERO_BADGES, SITE } from "@/constants/landing"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pb-16 pt-12 sm:pb-24 sm:pt-20">
      <GridBackground />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center rounded-full border border-border bg-muted/50 px-3 py-1 text-xs font-medium text-muted-foreground">
            Now in public beta
          </div>

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
            <Button size="lg" className="h-10 px-5">
              Start for free
              <ArrowRight data-icon="inline-end" />
            </Button>
            <Button variant="outline" size="lg" className="h-10 px-5">
              View demo
            </Button>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            {HERO_BADGES.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-background px-3 py-1.5 text-xs text-muted-foreground"
              >
                <Icon className="size-3.5" />
                {label}
              </div>
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
