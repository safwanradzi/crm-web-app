'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function getPortfolios(page: number = 1, limit: number = 10) {
    const supabase = await createClient()
    const offset = (page - 1) * limit

    const { data, count, error } = await supabase
        .from('portfolios')
        .select('*', { count: 'exact' })
        .order('sort_order', { ascending: true })
        .order('created_at', { ascending: false })
        .range(offset, offset + limit - 1)

    if (error) {
        console.error('Error fetching portfolios:', error)
        return { data: [], totalCount: 0 }
    }

    return { data: data as any[], totalCount: count || 0 }
}

export async function createPortfolioAction(formData: FormData) {
    console.log('createPortfolioAction started')
    const supabase = await createClient()

    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
        console.log('User not authenticated')
        return { error: 'Not authenticated' }
    }

    const title = formData.get('title') as string
    const category = formData.get('category') as string
    const description = formData.get('description') as string
    const live_url = formData.get('live_url') as string
    const imageFile = formData.get('image') as File

    let image_url = ''

    // Handle Image Upload
    if (imageFile && imageFile.size > 0) {
        console.log('Uploading image...', imageFile.name, imageFile.size)
        const fileExt = imageFile.name.split('.').pop()
        const fileName = `${Date.now()}.${fileExt}`
        const filePath = `${user.id}/${fileName}`

        const { error: uploadError } = await supabase.storage
            .from('portfolio')
            .upload(filePath, imageFile)

        if (uploadError) {
            console.error('Upload error:', uploadError)
            return { error: 'Image upload failed: ' + uploadError.message }
        }
        console.log('Image uploaded successfully')

        const { data: { publicUrl } } = supabase.storage
            .from('portfolio')
            .getPublicUrl(filePath)

        image_url = publicUrl
    }

    console.log('Inserting into database...')
    const { error } = await supabase
        .from('portfolios')
        .insert({
            owner_id: user.id,
            title,
            category,
            description,
            live_url,
            image_url,
        })

    if (error) {
        console.error('Database insert error:', error)
        return { error: error.message }
    }

    console.log('Portfolio item created')
    revalidatePath('/dashboard/portfolios')
    return { success: true }
}

export async function updatePortfolioAction(id: string, formData: FormData) {
    const supabase = await createClient()

    const title = formData.get('title') as string
    const category = formData.get('category') as string
    const description = formData.get('description') as string
    const live_url = formData.get('live_url') as string
    const imageFile = formData.get('image') as File

    const updates: any = {
        title,
        category,
        description,
        live_url,
    }

    // Handle Image Upload if new file provided
    if (imageFile && imageFile.size > 0) {
        const {
            data: { user },
        } = await supabase.auth.getUser()

        if (user) {
            const fileExt = imageFile.name.split('.').pop()
            const fileName = `${Date.now()}.${fileExt}`
            const filePath = `${user.id}/${fileName}`

            const { error: uploadError } = await supabase.storage
                .from('portfolio')
                .upload(filePath, imageFile)

            if (!uploadError) {
                const { data: { publicUrl } } = supabase.storage
                    .from('portfolio')
                    .getPublicUrl(filePath)
                updates.image_url = publicUrl
            }
        }
    }

    const { error } = await supabase
        .from('portfolios')
        .update(updates)
        .eq('id', id)

    if (error) {
        return { error: error.message }
    }

    revalidatePath('/dashboard/portfolios')
    return { success: true }
}

export async function deletePortfolioAction(id: string) {
    const supabase = await createClient()
    const { error } = await supabase.from('portfolios').delete().eq('id', id)

    if (error) {
        return { error: error.message }
    }

    revalidatePath('/dashboard/portfolios')
    return { success: true }
}
