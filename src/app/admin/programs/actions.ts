'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function createProgram(data: any) {
  const supabase = await createClient()
  const { error } = await supabase.from('programs').insert([data])
  if (error) throw error
  revalidatePath('/admin/programs')
}

export async function updateProgram(id: string, data: any) {
  const supabase = await createClient()
  const { error } = await supabase.from('programs').update(data).eq('id', id)
  if (error) throw error
  revalidatePath('/admin/programs')
}

export async function deleteProgram(id: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('programs').delete().eq('id', id)
  if (error) throw error
  revalidatePath('/admin/programs')
}

export async function createCourse(data: any) {
  const supabase = await createClient()
  const { error } = await supabase.from('courses').insert([data])
  if (error) throw error
  revalidatePath('/admin/programs')
}

export async function updateCourse(id: string, data: any) {
  const supabase = await createClient()
  const { error } = await supabase.from('courses').update(data).eq('id', id)
  if (error) throw error
  revalidatePath('/admin/programs')
}

export async function deleteCourse(id: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('courses').delete().eq('id', id)
  if (error) throw error
  revalidatePath('/admin/programs')
}
