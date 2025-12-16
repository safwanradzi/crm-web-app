
'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { Project } from '@/types'

export async function getProjects() {
    const supabase = await createClient()
    const { data, error } = await supabase
        .from('projects')
        .select(`
      *,
      clients (name)
    `)
        .order('created_at', { ascending: false })

    if (error) {
        console.error('Error fetching projects:', error)
        return []
    }

    return data as any[] // Using any for now to handle the join type
}

export async function createProjectAction(formData: FormData) {
    const supabase = await createClient()

    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
        return { error: 'Not authenticated' }
    }

    const name = formData.get('name') as string
    const clientId = formData.get('client_id') as string

    if (!name || !clientId) return { error: 'Name and Client are required' }

    const domain_purchase_date = formData.get('domain_purchase_date') as string
    const domain_expiry_date = formData.get('domain_expiry_date') as string
    const website_login_url = formData.get('website_login_url') as string
    const website_login_username = formData.get('website_login_username') as string
    const website_login_password = formData.get('website_login_password') as string

    const projectData = {
        owner_id: user.id,
        client_id: clientId,
        name,
        url: formData.get('url') as string,
        stack: formData.get('stack') as string,
        package_type: formData.get('package_type') as string,
        status: formData.get('status') as string || 'lead',
        base_price: Number(formData.get('base_price')) || 0,
        start_date: formData.get('start_date') ? formData.get('start_date') as string : null,
        launch_date: formData.get('launch_date') ? formData.get('launch_date') as string : null,
        domain_purchase_date: domain_purchase_date || null,
        domain_expiry_date: domain_expiry_date || null,
        website_login_url,
        website_login_username,
        website_login_password,
    }

    const { error } = await supabase.from('projects').insert(projectData)

    if (error) {
        return { error: error.message }
    }

    revalidatePath('/dashboard/projects')
    return { success: true }
}

export async function getProjectById(id: string) {
    const supabase = await createClient()
    const { data, error } = await supabase
        .from('projects')
        .select(`
        *,
        clients (name, email),
        invoices (*),
        expenses (*),
        addons (*),
        domains_hosting (*)
      `)
        .eq('id', id)
        .single()
    if (error) {
        console.error('Error fetching project by id:', error)
        return null
    }
    return data
}

export async function deleteProjectAction(id: string) {
    const supabase = await createClient()
    const { error } = await supabase.from('projects').delete().eq('id', id)
    if (error) return { error: error.message }
    revalidatePath('/dashboard/projects')
    return { success: true }
}

export async function updateProjectAction(formData: FormData) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) return { error: 'Not authenticated' }

    const id = formData.get('id') as string
    if (!id) return { error: 'ID is required' }

    const projectData = {
        client_id: formData.get('client_id'),
        name: formData.get('name'),
        url: formData.get('url'),
        stack: formData.get('stack'),
        package_type: formData.get('package_type'),
        status: formData.get('status'),
        base_price: Number(formData.get('base_price')) || 0,
        start_date: formData.get('start_date') || null,
        launch_date: formData.get('launch_date') || null,
    }

    const { error } = await supabase.from('projects').update(projectData).eq('id', id)

    if (error) return { error: error.message }

    revalidatePath('/dashboard/projects')
    revalidatePath(`/dashboard/projects/${id}`)
    return { success: true }
}
