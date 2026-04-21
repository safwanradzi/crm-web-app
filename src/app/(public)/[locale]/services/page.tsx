import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Check, ArrowRight } from 'lucide-react'

export default function ServicesPage() {
    return (
        <div className="bg-slate-50 min-h-screen">
            {/* Hero Section */}
            <section className="bg-brand-midnight text-white py-20">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">Website Packages Built for <span className="text-brand-indigo">Growth</span></h1>
                    <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                        Transparent pricing, complete features and a design standard that elevates your brand.
                    </p>
                </div>
            </section>

            {/* Pricing Cards */}
            <section className="py-20 container mx-auto px-4">
                <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">

                    {/* Package 1: Landing Page */}
                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100 flex flex-col hover:border-brand-indigo/30 transition-all duration-300">
                        <div className="p-8 border-b border-slate-100">
                            <h3 className="text-xl font-bold text-brand-midnight mb-2">Landing Page</h3>
                            <div className="flex items-baseline mb-4">
                                <span className="text-sm text-slate-500 font-medium">RM</span>
                                <span className="text-4xl font-extrabold text-brand-indigo mx-1">499</span>
                            </div>
                            <p className="text-slate-600 text-sm leading-relaxed">
                                A streamlined, conversion-optimised one-page experience for digital products, services and funnel-driven campaigns.
                            </p>
                        </div>
                        <div className="p-8 flex-grow bg-slate-50/50">
                            <ul className="space-y-4">
                                <FeatureItem text="Custom Design (1 Page)" />
                                <FeatureItem text="1-Year Domain & Hosting" />
                                <FeatureItem text="Strategic Copywriting" />
                                <FeatureItem text="Mobile-First Layout" />
                                <FeatureItem text="WhatsApp & Email Integration" />
                                <FeatureItem text="Basic SEO" />
                                <FeatureItem text="Unlimited Revisions" />
                                <FeatureItem text="3–7 Day Delivery" />
                            </ul>
                        </div>
                        <div className="p-8 pt-0 bg-slate-50/50">
                            <Button asChild className="w-full bg-brand-midnight hover:bg-slate-800 h-12 text-base">
                                <Link href="/contact?p=landing">Get Started</Link>
                            </Button>
                        </div>
                    </div>

                    {/* Package 2: Corporate (Featured) */}
                    <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border-2 border-brand-indigo flex flex-col transform md:-translate-y-4 relative">
                        <div className="absolute top-0 right-0 bg-brand-indigo text-white text-xs font-bold px-3 py-1 rounded-bl-lg uppercase tracking-wider">
                            Most Popular
                        </div>
                        <div className="p-8 border-b border-slate-100 bg-indigo-50/30">
                            <h3 className="text-xl font-bold text-brand-midnight mb-2">Corporate Website</h3>
                            <div className="flex items-baseline mb-4">
                                <span className="text-sm text-slate-500 font-medium">RM</span>
                                <span className="text-4xl font-extrabold text-brand-indigo mx-1">1,499</span>
                            </div>
                            <p className="text-slate-600 text-sm leading-relaxed">
                                A refined, credible online presence for SMEs, agencies and service brands looking to scale.
                            </p>
                        </div>
                        <div className="p-8 flex-grow">
                            <ul className="space-y-4">
                                <FeatureItem text="Up to 5 Pages" bold />
                                <FeatureItem text="Brand-Aligned System" />
                                <FeatureItem text="1-Year Domain & Hosting" />
                                <FeatureItem text="Conversion Copywriting" />
                                <FeatureItem text="WhatsApp & Forms" />
                                <FeatureItem text="Optional Payment Gateway" />
                                <FeatureItem text="SEO-Friendly Structure" />
                                <FeatureItem text="Unlimited Revisions" />
                                <FeatureItem text="7–10 Day Delivery" />
                            </ul>
                        </div>
                        <div className="p-8 pt-0">
                            <Button asChild className="w-full bg-brand-indigo hover:bg-indigo-700 h-12 text-base shadow-lg shadow-indigo-200">
                                <Link href="/contact?p=corporate">Get Started</Link>
                            </Button>
                        </div>
                    </div>

                    {/* Package 3: E-Commerce */}
                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100 flex flex-col hover:border-brand-indigo/30 transition-all duration-300">
                        <div className="p-8 border-b border-slate-100">
                            <h3 className="text-xl font-bold text-brand-midnight mb-2">E-Commerce</h3>
                            <div className="flex items-baseline mb-4">
                                <span className="text-sm text-slate-500 font-medium">RM</span>
                                <span className="text-4xl font-extrabold text-brand-indigo mx-1">1,899</span>
                            </div>
                            <p className="text-slate-600 text-sm leading-relaxed">
                                A complete online store built for clarity, scalability and sales performance.
                            </p>
                        </div>
                        <div className="p-8 flex-grow bg-slate-50/50">
                            <ul className="space-y-4">
                                <FeatureItem text="Up to 10 Pages" />
                                <FeatureItem text="Full WooCommerce Setup" bold />
                                <FeatureItem text="Unlimited Product Uploads" />
                                <FeatureItem text="Payment Gateway Integration" bold />
                                <FeatureItem text="WhatsApp Automation Flow" />
                                <FeatureItem text="SEO Fundamentals" />
                                <FeatureItem text="Unlimited Revisions" />
                                <FeatureItem text="7–15 Day Delivery" />
                            </ul>
                        </div>
                        <div className="p-8 pt-0 bg-slate-50/50">
                            <Button asChild className="w-full bg-brand-midnight hover:bg-slate-800 h-12 text-base">
                                <Link href="/contact?p=ecommerce">Get Started</Link>
                            </Button>
                        </div>
                    </div>

                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4 max-w-3xl">
                    <h2 className="text-3xl font-bold text-brand-midnight mb-12 text-center">Frequently Asked Questions</h2>
                    <div className="space-y-6">
                        <FaqItem
                            q="How long does it take to build?"
                            a="For Landing Pages, typically 3-7 days. For Corporate sites, 7-10 days. E-commerce projects usually take 2 weeks depending on complexity."
                        />
                        <FaqItem
                            q="Do I own the website?"
                            a="Yes, 100%. Once payment is complete, you have full ownership of the domain, hosting accounts, and all design files."
                        />
                        <FaqItem
                            q="What do I need to prepare?"
                            a="We just need your logo, general text content (we can help refine it), and images. If you don't have images, we can use premium stock photography."
                        />
                        <FaqItem
                            q="Do you provide support after launch?"
                            a="Absolutely. All packages come with Lifetime Support for technical issues. We are your long-term digital partner."
                        />
                    </div>
                </div>
            </section>
        </div>
    )
}

function FeatureItem({ text, bold = false }: { text: string, bold?: boolean }) {
    return (
        <li className="flex items-start gap-3 text-sm text-slate-700">
            <Check className="h-5 w-5 text-green-500 shrink-0" />
            <span className={bold ? "font-bold text-brand-midnight" : ""}>{text}</span>
        </li>
    )
}

function FaqItem({ q, a }: { q: string, a: string }) {
    return (
        <div className="border border-slate-100 rounded-lg p-6 hover:bg-slate-50 transition-colors">
            <h4 className="font-bold text-brand-midnight mb-2">{q}</h4>
            <p className="text-slate-600 text-sm leading-relaxed">{a}</p>
        </div>
    )
}
