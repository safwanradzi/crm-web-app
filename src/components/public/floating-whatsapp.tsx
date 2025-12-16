'use client'

import { MessageCircle } from 'lucide-react'
import Link from 'next/link'

export function FloatingWhatsApp() {
    // Replace with actual WhatsApp API link. 
    // Format: https://wa.me/<number>?text=<encoded_message>
    // Number should be international format without + or - or ( )
    // e.g., 60186267912
    const whatsappLink = "https://wa.me/60186267912?text=Hi%2C%20I%27m%20interested%20in%20your%20services."

    return (
        <Link
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-8 right-8 z-50 flex items-center justify-center w-16 h-16 bg-[#25D366] text-white rounded-full shadow-2xl hover:scale-110 transition-transform duration-300 hover:shadow-green-500/50 group"
            aria-label="Chat on WhatsApp"
        >
            <MessageCircle className="w-8 h-8 fill-current" />
            <span className="absolute right-full mr-4 bg-white text-brand-midnight px-3 py-1 rounded-lg text-sm font-semibold shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                Chat With Us
            </span>
        </Link>
    )
}
