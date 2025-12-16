import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowRight, Layout, PenTool, Code2, SearchCheck, Rocket, HeartHandshake } from 'lucide-react'

export default function ProcessPage() {
    return (
        <div className="bg-white min-h-screen">
            {/* Hero */}
            <section className="bg-brand-midnight text-white py-20">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">A Process Designed for <span className="text-brand-indigo">Precision</span></h1>
                    <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                        Structured, transparent and built to deliver exceptional outcomes.
                    </p>
                </div>
            </section>

            {/* Steps */}
            <section className="py-20 container mx-auto px-4">
                <div className="max-w-4xl mx-auto space-y-8 relative">
                    {/* Vertical Line */}
                    <div className="absolute left-8 md:left-12 top-0 bottom-0 w-0.5 bg-gradient-to-b from-brand-indigo/20 via-brand-indigo/10 to-transparent"></div>

                    <ProcessItem
                        num="01"
                        title="Discovery"
                        desc="Understanding your goals, audience and brand direction. We dive deep into what makes your business unique."
                        icon={<SearchCheck className="h-6 w-6" />}
                    />
                    <ProcessItem
                        num="02"
                        title="Architecture & Wireframe"
                        desc="We establish the structure, hierarchy and user flow before design begins. No guesswork, just strategy."
                        icon={<Layout className="h-6 w-6" />}
                    />
                    <ProcessItem
                        num="03"
                        title="Design & Build"
                        desc="Thoughtful aesthetics meet conversion-focused execution. We bring the visual identity to life."
                        icon={<PenTool className="h-6 w-6" />}
                    />
                    <ProcessItem
                        num="04"
                        title="Review & Refinement"
                        desc="Unlimited revisions until the final experience feels complete. We don't stop until you're thrilled."
                        icon={<Code2 className="h-6 w-6" />}
                    />
                    <ProcessItem
                        num="05"
                        title="Launch"
                        desc="Performance, responsiveness, integrations and technical checks. We ensure a flawless go-live."
                        icon={<Rocket className="h-6 w-6" />}
                    />
                    <ProcessItem
                        num="06"
                        title="Ongoing Partnership"
                        desc="Lifetime support for technical issues and core updates. We remain your digital partner."
                        icon={<HeartHandshake className="h-6 w-6" />}
                    />

                </div>

                <div className="mt-20 text-center">
                    <Link href="/contact">
                        <Button size="lg" className="h-14 px-10 text-lg bg-brand-coral hover:bg-orange-600 text-white font-semibold shadow-xl shadow-orange-500/20">
                            Start Your Project
                        </Button>
                    </Link>
                </div>
            </section>
        </div>
    )
}

function ProcessItem({ num, title, desc, icon }: { num: string, title: string, desc: string, icon: any }) {
    return (
        <div className="relative flex items-start gap-6 md:gap-10 group">

            {/* Icon Circle */}
            <div className="relative z-10 flex flex-col items-center">
                <div className="flex items-center justify-center w-16 h-16 md:w-24 md:h-24 rounded-full border-4 border-white bg-slate-50 group-hover:bg-brand-indigo group-hover:text-white group-hover:border-indigo-100 text-slate-500 shadow-md transition-all duration-300">
                    {icon}
                </div>
            </div>

            {/* Content Card */}
            <div className="flex-1 pt-2 md:pt-4">
                <div className="p-6 md:p-8 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:translate-x-2 hover:border-brand-indigo/30 transition-all duration-300 relative overflow-hidden">
                    <span className="absolute top-0 right-0 p-4 text-6xl font-black text-slate-100/50 select-none group-hover:text-indigo-50/80 transition-colors">
                        {num}
                    </span>
                    <h3 className="text-xl md:text-2xl font-bold text-brand-midnight mb-3 relative z-10">{title}</h3>
                    <p className="text-slate-600 text-base leading-relaxed relative z-10 max-w-2xl">{desc}</p>
                </div>
            </div>
        </div>
    )
}
