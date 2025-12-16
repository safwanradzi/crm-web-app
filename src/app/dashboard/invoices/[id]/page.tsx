import { getInvoiceById } from '../actions'
import { InvoicePrintView } from './invoice-print-view'

// We need to fetch the invoice, then render the client component
export default async function InvoiceDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const invoice = await getInvoiceById(id)

    if (!invoice) return <div>Invoice not found</div>

    // We can fetch the profile properly here if it wasn't joined fully.
    // However, existing getInvoiceById joins 'clients', 'projects', 'invoice_items', 'payments'.
    // It does NOT join 'profiles' (owner).
    // The previous quotation example joined 'profile'.
    // I should update getInvoiceById in actions.ts to join profiles!

    // But for now, let's just render. The PrintView handles missing profile gracefully?
    // Actually, I should fix getInvoiceById first or concurrently.

    return <InvoicePrintView invoice={invoice} />
}
