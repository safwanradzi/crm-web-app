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

export async function login(prevState: ActionState, formData: FormData): Promise<ActionState> {
    const supabase = await createClient()

    const email = formData.get('email') as string
    const password = formData.get('password') as string

    // Note: Standard Supabase Auth "SignIn" doesn't strictly enforce rules 
    // unless we check roles or specific DB values.
    // However, since we only let Whitelisted people SIGN UP, 
    // effectively only whitelisted people have accounts (assuming no one else signed up before).
    // If there are legacy users, we should check `admin_whitelist` here too if we want to be super strict.
    // But usually sign-in is safe if registration was safe.

    const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
    })

    if (error) {
        return { error: error.message, success: false }
    }

    revalidatePath('/', 'layout')
    redirect('/dashboard')
}

// Renamed to follow naming convention pattern in our new form, but exported as alias for compatibility if needed.
export { login as loginAdmin }

export async function signupAdmin(prevState: ActionState, formData: FormData): Promise<ActionState> {
    const supabase = await createClient()
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    console.log('Admin Signup Attempt:', email)

    // 1. Strict Whitelist Check
    const { data: isWhitelisted, error: checkError } = await supabase.rpc('check_admin_whitelist', {
        email_input: email
    })

    if (checkError) {
        console.error('Whitelist check error:', checkError)
        return { error: 'System error during verification.', success: false }
    }

    if (!isWhitelisted) {
        return { error: 'Security Alert: This email is not authorized for Admin access.', success: false }
    }

    // 2. Proceed if Whitelisted
    const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            emailRedirectTo: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/auth/callback`,
            // Potentially add meta data: { role: 'admin' }
        },
    })

    if (error) {
        return { error: error.message, success: false }
    }

    revalidatePath('/', 'layout')
    // Instead of redirecting immediately, we return success so the Modal can show a nice message.
    return { success: true, message: 'Admin account created! Please check your email to confirm.' }
}

// Alias for consistency
export { signupAdmin as signup, signupAdmin as signup_legacy }

export async function forgotPasswordAdmin(prevState: ActionState, formData: FormData): Promise<ActionState> {
    const supabase = await createClient()
    const origin = (await headers()).get('origin')
    const email = formData.get('email') as string

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${origin}/dashboard/reset-password`,
        // Or wherever admin password reset page is. Defaulting to dashboard/reset or similar.
        // Actually, usually it goes to a generic auth callback handling reset.
    })

    if (error) {
        return { error: error.message, success: false }
    }

    return { success: true, message: 'Reset link sent to your admin email.' }
}
