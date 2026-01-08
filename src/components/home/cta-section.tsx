'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'

export function CTASection() {
    return (
        <section className="py-24 bg-gradient-to-br from-brand-indigo to-brand-soft-blue relative overflow-hidden">
            {/* Abstract Background Shapes */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-black/10 rounded-full blur-3xl"></div>

            <div className="container mx-auto px-4 relative z-10 text-center max-w-6xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-4xl mx-auto"
                >
                    <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
                        Ready to Scale Your Business <br className="hidden md:block" /> with a Proven Digital Strategy?
                    </h2>
                    <p className="text-indigo-100 text-xl mb-10 max-w-2xl mx-auto">
                        Tell us your goals — we’ll build the perfect roadmap for growth, from high-converting websites to profitable ad campaigns.
                    </p>

                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-block"
                    >
                        <Button asChild size="lg" className="h-16 px-12 text-lg bg-white text-brand-indigo hover:bg-slate-50 hover:shadow-2xl font-bold rounded-full border-4 border-transparent hover:border-indigo-100 bg-clip-padding">
                            <Link href="/contact">Book a Free Consultation</Link>
                        </Button>
                    </motion.div>

                    <p className="mt-6 text-indigo-200 text-sm font-medium opacity-80">
                        No pressure. Clear pricing. Quick response.
                    </p>
                </motion.div>
            </div>
        </section>
    )
}
