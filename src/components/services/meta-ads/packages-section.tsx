'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Check } from 'lucide-react'

const packages = [
    {
        name: "STARTER PACKAGE",
        price: "RM 700",
        period: "/ month",
        bestFor: "Small businesses starting with Facebook & Instagram Ads",
        features: [
            "1 campaign",
            "1–2 ad sets",
            "Basic audience targeting",
            "Ad copy guidance",
            "Pixel setup",
            "Monthly performance report"
        ],
        cta: "Get Started",
        popular: false
    },
    {
        name: "GROWTH PACKAGE",
        price: "RM 1,400",
        period: "/ month",
        bestFor: "Businesses ready to generate consistent leads or sales",
        features: [
            "Up to 3 campaigns",
            "Funnel-based structure",
            "Creative testing framework",
            "Audience expansion strategy",
            "Ongoing optimization",
            "Bi-weekly performance review"
        ],
        cta: "Get Started",
        popular: true
    },
    {
        name: "SCALE PACKAGE",
        price: "RM 2,800",
        period: "/ month",
        bestFor: "Brands aggressively scaling with Meta Ads",
        features: [
            "Full-funnel campaigns",
            "Advanced creative testing",
            "Retargeting & scaling strategy",
            "Conversion-focused optimization",
            "Weekly performance analysis",
            "Priority support"
        ],
        cta: "Get Started",
        popular: false
    }
]

export function MetaPackagesSection() {
    return (
        <section id="packages" className="py-12 bg-slate-50">
            <div className="container mx-auto px-4 max-w-6xl">
                <div className="text-center mb-16">
                    <span className="text-brand-indigo font-bold uppercase tracking-widest text-sm mb-3 block">Management Fees</span>
                    <h2 className="text-3xl md:text-5xl font-extrabold text-brand-midnight">Transparent Pricing</h2>
                    <p className="text-slate-500 mt-4 text-sm">*Note: Ad spend is not included in management fees.</p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {packages.map((pkg, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            whileHover={{ y: -5 }}
                            className={`relative bg-white rounded-2xl p-8 border ${pkg.popular ? 'border-brand-indigo shadow-xl ring-1 ring-brand-indigo/50' : 'border-slate-200 shadow-sm hover:shadow-lg'} flex flex-col`}
                        >
                            {pkg.popular && (
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-brand-indigo text-white px-4 py-1 rounded-full text-sm font-bold tracking-wide">
                                    RECOMMENDED
                                </div>
                            )}

                            <div className="mb-6">
                                <h3 className="text-xl font-bold text-brand-midnight mb-2">{pkg.name}</h3>
                                <div className="flex items-baseline gap-1 mb-2">
                                    <span className="text-3xl font-extrabold text-brand-coral">{pkg.price}</span>
                                    <span className="text-slate-500 text-sm font-medium">{pkg.period}</span>
                                </div>
                                <p className="text-sm text-slate-500 leading-relaxed min-h-[40px]">{pkg.bestFor}</p>
                            </div>

                            <ul className="space-y-4 mb-8 flex-1">
                                {pkg.features.map((feature, idx) => (
                                    <li key={idx} className="flex items-start gap-3 text-sm text-slate-700">
                                        <Check className="w-5 h-5 text-green-500 shrink-0" />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <Button asChild className={`w-full ${pkg.popular ? 'bg-brand-indigo hover:bg-indigo-700 text-white' : 'bg-slate-900 text-white hover:bg-slate-800'}`}>
                                <Link href="/contact?package=meta-ads">{pkg.cta}</Link>
                            </Button>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
