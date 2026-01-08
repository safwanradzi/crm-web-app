'use client'

import { motion } from 'framer-motion'
import { CheckCircle } from 'lucide-react'

const services = [
    "Keyword research based on buying intent",
    "Campaign & ad group structure planning",
    "Search ad copywriting",
    "Conversion tracking setup (leads / sales)",
    "Budget & bidding strategy setup",
    "Ongoing optimization & performance tuning",
    "Clear performance reporting"
]

export function AdsWhatWeDo() {
    return (
        <section className="py-12 bg-brand-midnight text-white relative overflow-hidden">
            {/* Background Art */}
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5"></div>

            <div className="container mx-auto px-4 max-w-5xl relative z-10">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-extrabold mb-4">What’s Included</h2>
                    <p className="text-indigo-200">Comprehensive management from setup to scaling.</p>
                </div>

                <div className="grid md:grid-cols-2 gap-x-12 gap-y-6">
                    {services.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="flex items-start gap-4 p-4 bg-white/5 rounded-lg border border-white/5 hover:border-brand-indigo/50 transition-colors"
                        >
                            <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0 text-blue-400">
                                <CheckCircle className="w-5 h-5" />
                            </div>
                            <div className="flex items-center h-8">
                                <h3 className="font-medium text-lg">{item}</h3>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
