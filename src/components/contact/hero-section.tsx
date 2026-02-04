'use client'

import { motion } from 'framer-motion'
import { MessageSquare, Send } from 'lucide-react'

export function ContactHero() {
    return (
        <section className="relative pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden bg-gradient-to-br from-brand-midnight via-brand-midnight to-brand-indigo">
            {/* Abstract Background Elements */}
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-indigo/20 rounded-full blur-3xl opacity-30 animate-pulse"></div>
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand-soft-blue/10 rounded-full blur-3xl opacity-20"></div>

            <div className="container relative mx-auto px-4 max-w-6xl z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex items-center justify-center gap-2 mb-6"
                >
                    <span className="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-indigo-300 text-sm font-medium flex items-center gap-2 backdrop-blur-sm">
                        <MessageSquare className="w-4 h-4" />
                        Get in Touch
                    </span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-4xl md:text-5xl lg:text-[4rem] font-black text-white tracking-tight mb-8 leading-[1.15] max-w-4xl mx-auto"
                >
                    Ready to Build Something <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-coral to-orange-400">Exceptional?</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-lg md:text-xl text-indigo-100 mb-10 leading-relaxed max-w-2xl mx-auto font-light"
                >
                    Share your objectives — we’ll recommend the ideal structure and solution. Let's start the conversation.
                </motion.p>

                {/* Optional Decorative Icons */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="flex justify-center gap-8 text-indigo-200/50"
                >
                    <Send className="w-6 h-6 animate-pulse" />
                </motion.div>
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
