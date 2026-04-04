import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import { TinTucPageContent } from './_page-content'

export const metadata: Metadata = {
  title: 'Tin tức',
  description: 'Cập nhật những tin tức mới nhất về giáo dục, Robotics và các sự kiện tại STEMKey.',
}

const ITEMS_PER_PAGE = 10

export default async function NewsPage({
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
      .eq('category', 'Tin tức')
      .neq('type', 'video')
      .order('date', { ascending: false })
      .range(from, to),

    supabase
      .from('courses')
      .select('id, name, description')
      .order('created_at', { ascending: true })
      .limit(20),
  ])

  const totalPages = Math.ceil((count ?? 0) / ITEMS_PER_PAGE)

  return (
    <TinTucPageContent
      articleItems={events ?? []}
      videoItems={[]}
      courses={courses ?? []}
      totalPages={totalPages}
      currentPage={currentPage}
    />
  )
}
