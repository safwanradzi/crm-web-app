
'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { Client } from '@/types'

export async function getClients() {
    const supabase = await createClient()
    const { data, error } = await supabase
        .from('clients')
        .select('*')
        .order('created_at', { ascending: false })

    if (error) {
        console.error('Error fetching clients:', error)
        return []
    }

    return data as Client[]
}

export async function createClientAction(formData: FormData) {
    const supabase = await createClient()

    const name = formData.get('name') as string
    if (!name) return { error: 'Name is required' }

    const clientData = {
        name,
        company_name: formData.get('company_name') as string,
        email: formData.get('email') as string,
        phone: formData.get('phone') as string,
        address: formData.get('address') as string,
        status: formData.get('status') as string || 'active',
        notes: formData.get('notes') as string,
    }

    // we rely on RLS to set owner_id automatically via default or trigger? 
    // Wait, RLS policies check auth.uid(), but we usually need to insert it or let postgres default handle it if set up.
    // In the schema I wrote: `owner_id uuid references auth.users not null`. 
    // It does NOT have a default value in the schema I provided in schema_phase2.sql.
    // However, I did define: `create policy "Users can insert own clients" on clients for insert with check (auth.uid() = owner_id);`
    // This means I MUST provide the owner_id in the insert, OR I need a trigger to set it. 
    // A safer way without trigger is to just get the user.

    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
        return { error: 'Not authenticated' }
    }

    const { error } = await supabase.from('clients').insert({
        ...clientData,
        owner_id: user.id
    })

    if (error) {
        return { error: error.message }
    }

    revalidatePath('/dashboard/clients')
    return { success: true }
}

export async function updateClientAction(clientId: string, formData: FormData) {
    const supabase = await createClient()

    const name = formData.get('name') as string
    if (!name) return { error: 'Name is required' }

    const clientData = {
        name,
        company_name: formData.get('company_name') as string,
        email: formData.get('email') as string,
        phone: formData.get('phone') as string,
        address: formData.get('address') as string,
        status: formData.get('status') as string,
        notes: formData.get('notes') as string,
    }

    // RLS policy "Users can update own clients" using (auth.uid() = owner_id) handles security.
    const { error } = await supabase.from('clients').update(clientData).eq('id', clientId)

    if (error) {
        return { error: error.message }
    }

    revalidatePath('/dashboard/clients')
    return { success: true }
}

export async function deleteClientAction(clientId: string) {
    const supabase = await createClient()
    const { error } = await supabase.from('clients').delete().eq('id', clientId)

    if (error) {
        console.error('Delete client error:', error)
        return { error: error.message }
    }

    revalidatePath('/dashboard/clients')
    return { success: true }
}

export async function getClientById(id: string) {
    console.log('Fetching client with id:', id)
    const supabase = await createClient()
    const { data, error } = await supabase
        .from('clients')
        .select(`
        *,
        projects (*)
      `)
        .eq('id', id)
        .single()

    if (error) {
        console.error('Error fetching client by id:', error)
        return null
    }

    return data
}
