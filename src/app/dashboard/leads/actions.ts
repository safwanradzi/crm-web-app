'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function getLeads(page: number = 1, limit: number = 10) {
    const supabase = await createClient()
    const offset = (page - 1) * limit

    const { data, count, error } = await supabase
        .from('leads')
        .select('*', { count: 'exact' })
        .order('created_at', { ascending: false })
        .range(offset, offset + limit - 1)

    if (error) {
        console.error('Error fetching leads:', error)
        return { data: [], totalCount: 0 }
    }

    return { data: data as any[], totalCount: count || 0 }
}

export async function updateLeadStatusAction(id: string, status: string) {
    const supabase = await createClient()

    // Validate status
    const validStatuses = ['new', 'contacted', 'converted', 'archived']
    if (!validStatuses.includes(status)) {
        return { error: 'Invalid status' }
    }

    const { error } = await supabase
        .from('leads')
        .update({ status })
        .eq('id', id)

    if (error) {
        return { error: error.message }
    }

    revalidatePath('/dashboard/leads')
    return { success: true }
}

export async function deleteLeadAction(id: string) {
    const supabase = await createClient()
    const { error } = await supabase.from('leads').delete().eq('id', id)

    if (error) {
        return { error: error.message }
    }

    revalidatePath('/dashboard/leads')
    return { success: true }
}
