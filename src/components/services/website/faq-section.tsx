'use client'

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
    {
        q: "How long does it take?",
        a: "Landing pages typically take 5–7 working days. Multi-page and eCommerce websites depend on the project scope, usually 2-4 weeks."
    },
    {
        q: "Do you provide content?",
        a: "Yes, we structure and guide the copywriting to ensure clarity and conversion. We don't just ask you to 'fill in the blanks'—we help you sell your story."
    },
    {
        q: "Can I upgrade later?",
        a: "Absolutely. All our websites are built on scalable frameworks, so you can start with a Landing Page and expand to a full Multi-Page site as you grow."
    },
    {
        q: "Is SEO included?",
        a: "All packages include basic technical SEO setup (meta tags, fast loading speeds, sitemaps). For advanced ongoing SEO campaigns, we offer separate monthly services."
    }
]

export function FAQSection() {
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
