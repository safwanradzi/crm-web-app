'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { BarChart3, Layers, Zap, Target } from 'lucide-react'

const benefits = [
    {
        icon: <Layers className="w-6 h-6 text-blue-500" />,
        title: "One Unified Strategy",
        description: "No more silos. Your traffic source knows exactly what your landing page is doing."
    },
    {
        icon: <Zap className="w-6 h-6 text-brand-coral" />,
        title: "Faster Optimization Cycles",
        description: "We tweak ads and landing pages simultaneously for rapid performance improvements."
    },
    {
        icon: <BarChart3 className="w-6 h-6 text-purple-500" />,
        title: "Cleaner Tracking & Reporting",
        description: "A single source of truth for your data without conflicting attribution models."
    },
    {
        icon: <Target className="w-6 h-6 text-emerald-500" />,
        title: "Accountable Results",
        description: "One team owns the outcome. No more pointing fingers between web devs and ad agencies."
    }
]

export function ValueComparison() {
    return (
        <section className="py-12 bg-slate-50">
            <div className="container mx-auto px-4 max-w-6xl">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-brand-midnight mb-6">Why Bundles Deliver Better Results</h2>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        It’s not just about saving money — it’s about making your marketing machine run smoother.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {benefits.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow text-center"
                        >
                            <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                {item.icon}
                            </div>
                            <h3 className="font-bold text-brand-midnight mb-2">{item.title}</h3>
                            <p className="text-slate-600 text-sm">
                                {item.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
