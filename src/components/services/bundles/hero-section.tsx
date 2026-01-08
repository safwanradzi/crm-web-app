'use client'

import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle2, TrendingUp } from 'lucide-react'

export function BundleHero() {
    return (
        <section className="relative pt-24 pb-12 md:pt-32 md:pb-20 overflow-hidden bg-gradient-to-br from-brand-midnight via-slate-900 to-brand-indigo">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-indigo/30 rounded-full blur-3xl opacity-20 animate-pulse"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-coral/10 rounded-full blur-3xl opacity-20"></div>

            <div className="container mx-auto px-4 relative z-10 max-w-6xl">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                    {/* Left Column: Copy */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center lg:text-left"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 text-brand-coral text-sm font-semibold mb-8">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-coral opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-coral"></span>
                            </span>
                            High-Performance Growth Bundles
                        </div>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-[1.15] mb-6">
                            Website + Ads Bundles Built for <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-coral to-orange-400">Faster Growth</span>
                        </h1>

                        <p className="text-lg md:text-xl text-slate-300 mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-light">
                            Instead of hiring separate vendors for websites and ads, we combine both into a single, performance-focused growth package — fully aligned, fully accountable.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            <Button asChild size="lg" className="h-14 px-8 text-lg bg-brand-coral hover:bg-orange-600 text-white shadow-lg shadow-orange-900/20 rounded-full transition-all hover:scale-[1.02] border-0">
                                <Link href="/contact">Get Free Growth Consultation</Link>
                            </Button>
                            <Button asChild size="lg" variant="outline" className="h-14 px-8 text-lg border-white/20 bg-white/5 backdrop-blur-sm text-white hover:bg-white hover:text-brand-midnight rounded-full transition-all hover:scale-[1.02]">
                                <Link href="#bundles">View Bundle Packages</Link>
                            </Button>
                        </div>
                    </motion.div>

                    {/* Right Column: Visual */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative hidden lg:block"
                    >
                        {/* Main Floating Card */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-brand-indigo/20 blur-[100px] rounded-full"></div>

                        <div className="relative z-10 bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 shadow-2xl">
                            <div className="flex items-center justify-between mb-8">
                                <div>
                                    <p className="text-slate-400 text-sm">Monthly Growth</p>
                                    <h3 className="text-3xl font-bold text-white">+148%</h3>
                                </div>
                                <div className="h-12 w-12 bg-green-500/20 rounded-full flex items-center justify-center">
                                    <TrendingUp className="h-6 w-6 text-green-400" />
                                </div>
                            </div>

                            {/* Abstract Graph Lines */}
                            <div className="space-y-3">
                                <div className="h-2 bg-white/10 rounded-full w-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: "85%" }}
                                        transition={{ duration: 1.5, delay: 0.5 }}
                                        className="h-full bg-gradient-to-r from-brand-indigo to-blue-500"
                                    ></motion.div>
                                </div>
                                <div className="h-2 bg-white/10 rounded-full w-3/4 overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: "70%" }}
                                        transition={{ duration: 1.5, delay: 0.7 }}
                                        className="h-full bg-gradient-to-r from-brand-coral to-orange-500"
                                    ></motion.div>
                                </div>
                                <div className="h-2 bg-white/10 rounded-full w-5/6 overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: "90%" }}
                                        transition={{ duration: 1.5, delay: 0.9 }}
                                        className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                                    ></motion.div>
                                </div>
                            </div>

                            <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between text-sm text-slate-300">
                                <div className="flex items-center gap-2">
                                    <CheckCircle2 className="h-4 w-4 text-green-400" />
                                    <span>Google Ads Optimized</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <CheckCircle2 className="h-4 w-4 text-green-400" />
                                    <span>Site Conversion Ready</span>
                                </div>
                            </div>
                        </div>

                        {/* Floating Badge */}
                        <motion.div
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute -top-10 -right-10 bg-brand-coral text-white p-4 rounded-xl shadow-xl shadow-orange-900/40 rotate-12 z-20"
                        >
                            <span className="font-bold text-lg">2-in-1 Power</span>
                        </motion.div>

                    </motion.div>
                </div>
            </div>
        </section>
    )
}
