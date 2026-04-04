'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { scheduleSchema } from '@/lib/validations/admin'

type ActionResult = { success: true } | { success: false; error: string }

export async function createSchedule(data: unknown): Promise<ActionResult> {
  try {
    const parsed = scheduleSchema.safeParse(data)
    if (!parsed.success) {
      return { success: false, error: 'Dữ liệu không hợp lệ' }
    }

    const supabase = await createClient()
    const { error } = await supabase.from('schedules').insert([parsed.data])
    if (error) {
      console.error('[createSchedule]', error)
      return { success: false, error: 'Thêm lịch học thất bại' }
    }

    revalidatePath('/admin/schedules')
    return { success: true }
  } catch (err) {
    return { success: false, error: 'Lỗi hệ thống' }
  }
}

export async function updateSchedule(id: string, data: unknown): Promise<ActionResult> {
  try {
    if (!id || typeof id !== 'string') return { success: false, error: 'ID không hợp lệ' }
    const parsed = scheduleSchema.safeParse(data)
    if (!parsed.success) {
      return { success: false, error: 'Dữ liệu không hợp lệ' }
    }

    const supabase = await createClient()
    const { error } = await supabase.from('schedules').update(parsed.data).eq('id', id)
    if (error) {
      console.error('[updateSchedule]', error)
      return { success: false, error: 'Cập nhật lịch học thất bại' }
    }

    revalidatePath('/admin/schedules')
    return { success: true }
  } catch (err) {
    return { success: false, error: 'Lỗi hệ thống' }
  }
}

export async function deleteSchedule(id: string): Promise<ActionResult> {
  try {
    if (!id || typeof id !== 'string') return { success: false, error: 'ID không hợp lệ' }

    const supabase = await createClient()
    const { error } = await supabase.from('schedules').delete().eq('id', id)
    if (error) {
      console.error('[deleteSchedule]', error)
      return { success: false, error: 'Xóa lịch học thất bại' }
    }

    revalidatePath('/admin/schedules')
    return { success: true }
  } catch (err) {
    return { success: false, error: 'Lỗi hệ thống' }
  }
}
