import type { Metadata } from 'next'
import { createClient } from '@/utils/supabase/server'
import { LichKhaiGiangPageContent } from './_page-content'

export const metadata: Metadata = {
  title: 'Lịch khai giảng',
  description: 'Xem lịch khai giảng các khóa học tại STEMKey. Đăng ký giữ chỗ sớm để nhận ưu đãi lên đến 40%.',
}

export default async function LichKhaiGiangPage() {
  const supabase = await createClient()

  const { data: branches } = await supabase.from('branches').select('*')
  const { data: schedules } = await supabase
    .from('schedules')
    .select(
      `
      *,
      course:courses(
        name,
        program:programs(name)
      )
    `,
    )
    .eq('status', 'open')
    .order('start_date', { ascending: true })

  return (
    <LichKhaiGiangPageContent
      initialBranches={branches ?? []}
      initialSchedules={schedules ?? []}
    />
  )
}
