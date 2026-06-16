import { SectionHeader } from "@/components/common/SectionHeader"
import { FEATURES, SITE } from "@/constants/landing"

function slugify(text: string) {
  return text.toLowerCase().replace(/\s+/g, "-")
}

export function FeaturesSection() {
  return (
    <section id="features" className="shorty-section">
      <div className="shorty-container">
        <SectionHeader
          eyebrow="features"
          title="Everything you need to manage links at scale"
          description="From solo creators to growing teams, Shorty gives you the tools to create, share, and measure every link."
        />

        <div className="shorty-feature-grid mt-14">
          {FEATURES.map((feature, index) => {
            const slug = slugify(feature.title)
            const isHero = index === 0

            return (
              <article
                key={feature.title}
                className={
                  isHero ? "shorty-feature-card shorty-feature-card--hero" : "shorty-feature-card"
                }
              >
                <div className="shorty-feature-card__route">
                  <span className="shorty-feature-card__method">GET</span>
                  <span className="shorty-feature-card__path">
                    <strong>{SITE.domain}</strong>/{slug}
                  </span>
                  <span className="shorty-feature-card__icon" aria-hidden="true">
                    <feature.icon />
                  </span>
                </div>

                <div className="shorty-feature-card__body">
                  <h3 className="shorty-feature-card__title">{feature.title}</h3>
                  <p className="shorty-feature-card__desc">{feature.description}</p>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
