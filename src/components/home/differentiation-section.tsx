'use client'

import { motion } from 'framer-motion'
import { Check, BarChart3, Target, Zap, TrendingUp, Magnet, AlertCircle, Lightbulb, ShieldCheck, MousePointerClick, ArrowDown, ArrowUpRight } from 'lucide-react'
import { useTranslations } from 'next-intl'

const getDifferentiators = (t: any) => [
    { text: t('b1'), icon: <Target className="w-5 h-5 text-brand-indigo" /> },
    { text: t('b2'), icon: <Zap className="w-5 h-5 text-brand-indigo" /> },
    { text: t('b3'), icon: <Check className="w-5 h-5 text-brand-indigo" /> },
    { text: t('b4'), icon: <BarChart3 className="w-5 h-5 text-brand-indigo" /> },
    { text: t('b5'), icon: <TrendingUp className="w-5 h-5 text-brand-indigo" /> },
]

export function DifferentiationSection() {
    const t = useTranslations('Home.differentiation')
    const differentiators = getDifferentiators(t)

    const frameworkSteps = [
        { name: t('fwS1'), desc: t('fwS1Desc'), icon: <Magnet className="w-4 h-4 text-indigo-300" /> },
        { name: t('fwS2'), desc: t('fwS2Desc'), icon: <AlertCircle className="w-4 h-4 text-indigo-300" /> },
        { name: t('fwS3'), desc: t('fwS3Desc'), icon: <Lightbulb className="w-4 h-4 text-white" /> },
        { name: t('fwS4'), desc: t('fwS4Desc'), icon: <ShieldCheck className="w-4 h-4 text-indigo-300" /> },
        { name: t('fwS5'), desc: t('fwS5Desc'), icon: <MousePointerClick className="w-4 h-4 text-brand-coral" />, highlight: true },
    ]
    return (
        <section className="pt-8 pb-24 md:pt-16 md:pb-24 bg-slate-50 relative overflow-hidden">
            <div className="container mx-auto px-4 relative z-10 max-w-6xl">
                <div className="grid lg:grid-cols-2 gap-16 items-center">

                    {/* Left: Copy */}
                    <div>
                        <motion.h2
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="text-3xl md:text-5xl font-extrabold text-brand-midnight mb-8 leading-tight"
                        >
                            {t('headline')} <br />
                            <span className="text-brand-indigo">{t('headlineHighlight')}</span>
                        </motion.h2>

                        <div className="space-y-6">
                            {differentiators.map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="flex items-start gap-4 p-4 rounded-xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
                                >
                                    <div className="mt-1 p-2 bg-indigo-50 rounded-lg shrink-0">
                                        {item.icon}
                                    </div>
                                    <span className="text-lg text-slate-700 font-medium">{item.text}</span>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Right: Results Framework Visual */}
                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-tr from-indigo-100 to-transparent rounded-full blur-3xl opacity-50"></div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="relative bg-gradient-to-br from-brand-midnight to-brand-indigo rounded-2xl shadow-2xl border border-white/10 p-8 pb-12"
                        >
                            <div className="flex items-center justify-between mb-8 border-b border-white/10 pb-4">
                                <h3 className="font-bold text-white">{t('fwHeader')}</h3>
                                <div className="text-xs font-medium text-indigo-200">{t('fwSub')}</div>
                            </div>

                            {/* Vertical Flow */}
                            <div className="relative flex flex-col items-center pb-2">
                                {/* Thin line connecting them all down the middle */}
                                <div className="absolute top-4 bottom-12 w-px bg-white/10 z-0 left-1/2 -translate-x-1/2"></div>
                                
                                {frameworkSteps.map((step, idx) => (
                                    <div key={idx} className="flex flex-col items-center mb-4 last:mb-0 w-full group z-10">
                                        <motion.div 
                                            initial={{ opacity: 0, y: 10 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: 0.1 * idx }}
                                            className={`flex items-center gap-4 w-full max-w-xs mx-auto p-3 rounded-xl border transition-colors shadow-sm backdrop-blur-sm ${step.highlight ? 'bg-brand-coral/10 border-brand-coral/30 shadow-orange-900/50' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}
                                        >
                                            <div className={`p-2 rounded-lg shrink-0 ${step.highlight ? 'bg-brand-coral/20' : 'bg-white/10'}`}>
                                                {step.icon}
                                            </div>
                                            <div>
                                                <div className={`text-sm font-bold ${step.highlight ? 'text-brand-coral' : 'text-white'}`}>{step.name}</div>
                                                <div className="text-xs text-indigo-200 font-medium">{step.desc}</div>
                                            </div>
                                        </motion.div>

                                        {/* Connecting downward spacing (actual arrow overlap handles visually) */}
                                        {idx < frameworkSteps.length - 1 && (
                                            <div className="h-4 flex items-center justify-center text-indigo-400 z-10">
                                                <ArrowDown className="w-3 h-3 bg-brand-midnight/50 rounded-full" />
                                            </div>
                                        )}
                                    </div>
                                ))}

                                {/* Final Output Section */}
                                <motion.div 
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.6 }}
                                    className="mt-6 flex flex-col items-center z-10"
                                >
                                    <div className="h-4 mb-2 flex items-center justify-center text-brand-coral">
                                        <ArrowDown className="w-4 h-4 bg-brand-indigo/50 rounded-full" />
                                    </div>
                                    <div className="px-6 py-2 bg-brand-coral text-white font-bold rounded-full text-sm shadow-lg shadow-orange-200/50 flex items-center gap-2">
                                        {t('fwOutput')}
                                        <ArrowUpRight className="w-4 h-4 text-orange-200" />
                                    </div>
                                </motion.div>
                            </div>

                            {/* Floating Badge */}
                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute -bottom-12 -right-2 md:-bottom-8 md:-right-8 z-20 bg-white text-brand-midnight p-4 rounded-xl shadow-xl border border-slate-100"
                            >
                                <div className="text-xs opacity-70 mb-1">{t('badge1')}</div>
                                <div className="font-bold flex items-center gap-2">
                                    <Target className="w-4 h-4 text-brand-coral" />
                                    {t('badge2')}
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    )
}
