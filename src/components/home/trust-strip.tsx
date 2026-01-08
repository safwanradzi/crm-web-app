'use client'

import { motion } from 'framer-motion'
import { Rocket, ShieldCheck, Zap, Smartphone, TrendingUp } from 'lucide-react'

const features = [
    { name: "Conversion-Focused Strategy", icon: <TrendingUp className="w-5 h-5 text-brand-indigo" /> },
    { name: "Transparent Pricing", icon: <ShieldCheck className="w-5 h-5 text-brand-indigo" /> },
    { name: "Fast Turnaround", icon: <Zap className="w-5 h-5 text-brand-indigo" /> },
    { name: "Mobile & Ads Ready", icon: <Smartphone className="w-5 h-5 text-brand-indigo" /> },
    { name: "Performance Mindset", icon: <Rocket className="w-5 h-5 text-brand-indigo" /> },
]

export function TrustStrip() {
    return (
        <section className="py-8 bg-white relative z-20 overflow-hidden mt-12">
            <div className="flex w-full">
                <motion.div
                    initial={{ x: 0 }}
                    animate={{ x: "-50%" }}
                    transition={{
                        duration: 30,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                    className="flex items-center gap-12 md:gap-24 whitespace-nowrap min-w-max px-4"
                >
                    {[...features, ...features].map((feature, i) => (
                        <div
                            key={i}
                            className="flex items-center gap-3 text-slate-700 font-medium text-sm md:text-base group cursor-default"
                        >
                            <span className="p-2 bg-indigo-50 rounded-lg group-hover:scale-110 transition-transform duration-300">
                                {feature.icon}
                            </span>
                            {feature.name}
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}
