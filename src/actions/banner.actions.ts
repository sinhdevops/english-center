'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function createBanner(data: any) {
  const supabase = await createClient()
  const { error } = await supabase.from('banners').insert([data])
  if (error) throw error  
  revalidatePath('/admin/banners')
}

export async function updateBanner(id: string, data: any) {
  const supabase = await createClient()
  const { error } = await supabase.from('banners').update(data).eq('id', id)
  if (error) throw error
  revalidatePath('/admin/banners')
}

export async function deleteBanner(id: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('banners').delete().eq('id', id)
  if (error) throw error
  revalidatePath('/admin/banners')
}
