'use client'

import { motion } from 'framer-motion'
import { CheckCircle } from 'lucide-react'

const reasons = [
    { title: "Strategy-first, not template guessing", desc: "We plan before we build." },
    { title: "Built for ads & traffic conversion", desc: "Ready for Facebook & Google Ads." },
    { title: "Clear messaging and CTA placement", desc: "Guide visitors to buy." },
    { title: "Fast-loading & mobile-first", desc: "Rank better on Google." },
    { title: "Scalable structure", desc: "Grow as your business grows." }
]

export function Differentiators() {
    return (
        <section className="py-12 bg-brand-midnight text-white relative overflow-hidden">
            {/* Background Art */}
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5"></div>

            <div className="container mx-auto px-4 max-w-5xl relative z-10">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Why Clients Choose Us</h2>
                    <p className="text-indigo-200">We don’t just deliver code. We deliver results.</p>
                </div>

                <div className="grid md:grid-cols-2 gap-x-12 gap-y-8">
                    {reasons.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="flex items-start gap-4"
                        >
                            <div className="w-10 h-10 rounded-full bg-brand-indigo/20 flex items-center justify-center shrink-0 text-brand-coral">
                                <CheckCircle className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                                <p className="text-indigo-200/70 text-sm">{item.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
