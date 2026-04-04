'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

type ActionResult = { success: true } | { success: false; error: string }

const updateStatusSchema = z.object({
  id: z.string().uuid('ID không hợp lệ'),
  status: z.enum(['pending', 'contacted', 'enrolled', 'cancelled'])
})

export async function updateRegistrationStatus(id: string, status: string): Promise<ActionResult> {
  try {
    const parsed = updateStatusSchema.safeParse({ id, status })
    if (!parsed.success) return { success: false, error: 'Dữ liệu không hợp lệ' }

    const supabase = await createClient()
    const { error } = await supabase.from('registrations').update({ status: parsed.data.status }).eq('id', parsed.data.id)
    if (error) {
      console.error('[updateRegistrationStatus]', error)
      return { success: false, error: 'Cập nhật trạng thái thất bại' }
    }

    revalidatePath('/admin/registrations')
    return { success: true }
  } catch (err) {
    return { success: false, error: 'Lỗi hệ thống' }
  }
}

export async function deleteRegistration(id: string): Promise<ActionResult> {
  try {
    if (!id || typeof id !== 'string') return { success: false, error: 'ID không hợp lệ' }

    const supabase = await createClient()
    const { error } = await supabase.from('registrations').delete().eq('id', id)
    if (error) {
      console.error('[deleteRegistration]', error)
      return { success: false, error: 'Xóa đăng ký thất bại' }
    }

    revalidatePath('/admin/registrations')
    return { success: true }
  } catch (err) {
    return { success: false, error: 'Lỗi hệ thống' }
  }
}
