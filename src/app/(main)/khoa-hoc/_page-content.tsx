'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { IMAGES } from '../../../../public/statics/images'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const ITEMS_PER_PAGE = 10

interface Course {
  id: number
  stt: number
  title: string
  description: string
  duration: string
  schedule: string
}

interface KhoaHocPageContentProps {
  initialCourses: Course[]
}

export function KhoaHocPageContent({ initialCourses }: KhoaHocPageContentProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  const filteredCourses = initialCourses.filter(
    (course) =>
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const totalPages = Math.max(1, Math.ceil(filteredCourses.length / ITEMS_PER_PAGE))
  const safePage = Math.min(currentPage, totalPages)
  const paginatedCourses = filteredCourses.slice(
    (safePage - 1) * ITEMS_PER_PAGE,
    safePage * ITEMS_PER_PAGE,
  )

  function handleSearch(value: string): void {
    setSearchTerm(value)
    setCurrentPage(1)
  }

  function getPageNumbers(): (number | '...')[] {
    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1)
    if (safePage <= 4) return [1, 2, 3, 4, 5, '...', totalPages]
    if (safePage >= totalPages - 3) return [1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages]
    return [1, '...', safePage - 1, safePage, safePage + 1, '...', totalPages]
  }

  return (
    <div
      className="min-h-screen pb-10"
      style={{
        background:
          'linear-gradient(180deg, #15B248 0%, rgba(71, 255, 131, 0.5) 50%, rgba(21, 178, 72, 0) 100%)',
      }}
    >
      {/* Section 1 — Chương trình học banner */}
      <section className="w-full">
        <Image
          src={IMAGES.courser1}
          alt="Chương trình học STEMKey"
          className="w-full object-contain"
          priority
        />
      </section>

      {/* Section 2 — Bảng khóa học từ API */}
      <section className="mx-auto max-w-7xl px-4 py-12 lg:px-0">
        <h2 className="mb-6 text-center text-2xl font-bold uppercase tracking-wide text-gray-900">
          TOÁN TƯ DUY, TIẾNG ANH STEM, ROBOTICS, TIỀN TIỂU HỌC
        </h2>

        {/* Search */}
        <div className="mb-6 flex items-center justify-between gap-4">
          <input
            type="text"
            placeholder="Tìm kiếm khóa học..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full max-w-sm rounded-full border border-gray-300 bg-white/80 px-5 py-2.5 text-sm shadow-sm backdrop-blur transition-all focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
          />
          <p className="shrink-0 text-sm text-gray-500">
            {filteredCourses.length} khóa học
          </p>
        </div>

        {/* Mobile — cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:hidden">
          {paginatedCourses.length === 0 && (
            <p className="col-span-full py-10 text-center text-gray-700">Không tìm thấy khóa học nào.</p>
          )}
          {paginatedCourses.map((course) => (
            <div key={course.id} className="group relative overflow-hidden rounded-2xl border border-green-100 bg-white p-5 shadow-sm transition-all hover:shadow-md">
              <div className="mb-3 flex items-start gap-3">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-green-100 text-sm font-bold text-green-700">
                  {course.stt}
                </span>
                <h3 className="font-bold leading-tight text-gray-900">{course.title}</h3>
              </div>
              <p className="mb-4 line-clamp-3 text-sm leading-relaxed text-gray-600">{course.description}</p>
              <div className="mb-5 space-y-2 rounded-xl bg-gray-50 p-3 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <span className="text-xl">⏱</span>
                  <span className="font-medium text-gray-800">{course.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xl">📅</span>
                  <span className="font-medium text-gray-800">{course.schedule}</span>
                </div>
              </div>
              <Link href="khoa-hoc/dang-ky">
                <Button className="w-full rounded-xl bg-green-600 hover:bg-green-700">
                  Đăng ký ngay
                </Button>
              </Link>
            </div>
          ))}
        </div>

        {/* Desktop — table */}
        <div className="hidden overflow-hidden rounded-2xl border border-gray-200 bg-white md:block">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-100">
                <th className="w-[10%] px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-500">STT</th>
                <th className="w-[20%] px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-500">Tên Khóa Học</th>
                <th className="w-[35%] px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-500">Chi Tiết</th>
                <th className="w-[10%] px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-500">Thời Gian</th>
                <th className="w-[10%] px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-500">Suất Học</th>
                <th className="w-[15%] px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-500">Đăng Ký</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {paginatedCourses.map((course) => (
                <tr key={course.id} className="bg-white transition-colors hover:bg-green-50/50">
                  <td className="px-5 py-5 text-gray-500">{course.stt}</td>
                  <td className="px-5 py-5 text-base font-bold text-gray-900">{course.title}</td>
                  <td className="max-w-60 px-5 py-5 text-gray-600">
                    <p className="line-clamp-2">{course.description}</p>
                  </td>
                  <td className="px-5 py-5 font-medium text-gray-600">{course.duration}</td>
                  <td className="px-5 py-5 text-gray-600">{course.schedule}</td>
                  <td className="px-5 py-5">
                    <Link href="khoa-hoc/dang-ky">
                      <Button className="bg-green-600 hover:bg-green-700" size="sm">Đăng ký</Button>
                    </Link>
                  </td>
                </tr>
              ))}
              {paginatedCourses.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-16 text-center text-base text-gray-500">
                    Không tìm thấy khóa học nào phù hợp.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-6 flex items-center justify-between gap-2">
            <p className="text-sm text-gray-500">
              Trang {safePage} / {totalPages}
            </p>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={safePage === 1}
                aria-label="Trang trước"
                className="flex size-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-600 transition-colors hover:border-green-500 hover:text-green-600 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronLeft size={16} />
              </button>

              {getPageNumbers().map((page, idx) =>
                page === '...' ? (
                  <span key={`ellipsis-${idx}`} className="flex size-9 items-center justify-center text-sm text-gray-400">
                    …
                  </span>
                ) : (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={cn(
                      'flex size-9 items-center justify-center rounded-lg border text-sm font-medium transition-colors',
                      safePage === page
                        ? 'border-green-500 bg-green-600 text-white'
                        : 'border-gray-200 bg-white text-gray-600 hover:border-green-500 hover:text-green-600',
                    )}
                  >
                    {page}
                  </button>
                ),
              )}

              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={safePage === totalPages}
                aria-label="Trang sau"
                className="flex size-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-600 transition-colors hover:border-green-500 hover:text-green-600 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </section>

      {/* Section 3 — Cam kết chuẩn đầu ra */}
      <section className="w-full">
        <Image
          src={IMAGES.courser2}
          alt="Cam kết chuẩn đầu ra theo từng trình độ"
          className="w-full object-contain"
        />
      </section>
    </div>
  )
}
