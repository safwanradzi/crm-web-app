'use client'

import { motion } from 'framer-motion'
import { CheckCircle2, XCircle } from 'lucide-react'

const painPoints = [
    "Ads get clicks but no conversions",
    "Wrong audience targeting",
    "Creatives burn out too quickly",
    "No clear funnel or follow-up strategy"
]

export function MetaWhyMatters() {
    return (
        <section className="py-12 bg-white">
            <div className="container mx-auto px-4 max-w-6xl">
                <div className="grid lg:grid-cols-2 gap-16 items-center">

                    {/* Left: Pain */}
                    <div>
                        <span className="text-red-500 font-bold uppercase tracking-widest text-sm mb-3 block">The Problem</span>
                        <h2 className="text-3xl md:text-4xl font-extrabold text-brand-midnight mb-8">Facebook Ads Work &mdash; <br /> When Strategy Meets Creative</h2>

                        <div className="space-y-4 mb-8">
                            {painPoints.map((point, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="flex items-center gap-3 text-slate-600 p-4 bg-red-50/50 rounded-lg border border-red-100"
                                >
                                    <XCircle className="w-6 h-6 text-red-500 shrink-0" />
                                    <span className="font-medium">{point}</span>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Right: Solution */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="bg-brand-midnight text-white p-10 md:p-12 rounded-2xl shadow-2xl relative overflow-hidden"
                    >
                        {/* Background Accent */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600 rounded-full blur-3xl opacity-20 -translate-y-1/2 translate-x-1/2"></div>

                        <span className="text-purple-400 font-bold uppercase tracking-widest text-sm mb-4 block">The Solution</span>
                        <h3 className="text-2xl font-bold mb-6">Targeting + Creative = Results</h3>
                        <p className="text-indigo-100 text-lg leading-relaxed mb-8">
                            Facebook and Instagram Ads allow you to reach your ideal customers based on interests, behavior, and intent. We combine audience strategy, compelling creatives, and continuous optimization to turn attention into measurable results.
                        </p>

                        <div className="space-y-3">
                            <div className="flex items-center gap-3">
                                <CheckCircle2 className="w-5 h-5 text-green-400" />
                                <span className="font-medium">Audience Strategy</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <CheckCircle2 className="w-5 h-5 text-green-400" />
                                <span className="font-medium">Compelling Creatives</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <CheckCircle2 className="w-5 h-5 text-green-400" />
                                <span className="font-medium">Continuous Optimization</span>
                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    )
}
