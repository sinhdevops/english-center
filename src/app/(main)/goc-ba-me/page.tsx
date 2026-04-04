import type { Metadata } from 'next'
import { createClient } from '@/utils/supabase/server'
import { GocBaMePageContent } from './_page-content'

export const metadata: Metadata = {
  title: 'Góc ba mẹ',
  description: 'Những thông tin hữu ích dành cho ba mẹ tại STEMKey.',
}

const ITEMS_PER_PAGE = 10

export default async function ParentsCornerPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>
}) {
  const params = await searchParams
  const currentPage = Number(params.page) || 1

  const from = (currentPage - 1) * ITEMS_PER_PAGE
  const to = from + ITEMS_PER_PAGE - 1

  const supabase = await createClient()

  const [{ data: events, count }, { data: videos }, { data: courses }] = await Promise.all([
    supabase
      .from('events')
      .select('*', { count: 'exact' })
      .eq('category', 'Góc ba mẹ')
      .neq('type', 'video')
      .order('date', { ascending: false })
      .range(from, to),

    supabase
      .from('events')
      .select('*')
      .eq('category', 'Góc ba mẹ')
      .eq('type', 'video')
      .order('date', { ascending: false })
      .limit(6),

    supabase
      .from('courses')
      .select('id, name, duration')
      .order('created_at', { ascending: true })
      .limit(20),
  ])

  const totalPages = Math.ceil((count ?? 0) / ITEMS_PER_PAGE)

  return (
    <GocBaMePageContent
      articleItems={events ?? []}
      videoItems={videos ?? []}
      courses={courses ?? []}
      totalPages={totalPages}
      currentPage={currentPage}
    />
  )
}
