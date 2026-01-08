'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { CheckCircle2, ArrowRight } from 'lucide-react'

export function WebsiteHero() {
    return (
        <section className="relative pt-12 pb-12 md:pt-20 md:pb-20 overflow-hidden bg-gradient-to-br from-brand-midnight via-brand-midnight to-brand-indigo">
            {/* Abstract Background Elements */}
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-indigo/30 rounded-full blur-3xl opacity-20 animate-pulse"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-coral/10 rounded-full blur-3xl opacity-20"></div>

            <div className="container relative mx-auto px-4 max-w-6xl z-10">
                <div className="grid lg:grid-cols-2 gap-8 items-center">

                    {/* Left Column: Copy */}
                    <div className="max-w-2xl mx-auto lg:mx-0 text-center lg:text-left">

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="text-4xl md:text-5xl lg:text-[3.5rem] font-extrabold text-white tracking-tight mb-6 leading-[1.15]"
                        >
                            Professional Website Development That <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-coral to-orange-400">Converts</span> Visitors To Customers
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="text-lg md:text-xl text-indigo-100 mb-8 leading-relaxed max-w-lg mx-auto lg:mx-0 font-light"
                        >
                            We design and build conversion-focused websites tailored for businesses that want leads, sales, and long-term growth.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                        >
                            <Button asChild size="lg" className="h-14 px-8 text-lg bg-brand-coral hover:bg-orange-600 text-white shadow-lg shadow-orange-900/20 rounded-full transition-all hover:scale-[1.02] border-0">
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
                            <div className="text-center p-8">
                                <div className="w-24 h-24 bg-gradient-to-br from-brand-indigo to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-indigo-500/20 group-hover:scale-110 transition-transform duration-500">
                                    <span className="font-bold text-3xl text-white">UI</span>
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">High-Converting Design</h3>
                                <p className="text-indigo-200 text-sm">Responsive • Fast • SEO Ready</p>
                            </div>

                            {/* Decorative Elements */}
                            <div className="absolute -top-10 -right-10 w-40 h-40 bg-brand-coral/20 rounded-full blur-2xl"></div>
                            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-brand-indigo/40 rounded-full blur-2xl"></div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    )
}
