'use client'

import React, { useState, useEffect } from 'react'
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
    const [isScrolled, setIsScrolled] = useState(false)
    const pathname = usePathname()

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    // Define text colors based on scroll state
    const textColor = isScrolled ? 'text-slate-600' : 'text-slate-200'
    const hoverColor = isScrolled ? 'hover:text-brand-indigo' : 'hover:text-white'
    const activeColor = isScrolled ? 'text-brand-indigo font-semibold' : 'text-white font-semibold'
    const logoFilter = isScrolled ? '' : 'brightness-0 invert'

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm' : 'bg-transparent border-b border-transparent'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    <div className="flex-shrink-0 flex items-center">
                        <Link href="/" className="flex items-center">
                            <Image
                                src="/logo.png"
                                alt="SR Digital Logo"
                                width={160}
                                height={40}
                                className={`h-10 w-auto transition-all duration-300 ${logoFilter}`}
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
                                        <DropdownMenuTrigger className={`flex items-center gap-1 text-sm font-medium focus:outline-none transition-colors ${textColor} ${hoverColor} data-[state=open]:text-brand-indigo`}>
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
                                    className={`text-sm font-medium transition-colors ${pathname === link.href ? activeColor : `${textColor} ${hoverColor}`}`}
                                >
                                    {link.name}
                                </Link>
                            )
                        })}
                        <Button asChild variant={isScrolled ? "outline" : "default"} className={`ml-4 transition-all ${isScrolled ? 'border-brand-indigo text-brand-indigo hover:bg-brand-indigo hover:text-white' : 'bg-white text-brand-midnight hover:bg-indigo-50 border-0'}`}>
                            <Link href="/portal/login">Client Login</Link>
                        </Button>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className={`focus:outline-none ${isScrolled ? 'text-slate-600 hover:text-brand-midnight' : 'text-white hover:text-indigo-200'}`}
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
