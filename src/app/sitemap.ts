import type { MetadataRoute } from 'next'
import { createClient } from '@/lib/supabase/server'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://stemkey.vn'
  const supabase = await createClient()

  const { data: courses } = await supabase
    .from('courses')
    .select('id, created_at')

  const { data: quizSets } = await supabase
    .from('quiz_sets')
    .select('id, created_at')
    .eq('is_active', true)

  const courseUrls = (courses ?? []).map((c) => ({
    url: `${baseUrl}/khoa-hoc/${c.id}`,
    lastModified: new Date(c.created_at || new Date()),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  const quizUrls = (quizSets ?? []).map((q) => ({
    url: `${baseUrl}/bai-thi/${q.id}`,
    lastModified: new Date(q.created_at || new Date()),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/khoa-hoc`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/lich-khai-giang`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/kiem-tra-truc-tuyen`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    ...courseUrls,
    ...quizUrls,
  ]
}
