import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, CheckCircle2, Zap, Layout, Rocket, MessageSquare, Star } from 'lucide-react'
import { getPublicPortfolios } from './portfolio/actions'
import { Card, CardContent } from '@/components/ui/card'
import { TestimonialSlider } from '@/components/public/testimonial-slider'

export default async function HomePage() {
    const allPortfolios = await getPublicPortfolios()
    const recentPortfolios = allPortfolios.slice(0, 4)

    return (
        <>
            {/* Hero Section - Full Width Background */}
            <section className="relative py-24 lg:py-32 overflow-hidden bg-brand-gray border-b border-slate-200">
                <div className="absolute inset-0 bg-white/50 pattern-grid-lg opacity-10"></div>
                <div className="container relative mx-auto px-4 text-center max-w-5xl">
                    <span className="inline-block py-1.5 px-4 rounded-full bg-indigo-50 text-brand-indigo text-xs font-bold uppercase tracking-widest mb-8 border border-indigo-100">
                        Premium Web Design Studio
                    </span>
                    <h1 className="text-5xl md:text-7xl font-extrabold text-brand-midnight tracking-tight mb-8 leading-tight">
                        Design-Led Websites <br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-indigo to-brand-soft-blue">Engineered for Conversion</span>
                    </h1>
                    <p className="text-xl text-slate-600 mb-12 max-w-2xl mx-auto leading-relaxed">
                        SR Digital Solutions creates refined digital experiences that elevate your brand and turn attention into action.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button asChild size="lg" className="h-14 px-10 text-lg bg-brand-coral hover:bg-orange-600 text-white shadow-xl shadow-orange-500/20 rounded-full">
                            <Link href="/services">View Website Packages</Link>
                        </Button>
                        <Button asChild size="lg" variant="outline" className="h-14 px-10 text-lg border-slate-300 text-brand-midnight hover:bg-white hover:text-brand-indigo rounded-full">
                            <Link href="/portfolio">Explore Portfolio</Link>
                        </Button>
                    </div>
                </div>
            </section>

            {/* Why Choose Us - Boxed Container */}
            <section className="py-24 container mx-auto px-4">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-brand-midnight mb-6">Why Partner With Us?</h2>
                    <p className="text-lg text-slate-600">We combine thoughtful design with conversion architecture to help your brand stand out and scale.</p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, i) => (
                        <div key={i} className="p-8 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-300 group text-center">
                            <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center text-brand-indigo mb-6 mx-auto group-hover:scale-110 transition-transform">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-bold text-brand-midnight mb-3">{feature.title}</h3>
                            <p className="text-slate-600 leading-relaxed text-sm">{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Portfolio Strip - Full Width BG but Boxed Content */}
            <section className="py-24 bg-slate-50">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row justify-center items-end mb-12 text-center">
                        <div className="max-w-2xl">
                            <h2 className="text-3xl md:text-4xl font-bold text-brand-midnight mb-4">Selected Works</h2>
                            <p className="text-slate-600">A glimpse into our recent digital transformations.</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                        {recentPortfolios.map((item: any) => (
                            <div key={item.id} className="group rounded-xl overflow-hidden bg-white shadow-sm border border-slate-100 hover:shadow-lg transition-all">
                                <div className="h-48 bg-slate-200 relative overflow-hidden">
                                    {item.image_url && (
                                        // eslint-disable-next-line @next/next/no-img-element
                                        <img
                                            src={item.image_url}
                                            alt={item.title}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                    )}
                                </div>
                                <div className="p-5">
                                    <div className="text-xs font-bold text-brand-indigo uppercase tracking-wider mb-2">{item.category}</div>
                                    <h3 className="font-bold text-brand-midnight text-lg truncate">{item.title}</h3>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="text-center">
                        <Button asChild variant="outline" size="lg" className="rounded-full px-8 border-brand-indigo text-brand-indigo hover:bg-brand-indigo hover:text-white">
                            <Link href="/portfolio">View All Projects</Link>
                        </Button>
                    </div>
                </div>
            </section>

            {/* Service Highlights - Boxed */}
            <section className="py-24 container mx-auto px-4">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-brand-midnight mb-6">Our Core Services</h2>
                    <p className="text-lg text-slate-600">Digital solutions designed to accelerate your business growth.</p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {services.map((service, i) => (
                        <div key={i} className="bg-brand-midnight text-white rounded-2xl p-10 hover:-translate-y-2 transition-transform duration-300 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                                <Layout className="w-24 h-24" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                            <p className="text-indigo-200 text-sm font-semibold mb-6 uppercase tracking-wider">{service.role}</p>
                            <p className="text-slate-300 leading-relaxed mb-8">{service.desc}</p>
                            <Link href="/services" className="inline-flex items-center text-white font-semibold hover:text-brand-coral transition-colors">
                                View details <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </div>
                    ))}
                </div>
            </section>

            {/* Testimonials - Slider Style (Scroll Snap) */}
            <section className="py-24 bg-brand-gray overflow-hidden">
                <div className="container mx-auto px-4">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-brand-midnight mb-6">Client Testimonials</h2>
                        <p className="text-lg text-slate-600">What our partners say about working with us.</p>
                    </div>

                    <TestimonialSlider />
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 bg-brand-indigo relative overflow-hidden">
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-black/10 rounded-full blur-3xl"></div>

                <div className="container mx-auto px-4 text-center relative z-10">
                    <h2 className="text-4xl md:text-6xl font-bold text-white mb-8">Ready to Scale?</h2>
                    <p className="text-indigo-100 text-xl max-w-2xl mx-auto mb-12">
                        Let’s build a website that works as hard as you do.
                    </p>
                    <Button asChild size="lg" className="h-16 px-12 text-lg bg-white text-brand-indigo hover:bg-slate-100 hover:shadow-2xl font-bold rounded-full transition-all hover:scale-105">
                        <Link href="/contact">Book Free Consultation</Link>
                    </Button>
                </div>
            </section >
        </>
    )
}

const features = [
    {
        title: "Elevated Creative Direction",
        desc: "We craft visually refined layouts that communicate clarity, credibility and modern brand presence.",
        icon: <Layout className="h-6 w-6" />
    },
    {
        title: "Engineered for Conversion",
        desc: "Every section, interaction and CTA is strategically structured to guide users toward meaningful action.",
        icon: <Zap className="h-6 w-6" />
    },
    {
        title: "Fast, Focused Delivery",
        desc: "Lean processes and intentional design allow us to move quickly without compromising quality.",
        icon: <Rocket className="h-6 w-6" />
    },
    {
        title: "Seamless Integrations",
        desc: "WhatsApp, payment gateway, analytics, tracking and WooCommerce — implemented with precision.",
        icon: <CheckCircle2 className="h-6 w-6" />
    },
    {
        title: "SEO-Ready Foundations",
        desc: "We structure your website with clean markup, fast performance and Google-friendly hierarchies.",
        icon: <Layout className="h-6 w-6" />
    },
    {
        title: "Unlimited Revisions",
        desc: "We refine until your website feels right — and support you long after it goes live.",
        icon: <CheckCircle2 className="h-6 w-6" />
    }
]

const services = [
    {
        title: "Landing Page",
        role: "Conversion-Focused",
        desc: "Crafted for creators, online sellers and digital brands needing a high-impact, mobile-first funnel page."
    },
    {
        title: "Corporate Website",
        role: "Brand & Authority",
        desc: "A polished and credible online presence for SMEs, agencies and service-based businesses."
    },
    {
        title: "E-Commerce Website",
        role: "Complete Storefront",
        desc: "A full WooCommerce build with seamless integrations, intuitive product flow and conversion-ready architecture."
    }
]



