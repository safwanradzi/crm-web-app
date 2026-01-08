'use client'

import { motion } from 'framer-motion'

const steps = [
    { number: "01", title: "Discovery", desc: "Understand your business, audience, and goals." },
    { number: "02", title: "Structure & Copy", desc: "Plan layout, content flow, and conversion strategy." },
    { number: "03", title: "Design & Build", desc: "Develop responsive, high-performing pages." },
    { number: "04", title: "Launch & Support", desc: "Go live, get training, and grow." }
]

export function ProcessSection() {
    return (
        <section className="py-12 bg-white">
            <div className="container mx-auto px-4 max-w-6xl">
                <div className="text-center mb-16">
                    <span className="text-brand-indigo font-bold uppercase tracking-widest text-sm mb-3 block">Simple & Clear</span>
                    <h2 className="text-3xl font-extrabold text-brand-midnight">Our Website Development Process</h2>
                </div>

                <div className="grid md:grid-cols-4 gap-8">
                    {steps.map((step, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="relative text-center group"
                        >
                            {i !== steps.length - 1 && (
                                <div className="hidden md:block absolute top-8 left-1/2 w-full h-0.5 bg-slate-100 -z-10"></div>
                            )}

                            <div className="w-16 h-16 bg-white border-4 border-slate-50 text-brand-indigo font-black text-xl flex items-center justify-center rounded-full mx-auto mb-6 shadow-sm group-hover:border-brand-coral group-hover:text-brand-coral transition-colors">
                                {step.number}
                            </div>
                            <h3 className="font-bold text-lg text-brand-midnight mb-2">{step.title}</h3>
                            <p className="text-slate-500 text-xs px-4">{step.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
