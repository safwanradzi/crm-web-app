'use client'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function FAQSection() {
    return (
        <section className="py-12 bg-slate-50">
            <div className="container mx-auto px-4 max-w-3xl">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-extrabold text-brand-midnight mb-4">Common Questions</h2>
                    <p className="text-slate-600">Clarifying common doubts before you start.</p>
                </div>

                <Accordion type="single" collapsible className="w-full space-y-4">

                    <AccordionItem value="faq-1" className="bg-white px-6 rounded-xl border border-slate-200 shadow-sm data-[state=open]:border-brand-indigo/30 transition-all">
                        <AccordionTrigger className="text-lg font-semibold text-brand-midnight hover:text-brand-indigo py-6">
                            Can I upgrade or downgrade later?
                        </AccordionTrigger>
                        <AccordionContent className="text-slate-600 leading-relaxed pb-6 text-base">
                            Yes. All bundles are flexible and scalable. We understand business needs change, so we make it easy to adjust your package as you grow.
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="faq-2" className="bg-white px-6 rounded-xl border border-slate-200 shadow-sm data-[state=open]:border-brand-indigo/30 transition-all">
                        <AccordionTrigger className="text-lg font-semibold text-brand-midnight hover:text-brand-indigo py-6">
                            Do I need both Google & Facebook Ads?
                        </AccordionTrigger>
                        <AccordionContent className="text-slate-600 leading-relaxed pb-6 text-base">
                            Not always. We recommend channels based on your business model. Search ads (Google) are great for intent-based services, while social ads (Meta) work wonders for brand awareness and ecommerce. We'll help you decide.
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="faq-3" className="bg-white px-6 rounded-xl border border-slate-200 shadow-sm data-[state=open]:border-brand-indigo/30 transition-all">
                        <AccordionTrigger className="text-lg font-semibold text-brand-midnight hover:text-brand-indigo py-6">
                            Is there a long-term contract?
                        </AccordionTrigger>
                        <AccordionContent className="text-slate-600 leading-relaxed pb-6 text-base">
                            No long-term lock-in. Performance comes first. We operate on a month-to-month basis because we believe we should earn your business every month with results.
                        </AccordionContent>
                    </AccordionItem>

                </Accordion>
            </div>
        </section>
    )
}
