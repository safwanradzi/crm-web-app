'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { headers } from 'next/headers'
import { createClient } from '@/utils/supabase/server'

export async function loginClient(formData: FormData) {
    const supabase = await createClient()

    const email = formData.get('email') as string
    const password = formData.get('password') as string

    const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
    })

    if (error) {
        redirect('/portal/login?error=' + encodeURIComponent(error.message))
    }

    revalidatePath('/portal', 'layout')
    redirect('/portal')
}

export async function signupClient(formData: FormData) {
    const supabase = await createClient()
    const origin = (await headers()).get('origin')

    const email = formData.get('email') as string
    const password = formData.get('password') as string

    console.log('Attempting signup for:', email)
    const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            emailRedirectTo: `${origin}/auth/callback?next=/portal`,
        },
    })

    if (error) {
        console.error('Signup error:', error)
        redirect('/portal/login?error=' + encodeURIComponent(error.message))
    }

    console.log('Signup successful, redirecting with message')
    revalidatePath('/portal', 'layout')
    redirect('/portal/login?message=Check email to continue sign in process')
}

export async function signOutClient() {
    const supabase = await createClient()
    await supabase.auth.signOut()
    redirect('/portal/login')
}

// Data Fetching

export async function getClientProjects() {
    const supabase = await createClient()
    const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false })

    if (error) {
        console.error('Error fetching client projects:', error)
        return []
    }
    return data
}

export async function getClientInvoices() {
    const supabase = await createClient()
    const { data, error } = await supabase
        .from('invoices')
        .select('*, projects(name)')
        .order('created_at', { ascending: false })

    if (error) {
        console.error('Error fetching client invoices:', error)
        return []
    }
    return data
}

export async function getClientDomains() {
    const supabase = await createClient()
    const { data, error } = await supabase
        .from('domains_hosting')
        .select('*, projects(name)')
        .order('created_at', { ascending: false })

    if (error) {
        console.error('Error fetching client domains:', error)
        return []
    }
    return data
}
