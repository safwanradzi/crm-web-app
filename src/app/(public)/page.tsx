
import { getPublicPortfolios } from './portfolio/actions'
import { HeroSection } from '@/components/home/hero-section'
import { TrustStrip } from '@/components/home/trust-strip'
import { ServicesSection } from '@/components/home/services-section'
import { DifferentiationSection } from '@/components/home/differentiation-section'
import { ProcessSection } from '@/components/home/process-section'
import { PortfolioPreview } from '@/components/home/portfolio-preview'
import { MiniAbout } from '@/components/home/mini-about'
import { CTASection } from '@/components/home/cta-section'

export default async function HomePage() {
    // Fetch data for portfolio preview
    const allPortfolios = await getPublicPortfolios()
    const recentPortfolios = allPortfolios.slice(0, 4)

    return (
        <main className="min-h-screen bg-white overflow-x-hidden">
            <HeroSection />
            <TrustStrip />
            <ServicesSection />
            <DifferentiationSection />
            <ProcessSection />
            <PortfolioPreview portfolios={recentPortfolios} />
            <MiniAbout />
            <CTASection />
        </main>
    )
}
