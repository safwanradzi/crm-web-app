'use client'

import { Link } from '@/i18n/routing'
import { ArrowRight, LayoutDashboard, MonitorPlay, MousePointerClick } from 'lucide-react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { useTranslations } from 'next-intl'

const getServices = (t: any) => [
    {
        title: t('s1Title'),
        description: t('s1Desc'),
        icon: <LayoutDashboard className="w-8 h-8 text-white group-hover:scale-110 transition-transform duration-300" />,
        color: "bg-brand-midnight", // Dark for "Premium/Core" feel
        linkText: t('s1Link'),
        href: "/services/website-development",
        delay: 0
    },
    {
        title: t('s2Title'),
        description: t('s2Desc'),
        icon: <MousePointerClick className="w-8 h-8 text-white group-hover:scale-110 transition-transform duration-300" />,
        color: "bg-blue-600", // Trust/Google Blue
        linkText: t('s2Link'),
        href: "/services/google-ads",
        delay: 0.1
    },
    {
        title: t('s3Title'),
        description: t('s3Desc'),
        icon: <MonitorPlay className="w-8 h-8 text-white group-hover:scale-110 transition-transform duration-300" />,
        color: "bg-brand-indigo", // Creative/Social Purple-ish
        linkText: t('s3Link'),
        href: "/services/meta-ads",
        delay: 0.2
    }
]

export function ServicesSection() {
    const t = useTranslations('Home.services')
    const services = getServices(t)

    return (
        <section className="pt-24 pb-8 md:pb-24 container mx-auto px-4 max-w-6xl">
            <div className="text-center max-w-3xl mx-auto mb-16">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-3xl md:text-5xl font-extrabold text-brand-midnight mb-6"
                >
                    {t('label')}
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="text-lg text-slate-600"
                >
                    {t('subtitle')}
                </motion.p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
                {services.map((service, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        whileHover={{ y: -10 }}
                        className={`group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col`}
                    >
                        {/* Header Color Block */}
                        <div className={`${service.color} p-8 text-white relative overflow-hidden`}>
                            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-150 transition-transform duration-500">
                                {service.icon}
                            </div>
                            <div className="relative z-10">
                                <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mb-6 backdrop-blur-sm border border-white/10">
                                    {service.icon}
                                </div>
                                <h3 className="text-2xl font-bold min-h-[4rem] flex items-center">{service.title}</h3>
                            </div>
                        </div>

                        {/* Content Body */}
                        <div className="bg-white p-8 flex-grow flex flex-col border-x border-b border-slate-100 rounded-b-2xl">
                            <p className="text-slate-600 leading-relaxed mb-8 flex-grow">{service.description}</p>

                            <Link href={service.href} className="inline-flex items-center text-brand-indigo font-bold group-hover:translate-x-2 transition-transform">
                                {service.linkText} <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    )
}
