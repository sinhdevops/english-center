import type { Metadata } from 'next'
import { createClient } from '@/utils/supabase/server'
import { HomePageContent } from './_page-content'

export const metadata: Metadata = {
  title: 'STEMKey - Tư duy – Ngôn ngữ – Công nghệ',
  description:
    'Hệ thống giáo dục STEMKey phát triển toàn diện Tư duy – Ngôn ngữ – Công nghệ với phương pháp R.I.P.L độc quyền.',
  keywords: ['STEMKey', 'English Center', 'Robotics', 'Toán tư duy', 'Tiếng Anh cho bé'],
  openGraph: {
    title: 'STEMKey - Phát triển toàn diện cho trẻ',
    description: 'Khám phá lộ trình học tập hiện đại tại STEMKey.',
    images: ['/statics/images/hero-student.png'],
  },
}

export default async function HomePage() {
  const supabase = await createClient()

  const { data: newsItems } = await supabase
    .from('events')
    .select('*')
    .eq('category', 'Tin tức')
    .order('date', { ascending: false })
    .limit(6)

  const { data: testimonialItems } = await supabase
    .from('events')
    .select('*')
    .eq('category', 'Góc ba mẹ')
    .order('date', { ascending: false })
    .limit(9)

  const { data: banners } = await supabase
    .from('banners')
    .select('*')
    .eq('is_active', true)
    .order('display_order', { ascending: true })

  return (
    <HomePageContent
      banners={banners ?? []}
      testimonialItems={testimonialItems ?? []}
      newsItems={newsItems ?? []}
    />
  )
}
