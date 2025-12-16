'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowLeft, Printer } from 'lucide-react'

interface ClientInvoiceViewProps {
    invoice: any
}

export function ClientInvoiceView({ invoice }: ClientInvoiceViewProps) {
    const { clients, projects, invoice_items, payments } = invoice

    // Recalculate totals
    const items = Array.isArray(invoice_items) ? invoice_items : []
    const paymentRecords = Array.isArray(payments) ? payments : []
    const subtotal = invoice.subtotal || 0
    const total = invoice.total || 0
    const totalPaid = paymentRecords.reduce((sum: number, p: any) => sum + (p.amount || 0), 0)
    const balanceDue = Math.max(0, total - totalPaid)

    const profile = invoice.profiles || {
        business_name: 'My Business',
        company_address: 'Address Not Found',
        company_email: 'email@example.com',
        company_phone: '',
        bank_holder_name: '-',
        bank_name: '-',
        bank_account_number: '-'
    }

    return (
        <div className="flex flex-col gap-6">
            {/* Action Bar - Hidden on Print */}
            <div className="flex items-center justify-between print:hidden">
                <div className="flex items-center gap-2">
                    <Link href="/portal/invoices">
                        <Button variant="ghost" size="sm">
                            <ArrowLeft className="mr-2 h-4 w-4" /> Back to My Invoices
                        </Button>
                    </Link>
                </div>
                <div className="flex items-center gap-2">
                    <Button onClick={() => typeof window !== 'undefined' && window.print()} className="print-btn">
                        <Printer className="mr-2 h-4 w-4" /> Print / Save PDF
                    </Button>
                </div>
            </div>

            {/* Print Container - Same Look as Admin View */}
            <div id="print-area" className="bg-white text-black mx-auto shadow-lg min-h-[297mm] text-sm leading-relaxed relative w-full max-w-[210mm]">

                {/* Internal Padding Wrapper */}
                <div className="p-[15mm] md:p-[20mm]">

                    {/* Header Section */}
                    <div className="flex justify-between items-start mb-12 border-b-2 border-gray-100 pb-8">
                        <div>
                            <h2 className="font-bold text-2xl text-gray-900 uppercase tracking-wide mb-2">{profile?.business_name}</h2>
                            <p className="text-gray-600 whitespace-pre-line leading-normal max-w-xs">{profile?.company_address}</p>
                            <p className="mt-3 text-gray-600">
                                {profile?.company_email && <span className="block">{profile.company_email}</span>}
                                {profile?.company_phone && <span className="block">{profile.company_phone}</span>}
                            </p>
                        </div>
                        <div className="text-right">
                            <h1 className="text-4xl font-extrabold text-blue-900/10 tracking-widest absolute top-10 right-10 pointer-events-none select-none print:text-gray-100">INVOICE</h1>
                            <div className="mt-4">
                                <p className="text-gray-500 mb-1">Issue Date</p>
                                <p className="font-bold text-lg">{invoice.date}</p>
                            </div>
                            <div className="mt-4">
                                <p className="text-gray-500 mb-1">Invoice No.</p>
                                <p className="font-bold text-lg text-blue-600">{invoice.invoice_number}</p>
                            </div>
                            {/* Status Badge */}
                            <div className="mt-4">
                                <span className={`px-3 py-1 rounded border text-xs font-bold uppercase ${invoice.status === 'paid' ? 'bg-green-50 text-green-600 border-green-200' :
                                        invoice.status === 'overdue' ? 'bg-red-50 text-red-600 border-red-200' :
                                            'bg-gray-50 text-gray-600 border-gray-200'
                                    }`}>
                                    {invoice.status}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Client & Project Info Grid */}
                    <div className="grid grid-cols-2 gap-12 mb-12">
                        <div>
                            <h3 className="text-xs uppercase font-bold text-gray-400 tracking-wider mb-3">Invoice To</h3>
                            <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 h-full">
                                <p className="font-bold text-lg text-gray-900 mb-1">{clients?.name}</p>
                                <p className="text-gray-600">{clients?.email}</p>
                                <p className="text-gray-600">{clients?.address}</p>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-xs uppercase font-bold text-gray-400 tracking-wider mb-3">Invoice Details</h3>
                            <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 h-full">
                                {projects?.name && (
                                    <div className="mb-4">
                                        <p className="text-gray-500 text-xs uppercase mb-1">Project</p>
                                        <p className="font-bold">{projects.name}</p>
                                    </div>
                                )}
                                <div className="flex justify-between items-center border-t border-gray-200 pt-3 mt-2">
                                    <span className="text-gray-600 font-bold">Due Date</span>
                                    <span className="font-bold text-red-600">{invoice.due_date || 'Due on Receipt'}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Line Items Table */}
                    <div className="mb-12">
                        <h3 className="text-lg font-bold text-gray-900 mb-4 border-b border-gray-200 pb-2">Items Breakdown</h3>
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="border-b-2 border-gray-800">
                                    <th className="py-3 text-left font-bold text-gray-900 w-16">No.</th>
                                    <th className="py-3 text-left font-bold text-gray-900">Description</th>
                                    <th className="py-3 text-right font-bold text-gray-900 w-20">Qty</th>
                                    <th className="py-3 text-right font-bold text-gray-900 w-32">Price</th>
                                    <th className="py-3 text-right font-bold text-gray-900 w-32">Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {items.map((item: any, i: number) => (
                                    <tr key={item.id || i} className="border-b border-gray-200">
                                        <td className="py-4 text-left text-gray-500">{i + 1}</td>
                                        <td className="py-4 text-left font-medium text-gray-900">{item.description}</td>
                                        <td className="py-4 text-right text-gray-600">{item.qty}</td>
                                        <td className="py-4 text-right text-gray-600">{item.unit_price?.toFixed(2)}</td>
                                        <td className="py-4 text-right text-gray-900 font-medium">{(item.qty * item.unit_price).toFixed(2)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Totals Section */}
                    <div className="flex justify-end mb-12">
                        <div className="w-1/2 space-y-3">
                            <div className="flex justify-between text-gray-600">
                                <span>Subtotal</span>
                                <span>{subtotal.toFixed(2)}</span>
                            </div>
                            {(invoice.discount > 0) && (
                                <div className="flex justify-between text-gray-600">
                                    <span>Discount</span>
                                    <span>-{invoice.discount.toFixed(2)}</span>
                                </div>
                            )}
                            {(invoice.tax > 0) && (
                                <div className="flex justify-between text-gray-600">
                                    <span>Tax</span>
                                    <span>{invoice.tax.toFixed(2)}</span>
                                </div>
                            )}
                            <div className="flex justify-between border-t-2 border-gray-800 pt-3 text-xl font-bold text-gray-900">
                                <span>Total</span>
                                <span>{total.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-sm pt-2">
                                <span className="font-bold text-gray-500 uppercase">Amount Paid</span>
                                <span className="font-bold text-green-600">{totalPaid.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-lg bg-gray-100 p-2 rounded">
                                <span className="font-bold text-gray-900">Balance Due</span>
                                <span className="font-bold text-red-600">{balanceDue.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>

                    {/* Footer / Bank / Notes */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-8 border-t border-gray-200 break-inside-avoid">
                        <div className="space-y-6">
                            <div>
                                <h4 className="font-bold text-gray-900 mb-3 text-sm uppercase">Payment Instructions</h4>
                                <div className="bg-blue-50/50 p-4 border border-blue-100 rounded-lg text-sm">
                                    <div className="mb-2">
                                        <span className="block text-gray-500 text-xs uppercase">Bank Name</span>
                                        <span className="font-bold text-gray-800">{profile?.bank_name}</span>
                                    </div>
                                    <div className="mb-2">
                                        <span className="block text-gray-500 text-xs uppercase">Account Holder</span>
                                        <span className="font-bold text-gray-800">{profile?.bank_holder_name}</span>
                                    </div>
                                    <div>
                                        <span className="block text-gray-500 text-xs uppercase">Account Number</span>
                                        <span className="font-mono text-lg text-blue-800">{profile?.bank_account_number}</span>
                                    </div>
                                </div>
                            </div>
                            {invoice.notes && (
                                <div>
                                    <h4 className="font-bold text-gray-900 mb-2 text-sm uppercase">Notes</h4>
                                    <p className="text-gray-600 text-sm whitespace-pre-line">{invoice.notes}</p>
                                </div>
                            )}
                        </div>
                        <div className="flex flex-col justify-end text-right">
                            <div className="text-center ml-auto w-48">
                                <div className="h-20 flex items-end justify-center mb-2">
                                    <span className="font-script text-2xl text-blue-800">{profile?.name || 'Administrator'}</span>
                                </div>
                                <div className="border-t border-gray-400 w-full mx-auto"></div>
                                <p className="mt-2 font-bold text-gray-900 text-sm">Authorized Signature</p>
                            </div>
                            <p className="mt-8 text-gray-500 text-xs">Thank you for your business.</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
