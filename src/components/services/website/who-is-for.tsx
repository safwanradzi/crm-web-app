'use client'

import { motion } from 'framer-motion'
import { Building2, TrendingUp, Users, Rocket } from 'lucide-react'

const audienceList = [
    {
        icon: <Building2 className="w-8 h-8 text-brand-indigo" />,
        title: "Business Owners",
        description: "without a proper website to represent their brand professionally online."
    },
    {
        icon: <TrendingUp className="w-8 h-8 text-brand-coral" />,
        title: "Brands Running Ads",
        description: "but experiencing low conversion from traffic and paid campaigns."
    },
    {
        icon: <Users className="w-8 h-8 text-blue-500" />,
        title: "Service Providers",
        description: "who need stronger credibility and a consistent flow of quality leads."
    },
    {
        icon: <Rocket className="w-8 h-8 text-purple-500" />,
        title: "Growing Businesses",
        description: "that need a scalable, conversion-ready website to support long-term growth."
    }
]

export function WhoIsFor() {
    return (
        <section className="py-12 bg-slate-50">
            <div className="container mx-auto px-4 max-w-6xl">
                <div className="text-center mb-12">
                    <span className="text-brand-indigo font-bold uppercase tracking-widest text-sm mb-3 block">Target Audience</span>
                    <h2 className="text-3xl font-extrabold text-brand-midnight">This Service Is Perfect For:</h2>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {audienceList.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white p-8 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-all text-center group"
                        >
                            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                                {item.icon}
                            </div>
                            <h3 className="font-bold text-lg text-brand-midnight mb-1">{item.title}</h3>
                            <p className="text-slate-600 text-sm">{item.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
