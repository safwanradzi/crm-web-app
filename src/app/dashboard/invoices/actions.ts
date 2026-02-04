
'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { InvoiceItem } from '@/types'

export async function getInvoices(page: number = 1, limit: number = 10) {
    const supabase = await createClient()
    const offset = (page - 1) * limit

    const { data, count, error } = await supabase
        .from('invoices')
        .select(`
      *,
      clients (name)
    `, { count: 'exact' })
        .order('created_at', { ascending: false })
        .range(offset, offset + limit - 1)

    if (error) {
        console.error('Error fetching invoices:', error)
        return { data: [], totalCount: 0 }
    }

    return { data: data as any[], totalCount: count || 0 }
}

export async function getInvoiceById(id: string) {
    const supabase = await createClient()
    const { data: invoice, error } = await supabase
        .from('invoices')
        .select(`
        *,
        clients (name, email, address),
        projects (name),
        invoice_items (*),
        payments (*)
      `)
        .eq('id', id)
        .single()

    if (error) {
        console.error('Error fetching invoice:', error)
        return null
    }

    if (!invoice) return null

    // Fetch Owner Profile separately
    const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', invoice.owner_id)
        .single()

    // Attach profile to the result (InvoicePrintView expects 'profiles' or we just pass it to match logic)
    // The previous code expected 'profiles' in the quote object.
    // I can stick it into a 'profiles' property to match the Print View expectation.
    return { ...invoice, profiles: profile }
}

export async function createInvoiceAction(formData: FormData, items: InvoiceItem[]) {
    const supabase = await createClient()

    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
        return { error: 'Not authenticated' }
    }

    // 1. Create Invoice Header
    const invoiceData = {
        owner_id: user.id,
        client_id: formData.get('client_id'),
        project_id: formData.get('project_id') || null,
        invoice_number: formData.get('invoice_number'),
        date: formData.get('date'),
        due_date: formData.get('due_date'),
        status: formData.get('status') || 'draft',
        subtotal: Number(formData.get('subtotal')),
        discount: Number(formData.get('discount')),
        tax: Number(formData.get('tax')),
        total: Number(formData.get('total')),
        notes: formData.get('notes'),
    }

    const { data: invoice, error: invoiceError } = await supabase
        .from('invoices')
        .insert(invoiceData)
        .select()
        .single()

    if (invoiceError) {
        return { error: invoiceError.message }
    }

    // 2. Create Invoice Items
    if (items.length > 0) {
        const itemsToInsert = items.map(item => ({
            invoice_id: invoice.id,
            description: item.description,
            qty: item.qty,
            unit_price: item.unit_price
        }))

        const { error: itemsError } = await supabase
            .from('invoice_items')
            .insert(itemsToInsert)

        if (itemsError) {
            // Ideally rollback invoice here, but for MVP we just return error
            return { error: 'Invoice created but items failed: ' + itemsError.message }
        }
    }

    revalidatePath('/dashboard/invoices')
    return { success: true, id: invoice.id }
}

export async function updateInvoiceAction(id: string, formData: FormData, items: InvoiceItem[]) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) return { error: 'Not authenticated' }

    // 1. Update Invoice Header
    const invoiceData = {
        client_id: formData.get('client_id'),
        project_id: formData.get('project_id') || null,
        invoice_number: formData.get('invoice_number'),
        date: formData.get('date'),
        due_date: formData.get('due_date'),
        status: formData.get('status'),
        subtotal: Number(formData.get('subtotal')),
        discount: Number(formData.get('discount')),
        tax: Number(formData.get('tax')),
        total: Number(formData.get('total')),
        notes: formData.get('notes'),
    }

    const { error: invoiceError } = await supabase
        .from('invoices')
        .update(invoiceData)
        .eq('id', id)

    if (invoiceError) return { error: invoiceError.message }

    // 2. Replace Invoice Items
    const { error: deleteError } = await supabase
        .from('invoice_items')
        .delete()
        .eq('invoice_id', id)

    if (deleteError) return { error: deleteError.message }

    if (items.length > 0) {
        const itemsToInsert = items.map(item => ({
            invoice_id: id,
            description: item.description,
            qty: item.qty,
            unit_price: item.unit_price
        }))

        const { error: itemsError } = await supabase
            .from('invoice_items')
            .insert(itemsToInsert)

        if (itemsError) return { error: itemsError.message }
    }

    revalidatePath('/dashboard/invoices')
    revalidatePath(`/dashboard/invoices/${id}`)
    return { success: true }
}

export async function generateInvoiceNumber(prefix: string = 'INV') {
    const supabase = await createClient()
    const { data, error } = await supabase
        .from('invoices')
        .select('invoice_number')
        .ilike('invoice_number', `${prefix}%`)
        .order('created_at', { ascending: false })
        .limit(1)

    if (error) {
        console.error('Error fetching last invoice number:', error)
        return `${prefix}001` // Fallback
    }

    if (!data || data.length === 0) {
        return `${prefix}001`
    }

    const lastNumber = data[0].invoice_number
    // Extract the numeric part. Regex looks for digits at the end.
    const match = lastNumber.match(/(\d+)$/)

    if (match) {
        const number = parseInt(match[1], 10)
        const nextNumber = number + 1
        // Pad with zeros to keep the same length as found, or at least 3 digits.
        const padding = Math.max(match[1].length, 3)
        return `${prefix}${nextNumber.toString().padStart(padding, '0')}`
    }

    return `${prefix}001`
}

export async function deleteInvoiceAction(id: string) {
    const supabase = await createClient()
    const { error } = await supabase.from('invoices').delete().eq('id', id)

    if (error) {
        return { error: error.message }
    }

    revalidatePath('/dashboard/invoices')
    return { success: true }
}
