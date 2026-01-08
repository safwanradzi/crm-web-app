'use client'

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
    {
        q: "How soon can I see results?",
        a: "Initial data can be seen within the first 7–14 days. Performance improves with ongoing optimization."
    },
    {
        q: "Do you guarantee results?",
        a: "We do not promise unrealistic numbers, but we focus on continuous improvement and transparency."
    },
    {
        q: "Do you manage ad budget?",
        a: "Yes, we advise and optimize based on your allocated ad spend. Note that ad spend is paid directly to Google, separate from our management fee."
    }
]

export function AdsFAQSection() {
    return (
        <section className="py-12 bg-slate-50">
            <div className="container mx-auto px-4 max-w-3xl">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-extrabold text-brand-midnight mb-4">Frequently Asked Questions</h2>
                    <p className="text-slate-600">Addressing common concerns before we start.</p>
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
