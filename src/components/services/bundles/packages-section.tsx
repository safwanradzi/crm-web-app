'use client'

import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { Check } from 'lucide-react'

// Package Data
const packages = [
    {
        name: "Launch Bundle",
        tagline: "Best for New Businesses",
        setupPrice: "1,999",
        monthlyPrice: "1,200",
        features: [
            "High-converting landing page (RM 899 value)",
            "Google Ads OR Facebook Ads management",
            "1 campaign setup",
            "Conversion tracking setup",
            "Basic optimization & reporting"
        ],
        whyWorks: "Lower entry cost to validate ads with a proper conversion page.",
        cta: "Start With Launch Bundle",
        popular: false,
        color: "blue"
    },
    {
        name: "Growth Bundle",
        tagline: "Best for Consistent Leads",
        setupPrice: "3,299",
        monthlyPrice: "2,500",
        features: [
            "Multi-page website (up to 5 pages) — RM 1,899 value",
            "Google Ads OR Facebook Ads management",
            "Up to 3 campaigns",
            "Funnel-based structure",
            "Conversion tracking & optimization",
            "Bi-weekly performance review"
        ],
        whyWorks: "Balanced setup for growth without overcomplication.",
        cta: "Start With Growth Bundle",
        popular: true,
        color: "brand-indigo"
    },
    {
        name: "Scale Bundle",
        tagline: "Best for Aggressive Scaling",
        setupPrice: "4,899",
        monthlyPrice: "4,500",
        features: [
            "Conversion-optimized website or ecommerce setup",
            "Google Ads + Facebook Ads management",
            "Full-funnel campaigns",
            "Advanced tracking & retargeting",
            "Weekly optimization & reporting",
            "Priority support"
        ],
        whyWorks: "Full control of traffic, conversion, and scaling under one team.",
        cta: "Start With Scale Bundle",
        popular: false,
        color: "brand-midnight"
    }
]

export function PackagesSection() {
    return (
        <section id="bundles" className="py-12 bg-brand-midnight relative overflow-hidden">
            {/* Background Accents */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-brand-indigo/10 blur-[100px] rounded-full"></div>
                <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-brand-coral/5 blur-[120px] rounded-full"></div>
            </div>

            <div className="container mx-auto px-4 max-w-7xl relative z-10">
                <div className="text-center mb-16">
                    <span className="text-brand-coral font-bold tracking-wider uppercase text-sm mb-4 block">Our High-Impact Packages</span>
                    <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6">Choose Your Growth Engine</h2>
                    <p className="text-slate-300 max-w-2xl mx-auto">
                        All pricing below is calculated based on our original service prices, with sensible bundle incentives included.
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {packages.map((pkg, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.15 }}
                            className={`relative rounded-3xl overflow-hidden flex flex-col ${pkg.popular ? 'bg-white border-4 border-brand-coral transform lg:-translate-y-6 shadow-2xl shadow-orange-900/20' : 'bg-slate-900/50 border border-slate-700 backdrop-blur-sm hover:border-slate-500 transition-colors'}`}
                        >
                            {pkg.popular && (
                                <div className="bg-brand-coral text-white text-center py-2 font-bold text-sm tracking-widest uppercase">
                                    Most Popular
                                </div>
                            )}

                            <div className="p-8 flex-grow">
                                <p className={`text-sm font-bold tracking-wide uppercase mb-2 ${pkg.popular ? 'text-brand-indigo' : 'text-slate-400'}`}>
                                    {pkg.tagline}
                                </p>
                                <h3 className={`text-2xl font-bold mb-6 ${pkg.popular ? 'text-brand-midnight' : 'text-white'}`}>
                                    {pkg.name}
                                </h3>

                                <div className="mb-8">
                                    <div className="flex items-baseline gap-1 mb-1">
                                        <span className={`text-sm font-medium ${pkg.popular ? 'text-slate-500' : 'text-slate-400'}`}>One-Time Setup:</span>
                                        <span className={`text-2xl font-bold ${pkg.popular ? 'text-brand-midnight' : 'text-white'}`}>RM {pkg.setupPrice}</span>
                                    </div>
                                    <div className="flex items-baseline gap-1">
                                        <span className={`text-sm font-medium ${pkg.popular ? 'text-slate-500' : 'text-slate-400'}`}>+ Monthly Ads Mgmt:</span>
                                        <span className={`text-xl font-bold ${pkg.popular ? 'text-brand-indigo' : 'text-brand-coral'}`}>RM {pkg.monthlyPrice}</span>
                                        <span className="text-xs text-slate-500">/mo</span>
                                    </div>
                                </div>

                                <div className="space-y-4 mb-8">
                                    {pkg.features.map((feature, idx) => (
                                        <div key={idx} className="flex items-start gap-3">
                                            <div className={`mt-0.5 rounded-full p-0.5 ${pkg.popular ? 'bg-indigo-100 text-brand-indigo' : 'bg-slate-800 text-green-400'}`}>
                                                <Check className="h-3 w-3" />
                                            </div>
                                            <span className={`text-sm ${pkg.popular ? 'text-slate-700' : 'text-slate-300'}`}>{feature}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className={`p-4 rounded-xl mb-8 ${pkg.popular ? 'bg-slate-50 border border-slate-200' : 'bg-slate-800/50 border border-slate-700'}`}>
                                    <p className={`text-xs font-semibold uppercase tracking-wider mb-2 ${pkg.popular ? 'text-brand-indigo' : 'text-slate-400'}`}>Why This Works</p>
                                    <p className={`text-sm leading-relaxed ${pkg.popular ? 'text-slate-600' : 'text-slate-400'}`}>
                                        "{pkg.whyWorks}"
                                    </p>
                                </div>
                            </div>

                            <div className="p-8 pt-0 mt-auto">
                                <Button asChild size="lg" className={`w-full h-12 text-base font-semibold transition-all ${pkg.popular ? 'bg-brand-coral hover:bg-orange-600 text-white shadow-lg' : 'bg-white text-brand-midnight hover:bg-slate-100'}`}>
                                    <Link href="/contact?package=bundle">{pkg.cta}</Link>
                                </Button>
                                <p className="text-xs text-center mt-4 text-slate-500">
                                    *Ad spend budget is separate.
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
