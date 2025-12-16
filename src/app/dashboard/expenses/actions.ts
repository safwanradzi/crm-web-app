
'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function getExpenses() {
    const supabase = await createClient()
    const { data, error } = await supabase
        .from('expenses')
        .select(`
      *,
      projects (name)
    `)
        .order('date', { ascending: false })

    if (error) {
        console.error('Error fetching expenses:', error)
        return []
    }

    return data as any[]
}

export async function createExpenseAction(formData: FormData) {
    const supabase = await createClient()

    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
        return { error: 'Not authenticated' }
    }

    const expenseData = {
        owner_id: user.id,
        category: formData.get('category'),
        description: formData.get('description'),
        amount: Number(formData.get('amount')),
        date: formData.get('date'),
        project_id: formData.get('project_id') || null,
        is_recurring: formData.get('is_recurring') === 'on',
        recurring_interval: formData.get('recurring_interval') || null,
    }

    const { error } = await supabase.from('expenses').insert(expenseData)

    if (error) {
        return { error: error.message }
    }

    revalidatePath('/dashboard/expenses')
    return { success: true }
}

export async function deleteExpenseAction(id: string) {
    const supabase = await createClient()
    const { error } = await supabase.from('expenses').delete().eq('id', id)

    if (error) return { error: error.message }
    revalidatePath('/dashboard/expenses')
    return { success: true }
}
