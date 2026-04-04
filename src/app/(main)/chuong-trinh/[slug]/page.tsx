import type { Metadata } from 'next'
import { PROGRAMS_DATA } from '@/constants'
import { ChuongTrinhPageContent } from './_page-content'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const program = PROGRAMS_DATA.find(p => p.slug === slug)

  if (!program) {
    return { title: 'Không tìm thấy chương trình' }
  }

  return {
    title: program.title,
    description: program.desc.slice(0, 160),
    openGraph: {
      type: 'website',
      title: `${program.title} - STEMKey`,
      description: program.desc,
      images: program.img ? [{ url: (typeof program.img === 'string' ? program.img : program.img.src), width: 1200, height: 630 }] : [],
    },
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://stemkey.vn'}/chuong-trinh/${slug}`,
    },
  }
}

export default async function ProgramDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  return <ChuongTrinhPageContent slug={slug} />
}
