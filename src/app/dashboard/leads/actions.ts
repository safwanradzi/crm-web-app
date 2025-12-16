'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function getLeads() {
    const supabase = await createClient()
    const { data, error } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false })

    if (error) {
        console.error('Error fetching leads:', error)
        return []
    }

    return data
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
