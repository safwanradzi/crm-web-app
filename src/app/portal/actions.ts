'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { headers } from 'next/headers'
import { createClient } from '@/utils/supabase/server'

export type ActionState = {
    error?: string
    message?: string
    success?: boolean
}

export async function loginClient(prevState: ActionState, formData: FormData): Promise<ActionState> {
    const supabase = await createClient()

    const email = formData.get('email') as string
    const password = formData.get('password') as string

    const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
    })

    if (error) {
        return { error: error.message, success: false }
    }

    revalidatePath('/portal', 'layout')
    redirect('/portal')
    // Unreachable due to redirect, but satisfies return type for TS analysis if redirect is mocked
}

export async function signupClient(prevState: ActionState, formData: FormData): Promise<ActionState> {
    const supabase = await createClient()
    const origin = (await headers()).get('origin')

    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const name = formData.get('name') as string
    const phone = formData.get('phone') as string

    console.log('Attempting signup checking for:', email)

    // 1. Check if invited (Security Definer RPC)
    const { data: isInvited, error: checkError } = await supabase.rpc('check_client_invite', {
        email_input: email
    })

    if (checkError) {
        console.error('Check invite error:', checkError)
        return { error: 'System error during verification.', success: false }
    }

    if (!isInvited) {
        return { error: 'Access Denied: This email has not been registered by the admin. Please contact support.', success: false }
    }

    // 2. Sign Up
    const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                full_name: name,
                phone: phone,
            },
            emailRedirectTo: `${origin}/auth/callback?next=/portal`,
        },
    })

    if (authError) {
        console.error('Signup error:', authError)
        return { error: authError.message, success: false }
    }

    if (authData.user) {
        // 3. Claim Profile (Logic handled by trigger or manual update if possible)
        // For now, we assume success if signup works.
    }

    console.log('Signup successful')
    return { success: true, message: 'Account created! Please check your email to confirm.' }
}

export async function forgotPasswordClient(prevState: ActionState, formData: FormData): Promise<ActionState> {
    const supabase = await createClient()
    const origin = (await headers()).get('origin')
    const email = formData.get('email') as string

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${origin}/portal/reset-password`,
    })

    if (error) {
        return { error: error.message, success: false }
    }

    return { success: true, message: 'Password reset link sent to your email.' }
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
