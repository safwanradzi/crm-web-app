import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowRight, Layout, PenTool, Code2, SearchCheck, Rocket, HeartHandshake } from 'lucide-react'
import { ProcessHero } from '@/components/process/hero-section'
import { getTranslations } from 'next-intl/server'

export default async function ProcessPage() {
    const ts = await getTranslations('Process.steps')
    const tc = await getTranslations('Process.cta')

    return (
        <div className="bg-white min-h-screen">
            {/* Hero */}
            {/* Hero */}
            <ProcessHero />

            {/* Steps */}
            <section className="py-20 container mx-auto px-4">
                <div className="max-w-4xl mx-auto space-y-8 relative">
                    {/* Vertical Line */}
                    <div className="absolute left-8 md:left-12 top-0 bottom-0 w-0.5 bg-gradient-to-b from-brand-indigo/20 via-brand-indigo/10 to-transparent"></div>

                    <ProcessItem
                        num="01"
                        title={ts('t1')}
                        desc={ts('d1')}
                        icon={<SearchCheck className="h-6 w-6" />}
                    />
                    <ProcessItem
                        num="02"
                        title={ts('t2')}
                        desc={ts('d2')}
                        icon={<Layout className="h-6 w-6" />}
                    />
                    <ProcessItem
                        num="03"
                        title={ts('t3')}
                        desc={ts('d3')}
                        icon={<PenTool className="h-6 w-6" />}
                    />
                    <ProcessItem
                        num="04"
                        title={ts('t4')}
                        desc={ts('d4')}
                        icon={<Code2 className="h-6 w-6" />}
                    />
                    <ProcessItem
                        num="05"
                        title={ts('t5')}
                        desc={ts('d5')}
                        icon={<Rocket className="h-6 w-6" />}
                    />
                    <ProcessItem
                        num="06"
                        title={ts('t6')}
                        desc={ts('d6')}
                        icon={<HeartHandshake className="h-6 w-6" />}
                    />

                </div>

                <div className="mt-20 text-center">
                    <Link href="/contact">
                        <Button size="lg" className="h-14 px-10 text-lg bg-brand-coral hover:bg-orange-600 text-white font-semibold shadow-xl shadow-orange-500/20">
                            {tc('btn')}
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
