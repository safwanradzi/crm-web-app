'use client'

import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function CTASection() {
    return (
        <section className="py-16 bg-gradient-to-br from-brand-midnight to-brand-indigo text-center relative overflow-hidden">
            {/* Abstract Backgrounds */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/5 rounded-full blur-3xl opacity-20 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-coral/10 rounded-full blur-3xl opacity-20 pointer-events-none"></div>

            <div className="container mx-auto px-4 relative z-10 max-w-4xl">
                <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6 leading-tight">
                    Ready to Grow Faster With a Complete Digital Setup?
                </h2>
                <p className="text-xl text-indigo-100 mb-10 font-light max-w-2xl mx-auto">
                    Let’s recommend the right bundle based on your business goals.
                </p>

                <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-8">
                    <Button asChild size="lg" className="h-16 px-10 text-lg bg-white text-brand-indigo hover:bg-indigo-50 shadow-xl rounded-full transition-transform hover:scale-[1.02]">
                        <Link href="/contact">Book Free Growth Consultation</Link>
                    </Button>
                </div>

                <p className="text-slate-400 text-sm tracking-wide uppercase font-medium">
                    Clear strategy. Transparent pricing. One growth partner.
                </p>
            </div>
        </section>
    )
}
