'use client'

import { motion } from 'framer-motion'
import { CheckCircle } from 'lucide-react'
import { useTranslations } from 'next-intl'

const getServices = (t: any) => [
    t('i1'),
    t('i2'),
    t('i3'),
    t('i4'),
    t('i5'),
    t('i6'),
    t('i7'),
    t('i8')
]

export function MetaWhatWeDo() {
    const t = useTranslations('MetaAds.what')
    const services = getServices(t)
    return (
        <section className="py-12 bg-brand-midnight text-white relative overflow-hidden">
            {/* Background Art */}
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5"></div>

            <div className="container mx-auto px-4 max-w-5xl relative z-10">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-extrabold mb-4">{t('headline')}</h2>
                    <p className="text-indigo-200">{t('subtitle')}</p>
                </div>

                <div className="grid md:grid-cols-2 gap-x-12 gap-y-6">
                    {services.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="flex items-start gap-4 p-4 bg-white/5 rounded-lg border border-white/5 hover:border-brand-indigo/50 transition-colors"
                        >
                            <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center shrink-0 text-purple-400">
                                <CheckCircle className="w-5 h-5" />
                            </div>
                            <div className="flex items-center h-8">
                                <h3 className="font-medium text-lg">{item}</h3>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
