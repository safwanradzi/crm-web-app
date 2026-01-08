'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Menu, X, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { usePathname } from 'next/navigation'

const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services' },
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'Process', href: '/process' },
    { name: 'About & Contact', href: '/contact' },
]

export function PublicNavbar() {
    const [isOpen, setIsOpen] = useState(false)
    const pathname = usePathname()

    return (
        <nav className="fixed w-full z-50 bg-white/90 backdrop-blur-md border-b border-slate-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    <div className="flex-shrink-0 flex items-center">
                        <Link href="/" className="flex items-center">
                            <Image
                                src="/logo.png"
                                alt="SR Digital Logo"
                                width={160}
                                height={40}
                                className="h-10 w-auto"
                                priority
                            />
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex space-x-8 items-center">
                        {navLinks.map((link) => {
                            if (link.name === 'Services') {
                                return (
                                    <DropdownMenu key={link.name}>
                                        <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium text-slate-600 hover:text-brand-indigo focus:outline-none data-[state=open]:text-brand-indigo transition-colors">
                                            Services <ChevronDown className="h-4 w-4" />
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="center" className="w-56 bg-white shadow-lg border-slate-100 p-2">
                                            <DropdownMenuItem asChild>
                                                <Link href="/services/website-development" className="cursor-pointer w-full font-medium text-slate-700 hover:text-brand-indigo hover:bg-indigo-50 focus:text-brand-indigo focus:bg-indigo-50 rounded-md px-2 py-2 block">
                                                    Website Development
                                                </Link>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem asChild>
                                                <Link href="/services/google-ads" className="cursor-pointer w-full font-medium text-slate-700 hover:text-brand-indigo hover:bg-indigo-50 focus:text-brand-indigo focus:bg-indigo-50 rounded-md px-2 py-2 block">
                                                    Google Ads Management
                                                </Link>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem asChild>
                                                <Link href="/services/meta-ads" className="cursor-pointer w-full font-medium text-slate-700 hover:text-brand-indigo hover:bg-indigo-50 focus:text-brand-indigo focus:bg-indigo-50 rounded-md px-2 py-2 block">
                                                    Meta Ads Management
                                                </Link>
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                )
                            }

                            return (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className={`text-sm font-medium transition-colors hover:text-brand-indigo ${pathname === link.href ? 'text-brand-indigo font-semibold' : 'text-slate-600'
                                        }`}
                                >
                                    {link.name}
                                </Link>
                            )
                        })}
                        <Button asChild variant="outline" className="ml-4 border-brand-indigo text-brand-indigo hover:bg-brand-indigo hover:text-white transition-all">
                            <Link href="/portal/login">Client Login</Link>
                        </Button>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-slate-600 hover:text-brand-midnight focus:outline-none"
                        >
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-white border-b border-slate-200 absolute w-full shadow-xl">
                    <div className="px-4 pt-4 pb-6 space-y-2">
                        {navLinks.map((link) => (
                            <React.Fragment key={link.name}>
                                {link.name === 'Services' ? (
                                    <div className="space-y-2">
                                        <div className="px-3 py-2 text-base font-medium text-slate-600">Services</div>
                                        <div className="pl-6 space-y-2 border-l-2 border-slate-100 ml-3">
                                            <Link
                                                href="/services/website-development"
                                                onClick={() => setIsOpen(false)}
                                                className="block py-2 text-sm font-medium text-slate-600 hover:text-brand-indigo"
                                            >
                                                Website Development
                                            </Link>
                                            <Link
                                                href="/services/google-ads"
                                                onClick={() => setIsOpen(false)}
                                                className="block py-2 text-sm font-medium text-slate-600 hover:text-brand-indigo"
                                            >
                                                Google Ads Management
                                            </Link>
                                            <Link
                                                href="/services/meta-ads"
                                                onClick={() => setIsOpen(false)}
                                                className="block py-2 text-sm font-medium text-slate-600 hover:text-brand-indigo"
                                            >
                                                Meta Ads Management
                                            </Link>
                                        </div>
                                    </div>
                                ) : (
                                    <Link
                                        href={link.href}
                                        onClick={() => setIsOpen(false)}
                                        className={`block px-3 py-2 rounded-md text-base font-medium ${pathname === link.href ? 'text-brand-indigo bg-indigo-50' : 'text-slate-600 hover:text-brand-midnight hover:bg-slate-50'
                                            }`}
                                    >
                                        {link.name}
                                    </Link>
                                )}
                            </React.Fragment>
                        ))}
                        <div className="pt-4">
                            <Button asChild className="w-full bg-brand-indigo hover:bg-indigo-700 text-white h-12 text-lg">
                                <Link href="/portal/login" onClick={() => setIsOpen(false)}>Client Login</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    )
}
