'use client'

import { useState, Suspense } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { submitLeadAction } from './actions'
import { Mail, Phone, CheckCircle, Loader2 } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import { ContactHero } from '@/components/contact/hero-section'
import { useTranslations } from 'next-intl'

function ContactForm() {
    const searchParams = useSearchParams()
    const tForm = useTranslations('Contact.form')
    const tSuccess = useTranslations('Contact.success')
    const preselectedService = searchParams.get('p') // e.g. 'landing', 'corporate'

    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)

    async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setLoading(true)
        const formData = new FormData(event.currentTarget)

        const result = await submitLeadAction(formData)
        setLoading(false)

        if (result.success) {
            setSuccess(true)
        } else {
            alert(result.error)
        }
    }

    if (success) {
        return (
            <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100 text-center h-full flex flex-col items-center justify-center min-h-[400px]">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle className="h-8 w-8" />
                </div>
                <h2 className="text-2xl font-bold text-brand-midnight mb-2">{tSuccess('headline')}</h2>
                <p className="text-slate-600 mb-6">
                    {tSuccess('message')}
                </p>
                <Button onClick={() => setSuccess(false)} variant="outline">
                    {tSuccess('btn')}
                </Button>
            </div>
        )
    }

    return (
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100">
            <h2 className="text-2xl font-bold text-brand-midnight mb-6">{tForm('headline')}</h2>
            <form onSubmit={onSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">{tForm('lName')}</Label>
                        <Input id="name" name="name" placeholder={tForm('pName')} required />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="phone">{tForm('lPhone')}</Label>
                        <Input id="phone" name="phone" placeholder={tForm('pPhone')} />
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="email">{tForm('lEmail')}</Label>
                    <Input id="email" name="email" type="email" placeholder={tForm('pEmail')} required />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="service">{tForm('lService')}</Label>
                    <Select name="service_interest" defaultValue={preselectedService || undefined}>
                        <SelectTrigger>
                            <SelectValue placeholder={tForm('pService')} />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="landing">{tForm('opt1')}</SelectItem>
                            <SelectItem value="corporate">{tForm('opt2')}</SelectItem>
                            <SelectItem value="ecommerce">{tForm('opt3')}</SelectItem>
                            <SelectItem value="custom">{tForm('opt4')}</SelectItem>
                            <SelectItem value="other">{tForm('opt5')}</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="message">{tForm('lMessage')}</Label>
                    <Textarea
                        id="message"
                        name="message"
                        placeholder={tForm('pMessage')}
                        className="min-h-[120px]"
                    />
                </div>

                <Button type="submit" size="lg" className="w-full bg-brand-indigo hover:bg-indigo-700 h-12 text-lg" disabled={loading}>
                    {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {loading ? tForm('btnLoading') : tForm('btnSubmit')}
                </Button>
            </form>
        </div>
    )
}

export default function ContactPage() {
    const tAbout = useTranslations('Contact.about')

    return (
        <div className="bg-white min-h-screen">
            {/* Hero */}
            {/* Hero */}
            <ContactHero />

            <section className="py-20 container mx-auto px-4">
                <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">

                    {/* Contact Info & About */}
                    <div className="space-y-8">
                        <div>
                            <h2 className="text-2xl font-bold text-brand-midnight mb-4">{tAbout('headline')}</h2>
                            <p className="text-slate-600 leading-relaxed">
                                {tAbout('description')}
                            </p>
                        </div>

                        <div className="space-y-6 pt-4">
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-indigo-50 text-brand-indigo rounded-lg">
                                    <Mail className="h-6 w-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-brand-midnight">{tAbout('emailTitle')}</h3>
                                    <p className="text-slate-600"><a href="mailto:support@srdigital.com.my" className="hover:text-brand-indigo transition-colors">support@srdigital.com.my</a></p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-indigo-50 text-brand-indigo rounded-lg">
                                    <Phone className="h-6 w-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-brand-midnight">{tAbout('phoneTitle')}</h3>
                                    <p className="text-slate-600">018-6267912</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Form Wrapped in Suspense */}
                    <Suspense fallback={
                        <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100 flex items-center justify-center min-h-[500px]">
                            <Loader2 className="h-8 w-8 animate-spin text-brand-indigo" />
                        </div>
                    }>
                        <ContactForm />
                    </Suspense>

                </div>
            </section>
        </div>
    )
}
