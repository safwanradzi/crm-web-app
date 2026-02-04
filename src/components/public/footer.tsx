'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Facebook, Instagram, Linkedin, Twitter, MessageCircle, Mail } from 'lucide-react'

const footerLinks = {
    services: [
        { label: "Website Development", href: "/services/website-development" },
        { label: "Google Ads", href: "/services/google-ads" },
        { label: "Meta Ads", href: "/services/meta-ads" },
        // { label: "Bundles", href: "/services/bundles" }, // Keeping bundles hidden if not primary, or add if requested. User list had 3 main.
    ],
    company: [
        { label: "Home", href: "/" },
        { label: "About Us", href: "/about" },
        { label: "Our Portfolio", href: "/portfolio" },
        { label: "Process", href: "/process" },
        { label: "Contact", href: "/contact" },
    ],
    support: [
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Terms of Service", href: "/terms" },
    ]
}

export function PublicFooter() {
    return (
        <footer className="bg-brand-midnight text-slate-300 border-t border-slate-800">
            <div className="container mx-auto px-4 py-16 max-w-6xl">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

                    {/* Column 1: Brand */}
                    <div>
                        <Link href="/" className="inline-block mb-6">
                            <Image
                                src="/logo.png"
                                alt="SR Digital Logo"
                                width={160}
                                height={40}
                                className="h-10 w-auto brightness-0 invert"
                            />
                        </Link>
                        <p className="text-slate-400 mb-8 leading-relaxed">
                            Building conversion-focused websites and ad systems for modern businesses.
                        </p>
                        <div className="flex gap-4">
                            {[Facebook, Instagram, Linkedin, Twitter].map((Icon, i) => (
                                <a key={i} href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-brand-indigo hover:text-white transition-all">
                                    <Icon className="w-5 h-5" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Column 2: Services */}
                    <div>
                        <h4 className="text-white font-bold mb-6">Services</h4>
                        <ul className="space-y-4">
                            {footerLinks.services.map((link, i) => (
                                <li key={i}>
                                    <Link href={link.href} className="hover:text-brand-coral transition-colors inline-block relative group">
                                        {link.label}
                                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-coral transition-all duration-300 group-hover:w-full"></span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 3: Quick Links */}
                    <div>
                        <h4 className="text-white font-bold mb-6">Quick Links</h4>
                        <ul className="space-y-4">
                            {footerLinks.company.map((link, i) => (
                                <li key={i}>
                                    <Link href={link.href} className="hover:text-brand-coral transition-colors inline-block relative group">
                                        {link.label}
                                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-coral transition-all duration-300 group-hover:w-full"></span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 4: Contact */}
                    <div>
                        <h4 className="text-white font-bold mb-6">Contact</h4>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <MessageCircle className="w-5 h-5 text-brand-indigo mt-1" />
                                <div>
                                    <div className="text-sm text-slate-500 mb-1">WhatsApp / Phone</div>
                                    <a href="https://wa.me/60186267912" target="_blank" rel="noopener noreferrer" className="text-white hover:text-brand-coral transition-colors font-medium">
                                        +60 18-6267912
                                    </a>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <Mail className="w-5 h-5 text-brand-indigo mt-1" />
                                <div>
                                    <div className="text-sm text-slate-500 mb-1">Email Inquiry</div>
                                    <a href="mailto:support@srdigital.com.my" className="text-white hover:text-brand-coral transition-colors block font-medium">
                                        support@srdigital.com.my
                                    </a>
                                </div>
                            </li>
                        </ul>
                    </div>

                </div>

                <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
                    <p>&copy; {new Date().getFullYear()} SR Digital Solutions. All Rights Reserved.</p>
                    <div className="flex gap-6">
                        {footerLinks.support.map((link, i) => (
                            <Link key={i} href={link.href} className="hover:text-white transition-colors">
                                {link.label}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    )
}
