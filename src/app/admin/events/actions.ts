'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function createEvent(data: any) {
  const supabase = await createClient()
  const { error } = await supabase.from('events').insert([data])
  if (error) throw error
  revalidatePath('/admin/events')
}

export async function updateEvent(id: string, data: any) {
  const supabase = await createClient()
  const { error } = await supabase.from('events').update(data).eq('id', id)
  if (error) throw error
  revalidatePath('/admin/events')
}

export async function deleteEvent(id: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('events').delete().eq('id', id)
  if (error) throw error
  revalidatePath('/admin/events')
}
