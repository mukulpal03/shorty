import { ArrowRight, Check } from "lucide-react"

import { SectionHeader } from "@/components/common/SectionHeader"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

const PLANS = [
  {
    name: "Free",
    price: "$0",
    description: "Perfect for getting started",
    features: ["100 links / month", "Basic analytics", "shorty.co domain"],
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$12",
    description: "For creators and small teams",
    features: [
      "Unlimited links",
      "Advanced analytics",
      "Custom domains",
      "QR codes",
    ],
    highlighted: true,
  },
  {
    name: "Business",
    price: "$49",
    description: "For growing organizations",
    features: [
      "Everything in Pro",
      "Team workspaces",
      "SSO & SAML",
      "Priority support",
    ],
    highlighted: false,
  },
] as const

export function PricingSection() {
  return (
    <section id="pricing" className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeader
          eyebrow="Pricing"
          title="Simple, transparent pricing"
          description="Start free and upgrade when you need more. No hidden fees, cancel anytime."
        />

        <div className="mt-14 grid gap-4 lg:grid-cols-3">
          {PLANS.map((plan) => (
            <Card
              key={plan.name}
              className={
                plan.highlighted
                  ? "relative ring-2 ring-primary/20 shadow-lg shadow-primary/5"
                  : undefined
              }
            >
              {plan.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-0.5 text-xs font-medium text-primary-foreground">
                  Most popular
                </div>
              )}
              <CardHeader>
                <CardTitle>{plan.name}</CardTitle>
                <p className="text-sm text-muted-foreground">{plan.description}</p>
                <div className="pt-2">
                  <span className="text-4xl font-semibold tracking-tight">
                    {plan.price}
                  </span>
                  {plan.price !== "$0" && (
                    <span className="text-sm text-muted-foreground">/mo</span>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2 text-sm text-muted-foreground"
                    >
                      <Check className="mt-0.5 size-4 shrink-0 text-foreground" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  variant={plan.highlighted ? "default" : "outline"}
                  className="w-full"
                >
                  Get started
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
