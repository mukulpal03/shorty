import { SectionHeader } from "@/components/common/SectionHeader"
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

        <ol className="mt-14 grid gap-8 md:grid-cols-3">
          {STEPS.map((step) => (
            <li key={step.step} className="relative">
              <div className="flex size-10 items-center justify-center rounded-full border border-border bg-background text-sm font-semibold">
                {step.step}
              </div>
              <h3 className="mt-5 text-lg font-medium">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
