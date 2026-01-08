'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'

export function HeroSection() {
    return (
        <section className="relative pt-32 pb-24 md:pt-32 md:pb-32 overflow-hidden bg-gradient-to-br from-brand-midnight via-brand-midnight to-brand-indigo">
            {/* Abstract Background Elements */}
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-indigo/20 rounded-full blur-3xl opacity-30 animate-pulse"></div>
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand-soft-blue/20 rounded-full blur-3xl opacity-20"></div>

            <div className="container relative mx-auto px-4 max-w-6xl z-10">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">

                    {/* Left Column: Copy */}
                    <div className="max-w-2xl mx-auto lg:mx-0 text-center lg:text-left z-10">

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="text-4xl md:text-5xl lg:text-[3.5rem] font-black text-white tracking-tight mb-6 leading-[1.15]"
                        >
                            Websites & Ads Built to <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-coral to-orange-400">Convert</span> — Not Just Look Good.
                        </motion.h1>

                        {/* Mobile Visual (Visible only on mobile/tablet) */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="relative w-full mb-8 lg:hidden block"
                        >
                            <Image
                                src="/hero-illustration.png"
                                alt="Digital Growth Strategy Illustration"
                                width={600}
                                height={600}
                                className="w-full h-auto drop-shadow-2xl rounded-3xl"
                                priority
                            />
                        </motion.div>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="text-lg md:text-xl text-indigo-100 mb-8 leading-relaxed max-w-lg mx-auto lg:mx-0 font-light"
                        >
                            We help businesses grow online with conversion-focused websites and performance-driven advertising strategies.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-10"
                        >
                            <Button asChild size="lg" className="h-14 px-8 text-lg bg-brand-coral hover:bg-orange-600 text-white shadow-lg shadow-orange-900/20 rounded-full transition-all hover:scale-[1.02] border-0">
                                <Link href="/contact">Get a Free Consultation</Link>
                            </Button>
                            <Button asChild size="lg" variant="outline" className="h-14 px-8 text-lg border-white/20 bg-white/5 backdrop-blur-sm text-white hover:bg-white hover:text-brand-midnight rounded-full transition-all hover:scale-[1.02]">
                                <Link href="/portfolio">View Our Work</Link>
                            </Button>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            className="flex items-center justify-center lg:justify-start gap-6 text-sm font-medium text-indigo-200"
                        >
                            <span className="flex items-center gap-2">
                                <CheckCircle2 className="w-4 h-4 text-brand-coral" />
                                Trusted by growing brands
                            </span>
                            <span className="flex items-center gap-2">
                                <CheckCircle2 className="w-4 h-4 text-brand-coral" />
                                Local businesses
                            </span>
                        </motion.div>
                    </div>

                    {/* Right Column: Visual (Desktop) */}
                    <div className="relative hidden lg:block h-full w-full">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8, x: 50 }}
                            animate={{ opacity: 1, scale: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="relative z-20"
                        >
                            <Image
                                src="/hero-illustration.png"
                                alt="Digital Growth Strategy Illustration"
                                width={800}
                                height={800}
                                className="w-full h-auto drop-shadow-2xl hover:scale-[1.02] transition-transform duration-500 rounded-3xl"
                                priority
                            />
                        </motion.div>

                        {/* Optional subtle glow behind the image */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-brand-indigo/20 blur-3xl -z-10 rounded-full"></div>
                    </div>
                </div>
            </div>

            {/* Wave Divider */}
            <div className="absolute -bottom-[1px] left-0 w-full overflow-hidden leading-[0] z-20">
                <motion.div
                    animate={{ x: [-10, 10, -10] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                    className="relative w-[110%] -left-[5%]"
                >
                    <svg className="relative block w-full h-[60px] md:h-[100px] rotate-180" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                        <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-white"></path>
                    </svg>
                </motion.div>
            </div>
        </section>
    )
}
