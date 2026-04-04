import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import { KhoaHocPageContent } from './_page-content'
import { JsonLd } from '@/components/common/JsonLd'

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

  const jsonLd = mappedCourses.map(course => ({
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: course.title,
    description: course.description,
    provider: {
      '@type': 'EducationalOrganization',
      name: 'STEMKey',
      url: process.env.NEXT_PUBLIC_BASE_URL || 'https://stemkey.vn'
    }
  }))

  return (
    <>
      <JsonLd data={jsonLd} />
      <KhoaHocPageContent initialCourses={mappedCourses} />
    </>
  )
}
