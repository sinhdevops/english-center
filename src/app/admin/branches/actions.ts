'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function createBranch(data: any) {
  const supabase = await createClient()
  const { error } = await supabase.from('branches').insert([data])
  if (error) throw error
  revalidatePath('/admin/branches')
}

export async function updateBranch(id: string, data: any) {
  const supabase = await createClient()
  const { error } = await supabase.from('branches').update(data).eq('id', id)
  if (error) throw error
  revalidatePath('/admin/branches')
}

export async function deleteBranch(id: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('branches').delete().eq('id', id)
  if (error) throw error
  revalidatePath('/admin/branches')
}
