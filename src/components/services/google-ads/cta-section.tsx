'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'

export function AdsCTA() {
    return (
        <section className="py-16 bg-gradient-to-br from-blue-600 to-indigo-700 relative overflow-hidden text-center">
            {/* Background Effects */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-black/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

            <div className="container mx-auto px-4 max-w-4xl relative z-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6 leading-tight">
                        Ready to Attract Customers <br /> Who Are Already Searching?
                    </h2>
                    <p className="text-indigo-100 text-xl mb-10 max-w-2xl mx-auto">
                        Let’s review your business goals and see if Google Ads is the right growth channel for you.
                    </p>

                    <Button asChild size="lg" className="h-16 px-12 text-lg bg-white text-blue-600 hover:bg-slate-50 font-bold rounded-full shadow-xl transition-all hover:scale-[1.02]">
                        <Link href="/contact">Book Free Google Ads Consultation</Link>
                    </Button>

                    <p className="mt-6 text-indigo-200 text-sm font-medium opacity-80">
                        Clear strategy. Transparent pricing. No long-term lock-in.
                    </p>
                </motion.div>
            </div>
        </section>
    )
}
