
'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function getDomains() {
    const supabase = await createClient()
    const { data, error } = await supabase
        .from('domains_hosting')
        .select(`
      *,
      projects (name)
    `)
        .order('domain_expiry_date', { ascending: true }) // Expiring soonest first

    if (error) {
        console.error('Error fetching domains:', error)
        return []
    }

    return data as any[]
}

export async function createDomainAction(formData: FormData) {
    const supabase = await createClient()

    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
        return { error: 'Not authenticated' }
    }

    const projectId = formData.get('project_id') as string
    if (!projectId) return { error: 'Project is required' }

    // We are putting both domain and hosting in one table for simplicity as per schema
    const domainData = {
        owner_id: user.id,
        project_id: projectId,
        domain_name: formData.get('domain_name') as string,
        domain_registrar: formData.get('domain_registrar') as string,
        domain_purchase_date: formData.get('domain_purchase_date') ? formData.get('domain_purchase_date') as string : null,
        domain_expiry_date: formData.get('domain_expiry_date') ? formData.get('domain_expiry_date') as string : null,
        domain_cost: Number(formData.get('domain_cost')) || 0,
        hosting_provider: formData.get('hosting_provider') as string,
        hosting_plan: formData.get('hosting_plan') as string,
        hosting_purchase_date: formData.get('hosting_purchase_date') ? formData.get('hosting_purchase_date') as string : null,
        hosting_expiry_date: formData.get('hosting_expiry_date') ? formData.get('hosting_expiry_date') as string : null,
        hosting_cost: Number(formData.get('hosting_cost')) || 0,
        login_note: formData.get('login_note') as string,
    }

    const { error } = await supabase.from('domains_hosting').insert(domainData)

    if (error) {
        return { error: error.message }
    }

    revalidatePath('/dashboard/domains')
    return { success: true }
}

export async function deleteDomainAction(id: string) {
    const supabase = await createClient()
    const { error } = await supabase.from('domains_hosting').delete().eq('id', id)
    if (error) return { error: error.message }
    revalidatePath('/dashboard/domains')
    return { success: true }
}

export async function updateDomainAction(formData: FormData) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) return { error: 'Not authenticated' }

    const id = formData.get('id') as string
    if (!id) return { error: 'ID is required' }

    const domainData = {
        project_id: formData.get('project_id'),
        domain_name: formData.get('domain_name'),
        domain_registrar: formData.get('domain_registrar'),
        domain_purchase_date: formData.get('domain_purchase_date') || null,
        domain_expiry_date: formData.get('domain_expiry_date') || null,
        domain_cost: Number(formData.get('domain_cost')) || 0,
        hosting_provider: formData.get('hosting_provider'),
        hosting_plan: formData.get('hosting_plan'),
        hosting_purchase_date: formData.get('hosting_purchase_date') || null,
        hosting_expiry_date: formData.get('hosting_expiry_date') || null,
        hosting_cost: Number(formData.get('hosting_cost')) || 0,
        login_note: formData.get('login_note'),
    }

    const { error } = await supabase.from('domains_hosting').update(domainData).eq('id', id)

    if (error) return { error: error.message }

    revalidatePath('/dashboard/domains')
    return { success: true }
}
