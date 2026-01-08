'use client'

import { motion } from 'framer-motion'
import { Check, BarChart3, Target, Zap } from 'lucide-react'

const differentiators = [
    { text: "Strategy-first approach (not random templates)", icon: <Target className="w-5 h-5 text-brand-indigo" /> },
    { text: "Conversion psychology baked into the layout", icon: <Zap className="w-5 h-5 text-brand-indigo" /> },
    { text: "Clear messaging + persuasive structure + strong CTAs", icon: <Check className="w-5 h-5 text-brand-indigo" /> },
    { text: "Fast-loading, mobile-first, and ad-traffic ready", icon: <BarChart3 className="w-5 h-5 text-brand-indigo" /> },
    { text: "Built to scale: add pages, funnels, and campaigns", icon: <TrendingUp className="w-5 h-5 text-brand-indigo" /> },
]

import { TrendingUp } from 'lucide-react'

export function DifferentiationSection() {
    return (
        <section className="pt-8 pb-24 md:pt-16 md:pb-24 bg-slate-50 relative overflow-hidden">
            <div className="container mx-auto px-4 relative z-10 max-w-6xl">
                <div className="grid lg:grid-cols-2 gap-16 items-center">

                    {/* Left: Copy */}
                    <div>
                        <motion.h2
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="text-3xl md:text-5xl font-extrabold text-brand-midnight mb-8 leading-tight"
                        >
                            We Don’t Just Build. <br />
                            <span className="text-brand-indigo">We Engineer for Results.</span>
                        </motion.h2>

                        <div className="space-y-6">
                            {differentiators.map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="flex items-start gap-4 p-4 rounded-xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
                                >
                                    <div className="mt-1 p-2 bg-indigo-50 rounded-lg shrink-0">
                                        {item.icon}
                                    </div>
                                    <span className="text-lg text-slate-700 font-medium">{item.text}</span>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Right: Results Framework Visual */}
                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-tr from-indigo-100 to-transparent rounded-full blur-3xl opacity-50"></div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="relative bg-white rounded-2xl shadow-2xl border border-slate-100 p-8"
                        >
                            <div className="flex items-center justify-between mb-8 border-b border-slate-100 pb-4">
                                <h3 className="font-bold text-slate-900">Performance Dashboard</h3>
                                <div className="text-xs font-medium text-slate-400">Live Analytics</div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mb-8">
                                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                                    <div className="text-slate-500 text-sm mb-1">Conversion Rate</div>
                                    <div className="text-2xl font-bold text-brand-indigo">4.8%</div>
                                    <div className="text-xs text-green-600 font-medium flex items-center gap-1">
                                        <TrendingUp className="w-3 h-3" /> +12% vs last month
                                    </div>
                                </div>
                                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                                    <div className="text-slate-500 text-sm mb-1">Cost Per Lead</div>
                                    <div className="text-2xl font-bold text-brand-midnight">$12.50</div>
                                    <div className="text-xs text-green-600 font-medium flex items-center gap-1">
                                        <TrendingUp className="w-3 h-3" /> -8% optimized
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        whileInView={{ width: "75%" }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 1, delay: 0.5 }}
                                        className="h-full bg-brand-coral rounded-full"
                                    ></motion.div>
                                </div>
                                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        whileInView={{ width: "60%" }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 1, delay: 0.7 }}
                                        className="h-full bg-brand-indigo rounded-full"
                                    ></motion.div>
                                </div>
                                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        whileInView={{ width: "90%" }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 1, delay: 0.9 }}
                                        className="h-full bg-brand-soft-blue rounded-full"
                                    ></motion.div>
                                </div>
                            </div>

                            {/* Floating Badge */}
                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute -bottom-6 -right-6 bg-brand-midnight text-white p-4 rounded-xl shadow-xl"
                            >
                                <div className="text-xs opacity-70 mb-1">ROI Focused</div>
                                <div className="font-bold flex items-center gap-2">
                                    <Target className="w-4 h-4 text-brand-coral" />
                                    Precision Targeting
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    )
}
