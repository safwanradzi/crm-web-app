'use client'

import { Link } from '@/i18n/routing'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'

import { Brain, BarChart3, ShieldCheck, TrendingUp } from 'lucide-react'
import { useTranslations } from 'next-intl'

const getValues = (t: any) => [
    { text: t('v1'), icon: <Brain className="w-5 h-5 text-brand-coral" /> },
    { text: t('v2'), icon: <BarChart3 className="w-5 h-5 text-brand-coral" /> },
    { text: t('v3'), icon: <ShieldCheck className="w-5 h-5 text-brand-coral" /> },
    { text: t('v4'), icon: <TrendingUp className="w-5 h-5 text-brand-coral" /> },
]

export function MiniAbout() {
    const t = useTranslations('Home.about')
    const values = getValues(t)

    return (
        <section className="py-24 bg-white border-y border-slate-100">
            <div className="container mx-auto px-4 max-w-6xl">
                <div className="grid lg:grid-cols-2 gap-16 items-center">

                    {/* Image / Founder */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        <div className="absolute -inset-4 bg-brand-indigo/5 rounded-2xl -z-10 rotate-3"></div>
                        <div className="relative rounded-2xl overflow-hidden aspect-[4/5] bg-slate-200 shadow-2xl">
                            <img 
                                src="/meeting.png"
                                alt="Agency Team Meeting"
                                className="w-full h-full object-cover absolute inset-0"
                            />
                        </div>
                    </motion.div>

                    {/* Content */}
                    <div>
                        <span className="text-brand-coral font-bold uppercase tracking-widest text-sm mb-3 block">{t('label')}</span>
                        <h2 className="text-3xl md:text-5xl font-extrabold text-brand-midnight mb-6">{t('headline')}</h2>
                        <p className="text-lg text-slate-600 leading-relaxed mb-8">
                            {t('desc')}
                        </p>

                        <div className="grid sm:grid-cols-2 gap-4 mb-10">
                            {values.map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="flex items-center gap-3 px-4 py-4 bg-slate-50 border border-slate-100 rounded-xl text-slate-700 font-bold text-sm hover:border-brand-indigo/30 hover:shadow-sm transition-all text-left"
                                >
                                    <div className="bg-white p-2 rounded-lg shadow-sm border border-slate-100 shrink-0">
                                        {item.icon}
                                    </div>
                                    <span>{item.text}</span>
                                </motion.div>
                            ))}
                        </div>

                        <Button asChild size="lg" variant="outline" className="border-brand-midnight text-brand-midnight hover:bg-brand-midnight hover:text-white rounded-full">
                            <Link href="/about">{t('btn')}</Link>
                        </Button>
                    </div>

                </div>
            </div>
        </section>
    )
}
