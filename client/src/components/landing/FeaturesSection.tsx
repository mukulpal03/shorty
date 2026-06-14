import { SectionHeader } from "@/components/common/SectionHeader"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FEATURES } from "@/constants/landing"

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeader
          eyebrow="Features"
          title="Everything you need to manage links at scale"
          description="From solo creators to growing teams, Shorty gives you the tools to create, share, and measure every link."
        />

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature) => (
            <Card
              key={feature.title}
              className="transition-colors hover:bg-muted/30"
            >
              <CardHeader>
                <div className="mb-1 flex size-9 items-center justify-center rounded-lg border border-border bg-muted/50">
                  <feature.icon className="size-4 text-foreground" />
                </div>
                <CardTitle className="text-base">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
