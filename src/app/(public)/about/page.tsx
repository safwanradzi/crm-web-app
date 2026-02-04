import { AboutHero } from '@/components/about/hero-section'
import { MiniAbout } from '@/components/home/mini-about'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function AboutPage() {
    return (
        <div className="bg-white min-h-screen">
            <AboutHero />

            {/* Reuse MiniAbout for now as core content */}
            <MiniAbout />

            <section className="py-20 bg-slate-50">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold text-brand-midnight mb-6">Join Us On Our Journey</h2>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-10">
                        We are constantly evolving and looking for new challenges. Let's work together to build your digital future.
                    </p>
                    <Link href="/contact">
                        <Button size="lg" className="h-14 px-10 text-lg bg-brand-indigo hover:bg-indigo-700 text-white font-semibold">
                            Get In Touch
                        </Button>
                    </Link>
                </div>
            </section>
        </div>
    )
}
