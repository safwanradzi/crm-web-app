'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { MousePointerClick, TrendingUp, Layers } from 'lucide-react'

export function MetaAdsHero() {
    return (
        <section className="relative pt-12 pb-12 md:pt-20 md:pb-20 overflow-hidden bg-gradient-to-br from-brand-midnight via-brand-midnight to-brand-indigo">
            {/* Abstract Background Elements */}
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-3xl opacity-20 animate-pulse"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-coral/10 rounded-full blur-3xl opacity-20"></div>

            <div className="container relative mx-auto px-4 max-w-6xl z-10">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

                    {/* Left Column: Copy */}
                    <div className="max-w-2xl mx-auto lg:mx-0 text-center lg:text-left relative z-20">

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="text-4xl md:text-5xl lg:text-[3.5rem] font-extrabold text-white tracking-tight mb-6 leading-[1.15]"
                        >
                            Facebook & Instagram Ads That Turn <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Attention</span> Into Sales
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="text-lg md:text-xl text-indigo-100 mb-8 leading-relaxed max-w-lg mx-auto lg:mx-0 font-light"
                        >
                            We plan, launch, and optimize Meta Ads campaigns designed to generate leads and sales by targeting the right audience with the right message.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                        >
                            <Button asChild size="lg" className="h-14 px-8 text-lg bg-white text-brand-midnight hover:bg-indigo-50 shadow-lg rounded-full transition-all hover:scale-[1.02] border-0 font-bold">
                                <Link href="/contact">Get Free Consultation</Link>
                            </Button>
                            <Button asChild size="lg" variant="outline" className="h-14 px-8 text-lg border-white/20 bg-white/5 backdrop-blur-sm text-white hover:bg-white hover:text-brand-midnight rounded-full transition-all hover:scale-[1.02]">
                                <Link href="#packages">View Packages</Link>
                            </Button>
                        </motion.div>
                    </div>

                    {/* Right Column: Visual Mockup */}
                    <div className="relative hidden lg:block h-[450px]">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="relative z-10 w-full h-full bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 shadow-2xl overflow-hidden flex items-center justify-center group hover:border-white/20 transition-colors"
                        >
                            <div className="text-center p-8 relative">
                                {/* Floating stats badges */}
                                <motion.div
                                    animate={{ y: [-5, 5, -5] }}
                                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                                    className="absolute -top-12 -right-4 bg-purple-500/20 backdrop-blur-sm border border-purple-500/30 p-3 rounded-lg flex items-center gap-2"
                                >
                                    <TrendingUp className="w-5 h-5 text-purple-400" />
                                    <span className="text-purple-400 font-bold text-sm">High CTR Creative</span>
                                </motion.div>

                                <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-purple-500/20 group-hover:scale-110 transition-transform duration-500">
                                    <Layers className="w-10 h-10 text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">Creative Strategy</h3>
                                <p className="text-indigo-200 text-sm">Audience Targeting • Visual storytelling</p>
                            </div>

                            {/* Decorative Elements */}
                            <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-500/20 rounded-full blur-2xl"></div>
                            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-500/40 rounded-full blur-2xl"></div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    )
}
