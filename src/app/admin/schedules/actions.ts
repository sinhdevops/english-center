'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function createSchedule(data: any) {
  const supabase = await createClient()
  const { error } = await supabase.from('schedules').insert([data])
  if (error) throw error
  revalidatePath('/admin/schedules')
}

export async function updateSchedule(id: string, data: any) {
  const supabase = await createClient()
  const { error } = await supabase.from('schedules').update(data).eq('id', id)
  if (error) throw error
  revalidatePath('/admin/schedules')
}

export async function deleteSchedule(id: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('schedules').delete().eq('id', id)
  if (error) throw error
  revalidatePath('/admin/schedules')
}
