import { PublicNavbar } from '@/components/public/navbar'
import { PublicFooter } from '@/components/public/footer'
import { FloatingWhatsApp } from '@/components/public/floating-whatsapp'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, getLocale } from 'next-intl/server'

export default async function PublicLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const locale = await getLocale()
    const messages = await getMessages()

    return (
        <NextIntlClientProvider messages={messages} locale={locale}>
            <div className="flex min-h-screen flex-col font-sans bg-white selection:bg-brand-indigo/20 selection:text-brand-indigo">
                <PublicNavbar />
                <main className="flex-grow">
                    {children}
                </main>
                <PublicFooter />
                <FloatingWhatsApp />
            </div>
        </NextIntlClientProvider>
    )
}
