'use server'

import { createClient } from '@/utils/supabase/server'

export async function submitLeadAction(formData: FormData) {
    const supabase = await createClient()

    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const phone = formData.get('phone') as string
    const service_interest = formData.get('service_interest') as string
    const message = formData.get('message') as string

    if (!name || !email) {
        return { error: 'Name and Email are required.' }
    }

    const { error } = await supabase
        .from('leads')
        .insert({
            name,
            email,
            phone,
            service_interest,
            message
        })

    if (error) {
        console.error('Lead submission error:', error)
        return { error: 'Failed to submit inquiry. Please try again.' }
    }

    return { success: true }
}
