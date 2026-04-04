import type { Metadata } from 'next'
import { TimKiemPageContent } from './_page-content'

export const metadata: Metadata = {
  title: 'Tìm kiếm',
  description: 'Tìm kiếm chương trình, khóa học và tin tức tại STEMKey.',
}

export default function SearchPage() {
  return <TimKiemPageContent />
}
