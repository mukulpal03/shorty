import { Check } from "lucide-react"
import { Link } from "react-router-dom"

import { SectionHeader } from "@/components/common/SectionHeader"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Item,
  ItemContent,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item"
import { PLANS } from "@/constants/landing"
import { ROUTES } from "@/constants/routes"

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
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">
                  Most popular
                </Badge>
              )}
              <CardHeader>
                <CardTitle>{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
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
                <ItemGroup className="gap-2">
                  {plan.features.map((feature) => (
                    <Item
                      key={feature}
                      size="sm"
                      variant="default"
                      className="border-transparent px-0 py-1"
                    >
                      <ItemMedia variant="icon">
                        <Check />
                      </ItemMedia>
                      <ItemContent>
                        <ItemTitle className="font-normal text-muted-foreground">
                          {feature}
                        </ItemTitle>
                      </ItemContent>
                    </Item>
                  ))}
                </ItemGroup>
              </CardContent>
              <CardFooter>
                <Button
                  variant={plan.highlighted ? "default" : "outline"}
                  className="w-full"
                  asChild
                >
                  <Link to={ROUTES.dashboard}>Get started</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
