import Link from 'next/link'
import Image from 'next/image'

export function PublicFooter() {
    return (
        <footer className="bg-brand-midnight text-slate-300 py-12 border-t border-slate-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="col-span-1 md:col-span-2">
                    <Link href="/" className="inline-block mb-6">
                        <Image
                            src="/logo.png"
                            alt="SR Digital Logo"
                            width={160}
                            height={40}
                            className="h-10 w-auto brightness-0 invert opacity-90 hover:opacity-100 transition-opacity"
                        />
                    </Link>
                    <p className="text-sm leading-relaxed max-w-xs text-slate-400">
                        SR Digital Solutions is a boutique web design studio specialising in crafting refined, high-performance digital experiences.
                    </p>
                </div>
                <div>
                    <h3 className="text-white font-semibold mb-4 tracking-wider uppercase text-xs">Pages</h3>
                    <ul className="space-y-2 text-sm">
                        <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
                        <li><Link href="/services" className="hover:text-white transition-colors">Services & Pricing</Link></li>
                        <li><Link href="/portfolio" className="hover:text-white transition-colors">Portfolio</Link></li>
                        <li><Link href="/process" className="hover:text-white transition-colors">Process</Link></li>
                        <li><Link href="/contact" className="hover:text-white transition-colors">About & Contact</Link></li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-white font-semibold mb-4 tracking-wider uppercase text-xs">Client Area</h3>
                    <ul className="space-y-2 text-sm">
                        <li><Link href="/portal/login" className="hover:text-white transition-colors">Client Login</Link></li>
                        <li><Link href="/portal/login?signup=true" className="hover:text-white transition-colors">Register</Link></li>
                    </ul>
                </div>
            </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-slate-800 text-xs text-center text-slate-500">
                &copy; {new Date().getFullYear()} SR Digital Solutions. All rights reserved.
            </div>
        </footer>
    )
}
