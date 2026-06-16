import { Check } from "lucide-react"
import { Link } from "react-router-dom"

import { SectionHeader } from "@/components/common/SectionHeader"
import { PLANS } from "@/constants/landing"
import { ROUTES } from "@/constants/routes"

export function PricingSection() {
  return (
    <section id="pricing" className="shorty-section">
      <div className="shorty-container">
        <SectionHeader
          eyebrow="pricing"
          title="Simple, transparent pricing"
          description="Start free and upgrade when you need more. No hidden fees, cancel anytime."
        />

        <div className="mt-14 grid gap-4 lg:grid-cols-3">
          {PLANS.map((plan) => (
            <article
              key={plan.name}
              className="shorty-panel shorty-plan-card"
              data-highlighted={plan.highlighted}
            >
              {plan.highlighted ? (
                <span className="shorty-plan-card__badge">most popular</span>
              ) : null}

              <p className="shorty-mono text-xs text-(--shorty-muted)">
                /{plan.name.toLowerCase()}
              </p>
              <h3 className="mt-2 text-lg font-semibold">{plan.name}</h3>
              <p className="mt-1 text-sm text-(--shorty-muted)">
                {plan.description}
              </p>

              <div className="mt-5 flex items-baseline gap-1">
                <span className="shorty-stat-value text-[2rem]">{plan.price}</span>
                {plan.price !== "$0" ? (
                  <span className="shorty-mono text-xs text-(--shorty-muted)">
                    /mo
                  </span>
                ) : null}
              </div>

              <ul className="mt-6 flex flex-1 flex-col gap-2.5">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2 text-sm text-(--shorty-muted)"
                  >
                    <Check
                      className="mt-0.5 size-3.5 shrink-0 text-(--shorty-signal)"
                      aria-hidden="true"
                    />
                    {feature}
                  </li>
                ))}
              </ul>

              <Link
                to={ROUTES.dashboard}
                className={
                  plan.highlighted
                    ? "shorty-cta mt-8 w-full justify-center"
                    : "shorty-ghost-btn mt-8 w-full justify-center"
                }
              >
                get started
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
