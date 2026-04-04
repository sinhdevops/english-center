import { Newspaper } from 'lucide-react'
import { Pagination } from '@/components/ui/pagination'
import NewsListWithSidebar from '@/components/pages/news/NewsListWithSidebar'
import HeaderPage from '@/components/common/HeaderPage'

interface Event {
  id: string
  title: string
  image_url?: string
  date: string
  category: string
  [key: string]: unknown
}

interface Course {
  id: string
  name: string
  description?: string
  [key: string]: unknown
}

interface TinTucPageContentProps {
  articleItems: Event[]
  videoItems: Event[]
  courses: Course[]
  totalPages: number
  currentPage: number
}

export function TinTucPageContent({
  articleItems,
  videoItems,
  courses,
  totalPages,
  currentPage,
}: TinTucPageContentProps) {
  return (
    <div className="min-h-screen">
      <HeaderPage title="TIN TỨC" />

      <div className="mx-auto max-w-7xl px-4 py-10 lg:py-20 lg:px-0">
        {articleItems.length || videoItems.length ? (
          <>
            <NewsListWithSidebar
              newsTitle="TIN TỨC"
              videoItems={videoItems}
              articleItems={articleItems}
              courses={courses}
              detailBase="/tin-tuc"
              variant="news"
            />
            <Pagination totalPages={totalPages} currentPage={currentPage} />
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <Newspaper size={48} className="mb-4 text-slate-200" />
            <p className="text-lg font-semibold text-slate-400">Hiện tại chưa có bài viết.</p>
          </div>
        )}
      </div>
    </div>
  )
}
