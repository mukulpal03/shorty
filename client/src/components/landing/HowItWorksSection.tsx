import { SectionHeader } from "@/components/common/SectionHeader"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { STEPS } from "@/constants/landing"

export function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      className="border-t border-border/60 bg-muted/20 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeader
          eyebrow="How it works"
          title="Three steps to smarter links"
          description="No complex setup. Paste a URL, customize it, and start tracking in under a minute."
        />

        <ol className="mt-14 grid gap-4 md:grid-cols-3">
          {STEPS.map((step) => (
            <li key={step.step}>
              <Card>
                <CardHeader>
                  <Badge variant="outline" className="size-8 rounded-full p-0">
                    {step.step}
                  </Badge>
                  <CardTitle className="text-lg">{step.title}</CardTitle>
                  <CardDescription>{step.description}</CardDescription>
                </CardHeader>
              </Card>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
