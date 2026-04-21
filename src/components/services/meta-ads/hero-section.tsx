'use client'

import { Link } from '@/i18n/routing'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { MousePointerClick, TrendingUp, Layers } from 'lucide-react'
import { useTranslations } from 'next-intl'

export function MetaAdsHero() {
    const t = useTranslations('MetaAds.hero')

    return (
        <section className="relative pt-32 pb-12 md:pt-32 md:pb-20 overflow-hidden bg-gradient-to-br from-brand-midnight via-brand-midnight to-brand-indigo">
            {/* Abstract Background Elements */}
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-3xl opacity-20 animate-pulse"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-coral/10 rounded-full blur-3xl opacity-20"></div>

            <div className="container relative mx-auto px-4 max-w-6xl z-10">
                <div className="grid lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-16 items-center">

                    {/* Left Column: Copy */}
                    <div className="max-w-2xl mx-auto lg:mx-0 text-center lg:text-left relative z-20">

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="text-4xl md:text-5xl lg:text-[3.5rem] font-extrabold text-white tracking-tight mb-6 leading-[1.15]"
                        >
                            {t('prefix')}<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">{t('highlight')}</span>{t('suffix')}
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="text-lg md:text-xl text-indigo-100 mb-8 leading-relaxed max-w-lg mx-auto lg:mx-0 font-light"
                        >
                            {t('description')}
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                        >
                            <Button asChild size="lg" className="h-14 px-8 text-lg bg-white text-brand-midnight hover:bg-indigo-50 shadow-lg rounded-full transition-all hover:scale-[1.02] border-0 font-bold">
                                <Link href="https://wa.me/60186267912?text=Hi%2C%20I%27m%20interested%20in%20your%20services." target="_blank" rel="noopener noreferrer">{t('ctaPrimary')}</Link>
                            </Button>
                            <Button asChild size="lg" variant="outline" className="h-14 px-8 text-lg border-white/20 bg-white/5 backdrop-blur-sm text-white hover:bg-white hover:text-brand-midnight rounded-full transition-all hover:scale-[1.02]">
                                <Link href="#packages">{t('ctaSecondary')}</Link>
                            </Button>
                        </motion.div>
                    </div>

                    {/* Right Column: Visual Mockup */}
                    <div className="relative hidden lg:block">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="relative z-10 w-full flex items-center justify-center"
                        >
                            <img 
                                src="/meta.png"
                                alt="Meta Ads Management Visual"
                                className="w-full h-auto object-contain drop-shadow-2xl"
                            />
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    )
}
