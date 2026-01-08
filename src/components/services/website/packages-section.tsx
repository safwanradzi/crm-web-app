'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Check } from 'lucide-react'

const packages = [
    {
        name: "Landing Page",
        price: "RM 899",
        description: "Perfect for ads, product launches, and lead generation.",
        features: [
            "1 high-converting landing page",
            "Conversion-focused layout",
            "Professional copywriting flow",
            "Mobile responsive design",
            "WhatsApp CTA integration",
            "Basic on-page SEO setup"
        ],
        cta: "Get This Package",
        popular: false
    },
    {
        name: "Multi-Pages Website",
        price: "RM 1,899",
        description: "Ideal for corporate sites, service providers & personal branding.",
        features: [
            "Up to 5 pages (Home, About, etc.)",
            "Professional UI/UX design",
            "Structured, persuasive copywriting",
            "Mobile & tablet responsive",
            "Contact form + WhatsApp",
            "SEO-ready page structure"
        ],
        cta: "Get This Package",
        popular: true
    },
    {
        name: "eCommerce Website",
        price: "RM 2,399",
        description: "Built for businesses ready to sell online.",
        features: [
            "Product & checkout setup",
            "Payment gateway integration",
            "Shipping & COD setup",
            "Conversion-focused layout",
            "Mobile shopping experience",
            "Basic admin training"
        ],
        cta: "Get This Package",
        popular: false
    }
]

export function PackagesSection() {
    return (
        <section id="packages" className="py-12 bg-slate-50">
            <div className="container mx-auto px-4 max-w-6xl">
                <div className="text-center mb-16">
                    <span className="text-brand-indigo font-bold uppercase tracking-widest text-sm mb-3 block">Pricing & Packages</span>
                    <h2 className="text-3xl md:text-5xl font-extrabold text-brand-midnight">Simple, Transparent Pricing</h2>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {packages.map((pkg, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            whileHover={{ y: -5 }}
                            className={`relative bg-white rounded-2xl p-8 border ${pkg.popular ? 'border-brand-indigo shadow-xl ring-1 ring-brand-indigo/50' : 'border-slate-200 shadow-sm hover:shadow-lg'} flex flex-col`}
                        >
                            {pkg.popular && (
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-brand-indigo text-white px-4 py-1 rounded-full text-sm font-bold tracking-wide">
                                    MOST POPULAR
                                </div>
                            )}

                            <div className="mb-6">
                                <h3 className="text-xl font-bold text-brand-midnight mb-2">{pkg.name}</h3>
                                <div className="text-3xl font-extrabold text-brand-coral mb-4">{pkg.price}</div>
                                <p className="text-sm text-slate-500 leading-relaxed">{pkg.description}</p>
                            </div>

                            <ul className="space-y-4 mb-8 flex-1">
                                {pkg.features.map((feature, idx) => (
                                    <li key={idx} className="flex items-start gap-3 text-sm text-slate-700">
                                        <Check className="w-5 h-5 text-green-500 shrink-0" />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <Button asChild className={`w-full ${pkg.popular ? 'bg-brand-indigo hover:bg-indigo-700 text-white' : 'bg-slate-900 text-white hover:bg-slate-800'}`}>
                                <Link href="/contact?package=website">{pkg.cta}</Link>
                            </Button>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
