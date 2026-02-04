import { getPublicPortfolios } from './actions'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { PortfolioGrid } from './portfolio-grid'
import { PortfolioHero } from '@/components/portfolio/hero-section'

export default async function PublicPortfolioPage() {
    const portfolios = await getPublicPortfolios()

    return (
        <div className="bg-white min-h-screen">
            {/* Hero */}
            {/* Hero */}
            <PortfolioHero />

            {/* Portfolio Grid */}
            <section className="py-20 container mx-auto px-4 max-w-6xl">
                <PortfolioGrid items={portfolios} />

                {/* CTA */}
                <div className="mt-20 text-center">
                    <h2 className="text-2xl font-bold text-brand-midnight mb-6">Ready to start your project?</h2>
                    <Link href="/contact">
                        <Button size="lg" className="h-14 px-10 text-lg bg-brand-indigo hover:bg-indigo-700 text-white font-semibold shadow-xl shadow-indigo-500/20">
                            Book a Consultation
                        </Button>
                    </Link>
                </div>
            </section>
        </div>
    )
}
