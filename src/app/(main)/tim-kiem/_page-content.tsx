'use client'

import React, { useEffect, useState, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Breadcrumb } from '@/components/ui/breadcrumb'
import { motion, AnimatePresence } from 'motion/react'
import { Search, BookOpen, Calendar, ChevronRight, Loader2, X } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

interface SearchResult {
  id: string
  title: string
  description: string
  type: 'program' | 'course' | 'event'
  image_url?: string
  date?: string
}

type FilterType = 'all' | 'program' | 'course' | 'event'

const TYPE_LABELS: Record<string, string> = {
  all: 'Tất cả',
  program: 'Chương trình',
  course: 'Khóa học',
  event: 'Tin tức',
}

const TYPE_COLORS: Record<string, string> = {
  program: 'bg-emerald-500',
  course: 'bg-amber-500',
  event: 'bg-stem-blue',
}

function SearchResults() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const query = searchParams.get('q') || ''

  const [results, setResults] = useState<SearchResult[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchInput, setSearchInput] = useState(query)
  const [activeFilter, setActiveFilter] = useState<FilterType>('all')

  useEffect(() => {
    setSearchInput(query)
  }, [query])

  useEffect(() => {
    const performSearch = async () => {
      if (!query.trim()) {
        setResults([])
        setIsLoading(false)
        return
      }

      setIsLoading(true)
      try {
        const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`)
        const data = await response.json()
        if (data.results) setResults(data.results)
      } catch {
        // search failed silently
      } finally {
        setIsLoading(false)
      }
    }

    performSearch()
  }, [query])

  const handleSearch = () => {
    if (searchInput.trim()) {
      router.push(`/tim-kiem?q=${encodeURIComponent(searchInput.trim())}`)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSearch()
  }

  const filtered = activeFilter === 'all' ? results : results.filter((r) => r.type === activeFilter)

  const counts: Record<FilterType, number> = {
    all: results.length,
    program: results.filter((r) => r.type === 'program').length,
    course: results.filter((r) => r.type === 'course').length,
    event: results.filter((r) => r.type === 'event').length,
  }

  const getHref = (result: SearchResult) => {
    if (result.type === 'event') return `/tin-tuc/${result.id}`
    return `/khoa-hoc`
  }

  return (
    <div className="min-h-screen">
      {/* Banner */}
      <section className="relative overflow-hidden bg-[#001D44] py-12 lg:py-16">
        <div className="absolute inset-0 opacity-5">
          <svg viewBox="0 0 800 200" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
            <circle cx="700" cy="100" r="200" fill="#fff" />
            <circle cx="100" cy="150" r="120" fill="#fff" />
          </svg>
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4">
          <div className="mb-4">
            <Breadcrumb
              items={[{ label: 'Trang chủ', href: '/' }, { label: 'Tìm kiếm', active: true }]}
              variant="light"
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 text-center"
          >
            <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm text-white/70">
              <Search size={14} />
              Kết quả tìm kiếm
            </div>
            {query && (
              <h1 className="mt-3 text-2xl font-black text-white lg:text-4xl">
                &ldquo;<span className="text-[#FBB03B]">{query}</span>&rdquo;
              </h1>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mx-auto max-w-2xl"
          >
            <div className="relative flex items-center overflow-hidden rounded-2xl bg-white shadow-xl">
              <Search size={18} className="ml-5 shrink-0 text-slate-400" />
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Tìm kiếm chương trình, khóa học, tin tức..."
                className="flex-1 px-4 py-4 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none"
              />
              {searchInput && (
                <button
                  onClick={() => setSearchInput('')}
                  className="p-2 text-slate-400 hover:text-slate-600"
                >
                  <X size={16} />
                </button>
              )}
              <button
                onClick={handleSearch}
                className="m-1.5 rounded-xl bg-[#ED1C24] px-6 py-2.5 text-sm font-bold text-white transition-opacity hover:opacity-90"
              >
                Tìm
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-8">
        {!isLoading && query && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <p className="text-sm text-slate-500">
              Tìm thấy <span className="font-bold text-slate-900">{results.length}</span> kết quả
            </p>

            <div className="scrollbar-hide flex gap-2 overflow-x-auto pb-1">
              {(['all', 'program', 'course', 'event'] as FilterType[]).map((type) => (
                <button
                  key={type}
                  onClick={() => setActiveFilter(type)}
                  className={`shrink-0 rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
                    activeFilter === type
                      ? 'bg-[#001D44] text-white'
                      : 'border border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                  }`}
                >
                  {TYPE_LABELS[type]}
                  {counts[type] > 0 && (
                    <span
                      className={`ml-1.5 rounded-full px-1.5 py-0.5 text-[10px] font-bold ${
                        activeFilter === type
                          ? 'bg-white/20 text-white'
                          : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      {counts[type]}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {isLoading ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="overflow-hidden rounded-2xl bg-white">
                <div className="aspect-video animate-pulse bg-slate-100" />
                <div className="space-y-3 p-5">
                  <div className="h-3 w-1/3 animate-pulse rounded bg-slate-100" />
                  <div className="h-5 w-4/5 animate-pulse rounded bg-slate-100" />
                  <div className="h-3 w-full animate-pulse rounded bg-slate-100" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <AnimatePresence mode="popLayout">
            {filtered.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                {filtered.map((result, idx) => (
                  <motion.div
                    key={`${result.type}-${result.id}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <Link href={getHref(result)} className="group block">
                      <div className="h-full overflow-hidden rounded-2xl border border-slate-100 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                        <div className="relative aspect-video overflow-hidden bg-slate-100">
                          <Image
                            src={
                              result.image_url ||
                              'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=800'
                            }
                            alt={result.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                          <div className="absolute top-3 left-3">
                            <span
                              className={`rounded-xl px-3 py-1 text-[10px] font-black tracking-widest text-white uppercase ${TYPE_COLORS[result.type]}`}
                            >
                              {TYPE_LABELS[result.type]}
                            </span>
                          </div>
                        </div>

                        <div className="p-5">
                          <div className="mb-2 flex items-center gap-1.5 text-xs text-slate-400">
                            {result.type === 'event' ? (
                              <>
                                <Calendar size={12} />
                                <span>{new Date(result.date!).toLocaleDateString('vi-VN')}</span>
                              </>
                            ) : (
                              <>
                                <BookOpen size={12} />
                                <span>STEMKey Education</span>
                              </>
                            )}
                          </div>

                          <h3 className="group-hover:text-stem-blue mb-2 line-clamp-1 font-bold text-slate-900 transition-colors">
                            {result.title}
                          </h3>

                          <p className="mb-4 line-clamp-1 text-sm leading-relaxed text-slate-500">
                            {result.description}
                          </p>

                          <div className="flex items-center gap-1 text-sm font-bold text-[#ED1C24]">
                            Xem chi tiết
                            <ChevronRight
                              size={14}
                              className="transition-transform group-hover:translate-x-0.5"
                            />
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-24 text-center"
              >
                <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-slate-100 text-slate-300">
                  <Search size={40} strokeWidth={1.5} />
                </div>
                <h2 className="mb-2 text-xl font-bold text-slate-800">
                  {query ? 'Không tìm thấy kết quả' : 'Nhập từ khóa để tìm kiếm'}
                </h2>
                <p className="max-w-sm text-sm text-slate-500">
                  {query
                    ? `Không có nội dung nào khớp với "${query}". Hãy thử từ khóa khác.`
                    : 'Tìm kiếm chương trình, khóa học hoặc tin tức của STEMKey.'}
                </p>
                {query && (
                  <Link
                    href="/"
                    className="mt-6 rounded-full bg-[#001D44] px-6 py-2.5 text-sm font-bold text-white transition-opacity hover:opacity-90"
                  >
                    Về trang chủ
                  </Link>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>
    </div>
  )
}

export function TimKiemPageContent() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <Loader2 className="text-stem-blue animate-spin" size={48} />
        </div>
      }
    >
      <SearchResults />
    </Suspense>
  )
}
