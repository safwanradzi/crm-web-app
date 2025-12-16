
'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function getAddons() {
    const supabase = await createClient()
    const { data, error } = await supabase
        .from('addons')
        .select(`
      *,
      projects (name)
    `)
        .order('date', { ascending: false })

    if (error) {
        console.error('Error fetching addons:', error)
        return []
    }

    return data as any[]
}

export async function createAddonAction(formData: FormData) {
    const supabase = await createClient()

    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
        return { error: 'Not authenticated' }
    }

    const addonData = {
        owner_id: user.id,
        project_id: formData.get('project_id') || null,
        description: formData.get('description'),
        price: Number(formData.get('price')),
        date: formData.get('date'),
        note: formData.get('note'),
    }

    const { error } = await supabase.from('addons').insert(addonData)

    if (error) {
        return { error: error.message }
    }

    revalidatePath('/dashboard/addons')
    return { success: true }
}

export async function deleteAddonAction(id: string) {
    const supabase = await createClient()
    const { error } = await supabase.from('addons').delete().eq('id', id)

    if (error) return { error: error.message }
    revalidatePath('/dashboard/addons')
    return { success: true }
}
