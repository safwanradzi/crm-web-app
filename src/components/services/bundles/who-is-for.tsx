'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Briefcase, Rocket, Target, Users } from 'lucide-react'

const targets = [
    {
        icon: <Rocket className="w-8 h-8 text-brand-coral" />,
        title: "Serious Starters",
        description: "Businesses just starting out but wanting to skip the 'test phase' and go straight to professional growth."
    },
    {
        icon: <Target className="w-8 h-8 text-blue-500" />,
        title: "Ad Spenders",
        description: "Brands already spending on ads but seeing poor ROI due to a website that doesn't convert or track properly."
    },
    {
        icon: <Users className="w-8 h-8 text-purple-500" />,
        title: "Service Providers",
        description: "Consultants, agencies, and local services that need a reliable stream of qualified leads quickly."
    },
    {
        icon: <Briefcase className="w-8 h-8 text-emerald-500" />,
        title: "Unified Growth Seekers",
        description: "Companies that want one accountable partner for everything, rather than managing multiple vendors."
    }
]

export function WhoIsFor() {
    return (
        <section className="py-12 bg-slate-50 border-y border-slate-200">
            <div className="container mx-auto px-4 max-w-6xl">
                <div className="text-center mb-16">
                    <span className="text-brand-indigo font-bold tracking-wider uppercase text-sm mb-4 block">Self Qualification</span>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-brand-midnight">These Bundles Are Ideal For</h2>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {targets.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 flex flex-col h-full hover:-translate-y-1"
                        >
                            <div className="mb-6 p-4 bg-slate-50 rounded-xl w-fit border border-slate-100">
                                {item.icon}
                            </div>
                            <h3 className="text-lg font-bold text-brand-midnight mb-3">{item.title}</h3>
                            <p className="text-slate-600 text-sm leading-relaxed flex-grow">
                                {item.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
