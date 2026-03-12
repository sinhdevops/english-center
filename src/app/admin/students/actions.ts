'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function createStudent(data: any) {
  const supabase = await createClient()
  const { error } = await supabase.from('students').insert([data])
  if (error) throw error
  revalidatePath('/admin/students')
}

export async function updateStudent(id: string, data: any) {
  const supabase = await createClient()
  const { error } = await supabase.from('students').update(data).eq('id', id)
  if (error) throw error
  revalidatePath('/admin/students')
}

export async function deleteStudent(id: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('students').delete().eq('id', id)
  if (error) throw error
  revalidatePath('/admin/students')
}
