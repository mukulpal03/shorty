import type { ReactNode } from "react"

import { SectionHeader } from "@/components/common/SectionHeader"
import { SITE, STEPS } from "@/constants/landing"

const STEP_META: Record<
  number,
  { command: string; previewLabel: string; preview: ReactNode }
> = {
  1: {
    command: "paste <long-url>",
    previewLabel: "input",
    preview: (
      <>
        <strong>https://</strong>yoursite.com/blog/launch-announcement-q4-2026
      </>
    ),
  },
  2: {
    command: "customize --slug launch",
    previewLabel: "output",
    preview: (
      <>
        <strong>{SITE.domain}/launch</strong>
        <span className="text-(--shorty-muted)"> ?utm=campaign</span>
      </>
    ),
  },
  3: {
    command: "share --track",
    previewLabel: "redirect",
    preview: (
      <>
        <strong>302</strong> → 2,847 clicks · {"<"}50ms avg
      </>
    ),
  },
}

export function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      className="shorty-section border-t border-(--shorty-wire) bg-(--shorty-surface)"
    >
      <div className="shorty-container">
        <SectionHeader
          eyebrow="how it works"
          title="Three steps to smarter links"
          description="No complex setup. Paste a URL, customize it, and start tracking in under a minute."
        />

        <ol className="shorty-flow mt-14 md:mt-16">
          {STEPS.map((step) => {
            const meta = STEP_META[step.step]

            return (
              <li key={step.step} className="shorty-flow__item">
                <article className="shorty-step-card">
                  <div className="shorty-step-card__node" aria-hidden="true">
                    <span className="shorty-step-card__num">{step.step}</span>
                  </div>

                  <div className="shorty-step-card__cmd">
                    <span className="shorty-step-card__prompt">$</span>
                    <span className="shorty-step-card__cmd-text">{meta.command}</span>
                  </div>

                  <div className="shorty-step-card__body">
                    <h3 className="shorty-step-card__title">{step.title}</h3>
                    <p className="shorty-step-card__desc">{step.description}</p>
                  </div>

                  <div className="shorty-step-card__preview">
                    <span className="shorty-step-card__preview-label">{meta.previewLabel}</span>
                    <span className="shorty-step-card__preview-value">{meta.preview}</span>
                  </div>
                </article>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
