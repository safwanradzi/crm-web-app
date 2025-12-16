
'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function getQuotations() {
    const supabase = await createClient()
    const { data, error } = await supabase
        .from('quotations')
        .select(`
      *,
      clients(name),
      projects(name)
    `)
        .order('created_at', { ascending: false })

    if (error) {
        console.error('Error fetching quotations:', error)
        return []
    }

    return data
}

export async function getQuotationById(id: string) {
    console.log('--- getQuotationById START ---', id)
    const supabase = await createClient()

    // Fetch Quotation
    const { data: quotation, error } = await supabase
        .from('quotations')
        .select(`
      *,
      clients(*),
      projects(*)
    `)
        .eq('id', id)
        .single()

    if (error) {
        console.error('Error fetching quotation core:', error)
        return null
    }

    if (!quotation) {
        console.error('Quotation not found (null data)')
        return null
    }

    // Fetch Items
    const { data: items, error: itemsError } = await supabase
        .from('quotation_items')
        .select('*')
        .eq('quotation_id', id)

    if (itemsError) console.error('Error fetching items:', itemsError)

    // Fetch Owner Profile (Company Settings)
    const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', quotation.owner_id)
        .single()

    if (profileError) console.error('Error fetching profile:', profileError)

    console.log('--- getQuotationById SUCCESS ---')
    return { ...quotation, items: items || [], profile }
}

export async function createQuotationAction(formData: FormData, items: any[], scopeOfWork: any[], paymentTerms: any[]) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) return { error: 'Not authenticated' }

    // 1. Create Quotation
    const quotationData = {
        owner_id: user.id,
        client_id: formData.get('client_id'),
        project_id: formData.get('project_id') || null,
        quote_number: formData.get('quote_number'),
        date: formData.get('date'),
        valid_until: formData.get('valid_until'),
        status: 'draft',
        completion_timeframe: formData.get('completion_timeframe'),
        scope_of_work: scopeOfWork,
        payment_terms: paymentTerms,
        notes: formData.get('notes'),
    }

    const { data: newQuote, error: quoteError } = await supabase
        .from('quotations')
        .insert(quotationData)
        .select()
        .single()

    if (quoteError) return { error: quoteError.message }

    // 2. Create Items
    if (items.length > 0) {
        const itemsData = items.map((item) => ({
            quotation_id: newQuote.id,
            description: item.description,
            qty: item.qty,
            unit_price: item.unit_price,
        }))

        const { error: itemsError } = await supabase.from('quotation_items').insert(itemsData)
        if (itemsError) return { error: itemsError.message }
    }

    revalidatePath('/dashboard/quotations')
    return { success: true, id: newQuote.id }
}

export async function deleteQuotationAction(id: string) {
    const supabase = await createClient()
    const { error } = await supabase.from('quotations').delete().eq('id', id)
    if (error) return { error: error.message }
    revalidatePath('/dashboard/quotations')
    return { success: true }
}

export async function generateQuoteNumber() {
    const supabase = await createClient()
    const { count } = await supabase.from('quotations').select('*', { count: 'exact', head: true })
    const nextNum = (count || 0) + 1
    return `Q${String(nextNum).padStart(3, '0')}`
}
