'use client'

import React from 'react'
import { motion } from 'framer-motion'

const steps = [
    {
        number: "01",
        title: "Strategy & Planning",
        description: "Align business goals, offers, and growth targets."
    },
    {
        number: "02",
        title: "Website Build / Optimization",
        description: "Develop a conversion-ready foundation."
    },
    {
        number: "03",
        title: "Ads Launch & Testing",
        description: "Deploy campaigns and gather performance data."
    },
    {
        number: "04",
        title: "Optimize & Scale",
        description: "Scale what works and refine continuously."
    }
]

export function ProcessSection() {
    return (
        <section className="py-12 bg-white">
            <div className="container mx-auto px-4 max-w-6xl">
                <div className="text-center mb-16">
                    <span className="text-brand-indigo font-bold tracking-wider uppercase text-sm mb-4 block">How We Do It</span>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-brand-midnight">Our Bundle Implementation Process</h2>
                </div>

                <div className="grid md:grid-cols-4 gap-8">
                    {steps.map((step, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="relative group"
                        >
                            {/* Connector Line */}
                            {i !== steps.length - 1 && (
                                <div className="hidden md:block absolute top-8 left-1/2 w-full h-0.5 bg-slate-100 z-0"></div>
                            )}

                            <div className="relative z-10 flex flex-col items-center text-center">
                                <div className="w-16 h-16 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-center text-xl font-bold text-brand-indigo mb-6 group-hover:scale-110 group-hover:border-brand-indigo transition-all duration-300">
                                    {step.number}
                                </div>
                                <h3 className="text-lg font-bold text-brand-midnight mb-3">{step.title}</h3>
                                <p className="text-slate-600 text-sm">{step.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
