'use client'

import { useState } from 'react'
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

export default function ContactPage() {
    const searchParams = useSearchParams()
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
            <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
                <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center">
                    <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="h-8 w-8" />
                    </div>
                    <h2 className="text-2xl font-bold text-brand-midnight mb-2">Message Sent!</h2>
                    <p className="text-slate-600 mb-6">
                        Thank you for reaching out. We have received your inquiry and will get back to you within 24 hours.
                    </p>
                    <Button onClick={() => setSuccess(false)} variant="outline">
                        Send Another Message
                    </Button>
                </div>
            </div>
        )
    }

    return (
        <div className="bg-white min-h-screen">
            {/* Hero */}
            <section className="bg-brand-midnight text-white py-20">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">Ready to Build Something <span className="text-brand-indigo">Exceptional?</span></h1>
                    <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                        Share your objectives — we’ll recommend the ideal structure and solution.
                    </p>
                </div>
            </section>

            <section className="py-20 container mx-auto px-4">
                <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">

                    {/* Contact Info & About */}
                    <div className="space-y-8">
                        <div>
                            <h2 className="text-2xl font-bold text-brand-midnight mb-4">About SR Digital Solutions</h2>
                            <p className="text-slate-600 leading-relaxed">
                                SR Digital Solutions is a boutique design-first studio dedicated to creating digital assets that accelerate business growth. Our approach blends aesthetic clarity with strategic functionality — ensuring every website not only looks exceptional but performs with purpose.
                            </p>
                        </div>

                        <div className="space-y-6 pt-4">
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-indigo-50 text-brand-indigo rounded-lg">
                                    <Mail className="h-6 w-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-brand-midnight">Email Us</h3>
                                    <p className="text-slate-600">support@srdigital.com.my</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-indigo-50 text-brand-indigo rounded-lg">
                                    <Phone className="h-6 w-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-brand-midnight">WhatsApp / Phone</h3>
                                    <p className="text-slate-600">018-6267912</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100">
                        <h2 className="text-2xl font-bold text-brand-midnight mb-6">Send us a Message</h2>
                        <form onSubmit={onSubmit} className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Name</Label>
                                    <Input id="name" name="name" placeholder="Your Name" required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="phone">Phone</Label>
                                    <Input id="phone" name="phone" placeholder="+60..." />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" name="email" type="email" placeholder="you@company.com" required />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="service">Interested Service</Label>
                                <Select name="service_interest" defaultValue={preselectedService || undefined}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a service..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="landing">Landing Page (RM499)</SelectItem>
                                        <SelectItem value="corporate">Corporate Website (RM1,499)</SelectItem>
                                        <SelectItem value="ecommerce">E-Commerce Store (RM1,899)</SelectItem>
                                        <SelectItem value="custom">Custom Project</SelectItem>
                                        <SelectItem value="other">Other Inquiry</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="message">Project Details</Label>
                                <Textarea
                                    id="message"
                                    name="message"
                                    placeholder="Tell us about your business goals..."
                                    className="min-h-[120px]"
                                />
                            </div>

                            <Button type="submit" size="lg" className="w-full bg-brand-indigo hover:bg-indigo-700 h-12 text-lg" disabled={loading}>
                                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                {loading ? 'Sending...' : 'Send Message'}
                            </Button>
                        </form>
                    </div>

                </div>
            </section>
        </div>
    )
}
