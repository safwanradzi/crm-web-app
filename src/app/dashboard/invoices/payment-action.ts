
'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function addPaymentAction(formData: FormData) {
    const supabase = await createClient()

    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
        return { error: 'Not authenticated' }
    }

    const invoiceId = formData.get('invoice_id') as string
    const amount = Number(formData.get('amount'))

    if (!invoiceId || isNaN(amount)) {
        return { error: 'Invalid data' }
    }

    // 1. Insert Payment
    const paymentData = {
        owner_id: user.id,
        invoice_id: invoiceId,
        payment_date: formData.get('payment_date'),
        amount: amount,
        method: formData.get('method'),
        note: formData.get('note'),
        // receipt_path: ... (handled via client upload or separate logic, for now text or we add file logic later)
    }

    const { error: paymentError } = await supabase.from('payments').insert(paymentData)

    if (paymentError) {
        return { error: paymentError.message }
    }

    // 2. Recalculate Invoice Status
    // Fetch invoice total
    const { data: invoice } = await supabase.from('invoices').select('total').eq('id', invoiceId).single()

    // Fetch sum of payments
    const { data: payments } = await supabase.from('payments').select('amount').eq('invoice_id', invoiceId)
    const totalPaid = payments?.reduce((sum, p) => sum + p.amount, 0) || 0

    let newStatus = 'partially_paid'
    if (totalPaid >= (invoice?.total || 0)) {
        newStatus = 'paid'
    } else if (totalPaid === 0) {
        // Keep existing status unless it was paid (reverting?) - usually it might be 'sent' or 'draft'. 
        // For simplicity, if we add payment > 0, it becomes partially_paid.
    }

    // Update Invoice
    if (invoice) {
        await supabase
            .from('invoices')
            .update({ status: newStatus })
            .eq('id', invoiceId)
    }

    revalidatePath(`/dashboard/invoices/${invoiceId}`)
    return { success: true }
}
