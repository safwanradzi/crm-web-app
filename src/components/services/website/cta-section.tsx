'use client'

import { Link } from '@/i18n/routing'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { useTranslations } from 'next-intl'

export function WebsiteCTA() {
    const t = useTranslations('WebDev.cta')

    return (
        <section className="py-16 bg-gradient-to-br from-brand-indigo to-blue-600 relative overflow-hidden text-center">
            {/* Background Effects */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-black/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

            <div className="container mx-auto px-4 max-w-4xl relative z-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                >
                    <h2 
                        className="text-3xl md:text-5xl font-extrabold text-white mb-6 leading-tight"
                        dangerouslySetInnerHTML={{ __html: t('headline') }}
                    />
                    <p className="text-indigo-100 text-xl mb-10 max-w-2xl mx-auto">
                        {t('subtitle')}
                    </p>

                    <Button asChild size="lg" className="h-16 px-12 text-lg bg-white text-brand-indigo hover:bg-slate-50 font-bold rounded-full shadow-xl transition-all hover:scale-[1.02]">
                        <Link href="/contact">{t('btn')}</Link>
                    </Button>

                    <p className="mt-6 text-indigo-200 text-sm font-medium opacity-80">
                        {t('footer')}
                    </p>
                </motion.div>
            </div>
        </section>
    )
}
