'use client'

import { motion } from 'framer-motion'
import { MessagesSquare, PencilRuler, Code2, Rocket } from 'lucide-react'

const steps = [
    {
        num: "01",
        title: "Discovery",
        desc: "We align on your goals, audience, and offer.",
        icon: <MessagesSquare className="w-6 h-6 text-brand-indigo" />
    },
    {
        num: "02",
        title: "Structure & Copy",
        desc: "We map your conversion flow and craft messaging that sells clearly.",
        icon: <PencilRuler className="w-6 h-6 text-brand-indigo" />
    },
    {
        num: "03",
        title: "Build & Optimize",
        desc: "We develop and optimize for speed, mobile, and conversions.",
        icon: <Code2 className="w-6 h-6 text-brand-indigo" />
    },
    {
        num: "04",
        title: "Launch & Improve",
        desc: "We launch, track performance, and refine for better results.",
        icon: <Rocket className="w-6 h-6 text-brand-indigo" />
    }
]

export function ProcessSection() {
    return (
        <section className="py-24 bg-brand-midnight text-white relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5 pattern-grid-lg"></div>

            <div className="container mx-auto px-4 relative z-10 max-w-6xl">
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <span className="text-brand-coral font-bold uppercase tracking-widest text-sm mb-3 block">How It Works</span>
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">A Simple, Proven Process</h2>
                    <p className="text-slate-400 text-lg">We’ve refined our workflow to be efficient, transparent, and focused on your goals.</p>
                </div>

                <div className="grid md:grid-cols-4 gap-8 relative">
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-white/10 -z-10"></div>

                    {steps.map((step, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.2 }}
                            className="relative"
                        >
                            <div className="w-24 h-24 rounded-full bg-brand-midnight border-4 border-brand-indigo/30 flex items-center justify-center mx-auto mb-8 relative z-10 shadow-[0_0_30px_rgba(79,70,229,0.3)]">
                                <div className="absolute inset-0 rounded-full bg-brand-indigo/10 animate-ping"></div>
                                <span className="text-3xl font-black text-white">{step.num}</span>
                            </div>

                            <div className="text-center">
                                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                                <p className="text-slate-400 leading-relaxed">{step.desc}</p>
                            </div>

                            {/* Mobile Connector */}
                            {i < steps.length - 1 && (
                                <div className="md:hidden w-0.5 h-12 bg-white/10 mx-auto my-4"></div>
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
