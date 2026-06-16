import { CtaSection } from "@/components/landing/CtaSection"
import { PricingSection } from "@/components/landing/PricingSection"
import { FeaturesSection } from "@/components/landing/FeaturesSection"
import { HeroSection } from "@/components/landing/HeroSection"
import { HowItWorksSection } from "@/components/landing/HowItWorksSection"
import { GridBackground } from "@/components/common/GridBackground"
import { Footer } from "@/components/layout/Footer"
import { Navbar } from "@/components/layout/Navbar"

import "@/styles/shorty-ui.css"

export function LandingPage() {
  return (
    <div className="shorty-app min-h-svh">
      <div className="shorty-landing-top relative">
        <GridBackground className="shorty-mesh-bg shorty-mesh-bg--landing-top" />
        <Navbar />
        <HeroSection />
      </div>
      <main>
        <FeaturesSection />
        <HowItWorksSection />
        <PricingSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  )
}
