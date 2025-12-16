import { getPublicPortfolios } from './actions'
import { ExternalLink } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default async function PublicPortfolioPage() {
    const portfolios = await getPublicPortfolios()

    return (
        <div className="bg-white min-h-screen">
            {/* Hero */}
            <section className="bg-brand-gray py-20 border-b border-slate-200">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-brand-midnight mb-4">Work That Blends <span className="text-brand-indigo">Design & Impact</span></h1>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        A curated collection of websites crafted for brands across diverse industries.
                    </p>
                </div>
            </section>

            {/* Portfolio Grid */}
            <section className="py-20 container mx-auto px-4">
                {portfolios.length > 0 ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {portfolios.map((item: any) => (
                            <div key={item.id} className="group rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-300 bg-white flex flex-col h-full">
                                <div className="relative h-64 bg-slate-100 overflow-hidden">
                                    {item.image_url ? (
                                        // eslint-disable-next-line @next/next/no-img-element
                                        <img
                                            src={item.image_url}
                                            alt={item.title}
                                            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                                        />
                                    ) : (
                                        <div className="flex h-full items-center justify-center text-slate-300 font-medium">Coming Soon</div>
                                    )}
                                </div>
                                <div className="p-6 flex flex-col flex-grow">
                                    <div className="mb-2">
                                        <span className="text-xs font-bold text-brand-indigo uppercase tracking-wider">{item.category}</span>
                                    </div>
                                    <h3 className="text-xl font-bold text-brand-midnight mb-3 group-hover:text-brand-indigo transition-colors">{item.title}</h3>
                                    <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-grow line-clamp-3">
                                        {item.description}
                                    </p>
                                    {item.live_url && (
                                        <a href={item.live_url} target="_blank" rel="noopener noreferrer" className="mt-auto">
                                            <Button variant="outline" className="w-full border-slate-200 hover:border-brand-indigo hover:text-brand-indigo gap-2 group-hover:bg-indigo-50">
                                                Visit Website <ExternalLink className="h-4 w-4" />
                                            </Button>
                                        </a>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                        <p className="text-slate-500 mb-4">Our portfolio is being curated.</p>
                        <p className="text-sm text-slate-400">Please check back soon to see our latest work.</p>
                    </div>
                )}

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
