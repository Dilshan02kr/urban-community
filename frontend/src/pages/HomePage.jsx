import { Navbar } from '@/features/home/components/Navbar'
import { HeroSection } from '@/features/home/components/HeroSection'
import { FeaturesSection } from '@/features/home/components/FeaturesSection'
import { RolesSection } from '@/features/home/components/RolesSection'
import { HowItWorksSection } from '@/features/home/components/HowItWorksSection'
import { CtaSection } from '@/features/home/components/CtaSection'
import { Footer } from '@/features/home/components/Footer'

export function HomePage() {
  return (
    <div id="top" className="min-h-screen bg-slate-950 text-white">
      <Navbar />
      <main>
        <HeroSection />
        <FeaturesSection />
        <RolesSection />
        <HowItWorksSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  )
}
