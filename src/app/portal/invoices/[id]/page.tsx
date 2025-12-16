import { getInvoiceById } from '@/app/dashboard/invoices/actions'
import { ClientInvoiceView } from './client-invoice-view'
import { notFound } from 'next/navigation'

export default async function ClientInvoicePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const invoice = await getInvoiceById(id)

    if (!invoice) {
        return notFound()
    }

    return (
        <div className="container mx-auto py-10">
            <ClientInvoiceView invoice={invoice} />
        </div>
    )
}
