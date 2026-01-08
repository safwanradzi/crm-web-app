'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { AlertCircle, ArrowRight, Lightbulb, Zap } from 'lucide-react'

export function WhyBundling() {
    return (
        <section className="py-12 bg-white">
            <div className="container mx-auto px-4 max-w-6xl">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-extrabold text-brand-midnight mb-6">Why Website & Ads Should Work Together</h2>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        Inconsistent messaging and disconnected strategies kill conversion rates. Here's why holistic is better.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 relative">
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden md:block absolute top-12 left-[20%] right-[20%] h-0.5 bg-slate-100 -z-10"></div>

                    {/* Step 1: Problem */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-white border border-slate-100 rounded-2xl p-8 hover:shadow-xl transition-shadow text-center relative group"
                    >
                        <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                            <AlertCircle className="h-8 w-8 text-red-500" />
                        </div>
                        <h3 className="text-xl font-bold text-brand-midnight mb-3">The Problem</h3>
                        <p className="text-slate-600 leading-relaxed">
                            Running ads to a weak or unoptimized website wastes budget and lowers conversion. You pay for clicks that don't convert.
                        </p>
                    </motion.div>

                    {/* Step 2: Reality */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="bg-white border border-slate-100 rounded-2xl p-8 hover:shadow-xl transition-shadow text-center relative group"
                    >
                        <div className="w-16 h-16 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                            <Lightbulb className="h-8 w-8 text-orange-500" />
                        </div>
                        <h3 className="text-xl font-bold text-brand-midnight mb-3">The Reality</h3>
                        <p className="text-slate-600 leading-relaxed">
                            A great website without traffic takes time to generate results. SEO is slow, and organic reach is unpredictable.
                        </p>
                    </motion.div>

                    {/* Step 3: Solution */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="bg-brand-midnight text-white rounded-2xl p-8 shadow-2xl text-center relative group transform md:-translate-y-4"
                    >
                        <div className="w-16 h-16 bg-brand-indigo rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-indigo-500/30">
                            <Zap className="h-8 w-8 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3">The Solution</h3>
                        <p className="text-indigo-100 leading-relaxed">
                            When combined, messaging stays consistent, tracking is cleaner, and results improve faster. Immediate traffic meets a conversion-ready site.
                        </p>
                    </motion.div>

                </div>
            </div>
        </section>
    )
}
