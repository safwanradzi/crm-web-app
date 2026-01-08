'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Facebook, Instagram, Linkedin, Twitter, MessageCircle } from 'lucide-react'

const footerLinks = {
    services: [
        { label: "Website Development", href: "/services" },
        { label: "Google Ads", href: "/services/google-ads" },
        { label: "Facebook Ads", href: "/services/meta-ads" },
        { label: "E-Commerce", href: "/services/ecommerce" },
    ],
    company: [
        { label: "Home", href: "/" },
        { label: "About Us", href: "/about" },
        { label: "Our Portfolio", href: "/portfolio" },
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
                        <Link href="/" className="inline-block text-2xl font-bold text-white mb-6">
                            Agency<span className="text-brand-coral">.</span>
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
                                    <div className="text-sm text-slate-500 mb-1">WhastApp Support</div>
                                    <a href="#" className="text-white hover:text-brand-coral transition-colors">+60 12-345 6789</a>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <div className="text-sm text-slate-500 mb-1">Email Inquiry</div>
                                <a href="mailto:hello@yourdomain.com" className="text-white hover:text-brand-coral transition-colors block">hello@yourdomain.com</a>
                            </li>
                        </ul>
                    </div>

                </div>

                <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
                    <p>&copy; {new Date().getFullYear()} Your Agency Name. All Rights Reserved.</p>
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
