
'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowLeft, Printer, Trash2 } from 'lucide-react'
import { deleteQuotationAction } from '../actions'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

interface QuotationPrintViewProps {
    quotation: any
}

export function QuotationPrintView({ quotation }: QuotationPrintViewProps) {
    const { profile, clients, projects, items } = quotation
    const scopeOfWork = Array.isArray(quotation.scope_of_work) ? quotation.scope_of_work : []
    const paymentTerms = Array.isArray(quotation.payment_terms) ? quotation.payment_terms : []
    const subtotal = items.reduce((sum: number, item: any) => sum + (item.qty * item.unit_price), 0)

    const router = useRouter()
    const [deleting, setDeleting] = useState(false)

    async function handleDelete() {
        if (!confirm('Are you sure you want to delete this quotation? This action cannot be undone.')) return

        setDeleting(true)
        const result = await deleteQuotationAction(quotation.id)
        if (result.error) {
            alert(result.error)
            setDeleting(false)
        } else {
            router.push('/dashboard/quotations')
        }
    }

    return (
        <div className="flex flex-col gap-6">
            {/* Action Bar - Hidden on Print */}
            <div className="flex items-center justify-between print:hidden">
                <div className="flex items-center gap-2">
                    <Link href="/dashboard/quotations">
                        <Button variant="ghost" size="sm">
                            <ArrowLeft className="mr-2 h-4 w-4" /> Back
                        </Button>
                    </Link>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="destructive" size="sm" onClick={handleDelete} disabled={deleting}>
                        <Trash2 className="mr-2 h-4 w-4" /> {deleting ? 'Deleting...' : 'Delete'}
                    </Button>
                    <Button onClick={() => typeof window !== 'undefined' && window.print()} className="print-btn">
                        <Printer className="mr-2 h-4 w-4" /> Print / Save PDF
                    </Button>
                </div>
            </div>

            {/* Print Container - A4 Fixed Width */}
            <div id="print-area" className="bg-white text-black mx-auto shadow-lg min-h-[297mm] text-sm leading-relaxed relative">

                {/* Internal Padding Wrapper to ensure margins work on all pages if possible */}
                <div className="p-[15mm] md:p-[20mm]">

                    {/* Header Section */}
                    <div className="flex justify-between items-start mb-12 border-b-2 border-gray-100 pb-8">
                        <div>
                            <h2 className="font-bold text-2xl text-gray-900 uppercase tracking-wide mb-2">{profile?.business_name || 'My Business'}</h2>
                            <p className="text-gray-600 whitespace-pre-line leading-normal max-w-xs">{profile?.company_address}</p>
                            <p className="mt-3 text-gray-600">
                                {profile?.company_email && <span className="block">{profile.company_email}</span>}
                                {profile?.company_phone && <span className="block">{profile.company_phone}</span>}
                            </p>
                        </div>
                        <div className="text-right">
                            <h1 className="text-4xl font-extrabold text-blue-900/10 tracking-widest absolute top-10 right-10 pointer-events-none select-none print:text-gray-100">QUOTATION</h1>
                            <div className="mt-4">
                                <p className="text-gray-500 mb-1">Date Issued</p>
                                <p className="font-bold text-lg">{quotation.date}</p>
                            </div>
                            <div className="mt-4">
                                <p className="text-gray-500 mb-1">Quotation No.</p>
                                <p className="font-bold text-lg text-blue-600">{quotation.quote_number}</p>
                            </div>
                        </div>
                    </div>

                    {/* Client & Project Info Grid */}
                    <div className="grid grid-cols-2 gap-12 mb-12">
                        <div>
                            <h3 className="text-xs uppercase font-bold text-gray-400 tracking-wider mb-3">Quotation For</h3>
                            <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                                <p className="font-bold text-lg text-gray-900 mb-1">{clients?.name}</p>
                                <p className="text-gray-600">{clients?.email}</p>
                                <p className="text-gray-600">{clients?.phone}</p>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-xs uppercase font-bold text-gray-400 tracking-wider mb-3">Project Details</h3>
                            <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                                <h4 className="font-bold text-lg text-gray-900">{projects?.name || 'Website Design & Development'}</h4>
                                {quotation.completion_timeframe && (
                                    <p className="text-gray-600 mt-1 text-sm">Est. Duration: {quotation.completion_timeframe}</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Scope of Work */}
                    <div className="mb-12">
                        <h3 className="text-lg font-bold text-gray-900 mb-4 border-b border-gray-200 pb-2">Scope of Work</h3>
                        <div className="pl-2">
                            <ul className="list-none space-y-2">
                                {scopeOfWork.map((scope: string, i: number) => (
                                    <li key={i} className="flex items-start">
                                        <span className="mr-3 text-blue-500 mt-1">•</span>
                                        <span className="text-gray-700">{scope}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Pricing Table */}
                    <div className="mb-12">
                        <h3 className="text-lg font-bold text-gray-900 mb-4 border-b border-gray-200 pb-2">Cost Breakdown</h3>
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="border-b-2 border-gray-800">
                                    <th className="py-3 text-left font-bold text-gray-900 w-16">No.</th>
                                    <th className="py-3 text-left font-bold text-gray-900">Description</th>
                                    <th className="py-3 text-right font-bold text-gray-900 w-32">Amount (RM)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {items.map((item: any, i: number) => (
                                    <tr key={item.id} className="border-b border-gray-200">
                                        <td className="py-4 text-left text-gray-500">{i + 1}</td>
                                        <td className="py-4 text-left font-medium text-gray-900">{item.description}</td>
                                        <td className="py-4 text-right text-gray-900 font-medium">{item.unit_price.toFixed(2)}</td>
                                    </tr>
                                ))}
                                <tr>
                                    <td colSpan={2} className="pt-4 text-right font-bold text-lg text-gray-900 pr-8">Total Amount</td>
                                    <td className="pt-4 text-right font-bold text-xl text-blue-600">{subtotal.toFixed(2)}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* Terms & Footer Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-8 pt-8 border-t border-gray-200 break-inside-avoid">

                        {/* Left Column: Terms & Bank */}
                        <div className="space-y-8">
                            <div>
                                <h4 className="font-bold text-gray-900 mb-3 text-sm uppercase">Payment Terms</h4>
                                <ul className="text-sm text-gray-600 list-disc list-outside ml-4 space-y-1">
                                    {paymentTerms.map((term: string, i: number) => (
                                        <li key={i}>{term}</li>
                                    ))}
                                </ul>
                            </div>

                            <div>
                                <h4 className="font-bold text-gray-900 mb-3 text-sm uppercase">Bank Details</h4>
                                <div className="bg-blue-50/50 p-4 border border-blue-100 rounded-lg">
                                    <p className="font-bold text-gray-800">{profile?.bank_holder_name}</p>
                                    <p className="text-gray-600">{profile?.bank_name}</p>
                                    <p className="font-mono text-gray-900 mt-1">{profile?.bank_account_number}</p>
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Signature */}
                        <div className="flex flex-col justify-end text-sm">
                            <p className="mb-16 text-gray-600 italic">This quotation is computer generated and valid for 14 days without signature.</p>

                            <div className="flex justify-between items-end">
                                <div className="text-center">
                                    <div className="h-20 flex items-end justify-center mb-2">
                                        {/* Placeholder for Client Signature */}
                                    </div>
                                    <div className="border-t border-gray-400 w-32 mx-auto"></div>
                                    <p className="mt-2 font-bold text-gray-900">Client Acceptance</p>
                                </div>

                                <div className="text-center">
                                    <div className="h-20 flex items-end justify-center mb-2">
                                        <span className="font-script text-2xl text-blue-800">{profile?.name || 'Administrator'}</span>
                                    </div>
                                    <div className="border-t border-gray-400 w-32 mx-auto"></div>
                                    <p className="mt-2 font-bold text-gray-900">Authorized Signature</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
