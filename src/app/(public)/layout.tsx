import { PublicNavbar } from '@/components/public/navbar'
import { PublicFooter } from '@/components/public/footer'
import { FloatingWhatsApp } from '@/components/public/floating-whatsapp'

export default function PublicLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex min-h-screen flex-col font-sans bg-white selection:bg-brand-indigo/20 selection:text-brand-indigo">
            <PublicNavbar />
            <main className="flex-grow pt-20">
                {children}
            </main>
            <PublicFooter />
            <FloatingWhatsApp />
        </div>
    )
}
