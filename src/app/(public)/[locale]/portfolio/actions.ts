'use server'

import { createClient } from '@/utils/supabase/server'

export async function getPublicPortfolios() {
    const supabase = await createClient()
    const { data, error } = await supabase
        .from('portfolios')
        .select('*')
        .order('sort_order', { ascending: true })
        .order('created_at', { ascending: false })

    if (error) {
        console.error('Error fetching public portfolios:', error)
        return []
    }

    return data
}
