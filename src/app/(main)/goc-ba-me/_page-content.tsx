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
  duration?: string
  [key: string]: unknown
}

interface GocBaMePageContentProps {
  articleItems: Event[]
  videoItems: Event[]
  courses: Course[]
  totalPages: number
  currentPage: number
}

export function GocBaMePageContent({
  articleItems,
  videoItems,
  courses,
  totalPages,
  currentPage,
}: GocBaMePageContentProps) {
  return (
    <div className="min-h-screen">
      <HeaderPage title="Góc ba mẹ" />
      <div className="mx-auto max-w-7xl px-4 py-10 lg:py-20 lg:px-0">
        {articleItems.length || videoItems.length ? (
          <>
            <NewsListWithSidebar
              newsTitle="TIN TỨC VỀ GÓC BA MẸ"
              videoItems={videoItems}
              articleItems={articleItems}
              courses={courses}
              detailBase="/tin-tuc"
              variant="parents-corner"
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
