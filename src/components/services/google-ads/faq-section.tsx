'use client'

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { useTranslations } from 'next-intl'

const getFaqs = (t: any) => [
    { q: t('q1'), a: t('a1') },
    { q: t('q2'), a: t('a2') },
    { q: t('q3'), a: t('a3') },
    { q: t('q4'), a: t('a4') },
    { q: t('q5'), a: t('a5') },
    { q: t('q6'), a: t('a6') },
    { q: t('q7'), a: t('a7') },
    { q: t('q8'), a: t('a8') },
    { q: t('q9'), a: t('a9') },
    { q: t('q10'), a: t('a10') }
]

export function AdsFAQSection() {
    const t = useTranslations('GoogleAds.faq')
    const faqs = getFaqs(t)
    return (
        <section className="py-12 bg-slate-50">
            <div className="container mx-auto px-4 max-w-3xl">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-extrabold text-brand-midnight mb-4">{t('headline')}</h2>
                    <p className="text-slate-600">{t('subtitle')}</p>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                    <Accordion type="single" collapsible className="w-full">
                        {faqs.map((item, i) => (
                            <AccordionItem key={i} value={`item-${i}`}>
                                <AccordionTrigger className="text-left font-bold text-slate-800">{item.q}</AccordionTrigger>
                                <AccordionContent className="text-slate-600 leading-relaxed">
                                    {item.a}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </div>
        </section>
    )
}
