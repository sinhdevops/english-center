import type { Metadata } from 'next'
import { createClient } from '@/utils/supabase/server'
import { GocHocTapPageContent } from './_page-content'

export const metadata: Metadata = {
  title: 'Góc học tập',
  description: 'Tài liệu và bài viết hữu ích dành cho học viên tại STEMKey.',
}

const ITEMS_PER_PAGE = 10

export default async function LearningCornerPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>
}) {
  const params = await searchParams
  const currentPage = Number(params.page) || 1

  const from = (currentPage - 1) * ITEMS_PER_PAGE
  const to = from + ITEMS_PER_PAGE - 1

  const supabase = await createClient()

  const [{ data: events, count }, { data: courses }] = await Promise.all([
    supabase
      .from('events')
      .select('*', { count: 'exact' })
      .eq('category', 'Góc học tập')
      .neq('type', 'video')
      .order('date', { ascending: false })
      .range(from, to),

    supabase
      .from('courses')
      .select('id, name, duration')
      .order('created_at', { ascending: true })
      .limit(20),
  ])

  const totalPages = Math.ceil((count ?? 0) / ITEMS_PER_PAGE)

  return (
    <GocHocTapPageContent
      articleItems={events ?? []}
      courses={courses ?? []}
      totalPages={totalPages}
      currentPage={currentPage}
    />
  )
}
