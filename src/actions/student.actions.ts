'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { studentSchema } from '@/lib/validations/admin'

type ActionResult = { success: true } | { success: false; error: string }

export async function createStudent(data: unknown): Promise<ActionResult> {
  try {
    const parsed = studentSchema.safeParse(data)
    if (!parsed.success) {
      return { success: false, error: 'Dữ liệu không hợp lệ' }
    }

    const supabase = await createClient()
    const { error } = await supabase.from('students').insert([parsed.data])
    if (error) {
      console.error('[createStudent]', error)
      return { success: false, error: 'Thêm học viên thất bại' }
    }

    revalidatePath('/admin/students')
    return { success: true }
  } catch (err) {
    return { success: false, error: 'Lỗi hệ thống' }
  }
}

export async function updateStudent(id: string, data: unknown): Promise<ActionResult> {
  try {
    if (!id || typeof id !== 'string') return { success: false, error: 'ID không hợp lệ' }
    const parsed = studentSchema.safeParse(data)
    if (!parsed.success) {
      return { success: false, error: 'Dữ liệu không hợp lệ' }
    }

    const supabase = await createClient()
    const { error } = await supabase.from('students').update(parsed.data).eq('id', id)
    if (error) {
      console.error('[updateStudent]', error)
      return { success: false, error: 'Cập nhật học viên thất bại' }
    }

    revalidatePath('/admin/students')
    return { success: true }
  } catch (err) {
    return { success: false, error: 'Lỗi hệ thống' }
  }
}

export async function deleteStudent(id: string): Promise<ActionResult> {
  try {
    if (!id || typeof id !== 'string') return { success: false, error: 'ID không hợp lệ' }

    const supabase = await createClient()
    const { error } = await supabase.from('students').delete().eq('id', id)
    if (error) {
      console.error('[deleteStudent]', error)
      return { success: false, error: 'Xóa học viên thất bại' }
    }

    revalidatePath('/admin/students')
    return { success: true }
  } catch (err) {
    return { success: false, error: 'Lỗi hệ thống' }
  }
}
