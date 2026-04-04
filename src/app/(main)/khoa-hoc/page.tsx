import type { Metadata } from 'next'
import { createClient } from '@/utils/supabase/server'
import { KhoaHocPageContent } from './_page-content'

export const metadata: Metadata = {
  title: 'Khóa học',
  description: 'Khám phá các khóa học Toán tư duy, Tiếng Anh STEM, Robotics và Tiền tiểu học tại STEMKey.',
}

export default async function CoursesPage() {
  const supabase = await createClient()

  const { data } = await supabase
    .from('courses')
    .select('*')
    .order('created_at', { ascending: true })

  const mappedCourses = (data ?? []).map((p, index) => ({
    id: p.id,
    stt: index + 1,
    title: p.name,
    description:
      p.description ||
      'Khóa học chất lượng cao, giúp con khơi dậy niềm đam mê sáng tạo và tư duy toàn diện.',
    duration: p.duration || '6 tháng',
    schedule: p.schedule || 'Đang cập nhật',
  }))

  return <KhoaHocPageContent initialCourses={mappedCourses} />
}
