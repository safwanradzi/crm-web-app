'use client'

import { Link } from '@/i18n/routing'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ExternalLink } from 'lucide-react'
import { useTranslations } from 'next-intl'

// Note: This component expects props for data, or it can fetch inside if preferred.
// For this implementation, we'll accept data as props to keep it pure, 
// but since the original page fetched data server-side, we'll need to pass it down.
// However, to make it self-contained for the "revamp" request where we might not have data prop wiring yet,
// I'll define an interface but handle empty states gracefully or mock for visual if data is missing.

export function PortfolioPreview({ portfolios = [] }: { portfolios?: any[] }) {
    const t = useTranslations('Home.portfolio')

    return (
        <section className="py-24 container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-16">
                <span className="text-brand-indigo font-bold uppercase tracking-widest text-sm mb-3 block">{t('label')}</span>
                <h2 className="text-3xl md:text-5xl font-extrabold text-brand-midnight mb-4">{t('headline')}</h2>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto">{t('subtitle')}</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {portfolios.length > 0 ? (
                    portfolios.slice(0, 3).map((item, i) => (
                        <motion.div
                            key={item.id || i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="group relative rounded-xl overflow-hidden bg-slate-100 aspect-video shadow-sm hover:shadow-xl transition-all"
                        >
                            {item.image_url ? (
                                <Image
                                    src={item.image_url}
                                    alt={item.title}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                            ) : (
                                <div className="absolute inset-0 flex items-center justify-center text-slate-400">{t('noImage')}</div>
                            )}

                            {/* Overlay */}
                            <div className="absolute inset-0 bg-brand-midnight/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                <div className="text-center p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                    <h3 className="text-white text-xl font-bold mb-2">{item.title}</h3>
                                    <p className="text-slate-300 text-sm mb-6 uppercase tracking-wider">{item.category}</p>
                                    {item.live_url ? (
                                        <Link href={item.live_url} target="_blank" className="inline-flex items-center gap-2 text-white border-b border-brand-coral pb-1 hover:text-brand-coral transition-colors">
                                            {t('visit')} <ExternalLink className="w-4 h-4" />
                                        </Link>
                                    ) : (
                                        <span className="inline-flex items-center gap-2 text-white/50 border-b border-white/20 pb-1 cursor-not-allowed">
                                            {t('visit')} <ExternalLink className="w-4 h-4" />
                                        </span>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))
                ) : (
                    // Fallback skeleton or empty state if no data passed
                    [1, 2, 3].map((_, i) => (
                        <div key={i} className="aspect-video bg-slate-100 rounded-xl animate-pulse"></div>
                    ))
                )}
            </div>

            <div className="text-center">
                <Button asChild variant="outline" className="rounded-full border-brand-indigo text-brand-indigo hover:bg-brand-indigo hover:text-white px-8 h-12">
                    <Link href="/portfolio">{t('viewAll')}</Link>
                </Button>
            </div>
        </section>
    )
}
